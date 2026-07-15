#!/usr/bin/env node
/**
 * Multi-agent SEO audit via OpenRouter — technical SEO, content marketing, conversion.
 *
 * Usage:
 *   node scripts/seo-audit-openrouter.mjs --scope all
 *   node scripts/seo-audit-openrouter.mjs --scope gmat
 *   node scripts/seo-audit-openrouter.mjs --scope building --live
 *   node scripts/seo-audit-openrouter.mjs --scope all --rules-only
 *
 * Env: OPENROUTER_API_KEY (from .env.local)
 * Models overridable via SEO_AUDIT_*_MODEL env vars.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, loadCredentials } from "./lib/openrouter.mjs";
import {
  collectInventory,
  collectLiveSamples,
  runRuleChecks,
} from "./lib/seo-audit-collect.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "docs/seo-audits");

/** Premium defaults — override via SEO_AUDIT_*_MODEL env vars. */
const AGENTS = {
  technical_seo: {
    label: "Technical SEO Analyst",
    model: process.env.SEO_AUDIT_TECH_MODEL ?? "google/gemini-2.5-pro",
    temperature: 0.15,
    system: `You are a senior technical SEO analyst for a B2C exam-prep SaaS (UniPrep2Go).
Focus: crawl/indexation, title/meta length, canonicals, robots/noindex, sitemap coverage, schema/LLM citation readiness, internal linking, keyword cannibalization, thin content.
Return strict JSON only.`,
  },
  content_marketer: {
    label: "Content & Keyword Strategist",
    model: process.env.SEO_AUDIT_CONTENT_MODEL ?? "anthropic/claude-opus-4",
    temperature: 0.3,
    system: `You are a content marketer specializing in US professional licensing and certification exam prep SEO.
Focus: search intent mapping, keyword gaps vs competitors (Magoosh, Kaplan, official bodies), headline/description rewrites, long-tail opportunities, E-E-A-T signals, FAQ/schema opportunities.
Return strict JSON only.`,
  },
  conversion_strategist: {
    label: "Conversion & Funnel Strategist",
    model: process.env.SEO_AUDIT_CRO_MODEL ?? "anthropic/claude-opus-4",
    temperature: 0.3,
    system: `You are a growth marketer for a mock-exam → Anki deck → Gumroad checkout funnel.
Focus: mock-to-deck-to-checkout alignment, Gumroad vs site messaging, CTA placement, pricing page SEO, landing page parity, launch-readiness blockers (planned vs live products).
Return strict JSON only.`,
  },
  lead_editor: {
    label: "SEO Lead (Synthesis)",
    model: process.env.SEO_AUDIT_LEAD_MODEL ?? "anthropic/claude-opus-4",
    temperature: 0.2,
    system: `You are the SEO lead synthesizing specialist reports into an executive action plan.
Merge findings, dedupe, prioritize by revenue/SEO impact. Be specific: name slugs, URLs, exact copy changes.
Return strict JSON only.`,
  },
};

function parseArgs(argv) {
  const args = { scope: "all", live: false, rulesOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--scope") args.scope = argv[++i];
    else if (argv[i] === "--live") args.live = true;
    else if (argv[i] === "--rules-only") args.rulesOnly = true;
  }
  return args;
}

function agentUserPrompt(agentKey, payload) {
  const schemaByAgent = {
    technical_seo: {
      score: "0-100 technical health",
      critical_issues: [{ slug: "", issue: "", fix: "", priority: "P0|P1|P2" }],
      indexation_gaps: [{ url: "", problem: "", recommendation: "" }],
      quick_wins: ["string"],
    },
    content_marketer: {
      score: "0-100 content/keyword fit",
      keyword_gaps: [{ keyword: "", intent: "", target_page: "", rationale: "" }],
      copy_improvements: [{ slug: "", field: "title|description|headline", current: "", suggested: "", why: "" }],
      content_opportunities: [{ type: "blog|intent-page|faq", topic: "", target_keyword: "" }],
    },
    conversion_strategist: {
      score: "0-100 funnel alignment",
      funnel_breaks: [{ step: "mock|deck|gumroad", slug: "", issue: "", fix: "" }],
      launch_blockers: [{ product: "", blocker: "", owner_action: "" }],
      cro_recommendations: [{ page: "", change: "", expected_impact: "" }],
    },
    lead_editor: {
      overall_score: "0-100",
      executive_summary: "2-3 sentences",
      top_10_actions: [{ rank: 1, action: "", owner: "dev|content|marketing", effort: "S|M|L", impact: "H|M|L" }],
      this_week: ["max 5 concrete tasks"],
      risks_if_ignored: ["string"],
    },
  };

  return `Audit scope: ${payload.scope}
Site: ${payload.site}
Date: ${payload.collectedAt}

## Rule-based findings (${payload.ruleIssues.length})
${JSON.stringify(payload.ruleIssues.slice(0, 40), null, 2)}

## Deck SEO inventory (${payload.inventory.decks.length})
${JSON.stringify(payload.inventory.decks, null, 2)}

## Planned vs Gumroad mismatches
${JSON.stringify(payload.inventory.plannedInCatalog, null, 2)}

## Mock exam SEO (${payload.inventory.mocks.length})
${JSON.stringify(payload.inventory.mocks, null, 2)}

## Live page samples
${JSON.stringify(payload.liveSamples ?? [], null, 2)}

Respond as ${AGENTS[agentKey].label} with JSON matching this schema:
${JSON.stringify(schemaByAgent[agentKey], null, 2)}`;
}

async function runAgent(agentKey, payload, credentials) {
  const agent = AGENTS[agentKey];
  console.log(`→ ${agent.label} (${agent.model})`);
  const data = await chatJson({
    credentials,
    model: agent.model,
    system: agent.system,
    user: agentUserPrompt(agentKey, payload),
    maxTokens: 6144,
    temperature: agent.temperature,
    role: agentKey,
  });
  return { agent: agentKey, label: agent.label, model: agent.model, report: data };
}

function renderMarkdown(result) {
  const lines = [
    `# SEO Audit — ${result.scope}`,
    ``,
    `**Date:** ${result.collectedAt}`,
    `**Site:** ${result.site}`,
    `**Overall score:** ${result.synthesis?.report?.overall_score ?? "—"}`,
    ``,
    `## Executive summary`,
    result.synthesis?.report?.executive_summary ?? "_No synthesis_",
    ``,
    `## Rule checks (${result.ruleIssues.length})`,
  ];

  for (const issue of result.ruleIssues.slice(0, 30)) {
    lines.push(`- **[${issue.severity}]** \`${issue.code}\` ${issue.entity}: ${issue.message}`);
  }

  lines.push(``, `## Top 10 actions`);
  for (const action of result.synthesis?.report?.top_10_actions ?? []) {
    lines.push(
      `${action.rank}. **${action.action}** — owner: ${action.owner}, effort: ${action.effort}, impact: ${action.impact}`,
    );
  }

  lines.push(``, `## This week`);
  for (const task of result.synthesis?.report?.this_week ?? []) {
    lines.push(`- ${task}`);
  }

  for (const specialist of result.specialists ?? []) {
    lines.push(``, `## ${specialist.label}`, `Score: ${specialist.report?.score ?? "—"}`, ``);
    lines.push("```json", JSON.stringify(specialist.report, null, 2), "```");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  console.log(`Collecting SEO inventory (scope=${args.scope})…`);
  const inventory = await collectInventory({ scope: args.scope });
  const ruleIssues = runRuleChecks(inventory);

  const liveSamples = args.live ? await collectLiveSamples(inventory) : [];
  console.log(`Rule issues: ${ruleIssues.length}${args.live ? `, live samples: ${liveSamples.length}` : ""}`);

  const payload = {
    scope: args.scope,
    site: inventory.site,
    collectedAt: inventory.collectedAt,
    inventory,
    ruleIssues,
    liveSamples,
  };

  let specialists = [];
  let synthesis = null;

  if (!args.rulesOnly) {
    const credentials = loadCredentials();
    const specialistKeys = ["technical_seo", "content_marketer", "conversion_strategist"];
    specialists = await Promise.all(
      specialistKeys.map((key) => runAgent(key, payload, credentials)),
    );

    console.log(`→ ${AGENTS.lead_editor.label} (${AGENTS.lead_editor.model})`);
    const leadPayload = {
      ...payload,
      specialistReports: specialists.map((s) => ({ agent: s.agent, label: s.label, report: s.report })),
    };
    synthesis = {
      agent: "lead_editor",
      label: AGENTS.lead_editor.label,
      model: AGENTS.lead_editor.model,
      report: await chatJson({
        credentials,
        model: AGENTS.lead_editor.model,
        system: AGENTS.lead_editor.system,
        user: `Synthesize these specialist SEO reports into one action plan.

Rule issues: ${JSON.stringify(ruleIssues.slice(0, 30))}

Specialist reports:
${JSON.stringify(leadPayload.specialistReports, null, 2)}

Return JSON with: overall_score, executive_summary, top_10_actions (rank, action, owner, effort, impact), this_week, risks_if_ignored`,
        maxTokens: 8192,
        temperature: AGENTS.lead_editor.temperature,
        role: "lead_editor",
      }),
    };
  }

  const result = {
    ...payload,
    specialists,
    synthesis,
    agents: Object.fromEntries(
      Object.entries(AGENTS).map(([k, v]) => [k, { label: v.label, model: v.model }]),
    ),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = inventory.collectedAt.slice(0, 10);
  const base = join(OUT_DIR, `${stamp}-${args.scope}-seo-audit`);
  writeFileSync(`${base}.json`, `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(`${base}.md`, renderMarkdown(result));

  console.log(`\nWrote ${base}.json`);
  console.log(`Wrote ${base}.md`);

  if (synthesis?.report?.executive_summary) {
    console.log(`\n--- Summary ---\n${synthesis.report.executive_summary}`);
  }
  if (ruleIssues.length) {
    console.log(`\nCritical/high rule issues: ${ruleIssues.filter((i) => i.severity === "critical" || i.severity === "high").length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
