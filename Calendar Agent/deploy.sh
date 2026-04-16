#!/bin/bash
# Deploy the Calendar Assistant to Cloud Run.
# Run from inside "Calendar Agent/" in Cloud Shell: bash deploy.sh
set -e

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
    --set-env-vars "CLIENT_CALENDAR_ID=hannah@overlooklaw.com" \
    --set-env-vars "COURT_CALENDAR_ID=c_a92fe8e818d4fe883eaf896fba9009dcbc506209fecebc3a4376c0eccd5e9c6e@group.calendar.google.com" \
    --set-env-vars "TIMEZONE=America/Denver" \
    --set-env-vars "BUFFER_MINUTES=15" \
    --set-env-vars "WORK_DAY_START=09:30" \
    --set-env-vars "WORK_DAY_END=18:00" \
    --set-env-vars "ANTHROPIC_MODEL=claude-sonnet-4-6" \
    --set-env-vars "COOKIE_SECURE=true" \
    --set-env-vars "GOOGLE_CREDENTIALS_SRC=/secrets/creds/credentials.json" \
    --set-env-vars "GOOGLE_TOKEN_SRC=/secrets/tokn/token.json" \
    --set-env-vars "GOOGLE_WRITABLE_DIR=/tmp" \
    --set-secrets "ANTHROPIC_API_KEY=anthropic-api-key:latest" \
    --set-secrets "APP_PASSWORD=app-password:latest" \
    --set-secrets "SESSION_SECRET=session-secret:latest" \
    --set-secrets "/secrets/creds/credentials.json=calendar-credentials:latest" \
    --set-secrets "/secrets/tokn/token.json=calendar-token:latest"
