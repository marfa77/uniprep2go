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
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

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
  const args = { dryRun: false, slug: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--slug") args.slug = argv[++i];
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
  return payload.product ?? payload;
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

function resolveProductId(slug, checkoutUrl) {
  const gum = wave[slug] || building[slug] || language[slug] || finance[slug];
  if (gum?.gumroadProductId) return gum.gumroadProductId;
  const permalink = permalinkFromCheckoutUrl(checkoutUrl);
  if (!permalink) throw new Error("no permalink in checkoutUrl");
  const product = gumroadView(permalink);
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

function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });

  const slugs = args.slug ? [args.slug] : listAvailableDecks();
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
      const gum = wave[slug] || building[slug] || language[slug] || finance[slug];
      const productId = resolveProductId(slug, deck.checkoutUrl);
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

main();
