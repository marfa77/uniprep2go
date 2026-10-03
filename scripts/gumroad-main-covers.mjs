#!/usr/bin/env node
/**
 * Replace a Gumroad product's main cover with a UniPrep2Go blueprint cover (title, subtitle,
 * card count from the live product name). Sample screenshots in the gallery stay.
 *
 *   node scripts/gumroad-main-covers.mjs --slug gmat-focus-anki-deck --id <productId> [--render-only]
 *   node scripts/gumroad-main-covers.mjs --from tmp/covers-audit/replace.json [--render-only]
 *
 * --from: JSON array of { id, permalink, name }. Renders tmp/main-covers/<permalink>.png.
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { buildCoverSvg } from "./lib/cover-blueprint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "tmp/main-covers");

const STATES = {
  ak: "Alaska", al: "Alabama", ar: "Arkansas", az: "Arizona", ca: "California", co: "Colorado", ct: "Connecticut",
  de: "Delaware", fl: "Florida", ga: "Georgia", hi: "Hawaii", ia: "Iowa", id: "Idaho", il: "Illinois", in: "Indiana",
  ks: "Kansas", ky: "Kentucky", la: "Louisiana", ma: "Massachusetts", md: "Maryland", me: "Maine", mi: "Michigan",
  mn: "Minnesota", ms: "Mississippi", nc: "North Carolina", nj: "New Jersey", ny: "New York", oh: "Ohio",
  pa: "Pennsylvania", tx: "Texas", va: "Virginia", wa: "Washington",
};

const LANGUAGE_CODES = {
  german: "DE", polish: "PL", czech: "CZ", greek: "EL", swedish: "SV", spanish: "ES", norwegian: "NO", danish: "DA",
  italian: "IT", dutch: "NL", french: "FR", portuguese: "PT", english: "EN", ukrainian: "UA", russian: "RU", arabic: "AR",
};

const MONOGRAMS = {
  "us-citizenship-anki-deck": "US", "australian-citizenship-anki-deck": "AU", "life-in-the-uk-anki-deck": "UK",
  "canadian-citizenship-anki-deck": "CA", "naturalisation-francaise-anki-deck": "FR", "leben-in-deutschland-anki-deck": "DE",
  "nha-cpct-anki-deck": "CPCT", "acsm-cpt-anki-deck": "ACSM", "rd-exam-anki-deck": "RDN", "luxembourg-vivre-ensemble-anki-deck": "LU",
  "ace-cpt-anki-deck": "ACE", "real-estate-appraiser-anki-deck": "AQB", "series-99-anki-deck": "S99", "cfp-certification-anki-deck": "CFP",
  "series-79-anki-deck": "S79", "mortgage-loan-originator-anki-deck": "NMLS", "series-6-anki-deck": "S6", "series-66-anki-deck": "S66",
  "series-65-anki-deck": "S65", "enrolled-agent-anki-deck": "EA", "polish-a2-certyfikat-anki-deck": "PL A2", "czech-a2-cce-anki-deck": "CZ A2",
  "greek-a2-ellinomatheia-anki-deck": "EL A2", "swedish-a2-sfi-anki-deck": "SFI", "delf-prim-printable-french-flashcards": "DELF\nPrim",
  "dele-a2-spanish-anki-deck": "DELE", "norwegian-a2-norskprove-anki-deck": "NO", "german-a2-anki-deck": "DTZ",
  "dele-a2-ccse-spanish-citizenship-bundle": "ES", "danish-a2-prove-i-dansk-anki-deck": "DA", "celi-b1-italian-anki-deck": "CELI",
  "dutch-a2-inburgering-anki-deck": "NL A2", "delf-b2-french-anki-deck": "DELF", "ciple-a2-european-portuguese-anki-deck": "CIPLE",
  "gre-anki-deck": "GRE", "leed-ap-om-anki-deck": "O+M", "pmp-anki-deck": "PMP", "sat-anki-deck": "SAT", "gmat-focus-anki-deck": "GMAT",
  "mrics-quantity-surveying-anki-deck": "MRICS\nQS", "mrics-anki-deck": "MRICS", "cfps-anki-deck": "CFPS", "nebosh-anki-deck": "NEBOSH",
  "cdcp-anki-deck": "CDCP", "ashrae-certifications-anki-deck": "ASHRAE", "cem-anki-deck": "CEM", "well-ap-anki-deck": "WELL",
  "leed-ap-bd-c-anki-deck": "BD+C", "leed-green-associate-anki-deck": "LEED GA", "bms-building-automation-anki-deck": "BMS",
  "hvac-epa-608-anki-deck": "608",
  "naturalizzazione-svizzera-anki-deck": "CH · IT", "naturalisation-suisse-anki-deck": "CH · FR",
  "einburgerung-schweiz-anki-deck": "CH · DE", "portugal-nacionalidade-anki-deck": "PT", "belgium-wallonie-citoyennete-anki-deck": "BE\nWA",
  "czech-citizenship-anki-deck": "CZ", "sweden-medborgarskapsprov-anki-deck": "SE", "polish-citizenship-anki-deck": "PL",
  "norway-statsborgerproven-anki-deck": "NO", "ccse-espana-anki-deck": "ES", "denmark-indfoedsretsproeven-anki-deck": "DK",
  "belgium-flanders-mo-anki-deck": "BE\nVL",
};

function tidySubtitle(text) {
  return text
    .replace(/^with Audio\s*\((.+)\)$/i, "$1 · with audio")
    .replace(/^with Audio$/i, "With audio")
    .replace(/^for\b/, "For")
    .replace(/^(Ages [^·]+?)\s*·\s*\d[\d,]*\s+PDF Cards$/i, "$1 · print at home");
}

function panelKind(slug) {
  if (/real-estate|appraiser|mortgage/.test(slug)) return "survey";
  if (/hvac|epa|ashrae|bms/.test(slug)) return "hvac";
  if (/leed|well|cem|mrics|cdcp/.test(slug)) return "building";
  if (/cfps|nebosh|servsafe|nha|acsm|ace-cpt|rd-exam/.test(slug)) return "safety";
  if (/series|cfp|enrolled|finra|cfa|frm|sie|gmat|gre|sat|pmp/.test(slug)) return "finance";
  if (/citizenship|nacionalidade|naturali|einburg|leben|life-in-the-uk|ccse|vivre|statsborger|medborgar|indfoed|belgium|ielts|a2|b1|b2|dele|delf|celi|sfi|norsk|ciple|inburgering/.test(slug)) {
    return "language";
  }
  return "study";
}

/** "GMAT Focus Edition Anki Deck — 400 Flashcards (Quant, Verbal, DI)" → parts for the cover. */
export function coverPartsFromName(name, slug) {
  const [head, ...restParts] = name.split(/\s+[—–]\s+/);
  const rest = restParts.join(" — ");
  const count = rest.match(/(\d[\d,]*)\s+(?:Illustrated\s+|PDF\s+|Anki\s+)?(?:Flashcards|Cards)/i)?.[1];
  const pdf = /printable|pdf/i.test(name) && !/anki/i.test(head);
  const unit = pdf ? "printable cards" : "flashcards";
  const tail = rest
    .replace(/^(\d[\d,]*)\s+(?:Illustrated\s+|PDF\s+|Anki\s+)?(?:Flashcards|Cards)\s*/i, "")
    .replace(/^\((.*)\)$/, "$1")
    .replace(/^with\s+/i, "with ")
    .trim();
  let title = head.replace(/\s+Anki (Deck|Bundle)\b/i, "").replace(/^DELF Prim Printable French Flashcards$/, "DELF Prim French").trim();
  let monogram = MONOGRAMS[slug];
  let subtitle = tail;
  const state = slug.match(/^([a-z]{2})-real-estate-anki-deck$/)?.[1];
  if (state) {
    title = `${STATES[state]} Real Estate`;
    monogram = state.toUpperCase();
    subtitle = "Salesperson license exam";
  }
  const speakers = name.match(/for (\w+) Speakers/i)?.[1];
  const code = (word) => LANGUAGE_CODES[word.toLowerCase()] ?? word.slice(0, 2).toUpperCase();
  if (/^IELTS/i.test(title)) {
    monogram = `EN · ${code(speakers)}`;
    subtitle = `For ${speakers} speakers`;
  } else if (speakers) {
    monogram = `${code(title.split(/\s+/)[0])} · ${code(speakers)}`;
  }
  return {
    title,
    subtitle: tidySubtitle(subtitle || "Exam prep flashcards"),
    stat: count ? `${count} ${unit}` : null,
    badge: /bundle/i.test(head) ? "Anki Bundle" : pdf ? "Printable PDF" : "Anki Deck",
    monogram,
    panelKind: panelKind(slug),
  };
}

function gumroad(args, positionals, { json = false } = {}) {
  const quoted = positionals.map((p) => JSON.stringify(p)).join(" ");
  return execSync(`gumroad ${args}${json ? " --json" : ""} --non-interactive --yes -- ${quoted}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function render(item) {
  const parts = coverPartsFromName(item.name, item.permalink);
  if (!parts.stat) throw new Error(`${item.permalink}: no card count in "${item.name}"`);
  const svg = buildCoverSvg({ ...parts });
  const out = join(OUT, `${item.permalink}.png`);
  await sharp(svg, { density: 144 }).png().toFile(out);
  return { out, parts };
}

function replaceMain(item, file) {
  const before = JSON.parse(gumroad("products view", [item.id], { json: true }));
  const oldMain = (before.product || before).main_cover_id;
  const oldIds = ((before.product || before).covers || []).map((c) => c.id);
  gumroad(`products covers add --image ${JSON.stringify(file)}`, [item.id]);
  const mid = JSON.parse(gumroad("products view", [item.id], { json: true }));
  const covers = (mid.product || mid).covers || [];
  const added = covers.find((c) => !oldIds.includes(c.id));
  if (!added) throw new Error(`${item.permalink}: new cover not found after upload`);
  const order = [added.id, ...covers.filter((c) => c.id !== added.id && c.id !== oldMain).map((c) => c.id)];
  if (oldMain) gumroad("products covers remove", [item.id, oldMain]);
  gumroad("products covers reorder", [item.id, ...order]);
  const after = JSON.parse(gumroad("products view", [item.id], { json: true }));
  const p = after.product || after;
  if (p.main_cover_id !== added.id) throw new Error(`${item.permalink}: main cover is ${p.main_cover_id}, expected ${added.id}`);
  return p.covers.length;
}

async function main() {
  const argv = process.argv.slice(2);
  const opt = (k) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : null);
  const renderOnly = argv.includes("--render-only");
  const items = opt("--from")
    ? JSON.parse(readFileSync(opt("--from"), "utf8"))
    : [{ id: opt("--id"), permalink: opt("--slug"), name: opt("--name") }];
  mkdirSync(OUT, { recursive: true });
  for (const item of items) {
    try {
      const { out, parts } = await render(item);
      if (renderOnly) {
        console.log(`${item.permalink}: ${parts.title} | ${parts.subtitle} | ${parts.stat} | ${parts.monogram ?? "-"}`);
        continue;
      }
      console.log(`${item.permalink}: main cover replaced · covers ${replaceMain(item, out)}`);
    } catch (error) {
      console.error(`✗ ${item.permalink}: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

main();
