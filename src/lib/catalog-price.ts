/**
 * Single source for UniPrep one-time product price copy.
 * Live checkout / JSON-LD still sync from Gumroad; this file backs list fallbacks
 * and marketing text (`{PRICE}` + legacy $9/$11/… mentions).
 */
import catalogListPrices from "@/data/catalog-list-prices.json";

export const PRICE_PLACEHOLDER = "{PRICE}";

type CatalogListPriceConfig = {
  defaults: {
    Gumroad: { apkg: number; PDF: number };
    "Lemon Squeezy": { apkg: number; PDF: number };
    buildingGumroadUsd: number;
  };
  overrides: Record<string, number>;
};

const listPriceConfig = catalogListPrices as CatalogListPriceConfig;

/**
 * Legacy hard-coded UniPrep product prices in marketing copy (pre flat $9.99).
 * Do not run this over exam-question banks or Cursor Ship Kit copy.
 */
/** Matches whole price tokens only — not `$16.80` exam-math or `$9.99` already-correct. */
const LEGACY_UNIPREP_PRODUCT_PRICE_RE =
  /\$\s?(?:9(?!\.99\b)|11|16|19|29|39)(?:\.00)?(?!\.?\d)/g;

export function formatCheckoutPrice(amount: number) {
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

/** Gumroad Anki/PDF default from `catalog-list-prices.json`. */
export function getCatalogGumroadDefaultUsd(format: "apkg" | "PDF" = "apkg"): number {
  return listPriceConfig.defaults.Gumroad[format];
}

/** Override for slug, else Gumroad default (apkg unless format=PDF). */
export function getCatalogListPriceUsd(slug?: string, format: "apkg" | "PDF" = "apkg"): number {
  if (slug) {
    const override = listPriceConfig.overrides[slug];
    if (typeof override === "number" && override > 0) {
      return override;
    }
  }
  return getCatalogGumroadDefaultUsd(format);
}

export function formatCatalogListPrice(slug?: string, format: "apkg" | "PDF" = "apkg"): string {
  return formatCheckoutPrice(getCatalogListPriceUsd(slug, format));
}

/** Fill `{PRICE}` and legacy `$9` / `$11` / `$16` / `$19` / `$39` product mentions. */
export function fillProductPriceMentions(text: string, priceLabel: string): string {
  if (!text) return text;
  return text
    .replaceAll(PRICE_PLACEHOLDER, priceLabel)
    .replace(LEGACY_UNIPREP_PRODUCT_PRICE_RE, priceLabel);
}

/** Fill marketing copy from catalog list price (override → Gumroad default). */
export function withCatalogProductPrices(text: string, slug?: string): string {
  return fillProductPriceMentions(text, formatCatalogListPrice(slug));
}

export { listPriceConfig };
