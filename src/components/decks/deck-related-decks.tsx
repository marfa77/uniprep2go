import Link from "next/link";
import {
  BUILDING_CERTIFICATION_HUB_SLUG,
  getBuildingClusterLabel,
  getRelatedBuildingDecks,
  isBuildingCertDeckSlug,
} from "@/lib/building-cert-clusters";
import { categoryLabels, getRelatedDecks, type Deck } from "@/lib/decks";

type DeckRelatedDecksProps = {
  deck: Deck;
};

export function DeckRelatedDecks({ deck }: DeckRelatedDecksProps) {
  const clusterLabel = getBuildingClusterLabel(deck.slug);
  const relatedDecks = isBuildingCertDeckSlug(deck.slug)
    ? getRelatedBuildingDecks(deck.slug)
    : getRelatedDecks(deck);

  if (relatedDecks.length === 0) {
    return null;
  }

  const sectionTitle = clusterLabel
    ? `More ${clusterLabel.toLowerCase()} prep`
    : `More ${categoryLabels[deck.category]} prep`;

  const browseHref = clusterLabel
    ? `/${BUILDING_CERTIFICATION_HUB_SLUG}`
    : `/#catalog-${deck.category}`;

  const browseLabel = clusterLabel
    ? "Browse all building certification pathways"
    : `Browse all ${categoryLabels[deck.category].toLowerCase()} products`;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{sectionTitle}</h2>
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
        href={browseHref}
      >
        {browseLabel}
      </Link>
    </section>
  );
}
