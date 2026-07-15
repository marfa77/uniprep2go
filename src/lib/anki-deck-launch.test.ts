import { describe, expect, it } from "vitest";
import {
  applyAnkiDeckLaunch,
  buildGumroadCheckoutUrl,
  estimateAnkiDeckCardCount,
  isBuildingAnkiDeckSlug,
} from "./anki-deck-launch";
import { getCatalogDeckBySlug, getDeckBySlug } from "./decks";

describe("anki-deck-launch", () => {
  it("recognizes building deck slugs from gumroad catalog", () => {
    expect(isBuildingAnkiDeckSlug("hvac-epa-608-anki-deck")).toBe(true);
    expect(isBuildingAnkiDeckSlug("cfa-level-1-anki-deck")).toBe(false);
  });

  it("builds gumroad checkout urls from permalink", () => {
    expect(buildGumroadCheckoutUrl("hvac-epa-608-anki-deck")).toBe(
      "https://pixidstudio.gumroad.com/l/hvac-epa-608-anki-deck?wanted=true",
    );
  });

  it("estimates card count from linked mock topics", () => {
    expect(estimateAnkiDeckCardCount("hvac-epa-608-anki-deck")).toBe(200);
    expect(estimateAnkiDeckCardCount("leed-green-associate-anki-deck")).toBe(250);
  });

  it("launches planned building decks as available with pending apkg", () => {
    const launched = applyAnkiDeckLaunch({
      slug: "hvac-epa-608-anki-deck",
      category: "professional",
      status: "planned",
      title: "HVAC EPA 608 Anki Deck",
      shortName: "EPA 608 HVAC",
      subtitle: "A planned spaced-repetition deck for EPA Section 608 Core and Types I–III.",
      directAnswer: "Planned product.",
      lastUpdated: "2026-06-02",
      audience: "HVAC technicians.",
      format: ".apkg",
      coverImage: "/covers/hvac-epa-608-anki-deck.webp",
      facts: {
        cards: "Planned",
        topics: "EPA 608 Core and Types",
        formulas: "Planned",
        examYear: "Current",
        delivery: "Planned",
      },
      topicCoverage: [{ name: "Core", examWeight: "25 questions", cards: "Planned" }],
      sampleCards: [],
      faqs: [],
    });

    expect(launched.status).toBe("available");
    if (launched.status === "available") {
      expect(launched.apkgStatus).toBe("pending");
      expect(launched.checkoutUrl).toContain("hvac-epa-608-anki-deck");
      expect(launched.checkoutProvider).toBe("Gumroad");
      expect(launched.facts.cards).toBe("200+");
      expect(launched.importSteps?.length).toBeGreaterThan(0);
    }
  });

  it("exposes launched EPA deck in catalog with checkout", () => {
    const epa = getCatalogDeckBySlug("hvac-epa-608-anki-deck");
    expect(epa).toBeDefined();
    expect(epa?.status).toBe("available");
    expect(epa?.apkgStatus).toBe("pending");
    expect(epa?.checkoutUrl).toContain("gumroad.com/l/hvac-epa-608-anki-deck");
    expect(epa?.coverImage).toBe("/covers/hvac-epa-608-anki-deck.webp");
  });

  it("launches all building deck slugs into catalog", () => {
    const slugs = [
      "hvac-epa-608-anki-deck",
      "bms-building-automation-anki-deck",
      "leed-green-associate-anki-deck",
      "mrics-anki-deck",
      "gmat-focus-anki-deck",
    ];

    for (const slug of slugs) {
      const deck = getCatalogDeckBySlug(slug);
      expect(deck, slug).toBeDefined();
      expect(deck?.checkoutUrl, slug).toMatch(/gumroad\.com\/l\//);
    }
  });
});
