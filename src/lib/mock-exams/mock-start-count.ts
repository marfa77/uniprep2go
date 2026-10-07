import { withSocialProofFloor } from "@/lib/social-proof";

/** Hide only empty / broken values — floors keep most live mocks visible. */
export const MOCK_START_PUBLISH_MIN = 3;

export function publicMockStartCount(
  uniqueStarters: number,
  slug?: string,
): number | null {
  const display = slug
    ? withSocialProofFloor("mockStarts", slug, uniqueStarters)
    : uniqueStarters;
  if (display < MOCK_START_PUBLISH_MIN) {
    return null;
  }
  return display;
}

export function mockStartCountCopy(uniqueStarters: number): string {
  const noun = uniqueStarters === 1 ? "person has" : "people have";
  return `${uniqueStarters.toLocaleString("en-US")} ${noun} started this timed check`;
}
