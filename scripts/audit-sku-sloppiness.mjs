#!/usr/bin/env node
/**
 * Mechanical "unfinished SKU" audit — site + assets + copy signals.
 * Does not hit Gumroad API (use validate:wave-deck for catalog gates).
 *
 *   node scripts/audit-sku-sloppiness.mjs
 *   node scripts/audit-sku-sloppiness.mjs --slug sie-exam-anki-deck
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = { slug: null, json: false, liveOnly: true };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--json") args.json = true;
    else if (argv[i] === "--all-planned") args.liveOnly = false;
  }
  return args;
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

const PLACEHOLDER_Q = [
  /what is included/i,
  /what'?s inside the deck/i,
  /^sample question$/i,
];

function sampleIssues(slug, cards) {
  const issues = [];
  const webps = [1, 2, 3].map((n) => join(root, `public/samples/${slug}-sample-${n}.webp`));
  const hit = webps.filter((p) => existsSync(p)).length;
  if (hit < 3) issues.push({ code: "samples-missing", detail: `${hit}/3 webp in public/samples/` });

  if (cards.length === 0) {
    issues.push({ code: "samples-empty", detail: "No sampleCards in deck catalog" });
    return issues;
  }
  if (cards.length < 3) {
    issues.push({ code: "samples-count", detail: `${cards.length} sampleCards (want 3)` });
  }
  for (const [i, card] of cards.entries()) {
    const q = String(card.question || "");
    if (PLACEHOLDER_Q.some((re) => re.test(q))) {
      issues.push({ code: "samples-placeholder", detail: `sample ${i + 1} placeholder: "${q.slice(0, 60)}"` });
    }
    const img = card.imageUrl || "";
    if (img.includes("/covers/") && !img.includes("/samples/")) {
      issues.push({ code: "samples-cover-only", detail: `sample ${i + 1} uses cover image` });
    }
    if (img && !existsSync(join(root, "public", img.replace(/^\//, "")))) {
      issues.push({ code: "samples-broken-img", detail: `sample ${i + 1} missing file ${img}` });
    }
  }
  const sizes = webps.filter(existsSync).map((p) => statSync(p).size);
  if (sizes.length >= 2 && new Set(sizes).size === 1) {
    issues.push({ code: "samples-identical-webp", detail: "All sample webp files same byte size (likely duplicated)" });
  }
  return issues;
}

function gumroadIssues(slug, wave, building) {
  const issues = [];
  const product = wave.products[slug] || building.products[slug];
  if (!product) return [{ code: "gumroad-missing", detail: "Not in wave/building Gumroad JSON" }];
  if (!product.gumroadProductId) {
    issues.push({ code: "gumroad-no-id", detail: "No gumroadProductId" });
  }
  if (!product.apkgUploadedAt) {
    issues.push({ code: "gumroad-no-apkg", detail: "No apkgUploadedAt" });
  }
  if (!product.descriptionPolishedAt || !product.samplesUploadedAt) {
    issues.push({ code: "gumroad-unpolished", detail: "Missing descriptionPolishedAt or samplesUploadedAt" });
  }
  if (!product.landingPublishedAt) {
    issues.push({ code: "gumroad-no-landing", detail: "Missing landingPublishedAt (Sample cards body)" });
  }
  return issues;
}

function moneyPageIssues(slug) {
  const money = readFileSync(join(root, "src/lib/deck-money-page-content.ts"), "utf8");
  if (!money.includes(`"${slug}"`)) {
    return [{ code: "money-page-thin", detail: "No unique money-page block" }];
  }
  return [];
}

function thumbIssues(slug) {
  const p = join(root, `public/gumroad-thumbnails/${slug}.jpg`);
  if (!existsSync(p)) return [{ code: "shop-thumb-missing", detail: "No studio thumb JPG" }];
  return [];
}

/** Extract available deck slugs from decks.ts without importing TS. */
function listAvailableDeckSlugs() {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?status:\s*"available"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return [...new Set(slugs)];
}

function deckSampleCards(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const idx = src.indexOf(`slug: "${slug}"`);
  if (idx < 0) return [];
  const chunk = src.slice(idx, idx + 12000);
  const cards = [];
  const cardRe = /question:\s*"((?:\\.|[^"\\])*)"/g;
  let cm;
  while ((cm = cardRe.exec(chunk))) {
    cards.push({ question: cm[1].replace(/\\"/g, '"') });
  }
  const imgRe = /imageUrl:\s*"([^"]+)"/g;
  let im;
  let i = 0;
  while ((im = imgRe.exec(chunk)) && i < cards.length) {
    cards[i].imageUrl = im[1];
    i += 1;
  }
  return cards.slice(0, 3);
}

function main() {
  const args = parseArgs(process.argv);
  const wave = readJson("src/data/gumroad/wave-anki-decks.json");
  const building = readJson("src/data/gumroad/building-anki-decks.json");
  let slugs = listAvailableDeckSlugs();
  if (args.slug) slugs = slugs.filter((s) => s === args.slug);

  const results = [];
  for (const slug of slugs) {
    const cards = deckSampleCards(slug);
    const issues = [
      ...sampleIssues(slug, cards),
      ...gumroadIssues(slug, wave, building),
      ...moneyPageIssues(slug),
      ...thumbIssues(slug),
    ];
    if (issues.length) results.push({ slug, issues, issueCount: issues.length });
  }

  results.sort((a, b) => b.issueCount - a.issueCount);

  if (args.json) {
    console.log(JSON.stringify({ audited: slugs.length, sloppy: results.length, results }, null, 2));
    return;
  }

  console.log(`Audited ${slugs.length} available deck SKUs · ${results.length} with sloppiness signals\n`);
  for (const r of results) {
    console.log(`${r.slug} (${r.issueCount})`);
    for (const i of r.issues) console.log(`  · ${i.code}: ${i.detail}`);
    console.log("");
  }
}

main();
