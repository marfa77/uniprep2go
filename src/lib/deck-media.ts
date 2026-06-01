import type { AvailableDeck, CatalogAvailableDeck, SampleCard } from "./decks";

export function getDeckThumbnailUrl(sampleCards: SampleCard[]) {
  return sampleCards.find((card) => card.imageUrl)?.imageUrl ?? null;
}

type DeckWithMedia = Pick<AvailableDeck | CatalogAvailableDeck, "coverImage" | "sampleCards">;

export function getDeckCoverUrl(deck: DeckWithMedia) {
  return deck.coverImage ?? getDeckThumbnailUrl(deck.sampleCards);
}
