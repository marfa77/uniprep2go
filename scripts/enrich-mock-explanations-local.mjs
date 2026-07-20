#!/usr/bin/env node
/**
 * Locally expand short mock-exam explanations without an LLM.
 * Builds 1–2 sentence distractor notes from the existing stub + option text + correct rule.
 *
 * Usage:
 *   node scripts/enrich-mock-explanations-local.mjs --featured
 *   node scripts/enrich-mock-explanations-local.mjs --slug sie-full-mock
 *   node scripts/enrich-mock-explanations-local.mjs --featured --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BANKS_DIR = join(root, "src/data/mock-exams");

const FEATURED_SLUGS = [
  "sie-full-mock",
  "cdl-general-knowledge-readiness-check",
  "nha-ccma-readiness-check",
  "nremt-emt-readiness-check",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "fl-real-estate-readiness-check",
  "aapc-cpc-readiness-check",
];

const EXPL_MIN = Number(process.env.MOCK_ENRICH_EXPL_MIN ?? 100);
const DIST_MIN = Number(process.env.MOCK_ENRICH_DIST_MIN ?? 90);

function parseArgs(argv) {
  const args = { slugs: [], featured: false, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--featured") args.featured = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--slug") args.slugs.push(argv[++i]);
  }
  return args;
}

function loadBank(slug) {
  const path = join(BANKS_DIR, `${slug}.json`);
  if (!existsSync(path)) throw new Error(`Missing bank: ${path}`);
  const data = JSON.parse(readFileSync(path, "utf8"));
  const questions = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(questions)) throw new Error(`No questions array in ${slug}`);
  return { path, root: data, questions, isArrayRoot: Array.isArray(data) };
}

function sentenceCase(text) {
  const trimmed = String(text ?? "").trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed[0].toUpperCase() + trimmed.slice(1);
}

function ensurePeriod(text) {
  const t = String(text ?? "").trim();
  if (!t) return "";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function clipOption(text, max = 72) {
  const t = String(text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function expandExplanation(explanation, correctText) {
  const base = ensurePeriod(explanation);
  if (base.length >= EXPL_MIN) return base;
  const cue = clipOption(correctText, 60);
  const addon = cue
    ? ` The correct choice (“${cue}”) is the one that matches this rule.`
    : " Focus on the controlling rule in the stem, not a look-alike detail.";
  return ensurePeriod(`${base.replace(/\.$/, "")}${addon}`);
}

function expandDistractor(existing, optionText) {
  const misconception = ensurePeriod(sentenceCase(existing)).replace(/\.$/, "");
  const option = clipOption(optionText, 80);

  if (!misconception && !option) {
    return "This option reflects a common mix-up and does not match the rule tested in the stem.";
  }

  if (!misconception) {
    return ensurePeriod(
      `“${option}” is a common trap on this item — it looks related but does not satisfy the controlling rule`,
    );
  }

  if (!option) {
    return ensurePeriod(
      `${misconception}. That misconception is why this distractor is incorrect for the question being tested`,
    );
  }

  return ensurePeriod(
    `${misconception}. Learners who choose “${option}” are usually making that exact mistake instead of applying the rule in the stem`,
  );
}

function enrichQuestion(question) {
  const next = {
    ...question,
    distractorExplanations: { ...(question.distractorExplanations ?? {}) },
  };
  let changed = false;

  const correctOption = (question.options ?? []).find((o) => o.id === question.correctOptionId);
  const explanation = String(question.explanation ?? "").trim();

  if (explanation.length < EXPL_MIN) {
    next.explanation = expandExplanation(explanation, correctOption?.text ?? "");
    changed = true;
  }

  for (const option of question.options ?? []) {
    if (option.id === question.correctOptionId) continue;
    const current = String(question.distractorExplanations?.[option.id] ?? "").trim();
    if (current.length >= DIST_MIN) continue;
    next.distractorExplanations[option.id] = expandDistractor(current, option.text);
    changed = true;
  }

  return { question: next, changed };
}

function enrichSlug(slug, dryRun) {
  const { path, root, questions, isArrayRoot } = loadBank(slug);
  let updated = 0;
  const nextQuestions = questions.map((question) => {
    const { question: enriched, changed } = enrichQuestion(question);
    if (changed) updated += 1;
    return enriched;
  });

  const sample = nextQuestions.find((_, i) => {
    const before = questions[i];
    return JSON.stringify(before.distractorExplanations) !== JSON.stringify(_.distractorExplanations)
      || before.explanation !== _.explanation;
  });

  console.log(`\n${slug}: updated ${updated}/${questions.length}`);
  if (sample) {
    const before = questions.find((q) => q.id === sample.id);
    const wrongId = Object.keys(sample.distractorExplanations).find(
      (id) => sample.distractorExplanations[id] !== before?.distractorExplanations?.[id],
    );
    if (wrongId) {
      console.log(`  before[${wrongId}]: ${before.distractorExplanations[wrongId]}`);
      console.log(`  after [${wrongId}]: ${sample.distractorExplanations[wrongId]}`);
      console.log(`  len ${before.distractorExplanations[wrongId]?.length} → ${sample.distractorExplanations[wrongId].length}`);
    }
  }

  if (!dryRun && updated) {
    const out = isArrayRoot ? nextQuestions : { ...root, questions: nextQuestions };
    writeFileSync(path, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  }

  return { slug, updated };
}

function main() {
  const args = parseArgs(process.argv);
  const slugs = args.featured
    ? FEATURED_SLUGS
    : args.slugs.length
      ? args.slugs
      : FEATURED_SLUGS;

  console.log(`Local enrich · explanation < ${EXPL_MIN}, distractor < ${DIST_MIN}`);
  if (args.dryRun) console.log("DRY RUN — no writes");

  const results = slugs.map((slug) => enrichSlug(slug, args.dryRun));
  console.log("\nDone:");
  for (const r of results) console.log(`  ${r.slug}: ${r.updated}`);
}

main();
