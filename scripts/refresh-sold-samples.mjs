#!/usr/bin/env node
/**
 * Pick 3 selling samples per sold SKU (except language-exam decks): hard quality gate ->
 * top-quality pool -> seeded random -> topic/wording diversity (src/lib/sample-pick.ts).
 * Writes src/data/sold-samples.json and updates civic catalog sample Q&As.
 *
 * Usage:
 *   node scripts/refresh-sold-samples.mjs                 # all SKUs
 *   node scripts/refresh-sold-samples.mjs --slug sie-exam-anki-deck [--slug ...]
 *   ... --salt 2   # reviewer re-roll when a pick is weak (same pool, new seed)
 *
 * Decks with real /samples/ screenshots keep their screenshot text on the site; their
 * picks here are the candidates to capture next (see mock-bank-audit-standard.mdc).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pickSellingSamples } from "../src/lib/sample-pick.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ANKI_OUT = join(dirname(root), "Anki Generator", "out");
const FINANCE_CSV = join(dirname(root), "Anki Generator", "internal_deck_generator", "Finance");

const argv = process.argv.slice(2);
const onlySlugs = new Set(argv.flatMap((arg, i) => (arg === "--slug" && argv[i + 1] ? [argv[i + 1]] : [])));
const wanted = (slug) => onlySlugs.size === 0 || onlySlugs.has(slug);
const saltIndex = argv.indexOf("--salt");
const salt = saltIndex >= 0 ? argv[saltIndex + 1] || "" : "";

const LANGUAGE_EXAM = new Set([
  "ciple-a2-european-portuguese-anki-deck",
  "delf-b2-french-anki-deck",
  "dutch-a2-inburgering-anki-deck",
  "german-a2-anki-deck",
  "celi-b1-italian-anki-deck",
  "danish-a2-prove-i-dansk-anki-deck",
  "norwegian-a2-norskprove-anki-deck",
  "swedish-a2-sfi-anki-deck",
  "greek-a2-ellinomatheia-anki-deck",
  "czech-a2-cce-anki-deck",
  "polish-a2-certyfikat-anki-deck",
  "polish-a2-for-ukrainian-speakers-anki-deck",
  "german-a2-for-ukrainian-speakers-anki-deck",
  "german-a2-for-russian-speakers-anki-deck",
  "ielts-toefl-english-for-french-speakers-anki-deck",
  "ielts-toefl-english-for-arabic-speakers-anki-deck",
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
  "ielts-toefl-english-for-russian-speakers-anki-deck",
  "ielts-toefl-english-for-spanish-speakers-anki-deck",
  "ielts-toefl-english-for-portuguese-speakers-anki-deck",
  "ielts-toefl-english-for-turkish-speakers-anki-deck",
  "dele-a2-spanish-anki-deck",
]);

const TEMPLATE_RE =
  /fdic deposit insurance|this concept is identical|this concept has no application|this concept always eliminates|does not match the correct definition|remapped from sibling|what is included in /i;
const WEAK_STEM_RE =
  /^(what is (risk|the sec|finra|pure risk|speculative risk|personal property|real property|a fixture)\b)/i;
const META_EXAM_RE =
  /wie viele fragen hat|how many questions (has|does)|cu[aá]ntas preguntas tiene|combien de questions|hvor mange sp[øo]rgsm[aå]l|what should you do to prepare|official language of the uk/i;

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function sanitizeStem(text) {
  let q = clean(text);
  q = q.replace(/^On the [^,]+,\s*/i, "");
  q = q.replace(/^For the [A-Z0-9 /+.-]+,\s*which of the following best answers this item:\s*/i, "");
  q = q.replace(/^For the [^,]+,\s*[^:]{2,40}:\s*/i, "");
  q = q.replace(/^Which option is correct for [^?]+\?\s*/i, "");
  q = q.replace(/^Which statement best applies to\s+/i, "");
  q = q.replace(/\s*[—–-]\s*which option is correct for[^?]*\??$/i, "");
  q = q.replace(/\s+which option is correct for[^?]*\??$/i, "");
  q = q.replace(/\s*Select the best answer\.?\s*$/i, "");
  q = q.replace(/\s+as tested on this exam\.?/i, "");
  q = q.replace(/\s+as tested in [^.?]+/i, "");
  q = q.replace(/\s+on a life\/health licensing exam\??$/i, "?");
  q = q.replace(/\s+when recommending products on the SIE\??$/i, "?");
  q = q.replace(/^In SIE [^,]+,\s*/i, "");
  q = q.replace(/\s+in SIE [^.?]+\??$/i, "?");
  q = clean(q);
  if (q) q = q.charAt(0).toUpperCase() + q.slice(1);
  return q;
}

function tokens(text) {
  return new Set(
    clean(text)
      .toLowerCase()
      .replace(/[^a-z0-9\u00c0-\u024f]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4),
  );
}

function overlapHint(text, hint) {
  const H = tokens(hint);
  const T = tokens(text);
  let n = 0;
  for (const w of H) if (T.has(w)) n += 1;
  return n;
}

function scoreCivic(q, a, hint) {
  q = sanitizeStem(q);
  a = clean(a);
  const words = q.split(/\s+/).filter(Boolean);
  if (q.length < 28 || q.length > 220 || words.length < 6) return -1;
  if (a.length < 12 || a.length > 180) return -1;
  if (!/\?/.test(q)) return -1;
  if (TEMPLATE_RE.test(q) || TEMPLATE_RE.test(a) || META_EXAM_RE.test(q)) return -1;
  if (/^(what is|hva er|wie ist|co to|wat is)\s+\S+\??$/i.test(q)) return -1;
  let score = 18;
  if (q.endsWith("?") || q.endsWith("؟")) score += 4;
  if (a.length >= 16 && a.length <= 140) score += 4;
  if (q.length >= 40 && q.length <= 160) score += 3;
  score += Math.min(4, overlapHint(q, hint));
  if (WEAK_STEM_RE.test(q)) score -= 8;
  return score;
}

function scoreMcq(q, a, allOptionText, hint) {
  q = sanitizeStem(q);
  a = clean(a);
  if (q.length < 28 || q.length > 320) return -1;
  if (a.length < 8 || a.length > 200) return -1;
  if (TEMPLATE_RE.test(q) || TEMPLATE_RE.test(a)) return -1;
  let score = 16;
  if (TEMPLATE_RE.test(allOptionText)) score = 3;
  if (WEAK_STEM_RE.test(q)) score -= 8;
  if (/\?/.test(q) || /:$/.test(q)) score += 3;
  if (a.length >= 18 && a.length <= 140) score += 4;
  if (q.length >= 50 && q.length <= 200) score += 3;
  if (/\b(must|which|when|before|after|primarily|typically)\b/i.test(q)) score += 2;
  score += Math.min(6, overlapHint(`${q} ${a}`, hint) * 2);
  return score;
}

function diversify(rows, seed, count = 3) {
  return pickSellingSamples(rows, {
    count,
    seed: salt ? `${seed}:${salt}` : seed,
    score: (row) => row.score,
    text: (row) => row.q,
    topic: (row) => row.topic || "",
  }).map((row) => ({ q: row.q, a: row.a }));
}

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
    } else field += ch;
  }
  if (field || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }
  return rows;
}

function pickCivicFromCsv(slug, folder, hint) {
  const path = join(ANKI_OUT, folder, "source.csv");
  if (!existsSync(path)) return [];
  const rows = parseCsv(readFileSync(path, "utf8")).slice(1);
  const ranked = rows.map((cells) => ({
    q: sanitizeStem(cells[0]),
    a: clean(cells[1]),
    score: scoreCivic(cells[0], cells[1], hint),
  }));
  return diversify(ranked, slug);
}

/** Authored FINRA deck CSVs: real deck cards, "(Drill N)" padding copies excluded. */
function pickFromAuthoredDeckCsv(slug, files, maxBack = 220) {
  const tables = [files]
    .flat()
    .map((file) => join(FINANCE_CSV, file))
    .filter((path) => existsSync(path))
    .map((path) => parseCsv(readFileSync(path, "utf8")));
  if (!tables.length) return [];
  const header = tables[0][0];
  const rows = tables.flatMap((table) => table.slice(1));
  const col = (name) => header.indexOf(name);
  const [iSection, iFront, iBack, iFormula, iExample, iMistake] = [
    "Section",
    "Front (Question)",
    "Back (Answer)",
    "Formula (LaTeX)",
    "Example",
    "Common Mistake",
  ].map(col);
  const ranked = rows
    .filter((cells) => !/\(Drill \d+\)/i.test(cells[iFront] || ""))
    .map((cells) => {
      const q = clean(cells[iFront]);
      const a = clean(cells[iBack]);
      if (q.length < 20 || a.length < 30 || a.length > maxBack) return { q, a, score: 0 };
      let score = 10;
      if (/^(what is|what are|what does)\b/i.test(q)) score -= 6;
      if (/\b(how|why|when|differ|breakeven|compare|versus|vs\.?)\b/i.test(q)) score += 6;
      if (/\b(customer|client|investor)\b/i.test(q)) score += 8;
      if (/\d/.test(q) && /\d/.test(a)) score += 6;
      if (clean(cells[iMistake])) score += 3;
      if (clean(cells[iExample])) score += 2;
      if (clean(cells[iFormula])) score += 3;
      if (/\d/.test(a)) score += 3;
      if (/\b(can affect|matters?|is important|various|generally)\b/i.test(a)) score -= 4;
      if (/\b(matter|important)\??$/i.test(q)) score -= 5;
      return { q, a, topic: clean(cells[iSection]), score };
    });
  return diversify(ranked, slug);
}

function pickFromMockBank(slug, file, hint) {
  const path = join(root, "src/data/mock-exams", file);
  if (!existsSync(path)) return [];
  const questions = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(questions)) return [];
  const ranked = questions
    .map((q) => {
      const correct = (q.options || []).find((o) => o.id === q.correctOptionId)?.text ?? "";
      return {
        q: sanitizeStem(q.prompt),
        a: clean(correct),
        topic: q.topicId || "",
        score: scoreMcq(
          q.prompt,
          correct,
          (q.options || []).map((o) => o.text).join(" "),
          hint,
        ),
      };
    });
  return diversify(ranked, slug);
}

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

const civic = loadJson(join(root, "src/data/gumroad/civic-anki-decks.json"), { products: {} });
const wave = loadJson(join(root, "src/data/wave-deck-specs.json"), {});
const building = loadJson(join(root, "src/data/building-deck-specs.json"), {});
const immigration = loadJson(join(root, "src/data/prep2go-immigration-samples.json"), {});

const soldPath = join(root, "src/data/sold-samples.json");
const out = onlySlugs.size ? loadJson(soldPath, {}) : {};
const done = new Set();
let civicUpdated = 0;

function keep(slug, picks) {
  if (done.has(slug) || !wanted(slug) || picks.length !== 3) return;
  out[slug] = picks;
  done.add(slug);
}

for (const [slug, product] of Object.entries(civic.products || {})) {
  if (!wanted(slug)) continue;
  keep(slug, pickCivicFromCsv(slug, product.folder, `${product.exam} ${product.name}`));
}

const authoredDeckCsv = [
  ["sie-exam-anki-deck", "sie_300_authored.csv"],
  ["series-7-anki-deck", "series7_300_authored.csv", 380],
  ["series-63-anki-deck", "series63_250_authored.csv"],
  ["frm-part-1-anki-deck", "frm_part1_v2_authored.csv"],
  ["cfa-level-2-anki-deck", ["cfa_level2_complete.csv", "cfa_level2_p1_authored.csv"], 420],
];
for (const [slug, files, maxBack] of authoredDeckCsv) {
  if (wanted(slug)) keep(slug, pickFromAuthoredDeckCsv(slug, files, maxBack));
}

for (const spec of [...Object.values(wave), ...Object.values(building)]) {
  const slug = spec.deckSlug;
  if (!slug || LANGUAGE_EXAM.has(slug) || done.has(slug) || !wanted(slug) || !spec.mockSlug) continue;
  keep(slug, pickFromMockBank(slug, `${spec.mockSlug}.json`, `${spec.deckLabel || ""} ${spec.deckName || ""} ${slug}`));
}

const extraMocks = [
  ["cfa-level-1-anki-deck", "cfa-level-1-readiness-check.json", "CFA Level 1"],
  ["cfa-level-2-anki-deck", "cfa-level-2-readiness-check.json", "CFA Level 2"],
  ["frm-part-1-anki-deck", "frm-part-1-readiness-check.json", "FRM Part 1"],
  ["sie-exam-anki-deck", "sie-full-mock.json", "FINRA SIE"],
  ["series-7-anki-deck", "series-7-readiness-check.json", "FINRA Series 7"],
  ["series-63-anki-deck", "series-63-readiness-check.json", "Series 63 NASAA"],
  ["california-real-estate-exam-anki-deck", "california-real-estate-readiness-check.json", "California DRE"],
  ["life-and-health-insurance-exam-anki-deck", "life-and-health-insurance-readiness-check.json", "Life Health insurance"],
  ["property-casualty-insurance-exam-anki-deck", "property-casualty-insurance-readiness-check.json", "Property Casualty insurance"],
  ["servsafe-manager-anki-deck", "servsafe-manager-mock.json", "ServSafe Manager"],
  ["ptcb-pharmacy-technician-anki-deck", "ptcb-pharmacy-technician-mock.json", "PTCB PTCE"],
  ["gmat-focus-anki-deck", "gmat-focus-readiness-check.json", "GMAT Focus"],
  ["sat-anki-deck", "sat-readiness-check.json", "Digital SAT"],
  ["pmp-anki-deck", "pmp-readiness-check.json", "PMP PMI"],
  ["gre-anki-deck", "gre-readiness-check.json", "GRE"],
  ["hvac-epa-608-anki-deck", "epa-608-readiness-check.json", "EPA 608"],
  ["bms-building-automation-anki-deck", "bms-bas-readiness-check.json", "BACnet BMS"],
  ["leed-green-associate-anki-deck", "leed-green-associate-readiness-check.json", "LEED Green Associate"],
  ["leed-ap-bd-c-anki-deck", "leed-ap-bd-c-readiness-check.json", "LEED AP BD+C"],
  ["leed-ap-om-anki-deck", "leed-ap-om-readiness-check.json", "LEED AP O+M"],
  ["well-ap-anki-deck", "well-ap-readiness-check.json", "WELL AP"],
  ["cem-anki-deck", "cem-readiness-check.json", "CEM energy"],
  ["ashrae-certifications-anki-deck", "ashrae-certifications-readiness-check.json", "ASHRAE BCxP"],
  ["cdcp-anki-deck", "cdcp-readiness-check.json", "CDCP data center"],
  ["nebosh-anki-deck", "nebosh-readiness-check.json", "NEBOSH"],
  ["cfps-anki-deck", "cfps-readiness-check.json", "CFPS fire"],
  ["mrics-anki-deck", "mrics-readiness-check.json", "MRICS"],
  ["mrics-quantity-surveying-anki-deck", "mrics-quantity-surveying-readiness-check.json", "MRICS quantity surveying"],
];

for (const [slug, file, hint] of extraMocks) {
  if (done.has(slug) || !wanted(slug)) continue;
  keep(slug, pickFromMockBank(slug, file, hint));
}

for (const [slug, cards] of Object.entries(immigration)) {
  if (done.has(slug) || !wanted(slug) || !Array.isArray(cards)) continue;
  const ranked = cards.map((card) => ({
    q: sanitizeStem(card.question),
    a: clean(card.answer).slice(0, 180),
    score: scoreCivic(card.question, String(card.answer || "").slice(0, 180), slug),
  }));
  keep(slug, diversify(ranked, slug));
}

for (const [slug, product] of Object.entries(civic.products || {})) {
  if (done.has(slug)) {
    product.samples = out[slug];
    civicUpdated += 1;
  }
}

writeFileSync(soldPath, `${JSON.stringify(out, null, 2)}\n`);
if (civicUpdated) {
  writeFileSync(join(root, "src/data/gumroad/civic-anki-decks.json"), `${JSON.stringify(civic, null, 2)}\n`);
}

const changed = [...done].map((slug) => `${slug}\n${out[slug].map((p, i) => `  ${i + 1}. ${p.q}\n     -> ${p.a}`).join("\n")}`);
console.log(`sold-samples refreshed ${done.size} slug(s); total ${Object.keys(out).length}; civic catalogs updated ${civicUpdated}`);
console.log(changed.slice(0, onlySlugs.size || 12).join("\n"));
