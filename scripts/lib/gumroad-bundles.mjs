/**
 * Multi-file Gumroad bundles whose files are uploaded by setup-gumroad-language-decks.mjs.
 * They also have a wave spec (for the mock/landing), but their wave .apkg must never be
 * uploaded or swapped in: --replace-files would drop the paid DELE/CCSE files.
 */
export const BUNDLE_FILE_SLUGS = new Set(["dele-a2-ccse-spanish-citizenship-bundle"]);
