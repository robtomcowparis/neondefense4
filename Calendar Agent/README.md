# Calendar Assistant

A personal AI calendar assistant for Hannah. Connects to her two Google Calendars
(Client Meetings + Court Deadlines) and provides:

- **Summary tab** — at-a-glance today + 7-day view, split by calendar
- **Chat tab** — Claude-powered natural-language scheduling with guardrails

Stack: Python / FastAPI backend, Google Calendar API, Anthropic Claude (tool use),
plain HTML/CSS/JS frontend styled with the neon-cyberpunk look from `STYLE_GUIDE.md`.

---

## One-time setup

### 1. Python deps

```bash
python -m venv .venv
# Windows:  .venv\Scripts\activate
# macOS:    source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in:

- `ANTHROPIC_API_KEY` — from https://console.anthropic.com/
- `CLIENT_CALENDAR_ID`, `COURT_CALENDAR_ID` — Google Calendar IDs
  (Google Calendar → Settings → pick the calendar → *Integrate calendar* → *Calendar ID*)
- `APP_PASSWORD` — the password used to log in to the web UI
- `SESSION_SECRET` — any long random string
- `TIMEZONE` — e.g. `America/Los_Angeles`

### 3. Google Calendar OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create **OAuth client ID** → **Desktop app**
3. Download the JSON → save as `credentials.json` in the project root
4. First time only, authorize:

   ```bash
   python -m backend.oauth_setup
   ```

   A browser window opens. Sign in with Hannah's Google account and grant
   calendar access. This writes `token.json` (auto-refreshed after that).

### 4. Run

```bash
python -m backend.main
```

Open http://127.0.0.1:8000, enter the password from `.env`, and go.

---

## What the assistant can do

It uses tool-calling against the Claude API. Available tools:

- `list_events` — read both calendars
- `find_availability` — surface free blocks that respect business hours + buffer
- `check_conflicts` — overlap check with buffer; always called before writes
- `create_event`, `update_event`, `delete_event` — gated by confirmation flags

### Guardrails (enforced in `backend/guardrails.py` + the agent's system prompt)

- **Conflict check** before every create / move.
- **Buffer time** between events (default 15 min; set `BUFFER_MINUTES`).
- **Business hours** (`WORK_DAY_START` / `WORK_DAY_END`; defaults 09:30 → 18:00).
  The agent warns once if you explicitly request off-hours.
- **Court Deadlines are immovable** — modifying/deleting one requires a second
  explicit confirmation at the tool level.
- **Read-back** after every create/update (title, date, weekday, time, duration, calendar).
- **Explicit "yes"** required before destructive actions.

### Examples

- "What do I have on Wednesday?"
- "Schedule a client meeting with Davison next Tuesday at 10am for 45 minutes."
- "Move the Rodriguez deposition to Thursday at 2pm."
- "Cancel my Friday afternoon meetings."
- "When am I free this week for a 90-minute block?"

---

## Deployment

The app is a single FastAPI process + static files. Any host that runs Python
works: Railway, Render, Fly.io, a VPS.

Notes:

- Ship `credentials.json` and `token.json` as secrets (or mount them). Don't
  commit them.
- Set `HOST=0.0.0.0`, a real `PORT`, and a strong `SESSION_SECRET` + `APP_PASSWORD`.
- On Railway/Render, add `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
  as the start command.
- For the first OAuth on a headless server, generate `token.json` locally and
  upload it — `run_local_server` won't work on a remote box.

---

## File tour

```
backend/
  main.py           FastAPI app, auth, summary, chat endpoints
  config.py         env loading, calendar ID mapping
  google_calendar.py Google Calendar API wrapper (OAuth, list/create/update/delete, freebusy)
  guardrails.py     conflict detection, buffer, business hours, free-slot finder
  claude_agent.py   tool definitions, tool impls, system prompt, chat loop
  oauth_setup.py    one-time local OAuth helper

frontend/
  index.html        login + app shell (summary + chat tabs)
  styles.css        neon cyberpunk styling per STYLE_GUIDE.md
  app.js            tab nav, summary rendering, chat client

requirements.txt
.env.example
```

---

## Security notes

- The app is password-protected with a signed cookie (`itsdangerous`).
  Single-user by design.
- Google credentials never reach the browser — all Calendar calls are server-side.
- The Anthropic API key stays on the server.
- For anything higher-stakes than a personal tool, put it behind HTTPS (Caddy,
  Cloudflare, or your host's built-in TLS) and rotate `SESSION_SECRET`.
