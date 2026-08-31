import type { Deck } from "./decks";
import type { DeckPositioning } from "./deck-positioning";
import { getDeckLinkedMock } from "./deck-seo";
import { getDeckPracticeMock } from "./deck-funnel";

export const pitchOverrides: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck":
    "342+ flashcards mapped to all 10 CFA Level 1 topic weights — pairs with the printable 2026 formula reference PDF.",
  "cfa-level-1-formula-reference-2026":
    "54-page 2026 formula reference: 250 formulas + 98 definitions by topic plus an 80-question recall drill with answer key.",
  "cfa-level-2-anki-deck":
    "495 vignette-depth cards across all 10 CFA Level 2 topics — plus a free 60-question mock and the matching formula PDF. Not a Level 1 leftover dump.",
  "frm-part-1-anki-deck":
    "444 cards across FRM Part 1 foundations, quant, markets, and valuation — with a free 50-question readiness check.",
  "bench-energy-metal-trader-anki-deck":
    "202 metals-desk cards: LME, cash/3M carry, contango/backwardation, base and precious metals vocabulary.",
  "sie-exam-anki-deck":
    "300 cards aligned to FINRA SIE topic weights — free 25-question diagnostic or full 75-question timed mock.",
  "delf-b2-french-anki-deck":
    "2,000+ French cards for DELF/DALF, TCF/TEF Canada, and ANF — the high-frequency bank visa and diploma sittings actually share.",
  "dutch-a2-inburgering-anki-deck":
    "2,000 Dutch A2 cards with audio for Inburgering / NT2 — built for residency and naturalisatie deadlines, not tourist phrases.",
  "german-a2-anki-deck":
    "2,000 German A2–B1 cards for Goethe, telc, ÖSD, and DTZ — the shared lexicon residence and Einbürgerung pathways reuse.",
  "series-7-anki-deck":
    "300 Top-Off cards for suitability, products, and order flow — plus a free 60-question Series 7 mock.",
  "ptcb-pharmacy-technician-anki-deck":
    "300 PTCE cards for top-200 drugs, sig codes, and pharmacy math — pairs with the 2026 printable study guide PDF.",
  "luxembourg-vivre-ensemble-anki-deck":
    "120 French Vivre ensemble cards for institutions, rights, history/EU, and daily life — plus a free 60-question Luxembourg diagnostic. Built for nationality civics, not Sproochentest.",
  "aspt-phlebotomy-anki-deck":
    "Planned 60-card ASPT phlebotomy Anki (venipuncture, order of draw, safety, processing). Take the free 60-question diagnostic now — verify the current official form at aspt.org. ASPT is not NHA CPT and not ASCP PBT.",
  "cscs-nsca-anki-deck":
    "Planned 60-card NSCA CSCS Anki (exercise science, nutrition, program design, organization). Take the free 60-question diagnostic now — official CSCS is two papers / scaled 70 each. CSCS is not a personal-trainer CPT exam.",
  "rd-exam-anki-deck":
    "120 CDR-domain cards (Principles, Nutrition Care, Management, Foodservice) with explanations — pairs with the free 120-question RD readiness check before Pearson VUE.",
  "enrolled-agent-anki-deck":
    "120 IRS SEE cards across Individuals, Businesses, Representation, and Practices — plus a free 120-question Enrolled Agent readiness check for topic scoring.",
  "ace-cpt-anki-deck":
    "300 ACE CPT cards for client screening, program design, spotting cues, and professional conduct — plus a free 60-question readiness check.",
  "nha-cpct-anki-deck":
    "120 NHA CPCT/A cards for ADLs/patient care, safety/infection, phlebotomy+EKG text, and professional practice — plus a free 120-question / 120-minute readiness check. Official exam is 100 scored + 20 pretest / 2 hours / scaled 390.",
  "ptcb-study-guide-2026":
    "Best 2026 PTCE printable guide: DSCSA-weighted Federal Requirements, 80-question exam, cheat sheets + free 90Q online mock.",
  "mrics-quantity-surveying-anki-deck":
    "Focused MRICS QS APC Anki — NRM, JCT/NEC, cost planning — plus a free 50-question QS competency mock.",
  "mrics-anki-deck":
    "$11 / 250+ cross-pathway MRICS APC cards + free 50Q timed mock — ownable .apkg vs Brainscape packs. Official APC is interview + written evidence, not MCQ.",
  "leed-green-associate-anki-deck":
    "$11 / 250+ LEED GA cards + free 50Q timed mock — ownable .apkg vs free 100–700Q lead-gen banks. Official GA is 100Q / 2h / scaled 170.",
  "pmp-anki-deck":
    "$11 / 346+ PMP cards for 2026 ECO (People / Process / Business Environment) + free domain readiness check. Official exam is 180Q / 240 min.",
  "parapro-anki-deck":
    "Planned 60-card ParaPro Anki (reading, writing, math, classroom application). Take the free 60Q / 75 min diagnostic now — official ETS ParaPro is 90Q / 150 min.",
  "acsm-cpt-anki-deck":
    "$11 / 120 ACSM-CPT cards + free 120Q timed check — official 135 items / 150 min / scaled 550. Ownable .apkg vs Mometrix volume banks.",
  "ashrae-certifications-anki-deck":
    "$11 / 250 ASHRAE multi-cred cards + free 50Q diagnostic — ownable .apkg vs mega free Q-banks; keep ASHRAE’s official 30Q practice separate.",
  "nebosh-anki-deck":
    "$11 / 250 NEBOSH IGC cards + free 50Q knowledge diagnostic — honest: official GIC1/GIC2 are not MCQ.",
  "well-ap-anki-deck":
    "$11 / 250 WELL AP cards + free 50Q timed mock — official 115 items / 2.5h / scaled 170. Not IWBI material.",
  "california-real-estate-exam-anki-deck":
    "400 California DRE-only cards + free 60Q timed mock — not a national Quizlet pack; official salesperson is 150Q / 3h15 / 70% both portions.",
  "series-63-anki-deck":
    "$11 Series 63 Anki + free 60Q NASAA-topic mock — state-law repair after SIE/7; not official NASAA material.",
  "dele-a2-ccse-spanish-citizenship-bundle":
    "$26 / 60 compact CCSE MCQ cards + free 60Q timed diagnostic — official Cervantes CCSE is 25Q / 45 min / 60%. Not the 1500-card DELE vocab deck.",
  "citizenship-naturalization-anki-bundle":
    "Multi-country citizenship Anki bundle + free timed civics diagnostics (UK / CA / AU / more) — not a single-country handbook dump.",
  "medicare-counseling-anki-deck":
    "Planned SHIP Medicare counseling Anki. Take the free 60Q diagnostic now — no national published Q-count; verify your state SHIP/OCCT path.",
  "czech-citizenship-anki-deck":
    "Planned Czech reálie Anki. Free 60Q / 45 min diagnostic live now — official zkouška z reálií is 30Q / 30 min / 60% from the NPI ~300-item pool.",
  "bms-building-automation-anki-deck":
    "200+ BACnet / HVAC-sequence / alarms-trends-schedules / commissioning cards plus a free 60-question timed BMS diagnostic. No single federal BMS license — Niagara 4 TCP is a vendor course, not this mock.",
}

export const longDescriptionOverrides: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck":
    "Ethics, quant, FRA, and fixed-income cards include the formula families CFA Level 1 repeats every cycle: TVM and statistics, ratio analysis, forward pricing, duration, and derivatives payoff logic. Pair with the formula reference PDF for printable tables and an 80-question recall drill; use the free 60-question readiness check for topic scoring.",
  "cfa-level-1-formula-reference-2026":
    "348 entries — 250 formulas and 98 definitions across Quant (65), Fixed Income (51), Derivatives (49), and the remaining Level 1 topics. The 80-question drill tests see-the-formula/name-the-concept recall. Same validated bank as the Anki deck.",
  "frm-part-1-anki-deck":
    "Cards track GARP Part 1 structure: risk governance, VaR and Expected Shortfall, credit and operational risk, fixed income and derivatives Greeks. The free FRM mock scores topic gaps so you drill valuation models and market mechanics — not random card volume.",
  "sie-exam-anki-deck":
    "FINRA weights drive the deck: capital markets, products and risks, trading, customer accounts, and prohibited activities. Start with the free 25-question quick diagnostic (~35 min) to find weak domains, or run the full 75-question / 105-minute mock before you schedule the real exam.",
  "series-7-anki-deck":
    "Job-function outline coverage: suitability, options strategies, margin, municipal rules, and trade processing. Pair 15–20 cards per day with the free Top-Off mock to catch weak suitability and products chapters early.",
  "ptcb-pharmacy-technician-anki-deck":
    "Front-load brand/generic pairs, sig abbreviations, DEA schedules, DSCSA, and days-supply math — aligned to the January 2026 PTCE blueprint. Pair with the printable study guide for domain chapters and an 80-question practice exam; drill 10–15 cards per shift on your phone.",
  "ace-cpt-anki-deck":
    "Cards track ACE CPT competency themes: preparticipation screening and consent, FITT-VP program design, cueing and spotting under load, and scope/ethics/business boundaries. Run the free 60-question readiness check first, then filter Anki to weak topics — not a NASM/ISSA mega-dump.",
  "luxembourg-vivre-ensemble-anki-deck":
    "French MCQs mapped to Vivre ensemble themes: Grand-Duchy institutions, fundamental rights and nationality literacy, history/geography/EU, and society/daily life. Run the free 60-question diagnostic first, then drill weak domains — Sproochentest language evidence stays on a separate track. Ownable .apkg for the exam-or-course civics path, not Guichet.lu dumps.",
  "rd-exam-anki-deck":
    "CDR domain-weighted prompts: Principles of Dietetics, Nutrition Care (PES/ADIME), Management of Food and Nutrition Programs, and Foodservice Systems. Explanations name why distractors fail. Take the free 120-question RD readiness check first, then filter Anki to weak domains — not a random 2,000-card clinical dump.",
  "enrolled-agent-anki-deck":
    "SEE Part 1–3 themes in one ownable deck: individuals (income, deductions, credits), businesses (entities, payroll themes), representation before the IRS, and practices & procedures. Pair with the free Enrolled Agent readiness check for timed topic scoring before you schedule Prometric — independent prep, not IRS material.",
  "ptcb-study-guide-2026":
    "Four chapters sized to 2026 domain weights (Medications 35%, Federal 18.75% with DSCSA, Patient Safety 23.75%, Order Entry 22.5%). The 80-question exam mirrors PTCE scored length (28/15/19/18). Pair with the free 90-question online mock and the separate 300-card Anki deck — beats free blogs still teaching removed compounding topics.",
  "mrics-quantity-surveying-anki-deck":
    "QS-pathway cards for NRM measurement, cost planning, JCT/NEC contract practice, procurement, and ethics — paired with a free timed QS readiness check. Ownable Anki .apkg for APC interview recall, not a Brainscape subscription dump.",
  "mrics-anki-deck":
    "Cross-pathway MRICS APC cards for mandatory competencies, ethics/Rules of Conduct, Level 2/3 application, and interview structure — paired with the free 50-question APC readiness check. Ownable $11 .apkg; official route remains written submission + 60-minute interview (not MCQ). QS NRM/JCT depth lives on the separate MRICS QS deck.",
  "leed-green-associate-anki-deck":
    "LEED GA domain cards: integrative process, location/transportation, sites & water, energy & atmosphere, materials & IEQ — same bank themes as the free 50-question timed check. Ownable $11 .apkg; official GBCI form is 100Q / 2 hours / scaled 170. Not USGBC material.",
  "pmp-anki-deck":
    "346+ ECO-aligned cards across People (33%), Process (41%), and Business Environment (26%) for the 2026 PMP outline — paired with the free domain-weighted readiness check. Ownable $11 .apkg vs AnkiWeb dumps; official sitting is 180Q / 240 minutes. Not PMI material.",
  "parapro-anki-deck":
    "Planned ParaPro spaced-repetition deck for ETS Assessment 1755 themes (reading, writing, math, classroom application). The free 60-question / 75-minute readiness check is live now; the official exam is 90 selected-response / 150 minutes. Not ETS material.",
  "series-63-anki-deck":
    "Series 63 state-law cards for broker-dealer regulation, agent registration, ethics, communications, and investment adviser basics — paired with the free 60-question NASAA-topic readiness check. Ownable .apkg after SIE/Series 7; not NASAA material.",
  "medicare-counseling-anki-deck":
    "Planned SHIP Medicare counseling cards for Parts A/B/C/D themes, rights/appeals, fraud awareness, and counseling standards. The free 60-question diagnostic is live; there is no public national Q-count — verify your state SHIP/OCCT path. Not a state SHIP certificate.",
  "czech-citizenship-anki-deck":
    "Planned Anki for Czech citizenship reálie (zkouška z českých reálií) themes: state & rights, history/geography/EU, society, and public services. Free 60Q diagnostic live now; official exam is 30Q/30min/60% from the NPI pool. Language B1 is a separate sitting; permanent residence usually needs A2 language, not this civics deck.",
  "bms-building-automation-anki-deck":
    "BACnet objects/services/BBMD, HVAC sequences, operator alarms/trends/schedules, and commissioning checkout — the same four domains as the free 60-question timed check. Ownable .apkg for controls techs; not Tridium Niagara 4 TCP material and not a CertifBus 10-question tease.",
  "servsafe-manager-anki-deck":
    "Temperature danger zones, HACCP steps, Big 6 pathogens, and manager responsibilities appear as short recall prompts. Run the free 90-question ServSafe mock first — it maps directly to the domains in the coverage table.",
  "california-real-estate-exam-anki-deck":
    "400 California DRE-only cards — agency, disclosure timelines, financing math — plus a free 60-question timed mock. Official salesperson sitting is 150Q (75+75) / 3h15 / 70% both portions; our mock is a shorter diagnostic, not a 1,500-question course dump.",
  "bench-energy-metal-trader-anki-deck":
    "LME cash vs 3M, carry economics, contango/backwardation, and base/precious metals benchmarks — the vocabulary new metals desk analysts actually hear. Spaced repetition beats rereading a PDF glossary the night before a desk interview.",
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
  "cfa-level-2-anki-deck": {
    ourEdge: [
      "495 cards across all 10 equally weighted CFA Level 2 topics",
      "Vignette-depth FSA, equity/FI valuation, derivatives, PM, and ethics application",
      "Pairs with the Level 2 formula reference PDF and a free 60-question mock",
      "Ownable .apkg — not a 3,000-card Level 1 leftover or monthly Q-bank",
    ],
    summaryProse:
      "Level 2 punishes item-set misfires, not missing a random L1 definition. Four hundred ninety-five focused cards plus one free timed diagnostic beat a mega-dump when you need FCFF vs FCFE and FSA adjustments under the clock.",
  },
  "cfa-level-1-formula-reference-2026": {
    ourEdge: [
      "250 formulas + 98 definitions — not a free one-page cheat sheet",
      "80-question formula recall drill with explained answer key",
      "Print-ready US Letter PDF — companion, not curriculum replacement",
      "Same validated item bank as the 342+ card CFA Level 1 Anki deck + free 60Q mock",
    ],
    summaryProse:
      "Free one-pagers look helpful until the exam clock starts. This $19 reference forces typed formula recall across all 10 topics, then hands you an 80-question drill and the free 60-question mock for gap scoring.",
  },
  "frm-part-1-anki-deck": {
    ourEdge: [
      "Ownable 444-card .apkg — not a monthly AnalystPrep / Bionic Turtle subscription",
      "VaR, ES, Greeks, credit risk, and governance prompts from the coverage table",
      "Free 50-question FRM Part 1 timed practice test with topic scoring",
      "Current-cycle Part 1 only — drill weak pillars after the mock, not random volume",
    ],
    summaryProse:
      "Q-bank subscriptions win on question volume. UniPrep wins when you want an ownable Anki file plus one free timed diagnostic — $29 once, then daily spaced repetition on VaR/ES/Greeks gaps the mock surfaces.",
  },
  "sie-exam-anki-deck": {
    ourEdge: [
      "300 cards aligned to FINRA SIE topic weights (see table)",
      "Capital markets, products, trading, accounts, and regulatory framework",
      "Free 25-question quick diagnostic (~35 min) or full 75-question timed mock",
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
      "Free 90-question timed mock + printable 2026 study guide (separate SKUs)",
      "Ownable .apkg — 10–15 cards/shift, not a Quizlet or account-gated bank",
    ],
    summaryProse:
      "PTCE rewards drug names, sig codes, and math speed — not 2,000 low-yield cards. Three hundred validated prompts beat a mega-pack when you have 15 minutes between fills.",
  },
  "ace-cpt-anki-deck": {
    ourEdge: [
      "300 cards across screening, program design, instruction/spotting, and professional conduct",
      "Free 60-question ACE CPT readiness check with topic scoring",
      "Ownable Gumroad .apkg — not a subscription Q-bank",
      "Scope-of-practice and safety boundaries front-loaded",
    ],
    summaryProse:
      "ACE CPT rewards screening judgment, program progression, and professional boundaries — not memorizing 2,000 random anatomy flashcards. Three hundred focused prompts plus one free timed mock beat a mega-pack when you study between client sessions.",
  },
  "nha-cpct-anki-deck": {
    ourEdge: [
      "120 cards across ADLs/patient care, safety/infection, phlebotomy+EKG text, and professional practice",
      "Free 120-question / 120-minute CPCT/A readiness check with topic scoring",
      "Honest official facts: 100 scored + 20 pretest / 2 hours / scaled 390",
      "Ownable Gumroad .apkg — CPCT/A ≠ CCMA ≠ NHA CPT ≠ ASPT",
    ],
    summaryProse:
      "CPCT/A rewards bedside ADLs, infection control, and selected phlebotomy/EKG judgment — not a CCMA or phlebotomy-only dump. One hundred twenty focused prompts plus a free 120-question timed check beat a 260-question blog bank that mixes official counts.",
  },
  "luxembourg-vivre-ensemble-anki-deck": {
    ourEdge: [
      "120 French MCQ cards across institutions, rights, history/EU, and daily life",
      "Free 60-question Luxembourg Vivre ensemble diagnostic with topic scoring",
      "Built for the exam-or-course civics path — Sproochentest stays separate",
      "Ownable Gumroad .apkg for nationality applicants",
    ],
    summaryProse:
      "Vivre ensemble rewards precise civics recall — Grand-Duchy institutions, rights, and EU context — not a random Europe trivia dump. One hundred twenty French prompts plus one free 60-question timed diagnostic beat rereading Guichet PDFs the night before.",
  },
  "ptcb-study-guide-2026": {
    ourEdge: [
      "30 pages aligned to January 2026 PTCE domain weights in the table",
      "80-question practice exam with domain-scored answer key and rationales",
      "3 print-ready cheat sheets: 60 drugs, 45 sig codes, math formulas",
      "Links to free 90-question timed online mock + companion 300-card Anki (separate SKUs)",
    ],
    summaryProse:
      "Most free PTCB guides still teach the old outline or stop at a blog checklist. This PDF matches the 2026 blueprint — Federal Requirements at 18.75% with DSCSA — then hands you an 80-question exam; pair with the free 90-question online mock and optional Anki drills.",
  },
  "bms-building-automation-anki-deck": {
    ourEdge: [
      "200+ cards: BACnet networking, HVAC sequences, platform ops, commissioning",
      "Free 60-question / 75-minute timed BMS diagnostic with topic scoring",
      "Ownable $11 .apkg — not a 10-questions-per-day tease or Brainscape tag dump",
      "Honest: no single U.S. federal BMS license; Niagara 4 TCP is vendor training",
    ],
    summaryProse:
      "There is no one federal BMS exam. UniPrep wins when you want a free timed 60-question BACnet/HVAC/ops diagnostic plus an ownable $11 .apkg — not CertifBus’s 10 free questions/day and not a Niagara 4 TCP substitute.",
  },
  "mrics-quantity-surveying-anki-deck": {
    ourEdge: [
      "QS pathway competencies — NRM, cost planning, JCT/NEC, procurement",
      "Free 50-question timed QS readiness check with competency scoring",
      "Ownable Anki .apkg — not a subscription flashcard website",
      "Built for APC final-assessment recall, not trivia volume",
    ],
    summaryProse:
      "Brainscape packs drown QS candidates in 2,000 mixed cards. A focused Anki .apkg plus a free timed QS mock tells you which competencies to drill before the RICS assessment interview.",
  },
  "mrics-anki-deck": {
    ourEdge: [
      "250+ cross-pathway APC cards: mandatory, ethics, Level 2/3, interview structure",
      "Free 50-question / 100-minute timed APC diagnostic with topic scoring",
      "Ownable $11 .apkg — not Brainscape subscription or browser-only free decks",
      "Honest: official MRICS is written evidence + 60-min interview, not an MCQ exam",
    ],
    summaryProse:
      "APC fails candidates on ethics and Level 3 advice under interview pressure — not on grinding browser flashcards. UniPrep’s free timed diagnostic plus an ownable $11 Anki .apkg beats Brainscape packs when you need spaced ethics/mandatory recall while writing evidence. QS NRM/JCT specialists should add the separate MRICS QS SKU.",
  },
  "leed-green-associate-anki-deck": {
    ourEdge: [
      "250+ LEED GA domain cards from the same bank as the free 50Q mock",
      "Official honesty: GBCI form is 100Q / 2h / scaled 170 — our mock is a shorter diagnostic",
      "Ownable $11 .apkg — not a free 100–700Q lead-gen bank",
      "Independent prep — not USGBC/GBCI exam material",
    ],
    summaryProse:
      "Free LEED GA Q-banks (Archiroots, CareerEmployer, Projectific) chase volume. UniPrep wins when you want a free timed 50-question diagnostic plus an ownable $11 Anki .apkg mapped to the same domains — then sit the real 100Q / 2h / 170 exam.",
  },
  "pmp-anki-deck": {
    ourEdge: [
      "346+ cards across People 33% / Process 41% / Business Environment 26% (2026 ECO)",
      "Free domain-weighted readiness check before you buy a 180Q simulator",
      "Ownable $11 .apkg — not AnkiWeb dumps or AI card generators",
      "Independent prep — not PMI exam material",
    ],
    summaryProse:
      "Full-length PMP sims matter late. Start with UniPrep’s free domain diagnostic and $11 ECO-aligned Anki — then move to a 180-question / 240-minute simulator when domain scores stabilize.",
  },
  "parapro-anki-deck": {
    ourEdge: [
      "Planned 60-card ParaPro Anki for reading, writing, math, classroom application",
      "Free 60Q / 75 min diagnostic live now — official ETS form is 90Q / 150 min",
      "Honest cut-score note: many districts use 460 — verify locally",
      "Independent prep — not ETS exam material",
    ],
    summaryProse:
      "ETS Study Companion and paid interactive practice tests own official format. UniPrep’s free shorter diagnostic (and planned Anki) is for topic scoring before you schedule Assessment 1755.",
  },
  "series-63-anki-deck": {
    ourEdge: [
      "NASAA state-law themes: BD/agent registration, ethics, communications, IA basics",
      "Free 60-question timed Series 63 readiness check",
      "Ownable .apkg for post-SIE/7 state-law repair",
      "Independent prep — not NASAA material",
    ],
    summaryProse:
      "Series 63 fails candidates on Uniform Securities Act judgment, not product trivia. A focused Anki deck plus a free 60-question timed mock beats grinding unrelated SIE leftovers before the state law sitting.",
  },
  "medicare-counseling-anki-deck": {
    ourEdge: [
      "Planned SHIP counseling Anki for Medicare parts, rights, fraud, counseling standards",
      "Free 60-question timed diagnostic live now",
      "Honest: no public national Q-count — verify state SHIP/OCCT",
      "Independent prep — not a state SHIP certificate",
    ],
    summaryProse:
      "State SHIP offices own certification. UniPrep’s free 60-question diagnostic (and planned Anki) is independent practice for Medicare counseling themes — not OCCT and not a national exam form.",
  },
  "czech-citizenship-anki-deck": {
    ourEdge: [
      "Planned reálie Anki for Czech citizenship civics themes",
      "Free 60Q / 45 min timed diagnostic live now",
      "Honest: official exam is 30Q / 30 min / 60% from the NPI ~300-item pool",
      "B1 language is separate; permanent residence usually needs A2 language, not reálie",
    ],
    summaryProse:
      "Official NPI databank and model test own exam-day format. UniPrep wins when you want a free longer timed diagnostic plus a planned Anki waitlist for spaced reálie recall — not a third-party AI dump that skips the 30/30/60% honesty.",
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
      "400 California DRE-only cards — not Quizlet/Aceable national packs",
      "Agency, disclosure timelines, financing math, and CA property law",
      "Free 60-question California real estate practice test with scoring",
      "State-specific traps DRE actually writes — not relabeled US trivia",
    ],
    summaryProse:
      "California DRE fails candidates on agency relationships and disclosure timing — not generic real estate trivia. Four hundred CA-only cards plus a free 60-question mock beat a national Quizlet pack with a California sticker before you buy a full Aceable-style course.",
  },
  "bench-energy-metal-trader-anki-deck": {
    ourEdge: [
      "202 LME/metals desk cards — not a 2,000-card CFA dump",
      "Cash/3M carry, contango/backwardation, base & precious benchmarks",
      "Built for desk onboarding and interview recall",
      "Bundle path: Commodity Trader Pack (metals + oil + coal = 634 cards)",
    ],
    summaryProse:
      "Metals desks speak LME and curve language. Two hundred two focused lexicon cards beat a mega finance Anki dump when you need cash/3M and contango under interview pressure — expand to oil/coal via the Commodity Trader Pack.",
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
  "well-ap-anki-deck": `### What is inside

250 MCQ cards across WELL v2 concept groups used on the IWBI WELL AP exam: Air/Water/Nourishment, Light/Movement/Thermal Comfort, Sound/Materials, Mind/Community, and WELL Certification & Portfolio. Every card includes a correct explanation and short notes on why the other options fail — the same bank as the free timed readiness check.

### 3–4 week study plan with the free mock

**Week 1:** 20 new cards/day across Air, Water, and Nourishment. **Week 2:** Add Light/Movement/Thermal and Sound/Materials. **Week 3:** Sit the [free 50-question WELL AP readiness check](/mock-exams/well-ap-readiness-check) (100 minutes, 70% diagnostic target). **Final days:** Review-only Anki on weak topics from the report; separately practice IWBI embedded-scenario / reference-PDF navigation before Prometric.

### Pitfalls this deck targets

Candidates over-drill favorite concepts (Air, Materials) and under-drill Certification/Portfolio process and Mind/Community. Cards force all five grouped domains under spaced recall, not just design-side preferences.

### What this does not replace

IWBI/GBCI registration, continuing education, or the official WELL AP exam (115 items, scaled pass 170). This deck is independent prep — not IWBI material.`,
  "rd-exam-anki-deck": `### What is inside

120 MCQ cards aligned to the CDR Registration Examination for Dietitians domains: Principles of Dietetics (21%), Nutrition Care for Individuals and Groups (45%), Management of Food and Nutrition Programs and Services (21%), and Foodservice Systems (13%). Every card includes a correct explanation and notes on why the other options fail — the same bank themes as the free timed readiness check.

### 2–3 week study plan with the free mock

**Week 1:** 15–20 new cards/day across principles and nutrition care (PES / ADIME, macros, MNT themes). **Week 2:** Add foodservice and management cards; sit the [free 120-question RD readiness check](/mock-exams/rd-exam-readiness-check). **Final days:** Review-only Anki on weak topics from the report — keep official CDR handbook timing practice separate (3-hour adaptive exam, scaled pass 25/50).

### Pitfalls this deck targets

Candidates over-focus on clinical MNT and under-drill foodservice sanitation, procurement, and management finance. Cards force all four CDR domains under spaced recall, not just favorite clinical topics. This is not a recycled nursing or personal-trainer bank.

### What this does not replace

ACEND education, supervised practice, and the official CDR / Pearson VUE exam. This deck is independent prep — not CDR material.`,

  "enrolled-agent-anki-deck": `### What is inside

120 MCQ cards mapped to IRS Special Enrollment Examination (SEE) themes: Individuals, Businesses, Representation, and Practices & procedures. Cards force tax-year judgment and Circular 230-style representation boundaries — not a generic “tax trivia” dump. Pair with the free 120-question timed Enrolled Agent readiness check for topic scoring.

### Plan with the free EA mock

**Start:** Take the [free Enrolled Agent readiness check](/mock-exams/enrolled-agent-readiness-check) under quiet conditions. **Then:** 15–20 Anki cards/day on your weakest SEE part. **Before Prometric:** re-sit a short timed block on failed topics only; keep IRS/Prometric candidate bulletin timing separate from this diagnostic.

### Pitfalls this deck targets

Candidates grind Part 1 (Individuals) and skip Representation/Practices, confuse EA with CPA exam content, or memorize numbers without reading fact patterns. Cards isolate those near-miss traps.

### What this does not replace

IRS SEE registration, official study materials, or the three-part Prometric exam. Independent prep — not IRS material.`,

  "aspt-phlebotomy-anki-deck": `### What this page is

A planned 60-card ASPT phlebotomy Anki (venipuncture, order of draw & tubes, safety/infection, processing & QA) paired with a **live free 60-question** timed readiness check. The deck is **not a live Gumroad SKU** yet — do not treat this page as a buyable .apkg.

### ASPT vs NHA vs ASCP

**ASPT** (American Society of Phlebotomy Technicians) is a separate certifier from **NHA CPT** and **ASCP PBT**. ASCP PBT is a computer-adaptive exam (~80 items / ~2 hours). Third-party practice sites disagree on ASPT item count and time — UniPrep does **not** invent 100Q or 150Q official numbers. Verify the current form at [aspt.org](https://www.aspt.org).

### Plan with the free mock

Start with the [free ASPT phlebotomy readiness check](/mock-exams/aspt-phlebotomy-readiness-check). Use the topic report (venipuncture, tubes, safety, processing) to decide whether you also need the NHA CPT mock. Join the waitlist when the Anki ships.

### What this does not replace

ASPT registration, clinical training, or NHA/ASCP exams. Independent diagnostic — not ASPT exam material.`,

  "cscs-nsca-anki-deck": `### What this page is

A planned 60-card NSCA CSCS Anki (exercise science, nutrition, program design, organization & admin) paired with a **live free 60-question** timed readiness check. The deck is **not a live Gumroad SKU** yet — do not treat this page as a buyable .apkg.

### CSCS vs personal-trainer CPT

**CSCS** (Certified Strength and Conditioning Specialist) is NSCA’s athlete-programming credential. It is **not** NASM-CPT, ACE CPT, ACSM-CPT, or NSCA-CPT. Official CSCS is two separately scored papers: Scientific Foundations (**80 scored + 15 pretest / 1.5 hours**) and Practical/Applied (**110 scored + 15 pretest / 2.5 hours**, including 30–40 video/image items). Scaled pass is **70 or higher on each section**. Verify at [nsca.com](https://www.nsca.com/certification/cscs/certified-strength-and-conditioning-specialist-exam-description/).

### Plan with the free mock

Start with the [free NSCA CSCS readiness check](/mock-exams/cscs-nsca-readiness-check). Use the topic report to see science vs programming gaps. This 60-question diagnostic is shorter than either official paper and has no video items. Join the waitlist when the Anki ships.

### What this does not replace

NSCA registration, the Essentials textbook, video-item practice, or a personal-trainer CPT exam. Independent diagnostic — not NSCA exam material.`,

  "nha-cpct-anki-deck": `### What is inside

120 MCQ prompts mapped to CPCT/A bedside work: patient care and ADLs, safety and infection control, phlebotomy plus EKG text basics, and professional practice. Same validated bank as the free 120-question / 120-minute timed check. Official NHA form is 100 scored + 20 pretest / 2 hours / scaled 390 — this deck is independent prep, not a skills lab.

### Plan with the free CPCT mock

**Start:** Take the [free 120-question NHA CPCT/A readiness check](/mock-exams/nha-cpct-readiness-check). **Then:** 15–20 Anki cards/day on your weakest topic row. **Before booking:** re-run the timed check and drill only missed stems.

### Pitfalls this deck targets

Candidates mix CPCT/A with CCMA, NHA CPT phlebotomy, or ASPT; over-drill EKG (10 scored items) and skip Patient Care (43). Cards keep PCT scope: report to the nurse, do not diagnose or titrate meds.

### What this does not replace

NHA registration, the official practice test, or a skills lab. Ownable .apkg only — not NHA exam material.`,

  "luxembourg-vivre-ensemble-anki-deck": `### What is inside

120 French MCQ prompts mapped to Vivre ensemble themes: institutions and vivre ensemble, history/geography/EU, rights and nationality, and society/daily life. Cards mirror the civics judgment the official 40-question exam (or 24-hour course) expects — not Sproochentest language drills and not Belgian/French civics recycled under a Luxembourg title.

### Plan with the free Luxembourg mock

**Start:** Take the [free 60-question Luxembourg Vivre ensemble readiness check](/mock-exams/luxembourg-vivre-ensemble-readiness-check). **Then:** 15–20 Anki cards/day on your weakest topic row. **Before booking:** practice a 40-question / 60-minute mindset at 70% using weak-domain cards only.

### Pitfalls this deck targets

Applicants confuse Sproochentest with Vivre ensemble, mix Belgian/French institutions into Luxembourg answers, or skip communal vs state roles. Cards isolate those near-miss traps.

### What this does not replace

Official Vivre ensemble course or exam registration, language evidence, or Guichet.lu procedures. Ownable .apkg only — not government material.`,

  "nebosh-anki-deck": `### What is inside

250 MCQ cards across NEBOSH IGC syllabus groups: H&S management systems/culture/monitoring, physical/psychological/musculoskeletal health, chemical/biological/workplace hazards, work equipment/fire/electricity, and GIC2 risk-assessment & control skills. Same bank themes as the free 50-question timed readiness check.

### Plan with the free NEBOSH mock

Study with your accredited Learning Partner materials first. Then 15–20 cards/day for 2–3 weeks and sit the [free 50-question NEBOSH readiness check](/mock-exams/nebosh-readiness-check) (100 min, 70% diagnostic). Official GIC1 is a **5-hour open-book scenario paper (45% provisional pass)** and GIC2 is a **4-hour practical** — keep narrative/practical practice separate from this MCQ diagnostic.

### Pitfalls this deck targets

Candidates treat free MCQ banks as the real exam format, under-drill hierarchy of control and GIC2 five-step risk assessment, and confuse IG1/IG2 legacy labels with current GIC1/GIC2 units. Cards force Elements 1–11 themes under spaced recall.

### What this does not replace

Accredited Learning Partner tuition, NEBOSH registration, or official GIC1/GIC2 assessments. Independent prep — not NEBOSH material.`,
  "bms-building-automation-anki-deck": `### What is inside

200+ MCQ cards across four BMS/BAS domains: BACnet protocol and networking, HVAC control sequences, alarms/trends/schedules/operator workflows, and integration/commissioning. Same bank themes as the free 60-question timed readiness check. Live Gumroad .apkg — **$11**.

### Plan with the free BMS mock

**Start:** Take the [free 60-question BMS / BAS readiness check](/mock-exams/bms-bas-readiness-check) (75 min, 70% diagnostic). **Then:** 15–20 Anki cards/day on the weakest topic row (BBMD/COV vs sequences vs alarm routing). **Before vendor week:** review commissioning checkout cards — Niagara 4 TCP is a multi-day practical course, not this MCQ.

### Pitfalls this deck targets

Techs treat a vendor Niagara lab as a generic BMS license, mix BTL product listing with personal credentials, and skip BACnet/IP subnet (BBMD) mechanics. Cards force protocol + sequences + ops + checkout under spaced recall.

### What this does not replace

Tridium Niagara 4 TCP, manufacturer training, or BACnet International / BTL programs. BTL lists products, not people. Independent prep — not Tridium or ASHRAE exam material.`,

  "ashrae-certifications-anki-deck": `### What is inside

250 MCQ cards sampled across ASHRAE personnel-certification themes: building energy modeling (BEMP), energy assessment (BEAP), commissioning (BCxP), HVAC / high-performance / healthcare design (CHD, HBDP, HFDP), and operations performance (OPMP). Same bank that feeds the free 50-question timed readiness check.

### Plan with the free ASHRAE mock

Study your credential’s candidate guidebook first. Then 15–20 cards/day for 2–3 weeks and sit the [free 50-question ASHRAE certifications readiness check](/mock-exams/ashrae-certifications-readiness-check) (100 min, 70% diagnostic). Official forms are mostly **115 items / 2.5 hours** (BCxP **130 / 120 scored**); pass points vary (e.g. BEMP **69/100**, BCxP **83/120**). Keep ASHRAE’s official 30-question practice exam and study guides separate from this multi-credential diagnostic.

### Pitfalls this deck targets

Candidates confuse BEMP vs BEAP vs BCxP blueprints, treat a single mega free Q-bank as credential-specific prep, and ignore pretest-item structure on official forms. Cards force cross-credential HVAC / energy / commissioning themes under spaced recall.

### What this does not replace

ASHRAE eligibility, application fees, credential-specific study guides, or the official 30Q practice exam. Independent prep — not ASHRAE material.`,
  "acsm-cpt-anki-deck": `### What is inside

120 MCQ cards across ACSM-CPT themes: client assessment, exercise programming, exercise science, and behavior & safety. Every card includes a correct explanation and notes on why the other options fail — the same bank as the free timed readiness check.

### 2–3 week study plan with the free mock

**Week 1:** 15–20 new cards/day across assessment and programming (PAR-Q+/risk, FITT-style loading). **Week 2:** Add science and behavior/safety cards; sit the [free 120-question ACSM CPT readiness check](/mock-exams/acsm-cpt-readiness-check). **Final days:** Review-only Anki on weak topics — keep official ACSM timing practice separate (**135 items / 150 minutes / scaled pass 550**).

### Pitfalls this deck targets

Candidates over-drill exercise science trivia and under-drill initial consultation, medical-clearance decisions, and legal/professional responsibilities (~10% of the official outline). Cards force all four domain clusters under spaced recall.

### What this does not replace

ACSM eligibility, CPR/AED requirements, GETP study, or the official ACSM-CPT exam. Independent prep — not ACSM material.`,
  "cdcp-anki-deck": `### What is inside

250 MCQ cards across the EXIN EPI CDCP facility and operations blueprint: site/standards/building, power & EMF, cooling/water/thermal, fire/security/network, and data-centre operations. Every card has a correct explanation plus short notes on why the other three options fail — the same bank that feeds the free timed readiness check.

### 3–4 week study plan with the free mock

**Week 1:** 20 new cards/day across power and cooling while you finish EPI course registration. **Week 2:** Keep 15–20 new cards/day and add fire/security. **Week 3:** Sit the [free 40-question CDCP readiness check](/mock-exams/cdcp-readiness-check) (60 minutes, 68% target). **Final days:** Review-only Anki on weak topics from the report — do not dump new cards the night before the accredited-course exam sitting.

### Pitfalls this deck targets

Candidates confuse CRAH vs CRAC, mix UPS topology tiers with marketing “N+1” claims, and forget that high RH causes condensation while low RH raises ESD risk. Cards force the facility distinction under timed recall, not brochure definitions.

### What this does not replace

Accredited EPI CDCP training is mandatory on the official exam path. This deck is independent spaced-repetition drill — not EXIN or EPI exam material.`,
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

Official CFA Level 2 is vignette / item-set across 10 equally weighted topics — this 60-question mock is a shorter diagnostic, not a CFA Institute mock.

### Pitfalls this deck targets

Level 2 failures often come from mis-applying inventory and lease adjustments in FSA vignettes, confusing FCFF vs FCFE setups, and weak ethics judgment under time pressure. Mega L1 leftovers do not train that item-set logic.`,

  "cfa-level-2-formula-reference-2026": `### What is inside

60 printable pages with **219 typeset formulas** and **276 examiner-style definitions** across all ten CFA Level 2 topic areas — Quant, Economics, FSA, Corporate Issuers, Equity, Fixed Income, Derivatives, Alternatives, Portfolio Management, and Ethics. Each row shows concept, typeset math, and a one-line plain-English meaning. The bundled **80-question Formula Recall Drill** tests whether you can name the concept behind a displayed formula under item-set timing.

### Study plan with the free mock and Anki deck

**Week 1:** Print weak-topic tables (Fixed Income, Equity, FSA first). **Week 2:** Run the 80-question recall drill timed; review every explanation. **Week 3:** Take the [free 60-question CFA Level 2 mock](/mock-exams/cfa-level-2-readiness-check) — no signup — and map topic gaps back to the PDF tables. **Week 4+:** Drill missed formulas in the [495-card Level 2 Anki deck](/decks/cfa-level-2-anki-deck) between mock retakes.

Official CFA Level 2 is vignette / item-set across 10 equally weighted topics — this PDF is a recall companion, not CFA Institute curriculum.

### Pitfalls this reference targets

Candidates lose item-set points from slow formula retrieval (duration/convexity families, residual income vs FCFE), mixing Level 1 ratio shortcuts with L2 adjustments, and skipping ethics application cards. The recall drill forces concept naming — not passive highlighting.`,

  "ciple-a2-european-portuguese-anki-deck": `### Which Portuguese pathways this deck targets

**CIPLE A2 (CAPLE)** is the University of Lisbon A2 diploma many candidates use as language evidence for Portuguese residency and citizenship. The same European Portuguese (PT-PT) high-frequency lexicon supports **autorização de residência** and **nacionalidade portuguesa** paperwork even when the exact certificate name on your case differs. Formats and bureaucracy change — everyday PT-PT vocabulary does not.

This deck is built for European Portuguese pronunciation and usage (not Brazilian Portuguese phrase lists). Cards pair headwords with meanings, contextual examples, and audio so you can rehearse the words CIPLE-style tasks and daily life both demand.

### 6–8 week study plan

**Weeks 1–2:** 15–20 new cards/day across housing, services, work, and health themes while you finish any official CAPLE registration checklist. **Weeks 3–4:** Keep new cards at 15/day and add 10 minutes of spoken recall (read example sentences aloud). **Weeks 5–6:** Review-heavy Anki; book a speaking partner or tutor once a week. **Final 7–10 days:** Mixed review only — no giant new-card dumps the week of the exam. Preview the sample cards on this page for the audio + example format before you buy.

### Pitfalls this deck targets

Candidates memorize Brazilian cognates that fail CAPLE listening, skip articles/prepositions that carry meaning in PT-PT, and confuse formal vs informal address. Cards keep European forms front-and-center and force example-sentence recall instead of isolated word lists.

### What makes this Gumroad edition different

PixID Studio Gumroad fulfillment with UniPrep2Go multi-pathway framing: CIPLE / CAPLE A2 plus residency and citizenship language prep — not a generic Brazilian Portuguese tourist pack.`,

  "delf-b2-french-anki-deck": `### Which French exams this deck targets

**DELF / DALF** is the lifetime diploma track used by universities, employers, and many visa offices. **TCF Canada** and **TEF Canada** dominate Express Entry / Quebec immigration scoring. **TCF ANF** supports French naturalization. **TCF général** supports admission to French universities. The same high-frequency lexicon also helps **fide / Swiss residency French** language prep and everyday **Belgian French** work-and-life vocabulary — soft overlap only, not official fide, SEM, or Belgian SEL formats. For Swiss federal civics (Staatskunde), buy the **Swiss Citizenship Anki Bundle** instead.

Score validity and task formats differ — the high-frequency French lexicon shared across those pathways does not.

This 2000+ card bank is a vocabulary depth layer, not a full listening/writing course. Use it to make lexical access automatic while you practice official formats elsewhere.

### Study plan across pathways

Drill 20 cards/day for eight to twelve weeks while you prepare your specific exam format (DELF/DALF productive tasks, TCF/TEF timed blocks, ANF naturalization requirements, or fide speaking practice). Keep speaking and timed practice separate from Anki. After each week, filter review to cards you failed twice — immigration and diploma sittings both punish slow retrieval more than missing obscure rare words.

### Pitfalls this deck targets

Candidates over-index on A1 survival phrases, ignore register (tu/vous, formal writing), and treat Canada vs France vs Swiss pathways as totally different vocabularies. This deck focuses the overlapping high-frequency core those pathways actually share — then cross-sells the Swiss civics bundle when the question is Staatskunde, not French words.

### What makes this Gumroad edition different

PixID Studio Gumroad fulfillment with UniPrep2Go multi-exam French framing: one vocabulary bank for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, and TCF général — with soft fide / Swiss residency and Belgian everyday French capture — not a DELF-only listing or A1 survival pack.`,

  "dutch-a2-inburgering-anki-deck": `### Which Dutch pathways this deck targets

**Inburgering** is the civic integration language track for many Dutch residency cases. Official Inburgering is **five modules** (KNM civics, ONA, plus speaking, writing, and listening/reading) — this deck is the **language lexicon**, not a single MCQ substitute for the whole path. **Staatsexamen NT2** (A2-range overlap) shares a large high-frequency Dutch core. The same lexicon supports everyday communication toward **naturalisatie** language expectations. Exam names and cut scores differ by municipality and year — confirm your required module officially.

This is **Netherlands language** prep — not Belgium Flanders **maatschappelijke oriëntatie** civics. For Flanders MO, use the free readiness check and planned waitlist deck.

Cards emphasize practical Dutch for work, housing, government services, and daily interaction — the vocabulary integration exams and real life both reward.

### Study plan

**Weeks 1–3:** 20 new cards/day with audio. **Weeks 4–6:** 15 new + heavy review; add weekly speaking practice. **Final two weeks:** Review only while you book official Inburgering/NT2 practice. Keep listening and speaking exams separate from Anki — flashcards build recall speed, not exam timing skill.

### Pitfalls this deck targets

Learners mix Belgian/Dutch variants inconsistently, skip separable verbs that carry meaning in A2 tasks, and cram tourist phrases instead of bureaucracy and workplace words. Cards prioritize Netherlands integration-relevant themes.

### What makes this Gumroad edition different

Multi-pathway Dutch framing (Inburgering + NT2 A2 + naturalisatie vocabulary) on PixID Studio Gumroad — not tourist phrase lists or Flanders MO civics.`,

  "german-a2-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** immigrant integration pathways share a large A2 vocabulary core. The same lexicon supports everyday German toward **residence / Einbürgerung language** expectations and **fide / Swiss residency German** prep — soft overlap only. This is **not** a Leben in Deutschland civics deck (use the Citizenship & Naturalization Anki Bundle) and **not** Swiss Staatskunde (use the Swiss Citizenship Anki Bundle).

Use this deck as the spaced-repetition layer beside your chosen institute’s practice papers.

### Study plan

20 cards/day for six to eight weeks before your Goethe, telc, ÖSD, DTZ, or fide speaking date. Practice each exam’s listening/speaking format separately. After week three, run a self-dictation: hear the audio, write the headword, check — DTZ and Goethe both punish weak sound–spelling links.

### Pitfalls this deck targets

Candidates confuse modal verb constructions, gender/article pairs, and formal letter vocabulary needed for A2 writing tasks — and mix language prep with civics quizzes. Cards keep articles with nouns and force example-sentence recall; civics stays on the dedicated citizenship products.

### What makes this Gumroad edition different

Goethe + telc + ÖSD + DTZ framing with soft Einbürgerung / fide language capture in one Gumroad product — not a single-brand certificate listing or a civics pack.`,

  "celi-b1-italian-anki-deck": `### Which Italian exams this deck targets

**CELI** (Università per Stranieri di Perugia), **CILS** (Siena), and **PLIDA** (Società Dante Alighieri) are the main Italian B1 certificates used for study, work, **permesso di soggiorno**, and **cittadinanza** language pathways (including CILS B1 cittadinanza-adjacent requirements). Bodies and task formats differ; intermediate vocabulary for daily life, work, and services overlaps heavily.

This deck is a B1 lexicon engine — pair it with official mocks for your chosen certificate. It is **not** an Italian civics / institutions quiz.

### Study plan

15–25 cards/day between classes for six to ten weeks. Add one speaking session weekly using card example sentences as prompts. In the final fortnight, stop new cards and review only leeches (cards you keep failing).

### Pitfalls this deck targets

Learners stay stuck at tourist A2 phrases, ignore passato prossimo vs imperfetto cues, and under-practice formal register for B1 writing or immigration interviews. Cards push intermediate verbs and service vocabulary those exams reward.

### What makes this Gumroad edition different

CELI + CILS + PLIDA multi-certificate framing with explicit permesso / cittadinanza language capture — one B1 vocabulary bank on Gumroad.`,

  "danish-a2-prove-i-dansk-anki-deck": `### Which Danish pathways this deck targets

**Prøve i Dansk** modules (**PD2** / **PD3** and related tracks) plus everyday Danish used for **permanent residence** and **citizenship** language requirements. Exact module names and score rules change — always confirm your required level with official Danish authorities before you book.

Cards focus high-frequency Danish with audio for work, housing, services, and daily interaction.

### Study plan

20 cards/day with audio for six to eight weeks. Keep oral exam practice separate from Anki. Record yourself reading example sentences twice a week — Danish oral modules punish silent vocabulary study.

### Pitfalls this deck targets

Candidates under-train listening discrimination, skip particle/verb combinations, and study tourist phrases instead of bureaucracy and workplace words. Audio-first review is built into the card format on this page’s samples.

### What makes this Gumroad edition different

PD2 / PD3 + residence/citizenship pathway copy — not a generic Danish tourist deck.`,

  "norwegian-a2-norskprove-anki-deck": `### Which Norwegian pathways this deck targets

**Norskprøve A2** (Bokmål) plus language prep for **permanent oppholdstillatelse** and **statsborgerskap**. Immigration language rules change — verify current requirements for your case with official sources. This deck trains everyday Bokmål for work, housing, services, and interaction — the vocabulary those pathways and Norskprøve both lean on.

### Study plan

20 cards/day with audio examples for six to eight weeks. Pair with weekly speaking/listening practice aimed at Norskprøve task types. Final ten days: review-only Anki while you take official sample tasks.

### Pitfalls this deck targets

Learners mix Bokmål/Nynorsk inconsistently, skip gender/article pairs, and cram English calques. Cards keep Bokmål forms and practical example sentences front-and-center.

### What makes this Gumroad edition different

Norskprøve + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "swedish-a2-sfi-anki-deck": `### Which Swedish pathways this deck targets

**SFI** (Swedish for Immigrants) A2 vocabulary, plus everyday Swedish used for **residence** and **citizenship** language requirements. Course levels and municipal pathways vary — confirm your required level officially. Cards cover work, housing, services, and daily interaction with audio and example sentences.

### Study plan

**Weeks 1–3:** 20 new cards/day with audio. **Weeks 4–6:** 15 new + review; add spoken recall of example sentences. **Final week:** Mixed review only while you prepare any official SFI or language-evidence appointment. Preview the three sample cards on this page before purchase to see the image + audio card style.

### Pitfalls this deck targets

Learners confuse en/ett gender, skip verb-second word order cues, and study tourist phrases instead of bureaucracy and workplace Swedish. Cards pair headwords with full example sentences so order and gender stick together.

### What makes this Gumroad edition different

SFI + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "greek-a2-ellinomatheia-anki-deck": `### Which Greek pathways this deck targets

**Ellinomatheia A2** vocabulary, plus everyday Greek used for **residence** and **citizenship** language requirements. Confirm your required level and exam session with official Ellinomatheia sources. Cards train high-frequency Modern Greek for work, housing, services, and daily interaction with audio and examples.

### Study plan

20 cards/day with audio for six to eight weeks. Add weekly reading aloud of example sentences — script familiarity matters for Greek orthography under exam pressure. Final ten days: review-only Anki plus any official practice materials you have booked.

### Pitfalls this deck targets

Candidates under-practice accent marks and script fluency, memorize isolated words without articles, and ignore service/bureaucracy vocabulary. Cards keep examples and audio tied to each headword.

### What makes this Gumroad edition different

Ellinomatheia + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "german-a2-for-ukrainian-speakers-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** share a large A2 German lexicon. This deck packages that bank for **Ukrainian speakers**: German headword, Ukrainian gloss, bilingual example, native German audio, and an image on each card. It is vocabulary recall — not a full mock exam and not Leben in Deutschland civics.

### Study plan

Aim for six to eight weeks of daily Anki before your Goethe, telc, ÖSD, or DTZ date: 20–25 new cards on weekdays. Say each German example out loud before flipping; treat the Ukrainian gloss as a last-resort check. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to German audio, and study tourist phrase lists instead of integration-frequency vocabulary. Bilingual examples + German audio reduce translation dependence.

### What makes this Gumroad edition different

Ukrainian-support German A2 framing (Goethe / telc / ÖSD / DTZ) on Gumroad — distinct from the English-gloss German multi-pathway deck.`,


  "german-a2-for-russian-speakers-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** share a large A2 German lexicon. This deck packages that bank for **Russian speakers**: German headword, Russian gloss, bilingual example, native German audio, and an image on each card. It is vocabulary recall — not a full mock exam and not Leben in Deutschland civics.

### Study plan

Aim for six to eight weeks of daily Anki before your Goethe, telc, ÖSD, or DTZ date: 20–25 new cards on weekdays. Say each German example out loud before flipping; treat the Russian gloss as a last-resort check. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Russian-speaking learners translate every sentence into Russian under time pressure, skip listening to German audio, and study tourist phrase lists instead of integration-frequency vocabulary. Bilingual examples + German audio reduce translation dependence.

### What makes this Gumroad edition different

Russian-support German A2 framing (Goethe / telc / ÖSD / DTZ) on Gumroad — distinct from the English-gloss German multi-pathway deck and the Ukrainian-support edition.`,

  "polish-a2-certyfikat-anki-deck": `### Which Polish pathways this deck targets

**Certyfikat języka polskiego** (state certificate as a Foreign Language) at **A2**, plus everyday Polish used for **residence** and **citizenship language** requirements. Exact module names and score rules change — confirm with official sources before you book.

This is **language** vocabulary — not Polish citizenship civics (wiedza o Polsce). For civics, take the free Polish Citizenship readiness check and join the planned waitlist.

### Study plan

20 cards/day with audio for six to eight weeks. Keep oral exam practice separate from Anki. Record yourself reading example sentences twice a week.

### Pitfalls this deck targets

Candidates under-train listening discrimination, skip case endings that carry meaning, and study tourist phrases instead of bureaucracy and workplace words.

### What makes this Gumroad edition different

Certyfikat A2 + residence/citizenship language pathway copy — not a generic Polish tourist deck or a civics pack.`,


  "polish-a2-for-ukrainian-speakers-anki-deck": `### Which Polish pathways this deck targets

**Certyfikat języka polskiego** A2 and everyday Polish for **residence** language — packaged for **Ukrainian speakers**: Polish headword, Ukrainian gloss, bilingual example, native Polish audio, and an image on each card. Vocabulary recall only — not Polish citizenship civics (wiedza o Polsce).

### Study plan

Aim for six to eight weeks of daily Anki before your Certyfikat or residence-language date: 20–25 new cards on weekdays. Say each Polish example out loud before flipping; treat the Ukrainian gloss as a last-resort check. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to Polish audio, and study tourist phrase lists instead of Certyfikat-frequency vocabulary. Bilingual examples + Polish audio reduce translation dependence.

### What makes this Gumroad edition different

Ukrainian-support Polish A2 framing (Certyfikat / residence language) on Gumroad — distinct from the English-gloss Polish Certyfikat deck and not a civics pack.`,

  "czech-a2-cce-anki-deck": `### Which Czech pathways this deck targets

**CCE** (Czech Language Certificate Exam) A2 vocabulary, plus everyday Czech used for **residence** and **citizenship** language requirements. Confirm your required level with official CCE sources before you register. Cards focus practical Czech for work, housing, services, and daily interaction with audio and example sentences.

### Study plan

20 cards/day with audio for six to eight weeks. Practice case endings in context by reading each example sentence aloud. Final fortnight: review-only Anki while you complete official CCE-oriented practice.

### Pitfalls this deck targets

Learners ignore case endings, study tourist menus instead of bureaucracy vocabulary, and skip listening. Audio + full-sentence examples on each card reduce “dictionary-only” study.

### What makes this Gumroad edition different

CCE + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "ielts-toefl-english-for-french-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank for **French speakers**: English headword, French gloss, bilingual example, native English audio, and an image on each card. It is vocabulary recall — not a full mock exam or writing scorer.

### Study plan

**Weeks 1–4:** 30 new English cards/day with audio; glance at the French gloss only after you attempt the meaning. **Weeks 5–8:** Cut new cards to 20/day and run one official IELTS or TOEFL practice section each weekend. **Final fortnight:** Suspend new cards; review leeches (cards failed twice) while you sit timed Reading/Listening sets.

### Pitfalls this deck targets

Francophone learners translate every sentence into French under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. Bilingual examples + English audio reduce translation dependence.

### What makes this Gumroad edition different

Prep2Go app bank (2,522 cards) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing and not a generic “learn English” pack without exam positioning.`,

  "ielts-toefl-english-for-arabic-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank for **Arabic speakers**: English headword, Arabic gloss, bilingual example, native English audio, and an image on each card. It is vocabulary recall — not a full mock exam or writing scorer.

### Study plan

Start with 25 cards/day for two weeks while you get used to English-first recall (Arabic on the back as confirmation). Raise to 35–40/day for the next month if review load stays under an hour. Book one full IELTS or TOEFL practice test every three weeks and spend the following day clearing only the Anki cards that match words you missed on that test.

### Pitfalls this deck targets

Arabic-speaking learners translate every sentence into Arabic under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. Bilingual examples + English audio reduce translation dependence.

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing and not a generic “learn English” pack without exam positioning.`,


  "ielts-toefl-english-for-ukrainian-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank for **Ukrainian speakers**: English headword, Ukrainian gloss, bilingual example, native English audio, and an image on each card. It is vocabulary recall — not a full mock exam or writing scorer.

### Study plan

Aim for nine to ten weeks of daily Anki before your IELTS or TOEFL date: 20–30 new cards on weekdays, lighter review on weekends. Say each English example out loud before flipping; treat the Ukrainian gloss as a last-resort check. In the last ten days, stop adding cards and clear overdue reviews while you take two timed practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. Bilingual examples + English audio reduce translation dependence.

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing and not a generic “learn English” pack without exam positioning.`,


  "ielts-toefl-english-for-russian-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank for **Russian speakers**: English headword, Russian gloss, bilingual example, native English audio, and an image on each card. It is vocabulary recall — not a full mock exam or writing scorer.

### Study plan

Front-load vocabulary for six weeks at 30–40 cards/day, then taper to review-heavy sessions while you sit Cambridge, IELTS, or TOEFL mocks. Keep English audio on; hide the Russian gloss until you have guessed the meaning. Once a week, export a filtered “again” queue and relearn only those leeches for 15 minutes.

### Pitfalls this deck targets

Russian-speaking learners translate every sentence into Russian under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. Bilingual examples + English audio reduce translation dependence.

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing and not a generic “learn English” pack without exam positioning.`,


  "ielts-toefl-english-for-spanish-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank specifically for **Latin American Spanish speakers**: English headword, LatAm Spanish gloss (not Spain-only Castilian framing), bilingual example, native English audio, and an image on each card. It is vocabulary recall for exam-frequency words — not a full mock exam, writing scorer, or DELE Spanish vocabulary product.

### Study plan

Use a 12-week calendar if your IELTS/TOEFL date is far out: months one and two at ~35 new cards/day, month three at 15 new + heavy review. Always hear the English audio before reading the LatAm Spanish gloss. Every Sunday, mark cards you still fail and bury easy ones so weekday sessions stay under 45 minutes. Once weekly, sit an official practice Listening/Reading section and note unknown lexis into a filtered Anki tag.

### Pitfalls this deck targets

Spanish-speaking learners translate every sentence into Spanish under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. LatAm bilingual examples + English audio reduce translation dependence without teaching Spain-only slang as “exam English.”

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards, LatAm Spanish) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing, not a DELE Spanish deck, and not the Russian/Portuguese-speaker sibling packs with different glosses.`,


  "ielts-toefl-english-for-portuguese-speakers-anki-deck": `### Who this deck is for

**Brazilian Portuguese (PT-BR) speakers** preparing **IELTS**, **TOEFL iBT**, Cambridge English (B2 First / C1 Advanced), or **PTE Academic** for study abroad, skilled migration, or professional registration. Typical use cases: Canada Express Entry / SDS IELTS, Australian student or skilled visas, UK student route, U.S. graduate TOEFL, and university English thresholds in Europe. It is **English vocabulary Anki**, not a CIPLE / CAPLE European Portuguese citizenship deck and not a Celpe-Bras product.

### Card face (what you see every review)

- **Front:** English headword (+ image where included)
- **Back:** Brazilian Portuguese (PT-BR) gloss, bilingual example sentence, native English audio
- **Drill rule:** hear English → guess meaning → only then open the PT-BR gloss

Free AnkiWeb dumps for “Inglês–Português” are usually tourist phrases, phrasal-verb dumps, or undated frequency lists without IELTS/TOEFL framing. This listing ships **2,504** exam-frequency cards from the Prep2Go bank as one Gumroad \`.apkg\` at **$26**.

### PT-BR false friends that break Reading scores

Brazilian candidates lose easy IELTS/TOEFL Reading points when they map Portuguese cognates 1:1. Drill these as English-first (examples of traps this bank helps you notice — not a closed false-friend list):

| Portuguese lookalike | Wrong English guess | Exam-safe English sense |
| --- | --- | --- |
| *atual* | “actual” | **current / present** |
| *pretender* | “pretend” | **intend / plan** |
| *assistir* | “assist” | **watch / attend** (assist = help) |
| *procurar* | “procure” (overformal) | **look for / seek** |
| *êxito* | “exit” | **success** |
| *relatório* | “relatory” | **report** |

Anki forces spaced English recall so you stop translating under Listening/Reading time pressure.

### Eight-week study plan (IELTS Academic or TOEFL)

| Weeks | Daily Anki | Pair with |
| --- | --- | --- |
| 1–5 | ~25 new cards/day + reviews | One official Listening or Reading section each weekend |
| 6–7 | New cards taper; clear “Again” queue | Full practice test (British Council / ETS / Cambridge) |
| 8 | Reviews only | Re-learn every word you missed on the last mock |

Always play English audio before reading the PT-BR gloss. If you still need Portuguese on the back after week 4, tag those cards and review them twice on weekdays.

### What this deck is not

- Not **CIPLE A2 / CAPLE** European Portuguese (use the separate CIPLE Anki if you need PT-PT for nationality)
- Not **European Portuguese** glosses — this edition is **PT-BR**
- Not a full Writing Task 2 scorer, Speaking partner, or timed mock exam
- Not official IELTS, ETS TOEFL, Cambridge Assessment, or Pearson PTE material

### What makes this Gumroad edition different

Prep2Go app bank (**2,504** cards, Brazilian Portuguese) with UniPrep2Go IELTS/TOEFL framing on Gumroad at **$26** — instant \`.apkg\`, not a Lemon-only listing, not AnkiWeb tourist packs, and not a CIPLE / CAPLE European Portuguese vocabulary deck.`,


  "delf-prim-printable-french-flashcards": `### Who this printable is for

**DELF Prim** learners ages **7–12** and parents/teachers who want paper flashcards with pictures and QR pronunciation — not an adult Anki vocabulary bank or a full DELF Prim exam course.

### How to use at home or in class

Print both PDFs at 100% on A4, cut along the dashed lines (six cards per page), and scan the QR on each card for audio while reviewing. Short sessions (10–15 minutes) beat long cram nights for this age group. Keep speaking games and picture description separate from card cutting day.

### Pitfalls this printable targets

Kids memorize English glosses without listening, adults buy adult DELF Anki by mistake, and classrooms lack cut-ready picture cards. This product is kids-first paper + QR audio at a single $12 price.

### What makes this Gumroad edition different

Kids-first DELF Prim framing at **$12** with two instant PDF downloads — separate from the adult DELF DALF TCF TEF Anki deck.`,

  "swiss-citizenship-anki-deck": `### Who this bundle is for

Applicants preparing **Swiss ordinary naturalisation** federal Staatskunde in **German, French, or Italian** who want daily Anki recall of politics, direct democracy, history, geography, the social system, and the naturalisation process — not a substitute for the commune brochure.

### The problem it solves

Cantonal exams run in an official language, not English. Blog quizzes mix federal and local facts. This bundle keeps **DE / FR / IT** in separate \`.apkg\` files so you drill the federal block in the language your canton uses.

### What's inside

Three separate \`.apkg\` files in one **$12** download: Einbürgerung Schweiz (**206**), Naturalisation Suisse (**206**), Naturalizzazione Svizzera (**206**) — **618** cards total.

### Study plan

Import the language file for your canton, then **20–30 cards/day** while you study commune materials. Pair with the free UniPrep2Go DE / FR / IT readiness checks. Final week: reviews only.

### What makes this Gumroad edition different

One **$12** three-language Swiss civics bundle with instant download — spaced repetition for the federal block, waitlist-free after the free mocks.`,

  "citizenship-naturalization-anki-bundle": `### Who this bundle is for

Applicants preparing a **citizenship or naturalization civics** test in **Germany, France, the UK, Canada, Australia, or the United States** who are done with random blog quizzes and want daily Anki recall — text-first cards, not language-vocabulary media, and not a substitute for the official handbook.

### The problem it solves

Civics facts scatter across six countries. Free quizzes mix pathways. Interview day is not the moment to blank on rights, institutions, or “what is the supreme law of the land?” This bundle keeps each country in its own \`.apkg\` so you only drill what your application needs.

### What's inside

Six separate \`.apkg\` files in one **$20** download: Leben in Deutschland (**296**), Naturalisation française (**200**), Life in the UK (**201**), Canadian Citizenship (**200**), Australian Citizenship (**200**), and U.S. Citizenship (**128**) — **1,225** cards total. Study one country; keep the others for family members on other pathways.

### Study plan

Import the country file, then **20–30 cards/day for four to six weeks** while you read the official civics handbook. Use any free official practice tests your government publishes. Anki owns fact recall (dates, rights, institutions); handbooks and mocks own the rest. Final week: reviews only.

### Pitfalls this bundle targets

Mixing Germany with UK facts in one notes app, buying six separate listings, or relying on outdated quizzes. Separate country files + one checkout keep pathways clean.

### What makes this Gumroad edition different

One **$20** multi-country civics bundle with instant download of all six decks — spaced repetition instead of another bookmark pile.`,

  "dele-a2-spanish-anki-deck": `### Which Spanish pathways this deck targets

**DELE A2** (Instituto Cervantes) vocabulary plus overlapping **SIELE A2**-style word knowledge for candidates who need Spanish lexical depth. This is language only — **no CCSE** Spanish nationality civics file. If you need CCSE, use official Cervantes citizenship materials separately.

### Study plan

20 cards/day with examples and audio where included for six to eight weeks. Pair with speaking and listening practice aimed at DELE task types; keep official Cervantes mocks separate from Anki. Final week: review-only Anki.

### Pitfalls this deck targets

Learners buy a DELE+CCSE bundle when they only need vocabulary, confuse Latin American vs Peninsular high-frequency items inconsistently, and skip example-sentence recall. This listing is a single DELE/SIELE vocabulary \`.apkg\`.

### What makes this Gumroad edition different

Single DELE / SIELE vocabulary .apkg on Gumroad — not a DELE + CCSE nationality bundle.`,

  "dele-a2-ccse-spanish-citizenship-bundle": `### What is inside

60 compact MCQ cards spanning DELE A2-adjacent language themes and CCSE civics (constitution, institutions/rights, geography/culture, everyday procedures). Delivered as a Gumroad .apkg companion for candidates who want a light language + civics drill — not a full Cervantes substitute. Pairs with the free timed [CCSE España readiness check](/mock-exams/ccse-espana-readiness-check) (60Q / 45 min / 60% diagnostic). Official Cervantes CCSE is **25 items / 45 minutes / 60%**; DELE A2 is a separate language exam. For thicker DELE vocabulary and full CCSE Anki stacks, use Prep2Go.

### Study plan with the free mock

Light daily Anki (10–15 new cards), then sit the free CCSE diagnostic once. Keep DELE speaking/writing practice separate from Anki recall. Do not treat this 60-card pack as full nationality prep.

### What this does not replace

Official DELE/SIELE registration, CCSE booking, residency paperwork, or Instituto Cervantes materials.`,

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

Roughly 300 prompts organized for the January 2026 PTCE: top 200 brand/generic pairs, common sig codes (q.d., b.i.d., p.r.n.), days-supply calculations, DEA schedules, DSCSA traceability basics, recall and error-prevention workflow, and federal law. Official PTCE is **90 questions (80 scored + 10 pretest) / 1 hour 50 minutes / scaled pass 1,400** at Pearson VUE (in-person; online proctoring suspended December 12, 2025). Math cards use the short integer setups the exam favors — no alligation or compounding (removed from the 2026 outline).

### Shift-friendly study plan with the study guide

**Start:** Take the [free 90-question PTCB mock](/mock-exams/ptcb-pharmacy-technician-mock) for domain-weighted baseline scores. **Weeks 4–3:** Read Medications and Federal Requirements chapters in the [PTCB Study Guide 2026](/decks/ptcb-study-guide-2026); 15 Anki cards per shift. **Week 2:** Take the guide's 80-question practice exam; drill missed domains in Anki only. **Final week:** Print cheat sheets from the guide; mixed Anki review — 10–15 cards per shift.

### Pitfalls this deck targets

Technicians miss look-alike/sound-alike pairs, misread sig abbreviations, and forget schedule II storage rules. Cards repeat high-error pairs the 2026 blueprint emphasizes.`,

  "ace-cpt-anki-deck": `### What is inside

300 prompts mapped to ACE CPT competency themes: client interviewing and preparticipation screening, FITT-VP program design and progression, instruction and spotting under load, and professional conduct / risk management / business ethics. Cards force session decisions — when to refer, how to regress, what stays inside trainer scope — not trivia slogans.

### Plan with the free ACE mock

**Start:** Take the [free 60-question ACE CPT readiness check](/mock-exams/ace-cpt-readiness-check) for topic scores. **Weeks 3–2:** 20 Anki cards/day on your lowest domain. **Final week:** Retake the mock; drill only missed stems plus professional-scope cards.

### Pitfalls this deck targets

Candidates skip screening, load dysfunctional patterns, or drift into diagnosis and medical nutrition therapy. Cards isolate those stop-or-refer boundaries.`,

  "ptcb-study-guide-2026": `### What is inside

Four review chapters sized to January 2026 PTCE weights: Medications (35%), Federal Requirements (18.75% — including DSCSA), Patient Safety & QA (23.75%), and Order Entry & Processing (22.5%). The 80-question practice exam matches real PTCE **scored** length (28/15/19/18) with a domain-scored answer key. Official PTCE is **90 questions (80 scored + 10 pretest) / 1 hour 50 minutes / scaled pass 1,400** at Pearson VUE (in-person; online proctoring suspended December 12, 2025). Three cheat sheets cover 60 high-yield drugs A–Z, 45 prescription sig codes, and pharmacy math formulas with worked examples. The free 90-question online mock and 300-card Anki deck are companion products (not bundled inside the PDF download).

### 4-week study plan with the Anki deck

**Week 1:** Take the [free 90-question PTCB mock](/mock-exams/ptcb-pharmacy-technician-mock), then Medications chapter + 15 [PTCB Anki](/decks/ptcb-pharmacy-technician-anki-deck) cards/day. **Week 2:** Federal Requirements and Patient Safety chapters. **Week 3:** Order Entry chapter; take the 80-question practice exam under timed conditions. **Week 4:** Review every missed explanation; print cheat sheets; Anki review only on weak domains.

### Pitfalls this deck targets

Candidates still study removed compounding/alligation topics or under-weight Federal Requirements. This guide front-loads DSCSA and DEA schedule rules at the new 18.75% weight — then routes weak domains to the free mock and optional Anki drills.`,

  "mrics-quantity-surveying-anki-deck": `### What is inside

Focused QS-pathway prompts for RICS APC: NRM measurement and costing, design economics / cost planning, contract practice (JCT and NEC options), procurement and tendering, project finance reporting, construction technology, and mandatory ethics. Cards are interview-ready definitions and scenario boundaries — not a mega-pack of mixed surveying trivia.

### Plan with the free QS mock

**Phase 1:** Sit the [free 50-question MRICS QS readiness check](/mock-exams/mrics-quantity-surveying-readiness-check). **Phase 2:** 20–25 Anki cards/day on your lowest competency rows. **Phase 3:** Retake the mock; spend final week on ethics + your weakest Level 3 core only.

### Pitfalls this deck targets

Candidates confuse NRM1/2/3 uses, mix NEC Option B BOQ rules with activity schedules, and under-prepare ethics scenarios for the final assessment interview. Cards force those distinctions.`,

  "mrics-anki-deck": `### What is inside

250+ cross-pathway MRICS APC cards for mandatory competencies, ethics and Rules of Conduct, core technical themes, Level 2/3 application and advice, and case-study / interview structure. Same bank themes as the free timed APC readiness check. Built for spaced interview recall — not a substitute for written APC evidence.

### Plan with the free MRICS APC mock

**Phase 1:** Sit the [free 50-question MRICS readiness check](/mock-exams/mrics-readiness-check) (100 min / 70% diagnostic). **Phase 2:** 20–25 Anki cards/day on ethics and your weakest mandatory rows (ethics can auto-refer). **Phase 3:** Keep writing Level 2/3 examples and case-study drafts; retake the mock before booking the 60-minute interview. QS candidates who need NRM/JCT depth should add the [MRICS QS deck](/decks/mrics-quantity-surveying-anki-deck).

Official APC remains **written submission + 60-minute final assessment interview** — this MCQ diagnostic is knowledge rehearsal only.

### Pitfalls this deck targets

Candidates treat free browser flashcards as the APC, under-drill Rules of Conduct, or confuse this cross-pathway deck with the QS-only NRM/contracts SKU. Cards force ethics + Level 3 framing under spaced recall.

### What this does not replace

RICS APC registration, pathway guides, written submissions, or the final interview. Independent prep — not RICS material.`,

  "leed-green-associate-anki-deck": `### What is inside

250+ LEED Green Associate cards across integrative process, location & transportation, sustainable sites & water, energy & atmosphere, and materials/IEQ — the same domain bank as the free timed readiness check. Built for spaced recall of credit intents and high-yield GA terminology, not a 700-question lead-gen dump.

### Plan with the free LEED GA mock

**Phase 1:** Sit the [free 50-question LEED GA readiness check](/mock-exams/leed-green-associate-readiness-check) (100 min / 70% diagnostic). **Phase 2:** 20–25 Anki cards/day on your weakest domains. **Phase 3:** Retake the mock; finish with energy/atmosphere and materials/IEQ if those rows lag. Official GBCI exam is **100Q / 2 hours / scaled 170** — keep that pacing separate from this shorter diagnostic.

### Pitfalls this deck targets

Candidates memorize random green-building trivia without credit-category structure, or treat free mega Q-banks as a substitute for timed diagnosis + spaced repair. Cards force LEED process and category framing.

### What this does not replace

USGBC/GBCI registration, candidate handbook study, or the official Prometric/online exam. Independent prep — not USGBC material.`,

  "pmp-anki-deck": `### What is inside

346+ PMP cards mapped to the 2026 Exam Content Outline: People (33%), Process (41%), and Business Environment (26%). Predictive, agile, and hybrid judgment prompts — same domain themes as the free readiness check.

### Plan with the free PMP mock

**Phase 1:** Sit the [free PMP readiness check](/mock-exams/pmp-readiness-check) for domain scoring. **Phase 2:** 20–25 Anki cards/day biased to your lowest domain (Business Environment jumped in 2026 — do not under-weight it). **Phase 3:** Move to a full-length **180Q / 240 min** simulator only after domain scores stabilize. Official PMI sitting has no published fixed % cut — review domain performance on the score report.

### Pitfalls this deck targets

Candidates grind AnkiWeb dumps or AI-generated cards without ECO domain weights, or jump straight into 180-question sims before knowing which domain fails. Cards keep People / Process / Business Environment in daily rotation.

### What this does not replace

PMI eligibility hours, authorized training, or the official Pearson VUE / online proctored exam. Independent prep — not PMI material.`,

  "parapro-anki-deck": `### What is inside

Planned 60-card ParaPro Anki for ETS Assessment 1755 themes: reading skills, writing skills, mathematics, and classroom application. Same topic map as the free timed readiness check.

### Plan with the free ParaPro mock (live now)

**Phase 1:** Sit the [free 60-question ParaPro readiness check](/mock-exams/parapro-readiness-check) (75 min diagnostic). **Phase 2:** Drill weak subjects with ETS Study Companion samples and (when live) this Anki deck. **Phase 3:** Schedule Assessment **1755** — official form is **90 selected-response / 150 minutes**. Many districts use a **460** scaled cut — verify your employer/state requirement.

### Pitfalls this deck targets

Candidates treat a shorter free diagnostic as a full ETS form, or ignore classroom-application items (~1/3 of each subject). Cards (when shipped) force skills + application framing.

### What this does not replace

ETS registration, the free Study Companion PDF, or paid ETS interactive practice. Anki is planned on UniPrep — not a live Gumroad SKU yet. Independent prep — not ETS material.`,

  "series-63-anki-deck": `### What is inside

Series 63 cards for NASAA Uniform Securities Act themes: broker-dealer and agent registration, unethical business practices, communications with the public, and investment adviser basics. Built for state-law repair after SIE / Series 7 — same themes as the free timed readiness check.

### Plan with the free Series 63 mock

**Phase 1:** Sit the [free 60-question Series 63 readiness check](/mock-exams/series-63-readiness-check). **Phase 2:** 15–20 Anki cards/day on your weakest law rows. **Phase 3:** Retake the mock; finish on ethics and communications if those domains lag. Confirm current NASAA outline and state scheduling separately.

### Pitfalls this deck targets

Candidates reuse SIE product cards for Series 63, under-drill USA registration exemptions, and confuse federal vs state jurisdiction. Cards force state-law framing under spaced recall.

### What this does not replace

NASAA outlines, state registration, or the official exam. Independent prep — not NASAA material.`,

  "medicare-counseling-anki-deck": `### What is inside

Planned SHIP Medicare counseling Anki for Parts A/B/C/D literacy, beneficiary rights and appeals, fraud/abuse awareness, and unbiased counseling standards. Same theme map as the free timed readiness check.

### Plan with the free Medicare counseling mock (live now)

**Phase 1:** Complete your state SHIP training modules. **Phase 2:** Sit the [free 60-question Medicare counseling readiness check](/mock-exams/medicare-counseling-readiness-check). **Phase 3:** Drill weak themes with state materials and (when live) this Anki deck before your office schedules OCCT or local certification.

### Pitfalls this deck targets

Candidates invent a national fixed Q-count/pass score, skip Part D comparison practice, or treat this diagnostic as a state SHIP certificate. There is no public national published item count — verify locally.

### What this does not replace

State SHIP training, OCCT scheduling, or your program’s certificate. Anki is planned on UniPrep — not a live Gumroad SKU yet. Independent prep — not SHIP TA Center material.`,

  "czech-citizenship-anki-deck": `### What is inside

Planned Czech citizenship reálie Anki for zkouška z českých reálií themes: state/constitution/rights, history–geography–EU, society & daily life, and education/health/public services. Same topic map as the free timed readiness check.

### Plan with the free Czech reálie mock (live now)

**Phase 1:** Confirm you need reálie (citizenship) vs language-only permanent residence (often A2). **Phase 2:** Sit the [free 60-question Czech Citizenship readiness check](/mock-exams/czech-citizenship-readiness-check) (45 min / 70% diagnostic). **Phase 3:** Drill the official NPI ~300-item databank and interactive 30-question model test on [cestina-pro-cizince.cz](https://cestina-pro-cizince.cz/obcanstvi/). **Phase 4:** Join this Anki waitlist for spaced recall when the .apkg ships; keep B1 language on a separate track (Czech CCE Anki).

### Pitfalls this deck targets

Candidates treat a longer free diagnostic as the official 30/30/60% form, confuse trvalý pobyt A2 language with citizenship reálie, or skip the published NPI pool. Cards (when shipped) force civic framing under spaced recall.

### What this does not replace

MV ČR / NPI registration, the official databank/model test, or the B1 language exam. Anki is planned on UniPrep — not a live Gumroad SKU yet. Independent prep — not MV ČR material.`,

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

Official DRE salesperson exam is **150 questions (75 national + 75 state) / 3 hours 15 minutes / 70% on both portions**. Our free mock is a **60-question** diagnostic — not a 1,500-question course Q-bank.

### Pitfalls this deck targets

Applicants confuse agency relationships (seller's agent vs dual agent), disclosure delivery deadlines, and trust fund handling. Cards use California statutory framing.`,

  "fl-real-estate-anki-deck": `### What is inside

60 Florida-specific MCQ cards across FREC sales associate themes: license law & FREC rules, contracts/titles/conveyances, finance/appraisal math, and property/brokerage practice. Same bank themes as the free timed Florida readiness check.

### Plan with the free FL mock

Finish the 63-hour pre-license course first. Then 15–20 cards/day for two weeks and sit the [free 60-question Florida readiness check](/mock-exams/fl-real-estate-readiness-check) (75 min, 70% diagnostic). Official DBPR exam is **100Q / 3.5h / 75%** — keep that pacing separate from this shorter diagnostic.

### Pitfalls this deck targets

Candidates over-study national principles and under-drill Florida license law, homestead/disclosure themes, and daily math. Cards force Florida framing under spaced recall.

### What this does not replace

DBPR/FREC registration, required coursework, or the official Pearson VUE exam. Independent prep — not DBPR material.`,

  "tx-real-estate-anki-deck": `### What is inside

60 Texas-focused MCQ cards across TRELA/TREC license law, contracts & agency, finance/closing math, and property practice. Same themes as the free timed Texas readiness check.

### Plan with the free TX mock

Complete TREC qualifying education, then 15–20 cards/day. Sit the [free 60-question Texas readiness check](/mock-exams/tx-real-estate-readiness-check) mid-prep; repair the weaker of national-style vs Texas-law rows. Official exam is dual national + state (~70% each portion) — confirm current Pearson outline.

### Pitfalls this deck targets

Candidates pass one portion mentally and ignore the other. Cards keep TRELA/TREC agency and Texas contract themes in daily rotation.

### What this does not replace

TREC education hours, Pearson VUE scheduling, or the official dual-portion exam. Independent prep — not TREC material.`,

  "ny-real-estate-anki-deck": `### What is inside

60 New York-focused MCQ cards across DOS license law, contracts/agency/fair housing, finance/valuation/closing, and property practice. Same themes as the free timed NY readiness check.

### Plan with the free NY mock

Finish qualifying education, then 15–20 cards/day. Sit the [free 60-question NY readiness check](/mock-exams/ny-real-estate-readiness-check) (90 min, 70% diagnostic). Official NYDOS exam is **75Q / 90 min / 70%** (pass/fail only) — practice that pacing separately.

### Pitfalls this deck targets

Candidates drill generic national packs and miss New York DOS license-law and co-op/condo-adjacent practice themes. Cards keep NY framing under spaced recall.

### What this does not replace

NYDOS registration, qualifying hours, or the official eAccessNY exam. Independent prep — not DOS material.`,

  "series-65-anki-deck": `### What is inside

120 focused Series 65 MCQ cards across economics & analysis, investment products, client recommendations, and laws & ethics — the same theme map as the free timed Series 65 readiness check.

### Plan with the free Series 65 mock

15–20 cards/day for two to three weeks, then the [free 120-question Series 65 readiness check](/mock-exams/series-65-readiness-check). Official NASAA exam is **130 scored (+10 pretest) / 180 minutes / 92 correct** — use a full-length Q-bank for final pacing; this deck is weak-topic repair.

### Pitfalls this deck targets

Candidates confuse Series 65 vs 66 scope, under-drill ethics/state law, and treat 70% as the official cut (it is not — pass is 92/130). Cards keep suitability and ethics in rotation.

### What this does not replace

NASAA/FINRA registration or the official Series 65. Independent prep — not NASAA material.`,

  "mortgage-loan-originator-anki-deck": `### What is inside

120 SAFE MLO MCQ cards across origination process, mortgage products, federal law, and ethics/Uniform State Content — aligned to the free timed MLO readiness check.

### Plan with the free MLO mock

15–20 cards/day, then the [free 120-question SAFE MLO readiness check](/mock-exams/mortgage-loan-originator-readiness-check). Confirm current NMLS national test length and cut score before exam day; use this deck for weak-topic repair after the diagnostic.

### Pitfalls this deck targets

Candidates over-drill products and under-drill RESPA/TILA/ECOA ethics judgments. Cards force federal-law and USC themes under spaced recall.

### What this does not replace

NMLS enrollment or the official SAFE MLO national test. Independent prep — not NMLS material.`,

  "bench-energy-metal-trader-anki-deck": `### What is inside

202 metals-desk cards: LME cash vs 3-month, warrants and warehouse receipts, contango and backwardation, cash-and-carry economics, base metals (copper, aluminium, zinc) and precious metals pricing language, and common desk abbreviations. Prompts are lexicon and mechanics — not CFA curriculum clones.

### Desk onboarding plan

**Week 1:** 25 new cards/day on LME structure and curve vocabulary. **Week 2:** Base vs precious product terms; review carry math daily. **Week 3:** Suspend easy cards; drill only leeches before interviews or rotation onto the metals desk.

### Pitfalls this deck targets

New analysts mix cash and 3M, confuse contango profit conditions with backwardation squeeze narratives, and misuse LME terminology in client chats. Cards force the exact desk definitions.`,

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
