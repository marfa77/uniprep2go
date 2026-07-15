import type { AvailableDeck, CatalogAvailableDeck, SampleCard } from "./decks";

export function getDeckThumbnailUrl(sampleCards: SampleCard[]) {
  return sampleCards.find((card) => card.imageUrl)?.imageUrl ?? null;
}

type DeckWithMedia = Pick<AvailableDeck | CatalogAvailableDeck, "coverImage" | "sampleCards"> & {
  slug?: string;
};

export function getDeckCoverUrl(deck: DeckWithMedia) {
  if (deck.coverImage) return deck.coverImage;
  const sample = getDeckThumbnailUrl(deck.sampleCards);
  if (sample) return sample;
  if (deck.slug) return `/covers/${deck.slug}.webp`;
  return null;
}

/** Pre-optimized WebP in /public — bypass next/image cache so cover regens show immediately. */
export function isPreoptimizedPublicImage(src: string) {
  return src.startsWith("/covers/") || src.startsWith("/home/");
}
