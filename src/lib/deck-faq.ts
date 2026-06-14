import type { CatalogAvailableDeck, DeckFaq } from "./decks";
import { getDeckSeoProfile, getDeckLinkedMock } from "./deck-seo";
import { buildMockSeoTitle } from "./mock-exams/seo";
import { absoluteUrl } from "./site";
import { getDeckShortPitch, getDeckLongDescription, formatExamFocusedContent } from "./deck-page-copy";
import { getDeckPositioning } from "./deck-positioning";
import { getDeckUniqueContent } from "./deck-money-page-content";
import { getExamFactsProfileForDeck } from "./exam-facts";

function normalizeQuestion(question: string): string {
  return question.toLowerCase().replace(/\s+/g, " ").trim();
}

const PRODUCT_QUESTION_PATTERNS = [
  /file format|what format|delivered|download|import|ankidroid|ankimobile|refund|official|endorsed|affiliated|included in|how do buyers|access/,
];

function isProductFaq(faq: DeckFaq): boolean {
  return PRODUCT_QUESTION_PATTERNS.some((pattern) => pattern.test(faq.question));
}

function buildExamFaqs(deck: CatalogAvailableDeck): DeckFaq[] {
  const profile = getDeckSeoProfile(deck);
  const mock = getDeckLinkedMock(deck.slug);
  const pageUrl = absoluteUrl(`/decks/${deck.slug}`);

  const faqs: DeckFaq[] = [
    {
      question: `What should I study first for ${deck.shortName}?`,
      answer: mock
        ? `Take the free ${mock.questionCount}-question ${deck.shortName} practice test on UniPrep2Go, note weak topic scores, then drill those sections with this deck's ${deck.facts.cards} items. ${profile.intro}`
        : `Use the topic coverage table on this page to match ${deck.facts.topics.toLowerCase()}, then review ${deck.facts.cards} items daily. ${profile.intro}`,
    },
  ];

  if (mock) {
    const mockUrl = absoluteUrl(`/mock-exams/${mock.slug}`);
    faqs.push({
      question: `Is there a free ${deck.shortName} practice test?`,
      answer: `Yes — ${buildMockSeoTitle(mock)} at ${mockUrl}. The ${deck.shortName} mock has ${mock.questionCount} timed questions, topic scoring, and a remediation plan tied to this deck.`,
    });
  } else if (deck.slug === "ptcb-pharmacy-technician-anki-deck") {
    faqs.push({
      question: "How do sig codes and top-200 drugs fit PTCE prep?",
      answer:
        "The deck front-loads brand/generic pairs, sig abbreviations, and days-supply math — the high-volume PTCE categories that textbooks spread across chapters. Pair with the PTCB Study Guide 2026 PDF for domain chapters and an 80-question practice exam; review 10–15 Anki cards per day on your phone.",
    });
  } else if (deck.slug === "ptcb-study-guide-2026") {
    faqs.push({
      question: "Is this updated for the January 2026 PTCE?",
      answer:
        "Yes. Chapter sizes follow the 2026 domain weights — Federal Requirements at 18.75% with DSCSA, and compounding/alligation removed. The 80-question practice exam is distributed 28/15/19/18 by domain.",
    });
  } else if (deck.slug === "cfa-level-1-formula-reference-2026") {
    faqs.push({
      question: "Does this pair with the CFA Level 1 Anki deck?",
      answer:
        "Yes. The PDF and 342+ card Anki deck share the same validated item bank. Use the reference for printable formula tables and the 80-question recall drill; use Anki for daily spaced-repetition on your phone.",
    });
  } else {
    faqs.push({
      question: `How is this ${deck.shortName} deck organized?`,
      answer: `See the coverage table at ${pageUrl}: ${deck.facts.topics}. Card counts follow those official weights rather than a flat dump.`,
    });
  }

  faqs.push({
    question: `Is this official ${deck.shortName} exam material?`,
    answer:
      deck.faqs.find((f) => /official|endorsed|affiliated/i.test(f.question))?.answer ??
      "No. This is an independent UniPrep2Go study aid and is not affiliated with or endorsed by the exam provider.",
  });

  return faqs.slice(0, 3);
}

/** Single FAQ block: candidate Q&A from exam layer + product/delivery (deduped). */
export function buildMergedDeckFaqs(deck: CatalogAvailableDeck): DeckFaq[] {
  const examProfile = getExamFactsProfileForDeck(deck.slug);
  const candidateFaqs: DeckFaq[] =
    examProfile?.candidate_qa.map((item) => ({
      question: item.q,
      answer: item.a,
    })) ?? [];

  const examFaqs = candidateFaqs.length > 0 ? candidateFaqs : buildExamFaqs(deck);
  const examQuestions = new Set(examFaqs.map((f) => normalizeQuestion(f.question)));

  const productFaqs = deck.faqs.filter((faq) => {
    if (examQuestions.has(normalizeQuestion(faq.question))) return false;
    if (/who is this|does the deck replace|how do I prepare/i.test(faq.question)) return false;
    return isProductFaq(faq);
  });

  const merged = [...examFaqs];
  for (const faq of productFaqs) {
    if (merged.length >= 8) break;
    if (merged.some((m) => normalizeQuestion(m.question) === normalizeQuestion(faq.question))) {
      continue;
    }
    merged.push(faq);
  }

  if (merged.length < 6 && deck.format === ".apkg") {
    const importFaq = deck.faqs.find((f) => /import/i.test(f.question));
    if (importFaq && !merged.some((m) => normalizeQuestion(m.question) === normalizeQuestion(importFaq.question))) {
      merged.push(importFaq);
    }
  }

  return merged.slice(0, 8);
}

/** Plain text export for boilerplate CI (visible page copy only). */
export function collectDeckPageVisibleText(deck: CatalogAvailableDeck): string {
  const positioning = getDeckPositioning(deck);
  const unique = getDeckUniqueContent(deck);
  const faqs = buildMergedDeckFaqs(deck);

  const parts = [
    getDeckShortPitch(deck),
    deck.audience,
    getDeckLongDescription(deck),
    deck.facts.topics,
    formatExamFocusedContent(deck),
    positioning.summaryProse,
    ...positioning.ourEdge,
    ...positioning.alternatives.flatMap((a) => [a.type, ...a.tradeoffs]),
    unique
      ? unique
          .replace(/^###\s+/gm, "")
          .replace(/<!--[\s\S]*?-->/g, "")
          .replace(/\*\*/g, "")
      : "",
    ...faqs.map((f) => `${f.question} ${f.answer}`),
  ];

  return parts.filter(Boolean).join("\n");
}
