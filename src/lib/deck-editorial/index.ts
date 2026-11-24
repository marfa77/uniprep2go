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
import { greDeckEditorial } from "./gre-anki-deck";
import { servsafeDeckEditorial } from "./servsafe-manager-anki-deck";
import { epa608DeckEditorial } from "./hvac-epa-608-anki-deck";
import { leedGaDeckEditorial } from "./leed-green-associate-anki-deck";
import { sieDeckEditorial } from "./sie-exam-anki-deck";
import { cdcpDeckEditorial } from "./cdcp-anki-deck";
import { series63DeckEditorial } from "./series-63-anki-deck";
import { cfpDeckEditorial } from "./cfp-certification-anki-deck";
import { pcDeckEditorial } from "./property-casualty-insurance-exam-anki-deck";
import { eaDeckEditorial } from "./enrolled-agent-anki-deck";
import { series6DeckEditorial } from "./series-6-anki-deck";
import { series65DeckEditorial } from "./series-65-anki-deck";
import { series66DeckEditorial } from "./series-66-anki-deck";
import { lhDeckEditorial } from "./life-and-health-insurance-exam-anki-deck";
import { frmDeckEditorial } from "./frm-part-1-anki-deck";
import { aceCptDeckEditorial } from "./ace-cpt-anki-deck";
import { neboshDeckEditorial } from "./nebosh-anki-deck";
import { series99DeckEditorial } from "./series-99-anki-deck";
import { californiaRealEstateDeckEditorial } from "./california-real-estate-exam-anki-deck";
import { ardmsSpiDeckEditorial } from "./ardms-spi-anki-deck";
import { rdExamDeckEditorial } from "./rd-exam-anki-deck";
import { leedApBdcDeckEditorial } from "./leed-ap-bd-c-anki-deck";
import { mloDeckEditorial } from "./mortgage-loan-originator-anki-deck";
import { wellApDeckEditorial } from "./well-ap-anki-deck";
import { leedApOmDeckEditorial } from "./leed-ap-om-anki-deck";
import { series79DeckEditorial } from "./series-79-anki-deck";

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
  "gre-anki-deck": greDeckEditorial,
  "servsafe-manager-anki-deck": servsafeDeckEditorial,
  "hvac-epa-608-anki-deck": epa608DeckEditorial,
  "leed-green-associate-anki-deck": leedGaDeckEditorial,
  "sie-exam-anki-deck": sieDeckEditorial,
  "cdcp-anki-deck": cdcpDeckEditorial,
  "series-63-anki-deck": series63DeckEditorial,
  "cfp-certification-anki-deck": cfpDeckEditorial,
  "property-casualty-insurance-exam-anki-deck": pcDeckEditorial,
  "enrolled-agent-anki-deck": eaDeckEditorial,
  "series-6-anki-deck": series6DeckEditorial,
  "series-65-anki-deck": series65DeckEditorial,
  "series-66-anki-deck": series66DeckEditorial,
  "life-and-health-insurance-exam-anki-deck": lhDeckEditorial,
  "frm-part-1-anki-deck": frmDeckEditorial,
  "ace-cpt-anki-deck": aceCptDeckEditorial,
  "nebosh-anki-deck": neboshDeckEditorial,
  "series-99-anki-deck": series99DeckEditorial,
  "california-real-estate-exam-anki-deck": californiaRealEstateDeckEditorial,
  "ardms-spi-anki-deck": ardmsSpiDeckEditorial,
  "rd-exam-anki-deck": rdExamDeckEditorial,
  "leed-ap-bd-c-anki-deck": leedApBdcDeckEditorial,
  "mortgage-loan-originator-anki-deck": mloDeckEditorial,
  "well-ap-anki-deck": wellApDeckEditorial,
  "leed-ap-om-anki-deck": leedApOmDeckEditorial,
  "series-79-anki-deck": series79DeckEditorial,
};

export function getDeckEditorialBundle(slug: string): DeckEditorialBundle | null {
  return bundles[slug] ?? null;
}

export function deckEditorialSlugs(): string[] {
  return Object.keys(bundles);
}