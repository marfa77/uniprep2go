#!/usr/bin/env node
/**
 * Export rejected questions from a validation report for local repair.
 *
 * Usage:
 *   node scripts/extract-validation-rejects.mjs --slug epa-608-readiness-check
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = { slug: null, out: null };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) throw new Error("Pass --slug <mock-slug>");

  const reportPath = join(root, `src/data/mock-exams/.validation-reports/${args.slug}.json`);
  const bankPath = join(root, `src/data/mock-exams/${args.slug}.json`);
  if (!existsSync(reportPath)) throw new Error(`Missing report: ${reportPath}`);

  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const bank = JSON.parse(readFileSync(bankPath, "utf8"));
  const byId = new Map(bank.map((question) => [question.id, question]));

  const exportItems = report.rejected.map((entry) => {
    const question = byId.get(entry.id);
    return {
      id: entry.id,
      topicId: question?.topicId,
      validation: entry.result ?? { error: entry.error },
      question,
    };
  });

  const outPath =
    args.out ??
    join(root, `scripts/local-banks/${args.slug}-validation-rejects.json`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(exportItems, null, 2)}\n`);

  console.log(
    `${args.slug}: ${report.approved.length}/${report.total} approved, ${report.rejected.length} rejected → ${outPath}`,
  );
}

main();
