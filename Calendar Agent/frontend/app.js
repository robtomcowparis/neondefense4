// Calendar Assistant frontend logic.
// Plain JS. Keeps things simple and fast.

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// If the page is served under a prefix like /calendar/, route API calls through
// that same prefix so Netlify's proxy forwards them to the backend.
const API_BASE = (() => {
  const p = location.pathname;
  const m = p.match(/^(\/[^/]+)\//);
  return m && m[1] !== "/static" ? m[1] : "";
})();

// ---------- utils ----------

async function api(path, opts = {}) {
  const url = path.startsWith("/") ? API_BASE + path : path;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    ...opts,
  });
  if (!res.ok) {
    let detail;
    try { detail = await res.json(); } catch { detail = { detail: res.statusText }; }
    const msg = detail.message || detail.detail || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = detail;
    throw err;
  }
  return res.json();
}

function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function fmtDay(iso, opts = {}) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", ...opts });
}

function groupBy(arr, fn) {
  const out = new Map();
  for (const x of arr) {
    const k = fn(x);
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(x);
  }
  return out;
}

// ---------- screens ----------

function show(screen) {
  $("#login").classList.toggle("hidden", screen !== "login");
  $("#app").classList.toggle("hidden", screen !== "app");
}

function showTab(name) {
  $$(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  $$(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `tab-${name}`));
  if (name === "chat") setTimeout(() => $("#chat-input")?.focus(), 30);
}

// ---------- clock ----------

function startClock() {
  const el = $("#clock");
  function tick() {
    const d = new Date();
    el.textContent = d.toLocaleString(undefined, {
      weekday: "short", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    }).toUpperCase();
  }
  tick();
  setInterval(tick, 30_000);
}

// ---------- auth ----------

async function attemptBootstrap() {
  const me = await api("/api/me");
  if (me.authenticated) {
    show("app");
    loadSummary();
    if (!me.google_authorized) {
      showSummaryError(
        "Google Calendar not authorized on the server. Run `python -m backend.oauth_setup` in the project folder, then refresh."
      );
    }
  } else {
    show("login");
    setTimeout(() => $("#password")?.focus(), 50);
  }
}

$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#login-error");
  err.textContent = "";
  const pw = $("#password").value;
  try {
    await api("/api/login", { method: "POST", body: JSON.stringify({ password: pw }) });
    $("#password").value = "";
    attemptBootstrap();
  } catch (ex) {
    err.textContent = ex.status === 401 ? "ACCESS DENIED" : `ERROR: ${ex.message}`;
  }
});

$("#logout-btn").addEventListener("click", async () => {
  try { await api("/api/logout", { method: "POST" }); } catch {}
  location.reload();
});

// ---------- tabs ----------

$$(".tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

// ---------- summary ----------

$("#refresh-btn").addEventListener("click", () => loadSummary());

const MONTH_NAMES = [
  "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
  "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
];

// Range state. Anchor = start of the displayed week (Sunday), or 1st of displayed month.
const range = {
  view: "week",                                // 'week' | 'month'
  anchor: startOfWeek(new Date()),
};

function startOfWeek(d) {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  out.setDate(out.getDate() - out.getDay()); // Sunday
  return out;
}
function startOfMonth(d) {
  const out = new Date(d.getFullYear(), d.getMonth(), 1);
  out.setHours(0, 0, 0, 0);
  return out;
}
function addDays(d, n) { const o = new Date(d); o.setDate(o.getDate() + n); return o; }
function addMonths(d, n) {
  const o = new Date(d.getFullYear(), d.getMonth() + n, 1);
  o.setHours(0, 0, 0, 0); return o;
}
function isoDate(d) {
  // Local YYYY-MM-DD (don't use toISOString — it shifts to UTC).
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function showSummaryError(msg) {
  const el = $("#summary-error");
  el.textContent = msg;
  el.classList.remove("hidden");
}
function clearSummaryError() { $("#summary-error").classList.add("hidden"); }

function renderEvent(ev) {
  const div = document.createElement("div");
  div.className = "event" + (ev.is_court ? " court" : "");
  const time = ev.all_day ? "ALL DAY" : `${fmtTime(ev.start)} — ${fmtTime(ev.end)}`;
  div.innerHTML = `
    <div class="event-time">${escapeHtml(time)}</div>
    <div class="event-title">${escapeHtml(ev.summary || "(untitled)")}</div>
    ${ev.location ? `<div class="event-loc">${escapeHtml(ev.location)}</div>` : ""}
  `;
  return div;
}

function renderMiniEvent(ev) {
  const d = document.createElement("div");
  d.className = "mini-event" + (ev.is_court ? " court" : "");
  const time = ev.all_day ? "ALL DAY" : fmtTime(ev.start);
  d.innerHTML = `
    <span class="mini-time">${escapeHtml(time)}</span>
    ${escapeHtml(ev.summary || "(untitled)")}
  `;
  return d;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fillList(el, events, emptyText) {
  el.innerHTML = "";
  if (!events.length) {
    el.innerHTML = `<div class="empty">${emptyText}</div>`;
    return;
  }
  events.forEach((ev) => el.appendChild(renderEvent(ev)));
}

function renderWeek(events, startDate) {
  const wv = $("#week-view");
  wv.innerHTML = "";
  const byDay = groupBy(events, (ev) => new Date(ev.start).toDateString());
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < 7; i++) {
    const d = addDays(startDate, i);
    const list = (byDay.get(d.toDateString()) || [])
      .slice()
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    const col = document.createElement("div");
    col.className = "day-col" + (d.getTime() === today.getTime() ? " today" : "");
    col.innerHTML = `
      <div class="day-head">
        <div class="day-name">${DAY_NAMES[d.getDay()]}</div>
        <div class="day-num">${d.getDate()}</div>
      </div>
    `;
    const wrap = document.createElement("div");
    wrap.className = "day-events";
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.style.fontSize = "10px";
      empty.textContent = "—";
      wrap.appendChild(empty);
    } else {
      list.forEach((ev) => wrap.appendChild(renderMiniEvent(ev)));
    }
    col.appendChild(wrap);
    wv.appendChild(col);
  }
}

const MAX_MONTH_EVENTS = 3;

function renderMonth(events, monthStart) {
  const mv = $("#month-view");
  mv.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "month-grid";

  // Day-name headers
  for (let i = 0; i < 7; i++) {
    const h = document.createElement("div");
    h.className = "month-head";
    h.textContent = DAY_NAMES[i];
    grid.appendChild(h);
  }

  const byDay = groupBy(events, (ev) => new Date(ev.start).toDateString());
  const today = new Date(); today.setHours(0,0,0,0);

  // Grid starts at the Sunday on/before the 1st, runs 6 weeks (42 cells).
  const gridStart = startOfWeek(monthStart);
  for (let i = 0; i < 42; i++) {
    const d = addDays(gridStart, i);
    const cell = document.createElement("div");
    const cls = ["month-cell"];
    if (d.getMonth() !== monthStart.getMonth()) cls.push("outside");
    if (d.getDay() === 0 || d.getDay() === 6)   cls.push("weekend");
    if (d.getTime() === today.getTime())        cls.push("today");
    cell.className = cls.join(" ");

    const num = document.createElement("div");
    num.className = "month-num";
    num.textContent = d.getDate();
    cell.appendChild(num);

    const dayEvents = (byDay.get(d.toDateString()) || [])
      .slice()
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    dayEvents.slice(0, MAX_MONTH_EVENTS).forEach((ev) => {
      const e = document.createElement("div");
      e.className = "month-event" + (ev.is_court ? " court" : "");
      const time = ev.all_day ? "" : `<span class="me-time">${escapeHtml(fmtTime(ev.start))}</span>`;
      e.innerHTML = `${time}${escapeHtml(ev.summary || "(untitled)")}`;
      e.title = `${ev.all_day ? "ALL DAY" : fmtTime(ev.start) + " — " + fmtTime(ev.end)}\n${ev.summary || ""}\n${ev.calendar || ""}`;
      cell.appendChild(e);
    });
    if (dayEvents.length > MAX_MONTH_EVENTS) {
      const more = document.createElement("div");
      more.className = "month-more";
      more.textContent = `+${dayEvents.length - MAX_MONTH_EVENTS} more`;
      cell.appendChild(more);
    }

    grid.appendChild(cell);
  }
  mv.appendChild(grid);
}

function setView(view) {
  range.view = view;
  // Re-anchor: when switching, snap to the period containing today (or the displayed anchor).
  if (view === "week") {
    range.anchor = startOfWeek(range.anchor);
  } else {
    range.anchor = startOfMonth(range.anchor);
  }
  $$(".range-tab").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  $("#week-view").classList.toggle("hidden", view !== "week");
  $("#month-view").classList.toggle("hidden", view !== "month");
  loadRange();
}

function navStep(direction) {
  if (range.view === "week") {
    range.anchor = addDays(range.anchor, 7 * direction);
  } else {
    range.anchor = addMonths(range.anchor, direction);
  }
  loadRange();
}

function navToday() {
  range.anchor = range.view === "week" ? startOfWeek(new Date()) : startOfMonth(new Date());
  loadRange();
}

function updateRangeLabel() {
  const el = $("#range-label");
  if (range.view === "week") {
    const start = range.anchor;
    const end = addDays(start, 6);
    const fmt = (d) => `${MONTH_NAMES[d.getMonth()].slice(0,3)} ${d.getDate()}`;
    el.textContent = `${fmt(start)} — ${fmt(end)}, ${end.getFullYear()}`;
  } else {
    el.textContent = `${MONTH_NAMES[range.anchor.getMonth()]} ${range.anchor.getFullYear()}`;
  }
}

async function loadRange() {
  updateRangeLabel();
  let start, end;
  if (range.view === "week") {
    start = range.anchor;
    end = addDays(start, 7);
  } else {
    // Month view fetches 6 weeks starting on the Sunday on/before the 1st.
    start = startOfWeek(range.anchor);
    end = addDays(start, 42);
  }
  try {
    clearSummaryError();
    const data = await api(`/api/events?start=${isoDate(start)}&end=${isoDate(end)}`);
    if (range.view === "week") {
      renderWeek(data.events || [], range.anchor);
    } else {
      renderMonth(data.events || [], range.anchor);
    }
  } catch (ex) {
    if (ex.status === 401) { show("login"); return; }
    if (ex.body && ex.body.error === "google_not_authorized") {
      showSummaryError(ex.body.message || "Google not authorized.");
    } else {
      showSummaryError(`Failed to load: ${ex.message}`);
    }
  }
}

async function loadToday() {
  try {
    const data = await api("/api/summary");
    $("#today-date").textContent = new Date(data.now)
      .toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })
      .toUpperCase();
    const today = data.today || [];
    fillList($("#today-client"), today.filter((e) => !e.is_court), "No meetings today");
    fillList($("#today-court"),  today.filter((e) =>  e.is_court), "No deadlines today");
  } catch (ex) {
    if (ex.status === 401) { show("login"); return; }
    if (ex.body && ex.body.error === "google_not_authorized") {
      showSummaryError(ex.body.message || "Google not authorized.");
    } else {
      showSummaryError(`Failed to load today: ${ex.message}`);
    }
  }
}

async function loadSummary() {
  await Promise.all([loadToday(), loadRange()]);
}

// Range nav wiring
$$(".range-tab").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
$("#nav-prev").addEventListener("click",  () => navStep(-1));
$("#nav-next").addEventListener("click",  () => navStep(+1));
$("#nav-today").addEventListener("click", navToday);

// ---------- chat ----------

const messagesEl = $("#messages");

function addMessage(role, text, { typing = false } = {}) {
  const el = document.createElement("div");
  el.className = `msg ${role}${typing ? " typing" : ""}`;
  const label = role === "user" ? "YOU" : role === "assistant" ? "ASSISTANT" : "SYSTEM";
  if (role !== "system") {
    el.innerHTML = `<span class="msg-label">${label}</span>`;
    const body = document.createElement("span");
    body.textContent = text || "";
    el.appendChild(body);
  } else {
    el.textContent = text || "";
  }
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return el;
}

function greet() {
  messagesEl.innerHTML = "";
  addMessage("system", "— SESSION OPEN —");
  addMessage("assistant",
    "Hi Hannah — I'm ready to help manage your calendar.\n\n" +
    "Try:\n" +
    "• \"What's on my plate tomorrow?\"\n" +
    "• \"Schedule a client meeting with Davison next Tuesday at 10am.\"\n" +
    "• \"When am I free for a 90-minute block this week?\"\n" +
    "• \"Move the Rodriguez deposition to Thursday at 2pm.\""
  );
}

let CHAT_HISTORY = [];

$("#chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMessage("user", text);

  const typingEl = addMessage("assistant", "thinking", { typing: true });

  try {
    const res = await api("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: text, history: CHAT_HISTORY }),
    });
    typingEl.remove();
    addMessage("assistant", res.reply || "(no reply)");
    if (Array.isArray(res.history)) CHAT_HISTORY = res.history;
    // Refresh summary in the background in case the agent modified the calendar.
    loadSummary().catch(() => {});
  } catch (ex) {
    typingEl.remove();
    if (ex.status === 401) { show("login"); return; }
    addMessage("assistant", `⚠ Error: ${ex.message}`);
  }
});

$("#chat-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    $("#chat-form").requestSubmit();
  }
});

$("#reset-chat").addEventListener("click", async () => {
  CHAT_HISTORY = [];
  try { await api("/api/chat/reset", { method: "POST" }); } catch {}
  greet();
});

// ---------- boot ----------

startClock();
greet();
attemptBootstrap();
