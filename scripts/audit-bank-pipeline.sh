#!/usr/bin/env bash
# One-command bank cycle after manual patches (mock-bank-audit-standard §1 step 4–5).
#
#   npm run audit:bank -- <mockSlug>           # enrich + quality gates on the enriched bank (nothing written)
#   npm run audit:bank -- <mockSlug> --write   # + apply to ops, export to git, triage, live-runnable, vitest
#
# Stops at the first failing step; ops is only written when the enriched bank passes every FAIL gate.
set -euo pipefail
cd "$(dirname "$0")/.."

slug="${1:?usage: audit-bank-pipeline.sh <mockSlug> [--write]}"
write="${2:-}"
step() { printf '\n== %s\n' "$*"; }

step "enrich $slug"
python3 scripts/ops-mock-banks/enrich-banks.py "$slug" | tail -3

step "quality gates on /tmp/enrich/$slug.json"
node scripts/audit-bank-quality.mjs --slug "$slug" --file "/tmp/enrich/$slug.json"

if [[ "$write" != "--write" ]]; then
  echo; echo "gates pass — re-run with --write to apply to ops and export to git"
  exit 0
fi

step "apply to ops"
echo "[\"$slug\"]" > /tmp/enrich/changed.json
python3 scripts/ops-mock-banks/apply-enriched-banks.py "$slug" --write | tail -3

step "export ops -> git"
python3 scripts/ops-mock-banks/export-ready-to-git.py --write --include-civic "$slug" | tail -3

step "quality gates on git export"
node scripts/audit-bank-quality.mjs --slug "$slug"

step "smell triage"
node --import tsx scripts/triage-mock-bank-smells.mjs --slug "$slug" | tail -5
git checkout -- docs/mock-bank-qa/smell-board.json docs/mock-bank-qa/smell-board.md 2>/dev/null || true

step "live runnable"
npx tsx scripts/ops-mock-banks/check-live-runnable.ts | tail -3

step "vitest mock-exams"
npx vitest run src/lib/mock-exams/ 2>&1 | tail -4
