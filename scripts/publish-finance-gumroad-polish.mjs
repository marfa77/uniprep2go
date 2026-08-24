#!/usr/bin/env node
/**
 * Publish Sample cards Gumroad landings for finance catalog decks (CFA, FRM, SIE, Series…).
 * Uses checkout permalink + public/samples webps. Stamps src/data/gumroad/finance-anki-decks.json.
 *
 *   node scripts/publish-finance-gumroad-polish.mjs --dry-run
 *   node scripts/publish-finance-gumroad-polish.mjs --slug cfa-level-1-anki-deck
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FINANCE_CATALOG = join(root, "src/data/gumroad/finance-anki-decks.json");
const CDN_CACHE = join(root, "src/data/gumroad/finance-sample-cdn.json");
const OUT_DIR = join(root, "landing-pages/finance");

function parseArgs(argv) {
  const args = { dryRun: false, slug: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--slug") args.slug = argv[++i];
  }
  return args;
}

function listFinanceDecks() {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?status:\s*"available"/g;
  let m;
  while ((m = re.exec(src))) {
    const chunk = src.slice(m.index, m.index + 4000);
    if (/category:\s*"finance"/.test(chunk)) slugs.push(m[1]);
  }
  return [...new Set(slugs)];
}

function deckMeta(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const idx = src.indexOf(`slug: "${slug}"`);
  const chunk = src.slice(idx, idx + 8000);
  return {
    checkoutUrl: (chunk.match(/checkoutUrl:\s*"([^"]+)"/) || [])[1],
    title: (chunk.match(/title:\s*"((?:\\.|[^"\\])*)"/) || [])[1]?.replace(/\\"/g, '"'),
    shortName: (chunk.match(/shortName:\s*"((?:\\.|[^"\\])*)"/) || [])[1]?.replace(/\\"/g, '"'),
  };
}

function permalink(url) {
  return url?.match(/gumroad\.com\/l\/([^/?]+)/i)?.[1];
}

function gumroadJson(args) {
  const raw = execSync(`gumroad ${args.join(" ")} --json --non-interactive`, { encoding: "utf8" });
  return JSON.parse(raw);
}

function sampleWebps(slug) {
  return [1, 2, 3]
    .map((n) => join(root, `public/samples/${slug}-sample-${n}.webp`))
    .filter((p) => existsSync(p));
}

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function saveJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function ensureCdnUrls(productId, slug, cache, dryRun) {
  const paths = sampleWebps(slug);
  if (paths.length < 3) return [];
  if (cache[slug]?.length >= 3 && !dryRun) return cache[slug].slice(0, 3);

  if (dryRun) {
    return paths.map((_, i) => `https://public-files.gumroad.com/dry-run-${slug}-${i + 1}`);
  }

  const urls = [];
  for (const webp of paths) {
    const jpg = `/tmp/${slug}-${urls.length + 1}.jpg`;
    execSync(`magick "${webp}" -quality 88 "${jpg}"`);
    execSync(
      `gumroad products update ${productId} --preview-image "${jpg}" --non-interactive`,
      { stdio: "inherit" },
    );
    const view = gumroadJson(["products", "view", productId]);
    const product = view.product ?? view;
    const covers = product.covers ?? [];
    const last = covers[covers.length - 1];
    const url = last?.original_url || last?.url;
    if (url) urls.push(url);
  }
  cache[slug] = urls;
  saveJson(CDN_CACHE, cache);
  return urls.slice(0, 3);
}

function renderLanding({ title, shortName, slug, sampleUrls, mockUrl }) {
  const samplesHtml = sampleUrls
    .map(
      (url, i) =>
        `<figure style="margin:1rem 0"><img src="${url}" alt="Sample card ${i + 1}" style="max-width:100%;border-radius:8px"/><figcaption style="color:#666;font-size:0.9rem">Sample ${i + 1} — ${shortName}</figcaption></figure>`,
    )
    .join("\n");
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;padding:1.5rem;line-height:1.5">
<h1>${title}</h1>
<p>Independent UniPrep2Go study deck — active-recall Anki flashcards delivered as an instant .apkg download through Gumroad.</p>
${mockUrl ? `<p>Free practice test: <a href="${mockUrl}">${mockUrl}</a></p>` : ""}
<p>Deck page: <a href="https://uniprep2go.study/decks/${slug}">uniprep2go.study/decks/${slug}</a></p>
<h2>Sample cards</h2>
${samplesHtml}
<p><em>Independent study aid — not official exam material.</em></p>
</body></html>`;
}

function linkedMockSlug(deckSlug) {
  const configs = readFileSync(join(root, "src/lib/mock-exams/configs.ts"), "utf8");
  const re = new RegExp(`slug:\\s*"([^"]+)"[\\s\\S]*?linkedDeckSlug:\\s*"${deckSlug}"`);
  return configs.match(re)?.[1] ?? null;
}

function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });

  const catalog = loadJson(FINANCE_CATALOG, { products: {} });
  const cdnCache = loadJson(CDN_CACHE, {});
  mkdirSync(OUT_DIR, { recursive: true });

  const slugs = args.slug ? [args.slug] : listFinanceDecks();
  const now = new Date().toISOString();

  for (const slug of slugs) {
    const meta = deckMeta(slug);
    const perm = permalink(meta.checkoutUrl);
    if (!perm) {
      console.log(`SKIP ${slug} — no Gumroad permalink`);
      continue;
    }
    if (sampleWebps(slug).length < 3) {
      console.log(`SKIP ${slug} — need 3 sample webps`);
      continue;
    }

    try {
      const product = (gumroadJson(["products", "view", perm]).product ?? {});
      const productId = product.id;
      if (!productId) throw new Error("no product id");

      const sampleUrls = ensureCdnUrls(productId, slug, cdnCache, args.dryRun);
      const mockSlug = linkedMockSlug(slug);
      const mockUrl = mockSlug ? `https://uniprep2go.study/mock-exams/${mockSlug}` : null;
      const coverUrl = product.covers?.[0]?.original_url || product.covers?.[0]?.url || "";
      const html = renderLanding({
        title: meta.title || product.name,
        shortName: meta.shortName || slug,
        slug,
        sampleUrls,
        mockUrl,
      });
      const outPath = join(OUT_DIR, `${slug}.html`);
      writeFileSync(outPath, html);

      if (args.dryRun) {
        console.log(`DRY ${slug} → ${outPath}`);
        continue;
      }

      const tmp = `/tmp/gumroad-finance-${slug}.html`;
      writeFileSync(tmp, html);
      execSync(`gumroad products page publish ${productId} "${tmp}" --yes --non-interactive`, {
        stdio: "inherit",
      });
      execSync(`gumroad products publish ${productId} --non-interactive`, { stdio: "inherit" });

      catalog.products[slug] = {
        ...(catalog.products[slug] ?? { permalink: perm }),
        gumroadProductId: productId,
        shortUrl: product.short_url ?? meta.checkoutUrl.split("?")[0],
        descriptionPolishedAt: now,
        samplesUploadedAt: now,
        landingPublishedAt: now,
      };
      console.log(`OK ${slug}`);
    } catch (error) {
      console.error(`FAIL ${slug}: ${error instanceof Error ? error.message : error}`);
    }
  }

  if (!args.dryRun) saveJson(FINANCE_CATALOG, catalog);
}

main();
