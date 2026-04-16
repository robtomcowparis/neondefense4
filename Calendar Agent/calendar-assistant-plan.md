# Calendar Assistant — Program Plan

## What Is It?

A personal AI-powered calendar assistant built specifically for Hannah. It connects to both of her Google Calendars — **Client Meetings** and **Court Deadlines** — and provides two things: a clean daily/weekly overview, and a chat interface where she can manage her schedule using plain English.

It will live on the web, accessible from any device — phone, laptop, or tablet — from anywhere.

---

## How It Works

The app has two tabs:

### Summary Tab
A dashboard that displays the day's and week's schedule at a glance, with client meetings and court deadlines shown separately. No digging through Google Calendar — just open the page and see what matters today and what's coming up this week.

### Chat Tab
A conversational interface powered by Claude AI. Hannah types natural requests and the assistant handles them:

- *"Move the Rodriguez deposition to Thursday at 2pm"*
- *"What do I have on Wednesday?"*
- *"Schedule a client meeting with Davison next Tuesday at 10am"*
- *"Cancel my Friday afternoon meetings"*
- *"When am I free this week for a 90-minute block?"*

The AI understands which calendar to use based on context — it knows the difference between a client meeting and a court deadline.

---

## Key Details

- **Access:** Web-based, works on any device with a browser
- **Calendars:** Both Google Calendars (Client Meetings + Court Deadlines) fully connected
- **Security:** Password-protected login; Google credentials stored securely on the server, never exposed
- **AI:** Claude handles natural language understanding and calendar actions
- **Read + Write:** Can both display existing events and create, modify, or delete them through chat

---

## Smart Guardrails

The assistant is built with safety checks to prevent scheduling mistakes:

### Conflict Prevention
Before creating or moving any event, the assistant checks both calendars for overlapping time. If there's a conflict, it won't book — instead it explains what's in the way and suggests an alternative time.

### Court Deadlines Are Immovable
Events on the Court Deadlines calendar are treated as fixed. The assistant will never offer to move or reschedule a deadline to accommodate something else. If Hannah tries to modify or delete a court deadline, the assistant will require explicit confirmation with a warning before proceeding.

### Buffer Time Between Appointments
Back-to-back scheduling is blocked by default. The assistant enforces a buffer window (15–30 minutes, configurable) between events to allow for transition time — especially important between court appearances and client calls.

### Confirmation Before Destructive Actions
The assistant never deletes or moves an event without clearly stating what it's about to do and receiving a "yes." For recurring events, it always clarifies: *this single instance, or the entire series?*

### Business Hours Awareness
The assistant will not schedule anything before **9:30am** or in the late evening unless Hannah explicitly requests it. Default working hours are enforced so the AI doesn't suggest unreasonable times.

### Read-Back on Creation
After scheduling any event, the assistant confirms the full details — date, time, duration, calendar, and title — so Hannah can catch any mistakes before they stick.

---

## Tech Stack (for Rob's reference)

| Layer | Technology |
|---|---|
| Frontend | React (two-tab UI) |
| Backend API | Python / FastAPI |
| Calendar Integration | Google Calendar API (OAuth 2.0) |
| AI Agent | Claude API with tool use |
| Deployment | Cloud-hosted (Railway, Render, or Fly.io) |

---

## Build Phases

1. **Google Calendar connection** — authenticate and pull events from both calendars
2. **Summary tab** — daily and weekly view, split by calendar type
3. **AI chat agent** — Claude with calendar tools (create, update, delete, find availability)
4. **Guardrails layer** — conflict checking, court deadline protection, buffer enforcement, destructive action confirmation, business hours (9:30am+), read-back
5. **Chat tab UI** — conversational interface connected to the agent
6. **Deployment + polish** — put it on the web, add login, responsive design
