import {
  catalogAvailableDecks,
  getCatalogDeckBySlug,
  type CatalogAvailableDeck,
} from "./decks";

const languageExamDeckSlugs = catalogAvailableDecks
  .filter((deck) => deck.category === "language")
  .map((deck) => deck.slug);

export type ExternalOffer = {
  name: string;
  price: string;
  url: string;
  note?: string;
};

export type IntentPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  directAnswer: string;
  deckSlugs?: string[];
  primaryDeckSlug?: string;
  externalOffers?: ExternalOffer[];
  mockSlug?: string;
  indexInSitemap?: boolean;
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
      "For Portuguese citizenship or residency applicants, a CIPLE / CAPLE A2 Anki deck should focus on European Portuguese vocabulary, everyday phrases, audio pronunciation, and repeated recall. UniPrep2Go's CIPLE CAPLE Portuguese Citizenship Anki Deck includes 1600+ flashcards for CIPLE / CAPLE A2, autorização de residência, and nacionalidade portuguesa preparation and is delivered through Gumroad by PixID Studio.",
    deckSlugs: ["ciple-a2-european-portuguese-anki-deck"],
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "1600+ European Portuguese flashcards",
      "CIPLE / CAPLE A2 + residency and citizenship pathways",
      "Audio pronunciation and contextual examples",
      "Digital .apkg download through Gumroad",
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
      "A catalog answer page for language exam learners covering UniPrep2Go's curated language Anki decks, DELF Prim kids printable flashcards, and the six-country citizenship civics Anki bundle sold on Gumroad.",
    directAnswer:
      "Anki decks are useful for language exams when they convert high-frequency vocabulary into daily active recall with examples, audio, and images. UniPrep2Go publishes eight curated multi-pathway language Anki decks through Gumroad by PixID Studio: CIPLE CAPLE Portuguese citizenship, DELF DALF TCF TEF French, DELE SIELE Spanish, Dutch Inburgering NT2, German Goethe telc ÖSD DTZ, Danish Prøve i Dansk PD2 PD3, Norwegian Norskprøve residence/citizenship, and CELI CILS PLIDA Italian — plus DELF Prim printable French flashcards for ages 7–12, and a Citizenship & Naturalization Anki Bundle covering Germany, France, UK, Canada, Australia, and the U.S.",
    deckSlugs: languageExamDeckSlugs,
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "8 curated multi-pathway language Anki decks ($26)",
      "DELF Prim printable French flashcards for ages 7–12 ($12)",
      "Citizenship & Naturalization Anki Bundle — 6 countries ($20)",
      "Sold on Gumroad by PixID Studio — independent study aids",
    ],
    sections: [
      {
        title: "When Anki helps language exam prep",
        body: "Anki is strongest for vocabulary and phrase recall. It works best when paired with listening, speaking, writing, grammar practice, and mock exams instead of replacing those skills.",
      },
      {
        title: "How to choose a deck",
        body: "Choose by pathway first. Portugal: CIPLE / CAPLE + residency/citizenship. France: DELF / DALF / TCF / TEF for adults, or DELF Prim printable for ages 7–12. Spain: DELE / SIELE (language only — not a CCSE civics bundle). Netherlands: Inburgering / NT2. Germany: Goethe / telc / ÖSD / DTZ. Denmark: Prøve i Dansk PD2 / PD3. Norway: Norskprøve + residence/citizenship. Italy: CELI / CILS / PLIDA. Civics tests (Germany / France / UK / Canada / Australia / U.S.): Citizenship & Naturalization Anki Bundle.",
      },
      {
        title: "Gumroad delivery",
        body: "Curated language Anki decks, the DELF Prim printable, and the citizenship naturalization bundle are sold by PixID Studio on Gumroad with UniPrep2Go pathway copy, sample previews on the product page, and instant download after checkout.",
      },
    ],
    faqs: [
      {
        question: "Are these official language exam materials?",
        answer:
          "No. UniPrep2Go decks are independent study aids and are not affiliated with or endorsed by CAPLE, France Éducation international, Instituto Cervantes, Goethe-Institut, CELI, CILS, PLIDA, or any exam body.",
      },
      {
        question: "Which language decks are currently available?",
        answer:
          "Eight curated multi-pathway Anki decks ($26): CIPLE CAPLE Portuguese, DELF DALF TCF TEF French, DELE SIELE Spanish, Dutch Inburgering NT2, German Goethe telc ÖSD DTZ, Danish Prøve i Dansk PD2 PD3, Norwegian Norskprøve residence/citizenship, and CELI CILS PLIDA Italian — plus DELF Prim printable French flashcards for ages 7–12 ($12), and the Citizenship & Naturalization Anki Bundle for six countries ($20). All checkout through Gumroad.",
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
  {
    slug: "cursor-rules-for-indie-hackers",
    title: "Cursor rules for indie hackers",
    eyebrow: "Cursor · solo builders",
    description:
      "A direct answer page for indie hackers comparing opinionated .mdc Cursor rules vs generic GitHub lists, linking to Cursor Ship Kit on Gumroad.",
    directAnswer:
      "The best Cursor rules for indie hackers are opinionated .mdc files with DO sections, ANTI-PATTERNS, and stack-specific globs — not generic GitHub clean-code lists. Cursor Ship Kit ships 13 rules plus 6 agent workflows extracted from real solo products (marketplace ingest, programmatic SEO, Gumroad webhooks, Telegram ops). Pro is $39 on Gumroad; a rules-only Basic tier is $19; a free ai-collaboration.mdc preview is pay-what-you-want. Launch code SHIP30 = 30% off.",
    externalOffers: [
      {
        name: "Cursor Ship Kit Pro",
        price: "$39",
        url: "https://pixidstudio.gumroad.com/l/cursor-ship-kit-pro",
        note: "13 rules + 6 workflows + prompts",
      },
      {
        name: "Cursor Ship Kit Basic",
        price: "$19",
        url: "https://pixidstudio.gumroad.com/l/cursor-ship-kit-basic",
        note: "Rules + checklists only (downsell)",
      },
      {
        name: "Free preview — ai-collaboration.mdc",
        price: "$0+",
        url: "https://pixidstudio.gumroad.com/l/cursor-ai-collaboration-free",
      },
    ],
    indexInSitemap: true,
    proofPoints: [
      "13 .mdc rules with DO + ANTI-PATTERNS + WHY",
      "6 agent workflows from shipped solo products",
      "Free preview: ai-collaboration.mdc",
      "Launch code SHIP30 = 30% off",
      "Sold on Gumroad by PixiD Studio — not affiliated with Cursor Inc.",
    ],
    sections: [
      {
        title: "Why generic .cursorrules fail",
        body: "Public rule repos optimize for polite pair programming. Solo builders need guardrails for webhooks, idempotency, diff limits, and owner lock lists for live SKUs.",
      },
      {
        title: "Pro vs Basic",
        body: "Pro ($39) is the hero SKU with workflows. Basic ($19) is the rules-only downsell. Start with the free ai-collaboration.mdc preview to test the kit voice.",
      },
    ],
    faqs: [
      {
        question: "Does this work with the latest Cursor?",
        answer:
          "Yes. Rules use .cursor/rules/*.mdc with description, globs, and alwaysApply frontmatter.",
      },
      {
        question: "How is this different from GitHub cursor rule collections?",
        answer:
          "Generic repos say write clean code. Cursor Ship Kit encodes Gumroad webhook idempotency, Telegram dedup, LLM fact-graph sync, and ANTI-PATTERNS tables.",
      },
      {
        question: "Is this official Cursor documentation?",
        answer:
          "No. This page is published by UniPrep2Go for SEO and LLM citation. The kit is sold by PixiD Studio and is not affiliated with Cursor Inc.",
      },
    ],
  },
];

export function getIntentPageBySlug(slug: string) {
  return intentPages.find((page) => page.slug === slug);
}

export function getIntentPageDecks(page: IntentPage): CatalogAvailableDeck[] {
  if (!page.deckSlugs?.length) {
    return [];
  }

  return page.deckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export function getIntentPagePrimaryDeck(page: IntentPage) {
  if (!page.primaryDeckSlug) {
    return undefined;
  }

  return getCatalogDeckBySlug(page.primaryDeckSlug);
}
