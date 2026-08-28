#!/usr/bin/env node
/**
 * Align live Gumroad list prices with src/data/catalog-list-prices.json overrides + defaults.
 *
 *   node scripts/sync-gumroad-catalog-prices.mjs --dry-run
 *   node scripts/sync-gumroad-catalog-prices.mjs --slug cfa-level-1-anki-deck
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
  resolveGumroadAccessToken,
} from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const listPrices = JSON.parse(readFileSync(join(root, "src/data/catalog-list-prices.json"), "utf8"));
const wave = JSON.parse(readFileSync(join(root, "src/data/gumroad/wave-anki-decks.json"), "utf8")).products;
const building = JSON.parse(readFileSync(join(root, "src/data/gumroad/building-anki-decks.json"), "utf8")).products;
const language = JSON.parse(readFileSync(join(root, "src/data/gumroad/language-anki-decks.json"), "utf8")).products;
const financePath = join(root, "src/data/gumroad/finance-anki-decks.json");
const finance = existsSync(financePath)
  ? JSON.parse(readFileSync(financePath, "utf8")).products
  : {};

function parseArgs(argv) {
  const args = { dryRun: false, slugs: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--slug") {
      if (!args.slugs) args.slugs = [];
      args.slugs.push(argv[++i]);
    }
  }
  return args;
}

function listAvailableDecks() {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?status:\s*"available"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return [...new Set(slugs)];
}

function deckBlock(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const idx = src.indexOf(`slug: "${slug}"`);
  if (idx < 0) return null;
  const chunk = src.slice(idx, idx + 12000);
  const checkoutUrl = (chunk.match(/checkoutUrl:\s*"([^"]+)"/) || [])[1];
  const provider = (chunk.match(/checkoutProvider:\s*"([^"]+)"/) || [])[1];
  const format = (chunk.match(/format:\s*"([^"]+)"/) || [])[1] || ".apkg";
  if (provider !== "Gumroad" || !checkoutUrl) return null;
  return { slug, checkoutUrl, format };
}

function targetUsd(slug, format) {
  if (listPrices.overrides[slug] !== undefined) return listPrices.overrides[slug];
  const fmt = format === "PDF" ? "PDF" : "apkg";
  return listPrices.defaults.Gumroad[fmt];
}

function permalinkFromCheckoutUrl(url) {
  const m = url.match(/gumroad\.com\/l\/([^/?]+)/i);
  return m?.[1] ?? null;
}

function gumroadView(idOrPermalink) {
  const raw = execSync(`gumroad products view ${idOrPermalink} --json --non-interactive`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const payload = JSON.parse(raw);
  if (payload.success === false) {
    throw new Error(payload.error?.message ?? "gumroad view failed");
  }
  return payload.product ?? payload;
}

async function findProductByPermalink(permalink) {
  const { token } = resolveGumroadAccessToken();
  if (!token) throw new Error("no Gumroad access token");
  const needle = permalink.toLowerCase();
  let pageKey = null;
  for (let page = 0; page < 40; page += 1) {
    const url = new URL("https://api.gumroad.com/v2/products");
    url.searchParams.set("access_token", token);
    if (pageKey) url.searchParams.set("page_key", pageKey);
    const res = await fetch(url);
    const payload = await res.json();
    if (!payload.success) {
      throw new Error(payload.message ?? "gumroad products list failed");
    }
    for (const product of payload.products ?? []) {
      const blob = `${product.short_url ?? ""} ${product.custom_permalink ?? ""} ${product.url ?? ""}`.toLowerCase();
      if (blob.includes(needle)) return product;
    }
    pageKey = payload.next_page_key;
    if (!pageKey) break;
  }
  throw new Error(`product not found for permalink ${permalink}`);
}

function gumroadUpdatePrice(productId, usd, dryRun) {
  const cmd = `gumroad products update ${productId} --price ${usd.toFixed(2)} --currency usd --non-interactive`;
  if (dryRun) {
    console.log(`  would: ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: "inherit" });
  execSync(`gumroad products publish ${productId} --non-interactive`, { stdio: "inherit" });
}

async function resolveProductId(slug, checkoutUrl) {
  const gum = wave[slug] || building[slug] || language[slug] || finance[slug];
  if (gum?.gumroadProductId) return gum.gumroadProductId;
  const perm = permalinkFromCheckoutUrl(checkoutUrl);
  if (!perm) throw new Error("no permalink in checkoutUrl");
  let product;
  try {
    product = gumroadView(perm);
  } catch {
    product = await findProductByPermalink(perm);
  }
  if (!product.id) throw new Error("gumroad view returned no id");
  return product.id;
}

function livePriceUsd(product) {
  if (typeof product.price_cents === "number" && product.price_cents > 0) {
    return product.price_cents / 100;
  }
  const formatted = String(product.formatted_price ?? product.price ?? "");
  const parsed = Number.parseFloat(formatted.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

async function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });

  const slugs = args.slugs ?? listAvailableDecks();
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const slug of slugs) {
    const deck = deckBlock(slug);
    if (!deck) {
      skipped += 1;
      continue;
    }
    const target = targetUsd(slug, deck.format);
    try {
      const productId = await resolveProductId(slug, deck.checkoutUrl);
      const product = gumroadView(productId);
      const liveUsd = livePriceUsd(product);
      if (Math.abs(liveUsd - target) < 0.01) {
        console.log(`= ${slug} already $${target}`);
        skipped += 1;
        continue;
      }
      console.log(`→ ${slug} $${liveUsd} → $${target}`);
      gumroadUpdatePrice(productId, target, args.dryRun);
      updated += 1;
    } catch (error) {
      failed += 1;
      console.error(`✗ ${slug}: ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(`\nDone: updated=${updated} skipped=${skipped} failed=${failed}${args.dryRun ? " (dry-run)" : ""}`);
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
