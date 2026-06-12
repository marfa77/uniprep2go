import type { CatalogAvailableDeck, DeckFaq } from "./decks";
import { getDeckSeoProfile, getDeckLinkedMock } from "./deck-seo";
import { buildMockSeoTitle } from "./mock-exams/seo";
import { absoluteUrl } from "./site";
import { getDeckShortPitch, getDeckLongDescription, formatExamFocusedContent } from "./deck-page-copy";
import { getDeckPositioning } from "./deck-positioning";
import { getDeckUniqueContent } from "./deck-money-page-content";

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
        "The deck front-loads brand/generic pairs, sig abbreviations, and days-supply math — the high-volume PTCE categories that textbooks spread across chapters. Review 10–15 cards per day on your phone; use free SIE or ServSafe mocks on UniPrep2Go for timed-exam rhythm.",
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

/** Single FAQ block: up to 3 exam-specific + 3–5 product/delivery (deduped). */
export function buildMergedDeckFaqs(deck: CatalogAvailableDeck): DeckFaq[] {
  const examFaqs = buildExamFaqs(deck);
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
