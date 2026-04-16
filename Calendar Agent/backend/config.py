import os
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6")

CLIENT_CALENDAR_ID = os.getenv("CLIENT_CALENDAR_ID", "primary")
COURT_CALENDAR_ID = os.getenv("COURT_CALENDAR_ID", "primary")

APP_PASSWORD = os.getenv("APP_PASSWORD", "changeme")
SESSION_SECRET = os.getenv("SESSION_SECRET", "dev-insecure-secret-change-me")

TIMEZONE = os.getenv("TIMEZONE", "America/Los_Angeles")
BUFFER_MINUTES = int(os.getenv("BUFFER_MINUTES", "15"))
WORK_DAY_START = os.getenv("WORK_DAY_START", "09:30")
WORK_DAY_END = os.getenv("WORK_DAY_END", "18:00")

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() in ("1", "true", "yes")

GOOGLE_CLIENT_SECRETS = ROOT / "credentials.json"
GOOGLE_TOKEN_FILE = ROOT / "token.json"

GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
]

CALENDAR_LABELS = {
    CLIENT_CALENDAR_ID: "Client Meetings",
    COURT_CALENDAR_ID: "Court Deadlines",
}


def calendar_label(cal_id: str) -> str:
    return CALENDAR_LABELS.get(cal_id, cal_id)


def calendar_id_from_kind(kind: str) -> str:
    k = (kind or "").strip().lower()
    if k in ("court", "court_deadlines", "court deadlines", "deadline", "deadlines"):
        return COURT_CALENDAR_ID
    return CLIENT_CALENDAR_ID
