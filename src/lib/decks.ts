import { enrichDeckWithShopPreviews } from "./prep2go-shop-samples";
import { prep2GoAppDecks } from "./prep2go-app-decks";
import { applyAnkiDeckLaunchToCatalog } from "./anki-deck-launch";

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
  checkoutUrl: string;
  cards: string;
  focus: string;
  topics: string;
  audience: string;
  coverImage?: string;
  fallbackCoverImage?: string;
  format?: ".apkg" | ".csv" | "PDF";
  sampleCards?: SampleCard[];
};

function buildPrep2GoLanguageDeck(input: Prep2GoLanguageDeckInput): CatalogAvailableDeck {
  return {
    slug: input.slug,
    category: "language",
    status: "available",
    title: input.title,
    shortName: input.shortName,
    subtitle: input.description,
    directAnswer: `UniPrep2Go lists the Prep2Go ${input.title} with ${input.cards} cards for ${input.focus}. ${input.description} It is delivered as ${input.format ?? ".apkg"} for {PRICE} through Lemon Squeezy.`,
    lastUpdated: "2026-05-31",
    audience: input.audience,
    format: input.format ?? ".apkg",
    coverImage: input.coverImage ?? input.fallbackCoverImage,
    checkoutUrl: input.checkoutUrl,
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: input.cards,
      topics: input.topics,
      formulas: "Prep2Go sample-card previews, examples, audio where included, and exam-focused recall prompts",
      examYear: input.focus,
      delivery: "Digital download through Lemon Squeezy",
    },
    topicCoverage: [],
    sampleCards: input.sampleCards?.length
      ? input.sampleCards
      : input.fallbackCoverImage
        ? [
            {
              question: `What is included in ${input.shortName}?`,
              answer: input.description,
              imageUrl: input.fallbackCoverImage,
            },
          ]
        : [],
    faqs: [
      {
        question: `What does ${input.shortName} include?`,
        answer: input.description,
      },
      {
        question: "What file format is delivered?",
        answer: `The product is delivered as ${input.format ?? "an Anki-compatible .apkg file"} through Lemon Squeezy.`,
      },
      {
        question: "Is this official exam material?",
        answer: "No. This is an independent Prep2Go study aid and is not affiliated with or endorsed by any exam body.",
      },
    ],
  };
}

const prep2GoAdditionalLanguageDecks: CatalogAvailableDeck[] = [
  buildPrep2GoLanguageDeck({
    slug: "danish-a2-prove-i-dansk-anki-deck",
    title: "Danish A2 Prøve i Dansk Anki Deck — 1000 Flashcards",
    shortName: "Danish A2 Prøve i Dansk",
    description: "1,000 exam-specific Danish vocabulary words for Prøve i Dansk with audio and Anki-ready review.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/753c8eb8-f49b-46d6-bc0e-a725f451de31",
    cards: "1000",
    focus: "Prøve i Dansk A2 exam vocabulary",
    topics: "Danish A2 exam vocabulary and practical example sentences",
    audience: "Danish A2 learners preparing for Prøve i Dansk with spaced repetition.",
    coverImage: "/covers/danish-a2-prove-i-dansk-anki-deck.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "delf-a2-printable-french-flashcards",
    title: "DELF A2 Printable French Flashcards — 360 PDF Cards",
    shortName: "DELF A2 Printable French",
    description: "360 printable DELF A2 French flashcards with images, example sentences, and QR audio across two PDF files.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/7e6a118c-cc84-411a-ac06-efe1495d477a",
    cards: "360",
    focus: "DELF A2 printable vocabulary cards",
    topics: "DELF A2 vocabulary, example sentences, images, and QR audio",
    audience: "DELF A2 learners who want printable French flashcards with audio QR support.",
    fallbackCoverImage: "/samples/prep2go-delf-a2-printable-french-cover.webp",
    format: "PDF",
    coverImage: "/samples/prep2go-delf-a2-printable-french-cover.webp",
    sampleCards: [
      {
        question: "What does a sample A4 page look like?",
        answer:
          "Each page has six cards with a French headword, English gloss, example sentences, illustration, topic label, and QR audio.",
        imageUrl: "/samples/delf-a2-printable-french-flashcards-sample-1.webp",
      },
      {
        question: "How do you print the cards at home?",
        answer: "Print at 100% scale on A4 paper and cut along the dashed lines — six cards per page.",
        imageUrl: "/samples/delf-a2-printable-french-flashcards-sample-2.webp",
      },
      {
        question: "How does QR audio work on each card?",
        answer:
          "Every card includes a QR code that opens Prep2Go French pronunciation audio while you review the printed card.",
        imageUrl: "/samples/delf-a2-printable-french-flashcards-sample-3.webp",
      },
      {
        question: "What is included in the PDF download?",
        answer:
          "360 printable DELF A2 cards on 60 A4 pages across two PDF files, with images, examples, cut lines, and QR audio.",
        imageUrl: "/samples/delf-a2-printable-french-flashcards-sample-4.webp",
      },
    ],
  }),
  buildPrep2GoLanguageDeck({
    slug: "spanish-italian-paired-anki-deck",
    title: "Spanish + Italian Paired Vocabulary Anki Deck — 940+ Flashcards",
    shortName: "Spanish + Italian Paired Vocabulary",
    description: "940+ paired vocabulary cards for learning Spanish and Italian in parallel through English, with examples and audio.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/8e8a362a-dda0-4a1e-a83b-5363fef28c7a",
    cards: "940+",
    focus: "Spanish and Italian paired vocabulary",
    topics: "Spanish and Italian paired headwords, English glosses, examples, and audio",
    audience: "Learners who want to study Spanish and Italian together through English using Anki.",
    coverImage: "/covers/spanish-italian-paired-anki-deck.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ielts-toefl-english-for-arabic-speakers-anki-deck",
    title: "IELTS / TOEFL English for Arabic Speakers Anki Deck — 1000 Flashcards",
    shortName: "IELTS / TOEFL English for Arabic Speakers",
    description: "English exam vocabulary for IELTS, TOEFL, Cambridge, and PTE with Arabic support, bilingual cards, and native English audio examples.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/b5f67b51-e682-4913-94e8-cc9796b22e09",
    cards: "1000",
    focus: "IELTS, TOEFL, Cambridge, and PTE English vocabulary",
    topics: "IELTS and TOEFL English vocabulary with Arabic bilingual support",
    audience: "Arabic-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    coverImage: "/samples/prep2go-ielts-toefl-english-for-arabic-speakers-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "arabic-survival-phrases-anki-deck",
    title: "Arabic Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Arabic Survival Phrases",
    description: "300 Arabic survival phrase cards with audio and transliteration for travel and practical communication.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/fb550737-604c-48ca-8f66-3967fa61af5c",
    cards: "300",
    focus: "Arabic survival phrases",
    topics: "Arabic travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Arabic survival phrases in Anki.",
    coverImage: "/samples/prep2go-arabic-survival-phrases-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "dele-a2-ccse-spanish-citizenship-bundle",
    title: "DELE A2 + CCSE Spanish Citizenship Anki Bundle — Exam Flashcards",
    shortName: "DELE A2 + CCSE Spanish Citizenship",
    description: "Spanish citizenship bundle pairing DELE A2 vocabulary with CCSE civic knowledge flashcards for nationality preparation.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/652a3be0-c0df-40a7-a39c-c2627478dd83",
    cards: "1000+ vocabulary plus CCSE civic cards",
    focus: "DELE A2 and CCSE Spanish citizenship exams",
    topics: "Spanish A2 vocabulary, CCSE constitution, institutions, geography, history, and daily life in Spain",
    audience: "Spanish citizenship applicants preparing for DELE A2 and CCSE with Anki.",
    coverImage: "/samples/prep2go-dele-a2-ccse-spanish-citizenship-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ielts-toefl-english-for-french-speakers-anki-deck",
    title: "IELTS / TOEFL English for French Speakers Anki Deck — 1000 Flashcards",
    shortName: "IELTS / TOEFL English for French Speakers",
    description: "English exam vocabulary for IELTS, TOEFL, Cambridge, and PTE with French support, bilingual cards, and native English audio examples.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/25d3a57b-3c6b-4ada-825b-6a951e8e2c6b",
    cards: "1000",
    focus: "IELTS, TOEFL, Cambridge, and PTE English vocabulary",
    topics: "IELTS and TOEFL English vocabulary with French bilingual support",
    audience: "French-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    coverImage: "/samples/prep2go-ielts-toefl-english-for-french-speakers-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ielts-toefl-english-for-portuguese-speakers-anki-deck",
    title: "IELTS / TOEFL English for Portuguese Speakers Anki Deck — 1000 Flashcards",
    shortName: "IELTS / TOEFL English for Portuguese Speakers",
    description: "English exam vocabulary for IELTS, TOEFL, Cambridge, and PTE with Portuguese support, bilingual cards, and native English audio examples.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/fab876a3-9182-4f00-8e99-a18cb100fac0",
    cards: "1000",
    focus: "IELTS, TOEFL, Cambridge, and PTE English vocabulary",
    topics: "IELTS and TOEFL English vocabulary with Portuguese bilingual support",
    audience: "Portuguese-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    coverImage: "/samples/prep2go-ielts-toefl-english-for-portuguese-speakers-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ielts-toefl-english-for-spanish-speakers-anki-deck",
    title: "IELTS / TOEFL English for Spanish Speakers Anki Deck — 1000 Flashcards",
    shortName: "IELTS / TOEFL English for Spanish Speakers",
    description: "English exam vocabulary for IELTS, TOEFL, Cambridge, and PTE with Spanish support, bilingual cards, and native English audio examples.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/4eb62368-5b3e-4b9b-bd0e-806559fff1a1",
    cards: "1000",
    focus: "IELTS, TOEFL, Cambridge, and PTE English vocabulary",
    topics: "IELTS and TOEFL English vocabulary with Spanish bilingual support",
    audience: "Spanish-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    coverImage: "/samples/prep2go-ielts-toefl-english-for-spanish-speakers-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ielts-toefl-english-for-turkish-speakers-anki-deck",
    title: "IELTS / TOEFL English for Turkish Speakers Anki Deck — 1000 Flashcards",
    shortName: "IELTS / TOEFL English for Turkish Speakers",
    description: "English exam vocabulary for IELTS, TOEFL, Cambridge, and PTE with Turkish support, bilingual cards, and native English audio examples.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/ec008b8c-5d52-452a-a6bb-802ba6226f68",
    cards: "1000",
    focus: "IELTS, TOEFL, Cambridge, and PTE English vocabulary",
    topics: "IELTS and TOEFL English vocabulary with Turkish bilingual support",
    audience: "Turkish-speaking IELTS, TOEFL, Cambridge, and PTE candidates using Anki for English exam vocabulary.",
    coverImage: "/samples/prep2go-ielts-toefl-english-for-turkish-speakers-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "japanese-survival-phrases-anki-deck",
    title: "Japanese Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Japanese Survival Phrases",
    description: "300 Japanese survival phrase cards with audio and transliteration for travel and practical communication.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/f720afe1-e658-4153-bbff-184ddf63e608",
    cards: "300",
    focus: "Japanese survival phrases",
    topics: "Japanese travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Japanese survival phrases in Anki.",
    coverImage: "/samples/prep2go-japanese-survival-phrases-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "korean-survival-phrases-anki-deck",
    title: "Korean Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Korean Survival Phrases",
    description: "300 Korean survival phrase cards with audio and transliteration for travel and practical communication.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/7ac389e5-5838-4603-a387-122e08eaa864",
    cards: "300",
    focus: "Korean survival phrases",
    topics: "Korean travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Korean survival phrases in Anki.",
    coverImage: "/samples/prep2go-korean-survival-phrases-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "russian-survival-phrases-anki-deck",
    title: "Russian Survival Phrases Anki Deck — 300 Flashcards",
    shortName: "Russian Survival Phrases",
    description: "300 Russian survival phrase cards with audio and transliteration for travel and practical communication.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/45682f23-9e35-4fd8-99c5-746505f1ff6b",
    cards: "300",
    focus: "Russian survival phrases",
    topics: "Russian travel phrases, practical communication, audio, and transliteration",
    audience: "Travelers and beginners who want Russian survival phrases in Anki.",
    coverImage: "/samples/prep2go-russian-survival-phrases-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "norwegian-a2-norskprove-anki-deck",
    title: "Norwegian A2 Norskprøve Anki Deck — 1000 Flashcards",
    shortName: "Norwegian A2 Norskprøve",
    description: "1,000 exam-specific Norwegian vocabulary words for Norskprøve with audio and Anki-ready review.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/0bcef1e0-092d-4e9b-999e-63e55bb77543",
    cards: "1000",
    focus: "Norskprøve A2 exam vocabulary",
    topics: "Norwegian A2 exam vocabulary and practical example sentences",
    audience: "Norwegian A2 learners preparing for Norskprøve with spaced repetition.",
    coverImage: "/samples/prep2go-norwegian-a2-norskprove-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "ciple-a2-grammar-anki-deck",
    title: "CIPLE A2 Portuguese Grammar Anki Deck — 200 Cards",
    shortName: "CIPLE A2 Portuguese Grammar",
    description: "200 Portuguese A2 grammar cards for CIPLE, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/8d33911c-3f43-4df9-807e-44de5e5e0e6c",
    cards: "200",
    focus: "CIPLE A2 Portuguese grammar",
    topics: "Portuguese A2 grammar explanations, article examples, and CIPLE-focused recall prompts",
    audience: "CIPLE A2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-ciple-a2-grammar-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "dele-a2-grammar-anki-deck",
    title: "DELE A2 Spanish Grammar Anki Deck — 200 Cards",
    shortName: "DELE A2 Spanish Grammar",
    description: "200 Spanish A2 grammar cards for DELE, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/3a300e4c-96d7-4f5c-b3be-fbeae79461c4",
    cards: "200",
    focus: "DELE A2 Spanish grammar",
    topics: "Spanish A2 grammar explanations, article examples, and DELE-focused recall prompts",
    audience: "DELE A2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-dele-a2-grammar-cover.webp",
  }),
  buildPrep2GoLanguageDeck({
    slug: "delf-b2-grammar-anki-deck",
    title: "DELF B2 French Grammar Anki Deck — 200 Cards",
    shortName: "DELF B2 French Grammar",
    description: "200 French B2 grammar cards for DELF, built from Prep2Go grammar explanations with article visuals and sample-card previews.",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/6d545d65-6a42-44c3-b1dd-04be65244701",
    cards: "200",
    focus: "DELF B2 French grammar",
    topics: "French B2 grammar explanations, article examples, and DELF-focused recall prompts",
    audience: "DELF B2 learners who want grammar recall practice in Anki.",
    coverImage: "/samples/prep2go-delf-b2-grammar-cover.webp",
  }),
];

const rawDecks: Deck[] = [
  {
    slug: "cfa-level-1-anki-deck",
    category: "finance",
    status: "available",
    title: "CFA Level 1 Anki Deck — 342+ Smart Flashcards",
    shortName: "CFA Level 1",
    subtitle: "A concise Anki deck for CFA Level 1 candidates using spaced repetition.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 1 Anki deck with 342+ flashcards covering all 10 CFA Level 1 topic areas, including core formulas and definitions. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary spaced-repetition study aid for the 2026 exam cycle and is not official CFA Institute material or a replacement for the curriculum.",
    lastUpdated: "2026-05-31",
    audience: "CFA Level 1 candidates who want structured recall practice for formulas, concepts, and topic definitions.",
    format: ".apkg",
    coverImage: "/covers/cfa-level-1-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
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
        answer:
          "A private OTC agreement to buy or sell an asset at a specified forward price on a future date. No money changes hands upfront, and the contract is binding on both parties with no optionality.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-1.webp",
      },
      {
        question: "What is the no-arbitrage forward price for an asset with no income?",
        answer:
          "The future value of the current spot price at the risk-free rate for the forward period. Forward price is the no-arbitrage price set to eliminate riskless profit.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-2.webp",
      },
      {
        question: "What is the forward price for an asset that pays income?",
        answer:
          "Spot price minus the present value of income, compounded at the risk-free rate. Income reduces forward price because the holder of the spot asset receives it.",
        imageUrl: "/samples/cfa-level-1-anki-deck-sample-3.webp",
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
    slug: "cfa-level-1-formula-reference-2026",
    category: "finance",
    status: "available",
    title:
      "CFA Level 1 Formula Reference 2026 — 250 Formulas + 98 Definitions + 80-Question Drill (PDF)",
    shortName: "CFA Level 1 Formula Reference",
    subtitle:
      "54-page printable formula quick reference for the 2026 cycle — 250 typeset formulas, 98 key definitions, and an 80-question recall drill.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 1 Formula & Definitions Quick Reference PDF with 54 printable pages: 348 entries (250 typeset formulas and 98 examiner-style definitions) organized across all 10 Level 1 topic areas (concept, typeset formula, one-line meaning), an 80-question Formula Recall Drill with explained answer key, and a clickable table of contents. Built from the same validated item bank as the CFA Level 1 Anki deck. Delivered as a grayscale-friendly US Letter PDF for {PRICE} through Gumroad. Recall companion — not CFA Institute curriculum or a study course.",
    lastUpdated: "2026-06-12",
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
          "Yes. The PDF and 342+ card Anki deck share the same validated item bank. Use the reference for printable formula tables and the recall drill; use Anki for daily spaced-repetition on your phone.",
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
    subtitle: "A focused Anki deck for FRM Part 1 active recall and formula retention.",
    directAnswer:
      "UniPrep2Go sells an independent FRM Part 1 Anki deck with 444 high-yield cards covering foundations of risk management, quantitative analysis, financial markets and products, valuation and risk models, VaR, Expected Shortfall, credit risk, operational risk, derivatives, fixed income, swaps, futures, options, Greeks, and risk governance. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary spaced-repetition study aid and is not affiliated with or endorsed by GARP.",
    lastUpdated: "2026-05-31",
    audience: "FRM Part 1 candidates who want active recall practice for formulas, concepts, definitions, and risk-management logic.",
    format: ".apkg",
    coverImage: "/covers/frm-part-1-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "444",
      topics: "Full FRM Part 1 curriculum structure",
      formulas: "Concise explanations, formulas, examples, and common mistakes",
      examYear: "Current FRM Part 1 cycle",
      delivery: "Digital download through Gumroad (364 KB)",
    },
    topicCoverage: [
      { name: "Foundations of Risk Management", examWeight: "FRM Part 1 topic", cards: "High-yield cards" },
      { name: "Quantitative Analysis", examWeight: "FRM Part 1 topic", cards: "High-yield cards" },
      { name: "Financial Markets and Products", examWeight: "FRM Part 1 topic", cards: "High-yield cards" },
      { name: "Valuation and Risk Models", examWeight: "FRM Part 1 topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "What are the investment grade vs speculative grade rating boundaries?",
        answer:
          "Investment grade: Baa3/BBB- and above. Speculative grade or high yield: Ba1/BB+ and below. Fallen angels are IG bonds downgraded to HY; rising stars are HY bonds upgraded to IG.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-1.webp",
      },
      {
        question: "What is a CDS and how does it work?",
        answer:
          "A credit default swap is insurance against bond default. The protection buyer pays a periodic CDS spread; if default occurs, the seller pays par minus recovery value.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-2.webp",
      },
      {
        question: "What is credit risk (counterparty risk) in derivatives?",
        answer:
          "Counterparty credit risk is the risk that the counterparty defaults when the derivative has positive mark-to-market value to you. It is one-sided and only exists when the contract has positive value.",
        imageUrl: "/samples/frm-part-1-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the FRM Part 1 deck include?",
        answer: "444 high-yield Anki cards covering the FRM Part 1 curriculum structure, including formulas, definitions, examples, common mistakes, and exam-style recall prompts.",
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
    lastUpdated: "2026-05-31",
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
      { name: "Knowledge of Capital Markets", examWeight: "FINRA SIE topic", cards: "High-yield cards" },
      { name: "Products and Their Risks", examWeight: "FINRA SIE topic", cards: "High-yield cards" },
      { name: "Trading, Customer Accounts, and Prohibited Activities", examWeight: "FINRA SIE topic", cards: "High-yield cards" },
      { name: "Regulatory Framework", examWeight: "FINRA SIE topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "What is the SEC?",
        answer:
          "The Securities and Exchange Commission is the federal regulator overseeing securities markets, issuers, exchanges, broker-dealers, investment advisers, and disclosure rules.",
        imageUrl: "/samples/sie-exam-anki-deck-sample-1.webp",
      },
      {
        question: "What is FINRA?",
        answer:
          "FINRA is a self-regulatory organization overseeing broker-dealers and registered representatives, including qualification exams, sales practice rules, and member firm supervision.",
        imageUrl: "/samples/sie-exam-anki-deck-sample-2.webp",
      },
      {
        question: "What does the MSRB regulate?",
        answer:
          "The Municipal Securities Rulemaking Board writes rules for municipal securities dealers, municipal advisors, and municipal market conduct.",
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
      "UniPrep2Go sells an independent Series 7 Anki deck with 300 high-yield cards covering FINRA's Series 7 job-function outline: seeking business, opening accounts, investment products, recommendations, suitability, records, order handling, confirmations, settlement, and trade processing. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for Series 7 candidates and is not official FINRA material.",
    lastUpdated: "2026-05-31",
    audience: "Series 7 candidates sponsored by a FINRA member firm, new financial advisors, registered representative trainees, and SIE passers who want focused spaced-repetition review.",
    format: ".apkg",
    coverImage: "/covers/series-7-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lvzval?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics: "FINRA Series 7 job functions: communications, account opening, products, recommendations, suitability, records, order handling, settlement, and trade processing",
      formulas: "Clear explanations, exam traps, and MathJax support for formulas",
      examYear: "Current Series 7 Top-Off exam cycle",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Seeking Business and Communications", examWeight: "Series 7 job function", cards: "High-yield cards" },
      { name: "Opening Customer Accounts", examWeight: "Series 7 job function", cards: "High-yield cards" },
      { name: "Investment Products, Recommendations, Suitability, and Records", examWeight: "Series 7 job function", cards: "High-yield cards" },
      { name: "Order Handling, Confirmations, Settlement, and Trade Processing", examWeight: "Series 7 job function", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "What must a registered representative remember when prospecting for new customers?",
        answer:
          "Prospecting communications must be fair, balanced, not misleading, properly supervised, and consistent with firm communication rules.",
        imageUrl: "/samples/series-7-anki-deck-sample-1.webp",
      },
      {
        question: "When does retail communication require heightened review?",
        answer:
          "Retail communication often requires principal approval before use depending on content and product, especially recommendations, rankings, options, investment companies, and new issue materials.",
        imageUrl: "/samples/series-7-anki-deck-sample-2.webp",
      },
      {
        question: "Who is an institutional customer?",
        answer:
          "An institutional customer includes banks, investment companies, advisers, insurance companies, and other entities meeting institutional criteria.",
        imageUrl: "/samples/series-7-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Series 7 deck include?",
        answer: "300 high-yield Anki cards covering FINRA Series 7 Top-Off topics including suitability, products, options, bonds, customer accounts, order handling, settlement, and communications.",
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
        question: "Does the deck replace Series 7 practice questions?",
        answer: "No. It is a supplementary recall tool for products, suitability rules, definitions, formulas, and exam traps. Use it alongside a full Series 7 course and practice questions.",
      },
    ],
  },
  {
    slug: "series-63-anki-deck",
    category: "finance",
    status: "available",
    title: "Series 63 Anki Deck — 250 High-Yield Flashcards",
    shortName: "Series 63",
    subtitle: "A focused Anki deck for NASAA Series 63 state securities law active recall.",
    directAnswer:
      "UniPrep2Go sells an independent Series 63 Anki deck with 250 high-yield cards covering NASAA's official exam structure: broker-dealer regulation, agent registration, ethical practices, customer communications, securities and exemptions, investment adviser basics, investment adviser representatives, and remedies. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for Series 63 candidates and is not official NASAA material.",
    lastUpdated: "2026-05-31",
    audience:
      "Series 63 candidates, new broker-dealer agents, SIE and Series 7 candidates who also need state registration, and financial services trainees who want spaced repetition instead of rereading outlines.",
    format: ".apkg",
    coverImage: "/covers/series-63-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/vsbsgw?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "250",
      topics:
        "NASAA Series 63 structure: broker-dealer regulation, agent registration, ethics, communications, securities and exemptions, investment advisers, and remedies",
      formulas: "Clear explanations, common exam traps, and mobile-friendly card design",
      examYear: "Current Series 63 exam cycle",
      delivery: "Digital download through Gumroad (188 KB)",
    },
    topicCoverage: [
      { name: "Broker-Dealer Regulation", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Broker-Dealer Agent Registration", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Ethical Practices and Obligations", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Communications with Customers and Prospects", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Securities, Issuers, Exemptions, and Transactions", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Investment Adviser Basics and Representatives", examWeight: "Series 63 topic", cards: "High-yield cards" },
      { name: "Remedies and Administrative Provisions", examWeight: "Series 63 topic", cards: "High-yield cards" },
    ],
    sampleCards: [
      {
        question: "What is a broker-dealer under state securities law?",
        answer:
          "A broker-dealer is a person engaged in the business of effecting securities transactions for the account of others or for its own account. A firm executing customer stock trades is a broker-dealer.",
        imageUrl: "/samples/series-63-anki-deck-sample-1.webp",
      },
      {
        question: "Why is an issuer usually excluded from broker-dealer definition?",
        answer:
          "An issuer selling its own securities is generally not treated as a broker-dealer merely for issuing those securities. A corporation issuing its own stock is an issuer, not a BD solely for that issuance.",
        imageUrl: "/samples/series-63-anki-deck-sample-2.webp",
      },
      {
        question: "Are agents themselves broker-dealers?",
        answer:
          "No. Individuals representing broker-dealers or issuers are agents, not broker-dealers. A registered rep of a BD is an agent.",
        imageUrl: "/samples/series-63-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Series 63 deck include?",
        answer:
          "250 high-yield Anki cards covering NASAA Series 63 topics including broker-dealer regulation, agent registration, ethics, communications, securities and exemptions, investment advisers, and remedies.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "It is for Series 63 candidates, new broker-dealer agents, and SIE or Series 7 candidates who also need state registration.",
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
        question: "Does the deck replace Series 63 practice questions?",
        answer:
          "No. It is a supplementary recall tool for rules, definitions, and common exam traps. Use it alongside a full Series 63 course and practice questions.",
      },
    ],
  },
  {
    slug: "california-real-estate-exam-anki-deck",
    category: "finance",
    status: "available",
    title: "California Real Estate Exam Anki Deck — 400 High-Yield Flashcards",
    shortName: "California Real Estate",
    subtitle:
      "A focused Anki deck for California DRE salesperson exam active recall and real estate math.",
    directAnswer:
      "UniPrep2Go sells an independent California Real Estate Salesperson Exam Anki deck with 400 high-yield cards covering the California DRE exam structure: property ownership and land use controls, laws of agency and fiduciary duties, property valuation and financial analysis, financing, transfer of property, practice of real estate and mandated disclosures, and contracts. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for California real estate candidates and is not official DRE material.",
    lastUpdated: "2026-05-31",
    audience:
      "California real estate salesperson exam candidates, career changers entering real estate, pre-licensing students, and candidates who want active recall for agency, disclosures, contracts, and real estate math.",
    format: ".apkg",
    coverImage: "/covers/california-real-estate-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/qqrwpk?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "400",
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
        question: "What is real property?",
        answer:
          "Real property is land plus things permanently attached to it and the rights associated with ownership. Land, buildings, fixtures, and appurtenant rights are real property.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-1.webp",
      },
      {
        question: "What is personal property?",
        answer:
          "Personal property is movable property not classified as real property. Furniture, appliances not attached, and trade tools can be personal property.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-2.webp",
      },
      {
        question: "What is a fixture?",
        answer:
          "A fixture is personal property that has become real property because it is attached or adapted with intent to be permanent. Built-in cabinets are usually fixtures.",
        imageUrl: "/samples/california-real-estate-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the California Real Estate deck include?",
        answer:
          "400 high-yield Anki cards covering California DRE salesperson exam topics including property ownership, agency, valuation, financing, transfer, disclosures, contracts, and real estate math.",
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
    title: "Life & Health Insurance Exam Anki Deck — 400 High-Yield Flashcards",
    shortName: "Life & Health Insurance",
    subtitle:
      "A focused Anki deck for Life & Health insurance producer exam active recall and licensing terminology.",
    directAnswer:
      "UniPrep2Go sells an independent Life & Health Insurance Exam Anki deck with 400 high-yield cards covering national core topics tested across Life & Health insurance producer exams: general insurance principles, life insurance policy types, policy provisions and riders, annuities, health insurance plans and cost-sharing, disability income and long-term care, Medicare basics, and tax treatment, replacement, ethics, and producer responsibilities. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for insurance licensing candidates and is not official state exam material.",
    lastUpdated: "2026-05-31",
    audience:
      "Life & Health insurance license candidates, new insurance producers, career changers entering insurance sales, pre-licensing students, and candidates who want active recall for policy provisions, riders, annuities, health plans, and insurance terminology.",
    format: ".apkg",
    coverImage: "/covers/life-and-health-insurance-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/jcrljf?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "400",
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
        question: "What is risk in insurance?",
        answer:
          "Risk is uncertainty or chance of loss. Insurance transfers certain financial consequences of risk from insured to insurer. Risk of premature death can be transferred through life insurance.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-1.webp",
      },
      {
        question: "What is pure risk?",
        answer:
          "Pure risk involves only the chance of loss or no loss, not gain, and is generally insurable. Risk of sickness, disability, or death.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-2.webp",
      },
      {
        question: "What is speculative risk?",
        answer:
          "Speculative risk involves chance of gain, loss, or no change and is generally not insurable. Starting a business or buying stock involves speculative risk.",
        imageUrl: "/samples/life-and-health-insurance-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Life & Health Insurance deck include?",
        answer:
          "400 high-yield Anki cards covering Life & Health insurance producer exam topics including general principles, life policies, provisions and riders, annuities, health plans, disability and LTC, Medicare, tax, replacement, ethics, and producer responsibilities.",
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
    title: "Property & Casualty Insurance Exam Anki Deck — 400 High-Yield Flashcards",
    shortName: "Property & Casualty Insurance",
    subtitle:
      "A focused Anki deck for U.S. Property & Casualty insurance licensing exam active recall.",
    directAnswer:
      "UniPrep2Go sells an independent Property & Casualty Insurance Exam Anki deck with 400 high-yield cards covering national core topics tested across U.S. P&C licensing exams: property insurance basics, homeowners and dwelling policies, personal auto, commercial property, business owners policy, commercial general liability, workers compensation, policy structure, exclusions, claims, and key regulation concepts. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid for P&C insurance licensing candidates and is not official state exam material.",
    lastUpdated: "2026-06-01",
    audience:
      "Property & Casualty insurance license candidates, new insurance producers, career changers entering insurance sales, pre-licensing students, and candidates who want active recall for homeowners, auto, commercial lines, and policy provisions.",
    format: ".apkg",
    coverImage: "/covers/property-casualty-insurance-exam-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/engqgt?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "400",
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
        question: "What is risk in property and casualty insurance?",
        answer:
          "Risk is uncertainty about financial loss; P&C insurance transfers covered property or liability loss risk to insurer. Risk of house fire or lawsuit from auto accident.",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-1.webp",
      },
      {
        question: "What is pure risk?",
        answer:
          "Pure risk has possibility of loss or no loss, not gain, and is generally insurable. Risk of theft, fire, or liability claim.",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-2.webp",
      },
      {
        question: "What is speculative risk?",
        answer:
          "Speculative risk has chance of gain, loss, or no change and is generally not insurable. Investing in rental property value appreciation.",
        imageUrl: "/samples/property-casualty-insurance-exam-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the Property & Casualty Insurance deck include?",
        answer:
          "400 high-yield Anki cards covering U.S. P&C licensing topics including property basics, homeowners, auto, commercial property, BOP, CGL, workers comp, policy structure, exclusions, claims, and regulation.",
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
    subtitle: "A vignette-depth Anki deck for CFA Level 2 candidates using spaced repetition.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 2 Anki deck with 495 flashcards covering all 10 CFA Level 2 topic areas, including FSA, equity and fixed income valuation, portfolio management, derivatives, and ethics application. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary spaced-repetition study aid for the 2026 exam cycle and is not official CFA Institute material or a replacement for the curriculum.",
    lastUpdated: "2026-06-13",
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
        question: "What is free cash flow to the firm (FCFF)?",
        answer:
          "Cash available to all capital providers after operating expenses, taxes, reinvestment, and working capital needs. FCFF = NI + NCC + Int(1 − t) − FCInv − WCInv. Common mistake: forgetting to tax-adjust interest when starting from NI.",
        imageUrl: "/samples/cfa-level-2-anki-deck-sample-1.webp",
      },
      {
        question: "What is free cash flow to equity (FCFE)?",
        answer:
          "Cash available to equity holders after all expenses, reinvestment, debt flows, and preferred dividends. FCFE = NI + NCC − FCInv − WCInv + Net Borrowing. Common mistake: using FCFF discounted at cost of equity.",
        imageUrl: "/samples/cfa-level-2-anki-deck-sample-2.webp",
      },
      {
        question: "How do you compute FCFF from CFO?",
        answer:
          "Start with CFO, add back after-tax interest, subtract net investment in fixed and working capital. FCFF = CFO + Int(1 − t) − FCInv − WCInv. Common mistake: subtracting interest from CFO without tax adjustment.",
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
      "60-page printable formula quick reference for the 2026 cycle — 219 typeset formulas, 276 examiner-style definitions, and an 80-question recall drill.",
    directAnswer:
      "UniPrep2Go sells an independent CFA Level 2 Formula & Definitions Quick Reference PDF with 60 printable pages: 495 entries (219 typeset formulas and 276 examiner-style definitions) organized across all 10 Level 2 topic areas (concept, typeset formula, one-line meaning), an 80-question Formula Recall Drill with explained answer key, and a clickable table of contents. Built from the same validated item bank as the CFA Level 2 Anki deck. Delivered as a grayscale-friendly US Letter PDF for {PRICE} through Gumroad. Recall companion — not CFA Institute curriculum or a study course.",
    lastUpdated: "2026-06-13",
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
        question: "Cover — Level 2 formula reference at a glance",
        answer:
          "60 print-ready pages with 219 typeset formulas and 276 definitions organized across all 10 Level 2 topic areas.",
        imageUrl: "/samples/cfa-level-2-formula-reference-2026-sample-1.webp",
      },
      {
        question: "Fixed Income formula table — typeset math at a glance",
        answer:
          "Each row shows concept, typeset formula, and a one-line plain-English meaning — the fastest pre-exam scan for arbitrage-free and credit-model families Level 2 repeats.",
        imageUrl: "/samples/cfa-level-2-formula-reference-2026-sample-2.webp",
      },
      {
        question: "Formula Recall Drill — see the formula, name the concept",
        answer:
          "80 questions with same-topic distractors test whether you can retrieve the concept behind a displayed formula under item-set exam timing.",
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
  // ── Language certifications ──────────────────────────────────────────
  {
    slug: "ciple-a2-european-portuguese-anki-deck",
    category: "language",
    status: "available",
    title: "CIPLE A2 Portuguese Anki Deck — 1600+ Flashcards",
    shortName: "CIPLE A2 Portuguese",
    subtitle: "Full Anki deck for CIPLE / CAPLE A2 European Portuguese exam preparation.",
    directAnswer:
      "UniPrep2Go sells a CIPLE A2 European Portuguese Anki deck with 1600+ flashcards covering exam vocabulary, phrases, and examples with audio pronunciation and images. It is delivered as an Anki .apkg file for {PRICE} through Lemon Squeezy. The deck targets CIPLE / CAPLE A2 candidates, Portuguese residency and citizenship applicants, and self-learners using spaced repetition.",
    lastUpdated: "2026-05-31",
    audience: "CIPLE / CAPLE A2 exam candidates, Portuguese residency or citizenship applicants, self-learners.",
    format: ".apkg",
    coverImage: "/covers/ciple-a2-european-portuguese-anki-deck.webp",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/6f688637-f5ce-440f-8d2a-7614379ee3ca",
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: "1600+",
      topics: "Vocabulary, phrases, everyday situations",
      formulas: "Audio pronunciation + contextual examples",
      examYear: "Current CAPLE cycle",
      delivery: "Digital download through Lemon Squeezy",
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
        answer: "The deck is delivered as an Anki-compatible .apkg file through Lemon Squeezy.",
      },
      {
        question: "Does it include audio?",
        answer: "Yes. Cards include audio pronunciation to help train your ear for European Portuguese.",
      },
    ],
  },
  {
    slug: "delf-b2-french-anki-deck",
    category: "language",
    status: "available",
    title: "DELF B2 French Anki Deck — 2000+ Flashcards",
    shortName: "DELF B2 French",
    subtitle: "Vocabulary-first Anki deck for DELF B2 French exam preparation.",
    directAnswer:
      "UniPrep2Go sells a DELF B2 French Anki deck with 2000+ flashcards covering every word needed for the B2 exam, each with a visual image, native French audio, and contextual example. It is delivered as an Anki .apkg file for {PRICE} through Lemon Squeezy. The deck targets DELF B2 candidates who want vocabulary retained through spaced repetition rather than passive list study.",
    lastUpdated: "2026-05-31",
    audience: "DELF B2 exam candidates and advanced French learners using spaced repetition.",
    format: ".apkg",
    coverImage: "/covers/delf-b2-french-anki-deck.webp",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/b764a5b4-6fb5-4f19-a90f-8f310a51a1eb",
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: "2000+",
      topics: "DELF B2 vocabulary — full word list coverage",
      formulas: "Native audio + visual image + contextual example per card",
      examYear: "Current DELF cycle",
      delivery: "Digital download through Lemon Squeezy (159 MB)",
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
        answer: "An Anki-compatible .apkg file delivered through Lemon Squeezy.",
      },
    ],
  },
  {
    slug: "dutch-a2-inburgering-anki-deck",
    category: "language",
    status: "available",
    title: "Dutch A2 Inburgering Anki Deck — 1000+ Flashcards",
    shortName: "Dutch A2 Inburgering",
    subtitle: "1000 high-frequency Dutch words for the Inburgering A2 civic integration exam.",
    directAnswer:
      "UniPrep2Go sells a Dutch A2 Inburgering Anki deck with 1000+ high-frequency words for the Dutch civic integration (Inburgering) exam. Each card includes the Dutch word, English gloss, bilingual example sentences, native audio, and illustrations. It is delivered as an Anki .apkg file for {PRICE} through Lemon Squeezy. The deck targets migrants preparing for the Dutch Inburgering exam and A2 Dutch certification.",
    lastUpdated: "2026-05-31",
    audience: "Migrants preparing for the Dutch Inburgering exam and A2 Dutch language certification.",
    format: ".apkg",
    coverImage: "/covers/dutch-a2-inburgering-anki-deck.webp",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/d43d6fc1-02d2-462a-8cf8-d421c6a98c88",
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: "1000+",
      topics: "Inburgering exam vocabulary — citizenship-style themes",
      formulas: "Native audio + bilingual examples + illustrations per card",
      examYear: "Current Inburgering cycle",
      delivery: "Digital download through Lemon Squeezy (82.9 MB)",
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
        answer: "An Anki-compatible .apkg file delivered through Lemon Squeezy.",
      },
    ],
  },
  {
    slug: "german-a2-anki-deck",
    category: "language",
    status: "available",
    title: "German A2 Anki Deck — 1000 Flashcards",
    shortName: "German A2",
    subtitle: "1000 essential German words for A2 certificate exams — Goethe, telc, ÖSD.",
    directAnswer:
      "UniPrep2Go sells a German A2 Anki deck with 1000 essential words for Goethe-Institut, telc, and ÖSD A2 certificate exams. It is delivered as an Anki .apkg file for {PRICE} through Lemon Squeezy. The deck targets German A2 exam candidates using spaced repetition for vocabulary retention.",
    lastUpdated: "2026-05-31",
    audience: "German A2 certificate exam candidates for Goethe-Institut, telc, or ÖSD.",
    format: ".apkg",
    coverImage: "/covers/german-a2-anki-deck.webp",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/6006b518-3a04-4e7a-a77d-1e3f4c0a6e58",
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: "1000",
      topics: "A2-level German vocabulary",
      formulas: "Essential words with examples",
      examYear: "Current Goethe / telc / ÖSD cycle",
      delivery: "Digital download through Lemon Squeezy",
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
        question: "Which German A2 exams does this deck cover?",
        answer: "The deck is designed for the three main A2 German certificates: Goethe-Institut A2, telc Deutsch A2, and ÖSD Zertifikat A2. The vocabulary list overlaps substantially across all three.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Lemon Squeezy.",
      },
    ],
  },
  {
    slug: "celi-b1-italian-anki-deck",
    category: "language",
    status: "available",
    title: "CELI B1 Italian Anki Deck — 1,373 Flashcards",
    shortName: "CELI B1 Italian",
    subtitle: "Vocabulary-first Anki deck for CELI B1 Italian certificate exam preparation.",
    directAnswer:
      "UniPrep2Go sells a CELI B1 Italian Anki deck with 1,373 flashcards for the CELI B1 certificate from the Università per Stranieri di Perugia. It is delivered as an Anki .apkg file for {PRICE} through Lemon Squeezy. The deck targets Italian B1 certification candidates who want vocabulary retained through spaced repetition rather than passive list study.",
    lastUpdated: "2026-05-31",
    audience: "CELI B1 certificate candidates and intermediate Italian learners.",
    format: ".apkg",
    coverImage: "/covers/celi-b1-italian-anki-deck.webp",
    checkoutUrl: "https://ciple-a2.lemonsqueezy.com/checkout/buy/8e19de0e-c430-49dd-b3b8-72ce5b6f7944",
    checkoutProvider: "Lemon Squeezy",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: "1373",
      topics: "B1-level Italian vocabulary and phrases",
      formulas: "Exam-focused vocabulary",
      examYear: "Current CELI cycle",
      delivery: "Digital download through Lemon Squeezy",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "casa",
        answer: "house — La mia casa è piccola. (My house is small.)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-1.webp",
      },
      {
        question: "lavoro",
        answer:
          "work — Il mio lavoro è nel centro. (My work is in the city centre.)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-2.webp",
      },
      {
        question: "tempo",
        answer: "time — Non ho tempo oggi. (I don't have time today.)",
        imageUrl: "/samples/celi-b1-italian-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What is the CELI B1 exam?",
        answer: "CELI (Certificato di Conoscenza della Lingua Italiana) is an Italian language certificate from the Università per Stranieri di Perugia. The B1 level demonstrates intermediate Italian proficiency.",
      },
      {
        question: "How many cards does the deck have?",
        answer: "1,373 cards covering B1-level Italian vocabulary for CELI preparation.",
      },
      {
        question: "What file format is delivered?",
        answer: "An Anki-compatible .apkg file delivered through Lemon Squeezy.",
      },
    ],
  },
  ...prep2GoAdditionalLanguageDecks,
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
    sampleCards: [],
    faqs: [
      {
        question: "Is there a free GMAT practice test?",
        answer:
          "Yes. Take the free 45-question GMAT Focus readiness check at uniprep2go.study/mock-exams/gmat-focus-readiness-check — timed section scoring and full answer review.",
      },
      {
        question: "When will the GMAT Anki deck be available?",
        answer:
          "The deck is planned but not yet on sale. Use the readiness check now and request access on the mock page to be notified when the deck launches.",
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
      "CAT4 Level D bundle for Year 7 / Grade 7 selective entry: 200 Anki cards for daily pattern review plus a ~49-page printable PDF with 192 worked examples across Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Use Anki for method cards and weak-spot review; use the PDF for timed paper practice with answer keys and insight notes. Independent study material — not affiliated with GL Assessment or CAT4. Instant download for {PRICE} through Gumroad.",
    lastUpdated: "2026-06-02",
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
          "Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Spatial subtests are not included in this bundle.",
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
    sampleCards: [],
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
    subtitle: "A planned deck for the RICS Quantity Surveying and Construction APC pathway.",
    directAnswer:
      "The MRICS Quantity Surveying Anki Deck is a planned UniPrep2Go product covering QS core competencies, mandatory ethics, and interview prep. It is not yet available for purchase. Take the free QS pathway readiness check to benchmark weak competencies.",
    lastUpdated: "2026-06-02",
    audience:
      "Assistant quantity surveyors, cost consultants, commercial managers, and QS graduates on the Quantity Surveying and Construction APC pathway.",
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
    sampleCards: [],
    faqs: [
      {
        question: "Is there a free MRICS Quantity Surveying practice test?",
        answer:
          "Yes. Take the free 50-question QS pathway readiness check at uniprep2go.study/mock-exams/mrics-quantity-surveying-readiness-check.",
      },
      {
        question: "How is this different from the general MRICS readiness check?",
        answer:
          "The general MRICS mock covers APC structure for all pathways. This QS-specific mock targets Quantity Surveying core competencies — measurement, contracts, commercial management, and cost planning.",
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
        question:
          "Before discharging CO2 into a normally occupied enclosure, NFPA 12 requires:",
        answer:
          "Correct: (b) Predischarge alarms and time delay or personnel accounting to allow evacuation. CO2 is asphyxiant; lockout and warning devices protect occupants from lethal oxygen displacement.",
        imageUrl: "/samples/cfps-anki-deck-sample-1.webp",
      },
      {
        question: "A total flooding CO2 system design concentration depends primarily on:",
        answer:
          "Correct: (c) Fuel type, enclosure volume, and minimum design concentration from NFPA 12 tables. CO2 quantity = concentration × adjusted volume; deep-seated fires may need extended holding periods.",
        imageUrl: "/samples/cfps-anki-deck-sample-2.webp",
      },
      {
        question: "Clean agent systems covered under NFPA 2001 are characterized by:",
        answer:
          "Correct: (d) Electrically nonconductive gaseous agents that extinguish by heat absorption and/or oxygen reduction without residue. Clean agents (HFCs, FK-5-1-12, inert gases) protect sensitive equipment in enclosures with concentration-based design.",
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
    lastUpdated: "2026-06-02",
    audience:
      "Health and safety officers, supervisors, managers, and career changers preparing for the NEBOSH International General Certificate through an accredited Learning Partner.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "GIC1 Elements 1–11 and GIC2 risk assessment skills per NEBOSH IGC syllabus",
      formulas: "Planned hierarchy of control, risk rating, and incident investigation facts",
      examYear: "NEBOSH IGC syllabus (January 2026 learner guide)",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "H&S Management Systems and Culture", examWeight: "GIC1 Elements 1–4", cards: "Planned" },
      { name: "Physical, Psychological, and Musculoskeletal Health", examWeight: "GIC1 Elements 5–6", cards: "Planned" },
      { name: "Chemical, Biological, and Workplace Hazards", examWeight: "GIC1 Elements 7–8", cards: "Planned" },
      { name: "Work Equipment, Fire, and Electricity", examWeight: "GIC1 Elements 9–11", cards: "Planned" },
      { name: "Risk Assessment (GIC2)", examWeight: "GIC2 practical unit", cards: "Planned" },
    ],
    sampleCards: [],
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
    subtitle: "A planned deck for EXIN EPI Certified Data Centre Professional exam prep.",
    directAnswer:
      "The CDCP Anki Deck is a planned UniPrep2Go product covering EXIN EPI Certified Data Centre Professional exam domains. It is not yet available for purchase. Take the free CDCP readiness check to benchmark weak domains.",
    lastUpdated: "2026-06-02",
    audience:
      "Data centre operators, facility engineers, and IT infrastructure professionals preparing for the EXIN EPI CDCP credential after accredited EPI training.",
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: "Facilities (power, cooling, fire, security) and Operations per EXIN EPI CDCP blueprint",
      formulas: "Planned PUE, cooling capacity, UPS sizing, and tier-classification facts",
      examYear: "Current EXIN EPI CDCP cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: [
      { name: "Site, Standards, and Building", examWeight: "~7.5%", cards: "Planned" },
      { name: "Power Infrastructure and EMF", examWeight: "~20%", cards: "Planned" },
      { name: "Cooling, Water, and Thermal", examWeight: "~12.5%", cards: "Planned" },
      { name: "Fire Protection, Security, and Network", examWeight: "~35%", cards: "Planned" },
      { name: "Data Centre Operations", examWeight: "15%", cards: "Planned" },
    ],
    sampleCards: [
      {
        question:
          "ASHRAE TC 9.9 recommended inlet air temperature ranges for most IT equipment are:",
        answer:
          "Correct: (a) Defined environmental classes allowing wider bands than legacy 20–25°C-only designs. TC 9.9 classes support higher supply temps where equipment allows, improving economizer hours.",
        imageUrl: "/samples/cdcp-anki-deck-sample-1.webp",
      },
      {
        question:
          "A CRAH (Computer Room Air Handler) differs from a CRAC primarily because:",
        answer:
          "Correct: (a) CRAH uses chilled water coils while CRAC typically has integral refrigeration. CRAHs are air handlers connected to central chiller plants; CRACs are self-contained DX units.",
        imageUrl: "/samples/cdcp-anki-deck-sample-2.webp",
      },
      {
        question: "Chilled water supply temperature elevation (within ASHRAE limits) can:",
        answer:
          "Correct: (a) Improve chiller efficiency and increase free cooling hours. Higher CHW temps raise evaporator temperature and reduce chiller lift.",
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
      "The ASHRAE Certifications Anki Deck is a planned UniPrep2Go product covering ASHRAE's ANSI-accredited credential exams. It is not yet available for purchase. Take the free ASHRAE certifications readiness check to benchmark weak domains.",
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
        question:
          "BCxP (Building Commissioning Professional) certification validates ability to:",
        answer:
          "Correct: (a) Lead and manage the commissioning process from design through occupancy per owner requirements. BCxP emphasizes owner advocacy and process management across project phases.",
        imageUrl: "/samples/ashrae-certifications-anki-deck-sample-1.webp",
      },
      {
        question: "The Owner's Project Requirements (OPR) document defines:",
        answer:
          "Correct: (a) Owner's measurable performance expectations for systems and the facility. OPR is the foundation against which commissioning verifies success.",
        imageUrl: "/samples/ashrae-certifications-anki-deck-sample-2.webp",
      },
      {
        question: "Basis of Design (BOD) translates OPR into:",
        answer:
          "Correct: (a) Design team assumptions, standards, and system selections explaining how requirements will be met. CxA reviews BOD for alignment with OPR early in design.",
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
    sampleCards: [],
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
    sampleCards: [],
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
    sampleCards: [],
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
        question: "IPMVP Option B is characterized by:",
        answer:
          "Correct: (a) Retrofit isolation with utility-grade measurement of energy use at the ECM level. Option B uses periodic or continuous measurements at specific retrofits to quantify savings.",
        imageUrl: "/samples/cem-anki-deck-sample-1.webp",
      },
      {
        question: "In an Energy Savings Performance Contract (ESPC), the ESCO typically:",
        answer:
          "Correct: (a) Designs, installs, and often guarantees savings financed through future energy cost reductions. ESCOs assume implementation and performance risk per contract, repaid via savings stream.",
        imageUrl: "/samples/cem-anki-deck-sample-2.webp",
      },
      {
        question:
          "The commissioning authority (CxA) on a new construction project should:",
        answer:
          "Correct: (a) Review design, witness testing, and verify systems operate per owner's project requirements. Independent or qualified CxA verifies design intent through plans review, submittals, and testing.",
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
        question:
          "A BACnet network segment has devices with MAC addresses 5, 12, 18, and 25. Which device will serve as the designated router if all devices have the same router priority?",
        answer:
          "Correct: (d) Device with MAC address 25. When BACnet devices have the same router priority, the device with the highest MAC address becomes the designated router.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-1.webp",
      },
      {
        question:
          "What is the primary purpose of the BACnet Device Object in a building automation system?",
        answer:
          "Correct: (b) To provide basic device identification and network configuration information. The Device Object is mandatory and is the fundamental identifying object on the network.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-2.webp",
      },
      {
        question:
          "In a BACnet/IP network, a device needs to discover other devices on a remote subnet. Which BACnet service is primarily responsible for this discovery process?",
        answer:
          "Correct: (c) Who-Is service forwarded through BACnet Broadcast Management Devices (BBMDs). Standard broadcasts do not cross subnet boundaries without BBMD forwarding.",
        imageUrl: "/samples/bms-building-automation-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "Is there a free BMS practice test?",
        answer:
          "Yes. Take the free 40-question BMS readiness check at uniprep2go.study/mock-exams/bms-bas-readiness-check — timed topic scoring and full answer review.",
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
        question:
          "When working with refrigerant recovery equipment, what is the minimum required recovery efficiency for stationary refrigeration and air conditioning equipment?",
        answer:
          "Correct: (c) 90% of the refrigerant charge. EPA rules require at least 90% recovery efficiency for stationary equipment before disposal or major repair.",
        imageUrl: "/samples/hvac-epa-608-anki-deck-sample-1.webp",
      },
      {
        question:
          "A technician suspects acid and moisture contamination in a recovered refrigerant stream. Which precaution best protects recovery equipment during evacuation?",
        answer:
          "Correct: (c) Install an in-line filter drier ahead of the recovery machine inlet. Filter driers trap contaminants before they reach the recovery unit.",
        imageUrl: "/samples/hvac-epa-608-anki-deck-sample-2.webp",
      },
      {
        question:
          "What is the maximum allowable leak rate for commercial refrigeration equipment containing 50 or more pounds of refrigerant before repair is required?",
        answer:
          "Correct: (c) 20% annually. Commercial refrigeration has a 20% annual leak threshold — stricter than some industrial categories but different from comfort cooling rules.",
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
      "UniPrep2Go sells an independent ServSafe Manager Anki deck with 300 high-yield food safety flashcards covering foodborne illness, time and temperature control, cross-contamination, personal hygiene, cleaning and sanitizing, receiving and storage, HACCP basics, and manager responsibilities. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck is a supplementary active-recall study aid and is not official ServSafe or National Restaurant Association material.",
    lastUpdated: "2026-06-02",
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
        question: "What is the temperature danger zone?",
        answer:
          "The range where pathogens can grow quickly in TCS food. ServSafe commonly teaches 41°F to 135°F; managers limit how long food stays in that range.",
        imageUrl: "/samples/servsafe-manager-anki-deck-sample-1.webp",
      },
      {
        question: "What is cross-contamination?",
        answer:
          "The transfer of pathogens from one food or surface to another, often through hands, cutting boards, utensils, storage errors, or unclean equipment.",
        imageUrl: "/samples/servsafe-manager-anki-deck-sample-2.webp",
      },
      {
        question: "What does sanitizing do?",
        answer:
          "Sanitizing reduces pathogens on a cleaned surface to safe levels. Clean first, then sanitize with the correct concentration and contact time.",
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
    subtitle: "300 flashcards for PTCE prep — top 200 drugs, sig codes, pharmacy math, and federal law.",
    directAnswer:
      "Built for pharmacy technicians preparing for the PTCE: 300 Anki flashcards covering the top 200 brand/generic pairs, drug classes, sig abbreviations, days-supply math, DEA schedules, HIPAA basics, recalls, and order-entry workflow. Short daily sessions on your phone beat rereading notes the week before the exam. Independent study aid — not official PTCB, NHA, FDA, or DEA material. .apkg download for {PRICE} via Gumroad.",
    lastUpdated: "2026-06-02",
    audience:
      "Pharmacy technician candidates, pharmacy tech students, career changers preparing for the PTCE, and technicians who want daily brand/generic and sig-code recall on their phone.",
    format: ".apkg",
    coverImage: "/covers/ptcb-pharmacy-technician-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/yvifxh?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "300",
      topics:
        "Top 200 drugs, sig codes, pharmacy math, DEA schedules, federal law, and dispensing workflow",
      formulas: "Brand/generic recall, sig abbreviations, days-supply math, DEA schedule rules, and high-alert safety concepts",
      examYear: "January 2026 PTCE / pharmacy technician review",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [
      { name: "Top 200 Drugs", examWeight: "Core PTCE topic", cards: "Brand ↔ generic ↔ class with primary use" },
      { name: "Sig Codes & Abbreviations", examWeight: "Core PTCE topic", cards: "Common U.S. pharmacy abbreviations" },
      { name: "Pharmacy Math", examWeight: "Core PTCE topic", cards: "Days supply, conversions, ratio/proportion problems" },
      { name: "Federal Law & Safety", examWeight: "18.75% (2026)", cards: "DEA schedules, HIPAA, recalls, DSCSA traceability" },
      { name: "Order Entry & Inventory", examWeight: "Core PTCE topic", cards: "Dispensing workflow, labeling, handling basics" },
    ],
    sampleCards: [
      {
        question: "Prinivil — generic name, class, and primary use",
        answer:
          "Generic: Lisinopril. Class: ACE inhibitor. Primary use: hypertension and heart failure. Key note: dry cough is a common side effect.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-1.webp",
      },
      {
        question: "Common brand names for Lisinopril",
        answer:
          "Prinivil and Zestril. Class: ACE inhibitor. Useful when the prescription uses the brand name but the pharmacy dispenses generic Lisinopril.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-2.webp",
      },
      {
        question: "Norvasc — generic name, class, and primary use",
        answer:
          "Generic: Amlodipine. Class: CCB (dihydropyridine). Primary use: hypertension and angina. Key note: peripheral edema.",
        imageUrl: "/samples/ptcb-pharmacy-technician-anki-deck-sample-3.webp",
      },
    ],
    faqs: [
      {
        question: "What does the PTCB Pharmacy Technician deck include?",
        answer:
          "300 Anki flashcards covering top 200 drugs, sig codes, pharmacy math, DEA schedules, federal law, patient safety, and order-entry workflow, plus 2 legal intro cards and a READ_FIRST.txt file in the download folder.",
      },
      {
        question: "Who is this deck for?",
        answer:
          "Pharmacy technician candidates preparing for the PTCE, pharmacy tech students, and technicians who want short daily recall sessions on brand/generic pairs, sig abbreviations, and exam math.",
      },
      {
        question: "Is this official PTCB material?",
        answer:
          "No. This is an independent study aid and is not affiliated with, endorsed by, or sponsored by PTCB, the Pharmacy Technician Certification Board, NHA, FDA, or DEA.",
      },
      {
        question: "Does this work for ExCPT / NHA too?",
        answer:
          "Many topics overlap U.S. pharmacy technician curricula, but the deck is written for PTCE-style prep. Verify your exam blueprint before relying on it as your only study source.",
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
    title: "PTCB Exam Study Guide 2026 — Complete PTCE Review + 80-Question Practice Exam + Cheat Sheets (PDF)",
    shortName: "PTCB Study Guide 2026",
    subtitle:
      "30-page printable PTCE study guide for the January 2026 blueprint — domain-weighted chapters, 80-question practice exam, and print-ready cheat sheets.",
    directAnswer:
      "UniPrep2Go sells an independent PTCB Exam Study Guide 2026 PDF with 30 printable pages: four review chapters sized to the January 2026 PTCE domain weights (Medications 35%, Federal Requirements 18.75%, Patient Safety & QA 23.75%, Order Entry & Processing 22.5%), a full-length 80-question practice exam with domain-scored answer key and explanations, three cheat sheets (60 drugs A–Z, 45 sig codes, pharmacy math formulas), and a 4-week study plan. Built from the same validated 300-card item bank as the PTCB Anki deck. Delivered as a grayscale-friendly US Letter PDF for {PRICE} through Gumroad. Independent study aid — not official PTCB, NHA, FDA, or DEA material.",
    lastUpdated: "2026-06-06",
    audience:
      "PTCE candidates who want one structured printable document — read domain chapters, take the 80-question practice exam, print cheat sheets, and pair with spaced-repetition drills on the companion Anki deck.",
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
        question: "What does the PTCB Exam Study Guide 2026 include?",
        answer:
          "A 30-page printable PDF with four domain-weighted review chapters (January 2026 PTCE blueprint), an 80-question full-length practice exam with domain-scored answer key and explanations, three print-ready cheat sheets (drugs, sig codes, math), and a 4-week study plan.",
      },
      {
        question: "Is this updated for the January 2026 PTCE?",
        answer:
          "Yes. Chapter sizes follow the 2026 domain weights — Federal Requirements at 18.75% with DSCSA coverage, and compounding/alligation topics removed from the outline.",
      },
      {
        question: "Does this pair with the PTCB Anki deck?",
        answer:
          "Yes. The guide and 300-card Anki deck share the same validated item bank. Use the PDF for structured reading and the timed practice exam; use the Anki deck for daily brand/generic and sig-code recall on your phone.",
      },
      {
        question: "Who is this PDF for?",
        answer:
          "PTCE candidates who want one structured printable document. It is a focused exam-prep companion, not a full pharmacology textbook or curriculum replacement.",
      },
      {
        question: "Is this official PTCB material?",
        answer:
          "No. This is an independent educational product and is not affiliated with, endorsed by, or sponsored by PTCB, the Pharmacy Technician Certification Board, NHA, FDA, or DEA.",
      },
      {
        question: "How should I use it before exam day?",
        answer:
          "Follow the 4-week plan: read each domain chapter, take the 80-question practice exam, review every explanation, print the cheat sheets, and drill matching topics in the companion Anki deck if you use it.",
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
    subtitle: "Anki flashcard deck covering key terms for metals commodity trading.",
    directAnswer:
      "UniPrep2Go sells the Bench Energy Metal Trader's Lexicon, an Anki deck with 202 flashcards covering key vocabulary, terms, and concepts for metals commodity trading. It is delivered as an Anki .apkg file for {PRICE} through Gumroad. The deck targets commodity traders, analysts, and professionals working in metals markets.",
    lastUpdated: "2026-05-31",
    audience: "Metals commodity traders, analysts, and professionals entering metals markets.",
    format: ".apkg",
    coverImage: "/covers/bench-energy-metal-trader-anki-deck.webp",
    checkoutUrl: "https://pixidstudio.gumroad.com/l/zpazj?wanted=true",
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: "202",
      topics: "Metals trading terminology and market concepts",
      formulas: "Trading terms, pricing mechanics, market structure",
      examYear: "Professional reference",
      delivery: "Digital download through Gumroad",
    },
    topicCoverage: [],
    sampleCards: [
      {
        question: "What is the LME carry trade in metals?",
        answer: "Buying physical metal (cash) and simultaneously selling 3-month futures to capture the contango. Profit = contango minus storage and financing costs.",
        imageUrl: "/samples/bench-energy-metal-trader-anki-deck-sample-1.webp",
      },
    ],
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
        question: "What is Dated Brent and how does it differ from Brent futures?",
        answer: "Physical spot price for actual BFOE cargoes loading in the North Sea within 10–25 days forward, published by Platts. The physical anchor for the entire Brent complex. Dated Brent = cash price.",
        imageUrl: "/samples/bench-energy-oil-trader-anki-deck-sample-1.webp",
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
        question: "What is a netback calculation and why is it the most important number for a producer?",
        answer: "Working backwards from market price at point of sale, subtracting all costs to arrive at value at point of production — the real revenue per tonne. Example: API2 $120/t CIF ARA → minus freight, port, rail → netback at mine.",
        imageUrl: "/samples/bench-energy-coal-trader-anki-deck-sample-1.webp",
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
        question: "What is included in the Commodity Trader Pack?",
        answer: "Three complete Anki decks: Metal Trader's Lexicon (202 cards), Oil Trader's Lexicon (211 cards), and Coal Trader's Lexicon (221 cards). Covers universal trading foundations plus commodity-specific vocabulary for all three markets.",
        imageUrl: "/samples/commodity-trader-pack-bundle-sample-1.webp",
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

export const decks: Deck[] = applyAnkiDeckLaunchToCatalog(
  rawDecks.map(enrichDeckWithShopPreviews),
);

export const catalogAvailableDecks = decks.filter(
  (deck): deck is CatalogAvailableDeck => deck.status === "available",
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
  "servsafe-manager-anki-deck",
  "ptcb-pharmacy-technician-anki-deck",
  "sie-exam-anki-deck",
  "cfa-level-1-anki-deck",
] as const;

export function getFeaturedDecks() {
  return featuredDeckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export function getRelatedDecks(
  deck: CatalogAvailableDeck,
  limit = 4,
): CatalogAvailableDeck[] {
  return catalogAvailableDecks
    .filter((candidate) => candidate.slug !== deck.slug && candidate.category === deck.category)
    .slice(0, limit);
}

export const siteFaqs = [
  {
    question: "What is UniPrep2Go?",
    answer:
      "UniPrep2Go is a US-first exam prep site built around free timed online practice tests and readiness checks — with topic scoring, answer review, and pass/no-pass reports — plus independent Anki flashcard decks and printable PDF cram sheets you can use to drill weak topics after a mock. The catalog also includes Prep2Go Immigration app decks for survival guides and citizenship test prep on the App Store. Priority markets are the United States: FINRA, insurance licensing, California real estate, ServSafe, CFA, and FRM.",
  },
  {
    question: "Which US exams does UniPrep2Go cover?",
    answer:
      "The catalog includes US-market decks for FINRA SIE, Series 7, Series 63, California real estate salesperson exam prep, Life & Health insurance licensing, Property & Casualty insurance licensing, PTCB pharmacy technician exam prep, and ServSafe Manager food safety review, plus finance credential decks such as CFA Level 1 and FRM Part 1.",
  },
  {
    question: "Are there free practice tests for US licensing exams?",
    answer:
      "Yes. UniPrep2Go publishes free timed online practice tests for FINRA SIE (75 questions), ServSafe Manager (90 questions), and readiness checks for CFA Level 1, FRM Part 1, Series 7, Series 63, Life & Health insurance, Property & Casualty insurance, and the California real estate salesperson exam. Each mock includes topic scoring, answer review, and a linked flashcard deck repair plan at uniprep2go.study/mock-exams.",
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
      "No. UniPrep2Go decks are independent study aids. They are not endorsed, promoted, or warranted by CFA Institute, CAPLE, DELF, or any other exam body.",
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
