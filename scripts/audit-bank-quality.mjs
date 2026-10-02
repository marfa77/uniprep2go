#!/usr/bin/env node
/**
 * Market-best bank quality gates (see .cursor/rules/mock-bank-audit-standard.mdc).
 * Reads the git export src/data/mock-exams/{slug}.json (export ops first if ops is newer).
 *
 * Usage:
 *   node scripts/audit-bank-quality.mjs --slug sie-full-mock [--slug ...] [--json]
 *
 * Exit 1 when any FAIL gate trips. WARN gates need reviewer judgment, not auto-fixes.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const slugs = argv.flatMap((arg, i) => (arg === "--slug" && argv[i + 1] ? [argv[i + 1]] : []));
const asJson = argv.includes("--json");
// --file <path> audits another export of the bank (e.g. /tmp/enrich/{slug}.json before it is applied to ops).
const fileArg = argv[argv.indexOf("--file") + 1];
const overridePath = argv.includes("--file") && fileArg ? fileArg : null;

if (!slugs.length) {
  console.error("Usage: node scripts/audit-bank-quality.mjs --slug <mockSlug> [--slug ...] [--json]");
  process.exit(2);
}

const TEMPLATE_NOTE_RE =
  /matches this rule|does not match the (correct )?(definition|rule)|is (not|in)correct (here|for this item)\.?$|this option is (wrong|incorrect)\.?$|not the best answer( here)?\b|the right answer is\b|answer to a different question|remapped from sibling|fdic deposit insurance|this concept (is identical|has no application|always eliminates)/i;
const WRAPPER_STEM_RE = /^on the .{0,80}\bmock\b|select the best answer\.?$/i;
const BORROW_MIN_CHARS = 25;
const ABSOLUTE_RE = /\b(always|never|only|guaranteed|all|none|must always|under no circumstances)\b/i;
const DEFINITION_RE = /^(what is|what are|who is|define)\b/i;

const clean = (text) => String(text ?? "").replace(/\s+/g, " ").trim();
const norm = (text) => clean(text).toLowerCase().replace(/[^a-z0-9 ]+/g, "");
const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);

function words(text) {
  return new Set(norm(text).split(" ").filter((w) => w.length >= 4));
}

const SHORT_STEM_WORDS = 4;

function similarity(a, b) {
  let A = words(a);
  let B = words(b);
  // Short equation stems ("If 4x - 7 = 21, what is the value of x?") differ only in their math tokens.
  if (A.size <= SHORT_STEM_WORDS && B.size <= SHORT_STEM_WORDS) {
    const math = (text) =>
      norm(String(text ?? "").replace(/\b(?:drill|item|variant|version|card|question|set)\s*\d+\b/gi, " "))
        .split(" ")
        .filter((w) => /\d/.test(w));
    A = new Set([...A, ...math(a)]);
    B = new Set([...B, ...math(b)]);
  }
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared += 1;
  return shared / (A.size + B.size - shared);
}

function audit(slug) {
  const path = overridePath ?? join(root, "src/data/mock-exams", `${slug}.json`);
  if (!existsSync(path)) return { slug, error: `missing ${path}` };
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const items = Array.isArray(raw) ? raw : raw.questions ?? [];
  const n = items.length;

  const keys = {};
  const topics = {};
  const ids = { longestCorrect: [], uniqueLongestBy40: [], templateNotes: [], missingNotes: [], thinExplanation: [],
    dupOptions: [], aboveOptions: [], absoluteGiveaway: [], definition: [], negationStem: [], badKey: [],
    wrapperStem: [], borrowed: [] };
  const correctByText = new Map();
  for (const q of items) {
    const text = norm((q.options ?? []).find((o) => o.id === q.correctOptionId)?.text);
    if (text.length >= BORROW_MIN_CHARS && !correctByText.has(text)) correctByText.set(text, q.id);
  }
  const prompts = new Map();
  const dupPrompts = [];
  const nearDup = [];

  for (const q of items) {
    const options = (q.options ?? []).map((o) => ({ id: o.id, text: clean(o.text) }));
    const correct = options.find((o) => o.id === q.correctOptionId);
    keys[q.correctOptionId] = (keys[q.correctOptionId] ?? 0) + 1;
    topics[q.topicId ?? "?"] = (topics[q.topicId ?? "?"] ?? 0) + 1;
    if (!correct) {
      ids.badKey.push(q.id);
      continue;
    }

    const key = norm(q.prompt);
    if (prompts.has(key)) dupPrompts.push(`${prompts.get(key)}=${q.id}`);
    else prompts.set(key, q.id);

    const lengths = options.map((o) => o.text.length);
    const longest = Math.max(...lengths);
    const others = options.filter((o) => o.id !== correct.id).map((o) => o.text.length);
    if (correct.text.length === longest) ids.longestCorrect.push(q.id);
    if (correct.text.length > Math.max(...others) * 1.4) ids.uniqueLongestBy40.push(q.id);

    const notes = q.distractorExplanations ?? {};
    for (const o of options) {
      if (o.id === correct.id) continue;
      const note = clean(notes[o.id]);
      if (!note) ids.missingNotes.push(`${q.id}:${o.id}`);
      else if (TEMPLATE_NOTE_RE.test(note) || note.length < 25) ids.templateNotes.push(`${q.id}:${o.id}`);
    }
    if (clean(q.explanation).length < 60 || TEMPLATE_NOTE_RE.test(clean(q.explanation))) ids.thinExplanation.push(q.id);
    if (new Set(options.map((o) => o.text.toLowerCase())).size !== options.length) ids.dupOptions.push(q.id);
    if (options.some((o) => /\b(all|none|both) of the above\b/i.test(o.text))) ids.aboveOptions.push(q.id);

    const absDistractors = options.filter((o) => o.id !== correct.id && ABSOLUTE_RE.test(o.text)).length;
    if (absDistractors >= 2 && !ABSOLUTE_RE.test(correct.text)) ids.absoluteGiveaway.push(q.id);
    if (DEFINITION_RE.test(clean(q.prompt)) && clean(q.prompt).length < 70) ids.definition.push(q.id);
    if (/\b(NOT|EXCEPT)\b/.test(q.prompt)) ids.negationStem.push(q.id);
    if (WRAPPER_STEM_RE.test(clean(q.prompt))) ids.wrapperStem.push(q.id);
    const borrowedFrom = options
      .filter((o) => o.id !== correct.id)
      .map((o) => correctByText.get(norm(o.text)))
      .find((source) => source && source !== q.id);
    if (borrowedFrom) ids.borrowed.push(`${q.id}<${borrowedFrom}`);
  }

  const promptList = [...prompts.entries()];
  for (let i = 0; i < promptList.length; i++) {
    for (let j = i + 1; j < promptList.length; j++) {
      if (similarity(promptList[i][0], promptList[j][0]) >= 0.8) nearDup.push(`${promptList[i][1]}~${promptList[j][1]}`);
    }
  }

  const keyShares = Object.values(keys).map((c) => c / Math.max(n, 1));
  const thinTopics = Object.entries(topics).filter(([, c]) => c < 3).map(([t]) => t);

  const gates = [
    ["FAIL", "answer key valid", ids.badKey.length === 0, ids.badKey],
    ["FAIL", "duplicate prompts = 0", dupPrompts.length === 0, dupPrompts],
    ["FAIL", "near-duplicate / templated stems (>=0.8) = 0", nearDup.length === 0, nearDup],
    ["FAIL", "duplicate options in an item = 0", ids.dupOptions.length === 0, ids.dupOptions],
    ["FAIL", "all/none/both of the above = 0", ids.aboveOptions.length === 0, ids.aboveOptions],
    ["FAIL", "missing distractor notes = 0", ids.missingNotes.length === 0, ids.missingNotes],
    ["FAIL", "template/thin distractor notes = 0", ids.templateNotes.length === 0, ids.templateNotes],
    ["FAIL", "thin/template explanations = 0", ids.thinExplanation.length === 0, ids.thinExplanation],
    ["FAIL", "boilerplate stem wrappers = 0", ids.wrapperStem.length === 0, ids.wrapperStem],
    ["FAIL", "distractor = another item's correct answer <= 5%", pct(ids.borrowed.length, n) <= 5, ids.borrowed],
    ["FAIL", "correct = longest option <= 30%", pct(ids.longestCorrect.length, n) <= 30, [`${pct(ids.longestCorrect.length, n)}%`]],
    ["FAIL", "correct >40% longer than every distractor <= 10%", pct(ids.uniqueLongestBy40.length, n) <= 10, ids.uniqueLongestBy40],
    ["FAIL", "each key letter 15-35% (n>=40)", n < 40 || keyShares.every((s) => s >= 0.15 && s <= 0.35), [JSON.stringify(keys)]],
    ["WARN", "absolute-word giveaways <= 10%", pct(ids.absoluteGiveaway.length, n) <= 10, ids.absoluteGiveaway],
    ["WARN", "short definition stems <= 20%", pct(ids.definition.length, n) <= 20, ids.definition],
    ["WARN", "NOT/EXCEPT stems <= 10%", pct(ids.negationStem.length, n) <= 10, ids.negationStem],
    ["WARN", "every topic >= 3 items", thinTopics.length === 0, thinTopics],
  ];

  return { slug, n, keys, topics, gates: gates.map(([level, name, ok, detail]) => ({ level, name, ok, detail })) };
}

const results = slugs.map(audit);
let failed = false;
for (const r of results) {
  if (r.error) {
    failed = true;
    if (!asJson) console.log(`${r.slug}: ${r.error}`);
    continue;
  }
  if (r.gates.some((g) => g.level === "FAIL" && !g.ok)) failed = true;
  if (asJson) continue;
  console.log(`\n${r.slug} — ${r.n} items · keys ${JSON.stringify(r.keys)} · topics ${Object.keys(r.topics).length}`);
  for (const g of r.gates) {
    const mark = g.ok ? "ok  " : g.level === "FAIL" ? "FAIL" : "warn";
    const detail = g.ok ? "" : ` → ${g.detail.slice(0, 12).join(", ")}${g.detail.length > 12 ? ` (+${g.detail.length - 12})` : ""}`;
    console.log(`  ${mark} ${g.name}${detail}`);
  }
}
if (asJson) console.log(JSON.stringify(results, null, 2));
process.exit(failed ? 1 : 0);
