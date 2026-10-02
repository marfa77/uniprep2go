#!/usr/bin/env node
/**
 * Publish rendered sample cards to a live Gumroad product whose landing is hand-built (authored decks
 * outside the finance/wave/building catalogs: PTCB, ServSafe Manager, …). Keeps the existing rich
 * landing + description and only swaps the samples:
 *   1. backs up the product JSON to tmp/gumroad-backups/
 *   2. uploads public/samples/{slug}-sample-{1,2,3}.webp as new gallery previews
 *   3. replaces (or inserts before FAQ) the landing <section data-unique-section="sample-cards">
 *   4. replaces (or inserts before FAQ) the description sample <figure>s
 *   5. removes the previous sample previews (never the main cover) and HEAD-checks the new URLs
 * Captions are the decks.ts sampleCards questions, which render:sample-shots --write took from the same notes.
 *
 *   node scripts/publish-authored-gumroad-samples.mjs --slug ptcb-pharmacy-technician-anki-deck --dry-run
 *   node scripts/publish-authored-gumroad-samples.mjs --slug ptcb-pharmacy-technician-anki-deck
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CDN_CACHE = join(root, "src/data/gumroad/authored-sample-cdn.json");
const OUT_DIR = join(root, "landing-pages/authored");
const BACKUP_DIR = join(root, "tmp/gumroad-backups");
const SECTION_RE = /<section\b[^>]*data-unique-section="sample-cards"[\s\S]*?<\/section>/;
const FIGURE_RE = /<figure>\s*<img src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/g;

function parseArgs(argv) {
  const args = { slug: null, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--dry-run") args.dryRun = true;
  }
  if (!args.slug) throw new Error("--slug is required");
  return args;
}

function deckMeta(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const at = src.indexOf(`slug: "${slug}"`);
  if (at < 0) throw new Error(`decks.ts has no slug ${slug}`);
  const next = src.indexOf("\n    slug: ", at + 10);
  const chunk = src.slice(at, next > 0 ? next : at + 12000);
  const block = chunk.slice(chunk.indexOf("sampleCards:"));
  const unquote = (s) => JSON.parse(`"${s}"`);
  const questions = [...block.matchAll(/question:\s*"((?:\\.|[^"\\])*)"/g)].slice(0, 3).map((m) => unquote(m[1]));
  const images = [...block.matchAll(/imageUrl:\s*"([^"]+)"/g)].slice(0, 3).map((m) => m[1]);
  const shortName = chunk.match(/shortName:\s*"((?:\\.|[^"\\])*)"/)?.[1];
  return {
    permalink: chunk.match(/checkoutUrl:\s*"[^"]*gumroad\.com\/l\/([^/?"]+)/)?.[1],
    shortName: shortName ? unquote(shortName) : slug,
    questions,
    images,
  };
}

function gumroad(args, { json = false } = {}) {
  const flags = [...(json ? ["--json"] : []), "--non-interactive"];
  const sep = args.indexOf("--");
  const argv = sep < 0 ? [...args, ...flags] : [...args.slice(0, sep), ...flags, ...args.slice(sep)];
  const out = execFileSync("gumroad", argv, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  return json ? JSON.parse(out) : out;
}

const viewProduct = (idOrPermalink) => gumroad(["products", "view", idOrPermalink], { json: true }).product ?? {};
const coverUrl = (cover) => cover?.original_url || cover?.url || "";

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function sectionHtml(permalink, shortName, urls, questions) {
  const id = `samples-heading-${permalink}`;
  const figures = urls
    .map(
      (url, i) =>
        `<figure class="theme-card rounded-3xl p-4"><img src="${url}" alt="${escapeHtml(shortName)} Anki sample card ${i + 1}" style="max-width:100%;border-radius:12px"/><figcaption class="mt-3 text-sm text-muted">${escapeHtml(questions[i])}</figcaption></figure>`,
    )
    .join("\n");
  return `<section class="mt-12" aria-labelledby="${id}" data-unique-section="sample-cards">
      <h2 id="${id}" class="text-2xl font-semibold tracking-tight">Sample cards</h2>
      <p class="mt-4 text-muted leading-7">Three real cards from the deck, captured from the shipped .apkg.</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
${figures}
      </div>
    </section>`;
}

function insertBefore(html, markers, block) {
  for (const re of markers) {
    const m = html.match(re);
    if (m) return `${html.slice(0, m.index)}${block}\n\n${html.slice(m.index)}`;
  }
  return null;
}

function updateLanding(html, section) {
  if (SECTION_RE.test(html)) return html.replace(SECTION_RE, section);
  const out = insertBefore(html, [/<section\b[^>]*aria-labelledby="faq-heading"/, /<\/main>/], section);
  if (!out) throw new Error("landing has no FAQ section or </main> to anchor the samples");
  return out;
}

function updateDescription(html, stale, urls, questions) {
  const figures = urls
    .map((url, i) => `<figure><img src="${url}"><p class="figcaption">${escapeHtml(questions[i])}</p></figure>`)
    .join("");
  let firstAt = -1;
  const kept = html.replace(FIGURE_RE, (whole, src, offset) => {
    if (!stale.has(src)) return whole;
    if (firstAt < 0) firstAt = offset;
    return "\u0000";
  });
  if (firstAt >= 0) return kept.replace("\u0000", figures).replaceAll("\u0000", "");
  return insertBefore(html, [/<hr>\s*<h2><strong>FAQ/i, /<h2>(<strong>)?FAQ/i], figures) ?? `${html}${figures}`;
}

async function headOk(url) {
  const res = await fetch(url, { method: "HEAD" });
  return res.status;
}

async function main() {
  const args = parseArgs(process.argv);
  const { slug } = args;
  const meta = deckMeta(slug);
  if (!meta.permalink) throw new Error(`${slug}: decks.ts checkoutUrl is not a Gumroad /l/ link`);
  const webps = [1, 2, 3].map((n) => join(root, "public/samples", `${slug}-sample-${n}.webp`));
  const missing = webps.filter((p) => !existsSync(p));
  if (missing.length) throw new Error(`missing ${missing.join(", ")} — run render:sample-shots --write first`);
  const expected = [1, 2, 3].map((n) => `/samples/${slug}-sample-${n}.webp`);
  if (meta.questions.length !== 3 || expected.some((img, i) => meta.images[i] !== img)) {
    throw new Error(`${slug}: decks.ts sampleCards must be the 3 rendered cards (${expected.join(", ")})`);
  }

  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });
  const product = viewProduct(meta.permalink);
  if (!product.id) throw new Error(`${slug}: Gumroad product ${meta.permalink} not found`);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  mkdirSync(BACKUP_DIR, { recursive: true });
  writeFileSync(join(BACKUP_DIR, `${slug}-${stamp}.json`), JSON.stringify(product, null, 2));

  const cache = existsSync(CDN_CACHE) ? JSON.parse(readFileSync(CDN_CACHE, "utf8")) : {};
  const mainCover = coverUrl(product.covers?.find((c) => c.id === product.main_cover_id) ?? product.covers?.[0]);
  const landing = product.custom_html ?? "";
  const stale = new Set([
    ...(landing.match(SECTION_RE)?.[0].match(/<img src="[^"]+"/g) ?? []).map((s) => s.slice(10, -1)),
    ...[...(product.description ?? "").matchAll(FIGURE_RE)].map((m) => m[1]).filter((u) => u.includes("public-files.gumroad.com")),
    ...(cache[slug] ?? []),
  ]);
  stale.delete(mainCover);

  let urls;
  if (args.dryRun) {
    urls = webps.map((_, i) => `https://public-files.gumroad.com/dry-run-${slug}-${i + 1}`);
  } else {
    urls = [];
    for (const [i, webp] of webps.entries()) {
      const jpg = join(BACKUP_DIR, `${slug}-sample-${i + 1}.jpg`);
      await sharp(webp).flatten({ background: "#ffffff" }).jpeg({ quality: 88 }).toFile(jpg);
      gumroad(["products", "update", product.id, "--preview-image", jpg]);
      const covers = viewProduct(product.id).covers ?? [];
      const url = coverUrl(covers[covers.length - 1]);
      if (!url || stale.has(url) || urls.includes(url)) throw new Error(`preview ${i + 1} upload returned no new cover URL`);
      urls.push(url);
    }
  }

  const newLanding = updateLanding(landing, sectionHtml(meta.permalink, meta.shortName, urls, meta.questions));
  const newDescription = updateDescription(product.description ?? "", stale, urls, meta.questions);
  const outDir = args.dryRun ? join(BACKUP_DIR, "dry-run") : OUT_DIR;
  mkdirSync(outDir, { recursive: true });
  const landingPath = join(outDir, `${slug}.html`);
  const descriptionPath = join(outDir, `${slug}.description.html`);
  writeFileSync(landingPath, newLanding);
  writeFileSync(descriptionPath, newDescription);
  console.log(`stale sample previews: ${stale.size} · landing ${landingPath} · description ${descriptionPath}`);
  if (args.dryRun) {
    console.log(`DRY ${slug} (${product.id}) — nothing changed on Gumroad`);
    return;
  }

  gumroad(["products", "page", "publish", "--yes", "--", product.id, landingPath]);
  gumroad(["products", "update", product.id, "--description", newDescription]);
  for (const cover of viewProduct(product.id).covers ?? []) {
    if (cover.id !== product.main_cover_id && stale.has(coverUrl(cover))) {
      gumroad(["products", "covers", "remove", "--yes", "--", product.id, cover.id]);
    }
  }
  cache[slug] = urls;
  writeFileSync(CDN_CACHE, `${JSON.stringify(cache, null, 2)}\n`);

  const after = viewProduct(product.id);
  const statuses = await Promise.all(urls.map(headOk));
  const inLanding = urls.every((u) => (after.custom_html ?? "").includes(u));
  const inDescription = urls.every((u) => (after.description ?? "").includes(u));
  console.log(`CDN ${statuses.join(" ")} · landing ${inLanding ? "ok" : "MISSING"} · description ${inDescription ? "ok" : "MISSING"}`);
  if (statuses.some((s) => s !== 200) || !inLanding || !inDescription) process.exit(1);
  console.log(`OK ${slug} (${product.id})`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
