#!/usr/bin/env node
/**
 * Rewrite OpenRouter-rejected mock questions in place (keep bank size / ids).
 *
 * Usage:
 *   node --import tsx scripts/rewrite-rejected-mock-questions.mjs --slug sie-full-mock
 *   node --import tsx scripts/rewrite-rejected-mock-questions.mjs --slug series-7-readiness-check --limit 10
 *
 * Reads: src/data/mock-exams/.validation-reports/<slug>.json
 * Writes: src/data/mock-exams/<slug>.json
 *
 * Env: OPENROUTER_API_KEY
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, GENERATOR_MODEL, loadCredentials } from "./lib/openrouter.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT_DIR = join(root, "src/data/mock-exams/.validation-reports");

function parseArgs(argv) {
  const args = { slug: null, limit: null, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--limit") args.limit = Number(argv[++i]);
  }
  if (!args.slug) throw new Error("Pass --slug <exam-slug>");
  return args;
}

function bankPath(slug) {
  return join(root, "src/data/mock-exams", `${slug}.json`);
}

function reportPath(slug) {
  return join(REPORT_DIR, `${slug}.json`);
}

async function rewriteQuestion(credentials, config, question, rejectMeta) {
  const issues = Array.isArray(rejectMeta?.result?.issues)
    ? rejectMeta.result.issues
    : rejectMeta?.error
      ? [rejectMeta.error]
      : ["failed independent validation"];

  const system = `You repair a single original MCQ for a UniPrep2Go readiness check.
Return JSON only for ONE question:
{
  "prompt": string (full exam-style stem, >= 60 characters, unambiguous),
  "formula": optional string,
  "options": [{"id":"a","text":"..."},{"id":"b","text":"..."},{"id":"c","text":"..."},{"id":"d","text":"..."}],
  "correctOptionId": "a"|"b"|"c"|"d",
  "explanation": string (2-4 sentences why correct),
  "distractorExplanations": { "a"|"b"|"c"|"d": string } for each WRONG option only,
  "difficulty": "easy"|"medium"|"hard"
}
Rules:
- Keep the same topic and tested concept when possible.
- Exactly one defensible answer.
- Distractors must be plausible near-misses (parallel form), not absurd.
- Original content; do not copy official exam items.
- Fix these reviewer issues: ${JSON.stringify(issues)}`;

  const user = `Exam: ${config.title}
Exam body: ${config.examBody}
Topic id: ${question.topicId}
Previous item (rewrite; do not keep factual errors):
STEM: ${question.prompt}
OPTIONS: ${question.options.map((o) => `(${o.id}) ${o.text}`).join(" | ")}
MARKED CORRECT: ${question.correctOptionId}
EXPLANATION: ${question.explanation}`;

  const raw = await chatJson({
    credentials,
    model: GENERATOR_MODEL,
    system,
    user,
    temperature: 0.4,
    maxTokens: 2500,
    role: "generator",
  });

  const optionIds = ["a", "b", "c", "d"];
  const options = optionIds.map((id) => {
    const match = raw.options?.find((option) => option.id === id);
    return { id, text: String(match?.text ?? "").trim() };
  });
  if (options.some((o) => !o.text) || new Set(options.map((o) => o.text)).size !== 4) {
    throw new Error("Rewritten question must have 4 unique options");
  }
  if (!optionIds.includes(raw.correctOptionId)) {
    throw new Error("Bad correctOptionId");
  }
  const distractorExplanations = {};
  for (const option of options) {
    if (option.id === raw.correctOptionId) continue;
    const text = String(raw.distractorExplanations?.[option.id] ?? "").trim();
    if (!text) throw new Error(`Missing distractor explanation for ${option.id}`);
    distractorExplanations[option.id] = text;
  }
  const prompt = String(raw.prompt ?? "").trim();
  if (prompt.length < 40) throw new Error("Stem still too short");

  return {
    ...question,
    prompt,
    ...(raw.formula?.trim() ? { formula: String(raw.formula).trim() } : {}),
    options,
    correctOptionId: raw.correctOptionId,
    explanation: String(raw.explanation ?? "").trim(),
    distractorExplanations,
    difficulty: ["easy", "medium", "hard"].includes(raw.difficulty) ? raw.difficulty : question.difficulty,
    sourceNote: "Rewritten by UniPrep2Go via OpenRouter after validation reject.",
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const credentials = loadCredentials();
  const { getMockExamConfig } = await import("../src/lib/mock-exams/configs.ts");
  const config = getMockExamConfig(args.slug);
  if (!config) throw new Error(`Unknown slug ${args.slug}`);

  const bPath = bankPath(args.slug);
  const rPath = reportPath(args.slug);
  if (!existsSync(bPath)) throw new Error(`Missing bank ${bPath}`);
  if (!existsSync(rPath)) throw new Error(`Missing report ${rPath} — run validate:mock-banks first`);

  const questions = JSON.parse(readFileSync(bPath, "utf8"));
  const report = JSON.parse(readFileSync(rPath, "utf8"));
  let rejected = report.rejected ?? [];
  if (args.limit) rejected = rejected.slice(0, args.limit);

  console.log(`Rewrite ${rejected.length} rejects for ${args.slug} via ${GENERATOR_MODEL}`);
  if (args.dryRun) {
    for (const entry of rejected) console.log(`  would rewrite ${entry.id}`);
    return;
  }

  const byId = new Map(questions.map((q) => [q.id, q]));
  let rewritten = 0;
  for (const entry of rejected) {
    const original = byId.get(entry.id);
    if (!original) {
      console.warn(`  skip missing ${entry.id}`);
      continue;
    }
    try {
      const next = await rewriteQuestion(credentials, config, original, entry);
      byId.set(entry.id, next);
      rewritten += 1;
      console.log(`  ok ${entry.id}`);
    } catch (error) {
      console.warn(`  fail ${entry.id}: ${error.message}`);
    }
  }

  const nextBank = questions.map((q) => byId.get(q.id) ?? q);
  writeFileSync(bPath, `${JSON.stringify(nextBank, null, 2)}\n`);
  console.log(`Wrote ${rewritten}/${rejected.length} rewrites → ${bPath} (size ${nextBank.length})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
