# Weekly Google + LLM visibility loop — UniPrep2Go (FINRA-first)

**Repo:** `marfa77/uniprep2go` · **branch:** `main` · **site:** https://uniprep2go.study  
**Cron suggestion:** `0 9 * * 1` (UTC Monday)

Primary money market is **US securities licensing** (`siteConfig.primaryMarket` = United States). Traffic is still low — every edit must chase **SIE → Series 7 → Series 63** CTR that converts to free mock → Anki/Gumroad checkout. Everything else is frozen for weekly ships.

## Cloud Agent prerequisites (blocking)

1. [Cloud Agents → Secrets](https://cursor.com/dashboard/cloud-agents): at least `OPENROUTER_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. For live GSC: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_SITE_PROPERTY=sc-domain:uniprep2go.study` (SA must have Search Console access on the property).
2. Automation must use a **Cloud Environment** for this repo (secrets are not injected if the run skips the environment).
3. **Secrets gate:** if `OPENROUTER_API_KEY` is missing, ABORT. If GSC keys missing, continue with `npm run audit:seo:rules` + `audit:aeo` + prior `docs/seo-audits` / `docs/seo-weekly` — do not invent GSC numbers.

## US money surfaces (edit these only)

| Priority | URL pattern | Money path |
|----------|-------------|------------|
| P0 | `/mock-exams/sie-full-mock` | → SIE Anki deck + report CTA |
| P0 | `/mock-exams/series-7-readiness-check` | → Series 7 Anki deck |
| P0 | `/mock-exams/series-63-readiness-check` | → Series 63 Anki deck |
| P0 | Matching deck pages: `/decks/sie-exam-anki-deck`, `/decks/series-7-anki-deck`, `/decks/series-63-anki-deck` | Gumroad checkout |
| P0 | Existing FINRA blog/intent pages only if they already exist and improve SIE/7/63 CTR | → mock → deck |

**Frozen (no weekly ship):** USCIS civics, EU citizenship, languages, LEED/building, CDL, PTCB, ServSafe, GRE/SAT/GMAT, CA RE / insurance expansion, new blogs, new intent pages, new SKUs.

## Hard rules

1. Max **one** production-bound ship per UTC week.
2. Edit only with a signal: GSC (when available), SEO/AEO audit findings, or clear SIE/7/63 query intent in titles/meta. Competitor gaps alone never justify edits.
3. Caps: ≤5 page copy edits (title/meta/headline/intro/FAQ or blog titleTag/meta/intro CTA). No new product SKUs. No pricing/layout/auth/schema/DB changes.
4. Ship via **PR only** — never force-push `main`.
5. English UI only. Do not invent official FINRA scores or pass rates.
6. If there is no safe FINRA edit this week, report “no safe SIE/7/63 edits” — do **not** fall back to USCIS or building certs.

## Weekly procedure

1. Research:
   - `npm run audit:seo:rules`
   - `npm run audit:aeo` (or `audit:aeo:live` when keys allow)
   - Optional: `npm run audit:visibility:rules`
   - If GSC env works: pull Search Console for `sc-domain:uniprep2go.study` (US geo if available) and write `docs/seo-weekly/YYYY-MM-DD-brief.md`
2. Decide **SIE / Series 7 / Series 63** candidates only → apply point edits in allowlisted files (`src/lib/mock-exams/seo.ts`, `src/lib/deck-seo.ts`, `src/lib/decks.ts` copy fields, `src/lib/blog/posts/*.ts` for existing FINRA posts only).
3. Append run log to `docs/SEO_AUTOPILOT_STRATEGY.md`.
4. `npm test` (or targeted vitest for touched modules) + `npm run build` if affordable.
5. Branch `seo-weekly-YYYY-MM-DD` → PR → merge when green.
6. After merge: Vercel deploys from GitHub; run `npm run indexnow:submit` if IndexNow is configured.

## Success

- Either a merged PR improving FINRA mock→deck discoverability/CTR, or a clear “no safe SIE/7/63 edits” report with next-week watchlist.
- Never a silent success caused by missing secrets.
- Never a USCIS/building/LEED weekly ship while this allowlist is active.
