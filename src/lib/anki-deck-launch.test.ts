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

  it("launches planned building decks as available with ready apkg when uploaded", () => {
    const launched = applyAnkiDeckLaunch({
      slug: "leed-green-associate-anki-deck",
      category: "professional",
      status: "planned",
      title: "LEED Green Associate Anki Deck",
      shortName: "LEED GA",
      subtitle: "A planned spaced-repetition deck for LEED GA.",
      directAnswer: "Planned product.",
      lastUpdated: "2026-06-02",
      audience: "LEED candidates.",
      format: ".apkg",
      coverImage: "/covers/leed-green-associate-anki-deck.webp",
      facts: {
        cards: "Planned",
        topics: "LEED topics",
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
      expect(launched.apkgStatus).toBe("ready");
      expect(launched.checkoutUrl).toContain("leed-green-associate-anki-deck");
      expect(launched.checkoutProvider).toBe("Gumroad");
      expect(launched.facts.cards).toBe("250+");
      expect(launched.facts.delivery).toContain("instant download");
      expect(launched.importSteps?.length).toBeGreaterThan(0);
    }
  });

  it("exposes launched EPA deck in catalog with checkout and ready apkg", () => {
    const epa = getCatalogDeckBySlug("hvac-epa-608-anki-deck");
    expect(epa).toBeDefined();
    expect(epa?.status).toBe("available");
    expect(epa?.apkgStatus).toBe("ready");
    expect(epa?.checkoutUrl).toContain("gumroad.com/l/hvac-epa-608-anki-deck");
    expect(epa?.coverImage).toBe("/covers/hvac-epa-608-anki-deck.webp");
    expect(epa?.sampleCards).toHaveLength(3);
    expect(epa?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/hvac-epa-608-anki-deck-sample-1.webp",
      "/samples/hvac-epa-608-anki-deck-sample-2.webp",
      "/samples/hvac-epa-608-anki-deck-sample-3.webp",
    ]);
  });

  it("exposes launched BMS deck in catalog with checkout and ready apkg", () => {
    const bms = getCatalogDeckBySlug("bms-building-automation-anki-deck");
    expect(bms).toBeDefined();
    expect(bms?.status).toBe("available");
    expect(bms?.apkgStatus).toBe("ready");
    expect(bms?.checkoutUrl).toContain("gumroad.com/l/bms-building-automation-anki-deck");
    expect(bms?.sampleCards).toHaveLength(3);
    expect(bms?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/bms-building-automation-anki-deck-sample-1.webp",
      "/samples/bms-building-automation-anki-deck-sample-2.webp",
      "/samples/bms-building-automation-anki-deck-sample-3.webp",
    ]);
  });

  it("exposes launched ASHRAE deck with sample card screenshots", () => {
    const ashrae = getCatalogDeckBySlug("ashrae-certifications-anki-deck");
    expect(ashrae).toBeDefined();
    expect(ashrae?.status).toBe("available");
    expect(ashrae?.apkgStatus).toBe("ready");
    expect(ashrae?.checkoutUrl).toContain("gumroad.com/l/ashrae-certifications-anki-deck");
    expect(ashrae?.sampleCards).toHaveLength(3);
    expect(ashrae?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/ashrae-certifications-anki-deck-sample-1.webp",
      "/samples/ashrae-certifications-anki-deck-sample-2.webp",
      "/samples/ashrae-certifications-anki-deck-sample-3.webp",
    ]);
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
