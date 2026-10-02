import { MOCK_ACCESS_RULE, MOCK_PASS_ATTEMPTS, MOCK_PASS_PRICE_USD } from "./mock-pass";

/** Public price label for timed mocks: first attempt free, then Mock Pass. */
export const mockFreeAccessPriceLabel = `First mock free, then $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts`;

/**
 * Hub / generic funnel copy: one free mock per visitor, then the $5 Mock Pass;
 * the linked Anki deck repairs weak topics.
 */
export const mockFreeAccessNotice = `${MOCK_ACCESS_RULE} Every attempt ends with a full topic report; drill weak topics with the linked Anki deck.`;

/** Deck-aware notice for mock pages, facts, and FAQs. */
export function mockFunnelNoticeForLinkedDeck(
  linkedDeck?: {
    status?: "available" | "planned";
    checkoutUrl?: string;
  } | null,
): string {
  if (linkedDeck?.status === "available" && linkedDeck.checkoutUrl) {
    return `${MOCK_ACCESS_RULE} After your score, buy the linked Anki deck on Gumroad to drill weak topics with spaced repetition.`;
  }

  return `${MOCK_ACCESS_RULE} After your score, join the linked Anki deck waitlist for the .apkg when it ships.`;
}

/** @deprecated Prefer mockFunnelNoticeForLinkedDeck. */
export const mockPaidTransitionCtaLabel = "Open linked Anki deck";

/** @deprecated Prefer mockFunnelNoticeForLinkedDeck. */
export const mockPaidTransitionCtaDescription = mockFreeAccessNotice;
