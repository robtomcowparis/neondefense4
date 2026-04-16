"""Claude agent with calendar tool use.

Exposes a single `chat` function that takes a conversation history plus a user
message, runs a multi-turn tool loop against the Claude API, and returns the
final assistant text plus an updated history.
"""
from __future__ import annotations

import datetime as dt
import json
from typing import Any

from anthropic import Anthropic
from dateutil import parser as dateparser

from . import config, google_calendar as gcal, guardrails


_client: Anthropic | None = None


def client() -> Anthropic:
    global _client
    if _client is None:
        _client = Anthropic(api_key=config.ANTHROPIC_API_KEY)
    return _client


# --- Tool definitions ----------------------------------------------------

TOOLS: list[dict[str, Any]] = [
    {
        "name": "list_events",
        "description": (
            "List events from both calendars in an ISO 8601 date/time range. "
            "Use for questions like 'what do I have on Wednesday?' or 'show me this week'."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "start": {"type": "string", "description": "ISO 8601 start (inclusive)."},
                "end":   {"type": "string", "description": "ISO 8601 end (exclusive)."},
            },
            "required": ["start", "end"],
        },
    },
    {
        "name": "find_availability",
        "description": (
            "Find free time slots that meet a desired duration across a window. "
            "Respects business hours and the default buffer. Returns up to 10 slots."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "start":    {"type": "string", "description": "ISO 8601 window start."},
                "end":      {"type": "string", "description": "ISO 8601 window end."},
                "duration_minutes": {"type": "integer", "minimum": 5},
            },
            "required": ["start", "end", "duration_minutes"],
        },
    },
    {
        "name": "check_conflicts",
        "description": (
            "Check if a proposed [start, end] conflicts with any existing event on "
            "either calendar, accounting for buffer time. ALWAYS call this before "
            "create_event or update_event."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "start": {"type": "string"},
                "end":   {"type": "string"},
                "ignore_event_id": {"type": "string"},
            },
            "required": ["start", "end"],
        },
    },
    {
        "name": "create_event",
        "description": (
            "Create a new event. `calendar` must be 'client' (client meetings) or "
            "'court' (court deadlines). ALWAYS call check_conflicts first and confirm "
            "with the user before calling this. All-day events on the same day are "
            "informational notes, NOT conflicts — schedule freely around them."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "calendar":    {"type": "string", "enum": ["client", "court"]},
                "summary":     {"type": "string"},
                "start":       {"type": "string", "description": "ISO 8601 start."},
                "end":         {"type": "string", "description": "ISO 8601 end."},
                "description": {"type": "string"},
                "location":    {"type": "string"},
                "user_confirmed": {
                    "type": "boolean",
                    "description": "Must be true. Set only after explicit user confirmation.",
                },
                "off_hours_confirmed": {
                    "type": "boolean",
                    "description": "Set true if scheduling outside business hours AND the user has explicitly approved it after a warning.",
                },
            },
            "required": ["calendar", "summary", "start", "end", "user_confirmed"],
        },
    },
    {
        "name": "update_event",
        "description": (
            "Modify an existing event. Requires explicit user confirmation. "
            "Court-deadline events require an extra confirmation step. "
            "All-day events on the same day are informational, not conflicts."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "calendar":    {"type": "string", "enum": ["client", "court"]},
                "event_id":    {"type": "string"},
                "summary":     {"type": "string"},
                "start":       {"type": "string"},
                "end":         {"type": "string"},
                "description": {"type": "string"},
                "location":    {"type": "string"},
                "user_confirmed":       {"type": "boolean"},
                "court_override_confirmed": {
                    "type": "boolean",
                    "description": "Required true when modifying a Court Deadlines event.",
                },
                "off_hours_confirmed": {
                    "type": "boolean",
                    "description": "Set true if the new time is outside business hours AND the user has explicitly approved.",
                },
            },
            "required": ["calendar", "event_id", "user_confirmed"],
        },
    },
    {
        "name": "delete_event",
        "description": (
            "Delete an event. Requires explicit user confirmation. "
            "Court-deadline events require an extra confirmation."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "calendar": {"type": "string", "enum": ["client", "court"]},
                "event_id": {"type": "string"},
                "user_confirmed":       {"type": "boolean"},
                "court_override_confirmed": {"type": "boolean"},
            },
            "required": ["calendar", "event_id", "user_confirmed"],
        },
    },
]


# --- Tool implementations ------------------------------------------------

def _iso(s: str) -> dt.datetime:
    d = dateparser.isoparse(s)
    if d.tzinfo is None:
        d = gcal.tz().localize(d)
    return d


def _tool_list_events(args: dict) -> dict:
    events = gcal.list_all_events(_iso(args["start"]), _iso(args["end"]))
    return {"events": [_serialize_event(e) for e in events]}


def _tool_find_availability(args: dict) -> dict:
    slots = guardrails.find_free_slots(
        _iso(args["start"]), _iso(args["end"]), int(args["duration_minutes"])
    )
    return {"slots": slots}


def _tool_check_conflicts(args: dict) -> dict:
    result = guardrails.check_conflicts(
        _iso(args["start"]),
        _iso(args["end"]),
        ignore_event_id=args.get("ignore_event_id"),
    )
    bh = guardrails.check_business_hours(_iso(args["start"]), _iso(args["end"]))
    return {
        "conflicts": result["conflicts"],
        "all_day_notes": result["all_day_notes"],
        "business_hours_violation": ({"code": bh.code, "message": bh.message} if bh else None),
    }


def _tool_create_event(args: dict) -> dict:
    if not args.get("user_confirmed"):
        return {"error": "user_confirmed must be true; confirm with user before creating."}
    cal_id = config.calendar_id_from_kind(args["calendar"])
    start = _iso(args["start"])
    end = _iso(args["end"])
    bh = guardrails.check_business_hours(start, end)
    if bh and not args.get("off_hours_confirmed"):
        return {
            "error": "off_hours_required_confirmation",
            "message": (
                f"{bh.message} If the user wants this anyway, warn them once, get an explicit "
                "yes, then retry with off_hours_confirmed=true."
            ),
        }
    result = guardrails.check_conflicts(start, end)
    if result["conflicts"]:
        return {
            "error": "timed_conflict",
            "message": "Timed event conflicts exist. Resolve before scheduling.",
            "conflicts": result["conflicts"],
        }
    ev = gcal.create_event(
        cal_id,
        summary=args["summary"],
        start=start,
        end=end,
        description=args.get("description"),
        location=args.get("location"),
    )
    ev["_calendar_id"] = cal_id
    ev["_calendar_label"] = config.calendar_label(cal_id)
    return {
        "event": _serialize_event(ev),
        "all_day_notes": result["all_day_notes"],
    }


def _tool_update_event(args: dict) -> dict:
    if not args.get("user_confirmed"):
        return {"error": "user_confirmed must be true."}
    cal_id = config.calendar_id_from_kind(args["calendar"])
    if guardrails.is_court_calendar(cal_id) and not args.get("court_override_confirmed"):
        return {"error": "Court-deadline event: set court_override_confirmed=true after explicit warning + user approval."}
    start = _iso(args["start"]) if args.get("start") else None
    end = _iso(args["end"]) if args.get("end") else None
    all_day_notes: list = []
    if start and end:
        bh = guardrails.check_business_hours(start, end)
        if bh and not args.get("off_hours_confirmed"):
            return {
                "error": "off_hours_required_confirmation",
                "message": (
                    f"{bh.message} If the user wants this anyway, warn them once, get an explicit "
                    "yes, then retry with off_hours_confirmed=true."
                ),
            }
        result = guardrails.check_conflicts(start, end, ignore_event_id=args["event_id"])
        if result["conflicts"]:
            return {
                "error": "timed_conflict",
                "message": "Timed event conflicts exist for new time.",
                "conflicts": result["conflicts"],
            }
        all_day_notes = result["all_day_notes"]
    ev = gcal.update_event(
        cal_id,
        event_id=args["event_id"],
        summary=args.get("summary"),
        start=start,
        end=end,
        description=args.get("description"),
        location=args.get("location"),
    )
    ev["_calendar_id"] = cal_id
    ev["_calendar_label"] = config.calendar_label(cal_id)
    return {"event": _serialize_event(ev), "all_day_notes": all_day_notes}


def _tool_delete_event(args: dict) -> dict:
    if not args.get("user_confirmed"):
        return {"error": "user_confirmed must be true."}
    cal_id = config.calendar_id_from_kind(args["calendar"])
    if guardrails.is_court_calendar(cal_id) and not args.get("court_override_confirmed"):
        return {"error": "Court-deadline event deletion requires court_override_confirmed=true."}
    gcal.delete_event(cal_id, args["event_id"])
    return {"ok": True}


TOOL_IMPL = {
    "list_events": _tool_list_events,
    "find_availability": _tool_find_availability,
    "check_conflicts": _tool_check_conflicts,
    "create_event": _tool_create_event,
    "update_event": _tool_update_event,
    "delete_event": _tool_delete_event,
}


def _serialize_event(ev: dict) -> dict:
    return {
        "id": ev.get("id"),
        "summary": ev.get("summary", "(untitled)"),
        "description": ev.get("description", ""),
        "location": ev.get("location", ""),
        "start": ev.get("start", {}).get("dateTime") or ev.get("start", {}).get("date"),
        "end":   ev.get("end",   {}).get("dateTime") or ev.get("end",   {}).get("date"),
        "calendar": ev.get("_calendar_label"),
        "calendar_id": ev.get("_calendar_id"),
        "is_court": ev.get("_calendar_id") == config.COURT_CALENDAR_ID,
        "html_link": ev.get("htmlLink"),
    }


# --- System prompt -------------------------------------------------------

def _system_prompt() -> str:
    now = gcal.now()
    return f"""You are Hannah's calendar assistant. You manage two Google Calendars:
- "Client Meetings" (calendar key: 'client')
- "Court Deadlines" (calendar key: 'court')

Current time: {now.strftime('%A, %B %d, %Y %I:%M %p %Z')}
Timezone: {config.TIMEZONE}
Business hours: {config.WORK_DAY_START}–{config.WORK_DAY_END}
Default buffer between events: {config.BUFFER_MINUTES} minutes

Classifying a request:
- Court hearings, filings, statute-of-limitations dates, depositions ordered by court → 'court'
- Client consultations, strategy calls, check-ins → 'client'
- If ambiguous, ASK before writing.

Non-negotiable rules:
1. Always call check_conflicts before creating or moving an event.
2. Business hours are {config.WORK_DAY_START}–{config.WORK_DAY_END}. If the user wants something outside that window:
   - Warn once ("That's before/after Hannah's business hours — confirm you want it anyway?").
   - Wait for an explicit yes.
   - Then retry the tool with off_hours_confirmed=true. The system WILL allow it. Never tell the user it's blocked — it's a soft guardrail you can override with their permission.
3. Enforce the buffer ({config.BUFFER_MINUTES} min) between TIMED events. If check_conflicts returns timed conflicts, surface them.
4. ALL-DAY EVENTS ARE NOT CONFLICTS. They appear in `all_day_notes`, not `conflicts`. They are deadlines/reminders, not time blocks. Schedule freely on the same day. Optionally mention them as context (e.g. "FYI Thursday has the Mackey filing deadline").
5. Court Deadlines are treated as IMMOVABLE by default. Never propose moving/canceling one to make room for something else.
6. Before delete/update, restate what you're about to do and require an explicit "yes" in plain English. Only then set user_confirmed=true.
7. When modifying or deleting a court-deadline event, issue a clear warning and require a second explicit confirmation. Only then set court_override_confirmed=true.
8. For recurring events, clarify: this single instance or the whole series? (Default to the instance returned by list_events.)
9. After a successful create/update, read back full details: title, date, weekday, start–end, duration, calendar.
10. Be brief. Prefer bulleted times over prose. Use 12-hour format with AM/PM.

When a tool returns error="off_hours_required_confirmation" or error="timed_conflict", that's a guardrail asking you to confirm or reroute — NOT a permanent block. Talk to the user, then retry the tool with the appropriate flag set.

You can freely call read-only tools (list_events, find_availability, check_conflicts) without confirmation — do it silently to answer the user."""


# --- Main entry ----------------------------------------------------------

def chat(history: list[dict], user_message: str, max_tool_iterations: int = 8) -> tuple[str, list[dict]]:
    """Run one chat turn. Returns (assistant_text, updated_history).

    `history` contains alternating {role, content} messages per the Anthropic API.
    """
    messages = list(history) + [{"role": "user", "content": user_message}]

    for _ in range(max_tool_iterations):
        resp = client().messages.create(
            model=config.ANTHROPIC_MODEL,
            max_tokens=2048,
            system=_system_prompt(),
            tools=TOOLS,
            messages=messages,
        )
        assistant_blocks = [b.model_dump() for b in resp.content]
        messages.append({"role": "assistant", "content": assistant_blocks})

        if resp.stop_reason != "tool_use":
            text = "".join(b.get("text", "") for b in assistant_blocks if b.get("type") == "text")
            return text.strip(), messages

        tool_results = []
        for block in assistant_blocks:
            if block.get("type") != "tool_use":
                continue
            name = block["name"]
            tool_id = block["id"]
            args = block.get("input", {}) or {}
            try:
                result = TOOL_IMPL[name](args)
            except Exception as e:
                result = {"error": f"{type(e).__name__}: {e}"}
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_id,
                "content": json.dumps(result, default=str),
            })
        messages.append({"role": "user", "content": tool_results})

    return "I hit the tool-iteration limit. Please try again or rephrase.", messages
