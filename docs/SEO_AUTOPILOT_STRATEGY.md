# UniPrep2Go SEO / LLM autopilot strategy

**North star:** US organic + LLM → free timed mock → Anki/Gumroad.  
**Primary operating model (90d from 2026-08-27):** dual-track — (1) near-page-one push on URLs already at pos 8–25, (2) FINRA index-first (`sie-full-mock` unknown until Google knows it).  
**Not:** weekly FINRA title allowlist. That track was premature (2026-08-06…08-13) while `sie-full-mock` stayed unknown and "sie" queries = 0.

**90-day targets (vs 28d baseline 574 impr / 1 click / pos ~60):** ≥1 200 impr, ≥20 clicks, ≥3 of 6 Layer B URLs at pos ≤10, `sie-full-mock` ≠ unknown with ≥10 impr/28d.

## Dual-track signal rules

| Signal | Track | Action |
|--------|--------|--------|
| Money URL = unknown / discovered / crawled-not-indexed **and** 0 impr | A — index | Inspect + Request indexing (≤10/week). If crawled-not-indexed → unique money copy same turn. Internal links from `/` + hub. IndexNow after ship. No new blog to "fix" index. |
| URL already at pos **8–25** with impr (home, PTCB, CFA L2, Series 63 deck, Life in the UK, Life & Health mock) | B — push | Point-edit title/meta/H1/directAnswer/FAQ + mock→deck CTA. Max 1–2 URLs/week. One lever. Steal Prep2Go (exam+need+year) and PixID (Free / no signup / timed) snippet shape. |
| FINRA SIE mock still unknown or 0 impr | C — wait | Do **not** rewrite SIE/7/63 mock titles. Only index + internal links. Series 63 **deck** may stay on track B (already pos ~11). |
| `sie-full-mock` indexed **and** ≥10 impr/28d **and** Series 63 deck pos ≤8 | C — reopen | Then SIE mock → SIE deck → Series 7. Series 65 = wave 2. |
| Competitor AEO last pass &lt; 60 days | — | Skip SERP/cite rewrite. Ledger only. |
| Crawled-not-indexed on `/decks/*` or `/mock-exams/*` money | A | Strengthen unique content immediately (existing rule). |
| Blog/comic/language/building/thin informational | Freeze | Keep live. No weekly ship. |
| New SKU / new page idea | Freeze | Blocked until Layer A money P0 are known to Google. |
| High-intent query on a Layer B URL with weak snippet | B | Rewrite title/meta only on that URL. |
| LLM/GEO after a Layer B or A content change | Both | Sync exam-facts + curated `llms.txt` cite for **that** slug. No catalog dump. |

## Weekly allowlist

**Track B:** `/` · `/decks/ptcb-study-guide-2026` · `/decks/cfa-level-2-formula-reference-2026` · `/decks/series-63-anki-deck` · `/blog/life-in-the-uk-test-why-one-in-three-fail` · `/mock-exams/life-and-health-insurance-readiness-check`  
**Reserve:** CA RE blog (pos 26–35), then `/mock-exams` hub.  
**Track A inspect-only:** `sie-full-mock` (unknown as of 2026-08-27); confirm status before requesting CFP/EA (may already be indexed with 0 push priority).

## Homepage rule

Hero = live Layer B money (PTCB free mock, Series 63, CFA L2 formula, Life & Health, citizenship). SIE is a secondary link until Google knows `/mock-exams/sie-full-mock`.

## Out of scope for weekly auto-edits

Pricing, Gumroad IDs, auth, DB banks, layout CSS, invented official pass rates, SIE/7/63 mock title churn while SIE is unknown, USCIS/building/language/comics weekly ships, new SKUs, OpenRouter audits.

## Run log

### 2026-08-27 — Dual-track top strategy (supersedes FINRA-only weekly)

**Why:** GSC 28d = 574 impr / 1 click; `sie-full-mock` still unknown; 0 "sie" queries; Series 63 deck at pos 11.2 is the only working FINRA wedge. Layer B pages (PTCB, CFA L2, home) were frozen while dead FINRA titles churned.  
**Shipped:** Strategy rewrite + Cursor rule `seo-dual-track-top.mdc`; homepage hero rewired to live money; Series 63 + PTCB point-edits; Layer A inspect log.  
**Next:** Manual GSC Request indexing on `sie-full-mock`; days 8–14 CFA L2 + Life & Health + Life in the UK blog; recheck SIE status in 7d.

### 2026-08-13 — Portfolio winner-pattern CTR on FINRA P0

**Why:** UniPrep had 0 query×page in portfolio top3/top5; SIE mock still “Discovered – not indexed”. Prep2Go wins clicks with exam+need+year; PixID wins SERP attention with specific offers (NQ, free, no signup).  
**Shipped:** Title/meta/headline on SIE + Series 7 + Series 63 mocks; matching deck SEO; FINRA blog titleTags; weekly prompt = cross-project patterns → prod + Telegram.  
**Next:** IndexNow + GSC Request Indexing on `/mock-exams/sie-full-mock`; recheck index + impr in 14d. Without indexation, CTR titles cannot rank.  
**Superseded:** mock title churn while SIE unknown — see 2026-08-27 dual-track.

### 2026-08-06 — FINRA-first money rebuild (surface + allowlist)

**Why:** Highest US WTP is SIE → Series 7 → Series 63, not USCIS or building niches.  
**Shipped:** Homepage/nav/hubs/sitemap money set rewired to FINRA trilogy; weekly prompt P0 = SIE/7/63 only; USCIS and LEED parked for weekly SEO.  
**Next:** Distribution week into free SIE mock only; no new Gumroad SKU until ~50 completes; watch SIE report → deck CTR.  
**Superseded:** weekly allowlist only — product ladder remains; ops = dual-track until SIE indexed.

### 2026-08-04 — onboard UniPrep into weekly portfolio loop (US-first)

**Why:** Traffic low; US demand for USCIS civics + US licensing/exam prep was the prior funnel bet.  
**Shipped:** Weekly automation prompt + docs; US-first CTR/copy on US citizenship mock, naturalization blog, citizenship Anki SEO, intent FAQ; Cloud Agent / GSC env hooks.  
**Superseded:** 2026-08-06 FINRA-first allowlist — USCIS remains live but is no longer weekly P0.
