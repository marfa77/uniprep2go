import { getDeckBySlug } from "../decks";
import { getMockExamConfig } from "./configs";
import { mockFunnelNoticeForLinkedDeck } from "./pricing";
import type { MockAccessState } from "./types";

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
        // No “notify me when paid mocks launch” — funnel is free mock → Anki deck.
        interestCaptureEnabled: false,
        ctaLabel: linkedDeck?.status === "available" ? "Buy linked Anki deck" : "Open linked Anki deck",
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
          "This free timed practice test is on the waitlist. Tap notify and we’ll ping the founder (Telegram) when the question bank goes live — no spam list.",
      };
  }
}

export function isFullReportUnlocked(accessState: MockAccessState | null) {
  return accessState?.fullReportUnlocked === true;
}

export function getMockCta(accessState: MockAccessState | null) {
  if (!accessState) {
    return null;
  }

  return {
    label: accessState.ctaLabel,
    description: accessState.ctaDescription,
    interestCaptureEnabled: accessState.interestCaptureEnabled,
  };
}

/** @deprecated Prefer verifyGumroadLearnLicense for Learn Pass credits. */
export type GumroadVerifyInput = {
  productId: string;
  licenseKey: string;
};

/** @deprecated Prefer GumroadLearnVerifyResult. */
export type GumroadVerifyResult = {
  valid: boolean;
  uses: number;
  purchaseEmail?: string;
};

/**
 * Legacy seam — timed Exam/report stay free (`free_demand_test`).
 * Learn Pass verification lives in `gumroad-learn-license.ts`.
 */
export async function verifyGumroadLicense(input: GumroadVerifyInput): Promise<GumroadVerifyResult> {
  const { verifyGumroadLearnLicense } = await import("@/lib/gumroad-learn-license");
  const result = await verifyGumroadLearnLicense(input.licenseKey);
  if (!result.ok) {
    return { valid: false, uses: 0 };
  }
  return {
    valid: true,
    uses: result.gumroadUses,
    purchaseEmail: result.email ?? undefined,
  };
}
