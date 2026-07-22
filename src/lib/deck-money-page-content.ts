import type { Deck } from "./decks";
import type { DeckPositioning } from "./deck-positioning";
import { getDeckLinkedMock } from "./deck-seo";
import { getDeckPracticeMock } from "./deck-funnel";

export const pitchOverrides: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck":
    "342+ flashcards mapped to all 10 CFA Level 1 topic weights — pairs with the printable 2026 formula reference PDF.",
  "cfa-level-1-formula-reference-2026":
    "54-page 2026 formula reference: 250 formulas + 98 definitions by topic plus an 80-question recall drill with answer key.",
  "frm-part-1-anki-deck":
    "444 cards across FRM Part 1 foundations, quant, markets, and valuation — with a free 50-question readiness check.",
  "sie-exam-anki-deck":
    "300 cards aligned to FINRA SIE topic weights, paired with a free 75-question timed mock.",
  "series-7-anki-deck":
    "300 Top-Off cards for suitability, products, and order flow — plus a free 60-question Series 7 mock.",
  "ptcb-pharmacy-technician-anki-deck":
    "300 PTCE cards for top-200 drugs, sig codes, and pharmacy math — pairs with the 2026 printable study guide PDF.",
  "ptcb-study-guide-2026":
    "30-page January 2026 PTCE PDF: domain-weighted chapters, 80-question practice exam, and print-ready cheat sheets.",
};

export const longDescriptionOverrides: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck":
    "Ethics, quant, FRA, and fixed-income cards include the formula families CFA Level 1 repeats every cycle: TVM and statistics, ratio analysis, forward pricing, duration, and derivatives payoff logic. Pair with the formula reference PDF for printable tables and an 80-question recall drill; use the free 60-question readiness check for topic scoring.",
  "cfa-level-1-formula-reference-2026":
    "348 entries — 250 formulas and 98 definitions across Quant (65), Fixed Income (51), Derivatives (49), and the remaining Level 1 topics. The 80-question drill tests see-the-formula/name-the-concept recall. Same validated bank as the Anki deck.",
  "frm-part-1-anki-deck":
    "Cards track GARP Part 1 structure: risk governance, VaR and Expected Shortfall, credit and operational risk, fixed income and derivatives Greeks. The free FRM mock scores topic gaps so you drill valuation models and market mechanics — not random card volume.",
  "sie-exam-anki-deck":
    "FINRA weights drive the deck: capital markets, products and risks, trading, customer accounts, and prohibited activities. The linked SIE mock mirrors the 75-question / 105-minute format so you know which chapters deserve another week of Anki before scheduling the real exam.",
  "series-7-anki-deck":
    "Job-function outline coverage: suitability, options strategies, margin, municipal rules, and trade processing. Pair 15–20 cards per day with the free Top-Off mock to catch weak suitability and products chapters early.",
  "ptcb-pharmacy-technician-anki-deck":
    "Front-load brand/generic pairs, sig abbreviations, DEA schedules, DSCSA, and days-supply math — aligned to the January 2026 PTCE blueprint. Pair with the printable study guide for domain chapters and an 80-question practice exam; drill 10–15 cards per shift on your phone.",
  "ptcb-study-guide-2026":
    "Four chapters sized to 2026 domain weights (Medications 35%, Federal 18.75%, Patient Safety 23.75%, Order Entry 22.5%). The 80-question exam mirrors PTCE length (28/15/19/18). Every question maps to the validated 300-card item bank shared with the PTCB Anki deck.",
  "servsafe-manager-anki-deck":
    "Temperature danger zones, HACCP steps, Big 6 pathogens, and manager responsibilities appear as short recall prompts. Run the free 90-question ServSafe mock first — it maps directly to the domains in the coverage table.",
  "california-real-estate-exam-anki-deck":
    "Agency fiduciary duties, disclosure timelines, financing math, and California-specific practice cards mirror DRE topic areas. The free 60-question CA mock highlights which contract and property-law sections need another pass.",
  "life-and-health-insurance-exam-anki-deck":
    "Policy provisions, riders, annuities, Medicare basics, and replacement rules — the Life & Health producer exam staples. Use the free insurance mock for timed practice, then filter Anki to missed topic areas.",
  "property-casualty-insurance-exam-anki-deck":
    "Homeowners, personal auto, CGL, workers comp, and commercial property structures — aligned to national P&C licensing outlines. Pair with the free P&C mock before state exam registration.",
};

export const positioningOverrides: Partial<
  Record<string, Partial<Pick<DeckPositioning, "ourEdge" | "summaryProse">>>
> = {
  "cfa-level-1-anki-deck": {
    ourEdge: [
      "342+ cards across all 10 CFA Institute Level 1 topic weights in the table below",
      "2026 cycle formulas and definitions — ethics through portfolio management",
      "Pairs with printable formula reference (250 formulas + 98 definitions + 80 recall drill)",
      "Free 60-question CFA Level 1 readiness check with topic scoring",
    ],
    summaryProse:
      "Fewer than 400 weighted flashcards beat a 3,000-card dump for CFA Level 1: ethics, FRA, and quant alone account for a third of the exam. This deck matches the 10 topic weights in the table — run the free mock to see where your daily 25-card session should focus.",
  },
  "cfa-level-1-formula-reference-2026": {
    ourEdge: [
      "250 formulas + 98 definitions across all 10 Level 1 topics in the table below",
      "80-question formula recall drill with explained answer key",
      "Print-ready US Letter PDF — companion, not curriculum replacement",
      "Same validated item bank as the 342+ card CFA Level 1 Anki deck",
    ],
    summaryProse:
      "Level 1 rewards retrieval speed — you cannot apply a formula you cannot name in three seconds. This reference is the printable recall layer; pair it with Anki for daily reps and the free mock for topic gaps.",
  },
  "frm-part-1-anki-deck": {
    ourEdge: [
      "444 cards across FRM Part 1 foundations, quant, markets, and valuation models",
      "VaR, ES, Greeks, credit risk, and governance prompts from the coverage table",
      "Free 50-question FRM Part 1 timed practice test",
      "Current-cycle scope only — no legacy Part 1 material mixed in",
    ],
  },
  "sie-exam-anki-deck": {
    ourEdge: [
      "300 cards aligned to FINRA SIE topic weights (see table)",
      "Capital markets, products, trading, accounts, and regulatory framework",
      "Free 75-question SIE practice test — same question count as the live exam",
      "Validation pass on scripted items before publish",
    ],
  },
  "series-7-anki-deck": {
    ourEdge: [
      "300 cards mapped to FINRA Series 7 Top-Off job functions",
      "Suitability, options, bonds, margin, and settlement recall",
      "Free 60-question Series 7 practice test with topic breakdown",
      "Weighted to Top-Off outline — not a generic securities dump",
    ],
  },
  "ptcb-pharmacy-technician-anki-deck": {
    ourEdge: [
      "300 cards: top-200 brand/generic, sig codes, math, DEA, DSCSA",
      "January 2026 PTCE blueprint — compounding/alligation removed",
      "Pairs with printable 2026 study guide (80-question practice exam)",
      "10–15 cards/day workflow fits working technicians",
    ],
    summaryProse:
      "PTCE rewards drug names, sig codes, and math speed — not 2,000 low-yield cards. Three hundred validated prompts beat a mega-pack when you have 15 minutes between fills.",
  },
  "ptcb-study-guide-2026": {
    ourEdge: [
      "30 pages aligned to January 2026 PTCE domain weights in the table",
      "80-question practice exam with domain-scored answer key and rationales",
      "3 print-ready cheat sheets: 60 drugs, 45 sig codes, math formulas",
      "Same validated item bank as the 300-card PTCB Anki deck",
    ],
    summaryProse:
      "Most PTCB guides still teach the old outline. This PDF matches the 2026 blueprint — Federal Requirements at 18.75% with DSCSA, no wasted chapters on removed compounding topics.",
  },
  "servsafe-manager-anki-deck": {
    ourEdge: [
      "300 cards: time/temperature, HACCP, hygiene, allergens, manager duties",
      "Matches ServSafe Manager / CFPM domain structure",
      "Free 90-question ServSafe practice test online",
      "Pairs with printable PDF study guide in the catalog",
    ],
  },
  "california-real-estate-exam-anki-deck": {
    ourEdge: [
      "400 cards across California DRE salesperson topic areas",
      "Agency, disclosures, financing, and property law prompts",
      "Free California real estate practice test with scoring",
      "State-specific content — not a generic national deck relabeled",
    ],
  },
  "life-and-health-insurance-exam-anki-deck": {
    ourEdge: [
      "400 Life & Health cards: policies, riders, annuities, Medicare",
      "National producer-exam core topics in the coverage table",
      "Free Life & Health insurance practice test",
      "Sized for licensing prep — not unlimited insurance trivia",
    ],
  },
  "property-casualty-insurance-exam-anki-deck": {
    ourEdge: [
      "400 P&C cards: homeowners, auto, CGL, workers comp, BOP",
      "National licensing outline weights reflected in the table",
      "Free Property & Casualty practice test",
      "Commercial and personal lines separated by topic rows",
    ],
  },
};

const uniqueContentBySlug: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck": `### What is inside

The deck spans all 10 CFA Level 1 topic areas in the coverage table. Quantitative Methods cards drill TVM, probability, hypothesis testing, and regression output interpretation. Financial Statement Analysis covers ratio families (liquidity, activity, solvency, profitability), inventory methods, and cash-flow linkages. Fixed Income and Derivatives cards include duration, convexity, forward/futures pricing, and option payoff diagrams. Ethics cards use the Code and Standards framing the exam repeats every sitting.

### 60-day study plan with the formula reference and free mock

**Days 60–45:** 20 new cards per day across ethics and quant while skimming curriculum readings. **Days 44–30:** Print weak-topic tables from the [matching CFA Level 1 formula sheet](/decks/cfa-level-1-formula-reference-2026); run the [free 60-question readiness check](/mock-exams/cfa-level-1-readiness-check). **Days 29–7:** Review only — take the reference's 80-question recall drill; retake the mock weekly. **Final week:** Ethics-only Anki passes plus flagged formulas from both drill answer keys.

### Pitfalls this deck targets

Candidates lose points confusing forward vs futures margin flows, mis-stating inventory COGS under LIFO/FIFO, and mixing standard error with standard deviation. Cards call out those traps explicitly rather than listing definitions alone.`,

  "cfa-level-2-anki-deck": `### What is inside

495 cards across all ten equally weighted CFA Level 2 topics — vignette-depth FSA, equity and fixed income valuation models, derivatives strategies, portfolio management, and ethics application. Prompts emphasize item-set logic: given a short case, which adjustment or valuation method applies?

### Study plan with the free mock and formula reference

**Weeks 1–2:** 20 new cards/day across ethics and FSA. **Week 3:** Run the [free 60-question CFA Level 2 mock](/mock-exams/cfa-level-2-readiness-check). **Week 4+:** Drill only weak topics from the report; pair with the [Level 2 formula reference PDF](/decks/cfa-level-2-formula-reference-2026) for printable recall tables.

### Pitfalls this deck targets

Level 2 failures often come from mis-applying inventory and lease adjustments in FSA vignettes, confusing FCFF vs FCFE setups, and weak ethics judgment under time pressure.`,

  "ciple-a2-european-portuguese-anki-deck": `### Which Portuguese pathways this deck targets

**CIPLE A2 (CAPLE)** is the University of Lisbon A2 diploma used for Portuguese residency and citizenship language proof. The same European Portuguese lexicon supports **autorização de residência** and **nacionalidade portuguesa** applications. Formats and paperwork differ — the high-frequency PT-PT vocabulary does not.

### Study plan with sample cards

Use 15–20 new cards per day. Pair Anki with weekly speaking practice — CIPLE rewards active recall, not passive list reading. Preview the sample cards above for audio and example-sentence format.

### What makes this Gumroad edition different

PixID Studio Gumroad fulfillment with UniPrep2Go multi-pathway framing: CIPLE / CAPLE A2 plus residency and citizenship language prep — not a generic Brazilian Portuguese list.`,

  "delf-b2-french-anki-deck": `### Which French exams this deck targets

**DELF / DALF** is the gold-standard lifetime diploma track (universities, visas, employers worldwide). **TCF Canada** and **TEF Canada** are the mass immigration pathways for Express Entry and Quebec. **TCF ANF** serves French naturalization. **TCF général** serves admission to French universities. Formats and score validity differ — the high-frequency vocabulary does not.

### Study plan across pathways

Drill 20 cards/day from this 2000+ word deck while you prepare your specific exam format (DELF/DALF tasks, TCF/TEF listening-reading blocks, or ANF naturalization requirements). Keep speaking and timed practice separate from Anki — the deck builds lexical depth shared by all five pathways.

### What makes this Gumroad edition different

PixID Studio Gumroad fulfillment with UniPrep2Go multi-exam French framing: one vocabulary bank for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, and TCF général — not a DELF-only Lemon listing or A1 survival pack.`,

  "dutch-a2-inburgering-anki-deck": `### Which Dutch pathways this deck targets

**Inburgering** is the civic integration language track for many residency cases. **Staatsexamen NT2 A2** overlaps heavily on high-frequency Dutch. The same lexicon supports everyday language toward **naturalisatie**. Exam formats differ — A2 vocabulary does not.

### Study plan

Drill 20 cards/day while you book official practice for your Inburgering or NT2 pathway. Keep speaking and listening exams separate from Anki.

### What makes this Gumroad edition different

Multi-pathway Dutch framing (Inburgering + NT2 A2 + naturalisatie vocabulary) on PixID Studio Gumroad — not tourist phrase lists.`,

  "german-a2-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** immigrant integration pathways share a large A2 vocabulary core. Certificates differ by exam body — one Anki bank covers the overlapping lexicon.

### Study plan

20 cards/day for six to eight weeks before your Goethe, telc, ÖSD, or DTZ date. Practice each exam's listening/speaking format separately.

### What makes this Gumroad edition different

Goethe + telc + ÖSD + DTZ framing in one Gumroad product — not a single-brand certificate listing.`,

  "celi-b1-italian-anki-deck": `### Which Italian exams this deck targets

**CELI** (Perugia), **CILS** (Siena), and **PLIDA** (Dante Alighieri) are the main Italian B1 certificates. Bodies differ; intermediate vocabulary overlaps.

### Study plan

15–25 cards/day between classes and mock exams. Pair with speaking practice for your chosen certificate.

### What makes this Gumroad edition different

CELI + CILS + PLIDA multi-certificate framing — one B1 vocabulary bank on Gumroad.`,

  "danish-a2-prove-i-dansk-anki-deck": `### Which Danish pathways this deck targets

**Prøve i Dansk PD2** and **PD3** modules, plus everyday Danish used for **permanent residence** and **citizenship** language requirements. Confirm your required module officially.

### Study plan

20 cards/day with audio. Keep oral exam practice separate from Anki.

### What makes this Gumroad edition different

PD2 / PD3 + residence/citizenship pathway copy — not a generic Danish tourist deck.`,

  "norwegian-a2-norskprove-anki-deck": `### Which Norwegian pathways this deck targets

**Norskprøve A2** (Bokmål) plus language prep for **permanent oppholdstillatelse** and **statsborgerskap**. Requirements change — always verify official rules for your case.

### Study plan

20 cards/day with audio examples. Pair with speaking and listening practice for Norskprøve.

### What makes this Gumroad edition different

Norskprøve + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "dele-a2-ccse-spanish-citizenship-bundle": `### Which Spanish pathways this bundle targets

**DELE A2** (Instituto Cervantes) language plus **CCSE** civics for **nacionalidad española**. DELE A2 vocabulary also overlaps **SIELE A2**-style word knowledge; civics remains CCSE-specific.

### Study plan

Alternate language and CCSE cards daily. Keep official DELE/CCSE mock formats separate from Anki.

### What makes this Gumroad edition different

Dual .apkg nationality bundle (DELE + CCSE) with SIELE-aware vocabulary framing — not language-only checkout.`,

  "cfa-level-1-formula-reference-2026": `### What is inside

348 entries — 250 typeset formulas and 98 examiner-style definitions across Quantitative Methods (65), Fixed Income (51), Derivatives (49), FSA (44), Economics (36), Ethics & GIPS (28), Portfolio Management (27), Equity (23), Corporate Issuers (14), and Alternatives (11). Each table row shows concept, typeset formula, and a one-line plain-English meaning. The 80-question Formula Recall Drill shows a formula and asks you to name the concept — same-topic distractors mirror exam phrasing.

### Four-week recall plan with the Anki deck and free mock

**Week 1:** Quant and FRA tables + 20 [CFA Anki](/decks/cfa-level-1-anki-deck) cards/day. **Week 2:** Fixed income and derivatives tables. **Week 3:** Take the 80-question recall drill timed; run the [free 60-question mock](/mock-exams/cfa-level-1-readiness-check). **Week 4:** Re-print tables for lowest mock topics only; Anki review on missed drill questions.

### Pitfalls this reference targets

Candidates memorize formula shape but cannot name the concept under pressure, or confuse duration with convexity applications. The recall drill forces concept retrieval — not passive re-reading of typeset math.`,

  "sie-exam-anki-deck": `### What is inside

Cards follow FINRA's SIE outline: how capital markets function, equity and debt products, options basics, customer account types, AML red flags, and prohibited activities. Product-and-risk cards emphasize what can be sold to whom — the suitability logic the 75-question exam tests repeatedly.

### Four-week SIE plan with the free mock

**Week 1:** Products and risks — 25 new cards/day. **Week 2:** Trading, markets, and customer accounts. **Week 3:** Take the free 75-question mock under 105-minute timing; drill missed chapters only. **Week 4:** Regulatory framework and prohibited-activities review — retake mock if any topic stays below 70%.

### Pitfalls this deck targets

New entrants confuse IPO vs secondary offerings, margin account rules, and when a recommendation requires a suitability review. Cards phrase prompts the way FINRA multiple-choice questions do — short stem, one clear distinction.`,

  "series-7-anki-deck": `### What is inside

Top-Off coverage: seeking business and opening accounts, investment products (equity, debt, options, funds), recommendations and suitability, order handling, confirmations, settlement, and regulatory records. Options cards include spreads, straddles, and margin requirements. Municipal securities and MSRB rules have dedicated prompts.

### Study plan with the free mock

Run the free 60-question Series 7 practice test after one pass through products and suitability cards. Use topic scores to decide whether options or municipal chapters need a second week. Aim for 20 cards/day while working full time — the deck is sized for that cadence, not 100-card marathon sessions.

### Pitfalls this deck targets

Representatives mix suitability standards for elderly clients, options exercise vs assignment, and when a principal must approve a trade. Cards isolate those rule boundaries.`,

  "ptcb-pharmacy-technician-anki-deck": `### What is inside

Roughly 300 prompts organized for the January 2026 PTCE: top 200 brand/generic pairs, common sig codes (q.d., b.i.d., p.r.n.), days-supply calculations, DEA schedules, DSCSA traceability basics, recall and error-prevention workflow, and federal law. Math cards use the short integer setups the exam favors — no alligation or compounding (removed from the 2026 outline).

### Shift-friendly study plan with the study guide

**Start:** Take the [free 90-question PTCB mock](/mock-exams/ptcb-pharmacy-technician-mock) for domain-weighted baseline scores. **Weeks 4–3:** Read Medications and Federal Requirements chapters in the [PTCB Study Guide 2026](/decks/ptcb-study-guide-2026); 15 Anki cards per shift. **Week 2:** Take the guide's 80-question practice exam; drill missed domains in Anki only. **Final week:** Print cheat sheets from the guide; mixed Anki review — 10–15 cards per shift.

### Pitfalls this deck targets

Technicians miss look-alike/sound-alike pairs, misread sig abbreviations, and forget schedule II storage rules. Cards repeat high-error pairs the 2026 blueprint emphasizes.`,

  "ptcb-study-guide-2026": `### What is inside

Four review chapters sized to January 2026 PTCE weights: Medications (35%), Federal Requirements (18.75% — including DSCSA), Patient Safety & QA (23.75%), and Order Entry & Processing (22.5%). The 80-question practice exam matches real PTCE scored length (28/15/19/18) with a domain-scored answer key. Three cheat sheets cover 60 high-yield drugs A–Z, 45 prescription sig codes, and pharmacy math formulas with worked examples.

### 4-week study plan with the Anki deck

**Week 1:** Take the [free 90-question PTCB mock](/mock-exams/ptcb-pharmacy-technician-mock), then Medications chapter + 15 [PTCB Anki](/decks/ptcb-pharmacy-technician-anki-deck) cards/day. **Week 2:** Federal Requirements and Patient Safety chapters. **Week 3:** Order Entry chapter; take the 80-question practice exam under timed conditions. **Week 4:** Review every missed explanation; print cheat sheets; Anki review only on weak domains.

### Pitfalls this deck targets

Candidates still study removed compounding/alligation topics or under-weight Federal Requirements. This guide front-loads DSCSA and DEA schedule rules at the new 18.75% weight — every practice question maps to a verified card in the shared item bank.`,

  "servsafe-manager-anki-deck": `### What is inside

Food safety manager prompts: TCS temperature danger zone (41°F–135°F), cooking temperatures for poultry and ground meat, HACCP principles, hand-washing sequence, cross-contamination controls, Big 6 pathogens, and manager verification duties. Cards mirror ServSafe Manager domain language.

### Plan with the free 90-question mock

Read manager book chapters once, then 20 cards/day. Take the free ServSafe mock two weeks before your proctored exam — focus review on domains scoring under 75%. Final three days: temperature and HACCP cards only.

### Pitfalls this deck targets

Managers confuse cleaning vs sanitizing steps, cooling time limits, and when to exclude ill employees. Cards use the exact temperature thresholds ServSafe tests.`,

  "frm-part-1-anki-deck": `### What is inside

444 cards across Part 1: risk governance, CAPM and regression diagnostics, futures/forwards/swaps/options mechanics, VaR and Expected Shortfall methods, credit risk metrics, operational risk frameworks, and fixed-income valuation. Greeks and volatility surfaces appear in valuation-and-risk-models rows.

### Plan with the free FRM mock

**Phase 1 (6 weeks out):** 25 cards/day from quant and markets. **Phase 2:** Free 50-question mock — remap daily reviews to valuation models and credit if those topics score low. **Final month:** No new cards; ES and VaR calculation prompts daily.

### Pitfalls this deck targets

Candidates swap parametric vs historical VaR, mis-state delta-gamma approximations, and confuse settlement conventions on derivatives. Cards flag those calculation boundaries.`,

  "california-real-estate-exam-anki-deck": `### What is inside

400 prompts across DRE salesperson topics: property ownership, land use, agency law, fiduciary duties, contracts, financing, transfers, disclosures (transfer disclosure statement, agency disclosure), and practice-of-real-estate regulations. Math cards cover prorations, commission splits, and loan-to-value setups.

### Plan with the free CA mock

Complete pre-license coursework first, then 20 cards/day. Run the free California practice test at 30 days out; concentrate on agency and disclosure cards if those domains score lowest. California-specific disclosure timing is repeated more than national decks cover.

### Pitfalls this deck targets

Applicants confuse agency relationships (seller's agent vs dual agent), disclosure delivery deadlines, and trust fund handling. Cards use California statutory framing.`,

  "life-and-health-insurance-exam-anki-deck": `### What is inside

Life & Health licensing cards: policy types (term, whole, universal), riders, annuities, group vs individual health, Medicare Parts A–D basics, HIPAA privacy, replacement regulations, and producer licensing duties. Cards track national outline language state exams adapt.

### Plan with the free mock

20 cards/day for four weeks, then the free Life & Health practice test. Review annuity and Medicare sections twice — they carry disproportionate question share. Pair with P&C deck only if pursuing both lines.

### Pitfalls this deck targets

Producers confuse replacement notice periods, Medicare eligibility ages, and tax treatment of qualified vs non-qualified plans. Cards state the rule boundary, not generic definitions.`,

  "property-casualty-insurance-exam-anki-deck": `### What is inside

P&C cards: homeowners policy sections, personal auto liability/medical/UM, commercial property causes of loss, CGL occurrence vs claims-made, workers compensation monopolistic states, and BOP packaging. Exclusion cards (pollution, professional liability) are explicit.

### Plan with the free mock

Alternate personal-lines and commercial-lines weeks — 20 cards/day. Take the free P&C mock at 21 days out; workers comp and CGL often score lowest for first-time sitters. Drill those table rows.

### Pitfalls this deck targets

Candidates mix HO-3 vs HO-6 coverage, mis-apply collision vs comprehensive auto triggers, and forget workers comp exclusive remedy. Cards target those distinctions.`,
};

function buildGenericUniqueContent(deck: Deck): string | undefined {
  if (deck.category === "language" && deck.topicCoverage.length === 0) {
    const formatNote =
      deck.format === ".csv"
        ? "CSV import for custom Anki fields"
        : deck.format === "PDF"
          ? "printable PDF pages for offline drills"
          : "Anki .apkg with example sentences and audio where included";
    return `### Vocabulary scope for ${deck.shortName}

${deck.facts.cards} ${deck.shortName} prompts target ${deck.facts.topics.toLowerCase()} for ${deck.facts.examYear}. ${formatNote} — preview the ${deck.slug} samples above before importing.

### Daily workflow for ${deck.slug}

Add 15–20 new ${deck.shortName} cards per day, suspend leeches after two misses, and keep speaking/listening practice separate from Anki reps.

<!-- TODO(owner): verify item-bank specifics for ${deck.slug} -->`;
  }

  if (deck.format === "App" && deck.category === "immigration") {
    return `### What the ${deck.shortName} app covers

${deck.facts.topics} for ${deck.facts.examYear} prep in the Prep2Go Immigration app (${deck.slug}). Screenshots and subscription terms are on the App Store product page.

### Suggested cadence for ${deck.shortName}

One ${deck.shortName} chapter per week, then citizenship or integration quiz loops before you file paperwork. Content tracks official themes but is not government-endorsed.

<!-- TODO(owner): verify item-bank specifics for ${deck.slug} -->`;
  }

  if (deck.topicCoverage.length === 0) {
    return undefined;
  }

  const topicList = deck.topicCoverage
    .slice(0, 4)
    .map((t) => `${t.name} (${t.cards})`)
    .join("; ");
  const mock = getDeckPracticeMock(deck.slug);
  const mockLine = mock
    ? ` Week four: free ${deck.shortName} mock (${mock.questionCount} questions) — review only missed table rows.`
    : ` Week four: review-only passes through your lowest-count table rows.`;

  return `### Coverage focus for ${deck.shortName}

${deck.facts.cards} items align to ${deck.facts.topics.toLowerCase()}: ${topicList}.

### Suggested review cadence

Weeks 1–3: 20 new ${deck.shortName} cards per day.${mockLine}

<!-- TODO(owner): verify item-bank specifics for ${deck.slug} -->`;
}

export function getDeckUniqueContent(deck: Deck): string | undefined {
  return uniqueContentBySlug[deck.slug] ?? buildGenericUniqueContent(deck);
}
