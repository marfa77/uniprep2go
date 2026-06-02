import { getMockExamConfig } from "./configs";
import {
  mockPaidTransitionCtaDescription,
  mockPaidTransitionCtaLabel,
} from "./pricing";
import type { MockAccessState } from "./types";

export function getMockAccessState(mockSlug: string): MockAccessState | null {
  const config = getMockExamConfig(mockSlug);

  if (!config) {
    return null;
  }

  switch (config.accessMode) {
    case "free_demand_test":
      return {
        mockSlug,
        accessMode: config.accessMode,
        fullReportUnlocked: true,
        interestCaptureEnabled: true,
        ctaLabel: mockPaidTransitionCtaLabel,
        ctaDescription: mockPaidTransitionCtaDescription,
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
        ctaLabel: "Request early access",
        ctaDescription: "This mock is not live yet. Register interest to get notified when it launches.",
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

/** Future Gumroad adapter seam — not implemented in demand-test launch */
export type GumroadVerifyInput = {
  productId: string;
  licenseKey: string;
};

export type GumroadVerifyResult = {
  valid: boolean;
  uses: number;
  purchaseEmail?: string;
};

export async function verifyGumroadLicense(input: GumroadVerifyInput): Promise<GumroadVerifyResult> {
  void input;
  throw new Error("Gumroad license verification is not enabled during the demand-test launch");
}
