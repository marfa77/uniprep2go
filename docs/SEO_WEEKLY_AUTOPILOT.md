# UniPrep2Go — SEO weekly autopilot (US-first)

Low traffic today; content demand is strong in the **United States** (USCIS civics, FINRA, state licensing, GRE/SAT/GMAT). Weekly loop improves Google + LLM visibility that feeds free mocks → Anki/Gumroad.

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
US search / LLM query
  → /mock-exams/us-citizenship-readiness-check  (or SIE / Series 7 / …)
  → free timed report
  → /decks/citizenship-naturalization-anki-bundle  (or matching Anki deck)
  → Gumroad checkout
```

## Secrets (local + Cloud Agents)

```text
OPENROUTER_API_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
GSC_SITE_PROPERTY=sc-domain:uniprep2go.study
GOOGLE_SERVICE_ACCOUNT_JSON=...   # grant this SA access in Google Search Console
```

## Guardrails

- US surfaces first each week; other geos only after US ship or if zero US candidates.
- Point edits only (title/meta/intro/FAQ). No new pages unless strategy explicitly opens a gap.
- One prod ship / UTC week.
