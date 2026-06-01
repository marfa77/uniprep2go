import { describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { applyPriceRecordToDeck } from "./checkout-pricing";
import { getCatalogDeckBySlug } from "./decks";
import { toCheckoutClickMessage } from "./telegram-notify";

describe("telegram checkout alerts", () => {
  it("formats Gumroad and Lemon checkout click messages with deck facts", () => {
    const gumroadCatalog = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    const lemonCatalog = getCatalogDeckBySlug("ciple-a2-european-portuguese-anki-deck");

    expect(gumroadCatalog).toBeDefined();
    expect(lemonCatalog).toBeDefined();

    const gumroadDeck = applyPriceRecordToDeck(gumroadCatalog!, {
      amount: 11,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "gumroad",
    });
    const lemonDeck = applyPriceRecordToDeck(lemonCatalog!, {
      amount: 24.99,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "lemon",
    });

    const gumroadMessage = toCheckoutClickMessage(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: gumroadDeck.slug,
        source: "deck_page",
        path: `/decks/${gumroadDeck.slug}`,
      }),
      gumroadDeck,
    );

    expect(gumroadMessage).toContain("UniPrep2Go checkout click");
    expect(gumroadMessage).toContain("Provider: Gumroad");
    expect(gumroadMessage).toContain("https://pixidstudio.gumroad.com/l/ivjmuu");

    const lemonMessage = toCheckoutClickMessage(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: lemonDeck.slug,
        source: "catalog_buy",
        path: "/",
      }),
      lemonDeck,
    );

    expect(lemonMessage).toContain("Provider: Lemon Squeezy");
    expect(lemonMessage).toContain("https://ciple-a2.lemonsqueezy.com/checkout/buy/");
  });
});
