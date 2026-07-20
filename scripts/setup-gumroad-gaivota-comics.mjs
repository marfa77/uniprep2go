#!/usr/bin/env node
/**
 * Create Gumroad product for Gaivota em Portugal paid comic episodes ($5).
 * Ep.01 stays free on the site — this product is for Ep.02+.
 *
 * Usage:
 *   node scripts/setup-gumroad-gaivota-comics.mjs --dry-run
 *   node scripts/setup-gumroad-gaivota-comics.mjs
 *   node scripts/setup-gumroad-gaivota-comics.mjs --force
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/gaivota-comics.json");

const PRODUCT = {
  permalink: "gaivota-em-portugal-comics",
  name: "Gaivota em Portugal — Portuguese History Comics ($5 / episode)",
  priceCents: 500,
};

function parseArgs(argv) {
  const args = { dryRun: false, force: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
  }
  return args;
}

function loadCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    return {
      storeBaseUrl: "https://pixidstudio.gumroad.com",
      defaultPriceCents: 500,
      products: {},
    };
  }
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function saveCatalog(catalog) {
  mkdirSync(dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

function buildDescription() {
  return [
    "<p><strong>Gaivota em Portugal</strong> — noir black-and-white Portuguese history comics. One historical event per episode. Adult cartoon style. 100 new Portuguese words + English glossary.</p>",
    "<p><strong>Free Episode 1</strong> (1755 Lisbon Earthquake / <em>O Terramoto</em>) is on UniPrep2Go — read it first:</p>",
    '<p><a href="https://uniprep2go.study/comics/gaivota-em-portugal/01-1755-earthquake">https://uniprep2go.study/comics/gaivota-em-portugal/01-1755-earthquake</a></p>',
    "<p><strong>This Gumroad product</strong> is for paid episodes at <strong>$5 each</strong>, starting with:</p>",
    "<ul>",
    "<li><strong>Ep.02 — 25 de Abril</strong> (Carnation Revolution, 1974) — next release</li>",
    "<li><strong>Ep.03 — Aljubarrota</strong> (1385) — following</li>",
    "</ul>",
    "<p>After purchase you receive the episode HTML/PDF pack when that issue ships. Buyers are notified when new episode files are uploaded.</p>",
    "<p>Series hub: <a href=\"https://uniprep2go.study/comics/gaivota-em-portugal\">uniprep2go.study/comics/gaivota-em-portugal</a></p>",
    "<p><em>Independent study aid — artistic interpretation of history. Not official exam material.</em></p>",
  ].join("\n");
}

async function createProduct(token, { dryRun }) {
  const body = new URLSearchParams({
    access_token: token,
    name: PRODUCT.name,
    price: String(PRODUCT.priceCents),
    description: buildDescription(),
    custom_permalink: PRODUCT.permalink,
    require_shipping: "false",
    is_tiered_membership: "false",
  });

  if (dryRun) {
    console.log("dry-run: would POST /v2/products", Object.fromEntries(body));
    return null;
  }

  const response = await fetch("https://api.gumroad.com/v2/products", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`Gumroad create failed: ${JSON.stringify(payload).slice(0, 500)}`);
  }
  return payload.product;
}

async function publishProduct(productId, { dryRun }) {
  if (dryRun) {
    console.log(`dry-run: would publish ${productId}`);
    return;
  }
  const { execSync } = await import("node:child_process");
  execSync(`gumroad products publish ${productId} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function main() {
  loadLocalEnvFiles();
  const args = parseArgs(process.argv);
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) {
    throw new Error("No Gumroad token. Run `gumroad login` or set GUMROAD_ACCESS_TOKEN.");
  }
  console.log(`gumroad auth: ${source}`);

  const catalog = loadCatalog();
  const existing = catalog.products?.[PRODUCT.permalink];
  if (existing?.gumroadProductId && !args.force) {
    console.log(
      `Already created: ${PRODUCT.permalink} → ${existing.shortUrl ?? existing.gumroadProductId}`,
    );
    console.log("Use --force to create another (not recommended).");
    return;
  }

  const product = await createProduct(token, args);
  if (!product) return;

  const shortUrl =
    product.short_url ||
    product.preview_url ||
    `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`;

  catalog.products = catalog.products ?? {};
  catalog.products[PRODUCT.permalink] = {
    permalink: PRODUCT.permalink,
    gumroadProductId: product.id,
    shortUrl,
    priceCents: PRODUCT.priceCents,
    createdAt: new Date().toISOString(),
    note: "Paid episodes Ep.02+; Ep.01 free on site",
  };
  saveCatalog(catalog);
  console.log(`created: ${shortUrl}`);
  console.log(`id: ${product.id}`);

  await publishProduct(product.id, args);
  catalog.products[PRODUCT.permalink].publishedAt = new Date().toISOString();
  saveCatalog(catalog);
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
