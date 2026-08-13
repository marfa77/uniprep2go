#!/usr/bin/env node
/**
 * Build wave-deck-specs.json from planned mock→deck pairs (wave1–4 + citizenship planned).
 * Skips decks already buyable / in building Gumroad catalog / citizenship bundle cannibalization.
 *
 * Usage:
 *   node scripts/generate-wave-deck-specs.mjs
 *   node scripts/generate-wave-deck-specs.mjs --sync-anki-generator
 */

import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "src/data/wave-deck-specs.json");
const BUILDING_CATALOG = join(root, "src/data/gumroad/building-anki-decks.json");
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() || join(dirname(root), "Anki Generator");

const BUNDLE_COUNTRY_DECKS = new Set([
  "citizenship-naturalization-anki-bundle",
  // Bundle countries already sold as .apkg inside the $20 pack — do not create twin SKUs.
]);

const SKIP_DECK_SLUGS = new Set([
  "life-health-insurance-anki-deck", // funnel redirected to life-and-health-insurance-exam-anki-deck
]);

function filePrefixFromSlug(deckSlug) {
  return deckSlug
    .replace(/-anki-deck$/, "")
    .replace(/-exam$/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("_");
}

function tagPrefixFromSlug(deckSlug) {
  return deckSlug
    .replace(/-anki-deck$/, "")
    .replace(/[^a-z0-9]+/gi, "")
    .slice(0, 24)
    .toLowerCase();
}

function cohortFor(mockSlug, deckSlug) {
  if (
    /series-|sie-|cfp-|mortgage-|frm-|cfa-|enrolled-agent|life-and-health|property-casualty|life-health/.test(
      `${mockSlug} ${deckSlug}`,
    )
  ) {
    return "money";
  }
  if (/real-estate/.test(`${mockSlug} ${deckSlug}`)) {
    return "state-re";
  }
  if (/cdl-|nha-|nremt-|nclex-|nasm-|cna-|cpt-|phlebotomy|mblex|cpc|cst|vtne|dialysis|bls|paramedic/.test(
    `${mockSlug} ${deckSlug}`,
  )) {
    return "health-cdl";
  }
  return "other";
}

function bankCardCount(mockSlug) {
  const path = join(root, "src/data/mock-exams", `${mockSlug}.json`);
  if (!existsSync(path)) return 60;
  const data = JSON.parse(readFileSync(path, "utf8"));
  return Array.isArray(data) ? data.length : 60;
}

async function main() {
  const syncAnki = process.argv.includes("--sync-anki-generator");
  const { getAllMockExams } = await import("../src/lib/mock-exams/configs.ts");
  const { getDeckBySlug } = await import("../src/lib/decks.ts");

  const building = JSON.parse(readFileSync(BUILDING_CATALOG, "utf8"));
  const buildingSlugs = new Set(Object.keys(building.products || {}));

  const specs = {};
  for (const mock of getAllMockExams()) {
    const deckSlug = mock.linkedDeckSlug;
    if (!deckSlug || SKIP_DECK_SLUGS.has(deckSlug) || BUNDLE_COUNTRY_DECKS.has(deckSlug)) {
      continue;
    }
    if (buildingSlugs.has(deckSlug)) continue;

    const deck = getDeckBySlug(deckSlug);
    if (!deck) continue;
    // Only planned waitlist decks (buyable already have checkout).
    if (deck.status !== "planned") continue;

    const topics = Object.fromEntries(mock.topics.map((t) => [t.id, t.label]));
    const cardCount = bankCardCount(mock.slug);
    const short = mock.shortTitle;
    specs[deckSlug] = {
      deckSlug,
      mockSlug: mock.slug,
      permalink: deckSlug,
      gumroadName: `${short} Anki Deck — ${cardCount} Flashcards`,
      filePrefix: filePrefixFromSlug(deckSlug),
      deckName: short,
      deckLabel: short,
      tagPrefix: tagPrefixFromSlug(deckSlug),
      shortTitle: short,
      mockTitle: mock.title,
      cardCount,
      cohort: cohortFor(mock.slug, deckSlug),
      topics,
      disclaimerOrg: short,
    };
  }

  // Keep specs for decks that already launched (this generator skips available SKUs).
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
  for (const [slug, spec] of Object.entries(previous)) {
    if (!specs[slug]) {
      specs[slug] = spec;
    }
  }

  writeFileSync(OUT, `${JSON.stringify(specs, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(specs).length} specs → ${OUT}`);

  const byCohort = {};
  for (const spec of Object.values(specs)) {
    byCohort[spec.cohort] = (byCohort[spec.cohort] || 0) + 1;
  }
  console.log("Cohorts:", byCohort);

  if (syncAnki) {
    const destDir = join(ANKI_GENERATOR_ROOT, "internal_deck_generator");
    if (!existsSync(destDir)) {
      throw new Error(`Anki Generator not found at ${ANKI_GENERATOR_ROOT}`);
    }
    const dest = join(destDir, "wave_deck_specs.json");
    copyFileSync(OUT, dest);
    console.log(`Synced → ${dest}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
