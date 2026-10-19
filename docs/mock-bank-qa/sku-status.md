# SKU status board

Generated 2026-10-19 by `npm run sku:status` from the live mock configs, the git bank exports, `audit:bank-quality` and the dated rows in `bank-audit-ledger.md`. Do not edit by hand: add a ledger row for the work, then re-run.

Status: **ok** = 0 FAIL gates, no padding, bank at floor, content review in the ledger · **thin-bank** = clean and reviewed but bank below the 2× floor · **unreviewed** = mechanically clean, never content-reviewed · **small-bank** = clean gates but the unique bank is too small for Mock Pass retakes (60-from-60, 75-from-75…) · **point-fix** = FAIL gates on ≤10% of items (or ≤6), fixable in place · **civic** = citizenship test built on the official question pool (separate standard; never rebuilt from mock fixes; gates shown for reference) · **rewrite** = FAIL on >10% of items, a bank-level FAIL (key bias, longest-correct rate) or length padding. Small banks also list “bank N for NQ session” under issues.

| Status | SKUs | with live Anki |
|---|---|---|
| ok | 56 | 34 |
| thin-bank | 0 | 0 |
| unreviewed | 0 | 0 |
| small-bank | 20 | 1 |
| point-fix | 0 | 0 |
| rewrite | 101 | 29 |
| civic | 19 | 18 |
| **total live mocks** | **196** | **82** |

Products without a mock and catalog totals: bottom of this file.

## Live mocks (+ linked Anki)

| Status | Mock | Anki | Session / bank | Last work | Issues |
|---|---|---|---|---|---|
| rewrite | `ak-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `al-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ar-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ashrae-certifications-readiness-check` | live | 50 / 250 | — | FAIL (31 items): template/thin distractor notes, thin/template explanations; no content review in ledger |
| rewrite | `az-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `bms-bas-readiness-check` | live | 60 / 60 | — | FAIL (182 items): near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `california-real-estate-readiness-check` | live | 60 / 60 | 2026-10-15 | FAIL (33 items): duplicate prompts, near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations, distractor; bank 60 for 60Q session |
| rewrite | `cfp-certification-readiness-check` | live | 120 / 120 | — | FAIL (33 items): near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `co-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `enrolled-agent-readiness-check` | live | 120 / 120 | — | FAIL (13 items): template/thin distractor notes, thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `ga-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `il-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ma-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `mi-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nc-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (20 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nha-cpct-readiness-check` | live | 120 / 120 | — | FAIL (21 items): near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `nj-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (17 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `oh-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (14 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `pa-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `property-casualty-insurance-readiness-check` | live | 60 / 60 | 2026-10-15 | FAIL (69 items): near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations, distractor; bank 60 for 60Q session |
| rewrite | `real-estate-appraiser-readiness-check` | live | 60 / 60 | 2026-10-05 | FAIL (51 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session |
| rewrite | `series-6-readiness-check` | live | 120 / 120 | — | FAIL (18 items): thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `series-65-readiness-check` | live | 120 / 120 | 2026-10-15 | FAIL (28 items): template/thin distractor notes, thin/template explanations; bank 120 for 120Q session |
| rewrite | `series-66-readiness-check` | live | 120 / 120 | 2026-10-15 | FAIL (25 items): template/thin distractor notes, thin/template explanations; bank 120 for 120Q session |
| rewrite | `series-79-readiness-check` | live | 120 / 120 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `series-99-readiness-check` | live | 120 / 120 | — | FAIL (17 items): near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations; bank 120 for 120Q session; no content review in ledger |
| rewrite | `us-citizenship-readiness-check` | live | 30 / 128 | — | FAIL (120 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| rewrite | `va-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `wa-real-estate-readiness-check` | live | 60 / 60 | — | FAIL (20 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `aapc-cpc-readiness-check` | planned | 60 / 60 | — | FAIL (5 items + bank-level): duplicate prompts, near-duplicate / templated stems (>=0.8), template/thin distractor notes, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `alcohol-server-readiness-check` | planned | 60 / 60 | — | FAIL (55 items + bank-level): template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `aspt-phlebotomy-readiness-check` | planned | 60 / 60 | — | FAIL (60 items): distractor; bank 60 for 60Q session; no content review in ledger |
| rewrite | `aswb-masters-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-air-brakes-readiness-check` | planned | 60 / 60 | — | FAIL (45 items + bank-level): template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-combination-readiness-check` | planned | 60 / 60 | — | FAIL (45 items): thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-doubles-triples-readiness-check` | planned | 60 / 60 | — | FAIL (42 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-general-knowledge-readiness-check` | planned | 60 / 60 | — | FAIL (0 items + bank-level): each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-hazmat-readiness-check` | planned | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-passenger-readiness-check` | planned | 60 / 60 | — | FAIL (26 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cdl-tankers-readiness-check` | planned | 60 / 60 | — | FAIL (51 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `cosmetology-state-readiness-check` | planned | 60 / 60 | — | FAIL (8 items): template/thin distractor notes; bank 60 for 60Q session; no content review in ledger |
| rewrite | `crcst-readiness-check` | planned | 60 / 60 | — | FAIL (16 items + bank-level): template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `cscs-nsca-readiness-check` | planned | 60 / 60 | — | FAIL (60 items): distractor; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ct-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `danb-gc-readiness-check` | planned | 60 / 60 | — | FAIL (7 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `danb-ice-readiness-check` | planned | 60 / 60 | — | FAIL (14 items): duplicate prompts, near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `de-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `esthetician-state-readiness-check` | planned | 60 / 60 | — | FAIL (13 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `first-aid-cpr-readiness-check` | planned | 60 / 60 | — | FAIL (58 items): template/thin distractor notes, thin/template explanations, boilerplate stem wrappers; bank 60 for 60Q session; no content review in ledger |
| rewrite | `forklift-operator-readiness-check` | planned | 60 / 60 | — | FAIL (57 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `funeral-service-arts-readiness-check` | planned | 60 / 60 | — | FAIL (53 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `hi-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ia-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (14 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `id-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (15 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `in-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `issa-cpt-readiness-check` | planned | 60 / 60 | — | FAIL (30 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ks-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ky-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `la-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (20 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `mblex-readiness-check` | planned | 60 / 60 | — | FAIL (22 items + bank-level): duplicate prompts, near-duplicate / templated stems (>=0.8), template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `md-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (17 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `me-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `medical-billing-specialist-readiness-check` | planned | 60 / 60 | — | FAIL (7 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `mn-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `mo-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ms-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (14 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `mt-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nabcep-associate-readiness-check` | planned | 60 / 60 | — | FAIL (57 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nbdhe-readiness-check` | planned | 60 / 60 | — | FAIL (16 items + bank-level): template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `nbstsa-cst-readiness-check` | planned | 60 / 60 | — | FAIL (17 items + bank-level): duplicate prompts, template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `nclex-pn-readiness-check` | planned | 60 / 60 | — | FAIL (14 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nclex-rn-readiness-check` | planned | 60 / 60 | — | FAIL (12 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nd-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ne-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nh-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nha-cmaa-readiness-check` | planned | 60 / 60 | — | FAIL (20 items + bank-level): template/thin distractor notes, thin/template explanations, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| rewrite | `nha-cpt-phlebotomy-readiness-check` | planned | 60 / 60 | — | FAIL (10 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nm-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nnaap-cna-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `notary-public-readiness-check` | planned | 60 / 60 | — | FAIL (50 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nremt-aemt-readiness-check` | planned | 60 / 60 | — | FAIL (8 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nremt-paramedic-readiness-check` | planned | 60 / 60 | — | FAIL (7 items): duplicate prompts, template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `nv-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ok-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `or-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (16 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `osha-10-general-readiness-check` | planned | 60 / 60 | — | FAIL (49 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `praxis-core-readiness-check` | planned | 60 / 60 | 2026-10-04 | FAIL (0 items + bank-level): correct; bank 60 for 60Q session |
| rewrite | `praxis-elementary-education-readiness-check` | planned | 60 / 60 | — | FAIL (44 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `rbt-behavior-technician-readiness-check` | planned | 60 / 60 | — | FAIL (48 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ri-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `sc-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `sd-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (21 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `six-sigma-green-belt-readiness-check` | planned | 60 / 60 | — | FAIL (60 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `tn-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `ut-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (20 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `veterinary-technician-vtne-readiness-check` | planned | 60 / 60 | 2026-10-15 | FAIL (13 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session |
| rewrite | `vt-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `water-treatment-operator-1-readiness-check` | planned | 60 / 60 | — | FAIL (59 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `wi-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (17 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `wv-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (19 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| rewrite | `wy-real-estate-readiness-check` | planned | 60 / 60 | — | FAIL (18 items): template/thin distractor notes, thin/template explanations; bank 60 for 60Q session; no content review in ledger |
| small-bank | `ny-real-estate-readiness-check` | live | 60 / 60 | — | bank 60 for 60Q session; no content review in ledger |
| small-bank | `ascp-mlt-readiness-check` | planned | 60 / 60 | 2026-10-18 | bank 60 for 60Q session |
| small-bank | `aswb-bachelors-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `aswb-clinical-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `barber-state-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `capm-readiness-check` | planned | 60 / 60 | — | bank 60 for 60Q session; no content review in ledger |
| small-bank | `cda-childcare-readiness-check` | planned | 60 / 60 | 2026-10-03 | bank 60 for 60Q session |
| small-bank | `electrical-journeyman-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `nail-technician-state-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `nate-core-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `nha-ccma-readiness-check` | planned | 60 / 60 | — | bank 60 for 60Q session; no content review in ledger |
| small-bank | `nsca-cpt-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `phr-hrci-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `physical-therapy-aide-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `plumbing-journeyman-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `praxis-special-education-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `precision-nutrition-l1-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `servsafe-food-handler-readiness-check` | planned | 60 / 60 | 2026-10-02 | bank 60 for 60Q session |
| small-bank | `unarmed-security-officer-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| small-bank | `wastewater-operator-1-readiness-check` | planned | 60 / 60 | 2026-10-04 | bank 60 for 60Q session |
| ok | `abo-optician-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `ace-cpt-readiness-check` | live | 60 / 300 | 2026-10-14 | — |
| ok | `acsm-cpt-readiness-check` | live | 60 / 120 | 2026-10-18 | — |
| ok | `ardms-spi-readiness-check` | live | 60 / 120 | 2026-10-18 | — |
| ok | `cdcp-readiness-check` | live | 40 / 250 | 2026-10-14 | — |
| ok | `cem-readiness-check` | live | 50 / 250 | 2026-10-15 | — |
| ok | `cfa-level-1-readiness-check` | live | 60 / 120 | 2026-10-18 | — |
| ok | `cfa-level-2-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `cfps-readiness-check` | live | 80 / 400 | 2026-10-14 | — |
| ok | `epa-608-readiness-check` | live | 40 / 200 | 2026-10-13 | — |
| ok | `fl-real-estate-readiness-check` | live | 60 / 120 | 2026-10-19 | — |
| ok | `frm-part-1-readiness-check` | live | 50 / 120 | 2026-10-18 | — |
| ok | `gmat-focus-readiness-check` | live | 45 / 200 | 2026-10-15 | — |
| ok | `gre-readiness-check` | live | 30 / 350 | 2026-10-18 | — |
| ok | `leed-ap-bd-c-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `leed-ap-om-readiness-check` | live | 60 / 120 | 2026-10-13 | — |
| ok | `leed-green-associate-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `life-and-health-insurance-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `medical-scribe-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `mortgage-loan-originator-readiness-check` | live | 120 / 240 | 2026-10-15 | — |
| ok | `mrics-quantity-surveying-readiness-check` | live | 50 / 250 | 2026-10-15 | — |
| ok | `mrics-readiness-check` | live | 50 / 250 | 2026-10-18 | — |
| ok | `nebosh-readiness-check` | live | 50 / 250 | 2026-10-14 | — |
| ok | `pmp-readiness-check` | live | 51 / 346 | 2026-10-15 | — |
| ok | `ptcb-pharmacy-technician-mock` | live | 90 / 180 | 2026-10-15 | — |
| ok | `rd-exam-readiness-check` | live | 120 / 240 | 2026-10-16 | — |
| ok | `sat-readiness-check` | live | 49 / 160 | 2026-10-02 | — |
| ok | `series-63-readiness-check` | live | 60 / 120 | 2026-10-15 | — |
| ok | `series-7-readiness-check` | live | 60 / 120 | 2026-10-16 | — |
| ok | `servsafe-manager-mock` | live | 90 / 180 | 2026-10-15 | — |
| ok | `sie-full-mock` | live | 75 / 150 | 2026-10-18 | — |
| ok | `sie-quick-diagnostic` | live | 25 / 150 | 2026-10-15 | — |
| ok | `tx-real-estate-readiness-check` | live | 60 / 120 | 2026-10-14 | — |
| ok | `well-ap-readiness-check` | live | 50 / 250 | 2026-10-13 | — |
| ok | `aama-cma-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `aapc-ccs-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `aha-bls-provider-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `amt-rma-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `armed-security-officer-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `ascp-mls-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `ccht-dialysis-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `cdl-school-bus-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `home-health-aide-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `medicare-counseling-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `medication-aide-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `nasm-cpt-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `nbrc-tmc-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `nha-cbcs-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `nremt-emr-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `nremt-emt-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `parapro-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `pest-control-applicator-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `pharmacy-technician-excpt-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| ok | `shrm-cp-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `shrm-scp-readiness-check` | planned | 60 / 120 | 2026-10-14 | — |
| ok | `veterinary-assistant-readiness-check` | planned | 60 / 120 | 2026-10-15 | — |
| civic | `australian-citizenship-readiness-check` | live | 60 / 199 | — | FAIL (176 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| civic | `belgium-flanders-mo-readiness-check` | live | 60 / 120 | 2026-10-06 | — |
| civic | `belgium-wallonie-citoyennete-readiness-check` | live | 60 / 60 | — | FAIL (0 items + bank-level): correct; bank 60 for 60Q session; no content review in ledger |
| civic | `canadian-citizenship-readiness-check` | live | 60 / 200 | — | FAIL (177 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| civic | `ccse-espana-readiness-check` | live | 60 / 60 | — | FAIL (45 items + bank-level): thin/template explanations, distractor, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `czech-citizenship-readiness-check` | live | 60 / 60 | — | FAIL (14 items + bank-level): correct, correct >40% longer than every distractor; bank 60 for 60Q session; no content review in ledger |
| civic | `denmark-indfoedsretsproeven-readiness-check` | live | 60 / 60 | — | FAIL (15 items + bank-level): template/thin distractor notes, thin/template explanations, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `leben-in-deutschland-readiness-check` | live | 60 / 296 | — | FAIL (279 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| civic | `life-in-the-uk-readiness-check` | live | 60 / 201 | — | FAIL (174 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| civic | `luxembourg-vivre-ensemble-readiness-check` | live | 40 / 168 | 2026-10-15 | — |
| civic | `naturalisation-francaise-readiness-check` | live | 60 / 200 | — | FAIL (145 items + bank-level): near-duplicate / templated stems (>=0.8), thin/template explanations, distractor, correct; no content review in ledger |
| civic | `naturalisation-suisse-readiness-check` | live | 60 / 60 | — | FAIL (41 items + bank-level): thin/template explanations, distractor, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `naturalizzazione-svizzera-readiness-check` | live | 60 / 60 | — | FAIL (33 items + bank-level): distractor, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `norway-statsborgerproven-readiness-check` | live | 60 / 60 | — | FAIL (38 items + bank-level): template/thin distractor notes, thin/template explanations, correct, correct >40% longer than every distractor; bank 60 for 60Q session; no content review in ledger |
| civic | `polish-citizenship-readiness-check` | live | 60 / 60 | — | FAIL (13 items + bank-level): correct, correct >40% longer than every distractor; bank 60 for 60Q session; no content review in ledger |
| civic | `portugal-nacionalidade-readiness-check` | live | 60 / 60 | — | FAIL (1 items + bank-level): thin/template explanations, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `sweden-medborgarskapsprov-readiness-check` | live | 60 / 60 | — | FAIL (13 items + bank-level): thin/template explanations, correct; bank 60 for 60Q session; no content review in ledger |
| civic | `swiss-citizenship-readiness-check` | live | 60 / 60 | — | FAIL (39 items + bank-level): thin/template explanations, distractor, correct, each key letter 15-35% (n>=40); bank 60 for 60Q session; no content review in ledger |
| civic | `finland-kansalaisuuskoe-readiness-check` | planned | 60 / 120 | 2026-10-09 | — |

## Catalog totals

| Line | Count |
|---|---|
| Live mocks | 196 |
| … with a live Anki / PDF pair | 82 |
| … with a planned Anki pair | 114 |
| Products without a mock (Anki, PDF, app, bundle) | 37 (available 23, planned 14) |
| Catalog decks total (`decks.ts`) | 232 (available 104) |
| Language decks moved to Prep2Go (Gumroad file, Lemon pending) | 27 |

Gaivota comics, Prep2Go mock packs and Pro live in the CIPLE repo and are not on this board.

## Products without a mock

No bank gates apply; status comes from the ledger only (**reviewed** = has a dated ledger row).

| Status | Product | Sale | Category | Format | Last work |
|---|---|---|---|---|---|
| reviewed | `cfa-level-1-formula-reference-2026` | available | finance | PDF | 2026-10-15 |
| reviewed | `cfa-level-2-formula-reference-2026` | available | finance | PDF | 2026-10-15 |
| unreviewed | `australia-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `bench-energy-coal-trader-anki-deck` | available | professional | .apkg | — |
| unreviewed | `bench-energy-metal-trader-anki-deck` | available | professional | .apkg | — |
| unreviewed | `bench-energy-oil-trader-anki-deck` | available | professional | .apkg | — |
| unreviewed | `canada-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `cat4-level-d-anki-deck-printable-pdf` | available | academic | .apkg | — |
| unreviewed | `commodity-trader-pack-bundle` | available | professional | .apkg | — |
| unreviewed | `delf-prim-printable-french-flashcards` | available | language | PDF | — |
| unreviewed | `germany-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `ib-biology-sl-anki-deck` | available | academic | .apkg | — |
| unreviewed | `japan-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `netherlands-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `portugal-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `ptcb-study-guide-2026` | available | professional | PDF | — |
| unreviewed | `saudi-arabia-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `servsafe-manager-complete-study-guide` | available | professional | PDF | — |
| unreviewed | `singapore-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `south-africa-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `uae-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `uk-survival-guide-prep2go-app` | available | immigration | App | — |
| unreviewed | `us-adaptation-english-prep2go-app` | available | immigration | App | — |
| unreviewed | `arabic-survival-phrases-anki-deck` | planned | language | .apkg | — |
| unreviewed | `australian-citizenship-prep2go-app` | planned | immigration | App | — |
| unreviewed | `canadian-citizenship-prep2go-app` | planned | immigration | App | — |
| unreviewed | `cfa-level-1-formula-deck` | planned | finance | .apkg | — |
| unreviewed | `citizenship-naturalization-anki-bundle` | planned | language | .apkg | — |
| unreviewed | `japanese-survival-phrases-anki-deck` | planned | language | .apkg | — |
| unreviewed | `korean-survival-phrases-anki-deck` | planned | language | .apkg | — |
| unreviewed | `leben-in-deutschland-prep2go-app` | planned | immigration | App | — |
| unreviewed | `life-in-the-uk-prep2go-app` | planned | immigration | App | — |
| unreviewed | `naturalisation-francaise-prep2go-app` | planned | immigration | App | — |
| unreviewed | `russian-survival-phrases-anki-deck` | planned | language | .apkg | — |
| unreviewed | `spanish-italian-paired-anki-deck` | planned | language | .apkg | — |
| unreviewed | `swiss-citizenship-anki-deck` | planned | language | .apkg | — |
| unreviewed | `us-citizenship-test-prep2go-app` | planned | immigration | App | — |

## Language decks sold on Prep2Go

Source of truth: Prep2Go app DB (audit there, then rebuild apkg + Gumroad). Old UniPrep2Go URLs 301 to the shop page.

| Status | Deck | Shop page | Last work |
|---|---|---|---|
| unreviewed | `celi-b1-italian-anki-deck` | https://www.prep2go.study/shop/celi-a2-anki-deck | — |
| unreviewed | `ciple-a2-european-portuguese-anki-deck` | https://www.prep2go.study/shop/ciple-a2-anki-deck | — |
| unreviewed | `ciple-a2-grammar-anki-deck` | https://www.prep2go.study/shop/deck/ciple-a2-grammar-anki-deck | — |
| unreviewed | `dele-a2-grammar-anki-deck` | https://www.prep2go.study/shop/deck/dele-a2-grammar-anki-deck | — |
| unreviewed | `dele-a2-spanish-anki-deck` | https://www.prep2go.study/shop/dele-a2-anki-deck | — |
| unreviewed | `delf-a2-printable-french-flashcards` | https://www.prep2go.study/shop/deck/delf-a2-printable-flashcards | — |
| unreviewed | `delf-b2-french-anki-deck` | https://www.prep2go.study/shop/delf-a2-anki-deck | — |
| unreviewed | `delf-b2-grammar-anki-deck` | https://www.prep2go.study/shop/deck/delf-b2-grammar-anki-deck | — |
| unreviewed | `dutch-a2-inburgering-anki-deck` | https://www.prep2go.study/shop/deck/inburgering-a2-anki-deck | — |
| unreviewed | `german-a2-anki-deck` | https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck | — |
| unreviewed | `german-a2-for-russian-speakers-anki-deck` | https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck | — |
| unreviewed | `german-a2-for-ukrainian-speakers-anki-deck` | https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck | — |
| unreviewed | `ielts-toefl-english-for-arabic-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-arabic-speakers-anki-deck | — |
| unreviewed | `ielts-toefl-english-for-portuguese-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-portuguese-speakers-anki-deck | — |
| reviewed | `czech-a2-cce-anki-deck` | https://www.prep2go.study/shop/deck/czech-cce-anki-deck | 2026-10-18 |
| reviewed | `danish-a2-prove-i-dansk-anki-deck` | https://www.prep2go.study/shop/deck/danish-prove-i-dansk-anki-deck | 2026-10-18 |
| reviewed | `dele-a2-ccse-spanish-citizenship-bundle` | https://www.prep2go.study/shop/dele-a2-anki-deck | 2026-10-15 |
| reviewed | `greek-a2-ellinomatheia-anki-deck` | https://www.prep2go.study/shop/deck/greek-ellinomatheia-anki-deck | 2026-10-18 |
| reviewed | `ielts-toefl-english-for-french-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-french-speakers-anki-deck | 2026-10-13 |
| reviewed | `ielts-toefl-english-for-russian-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-russian-speakers-anki-deck | 2026-10-13 |
| reviewed | `ielts-toefl-english-for-spanish-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-spanish-speakers-anki-deck | 2026-10-13 |
| reviewed | `ielts-toefl-english-for-turkish-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-turkish-speakers-anki-deck | 2026-10-13 |
| reviewed | `ielts-toefl-english-for-ukrainian-speakers-anki-deck` | https://www.prep2go.study/shop/deck/english-for-ukrainian-speakers-anki-deck | 2026-10-13 |
| reviewed | `norwegian-a2-norskprove-anki-deck` | https://www.prep2go.study/shop/deck/norwegian-norskprove-anki-deck | 2026-10-18 |
| reviewed | `polish-a2-certyfikat-anki-deck` | https://www.prep2go.study/shop/deck/polish-a2-certyfikat-anki-deck | 2026-10-18 |
| reviewed | `polish-a2-for-ukrainian-speakers-anki-deck` | https://www.prep2go.study/shop/deck/polish-a2-for-ukrainian-speakers-anki-deck | 2026-10-18 |
| reviewed | `swedish-a2-sfi-anki-deck` | https://www.prep2go.study/shop/deck/swedish-sfi-anki-deck | 2026-10-18 |
