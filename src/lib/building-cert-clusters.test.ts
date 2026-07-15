import { describe, expect, it } from "vitest";
import registry from "@/data/certifications/registry.json";
import {
  BUILDING_MOCK_DECK_REPAIR_PAIRS,
  getBuildingCompanionDeckSlug,
  getRelatedBuildingDecks,
  isBuildingCertDeckSlug,
} from "./building-cert-clusters";
import { getCatalogDeckBySlug } from "./decks";

describe("building cert clusters", () => {
  it("maps every registry certification to a mock → deck repair pair", () => {
    expect(BUILDING_MOCK_DECK_REPAIR_PAIRS).toHaveLength(registry.certifications.length);

    for (const cert of registry.certifications) {
      expect(
        BUILDING_MOCK_DECK_REPAIR_PAIRS.some(
          (pair) => pair.mockSlug === cert.mockSlug && pair.deckSlug === cert.deckSlug,
        ),
      ).toBe(true);
    }
  });

  it("links LEED GA to LEED AP BD+C as companions", () => {
    expect(getBuildingCompanionDeckSlug("leed-green-associate-anki-deck")).toBe(
      "leed-ap-bd-c-anki-deck",
    );
    expect(getBuildingCompanionDeckSlug("leed-ap-bd-c-anki-deck")).toBe(
      "leed-green-associate-anki-deck",
    );
  });

  it("returns cluster siblings instead of unrelated professional decks", () => {
    const leedGa = getCatalogDeckBySlug("leed-green-associate-anki-deck");
    expect(leedGa).toBeDefined();

    const related = getRelatedBuildingDecks(leedGa!.slug);
    expect(related.some((deck) => deck.slug === "leed-ap-bd-c-anki-deck")).toBe(true);
    expect(related.some((deck) => deck.slug === "bench-energy-oil-trader-anki-deck")).toBe(false);
    expect(related.some((deck) => deck.slug === "servsafe-manager-anki-deck")).toBe(false);
  });

  it("flags all 13 building certification deck slugs", () => {
    for (const cert of registry.certifications) {
      expect(isBuildingCertDeckSlug(cert.deckSlug)).toBe(true);
    }

    expect(isBuildingCertDeckSlug("cfa-level-1-anki-deck")).toBe(false);
  });
});
