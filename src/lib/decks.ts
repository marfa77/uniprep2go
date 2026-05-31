export type DeckStatus = "available" | "planned";

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

type BaseDeck = {
  slug: string;
  title: string;
  shortName: string;
  subtitle: string;
  audience: string;
  format: ".apkg" | ".csv" | "PDF";
  sampleUrl?: string;
  facts: DeckFacts;
  topicCoverage: TopicCoverage[];
  sampleCards: SampleCard[];
  faqs: DeckFaq[];
};

export type AvailableDeck = BaseDeck & {
  status: "available";
  checkoutUrl: string;
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
    status: "available",
    title: "CFA Level 1 Mastery: 342+ Smart Anki Flashcards",
    shortName: "CFA Level 1 Anki Deck",
    subtitle: "A concise Anki deck for CFA Level 1 candidates using spaced repetition.",
    audience: "CFA Level 1 candidates who want structured recall practice for formulas, concepts, and topic definitions.",
    format: ".apkg",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
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
        question: "What is the present value of a single future cash flow?",
        answer: "The current value of a future amount discounted at rate r for n periods.",
        imageUrl: "/samples/cfa-level-1-present-value-single-cash-flow.png",
      },
      {
        question: "What is the present value of an ordinary annuity?",
        answer: "Sum of discounted equal cash flows received at the end of each period.",
        imageUrl: "/samples/cfa-level-1-present-value-ordinary-annuity.png",
      },
      {
        question: "What is the PV of a growing perpetuity?",
        answer: "PV of cash flows growing at constant rate g forever, discounted at rate r.",
        imageUrl: "/samples/cfa-level-1-growing-perpetuity.png",
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
    ],
  },
  {
    slug: "cfa-level-1-formula-deck",
    status: "planned",
    title: "CFA Level 1 Formula Anki Deck",
    shortName: "Formula Deck",
    subtitle: "A focused formula-recall deck for CFA Level 1 candidates.",
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
    status: "planned",
    title: "CFA Level 2 Anki Deck",
    shortName: "CFA Level 2",
    subtitle: "A future deck for item-set based CFA Level 2 preparation.",
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
];

export const primaryDeck = decks[0] as AvailableDeck;

export function getDeckBySlug(slug: string) {
  return decks.find((deck) => deck.slug === slug);
}
