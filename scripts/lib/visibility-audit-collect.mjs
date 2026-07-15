import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectInventory,
  collectLiveSamples,
  fetchPageSeo,
  runRuleChecks,
} from "./seo-audit-collect.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://uniprep2go.study";

function countMatches(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

function extractJsonLdTypes(html) {
  const types = [];
  for (const block of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.parse(block[1]);
      const graph = json["@graph"] ?? [json];
      for (const node of graph) {
        if (node["@type"]) types.push(node["@type"]);
      }
    } catch {
      /* skip malformed */
    }
  }
  return [...new Set(types)];
}

export async function fetchPageDesignSnapshot(url) {
  const seo = await fetchPageSeo(url);
  if (!seo.ok) return { ...seo, design: null };

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "UniPrep2Go-Visibility-Audit/1.0" },
      redirect: "follow",
    });
    const html = await response.text();
    const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
    const wordEstimate = textOnly.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

    const ctaSnippets = [...html.matchAll(/>([^<]{0,80}(?:practice test|readiness check|Buy the|Get the|checkout|Start free)[^<]{0,40})</gi)]
      .map((m) => m[1].trim())
      .slice(0, 8);

    return {
      ...seo,
      design: {
        h2Count: countMatches(html, /<h2\b/gi),
        buttonCount: countMatches(html, /<button\b/gi),
        primaryLinkCount: countMatches(html, /rounded-full[^>]*bg-\[#18140f\]/gi),
        accentLinkCount: countMatches(html, /rounded-full[^>]*bg-\[#1f3a5f\]/gi),
        hasSampleCards: /sample-cards|Sample cards|PDF previews/i.test(html),
        hasPracticeMockBlock: /practice-mock|Free practice test|readiness check/i.test(html),
        hasDataLlmFacts: /data-llm=["']facts["']/i.test(html),
        hasDataLlmCommercial: /data-llm=["']commercial["']/i.test(html),
        jsonLdTypes: extractJsonLdTypes(html),
        wordEstimate,
        ctaSnippets,
        usesCreamBackground: /#f7f3ea|bg-\[#f7f3ea\]/i.test(html),
      },
    };
  } catch (error) {
    return { ...seo, design: { error: String(error.message ?? error) } };
  }
}

export async function collectLlmEndpoints() {
  const paths = ["/llms.txt", "/llms-full.txt", "/llm-sitemap.xml", "/robots.txt"];
  const results = [];

  for (const path of paths) {
    const url = `${SITE}${path}`;
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "UniPrep2Go-Visibility-Audit/1.0" },
      });
      const body = await response.text();
      results.push({
        path,
        url,
        status: response.status,
        ok: response.ok,
        bytes: body.length,
        preview: body.slice(0, 1200),
        mentionsLlmsFull: body.includes("llms-full.txt"),
        mentionsMockExams: /mock-exam|practice test|readiness check/i.test(body),
        mentionsBuilding: /building|EPA 608|LEED|GMAT/i.test(body),
      });
    } catch (error) {
      results.push({ path, url, ok: false, error: String(error.message ?? error) });
    }
  }

  return results;
}

export function collectCodebaseLlmSignals() {
  const signals = {
    hasExamLlmLayer: existsSync(join(ROOT, "src/lib/exam-llm-layer.ts")),
    hasLlmMeta: existsSync(join(ROOT, "src/lib/llm-meta.ts")),
    hasLlmFactsStrip: existsSync(join(ROOT, "src/components/llm/llm-facts-strip.tsx")),
    hasProductJsonLd: existsSync(join(ROOT, "src/lib/product-jsonld.ts")),
    hasMockQuizSchema: false,
  };

  if (signals.hasMockQuizSchema !== undefined) {
    try {
      const llm = readFileSync(join(ROOT, "src/lib/mock-exams/llm.ts"), "utf8");
      signals.hasMockQuizSchema = llm.includes('"@type": "Quiz"');
    } catch {
      signals.hasMockQuizSchema = false;
    }
  }

  return signals;
}

export async function collectDesignSamples(inventory, limit = 10) {
  const urls = new Set([
    `${SITE}/`,
    `${SITE}/mock-exams`,
    `${SITE}/building-certification-anki-decks`,
    `${SITE}/mock-exams/sie-full-mock`,
    `${SITE}/decks/sie-exam-anki-deck`,
    `${SITE}/decks/cfa-level-1-anki-deck`,
    `${SITE}/decks/gmat-focus-anki-deck`,
  ]);
  for (const deck of inventory.decks.filter((d) => d.category === "finance").slice(0, 2)) {
    urls.add(deck.pageUrl);
  }
  for (const mock of inventory.mocks.filter((m) => m.indexed).slice(0, 3)) {
    urls.add(mock.pageUrl);
  }

  const samples = [];
  for (const url of [...urls].slice(0, limit)) {
    samples.push(await fetchPageDesignSnapshot(url));
  }
  return samples;
}

export async function collectVisibilityPayload({ scope = "all", live = true } = {}) {
  const inventory = await collectInventory({ scope });
  const ruleIssues = runRuleChecks(inventory);
  const liveSamples = live ? await collectLiveSamples(inventory, 12) : [];
  const designSamples = live ? await collectDesignSamples(inventory, 10) : [];
  const llmEndpoints = live ? await collectLlmEndpoints() : [];
  const llmCodeSignals = collectCodebaseLlmSignals();

  return {
    scope,
    site: SITE,
    collectedAt: inventory.collectedAt,
    inventory,
    ruleIssues,
    liveSamples,
    designSamples,
    llmEndpoints,
    llmCodeSignals,
  };
}
