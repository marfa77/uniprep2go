/**
 * UniPrep2Go Mock Pass — free 25-question diagnostic (any exam, Exam or Learn mode), then
 * a $19 Gumroad license key unlocks unlimited full mocks on any live exam.
 *
 * The free attempt is tracked in the browser (localStorage) and, for 24 hours,
 * by a hash of the public IP in Redis so a private window does not reset it.
 * A redeemed key is a server-side flag (hash of the Gumroad license). It does not
 * count down.
 *
 * Kill switch (server env): MOCK_PAYWALL=off → every mock is free again.
 * Cookie HMAC secret: MOCK_PASS_SECRET (fallback LEARN_ACCESS_SECRET).
 */

import { FREE_DIAGNOSTIC_QUESTIONS } from "./free-diagnostic";

export const MOCK_PASS_NAME = "UniPrep2Go Mock Pass";
export const MOCK_PASS_PRICE_USD = 19;
/**
 * Stored balance for a key that does not run out. Never show this number to a buyer.
 * Consume treats any balance at or above this as unlimited.
 */
export const UNLIMITED_MOCK_PASS_ATTEMPTS = 999;
/** Max Gumroad quantity honored when a buyer changes quantity at checkout. */
export const MAX_MOCK_PASS_QUANTITY = 50;

export const MOCK_PASS_PRODUCT_ID = "4oP7OGKWPk4Tlp2ayeOQ7w==";
export const MOCK_PASS_PRODUCT_URL = "https://pixidstudio.gumroad.com/l/uniprep-mock-pass";
export const MOCK_PASS_CHECKOUT_URL = `${MOCK_PASS_PRODUCT_URL}?wanted=true`;

/** Buyer-facing price line. */
export const MOCK_PASS_OFFER = `$${MOCK_PASS_PRICE_USD} for unlimited attempts`;

/** One-line access rule for badges, buttons and meta snippets. */
export const MOCK_ACCESS_SHORT = `Free ${FREE_DIAGNOSTIC_QUESTIONS}-question diagnostic · full mocks ${MOCK_PASS_OFFER}`;

/** Canonical access rule for landings, FAQs and LLM-visible docs. */
export const MOCK_ACCESS_RULE =
  `Your first UniPrep2Go attempt is free: a ${FREE_DIAGNOSTIC_QUESTIONS}-question timed diagnostic on any exam (Exam or Learn mode, no signup) with the full topic report. ` +
  `Full-length mocks and retakes run on a $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} (Gumroad license key): unlimited attempts on any mock.`;

export function isUnlimitedMockPassBalance(remaining: number): boolean {
  return remaining >= UNLIMITED_MOCK_PASS_ATTEMPTS;
}

export function isMockPaywallEnabled(): boolean {
  const value = process.env.MOCK_PAYWALL?.trim().toLowerCase();
  return !(value === "off" || value === "false" || value === "0" || value === "no");
}

export function clampMockPassQuantity(raw: unknown): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), MAX_MOCK_PASS_QUANTITY);
}

/** Every paid Mock Pass is unlimited. Quantity at checkout does not add a second meter. */
export function mockPassAttemptsForQuantity(_quantity: unknown): number {
  return UNLIMITED_MOCK_PASS_ATTEMPTS;
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
