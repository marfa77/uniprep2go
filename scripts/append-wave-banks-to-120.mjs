#!/usr/bin/env node
/**
 * Append extras 016–030 onto existing 60-item wave banks.
 * Usage: node scripts/append-wave-banks-to-120.mjs [--slug mock-slug]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { makeQ, rot } from "./wave1-banks/write-helper.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const extrasDir = join(root, "scripts/wave-expand-120");
const bankDir = join(root, "src/data/mock-exams");

const SOURCE_BY_SLUG = {
  "acsm-cpt-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "series-65-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "series-66-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "series-6-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "series-79-readiness-check": "Original UniPrep2Go local bank (Wave 4).",
  "series-99-readiness-check": "Original UniPrep2Go local bank (Wave 4).",
  "cfp-certification-readiness-check": "Original UniPrep2Go local bank (Wave 4).",
  "enrolled-agent-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "mortgage-loan-originator-readiness-check": "Original UniPrep2Go local bank (Wave 3 quality).",
  "rd-exam-readiness-check":
    "Authored by UniPrep2Go (original readiness-check question). Wave 2 RD bank — cleaned stems/keys.",
  "luxembourg-vivre-ensemble-readiness-check":
    "Original UniPrep2Go local bank (Luxembourg Vivre ensemble).",
};

function parseArgs(argv) {
  const slugs = [];
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") slugs.push(argv[++i]);
    else if (!argv[i].startsWith("-")) slugs.push(argv[i]);
  }
  return slugs;
}

async function appendOne(mockSlug) {
  const extrasPath = join(extrasDir, `${mockSlug}.mjs`);
  const bankPath = join(bankDir, `${mockSlug}.json`);
  const { extras } = await import(pathToFileURL(extrasPath).href);
  const existing = JSON.parse(readFileSync(bankPath, "utf8"));
  const keep = existing.filter((q) => {
    const n = Number(String(q.id).split("-").pop());
    return n <= 15;
  });
  if (keep.length !== 60) {
    throw new Error(`${mockSlug}: expected 60 keepers (001–015), got ${keep.length}`);
  }
  const topics = [...new Set(keep.map((q) => q.topicId))];
  if (topics.length !== 4) throw new Error(`${mockSlug}: expected 4 topics, got ${topics}`);
  const sourceNote = SOURCE_BY_SLUG[mockSlug] ?? keep[0].sourceNote;
  const added = [];
  for (const topicId of topics) {
    const rows = extras[topicId];
    if (!rows || rows.length !== 15) {
      throw new Error(`${mockSlug}/${topicId}: need 15 extras, got ${rows?.length}`);
    }
    rows.forEach((row, i) => {
      const n = 16 + i;
      const q = makeQ(mockSlug, topicId, n, row, rot(n - 1));
      q.sourceNote = sourceNote;
      added.push(q);
    });
  }
  const out = [...keep, ...added];
  if (out.length !== 120) throw new Error(`${mockSlug}: ${out.length} !== 120`);
  writeFileSync(bankPath, `${JSON.stringify(out, null, 2)}\n`);
  return { mockSlug, topics: topics.map((t) => `${t}:${extras[t].length}`).join(",") };
}

async function main() {
  const only = parseArgs(process.argv);
  const files = readdirSync(extrasDir).filter((f) => f.endsWith(".mjs"));
  const slugs = only.length
    ? only
    : files.map((f) => f.replace(/\.mjs$/, ""));
  for (const slug of slugs) {
    const info = await appendOne(slug);
    console.log(`✓ ${info.mockSlug} → 120  ${info.topics}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
