import { describe, expect, it } from "vitest";
import { getCatalogDeckBySlug } from "./decks";
import {
  buildCatalogItemListJsonLd,
  buildDeckPageJsonLd,
  buildProductJsonLd,
  buildProductOffer,
  buildSiteOrganizationJsonLd,
  getProductImages,
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

  it("includes merchant-ready offer fields when price is known", () => {
    const offer = buildProductOffer(pricedDeck);

    expect(offer).toMatchObject({
      "@type": "Offer",
      price: 13.5,
      priceCurrency: "USD",
      url: pricedDeck.checkoutUrl,
    });
    expect(offer?.shippingDetails?.shippingRate).toMatchObject({
      value: 0,
      currency: "USD",
    });
    expect(offer?.hasMerchantReturnPolicy?.returnPolicyCategory).toBe(
      "https://schema.org/MerchantReturnNotPermitted",
    );
  });

  it("omits product schema when price is pending", () => {
    expect(buildProductOffer(pendingDeck)).toBeNull();
    expect(buildProductJsonLd(pendingDeck)).toBeNull();
    expect(buildDeckPageJsonLd(pendingDeck)["@graph"]).toHaveLength(1);
  });

  it("requires at least one image for merchant product schema", () => {
    const deckWithoutImages = {
      ...pricedDeck,
      sampleCards: pricedDeck.sampleCards.map((card) => ({ ...card, imageUrl: "" })),
    };

    expect(getProductImages(deckWithoutImages)).toEqual([]);
    expect(buildProductJsonLd(deckWithoutImages)).toBeNull();
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

  it("uses Brand and absolute image URLs on deck pages", () => {
    const graph = buildDeckPageJsonLd(pricedDeck)["@graph"];
    const product = graph.find((node) => node["@type"] === "Product");

    expect(product).toMatchObject({
      brand: { "@type": "Brand", name: "PixID Studio" },
      image: [
        "https://uniprep2go.study/samples/cfa-level-1-anki-deck-sample-1.webp",
        "https://uniprep2go.study/samples/cfa-level-1-anki-deck-sample-2.webp",
        "https://uniprep2go.study/samples/cfa-level-1-anki-deck-sample-3.webp",
      ],
    });
  });

  it("publishes US-first organization context for search and LLMs", () => {
    expect(buildSiteOrganizationJsonLd()).toMatchObject({
      "@type": "Organization",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      knowsAbout: expect.arrayContaining([
        "FINRA SIE, Series 7, and Series 63 exam prep",
      ]),
    });
  });
});
