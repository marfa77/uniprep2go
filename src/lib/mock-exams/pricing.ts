/** Free mock starts before access switches to paid Gumroad checkout. */
export const MOCK_FREE_START_LIMIT = 20;

export const mockFreeAccessPriceLabel = `Free for first ${MOCK_FREE_START_LIMIT} mock starts`;

export const mockFreeAccessNotice =
  `Mocks and full reports are free for the first ${MOCK_FREE_START_LIMIT} mock starts while we validate demand. After that, access moves to paid Gumroad checkout.`;

export const mockPaidTransitionCtaLabel = "Notify me when paid mocks launch";

export const mockPaidTransitionCtaDescription = `${mockFreeAccessNotice} Register interest if you want an email when paid access goes live.`;

export function formatMockStartProgress(startCount: number) {
  return `${startCount}/${MOCK_FREE_START_LIMIT}`;
}

export function isMockFreeDemandTestActive(startCount: number) {
  return startCount < MOCK_FREE_START_LIMIT;
}
