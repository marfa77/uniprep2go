# Weekly Google + LLM visibility — UniPrep2Go (FINRA + portfolio winner patterns)

**Repo:** `marfa77/uniprep2go` · **branch:** `main` · **site:** https://uniprep2go.study  
**Cron:** `0 9 * * 1` · **Model:** Grok 4.6 · **Ship:** push `main` (Vercel) + Telegram DM every run

Primary money market: **US FINRA ladder** (SIE → Series 7 → Series 63). Traffic is still near-zero in GSC top3 — every edit chases indexation + CTR that converts free mock → Anki/Gumroad.

## Cross-project winner patterns (apply lazily)

Steal **snippet structure**, not niche copy:

| Source | What wins | UniPrep transfer |
|--------|-----------|------------------|
| **Prep2Go** | Exam acronym + concrete need + year (`dtz exam dates 2026`, `dele a2 audio`, `ciple exam results`) → real clicks | Titles lead with `SIE` / `Series 7` / `Series 63` + action (practice test, fail rate, format) + `2026` |
| **PixID** | Specific offer in blue link (near you, $4.99, walk-in, 75Q chart) even at #1–3 | Put **Free / No signup / NQ timed / instant report** in title+meta — not vague “readiness check” |
| **Portfolio rule** | Max 3 URLs/cycle; one primary lever; skip pages in recheck window | Same |

Do **not** copy passport/local intent onto FINRA pages.

## Cloud Agent prerequisites (blocking)

1. Cloud Environment for this repo + secrets: `OPENROUTER_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (Pavel DM), `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_SITE_PROPERTY=sc-domain:uniprep2go.study`.
2. Secrets gate: missing OpenRouter → ABORT. Missing GSC → continue with audits + prior briefs; do not invent GSC numbers.
3. After **every** run (including no-op): Telegram DM with winners watchlist, URLs touched, commit SHA, deploy yes/no, index status of money URLs, recheck date.

## US money surfaces (edit these only)

| Priority | URL | Money path |
|----------|-----|------------|
| P0 | `/mock-exams/sie-full-mock` | → SIE deck |
| P0 | `/mock-exams/series-7-readiness-check` | → Series 7 deck |
| P0 | `/mock-exams/series-63-readiness-check` | → Series 63 deck |
| P0 | `/decks/sie-exam-anki-deck`, `/decks/series-7-anki-deck`, `/decks/series-63-anki-deck` | Gumroad |
| P0 | Existing FINRA blogs only | → mock → deck |

**Frozen:** USCIS, EU citizenship, languages, LEED/building, CDL, PTCB, ServSafe, GRE/SAT/GMAT, CA RE / insurance expansion, new pages/SKUs.

## Hard rules

1. Max **3** page copy edits (title/meta/headline/intro/FAQ). One primary lever per URL.
2. Prefer URLs that are **indexed or discovered** — if SIE mock is still “Discovered not indexed”, strengthen internal links from homepage/finance hub + run `npm run indexnow:submit` after deploy; do not invent new blogs to “fix” indexation.
3. Ship to **prod**: commit + push `main` (or merge green PR same day). One ship / UTC week.
4. English UI only. Do not invent official FINRA pass rates.
5. If no safe FINRA edit → “no safe SIE/7/63 edits” + Telegram watchlist. Never fall back to USCIS/building.

## Weekly procedure

1. `npm run audit:seo:rules` && `npm run audit:aeo` (optional `audit:visibility:rules`)
2. If GSC works: pull `sc-domain:uniprep2go.study` → `docs/seo-weekly/YYYY-MM-DD-brief.md` including index status of P0 URLs
3. Build pattern cards from Prep2Go/PixID lessons above + any UniPrep query that got impr
4. Edit ≤3 allowlisted FINRA surfaces for CTR/index clarity
5. Append run log to `docs/SEO_AUTOPILOT_STRATEGY.md`
6. `npm test` (targeted OK) + `npm run build` if affordable
7. Push `main` → Vercel; `npm run indexnow:submit`
8. Telegram DM (required)

## Prompt (automation body)

```
UniPrep2Go — weekly FINRA SEO → prod + Telegram DM.

Goal: index + rank SIE / Series 7 / Series 63 money URLs using Prep2Go (exam+need+year) and PixID (specific free/NQ/no-signup offer) snippet patterns. Convert to free mock → Anki/Gumroad.

Secrets: OPENROUTER_API_KEY required. TELEGRAM_* required for DM. GSC optional but preferred.

HARD: FINRA allowlist only; max 3 URLs; one lever each; no new pages/SKUs; push main + IndexNow; Telegram every run including no-op.

STEPS:
1) audit:seo:rules + audit:aeo
2) GSC brief if keys present — note index status of /mock-exams/sie-full-mock and Series 7/63 + decks
3) Pattern cards → pick ≤3 peers/gaps
4) Point edits in mock-exams/seo.ts, deck-seo.ts, existing FINRA blogs only
5) Log docs/SEO_AUTOPILOT_STRATEGY.md
6) npm test (touched) → commit → push main → indexnow:submit
7) Telegram DM: index status, URLs, levers, SHA, recheck +14d

Reply with the same summary.
```
