# Mock bank QA

Scope: live runnable mock banks, **excluding citizenship/naturalization** and Anki.

- `structure-summary.json` — structural audit (stems, distractors, keys)
- `QA-LOG.md` — latest local (no OpenRouter) repair run
- `money-local-qa.json` / `*-summary.json` — intermediate reports

Money-first repair order: SIE → Series 7 → Series 63 → CA RE → L&H → P&C.

```bash
node --import tsx scripts/audit-mock-banks-structure.mjs
node --import tsx scripts/audit-mock-banks-structure.mjs --fix-cheap
node scripts/repair-money-mock-banks-local.mjs
node --import tsx scripts/expand-short-mock-stems-local.mjs
node --import tsx scripts/repair-definition-style-distractors-local.mjs --all-live
```
