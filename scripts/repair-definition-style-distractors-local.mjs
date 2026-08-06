#!/usr/bin/env node
/**
 * Second-pass local repair: for "which statement describes X" style items,
 * replace foreign-concept distractors with wrong statements about X.
 *
 * Usage:
 *   node scripts/repair-definition-style-distractors-local.mjs
 *   node scripts/repair-definition-style-distractors-local.mjs --slug sie-full-mock
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(root, "src/data/mock-exams");

const DEFAULT_SLUGS = [
  "sie-full-mock",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "california-real-estate-readiness-check",
  "life-and-health-insurance-readiness-check",
  "property-casualty-insurance-readiness-check",
];

function parseArgs(argv) {
  const args = { slug: null, allLive: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--all-live") args.allLive = true;
  }
  return args;
}

function extractConcept(prompt) {
  const patterns = [
    /describes\s+(.+?)\s+as tested/i,
    /describes\s+(.+?)\s*\?/i,
    /best describes\s+(.+?)\s*\?/i,
    /what does\s+(.+?)\s+do\?/i,
    /what does\s+(.+?)\s*\?/i,
    /what is\s+(.+?)\s*\?/i,
    /why (?:do|does|are|is)\s+(.+?)\s*\?/i,
  ];
  for (const re of patterns) {
    const m = prompt.match(re);
    if (m?.[1]) return m[1].replace(/\s+/g, " ").trim().replace(/\.$/, "");
  }
  return null;
}

function shorten(text, max = 120) {
  const t = String(text ?? "")
    .trim()
    .replace(/\s+/g, " ")
    // protect common abbreviations so we do not cut at "U.S."
    .replace(/\bU\.S\./g, "US")
    .replace(/\bU\.K\./g, "UK")
    .replace(/\be\.g\./gi, "eg")
    .replace(/\bi\.e\./gi, "ie");
  const first = t.split(/(?<=\.)\s+/)[0] || t;
  if (first.length <= max) return first.replace(/\.$/, "");
  return `${first.slice(0, max - 1).trim()}…`;
}

function isDefinitionStyle(prompt) {
  return /which statement correctly describes|which of the following best (?:describes|defines)|what does .+ do\?/i.test(
    prompt,
  );
}

function wrongStatements(concept, correctShort) {
  const c = concept || "this concept";
  const base = [
    `${c} has no application in US securities, insurance, or licensing markets`,
    `${c} is identical to FDIC deposit insurance for every customer account`,
    `${c} only regulates agricultural commodity warehouses and never securities or insurance`,
  ];
  let mutated = correctShort
    .replace(/\ballows\b/gi, "prohibits")
    .replace(/\brequires\b/gi, "forbids")
    .replace(/\bmust\b/gi, "must never")
    .replace(/\bis the\b/gi, "is never the")
    .replace(/\bprovides\b/gi, "never provides");
  if (mutated.toLowerCase() === correctShort.toLowerCase()) {
    mutated = `${c} always eliminates all investment, legal, and regulatory risk for every customer`;
  }
  return [shorten(mutated, 140), ...base.map((s) => shorten(s, 140))];
}

function repairQuestion(question) {
  if (!isDefinitionStyle(question.prompt) && question.prompt.length >= 70) {
    // Still repair if options look like foreign long definitions
    const avgWrong =
      question.options
        .filter((o) => o.id !== question.correctOptionId)
        .reduce((a, o) => a + o.text.length, 0) / 3;
    if (avgWrong < 90) return null;
  }

  const concept = extractConcept(question.prompt);
  const correct = question.options.find((o) => o.id === question.correctOptionId);
  if (!correct) return null;

  const correctShort = shorten(correct.text, 140);
  const wrongs = wrongStatements(concept, correctShort);
  const ids = ["a", "b", "c", "d"];
  const wrongIds = ids.filter((id) => id !== question.correctOptionId);
  const options = ids.map((id) => {
    if (id === question.correctOptionId) return { id, text: correctShort };
    return { id, text: wrongs[wrongIds.indexOf(id)] };
  });

  // Ensure unique
  const texts = options.map((o) => o.text.toLowerCase());
  if (new Set(texts).size !== 4) return null;

  const distractorExplanations = {};
  for (const id of wrongIds) {
    distractorExplanations[id] =
      `This statement is false about ${concept ?? "the tested concept"} and does not match the correct definition.`;
  }

  let prompt = question.prompt.trim();
  if (concept && isDefinitionStyle(prompt) && prompt.length < 90) {
    prompt = `Which of the following best describes ${concept} as tested on this exam?`;
  }

  const priorNote = String(question.sourceNote ?? "").trim();
  const repairTag = "Local definition-style distractor repair (no OpenRouter)";
  return {
    ...question,
    prompt,
    options,
    explanation:
      question.explanation.trim().length >= 40
        ? question.explanation
        : `${correctShort}. The other choices are incorrect statements about ${concept ?? "the concept"}.`,
    distractorExplanations,
    sourceNote: priorNote.includes(repairTag)
      ? priorNote
      : priorNote
        ? `${priorNote} · ${repairTag}`
        : repairTag,
  };
}

async function resolveSlugs(args) {
  if (args.slug) return [args.slug];
  if (!args.allLive) return DEFAULT_SLUGS;

  const { getAllMockExams } = await import(
    pathToFileURL(join(root, "src/lib/mock-exams/configs.ts")).href
  );
  const { isMockExamRunnable } = await import(
    pathToFileURL(join(root, "src/lib/mock-exams/question-bank.ts")).href
  );
  return getAllMockExams()
    .filter((c) => c.status === "live" && c.verticalId !== "citizenship" && isMockExamRunnable(c.slug))
    .map((c) => c.slug)
    .filter((slug) => existsSync(join(DIR, `${slug}.json`)));
}

async function main() {
  const args = parseArgs(process.argv);
  const slugs = await resolveSlugs(args);
  const summary = [];

  for (const slug of slugs) {
    const path = join(DIR, `${slug}.json`);
    if (!existsSync(path)) {
      console.log(`skip ${slug} (no json)`);
      continue;
    }
    const questions = JSON.parse(readFileSync(path, "utf8"));
    let changed = 0;
    const next = questions.map((q) => {
      const repaired = repairQuestion(q);
      if (!repaired) return q;
      changed += 1;
      return repaired;
    });
    if (changed > 0) writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
    summary.push({ slug, changed, size: next.length });
    if (changed) console.log(`${slug}: definition-style repaired ${changed}/${next.length}`);
  }

  writeFileSync(
    join(root, "docs/mock-bank-qa/definition-style-repair-summary.json"),
    `${JSON.stringify({ repairedAt: new Date().toISOString(), banks: summary }, null, 2)}\n`,
  );
  console.log(
    `Done: ${summary.filter((b) => b.changed).length} banks touched, ${summary.reduce((a, b) => a + b.changed, 0)} questions`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
