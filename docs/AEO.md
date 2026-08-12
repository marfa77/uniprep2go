# AEO / GEO — UniPrep2Go

**Layer A gold standard (portfolio):** [PixID `docs/AEO_GOLD_STANDARD.md`](../../PixID3/docs/AEO_GOLD_STANDARD.md)  
Canonical PixID path on disk: `/Users/pavelveselov/Projects/PixID3/docs/AEO_GOLD_STANDARD.md`

## npm contract

```bash
npm run llms:export          # write public/llms.txt from generator (UTMs)
npm run check:aeo            # Layer A gate (runs export first)
npm run llm:citation-test -- --dry-run
npm run llm:citation-test    # live models when keys present
```

## What Layer A means here

| Check | Where |
|-------|--------|
| `/llms.txt` + UTMs | `src/lib/llm-docs.ts` · route · `public/llms.txt` |
| AI robots allowlist | `src/app/robots.ts` (GPTBot, …) |
| `ai:description` + llms alternate + `data-llm` | homepage `src/app/page.tsx` |
| Citation ops | `scripts/llm-citation-test.ts` |
| Press / republication kit | `/press` · `docs/PRESS_OUTREACH.md` |

Last updated: 2026-08-12
