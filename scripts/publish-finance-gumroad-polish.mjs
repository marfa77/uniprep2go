#!/usr/bin/env node
/**
 * Publish Sample cards Gumroad landings for finance catalog decks (CFA, FRM, SIE, Series…).
 * Uses checkout permalink + public/samples webps. Stamps src/data/gumroad/finance-anki-decks.json.
 *
 *   node scripts/publish-finance-gumroad-polish.mjs --dry-run
 *   node scripts/publish-finance-gumroad-polish.mjs --slug cfa-level-1-anki-deck
 *   node scripts/publish-finance-gumroad-polish.mjs --slug sie-exam-anki-deck --refresh-samples
 *     (new public/samples webps: upload new gallery previews, publish landing, then remove the old previews)
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
  const args = { dryRun: false, slug: null, refreshSamples: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--refresh-samples") args.refreshSamples = true;
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

/** `gumroad products view <permalink>` 404s, so match the permalink against the paginated product list. */
async function productIdByPermalink(permalink) {
  const { token } = ensureGumroadAccessToken({ persist: false });
  let key = "";
  for (let page = 0; page < 40; page += 1) {
    const response = await fetch(
      `https://api.gumroad.com/v2/products${key ? `?page_key=${encodeURIComponent(key)}` : ""}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const payload = await response.json();
    const hit = (payload.products || []).find(
      (p) => p.custom_permalink === permalink || (p.short_url || "").endsWith(`/l/${permalink}`),
    );
    if (hit) return hit.id;
    key = payload.next_page_key || "";
    if (!key) return null;
  }
  return null;
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

// Captions sit under card screenshots, so they come from the decks.ts sampleCard whose imageUrl is that
// capture (render-anki-sample-shots writes both from the same note) — never from another card's text.
function deckSampleCaptions(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const at = src.indexOf(`slug: "${slug}"`);
  const next = src.indexOf('\n  {\n    slug: "', at + 1);
  const chunk = src.slice(at, next > 0 ? next : undefined);
  const start = chunk.indexOf("sampleCards: [");
  const block = start < 0 ? "" : chunk.slice(start, chunk.indexOf("\n    ],", start));
  const str = String.raw`("(?:\\.|[^"\\])*")`;
  const byImage = new Map();
  for (const m of block.matchAll(new RegExp(String.raw`question:\s*${str}\s*,\s*answer:\s*${str}\s*,\s*imageUrl:\s*"([^"]+)"`, "g"))) {
    byImage.set(m[3], { q: JSON.parse(m[1]), a: JSON.parse(m[2]) });
  }
  return [1, 2, 3].map((n) => {
    const caption = byImage.get(`/samples/${slug}-sample-${n}.webp`);
    if (!caption) throw new Error(`decks.ts ${slug} has no sampleCard for /samples/${slug}-sample-${n}.webp`);
    return caption;
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderLanding({ title, shortName, slug, sampleUrls, mockUrl, sampleCaptions }) {
  const samplesHtml = sampleUrls
    .map((url, i) => {
      const pick = sampleCaptions[i];
      const caption = pick?.q
        ? `${escapeHtml(pick.q)} — ${escapeHtml(pick.a)}`
        : `Sample ${i + 1} — ${escapeHtml(shortName)}`;
      return `<figure style="margin:1rem 0"><img src="${url}" alt="Sample card ${i + 1}" style="max-width:100%;border-radius:8px"/><figcaption style="color:#666;font-size:0.9rem">${caption}</figcaption></figure>`;
    })
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
  const dir = join(root, "src/lib/mock-exams");
  for (const file of ["configs.ts", "wave1-configs.ts", "wave2-configs.ts", "wave3-configs.ts", "wave4-configs.ts"]) {
    const path = join(dir, file);
    if (!existsSync(path)) continue;
    const src = readFileSync(path, "utf8");
    const at = src.indexOf(`linkedDeckSlug: "${deckSlug}"`);
    if (at < 0) continue;
    // The owning config's slug is the last top-level `slug:` before its linkedDeckSlug.
    const slugs = [...src.slice(0, at).matchAll(/\n\s+slug:\s*"([^"]+)"/g)];
    if (slugs.length) return slugs[slugs.length - 1][1];
  }
  return null;
}

async function main() {
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
      const productId = catalog.products?.[slug]?.gumroadProductId ?? (await productIdByPermalink(perm));
      if (!productId) throw new Error("no product id");
      const product = gumroadJson(["products", "view", productId]).product ?? {};

      const staleUrls = args.refreshSamples ? (cdnCache[slug] ?? []) : [];
      if (args.refreshSamples && !args.dryRun) delete cdnCache[slug];
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
        sampleCaptions: deckSampleCaptions(slug),
      });
      const outPath = join(OUT_DIR, `${slug}.html`);
      writeFileSync(outPath, html);

      if (args.dryRun) {
        console.log(`DRY ${slug} → ${outPath}`);
        continue;
      }

      const tmp = `/tmp/gumroad-finance-${slug}.html`;
      writeFileSync(tmp, html);
      execSync(`gumroad products page publish --yes --non-interactive -- "${perm}" "${tmp}"`, {
        stdio: "inherit",
      });
      execSync(`gumroad products publish --non-interactive -- "${perm}"`, { stdio: "inherit" });
      if (staleUrls.length) {
        const covers = (gumroadJson(["products", "view", productId]).product ?? {}).covers ?? [];
        for (const cover of covers) {
          if (staleUrls.includes(cover.original_url || cover.url)) {
            execSync(`gumroad products covers remove --non-interactive --yes -- "${productId}" "${cover.id}"`, {
              stdio: "inherit",
            });
          }
        }
      }

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

await main();
