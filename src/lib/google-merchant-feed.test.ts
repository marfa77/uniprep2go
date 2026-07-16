import { describe, expect, it } from "vitest";
import { applyPendingPriceToDeck, applyPriceRecordToDeck } from "./checkout-pricing";
import { getCatalogDeckBySlug } from "./decks";
import {
  buildGoogleMerchantFeed,
  buildMerchantFeedRow,
  isMerchantFeedEligible,
} from "./google-merchant-feed";

describe("google merchant feed", () => {
  const catalogDeck = getCatalogDeckBySlug("cfa-level-1-anki-deck");
  if (!catalogDeck) {
    throw new Error("Missing CFA catalog deck fixture");
  }

  const pricedDeck = applyPriceRecordToDeck(catalogDeck, {
    amount: 13.5,
    currency: "USD",
    syncedAt: "2026-06-01T00:00:00.000Z",
    source: "gumroad",
  });

  it("includes required columns for an eligible deck", () => {
    expect(isMerchantFeedEligible(pricedDeck)).toBe(true);

    const row = buildMerchantFeedRow(pricedDeck);
    expect(row.id).toBe("cfa-level-1-anki-deck");
    expect(row.link).toBe("https://uniprep2go.study/decks/cfa-level-1-anki-deck");
    expect(row.price).toBe("13.50 USD");
    expect(row.availability).toBe("in_stock");
    expect(row.identifier_exists).toBe("false");
    expect(row.image_link).toMatch(/^https:\/\//);
    expect(row.shipping).toBe("US:::0.00 USD");
  });

  it("excludes pending-price decks from the feed", () => {
    const pending = applyPendingPriceToDeck(catalogDeck);
    expect(isMerchantFeedEligible(pending)).toBe(false);

    const feed = buildGoogleMerchantFeed([pending, pricedDeck]);
    const lines = feed.trim().split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("id\ttitle\tdescription");
    expect(lines[1]).toContain("cfa-level-1-anki-deck");
  });
});
