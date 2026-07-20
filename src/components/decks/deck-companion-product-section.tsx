import Link from "next/link";
import type { CatalogAvailableDeck } from "@/lib/decks";
import type { PricedDeck } from "@/lib/checkout-pricing";
import { formatDeckPriceLabel } from "@/lib/checkout-pricing";
import { btnSecondary } from "@/lib/ui-button-classes";

type DeckCompanionProductSectionProps = {
  deck: CatalogAvailableDeck;
  companion: PricedDeck;
};

export function DeckCompanionProductSection({
  deck,
  companion,
}: DeckCompanionProductSectionProps) {
  const priceLabel = formatDeckPriceLabel(companion);

  return (
    <section className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
        Pairs with
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{companion.shortName}</h2>
      <p className="mt-2 text-sm leading-7 text-[#4f493e]">{companion.subtitle}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          className={btnSecondary}
          href={`/decks/${companion.slug}`}
        >
          {companion.format === "PDF" && companion.slug.includes("formula")
            ? `View matching ${companion.shortName} formula sheet — ${priceLabel}`
            : `View ${companion.format === "PDF" ? "PDF" : "deck"} — ${priceLabel}`}
        </Link>
        <span className="text-xs text-[#7a6e5a]">
          Same validated bank as this {deck.format === "PDF" ? "PDF" : "deck"}
        </span>
      </div>
    </section>
  );
}
