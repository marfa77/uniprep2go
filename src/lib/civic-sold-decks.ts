import civicCatalog from "@/data/gumroad/civic-anki-decks.json";
import type { CatalogAvailableDeck } from "./decks";

type CivicProduct = {
  permalink: string;
  name: string;
  cards: number;
  cover: string;
  mockSlug: string;
  exam: string;
  samples: { q: string; a: string }[];
};

/** Flanders and Luxembourg stay on the wave launch path (existing Gumroad permalinks). */
const WAVE_LAUNCHED = new Set([
  "belgium-flanders-mo-anki-deck",
  "luxembourg-vivre-ensemble-anki-deck",
]);

const products = civicCatalog.products as Record<string, CivicProduct>;

function civicSoldDeck(slug: string, product: CivicProduct): CatalogAvailableDeck {
  const shortName = product.name.replace(/ Anki Deck — \d+ Cards$/, "");
  const coverImage = `/covers/${product.cover}`;
  const polishNote =
    slug === "polish-citizenship-anki-deck"
      ? " Poland does not run an official wiedza o Polsce MCQ today — naturalisation usually needs Polish B1. Confirm MSWiA rules."
      : "";

  return {
    slug,
    category: "language",
    status: "available",
    title: product.name,
    shortName,
    subtitle: `${product.cards} ${product.exam} civics cards — $9 Anki .apkg.`,
    directAnswer: `UniPrep2Go sells a ${product.cards}-card ${product.exam} Anki deck for $9 through Gumroad by PixID Studio. This ${product.exam} file is question-to-answer civics recall for that country only — not a language certificate and not a multi-country bundle. Start with the free readiness check at /mock-exams/${product.mockSlug}, then import the .apkg. Independent study aid — not official ${product.exam} material.${polishNote}`,
    lastUpdated: "2026-09-21",
    audience: `Applicants preparing ${product.exam} who want a $9 Anki deck of ${product.cards} civics cards.`,
    format: ".apkg",
    coverImage,
    checkoutUrl: `https://pixidstudio.gumroad.com/l/${product.permalink}?wanted=true`,
    checkoutProvider: "Gumroad",
    checkoutSeller: "PixID Studio",
    facts: {
      cards: String(product.cards),
      topics: product.exam,
      formulas: "Text question → short answer",
      examYear: "Current citizenship / naturalisation cycle",
      delivery: "Digital .apkg through Gumroad (instant download)",
    },
    topicCoverage: [
      { name: `${product.exam} — state, constitution & rights`, examWeight: "25%", cards: String(product.cards) },
      { name: `${product.exam} — history & institutions`, examWeight: "25%", cards: String(product.cards) },
      { name: `${product.exam} — society & daily life`, examWeight: "25%", cards: String(product.cards) },
      { name: `${product.exam} — exam-style recall`, examWeight: "25%", cards: String(product.cards) },
    ],
    sampleCards: product.samples.slice(0, 3).map((card) => ({
      question: card.q,
      answer: card.a,
      imageUrl: coverImage,
    })),
    faqs: [
      {
        question: "How many cards are in this deck?",
        answer: `${product.cards} ${product.exam} question-to-answer civics cards in one Anki .apkg for $9.`,
      },
      {
        question: "Is there a free practice test?",
        answer: `Yes. Take the free ${product.exam} readiness check at /mock-exams/${product.mockSlug}, then drill misses in this deck.`,
      },
      {
        question: "Is this official government material?",
        answer: `No. Independent UniPrep2Go study aid for ${product.exam}. Confirm current ${product.exam} rules with the official authority.`,
      },
    ],
  };
}

export const civicSoldDecks: CatalogAvailableDeck[] = Object.entries(products)
  .filter(([slug]) => !WAVE_LAUNCHED.has(slug))
  .map(([slug, product]) => civicSoldDeck(slug, product));
