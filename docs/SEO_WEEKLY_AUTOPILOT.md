# UniPrep2Go — SEO weekly autopilot (FINRA-first)

Low traffic today; highest willingness-to-pay is the **FINRA ladder** (SIE → Series 7 → Series 63). Weekly loop improves Google + LLM visibility that feeds free SIE mock → Anki/Gumroad. Other catalogs stay live but are frozen for weekly ships.

## Commands

```bash
# Rules-only (safe, no OpenRouter spend beyond optional)
npm run audit:seo:rules
npm run audit:aeo

# Fuller visibility pack (OpenRouter)
npm run audit:visibility:rules
# npm run audit:visibility -- --scope all --live

# Indexation ping after deploy
npm run indexnow:submit
```

Cursor Automation prompt: `.cursor/prompts/weekly-visibility-automation.md`  
Run history: `docs/SEO_AUTOPILOT_STRATEGY.md`

## US money funnel

```
US search / LLM query (SIE / Series 7 / Series 63)
  → /mock-exams/sie-full-mock  (or Series 7 / 63 readiness)
  → free timed report
  → /decks/sie-exam-anki-deck  (or matching Series deck)
  → Gumroad checkout
```

Secondary (kept live, not weekly SEO): CA real estate, insurance, CFA, USCIS civics (later traffic wedge), building/LEED, languages on Prep2Go.

## Secrets (local + Cloud Agents)

```text
OPENROUTER_API_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
GSC_SITE_PROPERTY=sc-domain:uniprep2go.study
GOOGLE_SERVICE_ACCOUNT_JSON=...   # grant this SA access in Google Search Console
```

## Guardrails

- SIE / Series 7 / Series 63 surfaces only each week; all other geos and verticals frozen.
- Point edits only (title/meta/intro/FAQ). No new pages unless strategy explicitly opens a FINRA gap.
- One prod ship / UTC week → `main` + Telegram DM every run.
- Steal snippet patterns from Prep2Go (exam+need+year) and PixID (specific free/NQ offer) — not niche copy.
- No new Gumroad SKU until free SIE mock has meaningful completes (ops gate: 50).
