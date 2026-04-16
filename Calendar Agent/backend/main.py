"""FastAPI app: serves the frontend and exposes the API."""
from __future__ import annotations

import datetime as dt
import secrets
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request, Depends, Response
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from itsdangerous import BadSignature, URLSafeSerializer
from pydantic import BaseModel

from . import config, google_calendar as gcal
from .claude_agent import chat as agent_chat


app = FastAPI(title="Calendar Assistant")

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

_signer = URLSafeSerializer(config.SESSION_SECRET, salt="cal-session")
SESSION_COOKIE = "cal_session"

# Chat history is stored client-side and sent with each request so it survives
# container restarts. See ChatBody.history below.


def _issue_session(resp: Response) -> str:
    token = _signer.dumps({"ok": True, "n": secrets.token_hex(8)})
    resp.set_cookie(
        SESSION_COOKIE,
        token,
        httponly=True,
        samesite="lax",
        secure=config.COOKIE_SECURE,
        max_age=60 * 60 * 24 * 14,
    )
    return token


def require_auth(request: Request) -> str:
    token = request.cookies.get(SESSION_COOKIE)
    if not token:
        raise HTTPException(401, "not authenticated")
    try:
        _signer.loads(token)
    except BadSignature:
        raise HTTPException(401, "invalid session")
    return token


# --- Auth ----------------------------------------------------------------

class LoginBody(BaseModel):
    password: str


@app.post("/api/login")
def login(body: LoginBody, response: Response):
    if not secrets.compare_digest(body.password, config.APP_PASSWORD):
        raise HTTPException(401, "wrong password")
    _issue_session(response)
    return {"ok": True}


@app.post("/api/logout")
def logout(response: Response):
    response.delete_cookie(SESSION_COOKIE)
    return {"ok": True}


@app.get("/api/me")
def me(request: Request):
    token = request.cookies.get(SESSION_COOKIE)
    authed = False
    if token:
        try:
            _signer.loads(token)
            authed = True
        except BadSignature:
            pass
    return {
        "authenticated": authed,
        "google_authorized": gcal.is_authorized(),
        "timezone": config.TIMEZONE,
        "buffer_minutes": config.BUFFER_MINUTES,
        "work_day_start": config.WORK_DAY_START,
        "work_day_end": config.WORK_DAY_END,
    }


# --- Summary -------------------------------------------------------------

def _serialize(ev: dict) -> dict:
    s = ev.get("start", {})
    e = ev.get("end", {})
    return {
        "id": ev.get("id"),
        "summary": ev.get("summary", "(untitled)"),
        "start": s.get("dateTime") or s.get("date"),
        "end":   e.get("dateTime") or e.get("date"),
        "all_day": "date" in s,
        "location": ev.get("location", ""),
        "description": ev.get("description", ""),
        "calendar": ev.get("_calendar_label"),
        "calendar_id": ev.get("_calendar_id"),
        "is_court": ev.get("_calendar_id") == config.COURT_CALENDAR_ID,
        "html_link": ev.get("htmlLink"),
    }


@app.get("/api/summary")
def summary(_: str = Depends(require_auth)):
    """Today's events + current server time. Used for the 'TODAY' panel."""
    if not gcal.is_authorized():
        return JSONResponse(
            {"error": "google_not_authorized",
             "message": "Google Calendar not authorized. Run `python -m backend.oauth_setup` on the server."},
            status_code=503,
        )
    tz = gcal.tz()
    now = gcal.now()
    today_start = tz.localize(dt.datetime.combine(now.date(), dt.time(0, 0)))
    today_end = today_start + dt.timedelta(days=1)
    try:
        today = [_serialize(e) for e in gcal.list_all_events(today_start, today_end)]
    except Exception as e:
        raise HTTPException(500, f"Calendar API error: {e}")
    return {"today": today, "now": now.isoformat()}


@app.get("/api/events")
def events(
    start: str,
    end: str,
    _: str = Depends(require_auth),
):
    """Range query: ?start=YYYY-MM-DD&end=YYYY-MM-DD (end exclusive)."""
    if not gcal.is_authorized():
        return JSONResponse(
            {"error": "google_not_authorized",
             "message": "Google Calendar not authorized."},
            status_code=503,
        )
    tz = gcal.tz()
    try:
        s = tz.localize(dt.datetime.fromisoformat(start))
        e = tz.localize(dt.datetime.fromisoformat(end))
    except ValueError:
        raise HTTPException(400, "start/end must be ISO date or datetime, e.g. 2026-04-15")
    if e <= s:
        raise HTTPException(400, "end must be after start")
    if (e - s).days > 95:
        raise HTTPException(400, "range capped at 95 days")
    try:
        evs = [_serialize(x) for x in gcal.list_all_events(s, e)]
    except Exception as ex:
        raise HTTPException(500, f"Calendar API error: {ex}")
    return {"events": evs, "start": s.isoformat(), "end": e.isoformat()}


# --- Chat ----------------------------------------------------------------

class ChatBody(BaseModel):
    message: str
    history: list[dict] = []


@app.post("/api/chat")
def chat_endpoint(body: ChatBody, _: str = Depends(require_auth)):
    if not config.ANTHROPIC_API_KEY:
        raise HTTPException(500, "ANTHROPIC_API_KEY not set")
    if not gcal.is_authorized():
        raise HTTPException(503, "Google Calendar not authorized — run oauth_setup")
    try:
        reply, new_history = agent_chat(body.history, body.message)
    except Exception as e:
        raise HTTPException(500, f"Agent error: {type(e).__name__}: {e}")
    return {"reply": reply, "history": new_history}


@app.post("/api/chat/reset")
def chat_reset(_: str = Depends(require_auth)):
    return {"ok": True}


# --- Static frontend -----------------------------------------------------

@app.get("/")
def index():
    return FileResponse(FRONTEND_DIR / "index.html")


app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static",
)


def run() -> None:
    import uvicorn
    uvicorn.run("backend.main:app", host=config.HOST, port=config.PORT, reload=False)


if __name__ == "__main__":
    run()
