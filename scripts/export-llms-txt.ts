#!/usr/bin/env tsx
/**
 * Write public/llms.txt from the live generator (UTMs included).
 *
 * Usage: npm run llms:export
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getPricedDecks } from "../src/lib/checkout-pricing";
import { buildLlmsTxt } from "../src/lib/llm-docs";

async function main() {
  const decks = await getPricedDecks();
  const body = buildLlmsTxt(decks);
  const outDir = path.join(process.cwd(), "public");
  const out = path.join(outDir, "llms.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(out, body, "utf8");
  console.log(`Wrote ${out} (${body.length} chars, ${decks.length} decks)`);

  if (!body.includes("utm_source=llm")) {
    console.error("FAIL: exported llms.txt missing utm_source=llm");
    process.exit(1);
  }
  if (!body.includes("utm_medium=llms.txt")) {
    console.error("FAIL: exported llms.txt missing utm_medium=llms.txt");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
