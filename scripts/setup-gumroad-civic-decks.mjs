#!/usr/bin/env node
/**
 * Gumroad: individual civic Anki decks @ $9 (unbundled).
 *
 * Usage:
 *   node scripts/setup-gumroad-civic-decks.mjs --dry-run
 *   node scripts/setup-gumroad-civic-decks.mjs
 *   node scripts/setup-gumroad-civic-decks.mjs --slug leben-in-deutschland-anki-deck
 *   node scripts/setup-gumroad-civic-decks.mjs --assets-only --slug ccse-espana-anki-deck
 *   node scripts/setup-gumroad-civic-decks.mjs --copy-only --slug life-in-the-uk-anki-deck
 *   node scripts/setup-gumroad-civic-decks.mjs --unpublish-bundles
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";
import { dualBrandFooterHtml } from "./lib/gumroad-dual-brand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/civic-anki-decks.json");
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() || join(dirname(root), "Anki Generator");
const ANKI_DECK_VAULT = join(ANKI_GENERATOR_ROOT, "out", "anki-decks");

const BUNDLES_TO_UNPUBLISH = [
  { slug: "citizenship-naturalization-anki-bundle", id: "Z196OQcym6yzM8nmv3J6bA==" },
  { slug: "swiss-citizenship-anki-deck", id: "Vc314YSTwXdLXSf-04yoQw==" },
];

function parseArgs(argv) {
  const args = { dryRun: false, assetsOnly: false, copyOnly: false, slug: null, unpublishBundles: false };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--copy-only") args.copyOnly = true;
    else if (arg === "--unpublish-bundles") args.unpublishBundles = true;
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg.startsWith("--slug=")) args.slug = arg.slice("--slug=".length);
  }
  return args;
}

function loadCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function saveCatalog(catalog) {
  mkdirSync(dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

function resolveApkg(folder, baseName) {
  const dir = join(ANKI_GENERATOR_ROOT, "out", folder);
  const escaped = baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stampRe = new RegExp(`^${escaped}_\\d{6}-\\d{4}(?:-\\d+)?\\.apkg$`);
  const candidates = [];
  for (const folderPath of [dir, ANKI_DECK_VAULT]) {
    if (!existsSync(folderPath)) continue;
    for (const name of readdirSync(folderPath)) {
      if (stampRe.test(name) || name === `${baseName}.apkg`) {
        candidates.push(join(folderPath, name));
      }
    }
  }
  candidates.sort((a, b) => {
    const ma = a.match(/_(\d{6}-\d{4})(?:-\d+)?\.apkg$/)?.[1] ?? "";
    const mb = b.match(/_(\d{6}-\d{4})(?:-\d+)?\.apkg$/)?.[1] ?? "";
    if (ma !== mb) return mb.localeCompare(ma);
    return b.localeCompare(a);
  });
  return candidates[0] || null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildDescription(product) {
  const samples = (product.samples || [])
    .map(
      (card) =>
        `<p><strong>${escapeHtml(card.q)}</strong><br>${escapeHtml(card.a)}</p>`,
    )
    .join("\n");
  const mock = product.mockSlug
    ? `<p>Free timed practice: <a href="https://uniprep2go.com/mock-exams/${product.mockSlug}">${escapeHtml(product.exam)} readiness check</a>.</p>`
    : "";
  return [
    "<h3>Sample cards</h3>",
    samples,
    `<p><strong>${product.cards} civics flashcards</strong> for <strong>${escapeHtml(product.exam)}</strong> — question → answer, ready for Anki spaced repetition.</p>`,
    `<p><strong>PixID Studio</strong> — <strong>$9</strong> · one .apkg · instant Gumroad download.</p>`,
    mock,
    "<h3>What’s inside</h3>",
    `<ul><li><strong>${product.cards} cards</strong> from the Prep2Go ${escapeHtml(product.exam)} bank</li><li>Text question → short answer (no audio required)</li><li>Import into Anki desktop, then sync to phone</li></ul>`,
    "<h3>How you use it</h3>",
    "<ol><li>Download the .apkg from your Gumroad library</li><li>Anki → File → Import</li><li>20–30 new cards a day, then reviews only in the final week</li></ol>",
    dualBrandFooterHtml(product.permalink),
    "<p><em>Independent study aid — not official government or exam-board material. Confirm current rules and pair with the official handbook.</em></p>",
  ].join("\n");
}

function runGumroad(args) {
  return execSync(`gumroad ${args} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function prepareSquareThumbnail(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-civic-thumb-"));
  const fullPng = join(workDir, "full.png");
  const squarePng = join(workDir, "square.png");
  const thumbJpg = join(workDir, "thumb.jpg");
  execSync(`sips -s format png "${coverPath}" --out "${fullPng}"`, { stdio: "ignore" });
  const dims = execSync(`sips -g pixelWidth -g pixelHeight "${fullPng}"`, { encoding: "utf8" });
  const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0);
  const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0);
  const side = Math.min(width, height);
  const cropX = Math.max(0, width - side);
  execSync(`sips -c ${side} ${side} --cropOffset ${cropX} 0 "${fullPng}" --out "${squarePng}"`, {
    stdio: "ignore",
  });
  execSync(`sips -z 600 600 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
  execSync(`sips -s format jpeg "${squarePng}" --out "${thumbJpg}"`, { stdio: "ignore" });
  return { thumbJpg, workDir };
}

async function createProduct(token, product) {
  const body = new URLSearchParams({
    access_token: token,
    name: product.name,
    price: String(product.priceCents || 900),
    description: buildDescription(product),
    custom_permalink: product.permalink,
    custom_summary: `${product.cards} ${product.exam} Anki cards — $9 .apkg. Independent study aid.`,
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
    throw new Error(`Gumroad create failed for ${product.permalink}: ${JSON.stringify(payload).slice(0, 400)}`);
  }
  return payload.product;
}

async function putCopy(token, productId, product) {
  const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: product.name,
      description: buildDescription(product),
      price: product.priceCents || 900,
    }),
  });
  const descPayload = await descRes.json();
  if (!descRes.ok || !descPayload.success) {
    throw new Error(`Copy update failed for ${product.permalink}: ${JSON.stringify(descPayload).slice(0, 300)}`);
  }
}

function replaceApkg(productId, product, apkgPath) {
  const current = JSON.parse(
    runGumroad(`products view ${productId} --json`),
  );
  const existingFiles = (current.product || current).files || [];
  for (const file of existingFiles) {
    console.log(`  remove ${file.name}`);
    runGumroad(`products update ${productId} --remove-file "${file.id}"`);
  }
  console.log(`  add ${product.fileName} ← ${basename(apkgPath)}`);
  runGumroad(
    `products update ${productId} --file "${apkgPath}" --file-name "${product.fileName}" --file-description "${product.cards} ${product.exam} Anki cards."`,
  );
}

function setCover(productId, coverPath) {
  const { thumbJpg, workDir } = prepareSquareThumbnail(coverPath);
  try {
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`);
    const coverPng = join(workDir, "cover.png");
    execSync(`sips -s format png "${coverPath}" --out "${coverPng}"`, { stdio: "ignore" });
    runGumroad(`products update ${productId} --cover-image "${coverPng}"`);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

function unpublishBundles(dryRun) {
  for (const bundle of BUNDLES_TO_UNPUBLISH) {
    console.log(`unpublish ${bundle.slug} ${bundle.id}`);
    if (dryRun) continue;
    runGumroad(`products unpublish ${bundle.id}`);
  }
}

async function processProduct(token, catalog, slug, args) {
  const product = catalog.products[slug];
  if (!product) throw new Error(`Unknown civic slug: ${slug}`);
  const priceCents = product.priceCents || catalog.priceCents || 900;
  product.priceCents = priceCents;

  if (args.copyOnly) {
    if (!product.gumroadProductId) throw new Error(`No product id for ${slug}`);
    console.log("copy-only", slug, product.gumroadProductId);
    if (!args.dryRun) await putCopy(token, product.gumroadProductId, product);
    return;
  }

  const apkgPath = resolveApkg(product.folder, product.baseName);
  if (!apkgPath) throw new Error(`Missing apkg for ${slug} (${product.folder}/${product.baseName})`);
  const coverPath = join(root, "public/covers", product.cover);
  if (!existsSync(coverPath)) throw new Error(`Cover missing for ${slug}: ${coverPath}`);
  console.log(`${slug}: ${basename(apkgPath)}`);

  if (args.dryRun) return;

  if (!product.gumroadProductId) {
    if (args.assetsOnly) throw new Error(`No product id for ${slug} — run without --assets-only`);
    const created = await createProduct(token, product);
    product.gumroadProductId = created.id;
    product.shortUrl = created.short_url || `https://pixidstudio.gumroad.com/l/${slug}`;
    product.createdAt = new Date().toISOString();
    saveCatalog(catalog);
    console.log("  created", product.gumroadProductId);
  } else {
    console.log("  existing", product.gumroadProductId);
  }

  replaceApkg(product.gumroadProductId, product, apkgPath);
  setCover(product.gumroadProductId, coverPath);
  await putCopy(token, product.gumroadProductId, product);
  runGumroad(`products publish ${product.gumroadProductId}`);
  product.publishedAt = new Date().toISOString();
  product.apkgUploadedAt = new Date().toISOString();
  product.shortUrl = product.shortUrl || `https://pixidstudio.gumroad.com/l/${slug}`;
  saveCatalog(catalog);
  console.log("  live", product.shortUrl);
}

async function main() {
  loadLocalEnvFiles();
  const args = parseArgs(process.argv);
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) throw new Error("No Gumroad token");
  console.log(`gumroad auth: ${source}`);
  const catalog = loadCatalog();

  if (args.unpublishBundles && !args.slug && process.argv.includes("--unpublish-bundles") && process.argv.filter((a) => !a.startsWith("--unpublish")).length <= 2 && !args.dryRun && process.argv.length === 3) {
    unpublishBundles(false);
    return;
  }

  const slugs = args.slug ? [args.slug] : Object.keys(catalog.products);
  const failures = [];
  for (const slug of slugs) {
    try {
      await processProduct(token, catalog, slug, args);
    } catch (err) {
      console.error(`FAIL ${slug}:`, err.message || err);
      failures.push(slug);
    }
  }

  if (!args.slug && !args.copyOnly && !args.dryRun) {
    unpublishBundles(false);
  } else if (args.unpublishBundles) {
    unpublishBundles(args.dryRun);
  }

  if (failures.length) {
    throw new Error(`Failed slugs: ${failures.join(", ")}`);
  }
  console.log(`done ${slugs.length} civic decks`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
