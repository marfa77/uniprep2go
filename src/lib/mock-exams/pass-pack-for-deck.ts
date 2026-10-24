/**
 * Linked Anki deck → Pass Pack (Anki + PDF companion) when we sell a bundle.
 * Result screen prefers the pack as the study CTA when present.
 */
export type PassPackOfferMeta = {
  packSlug: string;
  /** Short line for result-screen copy, e.g. "save vs $38 separate". */
  savingsNote: string;
};

export const DECK_TO_PASS_PACK: Readonly<Record<string, PassPackOfferMeta>> = {
  "cfa-level-1-anki-deck": {
    packSlug: "cfa-level-1-pass-pack",
    savingsNote: "save vs $38 separate",
  },
  "ptcb-pharmacy-technician-anki-deck": {
    packSlug: "ptcb-2026-pass-pack",
    savingsNote: "save vs $33 separate",
  },
};

export function passPackOfferForDeck(deckSlug: string): PassPackOfferMeta | undefined {
  return DECK_TO_PASS_PACK[deckSlug];
}

export function passPackSlugForDeck(deckSlug: string): string | undefined {
  return DECK_TO_PASS_PACK[deckSlug]?.packSlug;
}
