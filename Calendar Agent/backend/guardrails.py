"""Scheduling guardrails: conflict detection, buffers, business hours, court-deadline lock."""
from __future__ import annotations

import datetime as dt
from dataclasses import dataclass

from . import config, google_calendar as gcal


@dataclass
class Violation:
    code: str
    message: str


def _parse_hm(s: str) -> dt.time:
    h, m = s.split(":")
    return dt.time(int(h), int(m))


def is_court_calendar(cal_id: str) -> bool:
    return cal_id == config.COURT_CALENDAR_ID


def check_business_hours(start: dt.datetime, end: dt.datetime) -> Violation | None:
    start_t = _parse_hm(config.WORK_DAY_START)
    end_t = _parse_hm(config.WORK_DAY_END)
    if start.time() < start_t:
        return Violation(
            "before_hours",
            f"Start time {start.strftime('%I:%M %p').lstrip('0')} "
            f"is before the working-hours start ({config.WORK_DAY_START}).",
        )
    if end.time() > end_t and not (end.time() == dt.time(0, 0)):
        return Violation(
            "after_hours",
            f"End time is after the working-hours end ({config.WORK_DAY_END}).",
        )
    return None


def _is_all_day(ev: dict) -> bool:
    return "date" in ev.get("start", {}) and "dateTime" not in ev.get("start", {})


def check_conflicts(
    start: dt.datetime,
    end: dt.datetime,
    buffer_minutes: int | None = None,
    ignore_event_id: str | None = None,
) -> dict:
    """Return overlapping timed events plus same-day all-day events for context.

    Returns:
        {
          "conflicts":      [...],  # timed events that overlap (HARD blocks unless buffer ignored)
          "all_day_notes":  [...],  # all-day events on the same day (informational only)
        }
    """
    buf = dt.timedelta(
        minutes=buffer_minutes if buffer_minutes is not None else config.BUFFER_MINUTES
    )
    window_start = start - buf
    window_end = end + buf
    events = gcal.list_all_events(window_start, window_end)
    conflicts: list[dict] = []
    notes: list[dict] = []
    for ev in events:
        if ignore_event_id and ev.get("id") == ignore_event_id:
            continue
        es = gcal.event_start(ev)
        ee = gcal.event_end(ev)
        if not (es < window_end and ee > window_start):
            continue
        entry = {
            "id": ev.get("id"),
            "summary": ev.get("summary", "(untitled)"),
            "calendar": ev.get("_calendar_label"),
            "calendar_id": ev.get("_calendar_id"),
            "start": es.isoformat(),
            "end": ee.isoformat(),
            "is_court": ev.get("_calendar_id") == config.COURT_CALENDAR_ID,
            "all_day": _is_all_day(ev),
        }
        if _is_all_day(ev):
            notes.append(entry)
        else:
            conflicts.append(entry)
    return {"conflicts": conflicts, "all_day_notes": notes}


def find_free_slots(
    start_window: dt.datetime,
    end_window: dt.datetime,
    duration_minutes: int,
    buffer_minutes: int | None = None,
) -> list[dict]:
    """Find open slots of `duration_minutes` across both calendars within window,
    respecting business hours and buffer."""
    buf = dt.timedelta(
        minutes=buffer_minutes if buffer_minutes is not None else config.BUFFER_MINUTES
    )
    duration = dt.timedelta(minutes=duration_minutes)
    events = gcal.list_all_events(start_window, end_window)
    # Skip all-day events — they're typically informational deadlines, not time blocks.
    busy = [
        (gcal.event_start(e) - buf, gcal.event_end(e) + buf)
        for e in events if not _is_all_day(e)
    ]
    busy.sort()

    work_start_t = _parse_hm(config.WORK_DAY_START)
    work_end_t = _parse_hm(config.WORK_DAY_END)
    tz = gcal.tz()

    slots: list[dict] = []
    day = start_window.astimezone(tz).date()
    last_day = end_window.astimezone(tz).date()
    while day <= last_day:
        day_start = tz.localize(dt.datetime.combine(day, work_start_t))
        day_end = tz.localize(dt.datetime.combine(day, work_end_t))
        day_start = max(day_start, start_window.astimezone(tz))
        day_end = min(day_end, end_window.astimezone(tz))
        cursor = day_start
        day_busy = [(s, e) for (s, e) in busy if s < day_end and e > day_start]
        for bs, be in day_busy:
            if bs - cursor >= duration:
                slots.append({
                    "start": cursor.isoformat(),
                    "end": (cursor + duration).isoformat(),
                })
            cursor = max(cursor, be)
        if day_end - cursor >= duration:
            slots.append({
                "start": cursor.isoformat(),
                "end": (cursor + duration).isoformat(),
            })
        day = day + dt.timedelta(days=1)
    return slots[:10]
