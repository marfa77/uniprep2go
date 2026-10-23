# AnkiWeb LITE download ledger

Owner-table counts. Update on upload day and at day 14.

| Date | AnkiWeb title | FULL slug | Notes | Downloads | Thumbs | Search token checked | Decision |
|---|---|---|---:|---:|---|---|---|
| 2026-06-18 | CFA Level 2 — Application Deck (LITE · 50 cards) | `cfa-level-2-anki-deck` | 50 | 36 | 0/0 | `cfa` — listed, unrated, buried under megas | Keep; refresh copy/samples, no second L2 |
| 2026-02-27 | IB Biology SL (not ours) | — | — | 147 | 0/0 | school Anki culture | Ignore — different market |
| 2026-10-01 | prep2go language LITEs (8 rows) | language catalog | 50-ish | 0–3 | 0/0 | language hubs | **Do not add more language LITEs** |
| 2026-10-04 | PTCB PTCE — Application Deck (LITE · 40 cards) | `ptcb-pharmacy-technician-anki-deck` | 40 built (`out/ptcb/PTCB_PTCE_LITE_40.apkg`) | — | — | `ptcb` + `ptce` | Ready to upload — random-sample gate passed |
| 2026-10-04 | NASAA Series 63 — State Law Application (LITE · 40 cards) | `series-63-anki-deck` | 40 built (`out/finra/NASAA_Series_63_LITE_40.apkg`) | — | — | `NASAA` (`63` = no matches) | Ready to upload — random-sample gate passed |
| 2026-10-04 | — | `cfa-level-1-anki-deck` | blocked | — | — | `cfa` | **Hold.** FULL still glossary-heavy; only 34 sample-grade notes, quotas short (Ethics/FSA/Equity/Econ/Alts). Do not pad. |

## 2026-10-13 — Wave 2 (user override: 20 new LITEs incl. language + CFA L1)

User chose: 20 new LITEs on top of the live ones, mixed exam 40 + language 75, ship CFA L1 anyway. Exam LITEs link to `uniprep2go.study/decks/{slug}`, language LITEs to `prep2go.study/shop/deck/{slug}`. Every card reviewed by a Sol subagent; drop reasons + FULL-deck defects in each `out/ankiweb_lite/**/review_notes.md` (Anki Generator vault).

**Truncated Wave 1 shares fixed.** PTCB showed 16/40 notes, Series 63 5/40, CFA L2 43/50: notes with the same GUID sat in the FULL decks of the owner's collection, so the share only took what was in the LITE deck. Fix = move every LITE GUID's cards into the LITE deck (AnkiConnect `changeDeck`), sync, re-share from AnkiWeb Decks → Actions → Share (same shared ID kept, downloads kept). FRM / CFA L1 notes in the collection held old FULL text (import does not overwrite) → fields set to the reviewed apkg text before sharing. **Any new LITE whose FULL is in the collection needs the same move + field check before sharing.**

AnkiWeb limit: **20 shares per rolling 7 days** (re-shares count).

| Date | AnkiWeb title | Shared ID | Notes | Link | Decision |
|---|---|---|---:|---|---|
| 2026-10-13 | PTCB PTCE — Application Deck | 2141102959 | 40 (was 16) | `/decks/ptcb-pharmacy-technician-anki-deck` | Re-shared in place |
| 2026-10-13 | NASAA Series 63 — State Law Application | 155586680 | 40 (was 5) | `/decks/series-63-anki-deck` | Re-shared in place |
| 2026-10-13 | CFA Level 2 — Application Deck (LITE · 50 cards) | 1770928406 | 50 (was 43) | `/decks/cfa-level-2-anki-deck` | Re-shared; description rewritten (was homepage + "see support page"; dropped false "update in place" — only 7/50 GUIDs are in FULL) |
| 2026-10-13 | IB Biology SL: Comprehensive Active Recall Deck | 861911559 | 149 | `/decks/ib-biology-sl-anki-deck` + `/decks` | Re-shared; UniPrep2Go line + IBO disclaimer prepended, support page set; content unchanged |
| 2026-10-13 | FINRA Series 7 — Top-Off Application Deck (LITE · 40 cards) | 1403336707 | 40 | `/decks/series-7-anki-deck` | New |
| 2026-10-13 | FRM Part 1 — GARP Application Deck (LITE · 40 cards) | 1074067149 | 40 | `/decks/frm-part-1-anki-deck` | New |
| 2026-10-13 | PMP Exam — Situational Questions Deck, 2026 ECO | 1137285208 | 40 | `/decks/pmp-anki-deck` | New |
| 2026-10-13 | EPA 608 Certification — HVAC Core, Type I, II, III | 1880480673 | 40 | `/decks/hvac-epa-608-anki-deck` | New |
| 2026-10-13 | GRE General Test — Verbal and Quant Questions | 1542370664 | 40 | `/decks/gre-anki-deck` | New |
| 2026-10-13 | ACE CPT — Personal Trainer Exam Questions (LITE · 40 cards) | 917457205 | 40 | `/decks/ace-cpt-anki-deck` | New |
| 2026-10-13 | NMLS SAFE MLO — Mortgage Loan Originator Exam Questions | 602377818 | 40 | `/decks/mortgage-loan-originator-anki-deck` | New |
| 2026-10-13 | prep2go \| Swedish A2 (SFI) \| LITE — 75 words | 28098537 | 75 | `/shop/deck/swedish-sfi-anki-deck` | New |
| 2026-10-13 | prep2go \| Norwegian A2 (Norskprøven) \| LITE — 75 words | 1047237601 | 75 | `/shop/deck/norwegian-norskprove-anki-deck` | New |
| 2026-10-13 | prep2go \| Danish A2 (Prøve i Dansk 2 / 3) \| LITE — 75 words | 1156868768 | 75 | `/shop/deck/danish-prove-i-dansk-anki-deck` | New |
| 2026-10-13 | prep2go \| English A2 for Russian Speakers (IELTS / TOEFL) | 408269889 | 75 | `/shop/deck/english-for-russian-speakers-anki-deck` | New |
| 2026-10-13 | prep2go \| English A2 for Spanish Speakers (IELTS / TOEFL) | 322042136 | 75 | `/shop/deck/english-for-spanish-speakers-anki-deck` | New |
| 2026-10-13 | prep2go \| English A2 for Ukrainian Speakers (IELTS / TOEFL) | 1000025570 | 75 | `/shop/deck/english-for-ukrainian-speakers-anki-deck` | New |

## 2026-10-21 — Queued Wave 2 remainder shared

7-day share window free after 2026-10-13 batch. GUID placement checked (0 FULL overlap; LITE note/card counts match). Synced then shared from AnkiWeb Decks → Actions → Share.

| Date | AnkiWeb title | Shared ID | Notes | Link | Decision |
|---|---|---|---:|---|---|
| 2026-10-21 | prep2go \| Czech A2 (CCE) \| LITE — 75 words | 1201394527 | 75 | `/shop/deck/czech-cce-anki-deck` | New |
| 2026-10-21 | prep2go \| Greek A2 (Ellinomatheia) \| LITE — 75 words | 269318923 | 75 | `/shop/deck/greek-ellinomatheia-anki-deck` | New |
| 2026-10-21 | prep2go \| Polish A2 (Certyfikat) \| LITE — 75 words | 893808409 | 75 | `/shop/deck/polish-a2-certyfikat-anki-deck` | New |
| 2026-10-21 | prep2go \| Polish A2 for Ukrainian Speakers \| LITE — 75 words | 980092127 | 75 | `/shop/deck/polish-a2-for-ukrainian-speakers-anki-deck` | New |
| 2026-10-21 | WELL AP — WELL Accredited Professional Exam Questions (LITE · 40 cards) | 300274307 | 40 | `/decks/well-ap-anki-deck` | New |
| 2026-10-21 | GMAT Focus Edition — Quant, Verbal and Data Insights Questions (LITE · 35 cards) | 1060612604 | 35 | `/decks/gmat-focus-anki-deck` | New (SHORT — 5 verbal failed review) |
| 2026-10-21 | CFA Level 1 — Application Deck (LITE · 20 cards) | 1396158380 | 20 | `/decks/cfa-level-1-anki-deck` | New (SHORT — 20 of 40 failed review) |

**Queued:** none from Wave 2.

## 2026-10-21 — Fill share window (best money, no “LITE” in title)

Used remaining quota after morning Wave-2 remainder (7 earlier today → ~13 left; shipped 8). Titles omit the word LITE (conversion). GUID-move for L&H/P&C before share. Built new apkgs in Anki Generator `out/ankiweb_lite/exam/{lh,pc,acsm,nebosh,cdcp,ashrae,cem,cfps}/`.

| Date | AnkiWeb title | Shared ID | Notes | Link | Decision |
|---|---|---|---:|---|---|
| 2026-10-21 | Life and Health Insurance License Exam — Application Deck (40 cards) | 136812419 | 40 | `/decks/life-and-health-insurance-exam-anki-deck` | New — Tier A; FULL pool now eligible 239/250 |
| 2026-10-21 | Property and Casualty Insurance License Exam — Application Deck (35 cards) | 2017846740 | 35 | `/decks/property-casualty-insurance-exam-anki-deck` | New SHORT |
| 2026-10-21 | ACSM CPT — Certified Personal Trainer Exam Questions (40 cards) | 1585691937 | 40 | `/decks/acsm-cpt-anki-deck` | New |
| 2026-10-21 | NEBOSH International General Certificate — Exam Questions (40 cards) | 799301285 | 40 | `/decks/nebosh-anki-deck` | New |
| 2026-10-21 | CDCP — Certified Data Centre Professional Exam Questions (40 cards) | 1246465993 | 40 | `/decks/cdcp-anki-deck` | New |
| 2026-10-21 | ASHRAE Certifications — BEAP BEMP BCxP CHD OPMP Exam Questions (33 cards) | 634115319 | 33 | `/decks/ashrae-certifications-anki-deck` | New SHORT |
| 2026-10-21 | CEM — Certified Energy Manager Exam Questions (40 cards) | 711893526 | 40 | `/decks/cem-anki-deck` | New |
| 2026-10-21 | CFPS — Certified Fire Protection Specialist Exam Questions (40 cards) | 1123618605 | 40 | `/decks/cfps-anki-deck` | New |

**Today’s share count:** 7 (morning) + 8 (this batch) = **15 / 20** rolling window. ~5 left.

**Skipped for now (FULL below AnkiWeb sample-grade gate — scheduled in `docs/mock-bank-qa/daily-plan.md` § AnkiWeb LITE queue):** Digital SAT → 24.10 · ServSafe Manager → 29.10 · CA RE → 02.11 · LEED → 04.11 · CFP → 05.11 · Series 65 → 06.11 · Series 66 → 12.11. Do not share SHORT stubs; thicken FULL first, then LITE 40, title without the word LITE.

## 2026-10-23 — SIE LITE 40 ready (share pending)

FULL thickened (`sie_300_authored.csv` + backup `sie_300_authored.csv.bak-2026-10-23-thicken`): length patches + SIE-1/4 definition front rewrites. Eligible **151/300** (was 37). Built `out/ankiweb_lite/exam/sie/SIE_LITE_40.apkg` (6/18/12/4 quotas, not SHORT).

| Date | AnkiWeb title | Shared ID | Notes | Link | Decision |
|---|---|---|---:|---|---|
| 2026-10-23 | SIE Exam — FINRA Application Deck (40 cards) | — | 40 built; listing copy ready | `/decks/sie-exam-anki-deck` | **Ready to share** — import apkg → GUID-move out of FULL → sync → AnkiWeb Share. AnkiConnect was down this pass. ~5 share slots left in 7d window from 21.10. |
