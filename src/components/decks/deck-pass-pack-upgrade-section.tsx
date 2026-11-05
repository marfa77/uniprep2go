import Link from "next/link";
import type { PricedDeck } from "@/lib/checkout-pricing";
import { formatDeckPriceLabel } from "@/lib/checkout-pricing";
import { btnPrimary } from "@/lib/ui-button-classes";

type DeckPassPackUpgradeSectionProps = {
  passPack: PricedDeck;
  /** e.g. "save vs $38 separate" */
  savingsNote: string;
};

/**
 * Prominent deck-page upsell to the Anki + PDF Pass Pack (feeder SKU → bundle).
 */
export function DeckPassPackUpgradeSection({
  passPack,
  savingsNote,
}: DeckPassPackUpgradeSectionProps) {
  const priceLabel = formatDeckPriceLabel(passPack);

  return (
    <section
      className="mt-8 rounded-3xl border-2 border-[#1f3a5f]/25 bg-gradient-to-br from-[#1f3a5f]/8 via-[#fffaf0] to-[#f7f3ea] p-6 shadow-[0_18px_50px_-34px_rgba(31,58,95,0.35)] sm:p-8"
      id="pass-pack-upgrade"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">Upgrade</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        Upgrade → {passPack.shortName}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4f493e]">
        Two-file Gumroad download: {passPack.facts.cards} — {passPack.facts.formulas}. One checkout at{" "}
        {priceLabel} ({savingsNote}).
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          className={btnPrimary}
          href={`/decks/${passPack.slug}`}
        >
          View Pass Pack — {priceLabel}
        </Link>
        <span className="text-xs leading-5 text-[#7a6e5a]">
          Singles stay at list price; buy the pack when you want both files.
        </span>
      </div>
    </section>
  );
}
