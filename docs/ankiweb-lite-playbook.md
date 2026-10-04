# AnkiWeb LITE playbook (locked 2026-10-04)

Lead magnet on [AnkiWeb shared decks](https://ankiweb.net/shared/decks): a **subset of the sold FULL `.apkg`**, not a second product. Goal = download → 10–20 reviews → Gumroad FULL. Not “free pass the exam.”

Canonical for every future LITE. Do not invent a new size or SKU mix in chat.

## What we actually know (not vibes)

| Source | Fact |
|---|---|
| Our AnkiWeb account (2026-10-04 screenshot) | **CFA L2 LITE 50** = **36 downloads** since 2026-06-18. Language LITEs uploaded 2026-10-01 = **0–3 downloads**. IB Biology SL (not ours) = **147**. Thumbs 0/0 on all our rows. |
| AnkiWeb search | **One token.** `ptcb` works. `ptce` is almost empty. `cfa` is a crowded ratings-sorted list. **`63` = no matches** (numbers do not find Series 63). Listing rank ≈ **ratings**, not downloads (downloads only on the owner table). |
| AnkiWeb listing page | Shows **title + 2 sample notes** from the `.apkg`. Description is the conversion copy. |
| GSC 90d (export 2026-09-24) | Only commercial Anki query with volume: **`series 63 flashcards`** (8 impr). Also `anki pharmacy` → PTCB deck, `cfa level 1 anki` / `cfa level 2 flashcards` (tiny). Language clicks exist on site (DELF/CELI) and **failed on AnkiWeb LITE**. |
| Incumbents (live search 2026-10-04) | **PTCB:** Top 200 brand/generic lists, a 1655-note “PTCB Study Guide,” 240-note dump. **CFA L1:** free 1400–5120 note megas + an ExpertCards **15-card** LITE. **CFA L2:** 415 / 1136 / 1393 dumps; our 50-card LITE is on the `cfa` list but unrated. **Series 63:** **no indexed deck.** **SIE:** several Quizlet-style dumps (370–1182). |
| Older plan in `tmp/cfa2/coverage_map.md` | L2 LITE was specified as **15 cards**. Shipped L2 is **50**. ExpertCards independently shipped **15**. 15 is a teaser; 50 is a weekend pack. Neither is A/B tested. |

**Read of the 36 vs 0–3 vs 147:** exam culture + search token beat card count. CFA candidates already live on AnkiWeb. Language A2 buyers do not. IB/school Anki is a different market (AnKing-adjacent). Size 50 did not save Dutch/French LITEs and did not create L2’s 36 downloads by itself.

## SKU gate (which decks we put on AnkiWeb)

Ship a LITE only if **all** of these are true:

1. **FULL is live on Gumroad** with a checkout URL we can put in the description.
2. **FULL already passes** the house card standard (`mock-bank-audit-standard.mdc` §4 authored CSV / civic authored). Do not LITE a junk FULL.
3. **Anki-native demand** *or* an **empty AnkiWeb search** we can own with one title token.
4. **One searchable token** we can put in the title (`PTCB`, `CFA`, `NASAA`, `SIE`, `PTCE`). If the exam is only a number (`63`), add a word people type.
5. **Conversion dest is the FULL**, not a PDF-only SKU and not a planned waitlist.

**Hard skip:** language / citizenship LITEs (measured 0–3). CAT4 printable. Flanders MO. Second L2. Anything without a live Gumroad FULL.

### Wave 1 (locked — build these three + refresh L2 listing)

| Priority | SKU | LITE n | Why this one will get downloaded | Title token | Incumbent to beat |
|---|---|---:|---|---|---|
| 1 | `ptcb-pharmacy-technician-anki-deck` | **40** | `ptcb` search is active; incumbents are brand lists / 1655 dumps; GSC `anki pharmacy`; Tier A; FULL 300 is rewritten | `PTCB` + `PTCE` | Top 200 generic↔brand |
| 2 | `series-63-anki-deck` | **40** | **No Series 63 deck on AnkiWeb**; only GSC commercial flashcards query we have; FULL 250 rewritten | `NASAA` (not `63` alone) | Series 65 dumps people grab by mistake |
| 3 | `cfa-level-1-anki-deck` | **40** | `cfa` is the busiest professional search; GSC L1 Anki queries; same buyer as L2 LITE (36 dl) | `CFA` | 1500–5120 free megas — we win on **application**, not volume |
| keep | `cfa-level-2-anki-deck` LITE already up | 50 | Do **not** upload a second L2. Refresh description + pin samples if they are weak | `CFA` | 415/1393 dumps |

**Wave 2 (only after Wave 1 has ≥14d of owner download counts):** SIE (Anki culture, crowded dumps, mock still SEO-frozen — AnkiWeb is a separate channel). Then Series 7 if SIE LITE converts. PMP / FRM / Life & Health stay off AnkiWeb until Wave 1 converts — incumbents are lexicon dumps and they are not the GSC wedge.

## Size (locked)

**Default LITE = 40 unique notes.** Not 15, not 100, not “whatever matches L2.”

| n | Verdict |
|---|---|
| 15 | ExpertCards / old L2 plan. Too thin to show a blueprint. Looks like a Gumroad ad. |
| **40** | **Lock.** ~1/6–1/8 of a 250–348 FULL. Enough for one serious evening. Blueprint can be honest. |
| 50 | Allowed **only** to keep an already-uploaded deck (L2). Do not start new LITEs at 50 “for consistency.” |
| 80–100 | Cannibalizes S63 (250) and PTCB (300). Forbidden unless the FULL is ≥1000 (language — which we do not LITE). |

**Blueprint, not equal split.** Round to the official weights, then force **≥2 notes per official area** so the listing cannot be accused of a single-topic teaser.

Locked mixes:

- **PTCB 40** (PTCE Jan 2026 weights): Medications **14** · Patient Safety **10** · Order Entry **9** · Federal Requirements **7**.
- **Series 63 40** (NASAA scored mix): Ethics **10** · Communications **8** · Agents **5** · Broker-dealers **5** · Remedies **4** · Securities **4** · IA **2** · IAR **2**.
- **CFA L1 40** (2026 topic ranges, Ethics heavy): Ethics **6** · FSA **5** · Equity **4** · FI **4** · Quant **4** · Econ **4** · PM **4** · CI **3** · Derivatives **3** · Alts **3**.

## Card picking (this is the product)

LITE cards are the **storefront**. Random CSV head, “first 40,” or sold-sample script alone is a fail.

### Pool

Same notes as FULL (keep **Note GUID**). Buyer who later imports FULL should *update* those 40, not duplicate them.

Start from the authored CSV / civic source of the **shipped** `.apkg`, not the mock bank (civic / FINRA / PTCB / CFA are not mock-derived).

### Hard fail (drop from pool)

- Label front (`Topic: X?`, `Pharmacy law: Recall Class I?`)
- Bare definition / “What is X?” with no number, party, or decision
- Back &lt; 120 characters or missing **Example** + **Common mistake**
- Near-duplicate of another LITE candidate (same drug, same USA section, same formula)
- Drill / `(Drill N)` / cloze of a cloze
- Meta (“how many questions on the exam”)
- Anything weaker than the Gumroad sample cards

### Must-include (every LITE)

At least:

1. **One calculation** a candidate fails (PTCB: DEA check digit or days-supply; S63: AUM / de minimis / calendar; CFA: a worked formula with the trap in the mistake line).
2. **One sibling-rule trap** (right concept, wrong threshold / party / form).
3. **Coverage of every official area** at the mix above.
4. **Difficulty mix:** ~10 straight recall · ~20 application · ~10 hard. All three must still look like the FULL (scenario + mistake), not a dummy easy tier.

### Rank (AnkiWeb samples are random)

AnkiWeb’s shared-deck page draws **random notes from the whole `.apkg`**, not the first two. There is no “pin the samples.” **Every LITE card must be Gumroad-sample quality.** A weak 37th card can be the listing preview.

1. Score the pool with the same selling gate as `src/lib/sample-pick.ts` / `refresh-sold-samples.mjs` (quality first, then diversity).
2. Fill the blueprint quotas from the **top of that pool**, not by random and not with leftover definitions to “fill Ethics.”
3. **Human read every LITE card** (main chat or Sol). One weak card can be the AnkiWeb sample. If the FULL deck is still glossary-heavy (CFA L1), **do not ship a LITE** until 40 scenario cards exist — padded definitions will be randomly previewed.
4. CFA/formula LITEs: pre-render formulas as **images** so a random AnkiWeb preview is readable without MathJax.

### Forbidden

- Teaching-the-exam-format cards
- “See the FULL deck for…” on the back
- Watermarks, ads on the card face (Gumroad URL lives in the **description** only)
- Cards that *solve* a whole domain so a cheap candidate never needs FULL (e.g. dumping all 60 Top 200 drugs)

## Listing copy (conversion)

**Title pattern** (search token first):

`{TOKEN} {Exam} — Application Deck (LITE · {n} cards)`

Examples:

- `PTCB PTCE — Application Deck (LITE · 40 cards)`
- `NASAA Series 63 — State Law Application (LITE · 40 cards)`
- `CFA Level 1 — Application Deck (LITE · 40 cards)`

**Description must contain, in order:**

1. One sentence: this is a **free sample of the paid FULL**, not a pass pack.
2. Bullet list of **domains actually in the 40** (steal L2 LITE’s structure).
3. Card format: question front · answer · example · common mistake (and formula images if any).
4. FULL: card count, price, `/decks/{slug}` URL.
5. Independent-prep disclaimer (not PTCB / NASAA / CFA Institute).
6. How to import (desktop `.apkg` → AnkiWeb sync). Do not promise in-browser study.

**Tags:** underscore tokens (`PTCB`, `PTCE`, `NASAA`, `Series_63`, `CFA_Level_1`). Spaces split tags and do not search.

Do not put eight language LITEs on the same account row above money LITEs — the owner table is our public catalog. Archive or unshare dead language LITEs before Wave 1 if they still show as 0 downloads (ask before unsharing).

## Build / ship checklist

1. Confirm FULL `.apkg` + Gumroad file are the audited version.
2. Select 40 GUIDs to the mix above; write `internal_deck_generator/.../{slug}_lite_40.csv` (GUID column preserved).
3. Build a **separate deck name / deck ID** from FULL (do not reuse FULL genanki IDs — see L2 coverage note).
4. Spot-read 40/40 before upload (AnkiWeb may show any of them).
5. Upload; paste owner **Downloads** into `docs/ankiweb-lite-ledger.md` the same day (0 is a valid first row).
6. Re-check at **day 14**. Kill or rewrite if downloads &lt; 5 **and** a competitor in the same search is moving. Do not stack more LITEs on a dead account.

## What this playbook is not

- Not an AnkiWeb SEO trick for `/decks` Google rankings (separate Layer B).
- Not a dump of the mock bank.
- Not a promise that 40 cards converts; 40 is the **format**. Conversion is **which 40** + **which exam people already search on AnkiWeb**.
