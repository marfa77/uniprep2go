# Weekly Google + LLM visibility loop — UniPrep2Go (US-first)

**Repo:** `marfa77/uniprep2go` · **branch:** `main` · **site:** https://uniprep2go.study  
**Cron suggestion:** `0 9 * * 1` (UTC Monday)

Primary market is the **United States** (`siteConfig.primaryMarket`). Traffic is still low — every edit must chase **US search + LLM citation intent** that converts to free mock → Anki/Gumroad checkout.

## Cloud Agent prerequisites (blocking)

1. [Cloud Agents → Secrets](https://cursor.com/dashboard/cloud-agents): at least `OPENROUTER_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. For live GSC: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_SITE_PROPERTY=sc-domain:uniprep2go.study` (SA must have Search Console access on the property).
2. Automation must use a **Cloud Environment** for this repo (secrets are not injected if the run skips the environment).
3. **Secrets gate:** if `OPENROUTER_API_KEY` is missing, ABORT. If GSC keys missing, continue with `npm run audit:seo:rules` + `audit:aeo` + prior `docs/seo-audits` / `docs/seo-weekly` — do not invent GSC numbers.

## US priority surfaces (edit these first)

| Priority | URL pattern | Money path |
|----------|-------------|------------|
| P0 | `/mock-exams/us-citizenship-readiness-check` | → citizenship Anki bundle |
| P0 | `/blog/us-naturalization-civics-test-100-questions-only-10` | → mock → bundle |
| P0 | `/decks/citizenship-naturalization-anki-bundle` | Gumroad $20 |
| P0 | `/answers/which-citizenship-anki-deck` | → bundle |
| P1 | US licensing mocks/decks: SIE, Series 7, Series 63, California RE, Life/Health, P&C, PTCB, ServSafe | mock → deck |
| P1 | GRE / Digital SAT / GMAT (US exam demand) | mock → deck |
| P2 | Other citizenship (UK/CA/AU/DE/FR) only if US pages already have a ship this week |

## Hard rules

1. Max **one** production-bound ship per UTC week.
2. Edit only with a signal: GSC (when available), SEO/AEO audit findings, or clear US query intent in titles/meta. Competitor gaps alone never justify edits.
3. Caps: ≤5 page copy edits (title/meta/headline/intro/FAQ or blog titleTag/meta/intro CTA). No new product SKUs. No pricing/layout/auth/schema/DB changes.
4. Ship via **PR only** — never force-push `main`.
5. English UI only. Do not invent official USCIS/FINRA scores or pass rates.

## Weekly procedure

1. Research:
   - `npm run audit:seo:rules`
   - `npm run audit:aeo` (or `audit:aeo:live` when keys allow)
   - Optional: `npm run audit:visibility:rules`
   - If GSC env works: pull Search Console for `sc-domain:uniprep2go.study` (US geo if available) and write `docs/seo-weekly/YYYY-MM-DD-brief.md`
2. Decide US-first candidates → apply point edits in allowlisted files (`src/lib/mock-exams/seo.ts`, `src/lib/deck-seo.ts`, `src/lib/decks.ts` copy fields, `src/lib/blog/posts/*.ts`, `src/lib/intent-pages.ts`).
3. Append run log to `docs/SEO_AUTOPILOT_STRATEGY.md`.
4. `npm test` (or targeted vitest for touched modules) + `npm run build` if affordable.
5. Branch `seo-weekly-YYYY-MM-DD` → PR → merge when green.
6. After merge: Vercel deploys from GitHub; run `npm run indexnow:submit` if IndexNow is configured.

## Success

- Either a merged PR improving US mock→deck discoverability, or a clear “no safe US edits” report with next-week watchlist.
- Never a silent success caused by missing secrets.
