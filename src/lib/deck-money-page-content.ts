import type { Deck } from "./decks";
import type { DeckPositioning } from "./deck-positioning";
import { getDeckLinkedMock } from "./deck-seo";
import { getDeckPracticeMock } from "./deck-funnel";

export const pitchOverrides: Partial<Record<string, string>> = {
  "cfa-level-1-anki-deck":
    "348 flashcards mapped to all 10 CFA Level 1 topic weights — pairs with the printable 2026 formula reference PDF.",
  "cfa-level-1-formula-reference-2026":
    "54-page 2026 formula reference: 250 formulas + 98 definitions by topic plus an 80-question recall drill with answer key.",
  "cfa-level-2-anki-deck":
    "495 vignette-depth cards across all 10 CFA Level 2 topics — plus a free 60-question / 120-minute mock and the matching formula PDF. Not a Level 1 leftover dump.",
  "cfa-level-2-formula-reference-2026":
    "60-page 2026 L2 formula reference: 219 formulas + 276 definitions plus an 80-question recall drill — pairs with the free 60Q item-set diagnostic.",
  "cat4-level-d-anki-deck-printable-pdf":
    "200 Anki cards + 49-page PDF for CAT4 Level D verbal and quantitative subtests (Year 7) — not the spatial or figure batteries.",
  "frm-part-1-anki-deck":
    "444 cards across FRM Part 1 foundations, quant, markets, and valuation — with a free 50-question readiness check.",
  "bench-energy-metal-trader-anki-deck":
    "202 metals-desk cards: LME, cash/3M carry, contango/backwardation, base and precious metals vocabulary.",
  "sie-exam-anki-deck":
    "300 cards aligned to FINRA SIE topic weights — free 25-question diagnostic or full 75-question timed mock.",
  "delf-b2-french-anki-deck":
    "2,115 French cards for DELF/DALF, TCF/TEF Canada, and ANF — the high-frequency bank visa and diploma sittings actually share.",
  "dutch-a2-inburgering-anki-deck":
    "1,897 Dutch A2 cards with audio for Inburgering / NT2 — built for residency and naturalisatie deadlines, not tourist phrases.",
  "german-a2-anki-deck":
    "2,115 German A2–B1 cards for Goethe, telc, ÖSD, and DTZ — the shared lexicon residence and Einbürgerung pathways reuse.",
  "series-7-anki-deck":
    "Series 7 flashcards: 300 Top-Off cards for suitability, products, and order flow — plus a free 60-question Series 7 mock (official exam is 125 scored + 5 pretest / 3h45 / passing score 72 equated).",
  "servsafe-manager-anki-deck":
    "300 food-safety cards for TCS temps, HACCP, hygiene, and manager duties — plus a free 90-question ServSafe mock (official 80 scored + 10 pilot / 2h; official pass 70% (56/80) · 75% readiness target).",
  "gre-anki-deck":
    "350 Verbal + Quant cards for the shorter GRE — free 30-question / 45-minute readiness check is live now (both axes required). Not a Magoosh/Manhattan vocab mega.",
  "gmat-focus-anki-deck":
    "$11 / 200 unique cards rewritten October 2026 for the current GMAT (Quant + Verbal + Data Insights) — no Sentence Correction, no Quant geometry. Free 45-question timed check. SuperScore live since 12 Aug 2026.",
  "sat-anki-deck":
    "$11 / 160 unique Digital SAT cards (88 Reading and Writing + 72 Math) + free 49-question / 70-minute timed check scored on both official axes. Live Gumroad .apkg — not waitlist.",
  "ptcb-pharmacy-technician-anki-deck":
    "300 PTCE cards weighted to the 2026 outline — drugs, law, safety, sigs, and math — pairs with the 2026 printable study guide PDF.",
  "luxembourg-vivre-ensemble-anki-deck":
    "239 French + 239 English Vivre ensemble cards in subdecks for the 3 official exam modules, each with a key-point explanation — facts checked against the 2023 Constitution. $16 one-time for both languages, plus a free 40-question, 60-minute exam simulation. Not Sproochentest.",
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
    "January 2026 PTCE outline/blueprint PDF — DSCSA-weighted Federal Requirements, 80-question exam, cheat sheets + free 90Q online mock.",
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
    "250 California DRE-only cards + free 60Q timed mock — not a national Quizlet pack; official DRE salesperson exam is 150Q / 3 hours / 70%.",
  "series-63-anki-deck":
    "$11 Series 63 flashcards (250 NASAA cards) + free 60Q timed mock — state-law repair after SIE/7; not official NASAA material.",
  "dele-a2-ccse-spanish-citizenship-bundle":
    "$29 / 2,463 cards in two .apkg files: 2,120 DELE A2 vocab cards with audio + 343 CCSE civics cards. Free 60Q CCSE diagnostic — official CCSE is 25Q / 45 min / 60%.",
  "citizenship-naturalization-anki-bundle":
    "Multi-country citizenship Anki bundle + free timed civics diagnostics (UK / CA / AU / more) — not a single-country handbook dump.",
  "medicare-counseling-anki-deck":
    "Planned SHIP Medicare counseling Anki. Take the free 60Q diagnostic now — no national published Q-count; verify your state SHIP/OCCT path.",
  "czech-citizenship-anki-deck":
    "$9 / 169 Czech reálie cards + free 60Q / 45 min diagnostic — official zkouška z reálií is 30Q / 30 min / 60% from the NPI ~300-item pool.",
  "danish-a2-prove-i-dansk-anki-deck":
    "1,000 Danish PD2/PD3 cards with audio (≈ B1/B1+, not PD1/A2) — residence/citizenship language framing vs free AnkiWeb LITE 100.",
  "nha-cbcs-anki-deck":
    "Planned 60-card NHA CBCS Anki (coding, claims, HIPAA, revenue cycle). Free 60Q / 75 min diagnostic live now — official CBCS is 100+25 / 3h / scaled 390. ≠ AAPC CPC.",
  "aha-bls-provider-anki-deck":
    "Planned 60-card AHA BLS Provider Anki (adult CPR/AED, infant technique, FBAO, team dynamics). Free 60Q / 45 min / 84% cognitive diagnostic live now — official HeartCode BLS is ~25Q / 84% plus skills. 2025 science. ≠ Heartsaver / ACLS.",
  "ardms-spi-anki-deck":
    "Planned 60-card ARDMS SPI Anki (physics, transducers, Doppler, artifacts/safety). Free 60Q / 75 min diagnostic live now — official SPI is ~110Q / 2h / scaled 555. Text/physics only; ≠ ABD/OB.",
  "ascp-mlt-anki-deck":
    "Planned 60-card ASCP MLT Anki (blood bank, chemistry, hematology, microbiology). Free 60Q / 75 min diagnostic live now — official BOC MLT is 100Q / 2h30 CAT / scaled 400. ≠ MLS; CA-only MLT form is 80Q / 2h.",
  "aswb-bachelors-anki-deck":
    "Planned 60-card ASWB Bachelors Anki (HBSE, assessment, intervention, ethics). Free 60Q / 75 min diagnostic live now — official from 3 Aug 2026 is 122Q / 4h. ≠ Clinical/LCSW.",
  "aswb-clinical-anki-deck":
    "Planned 60-card ASWB Clinical Anki (clinical assessment, diagnosis concepts, psychotherapy, ethics). Free 60Q / 75 min diagnostic live now — official from 3 Aug 2026 is 122Q / 4h. ≠ Bachelors/LSW.",
  "barber-state-anki-deck":
    "Planned 60-card NIC-style barber theory Anki. Free 60Q / 75 min diagnostic live now — official NIC Barber theory is 60 items (50 scored) / 90 min; practical separate. ≠ Cosmetology Theory.",
  "medication-aide-anki-deck":
    "Planned 60-card medication-aide Anki (rights, routes, safety, documentation). Free 60Q / 75 min diagnostic live now — typical MACE is 60Q / 2h. ≠ NNAAP CNA.",
  "nail-technician-state-anki-deck":
    "Planned 60-card NIC-style nail theory Anki. Free 60Q / 75 min diagnostic live now — official NIC Nail Technology Theory is 110 (100 scored) / 90 min; practical separate. ≠ Cosmetology / Barber Theory.",
  "nsca-cpt-anki-deck":
    "Planned 60-card NSCA-CPT Anki (assessment, program design, technique, safety). Free 60Q / 75 min text diagnostic live now — official NSCA-CPT is 155Q (140+15) / 3h / scaled 70 with video items. ≠ CSCS.",
  "phr-hrci-anki-deck":
    "Planned 60-card HRCI PHR Anki (talent, employee relations, total rewards, compliance). Free 60Q / 75 min diagnostic live now — official PHR is 90 scored + 25 pretest / 2h / scaled 500. ≠ SPHR / SHRM-CP.",
  "physical-therapy-aide-anki-deck":
    "Planned 60-card PT aide Anki (modalities assist, transfers, anatomy, ethics). Free 60Q / 75 min diagnostic live now — no national PT aide exam. ≠ NPTE / PTA.",
  "praxis-core-anki-deck":
    "Planned 60-card Praxis Core Anki. Free 60Q / 75 min combined SR diagnostic live now — official Core is three ETS tests (5713/5723/5733). ≠ SpEd 5355.",
  "praxis-special-education-anki-deck":
    "Planned 60-card Praxis Special Education Anki. Free 60Q / 75 min diagnostic live now — typical 5355 is 120Q / 2h. ≠ Praxis Core.",
  "precision-nutrition-l1-anki-deck":
    "Planned 60-card PN L1 Anki (coaching, nutrition science, habits, scope). Free 60Q / 75 min diagnostic live now — coaching cert, not RDN, not CPT.",
  "unarmed-security-officer-anki-deck":
    "Planned 60-card unarmed security Anki. Free 60Q / 75 min diagnostic live now — state-specific; ≠ armed card.",
  "wastewater-operator-1-anki-deck":
    "Planned 60-card wastewater operator Anki. Free 60Q / 75 min diagnostic live now — state-specific; ≠ drinking-water treatment.",
  "electrical-journeyman-anki-deck":
    "Planned 60-card journeyman electrician Anki. Free 60Q / 75 min diagnostic live now — state-specific NEC; ≠ master electrician.",
  "nate-core-anki-deck":
    "Planned 60-card NATE Core Anki. Free 60Q / 75 min diagnostic live now — HVAC/R knowledge; ≠ specialty NATE and ≠ EPA 608.",
  "plumbing-journeyman-anki-deck":
    "Planned 60-card journeyman plumber Anki. Free 60Q / 75 min diagnostic live now — state-specific IPC/UPC; ≠ master plumber.",
  "cosmetology-state-anki-deck":
    "Planned 60-card NIC-style cosmetology theory Anki. Free 60Q / 75 min diagnostic live now — official NIC theory is typically 110 (100 scored) / 90 min; state CIBs vary.",
  "cdl-general-knowledge-anki-deck":
    "Planned 60-card CDL General Knowledge Anki. Free 60Q / 75 min diagnostic live now — typical state GK is ~50Q / 80%; skills/road and endorsements are separate.",
  "armed-security-officer-anki-deck":
    "Planned 60-card armed security Anki. Free 60Q / 75 min written diagnostic live now — state-specific; ≠ unarmed card; range qualification separate.",
  "veterinary-assistant-anki-deck":
    "Planned 60-card veterinary assistant / AVA Anki. Free 60Q / 75 min diagnostic live now — official NAVTA AVA typically 100Q / 150 min / 75%. ≠ VTNE.",
  "medical-scribe-anki-deck":
    "Planned 60-card medical scribe Anki (documentation, terminology, EHR workflow, HIPAA). Free 60Q / 75 min diagnostic live now — AHDPG MSCE is typically ~100Q / 75 min / 80%; ≠ CCMA/CMA.",
  "ielts-toefl-english-for-russian-speakers-anki-deck":
    "$26 / 2504 IELTS–TOEFL English cards with Russian glosses + cognate traps — prefer over free AnkiWeb EN–RU / EVU dumps.",
  "ielts-toefl-english-for-turkish-speakers-anki-deck":
    "$5 / 952 IELTS–TOEFL English cards with Turkish glosses — shorter bank than the $26 English-for-X siblings, not a tourist EN–TR dump.",
  "greek-a2-ellinomatheia-anki-deck":
    "$26 / 939 Modern Greek cards for Ellinomatheia A2 — residence/citizenship language, not Ancient Greek and not a civics quiz.",
  "czech-a2-cce-anki-deck":
    "$26 / 945 Czech cards for CCE A2 — residence/citizenship language, not the NPI reálie civics exam.",
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
    "Series 7 flashcards on the job-function outline: suitability, options strategies, margin, municipal rules, and trade processing. Official Top-Off is 125 scored + 5 pretest / 3h45 / passing score 72 (equated) — pair 15–20 cards/day with the free 60Q diagnostic. Ownable $29 .apkg vs mega free 125Q banks; not Series 63 state-law flashcards.",
  "servsafe-manager-anki-deck":
    "Temperature danger zones, HACCP steps, Big 6 pathogens, and manager responsibilities as short recall prompts. Official exam is 90Q (80 scored + 10 pilot) / 2 hours; current FAQ pass is 70% (56/80 scored). Run the free 90-question mock first (75% readiness target) — it maps to the domains in the coverage table — then ownable $19 .apkg instead of a Brainscape subscription.",
  "gre-anki-deck":
    "Live 350-card V+Q Anki (175/175) for shorter GRE section skills — not a 1,000-word free AnkiWeb vocab dump. Free 30-question timed diagnostic (15 Verbal + 15 Quant, both axes required) is live; Analytical Writing stays on PowerPrep. Prefer ETS PowerPrep for adaptive format, UniPrep for a no-signup baseline.",
  "gmat-focus-anki-deck":
    "Live 200 unique cards for the current GMAT Exam (2026 SuperScore era): Quant algebra/arithmetic, Critical Reasoning + RC, and Data Insights including Data Sufficiency. Rewritten October 2026 — not 10th Edition leftovers and not a padded 400-card clone dump. Pair with the free 45-question timed check.",
  "sat-anki-deck":
    "Live 160 unique Digital SAT cards from the same validated bank as the free 49-question timed check: 88 Reading and Writing plus 72 Math across College Board content domains. Instant Gumroad .apkg — not a planned waitlist SKU. Bluebook remains the adaptive full-length practice.",
  "ptcb-pharmacy-technician-anki-deck":
    "Front-load high-yield drugs and interactions, high-alert safety, DEA schedules, DSCSA, and days-supply math — aligned to the January 2026 PTCE blueprint. Pair with the printable study guide for domain chapters and an 80-question practice exam; drill 10–15 cards per shift on your phone.",
  "ace-cpt-anki-deck":
    "Cards track ACE CPT competency themes: preparticipation screening and consent, FITT-VP program design, cueing and spotting under load, and scope/ethics/business boundaries. Run the free 60-question readiness check first, then filter Anki to weak topics — not a NASM/ISSA mega-dump.",
  "luxembourg-vivre-ensemble-anki-deck":
    "Subdecks follow the official exam split — module 1 fundamental rights (42 cards, 10 exam questions), module 2 state and municipal institutions (104 cards, 20 questions), module 3 history and European integration (49 cards, 10 questions) — plus exam/nationality steps and daily-life context. Every card carries a key-point line; 22 cards flag the classic traps (Council of State does not vote laws, 1839 vs 1867, foreigners and legislative elections). Sit the free 40-question, 60-minute exam simulation (same 10/20/10 split), then study your weakest module in the language you will sit.",
  "rd-exam-anki-deck":
    "CDR domain-weighted prompts: Principles of Dietetics, Nutrition Care (PES/ADIME), Management of Food and Nutrition Programs, and Foodservice Systems. Explanations name why distractors fail. Take the free 120-question RD readiness check first, then filter Anki to weak domains — not a random 2,000-card clinical dump.",
  "enrolled-agent-anki-deck":
    "SEE Part 1–3 themes in one ownable deck: individuals (income, deductions, credits), businesses (entities, payroll themes), representation before the IRS, and practices & procedures. Pair with the free Enrolled Agent readiness check for timed topic scoring before you schedule with PSI — independent prep, not IRS material.",
  "ptcb-study-guide-2026":
    "Four chapters sized to the January 2026 PTCE outline/blueprint (Medications 35%, Federal 18.75% with DSCSA, Patient Safety 23.75%, Order Entry 22.5%). The 80-question exam mirrors PTCE scored length (28/15/19/18). Cluster: free 90-question online mock for readiness scoring → this PDF for structured reading → separate 300-card Anki for daily weak-topic repair.",
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
    "Series 63 flashcards for NASAA state law: broker-dealer regulation, agent registration, ethics, communications, and investment adviser basics — paired with the free 60-question timed readiness check. Ownable .apkg after SIE/Series 7; not NASAA material.",
  "medicare-counseling-anki-deck":
    "Planned SHIP Medicare counseling cards for Parts A/B/C/D themes, rights/appeals, fraud awareness, and counseling standards. The free 60-question diagnostic is live; there is no public national Q-count — verify your state SHIP/OCCT path. Not a state SHIP certificate.",
  "czech-citizenship-anki-deck":
    "Live Anki deck for Czech citizenship reálie (zkouška z českých reálií) themes: state & rights, history/geography/EU, society, and public services. Free 60Q diagnostic live now; official exam is 30Q/30min/60% from the NPI pool. Language B1 is a separate sitting; permanent residence usually needs A2 language, not this civics deck.",
  "danish-a2-prove-i-dansk-anki-deck":
    "1,000 Danish vocabulary cards with audio for Prøve i Dansk PD2 / PD3 (≈ CEFR B1 / B1+, not A2/PD1) plus residence and citizenship language themes. Ownable $26 .apkg — prefer over the free Prep2Go AnkiWeb LITE 100 when you need full pathway coverage; not a timed listening/writing substitute for official sample papers on danskogproever.dk.",
  "nha-cbcs-anki-deck":
    "Planned NHA CBCS spaced-repetition deck for ICD/CPT coding judgment, claims/reimbursement, HIPAA/compliance, and revenue-cycle front office. Free 60-question / 75-minute readiness check is live; official CBCS is 100 scored + 25 pretest / 3 hours / scaled 390. Not AAPC CPC and not NHA CCMA.",
  "aha-bls-provider-anki-deck":
    "Planned AHA BLS Provider Anki for 2025 adult CPR/AED, infant heel-of-1-hand or 2-thumb compressions, FBAO cycles, and team dynamics. Free 60-question / 45-minute / 84% cognitive check is live; official HeartCode BLS cognitive is about 25 questions / 84% plus skills. Not a BLS card and not Heartsaver/ACLS.",
  "ardms-spi-anki-deck":
    "Planned ARDMS SPI Anki for ultrasound physics, transducers/beam, Doppler, and artifacts/safety. Free 60-question / 75-minute readiness check is live; official SPI is about 110 questions / 2 hours / scaled 555. Text/physics only — not ABD/OB image interpretation.",
  "ascp-mlt-anki-deck":
    "Planned ASCP MLT Anki for blood bank, chemistry, hematology, and microbiology. Free 60-question / 75-minute readiness check is live; official BOC MLT is 100 CAT questions / 2 hours 30 minutes / scaled pass 400. Not MLS and not the California-only 80Q / 2h form.",
  "aswb-bachelors-anki-deck":
    "Planned ASWB Bachelors Anki for HBSE, assessment, intervention, and ethics. Free 60-question / 75-minute readiness check is live; official from 3 August 2026 is 122 questions / 4 hours. Not Clinical/LCSW.",
  "aswb-clinical-anki-deck":
    "Planned ASWB Clinical Anki for clinical assessment, diagnosis concepts, psychotherapy, and ethics. Free 60-question / 75-minute readiness check is live; official from 3 August 2026 is 122 questions / 4 hours. Not Bachelors/LSW.",
  "barber-state-anki-deck":
    "Planned NIC-style barber theory Anki for infection control, cutting/shaving, chemical services, and board-law themes. Free 60-question / 75-minute readiness check is live; official NIC Barber theory is 60 items (50 scored) / 90 minutes. Practical exam is separate. Not NIC Cosmetology Theory.",
  "medication-aide-anki-deck":
    "Planned medication-aide Anki for six rights, routes, safety, and documentation. Free 60-question / 75-minute readiness check is live; typical MACE is 60 questions / 2 hours where a state uses it. Not NNAAP CNA and not LPN/RN.",
  "nail-technician-state-anki-deck":
    "Planned NIC-style nail technician theory Anki for infection control, anatomy, services, and chemistry. Free 60-question / 75-minute readiness check is live; official NIC Nail Technology Theory is 110 items (100 scored) / 90 minutes. Practical exam is separate. Not Cosmetology Theory and not Barber Theory.",
  "nsca-cpt-anki-deck":
    "Planned NSCA-CPT Anki for assessment, program design, technique, and safety. Free 60-question / 75-minute text readiness check is live; official NSCA-CPT is 155 questions (140 scored + 15 pretest) / 3 hours / scaled 70, including 25–35 video/image items. Not CSCS and not NASM/ACE/ACSM CPT.",
  "phr-hrci-anki-deck":
    "Planned HRCI PHR Anki for talent, employee relations, total rewards, and compliance. Free 60-question / 75-minute readiness check is live; official PHR is 90 scored + 25 pretest / 2 hours / scaled 500. Not SPHR and not SHRM-CP.",
  "physical-therapy-aide-anki-deck":
    "Planned physical therapy aide Anki for modalities assist, transfers, anatomy, and ethics/scope. Free 60-question / 75-minute readiness check is live; there is no national PT aide exam. Not NPTE and not PTA.",
  "praxis-core-anki-deck":
    "Planned Praxis Core Anki for reading, writing selected-response, math, and strategy. Free 60-question / 75-minute combined diagnostic is live; official Core is three ETS tests. Not Special Education 5355.",
  "praxis-special-education-anki-deck":
    "Planned Praxis Special Education Anki for development, IEP planning, assessment, and IDEA/504. Free 60-question / 75-minute diagnostic is live; typical 5355 is 120Q / 2h. Not Praxis Core.",
  "precision-nutrition-l1-anki-deck":
    "Planned Precision Nutrition L1 Anki for coaching, nutrition science, habits, and scope. Free 60-question / 75-minute diagnostic is live. Not RDN and not CPT.",
  "unarmed-security-officer-anki-deck":
    "Planned unarmed security Anki for law, patrol, emergencies, and reports. Free 60-question / 75-minute diagnostic is live; licensing is state-specific. Not an armed card.",
  "cosmetology-state-anki-deck":
    "Planned NIC-style cosmetology theory Anki for scientific concepts & safety, hair services, skin & nails, and salon/infection-control themes. Free 60-question / 75-minute readiness check is live; NIC Cosmetology Theory is typically 110 items (100 scored) / 90 minutes — verify your state CIB. Theory only — practical exam is separate.",
  "cdl-general-knowledge-anki-deck":
    "Planned CDL General Knowledge Anki for vehicle systems & inspection, safe driving & space management, cargo securement & weight, and emergencies/hours/rules. Free 60-question / 75-minute readiness check is live; typical state GK sittings are ~50Q / 80% — verify your DMV manual. Knowledge only — not skills/road or endorsement tests.",
  "armed-security-officer-anki-deck":
    "Planned armed security Anki for use of force & law, weapons safety, patrol & emergencies, and ethics. Free 60-question / 75-minute written readiness check is live; licensing is state-specific — range qualification and unarmed credentials are separate.",
  "veterinary-assistant-anki-deck":
    "Planned veterinary assistant Anki for restraint, nursing assist, hospital procedures, and safety/zoonosis. Free 60-question / 75-minute readiness check is live; official NAVTA AVA via VetMedTeam is typically 100Q / 150 min / 75%. Not VTNE.",
  "medical-scribe-anki-deck":
    "Planned medical scribe Anki for SOAP/HPI documentation, terminology & abbreviations, EHR workflow, and HIPAA. Free 60-question / 75-minute readiness check is live; AHDPG MSCE is typically ~100Q / 75 min / 80% (AMSP; CMSP adds hours). Not CCMA/CMA clinical assistant.",
  "ielts-toefl-english-for-russian-speakers-anki-deck":
    "2,504 IELTS/TOEFL/Cambridge/PTE English vocabulary cards with Russian glosses, bilingual examples, and native English audio — English-first recall for cognate traps (актуальный≠actual, магазин≠magazine). Ownable $26 .apkg; prefer over free AnkiWeb EN–RU tourist dumps or EVU book mirrors.",
  "bms-building-automation-anki-deck":
    "BACnet objects/services/BBMD, HVAC sequences, operator alarms/trends/schedules, and commissioning checkout — the same four domains as the free 60-question timed check. Ownable .apkg for controls techs; not Tridium Niagara 4 TCP material and not a CertifBus 10-question tease.",
  "california-real-estate-exam-anki-deck":
    "250 California DRE-only cards — agency, disclosure timelines, financing math — plus a free 60-question timed mock. Official DRE salesperson sitting is 150Q / 3 hours / 70%; our mock is a shorter diagnostic, not a 1,500-question course dump.",
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
      "348 cards across all 10 CFA Institute Level 1 topic weights in the table below",
      "2026 cycle formulas and definitions — ethics through portfolio management",
      "Pairs with printable formula reference (250 formulas + 98 definitions + 80 recall drill)",
      "Free 60-question CFA Level 1 readiness check with topic scoring",
    ],
    summaryProse:
      "Fewer than 400 weighted flashcards beat a 3,000-card dump for CFA Level 1: ethics, FRA, and quant alone account for a third of the exam. This deck matches the 10 topic weights in the table — run the free mock to see where your daily 25-card session should focus.",
  },
  "cfa-level-2-anki-deck": {
    ourEdge: [
      "495 scenario cards across all 10 CFA Level 2 topics, each with a worked example and common mistake",
      "Vignette-depth FSA, equity/FI valuation, derivatives, PM, and ethics application",
      "Pairs with the Level 2 formula reference PDF and a free 60-question mock",
      "Ownable .apkg — not a 3,000-card Level 1 leftover or monthly Q-bank",
    ],
    summaryProse:
      "Level 2 punishes item-set misfires, not missing a random L1 definition. Four hundred ninety-five focused cards plus one free 60-question / 120-minute diagnostic beat a mega-dump when you need FCFF vs FCFE and FSA adjustments before 22 official vignettes.",
  },
  "cfa-level-1-formula-reference-2026": {
    ourEdge: [
      "250 formulas + 98 definitions — not a free one-page cheat sheet",
      "80-question formula recall drill with explained answer key",
      "Print-ready US Letter PDF — companion, not curriculum replacement",
      "Same validated item bank as the 348-card CFA Level 1 Anki deck + free 60Q mock",
    ],
    summaryProse:
      "Free one-pagers look helpful until the exam clock starts. This $19 reference forces typed formula recall across all 10 topics, then hands you an 80-question drill and the free 60-question mock for gap scoring.",
  },
  "frm-part-1-anki-deck": {
    ourEdge: [
      "Ownable 444-card .apkg — not a monthly AnalystPrep / Bionic Turtle subscription",
      "Weighted 20/20/30/30 like the exam; every card has a worked example and the common mistake",
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
      "Series 7 flashcards: 300 cards mapped to FINRA Top-Off job functions",
      "Suitability, options, bonds, margin, and settlement recall",
      "Free 60-question Series 7 practice test with topic breakdown",
      "Official Top-Off is 125 scored + 5 pretest / 3h45 / passing score 72 (equated) — our mock is a shorter diagnostic, not a FreeFellow-scale bank",
    ],
    summaryProse:
      "Full-length free 125Q banks win on volume. UniPrep Series 7 flashcards win when you want a free timed 60Q job-function diagnostic plus an ownable $29 / 300-card .apkg for daily suitability repair after SIE — not Series 63 state law and not another browser-only Q dump.",
  },
  "ptcb-pharmacy-technician-anki-deck": {
    ourEdge: [
      "300 unique cards: 105 Medications, 71 Safety, 68 Order Entry, 56 Federal",
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
      "239 French + 239 English cards — about double the largest free Vivre ensemble question bank we found (118 questions)",
      "Subdecks mirror the official 10 / 20 / 10 exam split; institutions get 104 cards per language",
      "Key-point explanation on every card, 22 common-trap cards, facts checked against the 2023 Constitution and 2026 STATEC figures",
      "$16 one-time for both languages as ownable Anki files — web-only prep platforms charge about €69 for access",
      "Free exam simulation in the official format — 40 questions, 60 minutes, 10/20/10 — with a score per module before you buy",
    ],
    summaryProse:
      "Vivre ensemble rewards precise recall of Luxembourg’s institutions, rights and history — and punishes classic confusions like 1839 vs 1867 or Council of State vs Chamber. This pair gives you the same 239 cards in French and English, sorted by official module, with the why on every card, for a one-time $16 you keep offline.",
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
      "200 cards: BACnet networking, HVAC sequences, platform ops, commissioning",
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
      "346 cards across People 33% / Process 41% / Business Environment 26% (2026 ECO)",
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
      "Live reálie Anki deck for Czech citizenship civics themes",
      "Free 60Q / 45 min timed diagnostic live now",
      "Honest: official exam is 30Q / 30 min / 60% from the NPI ~300-item pool",
      "B1 language is separate; permanent residence usually needs A2 language, not reálie",
    ],
    summaryProse:
      "Official NPI databank and model test own exam-day format. UniPrep wins when you want a free longer timed diagnostic plus an ownable Anki deck for spaced reálie recall — not a third-party AI dump that skips the 30/30/60% honesty.",
  },
  "aha-bls-provider-anki-deck": {
    ourEdge: [
      "Planned 60-card BLS Anki for 2025 adult, infant, FBAO, and team themes",
      "Free 60Q / 45 min / 84% cognitive diagnostic live now",
      "Honest: official HeartCode BLS cognitive is ~25Q / 84% plus in-person skills",
      "≠ Heartsaver / ACLS — independent prep, not an AHA course card",
    ],
    summaryProse:
      "OpenExamPrep 100Q banks and HeartStartCPR quizzes own volume. UniPrep wins when you want a free timed 60Q / 84% cognitive diagnostic that already uses 2025 infant and FBAO science, plus a planned ownable Anki waitlist — not a 25-question HeartCode substitute and not skills testing.",
  },
  "ardms-spi-anki-deck": {
    ourEdge: [
      "Planned 60-card SPI Anki for physics, transducers, Doppler, artifacts/safety",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official SPI is ~110Q / 2h / scaled 555 — our mock is shorter",
      "Text/physics only — ≠ ABD/OB image interpretation",
    ],
    summaryProse:
      "OpenExamPrep 124+ no-signup banks and Mometrix volume own length. UniPrep wins when you want a free timed 60Q physics diagnostic with topic scoring plus a planned ownable Anki waitlist — not a full 110-item SPI form and not an image-heavy specialty bank.",
  },
  "ascp-mlt-anki-deck": {
    ourEdge: [
      "Planned 60-card MLT Anki for blood bank, chemistry, hematology, microbiology",
      "Free 60Q / 75 min timed diagnostic live now — first mock free, no signup",
      "Honest: official BOC MLT is 100Q CAT / 2h30 / scaled 400 — our mock is shorter",
      "≠ ASCP MLS; California-only MLT sitting is 80Q / 2h",
    ],
    summaryProse:
      "OpenExamPrep, Mometrix, and MLSIA 100Q CAT banks own official length. UniPrep wins when you want a free no-signup timed 60Q diagnostic with bench-topic scoring plus a planned ownable Anki waitlist — not a 100-item CAT substitute and not an MLS dump.",
  },
  "aswb-bachelors-anki-deck": {
    ourEdge: [
      "Planned 60-card ASWB Bachelors Anki for HBSE, assessment, intervention, ethics",
      "Free 60Q / 75 min timed diagnostic live now — first mock free, no signup",
      "Honest: official from 3 Aug 2026 is 122Q / 4h — our mock is shorter",
      "≠ Clinical/LCSW and ≠ Masters",
    ],
    summaryProse:
      "OpenExamPrep 193+ and Mometrix own volume. UniPrep wins when you want a free no-signup timed 60Q generalist diagnostic with topic scoring plus a planned ownable Anki waitlist — not a 4-hour 122-item substitute.",
  },
  "aswb-clinical-anki-deck": {
    ourEdge: [
      "Planned 60-card ASWB Clinical Anki for assessment, diagnosis concepts, psychotherapy, ethics",
      "Free 60Q / 75 min timed diagnostic live now — first mock free, no signup",
      "Honest: official from 3 Aug 2026 is 122Q / 4h — our mock is shorter",
      "≠ Bachelors/LSW",
    ],
    summaryProse:
      "OpenExamPrep 110Q no-signup banks own Clinical volume. UniPrep wins when you want a free timed 60Q LCSW-level diagnostic with topic scoring plus a planned ownable Anki waitlist — not a 4-hour 122-item substitute.",
  },
  "barber-state-anki-deck": {
    ourEdge: [
      "Planned 60-card NIC-style barber theory Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official NIC Barber theory is 60 items (50 scored) / 90 min",
      "Theory only — practical/skills exam is separate; ≠ Cosmetology Theory",
    ],
    summaryProse:
      "CosmetologyGuru and NICPrep own volume. UniPrep wins when you want a free timed 60Q theory diagnostic plus a planned ownable Anki waitlist — not the practical exam and not a 110-item Cosmetology dump.",
  },
  "medication-aide-anki-deck": {
    ourEdge: [
      "Planned 60-card medication-aide Anki for rights, routes, safety, documentation",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: typical MACE is 60Q / 2h — our clock is shorter",
      "≠ NNAAP CNA and ≠ LPN/RN",
    ],
    summaryProse:
      "PracticeQuiz / TheExamsLab dumps own volume. UniPrep wins when you want a free timed 60Q diagnostic with topic scoring plus a planned ownable Anki waitlist — not a 2-hour official MACE substitute.",
  },
  "nail-technician-state-anki-deck": {
    ourEdge: [
      "Planned 60-card NIC-style nail theory Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official NIC Nail Theory is 110 (100 scored) / 90 min; our mock is shorter",
      "Theory only — practical separate; ≠ Cosmetology / Barber Theory",
    ],
    summaryProse:
      "SalonExam / CosmetologyGuru own volume. UniPrep wins when you want a free timed 60Q nail-theory diagnostic plus a planned Anki waitlist — not a 110-item NIC substitute and not the practical.",
  },
  "nsca-cpt-anki-deck": {
    ourEdge: [
      "Planned 60-card NSCA-CPT Anki for assessment, program design, technique, safety",
      "Free 60Q / 75 min timed text diagnostic live now",
      "Honest: official NSCA-CPT is 155Q / 3h / scaled 70 with video items",
      "≠ CSCS and ≠ NASM/ACE/ACSM CPT",
    ],
    summaryProse:
      "Mometrix / OpenExamPrep own volume. UniPrep wins when you want a free timed 60Q NSCA-CPT diagnostic plus a planned Anki waitlist — not a 3-hour video form and not CSCS.",
  },
  "phr-hrci-anki-deck": {
    ourEdge: [
      "Planned 60-card HRCI PHR Anki for talent, ER, rewards, compliance",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official PHR is 90 scored + 25 pretest / 2h / scaled 500",
      "≠ SPHR and ≠ SHRM-CP",
    ],
    summaryProse:
      "Pocket Prep / Mometrix own volume. UniPrep wins when you want a free timed 60Q PHR diagnostic plus a planned Anki waitlist — not a 115-item HRCI substitute.",
  },
  "physical-therapy-aide-anki-deck": {
    ourEdge: [
      "Planned 60-card PT aide Anki for modalities assist, transfers, anatomy, ethics",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: no national PT aide exam — employer/state competency",
      "≠ NPTE and ≠ PTA",
    ],
    summaryProse:
      "Job-quiz sites own volume. UniPrep wins when you want a free timed 60Q aide-scope diagnostic plus a planned Anki waitlist — not NPTE or PTA licensure prep.",
  },
  "praxis-core-anki-deck": {
    ourEdge: [
      "Planned 60-card Praxis Core Anki for reading, writing SR, math, strategy",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official Core is three ETS tests — our mock is combined SR only",
      "≠ Praxis Special Education 5355",
    ],
    summaryProse:
      "240Tutoring / 240 and ETS own official length. UniPrep wins when you want a free timed 60Q combined diagnostic plus a planned Anki waitlist — not three Core sittings and not essays.",
  },
  "praxis-special-education-anki-deck": {
    ourEdge: [
      "Planned 60-card Praxis Special Education Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: typical 5355 is 120Q / 2h — our mock is shorter",
      "≠ Praxis Core",
    ],
    summaryProse:
      "Quizlet dumps own volume. UniPrep wins when you want a free timed 60Q SpEd diagnostic plus a planned Anki waitlist — not a 120-item 5355 substitute.",
  },
  "precision-nutrition-l1-anki-deck": {
    ourEdge: [
      "Planned 60-card PN L1 Anki for coaching, science, habits, scope",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: coaching cert — no ETS-style national Q-count on this page",
      "≠ RDN and ≠ CPT",
    ],
    summaryProse:
      "PN’s own course owns the official path. UniPrep wins when you want a free timed 60Q coaching diagnostic plus a planned Anki waitlist — not an RDN or CPT dump.",
  },
  "unarmed-security-officer-anki-deck": {
    ourEdge: [
      "Planned 60-card unarmed security Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: state-specific — no national Q-count",
      "≠ armed card / range",
    ],
    summaryProse:
      "OpenExamPrep multi-state banks own volume. UniPrep wins when you want a free timed 60Q unarmed diagnostic plus a planned Anki waitlist — not an armed qualification.",
  },
  "wastewater-operator-1-anki-deck": {
    ourEdge: [
      "Planned 60-card wastewater operator Anki for process, safety, labs, regs",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: state-specific ABC-style exams — no national Q-count",
      "≠ drinking-water treatment operator",
    ],
    summaryProse:
      "State operator handbooks own the license. UniPrep wins when you want a free timed 60Q wastewater diagnostic plus a planned Anki waitlist — not a drinking-water dump.",
  },
  "electrical-journeyman-anki-deck": {
    ourEdge: [
      "Planned 60-card journeyman electrician Anki for NEC, wiring, services, motors",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: state/local NEC exam — no national Q-count",
      "≠ master electrician / contractor",
    ],
    summaryProse:
      "PSI/Prometric board banks own official length. UniPrep wins when you want a free timed 60Q NEC diagnostic plus a planned Anki waitlist — not a master electrician form.",
  },
  "nate-core-anki-deck": {
    ourEdge: [
      "Planned 60-card NATE Core Anki for safety, tools, electrical, ethics",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: this is Core knowledge — not a NATE specialty sitting",
      "≠ EPA 608 refrigerant handling",
    ],
    summaryProse:
      "NATE’s own prep owns the credential. UniPrep wins when you want a free timed 60Q Core diagnostic plus a planned Anki waitlist — not a specialty or EPA 608 dump.",
  },
  "plumbing-journeyman-anki-deck": {
    ourEdge: [
      "Planned 60-card journeyman plumber Anki for DWV, water, fixtures, code",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: state/local IPC or UPC exam — no national Q-count",
      "≠ master plumber",
    ],
    summaryProse:
      "Board code books own the license. UniPrep wins when you want a free timed 60Q plumbing diagnostic plus a planned Anki waitlist — not a master plumber form.",
  },
  "nha-cbcs-anki-deck": {
    ourEdge: [
      "Planned 60-card CBCS Anki for coding, claims, HIPAA, revenue cycle",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official CBCS is 100 scored + 25 pretest / 3h / scaled 390",
      "≠ AAPC CPC / NHA CCMA — independent prep, not NHA material",
    ],
    summaryProse:
      "NHA’s paid practice tests and MedPreps/OpenExamPrep free banks win on volume. UniPrep wins when you want a free timed 60Q diagnostic with topic scoring plus a planned ownable Anki waitlist — not a full-length 125-item NHA substitute.",
  },
  "cosmetology-state-anki-deck": {
    ourEdge: [
      "Planned 60-card NIC-style cosmetology theory Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: NIC Theory typically 110 items (100 scored) / 90 min; state CIBs vary",
      "Theory only — practical/skills exam is separate",
    ],
    summaryProse:
      "SalonExam and AnkiWeb 300+ dumps win on volume. UniPrep wins when you want a free timed 60Q NIC-style diagnostic plus a planned ownable Anki waitlist — not a full 110-item substitute and not the practical exam.",
  },
  "cdl-general-knowledge-anki-deck": {
    ourEdge: [
      "Planned 60-card CDL General Knowledge Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: typical state GK is ~50Q / 80% — our mock is a longer diagnostic",
      "Knowledge only — ≠ skills/road test; endorsements separate",
    ],
    summaryProse:
      "CristCDL, US Permit Prep, and state DMV practice banks win on free Q volume and 50Q format match. UniPrep wins when you want a free no-signup timed 60Q diagnostic with topic scoring plus a planned ownable Anki waitlist — not a DMV substitute.",
  },
  "armed-security-officer-anki-deck": {
    ourEdge: [
      "Planned 60-card armed security written Anki",
      "Free 60Q / 75 min timed written diagnostic live now",
      "Honest: licensing is state-specific — no single national form",
      "≠ Unarmed guard card; range/live-fire qualification separate",
    ],
    summaryProse:
      "OpenExamPrep multi-state banks win on free Q volume. UniPrep wins when you want a free no-signup timed 60Q written diagnostic plus a planned ownable Anki waitlist — not a board substitute and not the range qualification.",
  },
  "veterinary-assistant-anki-deck": {
    ourEdge: [
      "Planned 60-card veterinary assistant / AVA Anki",
      "Free 60Q / 75 min timed diagnostic live now",
      "Honest: official NAVTA AVA typically 100Q / 150 min / 75%",
      "≠ VTNE (veterinary technician)",
    ],
    summaryProse:
      "OpenExamPrep and VetMedTeam practice options win on AVA-length volume. UniPrep wins when you want a free no-signup timed 60Q diagnostic plus a planned ownable Anki waitlist — not a full 100-item AVA substitute and not VTNE.",
  },
  "medical-scribe-anki-deck": {
    ourEdge: [
      "Planned 60-card medical scribe Anki (documentation, terminology, EHR, HIPAA)",
      "60Q / 75 min timed diagnostic live now — first mock free, no signup",
      "Honest: AHDPG MSCE ~100Q / 75 min / 80%; our check is shorter",
      "≠ NHA CCMA / CMA (AAMA) clinical assistant",
    ],
    summaryProse:
      "OpenExamPrep and PracticeTestGeeks win on free MSCE-length volume. UniPrep wins when you want a free no-signup timed 60Q diagnostic plus a planned ownable Anki waitlist — not a full MSCE form and not a CCMA/CMA clinical-skills bank.",
  },
  "ielts-toefl-english-for-russian-speakers-anki-deck": {
    ourEdge: [
      "$26 / 2504 exam-frequency English cards with Russian glosses + audio",
      "IELTS / TOEFL / Cambridge / PTE framing — not tourist EN–RU dumps",
      "Cognate-trap notes (актуальный≠actual, магазин≠magazine)",
      "Ownable Gumroad .apkg — prefer over free AnkiWeb EVU mirrors for exam pathway copy",
    ],
    summaryProse:
      "Free AnkiWeb EVU / EN–RU dumps win on raw card count. UniPrep wins when Russian speakers want an ownable $26 / 2504-card IELTS–TOEFL-framed bank with audio and cognate-trap honesty — not a tourist phrase pack and not the PT-BR or LatAm sibling gloss editions.",
  },
  "danish-a2-prove-i-dansk-anki-deck": {
    ourEdge: [
      "$26 / 1000 Danish cards with native audio for PD2 / PD3 themes",
      "Honest: ≈ CEFR B1 / B1+ — not PD1 / A2 tourist packs",
      "Residence + citizenship language framing on Gumroad",
      "Prefer over free Prep2Go AnkiWeb LITE 100 when you need full pathway coverage",
    ],
    summaryProse:
      "Free AnkiWeb LITE 100 and OpenExamPrep PD2 task drills own volume or format practice. UniPrep wins when you want an ownable $26 / 1000-card .apkg with audio for PD2/PD3 + residence language — not a timed listening/writing substitute for danskogproever.dk samples.",
  },
  "servsafe-manager-anki-deck": {
    ourEdge: [
      "300 cards: time/temperature, HACCP, hygiene, allergens, manager duties",
      "Free 90-question / 120-minute ServSafe practice test online",
      "Honest: official 80 scored + 10 pilot; pass 70% (56/80); mock 75% readiness target",
      "Ownable $19 .apkg + optional PDF guide — not a Brainscape subscription",
    ],
    summaryProse:
      "Free 25Q teaser banks and Brainscape packs own volume. UniPrep wins when you want a free full-length 90Q timed mock plus an ownable 300-card .apkg for TCS temps and HACCP repair — verify pass rules at servsafe.com.",
  },
  "gre-anki-deck": {
    ourEdge: [
      "350 Verbal + Quant cards (175/175) from the same bank themes as the mock",
      "Free 30-question / 45-minute timed diagnostic — both axes required",
      "Honest: shorter GRE is ~1h58 / 27V+27Q + Writing; Writing not in this MCQ check",
      "Not a free Magoosh/Manhattan AnkiWeb vocab mega — section diagnostic first",
    ],
    summaryProse:
      "Free AnkiWeb vocab decks win on word count. UniPrep wins when you want a free timed Verbal+Quant diagnostic with both axes required, then an ownable V+Q .apkg — use PowerPrep for adaptive format and Writing.",
  },
  "gmat-focus-anki-deck": {
    ourEdge: [
      "200 unique cards rewritten October 2026 for the current GMAT (not 10th Edition)",
      "No Sentence Correction, no Quant geometry, Data Sufficiency only in Data Insights",
      "Free 45-question / 90-minute timed diagnostic across Quant, Verbal, DI",
      "Honest: official exam is 64Q / 2h15 / 205–805; SuperScore live since 12 Aug 2026",
    ],
    summaryProse:
      "Official GMAT prep and large Q-banks win on volume. UniPrep wins when you want a free timed three-section diagnostic plus an ownable 200 unique .apkg written to the 2026 exam — not a padded Focus leftover.",
  },
  "sat-anki-deck": {
    ourEdge: [
      "160 unique cards: 88 Reading and Writing + 72 Math from the validated SAT bank",
      "Free 49-question / 70-minute timed check scored on both official section axes",
      "Live $11 Gumroad .apkg with instant download — not a planned waitlist SKU",
      "Honest: official Digital SAT is adaptive two-module Bluebook; this is diagnostic + daily drill",
    ],
    summaryProse:
      "College Board Bluebook and Khan Academy own full-length adaptive practice. UniPrep wins when you want a no-signup timed section diagnostic plus 160 unique ownable cards for daily RW + Math repair.",
  },
  "california-real-estate-exam-anki-deck": {
    ourEdge: [
      "250 California DRE-only cards — not Quizlet/Aceable national packs",
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
      "250 Life & Health cards: policies, riders, annuities, Medicare",
      "National producer-exam core topics in the coverage table",
      "Free Life & Health insurance practice test",
      "Sized for licensing prep — not unlimited insurance trivia",
    ],
  },
  "property-casualty-insurance-exam-anki-deck": {
    ourEdge: [
      "250 P&C cards: homeowners, auto, CGL, workers comp, BOP",
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

**Start:** Take the [free Enrolled Agent readiness check](/mock-exams/enrolled-agent-readiness-check) under quiet conditions. **Then:** 15–20 Anki cards/day on your weakest SEE part. **Before your PSI sitting:** re-sit a short timed block on failed topics only; keep IRS/PSI candidate bulletin timing separate from this diagnostic.

### Pitfalls this deck targets

Candidates grind Part 1 (Individuals) and skip Representation/Practices, confuse EA with CPA exam content, or memorize numbers without reading fact patterns. Cards isolate those near-miss traps.

### What this does not replace

IRS SEE registration, official study materials, or the three-part SEE delivered by PSI Services (since March 2026). Independent prep — not IRS material.`,

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

Two ownable .apkg files with the same 239 cards each — one in French, one in English — so you study in the language you will sit (the exam is offered in Luxembourgish, French, German and English).

Each file opens as subdecks that follow the official exam split: module 1 fundamental rights has 42 cards (10 of the 40 exam questions), module 2 state and municipal institutions including justice has 104 cards (20 questions), and module 3 history and European integration has 49 cards (10 questions). Two short context subdecks cover exam and nationality steps (19 cards) and life in Luxembourg (25 cards).

Every card shows the answer plus a key-point line — the article, date or distinction that makes the answer stick. 22 cards are flagged as common traps — including the CAI exemption that shortens the course but not the exam.

### Why this beats the alternatives

Coverage: 478 cards across both languages, versus 118 questions in the largest free bank we found. Institutions — half the exam — get 104 cards per language, from the Grand Duke’s countersignature to how a bourgmestre is appointed.

Accuracy: facts are checked against the Constitution in force since 1 July 2023 — for example the citizens’ legislative initiative (125 initiators, 12,500 supporting voters), the 5,500-signature petition threshold, the CCVEI commune commission, and 2026 STATEC population figures. Material written before 2023 still teaches the 1868 Constitution and old institution names.

Price and ownership: $16 once for both languages, offline in Anki on desktop and phone. Web-only prep platforms charge about €69 for online access.

### Plan with the free Luxembourg mock

Start with the free Luxembourg Vivre ensemble exam simulation (/mock-exams/luxembourg-vivre-ensemble-readiness-check): 40 questions in 60 minutes with the official 10/20/10 split, scored per module. Then add 15–20 new cards a day from the subdeck of your weakest module, in the language you will sit. In the final week, do reviews only, starting with the module 2 institutions subdeck — it carries 20 of the 40 questions.

### Pitfalls this deck targets

Confusing the Council of State (advice) with the Chamber (votes laws), 1839 (independence) with 1867 (neutrality), communal voting rights for foreigners with legislative elections, and Sproochentest with Vivre ensemble. Each has its own trap card in both languages.

### What this does not replace

Official Vivre ensemble course or exam registration, the Sproochentest, or Guichet.lu procedures. The official regulation does not publish a pass mark — prep sites cite 28/40; confirm with SFA. Ownable .apkg pair only — not government material.`,

  "nebosh-anki-deck": `### What is inside

250 MCQ cards across NEBOSH IGC syllabus groups: H&S management systems/culture/monitoring, physical/psychological/musculoskeletal health, chemical/biological/workplace hazards, work equipment/fire/electricity, and GIC2 risk-assessment & control skills. Same bank themes as the free 50-question timed readiness check.

### Plan with the free NEBOSH mock

Study with your accredited Learning Partner materials first. Then 15–20 cards/day for 2–3 weeks and sit the [free 50-question NEBOSH readiness check](/mock-exams/nebosh-readiness-check) (100 min, 70% diagnostic). Official GIC1 is a **5-hour open-book scenario paper within a 24-hour window (45% provisional pass, Elements 1–4)** and GIC2 is a **4-hour practical (Elements 5–11 hazards)** — keep narrative/practical practice separate from this MCQ diagnostic.

### Pitfalls this deck targets

Candidates treat free MCQ banks as the real exam format, under-drill hierarchy of control and GIC2 five-step risk assessment, and confuse IG1/IG2 legacy labels with current GIC1/GIC2 units. Cards force GIC1 Elements 1–4 and GIC2 Elements 5–11 themes under spaced recall.

### What this does not replace

Accredited Learning Partner tuition, NEBOSH registration, or official GIC1/GIC2 assessments. This deck builds knowledge recall only — it does not replace GIC1 scenario writing, the closing interview, or the GIC2 workplace risk assessment; practise those formats with your Learning Partner. Independent prep — not NEBOSH material.`,
  "bms-building-automation-anki-deck": `### What is inside

200 MCQ cards across four BMS/BAS domains: BACnet protocol and networking, HVAC control sequences, alarms/trends/schedules/operator workflows, and integration/commissioning. Same bank themes as the free 60-question timed readiness check. Live Gumroad .apkg — **$11**.

### Plan with the free BMS mock

**Start:** Take the [free 60-question BMS / BAS readiness check](/mock-exams/bms-bas-readiness-check) (75 min, 70% diagnostic). **Then:** 15–20 Anki cards/day on the weakest topic row (BBMD/COV vs sequences vs alarm routing). **Before vendor week:** review commissioning checkout cards — Niagara 4 TCP is a multi-day practical course, not this MCQ.

### Pitfalls this deck targets

Techs treat a vendor Niagara lab as a generic BMS license, mix BTL product listing with personal credentials, and skip BACnet/IP subnet (BBMD) mechanics. Cards force protocol + sequences + ops + checkout under spaced recall.

### What this does not replace

Tridium Niagara 4 TCP, manufacturer training, or BACnet International / BTL programs. BTL lists products, not people. Independent prep — not Tridium or ASHRAE exam material.`,

  "ashrae-certifications-anki-deck": `### What is inside

This is a shared-core, multi-credential deck across seven separate ASHRAE certifications (BCxP, BEAP, BEMP, CHD, HBDP, HFDP, OPMP) — each has its own exam, blueprint, and candidate guidebook, so check yours. Use ASHRAE's official 30-question practice exam for format familiarity; use this deck for daily recall between practice sessions.

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

495 cards across all ten CFA Level 2 topics (2026 weights 5–15%) — vignette-depth FSA, equity and fixed income valuation models, derivatives strategies, portfolio management, and ethics application. Prompts emphasize item-set logic: given a short case, which adjustment or valuation method applies?

### Study plan with the free mock and formula reference

**Weeks 1–2:** 20 new cards/day across ethics and FSA. **Week 3:** Run the [free 60-question CFA Level 2 mock](/mock-exams/cfa-level-2-readiness-check). **Week 4+:** Drill only weak topics from the report; pair with the [Level 2 formula reference PDF](/decks/cfa-level-2-formula-reference-2026) for printable recall tables.

Official CFA Level 2 is 88 item-set questions in 22 vignettes (4 hours 24 minutes; 20 scored sets + 2 trial) — this 60-question, 120-minute mock is a shorter diagnostic, not a CFA Institute mock.

### Pitfalls this deck targets

Level 2 failures often come from mis-applying inventory and lease adjustments in FSA vignettes, confusing FCFF vs FCFE setups, and weak ethics judgment under time pressure. Mega L1 leftovers do not train that item-set logic.`,

  "cfa-level-2-formula-reference-2026": `### What is inside

60 printable pages with **219 typeset formulas** and **276 examiner-style definitions** across all ten CFA Level 2 topic areas — Quant, Economics, FSA, Corporate Issuers, Equity, Fixed Income, Derivatives, Alternatives, Portfolio Management, and Ethics. Each row shows concept, typeset math, and a one-line plain-English meaning. The bundled **80-question Formula Recall Drill** tests whether you can name the concept behind a displayed formula under item-set timing.

### Study plan with the free mock and Anki deck

**Week 1:** Print weak-topic tables (Fixed Income, Equity, FSA first). **Week 2:** Run the 80-question recall drill timed; review every explanation. **Week 3:** Take the [60-question CFA Level 2 mock](/mock-exams/cfa-level-2-readiness-check) — first mock free, no signup — and map topic gaps back to the PDF tables. **Week 4+:** Drill missed formulas in the [495-card Level 2 Anki deck](/decks/cfa-level-2-anki-deck) between mock retakes.

Official CFA Level 2 is 88 item-set questions in 22 vignettes over 4 hours 24 minutes — this PDF is a recall companion, not CFA Institute curriculum.

### Pitfalls this reference targets

Candidates lose item-set points from slow formula retrieval (duration/convexity families, residual income vs FCFE), mixing Level 1 ratio shortcuts with L2 adjustments, and skipping ethics application cards. The recall drill forces concept naming — not passive highlighting.`,

  "cat4-level-d-anki-deck-printable-pdf": `### What is inside

A **200-card Anki deck** plus a **~49-page printable PDF** with 192 worked examples for four CAT4 Level D subtests: Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Anki carries method cards; the PDF is timed paper practice with answers and insight lines.

### How to use it in 3–4 weeks

**Week 1:** Method cards in Anki (15–20/day). **Week 2:** One printable block per subtest under a kitchen timer. **Week 3:** Repeat only missed patterns in Anki. **Final days:** Mixed PDF pages, then Anki review — do not cram new rules the morning of the school sitting.

Official CAT4 Level D (GL Assessment) is about **2 hours 15 minutes** in three timed parts and reports Standard Age Scores (mean 100, SD 15). There is **no pass mark**. Full CAT4 also includes **non-verbal** and **spatial** batteries — this pack does not.

### What this is not

Not a scored school CAT4, not 11+ English/math papers, and not GL Assessment material.`,

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

This 2,115-card bank is a vocabulary depth layer, not a full listening/writing course. Use it to make lexical access automatic while you practice official formats elsewhere.

### Study plan across pathways

Drill 20 cards/day for eight to twelve weeks while you prepare your specific exam format (DELF/DALF productive tasks, TCF/TEF timed blocks, ANF naturalization requirements, or fide speaking practice). Keep speaking and timed practice separate from Anki. After each week, filter review to cards you failed twice — immigration and diploma sittings both punish slow retrieval more than missing obscure rare words.

### Pitfalls this deck targets

Candidates over-index on A1 survival phrases, ignore register (tu/vous, formal writing), and treat Canada vs France vs Swiss pathways as totally different vocabularies. This deck focuses the overlapping high-frequency core those pathways actually share — then cross-sells the Swiss civics bundle when the question is Staatskunde, not French words.

### What makes this Gumroad edition different

PixID Studio Gumroad fulfillment with UniPrep2Go multi-exam French framing: one vocabulary bank for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, and TCF général — with soft fide / Swiss residency and Belgian everyday French capture — not a DELF-only listing or A1 survival pack.`,

  "dutch-a2-inburgering-anki-deck": `### Which Dutch pathways this deck targets

**Inburgering** is the civic integration language track for many Dutch residency cases. Official Inburgering is **five modules** (KNM civics, ONA, plus speaking, writing, and listening/reading) — this deck is the **language lexicon**, not a single MCQ substitute for the whole path. **Staatsexamen NT2** (A2-range overlap) shares a large high-frequency Dutch core. The same lexicon supports everyday communication toward **naturalisatie** language expectations. Exam names and cut scores differ by municipality and year — confirm your required module officially.

This is **Netherlands language** prep — not Belgium Flanders **maatschappelijke oriëntatie** civics. For Flanders MO, use the free readiness check and the separate 165-card Flanders MO Anki deck.

Cards emphasize practical Dutch for work, housing, government services, and daily interaction — the vocabulary integration exams and real life both reward.

### Study plan

**Weeks 1–3:** 20 new cards/day with audio. **Weeks 4–6:** 15 new + heavy review; add weekly speaking practice. **Final two weeks:** Review only while you book official Inburgering/NT2 practice. Keep listening and speaking exams separate from Anki — flashcards build recall speed, not exam timing skill.

### Pitfalls this deck targets

Learners mix Belgian/Dutch variants inconsistently, skip separable verbs that carry meaning in A2 tasks, and cram tourist phrases instead of bureaucracy and workplace words. Cards prioritize Netherlands integration-relevant themes.

### What makes this Gumroad edition different

Multi-pathway Dutch framing (Inburgering + NT2 A2 + naturalisatie vocabulary) on PixID Studio Gumroad — not tourist phrase lists or Flanders MO civics.`,

  "german-a2-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** immigrant integration pathways share a large A2 vocabulary core. The same lexicon supports everyday German toward **residence / Einbürgerung language** expectations and **fide / Swiss residency German** prep — soft overlap only. This is **not** a Leben in Deutschland civics deck (buy the $9 Leben in Deutschland Anki deck) and **not** Swiss Staatskunde (buy the $9 Einbürgerung Schweiz Anki deck).

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

**Prøve i Dansk PD2 / PD3** (officially around CEFR **B1 / B1+** — **not** PD1 / A2 tourist packs) plus everyday Danish used for **permanent residence** and **citizenship** language requirements. Exact module names and score rules change — always confirm your required level with official Danish authorities (SIRI / danskogproever.dk) before you book.

Cards focus high-frequency Danish with audio for work, housing, services, and daily interaction.

### Study plan

20 cards/day with audio for six to eight weeks. Keep oral exam practice separate from Anki. Record yourself reading example sentences twice a week — Danish oral modules punish silent vocabulary study. Use official sample papers on [danskogproever.dk](https://danskogproever.dk) for listening/writing format; this deck is lexicon repair.

### Pitfalls this deck targets

Candidates under-train listening discrimination, confuse **PD1/A2** with **PD2/PD3**, skip particle/verb combinations, and study tourist phrases instead of bureaucracy and workplace words. The free Prep2Go AnkiWeb **LITE 100** is a starter only — this Gumroad edition is the full **1000**-card pathway bank.

### What makes this Gumroad edition different

PD2 / PD3 + residence/citizenship pathway copy with audio — not a generic Danish tourist deck and not Indfødsretsprøven civics (separate free mock on UniPrep).`,

  "cosmetology-state-anki-deck": `### What is inside

Planned **60** flashcards across scientific concepts & safety, hair care & services, skin & nail services, and salon/infection-control themes — the same four topic buckets as the free readiness check. Mapped to NIC Cosmetology Theory study themes (Hair is the heaviest official domain at 45%).

### Plan with the free cosmetology mock (live now)

**Start:** Take the [free 60-question Cosmetology Theory readiness check](/mock-exams/cosmetology-state-readiness-check) (75 minutes / 70% diagnostic). **Then:** Drill weak rows with your school notes / Milady or Pivot Point references. **When Anki ships:** 15–20 cards/day on the weakest topic only.

Official NIC Cosmetology Theory CIB: **110 items (100 scored + 10 pretest) / 90 minutes** (some state CIBs allot **120 minutes**); pass cuts are state-specific (often ~70–75%). Our mock is a shorter diagnostic — not a full 110Q form. **Practical/skills exams are separate.**

### Pitfalls this deck targets (when live)

Candidates treat a 60Q free check as the full NIC form, skip infection-control under Scientific Concepts, or confuse cosmetology theory with esthetician-only / nail-only exams.

### What this does not replace

Your state Candidate Information Bulletin, school hours, or the practical exam. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not NIC/PSI material.`,

  "cdl-general-knowledge-anki-deck": `### What is inside

Planned **60** flashcards across vehicle systems & inspection, safe driving & space management, cargo securement & weight, and emergencies/hours/rules — the same four topic buckets as the free readiness check. Mapped to FMCSA Commercial Driver’s Manual General Knowledge themes.

### Plan with the free CDL mock (live now)

**Start:** Take the [free 60-question CDL General Knowledge readiness check](/mock-exams/cdl-general-knowledge-readiness-check) (75 minutes / 70% diagnostic). **Then:** Study your **state CDL manual** and re-drill weak topics. **When Anki ships:** 15–20 cards/day on the weakest topic only.

Typical state General Knowledge sittings are **~50 questions / 80% (40 correct)** — confirm with your DMV. Our mock is a longer diagnostic — not a DMV form. **Skills/road testing is separate.** Air Brakes, Combination, HazMat, Passenger, and other endorsements have their own knowledge tests.

### Pitfalls this deck targets (when live)

Candidates treat a free 60Q check as the official 50Q form, skip the state handbook, or confuse General Knowledge with the skills/road test or endorsement sittings.

### What this does not replace

Your state CDL manual, ELDT theory/behind-the-wheel requirements, or DMV scheduling. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not FMCSA or state DMV material.`,

  "armed-security-officer-anki-deck": `### What is inside

Planned **60** flashcards across use of force & law, weapons safety, patrol & emergencies, and ethics & professionalism — the same four topic buckets as the free readiness check.

### Plan with the free armed security mock (live now)

**Start:** Take the [free 60-question Armed Security Officer readiness check](/mock-exams/armed-security-officer-readiness-check) (75 minutes / 70% diagnostic). **Then:** Complete your **state-required firearms training** and study your board manual. **When Anki ships:** 15–20 cards/day on the weakest topic only.

Armed licensing is **state-specific** (e.g. FL Class G, TX Level III, CA BSIS firearm permit). Most pathways need an **unarmed/guard-card** credential first plus a **separate range qualification**. Our mock is a written diagnostic only.

### Pitfalls this deck targets (when live)

Candidates treat a free 60Q check as their state board form, skip live-fire training, or confuse this page with the [unarmed security](/mock-exams/unarmed-security-officer-readiness-check) pathway.

### What this does not replace

Your state board bulletin, instructor-led firearms hours, or range qualification. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not FDACS/BSIS/DPS material.`,

  "veterinary-assistant-anki-deck": `### What is inside

Planned **60** flashcards across animal restraint, nursing assist, hospital procedures, and safety & zoonosis — the same four topic buckets as the free readiness check. Mapped to NAVTA AVA-style assistant themes (NAVTA does not publish domain weights).

### Plan with the free veterinary assistant mock (live now)

**Start:** Take the [free 60-question Veterinary Assistant readiness check](/mock-exams/veterinary-assistant-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use your NAVTA-approved program materials and VetMedTeam practice options. **When Anki ships:** 15–20 cards/day on the weakest topic only.

Official NAVTA AVA via VetMedTeam: typically **100 questions / 150 minutes / 75% / $100** for graduates of a NAVTA-approved program. Our mock is a shorter diagnostic — not a full-length AVA form. **Not the VTNE** (veterinary technician).

### Pitfalls this deck targets (when live)

Candidates treat a 60Q free check as the full AVA form, skip approved-program eligibility, or confuse AVA with VTNE technician prep.

### What this does not replace

NAVTA-approved program completion, VetMedTeam enrollment, or an exam mentor/proctor. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not NAVTA/VetMedTeam material.`,

  "medical-scribe-anki-deck": `### What this page is

A planned **60**-card medical scribe Anki (clinical documentation, terminology, EHR workflow, privacy & compliance) paired with a **live free 60-question** timed readiness check. The deck is **not a live Gumroad SKU** yet — waitlist only.

### Scribe vs CCMA / CMA

Medical scribe exams test **documentation under provider direction**, terminology, EHR workflow, and HIPAA. They are **not** NHA CCMA or CMA (AAMA) clinical-assistant exams (injections, phlebotomy, EKG, etc.). A scribe does not diagnose, treat, or authenticate notes alone.

### Official form honesty (AHDPG MSCE)

A common path, AHDPG’s Medical Scribe Certification Exam (MSCE), is typically listed as **~100 questions / 75 minutes / 80%** (~$185) leading to AMSP; CMSP adds **200+** documented scribe hours — verify with the certifying body. UniPrep’s free check is a shorter **60Q / 75 min / 70%** diagnostic — not a full MSCE form. Employer and ACMSS-style paths also vary.

### Plan with the free mock

**Start:** Take the [free Medical Scribe readiness check](/mock-exams/medical-scribe-readiness-check). Use the topic report (documentation, terminology, EHR, compliance) to prioritize study. **When Anki ships:** drill weak rows only.

### What this does not replace

AHDPG/ACMSS/employer registration, training-program materials, or clinical onboarding. Independent prep — not official scribe exam material.`,

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

**Ellinomatheia A2** vocabulary — **939** Modern Greek cards with audio — plus everyday Greek used for **residence** and **citizenship** language requirements. Confirm your required level and exam session with official ΚΕΓ / Ellinomatheia sources. This is not Ancient Greek, not a tourist phrase pack, and not a civic-knowledge quiz about Greek institutions.

### Study plan

20 cards/day with audio for six to eight weeks. Add weekly reading aloud of example sentences — script familiarity matters for Greek orthography under exam pressure. Final ten days: review-only Anki plus any official practice materials you have booked.

### Pitfalls this deck targets

Candidates under-practice accent marks and script fluency, memorize isolated words without articles, and ignore service/bureaucracy vocabulary. Cards keep examples and audio tied to each headword.

### What makes this Gumroad edition different

Ellinomatheia + residence/citizenship framing on Gumroad — not a tourist phrase pack.`,

  "german-a2-for-ukrainian-speakers-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** share a large A2 German lexicon. This deck packages that bank for **Ukrainian speakers**: German headword, Ukrainian translation, a German example sentence with its Ukrainian translation, native German audio, and an image on each card. It is vocabulary recall — not a full mock exam and not Leben in Deutschland civics.

### Study plan

Aim for six to eight weeks of daily Anki before your Goethe, telc, ÖSD, or DTZ date: 20–25 new cards on weekdays. Say each German example out loud before flipping; check the Ukrainian translation only after you have tried to recall the meaning. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to German audio, and study tourist phrase lists instead of integration-frequency vocabulary. Bilingual examples + German audio reduce translation dependence.

### What makes this Gumroad edition different

Ukrainian-support German A2 framing (Goethe / telc / ÖSD / DTZ) on Gumroad — distinct from the English-gloss German multi-pathway deck.`,


  "german-a2-for-russian-speakers-anki-deck": `### Which German exams this deck targets

**Goethe-Institut A2**, **telc Deutsch A2**, **ÖSD A2**, and **DTZ** share a large A2 German lexicon. This deck packages that bank for **Russian speakers**: German headword, Russian translation, a German example sentence with its Russian translation, native German audio, and an image on each card. It is vocabulary recall — not a full mock exam and not Leben in Deutschland civics.

### Study plan

Aim for six to eight weeks of daily Anki before your Goethe, telc, ÖSD, or DTZ date: 20–25 new cards on weekdays. Say each German example out loud before flipping; check the Russian translation only after you have tried to recall the meaning. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Russian-speaking learners translate every sentence into Russian under time pressure, skip listening to German audio, and study tourist phrase lists instead of integration-frequency vocabulary. Bilingual examples + German audio reduce translation dependence.

### What makes this Gumroad edition different

Russian-support German A2 framing (Goethe / telc / ÖSD / DTZ) on Gumroad — distinct from the English-gloss German multi-pathway deck and the Ukrainian-support edition.`,

  "polish-a2-certyfikat-anki-deck": `### Which Polish pathways this deck targets

**Certyfikat języka polskiego** (state certificate as a Foreign Language) at **A2**, plus everyday Polish used for **residence** and **citizenship language** requirements. Exact module names and score rules change — confirm with official sources before you book.

This is **language** vocabulary — not Polish citizenship civics (wiedza o Polsce). For civics, take the free Polish Citizenship readiness check, then use the separate Polish Citizenship Anki deck.

### Study plan

20 cards/day with audio for six to eight weeks. Keep oral exam practice separate from Anki. Record yourself reading example sentences twice a week.

### Pitfalls this deck targets

Candidates under-train listening discrimination, skip case endings that carry meaning, and study tourist phrases instead of bureaucracy and workplace words.

### What makes this Gumroad edition different

Certyfikat A2 + residence/citizenship language pathway copy — not a generic Polish tourist deck or a civics pack.`,


  "polish-a2-for-ukrainian-speakers-anki-deck": `### Which Polish pathways this deck targets

**Certyfikat języka polskiego** A2 and everyday Polish for **residence** language — packaged for **Ukrainian speakers**: Polish headword, Ukrainian gloss, bilingual example, native Polish audio, and an image on each card. Vocabulary recall only — not Polish citizenship civics (wiedza o Polsce).

### Study plan

Aim for six to eight weeks of daily Anki before your Certyfikat or residence-language date: 20–25 new cards on weekdays. Say each Polish example out loud before flipping; check the Ukrainian translation only after you have tried to recall the meaning. In the last ten days, stop adding cards and clear overdue reviews while you take official practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to Polish audio, and study tourist phrase lists instead of Certyfikat-frequency vocabulary. Bilingual examples + Polish audio reduce translation dependence.

### What makes this Gumroad edition different

Ukrainian-support Polish A2 framing (Certyfikat / residence language) on Gumroad — distinct from the English-gloss Polish Certyfikat deck and not a civics pack.`,

  "czech-a2-cce-anki-deck": `### Which Czech pathways this deck targets

**CCE** (Czech Language Certificate Exam) A2 — **945** Czech cards with audio — plus everyday Czech used for **residence** and **citizenship** language requirements. Confirm your required level with official ÚJOP / CCE sources before you register. This is language vocabulary, not the NPI **zkouška z reálií** civics exam (that is a separate 30-question citizenship test).

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

Aim for nine to ten weeks of daily Anki before your IELTS or TOEFL date: 20–30 new cards on weekdays, lighter review on weekends. Say each English example out loud before flipping; check the Ukrainian translation only after you have tried to recall the meaning. In the last ten days, stop adding cards and clear overdue reviews while you take two timed practice papers.

### Pitfalls this deck targets

Ukrainian-speaking learners translate every sentence into Ukrainian under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. Bilingual examples + English audio reduce translation dependence.

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing and not a generic “learn English” pack without exam positioning.`,


  "ielts-toefl-english-for-russian-speakers-anki-deck": `### Who this deck is for

**Russian speakers** preparing **IELTS** (Academic or General Training), **TOEFL iBT**, Cambridge English (B2 First / C1 Advanced-style lexis), or **PTE Academic** for study abroad, skilled migration, or professional registration. Typical RU-outbound cases:

- **Canada / Australia / UK** — IELTS (including UKVI where required)
- **United States** — graduate and professional **TOEFL iBT** score bands
- **Europe** — university English thresholds that accept IELTS, TOEFL, Cambridge, or PTE

This product is **English vocabulary Anki with Russian support**. It is not a tourist EN–RU phrase pack, not an “English Vocabulary in Use” AnkiWeb dump, and not the PT-BR or LatAm-Spanish sibling listings.

### Card face (what Russian speakers see every review)

- **Front:** English headword (+ image where included)
- **Back:** Russian gloss, bilingual example sentence, native English audio
- **Drill rule:** hear English → guess meaning in English → only then open the Russian gloss

Free AnkiWeb dumps labelled “English–Russian” or EVU book mirrors are often tourist phrases, undated frequency lists, or multi-thousand CEFR dumps without IELTS/TOEFL framing. This listing ships **2,504** exam-frequency cards from the Prep2Go bank as one Gumroad \`.apkg\` at **$26**.

### Why Russian speakers lose IELTS/TOEFL Reading points on false friends

Russian lookalikes feel familiar — then the English sense differs under time pressure. Drill these as English-first (examples of traps this bank helps you notice — not a closed list):

| Russian lookalike | Wrong English guess | Exam-safe English sense |
| --- | --- | --- |
| *актуальный* | “actual” | **current / topical** (actual = реальный / фактический) |
| *магазин* | “magazine” | **shop / store** (magazine = журнал) |
| *кабинет* | “cabinet” | often **office / study** (cabinet = шкаф / кабинет министров) |
| *резина* | “resin” | **rubber / tyre rubber** (resin = смола) |
| *контроль* | “control” only | often **check / inspection** (exam *control* ≠ проверка) |
| *фабрика* | “fabric” | **factory** (fabric = ткань) |
| *интеллигентный* | “intelligent” | often **cultured / refined** (intelligent = умный) |
| *консервативный* | only “conservative politics” | also **cautious / traditional** in academic prose |

Anki forces spaced English recall so you stop translating under Listening/Reading time pressure.

### Eight-week study plan (IELTS Academic or TOEFL)

| Weeks | Daily Anki | Pair with |
| --- | --- | --- |
| 1–5 | ~25 new cards/day + reviews | One official Listening or Reading section each weekend (British Council / IDP / ETS) |
| 6–7 | New cards taper; clear “Again” queue | Full practice test under timed conditions |
| 8 | Reviews only | Re-learn every word you missed on the last mock |

Always play English audio before reading the Russian gloss. If you still need Russian on the back after week 4, tag those cards and review them twice on weekdays.

### Pitfalls this deck targets (Russia-specific)

- Mapping every cognate 1:1 (*актуальный* → “actual”) under exam time pressure
- Skipping English audio because the written word “looks familiar”
- Studying tourist EN–RU AnkiWeb packs or raw EVU book dumps instead of IELTS/TOEFL-frequency lexis
- Confusing this listing with the **PT-BR** or **LatAm Spanish-gloss** English sibling packs

### What this deck is not

Not a timed mock exam, writing scorer, or speaking coach. Not official British Council / IDP / ETS / Cambridge / Pearson material. Sibling UniPrep English decks share an exam-frequency spine but use different gloss languages — this page is **Russian glosses only**.`,


  "ielts-toefl-english-for-spanish-speakers-anki-deck": `### Which English exams this deck targets

**IELTS**, **TOEFL**, Cambridge English exams, and **PTE** share a large high-frequency academic and general English lexicon. This deck packages that bank specifically for **Latin American Spanish speakers**: English headword, LatAm Spanish gloss (not Spain-only Castilian framing), bilingual example, native English audio, and an image on each card. It is vocabulary recall for exam-frequency words — not a full mock exam, writing scorer, or DELE Spanish vocabulary product.

### Study plan

Use a 12-week calendar if your IELTS/TOEFL date is far out: months one and two at ~35 new cards/day, month three at 15 new + heavy review. Always hear the English audio before reading the LatAm Spanish gloss. Every Sunday, mark cards you still fail and bury easy ones so weekday sessions stay under 45 minutes. Once weekly, sit an official practice Listening/Reading section and note unknown lexis into a filtered Anki tag.

### Pitfalls this deck targets

Spanish-speaking learners translate every sentence into Spanish under time pressure, skip listening to English audio, and study tourist phrase lists instead of exam-frequency academic vocabulary. LatAm bilingual examples + English audio reduce translation dependence without teaching Spain-only slang as “exam English.”

### What makes this Gumroad edition different

Prep2Go app bank (2,504 cards, LatAm Spanish) with UniPrep2Go IELTS/TOEFL framing on Gumroad at $26 — not a Lemon-only listing, not a DELE Spanish deck, and not the Russian/Portuguese-speaker sibling packs with different glosses.`,


  "ielts-toefl-english-for-portuguese-speakers-anki-deck": `### Who this deck is for

**Brazilian Portuguese (PT-BR) speakers** preparing **IELTS** (Academic or General Training), **TOEFL iBT**, Cambridge English (B2 First / C1 Advanced-style lexis), or **PTE Academic** for study abroad, skilled migration, or professional registration. Typical Brazil-outbound cases:

- **Canada** — Express Entry / SDS-style IELTS sittings (confirm your program’s exact IELTS or TEF/TCF rules separately)
- **Australia** — student or skilled IELTS / PTE pathways
- **UK** — UKVI IELTS where required for study or skilled routes
- **United States** — graduate and professional **TOEFL iBT** score bands
- **Europe** — university English thresholds that accept IELTS, TOEFL, Cambridge, or PTE

This product is **English vocabulary Anki with PT-BR support**. It is not a CIPLE / CAPLE European Portuguese citizenship deck, not Celpe-Bras, and not an ENEM English reading course.

### Card face (what Brazilians see every review)

- **Front:** English headword (+ image where included)
- **Back:** Brazilian Portuguese (PT-BR) gloss, bilingual example sentence, native English audio
- **Drill rule:** hear English → guess meaning in English → only then open the PT-BR gloss

Free AnkiWeb dumps labelled “Inglês–Português” are usually tourist phrases, phrasal-verb dumps, or undated frequency lists without IELTS/TOEFL framing. This listing ships **2,504** exam-frequency cards from the Prep2Go bank as one Gumroad \`.apkg\` at **$26**.

### Why Brazilians lose IELTS/TOEFL Reading points on cognates

PT-BR speakers often “understand” a passage because Portuguese lookalikes feel familiar — then choose the wrong option because the English sense differs. Drill these as English-first (examples of traps this bank helps you notice — not a closed false-friend list):

| Portuguese lookalike | Wrong English guess | Exam-safe English sense |
| --- | --- | --- |
| *atual* | “actual” | **current / present** |
| *pretender* | “pretend” | **intend / plan** |
| *assistir* | “assist” | **watch / attend** (assist = help) |
| *procurar* | “procure” (overformal) | **look for / seek** |
| *êxito* | “exit” | **success** |
| *relatório* | “relatory” | **report** |
| *eventual* | “eventual” meaning “possible” | Portuguese often means **possible / potential**; English **eventual** usually means **ultimate / final** |
| *compromisso* | “compromise” | **appointment / commitment** (compromise = acordo) |

Anki forces spaced English recall so you stop translating under Listening/Reading time pressure.

### Brazil pathway map (vocabulary only)

| Goal | Typical English proof | How this deck helps |
| --- | --- | --- |
| Canada study / skilled | IELTS (or French TEF/TCF — separate) | Shared high-frequency Academic/General lexis |
| Australia study / skilled | IELTS or PTE | Same bank; pair with official timed sections |
| UK study / skilled | UKVI IELTS when required | Word knowledge only — not UKVI booking or format coaching |
| U.S. graduate school | TOEFL iBT | Academic vocabulary overlap with IELTS Reading |
| Portugal nationality | CIPLE / CAPLE (PT-PT) | **Wrong product** — use the CIPLE Anki instead |

### Eight-week study plan (IELTS Academic or TOEFL from Brazil)

| Weeks | Daily Anki | Pair with |
| --- | --- | --- |
| 1–5 | ~25 new cards/day + reviews | One official Listening or Reading section each weekend (British Council / IDP / ETS) |
| 6–7 | New cards taper; clear “Again” queue | Full practice test under timed conditions |
| 8 | Reviews only | Re-learn every word you missed on the last mock |

Always play English audio before reading the PT-BR gloss. If you still need Portuguese on the back after week 4, tag those cards and review them twice on weekdays. Do not treat ENEM English passages as a substitute for IELTS Academic Reading timing.

### Pitfalls this deck targets (Brazil-specific)

- Mapping every cognate 1:1 (*atual* → “actual”) under exam time pressure
- Skipping English audio because the written word “looks like Portuguese”
- Studying tourist Inglês–Português AnkiWeb packs instead of IELTS/TOEFL-frequency lexis
- Buying a **CIPLE** or **Celpe-Bras** product when the real goal is IELTS/TOEFL for Canada, Australia, the UK, or the U.S.
- Confusing this listing with the **LatAm Spanish-gloss** or **Russian-gloss** English sibling packs

### What this deck is not

- Not **CIPLE A2 / CAPLE** European Portuguese (PT-PT nationality language)
- Not **Celpe-Bras** (Portuguese proficiency for non-native speakers)
- Not **ENEM** English reading prep for Brazilian university entrance
- Not **European Portuguese** glosses — this edition is **PT-BR**
- Not a Writing Task 2 scorer, Speaking partner, or timed mock exam
- Not official IELTS, ETS TOEFL, Cambridge Assessment, or Pearson PTE material

### Sibling pages (do not confuse)

| Product | Gloss | Use when |
| --- | --- | --- |
| **This deck** | PT-BR | Brazilians on IELTS / TOEFL / Cambridge / PTE |
| [English for Spanish speakers](/decks/ielts-toefl-english-for-spanish-speakers-anki-deck) | LatAm Spanish | Spanish-gloss IELTS/TOEFL bank |
| [CIPLE A2 European Portuguese](/decks/ciple-a2-european-portuguese-anki-deck) | PT-PT | Portuguese nationality language — **not** IELTS English |

Each URL has its own samples, FAQs, and Gumroad permalink. Google treating them as near-duplicates is wrong: the exam target and gloss language differ.

### What makes this Gumroad edition different

Prep2Go app bank (**2,504** cards, **Brazilian Portuguese** glosses) with UniPrep2Go IELTS/TOEFL framing on Gumroad at **$26** — instant \`.apkg\`, cognate-trap study notes, not a Lemon-only listing, not AnkiWeb tourist packs, not CIPLE / Celpe-Bras / ENEM, and not a demonym-swapped Spanish or Italian sibling page.`,

  "ielts-toefl-english-for-turkish-speakers-anki-deck": `### Who this deck is for

**Turkish speakers** preparing **IELTS** (Academic or General), **TOEFL iBT**, Cambridge English, or **PTE** for study abroad, UKVI/IRCC sittings, or graduate English thresholds. This is a **952-card** Prep2Go bank — shorter than the $26 English-for-X siblings (2,504–2,522 cards) and priced at **$5**, not a 2,500-card demonym swap.

It is **English vocabulary Anki with Turkish support**. It is not YDS / YÖKDİL, not a tourist EN–TR phrase pack, and not the French/Arabic/Russian/Spanish/Portuguese-gloss sibling listings.

### Card face

- **Front:** English headword (+ image where included)
- **Back:** Turkish gloss, bilingual example, native English audio
- **Drill rule:** hear English → guess in English → only then open the Turkish gloss

### Study plan

**Weeks 1–3:** 20 new cards/day; say the English example out loud before flipping. **Weeks 4–6:** 15 new/day plus one official IELTS or TOEFL practice section each weekend. **Final 10 days:** stop new cards; clear leeches while you sit one timed Reading/Listening paper.

### Pitfalls this deck targets

Turkish-speaking learners translate every sentence into Turkish under time pressure, skip English audio, and study AnkiWeb EN–TR tourist lists or YDS grammar dumps instead of exam-frequency IELTS/TOEFL lexis. English-first recall + audio cuts that habit.

### What makes this Gumroad edition different

Prep2Go app bank (**952** cards, Turkish glosses) on Gumroad at **$5** — not the $26 2,500-card English-for-X siblings, not YDS/YÖKDİL, not a free AnkiWeb phrase dump.`,


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

Three separate \`.apkg\` files in one **$12** download: Einbürgerung Schweiz (**207**), Naturalisation Suisse (**207**), Naturalizzazione Svizzera (**207**) — **621** cards total.

### Study plan

Import the language file for your canton, then **20–30 cards/day** while you study commune materials. Pair with the free UniPrep2Go DE / FR / IT readiness checks. Final week: reviews only.

### What makes this Gumroad edition different

One **$12** three-language Swiss civics bundle with instant download — spaced repetition for the federal block, waitlist-free after your mock diagnostic.`,

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

Two Anki .apkg files, **2,463 cards**. File 1 is DELE A2 vocabulary: **2,120 notes**, each with a Spanish word and picture on the front, and the English translation, a Spanish example sentence with native audio and its translation on the back. It runs from a frequency core into themed blocks such as environment and daily-life paperwork (padrón, alquiler, farmacia de guardia, permiso de residencia). File 2 is CCSE España: **343 text notes**, a Spanish question on the front and a full-sentence peninsular Spanish answer on the back, covering the Constitution, institutions, rights, geography, history, culture and daily life. Pairs with the free timed [CCSE España readiness check](/mock-exams/ccse-espana-readiness-check) (60Q / 45 min / 60% diagnostic). Official Cervantes CCSE is **25 items / 45 minutes / 60%**.

### Study plan with the free mock

Sit the free CCSE diagnostic once to find weak civics themes, then run both decks daily: 20–30 new DELE vocabulary cards and 10–15 CCSE cards. Re-take the diagnostic after the CCSE deck is through its first pass. Keep DELE speaking and writing practice separate from Anki recall.

### What this does not replace

Official DELE/SIELE registration, CCSE booking, residency paperwork, or Instituto Cervantes materials. The bundle does not include the 300 CCSE manual questions as multiple choice, DELE writing or speaking practice, grammar lessons or official audio.`,

  "cfa-level-1-formula-reference-2026": `### What is inside

348 entries — 250 typeset formulas and 98 examiner-style definitions across Quantitative Methods (65), Fixed Income (51), Derivatives (49), FSA (44), Economics (36), Ethics & GIPS (28), Portfolio Management (27), Equity (23), Corporate Issuers (14), and Alternatives (11). Each table row shows concept, typeset formula, and a one-line plain-English meaning. The 80-question Formula Recall Drill shows a formula and asks you to name the concept — same-topic distractors mirror exam phrasing.

### Four-week recall plan with the Anki deck and free mock

**Week 1:** Quant and FRA tables + 20 [CFA Anki](/decks/cfa-level-1-anki-deck) cards/day. **Week 2:** Fixed income and derivatives tables. **Week 3:** Take the 80-question recall drill timed; run the [free 60-question mock](/mock-exams/cfa-level-1-readiness-check). **Week 4:** Re-print tables for lowest mock topics only; Anki review on missed drill questions.

### Pitfalls this reference targets

Candidates memorize formula shape but cannot name the concept under pressure, or confuse duration with convexity applications. The recall drill forces concept retrieval — not passive re-reading of typeset math.`,

  "sie-exam-anki-deck": `### What is inside

Cards follow FINRA's SIE outline: how capital markets function, equity and debt products, options basics, customer account types, AML red flags, and prohibited activities. Product-and-risk cards emphasize what can be sold to whom — the suitability logic the 75 scored-question exam tests repeatedly (official sitting adds 5 unscored pretest items).

### Four-week SIE plan with the free mock

**Week 1:** Products and risks — 25 new cards/day. **Week 2:** Trading, markets, and customer accounts. **Week 3:** Take the free 75-question mock under 105-minute timing; drill missed chapters only. **Week 4:** Regulatory framework and prohibited-activities review — retake mock if any topic stays below 70%.

### Pitfalls this deck targets

New entrants confuse IPO vs secondary offerings, margin account rules, and when a recommendation requires a suitability review. Cards phrase prompts the way FINRA multiple-choice questions do — short stem, one clear distinction.`,

  "series-7-anki-deck": `### What is inside

Series 7 flashcards for Top-Off: seeking business and opening accounts, investment products (equity, debt, options, funds), recommendations and suitability, order handling, confirmations, settlement, and regulatory records. Options cards include spreads, straddles, and margin requirements. Municipal securities and MSRB rules have dedicated prompts. This is not a [Series 63 flashcards](/decks/series-63-anki-deck) pack (NASAA state law).

The three sample cards on this page are real notes from the shipped .apkg: tax-equivalent yield on a 4% muni versus a 5.5% corporate in the 32% bracket, maximum loss on a long XYZ 50 put bought at 3, and which of risk tolerance versus capacity limits a recommendation.

Official FINRA Series 7 Top-Off is **125 scored + 5 pretest / 3 hours 45 minutes / passing score 72 (equated)**. Our free mock is a **60-question / 90-minute** job-function diagnostic — not a full-length 125Q bank like Mastery/TakeZero/FreeFellow.

### Study plan with the free mock

Run the [free 60-question Series 7 practice test](/mock-exams/series-7-readiness-check) after one pass through products and suitability cards. Use topic scores to decide whether options or municipal chapters need a second week. Aim for 20 cards/day while working full time — the deck is sized for that cadence, not 100-card marathon sessions.

### Pitfalls this deck targets

Representatives mix suitability standards for elderly clients, options exercise vs assignment, and when a principal must approve a trade. Cards isolate those rule boundaries. After Top-Off, state registration often still needs [Series 63 flashcards](/decks/series-63-anki-deck).`,

  "servsafe-manager-anki-deck": `### What is inside

Food safety manager prompts: TCS temperature danger zone (41°F–135°F), cooking temperatures for poultry and ground meat, HACCP principles, hand-washing sequence, cross-contamination controls, Big 6 pathogens, and manager verification duties. Cards mirror ServSafe Manager domain language.

Official exam is **90 questions (80 scored + 10 unscored pilot) / 2 hours**. The current ServSafe FAQ sets the pass mark at **70% (56 of 80 scored)**; the older 2020 Examinee Handbook PDF still prints **75%**. Our free mock matches the 90Q / 120 min form and uses **75%** as a UniPrep2Go readiness target (margin above the official standard).

### Plan with the free 90-question mock

Read manager book chapters once, then 20 cards/day. Take the [free ServSafe Manager mock](/mock-exams/servsafe-manager-mock) two weeks before your proctored exam — focus review on domains scoring under 75%. Final three days: temperature and HACCP cards only. Optional companion: printable [ServSafe Manager study guide](/decks/servsafe-manager-complete-study-guide).

### Pitfalls this deck targets

Managers confuse cleaning vs sanitizing steps, cooling time limits, and when to exclude ill employees. Cards use the exact temperature thresholds ServSafe tests.`,

  "gmat-focus-anki-deck": `### What is inside

**200 unique** flashcards rewritten **October 2026** for the **current GMAT Exam**: 67 Quantitative Reasoning (algebra, arithmetic, word problems — no dedicated geometry), 67 Verbal (Critical Reasoning and Reading Comprehension — no Sentence Correction), and 66 Data Insights (tables, multi-source, Data Sufficiency). Same bank as the free timed check. Not a padded 400-card clone dump and not 10th Edition leftovers.

### Plan with the free GMAT mock

**Start:** Take the [free 45-question GMAT readiness check](/mock-exams/gmat-focus-readiness-check) (15 per section / 90 minutes). **Then:** Drill the **$11 / 200 unique** Anki at 15–20 cards/day on the weakest section. **Closer to test day:** official GMAC mocks for adaptive timing. SuperScore has been live on Official Score Reports since **12 August 2026**.

### Pitfalls this deck targets

Candidates still drill Sentence Correction, Quant geometry, or Data Sufficiency inside Quant — those are 10th Edition habits. Cards force the 2026 three-section map.

### What this does not replace

Official GMAC practice exams, tutoring, or registration. Independent prep — not GMAC material.`,

  "sat-anki-deck": `### What is inside

**160 unique** flashcards — **88 Reading and Writing** (information and ideas, craft and structure, expression of ideas, Standard English conventions) and **72 Math** (algebra, advanced math, problem-solving and data analysis, geometry and trigonometry) — from the same validated bank as the free Digital SAT readiness check. Instant **$11** Gumroad .apkg. This is live, not a planned waitlist SKU.

### Plan with the free SAT mock

**Start:** Take the [free 49-question Digital SAT readiness check](/mock-exams/sat-readiness-check) (27 Reading and Writing + 22 Math / 70 minutes; both axes must clear the readiness bar). **Then:** 15–20 Anki cards/day on the weaker section. **Closer to test day:** College Board Bluebook for full adaptive modules.

Official Digital SAT reports two section scores that sum to **400–1600**. Our check is a shorter two-axis diagnostic, not an adaptive Bluebook form.

### Pitfalls this deck targets

Students treat Khan volume as enough, skip Standard English conventions, or assume a blended percent matches the real two-section report. Cards force RW vs Math balance under spaced recall.

### What this does not replace

Bluebook full-length tests, Khan Academy Official SAT Practice, or College Board registration. Independent prep — not College Board material.`,

  "gre-anki-deck": `### What is inside

**350** flashcards — **175 Verbal** (Text Completion, Sentence Equivalence, Reading Comprehension judgment) and **175 Quantitative** (arithmetic, algebra, geometry, data analysis) — built from the same bank themes as the free readiness check. This is section-skill recall, not a 1,000-word free AnkiWeb vocab mega (Magoosh/Manhattan shared decks still win on raw vocab volume).

### Plan with the free GRE mock

**Start:** Take the [free 30-question GRE readiness check](/mock-exams/gre-readiness-check) (15 Verbal + 15 Quant / 45 minutes; both axes must clear the readiness bar). **Then:** Drill the **$11 / 350-card** Anki (175 Verbal + 175 Quant) at 15–20 cards/day on the weaker section. **Closer to test day:** ETS PowerPrep for adaptive timing and Analytical Writing.

Official shorter GRE is about **1 hour 58 minutes** with **27 Verbal + 27 Quant** plus Writing (0–6). Our mock is a shorter diagnostic — Writing is not included.

### Pitfalls this deck targets

Candidates treat a vocab mega as enough for Quant, skip Sentence Equivalence synonym pairs, or confuse our 30Q check with PowerPrep. Cards force section decisions under spaced recall.

### What this does not replace

ETS PowerPrep, official practice books, or tutoring. Independent prep — not ETS material.`,

  "ptcb-pharmacy-technician-anki-deck": `### What is inside

300 unique cards in January 2026 PTCE proportions: 105 Medications (60 high-yield Top 200 drugs — generic, class, use, and the safety point — plus interactions, stems, dosage forms, and storage), 56 Federal Requirements (DEA schedules and forms, C-II rules, DSCSA, HIPAA, REMS, recalls), 71 Patient Safety (high-alert drugs, look-alike names, ISMP abbreviations, USP <797>/<800>), and 68 Order Entry (sigs, days-supply and dosing math, claims, inventory). Every card carries a worked example and a common mistake. Official PTCE is **90 questions (80 scored + 10 pretest) / 1 hour 50 minutes / scaled pass 1,400** at Pearson VUE (in-person; online proctoring suspended December 12, 2025). Math cards use the short integer setups the exam favors — no alligation or compounding (removed from the 2026 outline).

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

Series 63 flashcards for NASAA Uniform Securities Act themes: broker-dealer and agent registration, unethical business practices, communications with the public, and investment adviser basics. Built for state-law repair after SIE / [Series 7 flashcards](/decks/series-7-anki-deck) — same themes as the free timed readiness check.

### Plan with the free Series 63 mock

**Phase 1:** Sit the [free 60-question Series 63 readiness check](/mock-exams/series-63-readiness-check). **Phase 2:** 15–20 Anki cards/day on your weakest law rows. **Phase 3:** Retake the mock; finish on ethics and communications if those domains lag. Confirm current NASAA outline and state scheduling separately.

### Pitfalls this deck targets

Candidates reuse Series 7 product cards for Series 63, under-drill USA registration exemptions, and confuse federal vs state jurisdiction. Cards force state-law framing under spaced recall.

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

Czech citizenship reálie Anki for zkouška z českých reálií themes: state/constitution/rights, history–geography–EU, society & daily life, and education/health/public services. Same topic map as the free timed readiness check.

### Plan with the free Czech reálie mock (live now)

**Phase 1:** Confirm you need reálie (citizenship) vs language-only permanent residence (often A2). **Phase 2:** Sit the [free 60-question Czech Citizenship readiness check](/mock-exams/czech-citizenship-readiness-check) (45 min / 70% diagnostic). **Phase 3:** Drill the official NPI ~300-item databank and interactive 30-question model test on [cestina-pro-cizince.cz](https://cestina-pro-cizince.cz/obcanstvi/). **Phase 4:** Import this Anki deck for daily spaced recall of weak reálie topics; keep B1 language on a separate track (Czech CCE Anki).

### Pitfalls this deck targets

Candidates treat a longer free diagnostic as the official 30/30/60% form, confuse trvalý pobyt A2 language with citizenship reálie, or skip the published NPI pool. Cards (when shipped) force civic framing under spaced recall.

### What this does not replace

MV ČR / NPI registration, the official databank/model test, or the B1 language exam. Independent prep — not MV ČR material.`,

  "aha-bls-provider-anki-deck": `### What is inside

Planned **60** flashcards across adult CPR & AED, child & infant CPR, choking & opioid emergency, and team dynamics — the same four buckets as the free cognitive check. Built for 2025 AHA BLS science (heel of 1 hand or 2 thumbs for infants; 5 back blows then 5 abdominal thrusts for severe adult/child FBAO), not Heartsaver lay-rescuer or ACLS.

### Plan with the free BLS mock (live now)

**Start:** Take the [free 60-question AHA BLS Provider readiness check](/mock-exams/aha-bls-provider-readiness-check) (45 minutes / 84% diagnostic). **Then:** Book an authorized AHA skills session. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official HeartCode BLS cognitive is typically **~25 open-resource questions / 84% pass plus Adult CPR/AED and Infant CPR skills**. Our mock is a longer cognitive diagnostic — not a course card.

### Pitfalls this deck targets (when live)

Candidates still use two-finger infant compressions, skip back blows on adult FBAO, or treat this page as a BLS card. Cards force 2025 technique under spaced recall.

### What this does not replace

An AHA Training Center course, skills testing, or a Provider card. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not AHA material.`,

  "ardms-spi-anki-deck": `### What is inside

Planned **60** flashcards across ultrasound physics, transducers & beam formation, Doppler & hemodynamics, and artifacts/quality/safety — the same four buckets as the free readiness check. Built for SPI formulas (c = fλ, Z = ρc, axial resolution ≈ SPL/2, Doppler equation), not ABD/OB image dumps.

### Plan with the free SPI mock (live now)

**Start:** Take the [free 60-question ARDMS SPI readiness check](/mock-exams/ardms-spi-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use ARDMS/Inteleos outlines and a full-length physics bank for stamina. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official SPI: **about 110 multiple-choice questions / 2 hours / scaled pass 555 (300–700)**. Our mock is shorter and text/physics only.

### Pitfalls this deck targets (when live)

Candidates confuse SPL with axial resolution, treat 90° Doppler as a strong shift, or sit ABD image items thinking they are SPI. Cards force physics judgment under spaced recall.

### What this does not replace

ARDMS/Inteleos registration or a full 110-item sitting. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not ARDMS material.`,

  "ascp-mlt-anki-deck": `### What is inside

Planned **60** flashcards across blood bank, chemistry, hematology, and microbiology — the same four buckets as the free readiness check. Built for ASCP BOC **MLT** bench judgment (ABO/Rh, hemolysis flags, CBC smear holds, cultures), not MLS-only molecular dumps and not phlebotomy-only PBT.

### Plan with the free MLT mock (live now)

**Start:** Take the [free 60-question ASCP MLT readiness check](/mock-exams/ascp-mlt-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use the BOC content guideline and a full-length CAT-style bank for stamina. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official ASCP BOC MLT: **100 multiple-choice questions / 2 hours 30 minutes / computer-adaptive / scaled pass 400** (100–999). Our mock is a shorter linear diagnostic. Official content also weights urinalysis, immunology, and laboratory operations (5–10% each) — those themes appear inside the four UniPrep buckets, not as extra topics. California-only MLT licensure is **80 questions / 2 hours**.

### Pitfalls this deck targets (when live)

Candidates treat a 60Q free check as the 100-item CAT, confuse MLT with MLS, or skip clerical ID and specimen-integrity items. Cards force technician-level decisions under spaced recall.

### What this does not replace

ASCP BOC registration, Pearson VUE scheduling, or a full-length CAT bank. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not ASCP BOC material.`,

  "aswb-bachelors-anki-deck": `### What is inside

Planned **60** flashcards across human development, assessment, intervention, and ethics — the same four buckets as the free readiness check. Built for **ASWB Bachelors / LSW** generalist judgment, not LCSW psychotherapy dumps.

### Plan with the free Bachelors mock (live now)

**Start:** Take the [free 60-question ASWB Bachelors readiness check](/mock-exams/aswb-bachelors-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use the ASWB Examination Guidebook and a 4-hour stamina bank. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official ASWB Bachelors from **3 August 2026: 122 questions (110 scored + 12 pretest) / 4 hours** / form-equated pass. Our mock is a shorter diagnostic. Not Clinical/LCSW.

### Pitfalls this deck targets (when live)

Candidates sit Clinical banks for LSW, treat a 60Q check as the 122-item sitting, or skip ethics/self-determination vs safety. Cards force generalist decisions under spaced recall.

### What this does not replace

ASWB registration or a 4-hour form. Anki is **planned**. Independent prep — not ASWB material.`,

  "aswb-clinical-anki-deck": `### What is inside

Planned **60** flashcards across clinical assessment, diagnosis concepts, psychotherapy, and ethics — the same four buckets as the free readiness check. Built for **ASWB Clinical / LCSW** judgment, not Bachelors case-management clones.

### Plan with the free Clinical mock (live now)

**Start:** Take the [free 60-question ASWB Clinical readiness check](/mock-exams/aswb-clinical-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use the Guidebook plus DSM-5-TR / EBP review. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official ASWB Clinical from **3 August 2026: 122 questions / 4 hours** / form-equated pass. Our mock is shorter. Not Bachelors/LSW.

### Pitfalls this deck targets (when live)

Candidates use Bachelors banks for LCSW, skip risk/Tarasoff items, or treat 60Q as the 4-hour sitting.

### What this does not replace

ASWB registration or a 4-hour form. Anki is **planned**. Independent prep — not ASWB material.`,

  "barber-state-anki-deck": `### What is inside

Planned **60** flashcards across infection control, cutting/shaving, chemical services, and board-law themes — the same four buckets as the free readiness check. Built for **NIC-style Barber theory**, not Cosmetology Theory and not the practical.

### Plan with the free Barber mock (live now)

**Start:** Take the [free 60-question Barber readiness check](/mock-exams/barber-state-readiness-check) (75 minutes / 70% diagnostic). **Then:** Read your state CIB and drill practical kit skills separately. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official NIC National Barber Theory: **60 items (50 scored) / 90 minutes**. Our mock is the same item count on a shorter clock. Passing scores are set by the state (often scaled 75).

### Pitfalls this deck targets (when live)

Candidates confuse sanitation with disinfection, skip blood-exposure steps, or study Cosmetology 110-item banks for a 60-item Barber theory form.

### What this does not replace

NIC/state registration or the practical exam. Anki is **planned**. Independent prep — not NIC material.`,

  "medication-aide-anki-deck": `### What is inside

Planned **60** flashcards across six rights, routes, safety, and documentation — the same four buckets as the free readiness check. Built for **medication aide / MACE** under nurse supervision, not LPN/RN independent practice.

### Plan with the free Medication Aide mock (live now)

**Start:** Take the [free 60-question Medication Aide readiness check](/mock-exams/medication-aide-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use your state handbook. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Typical NCSBN MACE (where used): **60 questions / 2 hours**. Our mock uses the same item count on a shorter clock. Confirm your state form.

### Pitfalls this deck targets (when live)

Candidates crush XR/enteric tablets, start IVs, change doses, or sit NNAAP CNA banks for a medication-aide exam.

### What this does not replace

State/MACE registration. Anki is **planned**. Independent prep — not NCSBN material.`,

  "nail-technician-state-anki-deck": `### What is inside

Planned **60** flashcards across infection control, nail anatomy, services, and chemistry — the same four buckets as the free readiness check. Built for **NIC-style nail technician / manicurist theory**, not Cosmetology or Barber Theory.

### Plan with the free Nail Technician mock (live now)

**Start:** Take the [free 60-question Nail Technician readiness check](/mock-exams/nail-technician-state-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use your state CIB. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official NIC Nail Technology Theory: **110 items (100 scored) / 90 minutes**. Practical is separate. Our mock is a shorter theory diagnostic.

### Pitfalls this deck targets (when live)

Candidates confuse psoriasis with fungus, mix MMA with EMA monomer, or skip EPA contact time after a blood nick.

### What this does not replace

NIC/state registration or the practical exam. Anki is **planned**. Independent prep — not NIC material.`,

  "nsca-cpt-anki-deck": `### What is inside

Planned **60** flashcards across assessment, program design, technique, and safety — the same four buckets as the free readiness check. Built for **NSCA-CPT**, not CSCS and not NASM/ACE/ACSM CPT.

### Plan with the free NSCA-CPT mock (live now)

**Start:** Take the [free 60-question NSCA-CPT readiness check](/mock-exams/nsca-cpt-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use NSCA’s official resources for video-item stamina. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official NSCA-CPT: **155 questions (140 scored + 15 pretest) / 3 hours / scaled 70**, including 25–35 video/image items. Our mock is text-only and shorter.

### Pitfalls this deck targets (when live)

Candidates skip medical clearance after a PAR-Q+ “yes,” start loading without informed consent, or confuse NSCA-CPT with CSCS.

### What this does not replace

NSCA registration or the 3-hour video form. Anki is **planned**. Independent prep — not NSCA material.`,

  "phr-hrci-anki-deck": `### What is inside

Planned **60** flashcards across talent, employee relations, compensation/benefits, and compliance — the same four buckets as the free readiness check. Built for **HRCI PHR**, not SPHR and not SHRM-CP.

### Plan with the free PHR mock (live now)

**Start:** Take the [free 60-question PHR readiness check](/mock-exams/phr-hrci-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use HRCI’s outline. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official PHR: **90 scored + 25 pretest / 2 hours / scaled 500**. Our mock is a shorter diagnostic.

### Pitfalls this deck targets (when live)

Candidates treat job titles as FLSA exemptions, skip OSHA 300 recording, or sit SHRM-CP banks for an HRCI exam.

### What this does not replace

HRCI registration. Anki is **planned**. Independent prep — not HRCI material.`,

  "physical-therapy-aide-anki-deck": `### What is inside

Planned **60** flashcards across modalities assist, transfers/safety, anatomy, and ethics/scope — the same four buckets as the free readiness check. Built for **PT aides / rehab techs**, not NPTE or PTA licensure.

### Plan with the free Physical Therapy Aide mock (live now)

**Start:** Take the [free 60-question Physical Therapy Aide readiness check](/mock-exams/physical-therapy-aide-readiness-check) (75 minutes / 70% diagnostic). **Then:** Follow your clinic’s competency packet. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

There is **no national PT aide exam**. Our mock is a 60-question knowledge diagnostic.

### Pitfalls this deck targets (when live)

Candidates run ultrasound without a PT/PTA on site, progress loads off-plan, or treat swelling as a diagnosis.

### What this does not replace

Employer competency or PT/PTA licensure. Anki is **planned**. Independent prep.`,

  "praxis-core-anki-deck": `### What is inside

Planned **60** flashcards across reading, writing selected-response, math, and strategy — the same four buckets as the free readiness check. Built for **Praxis Core**, not Special Education 5355.

### Plan with the free Praxis Core mock (live now)

**Start:** Take the [free 60-question Praxis Core readiness check](/mock-exams/praxis-core-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use ETS PowerPrep / Test at a Glance for each sitting. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official Core is **three tests**. Our mock is a combined selected-response diagnostic with **no essays**.

### Pitfalls this deck targets (when live)

Candidates treat one 60Q check as 5713+5723+5733, skip essays, or sit SpEd 5355 banks for Core.

### What this does not replace

ETS registration or constructed-response writing. Anki is **planned**. Independent prep — not ETS material.`,

  "praxis-special-education-anki-deck": `### What is inside

Planned **60** flashcards across development, IEP planning, assessment, and IDEA/504 foundations — the same four buckets as the free readiness check. Built for **Praxis Special Education**, not Praxis Core.

### Plan with the free Praxis Special Education mock (live now)

**Start:** Take the [free 60-question Praxis Special Education readiness check](/mock-exams/praxis-special-education-readiness-check) (75 minutes / 70% diagnostic). **Then:** Confirm your state code (often 5355). **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Typical 5355: **120 questions / 2 hours**. Our mock is shorter.

### Pitfalls this deck targets (when live)

Candidates confuse 504 with IEP, treat accommodations as modifications, or sit Praxis Core banks for SpEd content.

### What this does not replace

ETS registration. Anki is **planned**. Independent prep — not ETS material.`,

  "precision-nutrition-l1-anki-deck": `### What is inside

Planned **60** flashcards across coaching, nutrition science, habits, and scope — the same four buckets as the free readiness check. Built for **PN Level 1 coaches**, not RDNs and not CPT exams.

### Plan with the free Precision Nutrition L1 mock (live now)

**Start:** Take the [free 60-question Precision Nutrition L1 readiness check](/mock-exams/precision-nutrition-l1-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use PN’s curriculum. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

### Pitfalls this deck targets (when live)

Candidates diagnose from lab results, write meal plans as MNT, or sit CPT banks for a coaching cert.

### What this does not replace

PN registration. Anki is **planned**. Independent prep — not Precision Nutrition material.`,

  "unarmed-security-officer-anki-deck": `### What is inside

Planned **60** flashcards across law, patrol, emergencies, and reports — the same four buckets as the free readiness check. Built for **unarmed** officers, not armed/range qualification.

### Plan with the free Unarmed Security Officer mock (live now)

**Start:** Take the [free 60-question Unarmed Security Officer readiness check](/mock-exams/unarmed-security-officer-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use your state handbook. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Licensing is **state-specific**. Our mock is a 60-question unarmed diagnostic.

### Pitfalls this deck targets (when live)

Candidates play SWAT unarmed, skip objective reports, or sit armed-card banks for an unarmed exam.

### What this does not replace

State registration or firearms qualification. Anki is **planned**. Independent prep.`,

  "wastewater-operator-1-anki-deck": `### What is inside

Planned **60** flashcards across treatment process, safety/confined space, labs/sampling, and regs — the same four buckets as the free readiness check. Built for **wastewater** operators, not drinking-water treatment.

### Plan with the free Wastewater Operator 1 mock (live now)

**Start:** Take the [free 60-question Wastewater Operator Level 1 readiness check](/mock-exams/wastewater-operator-1-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use your state / ABC Need-to-Know handbook. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Licensing is **state-specific**. Our mock is a 60-question diagnostic — not a national form.

### Pitfalls this deck targets (when live)

Candidates sit drinking-water banks for a wastewater sitting, skip H2S/confined-space items, or treat 60Q as the state exam.

### What this does not replace

State operator certification. Anki is **planned**. Independent prep — not ABC material.`,

  "electrical-journeyman-anki-deck": `### What is inside

Planned **60** flashcards across NEC theory, wiring methods, services/feeders, and motors/safety — the same four buckets as the free readiness check. Built for **journeyman** written exams, not master electrician.

### Plan with the free Electrical Journeyman mock (live now)

**Start:** Take the [free 60-question Electrical Journeyman readiness check](/mock-exams/electrical-journeyman-readiness-check) (75 minutes / 70% diagnostic). **Then:** Tab the adopted NEC cycle for your board. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Licensing is **state-specific**. Our mock is a 60-question diagnostic.

### Pitfalls this deck targets (when live)

Candidates skip grounding/bonding, confuse feeder vs branch OCPD, or sit master-electrician banks for journeyman.

### What this does not replace

State/local electrical board registration. Anki is **planned**. Independent prep — not NFPA material.`,

  "nate-core-anki-deck": `### What is inside

Planned **60** flashcards across HVAC safety, tools/math, electrical basics, and ethics — the same four buckets as the free readiness check. Built for **NATE Core**, not specialty exams and not EPA 608.

### Plan with the free NATE Core mock (live now)

**Start:** Take the [free 60-question NATE Core readiness check](/mock-exams/nate-core-readiness-check) (75 minutes / 70% diagnostic). **Then:** Confirm the Core + specialty pairing on natex.org. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Our mock is a 60-question Core-style diagnostic — not a NATE specialty sitting.

### Pitfalls this deck targets (when live)

Candidates confuse Core with EPA 608, skip recovery/LOTO, or sit air-conditioning specialty banks for Core.

### What this does not replace

NATE registration. Anki is **planned**. Independent prep — not NATE material.`,

  "plumbing-journeyman-anki-deck": `### What is inside

Planned **60** flashcards across DWV, water supply, fixtures, and code/safety — the same four buckets as the free readiness check. Built for **journeyman** plumber written exams, not master plumber.

### Plan with the free Plumbing Journeyman mock (live now)

**Start:** Take the [free 60-question Plumbing Journeyman readiness check](/mock-exams/plumbing-journeyman-readiness-check) (75 minutes / 70% diagnostic). **Then:** Confirm IPC vs UPC for your board. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Licensing is **state-specific**. Our mock is a 60-question diagnostic.

### Pitfalls this deck targets (when live)

Candidates skip backflow, confuse fixture units with DFU, or sit master-plumber banks for journeyman.

### What this does not replace

State/local plumbing board registration. Anki is **planned**. Independent prep.`,

  "nha-cbcs-anki-deck": `### What is inside

Planned **60** flashcards across coding guidelines & ICD/CPT concepts, claims & reimbursement, compliance/HIPAA/fraud, and revenue-cycle & front office — the same four topic buckets as the free readiness check. Built for NHA CBCS spaced repair, not AAPC CPC exam dumps.

### Plan with the free CBCS mock (live now)

**Start:** Take the [free 60-question NHA CBCS readiness check](/mock-exams/nha-cbcs-readiness-check) (75 minutes / 70% diagnostic). **Then:** Use NHA’s official study guide / practice tests for full-length stamina. **When Anki ships:** 15–20 cards/day on the weakest topic row only.

Official CBCS test plan: **100 scored + 25 pretest (125 total) / 3 hours / scaled pass 390** (200–500). Our mock is a shorter diagnostic — not a full NHA form.

### Pitfalls this deck targets (when live)

Candidates confuse CBCS with AAPC CPC, treat a 60Q free check as the 125-item NHA sitting, or skip insurance-eligibility and denial/appeal workflows. Cards force billing/coding judgment under spaced recall.

### What this does not replace

NHA registration, Candidate Handbook policies (including coding-manual rules for your sitting), or NHA’s paid practice tests. Anki is **planned** on UniPrep — not a live Gumroad SKU yet. Independent prep — not NHA material.`,

  "frm-part-1-anki-deck": `### What is inside

444 cards weighted like the exam: 89 Foundations (governance, CAPM and factor models, ERM, case studies such as LTCM and the 2007-09 crisis), 89 Quantitative Analysis (probability, hypothesis tests, regression, time series, volatility, simulation, machine learning), 133 Financial Markets and Products (banks and funds, futures and hedging, options and strategies, swaps, MBS) and 133 Valuation and Risk Models (VaR and ES, GARCH, credit and country risk, operational risk, stress tests, bond pricing, duration and convexity, trees, Black-Scholes-Merton and Greeks). Every card asks a real exam question, explains the rule, works a numeric example where it applies, and names the mistake candidates make.

### Plan with the free FRM mock

**Phase 1 (6 weeks out):** 25 cards/day from quant and markets. **Phase 2:** Free 50-question mock — remap daily reviews to valuation models and credit if those topics score low. **Final month:** No new cards; ES and VaR calculation prompts daily.

### Pitfalls this deck targets

Candidates swap parametric vs historical VaR, mis-state delta-gamma approximations, and confuse settlement conventions on derivatives. Cards flag those calculation boundaries.`,

  "california-real-estate-exam-anki-deck": `### What is inside

400 prompts across DRE salesperson topics: property ownership, land use, agency law, fiduciary duties, contracts, financing, transfers, disclosures (transfer disclosure statement, agency disclosure), and practice-of-real-estate regulations. Math cards cover prorations, commission splits, and loan-to-value setups.

### Plan with the free CA mock

Complete pre-license coursework first, then 20 cards/day. Run the free California practice test at 30 days out; concentrate on agency and disclosure cards if those domains score lowest. California-specific disclosure timing is repeated more than national decks cover.

Official DRE salesperson exam is **150 questions / 3 hours / 70%** (one state exam — no separate national portion). Our free mock is a **60-question** diagnostic — not a 1,500-question course Q-bank.

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

Life & Health licensing cards: policy types (term, whole, universal), riders, annuities, group vs individual health, Medicare Parts A–D basics, HIPAA privacy, replacement regulations, and producer licensing duties. Covers national-core Life & Health topics only — add your state's insurance-law material separately.

### Plan with the free mock

20 cards/day for four weeks, then the free Life & Health practice test. Give annuities, policy provisions, and Medicare extra passes when your state's outline lists them — weights vary by state. Pair with P&C deck only if pursuing both lines.

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
