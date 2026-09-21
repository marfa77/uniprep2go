#!/usr/bin/env node
/**
 * Pick the strongest 3 selling samples for every sold SKU except language-exam decks.
 * Writes src/data/sold-samples.json and updates civic catalog sample Q&As.
 */
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ANKI_OUT = join(dirname(root), "Anki Generator", "out");

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

function jaccard(a, b) {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter += 1;
  return inter / (A.size + B.size - inter);
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

function diversify(ranked, count = 3) {
  const picks = [];
  const usedTopics = new Set();
  for (const row of ranked) {
    if (picks.length >= count) break;
    if (picks.some((p) => jaccard(p.q, row.q) > 0.45)) continue;
    if (row.topic && usedTopics.has(row.topic) && picks.length < count - 1) continue;
    picks.push({ q: row.q, a: row.a });
    if (row.topic) usedTopics.add(row.topic);
  }
  for (const row of ranked) {
    if (picks.length >= count) break;
    if (picks.some((p) => p.q === row.q || jaccard(p.q, row.q) > 0.45)) continue;
    picks.push({ q: row.q, a: row.a });
  }
  return picks.slice(0, count);
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

function pickCivicFromCsv(folder, hint) {
  const path = join(ANKI_OUT, folder, "source.csv");
  if (!existsSync(path)) return [];
  const rows = parseCsv(readFileSync(path, "utf8")).slice(1);
  const ranked = rows
    .map((cells) => ({
      q: sanitizeStem(cells[0]),
      a: clean(cells[1]),
      score: scoreCivic(cells[0], cells[1], hint),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
  return diversify(ranked);
}

function pickFromMockBank(file, hint) {
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
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
  return diversify(ranked);
}

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

const civic = loadJson(join(root, "src/data/gumroad/civic-anki-decks.json"), { products: {} });
const wave = loadJson(join(root, "src/data/wave-deck-specs.json"), {});
const building = loadJson(join(root, "src/data/building-deck-specs.json"), {});
const immigration = loadJson(join(root, "src/data/prep2go-immigration-samples.json"), {});

const out = {};
let civicUpdated = 0;

for (const [slug, product] of Object.entries(civic.products || {})) {
  const picks = pickCivicFromCsv(product.folder, `${product.exam} ${product.name}`);
  if (picks.length === 3) {
    out[slug] = picks;
  }
}

for (const spec of [...Object.values(wave), ...Object.values(building)]) {
  const slug = spec.deckSlug;
  if (!slug || LANGUAGE_EXAM.has(slug) || out[slug]) continue;
  const mockSlug = spec.mockSlug;
  if (!mockSlug) continue;
  const picks = pickFromMockBank(`${mockSlug}.json`, `${spec.deckLabel || ""} ${spec.deckName || ""} ${slug}`);
  if (picks.length === 3) out[slug] = picks;
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
  if (out[slug]) continue;
  const picks = pickFromMockBank(file, hint);
  if (picks.length === 3) out[slug] = picks;
}

for (const [slug, cards] of Object.entries(immigration)) {
  if (out[slug] || !Array.isArray(cards)) continue;
  const ranked = cards
    .map((card) => ({
      q: sanitizeStem(card.question),
      a: clean(card.answer).slice(0, 180),
      score: scoreCivic(card.question, String(card.answer || "").slice(0, 180), slug),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
  const picks = diversify(ranked);
  if (picks.length === 3) out[slug] = picks;
}

for (const [slug, product] of Object.entries(civic.products || {})) {
  if (out[slug]?.length === 3) {
    product.samples = out[slug];
    civicUpdated += 1;
  }
}

writeFileSync(join(root, "src/data/sold-samples.json"), `${JSON.stringify(out, null, 2)}\n`);
writeFileSync(join(root, "src/data/gumroad/civic-anki-decks.json"), `${JSON.stringify(civic, null, 2)}\n`);

const changed = Object.entries(out).map(([slug, picks]) => `${slug}\n  1. ${picks[0].q}\n  2. ${picks[1].q}\n  3. ${picks[2].q}`);
console.log(`sold-samples ${Object.keys(out).length} slugs; civic catalogs updated ${civicUpdated}`);
console.log(changed.slice(0, 12).join("\n"));
console.log("...");
