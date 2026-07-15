/**
 * Shared gates for the certification add pipeline.
 * Used by validate-certification-pipeline.mjs and mock-bank scripts.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const REGISTRY_PATH = join(
  process.cwd(),
  "src/data/certifications/registry.json",
);

export function loadRegistry(root = process.cwd()) {
  const path = join(root, "src/data/certifications/registry.json");
  const raw = JSON.parse(readFileSync(path, "utf8"));
  return raw;
}

export function listMockSlugs(registry, { includeSkipped = false } = {}) {
  return registry.certifications
    .filter((entry) => includeSkipped || !entry.skipMockBankGeneration)
    .map((entry) => entry.mockSlug);
}

export function findCert(registry, { id, mockSlug, deckSlug }) {
  return registry.certifications.find((entry) => {
    if (id && entry.id === id) return true;
    if (mockSlug && entry.mockSlug === mockSlug) return true;
    if (deckSlug && entry.deckSlug === deckSlug) return true;
    return false;
  });
}

function readText(root, relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function bankPath(root, mockSlug) {
  return join(root, `src/data/mock-exams/${mockSlug}.json`);
}

function coverPath(root, deckSlug) {
  return join(root, `public/covers/${deckSlug}.webp`);
}

function validationReportPath(root, mockSlug) {
  return join(root, `src/data/mock-exams/.validation-reports/${mockSlug}.json`);
}

export function evaluateCertification(root, cert) {
  const gates = [];
  const warn = (id, label, detail) => gates.push({ id, label, status: "warn", detail });
  const pass = (id, label, detail) => gates.push({ id, label, status: "pass", detail });
  const fail = (id, label, detail) => gates.push({ id, label, status: "fail", detail });

  const configsTs = readText(root, "src/lib/mock-exams/configs.ts");
  const decksTs = readText(root, "src/lib/decks.ts");
  const mockSeoTs = readText(root, "src/lib/mock-exams/seo.ts");
  const gumroadJson = readText(root, "src/data/gumroad/building-anki-decks.json");
  const coversScript = readText(root, "scripts/generate-deck-covers.mjs");
  const examFactsTs = readText(root, "src/lib/exam-facts.ts");
  const examLlmTs = readText(root, "src/lib/exam-llm-layer.ts");
  const homePage = readText(root, "src/app/page.tsx");
  const mockIndexPage = readText(root, "src/app/mock-exams/page.tsx");

  // 1 Registry
  pass("registry", "Registry entry", `${cert.id} → ${cert.mockSlug} / ${cert.deckSlug}`);

  // 2 Mock config
  if (configsTs?.includes(`slug: "${cert.mockSlug}"`)) {
    pass("mock-config", "Mock exam config", cert.mockSlug);
  } else {
    fail("mock-config", "Mock exam config", `Add ${cert.mockSlug} to src/lib/mock-exams/configs.ts`);
  }

  // 3 Mock SEO profile
  if (mockSeoTs?.includes(`"${cert.mockSlug}"`)) {
    pass("mock-seo", "Mock SEO profile", cert.mockSlug);
  } else {
    fail("mock-seo", "Mock SEO profile", `Add profile in src/lib/mock-exams/seo.ts`);
  }

  // 4 Deck catalog
  if (decksTs?.includes(`slug: "${cert.deckSlug}"`)) {
    pass("deck-catalog", "Anki deck in catalog", cert.deckSlug);
  } else {
    fail("deck-catalog", "Anki deck in catalog", `Add planned deck to src/lib/decks.ts`);
  }

  // 5 Gumroad catalog
  if (gumroadJson?.includes(`"${cert.deckSlug}"`)) {
    const parsed = JSON.parse(gumroadJson);
    const product = parsed.products?.[cert.deckSlug];
    if (product?.gumroadProductId) {
      pass("gumroad-live", "Gumroad product linked", product.gumroadProductId);
    } else {
      warn("gumroad-live", "Gumroad product on API", "Permalink in catalog; run setup:gumroad-building-decks when token available");
    }
    pass("gumroad-catalog", "Gumroad catalog entry", cert.gumroadPermalink ?? cert.deckSlug);
  } else {
    fail("gumroad-catalog", "Gumroad catalog entry", `Add to src/data/gumroad/building-anki-decks.json`);
  }

  // 6 Question bank
  const bankFile = bankPath(root, cert.mockSlug);
  if (existsSync(bankFile)) {
    const bank = JSON.parse(readFileSync(bankFile, "utf8"));
    const count = Array.isArray(bank) ? bank.length : 0;
    if (count > 0) {
      pass("mock-bank", "Question bank JSON", `${count} questions`);
    } else {
      fail("mock-bank", "Question bank JSON", `Empty — run generate:mock-banks -- --slug ${cert.mockSlug}`);
    }
  } else {
    fail("mock-bank", "Question bank JSON", `Missing src/data/mock-exams/${cert.mockSlug}.json`);
  }

  // 7 Bank wired in question-bank.ts
  const questionBankTs = readText(root, "src/lib/mock-exams/question-bank.ts");
  if (questionBankTs?.includes(`"${cert.mockSlug}"`)) {
    pass("mock-bank-import", "Question bank import", "question-bank.ts");
  } else {
    fail("mock-bank-import", "Question bank import", `Import bank in src/lib/mock-exams/question-bank.ts`);
  }

  // 8 Validation report
  const reportFile = validationReportPath(root, cert.mockSlug);
  if (existsSync(reportFile)) {
    pass("mock-validation", "LLM validation report", reportFile.split("/").slice(-2).join("/"));
  } else if (cert.skipMockBankGeneration) {
    warn("mock-validation", "LLM validation report", "Skipped (gmat-focus uses separate bank flow)");
  } else {
    warn("mock-validation", "LLM validation report", `Run validate:mock-banks -- --slug ${cert.mockSlug}`);
  }

  // 9 Cover image
  if (existsSync(coverPath(root, cert.deckSlug))) {
    pass("cover-image", "Deck cover WebP", `/covers/${cert.deckSlug}.webp`);
  } else {
    fail("cover-image", "Deck cover WebP", `Run generate:deck-covers -- --slug ${cert.deckSlug}`);
  }

  // 10 Cover generator config
  if (coversScript?.includes(`"${cert.deckSlug}"`)) {
    pass("cover-config", "Cover blueprint config", "generate-deck-covers.mjs");
  } else {
    fail("cover-config", "Cover blueprint config", `Add DECK_CONFIGS entry in scripts/generate-deck-covers.mjs`);
  }

  // 11 Exam facts (optional but recommended)
  if (cert.examFactsKey) {
    if (examFactsTs?.includes(`"${cert.examFactsKey}"`) && examFactsTs?.includes(`"${cert.deckSlug}"`)) {
      pass("exam-facts", "Exam facts layer", cert.examFactsKey);
    } else {
      fail("exam-facts", "Exam facts layer", `Add ${cert.examFactsKey} + deck mapping in exam-facts.ts`);
    }
  } else {
    warn("exam-facts", "Exam facts layer", "Not configured — add for citable LLM answers");
  }

  // 12 High-intent LLM block
  if (examLlmTs?.includes(`mockSlug: "${cert.mockSlug}"`)) {
    pass("llm-high-intent", "High-intent llms.txt block", cert.mockSlug);
  } else {
    warn("llm-high-intent", "High-intent llms.txt block", `Add to HIGH_INTENT_MOCK_BLOCKS in exam-llm-layer.ts`);
  }

  // 13 Homepage + mock index discovery links
  if (homePage?.includes(cert.mockSlug) || homePage?.includes(cert.deckSlug)) {
    pass("homepage-links", "Homepage discovery links", "page.tsx");
  } else {
    warn("homepage-links", "Homepage discovery links", `Add repair pair or section link on src/app/page.tsx`);
  }

  if (mockIndexPage?.includes(cert.mockSlug)) {
    pass("mock-index-links", "Mock index page link", "mock-exams/page.tsx");
  } else {
    warn("mock-index-links", "Mock index page link", `Add to usPriorityMockLinks on mock-exams/page.tsx`);
  }

  // 14 Linked mock ↔ deck (funnel)
  if (configsTs?.includes(`linkedDeckSlug: "${cert.deckSlug}"`)) {
    pass("funnel-link", "Mock ↔ deck funnel link", `linkedDeckSlug: ${cert.deckSlug}`);
  } else {
    fail("funnel-link", "Mock ↔ deck funnel link", `Set linkedDeckSlug on mock config`);
  }

  const failed = gates.filter((g) => g.status === "fail").length;
  const warnings = gates.filter((g) => g.status === "warn").length;
  const passed = gates.filter((g) => g.status === "pass").length;

  return { cert, gates, failed, warnings, passed, ready: failed === 0 };
}

export function formatGateReport(result) {
  const lines = [
    `# ${result.cert.id} (${result.cert.mockSlug})`,
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
