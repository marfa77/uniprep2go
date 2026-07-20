import type { AvailableDeck } from "./decks";
import { categoryLabels, type DeckCategory } from "./decks";
import { buildMergedDeckFaqs } from "./deck-faq";
import { absoluteUrl, siteConfig } from "./site";

type ProductOfferInput = Pick<
  AvailableDeck,
  "checkoutUrl" | "checkoutSeller" | "price" | "pricePending"
>;

export function getProductImages(deck: Pick<AvailableDeck, "sampleCards" | "coverImage">) {
  const fromSamples = deck.sampleCards
    .filter((card) => card.imageUrl)
    .map((card) => absoluteUrl(card.imageUrl));

  if (fromSamples.length > 0) {
    return fromSamples;
  }

  if (deck.coverImage) {
    return [absoluteUrl(deck.coverImage)];
  }

  return [];
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
  const deckUrl = absoluteUrl(`/decks/${deck.slug}`);
  const mergedFaqs = buildMergedDeckFaqs(deck);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage" as const,
        "@id": `${deckUrl}#webpage`,
        name: deck.title,
        description: deck.directAnswer,
        url: deckUrl,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: product
          ? {
              "@id": `${deckUrl}#product`,
            }
          : undefined,
      },
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
        mainEntity: mergedFaqs.map((faq) => ({
          "@type": "Question" as const,
          name: faq.question,
          acceptedAnswer: { "@type": "Answer" as const, text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList" as const,
        "@id": `${deckUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem" as const,
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem" as const,
            position: 2,
            name: categoryLabels[deck.category as DeckCategory],
            item: `${siteConfig.url}/#catalog`,
          },
          {
            "@type": "ListItem" as const,
            position: 3,
            name: deck.shortName,
            item: deckUrl,
          },
        ],
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
    contactPoint: {
      "@type": "ContactPoint" as const,
      email: siteConfig.contactEmail,
      contactType: "customer support",
    },
    areaServed: {
      "@type": "Country" as const,
      name: siteConfig.primaryMarket,
    },
    knowsAbout: siteConfig.primaryUseCases,
    /** Checkout / studio parent — not the primary site Organization. */
    parentOrganization: {
      "@type": "Organization" as const,
      "@id": "https://www.pixid.studio/#org",
      name: "PixID Studio",
      url: "https://www.pixid.studio/",
    },
  };
}

/** Sitewide JSON-LD document for root layout (UniPrep2Go primary). */
export function buildSiteOrganizationJsonLdDocument() {
  return {
    "@context": "https://schema.org",
    ...buildSiteOrganizationJsonLd(),
  };
}
