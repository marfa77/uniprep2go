#!/usr/bin/env node
/**
 * Generate deck cover + site hero WebP images from the UniPrep2Go blueprint template.
 * Pure SVG + Sharp — no AI illustrations. Small logo mark top-left on every cover.
 *
 * Usage:
 *   node scripts/generate-deck-covers.mjs --slug hvac-epa-608-anki-deck
 *   node scripts/generate-deck-covers.mjs --all-missing
 *   node scripts/generate-deck-covers.mjs --all-missing --force
 *   node scripts/generate-deck-covers.mjs --hero
 *   node scripts/generate-deck-covers.mjs --gumroad-thumbnails --all-building --force
 *   node scripts/generate-deck-covers.mjs --gumroad-thumbnails --slug gmat-focus-anki-deck
 */

import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  COVER_HEIGHT,
  COVER_WIDTH,
  HERO_HEIGHT,
  HERO_WIDTH,
  writeCoverWebp,
  writeSquareThumbnailJpg,
  GUMROAD_THUMB_SIZE,
} from "./lib/cover-blueprint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const COVERS_DIR = join(root, "public/covers");
const GUMROAD_THUMBS_DIR = join(root, "public/gumroad-thumbnails");
const HERO_PATH = join(root, "public/home/hero.webp");

/** @type {Record<string, { title: string; subtitle: string; badge?: string; panelKind: string }>} */
const DECK_CONFIGS = {
  "hvac-epa-608-anki-deck": {
    title: "HVAC EPA 608 Anki Deck",
    subtitle: "Refrigerant certification flashcards",
    monogram: "608",
    panelKind: "hvac",
  },
  "leed-green-associate-anki-deck": {
    title: "LEED Green Associate Anki Deck",
    subtitle: "Sustainability and green building flashcards",
    monogram: "LEED GA",
    panelKind: "building",
  },
  "leed-ap-om-anki-deck": {
    title: "LEED AP O+M\nAnki Deck",
    subtitle: "Existing building operations flashcards",
    monogram: "O+M",
    panelKind: "building",
  },
  "leed-ap-bd-c-anki-deck": {
    title: "LEED AP BD+C\nAnki Deck",
    subtitle: "Building design + construction specialty flashcards",
    panelKind: "building",
  },
  "well-ap-anki-deck": {
    title: "WELL AP\nAnki Deck",
    subtitle: "WELL Building Standard flashcards",
    panelKind: "building",
  },
  "cem-anki-deck": {
    title: "CEM Anki Deck",
    subtitle: "Certified Energy Manager exam flashcards",
    panelKind: "building",
  },
  "ashrae-certifications-anki-deck": {
    title: "ASHRAE\nCertifications Anki Deck",
    subtitle: "HVAC design and standards flashcards",
    monogram: "ASHRAE",
    panelKind: "hvac",
  },
  "cdcp-anki-deck": {
    title: "CDCP Anki Deck",
    subtitle: "Certified Data Centre Professional flashcards",
    monogram: "CDCP",
    panelKind: "datacenter",
  },
  "nebosh-anki-deck": {
    title: "NEBOSH Anki Deck",
    subtitle: "Occupational health and safety flashcards",
    monogram: "NEBOSH",
    panelKind: "safety",
  },
  "cfps-anki-deck": {
    title: "CFPS Anki Deck",
    subtitle: "Certified Fire Protection Specialist flashcards",
    monogram: "CFPS",
    panelKind: "safety",
  },
  "bms-building-automation-anki-deck": {
    title: "BMS Building\nAutomation Anki Deck",
    subtitle: "BAS controls and BACnet flashcards",
    panelKind: "hvac",
  },
  "mrics-anki-deck": {
    title: "MRICS Anki Deck",
    subtitle: "Chartered surveyor assessment flashcards",
    monogram: "MRICS",
    panelKind: "survey",
  },
  "mrics-quantity-surveying-anki-deck": {
    title: "MRICS Quantity\nSurveying Anki Deck",
    subtitle: "QS pathway assessment flashcards",
    monogram: "MRICS\nQS",
    panelKind: "survey",
  },
  "gmat-focus-anki-deck": {
    title: "GMAT Focus\nAnki Deck",
    subtitle: "Business school admissions flashcards",
    monogram: "GMAT",
    panelKind: "finance",
  },
  "sat-anki-deck": {
    title: "Digital SAT\nAnki Deck",
    subtitle: "College admissions flashcards",
    monogram: "SAT",
    panelKind: "finance",
  },
  "pmp-anki-deck": {
    title: "PMP\nAnki Deck",
    subtitle: "Project management certification flashcards",
    monogram: "PMP",
    panelKind: "finance",
  },
  "gre-anki-deck": {
    title: "GRE General\nAnki Deck",
    subtitle: "Graduate admissions flashcards",
    monogram: "GRE",
    panelKind: "finance",
  },
};

const HERO_CONFIG = {
  width: HERO_WIDTH,
  height: HERO_HEIGHT,
  title: "Free online\npractice tests",
  subtitle: "US licensing, finance, and building exam prep",
  badge: "Practice tests",
  monogram: "FREE\nMOCK",
  panelKind: "hero",
  panelLeft: Math.round(HERO_WIDTH * 0.54),
};

function inferPanelKind(slug, category) {
  if (/hvac|epa|ashrae|bms|refriger|automation/i.test(slug)) return "hvac";
  if (/leed|well|cem|building|energy|mrics|cdcp/i.test(slug)) return "building";
  if (/cfps|nebosh|servsafe|safety|fire/i.test(slug)) return "safety";
  if (/cfa|frm|sie|series|finra|gmat|sat|finance|insurance|bench-energy|trader|commodity/i.test(slug)) {
    return "finance";
  }
  if (category === "language" || category === "immigration") return "language";
  if (category === "finance") return "finance";
  if (category === "professional") return "building";
  return "study";
}

function deckTitleForCover(title) {
  const words = title.split(/\s+/);
  if (words.length <= 4) return title;
  const mid = Math.ceil(words.length / 2);
  return `${words.slice(0, mid).join(" ")}\n${words.slice(mid).join(" ")}`;
}

function deckSubtitleForCover(deck) {
  const raw = deck.subtitle ?? "Independent exam prep flashcards";
  return raw
    .replace(/^A (concise|focused|planned|printable|spaced-repetition) /i, "")
    .replace(/^Anki deck for /i, "")
    .replace(/\.$/, "")
    .slice(0, 64);
}

async function loadCatalogDeckConfigs() {
  const decksSource = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  /** @type {Record<string, { title: string; subtitle: string; badge?: string; panelKind: string }>} */
  const configs = {};

  const deckBlocks = decksSource.split(/\n  \{\n    slug: "/).slice(1);
  for (const block of deckBlocks) {
    const slug = block.match(/^([^"]+)"/)?.[1];
    if (!slug) continue;

    const coverMatch = block.match(/coverImage:\s*"\/covers\/([^"]+\.webp)"/);
    if (!coverMatch) continue;

    const coverSlug = coverMatch[1].replace(/\.webp$/, "");
    const title = block.match(/title:\s*"([^"]+)"/)?.[1] ?? slug;
    const shortName = block.match(/shortName:\s*"([^"]+)"/)?.[1];
    const subtitle =
      block.match(/subtitle:\s*\n?\s*"([^"]+)"/)?.[1] ??
      block.match(/subtitle:\s*"([^"]+)"/)?.[1] ??
      "Independent exam prep flashcards";
    const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? "professional";
    const format = block.match(/format:\s*"([^"]+)"/)?.[1] ?? ".apkg";
    const cards = block.match(/cards:\s*"([^"]+)"/)?.[1];

    // Language decks keep Prep2Go / Lemon Squeezy product art — do not overwrite with blueprint covers.
    if (category === "language") continue;

    configs[coverSlug] = {
      title: deckTitleForCover(shortName ?? title),
      subtitle: deckSubtitleForCover({ subtitle, facts: { cards } }),
      monogram: shortName ?? undefined,
      badge: format === "PDF" ? "Printable PDF" : "Anki Deck",
      panelKind: inferPanelKind(slug, category),
    };
  }

  return configs;
}

function parseArgs(argv) {
  const args = {
    slug: null,
    allMissing: false,
    catalog: false,
    dryRun: false,
    force: false,
    hero: false,
    gumroadThumbnails: false,
    allBuilding: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all-missing") args.allMissing = true;
    else if (arg === "--catalog") args.catalog = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--hero") args.hero = true;
    else if (arg === "--gumroad-thumbnails") args.gumroadThumbnails = true;
    else if (arg === "--all-building") args.allBuilding = true;
    else if (arg === "--slug") args.slug = argv[++i];
  }
  return args;
}

async function generateDeckCover(slug, config, { dryRun = false, force = false } = {}) {
  const outPath = join(COVERS_DIR, `${slug}.webp`);
  if (existsSync(outPath) && !force) {
    console.log(`  skip ${slug} — cover exists (use --force)`);
    return { slug, skipped: true };
  }

  console.log(`→ ${slug}`);
  if (dryRun) {
    console.log(`  dry-run: ${outPath} [${config.panelKind}]`);
    return { slug, dryRun: true };
  }

  const { bytes, quality } = await writeCoverWebp(outPath, {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    title: config.title,
    subtitle: config.subtitle,
    badge: config.badge ?? "Anki Deck",
    panelKind: config.panelKind,
    monogram: config.monogram,
  });

  console.log(`  saved ${outPath} (${Math.round(bytes / 1024)} KB, q=${quality})`);
  return { slug, outPath, bytes, quality };
}

async function generateSiteHero({ dryRun = false, force = false } = {}) {
  if (existsSync(HERO_PATH) && !force) {
    console.log("  skip hero — exists (use --force)");
    return { skipped: true };
  }

  console.log("→ site hero");
  if (dryRun) {
    console.log(`  dry-run: ${HERO_PATH}`);
    return { dryRun: true };
  }

  const { bytes, quality } = await writeCoverWebp(HERO_PATH, {
    ...HERO_CONFIG,
    maxBytes: 120 * 1024,
  });

  console.log(`  saved ${HERO_PATH} (${Math.round(bytes / 1024)} KB, q=${quality})`);
  return { outPath: HERO_PATH, bytes, quality };
}

async function generateGumroadThumbnail(slug, config, { dryRun = false, force = false } = {}) {
  const outPath = join(GUMROAD_THUMBS_DIR, `${slug}.jpg`);
  if (existsSync(outPath) && !force) {
    console.log(`  skip ${slug} — Gumroad thumbnail exists (use --force)`);
    return { slug, skipped: true };
  }

  console.log(`→ ${slug} (Gumroad 1200×1200)`);
  if (dryRun) {
    console.log(`  dry-run: ${outPath} [${config.panelKind}]`);
    return { slug, dryRun: true };
  }

  const { bytes } = await writeSquareThumbnailJpg(outPath, {
    size: GUMROAD_THUMB_SIZE,
    title: config.title,
    subtitle: config.subtitle,
    badge: config.badge ?? "Anki Deck",
    panelKind: config.panelKind,
    monogram: config.monogram,
  });

  console.log(`  saved ${outPath} (${Math.round(bytes / 1024)} KB)`);
  return { slug, outPath, bytes };
}

const BUILDING_DECK_SLUGS = [
  "hvac-epa-608-anki-deck",
  "bms-building-automation-anki-deck",
  "leed-green-associate-anki-deck",
  "leed-ap-bd-c-anki-deck",
  "leed-ap-om-anki-deck",
  "well-ap-anki-deck",
  "cem-anki-deck",
  "ashrae-certifications-anki-deck",
  "cdcp-anki-deck",
  "nebosh-anki-deck",
  "cfps-anki-deck",
  "mrics-anki-deck",
  "mrics-quantity-surveying-anki-deck",
  "gmat-focus-anki-deck",
  "sat-anki-deck",
  "pmp-anki-deck",
  "gre-anki-deck",
];

function resolveSlugs(args, deckConfigs) {
  if (args.allBuilding) {
    return BUILDING_DECK_SLUGS.filter((slug) => deckConfigs[slug]);
  }

  if (args.slug) {
    if (!deckConfigs[args.slug]) {
      throw new Error(`Unknown slug: ${args.slug}. Known: ${Object.keys(deckConfigs).join(", ")}`);
    }
    return [args.slug];
  }

  if (args.allMissing || args.catalog) {
    const slugs = Object.keys(deckConfigs);
    return args.force
      ? slugs
      : slugs.filter((slug) => !existsSync(join(COVERS_DIR, `${slug}.webp`)));
  }

  return [];
}

async function main() {
  const args = parseArgs(process.argv);
  const deckConfigs = {
    ...(args.catalog || args.slug ? await loadCatalogDeckConfigs() : {}),
    ...DECK_CONFIGS,
  };
  const slugs = resolveSlugs(args, deckConfigs);

  if (!args.hero && slugs.length === 0 && !args.allMissing && !args.catalog && !args.slug && !args.gumroadThumbnails && !args.allBuilding) {
    throw new Error(
      "Pass --slug <slug>, --all-missing, --catalog, --all-building, --gumroad-thumbnails, and/or --hero",
    );
  }

  const results = [];

  if (args.hero) {
    results.push(await generateSiteHero(args));
  }

  if (slugs.length > 0 && args.gumroadThumbnails) {
    console.log(`Generating ${slugs.length} Gumroad square thumbnail(s)…\n`);
    for (const slug of slugs) {
      try {
        results.push(await generateGumroadThumbnail(slug, deckConfigs[slug], args));
      } catch (error) {
        console.error(`  ✗ ${slug}: ${error.message}`);
        results.push({ slug, error: error.message });
      }
    }
  } else if (slugs.length > 0) {
    console.log(`Generating ${slugs.length} blueprint cover(s)…\n`);
    for (const slug of slugs) {
      try {
        results.push(await generateDeckCover(slug, deckConfigs[slug], args));
      } catch (error) {
        console.error(`  ✗ ${slug}: ${error.message}`);
        results.push({ slug, error: error.message });
      }
    }
  }

  const failed = results.filter((r) => r.error);
  if (failed.length) {
    process.exitCode = 1;
    console.error(`\n${failed.length} failed.`);
  } else if (results.length) {
    console.log(`\nDone — ${results.length} image(s).`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
