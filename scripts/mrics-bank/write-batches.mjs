#!/usr/bin/env node
import { writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toBatch } from "./makeQ.mjs";
import { mandatoryCompetencies } from "./mandatory-competencies.mjs";
import { ethicsRulesConduct } from "./ethics-rules-conduct.mjs";
import { coreTechnicalPathway } from "./core-technical-pathway.mjs";
import { level2Level3Application } from "./level2-level3-application.mjs";
import { caseStudyInterview } from "./case-study-interview.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "../local-banks");
const HERE = dirname(fileURLToPath(import.meta.url));

const EXAMS = [
  {
    prefix: "mrics",
    topics: {
      "mandatory-competencies": mandatoryCompetencies,
      "ethics-rules-conduct": ethicsRulesConduct,
      "core-technical-pathway": coreTechnicalPathway,
      "level2-level3-application": level2Level3Application,
      "case-study-interview": caseStudyInterview,
    },
  },
];

const QS_MODULES = [
  ["commercial-cost-planning.mjs", "commercialCostPlanning", "commercial-cost-planning"],
  ["quantification-measurement.mjs", "quantificationMeasurement", "quantification-measurement"],
  ["contracts-procurement.mjs", "contractsProcurement", "contracts-procurement"],
  ["project-finance-construction.mjs", "projectFinanceConstruction", "project-finance-construction"],
  ["mandatory-ethics-optional.mjs", "mandatoryEthicsOptional", "mandatory-ethics-optional"],
];

const qsTopics = {};
for (const [file, exportName, topicId] of QS_MODULES) {
  const path = join(HERE, file);
  if (!existsSync(path)) continue;
  const mod = await import(`./${file}`);
  qsTopics[topicId] = mod[exportName];
}
if (Object.keys(qsTopics).length) {
  EXAMS.push({ prefix: "mrics-qs", topics: qsTopics });
}

let totalWritten = 0;
const issues = [];

for (const exam of EXAMS) {
  for (const [topicId, questions] of Object.entries(exam.topics)) {
    if (questions.length !== 50) {
      issues.push(`${exam.prefix}-${topicId}: expected 50 questions, got ${questions.length}`);
    }

    const prompts = new Set();
    for (const item of questions) {
      if (prompts.has(item.prompt)) {
        issues.push(`${exam.prefix}-${topicId}: duplicate prompt`);
      }
      prompts.add(item.prompt);
    }

    for (const [suffix, start, end] of [
      ["001-025", 0, 25],
      ["026-050", 25, 50],
    ]) {
      const file = `${exam.prefix}-${topicId}-${suffix}.json`;
      const slice = questions.slice(start, end);
      if (slice.length !== 25) {
        issues.push(`${file}: expected 25 questions, got ${slice.length}`);
      }
      const payload = toBatch(topicId, slice);
      writeFileSync(join(OUT_DIR, file), `${JSON.stringify(payload, null, 2)}\n`);
      totalWritten += payload.length;
      console.log(`wrote ${file} (${payload.length})`);
    }
  }
}

console.log(`\nTotal questions written: ${totalWritten}`);
if (issues.length) {
  console.error("\nValidation issues:");
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exit(1);
}
console.log("All MRICS local-bank files validated successfully.");
