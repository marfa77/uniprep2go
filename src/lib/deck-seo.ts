import {
  formatDeckContentLabel,
  type CatalogAvailableDeck,
  type DeckCategory,
} from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoTitle } from "./mock-exams/seo";
import type { MockExamConfig } from "./mock-exams/types";
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
  return mock.status === "live" ? " + Free Practice Test" : " + Free Readiness Check";
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
    title: "CFA Level 1 Exam Prep 2026 | 342+ Flashcards + Free Practice Test",
    headline: "CFA Level 1 Exam Prep — 342+ Flashcards + Free Mock",
    studyLabel: "CFA Level 1 exam prep",
  },
  "frm-part-1-anki-deck": {
    title: "FRM Part 1 Exam Prep 2026 | 444 Flashcards + Free Practice Test",
    headline: "FRM Part 1 Exam Prep — 444 Flashcards + Free Mock",
    studyLabel: "FRM Part 1 exam prep",
  },
  "sie-exam-anki-deck": {
    title: "FINRA SIE Exam Prep 2026 | 300 Flashcards + Free Practice Test",
    headline: "FINRA SIE Exam Prep — 300 Flashcards + Free Mock",
    studyLabel: "FINRA SIE exam prep",
  },
  "series-7-anki-deck": {
    title: "Series 7 Exam Prep 2026 | Flashcards + Free Practice Test",
    headline: "Series 7 Top-Off Exam Prep — Flashcards + Free Mock",
    studyLabel: "Series 7 exam prep",
  },
  "series-63-anki-deck": {
    title: "Series 63 Exam Prep 2026 | Flashcards + Free Practice Test",
    headline: "Series 63 Exam Prep — Flashcards + Free Mock",
    studyLabel: "Series 63 exam prep",
  },
  "servsafe-manager-anki-deck": {
    title: "ServSafe Manager Exam Prep | 300 Flashcards + Free Practice Test",
    headline: "ServSafe Manager Exam Prep — 300 Flashcards + Free Mock",
    studyLabel: "ServSafe Manager exam prep",
  },
  "ptcb-pharmacy-technician-anki-deck": {
    title: "PTCB Exam Prep | 300 Pharmacy Tech Flashcards",
    headline: "PTCB Pharmacy Technician Exam Prep — 300 Flashcards",
    studyLabel: "PTCB exam prep",
  },
  "california-real-estate-exam-anki-deck": {
    title: "California Real Estate Exam Prep | Flashcards + Free Practice Test",
    headline: "California Real Estate Exam Prep — Flashcards + Free Mock",
    studyLabel: "California real estate exam prep",
  },
  "life-and-health-insurance-exam-anki-deck": {
    title: "Life & Health Insurance Exam Prep | Flashcards + Free Practice Test",
    headline: "Life & Health Insurance Exam Prep — Flashcards + Free Mock",
    studyLabel: "Life & Health insurance exam prep",
  },
  "property-casualty-insurance-exam-anki-deck": {
    title: "Property & Casualty Insurance Exam Prep | Flashcards + Free Practice Test",
    headline: "Property & Casualty Insurance Exam Prep — Flashcards + Free Mock",
    studyLabel: "Property & Casualty insurance exam prep",
  },
  "servsafe-manager-complete-study-guide": {
    title: "ServSafe Manager Exam Prep | PDF Study Guide + 70 Practice Questions",
    headline: "ServSafe Manager Exam Prep — Printable Study Guide + Practice Questions",
    studyLabel: "ServSafe Manager exam prep",
  },
  "cat4-level-d-anki-deck-printable-pdf": {
    title: "CAT4 Level D Exam Prep | 200 Flashcards + Printable PDF",
    headline: "CAT4 Level D Exam Prep — Anki Deck + Printable PDF",
    studyLabel: "CAT4 Level D exam prep",
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
  return getDeckSeoProfile(deck).title;
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
