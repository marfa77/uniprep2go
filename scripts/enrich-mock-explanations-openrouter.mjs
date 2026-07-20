#!/usr/bin/env node
/**
 * Expand short correct-answer and distractor explanations in mock banks.
 *
 * Usage:
 *   node scripts/enrich-mock-explanations-openrouter.mjs --featured
 *   node scripts/enrich-mock-explanations-openrouter.mjs --slug sie-full-mock
 *   node scripts/enrich-mock-explanations-openrouter.mjs --featured --dry-run
 *
 * Env: OPENROUTER_API_KEY
 * Optional: MOCK_ENRICH_MODEL (default google/gemini-2.5-flash)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, loadCredentials, VALIDATOR_MODEL } from "./lib/openrouter.mjs";

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
const BATCH_SIZE = Number(process.env.MOCK_ENRICH_BATCH ?? 4);
const MODEL = process.env.MOCK_ENRICH_MODEL ?? VALIDATOR_MODEL;
const MAX_RETRIES = 2;

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

function bankPath(slug) {
  return join(BANKS_DIR, `${slug}.json`);
}

function loadBank(slug) {
  const path = bankPath(slug);
  if (!existsSync(path)) throw new Error(`Missing bank: ${path}`);
  const data = JSON.parse(readFileSync(path, "utf8"));
  const questions = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(questions)) throw new Error(`No questions array in ${slug}`);
  return { path, root: data, questions, isArrayRoot: Array.isArray(data) };
}

function needsEnrichment(question) {
  const explanationShort = String(question.explanation ?? "").trim().length < EXPL_MIN;
  const shortDistractors = [];
  for (const option of question.options ?? []) {
    if (option.id === question.correctOptionId) continue;
    const text = String(question.distractorExplanations?.[option.id] ?? "").trim();
    if (text.length < DIST_MIN) shortDistractors.push(option.id);
  }
  return { explanationShort, shortDistractors, needed: explanationShort || shortDistractors.length > 0 };
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

const SYSTEM = `You enrich exam practice-test feedback for UniPrep2Go.
Return JSON only: { "items": [ { "id": "...", "explanation": "...", "distractorExplanations": { "a": "...", ... } } ] }

Rules:
- Expand ONLY the fields listed per item. Keep ids and option letters unchanged.
- Correct explanation: 1–3 sentences (~100–220 chars), teach the rule with a concrete cue. No fluff.
- Distractor notes: 1–2 sentences (~90–180 chars) naming the misconception that leads to that wrong choice.
- Do not invent facts that contradict the stem or correct answer.
- Do not say "option A/B/C/D is wrong". Refer to the mistaken idea.
- English only. No markdown.`;

async function enrichBatch(credentials, batch) {
  const user = JSON.stringify(
    {
      task: "Expand short explanations",
      items: batch.map(({ question, needs }) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options,
        correctOptionId: question.correctOptionId,
        currentExplanation: question.explanation,
        currentDistractors: question.distractorExplanations,
        expandExplanation: needs.explanationShort,
        expandDistractorIds: needs.shortDistractors,
      })),
    },
    null,
    2,
  );

  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const data = await chatJson({
        credentials,
        model: MODEL,
        system: SYSTEM,
        user,
        maxTokens: Number(process.env.MOCK_ENRICH_MAX_TOKENS ?? 1800),
        temperature: 0.3,
        role: "enrich",
      });
      const items = Array.isArray(data?.items) ? data.items : [];
      if (!items.length) throw new Error("Empty items in enrich response");
      return items;
    } catch (error) {
      lastError = error;
      console.warn(`  retry ${attempt + 1}/${MAX_RETRIES}: ${error.message}`);
    }
  }
  throw lastError;
}

function applyEnrichment(question, item, needs) {
  const next = {
    ...question,
    distractorExplanations: { ...question.distractorExplanations },
  };

  if (needs.explanationShort && item.explanation?.trim()) {
    const expanded = item.explanation.trim();
    if (expanded.length >= String(question.explanation ?? "").trim().length) {
      next.explanation = expanded;
    }
  }

  for (const optionId of needs.shortDistractors) {
    const expanded = item.distractorExplanations?.[optionId]?.trim();
    if (!expanded) continue;
    const prev = String(question.distractorExplanations?.[optionId] ?? "").trim();
    if (expanded.length >= prev.length) {
      next.distractorExplanations[optionId] = expanded;
    }
  }

  return next;
}

async function enrichSlug(credentials, slug, dryRun) {
  const { path, root, questions, isArrayRoot } = loadBank(slug);
  const work = [];
  for (let i = 0; i < questions.length; i += 1) {
    const needs = needsEnrichment(questions[i]);
    if (needs.needed) work.push({ index: i, question: questions[i], needs });
  }

  console.log(`\n${slug}: ${work.length}/${questions.length} questions need enrichment`);
  if (!work.length) return { slug, updated: 0, skipped: questions.length };

  if (dryRun) {
    const sample = work[0];
    console.log("  dry-run sample id:", sample.question.id);
    console.log("  expl len:", String(sample.question.explanation).length, "expand?", sample.needs.explanationShort);
    console.log("  short distractors:", sample.needs.shortDistractors.join(", ") || "none");
    return { slug, updated: 0, skipped: questions.length, dryRun: work.length };
  }

  const updatedQuestions = questions.slice();
  let updated = 0;

  for (const batch of chunk(work, BATCH_SIZE)) {
    const ids = batch.map((b) => b.question.id).join(", ");
    process.stdout.write(`  batch ${ids.slice(0, 80)}… `);
    const items = await enrichBatch(credentials, batch);
    const byId = new Map(items.map((item) => [item.id, item]));

    for (const entry of batch) {
      const item = byId.get(entry.question.id);
      if (!item) {
        console.warn(`\n  missing enrichment for ${entry.question.id}`);
        continue;
      }
      updatedQuestions[entry.index] = applyEnrichment(entry.question, item, entry.needs);
      updated += 1;
    }
    console.log("ok");
  }

  const out = isArrayRoot ? updatedQuestions : { ...root, questions: updatedQuestions };
  writeFileSync(path, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  return { slug, updated, skipped: questions.length - updated };
}

async function main() {
  const args = parseArgs(process.argv);
  const slugs = args.featured
    ? FEATURED_SLUGS
    : args.slugs.length
      ? args.slugs
      : FEATURED_SLUGS;

  console.log(`Model: ${MODEL}`);
  console.log(`Thresholds: explanation < ${EXPL_MIN}, distractor < ${DIST_MIN}`);
  console.log(`Slugs (${slugs.length}): ${slugs.join(", ")}`);
  if (args.dryRun) console.log("DRY RUN — no writes");

  const credentials = args.dryRun ? null : loadCredentials();
  const results = [];
  for (const slug of slugs) {
    results.push(await enrichSlug(credentials, slug, args.dryRun));
  }

  console.log("\nDone:");
  for (const r of results) {
    console.log(
      `  ${r.slug}: updated=${r.updated}${r.dryRun != null ? ` dryNeed=${r.dryRun}` : ""}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
