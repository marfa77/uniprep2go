#!/usr/bin/env node
/**
 * Build NHA CPCT/A bank to 120 questions (4 × 30).
 * Run: node scripts/build-nha-cpct-bank-120.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBank } from "./wave1-banks/write-helper.mjs";
import { extras as extras11 } from "./wave1-banks/extras-q11-15.mjs";
import { extras as extras16 } from "./wave1-banks/nha-cpct-q16-30.mjs";
import { topics as base } from "./wave1-banks/nha-cpct.mjs";

const slug = "nha-cpct-readiness-check";
const topics = ["patient-care", "safety-infection", "phlebotomy-ekg", "professional-practice"];
const outPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src/data/mock-exams",
  `${slug}.json`,
);

const merged = {};
for (const topicId of topics) {
  const a = base[topicId];
  const b = extras11[slug][topicId];
  const c = extras16[topicId];
  if (!a || a.length !== 10) throw new Error(`${topicId}: base ${a?.length}`);
  if (!b || b.length !== 5) throw new Error(`${topicId}: q11-15 ${b?.length}`);
  if (!c || c.length !== 15) throw new Error(`${topicId}: q16-30 ${c?.length}`);
  merged[topicId] = [...a, ...b, ...c];
}

const bank = buildBank(slug, merged, 30);
const ids = new Set(bank.map((q) => q.id));
if (ids.size !== 120) throw new Error(`duplicate ids: ${ids.size}`);
const dist = { a: 0, b: 0, c: 0, d: 0 };
for (const q of bank) dist[q.correctOptionId] += 1;

writeFileSync(outPath, `${JSON.stringify(bank, null, 2)}\n`);
console.log(`✓ ${slug} → ${bank.length}  answers=${JSON.stringify(dist)}`);
