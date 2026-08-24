#!/usr/bin/env node
/**
 * Backfill Gumroad Discover category + tags on live wave/language SKUs.
 * Does not rewrite name, description, or files.
 *
 *   node scripts/tag-gumroad-discover.mjs
 *   node scripts/tag-gumroad-discover.mjs --dry-run
 *   node scripts/tag-gumroad-discover.mjs --slug ace-cpt-anki-deck
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";
import { gumroadDiscoverFields } from "./lib/gumroad-discover.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const WAVE_CATALOG = join(root, "src/data/gumroad/wave-anki-decks.json");
const LANGUAGE_CATALOG = join(root, "src/data/gumroad/language-anki-decks.json");
const WAVE_SPECS = join(root, "src/data/wave-deck-specs.json");
const DELAY_MS = Number(process.env.GUMROAD_DISCOVER_DELAY_MS ?? 400);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = { dryRun: false, slugs: [] };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--slug") continue;
    else if (arg.startsWith("--slug=")) args.slugs.push(arg.slice("--slug=".length));
    else if (!arg.startsWith("-")) args.slugs.push(arg);
  }
  return args;
}

function collectTargets(onlySlugs) {
  const waveCatalog = JSON.parse(readFileSync(WAVE_CATALOG, "utf8"));
  const languageCatalog = JSON.parse(readFileSync(LANGUAGE_CATALOG, "utf8"));
  const waveSpecs = JSON.parse(readFileSync(WAVE_SPECS, "utf8"));
  const seen = new Set();
  const targets = [];

  const push = (kind, slug, record, spec) => {
    const productId = record?.gumroadProductId;
    if (!productId) return;
    if (onlySlugs.length && !onlySlugs.includes(slug)) return;
    if (seen.has(productId)) return;
    seen.add(productId);
    targets.push({
      kind,
      slug,
      productId,
      fields: gumroadDiscoverFields({
        slug,
        tagPrefix: spec?.tagPrefix,
        deckLabel: spec?.deckLabel,
        shortTitle: spec?.shortTitle,
        name: spec?.gumroadName || spec?.name,
      }),
    });
  };

  for (const [slug, record] of Object.entries(waveCatalog.products || {})) {
    push("wave", slug, record, waveSpecs[slug]);
  }
  for (const [slug, record] of Object.entries(languageCatalog.products || {})) {
    push("language", slug, record, waveSpecs[slug] || null);
  }
  return targets;
}

async function putDiscover(token, productId, fields) {
  const response = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(JSON.stringify(payload).slice(0, 220));
  }
  return payload.product;
}

async function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  const targets = collectTargets(args.slugs);
  if (targets.length === 0) {
    console.log("No live wave/language Gumroad products to tag.");
    return;
  }

  console.log(
    `${args.dryRun ? "Dry-run" : "Tagging"} ${targets.length} live wave/language product(s) → education/test-prep`,
  );

  if (args.dryRun) {
    for (const row of targets) {
      console.log(`SKIP  ${row.kind.padEnd(8)} ${row.slug}  tags=${JSON.stringify(row.fields.tags)}`);
    }
    return;
  }

  const { token } = ensureGumroadAccessToken({ persist: true });
  if (!token) {
    throw new Error(
      "Gumroad token not found. Run `gumroad login` or set GUMROAD_ACCESS_TOKEN.",
    );
  }
  let ok = 0;
  let failed = 0;
  for (const row of targets) {
    try {
      const product = await putDiscover(token, row.productId, row.fields);
      const category = product?.category ?? row.fields.category;
      const tags = product?.tags ?? row.fields.tags;
      console.log(`OK    ${row.kind.padEnd(8)} ${row.slug}  cat=${category}  tags=${JSON.stringify(tags)}`);
      ok += 1;
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`FAIL  ${row.kind.padEnd(8)} ${row.slug}: ${message}`);
    }
    await sleep(DELAY_MS);
  }
  console.log(`\nDone ok=${ok} failed=${failed}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
