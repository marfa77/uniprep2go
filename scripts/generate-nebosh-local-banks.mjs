#!/usr/bin/env node
/**
 * One-off generator for NEBOSH IGC local-bank batch files.
 * Run: node scripts/generate-nebosh-local-banks.mjs
 */

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import hsmSystemsCulture from "./nebosh-bank-data/hsm-systems-culture.mjs";
import healthErgonomics from "./nebosh-bank-data/health-ergonomics.mjs";
import agentsWorkplaceHazards from "./nebosh-bank-data/agents-workplace-hazards.mjs";
import equipmentFireElectricity from "./nebosh-bank-data/equipment-fire-electricity.mjs";
import gic2RiskAssessment from "./nebosh-bank-data/gic2-risk-assessment.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "local-banks");

const TOPICS = [
  { slug: "nebosh-hsm-systems-culture", topicId: "hsm-systems-culture", questions: hsmSystemsCulture },
  { slug: "nebosh-health-ergonomics", topicId: "health-ergonomics", questions: healthErgonomics },
  { slug: "nebosh-agents-workplace-hazards", topicId: "agents-workplace-hazards", questions: agentsWorkplaceHazards },
  { slug: "nebosh-equipment-fire-electricity", topicId: "equipment-fire-electricity", questions: equipmentFireElectricity },
  { slug: "nebosh-gic2-risk-assessment", topicId: "gic2-risk-assessment", questions: gic2RiskAssessment },
];

const BATCHES = [
  { suffix: "001-025", start: 0, end: 25 },
  { suffix: "026-050", start: 25, end: 50 },
];

let totalWritten = 0;
const issues = [];

for (const topic of TOPICS) {
  if (topic.questions.length !== 50) {
    issues.push(`${topic.topicId}: expected 50 questions, got ${topic.questions.length}`);
  }

  const prompts = new Set();
  for (const item of topic.questions) {
    if (prompts.has(item.prompt)) {
      issues.push(`${topic.topicId}: duplicate prompt detected`);
    }
    prompts.add(item.prompt);
  }

  for (const batch of BATCHES) {
    const file = `${topic.slug}-${batch.suffix}.json`;
    const slice = topic.questions.slice(batch.start, batch.end);
    if (slice.length !== 25) {
      issues.push(`${file}: expected 25 questions, got ${slice.length}`);
    }

    const payload = slice.map((question) => ({
      topicId: topic.topicId,
      prompt: question.prompt,
      options: question.options,
      correctOptionId: question.correctOptionId,
      explanation: question.explanation,
      distractorExplanations: question.distractorExplanations,
      difficulty: question.difficulty,
    }));

    const path = join(OUT_DIR, file);
    writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`);
    totalWritten += payload.length;
    console.log(`wrote ${file} (${payload.length})`);
  }
}

console.log(`\nTotal questions written: ${totalWritten}`);
if (issues.length) {
  console.error("\nValidation issues:");
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exit(1);
}

console.log("All 10 NEBOSH local-bank files validated successfully.");
