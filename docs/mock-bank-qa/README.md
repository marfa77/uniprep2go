# Mock bank QA

Scope: live runnable mock banks, **excluding citizenship/naturalization** and Anki.

## Fast path (use this first — not deep QA)

Deep QA is for live/revenue SKUs only. Day-to-day bank hygiene:

1. **Triage** smell board (seconds, $0) → P0 / P1 / P2
2. **Mechanical fix** P0 (shuffle keys, strip template stems, scrub junk, local enrich)
3. **Local enrich only** (`enrich-mock-explanations-local.mjs`) — **OpenRouter is forbidden**
4. **Deep QA** spot-check 5Q + 1 mock session when shipping (Cursor review, not OpenRouter)

```bash
node --import tsx scripts/triage-mock-bank-smells.mjs
node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --tier P0
# optional targeted:
node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --slug nbdhe-readiness-check
```

Reports: `smell-board.json` / `smell-board.md`

**Do not** re-run `repair-definition-style-distractors-local.mjs --all-live` on non-money banks (pollutes distractors).

## Other reports

- `structure-summary.json` — structural audit (stems, distractors, keys)
- `QA-LOG.md` — latest local (no OpenRouter) repair run
- `money-local-qa.json` / `*-summary.json` — intermediate reports

Money-first repair order: SIE → Series 7 → Series 63 → CA RE → L&H → P&C.

```bash
node --import tsx scripts/audit-mock-banks-structure.mjs
node --import tsx scripts/audit-mock-banks-structure.mjs --fix-cheap
node scripts/repair-money-mock-banks-local.mjs
node --import tsx scripts/expand-short-mock-stems-local.mjs
# money banks only — never blanket --all-live on health/building waves
node --import tsx scripts/repair-definition-style-distractors-local.mjs --slug series-63-readiness-check
```
