#!/usr/bin/env node
/**
 * Create Gumroad products for building/readiness Anki decks and update catalog JSON.
 *
 * Usage:
 *   node scripts/setup-gumroad-building-decks.mjs --dry-run
 *   node scripts/setup-gumroad-building-decks.mjs
 *   node scripts/setup-gumroad-building-decks.mjs --slug hvac-epa-608-anki-deck
 *
 * Env: GUMROAD_ACCESS_TOKEN — or `gumroad auth token` CLI (Finance decks pattern)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/building-anki-decks.json");

const PRODUCT_CREATE_DELAY_MS = Number(process.env.GUMROAD_CREATE_DELAY_MS ?? 5000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveGumroadToken() {
  const envToken = process.env.GUMROAD_ACCESS_TOKEN?.trim();
  if (envToken) {
    return envToken;
  }

  try {
    return execSync("gumroad auth token", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}
function parseArgs(argv) {
  const args = { slug: null, dryRun: false, force: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--slug") args.slug = argv[++i];
  }
  return args;
}

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const lines = readFileSync(join(root, file), "utf8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // optional env files
    }
  }
}

async function loadDeckMeta() {
  const configs = await import("../src/lib/mock-exams/configs.ts");
  const titles = {
    "hvac-epa-608-anki-deck": "HVAC EPA 608 Anki Deck — 200+ Flashcards",
    "bms-building-automation-anki-deck": "BMS Building Automation Anki Deck — 200+ Flashcards",
    "leed-green-associate-anki-deck": "LEED Green Associate Anki Deck — 250+ Flashcards",
    "leed-ap-bd-c-anki-deck": "LEED AP BD+C Anki Deck — 250+ Flashcards",
    "well-ap-anki-deck": "WELL AP Anki Deck — 250+ Flashcards",
    "cem-anki-deck": "CEM Anki Deck — 250+ Flashcards",
    "ashrae-certifications-anki-deck": "ASHRAE Certifications Anki Deck — 250+ Flashcards",
    "cdcp-anki-deck": "CDCP Anki Deck — 250+ Flashcards",
    "nebosh-anki-deck": "NEBOSH IGC Anki Deck — 250+ Flashcards",
    "cfps-anki-deck": "CFPS Anki Deck — 400+ Flashcards",
    "mrics-anki-deck": "MRICS / APC Anki Deck — 250+ Flashcards",
    "mrics-quantity-surveying-anki-deck": "MRICS Quantity Surveying Anki Deck — 250+ Flashcards",
    "gmat-focus-anki-deck": "GMAT Focus Anki Deck — 200+ Flashcards",
  };
  return { getAllMockExams: configs.getAllMockExams, titles };
}

function buildProductDescription({ title, mockPath }) {
  return [
    `${title} — independent UniPrep2Go Anki deck for active recall.`,
    mockPath
      ? `Built from the same validated item bank as the free readiness check: ${mockPath}`
      : "Pairs with the free UniPrep2Go readiness check on uniprep2go.study.",
    "",
    "DELIVERY: Complete checkout now. Your Gumroad receipt is issued immediately.",
    "The Anki .apkg download link activates in your Gumroad library after the deck file is exported from the validated bank.",
    "",
    "Independent study aid — not official exam material.",
  ].join("\n");
}

async function createGumroadProduct({ token, name, priceCents, description, permalink }) {
  const body = new URLSearchParams({
    access_token: token,
    name,
    price: String(priceCents),
    description,
    custom_permalink: permalink,
    require_shipping: "false",
    is_tiered_membership: "false",
  });

  const response = await fetch("https://api.gumroad.com/v2/products", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(
      `Gumroad create failed (${permalink}): ${JSON.stringify(payload).slice(0, 400)}`,
    );
  }

  return payload.product;
}

async function main() {
  const args = parseArgs(process.argv);
  loadEnv();
  const token = resolveGumroadToken();
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const { getAllMockExams, titles } = await loadDeckMeta();

  const slugs = args.slug
    ? [args.slug]
    : Object.keys(catalog.products).filter((slug) => {
        if (args.force) return true;
        return !catalog.products[slug].gumroadProductId;
      });

  if (slugs.length === 0) {
    console.log("All building deck Gumroad products already linked. Use --force to recreate.");
    return;
  }

  console.log(
    `${args.dryRun ? "Dry-run" : "Create"} ${slugs.length} Gumroad product(s) @ $${(catalog.defaultPriceCents / 100).toFixed(2)}`,
  );

  for (const slug of slugs) {
    const record = catalog.products[slug];
    if (!record) {
      throw new Error(`Unknown slug in catalog: ${slug}`);
    }

    const name = titles[slug] ?? slug;
    const mock = getAllMockExams().find((entry) => entry.linkedDeckSlug === slug);
    const mockPath = mock ? `https://uniprep2go.study/mock-exams/${mock.slug}` : null;
    const description = buildProductDescription({ title: name, mockPath });
    const permalink = record.permalink ?? slug;

    console.log(`→ ${slug}`);
    console.log(`  permalink: ${permalink}`);
    console.log(`  name: ${name}`);

    if (args.dryRun) {
      continue;
    }

    if (!token) {
      throw new Error(
        "Set GUMROAD_ACCESS_TOKEN in .env.local or run `gumroad login` (Finance decks uses `gumroad auth token`)",
      );
    }

    try {
      const product = await createGumroadProduct({
        token,
        name,
        priceCents: catalog.defaultPriceCents,
        description,
        permalink,
      });

      catalog.products[slug] = {
        ...record,
        permalink: product.custom_permalink ?? permalink,
        gumroadProductId: product.id,
        shortUrl: product.short_url,
        createdAt: new Date().toISOString(),
      };

      console.log(`  created: ${product.short_url} (${product.id})`);
      if (slugs.indexOf(slug) < slugs.length - 1) {
        await sleep(PRODUCT_CREATE_DELAY_MS);
      }
    } catch (error) {
      if (/already exists|permalink/i.test(error.message)) {
        console.warn(`  warn ${slug}: ${error.message.slice(0, 120)}`);
      } else {
        throw error;
      }
    }
  }

  if (!args.dryRun) {
    writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`\nUpdated ${CATALOG_PATH}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
