#!/usr/bin/env bash
# Vercel Ignored Build Step: exit 0 = skip build, exit 1 = build.
# Skip preview branches and docs/scripts-only commits on main.
set -euo pipefail

if [[ "${VERCEL_FORCE_BUILD:-}" == "1" ]]; then
  echo "▶ VERCEL_FORCE_BUILD=1 — build"
  exit 1
fi

REF="${VERCEL_GIT_COMMIT_REF:-}"
if [[ -n "$REF" && "$REF" != "main" && "$REF" != "master" ]]; then
  echo "⏭ Skipping build — preview branch '$REF'"
  exit 0
fi

PREV="${VERCEL_GIT_PREVIOUS_SHA:-}"
CURR="${VERCEL_GIT_COMMIT_SHA:-HEAD}"

if [[ -z "$PREV" ]] || ! git cat-file -e "${PREV}^{commit}" 2>/dev/null; then
  if git rev-parse --verify HEAD^ >/dev/null 2>&1; then
    PREV="HEAD^"
  else
    echo "▶ No previous commit — build"
    exit 1
  fi
fi

APP_PATHS=(
  src
  public
  landing-pages
  next.config.ts
  next.config.mjs
  package.json
  package-lock.json
  pnpm-lock.yaml
  yarn.lock
  tsconfig.json
  vercel.json
  postcss.config.mjs
  vitest.config.ts
)

if git diff --quiet "$PREV" "$CURR" -- "${APP_PATHS[@]}"; then
  echo "⏭ Skipping build — no app/runtime changes ($PREV...$CURR)"
  exit 0
fi

echo "▶ Building — app/runtime files changed ($PREV...$CURR)"
exit 1
