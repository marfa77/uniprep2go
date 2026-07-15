#!/usr/bin/env node
/**
 * One-off generator for CFPS local-bank batch files.
 * Run: node scripts/generate-cfps-local-banks.mjs
 */

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import fireSuppression from "./cfps-bank-data/fire-suppression.mjs";
import safetyBuiltEnvironment from "./cfps-bank-data/safety-built-environment.mjs";
import detectionAlarm from "./cfps-bank-data/detection-alarm.mjs";
import firePreventionPrograms from "./cfps-bank-data/fire-prevention-programs.mjs";
import informationAnalysis from "./cfps-bank-data/information-analysis.mjs";
import facilityHazardManagement from "./cfps-bank-data/facility-hazard-management.mjs";
import organizingFireRescue from "./cfps-bank-data/organizing-fire-rescue.mjs";
import confiningFires from "./cfps-bank-data/confining-fires.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "local-banks");

const TOPICS = [
  { slug: "cfps-fire-suppression", topicId: "fire-suppression", questions: fireSuppression },
  { slug: "cfps-safety-built-environment", topicId: "safety-built-environment", questions: safetyBuiltEnvironment },
  { slug: "cfps-detection-alarm", topicId: "detection-alarm", questions: detectionAlarm },
  { slug: "cfps-fire-prevention-programs", topicId: "fire-prevention-programs", questions: firePreventionPrograms },
  { slug: "cfps-information-analysis", topicId: "information-analysis", questions: informationAnalysis },
  { slug: "cfps-facility-hazard-management", topicId: "facility-hazard-management", questions: facilityHazardManagement },
  { slug: "cfps-organizing-fire-rescue", topicId: "organizing-fire-rescue", questions: organizingFireRescue },
  { slug: "cfps-confining-fires", topicId: "confining-fires", questions: confiningFires },
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

console.log("All 16 CFPS local-bank files validated successfully.");
