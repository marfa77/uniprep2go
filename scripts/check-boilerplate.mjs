#!/usr/bin/env node
/**
 * Flags sentences (>12 words) that appear on more than 5 deck money pages.
 * Allowlisted lines in scripts/boilerplate-allowlist.txt are excluded.
 *
 * Usage: node scripts/check-boilerplate.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const runner = `
import { catalogAvailableDecks } from "./src/lib/decks.ts";
import { collectDeckPageVisibleText } from "./src/lib/deck-faq.ts";

const decks = catalogAvailableDecks;
const texts = decks.map((d) => ({ slug: d.slug, text: collectDeckPageVisibleText(d) }));
console.log(JSON.stringify(texts));
`;

const proc = spawnSync("npx", ["tsx", "-e", runner], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});

if (proc.status !== 0) {
  console.error(proc.stderr || proc.stdout);
  process.exit(1);
}

const pageTexts = JSON.parse(proc.stdout.trim());
const allowlistPath = join(root, "scripts/boilerplate-allowlist.txt");
const allowlist = new Set(
  readFileSync(allowlistPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#")),
);

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function wordCount(sentence) {
  return sentence.split(/\s+/).filter(Boolean).length;
}

const sentenceToSlugs = new Map();

for (const { slug, text } of pageTexts) {
  const seenOnPage = new Set();
  for (const sentence of splitSentences(text)) {
    if (wordCount(sentence) <= 12) continue;
    if (allowlist.has(sentence)) continue;
    if (seenOnPage.has(sentence)) continue;
    seenOnPage.add(sentence);
    const slugs = sentenceToSlugs.get(sentence) ?? new Set();
    slugs.add(slug);
    sentenceToSlugs.set(sentence, slugs);
  }
}

const violations = [...sentenceToSlugs.entries()]
  .filter(([, slugs]) => slugs.size > 5)
  .sort((a, b) => b[1].size - a[1].size);

const totalSentences = [...sentenceToSlugs.values()].reduce((n, set) => n + set.size, 0);
const duplicateSentences = violations.length;

console.log(`Scanned ${pageTexts.length} deck pages.`);
console.log(`Tracked ${sentenceToSlugs.size} unique long sentences (${totalSentences} page occurrences).`);
console.log(`Cross-page duplicates (>5 pages): ${duplicateSentences}`);

if (violations.length > 0) {
  console.error("\nBoilerplate violations:\n");
  for (const [sentence, slugs] of violations.slice(0, 25)) {
    console.error(`[${slugs.size} pages] ${sentence.slice(0, 120)}${sentence.length > 120 ? "…" : ""}`);
    console.error(`  → ${[...slugs].slice(0, 8).join(", ")}${slugs.size > 8 ? "…" : ""}\n`);
  }
  process.exit(1);
}

console.log("check-boilerplate: OK");
