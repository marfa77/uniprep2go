#!/usr/bin/env node
/**
 * Gumroad: Citizenship / Naturalization Anki Bundle — 6 country decks @ $20.
 *
 * Usage:
 *   node scripts/setup-gumroad-citizenship-bundle.mjs --dry-run
 *   node scripts/setup-gumroad-citizenship-bundle.mjs
 *   node scripts/setup-gumroad-citizenship-bundle.mjs --assets-only
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
const CATALOG_PATH = join(root, "src/data/gumroad/citizenship-bundle.json");
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() || join(dirname(root), "Anki Generator");
const ANKI_DECK_VAULT = join(ANKI_GENERATOR_ROOT, "out", "anki-decks");

const PRODUCT = {
  permalink: "citizenship-naturalization-anki-bundle",
  name: "Citizenship & Naturalization Anki Bundle — 6 Countries · 1225 Cards",
  priceCents: 2000,
  summary:
    "Stop cramming random civics quizzes. Get 1,225 Anki flashcards for Germany, France, UK, Canada, Australia & the U.S. — six separate decks, one $20 download.",
};

/** @type {{ folder: string; baseName: string; fileName: string; label: string }[]} */
const DECKS = [
  {
    folder: "prep2go_Leben_in_Deutschland",
    baseName: "prep2go_Leben_in_Deutschland_FULL",
    fileName: "01_Leben_in_Deutschland_Anki_Deck.apkg",
    label: "Leben in Deutschland (Germany) — 296 cards",
  },
  {
    folder: "prep2go_Naturalisation_francaise",
    baseName: "prep2go_Naturalisation_francaise_FULL",
    fileName: "02_Naturalisation_francaise_Anki_Deck.apkg",
    label: "Naturalisation française (France) — 200 cards",
  },
  {
    folder: "prep2go_Life_in_the_UK",
    baseName: "prep2go_Life_in_the_UK_FULL",
    fileName: "03_Life_in_the_UK_Anki_Deck.apkg",
    label: "Life in the UK — 201 cards",
  },
  {
    folder: "prep2go_Canadian_Citizenship",
    baseName: "prep2go_Canadian_Citizenship_FULL",
    fileName: "04_Canadian_Citizenship_Anki_Deck.apkg",
    label: "Canadian Citizenship — 200 cards",
  },
  {
    folder: "prep2go_Australian_Citizenship",
    baseName: "prep2go_Australian_Citizenship_FULL",
    fileName: "05_Australian_Citizenship_Anki_Deck.apkg",
    label: "Australian Citizenship — 200 cards",
  },
  {
    folder: "prep2go_US_Citizenship",
    baseName: "prep2go_US_Citizenship_FULL",
    fileName: "06_US_Citizenship_Anki_Deck.apkg",
    label: "U.S. Citizenship — 128 cards",
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
    return { storeBaseUrl: "https://pixidstudio.gumroad.com", defaultPriceCents: 2000, products: {} };
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
    "<p><strong>Your citizenship interview is not the day to blank on “what is the supreme law of the land?”</strong></p>",
    "<p>Free blog quizzes scatter facts across six countries. This bundle puts <strong>1,225 civics flashcards</strong> into Anki — so you drill rights, institutions, values, and test-style questions with spaced repetition until they stick.</p>",
    "<p><strong>PixID Studio</strong> — one <strong>$20</strong> download, <strong>six separate .apkg files</strong>. Study only the country you need. Keep the rest for family members on other pathways.</p>",
    "<h3>What’s inside</h3>",
    `<ul>${list}</ul>`,
    "<p><strong>1,225 cards total</strong> · text-first question → answer format · built for daily 20–30 card sessions alongside the official handbook for your country.</p>",
    "<h3>Who this is for</h3>",
    "<ul>",
    "<li>Applicants preparing <strong>Leben in Deutschland</strong>, French <strong>naturalisation</strong> civics, <strong>Life in the UK</strong>, <strong>Canadian</strong> / <strong>Australian</strong> citizenship tests, or the <strong>U.S. naturalization</strong> civics interview</li>",
    "<li>Anyone tired of mixing Germany facts with UK facts in the same notes app</li>",
    "<li>Households with more than one nationality pathway — six decks, one checkout</li>",
    "</ul>",
    "<h3>How you use it</h3>",
    "<ol>",
    "<li>Buy once — all six .apkg files appear in your Gumroad library instantly</li>",
    "<li>Import the country file into <strong>Anki</strong> (desktop), then sync to phone via AnkiWeb</li>",
    "<li>Do 20–30 new cards/day for 4–6 weeks while you read the official civics handbook</li>",
    "<li>Final week: reviews only + any free official practice test your government publishes</li>",
    "</ol>",
    "<h3>What you get that random quizzes don’t</h3>",
    "<ul>",
    "<li><strong>Spaced repetition</strong> — weak facts come back; strong facts fade</li>",
    "<li><strong>Clean country separation</strong> — no cross-contamination between pathways</li>",
    "<li><strong>One price</strong> — $20 for six decks instead of hunting six separate listings</li>",
    "</ul>",
    dualBrandFooterHtml(PRODUCT.permalink),
    "<p><em>Independent study aid — not official government or exam-board material. Pair with your country’s official handbook and practice tests.</em></p>",
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
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-cit-thumb-"));
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

  const coverPath = join(root, "public/covers/citizenship-naturalization-anki-bundle.webp");
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
    };
    saveCatalog(catalog);
    console.log("created", productId);
  } else if (!productId) {
    throw new Error("No product id — run without --assets-only first");
  } else {
    console.log("existing", productId);
  }

  if (args.dryRun) return;

  // Gumroad rich_content embeds require one-by-one replace when swapping all files.
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
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${PRODUCT.permalink}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
