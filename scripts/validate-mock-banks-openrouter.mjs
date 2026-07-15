#!/usr/bin/env node
/**
 * Cross-validate existing mock question banks (post-generation).
 *
 * Generator bank: anthropic/claude-sonnet-4
 * Validator: google/gemini-2.5-flash (both via OpenRouter)
 *
 * Usage:
 *   node scripts/validate-mock-banks-openrouter.mjs --slug epa-608-readiness-check
 *   node scripts/validate-mock-banks-openrouter.mjs --all
 *   node scripts/validate-mock-banks-openrouter.mjs --slug epa-608-readiness-check --apply
 *
 * Env: OPENROUTER_API_KEY
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  chatJson,
  VALIDATOR_MODEL,
  loadCredentials,
} from "./lib/openrouter.mjs";
import { listMockSlugs, loadRegistry } from "./lib/certification-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT_DIR = join(root, "src/data/mock-exams/.validation-reports");
const registry = loadRegistry(root);
const TARGET_SLUGS = new Set(listMockSlugs(registry));

function parseArgs(argv) {
  const args = { slug: null, all: false, apply: false, limit: null };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--apply") args.apply = true;
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--limit") args.limit = Number(argv[++i]);
  }
  return args;
}

const VALIDATION_RETRIES = 3;
const VALIDATION_CONCURRENCY = Number(process.env.MOCK_BANK_VALIDATE_CONCURRENCY ?? 4);

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

async function crossValidateQuestion(credentials, question) {
  const optionsBlock = question.options
    .map((option) => `(${option.id}) ${option.text}`)
    .join("\n");

  const system = `You are an independent exam-item reviewer. Solve the MCQ cold, then audit quality.
Return JSON only:
{
  "chosenOptionId": "a"|"b"|"c"|"d",
  "matchesMarkedCorrect": boolean,
  "issues": string[],
  "approved": boolean
}
Approve only if: exactly one defensible answer, chosenOptionId equals the marked correctOptionId, distractors are plausible, no factual errors, stem is unambiguous.`;

  const user = `STEM:
${question.prompt}
${question.formula ? `\nFORMULA: ${question.formula}` : ""}

OPTIONS:
${optionsBlock}

MARKED CORRECT: (${question.correctOptionId})

Review the item. Do not trust the marked answer — solve independently first.`;

  let lastError = null;
  for (let attempt = 1; attempt <= VALIDATION_RETRIES; attempt += 1) {
    try {
      const result = await chatJson({
        credentials,
        model: VALIDATOR_MODEL,
        system,
        user,
        temperature: 0.1,
        maxTokens: 1024,
        role: "validator",
      });

      const approved =
        result.approved === true &&
        result.matchesMarkedCorrect === true &&
        result.chosenOptionId === question.correctOptionId &&
        Array.isArray(result.issues) &&
        result.issues.length === 0;

      return { approved, result };
    } catch (error) {
      lastError = error;
      if (attempt < VALIDATION_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
  }

  throw lastError ?? new Error("Validation failed");
}

async function validateExam(credentials, config, { apply, limit }) {
  const bankPath = join(root, `src/data/mock-exams/${config.slug}.json`);
  if (!existsSync(bankPath)) {
    console.log(`skip ${config.slug} (no bank file)`);
    return;
  }

  const questions = JSON.parse(readFileSync(bankPath, "utf8"));
  if (!Array.isArray(questions) || questions.length === 0) {
    console.log(`skip ${config.slug} (empty bank)`);
    return;
  }

  const toValidate = limit ? questions.slice(0, limit) : questions;
  console.log(`\n=== validate ${config.slug} (${toValidate.length} questions, ${VALIDATOR_MODEL}, concurrency ${VALIDATION_CONCURRENCY}) ===`);

  const report = {
    slug: config.slug,
    validatedAt: new Date().toISOString(),
    validatorModel: VALIDATOR_MODEL,
    total: toValidate.length,
    approved: [],
    rejected: [],
  };

  const outcomes = await mapWithConcurrency(toValidate, VALIDATION_CONCURRENCY, async (question) => {
    try {
      const { approved, result } = await crossValidateQuestion(credentials, question);
      return { question, approved, result, error: null };
    } catch (error) {
      return { question, approved: false, result: null, error: error.message };
    }
  });

  for (const outcome of outcomes) {
    const { question, approved, result, error } = outcome;
    if (approved) {
      report.approved.push(question.id);
      console.log(`  ok ${question.id}`);
    } else if (error) {
      report.rejected.push({ id: question.id, error });
      console.warn(`  error ${question.id}: ${error}`);
    } else {
      report.rejected.push({ id: question.id, result });
      console.warn(`  reject ${question.id}: ${JSON.stringify(result)}`);
    }
  }

  const reportPath = join(REPORT_DIR, `${config.slug}.json`);
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `report: ${report.approved.length} approved, ${report.rejected.length} rejected → ${reportPath}`,
  );

  if (apply) {
    const rejectedIds = new Set(report.rejected.map((entry) => entry.id));
    const filtered = questions.filter((question) => !rejectedIds.has(question.id));
    writeFileSync(bankPath, `${JSON.stringify(filtered, null, 2)}\n`);
    console.log(`applied: removed ${rejectedIds.size} questions → ${bankPath} (${filtered.length} left)`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const credentials = loadCredentials();
  const { mockExamConfigs } = await import("../src/lib/mock-exams/configs.ts");

  let configs = mockExamConfigs.filter(
    (config) => config.status === "preview" && TARGET_SLUGS.has(config.slug),
  );

  if (args.slug) {
    configs = configs.filter((config) => config.slug === args.slug);
    if (configs.length === 0) {
      throw new Error(`Unknown or unsupported slug: ${args.slug}`);
    }
  } else if (!args.all) {
    throw new Error("Pass --slug <slug> or --all");
  }

  console.log(`Validator: ${VALIDATOR_MODEL} via OpenRouter`);

  for (const config of configs) {
    await validateExam(credentials, config, { apply: args.apply, limit: args.limit });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
