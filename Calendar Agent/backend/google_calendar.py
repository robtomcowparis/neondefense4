"""Thin wrapper around the Google Calendar API.

Handles OAuth (user runs a one-time local flow that writes token.json),
then exposes list/create/update/delete and availability helpers.
"""
from __future__ import annotations

import datetime as dt
import http.client
import socket
import ssl
import time
from typing import Any, Callable

from dateutil import parser as dateparser
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import pytz

from . import config


_service = None

# Built-in retries inside googleapiclient — covers most transient errors.
_NUM_RETRIES = 3

# Outer-loop retries for connection-level failures (poisoned pool sockets).
# Each attempt rebuilds the service to drop stale connections.
_OUTER_ATTEMPTS = 3
_RETRY_EXCEPTIONS: tuple[type[BaseException], ...] = (
    ssl.SSLError,
    socket.error,
    http.client.IncompleteRead,
    http.client.BadStatusLine,
    http.client.ResponseNotReady,
    http.client.RemoteDisconnected,
    ConnectionError,
    TimeoutError,
)


def _call(thunk: Callable[[Any], Any]):
    """Run `thunk(service)`; on transient connection failure, rebuild the
    service (drops pooled sockets) and retry with backoff."""
    global _service
    last_exc: BaseException | None = None
    for attempt in range(_OUTER_ATTEMPTS):
        try:
            return thunk(get_service())
        except HttpError:
            # Real API errors (4xx/5xx with response body) — don't paper over.
            raise
        except _RETRY_EXCEPTIONS as e:
            last_exc = e
            _service = None  # force rebuild → fresh httplib2.Http on next get_service()
            if attempt < _OUTER_ATTEMPTS - 1:
                time.sleep(0.5 * (2 ** attempt))  # 0.5s, 1s
                continue
            raise
    if last_exc:
        raise last_exc


def _load_credentials() -> Credentials | None:
    if config.GOOGLE_TOKEN_FILE.exists():
        return Credentials.from_authorized_user_file(
            str(config.GOOGLE_TOKEN_FILE), config.GOOGLE_SCOPES
        )
    return None


def run_oauth_flow() -> None:
    """Run a one-time local-server OAuth flow. Writes token.json."""
    if not config.GOOGLE_CLIENT_SECRETS.exists():
        raise FileNotFoundError(
            f"Missing {config.GOOGLE_CLIENT_SECRETS}. "
            "Download OAuth client credentials from Google Cloud Console "
            "(Desktop app) and save as credentials.json in the project root."
        )
    flow = InstalledAppFlow.from_client_secrets_file(
        str(config.GOOGLE_CLIENT_SECRETS), config.GOOGLE_SCOPES
    )
    creds = flow.run_local_server(port=0)
    config.GOOGLE_TOKEN_FILE.write_text(creds.to_json())


def get_service():
    global _service
    if _service is not None:
        return _service
    creds = _load_credentials()
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        config.GOOGLE_TOKEN_FILE.write_text(creds.to_json())
    if not creds or not creds.valid:
        raise RuntimeError(
            "Google Calendar not authorized. Run: python -m backend.oauth_setup"
        )
    _service = build("calendar", "v3", credentials=creds, cache_discovery=False)
    return _service


def is_authorized() -> bool:
    try:
        creds = _load_credentials()
        return bool(creds and (creds.valid or creds.refresh_token))
    except Exception:
        return False


# --- Time helpers --------------------------------------------------------

def tz():
    return pytz.timezone(config.TIMEZONE)


def now() -> dt.datetime:
    return dt.datetime.now(tz())


def parse_rfc3339(s: str) -> dt.datetime:
    return dateparser.isoparse(s)


def to_rfc3339(d: dt.datetime) -> str:
    if d.tzinfo is None:
        d = tz().localize(d)
    return d.isoformat()


def event_start(ev: dict) -> dt.datetime:
    s = ev.get("start", {})
    if "dateTime" in s:
        return parse_rfc3339(s["dateTime"])
    if "date" in s:
        return tz().localize(dt.datetime.fromisoformat(s["date"]))
    raise ValueError("event has no start")


def event_end(ev: dict) -> dt.datetime:
    s = ev.get("end", {})
    if "dateTime" in s:
        return parse_rfc3339(s["dateTime"])
    if "date" in s:
        return tz().localize(dt.datetime.fromisoformat(s["date"]))
    raise ValueError("event has no end")


# --- Event ops -----------------------------------------------------------

def list_events(
    calendar_id: str, time_min: dt.datetime, time_max: dt.datetime
) -> list[dict]:
    items: list[dict] = []
    page_token = None
    while True:
        resp = _call(lambda svc, pt=page_token: svc.events().list(
            calendarId=calendar_id,
            timeMin=to_rfc3339(time_min),
            timeMax=to_rfc3339(time_max),
            singleEvents=True,
            orderBy="startTime",
            maxResults=250,
            pageToken=pt,
        ).execute(num_retries=_NUM_RETRIES))
        items.extend(resp.get("items", []))
        page_token = resp.get("nextPageToken")
        if not page_token:
            break
    return items


def list_all_events(time_min: dt.datetime, time_max: dt.datetime) -> list[dict]:
    """Return events from both calendars, each annotated with calendar_id + label."""
    out: list[dict] = []
    for cal_id in (config.CLIENT_CALENDAR_ID, config.COURT_CALENDAR_ID):
        if not cal_id:
            continue
        for ev in list_events(cal_id, time_min, time_max):
            ev["_calendar_id"] = cal_id
            ev["_calendar_label"] = config.calendar_label(cal_id)
            out.append(ev)
    out.sort(key=lambda e: event_start(e))
    return out


def get_event(calendar_id: str, event_id: str) -> dict:
    return _call(lambda svc: svc.events().get(
        calendarId=calendar_id, eventId=event_id
    ).execute(num_retries=_NUM_RETRIES))


def create_event(
    calendar_id: str,
    summary: str,
    start: dt.datetime,
    end: dt.datetime,
    description: str | None = None,
    location: str | None = None,
) -> dict:
    body: dict[str, Any] = {
        "summary": summary,
        "start": {"dateTime": to_rfc3339(start), "timeZone": config.TIMEZONE},
        "end": {"dateTime": to_rfc3339(end), "timeZone": config.TIMEZONE},
    }
    if description:
        body["description"] = description
    if location:
        body["location"] = location
    return _call(lambda svc: svc.events().insert(
        calendarId=calendar_id, body=body
    ).execute(num_retries=_NUM_RETRIES))


def update_event(
    calendar_id: str,
    event_id: str,
    summary: str | None = None,
    start: dt.datetime | None = None,
    end: dt.datetime | None = None,
    description: str | None = None,
    location: str | None = None,
) -> dict:
    body = _call(lambda svc: svc.events().get(
        calendarId=calendar_id, eventId=event_id
    ).execute(num_retries=_NUM_RETRIES))
    if summary is not None:
        body["summary"] = summary
    if start is not None:
        body["start"] = {"dateTime": to_rfc3339(start), "timeZone": config.TIMEZONE}
    if end is not None:
        body["end"] = {"dateTime": to_rfc3339(end), "timeZone": config.TIMEZONE}
    if description is not None:
        body["description"] = description
    if location is not None:
        body["location"] = location
    return _call(lambda svc: svc.events().update(
        calendarId=calendar_id, eventId=event_id, body=body
    ).execute(num_retries=_NUM_RETRIES))


def move_event(src_cal: str, event_id: str, dest_cal: str) -> dict:
    return _call(lambda svc: svc.events().move(
        calendarId=src_cal, eventId=event_id, destination=dest_cal
    ).execute(num_retries=_NUM_RETRIES))


def delete_event(calendar_id: str, event_id: str) -> None:
    _call(lambda svc: svc.events().delete(
        calendarId=calendar_id, eventId=event_id
    ).execute(num_retries=_NUM_RETRIES))


def freebusy(time_min: dt.datetime, time_max: dt.datetime) -> dict:
    return _call(lambda svc: svc.freebusy().query(body={
        "timeMin": to_rfc3339(time_min),
        "timeMax": to_rfc3339(time_max),
        "timeZone": config.TIMEZONE,
        "items": [
            {"id": config.CLIENT_CALENDAR_ID},
            {"id": config.COURT_CALENDAR_ID},
        ],
    }).execute(num_retries=_NUM_RETRIES))
