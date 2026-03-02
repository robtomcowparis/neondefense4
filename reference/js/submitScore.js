// netlify/functions/submitScore.js
// Secure score submission endpoint.
// Writes to Firebase Realtime Database using Admin credentials.
// Client should NOT have write permission to /scores.

import admin from "firebase-admin";

function initAdmin() {
  if (admin.apps.length) return;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;

  if (!raw || !databaseURL) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT or FIREBASE_DATABASE_URL env var.");
  }

  // FIREBASE_SERVICE_ACCOUNT should be the full service account JSON as a string.
  // If you paste it as one line in Netlify env vars, JSON.parse will work.
  const serviceAccount = JSON.parse(raw);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL
  });
}

function clampInt(n, min, max) {
  const x = Number(n);
  if (!Number.isFinite(x)) return null;
  const v = Math.floor(x);
  if (v < min || v > max) return null;
  return v;
}

function sanitizeName(name) {
  // Keep it simple: trim, remove control chars, cap length.
  const s = String(name || "").trim().replace(/[\u0000-\u001F\u007F]/g, "");
  return s.slice(0, 20);
}

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return { statusCode: 400, body: "Bad JSON" };
    }

    const name = sanitizeName(body.name);
    const waves = clampInt(body.waves, 1, 500);
    const kills = clampInt(body.kills, 0, 1_000_000);
    const towers_built = clampInt(body.towers_built, 0, 100_000);
    const towers_lost = clampInt(body.towers_lost, 0, 100_000);
    const time_s = clampInt(body.time_s, 0, 86_400);

    if (!name || waves === null || kills === null || towers_built === null || towers_lost === null || time_s === null) {
      return { statusCode: 400, body: "Invalid score" };
    }

    // Simple sanity heuristics (lightweight anti-spam/anti-garbage)
    // Tune these based on your game.
    if (waves > 50 && kills < waves * 3) {
      return { statusCode: 400, body: "Score failed sanity check" };
    }

    initAdmin();
    const db = admin.database();

    const entry = {
      name,
      waves,
      kills,
      towers_built,
      towers_lost,
      time_s,
      date: new Date().toISOString().slice(0, 10),
      timestamp: Date.now()
    };

    await db.ref("scores").push(entry);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error("submitScore error:", err);
    return { statusCode: 500, body: "Server error" };
  }
}
