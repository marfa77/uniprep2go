import Link from "next/link";
import {
  getExamFamilyForDeck,
  getFamilyHubLinkForDeck,
  getRelatedForDeck,
} from "@/lib/exam-families";
import { categoryLabels, getRelatedDecks, type Deck } from "@/lib/decks";
import { feederDeckSlugForPassPack } from "@/lib/mock-exams/pass-pack-for-deck";

type DeckRelatedDecksProps = {
  deck: Deck;
};

export function DeckRelatedDecks({ deck }: DeckRelatedDecksProps) {
  const family = getExamFamilyForDeck(deck.slug);
  const familyLinks = getRelatedForDeck(deck.slug);
  const categoryFallback =
    familyLinks.length < 4
      ? getRelatedDecks(deck, 6).map((relatedDeck) => ({
          href: `/decks/${relatedDeck.slug}`,
          anchor: relatedDeck.title,
          relation: relatedDeck.subtitle,
        }))
      : [];

  const seen = new Set(familyLinks.map((link) => link.href));
  for (const link of categoryFallback) {
    if (familyLinks.length >= 6) {
      break;
    }
    if (!seen.has(link.href)) {
      seen.add(link.href);
      familyLinks.push(link);
    }
  }

  if (familyLinks.length === 0) {
    return null;
  }

  const hubLink = getFamilyHubLinkForDeck(deck.slug);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">
        Related exams in this path
        {family ? (
          <span className="mt-1 block text-base font-normal text-[#5f5749]">{family.label}</span>
        ) : (
          <span className="mt-1 block text-base font-normal text-[#5f5749]">
            {categoryLabels[deck.category]} prep
          </span>
        )}
      </h2>
      <ul className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
        {familyLinks.map((link) => (
          <li key={link.href}>
            <Link
              className="block px-5 py-4 transition hover:bg-[#fffaf0]"
              href={link.href}
            >
              <p className="font-medium text-[#18140f]">{link.anchor}</p>
              {link.relation ? (
                <p className="mt-1 text-sm leading-6 text-[#5f5749]">{link.relation}</p>
              ) : null}
              {link.href.startsWith("/decks/") &&
              feederDeckSlugForPassPack(link.href.replace("/decks/", "")) &&
              feederDeckSlugForPassPack(link.href.replace("/decks/", "")) !== deck.slug ? (
                <p className="mt-1 text-xs font-medium leading-5 text-[#7a6e5a]">
                  Different exam — not this product.
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      {hubLink ? (
        <Link
          className="mt-4 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
          href={hubLink.href}
        >
          {hubLink.anchor}
        </Link>
      ) : (
        <Link
          className="mt-4 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
          href={`/#catalog-${deck.category}`}
        >
          Browse all {categoryLabels[deck.category].toLowerCase()} products
        </Link>
      )}
    </section>
  );
}
