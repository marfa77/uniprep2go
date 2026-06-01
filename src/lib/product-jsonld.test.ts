import { describe, expect, it } from "vitest";
import { getCatalogDeckBySlug } from "./decks";
import {
  buildCatalogItemListJsonLd,
  buildProductJsonLd,
  buildProductOffer,
} from "./product-jsonld";
import { applyPendingPriceToDeck, applyPriceRecordToDeck } from "./checkout-pricing";

describe("product json-ld", () => {
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

  const pendingDeck = applyPendingPriceToDeck(catalogDeck);

  it("includes price and currency together on valid offers", () => {
    const offer = buildProductOffer(pricedDeck);

    expect(offer).toMatchObject({
      "@type": "Offer",
      price: 13.5,
      priceCurrency: "USD",
      url: pricedDeck.checkoutUrl,
    });
  });

  it("omits offers when price is pending", () => {
    expect(buildProductOffer(pendingDeck)).toBeNull();

    const product = buildProductJsonLd(pendingDeck);
    expect(product.offers).toBeUndefined();
    expect(product["@id"]).toBe("https://uniprep2go.study/decks/cfa-level-1-anki-deck#product");
  });

  it("does not nest Product objects in the homepage catalog list", () => {
    const itemList = buildCatalogItemListJsonLd([pricedDeck]);

    expect(itemList.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      url: "https://uniprep2go.study/decks/cfa-level-1-anki-deck",
    });
    expect(JSON.stringify(itemList)).not.toContain('"@type":"Product"');
  });
});
