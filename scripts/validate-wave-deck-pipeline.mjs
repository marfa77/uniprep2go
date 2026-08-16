#!/usr/bin/env node
/**
 * Fast gate for wave Anki SKUs (health/CDL/niche) — mirrors certification pipeline
 * without requiring building registry entry.
 *
 * Usage:
 *   npm run validate:wave-deck -- --slug ace-cpt-anki-deck
 *   npm run validate:wave-deck -- --mock ace-cpt-readiness-check
 *   npm run validate:wave-deck -- --all
 *
 * Exit 1 if any selected deck has blocking failures.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = { all: false, slug: null, mockSlug: null, json: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--slug" || arg === "--deck") args.slug = argv[++i];
    else if (arg === "--mock") args.mockSlug = argv[++i];
  }
  return args;
}

function readJson(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function readText(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function evaluateWaveDeck(deckSlug, spec) {
  const gates = [];
  const pass = (id, label, detail) => gates.push({ id, label, status: "pass", detail });
  const warn = (id, label, detail) => gates.push({ id, label, status: "warn", detail });
  const fail = (id, label, detail) => gates.push({ id, label, status: "fail", detail });

  const mockSlug = spec.mockSlug;
  pass("wave-spec", "Wave deck spec", `${deckSlug} → ${mockSlug} (${spec.cardCount} cards)`);

  const bankPath = join(root, `src/data/mock-exams/${mockSlug}.json`);
  if (!existsSync(bankPath)) {
    fail("mock-bank", "Question bank JSON", `Missing src/data/mock-exams/${mockSlug}.json`);
  } else {
    const bank = JSON.parse(readFileSync(bankPath, "utf8"));
    const n = Array.isArray(bank) ? bank.length : 0;
    if (n === 0) fail("mock-bank", "Question bank JSON", "Empty bank");
    else if (spec.cardCount && n < spec.cardCount) {
      fail(
        "mock-bank",
        "Question bank JSON",
        `${n} questions < spec.cardCount ${spec.cardCount}`,
      );
    } else {
      pass("mock-bank", "Question bank JSON", `${n} questions (spec ${spec.cardCount})`);
    }
  }

  const questionBankTs = readText("src/lib/mock-exams/question-bank.ts") ?? "";
  const citizenshipBanks = readText("src/lib/mock-exams/citizenship-banks.ts") ?? "";
  const wave3Banks = readText("src/lib/mock-exams/wave3-banks.ts") ?? "";
  const wave4Banks = readText("src/lib/mock-exams/wave4-banks.ts") ?? "";
  if (
    questionBankTs.includes(`"${mockSlug}"`) ||
    questionBankTs.includes(`${mockSlug}.json`) ||
    citizenshipBanks.includes(`"${mockSlug}"`) ||
    citizenshipBanks.includes(`${mockSlug}.json`) ||
    wave3Banks.includes(`"${mockSlug}"`) ||
    wave3Banks.includes(`${mockSlug}.json`) ||
    wave4Banks.includes(`"${mockSlug}"`) ||
    wave4Banks.includes(`${mockSlug}.json`)
  ) {
    pass("mock-bank-import", "Bank import", "question-bank / citizenship / wave3-4 banks");
  } else {
    fail(
      "mock-bank-import",
      "Bank import",
      `Wire ${mockSlug} in question-bank, citizenship-banks, or wave3/4-banks`,
    );
  }

  const wave2 = readText("src/lib/mock-exams/wave2-configs.ts") ?? "";
  const wave1 = readText("src/lib/mock-exams/wave1-configs.ts") ?? "";
  const wave3 = readText("src/lib/mock-exams/wave3-configs.ts") ?? "";
  const wave4 = readText("src/lib/mock-exams/wave4-configs.ts") ?? "";
  const citizenship = readText("src/lib/mock-exams/citizenship-configs.ts") ?? "";
  const configs = readText("src/lib/mock-exams/configs.ts") ?? "";
  if (
    wave2.includes(`slug: "${mockSlug}"`) ||
    wave1.includes(`slug: "${mockSlug}"`) ||
    wave3.includes(`slug: "${mockSlug}"`) ||
    wave4.includes(`slug: "${mockSlug}"`) ||
    citizenship.includes(`slug: "${mockSlug}"`) ||
    configs.includes(`slug: "${mockSlug}"`)
  ) {
    pass("mock-config", "Mock exam config", mockSlug);
  } else {
    fail("mock-config", "Mock exam config", `Add ${mockSlug} to wave/citizenship configs`);
  }

  if (
    wave2.includes(`linkedDeckSlug: "${deckSlug}"`) ||
    wave1.includes(`linkedDeckSlug: "${deckSlug}"`) ||
    wave3.includes(`linkedDeckSlug: "${deckSlug}"`) ||
    wave4.includes(`linkedDeckSlug: "${deckSlug}"`) ||
    citizenship.includes(`linkedDeckSlug: "${deckSlug}"`) ||
    configs.includes(`linkedDeckSlug: "${deckSlug}"`)
  ) {
    pass("funnel-link", "Mock ↔ deck funnel", deckSlug);
  } else {
    fail("funnel-link", "Mock ↔ deck funnel", `linkedDeckSlug: ${deckSlug}`);
  }

  const gumroad = readJson("src/data/gumroad/wave-anki-decks.json");
  const product = gumroad?.products?.[deckSlug];
  if (!product) {
    fail("gumroad-catalog", "Gumroad wave catalog", `Add ${deckSlug} to wave-anki-decks.json`);
  } else if (!product.gumroadProductId) {
    warn("gumroad-live", "Gumroad product id", "Run setup:gumroad-wave-decks");
    pass("gumroad-catalog", "Gumroad wave catalog", deckSlug);
  } else {
    pass("gumroad-catalog", "Gumroad wave catalog", deckSlug);
    pass("gumroad-live", "Gumroad product linked", String(product.gumroadProductId));
    if (!product.apkgUploadedAt) {
      warn("gumroad-apkg", "Apkg uploaded", "Run setup:gumroad-wave-decks -- --assets-only");
    } else {
      pass("gumroad-apkg", "Apkg uploaded", product.apkgUploadedAt);
    }
  }

  const launchTs = readText("src/lib/anki-deck-launch.ts") ?? "";
  const forceLaunchMatch = launchTs.match(
    /WAVE_FORCE_LAUNCH_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/,
  );
  const forceLaunch = Boolean(
    forceLaunchMatch?.[1]?.includes(`"${deckSlug}"`),
  );
  const moneyCohort = ["money", "licensing", "finance"].includes(String(spec.cohort));
  const apkgReadyLaunch = Boolean(product?.gumroadProductId && product?.apkgUploadedAt);
  if (forceLaunch || moneyCohort || apkgReadyLaunch) {
    pass(
      "launch-path",
      "Launch path",
      forceLaunch
        ? "WAVE_FORCE_LAUNCH_SLUGS"
        : apkgReadyLaunch
          ? "Gumroad apkg-ready"
          : `cohort ${spec.cohort}`,
    );
  } else {
    warn(
      "launch-path",
      "Launch path",
      `Cohort ${spec.cohort} stays planned unless Gumroad apkg-ready or WAVE_FORCE_LAUNCH_SLUGS`,
    );
  }

  const examFacts = readText("src/lib/exam-facts.ts") ?? "";
  if (examFacts.includes(`"${deckSlug}"`)) {
    pass("exam-facts", "Exam facts map", deckSlug);
  } else {
    warn("exam-facts", "Exam facts map", `Add deckExamKeyMap entry for ${deckSlug}`);
  }

  const llmLayer = readText("src/lib/exam-llm-layer.ts") ?? "";
  const llmDocs = readText("src/lib/llm-docs.ts") ?? "";
  const commercial =
    llmLayer.includes(deckSlug) ||
    llmDocs.includes(deckSlug) ||
    llmLayer.includes(`mockSlug: "${mockSlug}"`);
  if (commercial) {
    pass("geo-cite", "GEO / llms cite wiring", deckSlug);
  } else {
    warn(
      "geo-cite",
      "GEO / llms cite wiring",
      "Add commercial high-intent or citation one-liner + npm run llms:export",
    );
  }

  const moneyPage = readText("src/lib/deck-money-page-content.ts") ?? "";
  if (moneyPage.includes(`"${deckSlug}"`)) {
    pass("money-page", "Money-page unique content", deckSlug);
  } else {
    warn("money-page", "Money-page unique content", "Add pitch/uniqueContent overrides");
  }

  const samples = [1, 2, 3].map((n) =>
    join(root, `public/samples/${deckSlug}-sample-${n}.webp`),
  );
  const sampleHits = samples.filter((p) => existsSync(p)).length;
  const gumroadPolished = Boolean(
    product?.descriptionPolishedAt && product?.samplesUploadedAt,
  );
  if (sampleHits === 3) {
    pass("samples", "Sample card screenshots", "3 webp present (confirm user captures)");
  } else if (forceLaunch || moneyCohort) {
    fail(
      "samples",
      "Sample card screenshots",
      `${sampleHits}/3 — launched wave SKUs need user Anki screenshots before Gumroad polish`,
    );
  } else if (sampleHits > 0) {
    warn("samples", "Sample card screenshots", `${sampleHits}/3 — wait for user screenshots`);
  } else {
    warn(
      "samples",
      "Sample card screenshots",
      "Pending user screenshots — do not invent blanks; ship with cover until drop",
    );
  }

  if (gumroadPolished) {
    pass("gumroad-polish", "Gumroad description + samples", "descriptionPolishedAt + samplesUploadedAt");
  } else if (product?.gumroadProductId && (forceLaunch || moneyCohort)) {
    fail(
      "gumroad-polish",
      "Gumroad description + samples",
      "Run: npm run setup:gumroad-wave-decks -- --slug … --polish-only",
    );
  } else {
    warn(
      "gumroad-polish",
      "Gumroad description + samples",
      "Polish after samples exist (description + gallery + Sample cards landing body)",
    );
  }

  if (product?.landingPublishedAt) {
    pass("gumroad-landing", "Gumroad Sample cards body", "landingPublishedAt set");
  } else if (gumroadPolished && (forceLaunch || moneyCohort)) {
    fail(
      "gumroad-landing",
      "Gumroad Sample cards body",
      "Run polish-only (publishes custom landing with sample screenshots in product body)",
    );
  } else {
    warn(
      "gumroad-landing",
      "Gumroad Sample cards body",
      "Custom landing with Sample cards images (publish-wave-gumroad-landings.py)",
    );
  }

  const llms = readText("public/llms.txt") ?? "";
  if (llms.includes(deckSlug) || llms.includes(mockSlug)) {
    pass("llms-export", "public/llms.txt snapshot", "slug present");
  } else {
    warn("llms-export", "public/llms.txt snapshot", "Run npm run llms:export after GEO wiring");
  }

  const failed = gates.filter((g) => g.status === "fail").length;
  const warnings = gates.filter((g) => g.status === "warn").length;
  const passed = gates.filter((g) => g.status === "pass").length;
  return {
    deckSlug,
    mockSlug,
    gates,
    failed,
    warnings,
    passed,
    ready: failed === 0,
  };
}

function formatReport(result) {
  const lines = [
    `# ${result.deckSlug} (${result.mockSlug})`,
    "",
    `Passed: ${result.passed} · Warnings: ${result.warnings} · Failed: ${result.failed}`,
    result.ready ? "Status: READY (no blocking failures)" : "Status: INCOMPLETE",
    "",
  ];
  for (const gate of result.gates) {
    const icon = gate.status === "pass" ? "✓" : gate.status === "warn" ? "!" : "✗";
    lines.push(`${icon} [${gate.id}] ${gate.label}: ${gate.detail}`);
  }
  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv);
  const specs = readJson("src/data/wave-deck-specs.json");
  if (!specs) {
    console.error("Missing src/data/wave-deck-specs.json");
    process.exit(1);
  }

  let slugs = Object.keys(specs);
  if (args.slug) {
    if (!specs[args.slug]) {
      console.error(`Unknown wave deck slug: ${args.slug}`);
      process.exit(1);
    }
    slugs = [args.slug];
  } else if (args.mockSlug) {
    const hit = Object.entries(specs).find(([, s]) => s.mockSlug === args.mockSlug);
    if (!hit) {
      console.error(`No wave spec for mock: ${args.mockSlug}`);
      process.exit(1);
    }
    slugs = [hit[0]];
  } else if (!args.all) {
    console.error("Pass --slug, --mock, or --all");
    process.exit(1);
  }

  const results = slugs.map((slug) => evaluateWaveDeck(slug, specs[slug]));
  let exitCode = 0;

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const result of results) {
      console.log(formatReport(result));
      console.log("");
      if (!result.ready) exitCode = 1;
    }
    const readyCount = results.filter((r) => r.ready).length;
    console.log(`Summary: ${readyCount}/${results.length} wave decks pass blocking gates`);
  }

  if (results.some((r) => !r.ready)) exitCode = 1;
  process.exit(exitCode);
}

main();
