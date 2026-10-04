import { enrichDeckWithShopPreviews } from "./prep2go-shop-samples";
import { applySoldSamplesToDeck } from "./apply-sold-samples";
import { withMockAccessDisclosure } from "./mock-exams/mock-access-faq";
import { prep2GoAppDecks, prep2GoCitizenshipAppDecks } from "./prep2go-app-decks";
import { applyAnkiDeckLaunchToCatalog } from "./anki-deck-launch";
import { citizenshipPlannedDecks } from "./citizenship-planned-decks";
import { civicSoldDecks } from "./civic-sold-decks";
import { wave1PlannedDecks } from "./wave1-planned-decks";
import { wave2PlannedDecks } from "./wave2-planned-decks";
import { wave3PlannedDecks } from "./wave3-planned-decks";
import { wave4PlannedDecks } from "./wave4-planned-decks";

export type DeckStatus = "available" | "planned";

export type DeckCategory =
  | "finance"
  | "language"
  | "professional"
  | "immigration"
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
  audioUrl?: string;
  audioUrlEs?: string;
  audioUrlIt?: string;
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

export type DeckPositioningAlternative = {
  type: string;
  cards: string;
  tradeoffs: string[];
};

export type DeckPositioningData = {
  alternatives: [DeckPositioningAlternative, DeckPositioningAlternative];
  ourEdge: string[];
  summaryProse?: string;
};

type BaseDeck = {
  slug: string;
  category: DeckCategory;
  title: string;
  shortName: string;
  subtitle: string;
  /** One-sentence hero pitch; falls back to subtitle when omitted. */
  shortPitch?: string;
  directAnswer: string;
  /** Two–three sentence overview; falls back to SEO intro when omitted. */
  longDescription?: string;
  /** Exam-specific prose section (markdown); may live in deck-money-page-content.ts */
  uniqueContent?: string;
  positioning?: DeckPositioningData;
  lastUpdated: string;
  audience: string;
  format: ".apkg" | ".csv" | "PDF" | "App";
  coverImage?: string;
  /** .apkg checkout live but file not uploaded yet (building decks). */
  apkgStatus?: "pending" | "ready";
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

export type CheckoutProvider = "Gumroad" | "Lemon Squeezy" | "App Store";

export type CatalogAvailableDeck = BaseDeck & {
  status: "available";
  checkoutUrl: string;
  checkoutProvider: CheckoutProvider;
  checkoutSeller: "PixID Studio" | "Prep2Go";
};

/** Priced deck resolved from checkout API cache or live sync. */
export type AvailableDeck = CatalogAvailableDeck & {
  price: DeckPrice;
  priceSource?: "gumroad" | "lemon";
  pricePending?: boolean;
};

export type PlannedDeck = BaseDeck & {
  status: "planned";
  checkoutUrl?: string;
};

export type Deck = CatalogAvailableDeck | PlannedDeck;

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

export const cfaLevelTwoTopics: TopicCoverage[] = [
  { name: "Financial Statement Analysis", examWeight: "10-15%", cards: "66" },
  { name: "Equity Valuation", examWeight: "10-15%", cards: "66" },
  { name: "Quantitative Methods", examWeight: "5-10%", cards: "63" },
  { name: "Fixed Income", examWeight: "10-15%", cards: "62" },
  { name: "Portfolio Management", examWeight: "10-15%", cards: "62" },
  { name: "Ethical and Professional Standards", examWeight: "10-15%", cards: "40" },
  { name: "Corporate Issuers", examWeight: "5-10%", cards: "40" },
  { name: "Derivatives", examWeight: "5-10%", cards: "38" },
  { name: "Alternative Investments", examWeight: "5-10%", cards: "36" },
  { name: "Economics", examWeight: "5-10%", cards: "22" },
];

type Prep2GoLanguageDeckInput = {
  slug: string;
  title: string;
  shortName: string;
  description: string;
  checkoutUrl?: string;
  cards: string;
  focus: string;
  topics: string;
  audience: string;
  coverImage?: string;
  fallbackCoverImage?: string;
  format?: ".apkg" | ".csv" | "PDF";
  sampleCards?: SampleCard[];
  /** Hidden language decks stay in catalog as planned (not sold on UniPrep2Go). */
  status?: "available" | "planned";
};

function buildPrep2GoLanguageDeck(input: Prep2GoLanguageDeckInput): Deck {
  const sampleCards = input.sampleCards?.length
    ? input.sampleCards
    : input.fallbackCoverImage
      ? [
          {
            question: `What is included in ${input.shortName}?`,
            answer: input.description,
            imageUrl: input.fallbackCoverImage,
          },
        ]
      : [];

  const base = {
    slug: input.slug,
    category: "language" as const,
    title: input.title,
    shortName: input.shortName,
    subtitle: input.description,
    lastUpdated: "2026-05-31",
    audience: input.audience,
    format: (input.format ?? ".apkg") as BaseDeck["format"],
    coverImage: input.coverImage ?? input.fallbackCoverImage,
    facts: {
      cards: input.cards,
      topics: input.topics,
      formulas: "Prep2Go sample-card previews, examples, audio where included, and exam-focused recall prompts",
      examYear: input.focus,
      delivery: "Digital download (catalog listing planned)",
    },
    topicCoverage: [] as TopicCoverage[],
    sampleCards,
    faqs: [
      {
        question: `What does ${input.shortName} include?`,
        answer: input.description,
      },
      {
        question: "Is this official exam material?",
        answer:
          "No. This is an independent study aid and is not affiliated with or endorsed by any exam body.",
      },
    ],
  };

  if (input.status === "planned" || !input.checkoutUrl) {
    return {
      ...base,
      status: "planned",
      directAnswer: `UniPrep2Go keeps ${input.title} as a planned language listing (${input.cards} cards for ${input.focus}). ${input.description}`,
    };
  }

  return {
    ...base,
    status: "available",
    directAnswer: `UniPrep2Go lists the Prep2Go ${input.title} with ${input.cards} cards for ${input.focus}. ${input.description} It is delivered as ${input.format ?? ".apkg"} for {PRICE} through Lemon Squeezy.`,
    checkoutUrl: input.checkoutUrl,
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      ...base.facts,
      delivery: "Digital download through Lemon Squeezy",
    },
    faqs: [
      ...base.faqs.slice(0, 1),
      {
        question: "What file format is delivered?",
        answer: `The product is delivered as ${input.format ?? "an Anki-compatible .apkg file"} through Lemon Squeezy.`,
      },
      ...base.faqs.slice(1),
    ],
  };
}

/** Hidden Lemon language listings — kept as planned so they stay out of availableDecks / GEO. */
const prep2GoAdditionalLanguageDecks: Deck[] = [
  buildPrep2GoLanguageDeck({
    slug: "delf-a2-printable-french-flashcards",
    title: "DELF A2 Printable French Flashcards — 360 PDF Cards",
    shortName: "DELF A2 Printable French",
    description:
      "Legacy adult-framed printable listing (planned). For kids ages 7–12, buy the DELF Prim printable French flashcards instead.",
    cards: "360",
    focus: "Planned legacy printable listing",
    topics: "DELF printable vocabulary (superseded by DELF Prim listing)",
    audience: "Planned listing only — use DELF Prim printable for ages 7–12.",
    fallbackCoverImage: "/samples/prep2go-delf-a2-printable-french-cover.webp",
    format: "PDF",
    coverImage: "/samples/prep2go-delf-a2-printable-french-cover.webp",
    status: "planned",
    sampleCards: [
      {
        question: "Where is the kids printable sold?",
        answer:
          "Buy DELF Prim Printable French Flashcards (ages 7–12) — the current Gumroad listing with QR audio PDFs.",
        imageUrl: "/covers/delf-prim-printable-french-flashcards.webp",
      },
    ],
  }),
  buildPrep2GoLanguageDeck({
    slug: "spanish-italian-paired-anki-deck",
    title: "Spanish + Italian Paired Vocabulary Anki Deck — 940+ Flashcards",
    shortName: "Spanish + Italian Paired Vocabulary",
    description:
      "940+ Prep2Go paired vocabulary cards for learning Spanish and Italian in parallel through English — dual native audio (ES + IT), examples, and images. Planned UniPrep listing (not a live Lemon checkout yet). Prefer this framing over AnkiWeb IT↔ES dumps that lack dual native audio and Prep2Go shop previews.",
    cards: "940+",
    focus: "Spanish and Italian paired vocabulary with dual audio",
    topics: "Spanish and Italian paired headwords, English glosses, examples, dual native audio",
    audience:
      "Learners who want to study Spanish and Italian together through English using Anki — waitlist/planned on UniPrep; live dual-audio samples via Prep2Go shop mapping.",
    coverImage: "/covers/spanish-italian-paired-anki-deck.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "arabic-survival-phrases-anki-deck",
    title: "Arabic Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Arabic Survival Phrases",
    description: "300 Arabic survival phrase cards with audio and transliteration for travel and practical communication.",
    cards: "300",
    focus: "Arabic survival phrases",
    topics: "Arabic travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Arabic survival phrases in Anki.",
    coverImage: "/samples/prep2go-arabic-survival-phrases-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "japanese-survival-phrases-anki-deck",
    title: "Japanese Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Japanese Survival Phrases",
    description: "300 Japanese survival phrase cards with audio and transliteration for travel and practical communication.",
    cards: "300",
    focus: "Japanese survival phrases",
    topics: "Japanese travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Japanese survival phrases in Anki.",
    coverImage: "/samples/prep2go-japanese-survival-phrases-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "korean-survival-phrases-anki-deck",
    title: "Korean Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Korean Survival Phrases",
    description: "300 Korean survival phrase cards with audio and transliteration for travel and practical communication.",
    cards: "300",
    focus: "Korean survival phrases",
    topics: "Korean travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Korean survival phrases in Anki.",
    coverImage: "/samples/prep2go-korean-survival-phrases-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "russian-survival-phrases-anki-deck",
    title: "Russian Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Russian Survival Phrases",
    description: "300 Russian survival phrase cards with audio and transliteration for travel and practical communication.",
    cards: "300",
    focus: "Russian survival phrases",
    topics: "Russian travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Russian survival phrases in Anki.",
    coverImage: "/samples/prep2go-russian-survival-phrases-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ciple-a2-grammar-anki-deck",
    title: "CIPLE A2 Portuguese Grammar Anki Deck — 200 Cards",
    shortName: "CIPLE A2 Portuguese Grammar",
    description: "200 Portuguese A2 grammar cards for CIPLE, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    cards: "200",
    focus: "CIPLE A2 Portuguese grammar",
    topics: "Portuguese A2 grammar explanations, article examples, and CIPLE-focused recall prompts",
    audience: "CIPLE A2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-ciple-a2-grammar-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "dele-a2-grammar-anki-deck",
    title: "DELE A2 Spanish Grammar Anki Deck — 200 Cards",
    shortName: "DELE A2 Spanish Grammar",
    description: "200 Spanish A2 grammar cards for DELE, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    cards: "200",
    focus: "DELE A2 Spanish grammar",
    topics: "Spanish A2 grammar explanations, article examples, and DELE-focused recall prompts",
    audience: "DELE A2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-dele-a2-grammar-cover.webp",
    status: "planned",
  }),
  buildPrep2GoLanguageDeck({
    slug: "delf-b2-grammar-anki-deck",
    title: "DELF B2 French Grammar Anki Deck — 200 Cards",
    shortName: "DELF B2 French Grammar",
    description: "200 French B2 grammar cards for DELF, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    cards: "200",
    focus: "DELF B2 French grammar",
    topics: "French B2 grammar explanations, article examples, and DELF-focused recall prompts",
    audience: "DELF B2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-delf-b2-grammar-cover.webp",
    status: "planned",
  }),
];

const rawDecks: Deck[] = [
  {
    slug: "cfa-level-1-anki-deck",
    category: "finance",
    status: "available",
    title: "CFA Level 1 Anki Deck — 348 Smart Flashcards",
    shortName: "CFA Level 1",
    subtitle:
      "Focused 342-card CFA Level 1 Anki deck + free 60-question timed mock — not a 1,600-card dump.",
    directAnswer:
      "The best independent CFA Level 1 Anki stack on UniPrep2Go is a focused 348-card .apkg across all 10 topic weights, paired with a free 60-question timed readiness-check mock (topic scoring) and a printable 2026 formula reference PDF (250 formulas + 98 definitions + 80 recall drill). Delivered for {PRICE} through Gumroad. Built for daily spaced-repetition remediation after a mock — not a bloated mega-deck and not official CFA Institute material.",
    lastUpdated: "2026-09-29",
    audience: "CFA Level 1 candidates who want structured recall practice for formulas, concepts, and topic definitions.",
    format: ".apkg",
    coverImage: "/covers/cfa-level-1-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "348",
      topics: "10 CFA Level 1 topic areas",
      formulas: "Core formulas and definitions",
      examYear: "2026 preparation cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: cfaLevelOneTopics,
    sampleCards: [
      {
        question: "An option-free bond has annual modified duration 7.2 and annual convexity 64. If its yield rises by 100 bps, what is the estimated percentage price change?",
        answer:
          "About −6.88%. The duration term gives −7.2 × 0.01 = −7.20%, and the convexity term adds ½ × 64 × 0.01² = +0.32%. For an option-free bond the convexity term is always positive, so the price falls less (and rises more) than duration alone predicts.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-1.webp",
      },
      {
        question: "A US GAAP firm on LIFO reports inventory of $800k and COGS of $3,000k; its LIFO reserve rose from $150k to $200k as prices rose. What are FIFO inventory and FIFO COGS?",
        answer:
          "FIFO inventory = $1,000k (LIFO inventory + ending reserve) and FIFO COGS = $2,950k (LIFO COGS − increase in the reserve). With rising prices LIFO expenses the newest, costliest units, so FIFO shows higher inventory, lower COGS and higher profit.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-2.webp",
      },
      {
        question: "A non-dividend stock trades at $52. A 1-year European call with a $50 strike costs $6.00 and the risk-free rate is 5%. What is the no-arbitrage price of the matching European put?",
        answer:
          "About $1.62. Put-call parity: fiduciary call (call + PV of strike) = protective put (put + stock), so P = C + X/(1 + r)^T − S. If the put trades above $1.62, sell it and buy the synthetic put: long call, short stock, lend PV of the strike.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the best CFA Level 1 Anki deck for 2026?",
        answer:
          "Prefer a focused ~342-card deck mapped to all 10 CFA Level 1 topic weights plus a free timed mock and printable formula sheet — not a 1,000+ card dump. UniPrep2Go’s CFA Level 1 Anki deck ships that stack: .apkg + free 60-question readiness check + optional 2026 formula PDF.",
      },
      {
        question: "What is included in the CFA Level 1 Anki deck?",
        answer:
          "348 Anki flashcards covering CFA Level 1 concepts, formulas, and definitions across all 10 topic areas, with a linked free 60-question timed mock and a matching printable formula reference PDF.",
      },
      {
        question: "Is there a free CFA Level 1 practice test with this deck?",
        answer:
          "Yes. Take the free 60-question CFA Level 1 readiness check at uniprep2go.study/mock-exams/cfa-level-1-readiness-check — topic scoring and full answer review, then drill weak areas in this Anki deck.",
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
        question: "Does the deck replace the CFA curriculum?",
        answer: "No. It is a supplementary recall tool and should be used alongside the official curriculum and practice questions.",
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
        deck: "348 Anki flashcards (.apkg) using spaced repetition.",
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
    slug: "cfa-level-1-formula-reference-2026",
    category: "finance",
    status: "available",
    title:
      "CFA Level 1 Formula Reference 2026 — 250 Formulas + 98 Definitions + 80-Question Drill (PDF)",
    shortName: "CFA Level 1 Formula Reference",
    subtitle:
      "54-page printable formula quick reference for the 2026 cycle — 250 typeset formulas, 98 key definitions, and an 80-question recall drill.",
    directAnswer:
      "For CFA Level 1 formula retrieval in 2026, UniPrep2Go’s Formula & Definitions Quick Reference is a 54-page printable PDF: 250 typeset formulas + 98 examiner-style definitions across all 10 topics, an 80-question recall drill with explained answers, and a clickable TOC — same validated bank as the 348-card Anki deck and free 60-question timed mock. Delivered for {PRICE} through Gumroad. Printable recall companion — not a free one-page cheat sheet dump and not CFA Institute curriculum.",
    lastUpdated: "2026-09-29",
    audience:
      "CFA Level 1 candidates who need fast formula retrieval under exam timing — print the reference, run the recall drill, and pair with spaced-repetition review on the companion Anki deck.",
    format: "PDF",
    coverImage: "/covers/cfa-level-1-formula-reference-2026.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/cfa-level-1-formula-reference-2026?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "54 pages + 80 recall questions",
      topics:
        "250 CFA Level 1 formulas and 98 key definitions across Quant, Economics, FSA, Corporate Issuers, Equity, Fixed Income, Derivatives, Alternatives, Portfolio Management, and Ethics & GIPS",
      formulas:
        "Typeset formula tables by topic, one-line plain-English meanings, and 80-question formula-recall drill with explanations",
      examYear: "2026 CFA Level 1 preparation cycle",
      delivery: "Printable PDF digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Quantitative Methods", examWeight: "65 entries", cards: "TVM, statistics, regression — typeset with one-line meanings" },
      { name: "Economics", examWeight: "36 entries", cards: "Micro, macro, and currency parity relationships" },
      { name: "Financial Statement Analysis", examWeight: "44 entries", cards: "Ratios, cash flow linkages, inventory methods" },
      { name: "Corporate Issuers", examWeight: "14 entries", cards: "Capital structure and governance metrics" },
      { name: "Equity Investments", examWeight: "23 entries", cards: "Multiples, DDM, and index construction" },
      { name: "Fixed Income", examWeight: "51 entries", cards: "Duration, convexity, yields, and pricing" },
      { name: "Derivatives", examWeight: "49 entries", cards: "Forwards, futures, options, and swaps" },
      { name: "Alternative Investments", examWeight: "11 entries", cards: "Core alternatives metrics" },
      { name: "Portfolio Management", examWeight: "27 entries", cards: "CAPM, Sharpe, and portfolio risk/return" },
      { name: "Ethics & GIPS", examWeight: "28 entries", cards: "Key ethics and GIPS definitions" },
      { name: "Formula Recall Drill", examWeight: "80 questions", cards: "See the formula, name the concept — explained answer key" },
    ],
    sampleCards: [
      {
        question: "Quantitative Methods formula table — typeset math at a glance",
        answer:
          "Each row shows concept, typeset formula, and a one-line plain-English meaning — the fastest pre-exam scan for TVM and statistics families Level 1 repeats.",
        imageUrl: "/samples/cfa-level-1-formula-reference-2026-sample-1.webp",
      },
      {
        question: "Formula Recall Drill — see the formula, name the concept",
        answer:
          "80 questions with same-topic distractors test whether you can retrieve the concept behind a displayed formula under exam timing.",
        imageUrl: "/samples/cfa-level-1-formula-reference-2026-sample-2.webp",
      },
      {
        question: "Drill question with full explanation in the answer key",
        answer:
          "Every recall question includes why the correct concept matches the formula and why tempting distractors fail — mapped to the validated item bank.",
        imageUrl: "/samples/cfa-level-1-formula-reference-2026-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the CFA Level 1 Formula Reference include?",
        answer:
          "A 54-page printable PDF with 250 formulas and 98 key definitions across 10 Level 1 topic areas, an 80-question Formula Recall Drill with explained answer key, and a clickable table of contents.",
      },
      {
        question: "Is this a CFA study course or curriculum replacement?",
        answer:
          "No. This is a recall companion — it helps you retrieve formulas you already studied. It does not teach the curriculum and should be paired with official CFA Institute materials and full-length practice exams.",
      },
      {
        question: "Does this pair with the CFA Level 1 Anki deck?",
        answer:
          "Yes. The PDF and 348-card Anki deck share the same validated item bank. Use the reference for printable formula tables and the recall drill; use Anki for daily spaced-repetition on your phone.",
      },
      {
        question: "Is there a free practice test?",
        answer:
          "Yes. Take the free 60-question CFA Level 1 readiness check at uniprep2go.study/mock-exams/cfa-level-1-readiness-check — it scores topic gaps and links back to this deck.",
      },
      {
        question: "Is this official CFA Institute material?",
        answer:
          "No. This is an independent educational product. CFA Institute does not endorse, promote, or warrant the accuracy or quality of this product.",
      },
      {
        question: "How should I use it before exam day?",
        answer:
          "Print or bookmark weak topic tables, run the 80-question recall drill under timed conditions, review every explanation, then drill matching cards in the companion Anki deck on missed topics.",
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
    slug: "frm-part-1-anki-deck",
    category: "finance",
    status: "available",
    title: "FRM Part 1 Anki Deck — 444 Exam Flashcards",
    shortName: "FRM Part 1",
    subtitle: "444 FRM Part 1 Anki cards + free 50-question timed practice test — VaR, ES, Greeks, credit risk.",
    directAnswer:
      "The strongest independent FRM Part 1 Anki answer on UniPrep2Go is a 444-card .apkg weighted like the exam (20% foundations, 20% quant, 30% markets and products, 30% valuation and risk models) — VaR, Expected Shortfall, credit and operational risk, derivatives, fixed income, and Greeks. Every card pairs the rule with a worked example and the common mistake, plus a free 50-question timed readiness-check mock with topic scoring. Delivered for {PRICE} through Gumroad. Not affiliated with or endorsed by GARP.",
    lastUpdated: "2026-10-02",
    audience: "FRM Part 1 candidates who want active recall practice for formulas, concepts, definitions, and risk-management logic.",
    format: ".apkg",
    coverImage: "/covers/frm-part-1-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "444",
      topics: "All four FRM Part 1 books, weighted 20/20/30/30 like the exam, across 62 reading-level sections",
      formulas: "Every card: question, explanation, worked example, and common mistake; 176 MathJax formula cards",
      examYear: "Current FRM Part 1 cycle",
      delivery: "Digital download through Gumroad (460 KB)",
    },
    topicCoverage: [
      { name: "Foundations of Risk Management", examWeight: "20% of Part I", cards: "89" },
      { name: "Quantitative Analysis", examWeight: "20% of Part I", cards: "89" },
      { name: "Financial Markets and Products", examWeight: "30% of Part I", cards: "133" },
      { name: "Valuation and Risk Models", examWeight: "30% of Part I", cards: "133" },
    ],
    sampleCards: [
      {
        question: "How are the single monthly mortality rate and the conditional prepayment rate related?",
        answer:
          "The SMM is the share of remaining principal prepaid in a month. The CPR is its annualized equivalent. They are linked by compounding survival over 12 months.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-1.webp",
      },
      {
        question: "How does default correlation affect a two-loan portfolio's unexpected loss?",
        answer:
          "Portfolio UL combines each loan's UL with the correlation between their losses. With low correlation, portfolio UL is much less than the sum of individual ULs; with correlation of 1, they add.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-2.webp",
      },
      {
        question: "How are the OLS slope and intercept estimated in a simple regression?",
        answer:
          "The OLS slope equals the sample covariance of X and Y divided by the sample variance of X; the intercept makes the line pass through the means. OLS minimizes the sum of squared residuals.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the best FRM Part 1 Anki deck?",
        answer:
          "Look for a Part 1–scoped deck with VaR/ES, Greeks, credit risk, and markets cards plus a free timed practice test for topic gaps. UniPrep2Go’s FRM Part 1 Anki deck is 444 cards with a linked free 50-question readiness check.",
      },
      {
        question: "What does the FRM Part 1 deck include?",
        answer:
          "444 Anki cards across all four Part 1 books (89 foundations, 89 quant, 133 markets and products, 133 valuation and risk models). Each card asks a real exam question, explains the rule, works a numeric example where it applies, and names the common mistake; 176 cards carry MathJax formulas. Plus a free 50-question timed mock.",
      },
      {
        question: "Is there a free FRM Part 1 practice test?",
        answer:
          "Yes. Take the free 50-question FRM Part 1 readiness check at uniprep2go.study/mock-exams/frm-part-1-readiness-check, then drill weak topics in this Anki deck.",
      },
      {
        question: "Is this a question bank?",
        answer: "No. It is a spaced-repetition study deck designed to help you remember formulas, concepts, definitions, and risk-management logic efficiently.",
      },
      {
        question: "Does it support formulas?",
        answer: "Yes. Formula cards use MathJax so equations remain sharp and readable in Anki.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this affiliated with GARP?",
        answer: "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by GARP. FRM is a trademark of the Global Association of Risk Professionals.",
      },
    ],
  },
  {
    slug: "sie-exam-anki-deck",
    category: "finance",
    status: "available",
    title: "SIE Exam Anki Deck — 300 High-Yield Flashcards",
    shortName: "SIE Exam",
    subtitle: "A focused Anki deck for FINRA SIE exam active recall.",
    directAnswer:
      "UniPrep2Go sells an independent SIE Exam Anki deck with 300 high-yield cards covering FINRA's official topic weights: capital markets, products and risks, trading, customer accounts, prohibited activities, and regulatory framework. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for SIE candidates and is not official FINRA material.",
    lastUpdated: "2026-09-29",
    audience: "SIE exam candidates, finance interns, new hires, and career changers who want active-recall practice instead of passive rereading.",
    format: ".apkg",
    coverImage: "/covers/sie-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/qjocr?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics: "FINRA SIE topic weights: capital markets, products and risks, trading, accounts, prohibited activities, and regulation",
      formulas: "Concept explanations, exam traps, and MathJax support where needed",
      examYear: "Current SIE exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Knowledge of Capital Markets", examWeight: "16% of exam (12 items)", cards: "48" },
      { name: "Products and Their Risks", examWeight: "44% of exam (33 items)", cards: "132" },
      {
        name: "Trading, Customer Accounts, and Prohibited Activities",
        examWeight: "31% of exam (23 items)",
        cards: "93",
      },
      { name: "Regulatory Framework", examWeight: "9% of exam (7 items)", cards: "27" },
    ],
    sampleCards: [
      {
        question: "How do you find the conversion ratio and parity price of a convertible bond?",
        answer:
          "Conversion ratio = par value / conversion price. Parity stock price = bond market price / conversion ratio; at parity, converting neither gains nor loses value.",
        imageUrl: "/samples/sie-exam-anki-deck-sample-1.webp",
      },
      {
        question: "How does the Securities Exchange Act of 1934 differ from the 1933 Act?",
        answer:
          "The 1934 Act created the SEC and regulates the secondary market: exchanges, broker-dealers, trading practices, insider trading, margin credit, and ongoing issuer reporting.",
        imageUrl: "/samples/sie-exam-anki-deck-sample-2.webp",
      },
      {
        question: "When must a firm file a Currency Transaction Report?",
        answer:
          "A CTR is filed for cash transactions over $10,000 in one business day, including multiple cash deposits that add up to more than $10,000.",
        imageUrl: "/samples/sie-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the SIE Exam deck include?",
        answer: "300 Anki flashcards covering the core FINRA SIE areas: capital markets, products and risks, trading, customer accounts, prohibited activities, and regulatory framework.",
      },
      {
        question: "Who is this deck for?",
        answer: "It is for students preparing for the SIE, career changers entering finance, interns, and new hires who want spaced-repetition review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official FINRA material?",
        answer: "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by FINRA.",
      },
      {
        question: "Does the deck replace practice questions?",
        answer: "No. It is a supplementary recall tool for concepts, definitions, and common traps. Use it alongside a full SIE study plan and practice questions.",
      },
    ],
  },
  {
    slug: "series-7-anki-deck",
    category: "finance",
    status: "available",
    title: "Series 7 Anki Deck — 300 High-Yield Flashcards",
    shortName: "Series 7",
    subtitle: "A focused Anki deck for FINRA Series 7 Top-Off active recall.",
    directAnswer:
      "UniPrep2Go sells an independent Series 7 Anki deck with 300 high-yield cards covering FINRA's Series 7 job-function outline: seeking business, opening accounts, investment products, recommendations, suitability, records, order handling, confirmations, settlement, and trade processing. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. Pair it with the free 60-question / 90-minute Series 7 readiness check (official Top-Off is 125 scored + 5 pretest / 3h45 / passing score 72 equated). Every card pairs the rule with a worked example and a common-mistake note, and the 300 cards follow FINRA's 7/9/73/11% job-function weights. The deck is a supplementary active-recall study aid for Series 7 candidates and is not official FINRA material.",
    lastUpdated: "2026-10-02",
    audience: "Series 7 candidates sponsored by a FINRA member firm, new financial advisors, registered representative trainees, and SIE passers who want focused spaced-repetition review.",
    format: ".apkg",
    coverImage: "/covers/series-7-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lvzval?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics: "FINRA Series 7 job functions: communications, account opening, products, recommendations, suitability, records, order handling, settlement, and trade processing",
      formulas: "Worked example and common-mistake note on every card; 50 formula cards (bond yields, options strategies, margin, financial ratios) rendered with MathJax",
      examYear: "Current Series 7 Top-Off exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Seeking Business and Communications", examWeight: "7% of exam (9 items)", cards: "21" },
      { name: "Opening Customer Accounts", examWeight: "9% of exam (11 items)", cards: "27" },
      {
        name: "Investment Products, Recommendations, Suitability, and Records",
        examWeight: "73% of exam (91 items)",
        cards: "219",
      },
      {
        name: "Order Handling, Confirmations, Settlement, and Trade Processing",
        examWeight: "11% of exam (14 items)",
        cards: "33",
      },
    ],
    sampleCards: [
      {
        question: "How do defined benefit and defined contribution plans differ?",
        answer:
          "Defined benefit promises a set retirement benefit and the employer bears the investment risk. Defined contribution sets contributions, and the employee bears investment risk.",
        imageUrl: "/samples/series-7-anki-deck-sample-1.webp",
      },
      {
        question: "When must retail communications about registered investment companies be filed with FINRA?",
        answer:
          "Retail communications about mutual funds, ETFs, UITs, and variable products that were not previously filed must be filed within 10 business days after first use.",
        imageUrl: "/samples/series-7-anki-deck-sample-2.webp",
      },
      {
        question: "How do all-or-none, fill-or-kill, and immediate-or-cancel orders differ?",
        answer:
          "AON: fill the whole order or nothing, but not necessarily immediately. FOK: fill the whole order immediately or cancel it. IOC: fill immediately whatever is possible and cancel the rest.",
        imageUrl: "/samples/series-7-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Series 7 deck include?",
        answer: "300 high-yield Anki cards covering FINRA Series 7 Top-Off topics including suitability, products, options, bonds, customer accounts, order handling, settlement, and communications. Each card has a question-style front, a rule-level answer, a worked example, and a common-mistake note; 50 cards carry formulas.",
      },
      {
        question: "Who is this deck for?",
        answer: "It is for Series 7 candidates sponsored by a FINRA member firm, new financial advisors, registered representative trainees, and people who already passed the SIE.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official FINRA material?",
        answer: "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by FINRA.",
      },
      {
        question: "Is there a free Series 7 practice test?",
        answer:
          "Yes. UniPrep2Go hosts a free 60-question / 90-minute Series 7 readiness check with job-function scoring at /mock-exams/series-7-readiness-check. Official FINRA Series 7 is 125 scored + 5 pretest / 3 hours 45 minutes / passing score 72 (equated) — our mock is a shorter diagnostic before you drill this 300-card deck.",
      },
      {
        question: "Does the deck replace Series 7 practice questions?",
        answer: "No. It is a supplementary recall tool for products, suitability rules, definitions, formulas, and exam traps. Use it alongside a full Series 7 course and practice questions.",
      },
    ],
  },
  {
    slug: "series-63-anki-deck",
    category: "finance",
    status: "available",
    title: "Series 63 Flashcards — 250 High-Yield NASAA Cards + Free Timed Mock",
    shortName: "Series 63",
    subtitle:
      "Series 63 flashcards: 250 NASAA Anki cards + free 60-question timed practice test — registration, ethics, communications.",
    directAnswer:
      "UniPrep2Go sells Series 63 flashcards as a 250-card Anki deck for NASAA state securities law — broker-dealer regulation, agent registration, ethics, customer communications, securities exemptions, investment adviser basics, and remedies — plus a 60-question timed Series 63 practice test (first mock free, no signup) in NASAA's exact scored area mix, with topic readiness scoring. The official exam is 65 questions (60 scored + 5 pretest) in 75 minutes; passing is 43 of 60 scored. Card counts follow NASAA's weights (ethics 63, communications 50, agents 33, broker-dealers 30, remedies 28), and every card has a worked example and a common-mistake note. Delivered as an Anki .apkg for {PRICE} through Gumroad. Independent study aid — not official NASAA or FINRA material.",
    lastUpdated: "2026-10-02",
    audience:
      "Series 63 candidates searching for flashcards, new broker-dealer agents, and SIE/Series 7 passers who need state registration via spaced repetition plus a free timed mock.",
    format: ".apkg",
    coverImage: "/covers/series-63-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/vsbsgw?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "250",
      topics:
        "NASAA Series 63 structure: broker-dealer regulation, agent registration, ethics, communications, securities and exemptions, investment advisers, and remedies",
      formulas: "Worked example and common-mistake note on every card; question-style fronts written to NASAA's Uniform Securities Act outline",
      examYear: "Current Series 63 exam cycle (NASAA content outline effective June 2023)",
      delivery: "Digital download through Gumroad (188 KB)",
    },
    topicCoverage: [
      { name: "Ethical Practices and Obligations", examWeight: "25% of exam (15 scored items)", cards: "63" },
      { name: "Communications with Customers and Prospects", examWeight: "20% of exam (12 scored items)", cards: "50" },
      { name: "Broker-Dealer Agents", examWeight: "13% of exam (8 scored items)", cards: "33" },
      { name: "Broker-Dealers", examWeight: "12% of exam (7 scored items)", cards: "30" },
      { name: "Remedies and Administrative Provisions", examWeight: "11% of exam (7 scored items)", cards: "28" },
      { name: "Securities, Issuers, Exemptions, and Transactions", examWeight: "9% of exam (5 scored items)", cards: "22" },
      { name: "Investment Advisers", examWeight: "5% of exam (3 scored items)", cards: "12" },
      { name: "Investment Adviser Representatives", examWeight: "5% of exam (3 scored items)", cards: "12" },
    ],
    sampleCards: [
      {
        question: "When must Form CRS be updated and existing clients informed?",
        answer:
          "Within 30 days after information becomes materially inaccurate, and the changes must be communicated to existing retail investors within 60 days after the update is required.",
        imageUrl: "/samples/series-63-anki-deck-sample-1.webp",
      },
      {
        question: "When can a person avoid imprisonment for violating a rule or order?",
        answer:
          "A person cannot be imprisoned for violating a rule or order if they prove they had no knowledge of it. Fines may still apply, and the defense does not cover violations of the Act itself.",
        imageUrl: "/samples/series-63-anki-deck-sample-2.webp",
      },
      {
        question: "When does an investment adviser not need to register in a state?",
        answer:
          "When it has no place of business in the state and, during the preceding 12 months, had five or fewer noninstitutional clients who are residents there. Advisers to only institutional clients are also excluded.",
        imageUrl: "/samples/series-63-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Where can I get Series 63 flashcards?",
        answer:
          "UniPrep2Go’s Series 63 Anki deck is 250 high-yield flashcards covering NASAA state-law topics — broker-dealer regulation, agent registration, ethics, communications, securities and exemptions, investment advisers, and remedies — delivered as an .apkg for spaced repetition on phone or desktop.",
      },
      {
        question: "Is there a free Series 63 practice test with these flashcards?",
        answer:
          "Yes. Take the 60-question timed Series 63 readiness check on UniPrep2Go — your first mock is free, no signup — for a topic readiness report, then drill only the weak flashcard topics in this deck between sittings.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for Series 63 candidates who want flashcards after SIE or Series 7, new broker-dealer agents, and anyone who needs state registration via spaced repetition plus a free timed mock.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official NASAA material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by NASAA.",
      },
      {
        question: "Do Series 63 flashcards replace a full Q-bank?",
        answer:
          "No. Flashcards are a supplementary recall tool for rules, definitions, and common exam traps. Use them alongside a full Series 63 course and practice questions — ideally after a timed readiness check shows which topics to filter.",
      },
    ],
  },
  {
    slug: "california-real-estate-exam-anki-deck",
    category: "finance",
    status: "available",
    title: "California Real Estate Exam Anki Deck — 250 High-Yield Flashcards",
    shortName: "California Real Estate",
    subtitle:
      "250 California DRE salesperson Anki cards + free 60-question CA practice test — agency, disclosures, math.",
    directAnswer:
      "For California DRE salesperson exam prep, UniPrep2Go’s California Real Estate Anki deck is 250 high-yield cards on property ownership, agency and fiduciary duties, valuation, financing, transfer, mandated disclosures, contracts, and real estate math — plus a free 60-question timed California practice test with topic scoring. Delivered as an Anki .apkg for {PRICE} through Gumroad. State-specific California content, not a national deck relabeled, and not official DRE material.",
    lastUpdated: "2026-09-29",
    audience:
      "California real estate salesperson exam candidates, career changers entering real estate, pre-licensing students, and candidates who want active recall for agency, disclosures, contracts, and real estate math.",
    format: ".apkg",
    coverImage: "/covers/california-real-estate-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/qqrwpk?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "250",
      topics:
        "California DRE salesperson exam structure: property ownership, agency, valuation, financing, transfer, disclosures, and contracts",
      formulas: "Clear explanations, common exam traps, and formula support for real estate math",
      examYear: "Current California DRE salesperson exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Property Ownership and Land Use Controls", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Laws of Agency and Fiduciary Duties", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Property Valuation and Financial Analysis", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Financing", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Transfer of Property", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Practice of Real Estate and Mandated Disclosures", examWeight: "California DRE topic", cards: "High-yield cards" },
      { name: "Contracts", examWeight: "California DRE topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "A listing agent meets a Fresno homeowner to sign a listing; weeks later a buyer's agent writes an offer. When must each agent deliver the agency relationship disclosure form?",
        answer:
          "The listing agent gives it to the seller before the listing agreement is signed. The buyer's agent gives it to the buyer as soon as practicable before the buyer signs the offer, and to the seller before the offer is presented. The agency relationships are then confirmed in the purchase contract or a separate writing.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-1.webp",
      },
      {
        question: "A Sacramento seller hands the buyer the Transfer Disclosure Statement two days after the buyer's offer was accepted. The house is sold 'as-is.' What right does the buyer have?",
        answer:
          "Because the TDS arrived after the offer was signed, the buyer may terminate by written notice within 3 days of in-person delivery (5 days if it is mailed). Sellers of 1-4 residential units must deliver the TDS as soon as practicable before title transfers, and an 'as-is' sale does not waive it.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-2.webp",
      },
      {
        question: "Lena buys a Los Angeles condo for $800,000 in 2025. Ignoring voter-approved bonds and assessments, what is her basic property tax, and the most her assessed value can be the next year?",
        answer:
          "Her basic tax is $8,000: Proposition 13 caps the general levy at 1% of assessed value, and a change in ownership resets the base-year value to the $800,000 purchase price. After that, assessed value can rise at most 2% a year (less if inflation is lower), so next year's cap is $816,000 even if the market jumps.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the best California real estate exam Anki deck?",
        answer:
          "Choose a California DRE–specific deck (agency, disclosures, contracts, financing math) with a free timed CA practice test — not a generic national flashcard pack. UniPrep2Go’s California Real Estate Anki deck is 250 cards plus a free 60-question readiness check.",
      },
      {
        question: "What does the California Real Estate deck include?",
        answer:
          "250 high-yield Anki cards covering California DRE salesperson exam topics including property ownership, agency, valuation, financing, transfer, disclosures, contracts, and real estate math, plus a free 60-question California practice test.",
      },
      {
        question: "Is there a free California real estate practice test?",
        answer:
          "Yes. Take the free 60-question California real estate readiness check at uniprep2go.study/mock-exams/california-real-estate-readiness-check, then drill weak topics in this Anki deck.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for California real estate salesperson exam candidates, career changers, pre-licensing students, and candidates who want spaced repetition for agency, disclosures, contracts, and math.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official California DRE material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by the California Department of Real Estate.",
      },
      {
        question: "Does the deck replace California real estate practice exams?",
        answer:
          "No. It is a supplementary recall tool for rules, concepts, and common exam traps. Use it alongside a full pre-licensing course and practice questions.",
      },
    ],
  },
  {
    slug: "life-and-health-insurance-exam-anki-deck",
    category: "finance",
    status: "available",
    title: "Life & Health Insurance Exam Anki Deck — 250 High-Yield Flashcards",
    shortName: "Life & Health Insurance",
    subtitle:
      "250 Life & Health insurance flashcards + free 60-question timed practice test — provisions, annuities, Medicare.",
    directAnswer:
      "UniPrep2Go sells an independent Life & Health Insurance Exam Anki deck with 250 high-yield cards covering national core topics tested across Life & Health insurance producer exams: general insurance principles, life insurance policy types, policy provisions and riders, annuities, health insurance plans and cost-sharing, disability income and long-term care, Medicare basics, and tax treatment, replacement, ethics, and producer responsibilities — plus a 60-question timed Life & Health readiness check (first mock free, no signup). Delivered as an Anki .apkg file for {PRICE} through Gumroad. Supplementary active-recall study aid — not official state exam material.",
    lastUpdated: "2026-09-21",
    audience:
      "Life & Health insurance license candidates, new insurance producers, career changers entering insurance sales, pre-licensing students, and candidates who want active recall for policy provisions, riders, annuities, health plans, and insurance terminology.",
    format: ".apkg",
    coverImage: "/covers/life-and-health-insurance-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/jcrljf?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "250",
      topics:
        "Life & Health insurance producer exam core topics: general principles, life policies, provisions and riders, annuities, health plans, disability and LTC, Medicare, tax, replacement, ethics, and producer duties",
      formulas: "Clear explanations, common exam traps, and formula support where needed",
      examYear: "Current Life & Health insurance producer exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "General Insurance Principles", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Life Insurance Policy Types", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Policy Provisions, Options, and Riders", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Annuities", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Health Insurance Plans and Cost-Sharing", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Disability Income and Long-Term Care", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Medicare Basics", examWeight: "Life & Health topic", cards: "High-yield cards" },
      { name: "Tax Treatment, Replacement, Ethics, and Producer Responsibilities", examWeight: "Life & Health topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "Dana bought a $250,000 life policy without disclosing that she smoked. She dies in a car crash 26 months after issue. Can the insurer deny the claim because of the misstatement?",
        answer:
          "No, in most states. Once the policy has been in force for the contestable period, typically 2 years during the insured's lifetime, the incontestability clause bars the insurer from voiding it for misstatements on the application. The full $250,000 is payable, and the cause of death does not matter.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-1.webp",
      },
      {
        question: "Raj's nonqualified deferred annuity holds $60,000 of after-tax premiums and is worth $90,000. At age 52 he withdraws $40,000. How much is taxable, and is there a penalty?",
        answer:
          "$30,000 is taxable as ordinary income and $10,000 is a tax-free return of basis. Withdrawals from a nonqualified deferred annuity are taxed LIFO: earnings come out first. Because Raj is under 59½, the taxable $30,000 also faces the 10% federal penalty, which is $3,000.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-2.webp",
      },
      {
        question: "Mia, 8, is covered under both her married parents' employer health plans. Mom was born March 10, 1990; Dad was born July 2, 1985. Which plan pays first on Mia's $2,000 claim?",
        answer:
          "Mom's plan is primary under the birthday rule: for a dependent child of parents who are married or living together, the plan of the parent whose birthday comes earlier in the calendar year pays first. Dad's plan pays second, up to its own benefit, so combined payments never exceed the $2,000 allowable expense.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Life & Health Insurance deck include?",
        answer:
          "250 high-yield Anki cards covering Life & Health insurance producer exam topics including general principles, life policies, provisions and riders, annuities, health plans, disability and LTC, Medicare, tax, replacement, ethics, and producer responsibilities.",
      },
      {
        question: "Is there a free Life & Health insurance practice test?",
        answer:
          "Yes. Take the 60-question timed Life & Health readiness check on UniPrep2Go — your first mock is free, no signup — then drill weak topics with this Anki deck between sittings.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for Life & Health insurance license candidates, new insurance producers, career changers, pre-licensing students, and candidates who want spaced repetition for policy provisions, riders, annuities, and health plan terminology.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official state insurance exam material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by any state insurance department or exam provider.",
      },
      {
        question: "Does the deck replace Life & Health insurance practice exams?",
        answer:
          "No. It is a supplementary recall tool for rules, concepts, and common exam traps. Use it alongside a full pre-licensing course and practice questions.",
      },
    ],
  },
  {
    slug: "property-casualty-insurance-exam-anki-deck",
    category: "finance",
    status: "available",
    title: "Property & Casualty Insurance Exam Anki Deck — 250 High-Yield Flashcards",
    shortName: "Property & Casualty Insurance",
    subtitle:
      "A focused Anki deck for U.S. Property & Casualty insurance licensing exam active recall.",
    directAnswer:
      "UniPrep2Go sells an independent Property & Casualty Insurance Exam Anki deck with 250 high-yield cards covering national core topics tested across U.S. P&C licensing exams: property insurance basics, homeowners and dwelling policies, personal auto, commercial property, business owners policy, commercial general liability, workers compensation, policy structure, exclusions, claims, and key regulation concepts. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for P&C insurance licensing candidates and is not official state exam material.",
    lastUpdated: "2026-09-21",
    audience:
      "Property & Casualty insurance license candidates, new insurance producers, career changers entering insurance sales, pre-licensing students, and candidates who want active recall for homeowners, auto, commercial lines, and policy provisions.",
    format: ".apkg",
    coverImage: "/covers/property-casualty-insurance-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/engqgt?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "250",
      topics:
        "U.S. P&C licensing core topics: property basics, homeowners, dwelling, personal auto, commercial property, BOP, CGL, workers comp, policy structure, exclusions, claims, and regulation",
      formulas: "Clear explanations, common exam traps, and examples on every card",
      examYear: "Current U.S. Property & Casualty insurance licensing exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Property Insurance Basics", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Homeowners and Dwelling Policies", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Personal Auto", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Commercial Property", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Business Owners Policy (BOP)", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Commercial General Liability", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Workers Compensation", examWeight: "P&C topic", cards: "High-yield cards" },
      { name: "Policy Structure, Exclusions, Claims, and Regulation", examWeight: "P&C topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "A building worth $500,000 is insured for $300,000 with an 80% coinsurance clause and a $1,000 deductible. A fire causes a $100,000 partial loss. How much does the insurer pay?",
        answer:
          "$74,000. Required insurance is 80% × $500,000 = $400,000. The owner carried only $300,000, so the insurer pays $300,000 ÷ $400,000 = 75% of the loss: 75% × $100,000 = $75,000, minus the $1,000 deductible. The owner absorbs the other $26,000 as the coinsurance penalty.",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-1.webp",
      },
      {
        question: "Under an HO-3, a homeowner knocks over a can of paint while redecorating. It ruins the wall-to-wall carpet and a leather sofa. Which damage is covered?",
        answer:
          "Only the carpet. Wall-to-wall carpet is part of the dwelling (Coverage A), which HO-3 insures on an open-perils basis: any direct physical loss is covered unless excluded, and an accidental spill is not excluded. The sofa is personal property (Coverage C), covered only for named broad-form perils, and a paint spill is not one of them.",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-2.webp",
      },
      {
        question: "Sam carries 25/50/25 auto liability. He causes a crash: driver A has $40,000 of injuries, driver B $15,000, and A's car needs $30,000 of repairs. What does Sam's insurer pay?",
        answer:
          "$65,000. Bodily injury: A is capped at the $25,000 per-person limit and B's $15,000 is paid in full, a $40,000 total within the $50,000 per-accident limit. Property damage: $25,000 of the $30,000. Sam is personally exposed for the remaining $20,000 ($15,000 + $5,000).",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Property & Casualty Insurance deck include?",
        answer:
          "250 high-yield Anki cards covering U.S. P&C licensing topics including property basics, homeowners, auto, commercial property, BOP, CGL, workers comp, policy structure, exclusions, claims, and regulation.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for Property & Casualty insurance license candidates, new insurance producers, career changers, pre-licensing students, and candidates who want spaced repetition for homeowners, auto, commercial lines, and policy provisions.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official state insurance exam material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by any state insurance department or exam provider.",
      },
      {
        question: "Does the deck replace P&C insurance practice exams?",
        answer:
          "No. It is a supplementary recall tool for rules, concepts, and common exam traps. Use it alongside a full pre-licensing course and practice questions.",
      },
    ],
  },
  {
    slug: "cfa-level-2-anki-deck",
    category: "finance",
    status: "available",
    title: "CFA Level 2 Anki Deck — 495 Flashcards",
    shortName: "CFA Level 2",
    subtitle: "A vignette-depth Anki deck for CFA Level 2 item sets — not a Level 1 leftover dump.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 2 Anki deck with 495 flashcards covering all 10 CFA Level 2 topics (2026 weights 5–15%), including FSA adjustments, equity and fixed income valuation, portfolio management, derivatives, and ethics application. Official Level 2 is 88 item-set questions in 22 vignettes over two 132-minute sessions (4h24); this product pairs with a free 60-question / 120-minute diagnostic, not a CFA Institute mock. Delivered as an Anki .apkg for {PRICE} through Gumroad. Supplementary spaced-repetition aid — not official CFA Institute curriculum.",
    lastUpdated: "2026-10-04",
    audience: "CFA Level 2 candidates who want structured recall practice for vignette-depth formulas, concepts, and application-level definitions.",
    format: ".apkg",
    coverImage: "/covers/cfa-level-2-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/cfa-level-2-anki?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "495",
      topics: "10 CFA Level 2 topic areas",
      formulas: "MathJax formulas, examples, and common exam mistakes",
      examYear: "2026 preparation cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: cfaLevelTwoTopics,
    sampleCards: [
      {
        question: "How do you value a 2-year 3% annual-pay bond on a tree with r₀ = 2% and year-1 rates of 3.375% and 2.5%?",
        answer:
          "Use backward induction: at each node, value = average of the two next-period values plus the coupon, discounted at that node's one-period rate. Start at maturity (100 + coupon) and step back one period at a time. Year-1 values are 99.64 (upper) and 100.49 (lower); today's value is about 101.04. Embedded options are handled by adjusting node values (min for calls, max for puts) in the same pass.",
        imageUrl: "/samples/cfa-level-2-anki-deck-sample-1.webp",
      },
      {
        question: "How do you apply both a DLOC and a DLOM to value a minority stake in a private company?",
        answer:
          "Apply them multiplicatively and in sequence: start from the controlling, marketable value, apply DLOC to get a minority marketable value, then DLOM to reflect that the shares cannot be sold quickly. Total discount = 1 − (1 − DLOC)(1 − DLOM). The discounts are not additive. Apply DLOC only if the base value is on a controlling basis.",
        imageUrl: "/samples/cfa-level-2-anki-deck-sample-2.webp",
      },
      {
        question: "How does standardized unexpected earnings work as a momentum indicator, and why scale the surprise?",
        answer:
          "SUE = (reported EPS − expected EPS) / standard deviation of past forecast errors. Scaling makes surprises comparable across firms: a $0.10 surprise is large for a stable firm but noise for a volatile one. High positive SUE has been associated with continued positive drift. Related momentum indicators: earnings surprise vs consensus and relative strength (price vs index).",
        imageUrl: "/samples/cfa-level-2-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is included in the CFA Level 2 Anki deck?",
        answer: "The product includes 495 Anki flashcards covering CFA Level 2 concepts, formulas, vignette logic, and application-level definitions across all 10 topic areas.",
      },
      {
        question: "How is this different from the Level 1 deck?",
        answer: "Level 2 is vignette-depth: FSA intercorporate issues, pension accounting, arbitrage-free fixed income, FCF and residual income valuation, active PM, and ethics application. It is not a copy of the L1 deck.",
      },
      {
        question: "Is this official CFA Institute material?",
        answer: "No. This is an independent study aid and is not endorsed, promoted, or warranted by CFA Institute.",
      },
      {
        question: "How do I import the deck into Anki?",
        answer: "Download the .apkg file from your Gumroad receipt, open the desktop Anki app, choose File then Import, select the .apkg file, and the deck appears in your deck list ready for study.",
      },
      {
        question: "How does this compare with the official CFA Level 2 exam?",
        answer:
          "Official Level 2 is 88 vignette-based questions in 22 item sets (11 per session) over 4 hours 24 minutes; CFA Institute sets the MPS after each sitting. This deck is daily recall. The paired free mock is 60 questions in 120 minutes with topic scores — a diagnostic, not a CFA Institute mock.",
      },
      {
        question: "Does the deck pair with a formula reference?",
        answer:
          "Yes. The 60-page CFA Level 2 Formula Reference PDF shares the same validated item bank — use it for printable tables and the 80-question recall drill; use this deck for daily spaced repetition.",
      },
      {
        question: "Does the deck work on AnkiDroid and AnkiMobile?",
        answer: "Yes. Import the .apkg file on Anki desktop and sync through AnkiWeb, or import the file directly in AnkiDroid (Android) and AnkiMobile (iOS).",
      },
    ],
    importSteps: [
      {
        title: "Download the .apkg file",
        detail: "After checkout, open your Gumroad receipt email or library and download the CFA Level 2 deck .apkg file to your computer.",
      },
      {
        title: "Import into Anki",
        detail: "Open Anki on desktop, choose File → Import, select the downloaded .apkg, and confirm the import.",
      },
      {
        title: "Sync to mobile",
        detail: "Use AnkiWeb to sync the deck to AnkiMobile (iOS) or AnkiDroid (Android) for daily review.",
      },
    ],
  },
  {
    slug: "cfa-level-2-formula-reference-2026",
    category: "finance",
    status: "available",
    title:
      "CFA Level 2 Formula Reference 2026 — 219 Formulas + 276 Definitions + 80-Question Drill (PDF)",
    shortName: "CFA Level 2 Formula Reference",
    subtitle:
      "60-page printable formula quick reference for the 2026 cycle — 219 typeset formulas, 276 definitions, 80-question recall drill, plus free 60Q timed mock.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 2 Formula & Definitions Quick Reference PDF with 60 printable pages: 495 entries (219 typeset formulas and 276 examiner-style definitions) across all 10 Level 2 topics, an 80-question Formula Recall Drill with explained answers, and a clickable table of contents. Official Level 2 is 88 item-set questions in 22 vignettes over 4 hours 24 minutes — this PDF is retrieval practice, not the exam and not a one-page cheat sheet. Same bank as the 495-card Anki deck and the free 60-question timed mock. US Letter PDF for {PRICE} on Gumroad. Not CFA Institute curriculum.",
    lastUpdated: "2026-10-04",
    audience:
      "CFA Level 2 candidates who need fast formula retrieval under item-set exam timing — print the reference, run the recall drill, and pair with spaced-repetition review on the companion Anki deck.",
    format: "PDF",
    coverImage: "/covers/cfa-level-2-formula-reference-2026.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/cfa-level-2-formula-reference-2026?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "60 pages + 80 recall questions",
      topics:
        "219 CFA Level 2 formulas and 276 definitions across Quant, Economics, Financial Reporting, Corporate Issuers, Equity Valuation, Fixed Income, Derivatives, Alternatives, Portfolio Management, and Ethics",
      formulas:
        "Typeset formula tables by topic, one-line plain-English meanings, and 80-question formula-recall drill with explanations",
      examYear: "2026 CFA Level 2 preparation cycle",
      delivery: "Printable PDF digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Quantitative Methods", examWeight: "67 entries", cards: "Regression, ML, time-series — typeset with one-line meanings" },
      { name: "Economics", examWeight: "22 entries", cards: "Currency equilibrium and growth models" },
      { name: "Financial Reporting", examWeight: "66 entries", cards: "Pensions, FX translation, intercorporate accounting" },
      { name: "Corporate Issuers", examWeight: "40 entries", cards: "M&A, capital structure, ESG, bank analysis" },
      { name: "Equity Valuation", examWeight: "66 entries", cards: "Residual income, FCFF/FCFE, multiples, private company" },
      { name: "Fixed Income", examWeight: "62 entries", cards: "Arbitrage-free pricing, credit models, term structure" },
      { name: "Derivatives", examWeight: "38 entries", cards: "BSM, binomial trees, swaps" },
      { name: "Alternative Investments", examWeight: "36 entries", cards: "Commodities, REITs, hedge funds" },
      { name: "Portfolio Management", examWeight: "62 entries", cards: "Multifactor models, APT, active PM" },
      { name: "Ethics & Standards", examWeight: "40 entries", cards: "Application-level ethics recall" },
      { name: "Formula Recall Drill", examWeight: "80 questions", cards: "See the formula, name the concept — explained answer key" },
    ],
    sampleCards: [
      {
        question: "Equity Valuation table — FCFF and FCFE models (page 19)",
        answer:
          "FCFF and FCFE from net income and from CFO, discounting FCFE at r_e, EV-to-equity bridge, terminal value TV_N = FCFF_(N+1) / (WACC − g) and the two-stage FCFF model — each row with a plain-English meaning.",
        imageUrl: "/samples/cfa-level-2-formula-reference-2026-sample-1.webp",
      },
      {
        question: "Formula Recall Drill — Equity Valuation items 36–41 (page 46)",
        answer:
          "See the formula, name the concept: RI intrinsic value V0 = BV0 + Σ RI_t / (1 + r_e)^t, clean surplus BV_t = BV_(t−1) + NI_t − D_t, RI persistence ω · RI_(t−1) and FCFF from CFO, with same-topic distractors.",
        imageUrl: "/samples/cfa-level-2-formula-reference-2026-sample-2.webp",
      },
      {
        question: "Answer key with common traps (page 56)",
        answer:
          "Every drill answer explains the concept and names the trap — e.g. WACC uses market-value weights and after-tax debt cost; FCFF discounted at WACC gives firm value, FCFE at the cost of equity gives equity value directly.",
        imageUrl: "/samples/cfa-level-2-formula-reference-2026-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the CFA Level 2 Formula Reference include?",
        answer:
          "A 60-page printable PDF with 219 formulas and 276 definitions across 10 Level 2 topic areas, an 80-question Formula Recall Drill with explained answer key, and a clickable table of contents.",
      },
      {
        question: "Is this a CFA study course or curriculum replacement?",
        answer:
          "No. This is a recall companion — it helps you retrieve formulas you already studied. It includes foundational quantitative and ethics review carried over from Level 1 so it works standalone, but it will not teach you the L2 curriculum.",
      },
      {
        question: "Does this pair with the CFA Level 2 Anki deck?",
        answer:
          "Yes. The PDF and 495-card Anki deck share the same validated item bank. Use the reference for printable formula tables and the recall drill; use Anki for daily spaced-repetition on your phone.",
      },
      {
        question: "Is there a free CFA Level 2 practice test?",
        answer:
          "Yes. Take the free 60-question CFA Level 2 readiness check at uniprep2go.study/mock-exams/cfa-level-2-readiness-check — topic scoring and full answer review, then drill weak vignette areas with this PDF and the companion Anki deck.",
      },
      {
        question: "Is this official CFA Institute material?",
        answer:
          "No. This is an independent educational product. CFA Institute does not endorse, promote, or warrant the accuracy or quality of this product.",
      },
      {
        question: "How should I use it before exam day?",
        answer:
          "Print or bookmark weak topic tables, run the 80-question recall drill under timed conditions, review every explanation, then drill matching cards in the companion Anki deck on missed topics.",
      },
    ],
  },
  // ── Language certifications (curated Gumroad lineup @ $26) ────────────
  {
    slug: "ciple-a2-european-portuguese-anki-deck",
    category: "language",
    status: "available",
    title: "CIPLE CAPLE Portuguese Citizenship Anki Deck — 2067 Flashcards",
    shortName: "CIPLE CAPLE Portuguese",
    subtitle:
      "2,067 European Portuguese flashcards for CIPLE / CAPLE A2, Portuguese residency, and citizenship (nacionalidade).",
    directAnswer:
      "UniPrep2Go sells a CIPLE / CAPLE Portuguese Anki deck with 2,067 European Portuguese flashcards for the CAPLE CIPLE A2 certificate used in Portuguese residency (autorização de residência) and citizenship (nacionalidade portuguesa) applications. Cards focus on PT-PT vocabulary, short phrases, contextual examples, and pronunciation audio. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — one vocabulary bank for CAPLE A2 diploma and Portugal immigration pathways.",
    lastUpdated: "2026-09-21",
    audience: "CIPLE / CAPLE A2 candidates, Portuguese residency and citizenship applicants, and European Portuguese self-learners.",
    format: ".apkg",
    coverImage: "/covers/ciple-a2-european-portuguese-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ciple-a2-european-portuguese-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2067",
      topics: "CIPLE, CAPLE A2, Portuguese residency and citizenship vocabulary",
      formulas: "Audio pronunciation + contextual examples (PT-PT)",
      examYear: "Current CAPLE / Portuguese nationality cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "casa",
        answer:
          "house — A minha casa é pequena. (My house is small.)",
        imageUrl: "/samples/ciple-a2-european-portuguese-anki-deck-sample-1.webp",
      },
      {
        question: "trabalho",
        answer:
          "work — O meu trabalho fica no centro. (My work is in the city centre.)",
        imageUrl: "/samples/ciple-a2-european-portuguese-anki-deck-sample-2.webp",
      },
      {
        question: "tempo",
        answer: "time — Não tenho tempo hoje. (I don't have time today.)",
        imageUrl: "/samples/ciple-a2-european-portuguese-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which Portuguese pathways does this deck cover?",
        answer:
          "CIPLE A2 (CAPLE / University of Lisbon) — the main A2 diploma for Portuguese residency and citizenship language requirements — plus everyday European Portuguese used in autorização de residência and nacionalidade portuguesa applications.",
      },
      {
        question: "Is this European Portuguese or Brazilian?",
        answer:
          "European Portuguese (PT-PT) for CAPLE CIPLE. Brazilian Portuguese word lists are a poor fit for CIPLE and Portuguese nationality language checks.",
      },
      {
        question: "I am Brazilian and need IELTS or TOEFL English — is this the right deck?",
        answer:
          "No. This is CIPLE / CAPLE European Portuguese for Portuguese nationality language evidence. For IELTS, TOEFL, Cambridge, or PTE with Brazilian Portuguese (PT-BR) glosses, use the IELTS / TOEFL English for Brazilian Portuguese Speakers Anki deck at /decks/ielts-toefl-english-for-portuguese-speakers-anki-deck.",
      },
      {
        question: "Is this the same as Portugal nacionalidade civics?",
        answer:
          "No. This deck is CIPLE / CAPLE A2 language vocabulary for residency and citizenship language evidence. Portugal nacionalidade civic knowledge is a separate track — take the free Portugal Nacionalidade readiness check and use the separate Portugal Nacionalidade Anki deck for that.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,067 Anki cards with European Portuguese vocabulary, phrases, contextual examples, audio pronunciation, and images where helpful.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "delf-b2-french-anki-deck",
    category: "language",
    status: "available",
    title: "DELF DALF TCF TEF French Anki Deck — 2115 Flashcards",
    shortName: "DELF DALF TCF TEF French",
    subtitle:
      "2,115 French vocabulary flashcards for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, TCF général — plus shared lexicon useful for fide / Swiss residency French and everyday Belgian French.",
    directAnswer:
      "UniPrep2Go sells a French Anki deck with 2,115 flashcards for DELF / DALF (lifetime diploma track), TCF Canada and TEF Canada (Express Entry / Quebec immigration), TCF ANF (French naturalization), and TCF général (French university admission). The same high-frequency lexicon also supports fide / Swiss residency French language prep and everyday Belgian French work-and-life vocabulary — not a Swiss civics or official fide format pack. Each card pairs a headword with a visual cue, native French audio, and a contextual example. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — one vocabulary bank covering the main French certificate and immigration pathways.",
    lastUpdated: "2026-09-21",
    audience:
      "DELF / DALF candidates, TCF Canada and TEF Canada immigration applicants, TCF ANF naturalization candidates, TCF général university applicants, and learners needing high-frequency French for fide / Swiss residency or Belgian everyday pathways.",
    format: ".apkg",
    coverImage: "/covers/delf-b2-french-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/delf-b2-french-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2115",
      topics:
        "DELF, DALF, TCF Canada, TEF Canada, TCF ANF, TCF général; soft overlap for fide / Swiss residency French and Belgian everyday French",
      formulas: "Native audio + visual image + contextual example per card",
      examYear: "Current DELF / DALF / TCF / TEF cycles",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "maison",
        answer: "house — Ma maison est petite. (My house is small.)",
        imageUrl: "/samples/delf-b2-french-anki-deck-sample-1.webp",
      },
      {
        question: "travail",
        answer:
          "work — Mon travail est au centre-ville. (My work is in the city centre.)",
        imageUrl: "/samples/delf-b2-french-anki-deck-sample-2.webp",
      },
      {
        question: "temps",
        answer: "time — Je n'ai pas le temps aujourd'hui. (I don't have time today.)",
        imageUrl: "/samples/delf-b2-french-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which French exams does this deck cover?",
        answer:
          "One shared French vocabulary bank for DELF and DALF (prestigious lifetime diplomas), TCF Canada and TEF Canada (Canada immigration), TCF ANF (French naturalization), and TCF général (French university admission). The same high-frequency lexicon also helps fide / Swiss residency French language prep and everyday Belgian French — without claiming official fide, SEM, or Belgian SEL formats.",
      },
      {
        question: "Is DELF / DALF the same as TCF or TEF?",
        answer:
          "No. DELF / DALF are level diplomas issued by France Éducation international and remain valid for life. TCF and TEF are timed proficiency tests with scores that expire — TCF Canada and TEF Canada serve Canadian immigration, TCF ANF serves French naturalization, and TCF général serves university admission. This deck trains the vocabulary shared across those pathways.",
      },
      {
        question: "Does this deck cover Swiss fide or Swiss citizenship?",
        answer:
          "It is a French language vocabulary bank that overlaps the high-frequency French useful for fide / Swiss residency language prep. It is not official fide material and not Swiss civics (Staatskunde). For federal Swiss citizenship civics, buy the $9 Naturalisation suisse Anki deck (or the German / Italian siblings).",
      },
      {
        question: "What does each card include?",
        answer:
          "Every card includes a visual image, native French audio, and a contextual example sentence so the word sticks for diploma exams and immigration/university tests alike.",
      },
      {
        question: "How many cards does the deck have?",
        answer:
          "2,115 cards covering the high-frequency French vocabulary you need for DELF, DALF, TCF, and TEF prep — not grammar lectures.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "dutch-a2-inburgering-anki-deck",
    category: "language",
    status: "available",
    title: "Dutch Inburgering NT2 A2 Anki Deck — 1897 Flashcards",
    shortName: "Dutch Inburgering NT2",
    subtitle: "1,897 Dutch A2 flashcards for Inburgering, Staatsexamen NT2 A2, residency, and naturalisatie.",
    directAnswer:
      "UniPrep2Go sells a Dutch Inburgering / NT2 A2 Anki deck with 1,897 high-frequency words for the Dutch civic integration (Inburgering) exam, Staatsexamen NT2 A2-level vocabulary, and everyday Dutch used toward residency and naturalisatie. Each card includes the Dutch word, English gloss, bilingual examples, native audio, and illustrations. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — one vocabulary bank for Inburgering and NT2 A2 pathways, not tourist Dutch.",
    lastUpdated: "2026-09-21",
    audience: "Migrants preparing Inburgering, Staatsexamen NT2 A2, Dutch residency, or naturalisatie with spaced repetition.",
    format: ".apkg",
    coverImage: "/covers/dutch-a2-inburgering-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/dutch-a2-inburgering-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1897",
      topics: "Inburgering, Staatsexamen NT2 A2, residency and naturalisatie vocabulary",
      formulas: "Native audio + bilingual examples + illustrations per card",
      examYear: "Current Inburgering / NT2 cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "huis",
        answer: "house — Mijn huis is klein. (My house is small.)",
        imageUrl: "/samples/dutch-a2-inburgering-anki-deck-sample-1.webp",
      },
      {
        question: "werk",
        answer:
          "work — Mijn werk is in het centrum. (My work is in the city centre.)",
        imageUrl: "/samples/dutch-a2-inburgering-anki-deck-sample-2.webp",
      },
      {
        question: "tijd",
        answer: "time — Ik heb vandaag geen tijd. (I don't have time today.)",
        imageUrl: "/samples/dutch-a2-inburgering-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which Dutch exams does this deck cover?",
        answer:
          "Inburgering (civic integration) language vocabulary, Staatsexamen NT2 A2-overlapping high-frequency Dutch, and everyday words used toward residency and naturalisatie. Formats differ; the A2 lexicon overlaps heavily.",
      },
      {
        question: "Is this the same as Belgium Flanders MO (inburgering Vlaanderen) civics?",
        answer:
          "No. This deck is Dutch language vocabulary for Netherlands Inburgering / NT2 A2. Belgium Flanders maatschappelijke oriëntatie is a separate civic-orientation track — use the free Flanders MO readiness check and the separate Flanders MO Anki deck for that, not this Netherlands language bank.",
      },
      {
        question: "What does each card include?",
        answer:
          "Each card includes the Dutch word, an English gloss, bilingual example sentences, native audio pronunciation, and illustrations where helpful.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "german-a2-anki-deck",
    category: "language",
    status: "available",
    title: "German Goethe telc ÖSD DTZ Anki Deck — 2115 Flashcards",
    shortName: "German Goethe telc ÖSD DTZ",
    subtitle:
      "2,115 German A2–B1 flashcards for Goethe-Institut, telc, ÖSD, and DTZ — plus shared lexicon useful for residence / Einbürgerung language and fide / Swiss residency German.",
    directAnswer:
      "UniPrep2Go sells a German Anki deck with 2,115 essential words for Goethe-Institut A2, telc Deutsch A2, ÖSD Zertifikat A2, and DTZ (Deutsch-Test für Zuwanderer) immigrant integration vocabulary. The same A2–B1 lexicon overlaps everyday German used toward residence and Einbürgerung language expectations and fide / Swiss residency German prep — not a Leben in Deutschland civics deck or official fide format pack. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — one shared vocabulary bank across the main German certificate and immigration pathways, not a tourist phrase pack.",
    lastUpdated: "2026-09-21",
    audience:
      "Goethe A2, telc A2, ÖSD A2, and DTZ learners, plus applicants building German for residence / Einbürgerung language or fide / Swiss residency pathways.",
    format: ".apkg",
    coverImage: "/covers/german-a2-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/german-a2-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2115",
      topics:
        "Goethe-Institut A2, telc Deutsch A2, ÖSD A2, DTZ; soft overlap for residence / Einbürgerung language and fide / Swiss residency German",
      formulas: "Essential words with examples for integration and certificate prep",
      examYear: "Current Goethe / telc / ÖSD / DTZ cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "Haus",
        answer: "house — Mein Haus ist klein. (My house is small.)",
        imageUrl: "/samples/german-a2-anki-deck-sample-1.webp",
      },
      {
        question: "Arbeit",
        answer:
          "work — Meine Arbeit ist in der Innenstadt. (My work is in the city centre.)",
        imageUrl: "/samples/german-a2-anki-deck-sample-2.webp",
      },
      {
        question: "Zeit",
        answer: "time — Ich habe heute keine Zeit. (I don't have time today.)",
        imageUrl: "/samples/german-a2-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which German exams does this deck cover?",
        answer:
          "Goethe-Institut A2, telc Deutsch A2, ÖSD Zertifikat A2, and DTZ (Deutsch-Test für Zuwanderer) immigrant integration themes. The same high-frequency lexicon also supports residence / Einbürgerung language expectations and fide / Swiss residency German prep — without claiming official fide or SEM formats.",
      },
      {
        question: "Is this a Leben in Deutschland or Swiss citizenship civics deck?",
        answer:
          "No. This is a German language vocabulary bank. For German citizenship civics (Leben in Deutschland), buy the $9 Leben in Deutschland Anki deck. For Swiss federal Staatskunde, buy the $9 Einbürgerung Schweiz Anki deck.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
      {
        question: "Is this official exam material?",
        answer:
          "No. This is an independent UniPrep2Go study aid sold by PixID Studio and is not affiliated with Goethe-Institut, telc, ÖSD, BAMF / DTZ, or Swiss fide / SEM.",
      },
    ],
  },
  {
    slug: "celi-b1-italian-anki-deck",
    category: "language",
    status: "available",
    title: "CELI CILS PLIDA Italian Anki Deck — 2171 Flashcards",
    shortName: "CELI CILS PLIDA Italian",
    subtitle:
      "2,171 Italian B1 flashcards for CELI, CILS, and PLIDA — including vocabulary overlap used for permesso di soggiorno and cittadinanza language pathways.",
    directAnswer:
      "UniPrep2Go sells an Italian B1 Anki deck with 2,171 flashcards for CELI (Università per Stranieri di Perugia), CILS (Università per Stranieri di Siena), and PLIDA (Società Dante Alighieri). Cards target the shared B1 vocabulary and phrase bank across those certificates, including the lexicon overlap used for permesso di soggiorno and cittadinanza language requirements (including CILS B1 cittadinanza-adjacent pathways). It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — one vocabulary deck for the main Italian B1 and immigration-language pathways, not an Italian civics quiz.",
    lastUpdated: "2026-09-21",
    audience:
      "CELI, CILS, and PLIDA B1 candidates plus applicants building Italian for permesso di soggiorno or cittadinanza language requirements.",
    format: ".apkg",
    coverImage: "/covers/celi-b1-italian-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/celi-b1-italian-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2171",
      topics:
        "CELI, CILS, PLIDA B1 Italian vocabulary; permesso di soggiorno and cittadinanza language overlap",
      formulas: "Exam-focused B1 vocabulary shared across Italian certificates",
      examYear: "Current CELI / CILS / PLIDA cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "essere",
        answer:
          "be — Io sono qui nella stanza illuminata dal sole. (I am here in the sunlit room.)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-1.webp",
      },
      {
        question: "io",
        answer: "i — Io sto qui da solo. (I stand here alone.)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-2.webp",
      },
      {
        question: "tu",
        answer: "you — Tu sembri felice oggi! (You look happy today!)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which Italian exams does this deck cover?",
        answer:
          "CELI (Perugia), CILS (Siena), and PLIDA (Dante Alighieri) at B1 — including vocabulary overlap used for permesso di soggiorno and cittadinanza language pathways (CILS B1 cittadinanza-adjacent). Certificates differ by exam body; this deck trains the shared intermediate Italian vocabulary.",
      },
      {
        question: "Is this an Italian citizenship civics deck?",
        answer:
          "No. This is an Italian language vocabulary bank for certificates and immigration-language requirements. It is not a civic-knowledge quiz about Italian institutions or history.",
      },
      {
        question: "How many cards does the deck have?",
        answer: "2,171 cards covering B1-level Italian vocabulary for CELI, CILS, and PLIDA preparation.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "danish-a2-prove-i-dansk-anki-deck",
    category: "language",
    status: "available",
    title: "Danish Prøve i Dansk PD2 PD3 Anki Deck — 1000 Flashcards",
    shortName: "Danish Prøve i Dansk PD2 PD3",
    subtitle: "1,000 Danish flashcards for Prøve i Dansk PD2 / PD3 and Danish residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Danish Prøve i Dansk Anki deck with 1,000 exam-specific vocabulary cards for PD2 and PD3 pathways (officially around CEFR B1 / B1+, not A2/PD1), audio, and practical example sentences for work, housing, services, and everyday life in Denmark — including language prep tied to permanent residence and citizenship requirements. Prefer this full $26 Gumroad .apkg over the free Prep2Go AnkiWeb LITE 100 when you need pathway coverage; it is lexicon repair, not a timed listening/writing substitute for official sample papers. Delivered as an Anki .apkg through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-21",
    audience: "Prøve i Dansk PD2 / PD3 learners and applicants using Danish for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/covers/danish-a2-prove-i-dansk-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/danish-a2-prove-i-dansk-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1000",
      topics: "Prøve i Dansk PD2, PD3, Danish residence and citizenship vocabulary",
      formulas: "Audio + example sentences for PD2 / PD3 themes",
      examYear: "Current Prøve i Dansk PD2 / PD3 cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Work & workplace", examWeight: "PD2/PD3 theme", cards: "Jobs, schedules, colleagues, instructions" },
      { name: "Housing & municipality", examWeight: "PD2/PD3 theme", cards: "Bolig, lease basics, kommune services" },
      { name: "Health & appointments", examWeight: "PD2/PD3 theme", cards: "Læge, apotek, aftale, symptoms" },
      { name: "Shopping & services", examWeight: "PD2/PD3 theme", cards: "Bank, post, everyday errands" },
      { name: "Bureaucracy & residence", examWeight: "Pathway vocab", cards: "Ansøgning, dokumenter, myndigheder" },
    ],
    sampleCards: [],
    faqs: [
      {
        question: "Which Danish pathways does this deck cover?",
        answer:
          "Prøve i Dansk PD2 and PD3 vocabulary themes (roughly CEFR B1 / B1+ — not A2/PD1), plus everyday Danish used for permanent residence and citizenship language requirements. Confirm your required module with official sources.",
      },
      {
        question: "Is this the Indfødsretsprøven civics test?",
        answer:
          "No. This is Danish language vocabulary for Prøve i Dansk / residence language. The Indfødsretsprøven is a separate citizenship civics exam — take the free Indfødsretsprøven readiness check at /mock-exams/denmark-indfoedsretsproeven-readiness-check and use the separate Indfødsretsprøven Anki deck for that.",
      },
      {
        question: "What does the deck include?",
        answer:
          "1,000 exam-specific Danish vocabulary words with audio and Anki-ready review for PD2 / PD3-style themes (work, housing, services, bureaucracy).",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "norwegian-a2-norskprove-anki-deck",
    category: "language",
    status: "available",
    title: "Norwegian Norskprøve Residence Citizenship Anki Deck — 1487 Flashcards",
    shortName: "Norwegian Norskprøve",
    subtitle: "1,487 Bokmål flashcards for Norskprøve A2 and Norwegian residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Norwegian Norskprøve Anki deck with 1,487 exam-specific Bokmål vocabulary cards, audio, and practical example sentences for work, housing, services, and everyday interaction in Norway. Built for Norskprøve A2 and the language side of permanent residence (permanent oppholdstillatelse) and citizenship (statsborgerskap) pathways. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-21",
    audience: "Norskprøve A2 learners and applicants preparing Norwegian for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/samples/prep2go-norwegian-a2-norskprove-cover.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/norwegian-a2-norskprove-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1487",
      topics: "Norskprøve A2, Norwegian residence and citizenship vocabulary (Bokmål)",
      formulas: "Audio + example sentences for Norskprøve and daily-life themes",
      examYear: "Current Norskprøve / residence-citizenship cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which Norwegian pathways does this deck cover?",
        answer:
          "Norskprøve A2 (Bokmål) plus everyday vocabulary used for permanent residence (permanent oppholdstillatelse) and citizenship (statsborgerskap) language requirements.",
      },
      {
        question: "Is this the Statsborgerprøven civics test?",
        answer:
          "No. This is Norwegian language vocabulary for Norskprøve / residence language. The Statsborgerprøven is a separate citizenship civics exam — take the free Statsborgerprøven readiness check and use the separate Statsborgerprøven Anki deck for that.",
      },
      {
        question: "What does the deck include?",
        answer:
          "1,487 exam-specific Norwegian vocabulary words for Norskprøve with audio and Anki-ready review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "swedish-a2-sfi-anki-deck",
    category: "language",
    status: "available",
    title: "Swedish SFI Residence Citizenship Anki Deck — 1000 Flashcards",
    shortName: "Swedish SFI",
    subtitle:
      "1,000 Swedish flashcards for SFI A2 and Swedish residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Swedish SFI Anki deck with 1,000 exam-specific vocabulary cards, audio, and practical example sentences for work, housing, services, and everyday interaction in Sweden. Built for SFI (Swedish for Immigrants) A2 and the language side of residence and citizenship pathways. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-21",
    audience:
      "SFI learners and applicants preparing Swedish for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/covers/swedish-a2-sfi-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/swedish-a2-sfi-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1000",
      topics: "SFI A2, Swedish residence and citizenship vocabulary",
      formulas: "Audio + example sentences for SFI and daily-life themes",
      examYear: "Current SFI / residence-citizenship cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which Swedish pathways does this deck cover?",
        answer:
          "SFI (Swedish for Immigrants) A2 vocabulary plus everyday Swedish used for residence and citizenship language requirements. Confirm your required course level with official sources.",
      },
      {
        question: "Is this the Swedish Medborgarskapsprov civics test?",
        answer:
          "No. This is Swedish language vocabulary for SFI / residence language. The Medborgarskapsprov is a separate citizenship civics exam — take the free Medborgarskapsprov readiness check and use the separate Medborgarskapsprov Anki deck for that.",
      },
      {
        question: "What does the deck include?",
        answer:
          "1,000 exam-specific Swedish vocabulary words for SFI with audio and Anki-ready review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "greek-a2-ellinomatheia-anki-deck",
    category: "language",
    status: "available",
    title: "Greek Ellinomatheia Residence Citizenship Anki Deck — 939 Flashcards",
    shortName: "Greek Ellinomatheia",
    subtitle:
      "939 Greek flashcards for Ellinomatheia A2 and Greek residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Greek Ellinomatheia Anki deck with 939 exam-specific vocabulary cards, audio, and practical example sentences for work, housing, services, and everyday interaction in Greece. Built for Ellinomatheia A2 and the language side of residence and citizenship pathways. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-21",
    audience:
      "Ellinomatheia learners and applicants preparing Greek for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/covers/greek-a2-ellinomatheia-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/greek-a2-ellinomatheia-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "939",
      topics: "Ellinomatheia A2, Greek residence and citizenship vocabulary",
      formulas: "Audio + example sentences for Ellinomatheia and daily-life themes",
      examYear: "Current Ellinomatheia / residence-citizenship cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which Greek pathways does this deck cover?",
        answer:
          "Ellinomatheia A2 vocabulary plus everyday Greek used for residence and citizenship language requirements. Confirm your required level with official sources.",
      },
      {
        question: "Is this a Greek citizenship civics deck?",
        answer:
          "No. This is Greek language vocabulary for Ellinomatheia / residence language requirements — not a civic-knowledge quiz about Greek institutions or history.",
      },
      {
        question: "What does the deck include?",
        answer:
          "939 exam-specific Greek vocabulary words for Ellinomatheia with audio and Anki-ready review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "czech-a2-cce-anki-deck",
    category: "language",
    status: "available",
    title: "Czech CCE Residence Citizenship Anki Deck — 945 Flashcards",
    shortName: "Czech CCE",
    subtitle:
      "945 Czech flashcards for CCE A2 and Czech residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Czech CCE Anki deck with 945 exam-specific vocabulary cards, audio, and practical example sentences for work, housing, services, and everyday interaction in Czechia. Built for CCE (Czech Language Certificate Exam) A2 and the language side of residence and citizenship pathways. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-21",
    audience:
      "CCE learners and applicants preparing Czech for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/covers/czech-a2-cce-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/czech-a2-cce-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "945",
      topics: "CCE A2, Czech residence and citizenship vocabulary",
      formulas: "Audio + example sentences for CCE and daily-life themes",
      examYear: "Current CCE / residence-citizenship cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which Czech pathways does this deck cover?",
        answer:
          "CCE (Czech Language Certificate Exam) A2 vocabulary plus everyday Czech used for residence and citizenship language requirements. Confirm your required level with official sources.",
      },
      {
        question: "Is this the Czech citizenship civics Anki deck?",
        answer:
          "No. This is Czech language vocabulary for CCE / residence language. Czech citizenship civics is a separate deck — take the free Czech citizenship readiness check, then use the Czech Citizenship Anki deck for reálie cards.",
      },
      {
        question: "What does the deck include?",
        answer:
          "945 exam-specific Czech vocabulary words for CCE with audio and Anki-ready review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "polish-a2-certyfikat-anki-deck",
    category: "language",
    status: "available",
    title: "Polish A2 Certyfikat Residence Citizenship Anki Deck — 1491 Flashcards",
    shortName: "Polish A2 Certyfikat",
    subtitle:
      "1,491 Polish flashcards for Certyfikat języka polskiego A2 and Polish residence or citizenship language prep.",
    directAnswer:
      "UniPrep2Go sells a Polish A2 Certyfikat Anki deck with 1,491 high-frequency vocabulary cards, audio, and practical example sentences for work, housing, services, and everyday life in Poland. Built for the state Certyfikat języka polskiego (as a Foreign Language) A2 pathway and the language side of residence and citizenship requirements. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio — language vocabulary only, not Polish citizenship civics.",
    lastUpdated: "2026-09-21",
    audience:
      "Certyfikat języka polskiego A2 learners and applicants preparing Polish for residence or citizenship language requirements.",
    format: ".apkg",
    coverImage: "/covers/polish-a2-certyfikat-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/polish-a2-certyfikat-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1491",
      topics: "Certyfikat języka polskiego A2, Polish residence and citizenship language vocabulary",
      formulas: "Audio + example sentences for Certyfikat A2 and daily-life themes",
      examYear: "Current Certyfikat / residence-citizenship cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "być",
        answer: "be — Chcę być tutaj dzisiaj z tobą.",
        imageUrl: "/samples/polish-a2-certyfikat-anki-deck-sample-1.webp",
      },
      {
        question: "ja",
        answer: "i — Ja jestem tutaj teraz z wami.",
        imageUrl: "/samples/polish-a2-certyfikat-anki-deck-sample-2.webp",
      },
      {
        question: "ciebie",
        answer: "you — Ten prezent jest dziś dla ciebie.",
        imageUrl: "/samples/polish-a2-certyfikat-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which Polish pathways does this deck cover?",
        answer:
          "Certyfikat języka polskiego A2 vocabulary plus everyday Polish used for residence and citizenship language requirements. Confirm your required level with official sources.",
      },
      {
        question: "Is this the Polish Citizenship civics Anki deck?",
        answer:
          "No. This is Polish language vocabulary for Certyfikat / residence language. Poland has no official citizenship civics MCQ today; the Polish Citizenship Anki deck + free readiness check cover proposed wiedza o Polsce themes for future-proofing.",
      },
      {
        question: "What does the deck include?",
        answer:
          "1,491 high-frequency Polish vocabulary words with audio and Anki-ready review for Certyfikat A2-style themes.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "polish-a2-for-ukrainian-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "Polish A2 for Ukrainian Speakers Anki Deck — 1491 Flashcards",
    shortName: "Polish A2 for Ukrainian Speakers",
    subtitle:
      "1,491 Polish A2 flashcards for Certyfikat and residence language — with Ukrainian support on every card.",
    directAnswer:
      "UniPrep2Go sells a Polish A2 for Ukrainian Speakers Anki deck with 1,491 high-frequency Polish vocabulary cards, Ukrainian glosses, bilingual examples, native Polish audio, and illustrations. Built from the Prep2Go app bank for Ukrainian-speaking candidates preparing Certyfikat języka polskiego A2 and the language side of residence requirements in Poland. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio. Independent study aid — not a Polish citizenship civics deck.",
    lastUpdated: "2026-09-21",
    audience:
      "Ukrainian-speaking Certyfikat A2 and Polish residence-language candidates using Anki for exam and everyday vocabulary.",
    format: ".apkg",
    coverImage: "/covers/polish-a2-for-ukrainian-speakers-anki-deck.webp",
    checkoutUrl:
      "https://pixidstudio.gumroad.com/l/polish-a2-for-ukrainian-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "1491",
      topics:
        "Certyfikat A2 and Polish residence language vocabulary with Ukrainian bilingual support",
      formulas: "Audio + Ukrainian glosses + bilingual example sentences",
      examYear: "Current Certyfikat / residence-language cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "być",
        answer: "бути — Chcę być tutaj dzisiaj z tobą. (Я хочу бути тут сьогодні з вами.)",
        imageUrl: "/samples/polish-a2-for-ukrainian-speakers-anki-deck-sample-1.webp",
      },
      {
        question: "ja",
        answer: "я — Ja jestem tutaj teraz z wami. (Я зараз тут разом з вами.)",
        imageUrl: "/samples/polish-a2-for-ukrainian-speakers-anki-deck-sample-2.webp",
      },
      {
        question: "ciebie",
        answer: "ти — Ten prezent jest dziś dla ciebie. (Ти сьогодні виглядаєш щасливим.)",
        imageUrl: "/samples/polish-a2-for-ukrainian-speakers-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Which Polish pathways does this deck support?",
        answer:
          "Certyfikat języka polskiego A2 vocabulary plus everyday Polish used for residence language requirements — with Ukrainian support. Pair Anki with official practice for each pathway's format.",
      },
      {
        question: "How is this different from the Polish A2 Certyfikat deck?",
        answer:
          "This listing is the Ukrainian-support edition: Polish on the front, Ukrainian glosses and bilingual examples on the back. The general Polish A2 Certyfikat deck uses English glosses. Pick the language support that matches how you study.",
      },
      {
        question: "Is this the Polish Citizenship civics Anki deck?",
        answer:
          "No. This is Polish language vocabulary for Certyfikat / residence language. For proposed Polish civics themes (no official citizenship knowledge exam yet), take the free readiness check, then use the separate Polish Citizenship Anki deck.",
      },
      {
        question: "What does the deck include?",
        answer:
          "1,491 Polish vocabulary cards from the Prep2Go app: Ukrainian glosses, bilingual examples, native Polish audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "german-a2-for-ukrainian-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "German A2 for Ukrainian Speakers Anki Deck — 2026 Flashcards",
    shortName: "German A2 for Ukrainian Speakers",
    subtitle:
      "2,026 German A2 flashcards for Goethe, telc, ÖSD, and DTZ — with Ukrainian translations on every card.",
    directAnswer:
      "UniPrep2Go sells a German A2 for Ukrainian Speakers Anki deck with 2,026 high-frequency German vocabulary cards, Ukrainian translations of each word and example sentence, native German audio, and illustrations. Built from the Prep2Go app bank for Ukrainian-speaking candidates preparing Goethe-Institut A2, telc Deutsch A2, ÖSD A2, and DTZ (Deutsch-Test für Zuwanderer) word knowledge — plus everyday German used toward residence and Einbürgerung language expectations. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio. Independent study aid — not a Leben in Deutschland civics deck.",
    lastUpdated: "2026-09-21",
    audience:
      "Ukrainian-speaking Goethe A2, telc A2, ÖSD A2, and DTZ candidates using Anki for German exam and integration vocabulary.",
    format: ".apkg",
    coverImage: "/covers/german-a2-for-ukrainian-speakers-anki-deck.webp",
    checkoutUrl:
      "https://pixidstudio.gumroad.com/l/german-a2-for-ukrainian-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2026",
      topics:
        "Goethe A2, telc A2, ÖSD A2, DTZ German vocabulary with Ukrainian bilingual support",
      formulas: "Audio + Ukrainian glosses + bilingual example sentences",
      examYear: "Current Goethe / telc / ÖSD / DTZ cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which German exams does this deck support?",
        answer:
          "Goethe-Institut A2, telc Deutsch A2, ÖSD A2, and DTZ immigrant integration vocabulary — as a shared high-frequency German bank with Ukrainian support. Pair Anki with official practice for each exam's format.",
      },
      {
        question: "How is this different from the German Goethe telc ÖSD DTZ deck?",
        answer:
          "This listing is the Ukrainian-support edition: German on the front, the Ukrainian translation and a German example sentence with its Ukrainian translation on the back. The general German Goethe telc ÖSD DTZ deck uses English glosses. Pick the language support that matches how you study.",
      },
      {
        question: "Is this a Leben in Deutschland civics deck?",
        answer:
          "No. This is German language vocabulary for certificates and integration language. For Leben in Deutschland civics, buy the $9 Leben in Deutschland Anki deck.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,026 German vocabulary cards from the Prep2Go app: Ukrainian translations of each word and example sentence, native German audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "german-a2-for-russian-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "German A2 for Russian Speakers Anki Deck — 2026 Flashcards",
    shortName: "German A2 for Russian Speakers",
    subtitle:
      "2,026 German A2 flashcards for Goethe, telc, ÖSD, and DTZ — with Russian translations on every card.",
    directAnswer:
      "UniPrep2Go sells a German A2 for Russian Speakers Anki deck with 2,026 high-frequency German vocabulary cards, Russian translations of each word and example sentence, native German audio, and illustrations. Built from the Prep2Go app bank for Russian-speaking candidates preparing Goethe-Institut A2, telc Deutsch A2, ÖSD A2, and DTZ (Deutsch-Test für Zuwanderer) word knowledge — plus everyday German used toward residence and Einbürgerung language expectations. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio. Independent study aid — not a Leben in Deutschland civics deck.",
    lastUpdated: "2026-09-21",
    audience:
      "Russian-speaking Goethe A2, telc A2, ÖSD A2, and DTZ candidates using Anki for German exam and integration vocabulary.",
    format: ".apkg",
    coverImage: "/covers/german-a2-for-russian-speakers-anki-deck.webp",
    checkoutUrl:
      "https://pixidstudio.gumroad.com/l/german-a2-for-russian-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2026",
      topics:
        "Goethe A2, telc A2, ÖSD A2, DTZ German vocabulary with Russian bilingual support",
      formulas: "Audio + Russian glosses + bilingual example sentences",
      examYear: "Current Goethe / telc / ÖSD / DTZ cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which German exams does this deck support?",
        answer:
          "Goethe-Institut A2, telc Deutsch A2, ÖSD A2, and DTZ immigrant integration vocabulary — as a shared high-frequency German bank with Russian support. Pair Anki with official practice for each exam's format.",
      },
      {
        question: "How is this different from the German Goethe telc ÖSD DTZ deck?",
        answer:
          "This listing is the Russian-support edition: German on the front, the Russian translation and a German example sentence with its Russian translation on the back. The general German Goethe telc ÖSD DTZ deck uses English glosses. Pick the language support that matches how you study.",
      },
      {
        question: "Is this a Leben in Deutschland civics deck?",
        answer:
          "No. This is German language vocabulary for certificates and integration language. For Leben in Deutschland civics, buy the $9 Leben in Deutschland Anki deck.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,026 German vocabulary cards from the Prep2Go app: Russian translations of each word and example sentence, native German audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },
  {
    slug: "ielts-toefl-english-for-french-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for French Speakers Anki Deck — 2522 Flashcards",
    shortName: "IELTS / TOEFL English for French Speakers",
    subtitle:
      "2,522 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with French support on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English for French Speakers Anki deck with 2,522 high-frequency English vocabulary cards, French glosses, bilingual examples, native English audio, and illustrations. Built from the Prep2Go app bank for French-speaking candidates preparing IELTS, TOEFL, Cambridge, and PTE word knowledge. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-28",
    audience:
      "French-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-french-speakers-anki-deck-v2.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-french-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2522",
      topics: "IELTS, TOEFL, Cambridge, and PTE English vocabulary with French bilingual support",
      formulas: "Audio + French glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS, TOEFL, Cambridge English exams, and PTE — as a shared high-frequency English vocabulary bank with French support. Pair Anki with official practice tests for each exam's format.",
      },
      {
        question: "Does this help IRCC, UKVI, or academic English pathways?",
        answer:
          "Yes as shared high-frequency English vocabulary used across IELTS (including common IRCC and UKVI sittings), TOEFL, Cambridge, and PTE academic pathways. Confirm the exact test version your case requires — this deck trains word knowledge, not each board's listening/speaking format.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,522 English vocabulary cards from the Prep2Go app: French glosses, bilingual examples, native English audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "delf-prim-printable-french-flashcards",
    category: "language",
    status: "available",
    title: "DELF Prim Printable French Flashcards — Ages 7–12 · 360 PDF Cards",
    shortName: "DELF Prim Printable (Ages 7–12)",
    subtitle:
      "360 printable French flashcards for DELF Prim kids ages 7–12 — images, examples, cut lines, and QR audio across two A4 PDFs.",
    directAnswer:
      "UniPrep2Go sells DELF Prim printable French flashcards for ages 7–12: 360 cards with illustrations, example sentences, cut lines, and QR pronunciation audio across two A4 PDF files. It is delivered as a digital PDF download for {PRICE} through Gumroad by PixID Studio — a kids printable pack, not an Anki .apkg and not a DELF B2 adult deck.",
    lastUpdated: "2026-07-22",
    audience:
      "Parents and teachers preparing children ages 7–12 for DELF Prim-style French vocabulary with printable cards and QR audio.",
    format: "PDF",
    coverImage: "/covers/delf-prim-printable-french-flashcards.webp",
    checkoutUrl:
      "https://pixidstudio.gumroad.com/l/delf-prim-printable-french-flashcards?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "360",
      topics: "DELF Prim ages 7–12, printable French vocabulary, QR audio",
      formulas: "A4 PDF pages with six cards each — print, cut, scan QR for audio",
      examYear: "Current DELF Prim cycle",
      delivery: "Two PDF files through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "What does a sample A4 page look like?",
        answer:
          "Each page has six cards with a French headword, English gloss, example sentences, illustration, topic label, and QR audio — sized for kids review at home.",
        imageUrl: "/samples/delf-prim-printable-french-flashcards-sample-1.webp",
      },
      {
        question: "How do you print the cards at home?",
        answer: "Print at 100% scale on A4 paper and cut along the dashed lines — six cards per page.",
        imageUrl: "/samples/delf-prim-printable-french-flashcards-sample-2.webp",
      },
      {
        question: "How does QR audio work on each card?",
        answer:
          "Every card includes a QR code that opens French pronunciation audio while your child reviews the printed card.",
        imageUrl: "/samples/delf-prim-printable-french-flashcards-sample-3.webp",
      },
      {
        question: "What is included in the PDF download?",
        answer:
          "360 printable DELF Prim cards on 60 A4 pages across two PDF files, with images, examples, cut lines, and QR audio for ages 7–12.",
        imageUrl: "/samples/delf-prim-printable-french-flashcards-sample-4.webp",
      },
    ],
    faqs: [
      {
        question: "Is this for DELF Prim (kids) or adult DELF?",
        answer:
          "This listing is positioned for DELF Prim ages 7–12 — printable cards with pictures and QR audio. For adult multi-exam French Anki vocabulary, see the DELF DALF TCF TEF Anki deck.",
      },
      {
        question: "What format is delivered?",
        answer: "Two printable A4 PDF files (360 cards total) through Gumroad after checkout — not an Anki .apkg.",
      },
      {
        question: "Is this official DELF Prim material?",
        answer:
          "No. This is an independent UniPrep2Go study aid sold by PixID Studio and is not affiliated with France Éducation international.",
      },
    ],
  },
  {
    slug: "ielts-toefl-english-for-arabic-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Arabic Speakers Anki Deck — 2504 Flashcards",
    shortName: "IELTS / TOEFL English for Arabic Speakers",
    subtitle:
      "2,504 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with Arabic support on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English for Arabic Speakers Anki deck with 2,504 high-frequency English vocabulary cards, Arabic glosses, bilingual examples, native English audio, and illustrations. Built from the Prep2Go app bank for Arabic-speaking candidates preparing IELTS, TOEFL, Cambridge, and PTE word knowledge. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-28",
    audience:
      "Arabic-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-arabic-speakers-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-arabic-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2504",
      topics: "IELTS, TOEFL, Cambridge, and PTE English vocabulary with Arabic bilingual support",
      formulas: "Audio + Arabic glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS, TOEFL, Cambridge English exams, and PTE — as a shared high-frequency English vocabulary bank with Arabic support. Pair Anki with official practice tests for each exam's format.",
      },
      {
        question: "Does this help IRCC, UKVI, or academic English pathways?",
        answer:
          "Yes as shared high-frequency English vocabulary used across IELTS (including common IRCC and UKVI sittings), TOEFL, Cambridge, and PTE academic pathways. Confirm the exact test version your case requires — this deck trains word knowledge, not each board's listening/speaking format.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,504 English vocabulary cards from the Prep2Go app: Arabic glosses, bilingual examples, native English audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "citizenship-naturalization-anki-bundle",
    category: "language",
    status: "planned",
    title: "Citizenship & Naturalization Anki Bundle — retired hub",
    shortName: "Citizenship Naturalization Bundle",
    subtitle:
      "This six-country bundle is no longer for sale. Buy the $9 country deck you need: U.S., Germany, France, UK, Canada, or Australia.",
    directAnswer:
      "The six-country Citizenship & Naturalization Anki bundle is retired and not for sale. Buy the matching $9 deck instead: U.S. Citizenship (128), Leben in Deutschland (296), Naturalisation française (200), Life in the UK (201), Canadian Citizenship (200), or Australian Citizenship (200). Each is a separate Gumroad .apkg. Start with the free readiness check for your country. Independent study aid — not government material.",
    lastUpdated: "2026-09-21",
    audience:
      "U.S. green-card holders preparing the naturalization civics interview, plus applicants for Germany, France, UK, Canada, or Australia citizenship tests.",
    format: ".apkg",
    coverImage: "/covers/citizenship-naturalization-anki-bundle.webp",
    facts: {
      cards: "1225",
      topics:
        "Leben in Deutschland, Naturalisation française, Life in the UK, Canadian / Australian / U.S. Citizenship",
      formulas: "Six separate Anki .apkg files — one deck per country",
      examYear: "Current citizenship / naturalization cycles",
      delivery: "Not for sale — buy the $9 country deck",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
        answer:
          "Alle Einwohner und der Staat müssen sich an die Gesetze halten. — Leben in Deutschland sample.",
        imageUrl: "/covers/citizenship-naturalization-anki-bundle.webp",
      },
      {
        question: "Quelle est la devise de la République française?",
        answer: "Liberté / Égalité / Fraternité — Naturalisation française sample.",
        imageUrl: "/covers/citizenship-naturalization-anki-bundle.webp",
      },
      {
        question: "What are the fundamental principles of British life?",
        answer:
          "Democracy / the rule of law / individual liberty / tolerance of those with different faiths and beliefs — Life in the UK sample.",
        imageUrl: "/covers/citizenship-naturalization-anki-bundle.webp",
      },
    ],
    faqs: [
      {
        question: "Does this cover the U.S. citizenship civics test?",
        answer:
          "Yes. The U.S. Citizenship deck (128 cards) follows the USCIS 2025 naturalization civics list of 128 questions (N-400 filed on or after Oct 20, 2025). Take the free U.S. citizenship practice test first, then import only the U.S. .apkg if that is the only country you need.",
      },
      {
        question: "What is included in the $20 bundle?",
        answer:
          "Six Anki .apkg decks in one download: U.S. Citizenship (128 cards), Leben in Deutschland (296), Naturalisation française (200), Life in the UK (201), Canadian Citizenship (200), and Australian Citizenship (200) — 1,225 cards total. Import only the country you need.",
      },
      {
        question: "Is there a free practice test before I buy?",
        answer:
          "Yes. Each country in the bundle has a free readiness check on UniPrep2Go (U.S. citizenship, Leben in Deutschland, Naturalisation française, Life in the UK, Canada, Australia). Take the check for your country, note weak topics, then import that country’s .apkg from the bundle.",
      },
      {
        question: "Will this replace the official civics handbook?",
        answer:
          "No. Use Anki for daily recall of facts and wording; keep your country’s official handbook and any free government practice tests for full coverage. This is an independent UniPrep2Go study aid sold by PixID Studio — not affiliated with any citizenship authority.",
      },
      {
        question: "Do the cards include audio and images?",
        answer:
          "These are text-first civics decks (question → answer) designed for fast daily drill. They do not include vocabulary media like the language Anki line.",
      },
    ],
  },
  {
    slug: "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Ukrainian Speakers Anki Deck — 2504 Flashcards",
    shortName: "IELTS / TOEFL English for Ukrainian Speakers",
    subtitle:
      "2,504 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with Ukrainian support on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English for Ukrainian Speakers Anki deck with 2,504 high-frequency English vocabulary cards, Ukrainian glosses, bilingual examples, native English audio, and illustrations. Built from the Prep2Go app bank for Ukrainian-speaking candidates preparing IELTS, TOEFL, Cambridge, and PTE word knowledge. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-28",
    audience:
      "Ukrainian-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-ukrainian-speakers-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-ukrainian-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2504",
      topics: "IELTS, TOEFL, Cambridge, and PTE English vocabulary with Ukrainian bilingual support",
      formulas: "Audio + Ukrainian glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS, TOEFL, Cambridge English exams, and PTE — as a shared high-frequency English vocabulary bank with Ukrainian support. Pair Anki with official practice tests for each exam's format.",
      },
      {
        question: "Does this help IRCC, UKVI, or academic English pathways?",
        answer:
          "Yes as shared high-frequency English vocabulary used across IELTS (including common IRCC and UKVI sittings), TOEFL, Cambridge, and PTE academic pathways. Confirm the exact test version your case requires — this deck trains word knowledge, not each board's listening/speaking format.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,504 English vocabulary cards from the Prep2Go app: Ukrainian glosses, bilingual examples, native English audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "ielts-toefl-english-for-russian-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Russian Speakers Anki Deck — 2504 Flashcards",
    shortName: "IELTS / TOEFL English for Russian Speakers",
    subtitle:
      "2,504 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with Russian support and cognate-trap notes on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English Anki deck for Russian speakers: 2,504 high-frequency English vocabulary cards with Russian glosses, bilingual examples, native English audio, and illustrations. Built for Russian-speaking candidates targeting IELTS Academic or General (Canada / Australia / UKVI), TOEFL iBT (U.S. graduate), Cambridge, and PTE — English-first recall so false friends like актуальный/actual and магазин/magazine stop costing Reading points. Delivered as an Anki .apkg for {PRICE} through Gumroad by PixID Studio. What this is not: a tourist EN–RU AnkiWeb dump, an English Vocabulary in Use book mirror, a timed mock exam, or a PT-BR / LatAm-Spanish-gloss sibling pack.",
    lastUpdated: "2026-09-28",
    audience:
      "Russian-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary — not tourist phrase learners.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-russian-speakers-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-russian-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2504",
      topics:
        "IELTS / TOEFL / Cambridge / PTE English vocabulary for Russian speakers (Russian glosses, false-friend awareness)",
      formulas: "Audio + Russian glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS Academic and General Training word knowledge, TOEFL iBT, Cambridge English (B2 First / C1 Advanced-style lexis), and PTE Academic — one shared high-frequency English bank with Russian support. Pair Anki with official British Council / IDP / ETS / Cambridge / Pearson practice for each exam's Listening and Speaking format.",
      },
      {
        question: "Does this help Canada, Australia, UKVI, or U.S. TOEFL pathways?",
        answer:
          "Yes as shared exam English vocabulary used across IELTS sittings common for IRCC / Australia / UKVI and across TOEFL for U.S. graduate admissions. Confirm the exact test version and score band your case needs — this deck trains word knowledge, not each board's timed paper or visa checklist.",
      },
      {
        question: "Is this the same as free AnkiWeb English–Russian or EVU decks?",
        answer:
          "No. Free AnkiWeb EN–RU dumps and English Vocabulary in Use mirrors are often tourist phrases, undated frequency lists, or CEFR book mirrors without IELTS/TOEFL framing. This is a 2,504-card Prep2Go exam-frequency bank with Russian glosses, English audio, and cognate-trap notes — instant Gumroad .apkg at list price.",
      },
      {
        question: "Is this the same as the Portuguese- or Spanish-speaker English Anki pages?",
        answer:
          "No. Sibling UniPrep English decks share an exam-frequency spine but use different gloss languages and false-friend notes. This listing is Russian glosses only (актуальный≠actual, магазин≠magazine). PT-BR and LatAm Spanish editions are separate products with their own sample cards and Gumroad permalinks.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,504 English vocabulary cards from the Prep2Go app: Russian glosses, bilingual examples, native English audio, and illustrations where included.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "ielts-toefl-english-for-spanish-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Spanish Speakers Anki Deck — 2504 Flashcards",
    shortName: "IELTS / TOEFL English for Spanish Speakers (LatAm)",
    subtitle:
      "2,504 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with Latin American Spanish support on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English for Spanish Speakers Anki deck with 2,504 high-frequency English vocabulary cards, Latin American Spanish glosses, bilingual examples, native English audio, and illustrations. Built from the Prep2Go app bank for Spanish-speaking (LatAm) candidates preparing IELTS, TOEFL, Cambridge, and PTE word knowledge. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-28",
    audience:
      "Latin American Spanish-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-spanish-speakers-anki-deck-v2.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-spanish-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2504",
      topics: "IELTS, TOEFL, Cambridge, and PTE English vocabulary with Latin American Spanish bilingual support",
      formulas: "Audio + LatAm Spanish glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS, TOEFL, Cambridge English exams, and PTE — as a shared high-frequency English vocabulary bank with Latin American Spanish support. Pair Anki with official practice tests for each exam's format.",
      },
      {
        question: "Does this help IRCC, UKVI, or academic English pathways?",
        answer:
          "Yes as shared high-frequency English vocabulary used across IELTS (including common IRCC and UKVI sittings), TOEFL, Cambridge, and PTE academic pathways. Confirm the exact test version your case requires — this deck trains word knowledge, not each board's listening/speaking format.",
      },
      {
        question: "Is this Latin American or Peninsular Spanish?",
        answer:
          "Latin American Spanish glosses and examples (LatAm). It is English vocabulary prep for Spanish speakers, not a DELE Spanish exam deck.",
      },
      {
        question: "Is this the Brazilian Portuguese (PT-BR) English deck?",
        answer:
          "No. This edition uses Latin American Spanish glosses. Brazilians preparing IELTS/TOEFL with PT-BR glosses and cognate traps (atual ≠ actual) need /decks/ielts-toefl-english-for-portuguese-speakers-anki-deck — a separate product, not a demonym swap of this page.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,504 English vocabulary cards from the Prep2Go app: LatAm Spanish glosses, bilingual examples, native English audio, and illustrations.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "ielts-toefl-english-for-portuguese-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Brazilian Portuguese Speakers Anki — 2504 Cards",
    shortName: "IELTS / TOEFL English for Brazilian Portuguese Speakers (BR)",
    subtitle:
      "2,504 English flashcards for Brazilians on IELTS, TOEFL, Cambridge, and PTE — PT-BR glosses, audio, and cognate traps (atual ≠ actual).",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English Anki deck for Brazilian Portuguese (PT-BR) speakers: 2,504 high-frequency English vocabulary cards with PT-BR glosses, bilingual examples, native English audio, and illustrations. Built for Brazilians targeting IELTS Academic or General (Canada Express Entry / SDS, Australia, UKVI), TOEFL iBT (U.S. graduate), Cambridge, and PTE — English-first recall so false friends like atual/actual and pretender/pretend stop costing Reading points. Delivered as an Anki .apkg for {PRICE} through Gumroad by PixID Studio. What this is not: CIPLE / CAPLE European Portuguese, Celpe-Bras, ENEM English drills, a timed mock exam, or a LatAm-Spanish-gloss sibling pack.",
    lastUpdated: "2026-09-28",
    audience:
      "Brazilian Portuguese speakers preparing IELTS, TOEFL, Cambridge, or PTE who want Anki vocabulary with PT-BR support — not CIPLE, not Celpe-Bras, not ENEM English.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-portuguese-speakers-anki-deck-v2.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-portuguese-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2504",
      topics:
        "IELTS / TOEFL / Cambridge / PTE English vocabulary for Brazilian Portuguese speakers (PT-BR glosses, false-friend awareness)",
      formulas: "Audio + Brazilian Portuguese (PT-BR) glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS Academic and General Training word knowledge, TOEFL iBT, Cambridge English (B2 First / C1 Advanced-style lexis), and PTE Academic — one shared high-frequency English bank with Brazilian Portuguese (PT-BR) support. Pair Anki with official British Council / IDP / ETS / Cambridge / Pearson practice for each exam's Listening and Speaking format.",
      },
      {
        question: "Does this help Canada Express Entry, Australia, UKVI, or U.S. TOEFL pathways?",
        answer:
          "Yes as shared exam English vocabulary used across IELTS sittings common for IRCC / SDS / Australia / UKVI and across TOEFL for U.S. graduate admissions. Confirm the exact test version and score band your case needs — this deck trains word knowledge, not each board's timed paper or visa checklist.",
      },
      {
        question: "Is this Brazilian or European Portuguese? Is it CIPLE or Celpe-Bras?",
        answer:
          "Brazilian Portuguese (PT-BR) glosses only — on an English vocabulary deck. It is not CIPLE / CAPLE European Portuguese for Portuguese nationality, and it is not Celpe-Bras (Portuguese proficiency for non-native speakers). If you need PT-PT for CIPLE, use the separate CIPLE Anki deck.",
      },
      {
        question: "Is this the same as ENEM English or free AnkiWeb Inglês–Português decks?",
        answer:
          "No. ENEM English reading is a Brazilian high-school exam skill set; free AnkiWeb PT–EN dumps are usually tourist phrases or undated frequency lists. This is a 2,504-card Prep2Go IELTS/TOEFL-framed bank with PT-BR glosses, English audio, and cognate-trap notes — instant Gumroad .apkg at list price.",
      },
      {
        question: "Is this the same as the Spanish- or Russian-speaker English Anki pages?",
        answer:
          "No. Sibling UniPrep English decks share an exam-frequency spine but use different gloss languages and false-friend notes. This listing is PT-BR only (atual≠actual, pretender≠pretend). LatAm Spanish and Russian editions are separate products with their own sample cards and Gumroad permalinks — do not treat this page as a demonym swap of those URLs.",
      },
      {
        question: "What does the deck include?",
        answer:
          "2,504 English vocabulary cards from the Prep2Go app: Brazilian Portuguese glosses, bilingual examples, native English audio, and illustrations where included.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "ielts-toefl-english-for-turkish-speakers-anki-deck",
    category: "language",
    status: "available",
    title: "IELTS / TOEFL English for Turkish Speakers Anki Deck — 952 Flashcards",
    shortName: "IELTS / TOEFL English for Turkish Speakers",
    subtitle:
      "952 English flashcards for IELTS, TOEFL, Cambridge, and PTE — with Turkish support on every card.",
    directAnswer:
      "UniPrep2Go sells an IELTS / TOEFL English for Turkish Speakers Anki deck with 952 high-frequency English vocabulary cards, Turkish glosses, bilingual examples, native English audio, and illustrations. Built from the Prep2Go app bank for Turkish-speaking candidates preparing IELTS, TOEFL, Cambridge, and PTE word knowledge. It is delivered as an Anki .apkg file for {PRICE} through Gumroad by PixID Studio.",
    lastUpdated: "2026-09-28",
    audience:
      "Turkish-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    format: ".apkg",
    coverImage: "/covers/ielts-toefl-english-for-turkish-speakers-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ielts-toefl-english-for-turkish-speakers-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "952",
      topics: "IELTS, TOEFL, Cambridge, and PTE English vocabulary with Turkish bilingual support",
      formulas: "Audio + Turkish glosses + bilingual example sentences",
      examYear: "Current IELTS / TOEFL / Cambridge / PTE cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which English exams does this deck support?",
        answer:
          "IELTS, TOEFL, Cambridge English exams, and PTE — as a shared high-frequency English vocabulary bank with Turkish support. Pair Anki with official practice tests for each exam's format.",
      },
      {
        question: "Does this help IRCC, UKVI, or academic English pathways?",
        answer:
          "Yes as shared high-frequency English vocabulary used across IELTS (including common IRCC and UKVI sittings), TOEFL, Cambridge, and PTE academic pathways. Confirm the exact test version your case requires — this deck trains word knowledge, not each board's listening/speaking format.",
      },
      {
        question: "What does the deck include?",
        answer:
          "952 English vocabulary cards from the Prep2Go app: Turkish glosses, bilingual examples, native English audio, and illustrations.",
      },
      {
        question: "Is this the same as the French- or Arabic-speaker English Anki pages?",
        answer:
          "No. Sibling UniPrep English decks share an exam-frequency spine but use different gloss languages. This listing is Turkish only. Other English-for-X editions are separate products with their own sample cards and Gumroad permalinks.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
    ],
  },

  {
    slug: "dele-a2-spanish-anki-deck",
    category: "language",
    status: "available",
    title: "DELE SIELE Spanish Anki Deck — 2120 Flashcards",

    shortName: "DELE SIELE Spanish",
    subtitle:
      "2,120 Spanish A2 vocabulary flashcards for DELE A2 and SIELE A2-style word knowledge — language only, not a CCSE civics bundle.",
    directAnswer:
      "UniPrep2Go sells a Spanish Anki deck with 2,120 high-frequency A2 vocabulary cards for DELE A2 (Instituto Cervantes) and overlapping SIELE A2-style word knowledge. Each card targets exam-ready Spanish recall with examples and media where included. It is delivered as a single Anki .apkg file for {PRICE} through Gumroad by PixID Studio — DELE / SIELE vocabulary only, not a DELE + CCSE nationality bundle.",
    lastUpdated: "2026-09-21",
    audience:
      "DELE A2 candidates and learners building SIELE A2-overlapping Spanish vocabulary with spaced repetition.",
    format: ".apkg",
    coverImage: "/covers/dele-a2-spanish-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/dele-a2-spanish-anki-deck?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2120",
      topics: "DELE A2, SIELE A2-overlapping Spanish vocabulary",
      formulas: "High-frequency A2 vocabulary with examples and media",
      examYear: "Current DELE A2 / SIELE cycle",
      delivery: "Digital download through Gumroad (single .apkg)",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "Which Spanish exams does this deck cover?",
        answer:
          "DELE A2 (Instituto Cervantes) vocabulary plus overlapping SIELE A2-style word knowledge. It is a language deck only — it does not include CCSE civics for nacionalidad española.",
      },
      {
        question: "Is this a DELE + CCSE nationality bundle?",
        answer:
          "No. This listing is a single DELE / SIELE vocabulary .apkg. The separate DELE + CCSE nationality deck is a compact 60-card civics companion sold on its own page, plus a free CCSE readiness check.",
      },
      {
        question: "Do I need CCSE civics as well as DELE?",
        answer:
          "Many nacionalidad española pathways require language evidence (often DELE A2) plus the CCSE civics test. This deck covers language vocabulary only. Pair it with the free CCSE readiness check and the compact 60-card DELE + CCSE companion if you want civics flashcards too.",
      },
      {
        question: "What file format is delivered?",
        answer: "One Anki-compatible .apkg file delivered through Gumroad after checkout.",
      },
      {
        question: "Is this official exam material?",
        answer:
          "No. This is an independent UniPrep2Go study aid sold by PixID Studio and is not affiliated with Instituto Cervantes or SIELE.",
      },
    ],
  },
  {
    slug: "dele-a2-ccse-spanish-citizenship-bundle",
    category: "language",
    status: "available",
    title: "DELE A2 + CCSE Anki Bundle — 2463 Flashcards for Spanish Nationality",
    shortName: "DELE A2 + CCSE Spanish Nationality",
    subtitle:
      "Two .apkg files for both Spanish nationality tests: 2,120 DELE A2 vocabulary cards with audio + 343 CCSE civics cards.",
    directAnswer:
      "UniPrep2Go sells a DELE A2 + CCSE Spanish nationality Anki bundle with 2,463 cards in two .apkg files: 2,120 DELE A2 vocabulary cards (picture, Spanish example sentence, native audio) and 343 CCSE question-and-answer civics cards on the Constitution, institutions, geography, history and daily life. Official Cervantes CCSE is 25 questions / 45 minutes / 60%; start with the free 60-question CCSE readiness check. Delivered for {PRICE} through Gumroad.",
    lastUpdated: "2026-10-03",
    audience: "Spanish nationality-by-residence applicants who need DELE A2 (or higher) plus the CCSE.",
    format: ".apkg",
    coverImage: "/samples/prep2go-dele-a2-ccse-spanish-citizenship-cover.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/dele-a2-ccse-spanish-citizenship-bundle?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "2463",
      topics: "DELE A2 vocabulary (2,120 cards with audio) + CCSE civics (343 cards)",
      formulas: "Two Anki .apkg files — DELE A2 picture/audio vocabulary and CCSE question → answer",
      examYear: "Current DELE A2 / CCSE cycle",
      delivery: "Two digital .apkg files through Gumroad (instant download)",
    },
    topicCoverage: [],
    sampleCards: [],
    faqs: [
      {
        question: "What is in the DELE A2 + CCSE bundle?",
        answer:
          "Two Anki files, 2,463 cards: 2,120 DELE A2 vocabulary cards (Spanish word with a picture, English translation, Spanish example sentence with native audio) and 343 CCSE civics cards in Spanish question → answer form. It does not include the 300 CCSE manual questions as multiple choice, DELE writing or speaking practice, or official audio.",
      },
      {
        question: "Is there a free CCSE practice test?",
        answer:
          "Yes. Take the free 60-question CCSE (España) readiness check at /mock-exams/ccse-espana-readiness-check, then repair weak topics with the 343 CCSE cards. Official Cervantes CCSE is 25 questions / 45 minutes / 60%.",
      },
      {
        question: "Is this official exam material?",
        answer:
          "No. UniPrep2Go listings are independent study aids and are not affiliated with Instituto Cervantes or the Spanish Ministry of Justice.",
      },
    ],
  },
  {
    slug: "swiss-citizenship-anki-deck",
    category: "language",
    status: "planned",
    title: "Swiss Citizenship Anki Bundle — retired hub",
    shortName: "Swiss Citizenship",
    subtitle:
      "This DE/FR/IT bundle is no longer for sale. Buy the $9 German, French, or Italian Staatskunde deck (207 cards each).",
    directAnswer:
      "The Swiss Citizenship Anki bundle (621 cards, three languages) is retired and not for sale. Buy the $9 deck for your language: Einbürgerung Schweiz (German, 207), Naturalisation suisse (French, 207), or Naturalizzazione svizzera (Italian, 207). Free DE / FR / IT readiness checks stay live. Independent study aid — not SEM or cantonal exam material.",
    lastUpdated: "2026-09-21",
    audience:
      "Residents preparing Swiss ordinary naturalisation federal civics checks in German, French, or Italian (canton/commune tests vary).",
    format: ".apkg",
    coverImage: "/covers/swiss-citizenship-anki-deck.webp",
    facts: {
      cards: "621",
      topics:
        "Politics & direct democracy; history & culture; geography & social system; naturalisation process — DE / FR / IT",
      formulas: "Three separate Anki .apkg files — one per official language",
      examYear: "Current SEM / cantonal naturalisation cycles",
      delivery: "Not for sale — buy the $9 language deck",
    },
    topicCoverage: [
      { name: "Politics, institutions & direct democracy", examWeight: "25%", cards: "207×3 languages" },
      { name: "History, culture & daily life", examWeight: "25%", cards: "207×3 languages" },
      { name: "Geography & social system", examWeight: "25%", cards: "207×3 languages" },
      { name: "Naturalisation process", examWeight: "25%", cards: "207×3 languages" },
    ],
    sampleCards: [
      {
        question: "Welche drei offiziellen Wege gibt es, die Schweizer Staatsbürgerschaft durch Entscheid zu erwerben?",
        answer:
          "Ordentliche Einbürgerung, erleichterte Einbürgerung und Wiedereinbürgerung. — Einbürgerung Schweiz sample.",
        imageUrl: "/covers/swiss-citizenship-anki-deck.webp",
      },
      {
        question:
          "Quelles sont les trois voies officielles d'acquisition de la nationalité suisse par décision ?",
        answer:
          "La naturalisation ordinaire, la naturalisation facilitée et le rétablissement de la nationalité. — Naturalisation Suisse sample.",
        imageUrl: "/covers/swiss-citizenship-anki-deck.webp",
      },
      {
        question:
          "Quali sono le tre vie ufficiali per acquisire la cittadinanza svizzera per decisione?",
        answer:
          "Naturalizzazione ordinaria, naturalizzazione semplificata e reintegrazione della cittadinanza. — Naturalizzazione Svizzera sample.",
        imageUrl: "/covers/swiss-citizenship-anki-deck.webp",
      },
    ],
    faqs: [
      {
        question: "What is included for $12?",
        answer:
          "Three separate Anki .apkg files: German (207 cards), French (207), and Italian (207) — 621 federal Staatskunde cards total. Download once from Gumroad and import the language your canton uses.",
      },
      {
        question: "Is there a free Swiss citizenship practice test?",
        answer:
          "Yes. Free 60-question readiness checks are live in German (/mock-exams/swiss-citizenship-readiness-check), French (/mock-exams/naturalisation-suisse-readiness-check), and Italian (/mock-exams/naturalizzazione-svizzera-readiness-check).",
      },
      {
        question: "Is this official SEM / cantonal exam material?",
        answer:
          "No. Independent UniPrep2Go study aid — not affiliated with or endorsed by SEM or Swiss cantons/communes. Canton and commune tests vary; this bundle targets the federal Staatskunde block.",
      },
    ],
  },
  ...civicSoldDecks,
  ...citizenshipPlannedDecks,
  ...prep2GoAdditionalLanguageDecks,
  ...prep2GoCitizenshipAppDecks,
  ...prep2GoAppDecks,

  // ── Academic ──────────────────────────────────────────────────────────
  {
    slug: "ib-biology-sl-anki-deck",
    category: "academic",
    status: "available",
    title: "IB Biology SL Anki Deck — 149 Smart Flashcards",
    shortName: "IB Biology SL",
    subtitle: "149 focused Anki flashcards for IB Biology Standard Level.",
    directAnswer:
      "UniPrep2Go sells an IB Biology SL Anki deck with 149 flashcards covering core concepts for the IB Biology Standard Level programme. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck targets IB students using spaced repetition for concept recall.",
    lastUpdated: "2026-05-31",
    audience: "IB Biology Standard Level students using spaced repetition for exam preparation.",
    format: ".apkg",
    coverImage: "/covers/ib-biology-sl-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/oakmtp?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "149",
      topics: "IB Biology SL core concepts",
      formulas: "Key definitions and processes",
      examYear: "Current IB cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "Alpha vs Beta glucose",
        answer:
          "In alpha-glucose, the OH group on carbon 1 is below the ring. In beta-glucose, the OH group on carbon 1 is above the ring. This difference affects which polymer is formed.",
        imageUrl: "/samples/ib-biology-sl-anki-deck-sample-1.webp",
      },
      {
        question: "Cellulose structure and function",
        answer:
          "Beta-glucose monomers form straight chains via 1-4 glycosidic bonds. Alternating orientations allow hydrogen bonds between parallel chains, creating microfibrils with high tensile strength.",
        imageUrl: "/samples/ib-biology-sl-anki-deck-sample-2.webp",
      },
      {
        question: "Starch structure",
        answer:
          "Amylose is unbranched and helical with 1-4 glycosidic bonds. Amylopectin is branched with 1-4 and 1-6 glycosidic bonds. Both are made from alpha-glucose.",
        imageUrl: "/samples/ib-biology-sl-anki-deck-sample-3.webp",
      },
    ],
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

  {
    slug: "gmat-focus-anki-deck",
    category: "academic",
    status: "planned",
    coverImage: "/covers/gmat-focus-anki-deck.webp",
    title: "GMAT Focus Anki Deck",
    shortName: "GMAT Focus",
    subtitle: "A planned spaced-repetition deck for GMAT Quant, Verbal, and Data Insights.",
    directAnswer:
      "The GMAT Focus Anki Deck is a planned UniPrep2Go product for MBA applicants preparing for the GMAC GMAT. It is not yet available for purchase. Take the free GMAT Focus readiness check to benchmark weak sections first.",
    lastUpdated: "2026-06-02",
    audience: "MBA and business master's applicants using spaced repetition alongside official GMAC prep.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "Quantitative Reasoning, Verbal Reasoning, Data Insights",
      formulas: "Planned high-yield GMAT concepts and question-type drills",
      examYear: "GMAT Focus Edition (205–805 scale)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Quantitative Reasoning", examWeight: "33% of GMAT total score", cards: "Planned" },
      { name: "Verbal Reasoning", examWeight: "33% of GMAT total score", cards: "Planned" },
      { name: "Data Insights", examWeight: "33% of GMAT total score", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "If n is a positive integer and 15n is a perfect square, what is the smallest possible value of n?",
        answer:
          "Correct: (a) 15 15 = 3¹ × 5¹. For 15n to be a perfect square, every prime factor must have an even exponent, so n must supply one more factor of 3 and one more factor of 5, i.e., n = 3 × 5 = 15. Then 15 × 15 = 225 = 15².",
        imageUrl: "/samples/gmat-focus-anki-deck-sample-1.webp",
      },
      {
        question: "The new tax policy will increase total government revenue, because it lowers the tax rate on small businesses, which will encourage them to report income they previously underreported to avoid high taxes. Which of the following is an assumption on which the argument depends?",
        answer:
          "Correct: (a) The increase in reported income resulting from lower rates will be large enough to offset the revenue lost from the rate reduction itself. The conclusion that total revenue will increase depends on the gain from newly reported income outweighing the loss from the lower rate applied to previously reported income. If this were false, the argument's conclusion would not follow.",
        imageUrl: "/samples/gmat-focus-anki-deck-sample-2.webp",
      },
      {
        question: "A line chart shows a company's monthly website traffic (in thousands of visits): January: 50, February: 65, March: 60, April: 80, May: 75, June: 95. In how many months (other than January, which has no prior month for comparison) did traffic decrease compared to the previous month?",
        answer:
          "Correct: (a) 2 Month-over-month changes: Feb (+15), Mar (-5, a decrease), Apr (+20), May (-5, a decrease), Jun (+20). Traffic decreased in exactly 2 months: March and May.",
        imageUrl: "/samples/gmat-focus-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free GMAT practice test?",
        answer:
          "Yes. Take the free 45-question GMAT Focus readiness check at uniprep2go.study/mock-exams/gmat-focus-readiness-check — timed section scoring and full answer review. The paid Anki deck includes 400 cards from the same validated bank for daily drilling.",
      },
      {
        question: "How many cards are in the GMAT Focus Anki deck?",
        answer:
          "The deck includes 400 flashcards across Quantitative Reasoning, Verbal Reasoning, and Data Insights — built from the same validated item bank as the free readiness check.",
      },
    ],
  },

  {
    slug: "sat-anki-deck",
    category: "academic",
    status: "planned",
    coverImage: "/covers/sat-anki-deck.webp",
    title: "Digital SAT Anki Deck",
    shortName: "Digital SAT",
    subtitle: "A planned spaced-repetition deck for Digital SAT Reading and Writing and Math.",
    directAnswer:
      "The Digital SAT Anki Deck is a planned UniPrep2Go product with 160 flashcards — 88 Reading and Writing and 72 Math — written to the eight official Digital SAT content domains. It is not yet available for purchase. Take the free Digital SAT readiness check to benchmark both scored sections first.",
    lastUpdated: "2026-10-02",
    audience:
      "High school students preparing for the Digital SAT using spaced repetition alongside College Board Bluebook practice.",
    format: ".apkg",
    facts: {
      cards: "160",
      topics: "Reading and Writing, Math",
      formulas: "High-yield Digital SAT section skills, grammar rules, algebra, and data analysis drills",
      examYear: "Digital SAT Suite (400–1600 scale)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      {
        name: "Reading and Writing",
        examWeight: "Section score 200–800 (54 official questions)",
        cards: "88",
      },
      {
        name: "Math",
        examWeight: "Section score 200–800 (44 official questions)",
        cards: "72",
      },
    ],
    sampleCards: [
      {
        question: "In the system 4x - 2y = 9 and kx - y = 3, k is a constant. If the system has no solution, what is the value of k?",
        answer:
          "Correct: (c) 2 No solution means parallel lines: same slope, different intercepts. The first line is y = 2x - 4.5; the second is y = kx - 3. Matching slopes gives k = 2, and the intercepts differ, so the lines never meet.",
        imageUrl: "/samples/sat-anki-deck-sample-1.webp",
      },
      {
        question: "Researchers hypothesized that a plant called sweet clover spreads quickly through prairies mainly because grazing animals avoid eating it, leaving it free to grow while native grasses are eaten. Which finding, if true, would most directly weaken the researchers' hypothesis?",
        answer:
          "Correct: (d) Sweet clover spreads just as quickly in fenced prairie plots where no grazing animals are present. If grazing avoidance were the main reason, removing grazers should remove sweet clover's advantage. Fast spread in fenced plots with no grazers shows the plant spreads quickly without that advantage, which undercuts the hypothesis.",
        imageUrl: "/samples/sat-anki-deck-sample-2.webp",
      },
      {
        question: "Ada Lovelace ______ wrote what many historians consider the first published computer program in the 1840s. Which choice completes the text so that it conforms to the conventions of Standard English?",
        answer:
          "Correct: (b) , the daughter of the poet Lord Byron, 'The daughter of the poet Lord Byron' is extra information about Lovelace (a nonrestrictive appositive), so it must be set off by a matching pair of commas, one before and one after.",
        imageUrl: "/samples/sat-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free Digital SAT practice test?",
        answer:
          "Yes. Take the free 49-question Digital SAT readiness check at uniprep2go.study/mock-exams/sat-readiness-check — scored on Reading and Writing and Math with full answer review. The paid Anki deck includes 160 cards from the same validated bank for daily drilling.",
      },
      {
        question: "How is this mock scored compared with the real SAT?",
        answer:
          "The official Digital SAT reports two section scores (Reading and Writing and Math) that sum to 400–1600. Our readiness check uses the same two axes — both sections must meet the readiness target for a pass — rather than a single blended percentage alone.",
      },
      {
        question: "How many cards are in the Digital SAT Anki deck?",
        answer:
          "The deck includes 160 unique flashcards — 88 Reading and Writing (information and ideas, craft and structure, expression of ideas, Standard English conventions) and 72 Math (algebra, advanced math, problem-solving and data analysis, geometry and trigonometry) — built from the same validated item bank as the free readiness check. Every card explains the correct answer and why each wrong choice fails.",
      },
    ],
  },


  {
    slug: "pmp-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/pmp-anki-deck.webp",
    title: "PMP Anki Deck",
    shortName: "PMP",
    subtitle: "A planned spaced-repetition deck for PMI PMP People, Process, and Business Environment domains.",
    directAnswer:
      "The PMP Anki Deck is a planned UniPrep2Go product with 346 flashcards across the three 2026 Exam Content Outline domains. It is not yet available for purchase. Take the free PMP readiness check to benchmark People, Process, and Business Environment first.",
    lastUpdated: "2026-09-29",
    audience:
      "Project managers preparing for the PMI Project Management Professional (PMP) exam using spaced repetition alongside ECO-aligned study.",
    format: ".apkg",
    facts: {
      cards: "346",
      topics: "People, Process, Business Environment",
      formulas: "High-yield PMP ECO tasks, predictive/agile/hybrid scenarios, and domain judgment drills",
      examYear: "PMP Exam Content Outline 2026",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      {
        name: "People",
        examWeight: "33% of PMP exam (2026 ECO)",
        cards: "114",
      },
      {
        name: "Process",
        examWeight: "41% of PMP exam (2026 ECO)",
        cards: "142",
      },
      {
        name: "Business Environment",
        examWeight: "26% of PMP exam (2026 ECO)",
        cards: "90",
      },
    ],
    sampleCards: [
      {
        question: "An agile team has 240 story points left in the release backlog. Its velocity over the last six two-week sprints averaged 30 points, ranging from 25 to 35. How should the project manager forecast the release date for stakeholders?",
        answer:
          "Correct: (c) Give a range of about 7 to 10 sprints (14 to 20 weeks) and update it as sprints complete Dividing the remaining points by the velocity range gives a forecast range: 240 / 35 is about 7 sprints and 240 / 25 is about 10. Communicating a range and updating it each sprint is honest and useful.",
        imageUrl: "/samples/pmp-anki-deck-sample-1.webp",
      },
      {
        question: "A project manager notices that during retrospectives, the same few team members always speak while others remain silent. When asked directly, the quiet members say everything is fine, but body language suggests otherwise. What facilitation technique should the project manager implement?",
        answer:
          "Correct: (b) Use anonymous feedback collection methods like sticky notes or digital tools Anonymous feedback collection removes the social pressure that may prevent quieter team members from sharing their thoughts, allowing for more honest and complete input from all participants.",
        imageUrl: "/samples/pmp-anki-deck-sample-2.webp",
      },
      {
        question: "During project execution, a critical vendor informs the project manager that they cannot deliver a key component by the planned date due to supply chain issues. This will impact the project's critical path. Which process should the project manager execute first?",
        answer:
          "Correct: (c) Perform integrated change control to evaluate options and impacts When a change occurs that impacts the project's critical path, the project manager should first execute integrated change control to evaluate all options, assess impacts, and determine the best course of action before making decisions or updates.",
        imageUrl: "/samples/pmp-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free PMP practice test?",
        answer:
          "Yes. Take the free 51-question PMP readiness check at uniprep2go.study/mock-exams/pmp-readiness-check — scored on People, Process, and Business Environment with full answer review. The paid Anki deck includes 346 cards from the same validated bank for daily drilling.",
      },
      {
        question: "How is this mock scored compared with the real PMP?",
        answer:
          "The official PMP Exam Content Outline (2026) weights People 33%, Process 41%, and Business Environment 26%, and PMI reports domain performance. Our readiness check uses the same three axes — all domains must meet the readiness target for a pass.",
      },
      {
        question: "How many cards are in the PMP Anki deck?",
        answer:
          "The deck includes 346 flashcards across People, Process, and Business Environment — built from the same validated item bank as the free readiness check.",
      },
    ],
  },


  {
    slug: "gre-anki-deck",
    category: "academic",
    status: "planned",
    coverImage: "/covers/gre-anki-deck.webp",
    title: "GRE General Anki Deck",
    shortName: "GRE",
    subtitle: "A planned spaced-repetition deck for GRE Verbal Reasoning and Quantitative Reasoning.",
    directAnswer:
      "The GRE General Anki Deck is a planned UniPrep2Go product with 350 flashcards across Verbal and Quantitative Reasoning (175 each). It is not yet available for purchase. Take the free 30-question / 45-minute GRE readiness check first (both Verbal and Quant axes required). Official shorter GRE is about 1 hour 58 minutes with 27 Verbal + 27 Quant plus Analytical Writing — our mock is a diagnostic baseline, not PowerPrep.",
    lastUpdated: "2026-09-03",
    audience:
      "Graduate school applicants preparing for the ETS GRE General Test using spaced repetition alongside PowerPrep.",
    format: ".apkg",
    facts: {
      cards: "350",
      topics: "Verbal Reasoning, Quantitative Reasoning",
      formulas: "High-yield GRE Verbal (TC/SE/RC) and Quant (arithmetic, algebra, geometry, data analysis) drills",
      examYear: "GRE General Test (Verbal/Quant 130–170)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      {
        name: "Verbal Reasoning",
        examWeight: "Section score 130–170 (27 official questions)",
        cards: "175",
      },
      {
        name: "Quantitative Reasoning",
        examWeight: "Section score 130–170 (27 official questions)",
        cards: "175",
      },
    ],
    sampleCards: [
      {
        question: "A water tank can be filled by pipe A alone in 12 hours and by pipe B alone in 18 hours. If both pipes work together for 4 hours and then pipe A is closed, how many additional hours will it take pipe B alone to finish filling the tank?",
        answer:
          "Correct: (d) 8 hours",
        imageUrl: "/samples/gre-anki-deck-sample-1.webp",
      },
      {
        question: "The pharmaceutical company's research findings were initially _______ by the scientific community, but subsequent independent studies _______ the original conclusions, leading to widespread acceptance of the new treatment protocol.",
        answer:
          "Correct: (a) scrutinized .. corroborated The sentence describes a progression from initial skepticism to eventual acceptance. 'Scrutinized' (examined critically) fits the initial scientific caution, while 'corroborated' (confirmed) explains how independent studies supported the findings, leading to acceptance.",
        imageUrl: "/samples/gre-anki-deck-sample-2.webp",
      },
      {
        question: "The archaeological evidence from the recently excavated site challenges the prevailing theory about ancient trade routes. The discovery of Mediterranean pottery fragments in what was believed to be an isolated inland settlement suggests that",
        answer:
          "Correct: (d) trade networks in the ancient world were more extensive than scholars had assumed The presence of Mediterranean pottery in an 'isolated inland settlement' directly contradicts the assumption of isolation, indicating that trade networks reached farther than previously believed and were more extensive than scholars had assumed.",
        imageUrl: "/samples/gre-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free GRE practice test?",
        answer:
          "Yes. Take the free 30-question GRE General readiness check at uniprep2go.study/mock-exams/gre-readiness-check — scored on Verbal and Quant with full answer review. The paid Anki deck includes 350 cards from the same validated bank for daily drilling.",
      },
      {
        question: "How is this mock scored compared with the real GRE?",
        answer:
          "The official GRE General Test reports Verbal and Quantitative scores from 130–170 each (plus Analytical Writing 0–6). Our readiness check uses the two MCQ axes — both must meet the readiness target for a pass. Writing is not included.",
      },
      {
        question: "How many cards are in the GRE Anki deck?",
        answer:
          "The deck includes 350 flashcards — 175 Verbal and 175 Quantitative — built from the same validated item bank as the free readiness check.",
      },
    ],
  },

  {
    slug: "cat4-level-d-anki-deck-printable-pdf",
    category: "academic",
    status: "available",
    title: "CAT4 Level D Anki Deck + Printable PDF — Grade 7 Verbal & Quantitative",
    shortName: "CAT4 Level D",
    subtitle: "200-card Anki deck + 49-page printable workbook for CAT4 Level D verbal and quantitative subtests.",
    directAnswer:
      "CAT4 Level D bundle for Year 7 / Grade 7 selective entry: 200 Anki cards plus a ~49-page printable PDF with 192 worked examples across Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Official CAT4 Level D (GL Assessment) runs about 2 hours 15 minutes across four batteries and reports Standard Age Scores (mean 100, SD 15) — there is no pass/fail cut. This pack does not include non-verbal figure items or spatial subtests. Instant download for {PRICE} through Gumroad. Independent — not affiliated with GL Assessment.",
    lastUpdated: "2026-10-04",
    audience:
      "Parents and tutors preparing students for CAT4 Level D at UK independent schools, grammar schools, and Year 7 / Grade 7 entry.",
    format: ".apkg",
    coverImage: "/covers/cat4-level-d-anki-deck-printable-pdf.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/mhgni?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "200 Anki cards + 49-page PDF",
      topics:
        "Verbal Classification, Verbal Analogies, Number Analogies, and Number Series",
      formulas: "Reasoning patterns, analogy logic, number-series rules, and timed printable practice blocks",
      examYear: "CAT4 Level D (Grade 7 / Year 7)",
      delivery: "Digital download through Gumroad (.apkg + PDF)",
    },
    topicCoverage: [
      { name: "Anki Deck", examWeight: "200 cards", cards: "Method cards + 4 subtests × 48 worked examples" },
      { name: "Verbal Classification", examWeight: "CAT4 subtest", cards: "Worked examples with full explanations" },
      { name: "Verbal Analogies", examWeight: "CAT4 subtest", cards: "Worked examples with full explanations" },
      { name: "Number Analogies", examWeight: "CAT4 subtest", cards: "Worked examples with full explanations" },
      { name: "Number Series", examWeight: "CAT4 subtest", cards: "Worked examples with full explanations" },
      { name: "Printable PDF", examWeight: "~49 pages", cards: "192 worked-example cards with answers and insights" },
    ],
    sampleCards: [
      {
        question: "Verbal analogy practice cards from the printable PDF",
        answer:
          "Each printable card shows a CAT4-style analogy, five answer choices, the correct answer, and a short insight explaining the relationship pattern.",
        imageUrl: "/samples/cat4-level-d-anki-deck-printable-pdf-sample-1.webp",
      },
      {
        question: "Number analogy patterns with worked insights",
        answer:
          "Number analogy cards teach the rule behind each pair sequence — double-and-add, square, triple, subtract, and other CAT4-style transformations.",
        imageUrl: "/samples/cat4-level-d-anki-deck-printable-pdf-sample-2.webp",
      },
      {
        question: "Number series cards for the final review week",
        answer:
          "Number series pages include full worked sequences, answer keys, and insight lines so missed patterns become targeted Anki review.",
        imageUrl: "/samples/cat4-level-d-anki-deck-printable-pdf-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the CAT4 Level D bundle include?",
        answer:
          "A 200-card Anki deck (.apkg) and a ~49-page printable PDF workbook with 192 worked-example cards, answer keys, and insights across Verbal Classification, Verbal Analogies, Number Analogies, and Number Series.",
      },
      {
        question: "Which CAT4 subtests are covered?",
        answer:
          "Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Official CAT4 also has non-verbal (figure classification/matrices) and spatial batteries — those are not in this bundle.",
      },
      {
        question: "Who is this bundle for?",
        answer:
          "Parents and tutors preparing students for CAT4 Level D at UK independent or grammar schools, typically Year 7 / Grade 7 entry.",
      },
      {
        question: "Is this official CAT4 material?",
        answer:
          "No. This is an independent prep2go product in CAT4-style format and is not affiliated with, endorsed by, or sponsored by GL Assessment or CAT4.",
      },
      {
        question: "Is there a passing score on CAT4 Level D?",
        answer:
          "No. Schools use Standard Age Scores (mean 100, SD 15), stanines, and percentiles. This bundle is pattern practice, not a scored GL Assessment sitting.",
      },
      {
        question: "How should I use the Anki deck and PDF together?",
        answer:
          "Start with method cards in Anki, practice timed blocks on paper with the PDF, check answers, then repeat weak subtests in Anki during the final review week.",
      },
    ],
  },

  // ── Professional / Food Safety ─────────────────────────────────────────
  {
    slug: "mrics-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/mrics-anki-deck.webp",
    title: "MRICS APC Anki Deck",
    shortName: "MRICS / APC",
    subtitle: "A planned deck for RICS Assessment of Professional Competence and final interview prep.",
    directAnswer:
      "The MRICS APC Anki Deck is a planned UniPrep2Go product covering mandatory competencies, ethics, and pathway technical knowledge for RICS chartered membership. It is not yet available for purchase. Take the free MRICS readiness check to benchmark weak areas.",
    lastUpdated: "2026-06-02",
    audience:
      "Quantity surveyors, building surveyors, commercial property professionals, and project managers preparing for RICS APC and MRICS membership.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "Mandatory, core, and optional APC competencies; ethics; case study and interview prep",
      formulas: "Planned valuation, measurement, and technical pathway reference facts",
      examYear: "Current RICS APC cycle (Candidate Guide March 2026 amendment)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Mandatory Competencies", examWeight: "All pathways", cards: "Planned" },
      { name: "Ethics and Rules of Conduct", examWeight: "Final interview (auto-refer risk)", cards: "Planned" },
      { name: "Core Technical Competencies", examWeight: "Pathway-specific Level 1–3", cards: "Planned" },
      { name: "Level 2/3 Application and Advice", examWeight: "Submission + interview", cards: "Planned" },
      { name: "Case Study and Interview Structure", examWeight: "APC final assessment", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A retail landlord asks you to confirm a tenant fit-out completes two weeks before Christmas trading. You lack the contractor programme. What is the most professional response?",
        answer:
          "Correct: (a) Explain the information gap, confirm what you can verify now, and agree a realistic update once the programme arrives Client care combines honesty about uncertainty with proactive information gathering.",
        imageUrl: "/samples/mrics-anki-deck-sample-1.webp",
      },
      {
        question: "When you learn confidential client budget data while advising Party A and Party B asks you to tender on the same scheme, what aligns with RICS Rules of Conduct?",
        answer:
          "Correct: (a) Decline or disclose the conflict to both parties and seek written consent before proceeding Conduct requires early identification, disclosure, and appropriate action.",
        imageUrl: "/samples/mrics-anki-deck-sample-2.webp",
      },
      {
        question: "For Level 2 versus Level 3 APC application, regarding deputising for your manager on a complex client meeting, which guidance is correct?",
        answer:
          "Correct: (a) Deputising may support Level 3 if key decisions and advice were yours Competency levels are based on knowledge, application, and accountable advice.",
        imageUrl: "/samples/mrics-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free MRICS practice test?",
        answer:
          "Yes. Take the free 50-question APC readiness check at uniprep2go.study/mock-exams/mrics-readiness-check.",
      },
      {
        question: "Does this replace the RICS APC submission or interview?",
        answer:
          "No. MRICS requires written submissions and a 60-minute final assessment interview administered by RICS. This deck and mock are supplementary knowledge prep only.",
      },
      {
        question: "Is this official RICS material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by RICS.",
      },
    ],
  },
  {
    slug: "mrics-quantity-surveying-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/mrics-quantity-surveying-anki-deck.webp",
    title: "MRICS Quantity Surveying Anki Deck",
    shortName: "MRICS QS",
    subtitle:
      "Focused Anki deck for the RICS Quantity Surveying and Construction APC pathway — NRM, contracts, cost planning + free QS mock.",
    directAnswer:
      "The MRICS Quantity Surveying Anki Deck is a planned UniPrep2Go product covering QS core competencies, mandatory ethics, and interview prep. It is not yet available for purchase. Take the free QS pathway readiness check to benchmark weak competencies.",
    lastUpdated: "2026-08-11",
    audience:
      "Assistant quantity surveyors, cost consultants, commercial managers, and QS graduates on the Quantity Surveying and Construction APC pathway who want Anki .apkg drills plus a free timed competency mock — not a subscription flashcard site.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "Six QS core competencies to Level 3, two optional to Level 2, mandatory ethics",
      formulas: "Planned measurement, cost plan, cash flow, and contract valuation facts",
      examYear: "RICS QS pathway guide (December 2025)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Commercial Management / Cost Planning", examWeight: "Core Level 3", cards: "Planned" },
      { name: "Quantification and Costing", examWeight: "Core Level 3", cards: "Planned" },
      { name: "Contract Practice & Procurement", examWeight: "Core Level 3", cards: "Planned" },
      { name: "Project Finance & Construction Technology", examWeight: "Core Level 3", cards: "Planned" },
      { name: "Mandatory Ethics & Optional Competencies", examWeight: "Ethics L3; 2 optional L2", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A commercial director on a main contractor framework asks you to review three tender returns for a £12m school extension. Returns range £11.4m–£13.1m. What is your best next step?",
        answer:
          "Correct: (b) Analyse scope compliance, qualifications, preliminaries, risk, programme, and resource assumptions before recommendation Commercial management includes rigorous tender return analysis beyond headline price.",
        imageUrl: "/samples/mrics-quantity-surveying-anki-deck-sample-1.webp",
      },
      {
        question: "An item description reads 'Excavate foundation trenches, max depth 1.2m'. The site requires 2.1m deep trenches in rock. How should quantification treat this?",
        answer:
          "Correct: (b) Amend description and measure additional depth/rock as separate items or provisional sum per tender strategy BOQ preparation must align descriptions and quantities with site and design information.",
        imageUrl: "/samples/mrics-quantity-surveying-anki-deck-sample-2.webp",
      },
      {
        question: "Under NEC4 ECC Option C, target cost mechanics mean",
        answer:
          "Correct: (b) Defined cost plus fee with pain/gain share against agreed target at completion NEC Option C combines target cost with defined cost and pain/gain share.",
        imageUrl: "/samples/mrics-quantity-surveying-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the best MRICS Quantity Surveying Anki deck for APC?",
        answer:
          "Prefer a QS-pathway Anki .apkg with NRM measurement, JCT/NEC contract practice, cost planning, and ethics — plus a free timed QS readiness check — over a generic 2,000-card Brainscape pack without a diagnostic mock. UniPrep2Go’s MRICS QS deck ships that stack.",
      },
      {
        question: "Is there a free MRICS Quantity Surveying practice test?",
        answer:
          "Yes. Take the free 50-question QS pathway readiness check at uniprep2go.study/mock-exams/mrics-quantity-surveying-readiness-check — competency scoring, then drill weak rows in this Anki deck.",
      },
      {
        question: "How is this different from the general MRICS readiness check?",
        answer:
          "The general MRICS mock covers APC structure for all pathways. This QS-specific mock and deck target Quantity Surveying core competencies — measurement, contracts, commercial management, and cost planning.",
      },
      {
        question: "Is this official RICS material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by RICS.",
      },
    ],
  },
  {
    slug: "cfps-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/cfps-anki-deck.webp",
    title: "CFPS Anki Deck",
    shortName: "CFPS",
    subtitle: "A planned deck for NFPA Certified Fire Protection Specialist exam prep.",
    directAnswer:
      "The CFPS Anki Deck is a planned UniPrep2Go product covering NFPA's eight CFPS exam domains. It is not yet available for purchase. Take the free CFPS readiness check to benchmark weak domains.",
    lastUpdated: "2026-06-02",
    audience:
      "Fire protection engineers, fire marshals, AHJ staff, consultants, and safety professionals preparing for NFPA's Certified Fire Protection Specialist credential.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "All eight NFPA CFPS blueprint domains (Fire Protection Handbook, 21st Ed.)",
      formulas: "Planned hydraulics, occupancy calculations, and code reference facts",
      examYear: "NFPA CFPS blueprint (Handbook 21st Edition, exam updated June 2024)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Fire Suppression", examWeight: "22%", cards: "Planned" },
      { name: "Safety in the Built Environment", examWeight: "16%", cards: "Planned" },
      { name: "Detection and Alarm", examWeight: "14%", cards: "Planned" },
      { name: "Fire Prevention Programs & Environments", examWeight: "12%", cards: "Planned" },
      { name: "Information & Analysis / Hazard Management / Rescue / Confining Fires", examWeight: "9% each", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "When a fire wall separates two portions of a building, structural design often requires?",
        answer:
          "Correct: (b) Independent structural framing on each side so collapse on one side does not pull down the other Structural independence is a defining fire wall feature — butt joints, double walls, or protected structural members achieve this.",
        imageUrl: "/samples/cfps-anki-deck-sample-1.webp",
      },
      {
        question: "Illumination levels for emergency lighting on the walking surface of egress paths are typically required to be at least",
        answer:
          "Correct: (a) 1 foot-candle (10.8 lux) measured at the floor NFPA 101 requires minimum 1 fc at the walking surface along egress routes during emergency mode.",
        imageUrl: "/samples/cfps-anki-deck-sample-2.webp",
      },
      {
        question: "CFAST (Consolidated Model of Fire and Smoke Transport) is primarily classified as:",
        answer:
          "Correct: (a) A two-zone compartment fire model used for rapid scenario analysis CFAST couples zone model compartments with vent flow, plume correlations, and target heating for engineering-level predictions.",
        imageUrl: "/samples/cfps-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free CFPS practice test?",
        answer:
          "Yes. Take the free 50-question readiness check at uniprep2go.study/mock-exams/cfps-readiness-check.",
      },
      {
        question: "Does this replace NFPA's official CFPS practice examination?",
        answer:
          "No. NFPA sells a practice exam with 100 retired questions at nfpa.org. This deck and mock are independent supplementary prep.",
      },
      {
        question: "Is this official NFPA material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by NFPA.",
      },
    ],
  },
  {
    slug: "nebosh-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/nebosh-anki-deck.webp",
    title: "NEBOSH IGC Anki Deck",
    shortName: "NEBOSH IGC",
    subtitle: "A planned deck for NEBOSH International General Certificate (GIC1/GIC2) exam prep.",
    directAnswer:
      "The NEBOSH IGC Anki Deck is a planned UniPrep2Go product covering NEBOSH International General Certificate syllabus elements. It is not yet available for purchase. Take the free NEBOSH readiness check to benchmark weak domains.",
    lastUpdated: "2026-09-29",
    audience:
      "Health and safety officers, supervisors, managers, and career changers preparing for the NEBOSH International General Certificate through an accredited Learning Partner.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics:
        "GIC1 Elements 1–4 (open book exam) and GIC2 Elements 5–11 hazards + risk assessment (practical) per NEBOSH IGC syllabus",
      formulas: "Planned hierarchy of control, risk rating, and incident investigation facts",
      examYear: "NEBOSH IGC syllabus (January 2026 learner guide)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "H&S Management Systems and Culture", examWeight: "GIC1 Elements 1–4 (open book exam)", cards: "Planned" },
      {
        name: "Physical, Psychological, and Musculoskeletal Health",
        examWeight: "Elements 5–6 — assessed in GIC2 practical",
        cards: "Planned",
      },
      {
        name: "Chemical, Biological, and Workplace Hazards",
        examWeight: "Elements 7–8 — assessed in GIC2 practical",
        cards: "Planned",
      },
      {
        name: "Work Equipment, Fire, and Electricity",
        examWeight: "Elements 9–11 — assessed in GIC2 practical",
        cards: "Planned",
      },
      { name: "Risk Assessment (GIC2)", examWeight: "GIC2 practical unit", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A warehouse operative reports lower back pain after repeated lifting of 20 kg sacks from floor level. Which initial control is most aligned with the hierarchy of control?",
        answer:
          "Correct: (a) Provide a mechanical lift or raise the load source to waist height to reduce bending and manual exertion Engineering and task redesign that reduce bending and load handling at floor level address the musculoskeletal hazard at source.",
        imageUrl: "/samples/nebosh-anki-deck-sample-1.webp",
      },
      {
        question: "A principal contractor selects subcontractors for façade work at height. Which action best meets NEBOSH expectations for contractor management?",
        answer:
          "Correct: (a) Pre-qualify competence, define H&S requirements in contract, monitor site performance, and coordinate shared risks Contractor management includes selection, induction, contractual H&S clauses, monitoring, and coordination of overlapping activities and shared site risks.",
        imageUrl: "/samples/nebosh-anki-deck-sample-2.webp",
      },
      {
        question: "Static electricity ignition in a solvent filling area is controlled by:",
        answer:
          "Correct: (c) Bonding and earthing, conductive footwear/floors, humidity control, and exclusion of ignition sources Bonding/earthing prevents static buildup discharges in flammable atmospheres.",
        imageUrl: "/samples/nebosh-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free NEBOSH practice test?",
        answer:
          "Yes. Take the free 50-question readiness check at uniprep2go.study/mock-exams/nebosh-readiness-check.",
      },
      {
        question: "Does this replace NEBOSH official assessments?",
        answer:
          "No. Official GIC1 and GIC2 assessments are administered by NEBOSH through accredited Learning Partners. This deck and mock are supplementary independent prep.",
      },
      {
        question: "Is this official NEBOSH material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by NEBOSH.",
      },
    ],
  },
  {
    slug: "cdcp-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/cdcp-anki-deck.webp",
    title: "CDCP Anki Deck",
    shortName: "CDCP",
    subtitle: "250 Anki flashcards for EXIN EPI Certified Data Centre Professional (CDCP) exam prep.",
    directAnswer:
      "The CDCP Anki Deck is a UniPrep2Go product with 250 MCQ flashcards covering EXIN EPI Certified Data Centre Professional domains — site/standards, power & EMF, cooling, fire/security, and operations — plus a free 40-question timed readiness check.",
    lastUpdated: "2026-08-14",
    audience:
      "Data centre operators, facility engineers, and IT infrastructure professionals preparing for the EXIN EPI CDCP credential after accredited EPI training.",
    format: ".apkg",
    facts: {
      cards: "250",
      topics: "Facilities (power, cooling, fire, security) and Operations per EXIN EPI CDCP blueprint",
      formulas: "PUE, cooling capacity, UPS sizing, and tier-classification facts",
      examYear: "Current EXIN EPI CDCP cycle",
      delivery: "Digital download via Gumroad",
    },
    topicCoverage: [
      { name: "Site, Standards, and Building", examWeight: "~7.5%", cards: "50" },
      { name: "Power Infrastructure and EMF", examWeight: "~20%", cards: "50" },
      { name: "Cooling, Water, and Thermal", examWeight: "~12.5%", cards: "50" },
      { name: "Fire Protection, Security, and Network", examWeight: "~35%", cards: "50" },
      { name: "Data Centre Operations", examWeight: "15%", cards: "50" },
    ],
    sampleCards: [
      {
        question: "Hot aisle containment primarily improves",
        answer:
          "Correct: (a) Return air temperature to cooling units, raising delta-T and efficiency Hot aisle containment effectively isolates the hot exhaust air from IT equipment, preventing it from mixing with the cold supply air. This isolation ensures that the cooling units receive a higher, more consistent return air temperature, which increases the temperature differential (delta-T) across the cooling coil and improves the efficiency of the cooling system.",
        imageUrl: "/samples/cdcp-anki-deck-sample-1.webp",
      },
      {
        question: "EN 50600 classifies availability using Availability Classes. Class 3 MOST closely aligns with:",
        answer:
          "Correct: (c) Concurrently maintainable infrastructure with redundant paths EN 50600 Availability Class 3 specifies a data center infrastructure that is concurrently maintainable, featuring redundant components and multiple independent distribution paths for power and cooling. This allows for planned maintenance activities without requiring a shutdown of IT operations.",
        imageUrl: "/samples/cdcp-anki-deck-sample-2.webp",
      },
      {
        question: "Dual-corded servers connected to A and B PDUs",
        answer:
          "Correct: (c) Allow maintenance on one power path while the other feeds the load Dual-corded servers connected to independent A and B PDUs are a fundamental design for redundancy in data centers. This configuration allows for concurrent maintenance on one power path without interrupting the server's operation, as the other path continues to feed the load, ensuring high availability and failover capability.",
        imageUrl: "/samples/cdcp-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free CDCP practice test?",
        answer:
          "Yes. Take the free 40-question readiness check at uniprep2go.study/mock-exams/cdcp-readiness-check.",
      },
      {
        question: "Does this replace EXIN or EPI official training?",
        answer:
          "No. Accredited EPI CDCP training is mandatory before the official exam. This deck and mock are supplementary independent prep.",
      },
      {
        question: "Is this official EXIN or EPI material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by EXIN or EPI.",
      },
    ],
  },
  {
    slug: "ashrae-certifications-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/ashrae-certifications-anki-deck.webp",
    title: "ASHRAE Certifications Anki Deck",
    shortName: "ASHRAE Certs",
    subtitle: "A planned deck for BCxP, BEMP, BEAP, CHD, HBDP, HFDP, and OPMP exam prep.",
    directAnswer:
      "The ASHRAE Certifications Anki Deck is a planned UniPrep2Go shared-core product across seven separate ASHRAE certifications (BCxP, BEAP, BEMP, CHD, HBDP, HFDP, OPMP) — each has its own exam, blueprint, and candidate guidebook. It is not yet available for purchase. Take the free ASHRAE certifications readiness check to benchmark weak domains.",
    lastUpdated: "2026-06-02",
    audience:
      "HVAC engineers, energy modelers, commissioning agents, and facility professionals pursuing ASHRAE BCxP, BEMP, BEAP, CHD, HBDP, HFDP, or OPMP credentials.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "BEMP, BEAP, BCxP, CHD, HBDP, HFDP, OPMP exam blueprints",
      formulas: "Planned energy modeling, commissioning, HVAC design, and operations facts",
      examYear: "Current ASHRAE certification cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Building Energy Modeling (BEMP)", examWeight: "ASHRAE credential", cards: "Planned" },
      { name: "Building Energy Assessment (BEAP)", examWeight: "ASHRAE credential", cards: "Planned" },
      { name: "Building Commissioning (BCxP)", examWeight: "ASHRAE credential", cards: "Planned" },
      { name: "HVAC / High-Performance Design (CHD, HBDP, HFDP)", examWeight: "ASHRAE credentials", cards: "Planned" },
      { name: "Operations & Performance (OPMP)", examWeight: "ASHRAE credential", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "An assessment finding open outdoor air dampers in winter suggests",
        answer:
          "Correct: (d) Economizer or damper actuator failure causing massive heating load Stuck dampers are common retrocommissioning fixes with fast payback.",
        imageUrl: "/samples/ashrae-certifications-anki-deck-sample-1.webp",
      },
      {
        question: "Pump affinity laws indicate pump power scales approximately with:",
        answer:
          "Correct: (c) The cube of speed (or flow) ratio for variable-speed applications VFDs on variable-load pumps yield significant energy savings.",
        imageUrl: "/samples/ashrae-certifications-anki-deck-sample-2.webp",
      },
      {
        question: "When calibrating an existing-building energy model to utility data, a common acceptance criterion is?",
        answer:
          "Correct: (c) Monthly or annual simulated energy within an agreed tolerance (often ±5–15%) of billed consumption after normalization ASHRAE and industry practice use tolerance bands on normalized utility data to judge model calibration quality.",
        imageUrl: "/samples/ashrae-certifications-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free ASHRAE certification practice test?",
        answer:
          "Yes. Take the free 50-question readiness check at uniprep2go.study/mock-exams/ashrae-certifications-readiness-check.",
      },
      {
        question: "Does this replace ASHRAE official practice exams?",
        answer:
          "No. ASHRAE sells official 30-question practice exams per credential at ashrae.org. This deck and mock are independent prep.",
      },
      {
        question: "Is this official ASHRAE material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by ASHRAE.",
      },
    ],
  },
  {
    slug: "leed-green-associate-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/leed-green-associate-anki-deck.webp",
    title: "LEED Green Associate Anki Deck",
    shortName: "LEED GA",
    subtitle: "A planned spaced-repetition deck for LEED Green Associate exam domains.",
    directAnswer:
      "The LEED Green Associate Anki Deck is a planned UniPrep2Go product for sustainability and design professionals preparing for the GBCI LEED GA exam. It is not yet available for purchase. Take the free LEED GA readiness check first.",
    lastUpdated: "2026-06-02",
    audience: "Architects, engineers, sustainability consultants, and students entering green building and LEED project roles.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "LEED process, location, sites, water, energy, materials, IEQ",
      formulas: "Planned credit thresholds, terminology, and high-yield GA facts",
      examYear: "Current GBCI LEED Green Associate cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Integrative Process and Project Context", examWeight: "LEED GA domain", cards: "Planned" },
      { name: "Location and Transportation", examWeight: "LEED GA domain", cards: "Planned" },
      { name: "Sustainable Sites and Water", examWeight: "LEED GA domain", cards: "Planned" },
      { name: "Energy and Atmosphere", examWeight: "LEED GA domain", cards: "Planned" },
      { name: "Materials and IEQ", examWeight: "LEED GA domain", cards: "Planned" },
    ],
    sampleCards: [
      {
        question:
          "During pre-design, the integrative process requires establishing performance targets early. Which approach best demonstrates this methodology?",
        answer:
          "Correct: (c) Defining sustainability goals and performance metrics before design development begins. Integrative process emphasizes early goal-setting so the team aligns decisions with sustainability objectives from the start.",
        imageUrl: "/samples/leed-green-associate-anki-deck-sample-1.webp",
      },
      {
        question:
          "A mechanical engineer finds that daylight harvesting could reduce HVAC size requirements. This best illustrates which integrative process principle?",
        answer:
          "Correct: (b) Systems thinking and cross-disciplinary collaboration. Systems thinking considers how building systems interact and identifies synergies across disciplines.",
        imageUrl: "/samples/leed-green-associate-anki-deck-sample-2.webp",
      },
      {
        question:
          "When establishing sustainability context during integrative process planning, which factor is most critical?",
        answer:
          "Correct: (b) The local climate, site conditions, and regional environmental priorities. Context analysis informs which LEED credits and strategies fit the specific project location.",
        imageUrl: "/samples/leed-green-associate-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free LEED Green Associate practice test?",
        answer:
          "Yes. Take the free 50-question LEED GA readiness check at uniprep2go.study/mock-exams/leed-green-associate-readiness-check.",
      },
      {
        question: "Is this official USGBC material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by USGBC or GBCI.",
      },
    ],
  },
  {
    slug: "leed-ap-bd-c-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/leed-ap-bd-c-anki-deck.webp",
    title: "LEED AP BD+C Anki Deck",
    shortName: "LEED AP BD+C",
    subtitle: "A planned deck for the LEED AP Building Design + Construction specialty.",
    directAnswer:
      "The LEED AP BD+C Anki Deck is a planned UniPrep2Go product for professionals pursuing the GBCI LEED AP BD+C credential (requires LEED GA). Take the free readiness check to benchmark weak credit categories.",
    lastUpdated: "2026-06-02",
    audience: "Design professionals and LEED GA holders preparing for the BD+C specialty exam.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "BD+C prerequisites and credits across SS, WE, EA, MR, IEQ, LT, IP",
      formulas: "Planned credit thresholds, compliance paths, and AP-level scenario facts",
      examYear: "Current GBCI LEED AP BD+C cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Integrative Process and Location", examWeight: "BD+C categories", cards: "Planned" },
      { name: "Sustainable Sites and Water", examWeight: "BD+C categories", cards: "Planned" },
      { name: "Energy and Atmosphere", examWeight: "BD+C categories", cards: "Planned" },
      { name: "Materials and Resources", examWeight: "BD+C categories", cards: "Planned" },
      { name: "Indoor Environmental Quality", examWeight: "BD+C categories", cards: "Planned" },
    ],
    sampleCards: [
      {
        question:
          "A project team is conducting an integrative design charrette for a new office building. Which participant would be MOST critical during early conceptual design to optimize energy performance and daylighting?",
        answer:
          "Correct: (b) Building envelope consultant. Envelope expertise is essential early because thermal performance, daylighting, and energy efficiency integrate at the building skin.",
        imageUrl: "/samples/leed-ap-bd-c-anki-deck-sample-1.webp",
      },
      {
        question:
          "A mixed-use development near transit wants a strategy that addresses multiple Location and Transportation credit intents through coordinated policies and mode-shift programs. Which option best fits?",
        answer:
          "Correct: (d) Implement a comprehensive transportation demand management program. TDM combines policies, incentives, and monitoring to reduce drive-alone trips across multiple LT strategies.",
        imageUrl: "/samples/leed-ap-bd-c-anki-deck-sample-2.webp",
      },
      {
        question:
          "During integrative process, the mechanical engineer finds a conflict between optimal energy performance and acceptable indoor air quality. What should the team do FIRST?",
        answer:
          "Correct: (d) Schedule a collaborative workshop with all relevant disciplines. Integrative process emphasizes cross-discipline problem-solving to find synergistic solutions.",
        imageUrl: "/samples/leed-ap-bd-c-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free LEED AP BD+C practice test?",
        answer:
          "Yes. Take the free 50-question readiness check at uniprep2go.study/mock-exams/leed-ap-bd-c-readiness-check.",
      },
      {
        question: "Do I need LEED Green Associate first?",
        answer: "Yes — GBCI requires an active LEED GA before earning LEED AP BD+C (unless passing both in one combined exam sitting).",
      },
    ],
  },
  {
    slug: "leed-ap-om-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/leed-ap-om-anki-deck.webp",
    title: "LEED AP O+M Anki Deck",
    shortName: "LEED AP O+M",
    subtitle: "A planned spaced-repetition deck for LEED AP Operations + Maintenance on existing buildings.",
    directAnswer:
      "The LEED AP O+M Anki Deck is a planned UniPrep2Go product with 250 flashcards for GBCI LEED AP Operations + Maintenance. It is not yet available for purchase. Take the free LEED AP O+M readiness check first. Requires LEED Green Associate for the specialty pathway.",
    lastUpdated: "2026-07-16",
    audience:
      "Facility managers, building engineers, and LEED Green Associates pursuing LEED AP O+M for existing-building operations.",
    format: ".apkg",
    facts: {
      cards: "250",
      topics: "Process & integrative planning, location & sites, water, energy & atmosphere, materials & IEQ",
      formulas: "High-yield O+M performance, metering, commissioning, waste, IAQ, and green cleaning drills",
      examYear: "LEED AP O+M (GBCI specialty; LEED v5 transition window)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "LEED Process and Integrative Planning", examWeight: "~20% of O+M domains", cards: "50" },
      { name: "Location, Transportation, and Sustainable Sites", examWeight: "~16%", cards: "50" },
      { name: "Water Efficiency", examWeight: "~10%", cards: "50" },
      { name: "Energy and Atmosphere", examWeight: "~24% (heaviest O+M domain)", cards: "50" },
      { name: "Materials, Resources, and IEQ", examWeight: "~30%", cards: "50" },
    ],
    sampleCards: [
      {
        question:
          "A campus is adding 2 EV charging stations for O+M transportation credits. What else should the team verify?",
        answer:
          "Correct: (a) Confirm stations are installed, powered, and accessible for intended users during the performance period. Chargers must be available for occupants/visitors as intended and documented during the performance period.",
        imageUrl: "/samples/leed-ap-om-anki-deck-sample-1.webp",
      },
      {
        question: "An O+M team wants to reduce site runoff pollution. Which action is most aligned?",
        answer:
          "Correct: (b) Maintain bioretention areas and keep storm inlets clear of sediment and debris. O+M site credits favor maintaining vegetated practices and reducing untreated runoff.",
        imageUrl: "/samples/leed-ap-om-anki-deck-sample-2.webp",
      },
      {
        question:
          "Operators want energy savings without capital retrofit. Which AHU optimal start action helps?",
        answer:
          "Correct: (b) Implement and verify BAS schedules/setpoints that match actual occupancy. Tuning schedules and setpoints is a core O+M energy strategy when comfort requirements are still met.",
        imageUrl: "/samples/leed-ap-om-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free LEED AP O+M practice test?",
        answer:
          "Yes. Take the free 50-question LEED AP O+M readiness check at uniprep2go.study/mock-exams/leed-ap-om-readiness-check. The paid Anki deck includes 250 cards from the same validated bank.",
      },
      {
        question: "Do I need LEED Green Associate before LEED AP O+M?",
        answer:
          "Yes for the specialty-only exam path — an active LEED GA is required. Combined GA + AP sittings may be available in some languages/centers; verify current GBCI registration options.",
      },
      {
        question: "How is this different from LEED AP BD+C?",
        answer:
          "BD+C targets design and construction of new buildings/major renovations. O+M targets ongoing operations and maintenance of existing buildings — metering, performance periods, commissioning, waste, and IAQ operations.",
      },
    ],
  },

  {
    slug: "well-ap-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/well-ap-anki-deck.webp",
    title: "WELL AP Anki Deck",
    shortName: "WELL AP",
    subtitle: "A planned deck for the WELL Accredited Professional (WELL v2) exam.",
    directAnswer:
      "The WELL AP Anki Deck is a planned UniPrep2Go product covering IWBI WELL v2 knowledge domains and certification process. It is not yet available for purchase. Take the free WELL AP readiness check to benchmark weak concepts.",
    lastUpdated: "2026-06-02",
    audience:
      "Architects, designers, building operators, and wellness professionals preparing for the WELL Accredited Professional credential.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "WELL v2 concepts (Air through Community) and certification/portfolio process",
      formulas: "Planned threshold, feature, and verification reference facts",
      examYear: "Current IWBI WELL AP exam cycle (WELL v2)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Air, Water, and Nourishment", examWeight: "30 scored questions", cards: "Planned" },
      { name: "Light, Movement, and Thermal Comfort", examWeight: "23 scored questions", cards: "Planned" },
      { name: "Sound and Materials", examWeight: "17 scored questions", cards: "Planned" },
      { name: "Mind and Community", examWeight: "18 scored questions", cards: "Planned" },
      { name: "WELL Certification and Portfolio", examWeight: "12 scored questions", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A WELL v2 project team is designing open-plan office lighting to support circadian health. Which metric is most directly used to evaluate melanopic (circadian-effective) light exposure?",
        answer:
          "Correct: (a) Equivalent Melanopic Lux (EML) at the eye WELL Light concepts emphasize circadian-effective illumination evaluated at the occupant's eye using melanopic weighting, commonly expressed as EML rather than generic illuminance alone.",
        imageUrl: "/samples/well-ap-anki-deck-sample-1.webp",
      },
      {
        question: "A WELL v2 project team is evaluating partition assemblies between private offices and an open workspace. Which acoustic rating most directly measures airborne sound transmission through a wall or floor-ceiling assembly?",
        answer:
          "Correct: (d) Sound Transmission Class (STC) STC quantifies how well a building partition attenuates airborne sound such as speech and music. WELL Sound strategies often reference STC when separating noisy and quiet zones.",
        imageUrl: "/samples/well-ap-anki-deck-sample-2.webp",
      },
      {
        question: "A facilities manager wants to reduce outdoor smoke and dust entering an air-handling unit. Which filter rating is generally more effective for capturing smaller particles than MERV 8?",
        answer:
          "Correct: (d) MERV 13 MERV 13 filtration is substantially more effective than MERV 8 at removing smaller airborne particles, including a meaningful portion of fine particulate matter. It is commonly used in higher-performance indoor-air strategies when the system can accommodate the pressure drop.",
        imageUrl: "/samples/well-ap-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free WELL AP practice test?",
        answer:
          "Yes. Take the free 50-question readiness check at uniprep2go.study/mock-exams/well-ap-readiness-check.",
      },
      {
        question: "Is WELL AP the same as LEED AP?",
        answer:
          "No. WELL AP (IWBI) tests human health and well-being via the WELL Building Standard. LEED AP (USGBC) tests green building and sustainability — separate credentials and exams.",
      },
      {
        question: "Is this official IWBI material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by IWBI or GBCI.",
      },
    ],
  },
  {
    slug: "cem-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/cem-anki-deck.webp",
    title: "Certified Energy Manager (CEM) Anki Deck",
    shortName: "CEM",
    subtitle: "A planned spaced-repetition deck for the AEE CEM Body of Knowledge.",
    directAnswer:
      "The CEM Anki Deck is a planned UniPrep2Go product for energy managers and facility engineers preparing for AEE Certified Energy Manager certification. Take the free 65-question readiness check first.",
    lastUpdated: "2026-06-02",
    audience: "Energy managers, facility engineers, and sustainability professionals pursuing AEE CEM certification.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "14 AEE CEM Body of Knowledge subject areas",
      formulas: "Planned audit calculations, HVAC/electrical formulas, economics, and M&V facts",
      examYear: "Current AEE CEM certification cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Policy, Audits, and Economics", examWeight: "CEM BoK", cards: "Planned" },
      { name: "Electrical and Lighting", examWeight: "CEM BoK", cards: "Planned" },
      { name: "HVAC and Building Envelope", examWeight: "CEM BoK (10–16%)", cards: "Planned" },
      { name: "Industrial and Renewables", examWeight: "CEM BoK", cards: "Planned" },
      { name: "Commissioning and ESPC", examWeight: "CEM BoK", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A 460V motor circuit draws 100 A at 0.75 power factor. Approximate real power is",
        answer:
          "Correct: (d) 59 kW Three-phase kW ≈ √3 × V × I × PF / 1000 = 1.732 × 460 × 100 × 0.75 / 1000 ≈ 59.7 kW.",
        imageUrl: "/samples/cem-anki-deck-sample-1.webp",
      },
      {
        question: "A centrifugal chiller rated at 0.55 kW/ton at AHRI conditions is operating at 0.72 kW/ton. Which issue is MOST likely?",
        answer:
          "Correct: (d) Elevated condenser water temperature or fouled condenser tubes raising lift Higher condenser entering water temperature increases compressor lift and kW/ton; condenser fouling has a similar effect.",
        imageUrl: "/samples/cem-anki-deck-sample-2.webp",
      },
      {
        question: "An energy manager compares two ECMs using simple payback. Project A saves $12,000/year with a $36,000 cost. Project B saves $8,000/year with a $20,000 cost. Which statement is correct?",
        answer:
          "Correct: (b) Project B has the shorter simple payback period Simple payback equals initial cost divided by annual savings. Project A: 3.0 years; Project B: 2.5 years, so Project B returns capital faster on a simple payback basis.",
        imageUrl: "/samples/cem-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free CEM practice test?",
        answer:
          "Yes. Take the free 65-question CEM readiness check at uniprep2go.study/mock-exams/cem-readiness-check.",
      },
      {
        question: "Is this official AEE material?",
        answer: "No. Independent study aid — not affiliated with or endorsed by the Association of Energy Engineers.",
      },
    ],
  },
  {
    slug: "bms-building-automation-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/bms-building-automation-anki-deck.webp",
    title: "BMS Building Automation Anki Deck",
    shortName: "BMS / BAS",
    subtitle: "A planned spaced-repetition deck for BACnet, HVAC sequences, and BMS platform operations.",
    directAnswer:
      "The BMS Building Automation Anki Deck is a planned UniPrep2Go product for controls technicians and BMS engineers. It is not yet available for purchase. Take the free BMS readiness check to benchmark weak domains before vendor training.",
    lastUpdated: "2026-06-02",
    audience:
      "BMS engineers, BACnet integrators, controls technicians, and facility automation staff preparing for BAS roles or Niagara 4 TCP-style training.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "BACnet networking, HVAC control sequences, alarms/trends/schedules, integration and commissioning",
      formulas: "Planned protocol rules, sequence logic, alarm priorities, and commissioning checkpoints",
      examYear: "Current BAS / BMS industry practice",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "BACnet Protocol and Networking", examWeight: "Core BMS domain", cards: "Planned" },
      { name: "HVAC Control Sequences", examWeight: "Core BMS domain", cards: "Planned" },
      { name: "Platform Operations", examWeight: "Alarms, trends, schedules", cards: "Planned" },
      { name: "Integration and Commissioning", examWeight: "Field checkout domain", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "During BACnet device configuration, a technician needs to set up trending for analog input objects. The facility manager wants to store 30 days of hourly samples for energy analysis. What BACnet service is most appropriate for retrieving this historical data from the trend log objects?",
        answer:
          "Correct: (c) ReadRange ReadRange is specifically designed for retrieving time-series data from trend log objects, allowing efficient access to historical samples within specified time ranges or record counts.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-1.webp",
      },
      {
        question: "In a multi-zone air handling unit with hot water reheat coils, the BAS implements a supply air temperature reset strategy. The system currently shows 6 zones calling for heating (reheat valves >50% open) and 2 zones satisfied. What should the reset logic do to optimize energy performance?",
        answer:
          "Correct: (a) Increase supply air temperature to reduce reheat energy When multiple zones have reheat valves significantly open (>50%), it indicates the supply air is too cold for current conditions. Increasing the supply air temperature reduces the need for reheat energy while still maintaining zone comfort, which is the primary goal of supply air temperature reset control.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-2.webp",
      },
      {
        question: "A BAS operator is investigating why critical equipment alarms are not escalating to management after 30 minutes as configured. The alarm acknowledgment logs show that alarms are being auto-acknowledged by the system every 25 minutes. What workflow component requires immediate attention?",
        answer:
          "Correct: (b) Automatic acknowledgment timer configuration Auto-acknowledgment at 25 minutes prevents the 30-minute escalation from occurring because acknowledged alarms typically don't escalate. The auto-acknowledgment timer needs to be disabled or set longer than the escalation period.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free BMS practice test?",
        answer:
          "Yes. Take the free 60-question BMS readiness check at uniprep2go.study/mock-exams/bms-bas-readiness-check — timed topic scoring and full answer review.",
      },
      {
        question: "Does this replace Tridium Niagara 4 TCP?",
        answer:
          "No. Niagara 4 TCP is an official Tridium training and practical assessment path. This deck and mock are independent prep for BACnet and BAS fundamentals.",
      },
      {
        question: "Is this official BACnet or Tridium material?",
        answer:
          "No. This is an independent study aid and is not affiliated with BACnet International, Tridium, or ASHRAE.",
      },
    ],
  },
  {
    slug: "hvac-epa-608-anki-deck",
    category: "professional",
    status: "planned",
    coverImage: "/covers/hvac-epa-608-anki-deck.webp",
    title: "HVAC EPA 608 Anki Deck",
    shortName: "EPA 608 HVAC",
    subtitle: "A planned spaced-repetition deck for EPA Section 608 Core and Types I–III.",
    directAnswer:
      "The HVAC EPA 608 Anki Deck is a planned UniPrep2Go product for technicians preparing for U.S. EPA Section 608 refrigerant certification. It is not yet available for purchase. Take the free EPA 608 readiness check to benchmark weak sections first.",
    lastUpdated: "2026-06-02",
    audience:
      "HVAC technicians, apprentices, and trade-school students who want active recall for Core, Type I, Type II, and Type III exam topics.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "EPA 608 Core, Type I (small appliances), Type II (high-pressure), Type III (low-pressure)",
      formulas: "Planned recovery levels, leak rates, regulatory thresholds, and safety rules",
      examYear: "Current Section 608 technician certification cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Core", examWeight: "25 official exam questions", cards: "Planned" },
      { name: "Type I — Small Appliances", examWeight: "25 official exam questions", cards: "Planned" },
      { name: "Type II — High-Pressure", examWeight: "25 official exam questions", cards: "Planned" },
      { name: "Type III — Low-Pressure", examWeight: "25 official exam questions", cards: "Planned" },
    ],
    sampleCards: [
      {
        question: "A technician wants to use system-dependent (passive) recovery on a Type II appliance. What is the largest charge on which Section 608 allows this method?",
        answer:
          "Correct: (b) 15 pounds of refrigerant System-dependent recovery equipment, which relies on the appliance's own compressor or pressure, may be used only on appliances holding 15 pounds of refrigerant or less. Larger appliances need self-contained recovery equipment.",
        imageUrl: "/samples/hvac-epa-608-anki-deck-sample-1.webp",
      },
      {
        question: "Using recovery equipment manufactured after November 15, 1993, what evacuation level must a low-pressure appliance reach before it is opened for a major repair?",
        answer:
          "Correct: (d) 25 millimeters of mercury absolute Section 608's evacuation table sets low-pressure appliances at 25 mm Hg absolute when the recovery equipment was made on or after November 15, 1993 (25 inches Hg vacuum for older machines). 25 mm absolute is roughly 29 inches of vacuum, so it is the deeper of the two levels.",
        imageUrl: "/samples/hvac-epa-608-anki-deck-sample-2.webp",
      },
      {
        question: "A service technician must evacuate a residential split system holding 8 pounds of R-410A before opening it for repair, using a recovery machine made in 2019. What recovery requirement applies?",
        answer:
          "Correct: (d) The system must be evacuated to 10 inches of mercury vacuum R-410A falls in the 'other high-pressure' row. Under 200 pounds, recovery equipment made after November 15, 1993 must pull 10 inches of Hg vacuum before the system is opened. Percentage targets such as 80% or 90% apply only to small appliances.",
        imageUrl: "/samples/hvac-epa-608-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free EPA 608 practice test?",
        answer:
          "Yes. Take the free 40-question EPA 608 readiness check at uniprep2go.study/mock-exams/epa-608-readiness-check — timed section scoring and full answer review.",
      },
      {
        question: "When will the HVAC EPA 608 Anki deck be available?",
        answer:
          "The deck is planned but not yet on sale. Use the readiness check now and request access on the mock page to be notified when the deck launches.",
      },
      {
        question: "Is this official EPA exam material?",
        answer:
          "No. This is an independent study aid and is not affiliated with or endorsed by the U.S. Environmental Protection Agency.",
      },
    ],
  },
  {
    slug: "servsafe-manager-anki-deck",
    category: "professional",
    status: "available",
    title: "ServSafe Manager Anki Deck — 300 Food Safety Flashcards",
    shortName: "ServSafe Manager",
    subtitle: "A focused Anki deck for ServSafe Manager food safety review.",
    directAnswer:
      "UniPrep2Go sells an independent ServSafe Manager Anki deck with 300 high-yield food safety flashcards covering foodborne illness, time and temperature control, cross-contamination, personal hygiene, cleaning and sanitizing, receiving and storage, HACCP basics, and manager responsibilities. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. Pair it with the free 90-question / 120-minute ServSafe Manager mock (official form: 80 scored + 10 pilot / 2 hours; official pass 70% (56/80 scored) · 75% UniPrep2Go readiness target on the mock). The deck is a supplementary active-recall study aid and is not official ServSafe or National Restaurant Association material.",
    lastUpdated: "2026-09-29",
    audience:
      "Restaurant managers, food handlers moving into supervisor roles, hospitality students, and ServSafe Manager candidates who want spaced-repetition review instead of rereading notes.",
    format: ".apkg",
    coverImage: "/covers/servsafe-manager-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ldpevc?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics:
        "ServSafe Manager food safety concepts: foodborne illness, TCS food, time and temperature control, contamination prevention, hygiene, cleaning, sanitizing, receiving, storage, HACCP, and manager duties",
      formulas: "Food safety definitions, prevention rules, common exam traps, and scenario-style recall prompts",
      examYear: "Current ServSafe Manager food safety review",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Foodborne Illness and Contamination", examWeight: "ServSafe Manager topic", cards: "High-yield cards" },
      { name: "Time and Temperature Control", examWeight: "ServSafe Manager topic", cards: "High-yield cards" },
      { name: "Personal Hygiene and Cross-Contamination", examWeight: "ServSafe Manager topic", cards: "High-yield cards" },
      { name: "Cleaning, Sanitizing, Receiving, and Storage", examWeight: "ServSafe Manager topic", cards: "High-yield cards" },
      { name: "HACCP and Manager Responsibilities", examWeight: "ServSafe Manager topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "What if cooked TCS food reaches 70°F in 2 hours but not 41°F within 6 total hours?",
        answer:
          "It must be discarded because it missed the total cooling limit.",
        imageUrl: "/samples/servsafe-manager-anki-deck-sample-1.webp",
      },
      {
        question: "How long should shellstock tags be kept?",
        answer:
          "Shellstock tags are commonly kept for 90 days after the last shellfish from the container is sold or served.",
        imageUrl: "/samples/servsafe-manager-anki-deck-sample-2.webp",
      },
      {
        question: "When must food-contact surfaces be cleaned and sanitized?",
        answer:
          "Clean and sanitize after use, before working with different food types, after interruptions, after contamination, and at least every 4 hours during continuous use with TCS foods.",
        imageUrl: "/samples/servsafe-manager-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the ServSafe Manager deck include?",
        answer:
          "300 Anki flashcards for food safety review, including contamination, foodborne illness, TCS foods, time-temperature control, hygiene, cleaning, sanitizing, receiving, storage, HACCP basics, and manager duties.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for ServSafe Manager candidates, restaurant managers, food-service supervisors, hospitality students, and food handlers who want active-recall review.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
      {
        question: "Is this official ServSafe material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by ServSafe or the National Restaurant Association.",
      },
      {
        question: "Is there a free ServSafe Manager practice test?",
        answer:
          "Yes. UniPrep2Go hosts a free 90-question / 120-minute ServSafe Manager mock with topic scoring at /mock-exams/servsafe-manager-mock. Official exam is 90 questions (80 scored + 10 pilot) in 2 hours; current ServSafe FAQ pass is 70% (56/80 scored). The mock uses 75% as a readiness target; the older 2020 Examinee Handbook PDF still prints 75% — verify at servsafe.com.",
      },
      {
        question: "Does this replace the official course or exam practice?",
        answer:
          "No. Use it as a spaced-repetition supplement for definitions, rules, and food safety recall alongside your official training, handbook, and practice questions.",
      },
    ],
  },
  {
    slug: "servsafe-manager-complete-study-guide",
    category: "professional",
    status: "available",
    title: "ServSafe Manager Complete Study Guide — PDF + 70 Practice Questions",
    shortName: "ServSafe Manager Study Guide",
    subtitle: "40-page printable ServSafe Manager PDF guide with cram sheets, practice questions, and answer rationales.",
    directAnswer:
      "UniPrep2Go sells an independent ServSafe Manager Complete Study Guide PDF with 40 pages of study content: 8 exam domains fully explained, a 7-day study plan, a 2-page quick-reference cram sheet, 70 exam-style multiple-choice questions, complete answer rationales, glossary, last-day checklist, and companion notes for drilling the 300-card Anki deck. It is delivered as a printable PDF digital download for {PRICE} through Gumroad. The guide is an independent study aid and is not official ServSafe, National Restaurant Association, FDA, or health department material.",
    lastUpdated: "2026-06-02",
    audience:
      "First-time ServSafe Manager test takers, retesters, restaurant managers, and busy food service professionals who want a structured printable review system.",
    format: "PDF",
    coverImage: "/covers/servsafe-manager-complete-study-guide.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lyvna?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "40 pages + 70 practice questions",
      topics:
        "ServSafe Manager complete study guide: 8 exam domains, quick-reference cram sheet, Big 6 pathogens, allergens, time and temperature control, flow of food, cleaning and sanitizing, facilities, HACCP, 70 practice questions, answer rationales, glossary, last-day checklist, and companion Anki deck workflow",
      formulas: "Printable PDF review pages, FDA Food Code-aligned quick-reference rules, exam-style practice questions, answer rationales, and last-day checklist",
      examYear: "Current ServSafe Manager food safety review",
      delivery: "Printable PDF digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Complete PDF Guide", examWeight: "40 pages", cards: "8 exam domains fully explained" },
      { name: "Quick-Reference Cram Sheet", examWeight: "2 pages", cards: "Temps, cooling, storage order, Big 6, allergens, 3-comp sink, and HACCP" },
      { name: "Practice Questions", examWeight: "70 questions", cards: "Exam-style MCQs with answer rationales" },
      { name: "Study Workflow", examWeight: "7-day plan", cards: "Two focused sessions per day, last-day checklist, glossary, and companion Anki drill notes" },
    ],
    sampleCards: [
      {
        question: "Quick-reference cram sheet for exam-day numbers",
        answer:
          "The 2-page cram sheet puts the danger zone, minimum cooking temperatures, and receiving limits in one scannable layout — the numbers that win or lose the ServSafe Manager exam.",
        imageUrl: "/samples/servsafe-manager-complete-study-guide-sample-1.webp",
      },
      {
        question: "9 major allergens and the 7 HACCP principles",
        answer:
          "Allergen tags and a numbered HACCP walkthrough make two of the most testable topic areas easy to review the morning of the exam.",
        imageUrl: "/samples/servsafe-manager-complete-study-guide-sample-2.webp",
      },
      {
        question: "The Big 6 pathogens — exclude vs. restrict",
        answer:
          "Each Big 6 pathogen is mapped to linked foods, key controls, and when a sick handler must be excluded from the operation — not just restricted.",
        imageUrl: "/samples/servsafe-manager-complete-study-guide-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the ServSafe Manager Complete Study Guide include?",
        answer:
          "It includes a 40-page printable PDF with 8 exam domains fully explained, a 7-day study plan, 2-page quick-reference cram sheet, 70 exam-style multiple-choice questions, complete answer rationales, glossary, last-day checklist, and companion notes for using the 300-card Anki deck.",
      },
      {
        question: "Is this an Anki deck?",
        answer:
          "No. This product is a printable PDF study guide and practice-question pack. It is designed to pair with the separate 300-card ServSafe Manager Anki Deck, which is available as a .apkg flashcard product.",
      },
      {
        question: "Who is this PDF for?",
        answer:
          "It is for first-time ServSafe Manager test takers, retesters, restaurant managers, hospitality students, and busy food service professionals who want structured printable review.",
      },
      {
        question: "Is this official ServSafe material?",
        answer:
          "No. This is an independent educational product and is not affiliated with, endorsed by, or sponsored by ServSafe, the National Restaurant Association, or the FDA.",
      },
      {
        question: "Does this guarantee a passing score?",
        answer:
          "No. It is a supplementary study aid and does not guarantee an exam result. State and local food safety rules may vary.",
      },
      {
        question: "How should I use it before exam day?",
        answer:
          "Follow the 7-day study plan: read each domain, drill the matching Anki cards if you use the companion deck, take all 70 practice questions, review every rationale, then use the cram sheet and last-day checklist for weak spots.",
      },
    ],
  },
  {
    slug: "ptcb-pharmacy-technician-anki-deck",
    category: "professional",
    status: "available",
    title: "PTCB Pharmacy Technician Anki Deck — 300 High-Yield Flashcards",
    shortName: "PTCB Pharmacy Technician",
    subtitle: "300 flashcards weighted to the January 2026 PTCE — high-yield drugs, interactions, federal law, safety, sigs, and math.",
    directAnswer:
      "Built for pharmacy technicians preparing for the PTCE: 300 unique Anki flashcards weighted to the January 2026 outline — 105 Medications (60 high-yield Top 200 drugs with generic, class, use, and the safety point, plus interactions, stems, dosage forms, and storage), 56 Federal Requirements (DEA, CSOS, DSCSA, HIPAA, REMS, recalls), 71 Patient Safety (high-alert drugs, look-alike names, ISMP abbreviations, USP <797>/<800>), and 68 Order Entry (sigs, days-supply math, claims, inventory). Every card has a worked example and a common mistake. Official PTCE is 90 questions (80 scored) / 1 hour 50 minutes / scaled pass 1,400. Short daily sessions on your phone beat rereading notes the week before the exam. Independent study aid — not official PTCB, NHA, FDA, or DEA material. .apkg download for {PRICE} via Gumroad.",
    lastUpdated: "2026-10-02",
    audience:
      "Pharmacy technician candidates, pharmacy tech students, career changers preparing for the PTCE, and technicians who want daily drug, law, safety, and math recall on their phone.",
    format: ".apkg",
    coverImage: "/covers/ptcb-pharmacy-technician-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/yvifxh?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics:
        "60 high-yield Top 200 drugs, interactions, DEA and DSCSA law, patient safety, sig codes, pharmacy math, and order entry",
      formulas: "Days supply, mg/kg dosing, concentrations, percent and ratio strength, dilutions, IV rates, DEA check digit",
      examYear: "January 2026 PTCE / pharmacy technician review",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Medications", examWeight: "35%", cards: "105 cards: 60 high-yield drugs (generic, class, use, safety point), interactions, stems, dosage forms, storage" },
      { name: "Patient Safety & QA", examWeight: "23.75%", cards: "71 cards: high-alert drugs, LASA pairs, ISMP abbreviations, error reporting, USP <797>/<800>" },
      { name: "Order Entry & Processing", examWeight: "22.5%", cards: "68 cards: sig codes, days supply and dosing math, claims, inventory" },
      { name: "Federal Requirements", examWeight: "18.75%", cards: "56 cards: DEA schedules and forms, C-II rules, DSCSA, HIPAA, REMS, recalls" },
    ],
    sampleCards: [
      {
        question: "Lopressor vs Toprol XL — generic name, class, use, and the substitution trap?",
        answer:
          "Metoprolol, a cardioselective beta-blocker (-olol), for hypertension, angina, heart failure, and rate control. Lopressor = metoprolol tartrate (immediate release, usually twice daily); Toprol XL = metoprolol succinate (extended release, once daily). Do not stop abruptly.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-1.webp",
      },
      {
        question: "How do you verify the check digit of DEA number BL6324817?",
        answer:
          "Add digits 1, 3, 5: 6 + 2 + 8 = 16. Add digits 2, 4, 6 and double: (3 + 4 + 1) × 2 = 16. Total = 32. The last digit of the total (2) must equal the seventh digit — here it is 7, so BL6324817 fails and the Rx must be verified.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-2.webp",
      },
      {
        question: "Why is concentrated oral morphine solution a classic dosing-error drug?",
        answer:
          "Morphine oral solution comes as 10 mg/5 mL and 100 mg/5 mL (20 mg/mL). Confusing mg with mL or picking the wrong concentration has caused fatal tenfold to twentyfold overdoses. Orders should state dose in mg and volume, and the concentrated form is reserved for opioid-tolerant patients.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the PTCB Pharmacy Technician deck include?",
        answer:
          "300 unique Anki flashcards in January 2026 PTCE proportions: 105 Medications (60 high-yield Top 200 drugs plus interactions, stems, dosage forms, storage), 56 Federal Requirements, 71 Patient Safety, and 68 Order Entry (sigs, math, claims, inventory). Each card has a worked example and a common mistake. Plus 2 legal intro cards and a READ_FIRST.txt file in the download folder.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "Pharmacy technician candidates preparing for the PTCE, pharmacy tech students, and technicians who want short daily recall sessions on drugs, federal law, safety, sig abbreviations, and exam math.",
      },
      {
        question: "Is this official PTCB material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by PTCB, the Pharmacy Technician Certification Board, NHA, FDA, or DEA.",
      },
      {
        question: "Does this work for ExCPT / NHA too?",
        answer:
          "Many topics overlap U.S. pharmacy technician curricula, but the deck is written for PTCE-style prep. NHA ExCPT is a separate certifier — take UniPrep2Go’s free NHA ExCPT readiness check if that is your exam, and verify the current NHA blueprint before treating this deck as your only source.",
      },
      {
        question: "Does this guarantee a passing score?",
        answer:
          "No. It is a supplementary retention tool and does not guarantee an exam result. Your outcome depends on consistent study and your broader prep plan.",
      },
    ],
  },
  {
    slug: "ptcb-study-guide-2026",
    category: "professional",
    status: "available",
    title:
      "PTCB Outline 2026 Study Guide — PTCE Blueprint PDF + 80-Question Exam + Cheat Sheets",
    shortName: "PTCB Study Guide 2026",
    subtitle:
      "January 2026 PTCE outline/blueprint PDF — domain chapters, 80-question exam, cheat sheets; pairs with free 90Q online mock + Anki.",
    directAnswer:
      "The independent PTCB / PTCE outline study guide for 2026 on UniPrep2Go is a 30-page printable pack aligned to the January 2026 PTCE blueprint: Medications 35%, Federal Requirements 18.75% (with DSCSA), Patient Safety & QA 23.75%, Order Entry & Processing 22.5% — plus an 80-question practice exam with domain-scored answer key, three cheat sheets (60 drugs, 45 sig codes, math), and a 4-week plan. Cluster with UniPrep2Go’s free 90-question timed online mock for readiness scoring and a separate 300-card Anki deck for weak-topic repair (sold separately). Not a free blog outline that still teaches removed compounding topics. Delivered for {PRICE} through Gumroad. Independent — not official PTCB, NHA, FDA, or DEA material.",
    lastUpdated: "2026-09-24",
    audience:
      "PTCE candidates who need the January 2026 outline in one structured printable document — read domain chapters, take the 80-question practice exam, print cheat sheets, then pair with the free timed mock and optional Anki drills.",
    format: "PDF",
    coverImage: "/covers/ptcb-study-guide-2026.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ptcb-study-guide-2026?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "30 pages + 80 practice questions",
      topics:
        "January 2026 PTCE blueprint: Medications, Federal Requirements (including DSCSA), Patient Safety & QA, Order Entry & Processing, 80-question practice exam, drug/sig/math cheat sheets, and 4-week study plan",
      formulas:
        "Printable domain-weighted review chapters, full-length PTCE-length practice exam with explanations, and three print-ready cheat sheets",
      examYear: "January 2026 PTCE / pharmacy technician certification review",
      delivery: "Printable PDF digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Medications", examWeight: "35%", cards: "Brand/generic, classes, high-alert safety, interactions" },
      { name: "Federal Requirements", examWeight: "18.75%", cards: "DEA schedules, HIPAA, recalls, DSCSA traceability" },
      { name: "Patient Safety & QA", examWeight: "23.75%", cards: "Error prevention, high-alert drugs, quality assurance" },
      { name: "Order Entry & Processing", examWeight: "22.5%", cards: "Sig codes, dispensing workflow, inventory basics" },
      { name: "Practice Exam", examWeight: "80 questions", cards: "28/15/19/18 by domain — scored answer key with rationales" },
      { name: "Cheat Sheets", examWeight: "3 pages", cards: "60 drugs A–Z, 45 sig codes, math formulas with examples" },
    ],
    sampleCards: [
      {
        question: "2026 PTCE domain weights at a glance",
        answer:
          "The at-a-glance table maps the January 2026 blueprint: Medications 35%, Federal Requirements 18.75% (DSCSA added), Patient Safety 23.75%, Order Entry 22.5% — compounding and alligation removed.",
        imageUrl: "/samples/ptcb-study-guide-2026-sample-1.webp",
      },
      {
        question: "60 high-yield drugs A–Z cheat sheet",
        answer:
          "Print-ready drug list with brand, generic, class, and primary use — the fastest pre-exam scan for look-alike/sound-alike pairs the PTCE repeats.",
        imageUrl: "/samples/ptcb-study-guide-2026-sample-2.webp",
      },
      {
        question: "Practice exam question with full rationale",
        answer:
          "Each of the 80 practice questions includes why the correct answer is right and why the tempting distractor is wrong — mapped to the validated item bank.",
        imageUrl: "/samples/ptcb-study-guide-2026-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the PTCB outline / blueprint for 2026?",
        answer:
          "The January 2026 PTCE blueprint weights are Medications 35%, Federal Requirements 18.75% (DSCSA added), Patient Safety & QA 23.75%, and Order Entry & Processing 22.5% — compounding and alligation removed. UniPrep2Go’s PTCB Outline 2026 Study Guide maps those weights into printable chapters, an 80-question practice exam, and cheat sheets.",
      },
      {
        question: "What does the PTCB Outline 2026 Study Guide include?",
        answer:
          "A 30-page printable PDF with four domain-weighted review chapters (January 2026 PTCE blueprint), an 80-question full-length practice exam with domain-scored answer key and explanations, three print-ready cheat sheets (drugs, sig codes, math), and a 4-week study plan. The free 90-question online PTCB mock and companion Anki deck are separate UniPrep2Go products linked from the page — not files inside the PDF download.",
      },
      {
        question: "Is this updated for the January 2026 PTCE?",
        answer:
          "Yes. Chapter sizes follow the 2026 domain weights — Federal Requirements at 18.75% with DSCSA coverage, and compounding/alligation topics removed from the outline.",
      },
      {
        question: "How does the free PTCB mock fit with this outline guide?",
        answer:
          "Take the free 90-question PTCB mock at uniprep2go.study/mock-exams/ptcb-pharmacy-technician-mock for a timed domain readiness report first. Use this PDF for structured outline reading and the 80-question practice exam, then buy the separate 300-card Anki deck only for weak-topic daily repair.",
      },
      {
        question: "Does this pair with the PTCB Anki deck?",
        answer:
          "Yes — as a separate purchase. Use the PDF for outline reading and the timed 80-question practice exam; buy the 300-card Anki deck if you want daily brand/generic and sig-code recall on your phone. Neither product is bundled inside the other.",
      },
      {
        question: "Is this official PTCB material?",
        answer:
          "No. This is an independent educational product and is not affiliated with, endorsed by, or sponsored by PTCB, the Pharmacy Technician Certification Board, NHA, FDA, or DEA.",
      },
      {
        question: "How should I use it before exam day?",
        answer:
          "Follow the 4-week plan: take the free online mock cold, read each domain chapter in this outline guide, take the 80-question practice exam, review every explanation, print the cheat sheets, and drill matching topics in the companion Anki deck if you use it.",
      },
      {
        question: "Is this the same as the NHA ExCPT exam?",
        answer:
          "No. This guide targets PTCB’s PTCE. NHA ExCPT is a separate pharmacy technician certification pathway — use UniPrep2Go’s free NHA ExCPT readiness check if that is your certifier.",
      },
    ],
  },

  // ── Professional / Commodities ─────────────────────────────────────────
  {
    slug: "bench-energy-metal-trader-anki-deck",
    category: "professional",
    status: "available",
    title: "Metal Trader Anki Deck — 202 Commodity Flashcards",
    shortName: "Metal Trader",
    subtitle:
      "202-card metals trading lexicon — LME, contango/backwardation, base & precious metals desk vocabulary.",
    directAnswer:
      "UniPrep2Go’s Metal Trader Anki deck (Bench Energy Metal Trader’s Lexicon) is a 202-card .apkg for metals commodity desks: LME structure, cash/3M carry, contango and backwardation, base and precious metals benchmarks, pricing mechanics, and trading vocabulary. Delivered for {PRICE} through Gumroad. Built for new metals analysts and traders who need spaced-repetition desk language — not a generic finance flashcard dump.",
    lastUpdated: "2026-08-11",
    audience:
      "Metals commodity traders, desk analysts, and professionals entering base or precious metals markets who need LME and pricing vocabulary fast.",
    format: ".apkg",
    coverImage: "/covers/bench-energy-metal-trader-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/zpazj?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "202",
      topics: "LME, base & precious metals, carry trades, pricing benchmarks, market structure",
      formulas: "Trading terms, contango/backwardation math, pricing mechanics",
      examYear: "Professional desk reference",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "LME & market structure", examWeight: "Desk core", cards: "Cash/3M, rings, warrants" },
      { name: "Pricing & curves", examWeight: "Desk core", cards: "Contango, backwardation, carry" },
      { name: "Base & precious metals", examWeight: "Product vocab", cards: "Cu, Al, Zn, Au, Ag terms" },
    ],
    sampleCards: [
      {
        question: "What are TC/RC in copper and why are they important?",
        answer:
          "Treatment Charge (TC): fee miners pay to smelters to process copper concentrate into blister copper ($/dry metric tonne of concentrate). Refining Charge (RC): fee for refining to final cathode (US cents/lb).",
        imageUrl: "/samples/bench-energy-metal-trader-anki-deck-sample-1.webp",
      },
      {
        question: "What happened in the LME nickel short squeeze of March 2022?",
        answer:
          "Chinese tycoon Xiang Guangda (Tsingshan) had massive short position in LME nickel. Russia-Ukraine supply fears caused nickel to spike from $25,000 to $100,000/tonne in 2 days. LME suspended trading and cancelled trades — unprecedented market intervention.",
        imageUrl: "/samples/bench-energy-metal-trader-anki-deck-sample-2.webp",
      },
      {
        question: "What is the Midwest Premium in aluminium?",
        answer:
          "Regional premium paid above LME aluminium price to receive physical aluminium in the US Midwest — covers freight, duty, financing, and regional supply/demand balance.",
        imageUrl: "/samples/bench-energy-metal-trader-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the best Anki deck for metals trading vocabulary?",
        answer:
          "Use a metals-desk lexicon with LME, carry, and base/precious terms — not a CFA or general finance deck. UniPrep2Go’s Metal Trader Anki deck has 202 cards focused on metals commodity trading language.",
      },
      {
        question: "What does the Metal Trader's Lexicon cover?",
        answer:
          "Key terms for metals commodity trading — LME structure, cash/3M, contango and backwardation, base and precious metals benchmarks, pricing mechanics, and desk vocabulary.",
      },
      {
        question: "Who is this for?",
        answer:
          "Commodity traders, analysts, and professionals entering or working in metals markets who want to systematise desk vocabulary with spaced repetition.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "bench-energy-oil-trader-anki-deck",
    category: "professional",
    status: "available",
    title: "Oil Trader Anki Deck — 211 Commodity Flashcards",
    shortName: "Oil Trader",
    subtitle: "Anki flashcard deck for crude oil and petroleum trading vocabulary.",
    directAnswer:
      "UniPrep2Go sells the Bench Energy Oil Trader's Lexicon, an Anki deck with 211 flashcards covering universal trading foundations, oil markets, and freight and shipping terminology. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck targets commodity traders, analysts, and professionals joining oil trading desks.",
    lastUpdated: "2026-05-31",
    audience: "Oil commodity traders, refinery analysts, and professionals entering petroleum markets.",
    format: ".apkg",
    coverImage: "/covers/bench-energy-oil-trader-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ugngbd?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "211",
      topics: "Trading foundation, oil markets, freight and shipping",
      formulas: "Crude grades, benchmarks, refinery economics, OPEC, tanker trading",
      examYear: "Professional reference",
      delivery: "Digital download through Gumroad (3.14 MB)",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "What is the Nelson Complexity Index?",
        answer:
          "Measures refinery's ability to process heavier, lower-quality crude and convert it to higher-value products. Simple = 1–4. Complex = 8–12. Highly complex = 12+.",
        imageUrl: "/samples/bench-energy-oil-trader-anki-deck-sample-1.webp",
      },
      {
        question: "What drives the Brent-WTI spread?",
        answer:
          "Logistics at Cushing Oklahoma — when US crude inventory builds at landlocked Cushing → WTI weakens vs Brent. When pipelines to Gulf Coast clear inventory → spread narrows.",
        imageUrl: "/samples/bench-energy-oil-trader-anki-deck-sample-2.webp",
      },
      {
        question: "What is the Saudi Official Selling Price (OSP)?",
        answer:
          "Saudi Aramco publishes monthly OSPs for different crude grades to different regions — Asia OSP, NWE OSP, US OSP. Prices are differentials to benchmark (Arab Light Asia = Oman/Dubai + premium/discount).",
        imageUrl: "/samples/bench-energy-oil-trader-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Oil Trader's Lexicon cover?",
        answer: "211 cards in three blocks: Universal Trading Foundation (102 cards), Oil Markets (58 cards), and Freight and Shipping (51 cards). Covers crude grades, benchmarks, refinery economics, OPEC dynamics, tanker trading, and derivatives.",
      },
      {
        question: "Who is this for?",
        answer: "Professionals joining oil trading desks, refinery analysts, and commodity traders who need to compress the oil-trading vocabulary learning curve using spaced repetition.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "bench-energy-coal-trader-anki-deck",
    category: "professional",
    status: "available",
    title: "Coal Trader Anki Deck — 221 Commodity Flashcards",
    shortName: "Coal Trader",
    subtitle: "Anki flashcard deck for thermal coal and mining finance vocabulary.",
    directAnswer:
      "UniPrep2Go sells the Bench Energy Coal Trader's Lexicon, an Anki deck with 221 flashcards covering coal mining economics, thermal coal markets, freight, and trading terminology. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck targets commodity traders, mining finance analysts, and professionals entering coal markets.",
    lastUpdated: "2026-05-31",
    audience: "Coal commodity traders, mining finance analysts, and professionals entering thermal coal markets.",
    format: ".apkg",
    coverImage: "/covers/bench-energy-coal-trader-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ipnqky?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "221",
      topics: "Coal mining economics, thermal coal markets, freight and shipping",
      formulas: "Netback calculations, strip ratios, API indices, freight routes",
      examYear: "Professional reference",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "What is the difference between NAR and GAR?",
        answer:
          "NAR (Net As Received): actual energy including moisture weight — the trading standard. GAR (Gross As Received): includes latent heat of water vapor — appears higher.",
        imageUrl: "/samples/bench-energy-coal-trader-anki-deck-sample-1.webp",
      },
      {
        question: "What is Hard Coking Coal and why does it trade at a premium?",
        answer:
          "Highest quality met coal — low ash, low sulfur, specific volatile matter range producing strong coke. Essential for blast furnace efficiency.",
        imageUrl: "/samples/bench-energy-coal-trader-anki-deck-sample-2.webp",
      },
      {
        question: "What are the main global seaborne coal trade flows?",
        answer:
          "Indonesia→China/India, Australia→Japan/Korea/Taiwan, Russia→Asia (post-2022), Colombia/USA→Europe, South Africa→India/Europe",
        imageUrl: "/samples/bench-energy-coal-trader-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Coal Trader's Lexicon cover?",
        answer: "221 cards covering coal mining economics, thermal coal market structure, API indices, freight routes, netback calculations, strip ratios, and trading terminology used on coal desks.",
      },
      {
        question: "Who is this for?",
        answer: "Commodity traders, mining finance analysts, and professionals entering thermal coal markets who want to systematise desk vocabulary using spaced repetition.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Gumroad.",
      },
    ],
  },
  {
    slug: "commodity-trader-pack-bundle",
    category: "professional",
    status: "available",
    title: "Commodity Trader Pack — 634 Anki Flashcards",
    shortName: "Commodity Trader Pack",
    subtitle: "Bundle of Metal, Oil, and Coal Anki lexicon decks for commodity trading desks.",
    directAnswer:
      "UniPrep2Go sells the Ultimate Commodity Trader Pack, a 3-in-1 bundle of Bench Energy Anki decks covering metals (202 cards), oil (211 cards), and coal (221 cards) — 634 flashcards total. It is delivered as Anki .apkg files for {PRICE} through Gumroad. Bundle savings are shown at checkout.",
    lastUpdated: "2026-05-31",
    audience: "Commodity traders and analysts who work across metals, oil, and coal markets.",
    format: ".apkg",
    coverImage: "/covers/commodity-trader-pack-bundle.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/tzzgh?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "634",
      topics: "Metals + oil + coal trading lexicons",
      formulas: "Full Bench Energy coverage across three commodity classes",
      examYear: "Professional reference",
      delivery: "Digital download through Gumroad (bundle of 3 decks)",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "What are TC/RC in copper and why are they important?",
        answer:
          "Treatment Charge (TC): fee miners pay to smelters to process copper concentrate into blister copper ($/dry metric tonne of concentrate). Refining Charge (RC): fee for refining to final cathode (US cents/lb).",
        imageUrl: "/samples/bench-energy-metal-trader-anki-deck-sample-1.webp",
      },
      {
        question: "What drives the Brent-WTI spread?",
        answer:
          "Logistics at Cushing Oklahoma — when US crude inventory builds at landlocked Cushing → WTI weakens vs Brent. When pipelines to Gulf Coast clear inventory → spread narrows.",
        imageUrl: "/samples/bench-energy-oil-trader-anki-deck-sample-2.webp",
      },
      {
        question: "What is the difference between NAR and GAR?",
        answer:
          "NAR (Net As Received): actual energy including moisture weight — the trading standard. GAR (Gross As Received): includes latent heat of water vapor — appears higher.",
        imageUrl: "/samples/bench-energy-coal-trader-anki-deck-sample-1.webp",
      },
    ],
    faqs: [
      {
        question: "What decks are included in the bundle?",
        answer: "Metal Trader's Lexicon (202 cards), Oil Trader's Lexicon (211 cards), and Coal Trader's Lexicon (221 cards) — 634 cards total across all three Bench Energy decks.",
      },
      {
        question: "How much do I save versus buying separately?",
        answer: "Bundle pricing and savings versus buying each deck separately are shown at checkout on Gumroad.",
      },
      {
        question: "Who is this bundle for?",
        answer: "Commodity traders, analysts, and professionals who work across metals, oil, and coal markets and want complete desk vocabulary coverage in one purchase.",
      },
      {
        question: "What file format is delivered?",
        answer: "Anki-compatible .apkg files delivered through Gumroad.",
      },
    ],
  },
];

/** Wave planned factories may re-link to already-available catalog slugs (e.g. L&H). Keep one record. */
const existingCatalogSlugs = new Set(rawDecks.map((deck) => deck.slug));
const uniqueWavePlannedDecks = [
  ...wave1PlannedDecks,
  ...wave2PlannedDecks,
  ...wave3PlannedDecks,
  ...wave4PlannedDecks,
].filter((deck) => !existingCatalogSlugs.has(deck.slug));

export const decks: Deck[] = applyAnkiDeckLaunchToCatalog(
  [...rawDecks, ...uniqueWavePlannedDecks].map(enrichDeckWithShopPreviews),
)
  .map(applySoldSamplesToDeck)
  .map((deck) => ({ ...deck, faqs: withMockAccessDisclosure(deck.faqs) }));

export const catalogAvailableDecks = decks.filter(
  (deck): deck is CatalogAvailableDeck => deck.status === "available",
);

export const catalogPlannedDecks = decks.filter(
  (deck): deck is PlannedDeck => deck.status === "planned",
);

/** Canonical CFA L1 deck record for CFA-specific routes and linked-mock remediation — not the site-wide primary product. */
export const primaryDeck = catalogAvailableDecks.find(
  (deck) => deck.slug === "cfa-level-1-anki-deck",
)!;

/** Catalog decks without resolved checkout prices. Prefer getPricedDecks(). */
export const availableDecks = catalogAvailableDecks;

/** Human-readable content size for SEO, UI, and LLM snippets without duplicating "cards". */
export function formatDeckContentLabel(deck: {
  format: BaseDeck["format"];
  facts: Pick<DeckFacts, "cards">;
}): string {
  const { cards } = deck.facts;

  if (deck.format === "PDF") {
    return cards;
  }

  if (
    /\bcards?\b/i.test(cards) ||
    /\bpages?\b/i.test(cards) ||
    /questions|vocabulary plus/i.test(cards)
  ) {
    return cards;
  }

  return `${cards} cards`;
}

export function getDeckBySlug(slug: string) {
  return decks.find((deck) => deck.slug === slug);
}

export function getCatalogDeckBySlug(slug: string) {
  return catalogAvailableDecks.find((deck) => deck.slug === slug);
}

/** @deprecated Use getCatalogDeckBySlug */
export const getAvailableDeckBySlug = getCatalogDeckBySlug;

export const categoryLabels: Record<DeckCategory, string> = {
  finance: "Finance Exams",
  language: "Language Certifications",
  professional: "Professional & Trading",
  immigration: "Immigration & Adaptation",
  academic: "Academic",
};

export const categoryOrder: DeckCategory[] = [
  "finance",
  "professional",
  "immigration",
  "academic",
  "language",
];

export function getCatalogDeckOrder(): string[] {
  const relocateAfter = new Map([
    ["cfa-level-2-anki-deck", "cfa-level-1-anki-deck"],
    ["cfa-level-2-formula-reference-2026", "cfa-level-1-formula-reference-2026"],
  ]);
  const relocated = new Set(relocateAfter.keys());
  const base = catalogAvailableDecks
    .map((deck) => deck.slug)
    .filter((slug) => !relocated.has(slug));
  const order: string[] = [];

  for (const slug of base) {
    order.push(slug);
    for (const [movedSlug, anchorSlug] of relocateAfter) {
      if (anchorSlug === slug) {
        order.push(movedSlug);
      }
    }
  }

  return order;
}

export function sortDecksByCatalogOrder<T extends { slug: string }>(decks: T[]): T[] {
  const order = new Map(getCatalogDeckOrder().map((slug, index) => [slug, index]));

  return [...decks].sort(
    (left, right) => (order.get(left.slug) ?? 999) - (order.get(right.slug) ?? 999),
  );
}

export function getAvailableDecksByCategory(): Array<{
  category: DeckCategory;
  label: string;
  decks: CatalogAvailableDeck[];
}> {
  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      decks: sortDecksByCatalogOrder(
        catalogAvailableDecks.filter((deck) => deck.category === category),
      ),
    }))
    .filter((group) => group.decks.length > 0);
}

export const featuredDeckSlugs = [
  "sie-exam-anki-deck",
  "series-7-anki-deck",
  "series-63-anki-deck",
  "california-real-estate-exam-anki-deck",
  "life-and-health-insurance-exam-anki-deck",
  "property-casualty-insurance-exam-anki-deck",
] as const;

export function getFeaturedDecks() {
  return featuredDeckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

/** Peer groups for related-product rails (planned waitlist + available). */
export const RELATED_DECK_PEER_GROUPS: string[][] = [
  ["nasm-cpt-anki-deck", "issa-cpt-anki-deck", "ace-cpt-anki-deck"],
  ["luxembourg-vivre-ensemble-anki-deck", "einburgerung-schweiz-anki-deck", "leben-in-deutschland-anki-deck"],
  ["ptcb-pharmacy-technician-anki-deck", "ptcb-study-guide-2026"],
  ["cfa-level-1-anki-deck", "cfa-level-1-formula-reference-2026", "cfa-level-2-anki-deck"],
  // English-for-* family — cross-link siblings so Google sees distinct gloss editions (PT was crawled-not-indexed as near-dupe).
  [
    "ielts-toefl-english-for-portuguese-speakers-anki-deck",
    "ielts-toefl-english-for-spanish-speakers-anki-deck",
    "ielts-toefl-english-for-russian-speakers-anki-deck",
    "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
    "ielts-toefl-english-for-french-speakers-anki-deck",
    "ielts-toefl-english-for-arabic-speakers-anki-deck",
    "ielts-toefl-english-for-turkish-speakers-anki-deck",
  ],
  // CIPLE (PT-PT nationality) ↔ English-for-Brazilians (IELTS/TOEFL) — wrong-product pair.
  ["ciple-a2-european-portuguese-anki-deck", "ielts-toefl-english-for-portuguese-speakers-anki-deck"],
];

export function getRelatedDecks(deck: Pick<Deck, "slug" | "category">, limit = 4): Deck[] {
  const peerSlugs = RELATED_DECK_PEER_GROUPS.find((group) => group.includes(deck.slug)) ?? [];
  if (peerSlugs.length > 0) {
    return peerSlugs
      .filter((slug) => slug !== deck.slug)
      .map((slug) => getDeckBySlug(slug))
      .filter((candidate): candidate is Deck => Boolean(candidate))
      .slice(0, limit);
  }
  const used = new Set([deck.slug]);
  const categoryFill = catalogAvailableDecks.filter(
    (candidate) => !used.has(candidate.slug) && candidate.category === deck.category,
  );
  return categoryFill.slice(0, limit);
}

export const siteFaqs = [
  {
    question: "What is UniPrep2Go?",
    answer:
      "UniPrep2Go is a US-first exam prep site built around free timed online practice tests and readiness checks — with topic scoring, answer review, and pass/no-pass reports — plus independent Anki flashcard decks and printable PDF cram sheets you can use to drill weak topics after a mock. The catalog includes US licensing (FINRA, insurance, real estate, ServSafe, PTCB), building and sustainability credentials (EPA 608, LEED, WELL AP, BMS, MRICS, CFPS, NEBOSH, CDCP, CEM, ASHRAE), finance exams (CFA, FRM), MBA admissions (GMAT Focus), language certifications, free citizenship practice mocks with a Gumroad Anki bundle, and Prep2Go Immigration survival guides on the App Store.",
  },
  {
    question: "Which US exams does UniPrep2Go cover?",
    answer:
      "The catalog includes US-market decks for FINRA SIE, Series 7, Series 63, California real estate salesperson exam prep, Life & Health insurance licensing, Property & Casualty insurance licensing, PTCB pharmacy technician exam prep, and ServSafe Manager food safety review, plus finance credential decks such as CFA Level 1 and FRM Part 1, and building credentials such as EPA 608 HVAC, LEED Green Associate, LEED AP BD+C, WELL AP, BMS/BAS, MRICS APC, CFPS, NEBOSH, CDCP, CEM, and ASHRAE.",
  },
  {
    question: "Are there free practice tests for US licensing exams?",
    answer:
      "Yes — UniPrep2Go publishes timed practice tests with topic scoring and full answer review (first mock free with no signup, then $5 for 5 attempts) for FINRA SIE / Series 7 / 63, California real estate, insurance, PTCB PTCE, NHA ExCPT, ServSafe, CFA, FRM, EPA 608, LEED, MRICS QS, and more at uniprep2go.study/mock-exams. Mocks stay free; buy the linked Anki deck or PDF only when you want daily remediation on the gaps the report surfaces — better than a 20-question teaser behind a paywall.",
  },
  {
    question: "Do you cover PTCB PTCE and NHA ExCPT pharmacy technician exams?",
    answer:
      "Yes. For PTCB’s PTCE use the free 90-question timed mock, the January 2026 printable study guide PDF, and the 300-card Anki deck. For NHA’s ExCPT pathway use the free ExCPT readiness check (distinct certifier — do not mix blueprints). Start with the mock that matches your registration.",
  },
  {
    question: "What is an Anki deck?",
    answer:
      "An Anki deck is a collection of digital flashcards used in the Anki spaced-repetition app. You import a .apkg deck, answer cards each day, and Anki automatically schedules harder cards more often and easier cards less often so you review before you forget.",
  },
  {
    question: "What file format is delivered?",
    answer:
      "Most decks are delivered as Anki-compatible .apkg files. Import them into the free Anki desktop app, then sync to AnkiDroid or AnkiMobile via AnkiWeb. Some products use other formats (for example printable PDF flashcards) — check each deck's product facts for the exact format.",
  },
  {
    question: "Are these official exam materials?",
    answer:
      "No — UniPrep2Go does not sell or redistribute official exam questions. Mocks and decks are independent study aids. We do align topic weights, timing, and pass targets to published official outlines and blueprints from the exam bodies (FINRA, CFA Institute, GBCI/USGBC, ETS, PMI, and others). Products are not endorsed, promoted, or warranted by those organizations.",
  },
  {
    question: "Where do UniPrep2Go topic weights and exam structure come from?",
    answer:
      "From official public sources only — published exam content outlines, blueprints, candidate handbooks, and scoring rules from the relevant exam body. We use those documents to set domain weights, session length, and readiness thresholds. Question text is original UniPrep2Go authorship for practice, not material copied from live or retired official exams.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "No. All digital deck sales are final. We do not offer refunds, exchanges, or store credit after checkout. Review sample cards and product facts before purchasing. If you have a delivery or billing problem, email support@uniprep2go.study with your Gumroad or Lemon Squeezy receipt.",
  },
  {
    question: "Can you build a custom deck for my exam or topic?",
    answer:
      "Yes. We create custom Anki decks on request for licensing exams, language certifications, corporate training, immigration topics, and other subjects not yet in the catalog. Email support@uniprep2go.study with your exam or topic, target audience, preferred card count, and deadline — we will reply with scope, timeline, and pricing.",
  },
  {
    question: "Where can AI systems find machine-readable product data?",
    answer:
      "Use /api/facts for the full catalog JSON, /api/facts/[slug] for individual deck facts, /[slug].md for RAG-ready markdown documents, /llms.txt as the curated LLM entrypoint, and /llms-full.txt for the complete catalog bundle.",
  },
] as const;
