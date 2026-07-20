#!/usr/bin/env node
/**
 * Create/publish a Gaivota paid episode on Gumroad ($5 PDF).
 *
 * Usage:
 *   node scripts/setup-gumroad-gaivota-episode.mjs --ep 06
 *   node scripts/setup-gumroad-gaivota-episode.mjs --ep 06 --dry-run
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

const EPISODES = {
  "06": {
    permalink: "gaivota-ep06-liberal-revolution",
    name: "Gaivota Ep.06 — Liberal Revolution (PDF Comic)",
    episode: "06-liberal-revolution",
    fileName: "Gaivota-Ep06-Liberal-Revolution.pdf",
    coverWebp: "prototypes/language-comics/gaivota-em-portugal/episodes/06-liberal-revolution/art/ep06-cover.webp",
    pdf: "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep06-Liberal-Revolution.pdf",
    descTitle: "Gaivota Ep.06 — Liberal Revolution",
    descEvent: "Porto, 1820",
  },
  "07": {
    permalink: "gaivota-ep07-republic",
    name: "Gaivota Ep.07 — Republic (PDF Comic)",
    episode: "07-republic",
    fileName: "Gaivota-Ep07-Republic.pdf",
    coverWebp: "prototypes/language-comics/gaivota-em-portugal/episodes/07-republic/art/ep07-cover.webp",
    pdf: "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep07-Republic.pdf",
    descTitle: "Gaivota Ep.07 — Republic",
    descEvent: "Republic proclaimed, 5 October 1910",
  },
  "08": {
    permalink: "gaivota-ep08-estado-novo",
    name: "Gaivota Ep.08 — Estado Novo (PDF Comic)",
    episode: "08-estado-novo",
    fileName: "Gaivota-Ep08-Estado-Novo.pdf",
    coverWebp: "prototypes/language-comics/gaivota-em-portugal/episodes/08-estado-novo/art/ep08-cover.webp",
    pdf: "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep08-Estado-Novo.pdf",
    descTitle: "Gaivota Ep.08 — Estado Novo",
    descEvent: "mid-20th century Portugal (human-scale)",
  },
  "09": {
    permalink: "gaivota-ep09-treaty-of-windsor",
    name: "Gaivota Ep.09 — Treaty of Windsor (PDF Comic)",
    episode: "09-treaty-of-windsor",
    fileName: "Gaivota-Ep09-Treaty-of-Windsor.pdf",
    coverWebp: "prototypes/language-comics/gaivota-em-portugal/episodes/09-treaty-of-windsor/art/ep09-cover.webp",
    pdf: "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep09-Treaty-of-Windsor.pdf",
    descTitle: "Gaivota Ep.09 — Treaty of Windsor",
    descEvent: "1386 Anglo-Portuguese alliance",
  },
  "10": {
    permalink: "gaivota-ep10-eu-accession",
    name: "Gaivota Ep.10 — EU Accession (PDF Comic)",
    episode: "10-eu-accession",
    fileName: "Gaivota-Ep10-EU-Accession.pdf",
    coverWebp: "prototypes/language-comics/gaivota-em-portugal/episodes/10-eu-accession/art/ep10-cover.webp",
    pdf: "prototypes/language-comics/gaivota-em-portugal/dist/Gaivota-Ep10-EU-Accession.pdf",
    descTitle: "Gaivota Ep.10 — EU Accession",
    descEvent: "Portugal joins the EEC, 1986",
  },
};

function parseArgs(argv) {
  const args = { dryRun: false, ep: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    if (argv[i] === "--ep") args.ep = argv[++i];
  }
  return args;
}

function loadCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    return { storeBaseUrl: "https://pixidstudio.gumroad.com", defaultPriceCents: 500, products: {} };
  }
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function saveCatalog(catalog) {
  mkdirSync(dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

function buildDescription(cfg) {
  return [
    `<p><strong>${cfg.descTitle}</strong> (${cfg.descEvent}).</p>`,
    "<p>Noir black-and-white Portuguese history comic PDF: history brief + complete 5-page story + 100-word PT→EN glossary.</p>",
    "<p><strong>$5</strong> · printable PDF · human-scale story (no graphic violence).</p>",
    "<p><strong>Free Episode 1</strong> first:</p>",
    '<p><a href="https://uniprep2go.study/comics/gaivota-em-portugal/01-1755-earthquake">O Terramoto (1755)</a></p>',
    '<p>Series hub: <a href="https://uniprep2go.study/comics/gaivota-em-portugal">uniprep2go.study/comics/gaivota-em-portugal</a></p>',
    "<p><em>Independent study aid — artistic interpretation of history.</em></p>",
  ].join("\n");
}

async function createProduct(token, cfg, { dryRun }) {
  const body = new URLSearchParams({
    access_token: token,
    name: cfg.name,
    price: "500",
    description: buildDescription(cfg),
    custom_permalink: cfg.permalink,
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
  if (!args.ep || !EPISODES[args.ep]) {
    throw new Error(`Usage: --ep ${Object.keys(EPISODES).join("|")}`);
  }
  const cfg = EPISODES[args.ep];
  const PDF_PATH = join(root, cfg.pdf);
  const COVER_WEBP = join(root, cfg.coverWebp);
  const COVER_JPG = join(
    root,
    `prototypes/language-comics/gaivota-em-portugal/dist/thumbs/ep${args.ep}-cover-gumroad.jpg`,
  );

  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) throw new Error("No Gumroad token.");
  console.log(`gumroad auth: ${source}`);
  if (!existsSync(PDF_PATH)) throw new Error(`PDF missing: ${PDF_PATH}`);

  const catalog = loadCatalog();
  const existing = catalog.products?.[cfg.permalink];
  let productId = existing?.gumroadProductId;

  if (!productId) {
    const product = await createProduct(token, cfg, args);
    if (args.dryRun) return;
    productId = product.id;
    catalog.products = catalog.products || {};
    catalog.products[cfg.permalink] = {
      permalink: cfg.permalink,
      gumroadProductId: productId,
      shortUrl: product.short_url || `https://pixidstudio.gumroad.com/l/${cfg.permalink}`,
      priceCents: 500,
      createdAt: new Date().toISOString(),
      episode: cfg.episode,
      format: "pdf",
      fileName: cfg.fileName,
    };
    saveCatalog(catalog);
    console.log("created", productId, catalog.products[cfg.permalink].shortUrl);
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
    execSync(`sips -s format jpeg "${COVER_WEBP}" --out "${COVER_JPG}" >/dev/null`, {
      encoding: "utf8",
      stdio: "inherit",
    });
    execSync(
      `gumroad products update ${productId} --cover-image "${COVER_JPG}" --preview-image "${COVER_JPG}" --non-interactive --yes`,
      { encoding: "utf8", stdio: "inherit" },
    );
    const thumbPath = join(thumbDir, `ep${args.ep}-thumb-600.jpg`);
    const tmpSq = join(thumbDir, `_sq${args.ep}.png`);
    execSync(
      `bash -lc 'w=$(sips -g pixelWidth "${COVER_JPG}" | awk "/pixelWidth/{print \\$2}"); h=$(sips -g pixelHeight "${COVER_JPG}" | awk "/pixelHeight/{print \\$2}"); side=$([ "$w" -lt "$h" ] && echo $w || echo $h); ox=$(( (w - side) / 2 )); oy=$(( (h - side) / 2 )); sips -c $side $side --cropOffset $ox $oy "${COVER_JPG}" --out "${tmpSq}" >/dev/null; sips -z 600 600 -s format jpeg "${tmpSq}" --out "${thumbPath}" >/dev/null; rm -f "${tmpSq}"'`,
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
      `--file-name "${cfg.fileName}"`,
      `--file-description "Printable PDF comic — history brief + 5-page noir story + 100-word PT→EN glossary."`,
      `--non-interactive --yes`,
    ].join(" "),
    { encoding: "utf8", stdio: "inherit" },
  );

  catalog.products[cfg.permalink].publishedAt = new Date().toISOString();
  catalog.products[cfg.permalink].fileUploadedAt = new Date().toISOString();
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${cfg.permalink}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
