import type { AvailableDeck } from "./decks";
import { absoluteUrl, siteConfig } from "./site";

type ProductOfferInput = Pick<
  AvailableDeck,
  "checkoutUrl" | "checkoutSeller" | "price" | "pricePending"
>;

export function buildProductOffer(deck: ProductOfferInput) {
  if (deck.pricePending || deck.price.amount <= 0) {
    return null;
  }

  return {
    "@type": "Offer" as const,
    url: deck.checkoutUrl,
    availability: "https://schema.org/InStock",
    price: deck.price.amount,
    priceCurrency: deck.price.currency,
    seller: {
      "@type": "Organization" as const,
      name: deck.checkoutSeller,
    },
  };
}

export function buildProductJsonLd(
  deck: AvailableDeck,
  options?: { includeImages?: boolean },
) {
  const offer = buildProductOffer(deck);

  return {
    "@type": "Product" as const,
    "@id": `${siteConfig.url}/decks/${deck.slug}#product`,
    name: deck.title,
    description: deck.directAnswer,
    url: absoluteUrl(`/decks/${deck.slug}`),
    ...(options?.includeImages !== false && deck.sampleCards.some((card) => card.imageUrl)
      ? {
          image: deck.sampleCards
            .filter((card) => card.imageUrl)
            .map((card) => absoluteUrl(card.imageUrl)),
        }
      : {}),
    brand: {
      "@type": "Brand" as const,
      name: deck.checkoutSeller,
    },
    ...(offer ? { offers: offer } : {}),
  };
}

export function buildCatalogItemListJsonLd(
  decks: Pick<AvailableDeck, "slug" | "title">[],
) {
  return {
    "@type": "ItemList" as const,
    name: `${siteConfig.name} Anki deck catalog`,
    numberOfItems: decks.length,
    itemListElement: decks.map((deck, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: deck.title,
      url: absoluteUrl(`/decks/${deck.slug}`),
    })),
  };
}
