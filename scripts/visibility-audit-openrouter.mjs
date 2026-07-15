#!/usr/bin/env node
/**
 * Full visibility audit: SEO + GEO/LLM/AEO + Design/UX + CRO — via OpenRouter (Grok default).
 *
 * Usage:
 *   npx tsx scripts/visibility-audit-openrouter.mjs --scope all --live
 *   npx tsx scripts/visibility-audit-openrouter.mjs --scope all --rules-only
 *
 * Model overrides: VISIBILITY_AUDIT_*_MODEL env vars.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, loadCredentials } from "./lib/openrouter.mjs";
import { collectVisibilityPayload } from "./lib/visibility-audit-collect.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "docs/visibility-audits");

/** Grok-first defaults — cheaper than Opus, strong on reasoning. Override via env. */
const GROK_FAST = process.env.VISIBILITY_AUDIT_FAST_MODEL ?? "x-ai/grok-4.20";
const GROK_LEAD = process.env.VISIBILITY_AUDIT_LEAD_MODEL ?? "x-ai/grok-4.5";

const AGENTS = {
  technical_seo: {
    label: "Technical SEO Analyst",
    model: process.env.VISIBILITY_AUDIT_SEO_MODEL ?? GROK_FAST,
    temperature: 0.15,
    system: `You are a senior technical SEO analyst for UniPrep2Go (B2C exam-prep SaaS).
Focus: crawl/indexation, titles/meta, canonicals, robots, schema, internal linking, cannibalization, sitemap.
Return strict JSON only.`,
  },
  geo_aeo: {
    label: "GEO / LLM / AEO Strategist",
    model: process.env.VISIBILITY_AUDIT_GEO_MODEL ?? GROK_FAST,
    temperature: 0.2,
    system: `You are a Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) specialist.
Focus: llms.txt / llms-full.txt quality, data-llm machine layers, ChatGPT/Perplexity/Google AI Overview citation readiness,
structured facts JSON, FAQ/schema for AI extraction, entity clarity, quotable one-liners, mock→deck funnel for AI referrals.
Return strict JSON only.`,
  },
  design_ux: {
    label: "Design & UX Auditor",
    model: process.env.VISIBILITY_AUDIT_DESIGN_MODEL ?? GROK_FAST,
    temperature: 0.25,
    system: `You are a senior product designer auditing UniPrep2Go (cream #f7f3ea / navy #1f3a5f / charcoal #18140f exam-prep aesthetic).
Focus: visual hierarchy, CTA prominence, mock-first funnel clarity, mobile readability, trust signals, sample cards,
deck/mock page consistency, accessibility, conversion friction. Be specific with page URLs and component-level fixes.
Return strict JSON only.`,
  },
  growth_cro: {
    label: "Content & Conversion Strategist",
    model: process.env.VISIBILITY_AUDIT_CRO_MODEL ?? GROK_FAST,
    temperature: 0.3,
    system: `You are a growth marketer for mock-exam → Anki deck → checkout funnels (Gumroad + Lemon Squeezy + App Store).
Focus: keyword gaps, copy improvements, CTA placement, pricing clarity, launch blockers, homepage funnel.
Return strict JSON only.`,
  },
  lead_editor: {
    label: "Visibility Lead (Synthesis)",
    model: GROK_LEAD,
    temperature: 0.2,
    system: `You synthesize SEO, GEO/AEO, design, and CRO reports into one prioritized action plan for UniPrep2Go.
Dedupe, rank by revenue + organic + AI-referral impact. Name slugs, URLs, exact copy/UI changes.
Return strict JSON only.`,
  },
};

const SCHEMAS = {
  technical_seo: {
    score: "0-100",
    critical_issues: [{ slug: "", issue: "", fix: "", priority: "P0|P1|P2" }],
    indexation_gaps: [{ url: "", problem: "", recommendation: "" }],
    quick_wins: ["string"],
  },
  geo_aeo: {
    score: "0-100 GEO/AEO readiness",
    llm_surface_gaps: [{ surface: "llms.txt|llms-full|data-llm|schema|facts-json", issue: "", fix: "" }],
    citation_opportunities: [{ query: "", target_page: "", content_change: "" }],
    ai_extractability: [{ page: "", problem: "", recommendation: "" }],
    competitor_ai_visibility: [{ competitor: "", what_they_do: "", our_gap: "" }],
  },
  design_ux: {
    score: "0-100 design/UX quality",
    strengths: ["string"],
    critical_ux_issues: [{ page: "", issue: "", fix: "", priority: "P0|P1|P2" }],
    cta_improvements: [{ page: "", current: "", suggested: "", impact: "H|M|L" }],
    visual_consistency: [{ area: "", issue: "", fix: "" }],
    mobile_accessibility: [{ issue: "", fix: "" }],
  },
  growth_cro: {
    score: "0-100 funnel alignment",
    keyword_gaps: [{ keyword: "", intent: "", target_page: "", rationale: "" }],
    copy_improvements: [{ slug: "", field: "title|description|headline|cta", current: "", suggested: "", why: "" }],
    funnel_breaks: [{ step: "mock|deck|checkout", slug: "", issue: "", fix: "" }],
    cro_recommendations: [{ page: "", change: "", expected_impact: "" }],
  },
  lead_editor: {
    overall_score: "0-100",
    executive_summary: "3-4 sentences",
    scores: { seo: 0, geo_aeo: 0, design: 0, cro: 0 },
    top_10_actions: [{ rank: 1, action: "", owner: "dev|content|design|marketing", effort: "S|M|L", impact: "H|M|L" }],
    this_week: ["max 5 tasks"],
    risks_if_ignored: ["string"],
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

function agentPrompt(agentKey, payload) {
  return `Audit scope: ${payload.scope}
Site: ${payload.site}
Date: ${payload.collectedAt}

## Rule checks (${payload.ruleIssues.length})
${JSON.stringify(payload.ruleIssues.slice(0, 40), null, 2)}

## Deck inventory (${payload.inventory.decks.length})
${JSON.stringify(payload.inventory.decks.slice(0, 20), null, 2)}

## Mock inventory (${payload.inventory.mocks.length})
${JSON.stringify(payload.inventory.mocks.slice(0, 20), null, 2)}

## Live SEO samples
${JSON.stringify(payload.liveSamples ?? [], null, 2)}

## Design/UX live snapshots
${JSON.stringify(payload.designSamples ?? [], null, 2)}

## LLM endpoints (llms.txt, robots, etc.)
${JSON.stringify(payload.llmEndpoints ?? [], null, 2)}

## Codebase LLM signals
${JSON.stringify(payload.llmCodeSignals ?? {}, null, 2)}

Respond as ${AGENTS[agentKey].label}. JSON schema:
${JSON.stringify(SCHEMAS[agentKey], null, 2)}`;
}

async function runAgent(agentKey, payload, credentials) {
  const agent = AGENTS[agentKey];
  console.log(`→ ${agent.label} (${agent.model})`);
  const report = await chatJson({
    credentials,
    model: agent.model,
    system: agent.system,
    user: agentPrompt(agentKey, payload),
    maxTokens: 6144,
    temperature: agent.temperature,
    role: agentKey,
  });
  return { agent: agentKey, label: agent.label, model: agent.model, report };
}

function renderMarkdown(result) {
  const syn = result.synthesis?.report;
  const lines = [
    `# Visibility Audit — ${result.scope}`,
    "",
    `**Date:** ${result.collectedAt}`,
    `**Site:** ${result.site}`,
    `**Overall score:** ${syn?.overall_score ?? "—"}`,
    "",
  ];

  if (syn?.scores) {
    lines.push(
      "## Score breakdown",
      `- SEO: ${syn.scores.seo ?? "—"}`,
      `- GEO/AEO: ${syn.scores.geo_aeo ?? "—"}`,
      `- Design/UX: ${syn.scores.design ?? "—"}`,
      `- CRO: ${syn.scores.cro ?? "—"}`,
      "",
    );
  }

  lines.push("## Executive summary", syn?.executive_summary ?? "_No synthesis_", "", `## Rule checks (${result.ruleIssues.length})`);
  for (const issue of result.ruleIssues.slice(0, 25)) {
    lines.push(`- **[${issue.severity}]** \`${issue.code}\` ${issue.entity}: ${issue.message}`);
  }

  lines.push("", "## Top 10 actions");
  for (const action of syn?.top_10_actions ?? []) {
    lines.push(
      `${action.rank}. **${action.action}** — owner: ${action.owner}, effort: ${action.effort}, impact: ${action.impact}`,
    );
  }

  lines.push("", "## This week");
  for (const task of syn?.this_week ?? []) lines.push(`- ${task}`);

  lines.push("", "## Models used");
  for (const [key, meta] of Object.entries(result.agents ?? {})) {
    lines.push(`- ${key}: ${meta.model}`);
  }

  for (const specialist of result.specialists ?? []) {
    lines.push("", `## ${specialist.label}`, `Score: ${specialist.report?.score ?? "—"}`, "");
    lines.push("```json", JSON.stringify(specialist.report, null, 2), "```");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  console.log(`Collecting visibility payload (scope=${args.scope}, live=${args.live})…`);

  const payload = await collectVisibilityPayload({ scope: args.scope, live: args.live });
  console.log(
    `Rules: ${payload.ruleIssues.length}, design samples: ${payload.designSamples.length}, LLM endpoints: ${payload.llmEndpoints.length}`,
  );

  let specialists = [];
  let synthesis = null;

  if (!args.rulesOnly) {
    const credentials = loadCredentials();
    const keys = ["technical_seo", "geo_aeo", "design_ux", "growth_cro"];
    specialists = await Promise.all(keys.map((key) => runAgent(key, payload, credentials)));

    console.log(`→ ${AGENTS.lead_editor.label} (${AGENTS.lead_editor.model})`);
    synthesis = {
      agent: "lead_editor",
      label: AGENTS.lead_editor.label,
      model: AGENTS.lead_editor.model,
      report: await chatJson({
        credentials,
        model: AGENTS.lead_editor.model,
        system: AGENTS.lead_editor.system,
        user: `Synthesize visibility audit for ${payload.site}.

Rule issues: ${JSON.stringify(payload.ruleIssues.slice(0, 25))}

Specialist reports:
${JSON.stringify(
  specialists.map((s) => ({ agent: s.agent, label: s.label, report: s.report })),
  null,
  2,
)}

Return JSON: overall_score, executive_summary, scores {seo, geo_aeo, design, cro}, top_10_actions, this_week, risks_if_ignored`,
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
    agents: Object.fromEntries(Object.entries(AGENTS).map(([k, v]) => [k, { label: v.label, model: v.model }])),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = payload.collectedAt.slice(0, 10);
  const base = join(OUT_DIR, `${stamp}-${args.scope}-visibility-audit`);
  writeFileSync(`${base}.json`, `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(`${base}.md`, renderMarkdown(result));

  console.log(`\nWrote ${base}.json`);
  console.log(`Wrote ${base}.md`);

  if (synthesis?.report?.executive_summary) {
    console.log(`\n--- Summary ---\n${synthesis.report.executive_summary}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
