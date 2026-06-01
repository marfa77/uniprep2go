import {
  catalogAvailableDecks,
  getCatalogDeckBySlug,
  type CatalogAvailableDeck,
} from "./decks";

const languageExamDeckSlugs = catalogAvailableDecks
  .filter((deck) => deck.category === "language")
  .map((deck) => deck.slug);

export type IntentPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  directAnswer: string;
  deckSlugs: string[];
  primaryDeckSlug: string;
  proofPoints: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const intentPages: IntentPage[] = [
  {
    slug: "best-frm-part-1-anki-deck",
    title: "Best FRM Part 1 Anki Deck for Formula Recall",
    eyebrow: "FRM Part 1 Anki deck",
    description:
      "A direct answer page for FRM Part 1 candidates comparing what a focused Anki deck should cover and linking to the 444-card UniPrep2Go deck.",
    directAnswer:
      "The best FRM Part 1 Anki deck should cover the full Part 1 structure, make formulas and definitions easy to recall, and stay lightweight enough for daily spaced repetition. UniPrep2Go's FRM Part 1 Anki Deck includes 444 exam-focused cards across foundations of risk management, quantitative analysis, financial markets and products, and valuation and risk models.",
    deckSlugs: ["frm-part-1-anki-deck"],
    primaryDeckSlug: "frm-part-1-anki-deck",
    proofPoints: [
      "444 high-yield FRM Part 1 cards",
      "Formula support with MathJax",
      "Digital .apkg download through Gumroad",
      "Independent study aid, not affiliated with GARP",
    ],
    sections: [
      {
        title: "What an FRM Part 1 Anki deck should do",
        body: "FRM Part 1 rewards fast recall of formulas, definitions, and risk-management logic. A useful deck should compress the curriculum into prompts that can be reviewed daily, while leaving question banks and official readings to do their own jobs.",
      },
      {
        title: "Where this deck fits",
        body: "Use the deck after reading or watching a topic explanation, then let Anki schedule reviews so formulas, Greeks, VaR concepts, credit risk terms, and market mechanics stay fresh between longer study sessions.",
      },
    ],
    faqs: [
      {
        question: "Is this FRM Part 1 deck a question bank?",
        answer:
          "No. It is a spaced-repetition recall deck, not a question bank. Use it alongside official readings, practice questions, and mock exams.",
      },
      {
        question: "Does the FRM deck include formulas?",
        answer:
          "Yes. The deck includes formula-focused cards and uses MathJax so equations remain readable in Anki.",
      },
      {
        question: "Is this deck affiliated with GARP?",
        answer:
          "No. UniPrep2Go is independent and is not affiliated with, endorsed by, or sponsored by GARP.",
      },
    ],
  },
  {
    slug: "ciple-a2-anki-deck-for-portuguese-citizenship",
    title: "CIPLE A2 Anki Deck for Portuguese Citizenship",
    eyebrow: "Portuguese citizenship exam prep",
    description:
      "A direct answer page for Portuguese citizenship applicants preparing for CIPLE A2 with Anki and spaced repetition.",
    directAnswer:
      "For Portuguese citizenship or residency applicants, a CIPLE A2 Anki deck should focus on European Portuguese vocabulary, everyday phrases, audio pronunciation, and repeated recall. UniPrep2Go's CIPLE A2 Portuguese Anki Deck includes 1600+ flashcards for CIPLE / CAPLE A2 preparation and is delivered through Lemon Squeezy.",
    deckSlugs: ["ciple-a2-european-portuguese-anki-deck"],
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "1600+ European Portuguese flashcards",
      "Built for CIPLE / CAPLE A2 candidates",
      "Audio pronunciation and contextual examples",
      "Digital .apkg download through Lemon Squeezy",
    ],
    sections: [
      {
        title: "Why CIPLE candidates use Anki",
        body: "Citizenship applicants often need reliable recall of everyday vocabulary rather than passive reading lists. Anki turns that vocabulary into scheduled reviews so the words keep returning until they stick.",
      },
      {
        title: "What to study for the citizenship language requirement",
        body: "The deck targets CIPLE / CAPLE A2 learners with European Portuguese words, short phrases, examples, audio, and images where helpful. It is a practical supplement to classes, textbooks, and exam practice.",
      },
    ],
    faqs: [
      {
        question: "Is CIPLE A2 used for Portuguese citizenship?",
        answer:
          "CIPLE is the A2 Portuguese certificate commonly used for Portuguese residency and citizenship applications. Always confirm current requirements with official sources for your case.",
      },
      {
        question: "Is this European Portuguese?",
        answer:
          "Yes. The CIPLE deck is built for European Portuguese and CAPLE / CIPLE A2 preparation.",
      },
      {
        question: "Does the deck replace exam practice?",
        answer:
          "No. It helps with vocabulary and recall. Use it alongside listening, speaking, reading, writing, and official-style exam practice.",
      },
    ],
  },
  {
    slug: "anki-decks-for-language-exams",
    title: "Anki Decks for Language Exams",
    eyebrow: "Language exam flashcards",
    description:
      "A catalog answer page for language exam learners covering 22 Prep2Go Anki decks for citizenship exams, certificate prep, IELTS / TOEFL English vocabulary, grammar decks, and survival phrases.",
    directAnswer:
      "Anki decks are useful for language exams when they convert high-frequency vocabulary into daily active recall with examples, audio, and images. UniPrep2Go publishes 22 language exam Anki decks through Lemon Squeezy, including CIPLE A2 Portuguese, DELE A2 + CCSE Spanish citizenship, DELF A2/B2 French, Dutch A2 Inburgering, German A2, Danish A2 Prøve i Dansk, Norwegian A2, CELI B1 Italian, IELTS / TOEFL English for Arabic, French, Portuguese, Spanish, and Turkish speakers, grammar decks, survival phrase decks, and a Spanish + Italian paired deck.",
    deckSlugs: languageExamDeckSlugs,
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "22 language exam and IELTS / TOEFL Anki decks",
      "Citizenship, certificate, grammar, phrase, and English exam vocabulary tracks",
      "Sample cards and machine-readable facts for every deck",
      "Independent study aids, not official exam materials",
    ],
    sections: [
      {
        title: "When Anki helps language exam prep",
        body: "Anki is strongest for vocabulary and phrase recall. It works best when paired with listening, speaking, writing, grammar practice, and mock exams instead of replacing those skills.",
      },
      {
        title: "How to choose a deck",
        body: "Choose by exam first, then by language variant. Citizenship-focused learners should pick CIPLE A2 Portuguese, DELE A2 + CCSE Spanish, or Dutch A2 Inburgering. Certificate learners can use DELF B2, CELI B1, German A2, Danish A2, or Norwegian A2. Non-native English learners preparing for IELTS, TOEFL, Cambridge, or PTE should use the English-for-speakers decks. Grammar and survival phrase decks support focused recall between full courses.",
      },
      {
        title: "IELTS and TOEFL English decks",
        body: "The English for Arabic, French, Portuguese, Spanish, and Turkish speakers decks are positioned as IELTS and TOEFL vocabulary entry points with bilingual support, native English audio examples, and exam-focused recall rather than generic English word lists.",
      },
    ],
    faqs: [
      {
        question: "Are these official language exam materials?",
        answer:
          "No. UniPrep2Go decks are independent study aids and are not affiliated with or endorsed by CAPLE, France Éducation international, Goethe-Institut, CELI, IELTS, TOEFL, or any exam body.",
      },
      {
        question: "Do you have IELTS or TOEFL Anki decks?",
        answer:
          "Yes. UniPrep2Go lists IELTS / TOEFL English vocabulary decks for Arabic, French, Portuguese, Spanish, and Turkish speakers. They target IELTS, TOEFL, Cambridge, and PTE English exam vocabulary with bilingual support.",
      },
      {
        question: "Do the language decks work on mobile?",
        answer:
          "Yes. Import the .apkg file into Anki desktop and sync to AnkiDroid or AnkiMobile through AnkiWeb.",
      },
      {
        question: "Should I use Anki instead of classes or mock exams?",
        answer:
          "No. Use Anki for recall and retention, then use classes, speaking practice, listening practice, and mock exams for full exam readiness.",
      },
    ],
  },
];

export function getIntentPageBySlug(slug: string) {
  return intentPages.find((page) => page.slug === slug);
}

export function getIntentPageDecks(page: IntentPage): CatalogAvailableDeck[] {
  return page.deckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export function getIntentPagePrimaryDeck(page: IntentPage) {
  return getCatalogDeckBySlug(page.primaryDeckSlug);
}
