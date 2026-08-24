#!/usr/bin/env node
/**
 * Polish every live SKU track: prices → Gumroad copy/landings → stamp JSON.
 *
 *   node scripts/batch-polish-prod-skus.mjs --dry-run
 *   node scripts/batch-polish-prod-skus.mjs --track language
 *   node scripts/batch-polish-prod-skus.mjs --track wave --slug nha-cpct-anki-deck
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = { dryRun: false, track: "all", slug: null, skipPrices: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--skip-prices") args.skipPrices = true;
    else if (argv[i] === "--track") args.track = argv[++i];
    else if (argv[i] === "--slug") args.slug = argv[++i];
  }
  return args;
}

function run(cmd, label) {
  console.log(`\n## ${label}\n$ ${cmd}\n`);
  if (process.argv.includes("--dry-run")) {
    return;
  }
  execSync(cmd, { cwd: root, stdio: "inherit", env: process.env });
}

function sampleCount(slug) {
  return [1, 2, 3].filter((n) => existsSync(join(root, `public/samples/${slug}-sample-${n}.webp`))).length;
}

function unpolishedSlugs(catalogPath) {
  const catalog = JSON.parse(readFileSync(join(root, catalogPath), "utf8"));
  return Object.entries(catalog.products)
    .filter(([, p]) => p.gumroadProductId && !p.landingPublishedAt)
    .map(([slug]) => slug);
}

function stampLanguagePolish(slugs) {
  const path = join(root, "src/data/gumroad/language-anki-decks.json");
  const catalog = JSON.parse(readFileSync(path, "utf8"));
  const now = new Date().toISOString();
  for (const slug of slugs) {
    if (!catalog.products[slug]) continue;
    catalog.products[slug] = {
      ...catalog.products[slug],
      descriptionPolishedAt: catalog.products[slug].descriptionPolishedAt ?? now,
      samplesUploadedAt: catalog.products[slug].samplesUploadedAt ?? now,
      landingPublishedAt: now,
    };
  }
  writeFileSync(path, `${JSON.stringify(catalog, null, 2)}\n`);
}

function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });

  if (!args.skipPrices && (args.track === "all" || args.track === "prices")) {
    run(
      `node scripts/sync-gumroad-catalog-prices.mjs${args.slug ? ` --slug ${args.slug}` : ""}${args.dryRun ? " --dry-run" : ""}`,
      "Sync Gumroad prices to catalog-list-prices.json",
    );
  }

  if (args.track === "all" || args.track === "language") {
    const langSlugs = args.slug
      ? [args.slug]
      : unpolishedSlugs("src/data/gumroad/language-anki-decks.json").filter((s) => sampleCount(s) >= 3);
    if (langSlugs.length) {
      run(
        `node scripts/setup-gumroad-language-decks.mjs --copy-only${args.slug ? ` --slug ${args.slug}` : ""}${args.dryRun ? " --dry-run" : ""}`,
        `Language Gumroad descriptions (${langSlugs.length})`,
      );
      const slugArgs = langSlugs.map((s) => `--slug ${s}`).join(" ");
      if (!args.dryRun) {
        const out = execSync(`python3 scripts/publish-language-gumroad-landings.py ${slugArgs}`, {
          cwd: root,
          encoding: "utf8",
        });
        console.log(out);
        const okSlugs = [...out.matchAll(/^OK\s+(\S+)/gm)].map((m) => m[1]);
        if (okSlugs.length) stampLanguagePolish(okSlugs);
      } else {
        run(
          `python3 scripts/publish-language-gumroad-landings.py ${slugArgs} --dry-run`,
          `Language Sample cards landings (${langSlugs.length})`,
        );
      }
    } else {
      console.log("Language: nothing to polish (all landingPublishedAt or missing samples)");
    }
  }

  if (args.track === "all" || args.track === "building") {
    const buildingSlugs = args.slug
      ? [args.slug]
      : unpolishedSlugs("src/data/gumroad/building-anki-decks.json").filter((s) => sampleCount(s) >= 3);
    for (const slug of buildingSlugs) {
      run(
        `python3 scripts/polish-building-gumroad.py --slug ${slug}${args.dryRun ? " --dry-run" : ""}`,
        `Building polish ${slug}`,
      );
      run(
        `python3 scripts/publish-building-gumroad-landings.py --slug ${slug}${args.dryRun ? " --dry-run" : ""}`,
        `Building landing ${slug}`,
      );
    }
  }

  if (args.track === "all" || args.track === "wave") {
    const waveSlugs = args.slug
      ? [args.slug]
      : unpolishedSlugs("src/data/gumroad/wave-anki-decks.json").filter((s) => sampleCount(s) >= 3);
    for (const slug of waveSlugs) {
      run(
        `node scripts/setup-gumroad-wave-decks.mjs --slug ${slug} --polish-only${args.dryRun ? " --dry-run" : ""}`,
        `Wave polish ${slug}`,
      );
    }
  }

  if (args.track === "all" || args.track === "finance") {
    run(
      `node scripts/publish-finance-gumroad-polish.mjs${args.slug ? ` --slug ${args.slug}` : ""}${args.dryRun ? " --dry-run" : ""}`,
      "Finance Gumroad sample landings",
    );
  }

  console.log("\nBatch polish pass complete.");
}

main();
