# Brave Search channel (organic)

**Why it matters:** Brave has its own index/crawler (not Bing-resold). Default search in Brave browser. Cleaner SERPs for trade intents (HVAC / EPA 608, electrical, CDL) where Google is aggregator-heavy. Index also feeds Brave Summarizer and some AI search APIs.

**Official crawler fact (do not invent UA rules):**  
[Brave Search Crawler](https://search.brave.com/help/brave-search-crawler) — crawler **does not advertise a differentiated user agent**; if Googlebot cannot crawl a URL, Brave will not either. `robots.txt` Googlebot rules apply. Explicit `Bravebot` Allow lines are cosmetic only.

**Re-fetch (not a Search Console):** [search.brave.com/submit-url](https://search.brave.com/submit-url) — after content updates or to refresh a stale snippet. Not a guaranteed new-URL index guarantee.

**Ads:** Brave Search Ads exist; self-serve economics TBD. Default ROI = organic + Summarizer cite + Discussions (Reddit), not paid New Tab.

## What already fits our stack

- Timed free mock landings (zero-fluff answer block + FAQ schema + samples)
- Honest official Q/time/pass facts
- Mock → Anki funnel without doorways
- Sitemap + Googlebot-allowable money URLs

## Pulse queries (US, weekly or after ship)

| Intent | Target URL | Note |
|---|---|---|
| `EPA 608 practice test` | `/mock-exams/epa-608-readiness-check` | Proven Brave wedge |
| `EPA 608 practice test free` | same | |
| `NATE core practice test` | matching mock if live | trade sibling |
| `electrical journeyman practice test` | `/mock-exams/electrical-journeyman-readiness-check` | |
| `CDL general knowledge practice test` | `/mock-exams/cdl-general-knowledge-readiness-check` | |
| `best Anki deck EPA 608` | `/decks/hvac-epa-608-anki-deck` | Discussions block |

Record: date · query · our position (or missing) · who owns top 3 · Summarizer cite Y/N.

## Submit-URL batch (after money mock/deck ship)

1. `https://uniprep2go.study/mock-exams/epa-608-readiness-check`
2. `https://uniprep2go.study/decks/hvac-epa-608-anki-deck`
3. `https://uniprep2go.study/blog/epa-608-practice-test-what-to-expect`
4. Sibling trade mocks that converted or sit near Brave top 20
5. Any URL whose title/meta/facts just changed (same as GSC Layer B)

Cap ~5–10 submits/day; prefer updated money URLs over catalog dump.

**2026-10-23:** submitted (1)–(3) via [submit-url](https://search.brave.com/submit-url).

**2026-10-23 pulse (user check):** `EPA 608 anki deck` → UniPrep ~pos 5 but snippet was `/decks` catalog, not `/decks/hvac-epa-608-anki-deck`. Nine other EPA 608 intents missing from Brave top 20 (Quizlet / tests.com / SkillCat). Series 7 Anki deck = Brave #1 (title has “Anki”). Follow-up shipped: deck title/H1 with “Anki Deck”, EPA block in `llms.txt` + commercial high-intent, FAQPage already on deck page, deep links “EPA 608 Anki deck” from 3 EPA blogs + `/decks` catalog label. Re-submit deck URL after deploy.

## Discussions (Reddit)

Brave mixes Reddit/forum threads for “best Anki / practice test” queries. Organic mentions in `r/HVAC`, `r/CFA`, `r/Series7` help; do **not** spam links. If a real helpful reply fits, draft first — never post without user OK (`never-send-without-approval`).

## Do not

- Open a second weekly title-churn track for Brave (same as Bing rule: Google = scale, Brave = lab/measure)
- noindex Brave-converting mocks to “shrink inventory”
- Block Googlebot paths we still want Brave on
- Assume a dedicated `Bravebot` robots stanza changes crawl behavior
