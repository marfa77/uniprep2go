#!/usr/bin/env bash
# Export UniPrep2Go secrets for Cursor Cloud Agents → Secrets UI (stdout). Do not commit output.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${1:-$ROOT/.env.local}"
KEYS=(
  GOOGLE_SERVICE_ACCOUNT_JSON
  GSC_SITE_PROPERTY
  OPENROUTER_API_KEY
  TELEGRAM_BOT_TOKEN
  TELEGRAM_CHAT_ID
  TELEGRAM_ADMIN_CHAT_ID
  INDEXNOW_KEY
)
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ "$line" =~ ^[[:space:]]*$ ]] && continue
  key="${line%%=*}"
  val="${line#*=}"
  if [[ "$val" == \"*\" && "$val" == *\" ]]; then val="${val:1:${#val}-2}"; fi
  if [[ "$val" == \'*\' && "$val" == *\' ]]; then val="${val:1:${#val}-2}"; fi
  export "$key=$val" 2>/dev/null || true
done < "$ENV_FILE"

echo "Paste these into https://cursor.com/dashboard/cloud-agents → Secrets"
echo "Scope: Personal Runtime OR Cloud Environment for marfa77/uniprep2go"
echo "Automation must use a Cloud Environment (not No environment)."
echo "Grant the SA access in Google Search Console for sc-domain:uniprep2go.study"
echo "---"
for k in "${KEYS[@]}"; do
  v="${!k-}"
  if [[ -z "${v}" ]]; then
    echo "# MISSING: $k" >&2
    continue
  fi
  printf '%s\n' "$k"
  printf '%s\n' "$v"
  printf '\n---\n'
done
