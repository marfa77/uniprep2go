#!/usr/bin/env node
/**
 * Create Gumroad product for Gaivota Ep.04 — Ceuta ($5 PDF).
 *
 * Usage:
 *   node scripts/setup-gumroad-gaivota-ep04.mjs --dry-run
 *   node scripts/setup-gumroad-gaivota-ep04.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/gaivota-comics.json");
const PDF_PATH = join(
  root,
  "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep04-Ceuta.pdf",
);
const COVER_WEBP = join(
  root,
  "prototypes/language-comics/gaivota-em-portugal/episodes/04-ceuta/art/ep04-cover.webp",
);
const COVER_PATH = join(
  root,
  "prototypes/language-comics/gaivota-em-portugal/dist/thumbs/ep04-cover-gumroad.jpg",
);

const PRODUCT = {
  permalink: "gaivota-ep04-ceuta",
  name: "Gaivota Ep.04 — Ceuta (PDF Comic)",
  priceCents: 500,
};

function parseArgs(argv) {
  const args = { dryRun: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
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
    "<p><strong>Gaivota Ep.04 — Ceuta</strong> (Conquest of Ceuta, 21 August 1415).</p>",
    "<p>Noir black-and-white Portuguese history comic PDF: history brief + complete 5-page story + 100-word PT→EN glossary.</p>",
    "<p><strong>$5</strong> · printable PDF · human-scale story (no graphic violence).</p>",
    "<p><strong>Free Episode 1</strong> first:</p>",
    '<p><a href="https://uniprep2go.study/comics/gaivota-em-portugal/01-1755-earthquake">O Terramoto (1755)</a></p>',
    "<p>Series hub: <a href=\"https://uniprep2go.study/comics/gaivota-em-portugal\">uniprep2go.study/comics/gaivota-em-portugal</a></p>",
    "<p><em>Independent study aid — artistic interpretation of history.</em></p>",
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

async function main() {
  loadLocalEnvFiles();
  const args = parseArgs(process.argv);
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) {
    throw new Error("No Gumroad token. Run `gumroad login` or set GUMROAD_ACCESS_TOKEN.");
  }
  console.log(`gumroad auth: ${source}`);

  if (!existsSync(PDF_PATH)) {
    throw new Error(`PDF missing: ${PDF_PATH}`);
  }

  const catalog = loadCatalog();
  const existing = catalog.products?.[PRODUCT.permalink];
  let productId = existing?.gumroadProductId;

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
      episode: "04-ceuta",
      format: "pdf",
      fileName: "Gaivota-Ep04-Ceuta.pdf",
    };
    saveCatalog(catalog);
    console.log("created", productId, catalog.products[PRODUCT.permalink].shortUrl);
  } else {
    console.log("existing product", productId);
  }

  if (args.dryRun) return;

  execSync(`gumroad products publish ${productId} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: "inherit",
  });

  if (existsSync(COVER_WEBP)) {
    const thumbDir = join(root, "prototypes/language-comics/gaivota-em-portugal/dist/thumbs");
    mkdirSync(thumbDir, { recursive: true });
    // Gumroad product media: JPEG/PNG/GIF only (not WebP).
    execSync(
      `sips -s format jpeg "${COVER_WEBP}" --out "${COVER_PATH}" >/dev/null`,
      { encoding: "utf8", stdio: "inherit" },
    );
    execSync(
      `gumroad products update ${productId} --cover-image "${COVER_PATH}" --preview-image "${COVER_PATH}" --non-interactive --yes`,
      { encoding: "utf8", stdio: "inherit" },
    );
    const thumbPath = join(thumbDir, "ep04-thumb-600.jpg");
    const tmpSq = join(thumbDir, "_sq.png");
    execSync(
      `bash -lc 'w=$(sips -g pixelWidth "${COVER_PATH}" | awk "/pixelWidth/{print \\$2}"); h=$(sips -g pixelHeight "${COVER_PATH}" | awk "/pixelHeight/{print \\$2}"); side=$([ "$w" -lt "$h" ] && echo $w || echo $h); ox=$(( (w - side) / 2 )); oy=$(( (h - side) / 2 )); sips -c $side $side --cropOffset $ox $oy "${COVER_PATH}" --out "${tmpSq}" >/dev/null; sips -z 600 600 -s format jpeg "${tmpSq}" --out "${thumbPath}" >/dev/null; rm -f "${tmpSq}"'`,
      { encoding: "utf8", stdio: "inherit" },
    );
    execSync(
      `gumroad products thumbnail set ${productId} --image "${thumbPath}" --non-interactive --yes`,
      { encoding: "utf8", stdio: "inherit" },
    );
  }

  execSync(
    [
      `gumroad products update ${productId}`,
      `--replace-files`,
      `--file "${PDF_PATH}"`,
      `--file-name "Gaivota-Ep04-Ceuta.pdf"`,
      `--file-description "Printable PDF comic — history brief + 5-page noir story + 100-word PT→EN glossary."`,
      `--non-interactive --yes`,
    ].join(" "),
    { encoding: "utf8", stdio: "inherit" },
  );

  catalog.products[PRODUCT.permalink].publishedAt = new Date().toISOString();
  catalog.products[PRODUCT.permalink].fileUploadedAt = new Date().toISOString();
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
