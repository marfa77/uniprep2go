import type { MockAccessState } from "./types";

/** Client-safe CTA projection — keep free of configs/decks imports for bundle size. */
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
