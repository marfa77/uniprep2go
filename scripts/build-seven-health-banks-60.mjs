#!/usr/bin/env node
/**
 * Build 7 Wave-1 health readiness banks to 60 questions (15×4).
 * Run: node scripts/build-seven-health-banks-60.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBank } from "./wave1-banks/write-helper.mjs";
import { extras } from "./wave1-banks/extras-q11-15.mjs";
import { topics as ccma } from "./wave1-banks/nha-ccma.mjs";
import { topics as emt } from "./wave1-banks/nremt-emt.mjs";
import { topics as cpt } from "./wave1-banks/nha-cpt-phlebotomy.mjs";
import { topics as cpct } from "./wave1-banks/nha-cpct.mjs";
import { topics as excpt } from "./wave1-banks/nha-excpt.mjs";
import { topics as medic } from "./wave1-banks/nremt-paramedic.mjs";
import { topics as ice } from "./wave1-banks/danb-ice.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "src", "data", "mock-exams");

/** @param {Record<string, any[]>} base @param {Record<string, any[]>} extra */
function merge15(base, extra) {
  /** @type {Record<string, any[]>} */
  const out = {};
  for (const topicId of Object.keys(base)) {
    const add = extra[topicId];
    if (!add || add.length !== 5) {
      throw new Error(`${topicId}: need 5 extras, got ${add?.length ?? 0}`);
    }
    out[topicId] = [...base[topicId], ...add];
    if (out[topicId].length !== 15) {
      throw new Error(`${topicId}: expected 15 after merge, got ${out[topicId].length}`);
    }
  }
  return out;
}

const BANKS = {
  "nha-ccma-readiness-check": () => merge15(ccma, extras["nha-ccma-readiness-check"]),
  "nremt-emt-readiness-check": () => merge15(emt, extras["nremt-emt-readiness-check"]),
  "nha-cpt-phlebotomy-readiness-check": () =>
    merge15(cpt, extras["nha-cpt-phlebotomy-readiness-check"]),
  "nha-cpct-readiness-check": () => merge15(cpct, extras["nha-cpct-readiness-check"]),
  "nha-excpt-readiness-check": () => merge15(excpt, extras["nha-excpt-readiness-check"]),
  "nremt-paramedic-readiness-check": () =>
    merge15(medic, extras["nremt-paramedic-readiness-check"]),
  "danb-ice-readiness-check": () => merge15(ice, extras["danb-ice-readiness-check"]),
};

const expected = {
  "nha-ccma-readiness-check": [
    "clinical-patient-care",
    "phlebotomy-ekg",
    "safety-infection",
    "admin-communication",
  ],
  "nremt-emt-readiness-check": [
    "airway-respiration",
    "cardiology-resuscitation",
    "trauma",
    "medical-ops",
  ],
  "nha-cpt-phlebotomy-readiness-check": [
    "circulatory-anatomy",
    "collection-equipment",
    "specimen-handling",
    "safety-patient",
  ],
  "nha-cpct-readiness-check": [
    "patient-care",
    "safety-infection",
    "phlebotomy-ekg",
    "professional-practice",
  ],
  "nha-excpt-readiness-check": [
    "pharmacology",
    "federal-law",
    "order-entry",
    "dispensing-practice",
  ],
  "nremt-paramedic-readiness-check": [
    "airway-critical",
    "cardiology",
    "trauma-medical",
    "ops-special",
  ],
  "danb-ice-readiness-check": [
    "standard-precautions",
    "instrument-processing",
    "environmental",
    "occupational",
  ],
};

function verify(slug, bank) {
  if (bank.length !== 60) throw new Error(`${slug}: length ${bank.length} !== 60`);
  const topics = expected[slug];
  /** @type {Record<string, number>} */
  const counts = {};
  for (const tid of topics) {
    const n = bank.filter((q) => q.topicId === tid).length;
    counts[tid] = n;
    if (n !== 15) throw new Error(`${slug}/${tid}: ${n} !== 15`);
  }
  const ids = new Set(bank.map((q) => q.id));
  if (ids.size !== 60) throw new Error(`${slug}: duplicate ids`);
  for (const q of bank) {
    if (q.examSlug !== slug) throw new Error(`${q.id}: bad examSlug`);
    if (!["a", "b", "c", "d"].includes(q.correctOptionId)) {
      throw new Error(`${q.id}: bad correctOptionId`);
    }
    const wrongKeys = Object.keys(q.distractorExplanations);
    if (wrongKeys.includes(q.correctOptionId)) {
      throw new Error(`${q.id}: distractor has correct`);
    }
    if (wrongKeys.length !== 3) throw new Error(`${q.id}: need 3 distractors`);
    if (q.sourceNote !== "Original UniPrep2Go local bank (Wave 1).") {
      throw new Error(`${q.id}: bad sourceNote`);
    }
  }
  const dist = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of bank) dist[q.correctOptionId]++;
  return { counts, dist };
}

const table = [];
for (const [slug, getTopics] of Object.entries(BANKS)) {
  const topics = getTopics();
  const keys = Object.keys(topics);
  const need = expected[slug];
  if (keys.length !== 4 || need.some((t) => !topics[t])) {
    throw new Error(`${slug}: topic keys ${keys.join(",")} vs ${need.join(",")}`);
  }
  const bank = buildBank(slug, topics, 15);
  const { counts, dist } = verify(slug, bank);
  const outPath = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(bank, null, 2) + "\n");
  table.push({ slug, total: bank.length, ...counts, answers: dist });
  console.log(`✓ ${slug} → ${bank.length}  answers=${JSON.stringify(dist)}`);
}

console.log("\n=== Counts table ===");
console.log(
  "slug | total | " +
    "t1 | t2 | t3 | t4",
);
for (const row of table) {
  const tids = expected[row.slug];
  console.log(
    `${row.slug} | ${row.total} | ${tids.map((t) => `${t}:${row[t]}`).join(" | ")}`,
  );
}
console.log(`\nDone: ${table.length} banks × 60.`);
