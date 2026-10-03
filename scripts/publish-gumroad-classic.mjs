#!/usr/bin/env node
/**
 * Classic Gumroad product page from src/data/gumroad/landing-copy.json — for any product
 * (civic, language, building, finance, bundles, guides). Wave decks keep using
 * `setup-gumroad-wave-decks.mjs --polish-only`, which reads the same copy.
 *
 * Sets name, summary, tags, category and the rich description, then rebuilds the gallery as
 * the main cover + 3 real screenshots, and clears any custom landing (it hides the classic page).
 *
 *   node scripts/publish-gumroad-classic.mjs --slug <slug> [--shots <dir>] [--desc-only] [--dry-run]
 *
 * --desc-only: update name/summary/tags/description and leave the gallery as is.
 * copy.siteSlug: site deck slug when it differs from the Gumroad slug.
 *
 * Screenshots: --shots dir with sample-{1,2,3}.(png|jpg|webp), else public/samples/<slug>-sample-N.webp,
 * else tmp/anki-shots/<slug>/sample-N.png (from render-anki-sample-shots.mjs without --write).
 */
import { execFileSync, execSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";
import { GUMROAD_TEST_PREP_CATEGORY } from "./lib/gumroad-discover.mjs";
import { buildCopyDescription, loadLandingCopy } from "./lib/landing-copy.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://uniprep2go.study";
const DEFAULT_DELIVERY =
  "Instant download. After checkout, open your Gumroad library or receipt and download the Anki <code>.apkg</code> file. Import it in Anki desktop (File → Import) and sync to AnkiMobile or AnkiDroid through a free AnkiWeb account.";

function parseArgs(argv) {
  const args = { slug: null, shots: null, dryRun: false, descOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--shots") args.shots = argv[++i];
    else if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--desc-only") args.descOnly = true;
  }
  if (!args.slug) throw new Error("--slug is required");
  return args;
}

/** Product ids can start with "-", so positionals go after a literal `--`. */
function gumroad(args, positionals, { json = false } = {}) {
  const quoted = positionals.map((p) => JSON.stringify(p)).join(" ");
  return execSync(`gumroad ${args}${json ? " --json" : ""} --non-interactive --yes -- ${quoted}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function api(token, method, path, body) {
  const response = await fetch(`https://api.gumroad.com/v2${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(`${method} ${path} failed: ${JSON.stringify(payload).slice(0, 240)}`);
  }
  return payload;
}

function catalogProductId(slug) {
  const dir = join(root, "src/data/gumroad");
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    try {
      const id = JSON.parse(readFileSync(join(dir, file), "utf8")).products?.[slug]?.gumroadProductId;
      if (id) return id;
    } catch {
      /* not a catalog */
    }
  }
  return null;
}

async function findProductId(token, permalink) {
  let key = "";
  for (let i = 0; i < 40; i += 1) {
    const page = await api(token, "GET", `/products${key ? `?page_key=${encodeURIComponent(key)}` : ""}`);
    const hit = (page.products || []).find(
      (p) => p.custom_permalink === permalink || (p.short_url || "").endsWith(`/l/${permalink}`),
    );
    if (hit) return hit.id;
    key = page.next_page_key || "";
    if (!key) return null;
  }
  return null;
}

function resolveShots(slug, dir) {
  const candidates = dir
    ? [1, 2, 3].map((n) => ["png", "jpg", "webp"].map((ext) => join(dir, `sample-${n}.${ext}`)).find(existsSync))
    : [1, 2, 3].map(
        (n) =>
          [join(root, "public/samples", `${slug}-sample-${n}.webp`), join(root, "tmp/anki-shots", slug, `sample-${n}.png`)].find(
            existsSync,
          ),
      );
  return candidates.filter(Boolean);
}

function hasSiteDeckPage(slug) {
  return readFileSync(join(root, "src/lib/decks.ts"), "utf8").includes(`slug: "${slug}"`);
}

function checkoutPermalink(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const at = src.indexOf(`slug: "${slug}"`);
  if (at < 0) return null;
  const next = src.indexOf("\n    slug: ", at + 10);
  const chunk = src.slice(at, next > 0 ? next : at + 12000);
  return chunk.match(/checkoutUrl:\s*"[^"]*gumroad\.com\/l\/([^/?"]+)/)?.[1] ?? null;
}

async function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles?.();
  const copy = loadLandingCopy(args.slug);
  if (!copy) throw new Error(`${args.slug}: no entry in src/data/gumroad/landing-copy.json`);
  const { token } = ensureGumroadAccessToken({ persist: false });
  if (!token) throw new Error("Gumroad token missing");

  const productId =
    catalogProductId(args.slug) ??
    (await findProductId(token, copy.permalink ?? checkoutPermalink(args.slug) ?? args.slug));
  if (!productId) throw new Error(`${args.slug}: Gumroad product not found`);

  const wantsSamples = copy.samples !== false;
  const shots = wantsSamples ? resolveShots(args.slug, args.shots) : [];
  if (wantsSamples && shots.length !== 3 && !args.descOnly) {
    throw new Error(`${args.slug}: need 3 screenshots (got ${shots.length}); render them first or pass --shots`);
  }

  const buildingSpecs = JSON.parse(readFileSync(join(root, "src/data/building-deck-specs.json"), "utf8"));
  const description = buildCopyDescription({
    copy,
    spec: buildingSpecs[args.slug] ?? null,
    mockUrl: copy.mockSlug ? `${SITE}/mock-exams/${copy.mockSlug}` : null,
    deckUrl:
      copy.sitePage !== false && hasSiteDeckPage(copy.siteSlug ?? args.slug) ? `${SITE}/decks/${copy.siteSlug ?? args.slug}` : null,
    delivery: copy.delivery ?? DEFAULT_DELIVERY,
    hasSamples: shots.length === 3 || (args.descOnly && wantsSamples),
  });

  console.log(`${args.slug} (${productId}): ${description.replace(/<[^>]+>/g, "").length} chars, ${shots.length} shots`);
  if (args.dryRun) return;

  await api(token, "PUT", `/products/${encodeURIComponent(productId)}`, {
    description,
    custom_summary: copy.summary,
    ...(copy.tags?.length ? { tags: copy.tags } : {}),
    category: copy.category ?? GUMROAD_TEST_PREP_CATEGORY,
  });
  if (copy.title) gumroad(`products update --name ${JSON.stringify(copy.title)}`, [productId]);

  if (!args.descOnly && (shots.length === 3 || copy.keepCovers)) {
    const view = JSON.parse(gumroad("products view", [productId], { json: true }));
    const product = view.product || view;
    const covers = product.covers || [];
    const keep = copy.keepCovers ?? 1;
    const mainFirst = [...covers].sort((a, b) => (b.id === product.main_cover_id) - (a.id === product.main_cover_id));
    for (const cover of mainFirst.slice(keep).reverse()) gumroad("products covers remove", [productId, cover.id]);
  }
  if (!args.descOnly && shots.length === 3) {
    const work = mkdtempSync(join(tmpdir(), `gumroad-classic-${args.slug}-`));
    try {
      shots.forEach((shot, i) => {
        const jpg = join(work, `sample-${i + 1}.jpg`);
        execFileSync("sips", ["-s", "format", "jpeg", shot, "--out", jpg], { stdio: "ignore" });
        gumroad(`products update --preview-image ${JSON.stringify(jpg)}`, [productId]);
      });
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  }

  const after = JSON.parse(gumroad("products view", [productId], { json: true }));
  const product = after.product || after;
  if (product.custom_html) gumroad("products page clear", [productId]);
  console.log(
    `  live: "${product.name}" · covers ${product.covers?.length ?? 0} · tags ${JSON.stringify(product.tags)} · summary ${product.custom_summary ? "yes" : "no"}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
