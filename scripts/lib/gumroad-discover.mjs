/**
 * Gumroad Discover taxonomy for Anki SKUs.
 *
 * Category + tags are required for Discover listing (along with ≥1 sale,
 * ratings, and the account $100 / risk-review gate). Building polish already
 * sets these; wave/language create historically left products in `other`.
 */

export const GUMROAD_TEST_PREP_CATEGORY = "education/test-prep";

const SKIP = new Set([
  "anki",
  "deck",
  "bundle",
  "check",
  "readiness",
  "flashcards",
  "for",
  "speakers",
  "the",
  "and",
  "of",
]);
const WEAK = new Set(["a1", "a2", "b1", "b2", "c1", "c2", "european"]);
const ALWAYS = ["anki", "flashcards", "test prep"];

function normalizeToken(raw) {
  return String(raw || "")
    .toLowerCase()
    .replace(/[—–/_-]+/g, " ")
    .replace(/[^\p{L}\p{N} +]/gu, "")
    .trim();
}

function isUsable(token, { allowWeak = true } = {}) {
  if (!token || token.length < 2 || token.length > 18) return false;
  if (SKIP.has(token) || ALWAYS.includes(token)) return false;
  if (!allowWeak && WEAK.has(token)) return false;
  return true;
}

function pushUnique(list, token, options) {
  const normalized = normalizeToken(token);
  if (!normalized) return;
  for (const part of normalized.split(/\s+/)) {
    if (!isUsable(part, options)) continue;
    if (list.includes(part)) continue;
    list.push(part.slice(0, 20));
  }
}

/**
 * @param {{
 *   slug: string;
 *   tagPrefix?: string;
 *   deckLabel?: string;
 *   shortTitle?: string;
 *   name?: string;
 * }} args
 * @returns {string[]}
 */
export function buildGumroadDiscoverTags({ slug, tagPrefix, deckLabel, shortTitle, name }) {
  const strong = [];
  const weak = [];

  if (tagPrefix && tagPrefix.length >= 2 && tagPrefix.length <= 18) {
    pushUnique(strong, tagPrefix, { allowWeak: true });
  }

  const label = deckLabel || shortTitle || "";
  if (label) {
    pushUnique(strong, label, { allowWeak: false });
    pushUnique(weak, label, { allowWeak: true });
  }

  if (name) {
    const trimmed = String(name)
      .replace(/\s*—\s*\d+\+?\s*Flashcards/i, "")
      .replace(/\s+Anki Deck.*$/i, "")
      .trim();
    pushUnique(strong, trimmed, { allowWeak: false });
    pushUnique(weak, trimmed, { allowWeak: true });
  }

  const stem = String(slug || "")
    .replace(/-anki-deck$/i, "")
    .replace(/-bundle$/i, "");
  for (const part of stem.split("-")) {
    pushUnique(isUsable(part, { allowWeak: false }) ? strong : weak, part, {
      allowWeak: true,
    });
  }

  const exam = [];
  for (const token of [...strong, ...weak]) {
    if (!exam.includes(token)) exam.push(token);
  }

  return [...exam.slice(0, 3), ...ALWAYS];
}

/**
 * @param {Parameters<typeof buildGumroadDiscoverTags>[0]} args
 */
export function gumroadDiscoverFields(args) {
  return {
    category: GUMROAD_TEST_PREP_CATEGORY,
    tags: buildGumroadDiscoverTags(args),
  };
}
