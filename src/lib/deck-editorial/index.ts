import type { DeckEditorialBundle } from "./types";
import { satDeckEditorial } from "./sat-anki-deck";
import { series7DeckEditorial } from "./series-7-anki-deck";
import { pmpDeckEditorial } from "./pmp-anki-deck";
import { cfaL1DeckEditorial } from "./cfa-level-1-anki-deck";
import { mricsDeckEditorial } from "./mrics-anki-deck";
import { nbrcTmcDeckEditorial } from "./nbrc-tmc-anki-deck";

export type { DeckEditorialBundle } from "./types";

const bundles: Record<string, DeckEditorialBundle> = {
  "sat-anki-deck": satDeckEditorial,
  "series-7-anki-deck": series7DeckEditorial,
  "pmp-anki-deck": pmpDeckEditorial,
  "cfa-level-1-anki-deck": cfaL1DeckEditorial,
  "mrics-anki-deck": mricsDeckEditorial,
  "nbrc-tmc-anki-deck": nbrcTmcDeckEditorial,
};

export function getDeckEditorialBundle(slug: string): DeckEditorialBundle | null {
  return bundles[slug] ?? null;
}

export function deckEditorialSlugs(): string[] {
  return Object.keys(bundles);
}