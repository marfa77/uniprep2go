#!/usr/bin/env node
/**
 * Create Gumroad products for wave/licensing Anki decks (state RE, health, CDL, money gaps),
 * upload .apkg + thumbnail, publish, and update catalog JSON.
 *
 * Site launch policy (anki-deck-launch.ts): only cohort `money` auto-flips planned→available.
 * Prefer `--cohort money` for new publishes. Other cohorts may have Gumroad products for later,
 * but stay planned on the site for traffic/waitlist until explicitly allowlisted.
 *
 * Usage:
 *   node scripts/setup-gumroad-wave-decks.mjs --dry-run
 *   node scripts/setup-gumroad-wave-decks.mjs --slug series-65-anki-deck
 *   node scripts/setup-gumroad-wave-decks.mjs --cohort money
 *   node scripts/setup-gumroad-wave-decks.mjs --assets-only
 *
 * Env:
 *   GUMROAD_ACCESS_TOKEN — auto-resolved from .env.local, gumroad CLI config, or `gumroad auth token`
 *   ANKI_GENERATOR_ROOT — path to Anki Generator repo (default: ../Anki Generator)
 */

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/wave-anki-decks.json");
const SPECS_PATH = join(root, "src/data/wave-deck-specs.json");
const COVERS_DIR = join(root, "public/covers");
const GUMROAD_THUMBS_DIR = join(root, "public/gumroad-thumbnails");

const PRODUCT_CREATE_DELAY_MS = Number(process.env.GUMROAD_CREATE_DELAY_MS ?? 8000);
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() ||
  join(dirname(root), "Anki Generator");

/** Load deck specs (apkg paths, Gumroad titles). */
function loadSpecs() {
  return JSON.parse(readFileSync(SPECS_PATH, "utf8"));
}

function resolveApkgPath(slug) {
  const spec = loadSpecs()[slug];
  if (!spec) {
    return null;
  }
  const candidates = [
    join(ANKI_GENERATOR_ROOT, `out/wave/${spec.filePrefix}_FULL_${spec.cardCount}.apkg`),
    join(ANKI_GENERATOR_ROOT, `out/building/${spec.filePrefix}_FULL_${spec.cardCount}.apkg`),
  ];
  return candidates.find((path) => existsSync(path)) ?? null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveGumroadToken() {
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (token && source && source !== "env" && source !== "env.local") {
    console.log(`  gumroad auth: resolved from ${source} (synced to .env.local)`);
  }
  return token;
}

function parseArgs(argv) {
  const args = {
    slug: null,
    cohort: null,
    dryRun: false,
    force: false,
    assetsOnly: false,
    thumbnailsOnly: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--thumbnails-only") args.thumbnailsOnly = true;
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--cohort") args.cohort = argv[++i];
  }
  return args;
}

function loadEnv() {
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });
}

function runGumroad(args, { dryRun = false } = {}) {
  const flags = dryRun ? `${args} --dry-run` : args;
  execSync(`gumroad ${flags} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function loadDeckMeta() {
  const specs = loadSpecs();
  const titles = Object.fromEntries(
    Object.entries(specs).map(([slug, spec]) => [slug, spec.gumroadName]),
  );
  /** Minimal mock lookup from specs — avoids importing TS exam configs under plain node. */
  function getAllMockExams() {
    return Object.values(specs).map((spec) => ({
      slug: spec.mockSlug,
      linkedDeckSlug: spec.deckSlug,
    }));
  }
  return { getAllMockExams, titles };
}

/** Minimal HTML for create. Wave decks ship MCQ cards from the free readiness-check bank. */
function buildProductDescription({ title, mockPath, apkgReady }) {
  const delivery = apkgReady
    ? "Instant download. After checkout, open your Gumroad library or receipt and download the Anki <code>.apkg</code> file immediately."
    : "Complete checkout now. Your Gumroad receipt is issued immediately. The Anki <code>.apkg</code> download link activates in your Gumroad library once the deck file is uploaded.";

  const mockLink = mockPath
    ? `<p>Built from the same validated item bank as the <a href="${mockPath}">free readiness check</a> on UniPrep2Go.</p>`
    : "<p>Pairs with the free UniPrep2Go readiness check on <a href=\"https://uniprep2go.study/mock-exams\">uniprep2go.study</a>.</p>";

  return [
    `<p><strong>${title}</strong> — independent UniPrep2Go Anki deck for active recall (MCQ cards with explanations).</p>`,
    mockLink,
    `<p><strong>Delivery:</strong> ${delivery}</p>`,
    "<p>Import into Anki desktop (File → Import), then sync to AnkiMobile or AnkiDroid via AnkiWeb.</p>",
    "<p><em>Independent study aid — not official exam material.</em></p>",
  ].join("");
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

async function putGumroadDescriptionAsync(productId, description, dryRun) {
  if (dryRun) {
    return;
  }
  const token = resolveGumroadToken();
  if (!token) {
    throw new Error("GUMROAD_ACCESS_TOKEN required to update description");
  }
  const response = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`Gumroad description update failed: ${JSON.stringify(payload).slice(0, 200)}`);
  }
}

function resolveGumroadThumbnailPath(slug) {
  const jpg = join(GUMROAD_THUMBS_DIR, `${slug}.jpg`);
  if (existsSync(jpg)) {
    return jpg;
  }
  return null;
}

function prepareSquareThumbnail(coverPath, slug) {
  const prebuilt = slug ? resolveGumroadThumbnailPath(slug) : null;
  if (prebuilt) {
    return { thumbJpg: prebuilt, workDir: null, prebuilt: true };
  }

  const workDir = mkdtempSync(join(tmpdir(), "gumroad-thumb-"));
  const fullPng = join(workDir, "full.png");
  const squarePng = join(workDir, "square.png");
  const thumbJpg = join(workDir, "thumb.jpg");

  try {
    execSync(`sips -s format png "${coverPath}" --out "${fullPng}"`, { stdio: "ignore" });
    const dims = execSync(`sips -g pixelWidth -g pixelHeight "${fullPng}"`, { encoding: "utf8" });
    const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0);
    const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0);
    // Landscape site covers: crop the right (monogram) panel, not the left cream strip.
    const side = Math.min(width, height);
    const cropX = Math.max(0, width - side);
    execSync(
      `sips -c ${side} ${side} --cropOffset ${cropX} 0 "${fullPng}" --out "${squarePng}"`,
      { stdio: "ignore" },
    );
    execSync(`sips -z 1200 1200 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
    execSync(`sips -s format jpeg "${squarePng}" --out "${thumbJpg}"`, { stdio: "ignore" });
    return { thumbJpg, workDir, prebuilt: false };
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

async function createGumroadProduct({
  token,
  name,
  priceCents,
  description,
  permalink,
  retries = 6,
}) {
  const body = new URLSearchParams({
    access_token: token,
    name,
    price: String(priceCents),
    description,
    custom_permalink: permalink,
    require_shipping: "false",
    is_tiered_membership: "false",
  });

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const response = await fetch("https://api.gumroad.com/v2/products", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const text = await response.text();
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      const retryable = /retry later|rate|too many|429/i.test(text);
      if (retryable && attempt < retries) {
        const waitMs = Math.min(60_000, 5_000 * attempt);
        console.warn(`  rate-limited (non-JSON), wait ${waitMs}ms then retry ${attempt}/${retries}`);
        await sleep(waitMs);
        continue;
      }
      throw new Error(`Gumroad create failed (${permalink}): ${text.slice(0, 200)}`);
    }

    if (response.ok && payload.success) {
      return payload.product;
    }

    const message = JSON.stringify(payload).slice(0, 400);
    const retryable =
      response.status === 429 ||
      /retry later|rate|too many|limit/i.test(message);
    if (retryable && attempt < retries) {
      const waitMs = Math.min(60_000, 5_000 * attempt);
      console.warn(`  rate-limited, wait ${waitMs}ms then retry ${attempt}/${retries}`);
      await sleep(waitMs);
      continue;
    }

    throw new Error(`Gumroad create failed (${permalink}): ${message}`);
  }

  throw new Error(`Gumroad create failed (${permalink}): exhausted retries`);
}

function persistCatalog(catalog) {
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
}

function uploadProductThumbnail({ productId, slug, coverPath, dryRun }) {
  const { thumbJpg, workDir, prebuilt } = prepareSquareThumbnail(coverPath, slug);
  try {
    console.log(
      `  thumbnail: 1200×1200 JPEG${prebuilt ? " (blueprint square)" : " (cropped fallback)"}`,
    );
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`, { dryRun });
  } finally {
    if (workDir) {
      rmSync(workDir, { recursive: true, force: true });
    }
  }
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
  const fileFlags = `--file "${apkgPath}" --file-name "${apkgDisplayName}" --file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."`;
  try {
    runGumroad(`products update ${productId} --replace-files ${fileFlags}`, { dryRun });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/replace one embedded file|rich_content|remove-file/i.test(message)) {
      console.warn(`  replace-files blocked; appending .apkg without replace`);
      runGumroad(`products update ${productId} ${fileFlags}`, { dryRun });
    } else {
      throw error;
    }
  }

  const { thumbJpg, workDir, prebuilt } = prepareSquareThumbnail(coverPath, slug);
  try {
    console.log(
      `  assets: thumbnail (1200×1200 JPEG${prebuilt ? ", blueprint square" : ", cropped fallback"})`,
    );
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`, { dryRun });

    const { coverPng, workDir: coverDir } = prepareCoverPng(coverPath);
    try {
      console.log(`  assets: cover image`);
      runGumroad(`products update ${productId} --cover-image "${coverPng}"`, { dryRun });
    } finally {
      rmSync(coverDir, { recursive: true, force: true });
    }
  } finally {
    if (workDir) {
      rmSync(workDir, { recursive: true, force: true });
    }
  }
}

async function syncProductThumbnail({ slug, record, dryRun }) {
  const productId = record.gumroadProductId;
  if (!productId) {
    throw new Error(`${slug}: gumroadProductId missing`);
  }
  const coverPath = resolveCoverPath(slug);
  if (!coverPath) {
    throw new Error(`${slug}: cover not found at public/covers/${slug}.webp`);
  }

  if (dryRun) {
    console.log(`  would set square thumbnail`);
    return;
  }

  uploadProductThumbnail({ productId, slug, coverPath, dryRun: false });
  runGumroad(`products publish ${productId}`);
  console.log(`  thumbnail uploaded + product published`);
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
      `${slug}: .apkg not found. Export via wave_deck_pipeline under ${ANKI_GENERATOR_ROOT}/out/wave`,
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

  // Prefer polish_building_gumroad.py for rich HTML; only set a minimal HTML fallback here.
  await putGumroadDescriptionAsync(productId, description, dryRun);
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

  const specs = loadSpecs();
  const cohortSlugs = args.cohort
    ? Object.keys(catalog.products).filter((slug) => specs[slug]?.cohort === args.cohort)
    : null;

  const allSlugs = args.slug
    ? [args.slug]
    : (cohortSlugs ?? Object.keys(catalog.products)).filter((slug) => {
        if (args.force) return true;
        if (args.thumbnailsOnly) {
          return Boolean(catalog.products[slug].gumroadProductId);
        }
        if (args.assetsOnly) {
          return catalog.products[slug].gumroadProductId && !catalog.products[slug].apkgUploadedAt;
        }
        return !catalog.products[slug].gumroadProductId;
      });

  if (allSlugs.length === 0) {
    if (args.thumbnailsOnly) {
      console.log("No products with gumroadProductId found for thumbnail upload.");
    } else if (args.assetsOnly) {
      console.log("No products need asset upload (all have apkgUploadedAt).");
    } else {
      console.log("All wave deck Gumroad products already linked. Use --force or --cohort to recreate.");
    }
    return;
  }

  if (args.thumbnailsOnly) {
    console.log(`${args.dryRun ? "Dry-run" : "Upload thumbnails for"} ${allSlugs.length} product(s)`);
    for (const slug of allSlugs) {
      console.log(`→ ${slug}`);
      await syncProductThumbnail({
        slug,
        record: catalog.products[slug],
        dryRun: args.dryRun,
      });
    }
    return;
  }

  if (args.assetsOnly) {
    console.log(`${args.dryRun ? "Dry-run" : "Upload assets for"} ${allSlugs.length} product(s)`);
    let ok = 0;
    let failed = 0;
    for (const slug of allSlugs) {
      console.log(`→ ${slug}`);
      try {
        await syncProductAssets({
          slug,
          record: catalog.products[slug],
          titles,
          getAllMockExams,
          catalog,
          dryRun: args.dryRun,
        });
        if (!args.dryRun) persistCatalog(catalog);
        ok += 1;
      } catch (error) {
        failed += 1;
        console.warn(
          `  asset fail ${slug}: ${error instanceof Error ? error.message.slice(0, 180) : error}`,
        );
      }
      await sleep(1500);
    }
    if (!args.dryRun) {
      persistCatalog(catalog);
      console.log(`\nUpdated ${CATALOG_PATH} (ok=${ok} failed=${failed})`);
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
        "Gumroad token not found. Run `gumroad login`, or set GUMROAD_ACCESS_TOKEN. Scripts auto-read ~/.config/gumroad and sync into .env.local.",
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
        persistCatalog(catalog);

        console.log(`  created: ${product.short_url} (${product.id})`);
        await sleep(PRODUCT_CREATE_DELAY_MS);
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
        persistCatalog(catalog);
      } else {
        console.warn(`  skip assets: export .apkg and cover before upload (${slug})`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`  warn ${slug}: ${message.slice(0, 200)}`);
      persistCatalog(catalog);
      await sleep(PRODUCT_CREATE_DELAY_MS);
    }
  }

  if (!args.dryRun) {
    persistCatalog(catalog);
    console.log(`\nUpdated ${CATALOG_PATH}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
