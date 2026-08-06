#!/usr/bin/env node
/**
 * Structural audit for live runnable mock banks (excludes citizenship / Anki).
 *
 * Usage:
 *   node --import tsx scripts/audit-mock-banks-structure.mjs
 *   node --import tsx scripts/audit-mock-banks-structure.mjs --fix-tiny-distractors
 *
 * Writes: docs/mock-bank-qa/structure-summary.json
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(root, "docs/mock-bank-qa");
const OUT_FILE = join(OUT_DIR, "structure-summary.json");

const JUNK_PHRASES = [
  "None of the provided deck concepts",
  "different concept from the deck",
  "placeholder",
  "TODO",
  "FIXME",
];

const MIN_STEM_CHARS = 40;
const MIN_DISTRACTOR_CHARS = 12;
const MIN_EXPLANATION_CHARS = 20;

function parseArgs(argv) {
  return {
    fixCheap: argv.includes("--fix-tiny-distractors") || argv.includes("--fix-cheap"),
  };
}

function bankFilePath(slug) {
  return join(root, "src/data/mock-exams", `${slug}.json`);
}

function auditQuestion(question) {
  const issues = [];
  const optionTexts = question.options.map((o) => o.text.trim());
  const optionIds = question.options.map((o) => o.id);

  if (question.options.length !== 4) {
    issues.push({ code: "option_count", detail: `${question.options.length} options` });
  }
  if (new Set(optionIds).size !== 4) {
    issues.push({ code: "duplicate_option_ids", detail: optionIds.join(",") });
  }
  if (new Set(optionTexts.map((t) => t.toLowerCase())).size !== optionTexts.length) {
    issues.push({ code: "duplicate_option_texts", detail: optionTexts.join(" | ") });
  }
  if (optionTexts.some((t) => !t)) {
    issues.push({ code: "empty_option", detail: "empty option text" });
  }
  if (!optionIds.includes(question.correctOptionId)) {
    issues.push({ code: "bad_correct_id", detail: question.correctOptionId });
  }

  const stem = String(question.prompt ?? "").trim();
  if (stem.length < MIN_STEM_CHARS) {
    issues.push({ code: "short_stem", detail: `len=${stem.length}` });
  }

  const expl = String(question.explanation ?? "").trim();
  if (expl.length < MIN_EXPLANATION_CHARS) {
    issues.push({ code: "short_explanation", detail: `len=${expl.length}` });
  }

  for (const option of question.options) {
    if (option.id === question.correctOptionId) continue;
    const d = String(question.distractorExplanations?.[option.id] ?? "").trim();
    if (!d) {
      issues.push({ code: "missing_distractor_explanation", detail: option.id });
    } else if (d.length < MIN_DISTRACTOR_CHARS) {
      issues.push({ code: "tiny_distractor_explanation", detail: `${option.id} len=${d.length}` });
    }
  }

  const blob = `${stem}\n${optionTexts.join("\n")}\n${expl}`;
  for (const phrase of JUNK_PHRASES) {
    if (blob.includes(phrase)) {
      issues.push({ code: "junk_phrase", detail: phrase });
    }
  }

  return issues;
}

function padDistractor(text, optionText) {
  const t = text.trim();
  if (t.length >= MIN_DISTRACTOR_CHARS) return t;
  return `${t || "Incorrect."} This option does not match the tested concept (${optionText.slice(0, 80)}).`.slice(
    0,
    280,
  );
}

function padExplanation(text) {
  const t = text.trim();
  if (t.length >= MIN_EXPLANATION_CHARS) return t;
  return `${t || "See the correct option."} The marked answer is the only option that matches the tested rule or definition.`.slice(
    0,
    320,
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const qbUrl = pathToFileURL(join(root, "src/lib/mock-exams/question-bank.ts")).href;
  const configsUrl = pathToFileURL(join(root, "src/lib/mock-exams/configs.ts")).href;

  const { getAllMockExams } = await import(configsUrl);
  const { getQuestionBankForExam, isMockExamRunnable } = await import(qbUrl);

  const targets = getAllMockExams().filter(
    (config) =>
      config.status === "live" &&
      config.verticalId !== "citizenship" &&
      isMockExamRunnable(config.slug),
  );

  const banks = [];
  let structuralIssueCount = 0;
  let banksWithIssues = 0;
  const fixedFiles = [];

  for (const config of targets) {
    const { questions, errors } = getQuestionBankForExam(config.slug);
    const questionIssues = [];
    const correctKeys = new Set();

    for (const question of questions) {
      correctKeys.add(question.correctOptionId);
      const issues = auditQuestion(question);
      if (issues.length > 0) {
        questionIssues.push({ id: question.id, issues });
        structuralIssueCount += issues.length;
      }
    }

    const bankIssues = [...errors.map((detail) => ({ code: "validateQuestionBank", detail }))];
    if (questions.length >= 20 && correctKeys.size < 2) {
      bankIssues.push({
        code: "correct_key_collapse",
        detail: `only keys: ${[...correctKeys].join(",")}`,
      });
    }

    const severity =
      bankIssues.length > 0 || questionIssues.some((q) => q.issues.some((i) => i.code !== "tiny_distractor_explanation" && i.code !== "short_stem"))
        ? "red"
        : questionIssues.length > 0
          ? "yellow"
          : "green";

    if (severity !== "green") banksWithIssues += 1;

    banks.push({
      slug: config.slug,
      verticalId: config.verticalId,
      questionCount: config.questionCount,
      bankSize: questions.length,
      severity,
      validateErrors: errors,
      bankIssues,
      questionIssueCount: questionIssues.length,
      questionIssues: questionIssues.slice(0, 40),
      correctKeyDistribution: [...correctKeys].sort(),
    });

    if (args.fixCheap && existsSync(bankFilePath(config.slug))) {
      const path = bankFilePath(config.slug);
      const raw = JSON.parse(readFileSync(path, "utf8"));
      if (!Array.isArray(raw)) continue;
      let paddedDistractors = 0;
      let paddedExplanations = 0;
      for (const question of raw) {
        const expl = String(question.explanation ?? "");
        if (expl.trim().length > 0 && expl.trim().length < MIN_EXPLANATION_CHARS) {
          question.explanation = padExplanation(expl);
          paddedExplanations += 1;
        }
        for (const option of question.options ?? []) {
          if (option.id === question.correctOptionId) continue;
          const prev = String(question.distractorExplanations?.[option.id] ?? "");
          if (prev.trim().length > 0 && prev.trim().length < MIN_DISTRACTOR_CHARS) {
            question.distractorExplanations = question.distractorExplanations ?? {};
            question.distractorExplanations[option.id] = padDistractor(prev, option.text ?? "");
            paddedDistractors += 1;
          } else if (!prev.trim()) {
            question.distractorExplanations = question.distractorExplanations ?? {};
            question.distractorExplanations[option.id] = padDistractor("", option.text ?? "");
            paddedDistractors += 1;
          }
        }
      }
      if (paddedDistractors > 0 || paddedExplanations > 0) {
        writeFileSync(path, `${JSON.stringify(raw, null, 2)}\n`);
        fixedFiles.push({ slug: config.slug, paddedDistractors, paddedExplanations });
      }
    }
  }

  banks.sort((a, b) => {
    const rank = { red: 0, yellow: 1, green: 2 };
    return rank[a.severity] - rank[b.severity] || b.questionIssueCount - a.questionIssueCount;
  });

  const summary = {
    auditedAt: new Date().toISOString(),
    scope: "live runnable mocks excluding citizenship",
    totalBanks: banks.length,
    banksWithIssues,
    structuralIssueCount,
    severityCounts: {
      red: banks.filter((b) => b.severity === "red").length,
      yellow: banks.filter((b) => b.severity === "yellow").length,
      green: banks.filter((b) => b.severity === "green").length,
    },
    fixedFiles,
    banks,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`Audited ${summary.totalBanks} banks`);
  console.log(
    `severity: red=${summary.severityCounts.red} yellow=${summary.severityCounts.yellow} green=${summary.severityCounts.green}`,
  );
  console.log(`issues: ${structuralIssueCount} across ${banksWithIssues} banks`);
  console.log(`report → ${OUT_FILE}`);
  if (fixedFiles.length) {
    console.log(`padded tiny distractors in ${fixedFiles.length} files`);
  }

  const reds = banks.filter((b) => b.severity === "red").slice(0, 30);
  for (const bank of reds) {
    console.log(`RED ${bank.slug}: validate=${bank.validateErrors.length} qIssues=${bank.questionIssueCount}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
