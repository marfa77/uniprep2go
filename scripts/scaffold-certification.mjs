#!/usr/bin/env node
/**
 * Scaffold a new certification in the pipeline registry.
 * Does NOT auto-edit configs.ts / decks.ts — prints the agent checklist after registry append.
 *
 * Usage:
 *   node scripts/scaffold-certification.mjs --spec path/to/spec.json
 *   node scripts/scaffold-certification.mjs --spec path/to/spec.json --dry-run
 *
 * Spec shape: see scripts/templates/certification.spec.json
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findCert, loadRegistry } from "./lib/certification-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = join(root, "src/data/certifications/registry.json");

function parseArgs(argv) {
  const args = { spec: null, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--spec") args.spec = argv[++i];
  }
  return args;
}

function printChecklist(spec) {
  const lines = [
    "",
    "=== Agent checklist (execute in order) ===",
    "",
    "PHASE 1 — Spec & registry",
    `  [x] registry.json entry (${spec.id})`,
    "",
    "PHASE 2 — Mock exam",
    `  [ ] src/lib/mock-exams/configs.ts — add ${spec.mockSlug} (topics, linkedDeckSlug: ${spec.deckSlug})`,
    `  [ ] src/lib/mock-exams/seo.ts — SEO profile for ${spec.mockSlug}`,
    `  [ ] src/lib/mock-exams/question-bank.ts — import + banksBySlug entry`,
    `  [ ] src/data/mock-exams/${spec.mockSlug}.json — start with []`,
    "",
    "PHASE 3 — Anki deck",
    `  [ ] src/lib/decks.ts — planned deck ${spec.deckSlug} (topicCoverage, faqs, coverImage)`,
    `  [ ] src/data/gumroad/building-anki-decks.json — permalink ${spec.gumroadPermalink ?? spec.deckSlug}`,
    `  [ ] scripts/setup-gumroad-building-decks.mjs — add title in titles map`,
    "",
    "PHASE 4 — Site & funnel",
    `  [ ] src/app/page.tsx — repair pair or section link`,
    `  [ ] src/app/mock-exams/page.tsx — usPriorityMockLinks entry`,
    `  [ ] src/lib/deck-funnel.ts — only if companion PDF/sibling product`,
    "",
    "PHASE 5 — SEO & LLM",
    `  [ ] src/lib/exam-facts.ts — examFactsKey ${spec.examFactsKey ?? "(recommended)"}`,
    `  [ ] src/lib/exam-llm-layer.ts — HIGH_INTENT_MOCK_BLOCKS`,
    `  [ ] src/lib/deck-seo.ts — deck SEO profile if non-default framing needed`,
    "",
    "PHASE 6 — Assets",
    `  [ ] scripts/generate-deck-covers.mjs — DECK_CONFIGS[${spec.deckSlug}]`,
    `  [ ] npm run generate:deck-covers -- --slug ${spec.deckSlug}`,
    "",
    "PHASE 7 — Content generation",
    `  [ ] npm run generate:mock-banks -- --slug ${spec.mockSlug}`,
    `  [ ] npm run validate:mock-banks -- --slug ${spec.mockSlug}`,
    `  [ ] npm run validate:mock-banks -- --slug ${spec.mockSlug} --apply  (if clean)`,
    "",
    "PHASE 8 — Gumroad (when GUMROAD_ACCESS_TOKEN set)",
    `  [ ] npm run setup:gumroad-building-decks -- --slug ${spec.deckSlug}`,
    "",
    "PHASE 9 — Validation",
    `  [ ] npm run validate:certification -- --mock ${spec.mockSlug}`,
    `  [ ] npm test`,
    `  [ ] npm run build`,
    "",
  ];
  console.log(lines.join("\n"));
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.spec) {
    console.error("Usage: node scripts/scaffold-certification.mjs --spec path/to/spec.json");
    process.exit(1);
  }

  const specPath = join(process.cwd(), args.spec);
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  const required = ["id", "mockSlug", "deckSlug", "category", "coverPanelKind"];
  for (const key of required) {
    if (!spec[key]) {
      throw new Error(`Spec missing required field: ${key}`);
    }
  }

  spec.gumroadPermalink ??= spec.deckSlug;
  spec.examFactsKey ??= null;
  spec.skipMockBankGeneration ??= false;
  delete spec._notes;

  const registry = loadRegistry(root);
  const existing = findCert(registry, { id: spec.id, mockSlug: spec.mockSlug, deckSlug: spec.deckSlug });
  if (existing) {
    throw new Error(`Certification already in registry: ${existing.id}`);
  }

  console.log(`Scaffold: ${spec.id}`);
  console.log(`  mock: ${spec.mockSlug}`);
  console.log(`  deck: ${spec.deckSlug}`);

  if (!args.dryRun) {
    registry.certifications.push(spec);
    writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`\nAppended to ${REGISTRY_PATH}`);
  } else {
    console.log("\nDry-run — registry not written");
  }

  printChecklist(spec);
}

main();
