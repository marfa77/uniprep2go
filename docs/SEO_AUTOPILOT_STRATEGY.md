# UniPrep2Go SEO / LLM autopilot strategy

**North star:** US organic + LLM → free timed mock → topic readiness report → fix weak topics (Anki/PDF = mechanism, not the brand promise).  
**Primary operating model (90d from 2026-08-27):** dual-track — (1) near-page-one push on URLs already at pos 8–25, (2) FINRA index-first (`sie-full-mock` unknown until Google knows it).  
**Not:** weekly FINRA title allowlist. That track was premature (2026-08-06…08-13) while `sie-full-mock` stayed unknown and "sie" queries = 0.  
**Not:** catalog scale / new SKUs / `/exams/{slug}/` URL migration / mass topical blogs until GSC shows a real wedge.

**GSC baseline (export 2026-09-24, windows end 2026-09-23):** pages 90d ≈ **1 485 impr / 10 clicks**; 28d ≈ **358 / 7**. Query attribution covers only ~**26%** of page impr (privacy). Page-report clicks ≠ query-report clicks — use **pages** for volume, **query×page** for intent.

**90-day targets (vs this baseline):** ≥3 000 page impr, ≥40 clicks, Series 63 deck and/or PTCB study guide with ≥50 attributed query impr/28d on commercial queries, `sie-full-mock` ≠ unknown with ≥10 impr/28d.

## Diagnosis (locked 2026-09-24)

| Claim | Verdict |
|-------|---------|
| “People come but don’t buy” | **False** — almost no organic distribution yet |
| Need 100 new articles / exam hubs | **False** — 190 pages already have some presence |
| Drop language entirely | **False** — DELF/CELI have the only real clicks; keep live, **no scale** |
| PTCB study guide pos~4 = study-guide SERP | **Unproven** — attributed query is `ptcb outline 2026` @~60 + junk `yes` @4 |
| LEED AP O+M pos~7 | **Ignore** — `site:usgbc.gitbook…` junk |

**Priority stack:** (1) rankings on existing URLs with GSC signal → (2) cluster links mock↔product↔info → (3) conversion after meaningful traffic → (4) new content only under proven queries.

## SEO wedges (active)

| URL | Attributed query (90d) | Action |
|-----|------------------------|--------|
| `/decks/series-63-anki-deck` | `series 63 flashcards` (8 impr @~59) | **PUSH** — flashcards framing + free mock CTA |
| `/decks/ptcb-study-guide-2026` | `ptcb outline 2026` (3 impr @~61) | **STRENGTHEN** — outline/blueprint 2026 + link mock + Anki |
| `/decks/delf-b2-french-anki-deck` · `/decks/celi-b1-italian-anki-deck` | *(queries anonymized)* but real clicks | **KEEP · light title push only** — controlled experiment |
| `/blog/mrics-apc-vs-assocrics-pathway-cost` | `assocrics` | **KEEP · internal link** → MRICS mock/deck |
| AU Common Bond · CDL hazmat blogs | long-tail @ pos 50–90 | **KEEP · NO SCALE** |

Export path: `tmp/gsc-export-YYYY-MM-DD/` via `node scripts/export-gsc-performance.mjs` (includes `query-page-*.csv`). Action ledger: `QUERY_PAGE_ACTIONS.md` in that folder.

## Exam tiers (Wave 1 — 2026-09-24)

Deepen-in-place on existing `/mock-exams/*` + `/decks/*` + `/blog/*`. No new URL tree.

| Tier | Exams | Cadence |
|------|--------|---------|
| **A — push ecosystems** | PTCB, Series 63, CFA L2, Life & Health (Layer B money) | Homepage hero, mock-result conversion, Layer B point-edits ≤1–2 URLs/week |
| **A depth pilots** | EPA 608, ServSafe (already live mock↔deck) | Maintain + outcome CTAs; **no new URLs** this wave |
| **B — maintain** | CFA L1, FRM, SIE/7 (index-only until Layer C), building/LEED, PMP, etc. | Keep live; no weekly SEO churn |
| **C — freeze** | Thin state-by-state real estate, **language catalog scale**, comics, new SKUs, mass FAQ/blog, GEO catalog dump | Keep live; no weekly work. Language: keep DELF/CELI; do not expand |

**Homepage acquisition:** 8 featured mocks only (PTCB, SIE, 63, 65, L&H, EPA 608, ServSafe, CFA L2) + 4 category cards. Citizenship/SAT/GRE off the billboard.

**Conversion rule:** mock result sells “fix these weak topics / pass the exam,” not “buy Anki.”

## Dual-track signal rules

| Signal | Track | Action |
|--------|--------|--------|
| Money URL = unknown / discovered / crawled-not-indexed **and** 0 impr | A — index | Inspect + Request indexing (≤10/week). If crawled-not-indexed → unique money copy same turn. Internal links from `/` + hub. IndexNow after ship. No new blog to "fix" index. |
| URL already at pos **8–25** with impr **or** GSC-attributed commercial query | B — push | Point-edit title/meta/H1/directAnswer/FAQ + mock→deck CTA. Max 1–2 URLs/week. One lever. Prefer attributed queries. |
| FINRA SIE mock still unknown or 0 impr | C — wait | Do **not** rewrite SIE/7/63 mock titles. Only index + internal links. Series 63 **deck** may stay on track B. |
| `sie-full-mock` indexed **and** ≥10 impr/28d **and** Series 63 deck pos ≤8 | C — reopen | Then SIE mock → SIE deck → Series 7. Series 65 = wave 2. |
| Competitor AEO last pass &lt; 60 days | — | Skip SERP/cite rewrite. Ledger only. |
| Crawled-not-indexed on `/decks/*` or `/mock-exams/*` money | A | Strengthen unique content immediately (existing rule). |
| Blog/comic/language/building/thin informational | Freeze | Keep live. No weekly ship (except light DELF/CELI title if Layer B slot free). |
| New SKU / new page idea / exam hub tree | Freeze | Blocked until a money URL proves ≥50 commercial query impr/28d. |
| High-intent query on a Layer B URL with weak snippet | B | Rewrite title/meta only on that URL. |
| LLM/GEO after a Layer B or A content change | Both | Sync exam-facts + curated `llms.txt` cite for **that** slug. No catalog dump. |
| CTR optimization at avg pos &gt; 30 | — | **Skip** — fix rankings first. |

## Weekly allowlist

**Track B (active wedges first):** `/decks/series-63-anki-deck` · `/decks/ptcb-study-guide-2026` · `/` · `/decks/cfa-level-2-formula-reference-2026` · `/blog/life-in-the-uk-test-why-one-in-three-fail` · `/mock-exams/life-and-health-insurance-readiness-check`  
**Reserve:** CA RE blog (pos 26–35), then `/mock-exams` hub.  
**Track A inspect-only:** `sie-full-mock` (unknown as of 2026-08-27); confirm status before requesting CFP/EA (may already be indexed with 0 push priority).

## Homepage rule

Hero = outcome-first diagnostic prep for live Layer B money (PTCB free mock, Series 63, CFA L2 formula, Life & Health). Sell readiness report → weak-topic fix, not Anki as the H1. SIE is a secondary link until Google knows `/mock-exams/sie-full-mock`. Do not billboard the full catalog in the first viewport. Featured strip = 8 acquisition exams; four category hubs below.

## Out of scope for weekly auto-edits

Pricing, Gumroad IDs, auth, DB banks, layout CSS, invented official pass rates, SIE/7/63 mock title churn while SIE is unknown, USCIS/building/language/comics weekly ships, new SKUs, OpenRouter audits, state-RE catalog growth, `/exams/` migration, mass topical blog clusters without GSC proof, CTR-only rewrites on deep-page URLs.

## Run log

### 2026-09-24 — GSC wedge lock + Series 63 / PTCB guide push

**Why:** Query×page export — distribution crisis confirmed; only clear commercial pair is `series 63 flashcards` → Series 63 deck; PTCB guide attributed to `ptcb outline 2026` (not study-guide SERP).  
**Shipped:** Strategy + dual-track rule rewritten to GSC wedges; Series 63 flashcards SEO; PTCB outline/blueprint study-guide SEO + cluster FAQs; homepage already shortened earlier same day.  
**Next:** Re-export GSC in 14–21d; if wedges grow, deepen PTCB cluster links only — no hub tree yet.

### 2026-09-24 — Homepage acquisition shorten

**Why:** Re-audit + GSC — homepage still billed 20+ mocks incl. citizenship/SAT; Tier A money has almost no impr.  
**Shipped:** Featured strip = 8 exams (PTCB, SIE, 63, 65, L&H, EPA 608, ServSafe, CFA L2); 4 category cards; repair pairs = same 8; dropped building dump + citizenship/language from home acquisition.  
**Next:** Layer B wedges above.

### 2026-09-24 — Tier A diagnostic funnel (Wave 1)

**Why:** Public audit — catalog too wide; Anki-as-VP; mock→sale under-sold; no proven niche.  
**Shipped:** Tier A/B/C freeze; homepage outcome hero + home meta; mock report / handoff / mid-session CTAs = fix weak topics; PTCB + Series 63 readiness framing polish.  
**Next:** Superseded by GSC wedge lock same day.

### 2026-09-21 — Foundation repair (no new SKUs)

**Why:** Catalog churn (language/civic) while Google still shows ~574 impr / 1 click / pos ~60; sitemap stamped every deploy; money pages forced `Cache-Control: no-store` via live Gumroad price scrape.
**Shipped:** Sitemap `lastmod` from deck/mock/blog dates; Layer B priority 0.99 vs language 0.72 / comics ~0.7; SSR prices from catalog list (no live scrape); home meta CTR polish; IndexNow Layer A/B URL list.
**Manual:** GSC Request indexing on `sie-full-mock` if still unknown; watch Layer B impr 14d.
**Next:** Layer B point-edit max 1–2 URLs/week only when GSC shows pos 8–25; no new SKUs until money index grows.

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
