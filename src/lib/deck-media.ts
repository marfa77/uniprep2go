import type { SampleCard } from "./decks";

export function getDeckThumbnailUrl(sampleCards: SampleCard[]) {
  return sampleCards.find((card) => card.imageUrl)?.imageUrl ?? null;
}
