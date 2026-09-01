#!/usr/bin/env node
/**
 * Build 6 Wave-2 readiness banks to 60 questions (15×4).
 * Run: node scripts/build-wave2-six-banks-60.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBank } from "./wave2-banks/write-helper.mjs";
import { topics as cbcs } from "./wave2-banks/nha-cbcs.mjs";
import { topics as ccht } from "./wave2-banks/ccht-dialysis.mjs";
import { topics as bls } from "./wave2-banks/aha-bls.mjs";
import { topics as cna } from "./wave2-banks/nnaap-cna.mjs";
import { topics as cos } from "./wave2-banks/cosmetology-state.mjs";
import { topics as pn } from "./wave2-banks/nclex-pn.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "src", "data", "mock-exams");

const BANKS = {
  "nha-cbcs-readiness-check": {
    topics: cbcs,
    expected: [
      "coding-guidelines",
      "claims-reimbursement",
      "compliance-privacy",
      "revenue-cycle",
    ],
  },
  "ccht-dialysis-readiness-check": {
    topics: ccht,
    expected: ["dialysis-principles", "patient-care", "water-infection", "safety-docs"],
  },
  "aha-bls-provider-readiness-check": {
    topics: bls,
    expected: ["adult-cpr", "child-infant", "choking-opioid", "team-special"],
  },
  "nnaap-cna-readiness-check": {
    topics: cna,
    expected: ["adls-safety", "infection-vitals", "psychosocial", "role-rights"],
  },
  "cosmetology-state-readiness-check": {
    topics: cos,
    expected: ["science-safety", "hair-services", "skin-nails", "laws-salon"],
  },
  "nclex-pn-readiness-check": {
    topics: pn,
    expected: ["safe-care", "health-promo", "psychosocial", "physio"],
  },
};

const counts = {};

for (const [slug, { topics, expected }] of Object.entries(BANKS)) {
  const keys = Object.keys(topics);
  if (keys.length !== 4 || expected.some((id, i) => keys[i] !== id)) {
    // Allow any order but require exact set
    const missing = expected.filter((id) => !topics[id]);
    const extra = keys.filter((id) => !expected.includes(id));
    if (missing.length || extra.length || keys.length !== 4) {
      throw new Error(`${slug}: topic mismatch missing=${missing} extra=${extra}`);
    }
  }
  // Rebuild in expected topic order for stable JSON
  /** @type {Record<string, any[]>} */
  const ordered = {};
  for (const id of expected) ordered[id] = topics[id];

  const bank = buildBank(slug, ordered, 15);
  const byTopic = {};
  const correctDist = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of bank) {
    byTopic[q.topicId] = (byTopic[q.topicId] || 0) + 1;
    correctDist[q.correctOptionId]++;
    if (q.sourceNote !== "Original UniPrep2Go local bank (Wave 2).") {
      throw new Error(`${q.id}: bad sourceNote`);
    }
    const wrongIds = ["a", "b", "c", "d"].filter((id) => id !== q.correctOptionId);
    for (const id of wrongIds) {
      if (!q.distractorExplanations[id]) {
        throw new Error(`${q.id}: missing distractor for ${id}`);
      }
    }
    if (q.distractorExplanations[q.correctOptionId]) {
      throw new Error(`${q.id}: distractorExplanations must not include correctOptionId`);
    }
  }
  for (const id of expected) {
    if (byTopic[id] !== 15) throw new Error(`${slug}/${id}: expected 15, got ${byTopic[id]}`);
  }
  if (bank.length !== 60) throw new Error(`${slug}: expected 60, got ${bank.length}`);

  const outPath = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(bank, null, 2) + "\n");
  counts[slug] = { total: bank.length, byTopic, correctDist };
  console.log(`Wrote ${outPath} (${bank.length})`, byTopic, correctDist);
}

console.log("\nSUMMARY");
console.log(JSON.stringify(counts, null, 2));
