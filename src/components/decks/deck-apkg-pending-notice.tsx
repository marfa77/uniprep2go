import Link from "next/link";
import type { CatalogAvailableDeck } from "@/lib/decks";
import { getDeckLinkedMock } from "@/lib/deck-seo";
import { isApkgPendingDeck } from "@/lib/anki-deck-launch";

type DeckApkgPendingNoticeProps = {
  deck: CatalogAvailableDeck;
};

export function DeckApkgPendingNotice({ deck }: DeckApkgPendingNoticeProps) {
  if (!isApkgPendingDeck(deck)) {
    return null;
  }

  const mock = getDeckLinkedMock(deck.slug);

  return (
    <section className="mt-8 rounded-3xl border border-[#c8922a]/30 bg-[#fff8ee] p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9a6b12]">
        Deck file pending
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#18140f]">
        Checkout open — .apkg ships after bank validation
      </h2>
      <p className="mt-2 text-sm leading-7 text-[#5f5749]">
        You can buy on Gumroad now. Your receipt is issued immediately; the Anki .apkg download
        appears in your Gumroad library once the deck is exported from the validated question bank
        (same items as the free readiness check).
      </p>
      {mock ? (
        <p className="mt-3 text-sm leading-7 text-[#5f5749]">
          While you wait:{" "}
          <Link
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            href={`/mock-exams/${mock.slug}`}
          >
            run the free {deck.shortName} readiness check
          </Link>{" "}
          to see weak topics before the deck file lands.
        </p>
      ) : null}
    </section>
  );
}
