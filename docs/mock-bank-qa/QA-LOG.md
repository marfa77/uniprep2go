# Mock bank QA log

## 2026-08-14 — Smell triage + mechanical P0 fix (no OpenRouter)

**Goal:** Replace full deep-QA panic with cheap triage → mechanical repair.

### What ran

1. Added `scripts/triage-mock-bank-smells.mjs`
2. `npm run triage:mock-banks` / `--fix-mechanical --tier P0` then punctuation hygiene pass
3. Restored accidental `?` stripping from an over-aggressive stem normalizer (fixed in script)

### Before → after (live non-citizenship)

| Tier | Before | After |
| --- | ---: | ---: |
| P0 | 128 | **0** |
| P1 | 26 | **0** |
| P2 | 8 | 123 |
| clean | 16 | 55 |

Mechanical actions: strip `which of the following is most accurate for the …` templates, shuffle answer keys when bias ≥ 55%, scrub money-repair junk phrases, local enrich thin explanations/distractors.

### npm

```bash
npm run triage:mock-banks
npm run triage:mock-banks:fix-p0
```

### Residual

- P2 (~123) = mild residual (thin-ish or mild key skew). Fine for catalog; local enrich only when shipping that SKU.
- **OpenRouter is forbidden** — never use it for bank enrich / audits.
- Deep QA still required for live revenue / force-launch decks (5Q spot + 1 session), not for the whole catalog.
- Do **not** run `repair-definition-style-distractors-local.mjs --all-live` on non-money banks.

---

## 2026-08-06 — Local structural / money repair (historical)

**Scope:** live runnable mocks, excluding citizenship/naturalization and Anki.

1. Structural audit → `structure-summary.json`
2. Cheap pads (`audit-mock-banks-structure.mjs --fix-cheap`)
3. Money-cluster local rewrite (`repair-money-mock-banks-local.mjs`)
4. Definition-style distractor repair (later restricted — unsafe blanket)
5. Short-stem expansion

Citizenship banks: untouched in that run.
