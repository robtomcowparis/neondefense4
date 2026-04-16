# Deploying the Calendar Assistant

This guide takes you from "nothing deployed" to "Hannah can use it at
`https://neondefense4.com/calendar/`". It assumes **no prior Google Cloud or
Docker experience**.

---

## The big picture

```
Browser (Hannah)
    │
    ▼
neondefense4.com/calendar/   ← Netlify (static site)
    │   (proxy rule in netlify.toml)
    ▼
calendar-assistant-xxx.a.run.app   ← Google Cloud Run (Python FastAPI container)
    │
    ├─► Google Calendar API     (via credentials.json + token.json)
    └─► Anthropic Claude API    (via ANTHROPIC_API_KEY)
```

You will:
1. Get the Calendar Agent code ready (you've already done the local parts).
2. Open Google Cloud Shell in your browser (no install).
3. Upload the code + secret files into Cloud Shell.
4. Run a handful of `gcloud` commands to build and deploy.
5. Paste the Cloud Run URL into `netlify.toml` and push.

Expected time: **30–45 minutes** the first time.

Expected cost: **$0/month**. Hannah's usage fits inside Cloud Run's free tier.

---

## Step 0 — What you need in hand

Before starting, make sure you have:

- **Google Cloud project ID.** Go to https://console.cloud.google.com/, and in
  the top bar next to "Google Cloud" click the project picker. The ID is
  shown under the name (looks like `my-project-1234567`). Write it down.
- **Billing is enabled on that project.** You said yes — confirm at
  https://console.cloud.google.com/billing.
- **`credentials.json` and `token.json`** exist in `Calendar Agent/` locally.
  These were created when you first ran `python -m backend.oauth_setup`.
- **A populated `.env`** in `Calendar Agent/` with all the values filled in
  (Anthropic key, calendar IDs, app password, session secret, etc.).
- **Anthropic API key** handy — we'll paste it into Secret Manager.

---

## Step 1 — Open Google Cloud Shell

Cloud Shell is a Linux terminal that runs in your browser, with `gcloud`
pre-installed and authenticated to your account. You don't need to install
anything on your Windows machine.

1. Go to https://shell.cloud.google.com/
2. If prompted, click **Continue** to start Cloud Shell. First launch takes
   ~30 seconds to provision.
3. You land in a terminal. At the top, make sure the project selector shows
   your project (if it doesn't, click it and pick your project).

Verify the active project:

```bash
gcloud config get-value project
```

If it's wrong, set it:

```bash
gcloud config set project YOUR_PROJECT_ID
```

---

## Step 2 — Get the Calendar Agent code into Cloud Shell

You have two options. **Option A (git)** is cleanest. **Option B (upload)** is
fine if you don't want to commit the Calendar Agent code yet.

### Option A — Push to GitHub, clone in Cloud Shell

If `neondefense4` is on GitHub:

1. On your Windows machine, commit the Calendar Agent folder. The
   `.gitignore` already excludes `credentials.json`, `token.json`, `.env`,
   `.venv`, and `__pycache__`, so it's safe:

   ```bash
   # From C:/Users/rober/Desktop/neondefense4
   git add "Calendar Agent" netlify.toml .gitignore
   git commit -m "Add Calendar Agent + Netlify proxy config"
   git push
   ```

2. In Cloud Shell:

   ```bash
   git clone https://github.com/YOUR-USER/neondefense4.git
   cd "neondefense4/Calendar Agent"
   ```

3. Upload just the two secret files. In the Cloud Shell toolbar click the
   **three-dot menu → Upload**. Upload `credentials.json` first, then
   `token.json`. They'll land in your home directory by default, then move
   them into the Calendar Agent folder:

   ```bash
   mv ~/credentials.json ~/token.json .
   ```

### Option B — Upload the whole folder directly

1. In Cloud Shell's toolbar: **three-dot menu → Upload**.
2. Upload `credentials.json`, `token.json`, and a zip of the `Calendar Agent`
   folder (excluding `.venv` — it's huge).
3. Unzip and `cd` into it.

Verify you're in the right place:

```bash
ls
# Should show: backend  frontend  Dockerfile  requirements.txt  credentials.json  token.json  .env  ...
```

---

## Step 3 — Enable the Google Cloud APIs we'll use

Each Google Cloud product is an API that has to be turned on per project.
Run this once (takes ~1 minute):

```bash
gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    secretmanager.googleapis.com
```

What each one is for:
- **run.googleapis.com** — Cloud Run (where the container runs).
- **artifactregistry.googleapis.com** — stores the built container image.
- **cloudbuild.googleapis.com** — builds the container from your Dockerfile.
- **secretmanager.googleapis.com** — stores API keys and JSON credentials.

---

## Step 4 — Upload secrets to Secret Manager

Secret Manager is Google's encrypted vault. We store five secrets there: two
JSON files (Google OAuth credentials + token) and three strings (Anthropic
key, app password, session secret).

Run each of these from inside the `Calendar Agent` folder in Cloud Shell.
Replace the `YOUR_...` placeholders with your real values.

```bash
# 1. Google OAuth client credentials (the file Google gave you).
gcloud secrets create calendar-credentials --data-file=credentials.json

# 2. Google OAuth refresh token (generated by oauth_setup).
gcloud secrets create calendar-token --data-file=token.json

# 3. Anthropic API key. Paste after the echo command.
printf "%s" "YOUR_ANTHROPIC_KEY_HERE" | \
    gcloud secrets create anthropic-api-key --data-file=-

# 4. App password — what Hannah types on the login screen.
printf "%s" "YOUR_APP_PASSWORD_HERE" | \
    gcloud secrets create app-password --data-file=-

# 5. Session secret — any long random string. Generate one:
python3 -c "import secrets; print(secrets.token_urlsafe(48))" | \
    gcloud secrets create session-secret --data-file=-
```

Verify:

```bash
gcloud secrets list
```

You should see all five.

---

## Step 5 — Grant Cloud Run permission to read those secrets

Cloud Run runs containers as a "service account" (a non-human identity).
The default one needs permission to read from Secret Manager.

```bash
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${COMPUTE_SA}" \
    --role="roles/secretmanager.secretAccessor"
```

This grants read-only access to *all* secrets in the project. Fine for a
single-app project; tighten later if you add unrelated services.

---

## Step 6 — Build and deploy to Cloud Run

One command. Cloud Run picks up your `Dockerfile` automatically because
`--source .` is present.

Fill in your two calendar IDs (from Google Calendar settings for each
calendar → "Integrate calendar" → Calendar ID) and your timezone.

```bash
gcloud run deploy calendar-assistant \
    --source . \
    --region us-west1 \
    --platform managed \
    --allow-unauthenticated \
    --min-instances 0 \
    --max-instances 1 \
    --memory 512Mi \
    --cpu 1 \
    --timeout 300 \
    --set-env-vars "CLIENT_CALENDAR_ID=YOUR_CLIENT_CAL_ID" \
    --set-env-vars "COURT_CALENDAR_ID=YOUR_COURT_CAL_ID" \
    --set-env-vars "TIMEZONE=America/Los_Angeles" \
    --set-env-vars "BUFFER_MINUTES=15" \
    --set-env-vars "WORK_DAY_START=09:30" \
    --set-env-vars "WORK_DAY_END=18:00" \
    --set-env-vars "ANTHROPIC_MODEL=claude-sonnet-4-6" \
    --set-env-vars "COOKIE_SECURE=true" \
    --set-secrets "ANTHROPIC_API_KEY=anthropic-api-key:latest" \
    --set-secrets "APP_PASSWORD=app-password:latest" \
    --set-secrets "SESSION_SECRET=session-secret:latest" \
    --set-secrets "/app/credentials.json=calendar-credentials:latest" \
    --set-secrets "/app/token.json=calendar-token:latest"
```

Explanation of the flags:

- `--source .` — build from the current directory using the Dockerfile.
- `--region us-west1` — Oregon. Close to Hannah if she's on the West Coast.
  You can change to `us-east1`, `europe-west1`, etc.
- `--allow-unauthenticated` — anyone with the URL can reach the app (our
  auth is handled by the app password, not Google).
- `--min-instances 0` — scale to zero when idle (no cost).
- `--max-instances 1` — single instance keeps the in-memory chat session
  coherent. Don't raise this unless you move session state to a DB.
- `--memory 512Mi --cpu 1` — modest. Python + FastAPI + Anthropic SDK fits.
- `--timeout 300` — Claude calls with tool-use loops can take 30+ seconds.
- `--set-env-vars` — plain-text config.
- `--set-secrets KEY=NAME:latest` — inject a Secret Manager secret as an
  environment variable.
- `--set-secrets /path=NAME:latest` — mount a secret as a *file* at that
  path inside the container. We use this for the two JSON files.

First run: Cloud Build will ask to create an Artifact Registry repo the
first time. Answer **yes**. Build takes ~3–5 minutes.

When it finishes, the output ends with:

```
Service [calendar-assistant] revision [calendar-assistant-00001-abc] has been deployed and is serving 100 percent of traffic.
Service URL: https://calendar-assistant-xxxxxx-uw.a.run.app
```

**Copy that URL** — you need it in Step 8.

---

## Step 7 — Smoke test the Cloud Run URL directly

Before wiring it through Netlify, confirm the backend works.

```bash
CLOUD_RUN_URL="https://calendar-assistant-xxxxxx-uw.a.run.app"
curl -s $CLOUD_RUN_URL/api/me
```

Expected response:
```json
{"authenticated":false,"google_authorized":true,"timezone":"America/Los_Angeles",...}
```

- `authenticated:false` is correct — you're not logged in yet.
- `google_authorized:true` means `token.json` mounted correctly.

If you get `google_authorized:false`, the secret mount failed — see
Troubleshooting.

Open the URL in a browser. You should see the login screen. Enter your
`APP_PASSWORD`; the Summary tab should load Hannah's events.

---

## Step 8 — Wire up the Netlify proxy

1. On your local machine, open `netlify.toml` at the repo root.
2. Find `CLOUD_RUN_URL` (there's one occurrence). Replace it with the host
   portion of your Cloud Run URL — **no `https://` and no trailing slash**.

   Example:
   ```toml
   to = "https://calendar-assistant-xxxxxx-uw.a.run.app/:splat"
   ```

3. Commit and push:
   ```bash
   git add netlify.toml
   git commit -m "Wire Calendar Assistant proxy to Cloud Run"
   git push
   ```

4. Netlify auto-deploys in ~1 minute. Watch
   https://app.netlify.com/sites/YOUR-SITE/deploys.

5. Open `https://neondefense4.com/calendar/` in a new incognito window.
   You should see the login screen, same as in Step 7.

Send the link to Hannah along with the `APP_PASSWORD`.

---

## Troubleshooting

### "Permission denied" on `--set-secrets` during deploy

Cloud Run couldn't read a secret. Re-run Step 5 to grant the role, then
redeploy (Step 6).

### `google_authorized:false` in `/api/me`

One of:
- `credentials.json` or `token.json` didn't upload — run `gcloud secrets list`
  and `gcloud secrets versions list calendar-token`.
- `token.json` is expired/revoked. Regenerate locally:
  ```bash
  python -m backend.oauth_setup
  gcloud secrets versions add calendar-token --data-file=token.json
  ```
  Then redeploy so the new version gets mounted (Cloud Run only reads secret
  versions at container start).

### 503 "Agent error" on chat requests

Usually `ANTHROPIC_API_KEY` is missing or wrong. Check:
```bash
gcloud secrets versions access latest --secret=anthropic-api-key
```
Fix:
```bash
printf "%s" "NEW_KEY" | gcloud secrets versions add anthropic-api-key --data-file=-
```
Then redeploy.

### Container crashes on startup

View logs:
```bash
gcloud run services logs read calendar-assistant --region us-west1 --limit 50
```
Common causes: Dockerfile build error (see Cloud Build logs), `SESSION_SECRET`
missing, `.env` values not matching.

### Cookie doesn't stick after login

Make sure `COOKIE_SECURE=true` is set in the Cloud Run env vars AND the page
is accessed over HTTPS (it is, via Netlify). If you're testing the raw
Cloud Run URL in Step 7, that's also HTTPS, so cookies should work.

### `/calendar/` returns 404 after Netlify deploy

The `netlify.toml` redirect didn't apply. Check:
- File is at the repo root (`neondefense4/netlify.toml`), not inside `src/`.
- Netlify build succeeded (red builds don't apply redirects).
- The Cloud Run URL was pasted correctly — you can re-test Step 7 against
  the URL in `netlify.toml`.

---

## Updating the app later

### Code change

```bash
# From Calendar Agent/ folder in Cloud Shell (after pulling latest code):
gcloud run deploy calendar-assistant --source . --region us-west1
```

Env vars and secret mounts carry forward. Flags are only needed on the first
deploy.

### Rotate app password

```bash
printf "%s" "NEW_PASSWORD" | gcloud secrets versions add app-password --data-file=-
gcloud run services update calendar-assistant --region us-west1
```
(The `update` forces a new revision that picks up the new secret version.)

### Refresh OAuth token

```bash
# Locally: python -m backend.oauth_setup
# Then upload the new token.json to Cloud Shell, cd to Calendar Agent, and:
gcloud secrets versions add calendar-token --data-file=token.json
gcloud run services update calendar-assistant --region us-west1
```
