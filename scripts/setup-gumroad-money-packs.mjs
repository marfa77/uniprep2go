#!/usr/bin/env node
/**
 * Gumroad money packs (Anki + PDF companions):
 *   CFA L1 Pass Pack — $29 (deck $19 + formula $19)
 *   PTCB 2026 Pass Pack — $24 (deck $19 + study guide $14)
 *
 * Usage:
 *   node scripts/setup-gumroad-money-packs.mjs --dry-run
 *   node scripts/setup-gumroad-money-packs.mjs
 *   node scripts/setup-gumroad-money-packs.mjs --slug cfa-level-1-pass-pack
 *   node scripts/setup-gumroad-money-packs.mjs --assets-only
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync, copyFileSync } from "node:fs";
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
const CATALOG_PATH = join(root, "src/data/gumroad/money-packs.json");
const STAGE = join(root, "tmp/money-packs");

/** @typedef {{ slug: string; permalink: string; name: string; priceCents: number; summary: string; coverSlug: string; files: { path: string; fileName: string; label: string }[]; singles: string; mockUrl: string; descriptionHtml: () => string }} PackSpec */

/** @type {PackSpec[]} */
const PACKS = [
  {
    slug: "cfa-level-1-pass-pack",
    permalink: "cfa-level-1-pass-pack",
    name: "CFA Level 1 Pass Pack 2026 — 348 Anki + Formula PDF",
    priceCents: 2900,
    summary:
      "CFA Level 1 Anki (348 scenario cards) + 2026 Formula Reference PDF (221 formulas, 22 Standards, 80-question drill). $29 vs $38 separate.",
    coverSlug: "cfa-level-1-anki-deck",
    files: [
      {
        path: join(STAGE, "CFA_Level_1_FULL_348.apkg"),
        fileName: "01_CFA_Level_1_FULL_348.apkg",
        label: "CFA Level 1 Anki — 348 scenario cards",
      },
      {
        path: join(STAGE, "CFA_L1_Formula_Reference_2026.pdf"),
        fileName: "02_CFA_L1_Formula_Reference_2026.pdf",
        label: "CFA Level 1 Formula Reference 2026 PDF",
      },
    ],
    singles: "$19 Anki + $19 formula PDF = $38",
    mockUrl: "https://uniprep2go.study/mock-exams/cfa-level-1-readiness-check",
    descriptionHtml() {
      return [
        "<p><strong>One checkout for Level 1 recall + formula cram.</strong> Daily spaced Anki plus a printable formula book for the last two weeks before the sitting.</p>",
        "<p><strong>PixID Studio / UniPrep2Go</strong> — <strong>$29</strong> (save vs buying separately at $38).</p>",
        "<h3>What’s inside</h3>",
        "<ul>",
        "<li><strong>348-card CFA Level 1 Anki</strong> (.apkg) — scenario fronts, worked example + common mistake on every back, weighted to 2026 topic ranges</li>",
        "<li><strong>Formula Reference 2026 PDF</strong> — 221 typeset formulas with exam traps, all 22 Standards, 80-question recall drill, printable</li>",
        "</ul>",
        "<h3>How to use</h3>",
        "<ol>",
        "<li>Import the .apkg into Anki Desktop and sync</li>",
        "<li>Run the free timed readiness check for topic gaps</li>",
        "<li>Drill weak topics in Anki; print the PDF for final formula/Ethics pass</li>",
        "</ol>",
        `<p>Free mock: <a href="${this.mockUrl}">CFA Level 1 readiness check</a> (free 25-question diagnostic).</p>`,
        `<p>Singles also sold separately: <a href="https://uniprep2go.study/decks/cfa-level-1-anki-deck">Anki</a> · <a href="https://uniprep2go.study/decks/cfa-level-1-formula-reference-2026">Formula PDF</a> (${this.singles}).</p>`,
        dualBrandFooterHtml(this.permalink),
        "<p><em>Independent study aid — not CFA Institute material.</em></p>",
      ].join("\n");
    },
  },
  {
    slug: "ptcb-2026-pass-pack",
    permalink: "ptcb-2026-pass-pack",
    name: "PTCB 2026 Pass Pack — 300 Anki + Outline Study Guide PDF",
    priceCents: 2400,
    summary:
      "PTCB / PTCE Anki (300 high-yield cards) + January 2026 outline study guide PDF (80Q practice + cheat sheets). $24 vs $33 separate.",
    coverSlug: "ptcb-pharmacy-technician-anki-deck",
    files: [
      {
        path: join(STAGE, "PTCB_Pharmacy_Tech_FULL_300.apkg"),
        fileName: "01_PTCB_Pharmacy_Tech_FULL_300.apkg",
        label: "PTCB Pharmacy Technician Anki — 300 cards",
      },
      {
        path: join(STAGE, "PTCB_Study_Guide_2026.pdf"),
        fileName: "02_PTCB_Study_Guide_2026.pdf",
        label: "PTCB Outline 2026 Study Guide PDF",
      },
    ],
    singles: "$19 Anki + $14 study guide = $33",
    mockUrl: "https://uniprep2go.study/mock-exams/ptcb-pharmacy-technician-mock",
    descriptionHtml() {
      return [
        "<p><strong>Blueprint reading + daily Anki repair for the January 2026 PTCE.</strong> Outline chapters and cheat sheets in the PDF; Top 200 / law / safety / sigs / math in Anki.</p>",
        "<p><strong>PixID Studio / UniPrep2Go</strong> — <strong>$24</strong> (save vs buying separately at $33).</p>",
        "<h3>What’s inside</h3>",
        "<ul>",
        "<li><strong>300-card PTCB Anki</strong> (.apkg) — 2026 domain weights, example + common mistake on every card</li>",
        "<li><strong>PTCB Outline 2026 Study Guide PDF</strong> — blueprint chapters (incl. DSCSA), 80-question practice exam, drug/sig/math cheat sheets</li>",
        "</ul>",
        "<h3>How to use</h3>",
        "<ol>",
        "<li>Take the free timed mock for a domain readiness report</li>",
        "<li>Read weak domains in the PDF; drill them in Anki daily</li>",
        "<li>Re-run the mock before Pearson VUE</li>",
        "</ol>",
        `<p>Free mock: <a href="${this.mockUrl}">PTCB / PTCE mock</a> (free 25-question diagnostic).</p>`,
        `<p>Singles also sold separately: <a href="https://uniprep2go.study/decks/ptcb-pharmacy-technician-anki-deck">Anki</a> · <a href="https://uniprep2go.study/decks/ptcb-study-guide-2026">Study guide</a> (${this.singles}).</p>`,
        dualBrandFooterHtml(this.permalink),
        "<p><em>Independent study aid — not PTCB material. Official PTCE is 90Q (80 scored) / 1h50 / scaled 1,400.</em></p>",
      ].join("\n");
    },
  },
];

function parseArgs(argv) {
  const args = { dryRun: false, assetsOnly: false, slugs: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--assets-only") args.assetsOnly = true;
    else if (argv[i] === "--slug") {
      if (!args.slugs) args.slugs = [];
      args.slugs.push(argv[++i]);
    }
  }
  return args;
}

function loadCatalog() {
  if (!existsSync(CATALOG_PATH)) {
    return { storeBaseUrl: "https://pixidstudio.gumroad.com", products: {} };
  }
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function saveCatalog(catalog) {
  mkdirSync(dirname(CATALOG_PATH), { recursive: true });
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

function runGumroad(args, { dryRun = false } = {}) {
  const flags = dryRun ? `${args} --dry-run` : args;
  execSync(`gumroad ${flags} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function createProduct(token, pack, { dryRun }) {
  const body = new URLSearchParams({
    access_token: token,
    name: pack.name,
    price: String(pack.priceCents),
    description: pack.descriptionHtml(),
    custom_permalink: pack.permalink,
    custom_summary: pack.summary,
    require_shipping: "false",
    is_tiered_membership: "false",
  });
  if (dryRun) {
    console.log("dry-run create", pack.slug, Object.fromEntries(body));
    return null;
  }
  const response = await fetch("https://api.gumroad.com/v2/products", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`Gumroad create failed (${pack.slug}): ${JSON.stringify(payload).slice(0, 500)}`);
  }
  return payload.product;
}

function prepareSquareThumbnail(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-pack-thumb-"));
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

async function setupPack(token, pack, catalog, args) {
  for (const f of pack.files) {
    if (!existsSync(f.path)) throw new Error(`Missing file for ${pack.slug}: ${f.path}`);
  }
  console.log(`\n=== ${pack.slug} ===`);
  for (const f of pack.files) console.log(`  ${f.fileName} ← ${basename(f.path)}`);

  let productId = catalog.products?.[pack.slug]?.gumroadProductId;

  if (!productId && !args.assetsOnly) {
    const product = await createProduct(token, pack, args);
    if (args.dryRun) return;
    productId = product.id;
    catalog.products = catalog.products || {};
    catalog.products[pack.slug] = {
      permalink: pack.permalink,
      gumroadProductId: productId,
      shortUrl: product.short_url || `https://pixidstudio.gumroad.com/l/${pack.permalink}`,
      priceCents: pack.priceCents,
      createdAt: new Date().toISOString(),
      fileNames: pack.files.map((f) => f.fileName),
      name: pack.name,
    };
    saveCatalog(catalog);
    console.log("created", productId);
  } else if (!productId) {
    throw new Error(`No product id for ${pack.slug} — run without --assets-only first`);
  } else {
    console.log("existing", productId);
  }

  if (args.dryRun) return;

  const coverSrc = join(root, `public/covers/${pack.coverSlug}.webp`);
  const coverDest = join(root, `public/covers/${pack.slug}.webp`);
  if (existsSync(coverSrc) && !existsSync(coverDest)) {
    copyFileSync(coverSrc, coverDest);
    console.log("cover copied", coverDest);
  }

  const current = JSON.parse(
    execSync(`gumroad products view ${productId} --json --non-interactive --yes`, {
      encoding: "utf8",
    }),
  );
  const existingFiles = (current.product || current).files || [];
  const byName = new Map(existingFiles.map((f) => [f.name, f.id]));
  for (const f of pack.files) {
    const oldId = byName.get(f.fileName);
    if (oldId) {
      console.log(`  replace ${f.fileName}`);
      runGumroad(
        `products update ${productId} --remove-file "${oldId}" --file "${f.path}" --file-name "${f.fileName}" --file-description "${f.label}"`,
      );
    } else {
      console.log(`  add ${f.fileName}`);
      runGumroad(
        `products update ${productId} --file "${f.path}" --file-name "${f.fileName}" --file-description "${f.label}"`,
      );
    }
  }

  runGumroad(`products update ${productId} --name "${pack.name.replace(/"/g, '\\"')}"`);

  const coverPath = existsSync(coverDest) ? coverDest : coverSrc;
  if (existsSync(coverPath)) {
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

  const descRes = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: pack.descriptionHtml(), price: pack.priceCents }),
  });
  const descPayload = await descRes.json();
  if (!descRes.ok || !descPayload.success) {
    console.warn("description/price warning:", JSON.stringify(descPayload).slice(0, 200));
  }

  runGumroad(`products publish ${productId}`);
  catalog.products[pack.slug].publishedAt = new Date().toISOString();
  catalog.products[pack.slug].filesUploadedAt = new Date().toISOString();
  catalog.products[pack.slug].name = pack.name;
  catalog.products[pack.slug].priceCents = pack.priceCents;
  saveCatalog(catalog);
  console.log("done:", `https://pixidstudio.gumroad.com/l/${pack.permalink}`);
}

async function main() {
  loadLocalEnvFiles();
  const args = parseArgs(process.argv);
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (!token) throw new Error("No Gumroad token");
  console.log(`gumroad auth: ${source}`);

  const catalog = loadCatalog();
  const selected = args.slugs ? PACKS.filter((p) => args.slugs.includes(p.slug)) : PACKS;
  if (selected.length === 0) throw new Error("No packs matched --slug");

  for (const pack of selected) {
    await setupPack(token, pack, catalog, args);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
