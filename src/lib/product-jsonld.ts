import type { AvailableDeck } from "./decks";
import { categoryLabels, type DeckCategory } from "./decks";
import { absoluteUrl, siteConfig } from "./site";

type ProductOfferInput = Pick<
  AvailableDeck,
  "checkoutUrl" | "checkoutSeller" | "price" | "pricePending"
>;

export function getProductImages(deck: Pick<AvailableDeck, "sampleCards">) {
  return deck.sampleCards
    .filter((card) => card.imageUrl)
    .map((card) => absoluteUrl(card.imageUrl));
}

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
    shippingDetails: {
      "@type": "OfferShippingDetails" as const,
      shippingRate: {
        "@type": "MonetaryAmount" as const,
        value: 0,
        currency: deck.price.currency,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime" as const,
        handlingTime: {
          "@type": "QuantitativeValue" as const,
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue" as const,
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy" as const,
      applicableCountry: "US",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      merchantReturnLink: absoluteUrl("/terms"),
    },
  };
}

export function buildProductJsonLd(deck: AvailableDeck) {
  const offer = buildProductOffer(deck);
  const image = getProductImages(deck);

  if (!offer || image.length === 0) {
    return null;
  }

  return {
    "@type": "Product" as const,
    "@id": `${siteConfig.url}/decks/${deck.slug}#product`,
    name: deck.title,
    description: deck.directAnswer,
    url: absoluteUrl(`/decks/${deck.slug}`),
    image,
    brand: {
      "@type": "Brand" as const,
      name: deck.checkoutSeller,
    },
    offers: offer,
  };
}

export function buildDeckPageJsonLd(deck: AvailableDeck) {
  const product = buildProductJsonLd(deck);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...(product
        ? [
            {
              ...product,
              category: categoryLabels[deck.category as DeckCategory],
            },
          ]
        : []),
      {
        "@type": "FAQPage" as const,
        "@id": `${siteConfig.url}/decks/${deck.slug}#faq`,
        mainEntity: deck.faqs.map((faq) => ({
          "@type": "Question" as const,
          name: faq.question,
          acceptedAnswer: { "@type": "Answer" as const, text: faq.answer },
        })),
      },
    ],
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

export function buildSiteOrganizationJsonLd() {
  return {
    "@type": "Organization" as const,
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
