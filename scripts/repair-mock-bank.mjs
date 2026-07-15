#!/usr/bin/env node
/**
 * Normalize mock banks (dedupe IDs, renumber overflow) and apply replacement batches by id.
 *
 * Usage:
 *   node scripts/repair-mock-bank.mjs --slug epa-608-readiness-check --normalize
 *   node scripts/repair-mock-bank.mjs --slug epa-608-readiness-check --replacements scripts/local-banks/epa-608-repairs.json
 *   node scripts/repair-mock-bank.mjs --slug epa-608-readiness-check --normalize --replacements scripts/local-banks/epa-608-repairs.json
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question).";

function parseArgs(argv) {
  const args = { slug: null, normalize: false, replacements: null, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--normalize") args.normalize = true;
    else if (arg === "--replacements") args.replacements = argv[++i];
    else if (arg === "--dry-run") args.dryRun = true;
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

function normalizeQuestion(raw, examSlug) {
  const question = {
    id: raw.id,
    examSlug,
    topicId: raw.topicId,
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
  if (errors.length) throw new Error(`${question.id}: ${errors.join(", ")}`);
  return question;
}

function topicPrefix(examSlug, topicId) {
  return `${examSlug}-${topicId}-`;
}

function seqFromId(id, prefix) {
  const seq = Number(id.slice(prefix.length));
  return Number.isFinite(seq) ? seq : null;
}

function idForSeq(examSlug, topicId, seq) {
  return `${topicPrefix(examSlug, topicId)}${String(seq).padStart(3, "0")}`;
}

function dedupeById(questions) {
  const seen = new Set();
  const kept = [];
  let removed = 0;
  for (const question of questions) {
    if (seen.has(question.id)) {
      removed += 1;
      continue;
    }
    seen.add(question.id);
    kept.push(question);
  }
  return { questions: kept, removed };
}

function normalizeTopicIds(questions, examSlug, topicId) {
  const prefix = topicPrefix(examSlug, topicId);
  const topicQuestions = questions.filter((q) => q.topicId === topicId);
  const others = questions.filter((q) => q.topicId !== topicId);

  const bySeq = new Map();
  for (const question of topicQuestions) {
    const seq = seqFromId(question.id, prefix);
    if (seq == null) continue;
    if (!bySeq.has(seq)) bySeq.set(seq, question);
  }

  const overflow = [...bySeq.entries()]
    .filter(([seq]) => seq > 50)
    .sort(([a], [b]) => a - b)
    .map(([, question]) => question);

  for (const seq of [...bySeq.keys()].filter((n) => n > 50)) {
    bySeq.delete(seq);
  }

  const missing = [];
  for (let seq = 1; seq <= 50; seq += 1) {
    if (!bySeq.has(seq)) missing.push(seq);
  }

  let renumbered = 0;
  for (const question of overflow) {
    const targetSeq = missing.shift();
    if (targetSeq == null) break;
    const nextId = idForSeq(examSlug, topicId, targetSeq);
    bySeq.set(targetSeq, { ...question, id: nextId });
    renumbered += 1;
  }

  const normalized = [...bySeq.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, question]) => question);

  return {
    questions: [...others, ...normalized],
    missing: missing.sort((a, b) => a - b),
    renumbered,
  };
}

function normalizeBank(questions, examSlug, topicIds) {
  let current = questions;
  const report = { deduped: 0, renumbered: 0, gapsByTopic: {} };

  const deduped = dedupeById(current);
  current = deduped.questions;
  report.deduped = deduped.removed;

  for (const topicId of topicIds) {
    const result = normalizeTopicIds(current, examSlug, topicId);
    current = result.questions;
    report.renumbered += result.renumbered;
    if (result.missing.length > 0) {
      report.gapsByTopic[topicId] = result.missing;
    }
  }

  return { questions: current, report };
}

function applyReplacements(questions, batch, examSlug) {
  const byId = new Map(questions.map((q) => [q.id, q]));
  let replaced = 0;
  let inserted = 0;

  for (const raw of batch) {
    if (!raw.id) throw new Error("Replacement items require id");
    const question = normalizeQuestion({ ...raw, topicId: raw.topicId ?? raw.id.split("-").slice(-2, -1)[0] }, examSlug);
    if (byId.has(question.id)) {
      byId.set(question.id, question);
      replaced += 1;
    } else {
      byId.set(question.id, question);
      inserted += 1;
    }
  }

  return { questions: [...byId.values()], replaced, inserted };
}

function countByTopic(questions) {
  const counts = {};
  for (const question of questions) {
    counts[question.topicId] = (counts[question.topicId] ?? 0) + 1;
  }
  return counts;
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) throw new Error("Pass --slug <mock-slug>");

  const { mockExamConfigs } = await import("../src/lib/mock-exams/configs.ts");
  const config = mockExamConfigs.find((entry) => entry.slug === args.slug);
  if (!config) throw new Error(`Unknown slug: ${args.slug}`);

  const bankPath = join(root, `src/data/mock-exams/${args.slug}.json`);
  if (!existsSync(bankPath)) throw new Error(`Missing bank: ${bankPath}`);

  let questions = JSON.parse(readFileSync(bankPath, "utf8"));
  if (!Array.isArray(questions)) throw new Error("Bank must be a JSON array");

  if (args.normalize) {
    const { questions: normalized, report } = normalizeBank(
      questions,
      args.slug,
      config.topics.map((topic) => topic.id),
    );
    questions = normalized;
    console.log("normalize:", report);
  }

  if (args.replacements) {
    const batchPath = join(root, args.replacements);
    const batch = JSON.parse(readFileSync(batchPath, "utf8"));
    if (!Array.isArray(batch)) throw new Error("Replacements file must be a JSON array");
    const { questions: updated, replaced, inserted } = applyReplacements(questions, batch, args.slug);
    questions = updated;
    console.log(`replacements: ${replaced} replaced, ${inserted} inserted`);
  }

  const ids = new Set();
  const dupes = [];
  for (const question of questions) {
    if (ids.has(question.id)) dupes.push(question.id);
    ids.add(question.id);
  }

  console.log("topic counts:", countByTopic(questions), "total:", questions.length);
  if (dupes.length) {
    throw new Error(`Duplicate ids remain: ${[...new Set(dupes)].join(", ")}`);
  }

  if (!args.dryRun) {
    writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`wrote ${bankPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
