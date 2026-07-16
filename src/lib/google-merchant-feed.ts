import { categoryLabels, type AvailableDeck } from "./decks";
import { getProductImages } from "./product-jsonld";
import { absoluteUrl, siteConfig } from "./site";

/** Google product taxonomy: Software > Computer Software > Educational Software */
const GOOGLE_PRODUCT_CATEGORY = "5167";

const FEED_COLUMNS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "additional_image_link",
  "availability",
  "price",
  "brand",
  "condition",
  "identifier_exists",
  "google_product_category",
  "product_type",
  "shipping",
  "adult",
  "is_bundle",
] as const;

type FeedColumn = (typeof FEED_COLUMNS)[number];

function sanitizeCell(value: string) {
  return value
    .replace(/\t/g, " ")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value: string, max: number) {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function formatPrice(amount: number, currency: string) {
  return `${amount.toFixed(2)} ${currency}`;
}

function isBundle(deck: AvailableDeck) {
  return /\bbundle\b/i.test(deck.title) || /\bbundle\b/i.test(deck.slug);
}

export function isMerchantFeedEligible(deck: AvailableDeck) {
  if (deck.pricePending || deck.price.amount <= 0) {
    return false;
  }
  if (deck.checkoutProvider === "App Store") {
    return false;
  }
  return getProductImages(deck).length > 0;
}

export function buildMerchantFeedRow(deck: AvailableDeck): Record<FeedColumn, string> {
  const images = getProductImages(deck);
  const [imageLink, ...additionalImages] = images;
  const description = sanitizeCell(deck.directAnswer || deck.subtitle || deck.title);
  const title = truncate(sanitizeCell(deck.title), 150);

  return {
    id: deck.slug,
    title,
    description: truncate(description, 5000),
    link: absoluteUrl(`/decks/${deck.slug}`),
    image_link: imageLink,
    additional_image_link: additionalImages.slice(0, 9).join(","),
    availability: "in_stock",
    price: formatPrice(deck.price.amount, deck.price.currency),
    brand: sanitizeCell(deck.checkoutSeller || siteConfig.name),
    condition: "new",
    identifier_exists: "false",
    google_product_category: GOOGLE_PRODUCT_CATEGORY,
    product_type: `Anki Decks > ${categoryLabels[deck.category]}`,
    shipping: "US:::0.00 USD",
    adult: "no",
    is_bundle: isBundle(deck) ? "yes" : "no",
  };
}

export function buildGoogleMerchantFeed(decks: AvailableDeck[]) {
  const rows = decks.filter(isMerchantFeedEligible).map(buildMerchantFeedRow);
  const lines = [
    FEED_COLUMNS.join("\t"),
    ...rows.map((row) => FEED_COLUMNS.map((column) => row[column]).join("\t")),
  ];
  return `${lines.join("\n")}\n`;
}
