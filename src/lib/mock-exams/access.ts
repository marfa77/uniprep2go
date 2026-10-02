import { getDeckBySlug } from "../decks";
import { getMockExamConfig } from "./configs";
import { mockFunnelNoticeForLinkedDeck } from "./pricing";
import type { MockAccessState } from "./types";

export { getMockCta } from "./mock-cta";

export function getMockAccessState(mockSlug: string): MockAccessState | null {
  const config = getMockExamConfig(mockSlug);

  if (!config) {
    return null;
  }

  const linkedDeck = getDeckBySlug(config.linkedDeckSlug);

  switch (config.accessMode) {
    case "free_demand_test":
      return {
        mockSlug,
        accessMode: config.accessMode,
        fullReportUnlocked: true,
        // No “notify me when paid mocks launch” — funnel is free mock → fix weak topics.
        interestCaptureEnabled: false,
        ctaLabel:
          linkedDeck?.status === "available"
            ? "Fix weak topics with linked prep"
            : "Open linked exam prep",
        ctaDescription: mockFunnelNoticeForLinkedDeck(linkedDeck),
      };
    case "gumroad_license":
      return {
        mockSlug,
        accessMode: config.accessMode,
        fullReportUnlocked: false,
        interestCaptureEnabled: false,
        ctaLabel: "Redeem Gumroad license key",
        ctaDescription: "Enter your Gumroad license key to unlock the full readiness report.",
      };
    case "coming_soon":
      return {
        mockSlug,
        accessMode: config.accessMode,
        fullReportUnlocked: false,
        interestCaptureEnabled: true,
        ctaLabel: "Notify me when this launches",
        ctaDescription:
          "This free timed practice test is on the waitlist. Leave your email and we’ll notify you when the question bank goes live.",
      };
  }
}

export function isFullReportUnlocked(accessState: MockAccessState | null) {
  return accessState?.fullReportUnlocked === true;
}
