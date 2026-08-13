import buildingCatalog from "@/data/gumroad/building-anki-decks.json";
import waveCatalog from "@/data/gumroad/wave-anki-decks.json";
import waveSpecs from "@/data/wave-deck-specs.json";
import type {
  CatalogAvailableDeck,
  Deck,
  DeckFaq,
  ImportStep,
  PlannedDeck,
  SampleCard,
  TopicCoverage,
} from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { getQuestionBank } from "./mock-exams/question-bank";
import { absoluteUrl } from "./site";

/** Sale-grade bank size target — matches mock bank generator for thick banks. */
export const ANKI_BANK_CARDS_PER_TOPIC = 50;

type GumroadCatalog = {
  storeBaseUrl: string;
  defaultPriceCents: number;
  products: Record<
    string,
    {
      permalink: string;
      gumroadProductId?: string;
      shortUrl?: string;
      createdAt?: string;
      apkgUploadedAt?: string;
      publishedAt?: string;
    }
  >;
};

const building = buildingCatalog as GumroadCatalog;
const wave = waveCatalog as GumroadCatalog;

type WaveSpec = { cohort?: string; cardCount?: number };

const waveSpecBySlug = waveSpecs as Record<string, WaveSpec>;

/**
 * Wave Gumroad products may exist for later cohorts (state RE, health/CDL, etc.).
 * Only the money cohort auto-launches on the site — plus explicit force-launch SKUs
 * when traffic justifies shipping outside money (e.g. ACE CPT).
 */
export const WAVE_LAUNCH_COHORTS = new Set(["money"]);

/** Non-money wave decks approved to flip planned → available when Gumroad product exists. */
export const WAVE_FORCE_LAUNCH_SLUGS = new Set(["ace-cpt-anki-deck"]);

export type BuildingAnkiDeckSlug = keyof typeof buildingCatalog.products;
export type WaveAnkiDeckSlug = string;

export const BUILDING_ANKI_DECK_SLUGS = Object.keys(building.products) as BuildingAnkiDeckSlug[];

const GUMROAD_STORE = (building.storeBaseUrl || wave.storeBaseUrl).replace(/\/$/, "");

export function buildGumroadCheckoutUrl(permalink: string) {
  return `${GUMROAD_STORE}/l/${permalink}?wanted=true`;
}

export function getGumroadProductRecord(slug: string) {
  return building.products[slug] ?? wave.products[slug] ?? null;
}

export function isWaveMoneyLaunchSlug(slug: string): boolean {
  return WAVE_LAUNCH_COHORTS.has(waveSpecBySlug[slug]?.cohort ?? "");
}

export function isWaveForceLaunchSlug(slug: string): boolean {
  return WAVE_FORCE_LAUNCH_SLUGS.has(slug);
}

/** Building catalog + approved wave money SKUs + force-launch allowlist. */
export function isLaunchableAnkiDeckSlug(slug: string): boolean {
  if (slug in building.products) return true;
  if (!(slug in wave.products)) return false;
  return isWaveMoneyLaunchSlug(slug) || isWaveForceLaunchSlug(slug);
}

/** @deprecated Prefer isLaunchableAnkiDeckSlug — kept for building-only call sites. */
export function isBuildingAnkiDeckSlug(slug: string): slug is BuildingAnkiDeckSlug {
  return slug in building.products;
}

export function isApkgReadyOnGumroad(slug: string) {
  const product = getGumroadProductRecord(slug);
  return Boolean(
    product &&
      "apkgUploadedAt" in product &&
      typeof product.apkgUploadedAt === "string",
  );
}

export function getLinkedMockForDeck(deckSlug: string) {
  return getAllMockExams().find((mock) => mock.linkedDeckSlug === deckSlug);
}

export function estimateAnkiDeckCardCount(deckSlug: string): number {
  const waveSpec = waveSpecBySlug[deckSlug];
  if (typeof waveSpec?.cardCount === "number" && waveSpec.cardCount > 0) {
    return waveSpec.cardCount;
  }
  const mock = getLinkedMockForDeck(deckSlug);
  if (!mock) {
    return 200;
  }
  if (typeof mock.ankiDeckCardCount === "number") {
    return mock.ankiDeckCardCount;
  }
  // Building / thick decks: topic × 50 target (session questionCount is not bank size).
  if (mock.topics.length > 0) {
    return mock.topics.length * ANKI_BANK_CARDS_PER_TOPIC;
  }
  if (typeof mock.questionCount === "number" && mock.questionCount > 0) {
    return mock.questionCount;
  }
  return 200;
}

export function formatAnkiDeckCardLabel(count: number) {
  // Exact count for wave banks; keep + only for thick / estimated banks.
  if (count <= 100) {
    return String(count);
  }
  return `${count}+`;
}

/** Launched wave decks with hand-authored card-preview webps under public/samples/. */
const LAUNCH_SAMPLE_IMAGE_SLUGS = new Set(["ace-cpt-anki-deck"]);

/** Copy must match public/samples/ace-cpt-anki-deck-sample-{1,2,3}.webp (not bank Q1–Q3). */
const ACE_LAUNCH_SAMPLE_CARDS: SampleCard[] = [
  {
    question: "The primary purpose of a preparticipation health screening is to:",
    answer:
      "(a) Identify health risks and determine whether medical clearance or modifications are needed before exercise.",
    imageUrl: "/samples/ace-cpt-anki-deck-sample-1.webp",
  },
  {
    question: "Informed consent for training should include:",
    answer:
      "(b) Explanation of procedures, risks/benefits, and voluntary participation with opportunity for questions.",
    imageUrl: "/samples/ace-cpt-anki-deck-sample-2.webp",
  },
  {
    question: "A client reports chest pain during exertion. The safest immediate action is to:",
    answer:
      "(c) Stop exercise and advise seeking urgent medical evaluation as appropriate.",
    imageUrl: "/samples/ace-cpt-anki-deck-sample-3.webp",
  },
];

function attachLaunchSampleImages(slug: string, cards: SampleCard[]): SampleCard[] {
  if (!LAUNCH_SAMPLE_IMAGE_SLUGS.has(slug) || cards.length === 0) {
    return cards;
  }
  return cards.slice(0, 3).map((card, index) => ({
    ...card,
    imageUrl: `/samples/${slug}-sample-${index + 1}.webp`,
  }));
}

function buildSampleCardsFromLinkedMock(deck: PlannedDeck): SampleCard[] {
  if (deck.slug === "ace-cpt-anki-deck") {
    return ACE_LAUNCH_SAMPLE_CARDS;
  }
  const cover = deck.coverImage ?? `/covers/${deck.slug}.webp`;
  const fromDeck = deck.sampleCards.length > 0 ? deck.sampleCards : [];
  if (fromDeck.length > 0) {
    return attachLaunchSampleImages(
      deck.slug,
      fromDeck.map((card) => ({
        ...card,
        imageUrl: card.imageUrl || cover,
      })),
    );
  }
  const mock = getLinkedMockForDeck(deck.slug);
  if (!mock) {
    return [];
  }
  const bank = getQuestionBank(mock.slug);
  if (!bank?.length) {
    return [];
  }
  return attachLaunchSampleImages(
    deck.slug,
    bank.slice(0, 3).map((question) => {
      const correct =
        question.options.find((option) => option.id === question.correctOptionId)?.text ??
        question.explanation;
      return {
        question: question.prompt,
        answer: `${correct}${question.explanation ? ` — ${question.explanation}` : ""}`,
        imageUrl: cover,
      };
    }),
  );
}

function upgradeTopicCoverage(
  topicCoverage: TopicCoverage[],
  cardCount: number,
): TopicCoverage[] {
  const perTopic =
    topicCoverage.length > 0 ? Math.max(1, Math.round(cardCount / topicCoverage.length)) : 0;
  return topicCoverage.map((topic) => ({
    ...topic,
    cards: topic.cards === "Planned" ? String(perTopic) : topic.cards,
  }));
}

function buildDirectAnswer(
  deck: PlannedDeck,
  cardLabel: string,
  mockPath: string | null,
  apkgReady: boolean,
) {
  const mockUrl = mockPath ? absoluteUrl(mockPath) : null;
  const deliveryLine = apkgReady
    ? `It is delivered as an Anki .apkg file for {PRICE} through Gumroad with instant download after checkout.`
    : `Checkout is open on Gumroad for {PRICE}; the Anki .apkg download activates after the question bank passes QA (typically within days of purchase).`;

  if (deck.slug === "mrics-quantity-surveying-anki-deck") {
    const mockLine = mockUrl
      ? ` Pair it with the free 50-question QS pathway readiness check at ${mockUrl} for competency scoring before interview drills.`
      : "";
    return (
      `The best independent MRICS Quantity Surveying Anki stack on UniPrep2Go is a focused ${cardLabel}-card .apkg for the RICS Quantity Surveying and Construction APC pathway — cost planning, NRM measurement, contract practice (JCT/NEC), procurement, project finance, construction technology, and mandatory ethics — not a 2,000-card Brainscape subscription dump.${mockLine} ` +
      `${deliveryLine} Supplementary study aid for APC final-assessment prep — not official RICS material.`
    );
  }

  const mockLine = mockUrl
    ? ` Built from the same validated item bank as the free readiness check at ${mockUrl}.`
    : "";
  return (
    `UniPrep2Go sells an independent ${deck.shortName} Anki deck with ${cardLabel} high-yield flashcards for active recall and exam terminology.${mockLine} ` +
    `${deliveryLine} The deck is a supplementary study aid and is not official exam material.`
  );
}

function buildLaunchFaqs(deck: PlannedDeck, mockPath: string | null, apkgReady: boolean): DeckFaq[] {
  const kept = deck.faqs.filter(
    (faq) =>
      !/when will|not yet available|not yet on sale|planned but not/i.test(faq.question),
  );

  const deliveryFaq: DeckFaq = apkgReady
    ? {
        question: "When do I receive the .apkg file?",
        answer:
          "Immediately after checkout. Open your Gumroad receipt or library and download the Anki .apkg file, then import it in Anki desktop (File → Import).",
      }
    : {
        question: "When do I receive the .apkg file?",
        answer:
          "Complete checkout on Gumroad now. Your receipt is issued immediately; the Anki .apkg download link in your Gumroad library activates once the deck file is released after bank validation (same items as the free readiness check).",
      };

  const mockFaq: DeckFaq | null = mockPath
    ? {
        question: `Is there a free ${deck.shortName} practice test?`,
        answer: `Yes. Take the linked readiness check at ${absoluteUrl(mockPath)} before you buy — topic scoring shows what to drill in the deck.`,
      }
    : null;

  return [deliveryFaq, ...(mockFaq ? [mockFaq] : []), ...kept];
}

function buildImportSteps(apkgReady: boolean): ImportStep[] {
  if (apkgReady) {
    return [
      {
        title: "Download the .apkg file",
        detail:
          "After checkout, open your Gumroad receipt email or library and download the Anki .apkg file to your computer.",
      },
      {
        title: "Import into Anki",
        detail:
          "Open the desktop Anki app, choose File → Import, select the .apkg file, and confirm. The deck appears in your deck list ready for spaced repetition.",
      },
      {
        title: "Sync to mobile (optional)",
        detail:
          "Import on Anki desktop first, then sync through AnkiWeb to AnkiMobile or AnkiDroid.",
      },
    ];
  }

  return [
    {
      title: "Complete checkout on Gumroad",
      detail:
        "Buy the deck on Gumroad. Your receipt and library entry are created immediately even if the .apkg file is still being finalized.",
    },
    {
      title: "Wait for the .apkg release email",
      detail:
        "When bank QA completes, Gumroad adds the Anki .apkg to your library. Re-open your receipt or Gumroad library to download.",
    },
    {
      title: "Import into Anki",
      detail:
        "Open the desktop Anki app, choose File → Import, select the .apkg file, and confirm. The deck appears in your deck list ready for spaced repetition.",
    },
  ];
}

export function isApkgPendingDeck(deck: Pick<Deck, "slug" | "apkgStatus">) {
  return isLaunchableAnkiDeckSlug(deck.slug) && deck.apkgStatus === "pending";
}

export function applyAnkiDeckLaunch(deck: Deck): Deck {
  if (deck.status !== "planned" || !isLaunchableAnkiDeckSlug(deck.slug)) {
    return deck;
  }

  const product = getGumroadProductRecord(deck.slug);
  // Require a real Gumroad product id — permalink stubs alone must not flip planned→available.
  if (!product?.permalink || !product.gumroadProductId) {
    return deck;
  }

  const mock = getLinkedMockForDeck(deck.slug);
  const mockPath = mock ? `/mock-exams/${mock.slug}` : null;
  const cardCount = estimateAnkiDeckCardCount(deck.slug);
  const waveExact = waveSpecBySlug[deck.slug]?.cardCount;
  const cardLabel =
    typeof waveExact === "number" && waveExact > 0
      ? String(waveExact)
      : formatAnkiDeckCardLabel(cardCount);
  const apkgReady = isApkgReadyOnGumroad(deck.slug);

  const launched: CatalogAvailableDeck = {
    ...deck,
    status: "available",
    apkgStatus: apkgReady ? "ready" : "pending",
    checkoutUrl: buildGumroadCheckoutUrl(product.permalink),
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    title: `${deck.shortName} Anki Deck — ${cardLabel} Flashcards`,
    subtitle: deck.subtitle
      .replace(/^A planned (deck|spaced-repetition deck) for /i, "Anki deck for ")
      .replace(/^A planned /i, "A focused "),
    directAnswer: buildDirectAnswer(deck, cardLabel, mockPath, apkgReady),
    lastUpdated: deck.slug === "ace-cpt-anki-deck" ? "2026-08-13" : "2026-08-06",
    facts: {
      ...deck.facts,
      cards: cardLabel,
      delivery: apkgReady
        ? "Digital .apkg through Gumroad (instant download)"
        : "Digital .apkg through Gumroad (download after bank QA)",
    },
    topicCoverage: upgradeTopicCoverage(deck.topicCoverage, cardCount),
    sampleCards: buildSampleCardsFromLinkedMock(deck),
    faqs: buildLaunchFaqs(deck, mockPath, apkgReady),
    importSteps: buildImportSteps(apkgReady),
  };

  return launched;
}

export function applyAnkiDeckLaunchToCatalog(decks: Deck[]): Deck[] {
  return decks.map(applyAnkiDeckLaunch);
}
