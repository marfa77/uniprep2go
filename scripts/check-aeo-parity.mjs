#!/usr/bin/env node
/**
 * PixID Layer A AEO gate for UniPrep2Go.
 *
 * Fails if:
 * - llm-meta / llm-docs lack utm_source=llm
 * - robots missing GPTBot
 * - homepage missing ai:description / llms alternate / data-llm
 * - public/llms.txt missing, short, or without UTM (run after llms:export)
 *
 * Usage: npm run check:aeo
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_LLMS_BYTES = 800;

function read(rel) {
  const p = path.join(ROOT, rel);
  if (!existsSync(p)) throw new Error(`missing file: ${rel}`);
  return readFileSync(p, "utf8");
}

function check(name, fn) {
  try {
    fn();
    console.log("✓", name);
    return true;
  } catch (e) {
    console.error("✗", name, "—", e instanceof Error ? e.message : e);
    return false;
  }
}

let ok = true;

ok =
  check("llm-meta has LLM UTM helpers", () => {
    const meta = read("src/lib/llm-meta.ts");
    if (!meta.includes("utm_source=llm") || !meta.includes("utm_medium=llms.txt")) {
      throw new Error("src/lib/llm-meta.ts missing LLM UTM constants");
    }
    if (!meta.includes("withAiMetadata") || !meta.includes("text/plain")) {
      throw new Error("withAiMetadata must attach text/plain → /llms.txt");
    }
  }) && ok;

ok =
  check("llm-docs emits UTM links", () => {
    const docs = read("src/lib/llm-docs.ts");
    if (!docs.includes("llmMarkdownLink") && !docs.includes("llmUtmUrl")) {
      throw new Error("src/lib/llm-docs.ts must emit UTM via llmMarkdownLink/llmUtmUrl");
    }
    if (!docs.includes("buildLlmsTxt")) {
      throw new Error("buildLlmsTxt missing");
    }
  }) && ok;

ok =
  check("llms.txt route exists", () => {
    const route = read("src/app/llms.txt/route.ts");
    if (!route.includes("buildLlmsTxt")) {
      throw new Error("llms.txt route must call buildLlmsTxt");
    }
  }) && ok;

ok =
  check("robots.ts allows GPTBot", () => {
    const robots = read("src/app/robots.ts");
    if (!robots.includes("GPTBot")) {
      throw new Error("src/app/robots.ts missing GPTBot allowlist");
    }
  }) && ok;

ok =
  check("homepage ai layer (ai:description + llms alternate + data-llm)", () => {
    const page = read("src/app/page.tsx");
    if (!page.includes("withAiMetadata") || !page.includes("linkLlmsCatalog")) {
      throw new Error("homepage must use withAiMetadata({ linkLlmsCatalog: true })");
    }
    if (!page.includes("buildSiteAiDescription") && !page.includes("aiDescription")) {
      throw new Error("homepage missing aiDescription wiring");
    }
    if (!page.includes("LlmFactsStrip") && !page.includes('data-llm="facts"')) {
      throw new Error("homepage missing data-llm facts strip");
    }
  }) && ok;

ok =
  check("public/llms.txt present with UTMs", () => {
    const rel = "public/llms.txt";
    const p = path.join(ROOT, rel);
    if (!existsSync(p)) {
      throw new Error("missing public/llms.txt — run npm run llms:export");
    }
    const size = statSync(p).size;
    if (size < MIN_LLMS_BYTES) {
      throw new Error(`public/llms.txt too short (${size} bytes)`);
    }
    const body = readFileSync(p, "utf8");
    if (!body.includes("utm_source=llm")) {
      throw new Error("public/llms.txt missing utm_source=llm");
    }
    if (!body.includes("utm_medium=llms.txt")) {
      throw new Error("public/llms.txt missing utm_medium=llms.txt");
    }
  }) && ok;

ok =
  check("press citation kit stub", () => {
    const press = read("src/app/press/page.tsx");
    if (!press.includes("Republication") && !press.includes("republication")) {
      throw new Error("press page must include republication license");
    }
    if (!press.includes("mailto:")) {
      throw new Error("press page must include mailto contact");
    }
  }) && ok;

if (!ok) {
  console.error("\nAEO parity check failed.");
  process.exit(1);
}

console.log("\nAEO parity OK.");
