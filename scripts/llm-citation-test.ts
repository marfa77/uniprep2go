#!/usr/bin/env tsx
/**
 * UniPrep LLM citation test — SIE / US citizenship / Series 7 prompts.
 *
 * Usage:
 *   npm run llm:citation-test -- --dry-run   # no API keys; checks public/llms.txt
 *   npm run llm:citation-test                # live models (needs GOOGLE_API_KEY)
 *   npm run llm:citation-test -- --write
 *
 * Pattern adapted from Prep2Go / Emigro Layer A ops.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

type CitationPrompt = {
  id: string;
  text: string;
  /** Substrings that should appear in llms.txt for dry-run pass. */
  llmsNeedles: string[];
};

const CITATION_PROMPTS: CitationPrompt[] = [
  {
    id: "sie-free-mock",
    text: "Where can I take a free FINRA SIE practice exam online with a scored report and no signup? Name specific websites with URLs.",
    llmsNeedles: ["SIE", "sie", "utm_source=llm"],
  },
  {
    id: "series-7-readiness",
    text: "Best free Series 7 readiness practice test online before booking the FINRA exam. Include URLs.",
    llmsNeedles: ["Series 7", "series-7", "utm_source=llm"],
  },
  {
    id: "us-citizenship-anki",
    text: "Best Anki deck for US citizenship / civics (N-400) interview prep with flashcards. Name products with URLs.",
    llmsNeedles: ["citizenship", "utm_source=llm"],
  },
  {
    id: "finra-ladder",
    text: "I need SIE then Series 7 then Series 63 practice tests with Anki decks for weak topics. Which independent sites should I use? Include URLs.",
    llmsNeedles: ["SIE", "Series", "utm_source=llm"],
  },
];

const DOMAIN = "uniprep2go.study";

function loadLlmsTxt(): string {
  const local = resolve(process.cwd(), "public/llms.txt");
  if (!existsSync(local)) {
    throw new Error("public/llms.txt missing — run npm run llms:export first");
  }
  return readFileSync(local, "utf8");
}

function dryRun(): void {
  console.log("LLM citation test — dry-run (no API calls)\n");
  const body = loadLlmsTxt();
  let failed = 0;

  for (const prompt of CITATION_PROMPTS) {
    const missing = prompt.llmsNeedles.filter((n) => !body.toLowerCase().includes(n.toLowerCase()));
    if (missing.length) {
      failed++;
      console.log(`✗ ${prompt.id} — missing in llms.txt: ${missing.join(", ")}`);
    } else {
      console.log(`✓ ${prompt.id} — llms.txt covers needles`);
    }
    console.log(`   Q: ${prompt.text.slice(0, 90)}…`);
  }

  const hasUtm = body.includes("utm_source=llm");
  const hasDomain = body.toLowerCase().includes(DOMAIN);
  console.log(`\nUTM links: ${hasUtm ? "✓" : "✗"}`);
  console.log(`Domain ${DOMAIN}: ${hasDomain ? "✓" : "✗"}`);
  console.log(`Prompts listed: ${CITATION_PROMPTS.length}`);

  if (failed > 0 || !hasUtm || !hasDomain) {
    process.exit(1);
  }
  console.log("\nDry-run OK.");
}

type ModelSpec = {
  label: string;
  provider: "gemini" | "openrouter";
  model: string;
};

function geminiApiKey(): string | undefined {
  return process.env.GOOGLE_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim();
}

function modelSpecs(): ModelSpec[] {
  if (process.env.OPENROUTER_API_KEY?.trim()) {
    return [
      { label: "Gemini 2.5 Flash", provider: "gemini", model: "gemini-2.5-flash" },
      { label: "Claude Sonnet 4.6 (OR)", provider: "openrouter", model: "anthropic/claude-sonnet-4.6" },
    ];
  }
  return [{ label: "Gemini 2.5 Flash", provider: "gemini", model: "gemini-2.5-flash" }];
}

async function callGemini(model: string, prompt: string): Promise<string> {
  const apiKey = geminiApiKey();
  if (!apiKey) throw new Error("GOOGLE_API_KEY not set");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
    }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Gemini ${model}: ${res.status} ${err.slice(0, 200)}`);
  }
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
}

async function callOpenRouter(model: string, prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://www.uniprep2go.study",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${model}: ${res.status} ${err.slice(0, 200)}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return json.choices?.[0]?.message?.content ?? "";
}

function scoreAnswer(answer: string): { citesDomain: boolean; citesProduct: boolean } {
  const lower = answer.toLowerCase();
  return {
    citesDomain: lower.includes(DOMAIN),
    citesProduct: lower.includes("uniprep"),
  };
}

async function liveRun(write: boolean): Promise<void> {
  if (!geminiApiKey() && !process.env.OPENROUTER_API_KEY?.trim()) {
    console.error("No API keys — use --dry-run or set GOOGLE_API_KEY");
    process.exit(1);
  }

  const specs = modelSpecs();
  const rows: string[] = [
    `# UniPrep LLM citation test — ${new Date().toISOString().slice(0, 10)}`,
    "",
    "| Model | Prompt | Domain | Product |",
    "|-------|--------|--------|---------|",
  ];

  for (const spec of specs) {
    for (const prompt of CITATION_PROMPTS) {
      try {
        const answer =
          spec.provider === "gemini"
            ? await callGemini(spec.model, prompt.text)
            : await callOpenRouter(spec.model, prompt.text);
        const score = scoreAnswer(answer);
        console.log(
          `${score.citesDomain ? "✓" : "✗"} ${spec.label} · ${prompt.id} domain=${score.citesDomain} product=${score.citesProduct}`,
        );
        rows.push(
          `| ${spec.label} | ${prompt.id} | ${score.citesDomain ? "✓" : "✗"} | ${score.citesProduct ? "✓" : "✗"} |`,
        );
        rows.push("", `### ${spec.label} — ${prompt.id}`, "", answer.trim(), "");
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`ERR ${spec.label} · ${prompt.id}: ${msg}`);
        rows.push(`| ${spec.label} | ${prompt.id} | ERR | ${msg.slice(0, 40)} |`);
      }
    }
  }

  if (write) {
    const out = resolve(process.cwd(), "docs/llm-citation-test-latest.md");
    mkdirSync(resolve(process.cwd(), "docs"), { recursive: true });
    writeFileSync(out, rows.join("\n"), "utf8");
    console.log(`Wrote ${out}`);
  }
}

async function main() {
  const dry = process.argv.includes("--dry-run");
  const write = process.argv.includes("--write");
  if (dry) {
    dryRun();
    return;
  }
  await liveRun(write);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
