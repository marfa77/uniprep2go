#!/usr/bin/env node
/**
 * Local AEO / GEO / LLM citation audit (no OpenRouter).
 *
 *   npm run audit:aeo
 *   npm run audit:aeo -- --live
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectAeoInventory,
  collectAeoLiveEndpoints,
  runAeoRuleChecks,
  synthesizeAeoReport,
} from "./lib/aeo-audit-collect.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "docs/aeo-audits");

function parseArgs(argv) {
  const args = { scope: "all", live: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--scope") args.scope = argv[++i];
    else if (argv[i] === "--live") args.live = true;
  }
  return args;
}

function renderMarkdown(result) {
  const syn = result.synthesis;
  const lines = [
    `# AEO Audit — ${result.scope}`,
    "",
    `**Date:** ${result.collectedAt}`,
    `**Site:** ${result.site}`,
    `**Overall score:** ${syn.overall_score}`,
    "",
    "## Executive summary",
    syn.executive_summary,
    "",
    "## Inventory",
    `- Indexed mocks: ${result.inventory.indexedMockCount}/${result.inventory.totalMockCount}`,
    `- High-intent queries: ${result.inventory.highIntentQueryCount}`,
    `- Missing high-intent: ${result.inventory.indexedMissingHighIntent.join(", ") || "none"}`,
    `- Monetized decks missing exam-facts: ${result.inventory.monetizedMockDecksMissingExamFacts.join(", ") || "none"}`,
    "",
    `## Rule checks (${result.issues.length})`,
  ];

  for (const issue of result.issues.slice(0, 40)) {
    lines.push(`- **[${issue.severity}]** \`${issue.code}\` ${issue.entity}: ${issue.message}`);
  }

  lines.push("", "## Top actions");
  for (const action of syn.top_10_actions ?? []) {
    lines.push(`${action.rank}. ${action.action}`);
  }

  if (result.liveEndpoints?.length) {
    lines.push("", "## Live LLM endpoints");
    for (const ep of result.liveEndpoints) {
      lines.push(
        `- ${ep.ok ? "OK" : "FAIL"} ${ep.path} (${ep.status ?? "err"}, ${ep.bytes ?? 0} bytes)`,
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  console.log(`Collecting AEO inventory (scope=${args.scope}, live=${args.live})…`);

  const inventory = await collectAeoInventory({ scope: args.scope });
  const issues = runAeoRuleChecks(inventory);
  const liveEndpoints = args.live ? await collectAeoLiveEndpoints() : [];
  const synthesis = synthesizeAeoReport({ inventory, issues, liveEndpoints });

  const result = {
    scope: args.scope,
    site: inventory.site,
    collectedAt: inventory.collectedAt,
    inventory,
    issues,
    liveEndpoints,
    synthesis,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = inventory.collectedAt.slice(0, 10);
  const base = join(OUT_DIR, `${stamp}-${args.scope}-aeo-audit`);
  writeFileSync(`${base}.json`, `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(`${base}.md`, renderMarkdown(result));

  console.log(`\nWrote ${base}.json`);
  console.log(`Wrote ${base}.md`);
  console.log(`\n--- AEO score: ${synthesis.overall_score}/100 ---`);
  console.log(synthesis.executive_summary);
  if (synthesis.top_10_actions?.length) {
    console.log("\nTop gaps:");
    for (const a of synthesis.top_10_actions.slice(0, 8)) console.log(`  ${a.rank}. ${a.action}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
