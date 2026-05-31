export type DeckStatus = "available" | "planned";

export type DeckCategory =
  | "finance"
  | "language"
  | "professional"
  | "academic";

export type TopicCoverage = {
  name: string;
  examWeight: string;
  cards: string;
};

export type DeckFacts = {
  cards: string;
  topics: string;
  formulas: string;
  examYear: string;
  delivery: string;
};

export type DeckFaq = {
  question: string;
  answer: string;
};

export type SampleCard = {
  question: string;
  answer: string;
  imageUrl: string;
};

export type ImportStep = {
  title: string;
  detail: string;
};

export type ComparisonRow = {
  dimension: string;
  deck: string;
  curriculum: string;
};

type BaseDeck = {
  slug: string;
  category: DeckCategory;
  title: string;
  shortName: string;
  subtitle: string;
  directAnswer: string;
  lastUpdated: string;
  audience: string;
  format: ".apkg" | ".csv" | "PDF";
  sampleUrl?: string;
  facts: DeckFacts;
  topicCoverage: TopicCoverage[];
  sampleCards: SampleCard[];
  faqs: DeckFaq[];
  importSteps?: ImportStep[];
  comparison?: ComparisonRow[];
};

export type DeckPrice = {
  amount: number;
  currency: "USD";
};

export type AvailableDeck = BaseDeck & {
  status: "available";
  checkoutUrl: string;
  price: DeckPrice;
};

export type PlannedDeck = BaseDeck & {
  status: "planned";
  checkoutUrl?: string;
};

export type Deck = AvailableDeck | PlannedDeck;

export const cfaLevelOneTopics: TopicCoverage[] = [
  { name: "Ethical and Professional Standards", examWeight: "15-20%", cards: "50+" },
  { name: "Quantitative Methods", examWeight: "6-9%", cards: "35+" },
  { name: "Economics", examWeight: "6-9%", cards: "30+" },
  { name: "Financial Statement Analysis", examWeight: "11-14%", cards: "55+" },
  { name: "Corporate Issuers", examWeight: "6-9%", cards: "25+" },
  { name: "Equity Investments", examWeight: "11-14%", cards: "40+" },
  { name: "Fixed Income", examWeight: "11-14%", cards: "40+" },
  { name: "Derivatives", examWeight: "5-8%", cards: "20+" },
  { name: "Alternative Investments", examWeight: "7-10%", cards: "22+" },
  { name: "Portfolio Management", examWeight: "8-12%", cards: "25+" },
];

export const decks: Deck[] = [
  {
    slug: "cfa-level-1-anki-deck",
    category: "finance",
    status: "available",
    title: "CFA Level 1 Mastery: 342+ Smart Anki Flashcards",
    shortName: "CFA Level 1 Anki Deck",
    subtitle: "A concise Anki deck for CFA Level 1 candidates using spaced repetition.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 1 Anki deck with 342+ flashcards covering all 10 CFA Level 1 topic areas, including core formulas and definitions. It is delivered as an Anki .apkg file for $11 USD through Gumroad. The deck is a supplementary spaced-repetition study aid for the 2026 exam cycle and is not official CFA Institute material or a replacement for the curriculum.",
    lastUpdated: "2026-05-31",
    audience: "CFA Level 1 candidates who want structured recall practice for formulas, concepts, and topic definitions.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
    price: {
      amount: 11,
      currency: "USD",
    },
    facts: {
      cards: "342+",
      topics: "10 CFA Level 1 topic areas",
      formulas: "Core formulas and definitions",
      examYear: "2026 preparation cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: cfaLevelOneTopics,
    sampleCards: [
      {
        question: "What is a forward contract?",
        answer: "A private OTC agreement to buy or sell an asset at a specified forward price on a future date.",
        imageUrl: "/samples/cfa-level-1-forward-contract.png",
      },
      {
        question: "What is the no-arbitrage forward price for an asset with no income?",
        answer: "The future value of the current spot price at the risk-free rate for the forward period.",
        imageUrl: "/samples/cfa-level-1-no-arbitrage-forward-price.png",
      },
      {
        question: "What is the forward price for an asset that pays income?",
        answer: "Spot price minus the present value of income, compounded at the risk-free rate.",
        imageUrl: "/samples/cfa-level-1-forward-price-income-asset.png",
      },
    ],
    faqs: [
      {
        question: "What is included in the CFA Level 1 Anki deck?",
        answer: "The product includes 342+ Anki flashcards covering CFA Level 1 concepts, formulas, and definitions across all 10 topic areas.",
      },
      {
        question: "What file format is delivered?",
        answer: "The deck is delivered as an Anki-compatible .apkg file through Gumroad.",
      },
      {
        question: "Is this official CFA Institute material?",
        answer: "No. This is an independent study aid and is not endorsed, promoted, or warranted by CFA Institute.",
      },
      {
        question: "Who is this deck for?",
        answer: "It is for CFA Level 1 candidates who use spaced repetition to reinforce recall during exam preparation.",
      },
      {
        question: "Does the deck replace the CFA curriculum?",
        answer: "No. It is a supplementary recall tool and should be used alongside the official curriculum and practice questions.",
      },
      {
        question: "How do buyers get access?",
        answer: "Buyers complete checkout on Gumroad and receive the digital download according to Gumroad's delivery flow.",
      },
      {
        question: "How do I import the deck into Anki?",
        answer: "Download the .apkg file from your Gumroad receipt, open the desktop Anki app, choose File then Import, select the .apkg file, and the deck appears in your deck list ready for study.",
      },
      {
        question: "Does the deck work on AnkiDroid and AnkiMobile?",
        answer: "Yes. Import the .apkg file on Anki desktop and sync through AnkiWeb, or import the file directly in AnkiDroid (Android) and AnkiMobile (iOS).",
      },
    ],
    importSteps: [
      {
        title: "Download the .apkg file",
        detail: "After checkout, open your Gumroad receipt email or library and download the CFA Level 1 deck .apkg file to your computer.",
      },
      {
        title: "Install the Anki desktop app",
        detail: "Install the free Anki desktop app from apps.ankiweb.net if you do not already have it. The .apkg format imports most reliably on desktop.",
      },
      {
        title: "Import the deck",
        detail: "In Anki, choose File then Import, select the downloaded .apkg file, and confirm. The CFA Level 1 deck appears in your deck list.",
      },
      {
        title: "Sync to mobile (optional)",
        detail: "Create a free AnkiWeb account, sync from desktop, then sign in on AnkiDroid (Android) or AnkiMobile (iOS) to study the deck on your phone.",
      },
      {
        title: "Start spaced repetition",
        detail: "Open the deck and study daily. Anki schedules reviews automatically using spaced repetition to reinforce recall before the exam.",
      },
    ],
    comparison: [
      {
        dimension: "Primary purpose",
        deck: "Fast recall practice for formulas, definitions, and concepts.",
        curriculum: "Complete learning, theory, and exam-standard practice questions.",
      },
      {
        dimension: "Format",
        deck: "342+ Anki flashcards (.apkg) using spaced repetition.",
        curriculum: "Official readings, learning outcome statements, and item sets.",
      },
      {
        dimension: "Best used for",
        deck: "Daily review and memory retention between study sessions.",
        curriculum: "Building first-time understanding and full topic coverage.",
      },
      {
        dimension: "Official status",
        deck: "Independent study aid. Not endorsed by CFA Institute.",
        curriculum: "Official CFA Institute material and the authoritative source.",
      },
      {
        dimension: "Recommended approach",
        deck: "Use alongside the curriculum to lock in recall.",
        curriculum: "Use as the primary source of truth for the exam.",
      },
    ],
  },
  {
    slug: "cfa-level-1-formula-deck",
    category: "finance",
    status: "planned",
    title: "CFA Level 1 Formula Anki Deck",
    shortName: "Formula Deck",
    subtitle: "A focused formula-recall deck for CFA Level 1 candidates.",
    directAnswer:
      "The CFA Level 1 Formula Anki Deck is a planned UniPrep2Go product focused on formula recall for CFA Level 1 candidates. It is not yet available for purchase.",
    lastUpdated: "2026-05-31",
    audience: "Candidates who want a separate formula-only spaced repetition workflow.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "Formula-heavy CFA Level 1 areas",
      formulas: "Planned dedicated formula coverage",
      examYear: "Future release",
      delivery: "Digital download",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [],
  },
  {
    slug: "cfa-level-2-anki-deck",
    category: "finance",
    status: "planned",
    title: "CFA Level 2 Anki Deck",
    shortName: "CFA Level 2",
    subtitle: "A future deck for item-set based CFA Level 2 preparation.",
    directAnswer:
      "The CFA Level 2 Anki Deck is a planned UniPrep2Go product for item-set based CFA Level 2 preparation. It is not yet available for purchase.",
    lastUpdated: "2026-05-31",
    audience: "Future CFA Level 2 candidates using Anki for concept retention.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "CFA Level 2 topic areas",
      formulas: "Planned",
      examYear: "Future release",
      delivery: "Digital download",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [],
  },
  // ── Language certifications ──────────────────────────────────────────
  {
    slug: "ciple-a2-european-portuguese-anki-deck",
    category: "language",
    status: "available",
    title: "CIPLE A2 European Portuguese: 1600+ Anki Flashcards",
    shortName: "CIPLE A2 Portuguese",
    subtitle: "Full Anki deck for CIPLE / CAPLE A2 European Portuguese exam preparation.",
    directAnswer:
      "UniPrep2Go sells a CIPLE A2 European Portuguese Anki deck with 1600+ flashcards covering exam vocabulary, phrases, and examples with audio pronunciation and images. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets CIPLE / CAPLE A2 candidates, Portuguese residency and citizenship applicants, and self-learners using spaced repetition.",
    lastUpdated: "2026-05-31",
    audience: "CIPLE / CAPLE A2 exam candidates, Portuguese residency or citizenship applicants, self-learners.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ikvjw",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "1600+",
      topics: "Vocabulary, phrases, everyday situations",
      formulas: "Audio pronunciation + contextual examples",
      examYear: "Current CAPLE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is the CIPLE A2 exam?",
        answer: "CIPLE (Certificado Inicial de Português Língua Estrangeira) is the A2-level certificate issued by CAPLE at the University of Lisbon. It is required for Portuguese residency and citizenship applications.",
      },
      {
        question: "What does the deck include?",
        answer: "1600+ carefully curated Anki cards with European Portuguese vocabulary, phrases, contextual examples, audio pronunciation, and images where helpful.",
      },
      {
        question: "Who is this deck for?",
        answer: "CIPLE / CAPLE A2 candidates, people applying for Portuguese residency or citizenship who need the A2 language certificate, and self-learners using spaced repetition.",
      },
      {
        question: "What file format is delivered?",
        answer: "The deck is delivered as an Anki-compatible .apkg file through Gumroad.",
      },
      {
        question: "Does it include audio?",
        answer: "Yes. Cards include audio pronunciation to help train your ear for European Portuguese.",
      },
    ],
  },
  {
    slug: "ciple-b1-portuguese-anki-deck",
    category: "language",
    status: "available",
    title: "CIPLE B1 Portuguese: 1600+ Anki Flashcards",
    shortName: "CIPLE B1 Portuguese",
    subtitle: "Full Anki deck for CIPLE B1 European Portuguese exam preparation.",
    directAnswer:
      "UniPrep2Go sells a CIPLE B1 European Portuguese Anki deck with 1600+ flashcards for the B1-level CAPLE certificate. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets B1-level Portuguese certification candidates and residency applicants advancing from A2.",
    lastUpdated: "2026-05-31",
    audience: "CIPLE B1 certification candidates and Portuguese residency applicants at the B1 level.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/cipleb1",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "1600+",
      topics: "B1-level vocabulary, phrases, grammar-in-context",
      formulas: "Audio pronunciation + contextual examples",
      examYear: "Current CAPLE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is the CIPLE B1 exam?",
        answer: "The B1-level CAPLE certificate from the University of Lisbon. Required for some Portuguese residency and citizenship pathways and demonstrates intermediate competency in European Portuguese.",
      },
      {
        question: "How is this different from the A2 deck?",
        answer: "The B1 deck covers intermediate vocabulary, more complex phrases, and grammar-in-context appropriate for the B1 level. It is intended for learners who have already reached A2 level.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "delf-b2-french-anki-deck",
    category: "language",
    status: "available",
    title: "DELF B2 Cracked: 2000+ French Anki Flashcards",
    shortName: "DELF B2 French",
    subtitle: "Vocabulary-first Anki deck for DELF B2 French exam preparation.",
    directAnswer:
      "UniPrep2Go sells a DELF B2 French Anki deck with 2000+ flashcards covering every word needed for the B2 exam, each with a visual image, native French audio, and contextual example. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets DELF B2 candidates who want vocabulary retained through spaced repetition rather than passive list study.",
    lastUpdated: "2026-05-31",
    audience: "DELF B2 exam candidates and advanced French learners using spaced repetition.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lcrzbr",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "2000+",
      topics: "DELF B2 vocabulary — full word list coverage",
      formulas: "Native audio + visual image + contextual example per card",
      examYear: "Current DELF cycle",
      delivery: "Digital download through Gumroad (159 MB)",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is the DELF B2 exam?",
        answer: "DELF (Diplôme d'Études en Langue Française) is an official French language certificate issued by France Éducation International. The B2 level demonstrates upper-intermediate French proficiency.",
      },
      {
        question: "What does each card include?",
        answer: "Every card includes a visual image so your brain stores the word, native French audio so your ear recognises it, and a contextual example so you know exactly when to use it.",
      },
      {
        question: "How many cards does the deck have?",
        answer: "2000+ cards covering every word you need for DELF B2. No fluff, no grammar lectures — just the vocabulary wired into memory.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "delf-tcf-a2-french-anki-deck",
    category: "language",
    status: "available",
    title: "DELF TCF A2 French: 1000 Most Frequent Words Anki Deck",
    shortName: "DELF TCF A2 French",
    subtitle: "1000 most frequent French words as Anki flashcards for A2 exam preparation.",
    directAnswer:
      "UniPrep2Go sells a DELF / TCF A2 French Anki deck with 1000 most frequent French words for A2-level exam preparation. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets DELF TCF A2 candidates who want vocabulary retained through spaced repetition.",
    lastUpdated: "2026-05-31",
    audience: "DELF and TCF A2 candidates and beginner French learners.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/rbavyg",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "1000",
      topics: "1000 most frequent French words for A2",
      formulas: "Vocabulary with examples",
      examYear: "Current DELF / TCF cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What exams does this deck cover?",
        answer: "The deck is designed for DELF A2 and TCF A2 candidates. Mastering the 1000 most frequent French words gives strong coverage of A2-level vocabulary requirements.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "dutch-a2-inburgering-anki-deck",
    category: "language",
    status: "available",
    title: "Dutch A2 — Inburgering: 1000 Most Frequent Words Anki Deck",
    shortName: "Dutch A2 Inburgering",
    subtitle: "1000 high-frequency Dutch words for the Inburgering A2 civic integration exam.",
    directAnswer:
      "UniPrep2Go sells a Dutch A2 Inburgering Anki deck with 1000+ high-frequency words for the Dutch civic integration (Inburgering) exam. Each card includes the Dutch word, English gloss, bilingual example sentences, native audio, and illustrations. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets migrants preparing for the Dutch Inburgering exam and A2 Dutch certification.",
    lastUpdated: "2026-05-31",
    audience: "Migrants preparing for the Dutch Inburgering exam and A2 Dutch language certification.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/nrnwu",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "1000+",
      topics: "Inburgering exam vocabulary — citizenship-style themes",
      formulas: "Native audio + bilingual examples + illustrations per card",
      examYear: "Current Inburgering cycle",
      delivery: "Digital download through Gumroad (82.9 MB)",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is the Dutch Inburgering exam?",
        answer: "Inburgering is the Dutch civic integration exam required for many migrants seeking residency or citizenship in the Netherlands. The A2 language component tests everyday Dutch vocabulary and comprehension.",
      },
      {
        question: "What does each card include?",
        answer: "Each card includes the Dutch word, an English gloss, bilingual example sentences, native audio pronunciation, and illustrations where helpful.",
      },
      {
        question: "Does it work with the free Anki app?",
        answer: "Yes. Import the .apkg file into the free Anki desktop app, then sync to AnkiDroid or AnkiMobile via AnkiWeb.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "german-a2-anki-deck",
    category: "language",
    status: "available",
    title: "German A2: 1,000 Essential Words Anki Deck (Goethe / telc / ÖSD)",
    shortName: "German A2",
    subtitle: "1000 essential German words for A2 certificate exams — Goethe, telc, ÖSD.",
    directAnswer:
      "UniPrep2Go sells a German A2 Anki deck with 1000 essential words for Goethe-Institut, telc, and ÖSD A2 certificate exams. It is delivered as an Anki .apkg file for $19+ USD through Gumroad. The deck targets German A2 exam candidates using spaced repetition for vocabulary retention.",
    lastUpdated: "2026-05-31",
    audience: "German A2 certificate exam candidates for Goethe-Institut, telc, or ÖSD.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/uoolen",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "1000",
      topics: "A2-level German vocabulary",
      formulas: "Essential words with examples",
      examYear: "Current Goethe / telc / ÖSD cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which German A2 exams does this deck cover?",
        answer: "The deck is designed for the three main A2 German certificates: Goethe-Institut A2, telc Deutsch A2, and ÖSD Zertifikat A2. The vocabulary list overlaps substantially across all three.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "celi-b1-italian-anki-deck",
    category: "language",
    status: "available",
    title: "CELI B1 Italian: 373 Anki Flashcards",
    shortName: "CELI B1 Italian",
    subtitle: "Anki deck for CELI B1 Italian certificate exam preparation.",
    directAnswer:
      "UniPrep2Go sells a CELI B1 Italian Anki deck with 373 flashcards for the CELI B1 certificate from the Università per Stranieri di Perugia. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets Italian B1 certification candidates using spaced repetition.",
    lastUpdated: "2026-05-31",
    audience: "CELI B1 certificate candidates and intermediate Italian learners.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/celib1",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "373",
      topics: "B1-level Italian vocabulary and phrases",
      formulas: "Exam-focused vocabulary",
      examYear: "Current CELI cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is the CELI B1 exam?",
        answer: "CELI (Certificato di Conoscenza della Lingua Italiana) is an Italian language certificate from the Università per Stranieri di Perugia. The B1 level demonstrates intermediate Italian proficiency.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },

  // ── Academic ──────────────────────────────────────────────────────────
  {
    slug: "ib-biology-sl-anki-deck",
    category: "academic",
    status: "available",
    title: "IB Biology SL: Core Mastery — 149 Smart Anki Flashcards",
    shortName: "IB Biology SL",
    subtitle: "149 focused Anki flashcards for IB Biology Standard Level.",
    directAnswer:
      "UniPrep2Go sells an IB Biology SL Anki deck with 149 flashcards covering core concepts for the IB Biology Standard Level programme. It is delivered as an Anki .apkg file for $4.99 USD through Gumroad. The deck targets IB students using spaced repetition for concept recall.",
    lastUpdated: "2026-05-31",
    audience: "IB Biology Standard Level students using spaced repetition for exam preparation.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/oakmtp",
    price: { amount: 4.99, currency: "USD" },
    facts: {
      cards: "149",
      topics: "IB Biology SL core concepts",
      formulas: "Key definitions and processes",
      examYear: "Current IB cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What IB Biology topics are covered?",
        answer: "The deck covers core IB Biology SL concepts including cell biology, molecular biology, genetics, ecology, evolution, and human physiology.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this for SL only or also HL?",
        answer: "The deck is focused on Standard Level core content. HL students can use it to reinforce the core topics they share with SL.",
      },
    ],
  },

  // ── Professional / Commodities ─────────────────────────────────────────
  {
    slug: "bench-energy-metal-trader-anki-deck",
    category: "professional",
    status: "available",
    title: "Bench Energy: METAL Trader's Lexicon — 202 Anki Flashcards",
    shortName: "Metal Trader's Lexicon",
    subtitle: "Anki flashcard deck covering key terms for metals commodity trading.",
    directAnswer:
      "UniPrep2Go sells the Bench Energy Metal Trader's Lexicon, an Anki deck with 202 flashcards covering key vocabulary, terms, and concepts for metals commodity trading. It is delivered as an Anki .apkg file for $19 USD through Gumroad. The deck targets commodity traders, analysts, and professionals working in metals markets.",
    lastUpdated: "2026-05-31",
    audience: "Metals commodity traders, analysts, and professionals entering metals markets.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/zpazj",
    price: { amount: 19, currency: "USD" },
    facts: {
      cards: "202",
      topics: "Metals trading terminology and market concepts",
      formulas: "Trading terms, pricing mechanics, market structure",
      examYear: "Professional reference",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What does the Metal Trader's Lexicon cover?",
        answer: "Key terms, concepts, and vocabulary for metals commodity trading — including base metals, precious metals, pricing benchmarks, market structure, and trading mechanics.",
      },
      {
        question: "Who is this for?",
        answer: "Commodity traders, analysts, and professionals entering or working in metals markets who want to systematise their vocabulary using spaced repetition.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
];

export const primaryDeck = decks[0] as AvailableDeck;

export const availableDecks = decks.filter(
  (deck): deck is AvailableDeck => deck.status === "available",
);

export function getDeckBySlug(slug: string) {
  return decks.find((deck) => deck.slug === slug);
}

export function getAvailableDeckBySlug(slug: string) {
  return availableDecks.find((deck) => deck.slug === slug);
}

export const categoryLabels: Record<DeckCategory, string> = {
  finance: "Finance Exams",
  language: "Language Certifications",
  professional: "Professional & Trading",
  academic: "Academic",
};

export const categoryOrder: DeckCategory[] = [
  "finance",
  "language",
  "professional",
  "academic",
];

export function getAvailableDecksByCategory(): Array<{
  category: DeckCategory;
  label: string;
  decks: AvailableDeck[];
}> {
  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      decks: availableDecks.filter((d) => d.category === category),
    }))
    .filter((group) => group.decks.length > 0);
}
