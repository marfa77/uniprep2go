/** Unique first starts shown on the mock landing. Hide tiny counts. */
export const MOCK_START_PUBLISH_MIN = 3;

export function publicMockStartCount(uniqueStarters: number): number | null {
  if (uniqueStarters < MOCK_START_PUBLISH_MIN) {
    return null;
  }
  return uniqueStarters;
}

export function mockStartCountCopy(uniqueStarters: number): string {
  const noun = uniqueStarters === 1 ? "person has" : "people have";
  return `${uniqueStarters.toLocaleString("en-US")} ${noun} started this timed check`;
}
