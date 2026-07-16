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
  const bankTarget = spec.targetBankCards ?? "50×topics";
  const price = spec.listPriceUsd ?? 11;
  const lines = [
    "",
    "=== Full under-key checklist (agent executes; user only supplies sample screenshots) ===",
    "",
    "PHASE 1 — Spec & registry",
    `  [x] registry.json entry (${spec.id})`,
    `  [ ] src/data/building-deck-specs.json — ${spec.deckSlug} (filePrefix, cardCount, topics)`,
    `  [ ] src/lib/building-cert-clusters.ts — cluster membership if new pathway`,
    "",
    "PHASE 2 — Mock (official scoring axes only)",
    `  [ ] src/lib/mock-exams/configs.ts — ${spec.mockSlug} → linkedDeckSlug ${spec.deckSlug}`,
    `  [ ] src/lib/mock-exams/seo.ts — SEO profile`,
    `  [ ] src/lib/mock-exams/question-bank.ts — import + banksBySlug`,
    `  [ ] src/data/mock-exams/${spec.mockSlug}.json — [] then bank`,
    "",
    "PHASE 3 — Deck + commerce catalog",
    `  [ ] src/lib/decks.ts — planned ${spec.deckSlug} + sampleCards paths`,
    `  [ ] src/data/gumroad/building-anki-decks.json — permalink ${spec.gumroadPermalink ?? spec.deckSlug}`,
    `  [ ] src/data/catalog-list-prices.json — override $${price}`,
    `  [ ] src/lib/deck-seo.ts — deck SEO if needed`,
    "",
    "PHASE 4 — Funnel + LLM/GEO",
    `  [ ] src/app/page.tsx + mock-exams/page.tsx discovery links`,
    `  [ ] src/lib/exam-facts.ts — ${spec.examFactsKey ?? "(set examFactsKey)"}`,
    `  [ ] src/lib/exam-llm-layer.ts — HIGH_INTENT_MOCK_BLOCKS`,
    "",
    "PHASE 5 — Covers (agent)",
    `  [ ] scripts/generate-deck-covers.mjs DECK_CONFIGS[${spec.deckSlug}]`,
    `  [ ] npm run generate:deck-covers -- --slug ${spec.deckSlug}`,
    `  [ ] npm run generate:deck-covers -- --gumroad-thumbnails --slug ${spec.deckSlug}`,
    "",
    "PHASE 6 — Bank + LLM validate",
    `  [ ] generate bank (~${bankTarget} cards) via OpenRouter or local expand script`,
    `  [ ] npm run validate:mock-banks -- --slug ${spec.mockSlug}`,
    `  [ ] npm run validate:mock-banks -- --slug ${spec.mockSlug} --apply`,
    `  [ ] sync cardCount / ankiDeckCardCount / copy after apply`,
    "",
    "PHASE 7 — Live indexation",
    `  [ ] set mock status: \"live\" when runnable + validated`,
    "",
    "PHASE 8 — .apkg + Gumroad (auth via gumroad-auth.mjs)",
    `  [ ] Anki Generator building_deck_pipeline --deck-slug ${spec.deckSlug}`,
    `  [ ] npm run setup:gumroad-building-decks -- --slug ${spec.deckSlug}`,
    `  [ ] --assets-only if apkg landed after create`,
    "",
    "PHASE 9 — Samples (USER) then ship",
    `  [ ] wait for user screenshots → public/samples/${spec.deckSlug}-sample-{1,2,3}.webp`,
    `  [ ] npm run validate:certification -- --mock ${spec.mockSlug}  (0 fails)`,
    `  [ ] npm test && npm run build`,
    `  [ ] git commit + push origin main (Vercel prod)`,
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
