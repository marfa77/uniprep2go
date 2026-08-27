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
 *   node scripts/setup-gumroad-wave-decks.mjs --slug ace-cpt-anki-deck --polish-only
 *
 * Always ships rich HTML description + sample screenshots:
 *   1) --preview-image gallery
 *   2) custom landing Sample cards body (publish-wave-gumroad-landings.py)
 * when public/samples/{slug}-sample-{1,2,3}.webp exist. Missing samples fail polish/assets.
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
import { gumroadDiscoverFields } from "./lib/gumroad-discover.mjs";
import { putGumroadDigitalSettings } from "./lib/gumroad-product-settings.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/wave-anki-decks.json");
const SPECS_PATH = join(root, "src/data/wave-deck-specs.json");
const COVERS_DIR = join(root, "public/covers");
const GUMROAD_THUMBS_DIR = join(root, "public/gumroad-thumbnails");
const SAMPLES_DIR = join(root, "public/samples");

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
    polishOnly: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--thumbnails-only") args.thumbnailsOnly = true;
    else if (arg === "--polish-only") args.polishOnly = true;
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

function resolveSampleWebps(slug) {
  return [1, 2, 3]
    .map((n) => join(SAMPLES_DIR, `${slug}-sample-${n}.webp`))
    .filter((path) => existsSync(path));
}

/** Rich HTML — exam context, topics, FAQ, sample note. Required for every published wave SKU. */
function buildProductDescription({ title, mockPath, apkgReady, spec }) {
  const delivery = apkgReady
    ? "Instant download. After checkout, open your Gumroad library or receipt and download the Anki <code>.apkg</code> file immediately."
    : "Complete checkout now. Your Gumroad receipt is issued immediately. The Anki <code>.apkg</code> download link activates in your Gumroad library once the deck file is uploaded.";

  const count = spec?.cardCount ?? null;
  const topics = spec?.topics ? Object.values(spec.topics) : [];
  const topicItems = topics.map((t) => `<li>${t}</li>`).join("");
  const exam = spec?.deckName || spec?.deckLabel || title;
  const disclaimer = spec?.disclaimerOrg || exam;
  const mockSlug = spec?.mockSlug;
  const deckSlug = spec?.deckSlug;
  const mockLink = mockPath
    ? `<p>Built from the same validated item bank as the <a href="${mockPath}">free readiness check</a> on UniPrep2Go.</p>`
    : "<p>Pairs with the free UniPrep2Go readiness check on <a href=\"https://uniprep2go.study/mock-exams\">uniprep2go.study</a>.</p>";

  const samplesNote =
    resolveSampleWebps(deckSlug || "").length >= 3
      ? `<hr><h2><strong>Sample cards</strong></h2><p>Real Anki screenshots from this deck (question, options, answer, and explanation) are shown in the <strong>Sample cards</strong> section on this product page and in the image gallery.</p>`
      : "";

  const countLine = count
    ? `<p><strong>${count} ${exam} Anki flashcards</strong> — MCQ format with explanations and distractor notes on every card.</p>`
    : `<p><strong>${title}</strong> — independent UniPrep2Go Anki deck for active recall (MCQ cards with explanations).</p>`;

  const inside = count
    ? `<p><strong>What's inside:</strong></p><ul>
<li>${count} high-yield MCQ cards</li>
${topicItems}
<li>Same validated bank as the free UniPrep2Go readiness check</li>
</ul>`
    : "";

  const faq = mockSlug
    ? `<hr><h2><strong>FAQ</strong></h2>
<p><strong>What exam is this for?</strong><br>${exam} exam prep via spaced-repetition Anki flashcards.</p>
<p><strong>Is there a free practice test?</strong><br>Yes — <a href="https://uniprep2go.study/mock-exams/${mockSlug}">uniprep2go.study/mock-exams/${mockSlug}</a>.</p>
<p><strong>Is this official exam material?</strong><br>No. Independent study aid — not affiliated with or endorsed by ${disclaimer}.</p>
<p><strong>What file format is delivered?</strong><br>Digital download: Anki-compatible <code>.apkg</code> through Gumroad.</p>
<p><strong>Refunds?</strong><br>Digital download — all sales final.</p>`
    : "";

  const siteLinks =
    deckSlug && mockSlug
      ? `<p>Also on UniPrep2Go: <a href="https://uniprep2go.study/decks/${deckSlug}">Anki deck page</a> · <a href="https://uniprep2go.study/mock-exams/${mockSlug}">free ${spec?.shortTitle || exam} check</a>.</p>`
      : "";

  return [
    countLine,
    mockLink,
    inside,
    `<p><strong>Delivery:</strong> ${delivery}</p>`,
    "<p><strong>Built for daily phone review.</strong> Import the .apkg into Anki desktop, sync to AnkiMobile or AnkiDroid, and run 15–25 cards per day between practice tests.</p>",
    siteLinks,
    `<p><em>Independent study aid. Not affiliated with or endorsed by ${disclaimer}.</em></p>`,
    samplesNote,
    faq,
  ].join("");
}

/** Keep only the first N covers so sample uploads stay under Gumroad's 8-preview limit. */
function stripExtraCovers(productId, { keep = 1, dryRun = false } = {}) {
  if (dryRun) return;
  const raw = execSync(
    `gumroad products view ${productId} --json --non-interactive --yes`,
    { encoding: "utf8" },
  );
  const view = JSON.parse(raw);
  const covers = (view.product || view).covers || [];
  if (covers.length <= keep) {
    console.log(`  covers: ${covers.length} (keep ${keep})`);
    return;
  }
  const extra = covers.slice(keep);
  for (const cover of [...extra].reverse()) {
    const cid = cover?.id;
    if (!cid) continue;
    runGumroad(`products covers remove ${productId} ${cid}`, { dryRun: false });
  }
  console.log(`  covers: ${covers.length}→${keep} (stripped ${extra.length} extras)`);
}

/** Convert sample webps → JPEG and attach as Gumroad preview/gallery images. */
function uploadSamplePreviews({ productId, slug, dryRun }) {
  const samples = resolveSampleWebps(slug);
  if (samples.length < 3) {
    throw new Error(
      `${slug}: need 3 sample screenshots at public/samples/${slug}-sample-{1,2,3}.webp (got ${samples.length}). Gumroad products must include description + screenshots.`,
    );
  }

  stripExtraCovers(productId, { keep: 1, dryRun });

  const workDir = mkdtempSync(join(tmpdir(), `gumroad-samples-${slug}-`));
  try {
    const jpgs = samples.map((webp, index) => {
      const jpg = join(workDir, `sample-${index + 1}.jpg`);
      execSync(`sips -s format jpeg "${webp}" --out "${jpg}"`, { stdio: "ignore" });
      return jpg;
    });
    console.log(`  samples: ${jpgs.length} preview screenshots`);
    for (const jpg of jpgs) {
      runGumroad(`products update ${productId} --preview-image "${jpg}"`, { dryRun });
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

/** Publish custom landing HTML with Sample cards images in the product body. */
function publishSampleLanding({ slug, dryRun }) {
  const cmd = `python3 scripts/publish-wave-gumroad-landings.py --slug ${slug}${dryRun ? " --dry-run" : ""}`;
  console.log(`  landing: Sample cards body → Gumroad custom page`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
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

function discoverFieldsForWave(slug, spec) {
  return gumroadDiscoverFields({
    slug,
    tagPrefix: spec?.tagPrefix,
    deckLabel: spec?.deckLabel,
    shortTitle: spec?.shortTitle,
    name: spec?.gumroadName,
  });
}

async function putGumroadDescriptionAsync(productId, description, dryRun, slug, spec) {
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
    body: JSON.stringify({
      description,
      ...(slug ? discoverFieldsForWave(slug, spec) : {}),
    }),
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
    execSync(`sips -z 600 600 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
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
    is_epublication: "true",
    quantity_enabled: "false",
    should_show_sales_count: "false",
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
      `  thumbnail: 600×600 JPEG${prebuilt ? " (blueprint square)" : " (cropped fallback)"}`,
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
      `  assets: thumbnail (600×600 JPEG${prebuilt ? ", blueprint square" : ", cropped fallback"})`,
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
  const specs = loadSpecs();
  const name = specs[slug]?.gumroadName;
  if (name) {
    runGumroad(`products update ${productId} --name "${name.replace(/"/g, '\\"')}"`, { dryRun: false });
  }
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
  const specs = loadSpecs();
  const spec = specs[slug];
  const mock = getAllMockExams().find((entry) => entry.linkedDeckSlug === slug);
  const mockPath = mock ? `https://uniprep2go.study/mock-exams/${mock.slug}` : null;
  const description = buildProductDescription({
    title: name,
    mockPath,
    apkgReady: true,
    spec,
  });
  const apkgDisplayName = buildApkgDisplayName(slug, titles);

  if (dryRun) {
    console.log(`  would upload apkg + thumbnail + cover + 3 sample previews`);
    console.log(`  would set rich description + publish ${productId}`);
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

  runGumroad(`products update ${productId} --name "${name.replace(/"/g, '\\"')}"`, { dryRun: false });
  await putGumroadDescriptionAsync(productId, description, dryRun, slug, spec);

  const sampleCount = resolveSampleWebps(slug).length;
  let samplesReady = false;
  if (sampleCount >= 3) {
    uploadSamplePreviews({ productId, slug, dryRun: false });
    publishSampleLanding({ slug, dryRun: false });
    samplesReady = true;
  } else {
    console.warn(
      `  skip samples/landing: ${sampleCount}/3 webps — ship cover + description until user Anki screenshots`,
    );
  }

  runGumroad(`products publish ${productId}`);

  const refreshed = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  catalog.products[slug] = {
    ...(refreshed.products[slug] ?? record),
    apkgUploadedAt: new Date().toISOString(),
    publishedAt: record.publishedAt ?? new Date().toISOString(),
    ...(samplesReady
      ? {
          descriptionPolishedAt: new Date().toISOString(),
          samplesUploadedAt: new Date().toISOString(),
        }
      : {}),
  };

  console.log(
    samplesReady
      ? `  assets + description + samples + landing uploaded + product published`
      : `  assets + description uploaded + product published (samples pending)`,
  );
}

async function syncProductPolish({ slug, record, titles, getAllMockExams, catalog, dryRun }) {
  const productId = record.gumroadProductId;
  if (!productId) {
    throw new Error(`${slug}: gumroadProductId missing — create product first`);
  }
  const specs = loadSpecs();
  const spec = specs[slug];
  if (!spec) {
    throw new Error(`${slug}: missing wave-deck-specs entry`);
  }
  const name = titles[slug] ?? slug;
  const mock = getAllMockExams().find((entry) => entry.linkedDeckSlug === slug);
  const mockPath = mock ? `https://uniprep2go.study/mock-exams/${mock.slug}` : null;
  const apkgReady = Boolean(resolveApkgPath(slug));
  const description = buildProductDescription({ title: name, mockPath, apkgReady, spec });

  if (dryRun) {
    console.log(`  would polish description + upload 3 sample previews + publish Sample cards landing`);
    return;
  }

  uploadSamplePreviews({ productId, slug, dryRun: false });
  runGumroad(`products update ${productId} --name "${name.replace(/"/g, '\\"')}"`, { dryRun: false });
  await putGumroadDigitalSettings(resolveGumroadToken(), productId);
  await putGumroadDescriptionAsync(productId, description, false, slug, spec);
  publishSampleLanding({ slug, dryRun: false });
  runGumroad(`products publish ${productId}`);
  const refreshed = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  catalog.products[slug] = {
    ...(refreshed.products[slug] ?? record),
    descriptionPolishedAt: new Date().toISOString(),
    samplesUploadedAt: new Date().toISOString(),
  };
  console.log(`  description + samples + landing polished + product published`);
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
        if (args.thumbnailsOnly || args.polishOnly) {
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
    } else if (args.polishOnly) {
      console.log("No products with gumroadProductId found to polish.");
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
      await sleep(1500);
    }
    return;
  }

  if (args.polishOnly) {
    console.log(`${args.dryRun ? "Dry-run" : "Polish description + samples for"} ${allSlugs.length} product(s)`);
    let ok = 0;
    let failed = 0;
    for (const slug of allSlugs) {
      console.log(`→ ${slug}`);
      try {
        await syncProductPolish({
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
          `  polish fail ${slug}: ${error instanceof Error ? error.message.slice(0, 220) : error}`,
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
    const description = buildProductDescription({
      title: name,
      mockPath,
      apkgReady,
      spec: specs[slug],
    });
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
        await putGumroadDigitalSettings(token, productId);
        const discover = discoverFieldsForWave(slug, specs[slug]);
        const discoverRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discover),
        });
        const discoverPayload = await discoverRes.json();
        if (!discoverRes.ok || !discoverPayload.success) {
          console.warn(`  discover warning: ${JSON.stringify(discoverPayload).slice(0, 160)}`);
        } else {
          console.log(`  discover: ${discover.category} ${JSON.stringify(discover.tags)}`);
        }
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
