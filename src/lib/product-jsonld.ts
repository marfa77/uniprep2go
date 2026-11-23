import type { AvailableDeck } from "./decks";
import { categoryLabels, type DeckCategory } from "./decks";
import { buildMergedDeckFaqs } from "./deck-faq";
import { absoluteUrl, siteConfig } from "./site";

const EDUCATION_QA_DISALLOWED_SCRIPTS =
  /[\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;

function stripMarkupForSchema(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isEnglishOrPortugueseCardText(text: string): boolean {
  if (!text.trim()) {
    return false;
  }
  return !EDUCATION_QA_DISALLOWED_SCRIPTS.test(text);
}

export function isDeckEducationQaEligible(
  deck: Pick<AvailableDeck, "format" | "category" | "slug" | "sampleCards">,
): boolean {
  if (deck.format === "PDF" || deck.format === "App") {
    return false;
  }
  if (deck.category === "language" && deck.slug !== "portuguese-survival-anki-deck") {
    return false;
  }
  const cards = deck.sampleCards.filter(
    (card) => card.question?.trim() && card.answer?.trim(),
  );
  if (cards.length === 0) {
    return false;
  }
  return cards.every(
    (card) =>
      isEnglishOrPortugueseCardText(card.question) &&
      isEnglishOrPortugueseCardText(card.answer),
  );
}

export function buildDeckEducationQuizJsonLd(deck: AvailableDeck) {
  if (!isDeckEducationQaEligible(deck)) {
    return null;
  }
  const deckUrl = absoluteUrl(`/decks/${deck.slug}`);
  const hasPart = deck.sampleCards
    .filter((card) => card.question?.trim() && card.answer?.trim())
    .map((card) => ({
      "@type": "Question" as const,
      eduQuestionType: "Flashcard",
      text: stripMarkupForSchema(card.question),
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: stripMarkupForSchema(card.answer),
      },
    }));

  if (hasPart.length === 0) {
    return null;
  }

  return {
    "@type": "Quiz" as const,
    "@id": `${deckUrl}#education-quiz`,
    name: `${deck.shortName} sample flashcards`,
    url: `${deckUrl}#sample-cards`,
    educationalLevel: "Professional certification prep",
    hasPart,
  };
}

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

  const today = new Date().toISOString().slice(0, 10);

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
    dateModified: today,
    offers: offer,
  };
}

export function buildDeckPageJsonLd(deck: AvailableDeck) {
  const product = buildProductJsonLd(deck);
  const deckUrl = absoluteUrl(`/decks/${deck.slug}`);
  const mergedFaqs = buildMergedDeckFaqs(deck);

  const educationQuiz = buildDeckEducationQuizJsonLd(deck);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage" as const,
        "@id": `${deckUrl}#webpage`,
        name: deck.title,
        description: deck.directAnswer,
        url: deckUrl,
        dateModified: product?.dateModified,
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
      ...(educationQuiz ? [educationQuiz] : []),
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
    description: siteConfig.primaryPositioning,
    publishingPrinciples: `${siteConfig.url}/about`,
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
