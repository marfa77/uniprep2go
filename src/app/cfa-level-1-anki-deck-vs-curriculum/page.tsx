import type { Metadata } from "next";
import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDeckPriceLabel, getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { primaryDeck } from "@/lib/decks";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const directAnswer =
  "The CFA Level 1 Anki deck and the official CFA curriculum serve different roles. The deck is a 342+ card spaced-repetition tool for fast recall of formulas, definitions, and concepts. The official curriculum is the authoritative source for full learning and exam-standard practice. Use the deck alongside the curriculum, not as a replacement for it.";

export const metadata: Metadata = {
  title: "CFA Level 1 Anki deck vs the official curriculum",
  description: directAnswer,
  alternates: {
    canonical: "/cfa-level-1-anki-deck-vs-curriculum",
  },
};

export default async function ComparisonPage() {
  const deck = await getPricedDeckBySlug(primaryDeck.slug);

  if (!deck) {
    return null;
  }

  const rows = deck.comparison ?? [];
  const priceLabel = formatDeckPriceLabel(deck);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />

      <article id="main-content" tabIndex={-1} className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Comparison</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          CFA Level 1 Anki deck vs the official curriculum
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">{directAnswer}</p>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                <th className="px-5 py-4 font-medium">Dimension</th>
                <th className="px-5 py-4 font-medium">UniPrep2Go Anki deck</th>
                <th className="px-5 py-4 font-medium">Official CFA curriculum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18140f]/10">
              {rows.map((row) => (
                <tr key={row.dimension}>
                  <td className="px-5 py-4 font-medium">{row.dimension}</td>
                  <td className="px-5 py-4 text-[#4f493e]">{row.deck}</td>
                  <td className="px-5 py-4 text-[#4f493e]">{row.curriculum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedCheckoutLink
            className={btnPrimary}
            deckSlug={deck.slug}
            href={deck.checkoutUrl}
            source="comparison_page_cta"
          >
            Buy the deck — {priceLabel}
          </TrackedCheckoutLink>
          <Link
            className={btnSecondary}
            href={`/decks/${deck.slug}`}
          >
            View deck details
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
