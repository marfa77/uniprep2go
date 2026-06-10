import Link from "next/link";
import { categoryLabels, getRelatedDecks, type CatalogAvailableDeck } from "@/lib/decks";

type DeckRelatedDecksProps = {
  deck: CatalogAvailableDeck;
};

export function DeckRelatedDecks({ deck }: DeckRelatedDecksProps) {
  const relatedDecks = getRelatedDecks(deck);

  if (relatedDecks.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">
        More {categoryLabels[deck.category]} prep
      </h2>
      <ul className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
        {relatedDecks.map((relatedDeck) => (
          <li key={relatedDeck.slug}>
            <Link
              className="block px-5 py-4 transition hover:bg-[#fffaf0]"
              href={`/decks/${relatedDeck.slug}`}
            >
              <p className="font-medium text-[#18140f]">{relatedDeck.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#5f5749]">{relatedDeck.subtitle}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className="mt-4 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
        href={`/#catalog-${deck.category}`}
      >
        Browse all {categoryLabels[deck.category].toLowerCase()} products
      </Link>
    </section>
  );
}
