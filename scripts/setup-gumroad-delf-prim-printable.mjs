#!/usr/bin/env node
/**
 * Create Gumroad product for DELF Prim printable flashcards ($12 PDF).
 *
 * Usage:
 *   node scripts/setup-gumroad-delf-prim-printable.mjs --dry-run
 *   node scripts/setup-gumroad-delf-prim-printable.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";
import { dualBrandFooterHtml } from "./lib/gumroad-dual-brand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/language-printable.json");
const PDF_DIR = join(root, ".local-product-files/delf-prim-printable");
const PDF1 = join(PDF_DIR, "DELF_Prim_Printable_Flashcards_360_Part_1.pdf");
const PDF2 = join(PDF_DIR, "DELF_Prim_Printable_Flashcards_360_Part_2.pdf");
const COVER_PATH = join(root, "public/covers/delf-prim-printable-french-flashcards.webp");
const THUMB_PATH = join(root, "public/covers/delf-prim-printable-french-flashcards-thumb.jpg");

const PRODUCT = {
  permalink: "delf-prim-printable-french-flashcards",
  name: "DELF Prim Printable French Flashcards — Ages 7–12 · 360 PDF Cards",
  priceCents: 1200,
  summary:
    "360 printable DELF Prim French flashcards for ages 7–12 with images, examples, cut lines, and QR audio.",
};

function parseArgs(argv) {
  const args = { dryRun: false, copyOnly: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    if (arg === "--copy-only") args.copyOnly = true;
  }
  return args;
}

function loadCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    return {
      storeBaseUrl: "https://pixidstudio.gumroad.com",
      defaultPriceCents: 1200,
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
    "<p><strong>PixID Studio</strong> — <strong>DELF Prim</strong> printable French flashcards for <strong>ages 7–12</strong>.</p>",
    "<p><strong>360 cards</strong> across two A4 PDF files: French headword, English gloss, example sentences, illustration, cut lines, and <strong>QR audio</strong> on every card.</p>",
    "<p>Built for kids preparing DELF Prim-style A2 vocabulary — print at home, cut, and review with pronunciation via QR.</p>",
    "<p><strong>$12</strong> · instant digital download · 2× PDF.</p>",
    dualBrandFooterHtml(PRODUCT.permalink),
    "<p><em>Independent study aid — not official France Éducation international / DELF Prim material.</em></p>",
  ].join("\n");
}

async function createProduct(token, { dryRun }) {
  const body = new URLSearchParams({
    access_token: token,
    name: PRODUCT.name,
    price: String(PRODUCT.priceCents),
    description: buildDescription(),
    custom_permalink: PRODUCT.permalink,
    custom_summary: PRODUCT.summary,
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
  let productId = existing?.gumroadProductId;

  if (args.copyOnly) {
    if (!productId) throw new Error("No product id for --copy-only");
    console.log("copy-only: description", productId);
    if (args.dryRun) return;
    const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: buildDescription() }),
    });
    const descPayload = await descRes.json();
    if (!descRes.ok || !descPayload.success) {
      throw new Error(`Description update failed: ${JSON.stringify(descPayload).slice(0, 300)}`);
    }
    console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
    return;
  }

  for (const pdf of [PDF1, PDF2]) {
    if (!existsSync(pdf)) throw new Error(`PDF missing: ${pdf}`);
  }
  if (!existsSync(COVER_PATH)) throw new Error(`Cover missing: ${COVER_PATH}`);
  if (!existsSync(THUMB_PATH)) throw new Error(`Thumb missing: ${THUMB_PATH}`);

  if (!productId) {
    const product = await createProduct(token, args);
    if (args.dryRun) return;
    productId = product.id;
    catalog.products = catalog.products || {};
    catalog.products[PRODUCT.permalink] = {
      permalink: PRODUCT.permalink,
      gumroadProductId: productId,
      shortUrl: product.short_url || `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`,
      priceCents: PRODUCT.priceCents,
      createdAt: new Date().toISOString(),
      format: "PDF",
      fileNames: [
        "DELF_Prim_Printable_Flashcards_360_Part_1.pdf",
        "DELF_Prim_Printable_Flashcards_360_Part_2.pdf",
      ],
    };
    saveCatalog(catalog);
    console.log("created", productId, catalog.products[PRODUCT.permalink].shortUrl);
  } else {
    console.log("existing product", productId);
  }

  if (args.dryRun) return;

  execSync(
    [
      `gumroad products update ${productId}`,
      `--replace-files`,
      `--file "${PDF1}"`,
      `--file-name "DELF_Prim_Printable_Flashcards_360_Part_1.pdf"`,
      `--file-description "DELF Prim printable flashcards — Part 1 (A4 PDF, cut lines, QR audio)."`,
      `--file "${PDF2}"`,
      `--file-name "DELF_Prim_Printable_Flashcards_360_Part_2.pdf"`,
      `--file-description "DELF Prim printable flashcards — Part 2 (A4 PDF, cut lines, QR audio)."`,
      `--non-interactive --yes`,
    ].join(" "),
    { encoding: "utf8", stdio: "inherit" },
  );

  execSync(
    `gumroad products thumbnail set ${productId} --image "${THUMB_PATH}" --non-interactive --yes`,
    { encoding: "utf8", stdio: "inherit" },
  );

  // Cover as PNG for Gumroad compatibility
  const coverPng = join(root, "public/covers/delf-prim-printable-french-flashcards-cover.png");
  execSync(`sips -s format png "${COVER_PATH}" --out "${coverPng}"`, { stdio: "ignore" });
  execSync(
    `gumroad products update ${productId} --cover-image "${coverPng}" --non-interactive --yes`,
    { encoding: "utf8", stdio: "inherit" },
  );

  const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: buildDescription() }),
  });
  const descPayload = await descRes.json();
  if (!descRes.ok || !descPayload.success) {
    throw new Error(`Description update failed: ${JSON.stringify(descPayload).slice(0, 300)}`);
  }

  execSync(`gumroad products publish ${productId} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: "inherit",
  });

  catalog.products[PRODUCT.permalink].publishedAt = new Date().toISOString();
  catalog.products[PRODUCT.permalink].filesUploadedAt = new Date().toISOString();
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
