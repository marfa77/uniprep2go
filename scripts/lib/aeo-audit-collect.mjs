/**
 * Local Answer Engine Optimization (AEO / GEO / LLM citation) audit.
 * No OpenRouter — rules against codebase + optional live endpoint probes.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collectInventory } from "./seo-audit-collect.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = process.env.SEO_AUDIT_BASE_URL ?? "https://uniprep2go.study";

function readSrc(rel) {
  const path = join(ROOT, rel);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function fileHas(rel, needle) {
  return readSrc(rel).includes(needle);
}

export async function collectAeoInventory({ scope = "all" } = {}) {
  const seoInv = await collectInventory({ scope });
  const examLlm = await import("../../src/lib/exam-llm-layer.ts");
  const examFacts = await import("../../src/lib/exam-facts.ts");
  const seo = await import("../../src/lib/seo.ts");
  const configs = await import("../../src/lib/mock-exams/configs.ts");
  const decksMod = await import("../../src/lib/decks.ts");

  const allMocks = configs.getAllMockExams();
  const indexedMocks = allMocks.filter((m) => seo.shouldIndexMockExam(m.slug));
  const highIntentSlugs = new Set(examLlm.HIGH_INTENT_MOCK_BLOCKS.map((b) => b.mockSlug));
  const available = decksMod.availableDecks ?? [];

  const monetizedWithMock = available.filter((d) => {
    const mock = allMocks.find((m) => m.linkedDeckSlug === d.slug);
    return Boolean(mock);
  });

  return {
    site: SITE,
    collectedAt: new Date().toISOString(),
    scope,
    indexedMockCount: indexedMocks.length,
    totalMockCount: allMocks.length,
    availableDeckCount: available.length,
    highIntentQueryCount: examLlm.HIGH_INTENT_MOCK_BLOCKS.length,
    highIntentMockSlugs: [...highIntentSlugs],
    indexedMissingHighIntent: indexedMocks
      .filter((m) => !highIntentSlugs.has(m.slug))
      .map((m) => m.slug),
    monetizedMockDecksMissingExamFacts: monetizedWithMock
      .filter((d) => !examFacts.getExamFactsProfileForDeck(d.slug))
      .map((d) => d.slug),
    seoInventory: seoInv,
    codeSignals: {
      hasLlmsRoute: existsSync(join(ROOT, "src/app/llms.txt/route.ts")),
      hasLlmsFullRoute: existsSync(join(ROOT, "src/app/llms-full.txt/route.ts")),
      hasLlmSitemap: existsSync(join(ROOT, "src/app/llm-sitemap.xml/route.ts")),
      hasFactsApi: existsSync(join(ROOT, "src/app/api/facts/route.ts")),
      hasMockExamsApi: existsSync(join(ROOT, "src/app/api/mock-exams/route.ts")),
      hasExamLlmLayer: existsSync(join(ROOT, "src/lib/exam-llm-layer.ts")),
      hasLlmFactsStrip: existsSync(join(ROOT, "src/components/llm/llm-facts-strip.tsx")),
      robotsMentionsLlms: /llms\.txt/i.test(readSrc("src/app/robots.ts")),
      sitemapMentionsLlms: /llms\.txt/i.test(readSrc("src/app/sitemap.ts")),
      homeHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/page.tsx")),
      mockIndexHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/mock-exams/page.tsx")),
      mockLeafHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/mock-exams/[slug]/page.tsx")),
      deckLeafHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/decks/[slug]/page.tsx")),
      buildingHubHasLlmStrip: /LlmFactsStrip/.test(
        readSrc("src/app/building-certification-anki-decks/page.tsx"),
      ),
      financeHubHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/finance-anki-decks/page.tsx")),
      languageHubHasLlmStrip: /LlmFactsStrip/.test(
        readSrc("src/app/language-certification-decks/page.tsx"),
      ),
      decksHubHasLlmStrip: /LlmFactsStrip/.test(readSrc("src/app/decks/page.tsx")),
      hasQuizSchema: fileHas("src/lib/mock-exams/llm.ts", '"@type": "Quiz"'),
      hasFaqSchema: /FAQPage/.test(readSrc("src/lib/product-jsonld.ts"))
        || /FAQPage/.test(readSrc("src/lib/mock-exams/llm.ts")),
      hasProductSchema: /"@type": "Product"/.test(readSrc("src/lib/product-jsonld.ts"))
        || /@type:\s*["']Product["']/.test(readSrc("src/lib/product-jsonld.ts")),
    },
  };
}

export function runAeoRuleChecks(inventory) {
  const issues = [];
  const push = (severity, code, entity, message) => {
    issues.push({ severity, code, entity, type: "aeo", message });
  };

  const c = inventory.codeSignals;

  if (!c.hasLlmsRoute) push("critical", "missing-llms-txt", "llms.txt", "Missing /llms.txt route");
  if (!c.hasLlmsFullRoute) {
    push("critical", "missing-llms-full", "llms-full.txt", "Missing /llms-full.txt route");
  }
  if (!c.hasFactsApi) push("critical", "missing-facts-api", "api/facts", "Missing /api/facts");
  if (!c.hasMockExamsApi) {
    push("critical", "missing-mock-api", "api/mock-exams", "Missing /api/mock-exams");
  }

  if (!c.robotsMentionsLlms) {
    push("high", "robots-no-llms-pointer", "robots.ts", "robots.txt does not point crawlers to llms.txt");
  }
  if (!c.sitemapMentionsLlms) {
    push("medium", "sitemap-no-llms", "sitemap.ts", "Main sitemap omits /llms.txt");
  }
  if (!c.hasLlmSitemap) {
    push("high", "missing-llm-sitemap", "llm-sitemap.xml", "Missing /llm-sitemap.xml");
  }

  if (!c.homeHasLlmStrip) push("high", "hub-no-data-llm", "home", "Homepage missing LlmFactsStrip / data-llm");
  if (!c.mockIndexHasLlmStrip) {
    push("high", "hub-no-data-llm", "mock-exams", "Mock index missing LlmFactsStrip");
  }
  if (!c.mockLeafHasLlmStrip) {
    push("high", "leaf-no-data-llm", "mock-leaf", "Mock leaf missing LlmFactsStrip");
  }
  if (!c.deckLeafHasLlmStrip) {
    push("high", "leaf-no-data-llm", "deck-leaf", "Deck leaf missing LlmFactsStrip");
  }
  if (!c.buildingHubHasLlmStrip) {
    push("high", "hub-no-data-llm", "building-hub", "Building hub missing LlmFactsStrip");
  }
  if (!c.financeHubHasLlmStrip) {
    push("high", "hub-no-data-llm", "finance-hub", "Finance hub missing LlmFactsStrip");
  }
  if (!c.languageHubHasLlmStrip) {
    push("medium", "hub-no-data-llm", "language-hub", "Language hub missing LlmFactsStrip");
  }
  if (!c.decksHubHasLlmStrip) {
    push("medium", "hub-no-data-llm", "decks-hub", "Decks catalog missing LlmFactsStrip");
  }

  if (!c.hasQuizSchema) push("high", "missing-quiz-schema", "mock-llm", "Quiz JSON-LD missing");
  if (!c.hasFaqSchema) push("high", "missing-faq-schema", "jsonld", "FAQPage schema builder missing");
  if (!c.hasProductSchema) {
    push("medium", "missing-product-schema", "jsonld", "Product schema builder missing");
  }

  for (const slug of inventory.indexedMissingHighIntent) {
    push(
      "high",
      "indexed-mock-no-high-intent",
      slug,
      `Indexed mock ${slug} has no HIGH_INTENT_MOCK_BLOCKS entry for llms.txt citation`,
    );
  }

  for (const slug of inventory.monetizedMockDecksMissingExamFacts) {
    push(
      "high",
      "monetized-deck-no-exam-facts",
      slug,
      `Deck with linked mock lacks exam-facts / candidate_qa layer`,
    );
  }

  if (inventory.indexedMockCount < 6) {
    push(
      "high",
      "too-few-indexed-mocks",
      "mocks",
      `Only ${inventory.indexedMockCount} indexed mocks for AI citation`,
    );
  }

  if (inventory.highIntentQueryCount < 20) {
    push(
      "medium",
      "thin-high-intent",
      "exam-llm-layer",
      `Only ${inventory.highIntentQueryCount} high-intent query blocks`,
    );
  }

  return issues;
}

export function scoreAeo(issues, liveFails = 0) {
  const bySev = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const i of issues) bySev[i.severity] = (bySev[i.severity] ?? 0) + 1;

  let score = 100;
  score -= Math.min(36, bySev.critical * 12);
  score -= Math.min(30, bySev.high * 3);
  score -= Math.min(12, bySev.medium * 2);
  score -= Math.min(8, bySev.low * 0.25);
  score -= Math.min(16, liveFails * 8);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function collectAeoLiveEndpoints() {
  const paths = [
    "/llms.txt",
    "/llms-full.txt",
    "/llm-sitemap.xml",
    "/robots.txt",
    "/api/facts",
    "/api/mock-exams",
  ];
  const results = [];

  for (const path of paths) {
    const url = `${SITE}${path}`;
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "UniPrep2Go-AEO-Audit/1.0" },
      });
      const body = await response.text();
      results.push({
        path,
        url,
        status: response.status,
        ok: response.ok && body.trim().length > 0,
        bytes: body.length,
        mentionsLlms: /llms\.txt/i.test(body),
        mentionsMocks: /mock-exam|practice test|readiness/i.test(body),
      });
    } catch (error) {
      results.push({ path, url, ok: false, error: String(error.message ?? error) });
    }
  }

  return results;
}

export function synthesizeAeoReport({ inventory, issues, liveEndpoints = [] }) {
  const bySev = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const i of issues) bySev[i.severity] = (bySev[i.severity] ?? 0) + 1;
  const liveFails = liveEndpoints.filter((e) => !e.ok).length;
  const score = scoreAeo(issues, liveFails);

  const topActions = issues
    .filter((i) => i.severity === "critical" || i.severity === "high")
    .slice(0, 10)
    .map((i, idx) => ({
      rank: idx + 1,
      action: `${i.code}: ${i.entity} — ${i.message}`,
      owner: "dev",
      effort: i.severity === "critical" ? "M" : "S",
      impact: "H",
    }));

  return {
    overall_score: score,
    executive_summary:
      `Local AEO audit: ${inventory.indexedMockCount} indexed mocks, ${inventory.highIntentQueryCount} high-intent queries, ` +
      `${issues.length} rule issues (${bySev.critical}c/${bySev.high}h/${bySev.medium}m/${bySev.low}l). ` +
      `Live LLM endpoints: ${liveEndpoints.length} checked, ${liveFails} failed.`,
    scores: { aeo: score },
    by_severity: bySev,
    top_10_actions: topActions,
    this_week: topActions.slice(0, 5).map((a) => a.action),
    inventory_highlights: {
      indexed_mocks: inventory.indexedMockCount,
      high_intent_queries: inventory.highIntentQueryCount,
      missing_high_intent: inventory.indexedMissingHighIntent,
      missing_exam_facts: inventory.monetizedMockDecksMissingExamFacts,
    },
  };
}
