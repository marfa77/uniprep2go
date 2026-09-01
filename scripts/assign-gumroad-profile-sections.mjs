/**
 * Assign live Gumroad products to the five PixiD Studio profile sections.
 *
 *   node scripts/assign-gumroad-profile-sections.mjs --dry-run
 *   node scripts/assign-gumroad-profile-sections.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export const PROFILE_SECTIONS = {
  finance: { id: "Qf65NTng-BNzF6j6a8W9lA==", name: "Finance & Licensing" },
  realestate: { id: "JFA03id8ulXGMytZga9suw==", name: "Real Estate" },
  health: { id: "gARNbCparJ_aWYSpn_5UWw==", name: "Health & Fitness" },
  building: { id: "LqldtwnL537-kMuxekNN4A==", name: "Building & Safety" },
  languages: { id: "H6BjSXn19pUrxKTMR33snw==", name: "Languages & Citizenship" },
};

const LANGUAGE_FILES = [
  "src/data/gumroad/language-anki-decks.json",
  "src/data/gumroad/language-printable.json",
  "src/data/gumroad/gaivota-comics.json",
  "src/data/gumroad/citizenship-bundle.json",
  "src/data/gumroad/swiss-citizenship-bundle.json",
];

function loadJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

function catalogSlugs(rel) {
  const data = loadJson(rel);
  if (data.products) return Object.keys(data.products);
  if (data.permalink) return [data.permalink];
  return [];
}

const languageSlugs = new Set(LANGUAGE_FILES.flatMap(catalogSlugs));
const buildingSlugs = new Set(catalogSlugs("src/data/gumroad/building-anki-decks.json"));
const waveSpecs = loadJson("src/data/wave-deck-specs.json");

function classify(slug, name = "") {
  const hay = `${slug} ${name}`.toLowerCase();
  if (languageSlugs.has(slug)) return "languages";
  if (
    /citizenship|nacionalidade|vivre|inburgering|ccse|ciple|delf|dele|celi|dtz|gaivota|medborgar|statsborger|indfoeds|wallonie|flanders-mo|kids-flashcards|english-for-|german-a2-anki-goethe/.test(
      hay,
    )
  ) {
    return "languages";
  }
  if (/real-estate|real estate|appraiser/.test(hay)) return "realestate";
  if (waveSpecs[slug]?.cohort === "state-re") return "realestate";
  if (waveSpecs[slug]?.cohort === "money") return "finance";
  if (
    /series-|cfa-|frm-|cfp-|enrolled-agent|mortgage-loan|sie-|commodity|energy-trader|bench-energy|notary|shrm|phr-hrci|pmp-|capm-|six-sigma|insurance|finra-exam|trader-lexicon|trader’s lexicon|trader's lexicon/.test(
      hay,
    )
  ) {
    return "finance";
  }
  if (
    /^cdl-|osha|forklift|security-officer|wastewater|water-treatment|electrical-journeyman|plumbing-journeyman|nate-|servsafe|nabcep|pest-control|alcohol-server|leed|well-ap|nebosh|ashrae|bms-|hvac|epa-608|cdcp|cem-|cfps|mrics/.test(
      hay,
    )
  ) {
    return "building";
  }
  if (/sat-|gre-|gmat-|praxis-|parapro|cat4|ib-biology|ib biology/.test(hay)) return "academic";
  if (buildingSlugs.has(slug)) return "building";
  if (waveSpecs[slug]?.cohort === "health-cdl") {
    return /^cdl-/.test(slug) ? "building" : "health";
  }
  if (
    /nha-|ace-cpt|acsm|nasm|issa|nsca|rd-exam|phlebotomy|nremt|nclex|cpr|bls|dialysis|ptcb|excpt|medical|dental|danb|ardms|cosmetology|esthetician|barber|nail|aswb|cda-|nbrc|aama|nbdhe|ascp|rbt|amt-|aapc|abo-|nutrition|cscs|funeral|veterinary|medicare|medication|home-health|physical-therapy|mblex|crcst|ccht|nnaap|cna|vtne|nbstsa|pharmacy|optician|childcare|cpt-anki/.test(
      hay,
    )
  ) {
    return "health";
  }
  return null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gumroadGet(token, path) {
  const response = await fetch(`https://api.gumroad.com/v2${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(`GET ${path} failed: ${JSON.stringify(payload).slice(0, 240)}`);
  }
  return payload;
}

async function listAllProducts(token) {
  const products = [];
  let pageKey = "";
  for (let i = 0; i < 30; i += 1) {
    const qs = pageKey ? `?page_key=${encodeURIComponent(pageKey)}` : "";
    const payload = await gumroadGet(token, `/products${qs}`);
    products.push(...(payload.products || []));
    pageKey = payload.next_page_key || "";
    if (!pageKey) break;
    await sleep(200);
  }
  return products;
}

function permalinkOf(product) {
  return product.custom_permalink || product.permalink || "";
}

async function main() {
  loadLocalEnvFiles();
  const { token } = ensureGumroadAccessToken({ persist: true });
  if (!token) throw new Error("Gumroad token missing");

  const products = await listAllProducts(token);
  const buckets = { finance: [], realestate: [], health: [], building: [], languages: [], academic: [], skipped: [] };

  for (const product of products) {
    const slug = permalinkOf(product);
    const key = classify(slug, product.name || "");
    const row = { id: product.id, slug, name: product.name };
    if (key) buckets[key].push(row);
    else buckets.skipped.push(row);
  }

  for (const [key, section] of Object.entries(PROFILE_SECTIONS)) {
    console.log(`\n## ${section.name} (${buckets[key].length})`);
    for (const row of buckets[key]) console.log(`  ${row.slug || row.id}  ${row.name}`);
  }
  console.log(`\n## academic — no section yet (${buckets.academic.length})`);
  for (const row of buckets.academic) console.log(`  ${row.slug || row.id}  ${row.name}`);
  console.log(`\n## skipped (${buckets.skipped.length})`);
  for (const row of buckets.skipped) console.log(`  ${row.slug || row.id}  ${row.name}`);

  console.log(`\n${products.length} live products. Public API cannot set profile shown_products — assign in the Profile editor.`);
}

main();
