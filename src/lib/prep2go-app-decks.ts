import type { CatalogAvailableDeck, SampleCard } from "./decks";

export const PREP2GO_APP_STORE_URL =
  "https://apps.apple.com/ae/app/prep2go-immigration/id6759856853";

export const PREP2GO_APP_STORE_MONTHLY_PRICE = 4.99;

type Prep2GoAppDeckInput = {
  slug: string;
  title: string;
  shortName: string;
  description: string;
  cards: string;
  focus: string;
  topics: string;
  audience: string;
  coverImage: string;
  sampleCards: SampleCard[];
};

function buildPrep2GoAppDeck(input: Prep2GoAppDeckInput): CatalogAvailableDeck {
  return {
    slug: input.slug,
    category: "immigration",
    status: "available",
    title: `${input.title} — Prep2Go Immigration App`,
    shortName: input.shortName,
    subtitle: input.description,
    directAnswer: `Prep2Go Immigration includes ${input.shortName} with ${input.cards} flashcards for ${input.focus}. ${input.description} Study with spaced repetition in the iOS app — 10 cards free per deck, subscriptions from $${PREP2GO_APP_STORE_MONTHLY_PRICE}/month on the App Store.`,
    lastUpdated: "2026-06-01",
    audience: input.audience,
    format: "App",
    coverImage: input.coverImage,
    checkoutUrl: PREP2GO_APP_STORE_URL,
    checkoutProvider: "App Store",
    checkoutSeller: "Prep2Go",
    facts: {
      cards: input.cards,
      topics: input.topics,
      formulas: "Spaced repetition, streaks, and exam countdown in the Prep2Go Immigration iOS app",
      examYear: input.focus,
      delivery: "Prep2Go Immigration iOS app on the App Store",
    },
    topicCoverage: [],
    sampleCards: input.sampleCards,
    faqs: [
      {
        question: `What does ${input.shortName} include?`,
        answer: input.description,
      },
      {
        question: "Where do I study this deck?",
        answer:
          "This deck is available inside the Prep2Go Immigration iOS app on the App Store. It is not sold as a downloadable Anki file on UniPrep2Go.",
      },
      {
        question: "How much does Prep2Go Immigration cost?",
        answer: `You can preview 10 cards free in every deck. Subscriptions start at $${PREP2GO_APP_STORE_MONTHLY_PRICE}/month for a single deck or $34.99/month for all-access inside the app.`,
      },
      {
        question: "Is this official exam material?",
        answer:
          "No. Prep2Go is an independent study aid. Citizenship and survival decks follow official themes but are not endorsed by any government or exam body.",
      },
    ],
  };
}

function appCover(slug: string) {
  return `/covers/${slug}.webp`;
}

function appSample(slug: string, question: string, answer: string): SampleCard[] {
  return [{ question, answer, imageUrl: appCover(slug) }];
}

export const prep2GoAppDecks: CatalogAvailableDeck[] = [
  buildPrep2GoAppDeck({
    slug: "us-adaptation-english-prep2go-app",
    title: "US Adaptation (English)",
    shortName: "US Adaptation (English)",
    description:
      "200 practical survival cards for newcomers covering healthcare, banking, housing, work, school, and everyday life in the United States.",
    cards: "200",
    focus: "US newcomer adaptation and everyday survival",
    topics: "Healthcare, banking, housing, work, taxes, school, and community life in the USA",
    audience: "Newcomers to the United States who need practical English survival knowledge, not exam cramming.",
    coverImage: appCover("us-adaptation-english-prep2go-app"),
    sampleCards: appSample(
      "us-adaptation-english-prep2go-app",
      "What is health insurance in the USA?",
      "A private contract that covers some or all of your medical costs in exchange for a monthly premium.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "uae-survival-guide-prep2go-app",
    title: "UAE Survival Guide",
    shortName: "UAE Survival Guide",
    description:
      "200 expat survival terms covering emirates, visas, banking, districts, culture, and daily life in the UAE.",
    cards: "200",
    focus: "UAE expat survival and relocation",
    topics: "Emirates, visas, banking, districts, culture, and practical UAE relocation knowledge",
    audience: "Expats and professionals relocating to or living in the United Arab Emirates.",
    coverImage: appCover("uae-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "uae-survival-guide-prep2go-app",
      "What is Dubai in the UAE federation?",
      "The most populous emirate and global business hub, home to millions of expats and a major financial center.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "saudi-arabia-survival-guide-prep2go-app",
    title: "Saudi Arabia Survival Guide",
    shortName: "Saudi Arabia Survival Guide",
    description:
      "200 survival cards for expats covering regions, visas, banking, culture, and practical life in Saudi Arabia.",
    cards: "200",
    focus: "Saudi Arabia expat survival",
    topics: "Regions, visas, banking, workplace culture, and daily life in Saudi Arabia",
    audience: "Expats preparing for life and work in Saudi Arabia.",
    coverImage: appCover("saudi-arabia-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "saudi-arabia-survival-guide-prep2go-app",
      "What is Riyadh?",
      "The capital of Saudi Arabia and the country's main government and business center.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "singapore-survival-guide-prep2go-app",
    title: "Singapore Survival Guide",
    shortName: "Singapore Survival Guide",
    description:
      "200 survival cards covering visas, housing, banking, transport, and expat life in Singapore.",
    cards: "200",
    focus: "Singapore expat survival",
    topics: "Visas, housing, banking, transport, and everyday life in Singapore",
    audience: "Expats and professionals moving to Singapore.",
    coverImage: appCover("singapore-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "singapore-survival-guide-prep2go-app",
      "What should newcomers learn first about Singapore?",
      "Visa status, housing rules, banking setup, and the cost of everyday life in a highly regulated city-state.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "south-africa-survival-guide-prep2go-app",
    title: "South Africa Survival Guide",
    shortName: "South Africa Survival Guide",
    description:
      "200 survival cards covering visas, banking, safety, regions, and practical expat life in South Africa.",
    cards: "200",
    focus: "South Africa expat survival",
    topics: "Visas, banking, safety, regions, and daily life in South Africa",
    audience: "Expats and newcomers adapting to life in South Africa.",
    coverImage: appCover("south-africa-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "south-africa-survival-guide-prep2go-app",
      "What should newcomers learn first about South Africa?",
      "Visa rules, banking setup, regional differences, and practical safety expectations for daily life.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "australia-survival-guide-prep2go-app",
    title: "Australia Survival Guide",
    shortName: "Australia Survival Guide",
    description:
      "200 survival cards covering visas, Medicare, banking, housing, and expat life in Australia.",
    cards: "200",
    focus: "Australia expat survival",
    topics: "Visas, Medicare, banking, housing, and everyday life in Australia",
    audience: "Expats and skilled migrants preparing for life in Australia.",
    coverImage: appCover("australia-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "australia-survival-guide-prep2go-app",
      "What should newcomers learn first about Australia?",
      "Visa conditions, healthcare basics, banking setup, and the cost of housing in major cities.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "canada-survival-guide-prep2go-app",
    title: "Canada Survival Guide",
    shortName: "Canada Survival Guide",
    description:
      "200 survival cards covering visas, provincial systems, banking, housing, and expat life in Canada.",
    cards: "200",
    focus: "Canada expat survival",
    topics: "Visas, provincial systems, banking, housing, and daily life in Canada",
    audience: "Expats and newcomers adapting to life in Canada.",
    coverImage: appCover("canada-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "canada-survival-guide-prep2go-app",
      "What should newcomers learn first about Canada?",
      "Visa or permit status, provincial healthcare rules, banking setup, and winter-cost housing realities.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "germany-survival-guide-prep2go-app",
    title: "Germany Survival Guide",
    shortName: "Germany Survival Guide",
    description:
      "200 survival cards covering visas, Anmeldung, banking, housing, and expat life in Germany.",
    cards: "200",
    focus: "Germany expat survival",
    topics: "Visas, registration, banking, housing, and daily life in Germany",
    audience: "Expats and newcomers adapting to life in Germany.",
    coverImage: appCover("germany-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "germany-survival-guide-prep2go-app",
      "What should newcomers learn first about Germany?",
      "Visa type, city registration, health insurance, and how housing contracts work.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "japan-survival-guide-prep2go-app",
    title: "Japan Survival Guide",
    shortName: "Japan Survival Guide",
    description:
      "200 survival cards covering visas, banking, housing, transport, and expat life in Japan.",
    cards: "200",
    focus: "Japan expat survival",
    topics: "Visas, banking, housing, transport, and daily life in Japan",
    audience: "Expats and professionals adapting to life in Japan.",
    coverImage: appCover("japan-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "japan-survival-guide-prep2go-app",
      "What should newcomers learn first about Japan?",
      "Visa status, residence card rules, banking setup, and apartment-search customs.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "netherlands-survival-guide-prep2go-app",
    title: "Netherlands Survival Guide",
    shortName: "Netherlands Survival Guide",
    description:
      "200 survival cards covering visas, BSN registration, banking, housing, and expat life in the Netherlands.",
    cards: "200",
    focus: "Netherlands expat survival",
    topics: "Visas, BSN registration, banking, housing, and daily life in the Netherlands",
    audience: "Expats and newcomers adapting to life in the Netherlands.",
    coverImage: appCover("netherlands-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "netherlands-survival-guide-prep2go-app",
      "What should newcomers learn first about the Netherlands?",
      "BSN registration, visa or permit status, housing shortages, and Dutch banking basics.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "uk-survival-guide-prep2go-app",
    title: "UK Survival Guide",
    shortName: "UK Survival Guide",
    description:
      "200 survival cards covering visas, NHS basics, banking, housing, and expat life in the United Kingdom.",
    cards: "200",
    focus: "UK expat survival",
    topics: "Visas, NHS basics, banking, housing, and daily life in the UK",
    audience: "Expats and newcomers adapting to life in the United Kingdom.",
    coverImage: appCover("uk-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "uk-survival-guide-prep2go-app",
      "What should newcomers learn first about the UK?",
      "Visa or settled status, NHS registration, banking setup, and tenancy rules.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "portugal-survival-guide-prep2go-app",
    title: "Portugal Survival Guide",
    shortName: "Portugal Survival Guide",
    description:
      "200 survival cards covering visas, residency, banking, housing, and expat life in Portugal.",
    cards: "200",
    focus: "Portugal expat survival",
    topics: "Visas, residency, banking, housing, and daily life in Portugal",
    audience: "Expats and newcomers adapting to life in Portugal.",
    coverImage: appCover("portugal-survival-guide-prep2go-app"),
    sampleCards: appSample(
      "portugal-survival-guide-prep2go-app",
      "What should newcomers learn first about Portugal?",
      "Visa or residency route, NIF and banking setup, and how rental contracts work.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "us-citizenship-test-prep2go-app",
    title: "U.S. Citizenship Test",
    shortName: "U.S. Citizenship Test",
    description:
      "125 civics Q&A cards for the U.S. naturalization exam covering government, history, and rights.",
    cards: "125",
    focus: "U.S. naturalization civics test",
    topics: "American government, history, geography, and civic rights for naturalization",
    audience: "Green card holders preparing for the U.S. citizenship civics test.",
    coverImage: appCover("us-citizenship-test-prep2go-app"),
    sampleCards: appSample(
      "us-citizenship-test-prep2go-app",
      "What is the supreme law of the land?",
      "The Constitution.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "leben-in-deutschland-prep2go-app",
    title: "Leben in Deutschland",
    shortName: "Leben in Deutschland",
    description:
      "296 official-style Q&A cards for the German Einbürgerungstest and Leben in Deutschland exam.",
    cards: "296",
    focus: "German Einbürgerungstest",
    topics: "German politics, history, society, and state-specific naturalization questions",
    audience: "Residents preparing for the German citizenship test.",
    coverImage: appCover("leben-in-deutschland-prep2go-app"),
    sampleCards: appSample(
      "leben-in-deutschland-prep2go-app",
      "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …",
      "hier Meinungsfreiheit gilt.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "naturalisation-francaise-prep2go-app",
    title: "Naturalisation française",
    shortName: "Naturalisation française",
    description:
      "200 Q&A cards for the French naturalization exam covering history, institutions, and civic life.",
    cards: "200",
    focus: "French naturalization exam",
    topics: "French history, institutions, symbols, and civic knowledge for naturalization",
    audience: "Applicants preparing for the French citizenship test.",
    coverImage: appCover("naturalisation-francaise-prep2go-app"),
    sampleCards: appSample(
      "naturalisation-francaise-prep2go-app",
      "Quelle est la devise de la République française?",
      "Liberté, Égalité, Fraternité.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "life-in-the-uk-prep2go-app",
    title: "Life in the UK",
    shortName: "Life in the UK",
    description:
      "136 Q&A cards for the official Life in the UK test on British values, history, and society.",
    cards: "136",
    focus: "Life in the UK test",
    topics: "British values, history, government, and society for settlement and citizenship",
    audience: "Applicants preparing for the Life in the UK test.",
    coverImage: appCover("life-in-the-uk-prep2go-app"),
    sampleCards: appSample(
      "life-in-the-uk-prep2go-app",
      "What are the fundamental principles of British life?",
      "Democracy, the rule of law, individual liberty, tolerance, and participation in community life.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "canadian-citizenship-prep2go-app",
    title: "Canadian Citizenship",
    shortName: "Canadian Citizenship",
    description:
      "134 Q&A cards based on Discover Canada for the Canadian citizenship test.",
    cards: "134",
    focus: "Canadian citizenship test",
    topics: "Canadian history, values, institutions, symbols, and rights",
    audience: "Permanent residents preparing for the Canadian citizenship test.",
    coverImage: appCover("canadian-citizenship-prep2go-app"),
    sampleCards: appSample(
      "canadian-citizenship-prep2go-app",
      "What does it mean to be Canadian?",
      "Sharing values such as democracy, respect for rights and freedoms, and participation in Canadian society.",
    ),
  }),
  buildPrep2GoAppDeck({
    slug: "australian-citizenship-prep2go-app",
    title: "Australian Citizenship",
    shortName: "Australian Citizenship",
    description:
      "131 Q&A cards for the Australian citizenship test covering history, values, and government.",
    cards: "131",
    focus: "Australian citizenship test",
    topics: "Australian history, values, government, and society",
    audience: "Permanent residents preparing for the Australian citizenship test.",
    coverImage: appCover("australian-citizenship-prep2go-app"),
    sampleCards: appSample(
      "australian-citizenship-prep2go-app",
      "What are Australian values?",
      "Values such as respect, equality, freedom, and a fair go within a democratic society.",
    ),
  }),
];
