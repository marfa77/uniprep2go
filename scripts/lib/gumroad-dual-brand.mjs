/**
 * Shared Gumroad copy helpers so language products work for:
 * - direct Gumroad discovery (PixID Studio store)
 * - Prep2Go (prep2go.study)
 * - UniPrep2Go (uniprep2go.study)
 */

const PREP2GO_ORIGIN = "https://www.prep2go.study";
const UNIPREP_ORIGIN = "https://uniprep2go.study";

/**
 * Prep2Go shop landing paths (from Prep2Go `SHOP_DECK_LANDING_ROUTES`).
 * Exam decks: `/shop/{segment}`; other decks: `/shop/deck/{segment}`.
 * @type {Record<string, string>}
 */
export const PREP2GO_SHOP_PATH_BY_UNIPREP_SLUG = {
  "ciple-a2-european-portuguese-anki-deck": "/shop/ciple-a2-anki-deck",
  "delf-b2-french-anki-deck": "/shop/delf-a2-anki-deck",
  "dutch-a2-inburgering-anki-deck": "/shop/deck/inburgering-a2-anki-deck",
  "german-a2-anki-deck": "/shop/deck/goethe-telc-osd-anki-deck",
  "celi-b1-italian-anki-deck": "/shop/celi-a2-anki-deck",
  "danish-a2-prove-i-dansk-anki-deck": "/shop/deck/danish-prove-i-dansk-anki-deck",
  "norwegian-a2-norskprove-anki-deck": "/shop/deck/norwegian-norskprove-anki-deck",
  "swedish-a2-sfi-anki-deck": "/shop/deck/swedish-sfi-anki-deck",
  "greek-a2-ellinomatheia-anki-deck": "/shop/deck/greek-ellinomatheia-anki-deck",
  "czech-a2-cce-anki-deck": "/shop/deck/czech-cce-anki-deck",
  "dele-a2-spanish-anki-deck": "/shop/dele-a2-anki-deck",
  "dele-a2-ccse-spanish-citizenship-bundle": "/shop/dele-a2-anki-deck",
  "ielts-toefl-english-for-french-speakers-anki-deck":
    "/shop/deck/english-for-french-speakers-anki-deck",
  "ielts-toefl-english-for-arabic-speakers-anki-deck":
    "/shop/deck/english-for-arabic-speakers-anki-deck",
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck":
    "/shop/deck/english-for-ukrainian-speakers-anki-deck",
  "ielts-toefl-english-for-russian-speakers-anki-deck":
    "/shop/deck/english-for-russian-speakers-anki-deck",
  "ielts-toefl-english-for-spanish-speakers-anki-deck":
    "/shop/deck/english-for-spanish-speakers-anki-deck",
  "ielts-toefl-english-for-portuguese-speakers-anki-deck":
    "/shop/deck/english-for-portuguese-speakers-anki-deck",
  "citizenship-naturalization-anki-bundle":
    "/shop/deck/citizenship-naturalization-anki-bundle",
  "delf-prim-printable-french-flashcards": "/shop/deck/delf-prim-printable-flashcards",
};

export function uniprepDeckUrl(slug) {
  return `${UNIPREP_ORIGIN}/decks/${slug}`;
}

export function prep2goShopUrl(slug) {
  const path = PREP2GO_SHOP_PATH_BY_UNIPREP_SLUG[slug];
  return path ? `${PREP2GO_ORIGIN}${path}` : null;
}

/**
 * Closing block for Gumroad HTML descriptions — works for store search and both sites.
 * @param {string} slug
 */
export function dualBrandFooterHtml(slug) {
  const uni = uniprepDeckUrl(slug);
  const prep = prep2goShopUrl(slug);
  const links = [
    prep
      ? `<a href="${prep}">Prep2Go shop page</a>`
      : null,
    `<a href="${uni}">UniPrep2Go product page</a>`,
  ]
    .filter(Boolean)
    .join(" · ");

  return [
    `<p><strong>Sold by PixID Studio</strong> on Gumroad — the same Anki bank used across <strong>Prep2Go</strong> and <strong>UniPrep2Go</strong>.</p>`,
    `<p>Learn more: ${links}</p>`,
  ].join("");
}

/**
 * @param {{
 *   examLeadHtml: string;
 *   bodyHtml: string[];
 *   deliveryHtml?: string;
 *   disclaimerHtml: string;
 *   slug: string;
 * }} opts
 */
export function buildUniversalLanguageDescription(opts) {
  const {
    examLeadHtml,
    bodyHtml,
    deliveryHtml = "<p><strong>Delivery:</strong> Instant .apkg download — import into Anki desktop, then sync to mobile via AnkiWeb.</p>",
    disclaimerHtml,
    slug,
  } = opts;

  return [
    examLeadHtml,
    ...bodyHtml,
    deliveryHtml,
    dualBrandFooterHtml(slug),
    disclaimerHtml,
  ].join("");
}
