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

Export path: `tmp/gsc-export-YYYY-MM-DD/` via `npm run gsc:export` (includes `query-page-*.csv`). Action ledger: `QUERY_PAGE_ACTIONS.md` in that folder.

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
| Bing organic mock:start / Bing referrer (on-site) | Lab | **Do not rewrite the page to "look like Google."** Content already satisfied intent for that click. Log URL vs GSC. If Google already pos 8–25 with impr and 0 clicks → snippet/CTR is the Google bottleneck (only if URL is on Layer B allowlist). If Google 0 impr / unknown → Track A index, not a new SKU. |
| Bing Webmaster pos 1–10 **and** Google pos 30–100 on the **same query×page** | Gold mine | Point-edit only that URL, max 1–2/week, still Layer B cap. **Blocked until Bing Webmaster query×page export exists** — on-site Bing starts ≠ Bing rank. |

## Weekly allowlist

**Track B (active wedges first):** `/decks/series-63-anki-deck` · `/decks/ptcb-study-guide-2026` · `/` · `/decks/cfa-level-2-formula-reference-2026` · `/blog/life-in-the-uk-test-why-one-in-three-fail` · `/mock-exams/life-and-health-insurance-readiness-check`  
**Reserve:** CA RE blog (pos 26–35), then `/mock-exams` hub.  
**Track A inspect-only:** `sie-full-mock` (unknown as of 2026-08-27); confirm status before requesting CFP/EA (may already be indexed with 0 push priority).

## Homepage rule

Hero = outcome-first diagnostic prep for live Layer B money (PTCB free mock, Series 63, CFA L2 formula, Life & Health). Sell readiness report → weak-topic fix, not Anki as the H1. SIE is a secondary link until Google knows `/mock-exams/sie-full-mock`. Do not billboard the full catalog in the first viewport. Featured strip = 8 acquisition exams; four category hubs below.

## Out of scope for weekly auto-edits

Pricing, Gumroad IDs, auth, DB banks, layout CSS, invented official pass rates, SIE/7/63 mock title churn while SIE is unknown, USCIS/building/language/comics weekly ships, new SKUs, OpenRouter audits, state-RE catalog growth, `/exams/` migration, mass topical blog clusters without GSC proof, CTR-only rewrites on deep-page URLs.

## Bing as Google lab (locked 2026-10-06)

**Roles:** Bing = early SEO validation (index + rank + mock:start on thinner SERPs). Google = scale. Do **not** run a second weekly title track for Bing. IndexNow stays as-is.

**Do not invent Bing ranks.** Until a Bing Webmaster query×page CSV lives next to `tmp/gsc-export-*`, the only Bing proof is on-site: `referrer` host bing.com (pulse channel `bing` since 2026-10-06) and `mock:…:start` with Bing referrer. Pulse uniques ≠ position 4.

**GSC vs Bing starts (export 2026-10-05, 90d pages; Bing from live-start ledger, not Webmaster):**

| URL | Bing proof | Google 90d clicks / impr / pos | Read |
|-----|------------|--------------------------------:|------|
| `/mock-exams/ascp-mls-readiness-check` | Learn start US/NC 2026-10-06 | 0 / 2 / 6.0 | Bing converted; Google barely sees it — **index/trust**, do not rewrite again this week |
| `/mock-exams/ascp-mlt-readiness-check` | Boston Learn 2026-10-04 | not in pages-90d | Google unknown — Track A, not Layer B |
| `/mock-exams/rd-exam-readiness-check` | PH Exam 2026-10-05 | 0 / 6 / 34.8 | Closest to “Bing intent + Google deep page” |
| `/mock-exams/cda-childcare-readiness-check` | WI 2026-10-03 | 0 / 1 / 1.0 | 1 impr junk pos — not a ranking win |
| `/mock-exams/ardms-spi-readiness-check` | Seoul Learn 2026-10-04 | not in pages-90d | Google unknown |
| `/mock-exams/medical-scribe-readiness-check` | PH Exam | 0 / 4 / 30.0 | Thin Google; Anki waitlist |
| `/decks/gre-anki-deck` | Hanoi Bing checkout 2026-10-04 | 0 / 3 / 43.7 | Conversion ≠ Google SERP |
| `/mock-exams/cfa-level-1-readiness-check` | *not* a Bing-start SKU | 0 / **164** / 17.5 | Google already distributes; **0 clicks** = snippet, not discovery |
| `/mock-exams/frm-part-1-readiness-check` | *not* a Bing-start SKU | 0 / 33 / 15.5 | Same: Google page 2, no CTR |
| `/decks/series-7-anki-deck` | no Bing rank yet | 0 / 17 / 20.2; qp `series 7 flashcards` 6 @12.5 | Stay Layer B flashcards; do not retarget for Bing |
| `/decks/ptcb-study-guide-2026` | no Bing rank yet | 1 / 20 / 15.7 | Keep outline wedge |
| `/decks/servsafe-manager-complete-study-guide` | no Bing rank yet | 0 / 28 / 23.6; qp study guide 16 @24.6 | Observe; not Bing-lab gold |

**Implication:** Bing is converting **thin-SERP wave mocks** Google has not adopted. Google’s volume sits on **CFA L1 / FRM / Series 7 / ServSafe** with impressions and almost no clicks. Mixing those two lists into one rewrite queue is how we churn the wrong URLs.

**Next measurement (not a content pass):** Bing Webmaster Tools → query×page 28d/90d into `tmp/bing-export-YYYY-MM-DD/` (needs API key; none in repo). Pulse Top pages (Bing) after the 2026-10-06 channel split. Then fill Bing pos vs Google pos. No page rewrites from this table.

## Four SEO layers (locked 2026-10-06)

Do **not** treat 124 decks + 153 mocks as “Google is ignoring a 277-page farm.” Those are **layer 1–2**. Sitewide quality is unproven until layer 3 (index) is counted.

| Layer | Count (2026-10-06) | Source |
|---|---:|---|
| 1 Catalog | 124 available decks · mocks live/waitlist as configs | `decks.ts` / mock configs |
| 2 SEO URL | **333** in Google sitemap (153 mock + 124 deck + 23 vertical + 9 money blog + 11 comic + hubs) | live `/sitemap.xml` |
| 3 Index | **sample only** (URL Inspection API) | not in `gsc:export` Performance |
| 4 Performance 90d | 202 page rows (169 overlap sitemap; 33 GSC-only, mostly citizenship blogs we already dropped from sitemap) | `tmp/gsc-export-2026-10-05/pages-90d.csv` |

Repeat: `npm run gsc:export` then `npm run gsc:url-layers` (`--inspect=/path` for Coverage on a sample). Ledger: `tmp/gsc-export-*/URL_LAYERS.md`.

### Layer 2 × 4 (sitemap vs pages-90d)

| class | sitemap | in GSC pages | no perf row | clicks | pos 1–10 0c | 11–25 0c | 26–50 0c | 51+ 0c |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| home | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| hub-other | 12 | 9 | 3 | 0 | 2 | 1 | 6 | 0 |
| mock | 153 | 76 | 77 | 0 | 19 | 14 | 27 | 16 |
| mock-vertical | 23 | 8 | 15 | 0 | 7 | 1 | 0 | 0 |
| deck | 124 | 65 | 59 | 8 | 9 | 14 | 24 | 10 |
| blog (sitemap money) | 9 | 8 | 1 | 0 | 1 | 0 | 4 | 3 |
| comic | 11 | 2 | 9 | 0 | 2 | 0 | 0 | 0 |

**NO_PERF_ROW ≠ not indexed.** Inspection 2026-10-06: `/mock-exams/ascp-mlt-readiness-check` has **no** GSC page row and is **Submitted and indexed**.

### Layer 3 sample (URL Inspection, 2026-10-06)

| URL | Coverage | Last crawl | Layer 4 90d |
|---|---|---|---|
| `/` | Submitted and indexed | 2026-09-30 | 3 clicks / 82 impr @ 31.6 |
| CFA L1 mock | Submitted and indexed | 2026-09-20 | 0 / **164** @ 17.5 → ranking/snippet, not discovery |
| SIE full mock | **Discovered — currently not indexed** | — | Layer C wait still correct |
| MLS mock | Submitted and indexed | 2026-08-28 (pre-rewrite) | 0 / 2 @ 6.0 |
| MLT mock | Submitted and indexed | 2026-08-28 | no perf row |
| Series 7 deck | Submitted and indexed | 2026-09-12 | 0 / 17 @ 20.2 (`series 7 flashcards` @ 12.5) |
| Series 63 deck | Submitted and indexed | 2026-09-17 | 1 / 17 @ 33.4 |
| PTCB study guide | Submitted and indexed | 2026-10-05 | 1 / 20 @ 15.7 |

Money pages Google *does* know are mostly **indexed + weak rank/CTR**. The SIE mock is the known discovery hole. Full Page indexing totals still needed from GSC UI for Scenario A/B/C sitewide.

### What this does to the diagnosis

| Status | Meaning here |
|---|---|
| Indexed + 0 impr (MLT) | relevance / demand / query targeting — not “Google never saw it” |
| Indexed + pos ~12–25 + 0 clicks (CFA L1, FRM, Series 7) | understands the URL; does not pick it / snippet fails |
| Discovered not indexed (SIE mock) | crawl/index selection — **do not** weekly title-churn |
| Crawled not indexed | still the strengthen-now rule on money URLs; **not seen** on this 8-URL sample |
| Catalog size | **not a proven sitewide penalty** |

P1 leftover: template sameness and fact drift (CA 400→250 overlay fixed in repo, unshipped). P2 backlinks still unmeasured.

## URL class actions (KEEP / NOINDEX / CONSOLIDATE / BOOST)

Already in code (do not redo):

- **NOINDEX:** state-RE mocks except CA/FL/TX/NY; planned/waitlist decks; GEO `/*.md`; Googlebot `?utm_source=llm`; legal/contact/llms out of sitemap; citizenship blogs out of sitemap.
- **Homepage:** 8 acquisition mocks + 4 pillars. Catalog is collapsed `<details>` below the fold.
- **Do not** build `/exams/{slug}/` or `/finance/cfa/…` until Layer B proves demand.
- **Do not** mass-noindex Bing-converting wave mocks.

| Class | Action | Why |
|-------|--------|-----|
| Layer B allowlist + Series 7 flashcards | **BOOST** | GSC-attributed commercial queries |
| CFA L1 / FRM mocks (indexed, impr, 0 clicks) | **KEEP INDEXED** | Performance problem, not index |
| DELF/CELI decks | **KEEP INDEXED** | Only real Google clicks |
| Bing-converting wave mocks | **KEEP INDEXED** | Lab URLs |
| SIE mock | **KEEP** sitemap + internal links; **no title churn** | Discovered not indexed |
| Remaining state-RE swarm | **NOINDEX** (already) | Thin |
| Planned Anki | **NOINDEX** (already) | Not for sale |
| Citizenship blogs | **CONSOLIDATE** | Live, out of Google sitemap; several still get GSC impr @ pos 50–80 |
| `/about` | **BOOST** when shipped | Publisher / methodology |

## Run log

### 2026-10-06 — Four-layer index audit (not catalog size)

**Why:** Sitewide “too many pages” was not proven. Inspection sample: money URLs Submitted and indexed except SIE mock = Discovered not indexed. CFA L1 = indexed + 164 impr 0 clicks. MLT = indexed + no Performance row.  
**Shipped (repo):** `npm run gsc:url-layers`; strategy layers 1–4; CA 250 overlay + `/about` still unpushed.  
**Pause:** no mass noindex; no SIE title churn; no `/finance/` URL tree.

### 2026-10-06 — Bing lab lock (no page rewrites)

**Why:** Bing already sends mock:starts; Google 90d still ~14 clicks. Risk was treating Bing as a second SEO track or rewriting Google impression URLs because Bing converts elsewhere.  
**Shipped:** on-site `bing` channel in pulse (commit `9d338f0`). Strategy: Bing = validation, Google = scale; gold-mine query×page blocked until Webmaster export.  
**Pause:** no MLS/CDA/SPI title churn; no CFA/FRM CTR rewrites off allowlist.

### 2026-10-05 — Layer B: Series 7 flashcards (GSC pos 12.5)

**Why:** Fresh `gsc:export` 2026-10-05. Only commercial query already on page 2 is `series 7 flashcards` → `/decks/series-7-anki-deck` (6 impr / 28d @ 12.5). Series 63 flashcards still ~57. PTCB guide page-pos 4.3 is still junk `yes`. Indexing already done by hand — no mass Request indexing.
**Shipped:** Series 7 title/H1/directAnswer/FAQ/money copy → flashcards; FINRA related-rail SIE↔7↔63; PTCB mock intro points outline queries to the 2026 PDF.
**Pause:** still no hub tree / catalog dump.
**Next:** 14d GSC — if Series 7 pos ≤10, deepen 7→63 internal links only.

### 2026-09-24 — Pause until ~2026-10-01

**Why:** Wave 1 funnel + homepage shorten + GSC wedge lock shipped to prod; need 14d GSC signal before more Layer B churn.  
**Shipped (live):** diagnostic CTAs · 8-exam homepage · Series 63 flashcards SEO · PTCB outline 2026 guide SEO · `npm run gsc:export`.  
**Pause:** no new SKUs, hubs, mass blogs, or weekly title churn.  
**Resume ~2026-10-01:** `npm run gsc:export` → compare Series 63 / PTCB guide attributed impr + pos.

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
