/**
 * Language-exam Anki decks retired from UniPrep2Go — sold only on Prep2Go now.
 *
 * Imported by `next.config.ts` (301 redirects), so keep this file free of `@/` aliases
 * and app-only imports.
 */

export const PREP2GO_SHOP_URL = "https://www.prep2go.study/shop";

export const RETIRED_LANGUAGE_DECK_REDIRECTS = {
  "ciple-a2-european-portuguese-anki-deck": "https://www.prep2go.study/shop/ciple-a2-anki-deck",
  "ciple-a2-for-russian-speakers-anki-deck": "https://www.prep2go.study/shop/ciple-a2-anki-deck",
  "dele-a2-spanish-anki-deck": "https://www.prep2go.study/shop/dele-a2-anki-deck",
  "dele-a2-ccse-spanish-citizenship-bundle": "https://www.prep2go.study/shop/dele-a2-anki-deck",
  "delf-b2-french-anki-deck": "https://www.prep2go.study/shop/delf-a2-anki-deck",
  "celi-b1-italian-anki-deck": "https://www.prep2go.study/shop/celi-a2-anki-deck",
  "german-a2-anki-deck": "https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck",
  "german-a2-for-ukrainian-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck",
  "german-a2-for-russian-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/goethe-telc-osd-anki-deck",
  "dutch-a2-inburgering-anki-deck": "https://www.prep2go.study/shop/deck/inburgering-a2-anki-deck",
  "danish-a2-prove-i-dansk-anki-deck":
    "https://www.prep2go.study/shop/deck/danish-prove-i-dansk-anki-deck",
  "norwegian-a2-norskprove-anki-deck":
    "https://www.prep2go.study/shop/deck/norwegian-norskprove-anki-deck",
  "swedish-a2-sfi-anki-deck": "https://www.prep2go.study/shop/deck/swedish-sfi-anki-deck",
  "greek-a2-ellinomatheia-anki-deck":
    "https://www.prep2go.study/shop/deck/greek-ellinomatheia-anki-deck",
  "czech-a2-cce-anki-deck": "https://www.prep2go.study/shop/deck/czech-cce-anki-deck",
  "polish-a2-certyfikat-anki-deck":
    "https://www.prep2go.study/shop/deck/polish-a2-certyfikat-anki-deck",
  "polish-a2-for-ukrainian-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/polish-a2-for-ukrainian-speakers-anki-deck",
  "ielts-toefl-english-for-french-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-french-speakers-anki-deck",
  "ielts-toefl-english-for-spanish-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-spanish-speakers-anki-deck",
  "ielts-toefl-english-for-portuguese-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-portuguese-speakers-anki-deck",
  "ielts-toefl-english-for-arabic-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-arabic-speakers-anki-deck",
  "ielts-toefl-english-for-turkish-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-turkish-speakers-anki-deck",
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-ukrainian-speakers-anki-deck",
  "ielts-toefl-english-for-russian-speakers-anki-deck":
    "https://www.prep2go.study/shop/deck/english-for-russian-speakers-anki-deck",
  "ciple-a2-grammar-anki-deck": "https://www.prep2go.study/shop/deck/ciple-a2-grammar-anki-deck",
  "dele-a2-grammar-anki-deck": "https://www.prep2go.study/shop/deck/dele-a2-grammar-anki-deck",
  "delf-b2-grammar-anki-deck": "https://www.prep2go.study/shop/deck/delf-b2-grammar-anki-deck",
  "delf-a2-printable-french-flashcards":
    "https://www.prep2go.study/shop/deck/delf-a2-printable-flashcards",
} as const satisfies Record<string, string>;

export type RetiredLanguageDeckSlug = keyof typeof RETIRED_LANGUAGE_DECK_REDIRECTS;

export const RETIRED_LANGUAGE_DECK_SLUGS = Object.keys(
  RETIRED_LANGUAGE_DECK_REDIRECTS,
) as RetiredLanguageDeckSlug[];

const retiredSlugSet = new Set<string>(RETIRED_LANGUAGE_DECK_SLUGS);

export function isRetiredLanguageDeckSlug(slug: string): slug is RetiredLanguageDeckSlug {
  return retiredSlugSet.has(slug);
}

/** Prep2Go landing for a retired UniPrep language deck slug, or `undefined` if the slug is still ours. */
export function getRetiredLanguageDeckRedirect(slug: string): string | undefined {
  return isRetiredLanguageDeckSlug(slug) ? RETIRED_LANGUAGE_DECK_REDIRECTS[slug] : undefined;
}

/** One-line pointer for llms.txt and catalog pages. */
export const RETIRED_LANGUAGE_DECKS_NOTE =
  "Language-exam Anki decks (CIPLE, DELE, DELF, CELI, DTZ, Inburgering, Scandinavian, Greek, Czech, Polish, English-for-X) are sold on Prep2Go";

/** Per-deck URLs on UniPrep2Go that must 301 to the matching Prep2Go landing. */
export function buildRetiredLanguageDeckRedirects(): Array<{
  source: string;
  destination: string;
  statusCode: 301;
}> {
  return RETIRED_LANGUAGE_DECK_SLUGS.flatMap((slug) => {
    const destination = RETIRED_LANGUAGE_DECK_REDIRECTS[slug];
    return [
      { source: `/decks/${slug}`, destination, statusCode: 301 as const },
      { source: `/${slug}.md`, destination, statusCode: 301 as const },
    ];
  });
}
