/**
 * UniPrep Learn Pass — $5 per Learn session (Gumroad quantity = credits).
 *
 * Off by default (no UI / API surface). Enable only when ready for traffic:
 *   LEARN_PASS_ENABLED=true
 *
 * Gumroad setup (manual, before enabling):
 * 1. Create product e.g. "UniPrep Learn Pass" at USD 5.
 * 2. Enable “Allow customers to choose a quantity”.
 * 3. Set env:
 *    - LEARN_PASS_ENABLED=true
 *    - GUMROAD_LEARN_PRODUCT_URL or GUMROAD_LEARN_CHECKOUT_URL (permalink)
 *    - GUMROAD_LEARN_PRODUCT_ID (API product_id, ends with ==)
 *    - LEARN_PASS_PRICE_USD (optional, default 5)
 *    - LEARN_ACCESS_SECRET (HMAC for session cookie)
 */

/** Kill switch — paid Learn is hidden site-wide unless explicitly enabled. */
export function isLearnPassEnabled(): boolean {
  const value = process.env.LEARN_PASS_ENABLED?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export const LEARN_PASS_PRICE_USD = Number(process.env.LEARN_PASS_PRICE_USD ?? 5) || 5;
export const LEARN_CREDITS_PER_UNIT = 1;
export const LEARN_QTY_OPTIONS = [1, 2, 3, 5] as const;
export const MAX_LEARN_QUANTITY = 50;

/** Default permalink until the live Gumroad product is created and env is set. */
const DEFAULT_LEARN_PRODUCT_URL = "https://pixidstudio.gumroad.com/l/uniprep-learn-pass";

export function getLearnProductUrl(): string {
  const fromCheckout = process.env.GUMROAD_LEARN_CHECKOUT_URL?.trim();
  if (fromCheckout) {
    try {
      const url = new URL(fromCheckout);
      url.search = "";
      return url.toString().replace(/\/$/, "");
    } catch {
      return fromCheckout.split("?")[0]?.replace(/\/$/, "") || DEFAULT_LEARN_PRODUCT_URL;
    }
  }

  const fromProduct = process.env.GUMROAD_LEARN_PRODUCT_URL?.trim();
  if (fromProduct) {
    return fromProduct.replace(/\/$/, "");
  }

  return DEFAULT_LEARN_PRODUCT_URL;
}

/** Base checkout with wanted=true (skips Gumroad landing overlay). */
export function getLearnCheckoutBaseUrl(): string {
  const configured = process.env.GUMROAD_LEARN_CHECKOUT_URL?.trim();
  if (configured?.includes("wanted=true")) {
    return configured;
  }
  if (configured) {
    const join = configured.includes("?") ? "&" : "?";
    return `${configured}${join}wanted=true`;
  }
  return `${getLearnProductUrl()}?wanted=true`;
}

/** Gumroad checkout URL with optional quantity. */
export function learnCheckoutUrl(quantity = 1): string {
  const q = Number.isFinite(quantity) ? Math.max(1, Math.min(MAX_LEARN_QUANTITY, Math.floor(quantity))) : 1;
  const base = getLearnCheckoutBaseUrl();
  if (q <= 1) {
    return base;
  }

  try {
    const url = new URL(base);
    url.searchParams.set("wanted", "true");
    url.searchParams.set("quantity", String(q));
    return url.toString();
  } catch {
    const join = base.includes("?") ? "&" : "?";
    return `${base}${join}quantity=${q}`;
  }
}

export function parseLearnPurchaseQuantity(raw: unknown): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), MAX_LEARN_QUANTITY);
}

export function initialLearnCreditsForQuantity(quantity: number): number {
  return LEARN_CREDITS_PER_UNIT * parseLearnPurchaseQuantity(quantity);
}

export function isLearnPassConfigured(): boolean {
  return isLearnPassEnabled() && Boolean(process.env.GUMROAD_LEARN_PRODUCT_ID?.trim());
}
