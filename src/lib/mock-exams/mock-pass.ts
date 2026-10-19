/**
 * UniPrep2Go Mock Pass — free 25-question diagnostic (any exam, Exam or Learn mode), then
 * a $5 Gumroad license key unlocks 5 more attempts on any live mock.
 *
 * The free attempt is tracked in the browser (localStorage); paid attempts are
 * server-side credits keyed by a hash of the Gumroad license key.
 *
 * Kill switch (server env): MOCK_PAYWALL=off → every mock is free again.
 * Cookie HMAC secret: MOCK_PASS_SECRET (fallback LEARN_ACCESS_SECRET).
 */

import { FREE_DIAGNOSTIC_QUESTIONS } from "./free-diagnostic";

export const MOCK_PASS_NAME = "UniPrep2Go Mock Pass";
export const MOCK_PASS_PRICE_USD = 5;
/** Attempts granted per Gumroad quantity unit ($5 → 5 attempts). */
export const MOCK_PASS_ATTEMPTS = 5;
/** Max Gumroad quantity honored when a buyer changes quantity at checkout. */
export const MAX_MOCK_PASS_QUANTITY = 50;

export const MOCK_PASS_PRODUCT_ID = "4oP7OGKWPk4Tlp2ayeOQ7w==";
export const MOCK_PASS_PRODUCT_URL = "https://pixidstudio.gumroad.com/l/uniprep-mock-pass";
export const MOCK_PASS_CHECKOUT_URL = `${MOCK_PASS_PRODUCT_URL}?wanted=true`;

/** One-line access rule for badges, buttons and meta snippets. */
export const MOCK_ACCESS_SHORT = `Free ${FREE_DIAGNOSTIC_QUESTIONS}-question diagnostic · full mocks $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts`;

/** Canonical access rule for landings, FAQs and LLM-visible docs. */
export const MOCK_ACCESS_RULE =
  `Your first UniPrep2Go attempt is free: a ${FREE_DIAGNOSTIC_QUESTIONS}-question timed diagnostic on any exam (Exam or Learn mode, no signup) with the full topic report. ` +
  `Full-length mocks and retakes run on a $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} (Gumroad license key): ${MOCK_PASS_ATTEMPTS} attempts on any mock.`;

export function isMockPaywallEnabled(): boolean {
  const value = process.env.MOCK_PAYWALL?.trim().toLowerCase();
  return !(value === "off" || value === "false" || value === "0" || value === "no");
}

export function clampMockPassQuantity(raw: unknown): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), MAX_MOCK_PASS_QUANTITY);
}

export function mockPassAttemptsForQuantity(quantity: unknown): number {
  return MOCK_PASS_ATTEMPTS * clampMockPassQuantity(quantity);
}

export type MockStartDecision = "open" | "free" | "paid" | "paywall";

/**
 * How the next mock start is paid for. `remaining` is the server credit count
 * for this browser's redeemed key (0 when none redeemed).
 */
export function decideMockStart(input: {
  paywallEnabled: boolean;
  freeAttemptUsed: boolean;
  remaining: number;
}): MockStartDecision {
  if (!input.paywallEnabled) return "open";
  // A key already on this browser runs the full mock, even if the free diagnostic is unused.
  if (input.remaining > 0) return "paid";
  if (!input.freeAttemptUsed) return "free";
  return "paywall";
}
