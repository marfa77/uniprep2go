#!/usr/bin/env node
/**
 * Build Wave 1 base banks (17 × 40 curated MCQs) into src/data/mock-exams/{slug}.json
 *
 * Production banks are 60Q (base 40 + q011–015 expand). This script alone would
 * DESTROY the expanded half — refused unless --force.
 *
 * Prefer: leave JSON as-is, or run expand-wave1-mock-banks-40-to-60.mjs / extras after base.
 *
 *   node scripts/build-wave1-banks-local.mjs          # safe no-op if 60Q present
 *   node scripts/build-wave1-banks-local.mjs --force  # overwrite with 40Q base only
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBank } from "./wave1-banks/write-helper.mjs";

import { topics as cdl } from "./wave1-banks/cdl-general-knowledge.mjs";
import { topics as ccma } from "./wave1-banks/nha-ccma.mjs";
import { topics as emt } from "./wave1-banks/nremt-emt.mjs";
import { topics as cpt } from "./wave1-banks/nha-cpt-phlebotomy.mjs";
import { topics as flre } from "./wave1-banks/fl-real-estate.mjs";
import { topics as txre } from "./wave1-banks/tx-real-estate.mjs";
import { topics as cpc } from "./wave1-banks/aapc-cpc.mjs";
import { topics as mblex } from "./wave1-banks/mblex.mjs";
import { topics as cpct } from "./wave1-banks/nha-cpct.mjs";
import { topics as excpt } from "./wave1-banks/nha-excpt.mjs";
import { topics as medic } from "./wave1-banks/nremt-paramedic.mjs";
import { topics as ice } from "./wave1-banks/danb-ice.mjs";
import { topics as crcst } from "./wave1-banks/crcst.mjs";
import { topics as cmaa } from "./wave1-banks/nha-cmaa.mjs";
import { topics as spi } from "./wave1-banks/ardms-spi.mjs";
import { topics as cst } from "./wave1-banks/nbstsa-cst.mjs";
import { topics as vtne } from "./wave1-banks/vtne.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "src", "data", "mock-exams");

/** @type {Record<string, Record<string, any[]>>} */
const BANKS = {
  "cdl-general-knowledge-readiness-check": cdl,
  "nha-ccma-readiness-check": ccma,
  "nremt-emt-readiness-check": emt,
  "nha-cpt-phlebotomy-readiness-check": cpt,
  "fl-real-estate-readiness-check": flre,
  "tx-real-estate-readiness-check": txre,
  "aapc-cpc-readiness-check": cpc,
  "mblex-readiness-check": mblex,
  "nha-cpct-readiness-check": cpct,
  "nha-excpt-readiness-check": excpt,
  "nremt-paramedic-readiness-check": medic,
  "danb-ice-readiness-check": ice,
  "crcst-readiness-check": crcst,
  "nha-cmaa-readiness-check": cmaa,
  "ardms-spi-readiness-check": spi,
  "nbstsa-cst-readiness-check": cst,
  "vtne-readiness-check": vtne,
};

const expectedTopicIds = {
  "cdl-general-knowledge-readiness-check": [
    "vehicle-systems",
    "safe-driving",
    "cargo",
    "emergencies-rules",
  ],
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
  "fl-real-estate-readiness-check": [
    "license-law",
    "contracts-titles",
    "finance-appraisal",
    "property-practice",
  ],
  "tx-real-estate-readiness-check": [
    "license-law",
    "contracts-agency",
    "finance-closing",
    "property-practice",
  ],
  "aapc-cpc-readiness-check": [
    "coding-guidelines",
    "evaluation-management",
    "surgery-anesthesia",
    "compliance-billing",
  ],
  "mblex-readiness-check": [
    "anatomy-physiology",
    "kinesiology",
    "assessment-treatment",
    "ethics-business",
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
  "crcst-readiness-check": [
    "decontamination",
    "assembly-packaging",
    "sterilization",
    "storage-distribution",
  ],
  "nha-cmaa-readiness-check": [
    "scheduling-front",
    "medical-records",
    "billing-coding-basics",
    "communication-ethics",
  ],
  "ardms-spi-readiness-check": [
    "physics-basics",
    "transducers-beam",
    "doppler-hemodynamics",
    "artifacts-safety",
  ],
  "nbstsa-cst-readiness-check": [
    "perioperative",
    "asepsis-sterile",
    "anatomy-surg",
    "equipment-safety",
  ],
  "vtne-readiness-check": [
    "pharmacy-pharm",
    "surgical-nursing",
    "diagnostics",
    "animal-care",
  ],
};

function verify(slug, bank) {
  if (bank.length !== 40) throw new Error(`${slug}: length ${bank.length} !== 40`);
  const topics = expectedTopicIds[slug];
  for (const tid of topics) {
    const n = bank.filter((q) => q.topicId === tid).length;
    if (n !== 10) throw new Error(`${slug}/${tid}: ${n} !== 10`);
  }
  const ids = new Set(bank.map((q) => q.id));
  if (ids.size !== 40) throw new Error(`${slug}: duplicate ids`);
  const corrects = new Set(bank.map((q) => q.correctOptionId));
  if (corrects.size < 4) {
    console.warn(`  warn ${slug}: correctOptionId variety = ${[...corrects].join(",")}`);
  }
}

const force = process.argv.includes("--force");
const results = [];
for (const [slug, topics] of Object.entries(BANKS)) {
  const topicKeys = Object.keys(topics);
  const expected = expectedTopicIds[slug];
  if (topicKeys.length !== 4 || expected.some((t) => !topics[t])) {
    throw new Error(`${slug}: topic keys mismatch. got ${topicKeys.join(",")}, need ${expected.join(",")}`);
  }
  const outPath = path.join(outDir, `${slug}.json`);
  if (!force && fs.existsSync(outPath)) {
    const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
    if (Array.isArray(existing) && existing.length >= 60) {
      console.log(`skip ${slug} — ${existing.length}Q present (pass --force to overwrite with 40Q base)`);
      results.push({ slug, count: existing.length, skipped: true });
      continue;
    }
  }
  const bank = buildBank(slug, topics, 10);
  verify(slug, bank);
  fs.writeFileSync(outPath, JSON.stringify(bank, null, 2) + "\n");
  results.push({ slug, count: bank.length });
  console.log(`✓ ${slug} → ${bank.length}`);
}

console.log("\n=== Verification ===");
console.log("slug → count");
for (const r of results) {
  console.log(`${r.slug} → ${r.count}`);
}
console.log(`\nDone: ${results.length} banks, all 40 questions.`);
