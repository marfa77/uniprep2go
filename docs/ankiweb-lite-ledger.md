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

**Queued (built, imported, synced; share when the 7-day window frees ~2026-10-20):** Czech A2 75, Greek A2 75, Polish A2 75, Polish for Ukrainian speakers 75, WELL AP 40, GMAT Focus 35 (SHORT — 5 verbal cards failed review), CFA L1 20 (SHORT — 20 of 40 failed review). Specs: `/tmp/ankiweb_specs/{deck_id}.json` are throwaway — rebuild from each `listing.txt` / `ankiweb_meta.md`.

**Not LITE-able (FULL below standard):** LEED GA and LEED AP BD+C (templated distractor notes on 240+/250 cards — paid-deck P0; LEED O+M likely same generator), SIE / CA RE / ServSafe Manager (thin backs), L&H / P&C (General area).
