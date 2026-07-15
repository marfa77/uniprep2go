#!/usr/bin/env node
/**
 * Create Gumroad products for building/readiness Anki decks, upload .apkg + thumbnail,
 * publish, and update catalog JSON.
 *
 * Usage:
 *   node scripts/setup-gumroad-building-decks.mjs --dry-run
 *   node scripts/setup-gumroad-building-decks.mjs --slug hvac-epa-608-anki-deck
 *   node scripts/setup-gumroad-building-decks.mjs --slug hvac-epa-608-anki-deck --assets-only
 *
 * Env:
 *   GUMROAD_ACCESS_TOKEN — or `gumroad auth token` CLI
 *   ANKI_GENERATOR_ROOT — path to Anki Generator repo (default: ../Anki Generator)
 */

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/building-anki-decks.json");
const COVERS_DIR = join(root, "public/covers");

const PRODUCT_CREATE_DELAY_MS = Number(process.env.GUMROAD_CREATE_DELAY_MS ?? 5000);
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() ||
  join(dirname(root), "Anki Generator");

/** Relative paths under ANKI_GENERATOR_ROOT for exported .apkg files. */
const APKG_RELATIVE_PATHS = {
  "hvac-epa-608-anki-deck": "out/building/EPA_608_HVAC_FULL_200.apkg",
  "bms-building-automation-anki-deck": "out/building/BMS_BAS_Building_Automation_FULL_200.apkg",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveGumroadToken() {
  const envToken = process.env.GUMROAD_ACCESS_TOKEN?.trim();
  if (envToken) {
    return envToken;
  }

  try {
    return execSync("gumroad auth token", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function parseArgs(argv) {
  const args = { slug: null, dryRun: false, force: false, assetsOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--slug") args.slug = argv[++i];
  }
  return args;
}

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const lines = readFileSync(join(root, file), "utf8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // optional env files
    }
  }
}

function runGumroad(args, { dryRun = false } = {}) {
  const flags = dryRun ? `${args} --dry-run` : args;
  execSync(`gumroad ${flags} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function loadDeckMeta() {
  const configs = await import("../src/lib/mock-exams/configs.ts");
  const titles = {
    "hvac-epa-608-anki-deck": "HVAC EPA 608 Anki Deck — 200 Flashcards (Section 608 Exam Prep)",
    "bms-building-automation-anki-deck": "BMS Building Automation Anki Deck — 200 Flashcards (BAS Exam Prep)",
    "leed-green-associate-anki-deck": "LEED Green Associate Anki Deck — 250+ Flashcards",
    "leed-ap-bd-c-anki-deck": "LEED AP BD+C Anki Deck — 250+ Flashcards",
    "well-ap-anki-deck": "WELL AP Anki Deck — 250+ Flashcards",
    "cem-anki-deck": "CEM Anki Deck — 250+ Flashcards",
    "ashrae-certifications-anki-deck": "ASHRAE Certifications Anki Deck — 250+ Flashcards",
    "cdcp-anki-deck": "CDCP Anki Deck — 250+ Flashcards",
    "nebosh-anki-deck": "NEBOSH IGC Anki Deck — 250+ Flashcards",
    "cfps-anki-deck": "CFPS Anki Deck — 400+ Flashcards",
    "mrics-anki-deck": "MRICS / APC Anki Deck — 250+ Flashcards",
    "mrics-quantity-surveying-anki-deck": "MRICS Quantity Surveying Anki Deck — 250+ Flashcards",
    "gmat-focus-anki-deck": "GMAT Focus Anki Deck — 200+ Flashcards",
  };
  return { getAllMockExams: configs.getAllMockExams, titles };
}

function buildProductDescription({ title, mockPath, apkgReady }) {
  const delivery = apkgReady
    ? "DELIVERY: Instant download. After checkout, open your Gumroad library or receipt and download the Anki .apkg file immediately."
    : "DELIVERY: Complete checkout now. Your Gumroad receipt is issued immediately. The Anki .apkg download link activates in your Gumroad library once the deck file is uploaded.";

  return [
    `${title} — independent UniPrep2Go Anki deck for active recall.`,
    mockPath
      ? `Built from the same validated item bank as the free readiness check: ${mockPath}`
      : "Pairs with the free UniPrep2Go readiness check on uniprep2go.study.",
    "",
    delivery,
    "",
    "Import into Anki desktop (File → Import), then sync to AnkiMobile or AnkiDroid via AnkiWeb.",
    "",
    "Independent study aid — not official exam material.",
  ].join("\n");
}

function resolveApkgPath(slug) {
  const relative = APKG_RELATIVE_PATHS[slug];
  if (!relative) {
    return null;
  }
  const absolute = join(ANKI_GENERATOR_ROOT, relative);
  return existsSync(absolute) ? absolute : null;
}

function resolveCoverPath(slug) {
  const webp = join(COVERS_DIR, `${slug}.webp`);
  return existsSync(webp) ? webp : null;
}

function buildApkgDisplayName(slug, titles) {
  const base = (titles[slug] ?? slug).replace(/\s*—\s*\d+\+?\s*Flashcards/i, "");
  const safe = base.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
  return `${safe}_Anki_Deck.apkg`;
}

function prepareSquareThumbnail(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-thumb-"));
  const fullPng = join(workDir, "full.png");
  const squarePng = join(workDir, "square.png");
  const thumbJpg = join(workDir, "thumb.jpg");

  try {
    execSync(`sips -s format png "${coverPath}" --out "${fullPng}"`, { stdio: "ignore" });
    const dims = execSync(`sips -g pixelWidth -g pixelHeight "${fullPng}"`, { encoding: "utf8" });
    const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0);
    const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0);
    const side = Math.min(width, height);
    execSync(`sips -c ${side} ${side} "${fullPng}" --out "${squarePng}"`, { stdio: "ignore" });
    execSync(`sips -z 1200 1200 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
    execSync(`sips -s format jpeg "${squarePng}" --out "${thumbJpg}"`, { stdio: "ignore" });
    return { thumbJpg, workDir };
  } catch (error) {
    rmSync(workDir, { recursive: true, force: true });
    throw error;
  }
}

function prepareCoverPng(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-cover-"));
  const coverPng = join(workDir, "cover.png");
  execSync(`sips -s format png "${coverPath}" --out "${coverPng}"`, { stdio: "ignore" });
  return { coverPng, workDir };
}

async function createGumroadProduct({ token, name, priceCents, description, permalink }) {
  const body = new URLSearchParams({
    access_token: token,
    name,
    price: String(priceCents),
    description,
    custom_permalink: permalink,
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
    throw new Error(
      `Gumroad create failed (${permalink}): ${JSON.stringify(payload).slice(0, 400)}`,
    );
  }

  return payload.product;
}

function uploadProductAssets({
  productId,
  slug,
  apkgPath,
  coverPath,
  apkgDisplayName,
  dryRun,
}) {
  console.log(`  assets: apkg ${apkgPath}`);
  runGumroad(
    `products update ${productId} --replace-files --file "${apkgPath}" --file-name "${apkgDisplayName}" --file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."`,
    { dryRun },
  );

  const { thumbJpg, workDir: thumbDir } = prepareSquareThumbnail(coverPath);
  try {
    console.log(`  assets: thumbnail (1200×1200 JPEG from ${coverPath})`);
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`, { dryRun });

    const { coverPng, workDir: coverDir } = prepareCoverPng(coverPath);
    try {
      console.log(`  assets: cover image`);
      runGumroad(`products update ${productId} --cover-image "${coverPng}"`, { dryRun });
    } finally {
      rmSync(coverDir, { recursive: true, force: true });
    }
  } finally {
    rmSync(thumbDir, { recursive: true, force: true });
  }
}

async function syncProductAssets({
  slug,
  record,
  titles,
  getAllMockExams,
  catalog,
  dryRun,
}) {
  const productId = record.gumroadProductId;
  if (!productId) {
    throw new Error(`${slug}: gumroadProductId missing — create product first`);
  }

  const apkgPath = resolveApkgPath(slug);
  const coverPath = resolveCoverPath(slug);
  if (!apkgPath) {
    throw new Error(
      `${slug}: .apkg not found. Set APKG_RELATIVE_PATHS in setup script and export deck under ${ANKI_GENERATOR_ROOT}`,
    );
  }
  if (!coverPath) {
    throw new Error(`${slug}: cover not found at public/covers/${slug}.webp`);
  }

  const name = titles[slug] ?? slug;
  const mock = getAllMockExams().find((entry) => entry.linkedDeckSlug === slug);
  const mockPath = mock ? `https://uniprep2go.study/mock-exams/${mock.slug}` : null;
  const description = buildProductDescription({ title: name, mockPath, apkgReady: true });
  const apkgDisplayName = buildApkgDisplayName(slug, titles);

  if (dryRun) {
    console.log(`  would upload apkg + thumbnail + cover`);
    console.log(`  would publish ${productId}`);
    return;
  }

  uploadProductAssets({
    productId,
    slug,
    apkgPath,
    coverPath,
    apkgDisplayName,
    dryRun: false,
  });

  runGumroad(`products update ${productId} --description ${JSON.stringify(description)}`);
  runGumroad(`products publish ${productId}`);

  catalog.products[slug] = {
    ...record,
    apkgUploadedAt: new Date().toISOString(),
    publishedAt: record.publishedAt ?? new Date().toISOString(),
  };

  console.log(`  assets uploaded + product published`);
}

async function main() {
  const args = parseArgs(process.argv);
  loadEnv();
  const token = resolveGumroadToken();
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const { getAllMockExams, titles } = await loadDeckMeta();

  const allSlugs = args.slug
    ? [args.slug]
    : Object.keys(catalog.products).filter((slug) => {
        if (args.force) return true;
        if (args.assetsOnly) {
          return catalog.products[slug].gumroadProductId && !catalog.products[slug].apkgUploadedAt;
        }
        return !catalog.products[slug].gumroadProductId;
      });

  if (allSlugs.length === 0) {
    if (args.assetsOnly) {
      console.log("No products need asset upload (all have apkgUploadedAt).");
    } else {
      console.log("All building deck Gumroad products already linked. Use --force to recreate.");
    }
    return;
  }

  if (args.assetsOnly) {
    console.log(`${args.dryRun ? "Dry-run" : "Upload assets for"} ${allSlugs.length} product(s)`);
    for (const slug of allSlugs) {
      console.log(`→ ${slug}`);
      await syncProductAssets({
        slug,
        record: catalog.products[slug],
        titles,
        getAllMockExams,
        catalog,
        dryRun: args.dryRun,
      });
    }
    if (!args.dryRun) {
      writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
      console.log(`\nUpdated ${CATALOG_PATH}`);
    }
    return;
  }

  console.log(
    `${args.dryRun ? "Dry-run" : "Create"} ${allSlugs.length} Gumroad product(s) @ $${(catalog.defaultPriceCents / 100).toFixed(2)}`,
  );

  for (const slug of allSlugs) {
    const record = catalog.products[slug];
    if (!record) {
      throw new Error(`Unknown slug in catalog: ${slug}`);
    }

    const name = titles[slug] ?? slug;
    const mock = getAllMockExams().find((entry) => entry.linkedDeckSlug === slug);
    const mockPath = mock ? `https://uniprep2go.study/mock-exams/${mock.slug}` : null;
    const apkgPath = resolveApkgPath(slug);
    const apkgReady = Boolean(apkgPath);
    const description = buildProductDescription({ title: name, mockPath, apkgReady });
    const permalink = record.permalink ?? slug;

    console.log(`→ ${slug}`);
    console.log(`  permalink: ${permalink}`);
    console.log(`  name: ${name}`);

    if (args.dryRun) {
      if (apkgPath) console.log(`  would upload: ${apkgPath}`);
      continue;
    }

    if (!token) {
      throw new Error(
        "Set GUMROAD_ACCESS_TOKEN in .env.local or run `gumroad login` (Finance decks uses `gumroad auth token`)",
      );
    }

    try {
      let productId = record.gumroadProductId;

      if (!productId || args.force) {
        const product = await createGumroadProduct({
          token,
          name,
          priceCents: catalog.defaultPriceCents,
          description,
          permalink,
        });

        productId = product.id;
        catalog.products[slug] = {
          ...record,
          permalink: product.custom_permalink ?? permalink,
          gumroadProductId: product.id,
          shortUrl: product.short_url,
          createdAt: new Date().toISOString(),
        };

        console.log(`  created: ${product.short_url} (${product.id})`);
        if (allSlugs.indexOf(slug) < allSlugs.length - 1) {
          await sleep(PRODUCT_CREATE_DELAY_MS);
        }
      }

      if (apkgPath && resolveCoverPath(slug)) {
        await syncProductAssets({
          slug,
          record: catalog.products[slug],
          titles,
          getAllMockExams,
          catalog,
          dryRun: false,
        });
      } else {
        console.warn(`  skip assets: export .apkg and cover before upload (${slug})`);
      }
    } catch (error) {
      if (/already exists|permalink/i.test(error.message)) {
        console.warn(`  warn ${slug}: ${error.message.slice(0, 120)}`);
      } else {
        throw error;
      }
    }
  }

  if (!args.dryRun) {
    writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`\nUpdated ${CATALOG_PATH}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
