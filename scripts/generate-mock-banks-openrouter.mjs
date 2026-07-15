#!/usr/bin/env node
/**
 * Generate full-size mock question banks via OpenRouter (no LLM validation).
 * Run validate-mock-banks-openrouter.mjs separately when ready.
 *
 * Generator: anthropic/claude-sonnet-4 via OpenRouter
 *
 * Usage:
 *   node scripts/generate-mock-banks-openrouter.mjs --slug epa-608-readiness-check
 *   node scripts/generate-mock-banks-openrouter.mjs --all
 *   node scripts/generate-mock-banks-openrouter.mjs --slug epa-608-readiness-check --repair
 *
 * Env: OPENROUTER_API_KEY
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  chatJson,
  GENERATOR_MODEL,
  loadCredentials,
} from "./lib/openrouter.mjs";
import { listMockSlugs, loadRegistry } from "./lib/certification-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = join(root, "src/data/mock-exams/.generation-cache");
const REPORT_DIR = join(root, "src/data/mock-exams/.validation-reports");
const registry = loadRegistry(root);
const TARGET_SLUGS = new Set(listMockSlugs(registry));
const SKIP_SLUGS = new Set(
  registry.certifications.filter((c) => c.skipMockBankGeneration).map((c) => c.mockSlug),
);

/** Sale-grade Anki deck banks: 50/topic → 200 (4 topics) … 400 (8 topics). Mock sessions stay smaller. */
const QUESTIONS_PER_TOPIC = Number(process.env.MOCK_BANK_QUESTIONS_PER_TOPIC ?? 50);
const BATCH_SIZE = Number(process.env.MOCK_BANK_BATCH_SIZE ?? 3);
const MAX_RETRIES = 2;

function parseArgs(argv) {
  const args = { slug: null, all: false, force: false, repair: false, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--repair") args.repair = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--slug") args.slug = argv[++i];
  }
  return args;
}

function normalizeQuestion(raw, examSlug, topicId, seq) {
  const optionIds = ["a", "b", "c", "d"];
  const options = optionIds.map((id) => {
    const match = raw.options?.find((option) => option.id === id);
    return { id, text: String(match?.text ?? "").trim() };
  });

  const texts = options.map((option) => option.text);
  if (texts.some((text) => !text) || new Set(texts).size !== 4) {
    throw new Error("Question must have 4 unique non-empty options");
  }

  if (!optionIds.includes(raw.correctOptionId)) {
    throw new Error("correctOptionId must be a, b, c, or d");
  }

  const distractorExplanations = {};
  for (const option of options) {
    if (option.id === raw.correctOptionId) continue;
    const explanation = raw.distractorExplanations?.[option.id]?.trim();
    if (!explanation) {
      throw new Error(`Missing distractor explanation for ${option.id}`);
    }
    distractorExplanations[option.id] = explanation;
  }

  const difficulty = ["easy", "medium", "hard"].includes(raw.difficulty)
    ? raw.difficulty
    : "medium";

  const num = String(seq).padStart(3, "0");
  return {
    id: `${examSlug}-${topicId}-${num}`,
    examSlug,
    topicId,
    prompt: String(raw.prompt ?? "").trim(),
    ...(raw.formula?.trim() ? { formula: raw.formula.trim() } : {}),
    options,
    correctOptionId: raw.correctOptionId,
    explanation: String(raw.explanation ?? "").trim(),
    distractorExplanations,
    difficulty,
    sourceNote:
      "Authored by UniPrep2Go via OpenRouter (original readiness-check question).",
  };
}

function localValidateQuestion(question) {
  const errors = [];
  if (!question.prompt) errors.push("empty prompt");
  if (!question.explanation) errors.push("empty explanation");
  if (question.options.length !== 4) errors.push("options length");
  const positions = new Set(question.options.map((option) => question.correctOptionId));
  if (positions.size !== 1) errors.push("bad correctOptionId");
  return errors;
}

async function generateBatch({
  credentials,
  config,
  topic,
  count,
  existingPrompts,
  startSeq,
}) {
  const system = `You write original multiple-choice exam questions for UniPrep2Go readiness checks.
Return JSON: { "questions": [ ... ] }
Each question object:
- prompt (string, plain English stem — NO caret exponents, NO raw equations, NO unicode superscripts)
- formula (required when the stem includes equations, expressions, or symbolic rules; optional for pure word problems)
  Use LaTeX wrapped in $$...$$ (display math), same convention as CFA mocks. Examples:
  $$2^{x+3} = 8^{x-1}$$, $$3x + 2y = 16, \\quad x - y = 2$$, $$a_n = (n+1)^2$$
- options: exactly [{id:"a"|"b"|"c"|"d", text:string}] × 4, all unique and plausible
- correctOptionId: one of a,b,c,d
- explanation: why the keyed answer is correct (2-4 sentences)
- distractorExplanations: object with keys for each WRONG option id explaining the mistake
- difficulty: easy | medium | hard

Rules:
- Original content only; do not copy official exam items verbatim.
- Put ALL math notation in formula, not in prompt (CFA-style split).
- Never write 2^(x+3) or x² in prompt — use formula field with LaTeX instead.
- One clearly best answer; avoid "all of the above".
- Distractors must reflect realistic candidate errors.
- Vary which option is correct across the batch.
- Do not repeat or paraphrase these existing prompts: ${JSON.stringify(existingPrompts.slice(-12))}`;

  const user = `Exam: ${config.title}
Exam body: ${config.examBody}
Topic: ${topic.label} (id: ${topic.id})
Write ${count} distinct MCQs for this topic at readiness-check depth (not a full certification exam).
Context: ${config.officialSourceNote}
${config.questionSourceNote ? `Note: ${config.questionSourceNote}` : ""}`;

  const payload = await chatJson({
    credentials,
    model: GENERATOR_MODEL,
    system,
    user,
    temperature: 0.55,
    maxTokens: 6000,
    role: "generator",
  });

  if (!Array.isArray(payload.questions) || payload.questions.length === 0) {
    throw new Error("Generator returned no questions");
  }

  const normalized = [];
  let seq = startSeq;
  for (const raw of payload.questions.slice(0, count)) {
    const question = normalizeQuestion(raw, config.slug, topic.id, seq);
    const localErrors = localValidateQuestion(question);
    if (localErrors.length > 0) {
      throw new Error(`Local validation failed: ${localErrors.join(", ")}`);
    }
    normalized.push(question);
    seq += 1;
  }
  return normalized;
}

function syncCachesFromBank(config, bankQuestions, cacheDir) {
  mkdirSync(cacheDir, { recursive: true });
  for (const topic of config.topics) {
    const topicQuestions = bankQuestions.filter((question) => question.topicId === topic.id);
    const cachePath = join(cacheDir, `${topic.id}.json`);
    writeFileSync(
      cachePath,
      `${JSON.stringify(
        {
          questions: topicQuestions,
          prompts: topicQuestions.map((question) => question.prompt),
        },
        null,
        2,
      )}\n`,
    );
    console.log(`  synced ${topic.id} cache (${topicQuestions.length} questions)`);
  }
}

function applyValidationReport(bankPath, reportPath) {
  const questions = JSON.parse(readFileSync(bankPath, "utf8"));
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const rejectedIds = new Set(report.rejected.map((entry) => entry.id));
  return questions.filter((question) => !rejectedIds.has(question.id));
}

function seedTopicCacheFromBank({ bankQuestions, topicId, cachePath }) {
  const topicQuestions = bankQuestions.filter((question) => question.topicId === topicId);
  if (topicQuestions.length === 0) {
    return;
  }

  let cache = { questions: [], prompts: [] };
  if (existsSync(cachePath)) {
    cache = JSON.parse(readFileSync(cachePath, "utf8"));
  }

  if (cache.questions.length >= topicQuestions.length) {
    return;
  }

  cache.questions = topicQuestions;
  cache.prompts = topicQuestions.map((question) => question.prompt);
  mkdirSync(dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
  console.log(`  seeded ${topicId} cache from bank (${topicQuestions.length} questions)`);
}

function seedExamCachesFromBank(config, bankPath, cacheDir) {
  if (!existsSync(bankPath)) {
    return;
  }

  const bankQuestions = JSON.parse(readFileSync(bankPath, "utf8"));
  if (!Array.isArray(bankQuestions) || bankQuestions.length === 0) {
    return;
  }

  for (const topic of config.topics) {
    seedTopicCacheFromBank({
      bankQuestions,
      topicId: topic.id,
      cachePath: join(cacheDir, `${topic.id}.json`),
    });
  }
}

async function generateTopicPool({ credentials, config, topic, cachePath }) {
  let cache = { questions: [], prompts: [] };
  if (existsSync(cachePath)) {
    cache = JSON.parse(readFileSync(cachePath, "utf8"));
  }

  while (cache.questions.length < QUESTIONS_PER_TOPIC) {
    const remaining = QUESTIONS_PER_TOPIC - cache.questions.length;
    const batchCount = Math.min(BATCH_SIZE, remaining);
    let accepted = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
      try {
        const batch = await generateBatch({
          credentials,
          config,
          topic,
          count: batchCount,
          existingPrompts: cache.prompts,
          startSeq: cache.questions.length + 1,
        });

        if (batch.length > 0) {
          accepted = batch;
          break;
        }
      } catch (error) {
        console.warn(`  batch retry ${attempt + 1}/${MAX_RETRIES + 1}: ${error.message}`);
      }
    }

    if (!accepted?.length) {
      throw new Error(`Failed to generate questions for ${topic.id}`);
    }

    cache.questions.push(...accepted);
    cache.prompts.push(...accepted.map((question) => question.prompt));
    mkdirSync(dirname(cachePath), { recursive: true });
    writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
    console.log(
      `  ${topic.id}: ${cache.questions.length}/${QUESTIONS_PER_TOPIC} (${accepted.length} added)`,
    );
  }

  return cache.questions;
}

async function processExam(credentials, config, { force, repair }) {
  const bankPath = join(root, `src/data/mock-exams/${config.slug}.json`);
  const cacheDir = join(CACHE_DIR, config.slug);
  const reportPath = join(REPORT_DIR, `${config.slug}.json`);

  if (repair) {
    if (!existsSync(bankPath)) {
      throw new Error(`Missing bank file for repair: ${bankPath}`);
    }
    if (!existsSync(reportPath)) {
      throw new Error(`Missing validation report for repair: ${reportPath}`);
    }

    const filtered = applyValidationReport(bankPath, reportPath);
    writeFileSync(bankPath, `${JSON.stringify(filtered, null, 2)}\n`);
    console.log(
      `\n=== repair ${config.slug}: kept ${filtered.length} approved, syncing caches ===`,
    );
    syncCachesFromBank(config, filtered, cacheDir);
  } else if (!force && existsSync(bankPath)) {
    const existing = JSON.parse(readFileSync(bankPath, "utf8"));
    const minPerTopic = config.topics.every((topic) => {
      if (typeof topic.questionCount !== "number") return true;
      const count = existing.filter((question) => question.topicId === topic.id).length;
      return count >= QUESTIONS_PER_TOPIC;
    });
    if (existing.length > 0 && minPerTopic) {
      console.log(`skip ${config.slug} (bank already has ${existing.length} questions)`);
      return;
    }
  }

  console.log(`\n=== ${config.slug} (${GENERATOR_MODEL}) ===`);

  if (!repair) {
    seedExamCachesFromBank(config, bankPath, cacheDir);
  }

  const allQuestions = [];
  for (const topic of config.topics) {
    const cachePath = join(cacheDir, `${topic.id}.json`);
    const topicQuestions = await generateTopicPool({
      credentials,
      config,
      topic,
      cachePath,
    });
    allQuestions.push(...topicQuestions);
  }

  writeFileSync(bankPath, `${JSON.stringify(allQuestions, null, 2)}\n`);
  console.log(`wrote ${config.slug}: ${allQuestions.length} questions → ${bankPath}`);
}

async function main() {
  const args = parseArgs(process.argv);
  const credentials = loadCredentials();
  const { mockExamConfigs } = await import("../src/lib/mock-exams/configs.ts");

  let configs = mockExamConfigs.filter(
    (config) =>
      config.status === "preview" &&
      TARGET_SLUGS.has(config.slug) &&
      !SKIP_SLUGS.has(config.slug),
  );

  if (args.slug) {
    configs = configs.filter((config) => config.slug === args.slug);
    if (configs.length === 0) {
      throw new Error(`Unknown or unsupported slug: ${args.slug}`);
    }
  } else if (!args.all) {
    throw new Error("Pass --slug <slug> or --all");
  }

  if (args.repair && args.all) {
    throw new Error("--repair requires --slug (one exam at a time)");
  }

  if (args.dryRun) {
    for (const config of configs) {
      const topics = config.topics.length;
      console.log(
        `${config.slug}: ${topics} topics × ${QUESTIONS_PER_TOPIC} = ${topics * QUESTIONS_PER_TOPIC} bank / ${config.questionCount} session`,
      );
    }
    return;
  }

  console.log(
    `Generator: ${GENERATOR_MODEL} via OpenRouter, perTopic=${QUESTIONS_PER_TOPIC}, validation=off (run validate-mock-banks-openrouter.mjs separately)`,
  );

  for (const config of configs) {
    await processExam(credentials, config, { force: args.force, repair: args.repair });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
