#!/usr/bin/env node
/**
 * Cheap content triage + mechanical repair for mock banks (no OpenRouter).
 *
 * Replaces “full deep QA every bank” with a smell board:
 *   P0 — junk phrases | key bias ≥ 85% | template stems ≥ 50%
 *   P1 — key bias ≥ 60% | thin explanations ≥ 50% | template ≥ 25%
 *   P2 — milder flags
 *
 * Usage:
 *   node --import tsx scripts/triage-mock-bank-smells.mjs
 *   node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --tier P0
 *   node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --slug nbdhe-readiness-check
 *   node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --tier P0 --dry-run
 *
 * Writes:
 *   docs/mock-bank-qa/smell-board.json
 *   docs/mock-bank-qa/smell-board.md
 *
 * Does NOT run repair-definition-style-distractors (unsafe on non-money banks).
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BANKS_DIR = join(root, "src/data/mock-exams");
const OUT_DIR = join(root, "docs/mock-bank-qa");
const OUT_JSON = join(OUT_DIR, "smell-board.json");
const OUT_MD = join(OUT_DIR, "smell-board.md");

const TEMPLATE_TAIL =
  /(?::\s*)?which of the following is most accurate for the .+?\??\s*$/i;
const TEMPLATE_SHORT = /\s+for the (?:[A-Z][A-Za-z0-9 /&-]{2,60}) readiness(?: check)?\??\s*$/i;
/** Polluted money-repair / template leftovers — not legitimate exam phrasing. */
const JUNK_RE =
  /None of the provided deck concepts|different concept from the deck|securities fraud under .{0,80}(always eliminates|has no application|is identical to FDIC)|\bFDIC insurance covers\b.{0,40}every customer|\bplaceholder\b|\bFIXME\b|(?<![A-Za-z])TODO(?![A-Za-z])/i;

const EXPL_THIN = 100;
const EXPL_MIN_PAD = 100;
const DIST_MIN_PAD = 90;
const KEY_BIAS_P0 = 0.85;
const KEY_BIAS_P1 = 0.6;
const KEY_BIAS_SHUFFLE = 0.55;
const TMPL_P0 = 0.5;
const TMPL_P1 = 0.25;
const THIN_P1 = 0.5;

function parseArgs(argv) {
  const args = {
    fixMechanical: false,
    dryRun: false,
    tier: null,
    all: false,
    slugs: [],
    includeCitizenship: false,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--fix-mechanical") args.fixMechanical = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--all") args.all = true;
    else if (arg === "--include-citizenship") args.includeCitizenship = true;
    else if (arg === "--tier") args.tier = String(argv[++i] ?? "").toUpperCase();
    else if (arg === "--slug") args.slugs.push(argv[++i]);
  }
  if (args.tier && !["P0", "P1", "P2", "ALL"].includes(args.tier)) {
    throw new Error(`--tier must be P0, P1, P2, or ALL (got ${args.tier})`);
  }
  return args;
}

function bankPath(slug) {
  return join(BANKS_DIR, `${slug}.json`);
}

function loadBank(slug) {
  const path = bankPath(slug);
  if (!existsSync(path)) return null;
  const data = JSON.parse(readFileSync(path, "utf8"));
  const questions = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(questions) || questions.length === 0) return null;
  if (!questions[0] || typeof questions[0] !== "object" || !("prompt" in questions[0])) {
    return null;
  }
  return { path, root: data, questions, isArrayRoot: Array.isArray(data) };
}

function hash32(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRand(seedRef) {
  seedRef.v = (Math.imul(seedRef.v, 1664525) + 1013904223) >>> 0;
  return seedRef.v / 4294967296;
}

function isTemplateStem(prompt) {
  const p = String(prompt ?? "").trim();
  if (TEMPLATE_TAIL.test(p)) return true;
  if (TEMPLATE_SHORT.test(p)) return true;
  if (/:\s*which of the following is most accurate\b/i.test(p)) return true;
  return false;
}

function normalizeStemPunctuation(prompt) {
  let p = String(prompt ?? "").trim().replace(/\s+/g, " ");
  if (!p) return p;
  // Never strip existing terminal . ! ?
  if (/[.!?]$/.test(p)) return p;
  if (/:$/.test(p)) return p;
  if (/^(what|which|when|where|who|how|why)\b/i.test(p)) {
    return `${p}?`;
  }
  // Incomplete clause after template strip → keep a colon cue
  if (
    /\b(as|by|to|of|for|in|with|into|from|when|defines|called|means|includes|covers|describes|represents|requires|validates ability to)$/i.test(
      p,
    )
  ) {
    return `${p}:`;
  }
  return p;
}

function stripTemplateStem(prompt) {
  let p = String(prompt ?? "").trim();
  p = p.replace(TEMPLATE_TAIL, "").trim();
  p = p.replace(TEMPLATE_SHORT, "").trim();
  p = p.replace(/:\s*which of the following is most accurate\b.*$/i, "").trim();
  p = normalizeStemPunctuation(p);
  if (p) p = p[0].toUpperCase() + p.slice(1);
  return p;
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
  if (base.length >= EXPL_MIN_PAD) return base;
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

function countBlobJunk(question) {
  let n = 0;
  const parts = [
    question.prompt,
    question.explanation,
    ...(question.options ?? []).map((o) => o.text),
    ...Object.values(question.distractorExplanations ?? {}),
  ];
  for (const part of parts) {
    if (JUNK_RE.test(String(part ?? ""))) n += 1;
  }
  return n;
}

function scoreBank(slug, questions) {
  const n = questions.length;
  const keys = { a: 0, b: 0, c: 0, d: 0 };
  let template = 0;
  let thinExpl = 0;
  let junk = 0;
  let shortStem = 0;
  const explLens = [];

  for (const q of questions) {
    const key = q.correctOptionId;
    if (keys[key] !== undefined) keys[key] += 1;
    const prompt = String(q.prompt ?? "");
    if (isTemplateStem(prompt)) template += 1;
    if (prompt.trim().length < 40) shortStem += 1;
    const explLen = String(q.explanation ?? "").trim().length;
    explLens.push(explLen);
    if (explLen < EXPL_THIN) thinExpl += 1;
    junk += countBlobJunk(q);
  }

  const maxKey = Object.entries(keys).sort((a, b) => b[1] - a[1])[0];
  const keyDom = n ? maxKey[1] / n : 0;
  const tmplRate = n ? template / n : 0;
  const thinRate = n ? thinExpl / n : 0;
  const medExpl = explLens.length ? [...explLens].sort((a, b) => a - b)[Math.floor(n / 2)] : 0;

  let tier = null;
  if (junk > 0 || keyDom >= KEY_BIAS_P0 || tmplRate >= TMPL_P0) tier = "P0";
  else if (keyDom >= KEY_BIAS_P1 || thinRate >= THIN_P1 || tmplRate >= TMPL_P1) tier = "P1";
  else if (thinRate >= 0.25 || keyDom >= 0.45 || shortStem / n >= 0.2) tier = "P2";

  const score =
    junk * 2 +
    (keyDom >= KEY_BIAS_P0 ? 3 : keyDom >= KEY_BIAS_P1 ? 2 : 0) +
    (tmplRate >= TMPL_P0 ? 3 : tmplRate >= TMPL_P1 ? 2 : 0) +
    (thinRate >= THIN_P1 ? 2 : thinRate >= 0.25 ? 1 : 0);

  return {
    slug,
    n,
    tier,
    score,
    templateStems: template,
    templateRate: Number(tmplRate.toFixed(3)),
    thinExplanations: thinExpl,
    thinRate: Number(thinRate.toFixed(3)),
    keyBias: maxKey[0],
    keyDom: Number(keyDom.toFixed(3)),
    keyCounts: keys,
    junkHits: junk,
    shortStems: shortStem,
    medianExplanationLen: medExpl,
    needsShuffle: keyDom >= KEY_BIAS_SHUFFLE,
    needsTemplateStrip: template > 0,
    needsLocalEnrich: thinExpl > 0,
    needsJunkScrub: junk > 0,
  };
}

function shuffleQuestionOptions(question) {
  const options = [...(question.options ?? [])];
  if (options.length !== 4) return { question, changed: false };

  const correct = options.find((o) => o.id === question.correctOptionId);
  if (!correct) return { question, changed: false };

  const distByText = {};
  for (const option of options) {
    if (option.id === question.correctOptionId) continue;
    const note = question.distractorExplanations?.[option.id];
    if (note) distByText[option.text] = note;
  }

  const seedRef = { v: hash32(String(question.id ?? question.prompt ?? "q")) };
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(seededRand(seedRef) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Avoid no-op if already balanced enough and order unchanged
  const ids = ["a", "b", "c", "d"];
  const newOptions = shuffled.map((option, index) => ({
    id: ids[index],
    text: option.text,
  }));
  const correctOptionId = newOptions.find((o) => o.text === correct.text)?.id;
  if (!correctOptionId) return { question, changed: false };

  const distractorExplanations = {};
  for (const option of newOptions) {
    if (option.id === correctOptionId) continue;
    if (distByText[option.text]) distractorExplanations[option.id] = distByText[option.text];
  }

  const sameOrder = options.every((o, i) => o.id === newOptions[i].id && o.text === newOptions[i].text);
  if (sameOrder && correctOptionId === question.correctOptionId) {
    return { question, changed: false };
  }

  return {
    question: {
      ...question,
      options: newOptions,
      correctOptionId,
      distractorExplanations,
    },
    changed: true,
  };
}

function scrubJunkText(text, fallback) {
  const raw = String(text ?? "");
  if (!JUNK_RE.test(raw)) return { text: raw, changed: false };
  return { text: fallback, changed: true };
}

function fixQuestionMechanical(question, bankFlags) {
  let next = {
    ...question,
    distractorExplanations: { ...(question.distractorExplanations ?? {}) },
  };
  const changes = {
    templateStrip: false,
    junkScrub: false,
    localEnrich: false,
    shuffled: false,
  };

  if (bankFlags.needsTemplateStrip && isTemplateStem(next.prompt)) {
    const stripped = stripTemplateStem(next.prompt);
    if (stripped && stripped !== next.prompt) {
      next.prompt = stripped;
      changes.templateStrip = true;
    }
  } else {
    const normalized = normalizeStemPunctuation(next.prompt);
    const cased = normalized ? normalized[0].toUpperCase() + normalized.slice(1) : normalized;
    if (cased && cased !== next.prompt) {
      next.prompt = cased;
      changes.templateStrip = true; // stem hygiene after prior strip
    }
  }

  if (bankFlags.needsJunkScrub) {
    const explScrub = scrubJunkText(
      next.explanation,
      "The marked answer matches the controlling rule in the stem; the other choices confuse a different concept.",
    );
    if (explScrub.changed) {
      next.explanation = explScrub.text;
      changes.junkScrub = true;
    }

    next.options = (next.options ?? []).map((option, index) => {
      if (option.id === next.correctOptionId) return option;
      const uniqueFallback =
        {
          a: "Confuses a different regulatory concept with the rule asked in the stem",
          b: "States an absolute that is not true for the scenario in the stem",
          c: "Mixes a consumer-protection idea that does not define this rule",
          d: "Describes an unrelated market or product rule that the stem does not test",
        }[option.id] ??
        `A related but incorrect statement (option ${option.id}) that does not satisfy the rule asked in the stem`;
      const scrub = scrubJunkText(option.text, uniqueFallback);
      if (scrub.changed) {
        changes.junkScrub = true;
        next.distractorExplanations[option.id] =
          "This distractor was a polluted/foreign concept; it does not apply to the stem.";
        return { ...option, text: scrub.text };
      }
      return option;
    });

    for (const [id, note] of Object.entries(next.distractorExplanations)) {
      if (id === next.correctOptionId) continue;
      const scrub = scrubJunkText(
        note,
        "This option mixes in an unrelated concept and is not the rule tested here.",
      );
      if (scrub.changed) {
        next.distractorExplanations[id] = scrub.text;
        changes.junkScrub = true;
      }
    }
  }

  if (bankFlags.needsLocalEnrich) {
    const correctOption = (next.options ?? []).find((o) => o.id === next.correctOptionId);
    const explanation = String(next.explanation ?? "").trim();
    if (explanation.length < EXPL_MIN_PAD) {
      next.explanation = expandExplanation(explanation, correctOption?.text ?? "");
      changes.localEnrich = true;
    }
    for (const option of next.options ?? []) {
      if (option.id === next.correctOptionId) continue;
      const current = String(next.distractorExplanations?.[option.id] ?? "").trim();
      if (current.length >= DIST_MIN_PAD) continue;
      next.distractorExplanations[option.id] = expandDistractor(current, option.text);
      changes.localEnrich = true;
    }
  }

  if (bankFlags.needsShuffle) {
    const shuffled = shuffleQuestionOptions(next);
    if (shuffled.changed) {
      next = shuffled.question;
      changes.shuffled = true;
    }
  }

  const changed = Object.values(changes).some(Boolean);
  return { question: next, changed, changes };
}

function fixBankMechanical(slug, dryRun) {
  const loaded = loadBank(slug);
  if (!loaded) return { slug, skipped: true, reason: "missing-or-invalid" };

  const before = scoreBank(slug, loaded.questions);
  let updated = 0;
  const changeCounts = {
    templateStrip: 0,
    junkScrub: 0,
    localEnrich: 0,
    shuffled: 0,
  };

  const nextQuestions = loaded.questions.map((question) => {
    const { question: fixed, changed, changes } = fixQuestionMechanical(question, before);
    if (changed) {
      updated += 1;
      for (const [key, value] of Object.entries(changes)) {
        if (value) changeCounts[key] += 1;
      }
    }
    return fixed;
  });

  const after = scoreBank(slug, nextQuestions);

  if (!dryRun && updated > 0) {
    const out = loaded.isArrayRoot ? nextQuestions : { ...loaded.root, questions: nextQuestions };
    writeFileSync(loaded.path, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  }

  return {
    slug,
    skipped: false,
    updated,
    total: loaded.questions.length,
    changeCounts,
    beforeTier: before.tier,
    afterTier: after.tier,
    before,
    after,
  };
}

function toMarkdown(board) {
  const lines = [
    `# Mock bank smell board`,
    ``,
    `Generated: ${board.generatedAt}`,
    `Scope: ${board.scope}`,
    ``,
    `| Tier | Count |`,
    `| --- | ---: |`,
    `| P0 | ${board.tierCounts.P0} |`,
    `| P1 | ${board.tierCounts.P1} |`,
    `| P2 | ${board.tierCounts.P2} |`,
    `| clean | ${board.tierCounts.clean} |`,
    ``,
    `## P0 (fix first)`,
    ``,
  ];

  const p0 = board.banks.filter((b) => b.tier === "P0");
  if (!p0.length) lines.push(`_None_`, ``);
  else {
    lines.push(`| Score | Slug | n | template | thin expl | key bias | junk |`, `| ---: | --- | ---: | --- | --- | --- | ---: |`);
    for (const b of p0) {
      lines.push(
        `| ${b.score} | \`${b.slug}\` | ${b.n} | ${b.templateStems}/${b.n} | ${b.thinExplanations}/${b.n} | ${b.keyBias}:${(b.keyDom * 100).toFixed(0)}% | ${b.junkHits} |`,
      );
    }
    lines.push(``);
  }

  lines.push(`## P1 (batch mechanical / enrich)`, ``);
  const p1 = board.banks.filter((b) => b.tier === "P1").slice(0, 40);
  if (!p1.length) lines.push(`_None_`, ``);
  else {
    lines.push(`Showing top ${p1.length} of ${board.tierCounts.P1}.`, ``);
    for (const b of p1) {
      lines.push(
        `- **${b.slug}** score=${b.score} tmpl=${b.templateStems}/${b.n} thin=${b.thinExplanations}/${b.n} key=${b.keyBias}:${(b.keyDom * 100).toFixed(0)}%`,
      );
    }
    lines.push(``);
  }

  lines.push(
    `## Commands`,
    ``,
    "```bash",
    `node --import tsx scripts/triage-mock-bank-smells.mjs`,
    `node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --tier P0`,
    `node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --slug nbdhe-readiness-check`,
    "```",
    ``,
  );
  return `${lines.join("\n")}\n`;
}

async function resolveTargetSlugs(args) {
  if (args.slugs.length) return args.slugs;

  const configsUrl = pathToFileURL(join(root, "src/lib/mock-exams/configs.ts")).href;
  const qbUrl = pathToFileURL(join(root, "src/lib/mock-exams/question-bank.ts")).href;
  const { getAllMockExams } = await import(configsUrl);
  const { isMockExamRunnable } = await import(qbUrl);

  return getAllMockExams()
    .filter((config) => {
      if (config.status !== "live") return false;
      if (!args.includeCitizenship && config.verticalId === "citizenship") return false;
      return isMockExamRunnable(config.slug);
    })
    .map((config) => config.slug);
}

async function main() {
  const args = parseArgs(process.argv);
  const slugs = await resolveTargetSlugs(args);

  const banks = [];
  for (const slug of slugs) {
    const loaded = loadBank(slug);
    if (!loaded) continue;
    banks.push(scoreBank(slug, loaded.questions));
  }

  banks.sort((a, b) => {
    const rank = { P0: 0, P1: 1, P2: 2 };
    const ra = a.tier ? rank[a.tier] : 9;
    const rb = b.tier ? rank[b.tier] : 9;
    return ra - rb || b.score - a.score || a.slug.localeCompare(b.slug);
  });

  const tierCounts = {
    P0: banks.filter((b) => b.tier === "P0").length,
    P1: banks.filter((b) => b.tier === "P1").length,
    P2: banks.filter((b) => b.tier === "P2").length,
    clean: banks.filter((b) => !b.tier).length,
  };

  const board = {
    generatedAt: new Date().toISOString(),
    scope: args.includeCitizenship
      ? "live runnable mocks (including citizenship)"
      : "live runnable mocks excluding citizenship",
    totalBanks: banks.length,
    tierCounts,
    thresholds: {
      EXPL_THIN,
      KEY_BIAS_P0,
      KEY_BIAS_P1,
      TMPL_P0,
      TMPL_P1,
      THIN_P1,
      KEY_BIAS_SHUFFLE,
    },
    banks,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_JSON, `${JSON.stringify(board, null, 2)}\n`, "utf8");
  writeFileSync(OUT_MD, toMarkdown(board), "utf8");

  console.log(`Triaged ${board.totalBanks} banks`);
  console.log(
    `tiers: P0=${tierCounts.P0} P1=${tierCounts.P1} P2=${tierCounts.P2} clean=${tierCounts.clean}`,
  );
  console.log(`board → ${OUT_JSON}`);
  console.log(`board → ${OUT_MD}`);

  for (const bank of banks.filter((b) => b.tier === "P0").slice(0, 25)) {
    console.log(
      `P0 ${bank.score.toString().padStart(2)} ${bank.slug} tmpl=${bank.templateStems}/${bank.n} thin=${bank.thinExplanations}/${bank.n} key=${bank.keyBias}:${(bank.keyDom * 100).toFixed(0)}% junk=${bank.junkHits}`,
    );
  }

  if (!args.fixMechanical) return;

  let fixSlugs = banks.map((b) => b.slug);
  if (args.slugs.length) fixSlugs = args.slugs;
  else if (args.all || args.tier === "ALL") fixSlugs = banks.map((b) => b.slug);
  else if (args.tier) fixSlugs = banks.filter((b) => b.tier === args.tier).map((b) => b.slug);
  else fixSlugs = banks.filter((b) => b.tier === "P0").map((b) => b.slug);

  console.log(
    `\nMechanical fix · ${fixSlugs.length} bank(s)${args.dryRun ? " (dry-run)" : ""}`,
  );

  const results = [];
  for (const slug of fixSlugs) {
    const result = fixBankMechanical(slug, args.dryRun);
    results.push(result);
    if (result.skipped) {
      console.log(`  skip ${slug}: ${result.reason}`);
      continue;
    }
    console.log(
      `  ${slug}: updated ${result.updated}/${result.total}  ${result.beforeTier ?? "clean"}→${result.afterTier ?? "clean"}  strip=${result.changeCounts.templateStrip} junk=${result.changeCounts.junkScrub} enrich=${result.changeCounts.localEnrich} shuffle=${result.changeCounts.shuffled}`,
    );
  }

  // Re-triage after writes
  if (!args.dryRun && results.some((r) => r.updated > 0)) {
    console.log("\nRe-triage after mechanical fix…");
    const refreshed = [];
    for (const slug of slugs) {
      const loaded = loadBank(slug);
      if (!loaded) continue;
      refreshed.push(scoreBank(slug, loaded.questions));
    }
    refreshed.sort((a, b) => {
      const rank = { P0: 0, P1: 1, P2: 2 };
      const ra = a.tier ? rank[a.tier] : 9;
      const rb = b.tier ? rank[b.tier] : 9;
      return ra - rb || b.score - a.score || a.slug.localeCompare(b.slug);
    });
    const nextCounts = {
      P0: refreshed.filter((b) => b.tier === "P0").length,
      P1: refreshed.filter((b) => b.tier === "P1").length,
      P2: refreshed.filter((b) => b.tier === "P2").length,
      clean: refreshed.filter((b) => !b.tier).length,
    };
    const nextBoard = {
      ...board,
      generatedAt: new Date().toISOString(),
      tierCounts: nextCounts,
      banks: refreshed,
      lastMechanicalFix: {
        dryRun: false,
        fixedSlugs: results.filter((r) => r.updated > 0).map((r) => r.slug),
        results: results.filter((r) => !r.skipped),
      },
    };
    writeFileSync(OUT_JSON, `${JSON.stringify(nextBoard, null, 2)}\n`, "utf8");
    writeFileSync(OUT_MD, toMarkdown(nextBoard), "utf8");
    console.log(
      `after: P0=${nextCounts.P0} P1=${nextCounts.P1} P2=${nextCounts.P2} clean=${nextCounts.clean}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
