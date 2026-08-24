import type { MockExamConfig } from "./types";
import { getNicheExamExplainer } from "./niche-exam-explainers";
import { getMockOfficialResources } from "./official-resources";
import { mockFreeAccessNotice, mockFreeAccessPriceLabel, mockFunnelNoticeForLinkedDeck } from "./pricing";
import { getDeckBySlug } from "../decks";
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
  /** Visible “what is this certification/exam?” copy for SEO */
  whatIsExam: string;
  administeredBy?: string;
  officialFormat?: string;
  examFaqs?: Array<{ question: string; answer: string }>;
};

/** Hand-authored overrides — exam context can come from niche explainers. */
type MockSeoProfileOverride = Omit<
  MockSeoProfile,
  "whatIsExam" | "administeredBy" | "officialFormat" | "examFaqs"
> &
  Partial<Pick<MockSeoProfile, "whatIsExam" | "administeredBy" | "officialFormat" | "examFaqs">>;

function defaultProfile(config: MockExamConfig): MockSeoProfile {
  const niche = getNicheExamExplainer(config.slug);
  const examLabel = config.examBody;
  const practiceName = niche?.practiceTestName ?? `${config.shortTitle} Practice Test`;
  const waitlist = config.status === "coming_soon";
  const type = config.status === "live" ? "practice test" : "readiness check";
  const aliasKeywords = (config.searchAliases ?? []).flatMap((alias) => [
    `${alias.toLowerCase()} practice test`,
    `${alias.toLowerCase()} practice exam`,
  ]);

  if (waitlist) {
    return {
      title: `Free ${practiceName} 2026 | Coming Soon`,
      description: niche
        ? `${practiceName} coming soon on UniPrep2Go: planned ${config.questionCount}-question timed diagnostic (${config.durationMinutes} min, ${config.passRule.passPercent}% target) with topic scoring. Notify when it launches. ${niche.administeredBy}. Independent prep — not official exam material.`
        : `${config.shortTitle} free practice test coming soon: planned ${config.questionCount} timed questions, notify when live. Independent prep — not official exam material.`,
      keywords: [
        ...(niche?.keywords ?? []),
        `free ${config.shortTitle.toLowerCase()} practice test`,
        `${config.shortTitle.toLowerCase()} practice exam`,
        `${examLabel.toLowerCase()} practice questions`,
        ...aliasKeywords,
      ].slice(0, 12),
      headline: `Free ${practiceName} (Coming Soon)`,
      intro: `${config.description} The timed question bank is on the waitlist — use Notify me when this launches, and study the exam guide on this page meanwhile.`,
      audience:
        niche?.whoFor ??
        (niche
          ? `Candidates preparing for ${niche.practiceTestName.replace(/ Practice Test$/i, "")} who want a timed diagnostic with topic-level feedback when it launches.`
          : `Candidates preparing for ${examLabel} licensing or certification exams who want a timed diagnostic with topic-level feedback.`),
      practiceTestLabel: practiceName.replace(/^Free\s+/i, ""),
      whatIsExam:
        niche?.whatIsExam ??
        `${config.shortTitle} is an exam pathway administered under ${examLabel}. ${config.officialSourceNote} This UniPrep2Go page is an independent exam guide and waitlist for a free timed practice test — not official exam material.`,
      administeredBy: niche?.administeredBy ?? examLabel,
      officialFormat: niche?.officialFormat,
      examFaqs: niche?.examFaqs,
    };
  }

  return {
    title: `Free ${practiceName} 2026 | ${config.questionCount} Questions Online`,
    description: niche
      ? `Free ${practiceName.toLowerCase()}: ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% pass target, topic scoring, and answer review. ${niche.administeredBy}. Independent prep — not official exam material.`
      : `Take a free online ${examLabel} ${type}: ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% pass target, topic scoring, answer review, and pass/no-pass report. Independent prep — not official exam material.`,
    keywords: [
      ...(niche?.keywords ?? []),
      `free ${config.shortTitle.toLowerCase()} practice test`,
      `${config.shortTitle.toLowerCase()} mock exam`,
      `${examLabel.toLowerCase()} practice questions`,
      ...aliasKeywords,
    ].slice(0, 12),
    headline: `Free ${practiceName}`,
    intro: `${config.description} Use this free timed ${type} as a baseline before exam day or before drilling the linked Anki deck.`,
    audience:
      niche?.whoFor ??
      (niche
        ? `Candidates preparing for ${niche.practiceTestName.replace(/ Practice Test$/i, "")} who want a timed diagnostic with topic-level feedback.`
        : `Candidates preparing for ${examLabel} licensing or certification exams who want a timed diagnostic with topic-level feedback.`),
    practiceTestLabel: practiceName.replace(/^Free\s+/i, ""),
    whatIsExam:
      niche?.whatIsExam ??
      `${config.shortTitle} is an exam pathway administered under ${examLabel}. ${config.officialSourceNote} This UniPrep2Go page is an independent timed practice test — not official exam material.`,
    administeredBy: niche?.administeredBy ?? examLabel,
    officialFormat: niche?.officialFormat,
    examFaqs: niche?.examFaqs,
  };
}

const mockSeoProfiles: Partial<Record<string, MockSeoProfileOverride>> = {
  "sie-full-mock": {
    // CTR pattern: Prep2Go (exam + concrete need + year) + PixID (specific offer in blue link)
    title: "SIE Practice Test Free 2026 | 75Q Timed, No Signup",
    description:
      "Free SIE practice test online — no signup: 75 timed questions, 105 minutes, 70% pass target, instant pass/no-pass report and full answer review. FINRA-topic-weighted. Independent mock — not official FINRA material.",
    keywords: [
      "free sie practice test",
      "sie practice test",
      "sie mock exam",
      "finra sie practice exam",
      "sie exam questions",
      "sie readiness check",
    ],
    headline: "Free SIE Practice Test — 75 Questions, Timed",
    intro:
      "A full-length FINRA SIE mock exam modeled on the official outline: 75 scored questions, 105 minutes, and a 70% pass threshold with weighted topic diagnosis across capital markets, products and risks, trading and accounts, and regulatory framework. No signup — start when you are ready. If 105 minutes is too long for a first pass, use the 25-question SIE quick diagnostic first.",
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
      "Take a free PTCB / PTCE practice test online: 90 timed questions, 110 minutes, 2026 domain-weighted scoring (Medications 35%, Federal Requirements 18.75%, Patient Safety 23.75%, Order Entry 22.5%), answer explanations, and pass/no-pass report. Independent mock — not official PTCB material.",
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
  "nha-excpt-readiness-check": {
    title: "Free NHA ExCPT Practice Test | 60 Questions Online",
    description:
      "Free NHA ExCPT pharmacy technician practice test: 60 timed questions, 75 minutes, domain scoring for pharmacology, federal law, order entry, and dispensing — full answer review, no signup, no 20-question paywall. Distinct from PTCB PTCE. Independent prep — not NHA exam material.",
    keywords: [
      "free nha excpt practice test",
      "nha excpt practice test",
      "excpt practice exam",
      "excpt vs ptcb",
      "nha pharmacy tech practice test",
      "pharmacy technician practice test free",
    ],
    headline: "Free NHA ExCPT Pharmacy Technician Practice Test",
    intro:
      "A timed ExCPT-pathway diagnostic with domain scoring — pharmacology, federal requirements, order entry, and dispensing practice — built for candidates who chose NHA rather than PTCB. No signup; full answer review after you finish. Independent prep — not retired NHA items.",
    audience:
      "Pharmacy technician candidates targeting NHA ExCPT (not PTCB PTCE) who want a free timed baseline with topic scoring before paying for a question bank.",
    practiceTestLabel: "NHA ExCPT practice test",
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
    title: "Series 7 Practice Test 2026 | Free 60Q Timed Online",
    description:
      "Free Series 7 practice test — no signup: 60 timed questions across FINRA job-function weights, 90 minutes, 72% target, topic scoring, and full answer review. Independent Series 7 prep — not official FINRA material.",
    keywords: [
      "series 7 practice test",
      "free series 7 practice test",
      "series 7 mock exam",
      "free series 7 questions",
      "finra series 7 readiness check",
    ],
    headline: "Free Series 7 Practice Test — 60 Questions",
    intro:
      "A Series 7 practice test built from UniPrep2Go deck content across seeking business, opening accounts, recommendations and suitability, and obtaining customer instructions. Timed diagnostic with topic scoring — no signup.",
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
  "fl-real-estate-readiness-check": {
    title: "Free Florida Real Estate Practice Test | 60Q Diagnostic",
    description:
      "Free Florida real estate practice test: 60 timed questions, 75 minutes, 70% readiness target, FREC topic scoring. Official DBPR exam is 100Q / 3.5h / 75% — this mock is shorter. Independent — not DBPR/FREC material.",
    keywords: [
      "florida real estate practice test",
      "florida real estate exam questions",
      "fl sales associate practice exam",
      "free florida real estate practice test",
      "frec practice test",
    ],
    headline: "Free Florida Real Estate Practice Test",
    intro:
      "A Florida DBPR/FREC sales associate diagnostic covering license law, contracts/titles, finance/appraisal math, and brokerage practice — with topic scoring. Official exam is 100 questions in 3.5 hours at 75%; use this 60-question timed mock to find weak domains before you schedule Pearson VUE.",
    audience:
      "Florida sales associate candidates after the 63-hour pre-license course who want a free timed baseline before the official 100-question DBPR exam.",
    practiceTestLabel: "Florida real estate practice test",
  },
  "tx-real-estate-readiness-check": {
    title: "Free Texas Real Estate Practice Test | 60Q Diagnostic",
    description:
      "Free Texas real estate practice test: 60 timed questions, 75 minutes, 70% readiness target, TREC topic scoring. Official TREC exam is dual national+state (~70% each) — this mock is shorter. Independent — not TREC material.",
    keywords: [
      "texas real estate practice test",
      "texas real estate exam questions",
      "trec practice exam",
      "free texas real estate practice test",
      "texas sales agent practice test",
    ],
    headline: "Free Texas Real Estate Practice Test",
    intro:
      "A Texas TREC sales agent diagnostic covering TRELA/TREC license law, contracts & agency, finance/closing math, and property practice. Official Pearson VUE sitting is dual national + Texas-law portions; use this 60-question timed mock to prioritize Anki repair before exam day.",
    audience:
      "Texas sales agent candidates who finished TREC qualifying education and want a free timed baseline before the official dual-portion exam.",
    practiceTestLabel: "Texas real estate practice test",
  },
  "ny-real-estate-readiness-check": {
    title: "Free NY Real Estate Practice Test | 60Q Diagnostic",
    description:
      "Free New York real estate practice test: 60 timed questions, 90 minutes, 70% readiness target, DOS topic scoring. Official NYDOS exam is 75Q / 90 min / 70% — this mock is shorter. Independent — not DOS material.",
    keywords: [
      "new york real estate practice test",
      "ny real estate exam questions",
      "ny dos salesperson practice exam",
      "free ny real estate practice test",
    ],
    headline: "Free New York Real Estate Practice Test",
    intro:
      "A New York DOS salesperson diagnostic covering license law, contracts/agency/fair housing, finance/valuation/closing, and property practice. Official exam is 75 questions in 90 minutes at 70%; use this 60-question timed mock to find weak domains before eAccessNY.",
    audience:
      "New York salesperson candidates after qualifying education who want a free timed baseline before the official 75-question DOS exam.",
    practiceTestLabel: "New York real estate practice test",
  },
  "series-65-readiness-check": {
    title: "Free Series 65 Practice Test | 60-Question Diagnostic",
    description:
      "Free Series 65 practice test: 60 timed questions, 75 minutes, topic scoring for NASAA IAR themes. Official Series 65 is 130 scored (+10 pretest) / 180 min / 92 correct — this mock is shorter. Independent — not NASAA/FINRA material.",
    keywords: [
      "series 65 practice test",
      "series 65 practice exam",
      "free series 65 questions",
      "nasaa series 65 mock",
      "investment adviser exam practice",
    ],
    headline: "Free Series 65 Practice Test",
    intro:
      "A NASAA Series 65 diagnostic across economics/analysis, investment products, client recommendations, and laws & ethics. Official exam requires 92 of 130 scored questions in 180 minutes; use this free 60-question timed mock to prioritize Anki repair before Prometric.",
    audience:
      "Investment adviser representative candidates preparing for the NASAA Series 65 who want a free timed baseline before a full-length Q-bank.",
    practiceTestLabel: "Series 65 practice test",
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
    title: "Series 63 Practice Test 2026 | Free 60Q NASAA",
    description:
      "Free Series 63 practice test — no signup: 60 timed questions on NASAA state law topics, 90 minutes, 72% target, topic scoring, and full answer review. Independent Series 63 prep — not official NASAA material.",
    keywords: [
      "series 63 practice test",
      "free series 63 practice test",
      "series 63 mock exam",
      "nasaa series 63 questions",
      "uniform securities act practice test",
      "free series 63 exam prep",
    ],
    headline: "Free Series 63 Practice Test — 60 Questions",
    intro:
      "A Series 63 practice test built from UniPrep2Go deck content across broker-dealer regulation, agent registration, ethics, communications, and investment adviser basics. Timed NASAA-topic diagnostic — no signup.",
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
    title: "Free BMS Practice Test | 60-Question BAS Mock",
    description:
      "Free BMS / BAS practice questions online: 60 timed questions across BACnet, HVAC sequences, alarms and trends, and commissioning, 75 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent building automation prep — not Tridium or BACnet International exam material.",
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
      "A timed 60-question building automation diagnostic covering BACnet networking, HVAC control sequences, operator platform workflows, and commissioning. There is no single U.S. federal BMS license — Niagara 4 TCP is a vendor course with a practical assessment, not this MCQ. Independent prep, not Tridium or BACnet International material.",
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
    title: "Free WELL AP Practice Test 2026 | 50 Timed Questions + Topic Report",
    description:
      "Free WELL AP practice test online: 50 timed questions, 100 minutes, 70% readiness target, full topic diagnosis, and answer review. Official GBCI/IWBI exam is 115 items in 2.5 hours (scaled pass 170) — not the outdated “100 questions / 2 hours” summaries some sites still show. Independent prep — not IWBI material.",
    keywords: [
      "well ap practice test",
      "well ap free mock exam",
      "well accredited professional exam",
      "well v2 exam prep",
      "iwbi well ap study guide",
      "free well ap practice questions",
      "well building standard exam",
      "gbci well ap prep",
      "well ap practice exam 2026",
    ],
    headline: "Free WELL Accredited Professional (WELL AP) Readiness Check",
    intro:
      "A timed WELL AP readiness diagnostic across WELL v2 knowledge domains. Official exam (verify on IWBI): 115 questions (100 scored + 15 unscored), 2.5 hours, scaled pass 170 on a 125–200 scale, Prometric delivery by GBCI for IWBI — with embedded scenario/reference PDFs.",
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
      "Free ASHRAE certification practice questions online: 50 timed questions across BEMP, BEAP, BCxP, CHD/HBDP/HFDP, and OPMP domains, 100 minutes, 70% readiness target, topic diagnosis, and full answer review. Official exams are mostly 115 items / 2.5h (BCxP 130 / 120 scored) with credential-specific pass points — not ASHRAE exam material.",
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
      "A timed readiness diagnostic sampled across ASHRAE's ANSI-accredited personnel certifications — energy modeling, assessment, commissioning, HVAC design, healthcare facility design, and operations management. Prefer this free timed mock + ownable Anki over mega free Q-banks when you need topic scoring; keep ASHRAE's official $49 30-question practice exam and credential-specific pass points (e.g. BEMP 69/100, BCxP 83/120) as the source of truth.",
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
    title: "Free NEBOSH Practice Test | 50-Question IGC Diagnostic",
    description:
      "Free NEBOSH IGC practice test: 50 timed MCQs, 100 minutes, 70% readiness target, topic scoring. Official GIC1 is open-book (5h / 45% pass), GIC2 is a 4h practical — this mock is a knowledge diagnostic only. Independent — not NEBOSH material.",
    keywords: [
      "nebosh practice test",
      "nebosh igc exam",
      "nebosh gic1 prep",
      "nebosh gic2 risk assessment",
      "free nebosh practice questions",
      "nebosh international general certificate",
      "nebosh anki",
      "health and safety exam prep",
    ],
    headline: "Free NEBOSH IGC Practice Test (Knowledge Diagnostic)",
    intro:
      "A timed MCQ readiness diagnostic across NEBOSH IGC syllabus elements — management systems, workplace hazards, and GIC2-style risk assessment skills. Official assessments are GIC1 scenario open-book (5 hours, 45% provisional pass) and GIC2 practical (4 hours) — use this free 50-question mock to find weak domains, then drill the linked Anki deck.",
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
    title: "Free MRICS QS Practice Test | 50 APC Questions Online",
    description:
      "Free MRICS Quantity Surveying APC practice test: 50 timed questions on cost planning, NRM measurement, JCT/NEC contracts, procurement, and project finance — 100 minutes, 70% target, competency scoring, full answer review, linked Anki deck. Better than untimed Brainscape cards alone. Independent — not RICS material.",
    keywords: [
      "free mrics qs practice test",
      "mrics quantity surveying practice questions",
      "rics qs apc prep",
      "quantity surveyor apc interview",
      "commercial management competency",
      "design economics cost planning",
      "rics contract practice jct nec",
      "free quantity surveying apc questions",
    ],
    headline: "Free MRICS Quantity Surveying APC Practice Test",
    intro:
      "A timed QS-pathway diagnostic with competency scoring — six core Level 3 topics, ethics, and interview prep — then drill weak rows in the linked MRICS QS Anki deck. Official RICS route remains written submission plus a 60-minute assessment interview.",
    audience:
      "Assistant quantity surveyors, cost consultants, commercial managers, and QS graduates preparing for MRICS on the Quantity Surveying and Construction pathway.",
    practiceTestLabel: "MRICS Quantity Surveying practice test",
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
    title: "Free U.S. Citizenship Practice Test 2026 | 30 Civics Questions",
    description:
      "Free USCIS-style civics practice: 30 timed MCQs. Official naturalization civics is oral (up to 10 from 100, pass at 6) — this page is a timed MCQ diagnostic, not the interview format. Citizenship Anki Bundle. Independent prep.",
    keywords: [
      "us citizenship practice test 2026",
      "uscis civics test free",
      "naturalization test practice",
      "n-400 civics questions",
      "citizenship test questions 2026",
    ],
    headline: "Free U.S. Citizenship Practice Test (2026 Civics)",
    intro:
      "Timed MCQ civics diagnostic for N-400 prep. Format note: USCIS asks up to 10 oral questions from the 100-item list (pass at 6); this check is 30 multiple-choice questions / 30 minutes / 80% for drilling — then practice aloud.",
    audience:
      "Green card holders preparing U.S. naturalization civics (oral interview format differs from this MCQ drill).",
    practiceTestLabel: "U.S. citizenship practice test",
  },
  "leben-in-deutschland-readiness-check": {
    title: "Free Leben in Deutschland Practice Test | 60 Questions",
    description:
      "Free Einbürgerungstest / Leben in Deutschland practice: 60 timed questions (60 min, 55%). Official BAMF exam is 33Q/60min/17 correct — this page is a longer diagnostic. Citizenship Anki Bundle. Independent — not BAMF material.",
    keywords: ["Leben in Deutschland test", "Einbürgerungstest üben", "German citizenship practice test"],
    headline: "Free Leben in Deutschland Readiness Check",
    intro:
      "Timed German civics diagnostic for Einbürgerungstest / Leben in Deutschland. Format note: official BAMF test is 33 questions / 60 minutes / 17 correct; this check is 60 / 60 / 55% to surface weak topics. Language B1 is separate.",
    audience:
      "Residents preparing BAMF Einbürgerungstest / Leben in Deutschland — not a substitute for the official 33-question sitting.",
    practiceTestLabel: "Leben in Deutschland practice test",
  },
  "naturalisation-francaise-readiness-check": {
    title: "Free Naturalisation française Practice Test | 60 Questions",
    description:
      "Free French Examen civique practice (2026): 60 timed questions. Official civic exam is 40Q/45min/80%; B2 language is separate. Citizenship Anki Bundle. Independent — not préfecture material.",
    keywords: [
      "naturalisation française test",
      "examen civique naturalisation",
      "examen civique 2026",
      "French citizenship practice",
    ],
    headline: "Free Naturalisation française Readiness Check",
    intro:
      "Timed civics diagnostic for the French Examen civique (live from Jan 2026). Official format is 40 questions / 45 minutes / 32/40; this check is 60 / 60 / 70%. B2 French is a separate exam — this is not only an interview quiz.",
    audience:
      "Applicants preparing the 2026 French naturalisation civic exam (plus B2 language).",
    practiceTestLabel: "Naturalisation française practice test",
  },
  "life-in-the-uk-readiness-check": {
    title: "Free Life in the UK Practice Test | 60 Questions",
    description:
      "Free Life in the UK practice: 60 timed questions (45 min, 75%). Official Home Office test is 24Q/45min/75% (£50) — this page is longer diagnostic practice. Citizenship Anki Bundle. Independent prep.",
    keywords: ["Life in the UK practice test", "LITUK free test", "British citizenship test practice"],
    headline: "Free Life in the UK Readiness Check",
    intro:
      "Timed Life in the UK diagnostic. Format note: official test is 24 questions / 45 minutes / 18/24; this check is 60 / 45 / 75% to find weak handbook topics.",
    audience:
      "Applicants preparing settlement or British citizenship via the Life in the UK test.",
    practiceTestLabel: "Life in the UK practice test",
  },
  "canadian-citizenship-readiness-check": {
    title: "Free Canadian Citizenship Practice Test | 60 Questions",
    description:
      "Free Canadian citizenship practice: 60 timed Discover Canada questions (45 min, 75%). Official IRCC test is 20Q/30min/75% — this page is longer diagnostic practice. Citizenship Anki Bundle.",
    keywords: ["Canadian citizenship practice test", "Discover Canada quiz", "IRCC citizenship test"],
    headline: "Free Canadian Citizenship Readiness Check",
    intro:
      "Timed Discover Canada diagnostic. Format note: official IRCC test is 20 questions / 30 minutes / 15/20; this check is 60 / 45 / 75%.",
    audience:
      "Permanent residents preparing for the Canadian citizenship test.",
    practiceTestLabel: "Canadian citizenship practice test",
  },
  "australian-citizenship-readiness-check": {
    title: "Free Australian Citizenship Practice Test | 60 Questions",
    description:
      "Free Australian citizenship practice: 60 timed questions (45 min, 75%). Official test is 20Q/45min with a values dual-gate — this diagnostic does not enforce that gate. Citizenship Anki Bundle.",
    keywords: ["Australian citizenship practice test", "Aussie citizenship quiz", "citizenship test Australia"],
    headline: "Free Australian Citizenship Readiness Check",
    intro:
      "Timed Our Common Bond diagnostic. Official exam needs 75% plus all five values questions correct; this 60-question check is longer theme practice without that dual-gate.",
    audience:
      "Permanent residents preparing for the Australian citizenship test.",
    practiceTestLabel: "Australian citizenship practice test",
  },
  "ccse-espana-readiness-check": {
    title: "Free CCSE Practice Test (España) | 60 Questions",
    description:
      "Free CCSE España practice: 60 timed questions (45 min, 60%). Official Cervantes CCSE is 25 items / 45 min / 15/25 — this page is longer. DELE A2 is separate. DELE+CCSE Anki bundle.",
    keywords: [
      "CCSE practice test",
      "prueba CCSE gratis",
      "CCSE España test",
      "nacionalidad española práctica",
      "Instituto Cervantes CCSE",
    ],
    headline: "Free CCSE (España) Readiness Check",
    intro:
      "Timed CCSE diagnostic for Spanish nationality civics. Format note: official exam is 25 questions / 45 minutes / 60%; this check is 60 / 45 / 60%. DELE A2 language is a different exam.",
    audience:
      "Applicants preparing CCSE for nacionalidad española (DELE A2 separate).",
    practiceTestLabel: "CCSE practice test",
  },
  "swiss-citizenship-readiness-check": {
    title: "Free Einbürgerung Schweiz Practice Test | 60 Questions",
    description:
      "Free German Swiss Staatskunde practice: 60 timed federal-theme questions. No single federal MCQ — canton/commune tests vary. Swiss Citizenship Anki Bundle. Independent — not SEM material.",
    keywords: [
      "Einbürgerung Schweiz üben",
      "Staatskunde Schweiz Test",
      "Swiss citizenship practice German",
      "Einbürgerungstest Schweiz",
    ],
    headline: "Free Einbürgerung Schweiz Readiness Check",
    intro:
      "Timed German federal Staatskunde diagnostic for ordinary naturalisation. Switzerland has no nationwide knowledge MCQ; your canton/commune sets the real paper — this page covers federal themes only.",
    audience:
      "German-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Einbürgerung Schweiz practice test",
  },
  "naturalisation-suisse-readiness-check": {
    title: "Free Naturalisation Suisse Practice Test | 60 Questions",
    description:
      "Free French Swiss naturalisation practice: 60 timed federal-theme questions. No single federal MCQ — canton/commune vary. Swiss Citizenship Anki Bundle. Independent prep.",
    keywords: [
      "naturalisation suisse test",
      "examen naturalisation suisse",
      "connaissances fédérales Suisse",
      "citoyenneté suisse pratique",
    ],
    headline: "Free Naturalisation Suisse Readiness Check",
    intro:
      "Timed French federal civics diagnostic. No nationwide French MCQ — confirm your canton’s format; this page covers federal themes only.",
    audience:
      "French-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Naturalisation Suisse practice test",
  },
  "naturalizzazione-svizzera-readiness-check": {
    title: "Free Naturalizzazione Svizzera Practice Test | 60 Questions",
    description:
      "Free Italian Swiss naturalisation practice: 60 timed federal-theme questions. No single federal MCQ — canton/commune vary. Swiss Citizenship Anki Bundle. Independent prep.",
    keywords: [
      "naturalizzazione svizzera test",
      "esame cittadinanza svizzera",
      "conoscenze federali Svizzera",
      "cittadinanza svizzera pratica",
    ],
    headline: "Free Naturalizzazione Svizzera Readiness Check",
    intro:
      "Timed Italian federal civics diagnostic. No nationwide Italian MCQ — confirm your canton’s format; this page covers federal themes only.",
    audience:
      "Italian-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Naturalizzazione Svizzera practice test",
  },
  "czech-citizenship-readiness-check": {
    title: "Free Czech Reálie Practice Test | 60-Question Diagnostic",
    description:
      "Free Czech citizenship / zkouška z reálií readiness check: 60 timed questions (45 min, 70% diagnostic). Official exam is 30/30/60% from the NPI pool — this page is longer practice. Waitlist Anki. Independent — not MV ČR material.",
    keywords: [
      "Czech citizenship practice test",
      "občanství ČR test",
      "zkouška z českých reálií",
      "zkouska z realii practice",
      "Czech naturalisation quiz",
    ],
    headline: "Free Czech Citizenship / Reálie Readiness Check",
    intro:
      "Timed Czech-language diagnostic for citizenship reálie themes. Format note: official exam is 30 questions / 30 minutes / 60%; this check is 60 / 45 / 70% to surface weak topics. Permanent residence usually needs language (A2), not reálie.",
    audience:
      "Citizenship applicants preparing zkouška z českých reálií (plus B1 language) — not a substitute for the official NPI 30-question sitting.",
    practiceTestLabel: "Czech reálie / citizenship practice test",
  },
  "polish-citizenship-readiness-check": {
    title: "Free Polish Citizenship Practice Test | Proposed Civics",
    description:
      "Poland has no official citizenship civics exam yet. Free 60-question Polish readiness check on proposed wiedza o Polsce / test obywatelski themes — state, history, EU, society. PaF B1 is today’s language hurdle. Independent prep — not government material.",
    keywords: [
      "Polish citizenship practice test",
      "obywatelstwo polskie test",
      "wiedza o Polsce",
      "test obywatelski",
      "Polish naturalisation quiz",
    ],
    headline: "Free Polish Citizenship Readiness Check",
    intro:
      "Poland does not require a citizenship knowledge MCQ today. This timed Polish-language check drills proposed civics themes while PaF B1 remains the live exam bottleneck.",
    audience:
      "Applicants under current PaF B1 rules who want civic literacy — or future-proofing if a test obywatelski is enacted.",
    practiceTestLabel: "Polish citizenship (proposed civics) practice test",
  },
  "denmark-indfoedsretsproeven-readiness-check": {
    title: "Free Denmark Indfødsretsprøven Practice Test | 60 Questions",
    description:
      "Free Indfødsretsprøven practice: 60 timed questions. Official exam is 45Q/45min with 36/45 plus values dual-gate — this diagnostic is longer theme practice. Waitlist Anki. Independent prep.",
    keywords: ["Indfødsretsprøven", "Danish citizenship test", "Denmark citizenship practice"],
    headline: "Free Denmark Indfødsretsprøven Readiness Check",
    intro:
      "Timed Danish civics diagnostic for Indfødsretsprøven. Format note: official test is 45 questions / 45 minutes / 80% plus ≥4/5 values; this check is 60 / 45 / 70% without that dual-gate. Language (Prøve i Dansk) is separate.",
    audience:
      "Applicants preparing the Danish Indfødsretsprøven civics exam.",
    practiceTestLabel: "Indfødsretsprøven practice test",
  },
  "portugal-nacionalidade-readiness-check": {
    title: "Free Portugal Nacionalidade Practice Test | 60 Questions",
    description:
      "Free Portugal nationality civic practice: 60 timed questions on the five legal themes. Official Q/time/pass still pending regulation — independent diagnostic, not IRN. Waitlist Anki.",
    keywords: ["nacionalidade portuguesa", "conhecimento cívico", "Portugal citizenship test"],
    headline: "Free Portugal Nacionalidade Readiness Check",
    intro:
      "Timed Portuguese civic diagnostic for the 2026 nationality knowledge requirement. Official exam format was still pending implementing rules — treat this as theme practice, not an official IRN paper. A2 language is separate (CPLP language exemption does not waive civics).",
    audience:
      "Applicants preparing Portuguese nationality civic knowledge under the 2026 law.",
    practiceTestLabel: "Portugal nacionalidade practice test",
  },
  "norway-statsborgerproven-readiness-check": {
    title: "Free Norway Statsborgerprøven Practice Test | 60 Questions",
    description:
      "Free Statsborgerprøven practice: 60 timed questions. Official HK-dir exam is 36Q (32 scored) / 60 min / 75% — this page is a different-length diagnostic. Waitlist Anki. Independent prep.",
    keywords: ["Statsborgerprøven", "Norwegian citizenship test", "statsborgerskap"],
    headline: "Free Norway Statsborgerprøven Readiness Check",
    intro:
      "Timed Norwegian samfunnskunnskap diagnostic. Format note: official Statsborgerprøven is 36 questions / 60 minutes / 24/32; this check is 60 / 45 / 70%. B1 Norwegian is a separate requirement.",
    audience:
      "Applicants preparing the Norwegian Statsborgerprøven.",
    practiceTestLabel: "Statsborgerprøven practice test",
  },
  "sweden-medborgarskapsprov-readiness-check": {
    title: "Free Sweden Medborgarskapsprov Practice Test | 60 Questions",
    description:
      "Free Medborgarskapsprov society-knowledge practice: 60 timed questions. Official format may still be settling (new 2026 test) — independent Samhällskunskap diagnostic + waitlist Anki.",
    keywords: ["Medborgarskapsprov", "Swedish citizenship test", "medborgarskap"],
    headline: "Free Sweden Medborgarskapsprov Readiness Check",
    intro:
      "Timed Swedish society-knowledge diagnostic for the new Medborgarskapsprov path. Confirm current UHR/Migrationsverket format before exam day — this page is independent theme practice, not an official sample.",
    audience:
      "Applicants preparing Sweden’s new citizenship society-knowledge requirement.",
    practiceTestLabel: "Medborgarskapsprov practice test",
  },
  "belgium-flanders-mo-readiness-check": {
    title: "Free Belgium Flanders MO Practice Test | 60 Questions",
    description:
      "Free Flanders MO practice: 60 timed questions. Belgium has no single federal civics MCQ today — live path is Dutch + MO/integration; a national civic test is proposed. Waitlist Anki. Independent prep.",
    keywords: ["maatschappelijke oriëntatie", "Flanders MO", "inburgering Vlaanderen"],
    headline: "Free Belgium Flanders MO Readiness Check",
    intro:
      "Timed Dutch-language Flanders maatschappelijke oriëntatie diagnostic. Honesty note: there is no nationwide citizenship MCQ in force like BAMF/LITUK — use this for MO themes; confirm AGII/commune requirements for your file.",
    audience:
      "Applicants preparing Flanders social orientation / integration civics themes.",
    practiceTestLabel: "Flanders MO practice test",
  },
  "belgium-wallonie-citoyennete-readiness-check": {
    title: "Free Belgium Wallonie Citoyenneté Practice Test | 60 Questions",
    description:
      "Free Wallonie citoyenneté theme practice: 60 timed questions. No official Walloon civics QCM today — live hurdles are usually French A2 + integration proof. Waitlist Anki. Independent prep.",
    keywords: ["citoyenneté Wallonie", "parcours d'intégration", "Belgium Wallonia citizenship"],
    headline: "Free Belgium Wallonie Citoyenneté Readiness Check",
    intro:
      "Timed French-language Wallonia citoyenneté diagnostic. Honesty note: Wallonia does not publish a standardised citizenship MCQ bank — language + parcours d’intégration are the live gates; a federal civic test is only proposed.",
    audience:
      "Applicants preparing Wallonia integration / citoyenneté themes (not a substitute for DELF/TCF A2).",
    practiceTestLabel: "Wallonie citoyenneté practice test",
  },
  "luxembourg-vivre-ensemble-readiness-check": {
    title: "Free Luxembourg Vivre ensemble Practice Test | 60 Questions",
    description:
      "Free Luxembourg Vivre ensemble practice: 60 timed questions. Official SFA exam is 40Q/60min/70% (or course path); Sproochentest is separate. Live 60-card Anki on Gumroad. Independent prep.",
    keywords: ["Vivre ensemble Luxembourg", "Luxembourg citizenship test", "nationalité luxembourgeoise"],
    headline: "Free Luxembourg Vivre ensemble Readiness Check",
    intro:
      "Timed Vivre ensemble diagnostic. Format note: official exam path is 40 questions / 60 minutes / 28/40, or a 24-hour course; this check is 60 / 45 / 70%. Luxembourgish language (Sproochentest) is separate.",
    audience:
      "Applicants preparing Luxembourg Vivre ensemble / nationality civics.",
    practiceTestLabel: "Vivre ensemble practice test",
  },
};

export function getMockSeoProfile(config: MockExamConfig): MockSeoProfile {
  const defaults = defaultProfile(config);
  const override = mockSeoProfiles[config.slug];
  const niche = getNicheExamExplainer(config.slug);
  const merged = { ...defaults, ...override };

  return {
    ...merged,
    whatIsExam:
      override?.whatIsExam ??
      niche?.whatIsExam ??
      defaults.whatIsExam,
    administeredBy: override?.administeredBy ?? niche?.administeredBy ?? defaults.administeredBy,
    officialFormat: override?.officialFormat ?? niche?.officialFormat ?? defaults.officialFormat,
    examFaqs: override?.examFaqs ?? niche?.examFaqs ?? defaults.examFaqs,
    keywords: [...new Set([...(niche?.keywords ?? []), ...merged.keywords])].slice(0, 12),
  };
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
  const examFaqs = profile.examFaqs ?? [];
  const waitlist = config.status === "coming_soon";

  return [
    ...examFaqs,
    {
      question: `Is there a free ${profile.practiceTestLabel}?`,
      answer: waitlist
        ? `A free ${profile.practiceTestLabel} is coming soon on ${siteConfig.name}: planned ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% pass target, and topic scoring. Use Notify me when this launches on this page.`
        : `Yes — ${siteConfig.name} hosts a free online ${profile.practiceTestLabel} with ${config.questionCount} timed questions, ${config.durationMinutes} minutes, a ${config.passRule.passPercent}% pass target, topic scoring, and a full answer review report. ${mockFreeAccessPriceLabel}.`,
    },
    {
      question: `How many questions are on this free ${profile.practiceTestLabel}?`,
      answer: waitlist
        ? `The planned UniPrep2Go readiness check will have ${config.questionCount} multiple-choice questions timed against a ${config.durationMinutes}-minute target. ${config.officialSourceNote}`
        : `This UniPrep2Go ${config.status === "live" ? "practice test" : "readiness check"} has ${config.questionCount} multiple-choice questions timed against a ${config.durationMinutes}-minute target. ${config.officialSourceNote}`,
    },
    {
      question: `What score do you need on this ${profile.practiceTestLabel}?`,
      answer: `The pass target on this practice test is ${config.passRule.passPercent}%. ${waitlist ? "When the bank launches, " : ""}Your report also breaks down performance by topic so you can see weak areas before the real exam.`,
    },
    {
      question: `Who should take this ${profile.practiceTestLabel}?`,
      answer: profile.audience,
    },
  ];
}

export function buildMockExamFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);
  const linkedDeck = getDeckBySlug(config.linkedDeckSlug);
  const deckIsBuyable =
    linkedDeck?.status === "available" && Boolean(linkedDeck.checkoutUrl);
  const bankNote = config.questionSourceNote
    ? config.questionSourceNote
    : "Questions are original UniPrep2Go practice items aligned to published topic outlines — not leaked official exam questions.";

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
      answer: deckIsBuyable
        ? "Your report shows a pass/no-pass verdict with explanation, topic diagnosis, pacing notes, full question review with explanations, and a repair plan that links to the paid Anki deck on Gumroad for weak-topic drilling."
        : "Your report shows a pass/no-pass verdict with explanation, topic diagnosis, pacing notes, full question review with explanations, and a repair plan that links to the Anki deck waitlist for spaced-repetition practice when the .apkg ships.",
    },
    {
      question: "Where do the questions come from?",
      answer: bankNote,
    },
  ];
}

export function buildMockSeoPageCopy(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const niche = getNicheExamExplainer(config.slug);
  const official = getMockOfficialResources(config);
  const waitlist = config.status === "coming_soon";
  const defaultHowToPrepare = waitlist
    ? `Review the official ${official.certifier} outline for ${config.shortTitle}, study each topic on this page${official.verifyAtUrl ? ` (verify details at the official site)` : ""}, and use Notify me when this launches so you can take the free timed diagnostic when the bank ships.`
    : `Start with this free timed diagnostic to see which ${config.shortTitle} domains are weak, then review the published ${official.certifier} outline${official.verifyAtUrl ? ` on the official site` : ""} and drill missed topics with the linked Anki deck before exam day.`;

  return {
    headline: profile.headline,
    intro: profile.intro,
    audience: profile.audience,
    whoFor: niche?.whoFor ?? profile.audience,
    howToPrepare: niche?.howToPrepare ?? defaultHowToPrepare,
    topicSummary: config.topics.map((topic) => topic.label).join(", "),
    topicBlurbs: niche?.topicBlurbs ?? [],
    practiceTestLabel: profile.practiceTestLabel,
    whatIsExam: profile.whatIsExam,
    administeredBy: profile.administeredBy ?? official.certifier,
    officialFormat: profile.officialFormat,
    verifyAtUrl: official.verifyAtUrl,
    officialSources: official.sources,
    isWaitlist: waitlist,
    whatIsHeading: niche
      ? `What is the ${niche.practiceTestName.replace(/ Practice Test$/i, "")} exam?`
      : `What is the ${config.shortTitle} exam?`,
  };
}

export function buildMockExamHubFaqs(indexedCount: number, totalCount: number) {
  const previewCount = Math.max(0, totalCount - indexedCount);

  return [
    {
      question: "How many free practice tests does UniPrep2Go offer?",
      answer: `${indexedCount} indexed free timed practice tests are promoted in search (FINRA SIE, Series 7, CFA, FRM, ServSafe, PTCB, EPA 608, LEED, MRICS, GMAT Focus, and other pathways). ${previewCount > 0 ? `${previewCount} additional pages are not yet indexed. ` : ""}${mockFreeAccessNotice}`,
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
        "No — we do not redistribute official exam questions. UniPrep2Go mocks are independent study aids. Topic weights, timing, and pass targets are modeled on published official outlines and blueprints; question text is original practice content. Not endorsed by FINRA, CFA Institute, PTCB, ServSafe, or any exam body.",
    },
    {
      question: "Where do topic weights and exam structure come from?",
      answer:
        "From official public sources only — published content outlines, blueprints, and candidate handbooks from the relevant exam body. We use those documents for domain weights and readiness thresholds. Practice questions are authored by UniPrep2Go and are not leaked official items.",
    },
  ] as const;
}
