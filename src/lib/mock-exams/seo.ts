import type { MockExamConfig } from "./types";
import { mockFreeAccessPriceLabel } from "./pricing";
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
      "Take a free FINRA SIE practice test online: 75 timed questions, 105 minutes, 70% pass target, FINRA topic-weighted scoring, full answer review, and pass/no-pass report. Independent SIE mock — not official FINRA material.",
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
};

export function getMockSeoProfile(config: MockExamConfig) {
  return mockSeoProfiles[config.slug] ?? defaultProfile(config);
}

export function buildMockSeoTitle(config: MockExamConfig) {
  return getMockSeoProfile(config).title;
}

export function buildMockSeoDescription(config: MockExamConfig) {
  return getMockSeoProfile(config).description;
}

export function buildMockSeoKeywords(config: MockExamConfig) {
  return getMockSeoProfile(config).keywords;
}

export function buildMockSearchFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);

  return [
    {
      question: `Is there a free ${profile.practiceTestLabel}?`,
      answer: `Yes. ${siteConfig.name} offers a free online ${profile.practiceTestLabel} at ${pageUrl} with ${config.questionCount} timed questions, ${config.durationMinutes} minutes, a ${config.passRule.passPercent}% pass target, topic scoring, and a full answer review report. ${mockFreeAccessPriceLabel}.`,
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
        "The report includes a pass/no-pass verdict with explanation, weighted topic diagnosis, pacing analysis, full question review with deck-backed explanations, and a repair plan linked to the Anki deck. If the verdict is no-pass or borderline, the linked deck is the recommended remediation path before retaking.",
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
    practiceTestLabel: profile.practiceTestLabel,
    topicSummary: config.topics.map((topic) => topic.label).join(", "),
  };
}
