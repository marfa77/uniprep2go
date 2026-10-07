import { deckPurchaseCountCopy, publicDeckPurchaseCount } from "@/lib/deck-purchase-count";

/** Server-rendered purchase social proof (floor today; wire real Gumroad sales later). */
export function DeckPurchaseCountNote({ slug }: { slug: string }) {
  const count = publicDeckPurchaseCount(slug);
  if (count == null) return null;

  return (
    <p className="mt-4 text-sm leading-6 text-[#5f5749]" id="deck-purchase-count">
      {deckPurchaseCountCopy(count)}. Recent UniPrep2Go checkout activity — not an official exam
      board figure.
    </p>
  );
}
