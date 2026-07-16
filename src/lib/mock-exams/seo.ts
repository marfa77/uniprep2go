import type { MockExamConfig } from "./types";
import { mockFreeAccessNotice, mockFreeAccessPriceLabel } from "./pricing";
import { fitSeoTitle, SEO_TITLE_MAX } from "../seo";
import { absoluteUrl, siteConfig } from "../site";

type MockSeoProfile = {
  title: string;
  description: string;
  keywords: string[];
  headline: string;
  intro: string;
  audience: string;
  practiceTestLabel: string;
};

function defaultProfile(config: MockExamConfig): MockSeoProfile {
  const examLabel = config.examBody;
  const type = config.status === "live" ? "practice test" : "readiness check";

  return {
    title: `Free ${config.shortTitle} ${type} | ${config.questionCount} Questions Online`,
    description: `Take a free online ${examLabel} ${type}: ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% pass target, topic scoring, answer review, and pass/no-pass report. Independent prep — not official exam material.`,
    keywords: [
      `free ${config.shortTitle.toLowerCase()} practice test`,
      `${config.shortTitle.toLowerCase()} mock exam`,
      `${examLabel.toLowerCase()} practice questions`,
      `${config.questionCount} question mock exam`,
    ],
    headline: config.title,
    intro: `${config.description} Use it as a baseline ${type} before you buy a full course or drill with the linked Anki deck.`,
    audience: `Candidates preparing for ${examLabel} licensing or certification exams who want a timed diagnostic with topic-level feedback.`,
    practiceTestLabel: `${config.shortTitle} practice test`,
  };
}

const mockSeoProfiles: Partial<Record<string, MockSeoProfile>> = {
  "sie-full-mock": {
    title: "Free FINRA SIE Practice Test 2026 | 75-Question Mock Exam Online",
    description:
      "Free, no-signup FINRA-topic-weighted 75-question SIE mock with instant pass/no-pass report — updated for 2026. Timed 105 minutes, 70% pass target, full answer review. Independent SIE mock — not official FINRA material.",
    keywords: [
      "free sie practice test",
      "sie mock exam",
      "finra sie practice exam",
      "sie exam questions",
      "sie readiness check",
    ],
    headline: "Free FINRA SIE Practice Test",
    intro:
      "A full-length FINRA SIE mock exam modeled on the official outline: 75 scored questions, 105 minutes, and a 70% pass threshold with weighted topic diagnosis across capital markets, products and risks, trading and accounts, and regulatory framework.",
    audience:
      "SIE candidates, finance students, and career changers entering brokerage and securities roles who need a timed baseline before paying for a prep course.",
    practiceTestLabel: "FINRA SIE practice test",
  },
  "servsafe-manager-mock": {
    title: "Free ServSafe Manager Practice Test 2026 | 90-Question Mock Exam",
    description:
      "Take a free ServSafe Manager practice test online: 90 timed questions, 120 minutes, 75% pass target, food safety topic scoring, answer explanations, and pass/no-pass report. Independent CFPM-style mock — not official ServSafe material.",
    keywords: [
      "servsafe manager practice test",
      "servsafe manager mock exam",
      "free servsafe practice test",
      "certified food protection manager practice test",
      "servsafe manager exam questions",
    ],
    headline: "Free ServSafe Manager Practice Test",
    intro:
      "A full-length ServSafe Manager mock exam aligned to the common 90-question / 120-minute / 75% pass format. Topics include foodborne illness, time and temperature control, hygiene, cleaning and sanitizing, receiving and storage, HACCP, and manager responsibilities.",
    audience:
      "Restaurant managers, kitchen supervisors, hospitality students, and CFPM candidates who need a timed food safety baseline before exam day.",
    practiceTestLabel: "ServSafe Manager practice test",
  },
  "ptcb-pharmacy-technician-mock": {
    title: "Free PTCB Practice Test 2026 | 90-Question PTCE Mock Exam Online",
    description:
      "Take a free PTCB / PTCE practice test online: 90 timed questions, 110 minutes, 2026 domain-weighted scoring (Medications 35%, Federal Requirements 19%, Patient Safety 24%, Order Entry 23%), answer explanations, and pass/no-pass report. Independent mock — not official PTCB material.",
    keywords: [
      "ptcb practice test",
      "ptcb mock exam",
      "free ptcb practice test",
      "ptce practice exam",
      "pharmacy technician practice test",
      "ptcb exam questions",
    ],
    headline: "Free PTCB Pharmacy Technician Practice Test",
    intro:
      "A full-length PTCB / PTCE mock aligned to the January 2026 content outline: 90 questions, 110 minutes, and domain-weighted topic diagnosis across medications, federal requirements, patient safety, and order entry — sourced from the same validated item bank as the UniPrep2Go Anki deck.",
    audience:
      "Pharmacy technician candidates, pharmacy tech students, and career changers preparing for the PTCE who want a timed baseline before buying prep courses or drilling flashcards.",
    practiceTestLabel: "PTCB / PTCE practice test",
  },
  "cfa-level-1-readiness-check": {
    title: "Free CFA Level 1 Practice Test | 60-Question Readiness Check",
    description:
      "Free CFA Level 1 practice questions online: 60 timed questions across all 10 topic weights, 90 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent CFA prep — not CFA Institute material.",
    keywords: [
      "cfa level 1 practice test",
      "cfa level 1 mock exam",
      "free cfa practice questions",
      "cfa readiness check",
    ],
    headline: "Free CFA Level 1 Readiness Check",
    intro:
      "A timed CFA Level 1 readiness diagnostic sampled across ethics, quant, economics, FRA, corporate issuers, equity, fixed income, derivatives, alternatives, and portfolio management.",
    audience: "CFA Level 1 candidates who want a weighted topic baseline before committing to a full mock provider.",
    practiceTestLabel: "CFA Level 1 practice test",
  },
  "series-7-readiness-check": {
    title: "Free Series 7 Practice Test | 60-Question FINRA Readiness Check",
    description:
      "Free Series 7 practice questions online: 60 timed questions across FINRA job-function weights, 90 minutes, 72% target, topic scoring, and answer review. Independent Series 7 prep — not official FINRA material.",
    keywords: [
      "series 7 practice test",
      "series 7 mock exam",
      "free series 7 questions",
      "finra series 7 readiness check",
    ],
    headline: "Free Series 7 Readiness Check",
    intro:
      "A Series 7 readiness check built from UniPrep2Go deck content across seeking business, opening accounts, recommendations and suitability, and obtaining customer instructions.",
    audience: "Series 7 Top-Off candidates who want a timed diagnostic before drilling suitability and product questions.",
    practiceTestLabel: "Series 7 practice test",
  },
  "california-real-estate-readiness-check": {
    title: "Free California Real Estate Practice Test | 60-Question Mock",
    description:
      "Free California real estate exam practice online: 60 timed questions, 90 minutes, 70% target, DRE-style topic scoring, and answer review. Independent CA salesperson prep — not official DRE material.",
    keywords: [
      "california real estate practice test",
      "ca real estate exam questions",
      "california salesperson practice exam",
      "free real estate mock exam california",
    ],
    headline: "Free California Real Estate Readiness Check",
    intro:
      "A California real estate licensing readiness check covering practice and disclosures, agency, ownership, valuation, contracts, financing, and transfer of property.",
    audience: "California DRE salesperson exam candidates who want a timed baseline before licensing prep.",
    practiceTestLabel: "California real estate practice test",
  },
  "life-and-health-insurance-readiness-check": {
    title: "Free Life and Health Insurance Practice Test | 60 Questions",
    description:
      "Free Life & Health insurance licensing practice online: 60 timed questions, 90 minutes, 70% target, topic scoring, and answer review. Independent insurance prep — not official state exam material.",
    keywords: [
      "life and health insurance practice test",
      "insurance license practice exam",
      "life health insurance mock exam",
      "free insurance exam questions",
    ],
    headline: "Free Life & Health Insurance Readiness Check",
    intro:
      "A Life & Health insurance licensing readiness check covering health insurance, life basics, provisions, annuities, disability, LTC, and regulation.",
    audience: "Insurance producer candidates preparing for state Life & Health licensing exams.",
    practiceTestLabel: "Life & Health insurance practice test",
  },
  "frm-part-1-readiness-check": {
    title: "Free FRM Part 1 Practice Test 2026 | 50-Question Readiness Check",
    description:
      "Free FRM Part 1 practice questions online: 50 timed questions across all 4 GARP topic weights, 120 minutes, topic scoring, answer review, and pass/no-pass report. Independent FRM prep — not GARP material.",
    keywords: [
      "frm part 1 practice test",
      "frm mock exam",
      "free frm practice questions",
      "garp frm readiness check",
      "frm part 1 exam prep",
    ],
    headline: "Free FRM Part 1 Readiness Check",
    intro:
      "A timed FRM Part 1 diagnostic sampled across foundations of risk, quant, financial markets and products, and valuation and risk models — with weighted topic feedback.",
    audience: "FRM Part 1 candidates who want a timed baseline before committing to a full mock provider.",
    practiceTestLabel: "FRM Part 1 practice test",
  },
  "series-63-readiness-check": {
    title: "Free Series 63 Practice Test | 60-Question NASAA Readiness Check",
    description:
      "Free Series 63 practice questions online: 60 timed questions on NASAA state law topics, 90 minutes, 72% target, topic scoring, and answer review. Independent Series 63 prep — not official NASAA material.",
    keywords: [
      "series 63 practice test",
      "series 63 mock exam",
      "nasaa series 63 questions",
      "uniform securities act practice test",
      "free series 63 exam prep",
    ],
    headline: "Free Series 63 Readiness Check",
    intro:
      "A Series 63 readiness check built from UniPrep2Go deck content across broker-dealer regulation, agent registration, ethics, communications, and investment adviser basics.",
    audience: "Series 63 candidates who need a timed diagnostic after SIE and Series 7 prep.",
    practiceTestLabel: "Series 63 practice test",
  },
  "property-casualty-insurance-readiness-check": {
    title: "Free Property & Casualty Insurance Practice Test | 60 Questions",
    description:
      "Free Property and Casualty insurance licensing practice online: 60 timed questions, 90 minutes, 70% target, topic scoring, and answer review. Independent P&C prep — not official state exam material.",
    keywords: [
      "property casualty insurance practice test",
      "p&c insurance license exam",
      "homeowners insurance exam questions",
      "casualty insurance mock exam",
      "insurance producer practice test",
    ],
    headline: "Free Property & Casualty Insurance Readiness Check",
    intro:
      "A P&C insurance licensing readiness check covering homeowners, personal auto, commercial property, general liability, workers compensation, and key regulation concepts.",
    audience: "Property & Casualty insurance producer candidates preparing for state licensing exams.",
    practiceTestLabel: "Property & Casualty insurance practice test",
  },
  "gmat-focus-readiness-check": {
    title: "Free GMAT Focus Practice Test | 45-Question Mock",
    description:
      "Free GMAT Focus practice questions online: 45 timed questions across Quant, Verbal, and Data Insights, 90 minutes, 70% readiness target, section diagnosis, and full answer review. Independent GMAT prep — not GMAC material.",
    keywords: [
      "gmat focus practice test",
      "gmat mock exam",
      "free gmat practice questions",
      "gmat readiness check",
      "gmat focus edition practice",
    ],
    headline: "Free GMAT Focus Readiness Check",
    intro:
      "A timed GMAT Focus readiness diagnostic modeled on the official three-section format: Quantitative Reasoning, Verbal Reasoning, and Data Insights with equal section weights and a 205–805 style score prep target.",
    audience:
      "MBA and business master's applicants who want a baseline timed diagnostic before official GMAC prep or tutoring.",
    practiceTestLabel: "GMAT Focus practice test",
  },
  "sat-readiness-check": {
    title: "Free Digital SAT Practice Test | 49-Question Mock",
    description:
      "Free Digital SAT practice questions online: 49 timed questions across Reading and Writing and Math, 70 minutes, 70% readiness target with both section axes required, and full answer review. Independent SAT prep — not College Board material.",
    keywords: [
      "digital sat practice test",
      "sat mock exam",
      "free sat practice questions",
      "sat readiness check",
      "sat reading and writing practice",
      "sat math practice test",
    ],
    headline: "Free Digital SAT Readiness Check",
    intro:
      "A timed Digital SAT readiness diagnostic scored on the two official College Board axes — Reading and Writing and Math — with a 400–1600 style prep target. Both sections must clear the readiness bar for a pass.",
    audience:
      "High school students and parents who want a baseline timed diagnostic before Bluebook practice or tutoring.",
    practiceTestLabel: "Digital SAT practice test",
  },
  "pmp-readiness-check": {
    title: "Free PMP Practice Test | 51-Question Mock",
    description:
      "Free PMP practice questions online: 51 timed questions across People, Process, and Business Environment (2026 ECO weights), 70 minutes, 70% readiness target with all domains required, and full answer review. Independent PMP prep — not PMI exam material.",
    keywords: [
      "pmp practice test",
      "pmp mock exam",
      "free pmp practice questions",
      "pmp readiness check",
      "pmp exam prep",
      "project management professional practice test",
    ],
    headline: "Free PMP Readiness Check",
    intro:
      "A timed PMP readiness diagnostic scored on the three official PMI Exam Content Outline domains — People (33%), Process (41%), and Business Environment (26%). All three domains must clear the readiness bar for a pass.",
    audience:
      "Project managers and aspirants preparing for the PMI PMP certification who want a domain-weighted baseline before a full-length mock or paid study course.",
    practiceTestLabel: "PMP practice test",
  },
  "gre-readiness-check": {
    title: "Free GRE Practice Test | 30-Question Mock",
    description:
      "Free GRE General practice questions online: 30 timed questions across Verbal Reasoning and Quantitative Reasoning, 45 minutes, 70% readiness target with both section axes required, and full answer review. Independent GRE prep — not ETS material.",
    keywords: [
      "gre practice test",
      "gre mock exam",
      "free gre practice questions",
      "gre readiness check",
      "gre verbal practice",
      "gre quant practice test",
    ],
    headline: "Free GRE General Readiness Check",
    intro:
      "A timed GRE General readiness diagnostic scored on the two official ETS MCQ axes — Verbal Reasoning and Quantitative Reasoning (130–170 each). Both sections must clear the readiness bar for a pass. Analytical Writing is not included in this MCQ check.",
    audience:
      "Graduate and business school applicants who want a baseline timed diagnostic before official ETS PowerPrep or tutoring.",
    practiceTestLabel: "GRE practice test",
  },
  "epa-608-readiness-check": {
    title: "Free EPA 608 Practice Test | 40-Question Mock",
    description:
      "Free EPA Section 608 practice questions online: 40 timed questions across Core, Type I, Type II, and Type III, 75 minutes, 70% readiness target, section diagnosis, and full answer review. Independent HVAC prep — not U.S. EPA exam material.",
    keywords: [
      "epa 608 practice test",
      "hvac certification practice test",
      "epa 608 study guide",
      "free epa 608 practice questions",
      "hvac technician exam",
      "epa 608 core type 1 2 3",
    ],
    headline: "Free EPA Section 608 HVAC Readiness Check",
    intro:
      "A timed EPA 608 readiness diagnostic modeled on the Universal certification format: Core plus Types I, II, and III with the official 18-of-25 (72%) pass threshold per section as your prep target.",
    audience:
      "HVAC technicians, apprentices, and trade-school students preparing for EPA Section 608 refrigerant certification before scheduling an approved proctored exam.",
    practiceTestLabel: "EPA 608 practice test",
  },
  "bms-bas-readiness-check": {
    title: "Free BMS Practice Test | 40-Question BAS Mock",
    description:
      "Free BMS / BAS practice questions online: 40 timed questions across BACnet, HVAC sequences, alarms and trends, and commissioning, 75 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent building automation prep — not Tridium or BACnet International exam material.",
    keywords: [
      "bms practice test",
      "building automation practice exam",
      "bas technician test",
      "bacnet practice questions",
      "niagara 4 study guide",
      "building management system exam",
    ],
    headline: "Free BMS / BAS Building Automation Readiness Check",
    intro:
      "A timed building automation readiness diagnostic covering BACnet networking, HVAC control sequences, operator platform workflows, and commissioning — the core domains BMS technicians face before vendor certifications like Tridium Niagara 4 TCP.",
    audience:
      "BMS engineers, controls technicians, facility automation staff, and integrator apprentices preparing for BAS roles or vendor certification training.",
    practiceTestLabel: "BMS practice test",
  },
  "leed-green-associate-readiness-check": {
    title: "Free LEED Green Associate Practice Test | 50-Question Readiness Check",
    description:
      "Free LEED Green Associate practice questions online: 50 timed questions across LEED knowledge domains, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent green building prep — not USGBC exam material.",
    keywords: [
      "leed green associate practice test",
      "leed ga exam questions",
      "free leed practice test",
      "leed green associate study guide",
      "gbci leed exam prep",
    ],
    headline: "Free LEED Green Associate Readiness Check",
    intro:
      "A timed LEED GA readiness diagnostic modeled on the official 100-question GBCI exam structure with a 170 scaled-score pass target on the real test (125–200 scale).",
    audience:
      "Architects, engineers, sustainability consultants, and students entering green building who want a baseline before USGBC exam registration.",
    practiceTestLabel: "LEED Green Associate practice test",
  },
  "leed-ap-bd-c-readiness-check": {
    title: "Free LEED AP BD+C Practice Test | 50-Question Readiness Check",
    description:
      "Free LEED AP Building Design + Construction practice questions: 50 timed questions, 100 minutes, 70% readiness target, credit-category diagnosis, and full answer review. Independent LEED AP prep — not USGBC material.",
    keywords: [
      "leed ap bd+c practice test",
      "leed ap exam questions",
      "leed ap building design and construction",
      "free leed ap practice test",
      "gbci leed ap prep",
    ],
    headline: "Free LEED AP BD+C Readiness Check",
    intro:
      "A timed LEED AP BD+C readiness diagnostic for the design and construction specialty — prerequisites, credits, and LEED project roles. Requires LEED Green Associate for the official AP credential.",
    audience:
      "Design professionals, sustainability consultants, and LEED GA holders preparing for the LEED AP BD+C specialty exam.",
    practiceTestLabel: "LEED AP BD+C practice test",
  },
  "leed-ap-om-readiness-check": {
    title: "Free LEED AP O+M Practice Test | 50-Question Mock",
    description:
      "Free LEED AP Operations + Maintenance practice questions online: 50 timed questions across process, sites, water, energy, and IEQ for existing buildings, 100 minutes, 70% readiness target, and full answer review. Independent LEED prep — not USGBC/GBCI material.",
    keywords: [
      "leed ap o+m practice test",
      "leed operations and maintenance exam",
      "leed om practice questions",
      "leed ap om readiness check",
      "existing building leed exam prep",
    ],
    headline: "Free LEED AP O+M Readiness Check",
    intro:
      "A timed LEED AP Operations + Maintenance readiness diagnostic for existing-building teams — process and integrative planning, transportation and sites, water, energy/atmosphere, and materials/IEQ — aligned to GBCI specialty domains.",
    audience:
      "Facility managers, sustainability leads, and LEED Green Associates preparing for the LEED AP O+M specialty exam on existing buildings.",
    practiceTestLabel: "LEED AP O+M practice test",
  },
  "well-ap-readiness-check": {
    title: "Free WELL AP Practice Test | 50-Question WELL Accredited Professional Readiness Check",
    description:
      "Free WELL AP practice questions online: 50 timed questions across WELL v2 concepts and certification process, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not IWBI exam material.",
    keywords: [
      "well ap practice test",
      "well accredited professional exam",
      "well v2 exam prep",
      "iwbi well ap study guide",
      "free well ap practice questions",
      "well building standard exam",
      "gbci well ap prep",
    ],
    headline: "Free WELL Accredited Professional (WELL AP) Readiness Check",
    intro:
      "A timed WELL AP readiness diagnostic across WELL v2 knowledge domains. Official exam: 115 questions, 2.5 hours, scaled pass score 170 (125–200 scale), delivered by GBCI for IWBI.",
    audience:
      "Architects, designers, building operators, HR/wellness professionals, and sustainability consultants preparing for the WELL Accredited Professional credential.",
    practiceTestLabel: "WELL AP practice test",
  },
  "cem-readiness-check": {
    title: "Free CEM Practice Test | 65-Question Certified Energy Manager Readiness Check",
    description:
      "Free Certified Energy Manager practice questions online: 65 timed questions across AEE Body of Knowledge domains, 120 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent CEM prep — not AEE exam material.",
    keywords: [
      "cem practice test",
      "certified energy manager exam",
      "aee cem study guide",
      "free cem practice questions",
      "energy manager certification test",
    ],
    headline: "Free Certified Energy Manager (CEM) Readiness Check",
    intro:
      "A timed CEM readiness diagnostic sized to AEE's half-length self-evaluation format. Official CEM exam: 130 questions, 4 hours, open book, scaled pass score 700 (0–1040).",
    audience:
      "Energy managers, facility engineers, sustainability professionals, and HVAC/electrical engineers preparing for AEE CEM certification.",
    practiceTestLabel: "CEM practice test",
  },
  "ashrae-certifications-readiness-check": {
    title: "Free ASHRAE Certification Practice Test | 50-Question Readiness Check",
    description:
      "Free ASHRAE certification practice questions online: 50 timed questions across BEMP, BEAP, BCxP, CHD/HBDP/HFDP, and OPMP domains, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not ASHRAE exam material.",
    keywords: [
      "ashrae certification practice test",
      "bemp exam prep",
      "bcxp practice questions",
      "beap study guide",
      "chd ashrae exam",
      "opmp certification",
      "ashrae hbdp practice test",
    ],
    headline: "Free ASHRAE Certifications Readiness Check",
    intro:
      "A timed readiness diagnostic sampled across ASHRAE's ANSI-accredited personnel certifications — energy modeling, assessment, commissioning, HVAC design, healthcare facility design, and operations management.",
    audience:
      "HVAC engineers, energy modelers, commissioning providers, facility managers, and designers preparing for ASHRAE BCxP, BEMP, BEAP, CHD, HBDP, HFDP, or OPMP exams.",
    practiceTestLabel: "ASHRAE certification practice test",
  },
  "cdcp-readiness-check": {
    title: "Free CDCP Practice Test | 40-Question Certified Data Centre Professional Readiness Check",
    description:
      "Free CDCP practice questions online: 40 timed questions across data centre facilities and operations domains, 60 minutes, 68% readiness target (matches official pass mark), topic diagnosis, and full answer review. Independent prep — not EXIN or EPI exam material.",
    keywords: [
      "cdcp practice test",
      "certified data centre professional exam",
      "exin cdcp study guide",
      "epi cdcp prep",
      "free cdcp practice questions",
      "data centre certification test",
      "tia-942 exam prep",
    ],
    headline: "Free Certified Data Centre Professional (CDCP) Readiness Check",
    intro:
      "A timed CDCP readiness diagnostic matching the official EXIN EPI exam length — 40 closed-book multiple-choice questions in 60 minutes with a 68% pass target (27/40).",
    audience:
      "Data centre operators, facility engineers, IT infrastructure staff, and technicians preparing for the EXIN EPI Certified Data Centre Professional credential after accredited EPI training.",
    practiceTestLabel: "CDCP practice test",
  },
  "nebosh-readiness-check": {
    title: "Free NEBOSH Practice Test | 50-Question IGC Readiness Check",
    description:
      "Free NEBOSH practice questions online: 50 timed questions across IGC GIC1 syllabus elements and GIC2 risk assessment skills, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not NEBOSH assessment material.",
    keywords: [
      "nebosh practice test",
      "nebosh igc exam",
      "nebosh gic1 prep",
      "nebosh gic2 risk assessment",
      "free nebosh practice questions",
      "nebosh international general certificate",
      "health and safety exam prep",
    ],
    headline: "Free NEBOSH International General Certificate (IGC) Readiness Check",
    intro:
      "A timed readiness diagnostic across NEBOSH IGC syllabus elements — health and safety management systems, workplace hazards, and risk assessment. Official assessments: GIC1 open-book examination (5 hours) and GIC2 practical risk assessment (4 hours).",
    audience:
      "Health and safety officers, supervisors, managers, and career changers preparing for the NEBOSH International General Certificate (IGC) through an accredited Learning Partner.",
    practiceTestLabel: "NEBOSH practice test",
  },
  "cfps-readiness-check": {
    title: "Free CFPS Practice Test | 50-Question Certified Fire Protection Specialist Readiness Check",
    description:
      "Free CFPS practice questions online: 50 timed questions across NFPA's eight fire protection domains, 90 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not NFPA exam material.",
    keywords: [
      "cfps practice test",
      "certified fire protection specialist exam",
      "nfpa cfps prep",
      "fire protection handbook exam",
      "free cfps practice questions",
      "fire suppression certification",
      "prometric cfps exam",
    ],
    headline: "Free Certified Fire Protection Specialist (CFPS) Readiness Check",
    intro:
      "A timed CFPS readiness diagnostic weighted to NFPA's exam blueprint. Official CFPS: 100 multiple-choice questions in 3 hours, open book with the NFPA Fire Protection Handbook (21st Edition).",
    audience:
      "Fire protection engineers, fire marshals, AHJ staff, consultants, and safety professionals preparing for NFPA's Certified Fire Protection Specialist credential.",
    practiceTestLabel: "CFPS practice test",
  },
  "mrics-readiness-check": {
    title: "Free MRICS Practice Questions | 50-Question APC Readiness Check",
    description:
      "Free MRICS/APC practice questions online: 50 timed questions across mandatory competencies, ethics, technical pathway knowledge, and final interview prep, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not RICS assessment material.",
    keywords: [
      "mrics practice questions",
      "rics apc exam prep",
      "assessment of professional competence",
      "chartered surveyor interview prep",
      "free mrics apc questions",
      "rics ethics rules of conduct",
      "mrics case study prep",
    ],
    headline: "Free MRICS (Chartered Member) APC Readiness Check",
    intro:
      "A timed readiness diagnostic for RICS Assessment of Professional Competence knowledge — mandatory and technical competencies, ethics, and interview preparation. Official MRICS qualification: written submission plus 60-minute final assessment interview (not a multiple-choice exam).",
    audience:
      "Quantity surveyors, building surveyors, commercial property professionals, project managers, and valuers preparing for RICS APC and MRICS chartered membership.",
    practiceTestLabel: "MRICS APC practice questions",
  },
  "mrics-quantity-surveying-readiness-check": {
    title: "Free MRICS Quantity Surveying Practice Questions | 50-Question APC Readiness Check",
    description:
      "Free MRICS Quantity Surveying APC practice questions: 50 timed questions across QS core competencies (cost planning, measurement, contracts, procurement, project finance), 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not RICS material.",
    keywords: [
      "mrics quantity surveying practice questions",
      "rics qs apc prep",
      "quantity surveyor apc interview",
      "commercial management competency",
      "design economics cost planning",
      "rics contract practice jct nec",
      "free quantity surveying apc questions",
    ],
    headline: "Free MRICS Quantity Surveying APC Readiness Check",
    intro:
      "A timed readiness diagnostic for the RICS Quantity Surveying and Construction pathway — six core competencies to Level 3, mandatory ethics, and final interview preparation. Official route: written submission plus 60-minute assessment interview.",
    audience:
      "Assistant quantity surveyors, cost consultants, commercial managers, and QS graduates preparing for MRICS on the Quantity Surveying and Construction pathway.",
    practiceTestLabel: "MRICS Quantity Surveying practice questions",
  },
  "cfa-level-2-readiness-check": {
    title: "Free CFA Level 2 Mock Exam 2026 | 60 Questions",
    description:
      "Free CFA Level 2 practice questions online: 60 timed questions across all ten topic areas, 90 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not CFA Institute material.",
    keywords: [
      "cfa level 2 practice test",
      "cfa level 2 mock exam",
      "free cfa level 2 questions",
      "cfa level 2 readiness check",
      "cfa level 2 item set prep",
    ],
    headline: "Free CFA Level 2 Readiness Check",
    intro:
      "A timed CFA Level 2 readiness diagnostic with vignette-style application prompts across ethics, FSA, equity, fixed income, derivatives, and portfolio management.",
    audience: "CFA Level 2 candidates who passed Level 1 and want a baseline before item-set practice blocks.",
    practiceTestLabel: "CFA Level 2 practice test",
  },
  "us-citizenship-readiness-check": {
    title: "Free U.S. Citizenship Practice Test | 30 Civics Questions",
    description:
      "Free U.S. citizenship civics practice test: 30 timed questions on American government, history, and geography, 30 minutes, 80% readiness target, and full answer review. Pairs with the Prep2Go Immigration app. Independent prep — not USCIS material.",
    keywords: [
      "us citizenship practice test",
      "uscis civics test free",
      "naturalization test practice",
      "citizenship test questions 2025",
    ],
    headline: "Free U.S. Citizenship Civics Readiness Check",
    intro:
      "A timed civics readiness check modeled on USCIS naturalization themes — government structure, American history, and geography/symbols.",
    audience: "Green card holders preparing for the U.S. naturalization civics interview.",
    practiceTestLabel: "U.S. citizenship practice test",
  },
};

export function getMockSeoProfile(config: MockExamConfig) {
  return mockSeoProfiles[config.slug] ?? defaultProfile(config);
}

export function buildMockSeoTitle(config: MockExamConfig) {
  return fitSeoTitle(getMockSeoProfile(config).title, SEO_TITLE_MAX);
}

export function buildMockSeoDescription(config: MockExamConfig) {
  return getMockSeoProfile(config).description;
}

export function buildMockSeoKeywords(config: MockExamConfig) {
  return getMockSeoProfile(config).keywords;
}

export function buildMockSearchFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);

  return [
    {
      question: `Is there a free ${profile.practiceTestLabel}?`,
      answer: `Yes — ${siteConfig.name} hosts a free online ${profile.practiceTestLabel} with ${config.questionCount} timed questions, ${config.durationMinutes} minutes, a ${config.passRule.passPercent}% pass target, topic scoring, and a full answer review report. ${mockFreeAccessPriceLabel}.`,
    },
    {
      question: `How many questions are on this ${config.shortTitle}?`,
      answer: `This ${config.status === "live" ? "mock exam" : "readiness check"} has ${config.questionCount} multiple-choice questions timed against a ${config.durationMinutes}-minute target. ${config.officialSourceNote}`,
    },
    {
      question: `What score do you need to pass this ${config.shortTitle}?`,
      answer: `The pass target on this mock is ${config.passRule.passPercent}%. Your report also breaks down performance by topic so you can see weak areas before retaking the real exam.`,
    },
    {
      question: `Who should take this ${config.shortTitle}?`,
      answer: profile.audience,
    },
  ];
}

export function buildMockExamFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);

  return [
    ...buildMockSearchFaqs(config),
    {
      question: `Where can I take a ${profile.practiceTestLabel} online?`,
      answer: `${siteConfig.name} hosts the ${profile.headline} at ${pageUrl} with a timed runner and full readiness report.`,
    },
    {
      question: "Is this official exam material?",
      answer: `No. ${config.disclaimer}`,
    },
    {
      question: "What does the report show after the mock?",
      answer:
        "Your report shows a pass/no-pass verdict with explanation, weighted topic diagnosis, pacing analysis, full question review with deck-backed explanations, and a repair plan linked to the Anki deck. If the verdict is no-pass or borderline, drill the linked deck before retaking.",
    },
    {
      question: "Where do the questions come from?",
      answer:
        "Questions are converted from the linked UniPrep2Go Anki deck CSV source, reshuffled into multiple-choice format with distractors drawn from sibling deck cards.",
    },
  ];
}

export function buildMockSeoPageCopy(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);

  return {
    headline: profile.headline,
    intro: profile.intro,
    audience: profile.audience,
    topicSummary: config.topics.map((topic) => topic.label).join(", "),
    practiceTestLabel: profile.practiceTestLabel,
  };
}

export function buildMockExamHubFaqs(indexedCount: number, totalCount: number) {
  const previewCount = totalCount - indexedCount;

  return [
    {
      question: "How many free practice tests does UniPrep2Go offer?",
      answer: `${indexedCount} live indexed timed mocks have complete question banks and are promoted in search (currently FINRA SIE, Series 7, CFA Level 1, CFA Level 2, ServSafe Manager, and PTCB). ${previewCount} additional preview readiness checks are on-site for other exams but stay noindex until banks are complete — ${mockFreeAccessNotice}`,
    },
    {
      question: "Do I need to sign up for the free mocks?",
      answer:
        "No signup wall — start a timed mock directly from the landing page. Your readiness report appears immediately after submit with topic scoring and answer review.",
    },
    {
      question: "What happens after the mock report?",
      answer:
        "Your report flags weak topics and links to the matching Anki deck or PDF for spaced-repetition repair. Buy the deck only when you want daily drilling on gaps the mock surfaced.",
    },
    {
      question: "Are these official exam materials?",
      answer:
        "No. UniPrep2Go mocks and decks are independent study aids — not endorsed, promoted, or warranted by FINRA, CFA Institute, PTCB, ServSafe, or any exam body.",
    },
  ] as const;
}
