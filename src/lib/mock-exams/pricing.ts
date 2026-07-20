/** Public price label for free timed mocks (lead magnet). */
export const mockFreeAccessPriceLabel = "Free timed practice test";

/**
 * Hub / generic funnel copy: mocks stay free; monetization is the Anki deck.
 */
export const mockFreeAccessNotice =
  "Free timed mocks with full topic reports — no signup. After your score, buy or join the waitlist for the linked Anki deck to drill weak topics with spaced repetition.";

/** Deck-aware notice for mock pages, facts, and FAQs. */
export function mockFunnelNoticeForLinkedDeck(
  linkedDeck?: {
    status?: "available" | "planned";
    checkoutUrl?: string;
  } | null,
): string {
  if (linkedDeck?.status === "available" && linkedDeck.checkoutUrl) {
    return "Free timed mock with full topic report — no signup. After your score, buy the linked Anki deck on Gumroad to drill weak topics with spaced repetition.";
  }

  return "Free timed mock with full topic report — no signup. After your score, join the linked Anki deck waitlist for the .apkg when it ships.";
}

/** @deprecated Prefer mockFunnelNoticeForLinkedDeck. */
export const mockPaidTransitionCtaLabel = "Open linked Anki deck";

/** @deprecated Prefer mockFunnelNoticeForLinkedDeck. */
export const mockPaidTransitionCtaDescription = mockFreeAccessNotice;
