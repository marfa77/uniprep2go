#!/usr/bin/env node
/**
 * Expand short mock stems locally (no OpenRouter). Skips citizenship banks.
 *
 * Usage:
 *   node --import tsx scripts/expand-short-mock-stems-local.mjs
 *   node --import tsx scripts/expand-short-mock-stems-local.mjs --min 60
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(root, "src/data/mock-exams");

function parseArgs(argv) {
  const args = { min: 60 };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--min") args.min = Number(argv[++i]);
  }
  return args;
}

function expandStem(prompt, examLabel, min) {
  let p = prompt.trim().replace(/\s+/g, " ");
  if (p.length >= min) return p;

  // Drop noisy workplace tags
  p = p.replace(/\s*\(workplace scenario \d+\)\s*/gi, " ").trim();

  if (/^(what|why|when|where|who|which|can|how)\b/i.test(p)) {
    const body = p.endsWith("?") ? p : `${p}?`;
    return `On the ${examLabel}, ${body.charAt(0).toLowerCase()}${body.slice(1)} Select the best answer.`;
  }
  if (/:\s*$/.test(p)) {
    return `${p} which of the following is most accurate for the ${examLabel}?`;
  }
  if (p.endsWith("?")) {
    return `For the ${examLabel}, ${p.charAt(0).toLowerCase()}${p.slice(1)} Select the best answer.`;
  }
  return `For the ${examLabel}, which of the following best completes this item: ${p}?`;
}

function labelFor(config) {
  return config.shortTitle || config.title || config.slug;
}

async function main() {
  const args = parseArgs(process.argv);
  const { getAllMockExams } = await import(
    pathToFileURL(join(root, "src/lib/mock-exams/configs.ts")).href
  );
  const { isMockExamRunnable } = await import(
    pathToFileURL(join(root, "src/lib/mock-exams/question-bank.ts")).href
  );

  const targets = getAllMockExams().filter(
    (c) => c.status === "live" && c.verticalId !== "citizenship" && isMockExamRunnable(c.slug),
  );

  const summary = [];
  for (const config of targets) {
    const path = join(DIR, `${config.slug}.json`);
    if (!existsSync(path)) continue;
    const questions = JSON.parse(readFileSync(path, "utf8"));
    if (!Array.isArray(questions)) continue;

    let changed = 0;
    const label = labelFor(config);
    const next = questions.map((q) => {
      const before = q.prompt;
      const after = expandStem(before, label, args.min);
      if (after !== before) {
        changed += 1;
        return {
          ...q,
          prompt: after,
          sourceNote: q.sourceNote?.includes("Local short-stem")
            ? q.sourceNote
            : `${q.sourceNote ?? "Original bank"} · Local short-stem expansion`,
        };
      }
      return q;
    });

    if (changed > 0) {
      writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
    }
    summary.push({ slug: config.slug, changed, size: next.length });
    if (changed) console.log(`${config.slug}: expanded ${changed} stems`);
  }

  writeFileSync(
    join(root, "docs/mock-bank-qa/short-stem-expansion-summary.json"),
    `${JSON.stringify({ expandedAt: new Date().toISOString(), min: args.min, banks: summary }, null, 2)}\n`,
  );
  const total = summary.reduce((a, b) => a + b.changed, 0);
  console.log(`Expanded ${total} stems across ${summary.filter((b) => b.changed).length} banks`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
