import { fitMetaDescription } from "../seo";

/** Bing week-2 hub snippet — whole sentence, real per-vertical mock count. */
export function buildMockVerticalMetaDescription(clusterLabel: string, timedMockCount: number): string {
  return fitMetaDescription(
    `Free ${clusterLabel} practice tests: ${timedMockCount} timed mocks, 25 questions free, no signup.`,
  );
}