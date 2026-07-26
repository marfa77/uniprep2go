#!/usr/bin/env node
/**
 * Gumroad: Swiss Citizenship Anki Bundle — DE / FR / IT @ $12.
 *
 * Usage:
 *   node scripts/setup-gumroad-swiss-citizenship-bundle.mjs --dry-run
 *   node scripts/setup-gumroad-swiss-citizenship-bundle.mjs
 *   node scripts/setup-gumroad-swiss-citizenship-bundle.mjs --assets-only
 *   node scripts/setup-gumroad-swiss-citizenship-bundle.mjs --copy-only
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";
import { dualBrandFooterHtml } from "./lib/gumroad-dual-brand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/swiss-citizenship-bundle.json");
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() || join(dirname(root), "Anki Generator");
const ANKI_DECK_VAULT = join(ANKI_GENERATOR_ROOT, "out", "anki-decks");

const PRODUCT = {
  permalink: "swiss-citizenship-anki-deck",
  name: "Swiss Citizenship Anki Bundle — DE / FR / IT · 618 Cards",
  priceCents: 1200,
  summary:
    "Federal Staatskunde for Swiss ordinary naturalisation — three Anki decks (German, French, Italian), 206 cards each. One $12 download.",
};

/** @type {{ folder: string; baseName: string; fileName: string; label: string }[]} */
const DECKS = [
  {
    folder: "prep2go_Einburgerung_Schweiz",
    baseName: "prep2go_Einburgerung_Schweiz_FULL",
    fileName: "01_Einburgerung_Schweiz_DE_Anki_Deck.apkg",
    label: "Einbürgerung Schweiz (German) — 206 cards",
  },
  {
    folder: "prep2go_Naturalisation_Suisse",
    baseName: "prep2go_Naturalisation_Suisse_FULL",
    fileName: "02_Naturalisation_Suisse_FR_Anki_Deck.apkg",
    label: "Naturalisation Suisse (French) — 206 cards",
  },
  {
    folder: "prep2go_Naturalizzazione_Svizzera",
    baseName: "prep2go_Naturalizzazione_Svizzera_FULL",
    fileName: "03_Naturalizzazione_Svizzera_IT_Anki_Deck.apkg",
    label: "Naturalizzazione Svizzera (Italian) — 206 cards",
  },
];

function parseArgs(argv) {
  const args = { dryRun: false, assetsOnly: false, copyOnly: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    if (arg === "--assets-only") args.assetsOnly = true;
    if (arg === "--copy-only") args.copyOnly = true;
  }
  return args;
}

function loadCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    return { storeBaseUrl: "https://pixidstudio.gumroad.com", defaultPriceCents: 1200, products: {} };
  }
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

function buildDescription() {
  const list = DECKS.map((d) => `<li><strong>${d.label}</strong></li>`).join("");
  return [
    "<p><strong>Swiss ordinary naturalisation is not one English quiz — canton exams run in German, French, or Italian.</strong></p>",
    "<p>This bundle gives you <strong>618 federal Staatskunde flashcards</strong> as <strong>three separate Anki .apkg files</strong> — same federal block in DE, FR, and IT — so you drill politics, direct democracy, history, geography, the social system, and the naturalisation process in the language of your canton.</p>",
    "<p><strong>PixID Studio</strong> — one <strong>$12</strong> download. Import the language you need; keep the others for household members or a language switch later.</p>",
    "<h3>What’s inside</h3>",
    `<ul>${list}</ul>`,
    "<p><strong>618 cards total</strong> (206 × 3) · text-first Q&A · built for daily 20–30 card sessions alongside your commune brochure.</p>",
    "<h3>Who this is for</h3>",
    "<ul>",
    "<li>Applicants preparing <strong>ordinary naturalisation</strong> federal civics (SEM / cantonal Staatskunde)</li>",
    "<li>Households spanning more than one Swiss language region</li>",
    "<li>Anyone who finished a free UniPrep2Go Swiss readiness check and wants spaced-repetition repair</li>",
    "</ul>",
    "<h3>How you use it</h3>",
    "<ol>",
    "<li>Buy once — all three .apkg files appear in your Gumroad library instantly</li>",
    "<li>Import the DE, FR, or IT file into <strong>Anki</strong>, then sync via AnkiWeb</li>",
    "<li>Do 20–30 new cards/day while you study your canton/commune materials</li>",
    "<li>Pair with the free UniPrep2Go readiness checks (German / French / Italian)</li>",
    "</ol>",
    "<h3>Free readiness checks</h3>",
    "<ul>",
    '<li><a href="https://uniprep2go.study/mock-exams/swiss-citizenship-readiness-check">Einbürgerung Schweiz (German)</a></li>',
    '<li><a href="https://uniprep2go.study/mock-exams/naturalisation-suisse-readiness-check">Naturalisation Suisse (French)</a></li>',
    '<li><a href="https://uniprep2go.study/mock-exams/naturalizzazione-svizzera-readiness-check">Naturalizzazione Svizzera (Italian)</a></li>',
    "</ul>",
    dualBrandFooterHtml(PRODUCT.permalink),
    "<p><em>Independent study aid — not SEM or cantonal exam material. Canton and commune tests vary; this bundle covers the federal civics block only.</em></p>",
  ].join("\n");
}

function runGumroad(args, { dryRun = false } = {}) {
  const flags = dryRun ? `${args} --dry-run` : args;
  execSync(`gumroad ${flags} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
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
    console.log("dry-run create", Object.fromEntries(body));
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

function prepareSquareThumbnail(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-swiss-thumb-"));
  const fullPng = join(workDir, "full.png");
  const squarePng = join(workDir, "square.png");
  const thumbJpg = join(workDir, "thumb.jpg");
  execSync(`sips -s format png "${coverPath}" --out "${fullPng}"`, { stdio: "ignore" });
  const dims = execSync(`sips -g pixelWidth -g pixelHeight "${fullPng}"`, { encoding: "utf8" });
  const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0);
  const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0);
  const side = Math.min(width, height);
  const cropX = Math.max(0, width - side);
  execSync(
    `sips -c ${side} ${side} --cropOffset ${cropX} 0 "${fullPng}" --out "${squarePng}"`,
    { stdio: "ignore" },
  );
  execSync(`sips -z 1200 1200 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
  execSync(`sips -s format jpeg "${squarePng}" --out "${thumbJpg}"`, { stdio: "ignore" });
  return { thumbJpg, workDir };
}

async function main() {
  loadLocalEnvFiles();
  const args = parseArgs(process.argv);
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) throw new Error("No Gumroad token");
  console.log(`gumroad auth: ${source}`);

  const catalog = loadCatalog();
  let productId = catalog.products?.[PRODUCT.permalink]?.gumroadProductId;

  if (args.copyOnly) {
    if (!productId) throw new Error("No product id for --copy-only");
    console.log("copy-only: description + name", productId);
    if (args.dryRun) return;
    runGumroad(
      `products update ${productId} --name "${PRODUCT.name.replace(/"/g, '\\"')}"`,
    );
    const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: buildDescription(), price: PRODUCT.priceCents }),
    });
    const descPayload = await descRes.json();
    if (!descRes.ok || !descPayload.success) {
      throw new Error(`Description update failed: ${JSON.stringify(descPayload).slice(0, 300)}`);
    }
    console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
    return;
  }

  const resolved = DECKS.map((d) => {
    const path = resolveApkg(d.folder, d.baseName);
    if (!path) throw new Error(`Missing apkg for ${d.label} (${d.folder}/${d.baseName})`);
    return { ...d, path };
  });
  console.log("files:");
  for (const d of resolved) console.log(`  ${d.fileName} ← ${basename(d.path)}`);

  const coverPath = join(root, "public/covers/swiss-citizenship-anki-deck.webp");
  if (!existsSync(coverPath)) {
    throw new Error(`Cover missing: ${coverPath}`);
  }

  if (!productId && !args.assetsOnly) {
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
      fileNames: resolved.map((d) => d.fileName),
      name: PRODUCT.name,
    };
    saveCatalog(catalog);
    console.log("created", productId);
  } else if (!productId) {
    throw new Error("No product id — run without --assets-only first");
  } else {
    console.log("existing", productId);
  }

  if (args.dryRun) return;

  const current = JSON.parse(
    execSync(`gumroad products view ${productId} --json --non-interactive --yes`, {
      encoding: "utf8",
    }),
  );
  const existingFiles = (current.product || current).files || [];
  const byName = new Map(existingFiles.map((f) => [f.name, f.id]));
  for (const d of resolved) {
    const oldId = byName.get(d.fileName);
    if (oldId) {
      console.log(`  replace ${d.fileName}`);
      runGumroad(
        `products update ${productId} --remove-file "${oldId}" --file "${d.path}" --file-name "${d.fileName}" --file-description "${d.label} Anki deck."`,
      );
    } else {
      console.log(`  add ${d.fileName}`);
      runGumroad(
        `products update ${productId} --file "${d.path}" --file-name "${d.fileName}" --file-description "${d.label} Anki deck."`,
      );
    }
  }

  runGumroad(
    `products update ${productId} --name "${PRODUCT.name.replace(/"/g, '\\"')}"`,
  );

  const { thumbJpg, workDir } = prepareSquareThumbnail(coverPath);
  try {
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`);
    const coverPng = join(workDir, "cover.png");
    execSync(`sips -s format png "${coverPath}" --out "${coverPng}"`, { stdio: "ignore" });
    runGumroad(`products update ${productId} --cover-image "${coverPng}"`);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }

  const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: buildDescription(), price: PRODUCT.priceCents }),
  });
  const descPayload = await descRes.json();
  if (!descRes.ok || !descPayload.success) {
    console.warn("description/price update warning:", JSON.stringify(descPayload).slice(0, 200));
  }

  runGumroad(`products publish ${productId}`);
  catalog.products[PRODUCT.permalink].publishedAt = new Date().toISOString();
  catalog.products[PRODUCT.permalink].filesUploadedAt = new Date().toISOString();
  catalog.products[PRODUCT.permalink].name = PRODUCT.name;
  catalog.products[PRODUCT.permalink].priceCents = PRODUCT.priceCents;
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
