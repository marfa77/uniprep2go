import { enrichDeckWithShopPreviews } from "./prep2go-shop-samples";
import { prep2GoAppDecks } from "./prep2go-app-decks";

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

type BaseDeck = {
  slug: string;
  category: DeckCategory;
  title: string;
  shortName: string;
  subtitle: string;
  directAnswer: string;
  lastUpdated: string;
  audience: string;
  format: ".apkg" | ".csv" | "PDF" | "App";
  coverImage?: string;
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/qjocr",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lvzval",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/vsbsgw",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/qqrwpk",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/jcrljf",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/engqgt",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/oakmtp",
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

  // ── Professional / Food Safety ─────────────────────────────────────────
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ldpevc",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/lyvna",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/zpazj",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ugngbd",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/ipnqky",
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
    checkoutUrl: "https://pixidstudio.gumroad.com/l/tzzgh",
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

export const decks: Deck[] = rawDecks.map(enrichDeckWithShopPreviews);

export const primaryDeck = decks[0] as CatalogAvailableDeck;

export const catalogAvailableDecks = decks.filter(
  (deck): deck is CatalogAvailableDeck => deck.status === "available",
);

/** Catalog decks without resolved checkout prices. Prefer getPricedDecks(). */
export const availableDecks = catalogAvailableDecks;

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
  "language",
  "professional",
  "immigration",
  "academic",
];

export function getAvailableDecksByCategory(): Array<{
  category: DeckCategory;
  label: string;
  decks: CatalogAvailableDeck[];
}> {
  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      decks: catalogAvailableDecks.filter((d) => d.category === category),
    }))
    .filter((group) => group.decks.length > 0);
}

export const featuredDeckSlugs = [
  "servsafe-manager-anki-deck",
  "servsafe-manager-complete-study-guide",
  "sie-exam-anki-deck",
] as const;

export function getFeaturedDecks() {
  return featuredDeckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export const siteFaqs = [
  {
    question: "What is UniPrep2Go?",
    answer:
      "UniPrep2Go is a US-first catalog of independent exam prep products: Anki flashcard decks, printable PDF cram sheets, and free timed mock exams for licensing exams, finance credentials, language certifications, professional training, and academic subjects, plus Prep2Go Immigration app decks for survival guides and citizenship test prep on the App Store. The priority market is the United States, especially FINRA, insurance licensing, California real estate, ServSafe, CFA, and FRM candidates. Language decks remain available for long-tail search and global learners.",
  },
  {
    question: "Which US exams does UniPrep2Go cover?",
    answer:
      "The catalog includes US-market decks for FINRA SIE, Series 7, Series 63, California real estate salesperson exam prep, Life & Health insurance licensing, and Property & Casualty insurance licensing, plus finance credential decks such as CFA Level 1 and FRM Part 1.",
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
