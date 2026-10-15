# SKU quality plan: Nov 2026 – Jan 2027

Generated 2026-10-15 by `python3 scripts/sku-quality-plan.py` from `sku-status.json` (2026-10-15). Re-run after each week; the board is the source of truth for status.

## Scope

- **124 mock + Anki pairs** to bring to `ok`: 33 with a live deck, 91 planned. 7800 new items to write, 8428 existing to review.
- **0 duplicate SKUs** (same exam sold twice) → merge/redirect decision in week 1, not a rewrite: .
- **19 civic banks** (official question pools): check against the current official source, fix drift.
- **37 standalone products** (survival-guide apps, PDFs, formula sheets, bundles, Bench Energy): copy, facts, samples and checkout audit.
- **19 Prep2Go language decks** never audited (DB text → apkg → Gumroad/Lemon); Norwegian, Swedish, Greek, Czech and Danish first (already queued).

Done = board status `ok`: 0 FAIL, no padding, bank ≥ floor (120 for a 60Q session, 2× session above that), a dated content-review row in the ledger; live decks rebuilt, Gumroad file + samples replaced, push + live check.

## Traffic priority (top of the queue, snapshot 2026-10-15)

Work these first, in this order, before anything in the weekly table. Unique visitors all-time from our Redis analytics (Vercel Analytics is not connected); the numbers are tiny and may include the owner's own visits. Status is live from the board.

**Mock started at least once, status not `ok`:**

| # | Mock | Status now | Deck | Starts | Mock views | Deck views |
|---:|---|---|---|---:|---:|---:|
| 1 | `ascp-mls-readiness-check` | ok | planned | 3 | 7 | 1 |
| 2 | `rd-exam-readiness-check` | small-bank | live | 2 | 6 | 7 |
| 3 | `veterinary-assistant-readiness-check` | ok | planned | 2 | 10 | 1 |
| 4 | `nha-cbcs-readiness-check` | ok | planned | 2 | 5 | 2 |
| 5 | `aama-cma-readiness-check` | ok | planned | 2 | 4 | 1 |
| 6 | `aha-bls-provider-readiness-check` | ok | planned | 2 | 3 | 2 |
| 7 | `medication-aide-readiness-check` | ok | planned | 2 | 3 | 2 |
| 8 | `nremt-emt-readiness-check` | ok | planned | 1 | 7 | 3 |
| 9 | `fl-real-estate-readiness-check` | rewrite | live | 1 | 4 | 2 |
| 10 | `ascp-mlt-readiness-check` | small-bank | planned | 1 | 5 | 1 |
| 11 | `barber-state-readiness-check` | small-bank | planned | 1 | 3 | 3 |
| 12 | `al-real-estate-readiness-check` | rewrite | live | 1 | 3 | 2 |
| 13 | `nha-cpct-readiness-check` | rewrite | live | 1 | 3 | 2 |
| 14 | `cda-childcare-readiness-check` | small-bank | planned | 1 | 4 | 1 |
| 15 | `medical-billing-specialist-readiness-check` | rewrite | planned | 1 | 3 | 1 |
| 16 | `rbt-behavior-technician-readiness-check` | rewrite | planned | 1 | 3 | 1 |
| 17 | `mblex-readiness-check` | rewrite | planned | 1 | 2 | 1 |
| 18 | `nha-cmaa-readiness-check` | rewrite | planned | 1 | 2 | 1 |
| 19 | `nremt-aemt-readiness-check` | rewrite | planned | 1 | 2 | 1 |
| 20 | `capm-readiness-check` | small-bank | planned | 1 | 2 | 1 |
| 21 | `wastewater-operator-1-readiness-check` | small-bank | planned | 1 | 2 | 1 |

**No mock start, but ≥ 5 views (mock + deck):**

| # | Mock | Status now | Deck | Views |
|---:|---|---|---|---:|
| 22 | `cscs-nsca-readiness-check` | rewrite | planned | 10 |
| 23 | `ashrae-certifications-readiness-check` | rewrite | live | 9 |
| 24 | `bms-bas-readiness-check` | rewrite | live | 8 |
| 25 | `six-sigma-green-belt-readiness-check` | rewrite | planned | 8 |
| 26 | `california-real-estate-readiness-check` | rewrite | live | 7 |
| 27 | `property-casualty-insurance-readiness-check` | rewrite | live | 7 |
| 28 | `nclex-rn-readiness-check` | rewrite | planned | 7 |
| 29 | `cfp-certification-readiness-check` | rewrite | live | 6 |
| 30 | `mrics-readiness-check` | rewrite | live | 6 |
| 31 | `series-65-readiness-check` | rewrite | live | 6 |
| 32 | `cdl-general-knowledge-readiness-check` | rewrite | planned | 6 |
| 33 | `electrical-journeyman-readiness-check` | small-bank | planned | 6 |
| 34 | `series-79-readiness-check` | rewrite | live | 5 |
| 35 | `nsca-cpt-readiness-check` | small-bank | planned | 5 |

**Deck pages with views but 0 checkout intent** (also check the deck page / Gumroad pitch, not only the bank): `rd-exam-anki-deck` (7), `six-sigma-green-belt-anki-deck` (5), `ashrae-certifications-anki-deck` (4), `bms-bas-anki-deck` (4), `california-real-estate-anki-deck` (4), `electrical-journeyman-anki-deck` (4).

Other non-`ok` SKUs with traffic had 1–4 views (mostly state real estate and CDL): noise, normal queue.

## Weekly rhythm

Mon: chunk + launch writers in parallel (one per 60-item bank, two per big bank) · Tue–Wed: merge, gates, ops, cascade for live decks · Thu: side track (civic / products / Prep2Go) · Fri: ledger rows, `npm run sku:status`, one push, live check, re-run this plan.

Even load: ~924 effort units per week (1 unit = 1 new item or 2 reviewed items).

## Weeks

| Week of | Theme | Mocks (→ bank target) | Effort | Side track |
|---|---|---|---:|---|
| 02 Nov | Traffic priority · merge decision on duplicates | `rd-exam` 🟢 →240, `fl-real-estate` 🟢 →120, `ascp-mlt` →120, `barber-state` →120, `al-real-estate` 🟢 →120, `nha-cpct` 🟢 →240, `cda-childcare` →120, `medical-billing-specialist` →120, `rbt-behavior-technician` →120 | 990 | civic: `australian-citizenship-readiness-check`, civic: `belgium-flanders-mo-readiness-check`, product: `cfa-level-1-formula-reference-2026`, product: `australia-survival-guide-prep2go-app`, product: `bench-energy-coal-trader-anki-deck`, Prep2Go deck: `czech-a2-cce-anki-deck`, Prep2Go deck: `danish-a2-prove-i-dansk-anki-deck` |
| 09 Nov | Traffic priority | `mblex` →120, `nha-cmaa` →120, `nremt-aemt` →120, `capm` →120, `wastewater-operator-1` →120, `cscs-nsca` →120, `ashrae-certifications` 🟢 →250, `bms-bas` 🟢 →120, `six-sigma-green-belt` →120, `california-real-estate` 🟢 →120 | 935 | civic: `belgium-wallonie-citoyennete-readiness-check`, product: `bench-energy-metal-trader-anki-deck`, product: `bench-energy-oil-trader-anki-deck`, product: `canada-survival-guide-prep2go-app`, Prep2Go deck: `greek-a2-ellinomatheia-anki-deck` |
| 16 Nov | Traffic priority | `property-casualty-insurance` 🟢 →120, `nclex-rn` →120, `cfp-certification` 🟢 →240, `mrics` 🟢 →250, `series-65` 🟢 →240, `cdl-general-knowledge` →120, `electrical-journeyman` →120, `series-79` 🟢 →240 | 1025 | civic: `canadian-citizenship-readiness-check`, civic: `ccse-espana-readiness-check`, product: `cat4-level-d-anki-deck-printable-pdf`, product: `cfa-level-2-formula-reference-2026`, product: `commodity-trader-pack-bundle`, Prep2Go deck: `norwegian-a2-norskprove-anki-deck`, Prep2Go deck: `swedish-a2-sfi-anki-deck` |
| 23 Nov | Traffic priority / Finance (live) | `nsca-cpt` →120, `series-6` 🟢 →240, `series-66` 🟢 →240, `series-99` 🟢 →240, `enrolled-agent` 🟢 →240 | 810 | civic: `czech-citizenship-readiness-check`, product: `delf-prim-printable-french-flashcards`, product: `germany-survival-guide-prep2go-app`, product: `ib-biology-sl-anki-deck`, Prep2Go deck: `celi-b1-italian-anki-deck` |
| 30 Nov | Other live / Live state real estate | `ny-real-estate` 🟢 →120, `real-estate-appraiser` 🟢 →120, `us-citizenship` 🟢 →128, `ak-real-estate` 🟢 →120, `ar-real-estate` 🟢 →120, `az-real-estate` 🟢 →120, `co-real-estate` 🟢 →120, `ga-real-estate` 🟢 →120, `il-real-estate` 🟢 →120, `ma-real-estate` 🟢 →120 | 874 | civic: `denmark-indfoedsretsproeven-readiness-check`, civic: `leben-in-deutschland-readiness-check`, product: `japan-survival-guide-prep2go-app`, product: `netherlands-survival-guide-prep2go-app`, product: `portugal-survival-guide-prep2go-app`, Prep2Go deck: `ciple-a2-european-portuguese-anki-deck`, Prep2Go deck: `ciple-a2-grammar-anki-deck` |
| 07 Dec | Live state real estate / Health | `mi-real-estate` 🟢 →120, `nc-real-estate` 🟢 →120, `nj-real-estate` 🟢 →120, `oh-real-estate` 🟢 →120, `pa-real-estate` 🟢 →120, `va-real-estate` 🟢 →120, `wa-real-estate` 🟢 →120, `aapc-cpc` →120, `aspt-phlebotomy` →120, `crcst` →120, `danb-gc` →120 | 990 | civic: `life-in-the-uk-readiness-check`, product: `ptcb-study-guide-2026`, product: `saudi-arabia-survival-guide-prep2go-app`, product: `servsafe-manager-complete-study-guide`, Prep2Go deck: `dele-a2-grammar-anki-deck` |
| 14 Dec | Health | `danb-ice` →120, `first-aid-cpr` →120, `nbstsa-cst` →120, `nclex-pn` →120, `nha-ccma` →120, `nha-cpt-phlebotomy` →120, `nnaap-cna` →120, `nremt-paramedic` →120, `physical-therapy-aide` →120, `precision-nutrition-l1` →120 | 900 | civic: `luxembourg-vivre-ensemble-readiness-check`, civic: `naturalisation-francaise-readiness-check`, product: `singapore-survival-guide-prep2go-app`, product: `south-africa-survival-guide-prep2go-app`, Prep2Go deck: `dele-a2-spanish-anki-deck`, Prep2Go deck: `delf-a2-printable-french-flashcards` |
| 21 Dec | Health / CDL / Trades & safety | `veterinary-technician-vtne` →120, `cdl-air-brakes` →120, `cdl-combination` →120, `cdl-doubles-triples` →120, `cdl-hazmat` →120, `cdl-passenger` →120, `cdl-tankers` →120, `alcohol-server` →120, `forklift-operator` →120, `funeral-service-arts` →120 | 900 | civic: `naturalisation-suisse-readiness-check`, product: `uae-survival-guide-prep2go-app`, product: `uk-survival-guide-prep2go-app`, product: `us-adaptation-english-prep2go-app`, Prep2Go deck: `delf-b2-french-anki-deck` |
| 28 Dec | Trades & safety / Fitness, HR, PM, education | `nate-core` →120, `notary-public` →120, `osha-10-general` →120, `plumbing-journeyman` →120, `servsafe-food-handler` →120, `unarmed-security-officer` →120, `water-treatment-operator-1` →120, `aswb-bachelors` →120, `aswb-clinical` →120, `aswb-masters` →120 | 900 | civic: `naturalizzazione-svizzera-readiness-check`, civic: `norway-statsborgerproven-readiness-check`, product: `arabic-survival-phrases-anki-deck`, product: `australian-citizenship-prep2go-app`, product: `canadian-citizenship-prep2go-app`, Prep2Go deck: `delf-b2-grammar-anki-deck`, Prep2Go deck: `dutch-a2-inburgering-anki-deck` |
| 04 Jan | Fitness, HR, PM, education / Beauty / State real estate (planned) | `phr-hrci` →120, `praxis-core` →120, `praxis-elementary-education` →120, `praxis-special-education` →120, `cosmetology-state` →120, `esthetician-state` →120, `nail-technician-state` →120, `ct-real-estate` →120, `de-real-estate` →120, `hi-real-estate` →120, `ia-real-estate` →120 | 990 | civic: `polish-citizenship-readiness-check`, product: `cfa-level-1-formula-deck`, product: `citizenship-naturalization-anki-bundle`, product: `japanese-survival-phrases-anki-deck`, Prep2Go deck: `german-a2-anki-deck` |
| 11 Jan | State real estate (planned) | `id-real-estate` →120, `in-real-estate` →120, `ks-real-estate` →120, `ky-real-estate` →120, `la-real-estate` →120, `md-real-estate` →120, `me-real-estate` →120, `mn-real-estate` →120, `mo-real-estate` →120, `ms-real-estate` →120 | 900 | civic: `portugal-nacionalidade-readiness-check`, civic: `sweden-medborgarskapsprov-readiness-check`, product: `korean-survival-phrases-anki-deck`, product: `leben-in-deutschland-prep2go-app`, product: `life-in-the-uk-prep2go-app`, Prep2Go deck: `german-a2-for-russian-speakers-anki-deck`, Prep2Go deck: `german-a2-for-ukrainian-speakers-anki-deck` |
| 18 Jan | State real estate (planned) | `mt-real-estate` →120, `nd-real-estate` →120, `ne-real-estate` →120, `nh-real-estate` →120, `nm-real-estate` →120, `nv-real-estate` →120, `ok-real-estate` →120, `or-real-estate` →120, `ri-real-estate` →120, `sc-real-estate` →120 | 900 | civic: `swiss-citizenship-readiness-check`, product: `naturalisation-francaise-prep2go-app`, product: `russian-survival-phrases-anki-deck`, product: `spanish-italian-paired-anki-deck`, Prep2Go deck: `ielts-toefl-english-for-arabic-speakers-anki-deck` |
| 25 Jan | State real estate (planned) / Other planned | `sd-real-estate` →120, `tn-real-estate` →120, `ut-real-estate` →120, `vt-real-estate` →120, `wi-real-estate` →120, `wv-real-estate` →120, `wy-real-estate` →120, `issa-cpt` →120, `nabcep-associate` →120, `nbdhe` →120 | 900 | civic: `finland-kansalaisuuskoe-readiness-check`, product: `swiss-citizenship-anki-deck`, product: `us-citizenship-test-prep2go-app`, Prep2Go deck: `ielts-toefl-english-for-portuguese-speakers-anki-deck` |

🟢 = deck live on Gumroad (rebuild apkg, replace file, refresh samples in the same week).

## Rules that do not change

- Work rows go into `bank-audit-ledger.md` the same day (In progress → Done) and `npm run sku:status` after.
- Wave decks: after a rebuild check the Anki Generator spec `cardCount` matches the site spec before `replace-gumroad-apkg-files.mjs` (it reads the vault spec).
- Tier A SEO wedges and freeze rules from `seo-dual-track-top.mdc` still apply: bank quality ≠ new SEO churn.
- Holiday weeks (21 Dec, 28 Dec) carry the same load; if they slip, the next week absorbs them and the plan is re-run.
