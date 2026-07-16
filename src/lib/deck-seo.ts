import {
  formatDeckContentLabel,
  type CatalogAvailableDeck,
  type DeckCategory,
} from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoTitle } from "./mock-exams/seo";
import type { MockExamConfig } from "./mock-exams/types";
import { fitSeoTitle, SEO_TITLE_MAX } from "./seo";
import { absoluteUrl, siteConfig } from "./site";

type DeckSeoProfile = {
  title: string;
  description: string;
  keywords: string[];
  headline: string;
  intro: string;
  audience: string;
  studyLabel: string;
};

function getLinkedMock(slug: string): MockExamConfig | undefined {
  return getAllMockExams().find((mock) => mock.linkedDeckSlug === slug);
}

function yearPrefix(examYear: string): string {
  return examYear.includes("2026") ? "2026 " : "";
}

function mockSuffix(mock?: MockExamConfig): string {
  if (!mock) return "";
  return mock.status === "live" ? " + Free Practice Test" : " + Free Mock";
}

function contentLabel(deck: CatalogAvailableDeck): string {
  return formatDeckContentLabel(deck);
}

function studyLabelFor(deck: CatalogAvailableDeck): string {
  if (deck.format === "App") return `${deck.shortName} study app`;
  if (deck.format === "PDF") return `${deck.shortName} study guide`;
  return `${deck.shortName} exam prep`;
}

function defaultTitle(deck: CatalogAvailableDeck, mock?: MockExamConfig): string {
  const year = yearPrefix(deck.facts.examYear);
  const content = contentLabel(deck);
  const suffix = mockSuffix(mock);

  switch (deck.category) {
    case "finance":
    case "professional":
      return `${year}${deck.shortName} Exam Prep | ${content}${suffix}`;
    case "language":
      return `${deck.shortName} Exam Prep | ${content} Flashcards`;
    case "immigration":
      return deck.format === "App"
        ? `${deck.shortName} Exam Prep | Survival Guide App`
        : `${deck.shortName} Exam Prep | ${content}`;
    case "academic":
      return `${deck.shortName} Exam Prep | ${content}`;
  }
}

function defaultHeadline(deck: CatalogAvailableDeck, mock?: MockExamConfig): string {
  const year = yearPrefix(deck.facts.examYear).trim();
  const prefix = year ? `${year} ` : "";
  const content = contentLabel(deck);

  if (deck.format === "PDF") {
    return `${prefix}${deck.shortName} Exam Prep — ${content}`;
  }

  if (mock) {
    return `${prefix}${deck.shortName} Exam Prep — ${content} + Free Mock`;
  }

  return `${prefix}${deck.shortName} Exam Prep — ${content}`;
}

function defaultDescription(deck: CatalogAvailableDeck, mock?: MockExamConfig): string {
  const content = contentLabel(deck);
  const topics = deck.facts.topics;
  const mockLine = mock
    ? ` Includes a linked free ${mock.questionCount}-question ${mock.status === "live" ? "practice test" : "readiness check"} with topic scoring.`
    : "";

  if (deck.category === "finance" || deck.category === "professional") {
    return `${deck.shortName} exam prep with ${content.toLowerCase()} for ${topics.toLowerCase()}. ${deck.format} download for active recall and spaced repetition.${mockLine} Independent study aid — not official exam material.`;
  }

  if (deck.format === "App") {
    return `${deck.shortName} exam prep in the Prep2Go Immigration app: ${topics}. Independent survival guide and citizenship test study aid.`;
  }

  return `${deck.shortName} exam prep with ${content.toLowerCase()} covering ${topics.toLowerCase()}. ${deck.format} format for daily spaced-repetition review. Independent study aid.`;
}

function defaultKeywords(deck: CatalogAvailableDeck, mock?: MockExamConfig): string[] {
  const base = deck.shortName.toLowerCase();
  const keywords = [
    `${base} exam prep`,
    `${base} flashcards`,
    `${base} study guide`,
  ];

  if (deck.format === ".apkg") {
    keywords.push(`${base} anki deck`, `anki ${base}`);
  }

  if (mock) {
    keywords.push(
      `free ${base} practice test`,
      `${base} mock exam`,
      `${mock.examBody.toLowerCase()} practice questions`,
    );
  }

  if (deck.category === "language") {
    keywords.push(`${base} vocabulary`, `${base} exam flashcards`);
  }

  return keywords;
}

const deckSeoProfiles: Partial<Record<string, Partial<DeckSeoProfile>>> = {
  "cfa-level-1-anki-deck": {
    title: "Best CFA Level 1 Anki Deck 2026 | 342 Cards + Free Mock",
    headline: "CFA Level 1 Exam Prep — 342+ Flashcards + Free Mock",
    studyLabel: "CFA Level 1 exam prep",
    description:
      "CFA Level 1 exam prep with 342+ Anki flashcards across all 10 topic weights plus a linked free 60-question practice test. Pairs with the printable 2026 formula reference PDF. Independent study aid — not CFA Institute material.",
    keywords: [
      "cfa level 1 anki deck",
      "cfa level 1 flashcards",
      "cfa level 1 practice test",
      "cfa formula flashcards",
      "cfa level 1 mock exam",
    ],
    intro:
      "US and global CFA Level 1 candidates use spaced-repetition flashcards to retain formulas and definitions across all 10 curriculum topics — pair with the matching CFA Level 1 formula sheet PDF for printable tables and an 80-question recall drill.",
  },
  "cfa-level-2-anki-deck": {
    title: "CFA L2 Flashcards 2026 | 495 Cards + Free Mock",
    headline: "CFA Level 2 Exam Prep — 495 Flashcards + Free Mock",
    studyLabel: "CFA Level 2 exam prep",
    description:
      "CFA Level 2 exam prep with 495 Anki flashcards across all 10 topic areas — vignette-depth FSA, equity and fixed income valuation, portfolio management, derivatives, and ethics application. Includes a free 60-question readiness check. Independent study aid — not CFA Institute material.",
    keywords: [
      "cfa level 2 anki deck",
      "cfa level 2 flashcards",
      "cfa level 2 practice test",
      "cfa level 2 item set prep",
      "cfa level 2 mock exam",
    ],
    intro:
      "CFA Level 2 candidates use spaced-repetition flashcards to retain vignette-depth formulas and application logic across all ten equally weighted curriculum topics — run the free readiness check before item-set practice blocks.",
  },
  "cfa-level-2-formula-reference-2026": {
    title: "CFA L2 Formula Reference 2026 | 219 Formulas + Drill",
    headline: "CFA Level 2 Formula Reference — 219 Formulas + 80 Recall Drill",
    studyLabel: "CFA Level 2 exam prep",
    description:
      "CFA Level 2 formula quick reference PDF: 219 typeset formulas and 276 examiner-style definitions across 10 topic areas, 80-question recall drill with explanations, 60 print-ready pages. Pairs with 495-card Anki deck. Recall companion — not CFA Institute curriculum.",
    keywords: [
      "cfa level 2 formula sheet",
      "cfa level 2 formula reference",
      "cfa level 2 recall drill",
      "cfa level 2 quick reference pdf",
      "cfa level 2 formulas",
    ],
    intro:
      "Candidates who need sub-three-second formula retrieval under item-set timing print this reference for typeset formula tables and an 80-question recall drill — then drill weak topics in the companion Anki deck.",
  },
  "cfa-level-1-formula-reference-2026": {
    title: "CFA L1 Formula Sheet PDF 2026 | 250 Formulas + Free Mock",
    headline: "CFA Level 1 Formula Sheet PDF 2026 — 250 Formulas, 98 Definitions + Free Mock",
    studyLabel: "CFA Level 1 exam prep",
    description:
      "CFA Level 1 formula quick reference PDF: 250 typeset formulas and 98 key definitions across 10 topic areas, 80-question recall drill with explanations, 54 print-ready pages. Pairs with 342+ Anki deck and free 60-question mock. Recall companion — not CFA Institute curriculum.",
    keywords: [
      "free cfa level 1 formula sheet pdf",
      "cfa level 1 formula sheet",
      "cfa level 1 formula reference",
      "cfa formula cheat sheet",
      "cfa level 1 recall drill",
    ],
    intro:
      "Candidates who need sub-three-second formula retrieval print this reference for typeset formula tables and an 80-question recall drill — then run the free readiness check and drill weak topics in the companion Anki deck.",
  },
  "frm-part-1-anki-deck": {
    title: "FRM Part 1 Prep 2026 | 444 Cards + Free Practice Test",
    headline: "FRM Part 1 Exam Prep — 444 Flashcards + Free Mock",
    studyLabel: "FRM Part 1 exam prep",
    description:
      "FRM Part 1 exam prep with 444 Anki flashcards for foundations of risk, quant, markets, products, and valuation models — plus a free 50-question timed practice test. Independent GARP-style prep — not official FRM material.",
    keywords: [
      "frm part 1 anki deck",
      "frm part 1 flashcards",
      "frm part 1 practice test",
      "garp frm prep",
      "frm formula deck",
    ],
    intro:
      "Risk and finance professionals preparing for FRM Part 1 use daily Anki review for VaR, Greeks, credit risk, and market mechanics, then validate weak topics with the free FRM readiness check.",
  },
  "sie-exam-anki-deck": {
    title: "SIE Anki Deck 2026 | 300 Cards + Free 75-Q Mock",
    headline: "FINRA SIE Exam Prep — 300 Flashcards + Free Mock",
    studyLabel: "FINRA SIE exam prep",
    description:
      "FINRA SIE exam prep: 300 Anki flashcards + free 75-question timed mock exam. Topic-weighted to official FINRA blueprint. Independent study aid — not official FINRA material. Perfect SIE study guide alternative.",
    keywords: [
      "sie exam prep",
      "sie exam study guide free",
      "finra sie flashcards",
      "free sie practice test",
      "sie anki deck",
    ],
    intro:
      "Americans entering brokerage and securities roles start with the SIE — this deck covers FINRA topic weights for daily recall, and the linked free mock mirrors the 75-question / 105-minute format.",
  },
  "series-7-anki-deck": {
    title: "Series 7 Anki Deck 2026 | 300 Cards + Free Mock",
    headline: "Series 7 Top-Off Exam Prep — 300 Flashcards + Free Mock",
    studyLabel: "Series 7 exam prep",
    description:
      "Series 7 Top-Off exam prep with 300 flashcards for suitability, options, products, order handling, and FINRA job functions — plus a free 60-question Series 7 practice test. For registered rep candidates in the United States.",
    keywords: [
      "series 7 exam prep",
      "series 7 flashcards",
      "series 7 practice test",
      "finra series 7 anki",
      "series 7 top off study guide",
    ],
    intro:
      "US Series 7 candidates drill suitability, investment products, and order-flow rules on their phone between full-length Q-banks — then use the free readiness check for a timed baseline.",
  },
  "series-63-anki-deck": {
    title: "Series 63 Prep 2026 | 250 Cards + Free Practice Test",
    headline: "Series 63 Exam Prep — 250 Flashcards + Free Mock",
    studyLabel: "Series 63 exam prep",
    description:
      "Series 63 state law exam prep with 250 Anki flashcards for NASAA topics — agent registration, ethical practices, communications, and investment adviser basics — plus a free 60-question practice test.",
    keywords: [
      "series 63 exam prep",
      "series 63 flashcards",
      "series 63 practice test",
      "nasaa series 63",
      "uniform securities act study guide",
    ],
    intro:
      "After passing the SIE and Series 7, US reps use this deck for NASAA state-law recall — registration, ethics, and adviser rules that repeat on the Series 63.",
  },
  "servsafe-manager-anki-deck": {
    title: "ServSafe Manager Prep | 300 Cards + Free Mock",
    headline: "ServSafe Manager Practice Test Free — 300 Cards + 90 Questions",
    studyLabel: "ServSafe Manager exam prep",
    description:
      "ServSafe Manager / CFPM exam prep with 300 food safety flashcards — time and temperature, HACCP, hygiene, contamination — plus a free 90-question ServSafe practice test online. For US restaurant managers and kitchen supervisors.",
    keywords: [
      "servsafe manager exam prep",
      "servsafe manager practice test",
      "certified food protection manager",
      "servsafe flashcards",
      "food safety manager study guide",
    ],
    intro:
      "American restaurant managers preparing for the ServSafe Manager certification review food safety rules on Anki during breaks, then take the free 90-question mock before scheduling the proctored exam.",
  },
  "ptcb-pharmacy-technician-anki-deck": {
    title: "PTCB Prep 2026 | 300 PTCE Cards + Free Mock",
    headline: "PTCB Pharmacy Technician Exam Prep — 300 PTCE Flashcards + Free Mock",
    studyLabel: "PTCB / PTCE exam prep",
    description:
      "Free PTCB practice test included. 300 Anki flashcards for the January 2026 PTCE: top 200 brand/generic drugs, sig abbreviations, days-supply math, DEA schedules, DSCSA, and federal law. Includes a linked free 90-question timed mock with 2026 domain-weighted scoring. Independent — not official PTCB material.",
    keywords: [
      "ptcb exam prep",
      "ptcb practice test 2025",
      "ptcb practice test 2026",
      "ptce flashcards",
      "free ptcb practice test",
    ],
    intro:
      "US pharmacy technician candidates take the free 90-question PTCB mock first, then drill weak domains with daily brand/generic and sig-code flashcards. Pair with the 2026 printable study guide for domain chapters and an additional 80-question PDF practice exam.",
  },
  "ptcb-study-guide-2026": {
    title: "PTCB Exam Study Guide 2026 | PDF + 80-Question PTCE Practice Exam",
    headline: "PTCB Exam Study Guide 2026 — Printable PTCE Review + Practice Test",
    studyLabel: "PTCB / PTCE exam prep",
    description:
      "PTCB Exam Study Guide 2026 PDF: 30 pages aligned to the January 2026 PTCE blueprint, 80-question practice exam with explanations, drug/sig/math cheat sheets, and 4-week plan. Pairs with the free 90-question online mock and 300-card Anki deck. Independent — not official PTCB material.",
    keywords: [
      "ptcb study guide 2026",
      "ptce practice exam",
      "pharmacy technician study guide pdf",
      "free ptcb practice test",
      "ptcb cheat sheet",
      "ptce 2026 blueprint",
    ],
    intro:
      "Candidates who prefer printable study material use this PDF for 2026 domain-weighted chapters and an 80-question practice exam — then take the free online PTCB mock for timed domain scoring and drill weak topics in the companion Anki deck.",
  },
  "california-real-estate-exam-anki-deck": {
    title: "CA Real Estate Prep | 400 Cards + Free Practice Test",
    headline: "California Real Estate Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "California real estate exam prep",
    description:
      "California DRE salesperson exam prep with 400 Anki flashcards for agency, contracts, financing, disclosures, and property law — plus a free 60-question California real estate practice test.",
    keywords: [
      "california real estate exam prep",
      "ca real estate practice test",
      "california salesperson exam flashcards",
      "dre exam study guide",
      "real estate license california",
    ],
    intro:
      "California real estate license candidates use spaced repetition for agency law, contracts, and mandated disclosures — then run the free readiness check before paying for a full prep course.",
  },
  "life-and-health-insurance-exam-anki-deck": {
    title: "Life & Health Insurance Prep | 400 Cards + Mock",
    headline: "Life & Health Insurance Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "Life & Health insurance exam prep",
    description:
      "Life and Health insurance license exam prep with 400 flashcards for policy types, annuities, Medicare basics, and producer responsibilities — plus a free 60-question insurance practice test for US licensing candidates.",
    keywords: [
      "life and health insurance practice test",
      "insurance license exam prep",
      "life health insurance flashcards",
      "insurance producer exam",
      "state insurance exam study guide",
    ],
    intro:
      "Americans studying for state Life & Health producer licensing use Anki for policy provisions, annuities, and cost-sharing concepts — then validate with the free timed practice test.",
  },
  "property-casualty-insurance-exam-anki-deck": {
    title: "P&C Insurance Prep | 400 Cards + Free Practice Test",
    headline: "Property & Casualty Insurance Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "Property & Casualty insurance exam prep",
    description:
      "Property and Casualty insurance license exam prep with 400 flashcards for homeowners, auto, commercial lines, and workers comp — plus a free 60-question P&C insurance practice test.",
    keywords: [
      "property casualty insurance practice test",
      "p&c insurance exam prep",
      "insurance license flashcards",
      "homeowners insurance exam questions",
      "casualty insurance study guide",
    ],
    intro:
      "US P&C licensing candidates drill policy structures, exclusions, and commercial lines on Anki, then use the free readiness check before state exam registration.",
  },
  "servsafe-manager-complete-study-guide": {
    title: "ServSafe Manager Study Guide | PDF + 70 Questions",
    headline: "ServSafe Manager Exam Prep — Printable Study Guide + 70 Questions",
    studyLabel: "ServSafe Manager exam prep",
    description:
      "ServSafe Manager printable PDF study guide: 40 pages, 70 practice questions with rationales, 2-page cram sheet, and 7-day study plan. Pairs with the 300-card Anki deck and free 90-question mock.",
    keywords: [
      "servsafe manager study guide pdf",
      "servsafe manager practice questions",
      "food manager exam cram sheet",
      "servsafe pdf download",
    ],
    intro:
      "Managers who prefer printable study material use this PDF for domain review and 70 exam-style questions — then drill weak topics in the companion Anki deck or free online mock.",
  },
  "cat4-level-d-anki-deck-printable-pdf": {
    title: "CAT4 Level D Exam Prep | 200 Cards + Printable PDF",
    headline: "CAT4 Level D Exam Prep — Anki Deck + Printable PDF",
    studyLabel: "CAT4 Level D exam prep",
    description:
      "CAT4 Level D bundle with 200 Anki flashcards and a 49-page printable PDF for Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Built for Year 7 / Grade 7 selective entry. Independent prep — not official GL Assessment material.",
    keywords: [
      "cat4 level d prep",
      "cat4 anki deck",
      "cat4 printable pdf",
      "grade 7 cat4 practice",
      "year 7 selective entry prep",
      "verbal classification cat4",
      "number series cat4",
    ],
  },
  "gmat-focus-anki-deck": {
    title: "GMAT Focus Exam Prep | 400 Cards + Free Mock",
    headline: "GMAT Focus Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "GMAT Focus exam prep",
    description:
      "GMAT Focus exam prep with 400 Anki flashcards for Quant, Verbal, and Data Insights — plus a free 45-question timed readiness check with section scoring. Independent MBA prep — not GMAC material.",
    keywords: [
      "gmat focus anki deck",
      "gmat focus flashcards",
      "gmat focus practice test",
      "gmat prep course alternative",
      "mba admissions test prep",
      "gmat diagnostic test",
    ],
    intro:
      "MBA applicants drill high-yield GMAT Focus question types on Anki, then validate weak sections with the free timed readiness check before official GMAC prep or tutoring.",
    audience:
      "MBA and business master's applicants using spaced repetition alongside official GMAC materials.",
  },
  "sat-anki-deck": {
    title: "Digital SAT Exam Prep | 350 Cards + Free Mock",
    headline: "Digital SAT Exam Prep — 350 Flashcards + Free Mock",
    studyLabel: "Digital SAT exam prep",
    description:
      "Digital SAT exam prep with 350 Anki flashcards for Reading and Writing and Math — plus a free 49-question timed readiness check scored on both official section axes. Independent college admissions prep — not College Board material.",
    keywords: [
      "digital sat anki deck",
      "sat flashcards",
      "digital sat practice test",
      "sat prep course alternative",
      "sat reading and writing practice",
      "sat math flashcards",
    ],
    intro:
      "Students drill high-yield Digital SAT skills on Anki across both scored sections, then validate Reading and Writing and Math balance with the free timed readiness check before Bluebook practice.",
    audience:
      "High school students and parents using spaced repetition alongside College Board Bluebook practice.",
  },
  "hvac-epa-608-anki-deck": {
    title: "EPA 608 HVAC Prep | 200+ Cards + Free Mock",
  },
  "bms-building-automation-anki-deck": {
    title: "BMS / BAS Exam Prep | 200+ Cards + Free Mock",
  },
  "leed-green-associate-anki-deck": {
    title: "LEED GA Prep | 250+ Cards + Free Mock",
    description:
      "LEED Green Associate exam prep: 250+ flashcards covering v4.1 concepts and process domains. Free 50-question practice test included. Instant download for USGBC credential candidates. Independent prep — not USGBC exam material.",
    keywords: [
      "leed green associate exam prep",
      "leed ga exam prep free",
      "leed green associate flashcards",
      "free leed practice test",
      "leed ga study guide",
    ],
  },
  "leed-ap-bd-c-anki-deck": {
    title: "LEED AP BD+C Prep | 250+ Cards + Free Mock",
  },
  "well-ap-anki-deck": {
    title: "WELL AP Exam Prep | 250+ Cards + Free Mock",
  },
  "cem-anki-deck": {
    title: "CEM Exam Prep | 250+ Cards + Free Mock",
  },
  "ashrae-certifications-anki-deck": {
    title: "ASHRAE Cert Prep | 250+ Cards + Free Mock",
  },
  "cdcp-anki-deck": {
    title: "CDCP Exam Prep | 250+ Cards + Free Mock",
  },
  "nebosh-anki-deck": {
    title: "NEBOSH IGC Prep | 250+ Cards + Free Mock",
  },
  "cfps-anki-deck": {
    title: "CFPS Exam Prep | 400+ Cards + Free Mock",
  },
  "mrics-anki-deck": {
    title: "MRICS APC Prep | 250+ Cards + Free Mock",
  },
  "mrics-quantity-surveying-anki-deck": {
    title: "MRICS QS Prep | 250+ Cards + Free Mock",
  },
};

function mergeProfile(
  deck: CatalogAvailableDeck,
  mock?: MockExamConfig,
): DeckSeoProfile {
  const defaults: DeckSeoProfile = {
    title: defaultTitle(deck, mock),
    description: defaultDescription(deck, mock),
    keywords: defaultKeywords(deck, mock),
    headline: defaultHeadline(deck, mock),
    intro: deck.directAnswer.replace(/\{PRICE\}/g, "See checkout").slice(0, 320),
    audience: deck.audience,
    studyLabel: studyLabelFor(deck),
  };

  const override = deckSeoProfiles[deck.slug];
  if (!override) return defaults;

  return { ...defaults, ...override };
}

export function getDeckSeoProfile(deck: CatalogAvailableDeck, mock = getLinkedMock(deck.slug)) {
  return mergeProfile(deck, mock);
}

export function buildDeckSeoTitle(deck: CatalogAvailableDeck) {
  return fitSeoTitle(getDeckSeoProfile(deck).title, SEO_TITLE_MAX);
}

export function buildDeckSeoDescription(deck: CatalogAvailableDeck) {
  return getDeckSeoProfile(deck).description;
}

export function buildDeckSeoKeywords(deck: CatalogAvailableDeck) {
  return getDeckSeoProfile(deck).keywords;
}

export function buildDeckSeoHeadline(deck: CatalogAvailableDeck) {
  return getDeckSeoProfile(deck).headline;
}

export function buildDeckSearchFaqs(deck: CatalogAvailableDeck) {
  const profile = getDeckSeoProfile(deck);
  const mock = getLinkedMock(deck.slug);
  const pageUrl = absoluteUrl(`/decks/${deck.slug}`);
  const content = contentLabel(deck);

  const faqs = [
    {
      question: `How do I prepare for the ${deck.shortName} exam?`,
      answer: `${profile.intro} Use it for daily active recall${mock ? `, then run the linked free practice test to find weak topics` : ""}.`,
    },
    {
      question: `Are there ${deck.shortName} flashcards?`,
      answer: `Yes. ${siteConfig.name} publishes ${content} for ${deck.shortName} at ${pageUrl} with sample cards, topic coverage, and machine-readable product facts.`,
    },
    {
      question: `Who is this ${deck.shortName} study material for?`,
      answer: profile.audience,
    },
  ];

  if (mock) {
    const mockUrl = absoluteUrl(`/mock-exams/${mock.slug}`);
    faqs.push({
      question: `Is there a free ${deck.shortName} practice test?`,
      answer: `Yes. Take ${buildMockSeoTitle(mock)} at ${mockUrl}. It includes ${mock.questionCount} timed questions, topic scoring, and a remediation plan linked back to this deck.`,
    });
  } else if (deck.slug === "ptcb-study-guide-2026") {
    faqs.push({
      question: "Does this pair with the PTCB Anki deck?",
      answer:
        "Yes. The PDF and 300-card Anki deck share the same validated item bank. Read the domain chapters and take the 80-question practice exam in the guide; use the Anki deck for spaced-repetition drills on your phone between shifts.",
    });
  }

  return faqs;
}

export function buildDeckSeoPageCopy(deck: CatalogAvailableDeck) {
  const profile = getDeckSeoProfile(deck);

  return {
    headline: profile.headline,
    intro: profile.intro,
    audience: profile.audience,
    studyLabel: profile.studyLabel,
    topicSummary: deck.facts.topics,
    category: deck.category as DeckCategory,
  };
}

export function getDeckLinkedMock(slug: string) {
  return getLinkedMock(slug);
}
