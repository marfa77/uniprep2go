import { withSocialProofFloor } from "@/lib/social-proof";

export const DECK_PURCHASE_PUBLISH_MIN = 3;

/** Public purchase social proof. Real sales can be passed later; floors bootstrap now. */
export function publicDeckPurchaseCount(
  slug: string,
  realPurchases?: number | null,
): number | null {
  const display = withSocialProofFloor("deckPurchases", slug, realPurchases);
  if (display < DECK_PURCHASE_PUBLISH_MIN) return null;
  return display;
}

export function deckPurchaseCountCopy(count: number): string {
  const noun = count === 1 ? "person has" : "people have";
  return `${count.toLocaleString("en-US")} ${noun} purchased this deck`;
}
