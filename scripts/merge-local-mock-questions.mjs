#!/usr/bin/env node
/**
 * Merge agent-authored question batches into mock bank JSON files (no OpenRouter).
 *
 * Usage:
 *   node scripts/merge-local-mock-questions.mjs --slug epa-608-readiness-check --batch scripts/local-banks/epa-608-gaps.json
 *   node scripts/merge-local-mock-questions.mjs --slug leed-ap-bd-c-readiness-check --assemble-cache
 *   node scripts/merge-local-mock-questions.mjs --slug leed-ap-bd-c-readiness-check --batch scripts/local-banks/foo.json --write
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = join(root, "src/data/mock-exams/.generation-cache");
const SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question).";

function parseArgs(argv) {
  const args = { slug: null, batch: null, assembleCache: false, write: true, targetPerTopic: 50 };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--batch") args.batch = argv[++i];
    else if (arg === "--assemble-cache") args.assembleCache = true;
    else if (arg === "--write") args.write = true;
    else if (arg === "--dry-run") args.write = false;
    else if (arg === "--target-per-topic") args.targetPerTopic = Number(argv[++i]);
  }
  return args;
}

function localValidate(question) {
  const errors = [];
  if (!question.prompt?.trim()) errors.push("empty prompt");
  if (!question.explanation?.trim()) errors.push("empty explanation");
  if (!Array.isArray(question.options) || question.options.length !== 4) errors.push("options");
  const ids = new Set(question.options?.map((o) => o.id));
  if (!ids.has(question.correctOptionId)) errors.push("correctOptionId");
  for (const option of question.options ?? []) {
    if (option.id !== question.correctOptionId && !question.distractorExplanations?.[option.id]) {
      errors.push(`distractor ${option.id}`);
    }
  }
  return errors;
}

function nextSeq(questions, examSlug, topicId) {
  const prefix = `${examSlug}-${topicId}-`;
  let max = 0;
  for (const question of questions) {
    if (question.topicId !== topicId || !question.id.startsWith(prefix)) continue;
    const seq = Number(question.id.slice(prefix.length));
    if (Number.isFinite(seq)) max = Math.max(max, seq);
  }
  return max + 1;
}

function normalizeBatchItem(raw, examSlug, topicId, seq) {
  const num = String(seq).padStart(3, "0");
  const question = {
    id: raw.id ?? `${examSlug}-${topicId}-${num}`,
    examSlug,
    topicId: raw.topicId ?? topicId,
    prompt: String(raw.prompt).trim(),
    options: raw.options.map((o) => ({ id: o.id, text: String(o.text).trim() })),
    correctOptionId: raw.correctOptionId,
    explanation: String(raw.explanation).trim(),
    distractorExplanations: raw.distractorExplanations,
    difficulty: raw.difficulty ?? "medium",
    sourceNote: raw.sourceNote ?? SOURCE_NOTE,
  };
  if (raw.formula?.trim()) question.formula = raw.formula.trim();
  const errors = localValidate(question);
  if (errors.length) throw new Error(`${question.id ?? topicId}: ${errors.join(", ")}`);
  return question;
}

function loadBank(bankPath) {
  if (!existsSync(bankPath)) return [];
  const bank = JSON.parse(readFileSync(bankPath, "utf8"));
  return Array.isArray(bank) ? bank : [];
}

function countByTopic(questions) {
  const counts = {};
  for (const question of questions) {
    counts[question.topicId] = (counts[question.topicId] ?? 0) + 1;
  }
  return counts;
}

function assembleFromCache(config, cacheDir) {
  const assembled = [];
  for (const topic of config.topics) {
    const cachePath = join(cacheDir, `${topic.id}.json`);
    if (!existsSync(cachePath)) {
      console.warn(`  missing cache: ${topic.id}`);
      continue;
    }
    const cache = JSON.parse(readFileSync(cachePath, "utf8"));
    assembled.push(...cache.questions);
    console.log(`  cache ${topic.id}: ${cache.questions.length} questions`);
  }
  return assembled;
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) throw new Error("Pass --slug <mock-slug>");

  const { mockExamConfigs } = await import("../src/lib/mock-exams/configs.ts");
  const config = mockExamConfigs.find((entry) => entry.slug === args.slug);
  if (!config) throw new Error(`Unknown slug: ${args.slug}`);

  const bankPath = join(root, `src/data/mock-exams/${args.slug}.json`);
  let questions = loadBank(bankPath);

  if (args.assembleCache) {
    const cacheDir = join(CACHE_DIR, args.slug);
    questions = assembleFromCache(config, cacheDir);
    console.log(`assembled ${questions.length} from cache`);
  }

  if (args.batch) {
    const batchPath = join(root, args.batch);
    const batch = JSON.parse(readFileSync(batchPath, "utf8"));
    if (!Array.isArray(batch)) throw new Error("Batch file must be a JSON array");

    let added = 0;
    for (const raw of batch) {
      const topicId = raw.topicId;
      if (!topicId) throw new Error("Each batch item needs topicId");
      const seq = nextSeq(questions, args.slug, topicId);
      const question = normalizeBatchItem(raw, args.slug, topicId, seq);
      if (questions.some((q) => q.id === question.id)) {
        throw new Error(`Duplicate id ${question.id}`);
      }
      questions.push(question);
      added += 1;
    }
    console.log(`merged batch: +${added} questions`);
  }

  const counts = countByTopic(questions);
  console.log("topic counts:", counts, "total:", questions.length);

  if (args.write) {
    mkdirSync(dirname(bankPath), { recursive: true });
    writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`wrote ${bankPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
