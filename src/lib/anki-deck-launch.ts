import gumroadCatalog from "@/data/gumroad/building-anki-decks.json";
import type {
  CatalogAvailableDeck,
  Deck,
  DeckFaq,
  ImportStep,
  PlannedDeck,
  TopicCoverage,
} from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { absoluteUrl } from "./site";

/** Sale-grade bank size target — matches mock bank generator. */
export const ANKI_BANK_CARDS_PER_TOPIC = 50;

export type ApkgStatus = "pending" | "ready";

export type BuildingAnkiDeckSlug = keyof typeof gumroadCatalog.products;

export const BUILDING_ANKI_DECK_SLUGS = Object.keys(
  gumroadCatalog.products,
) as BuildingAnkiDeckSlug[];

const GUMROAD_STORE = gumroadCatalog.storeBaseUrl.replace(/\/$/, "");

export function buildGumroadCheckoutUrl(permalink: string) {
  return `${GUMROAD_STORE}/l/${permalink}?wanted=true`;
}

type GumroadProductRecord = (typeof gumroadCatalog.products)[BuildingAnkiDeckSlug];

export function getGumroadProductRecord(slug: string): GumroadProductRecord | null {
  return gumroadCatalog.products[slug as BuildingAnkiDeckSlug] ?? null;
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
  const mock = getLinkedMockForDeck(deckSlug);
  if (!mock) {
    return 200;
  }
  return mock.topics.length * ANKI_BANK_CARDS_PER_TOPIC;
}

export function formatAnkiDeckCardLabel(count: number) {
  return `${count}+`;
}

function upgradeTopicCoverage(topicCoverage: TopicCoverage[]): TopicCoverage[] {
  return topicCoverage.map((topic) => ({
    ...topic,
    cards: topic.cards === "Planned" ? "50+" : topic.cards,
  }));
}

function buildDirectAnswer(
  deck: PlannedDeck,
  cardLabel: string,
  mockPath: string | null,
  apkgReady: boolean,
) {
  const mockLine = mockPath
    ? ` Built from the same validated item bank as the free readiness check at ${absoluteUrl(mockPath)}.`
    : "";
  const deliveryLine = apkgReady
    ? `It is delivered as an Anki .apkg file for {PRICE} through Gumroad with instant download after checkout.`
    : `Checkout is open on Gumroad for {PRICE}; the Anki .apkg download activates after the question bank passes QA (typically within days of purchase).`;
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

export function isBuildingAnkiDeckSlug(slug: string): slug is BuildingAnkiDeckSlug {
  return slug in gumroadCatalog.products;
}

export function isApkgPendingDeck(deck: Pick<Deck, "slug" | "apkgStatus">) {
  return isBuildingAnkiDeckSlug(deck.slug) && deck.apkgStatus === "pending";
}

export function applyAnkiDeckLaunch(deck: Deck): Deck {
  if (deck.status !== "planned" || !isBuildingAnkiDeckSlug(deck.slug)) {
    return deck;
  }

  const product = getGumroadProductRecord(deck.slug);
  if (!product?.permalink) {
    return deck;
  }

  const mock = getLinkedMockForDeck(deck.slug);
  const mockPath = mock ? `/mock-exams/${mock.slug}` : null;
  const cardCount = estimateAnkiDeckCardCount(deck.slug);
  const cardLabel = formatAnkiDeckCardLabel(cardCount);
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
    lastUpdated: "2026-07-15",
    facts: {
      ...deck.facts,
      cards: cardLabel,
      delivery: apkgReady
        ? "Digital .apkg through Gumroad (instant download)"
        : "Digital .apkg through Gumroad (download after bank QA)",
    },
    topicCoverage: upgradeTopicCoverage(deck.topicCoverage),
    faqs: buildLaunchFaqs(deck, mockPath, apkgReady),
    importSteps: buildImportSteps(apkgReady),
  };

  return launched;
}

export function applyAnkiDeckLaunchToCatalog(decks: Deck[]): Deck[] {
  return decks.map(applyAnkiDeckLaunch);
}
