import type { DeckEditorialBundle } from "./types";
import { satDeckEditorial } from "./sat-anki-deck";
import { series7DeckEditorial } from "./series-7-anki-deck";
import { pmpDeckEditorial } from "./pmp-anki-deck";
import { cfaL1DeckEditorial } from "./cfa-level-1-anki-deck";
import { mricsDeckEditorial } from "./mrics-anki-deck";
import { nbrcTmcDeckEditorial } from "./nbrc-tmc-anki-deck";
import { cfaL2DeckEditorial } from "./cfa-level-2-anki-deck";
import { gmatDeckEditorial } from "./gmat-focus-anki-deck";
import { cemDeckEditorial } from "./cem-anki-deck";
import { mricsQsDeckEditorial } from "./mrics-quantity-surveying-anki-deck";
import { ptcbDeckEditorial } from "./ptcb-pharmacy-technician-anki-deck";

export type { DeckEditorialBundle } from "./types";

const bundles: Record<string, DeckEditorialBundle> = {
  "sat-anki-deck": satDeckEditorial,
  "series-7-anki-deck": series7DeckEditorial,
  "pmp-anki-deck": pmpDeckEditorial,
  "cfa-level-1-anki-deck": cfaL1DeckEditorial,
  "mrics-anki-deck": mricsDeckEditorial,
  "nbrc-tmc-anki-deck": nbrcTmcDeckEditorial,
  "cfa-level-2-anki-deck": cfaL2DeckEditorial,
  "gmat-focus-anki-deck": gmatDeckEditorial,
  "cem-anki-deck": cemDeckEditorial,
  "mrics-quantity-surveying-anki-deck": mricsQsDeckEditorial,
  "ptcb-pharmacy-technician-anki-deck": ptcbDeckEditorial,
};

export function getDeckEditorialBundle(slug: string): DeckEditorialBundle | null {
  return bundles[slug] ?? null;
}

export function deckEditorialSlugs(): string[] {
  return Object.keys(bundles);
}