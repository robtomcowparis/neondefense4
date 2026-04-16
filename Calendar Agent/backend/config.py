import os
import shutil
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

# In production (Cloud Run), secrets are mounted read-only at configurable
# paths. The google-auth library needs to *write* the refreshed token, so we
# copy it into a writable directory at startup and use that path thereafter.
_cred_src = Path(os.getenv("GOOGLE_CREDENTIALS_SRC", str(ROOT / "credentials.json")))
_token_src = Path(os.getenv("GOOGLE_TOKEN_SRC", str(ROOT / "token.json")))
_writable_dir = Path(os.getenv("GOOGLE_WRITABLE_DIR", str(ROOT)))

GOOGLE_CLIENT_SECRETS = _writable_dir / "credentials.json"
GOOGLE_TOKEN_FILE = _writable_dir / "token.json"

if _cred_src.resolve() != GOOGLE_CLIENT_SECRETS.resolve():
    GOOGLE_CLIENT_SECRETS.parent.mkdir(parents=True, exist_ok=True)
    if _cred_src.exists() and not GOOGLE_CLIENT_SECRETS.exists():
        shutil.copyfile(_cred_src, GOOGLE_CLIENT_SECRETS)
if _token_src.resolve() != GOOGLE_TOKEN_FILE.resolve():
    GOOGLE_TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    if _token_src.exists() and not GOOGLE_TOKEN_FILE.exists():
        shutil.copyfile(_token_src, GOOGLE_TOKEN_FILE)

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
