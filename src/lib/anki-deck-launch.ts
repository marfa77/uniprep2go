import deckSampleShots from "@/data/deck-sample-shots.json";
import buildingSpecs from "@/data/building-deck-specs.json";
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
import { pickStrongMcqSamples } from "./select-strong-samples";
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
      /** Sold on Gumroad only (Tier C freeze) — never becomes a site deck page. */
      siteHidden?: boolean;
    }
  >;
};

const building = buildingCatalog as GumroadCatalog;
const wave = waveCatalog as GumroadCatalog;

type WaveSpec = { cohort?: string; cardCount?: number };

const waveSpecBySlug = waveSpecs as Record<string, WaveSpec>;

/**
 * Wave Gumroad products may exist before the site should sell them.
 * Auto-launch when:
 * - money cohort, or
 * - explicit force-launch allowlist, or
 * - product has gumroadProductId + apkgUploadedAt (sellable — do not leave orphans), unless siteHidden
 */
export const WAVE_LAUNCH_COHORTS = new Set(["money"]);

/** Non-money wave decks approved to flip planned → available when Gumroad product exists (even before apkg). */
export const WAVE_FORCE_LAUNCH_SLUGS = new Set([
  "ace-cpt-anki-deck",
  "belgium-flanders-mo-anki-deck",
  "luxembourg-vivre-ensemble-anki-deck",
  "rd-exam-anki-deck",
  "medical-scribe-anki-deck",
  "ardms-spi-anki-deck",
  "abo-optician-anki-deck",
]);

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

/** Wave product already sellable on Gumroad (id + apkg) — site catalog must not stay planned. */
export function isWaveApkgReadyLaunchSlug(slug: string): boolean {
  const product = wave.products[slug];
  return Boolean(product?.gumroadProductId && product?.apkgUploadedAt && !product.siteHidden);
}

/** Building catalog + money / force-launch / apkg-ready wave SKUs. */
export function isLaunchableAnkiDeckSlug(slug: string): boolean {
  if (slug in building.products) return true;
  if (!(slug in wave.products)) return false;
  return (
    isWaveMoneyLaunchSlug(slug) ||
    isWaveForceLaunchSlug(slug) ||
    isWaveApkgReadyLaunchSlug(slug)
  );
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
const LAUNCH_SAMPLE_IMAGE_SLUGS = new Set([
  "ace-cpt-anki-deck",
  "acsm-cpt-anki-deck",
  "luxembourg-vivre-ensemble-anki-deck",
  "belgium-flanders-mo-anki-deck",
  "mortgage-loan-originator-anki-deck",
  "abo-optician-anki-deck",
  "series-6-anki-deck",
  "series-65-anki-deck",
  "cfp-certification-anki-deck",
  "enrolled-agent-anki-deck",
  "series-66-anki-deck",
  "series-79-anki-deck",
  "series-99-anki-deck",
]);

/** Copy must match public/samples/luxembourg-vivre-ensemble-anki-deck-sample-fr-{1,2,3}.webp
 *  and ...-sample-{1,2,3}.webp (EN). */
const LUXEMBOURG_LAUNCH_SAMPLE_CARDS: SampleCard[] = [
  {
    question: "Le Conseil d’État vote-t-il les lois ? (Module 2 · piège fréquent)",
    answer:
      "Non : il donne un avis ; seule la Chambre vote les lois. À retenir : il peut toutefois refuser la dispense du second vote constitutionnel.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-fr-1.webp",
  },
  {
    question: "Le vote est-il obligatoire au Luxembourg ? (Module 1)",
    answer:
      "Oui, pour tous les électeurs inscrits ; dispense à partir de 75 ans. À retenir : article 63, « le vote est obligatoire et secret » ; l’abstention non justifiée est punie d’une amende, y compris pour les étrangers inscrits.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-fr-2.webp",
  },
  {
    question: "Le traité de Londres de 1867 a-t-il donné son indépendance au Luxembourg ? (Module 3 · piège fréquent)",
    answer:
      "Non : l’indépendance est reconnue en 1839 ; 1867 impose la neutralité et le démantèlement de la forteresse.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-fr-3.webp",
  },
  {
    question: "Does the Council of State pass laws? (Module 2 · common trap)",
    answer:
      "No: it gives an opinion; only the Chamber passes laws. Key point: it can refuse to waive the second constitutional vote.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-1.webp",
  },
  {
    question: "Is voting compulsory in Luxembourg? (Module 1)",
    answer:
      "Yes, for all registered voters; exempt from age 75. Key point: Article 63, “voting is compulsory and secret”; unjustified abstention is punished by a fine, including for registered foreigners.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-2.webp",
  },
  {
    question: "Did the 1867 Treaty of London give Luxembourg its independence? (Module 3 · common trap)",
    answer:
      "No: independence was recognised in 1839; 1867 imposed neutrality and the dismantling of the fortress.",
    imageUrl: "/samples/luxembourg-vivre-ensemble-anki-deck-sample-3.webp",
  },
];

/** Copy must match public/samples/belgium-flanders-mo-anki-deck-sample-{1,2,3}.webp. */
const BELGIUM_FLANDERS_LAUNCH_SAMPLE_CARDS: SampleCard[] = [
  {
    question: "Hoeveel gewesten heeft België?",
    answer: "Drie: Vlaanderen, Wallonië en het Brussels Hoofdstedelijk Gewest",
    imageUrl: "/samples/belgium-flanders-mo-anki-deck-sample-1.webp",
  },
  {
    question: "Wat is de officiële taal in Vlaanderen?",
    answer: "Nederlands",
    imageUrl: "/samples/belgium-flanders-mo-anki-deck-sample-2.webp",
  },
  {
    question: "Wie is het hoofd van de Vlaamse regering?",
    answer: "De minister-president van Vlaanderen",
    imageUrl: "/samples/belgium-flanders-mo-anki-deck-sample-3.webp",
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

/** Written by `render:sample-shots --write`: text of the shipped cards in public/samples/{slug}-sample-{1,2,3}.webp. */
function renderedSampleCards(slug: string): SampleCard[] | null {
  const shots = (deckSampleShots as Record<string, { question: string; answer: string }[]>)[slug];
  if (!shots || shots.length !== 3) return null;
  return shots.map((card, index) => ({
    question: card.question,
    answer: card.answer,
    imageUrl: `/samples/${slug}-sample-${index + 1}.webp`,
  }));
}

function buildSampleCardsFromLinkedMock(deck: PlannedDeck): SampleCard[] {
  const rendered = renderedSampleCards(deck.slug);
  if (rendered) {
    return rendered;
  }
  if (deck.slug === "luxembourg-vivre-ensemble-anki-deck") {
    return LUXEMBOURG_LAUNCH_SAMPLE_CARDS;
  }
  if (deck.slug === "belgium-flanders-mo-anki-deck") {
    return BELGIUM_FLANDERS_LAUNCH_SAMPLE_CARDS;
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
  const strong = pickStrongMcqSamples(bank, deck.slug, 3);
  const chosen =
    strong.length === 3
      ? strong.map((card) => ({
          question: card.q,
          answer: card.a,
          imageUrl: cover,
        }))
      : bank.slice(0, 3).map((question) => {
          const correct =
            question.options.find((option) => option.id === question.correctOptionId)?.text ??
            question.explanation;
          return {
            question: question.prompt,
            answer: `${correct}${question.explanation ? ` — ${question.explanation}` : ""}`,
            imageUrl: cover,
          };
        });
  return attachLaunchSampleImages(deck.slug, chosen);
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
      !/when will|not yet available|not yet on sale|planned but not|is this deck available for purchase/i.test(
        faq.question,
      ),
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

  const rest = mockFaq ? kept.filter((faq) => faq.question !== mockFaq.question) : kept;

  return [deliveryFaq, ...(mockFaq ? [mockFaq] : []), ...rest];
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
  const exactCount =
    waveSpecBySlug[deck.slug]?.cardCount ??
    (buildingSpecs as Record<string, { cardCount?: number }>)[deck.slug]?.cardCount;
  const cardLabel =
    typeof exactCount === "number" && exactCount > 0
      ? String(exactCount)
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
    directAnswer: /is a live UniPrep2Go/i.test(deck.directAnswer)
      ? deck.directAnswer
      : buildDirectAnswer(deck, cardLabel, mockPath, apkgReady),
    lastUpdated:
      deck.slug === "pmp-anki-deck" || deck.slug === "nebosh-anki-deck"
        ? "2026-09-29"
        : deck.slug === "luxembourg-vivre-ensemble-anki-deck"
          ? "2026-09-27"
          : deck.slug === "belgium-flanders-mo-anki-deck"
            ? "2026-09-21"
            : deck.slug === "ace-cpt-anki-deck"
              ? "2026-08-13"
              : deck.slug === "gre-anki-deck" ||
                  deck.slug === "gmat-focus-anki-deck" ||
                  deck.slug === "sat-anki-deck"
                ? "2026-10-04"
                : deck.slug === "cem-anki-deck"
                  ? "2026-10-06"
                : "2026-08-06",
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
