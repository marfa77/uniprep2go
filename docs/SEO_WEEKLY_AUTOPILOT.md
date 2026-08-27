# UniPrep2Go — SEO weekly autopilot (dual-track)

Low traffic today; ops model since **2026-08-27** is dual-track (not FINRA-only weekly titles):

1. **Layer A** — index unknown money URLs (`sie-full-mock` first).
2. **Layer B** — push pos 8–25 pages into top 10 (≤2 point-edits/week).
3. **Layer C** — reopen SIE→7→63 mock SEO only after SIE is known + ≥10 impr/28d.

Canonical rules: `docs/SEO_AUTOPILOT_STRATEGY.md` · Cursor rule `.cursor/rules/seo-dual-track-top.mdc`

## Commands

```bash
npm run audit:seo:rules
npm run audit:aeo
npm run indexnow:submit
```

## US money funnel (product)

```
US search / LLM
  → free timed mock (PTCB / Series 63 / Life & Health / CFA while SIE indexes)
  → Anki / PDF deck
  → Gumroad checkout
```

SIE full mock remains product flagship for FINRA ladder — not weekly SEO lead until Google indexes it.

## Weekly allowlist (Track B)

`/` · `ptcb-study-guide-2026` · `cfa-level-2-formula-reference-2026` · `series-63-anki-deck` · Life in the UK blog · Life & Health mock

## Secrets

```text
GSC_SITE_PROPERTY=sc-domain:uniprep2go.study
GOOGLE_SERVICE_ACCOUNT_JSON=...
TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID
```

## Guardrails

- No SIE/7/63 **mock** title churn while `sie-full-mock` is unknown.
- Competitor AEO ≥60 days per slug; no OpenRouter.
- Point edits only; no new SKUs until Layer A money P0 are known.
- Ship via `git push origin main` when asked.
