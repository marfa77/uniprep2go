import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const GENERATOR_MODEL =
  process.env.MOCK_BANK_GENERATOR_MODEL ?? "anthropic/claude-sonnet-4";
export const VALIDATOR_MODEL =
  process.env.MOCK_BANK_VALIDATOR_MODEL ?? "google/gemini-2.5-flash";

const ENV_PATHS = [
  join(ROOT, ".env.local"),
  join(ROOT, ".env"),
  join(ROOT, "../Anki Generator/internal_deck_generator/.env"),
  join(ROOT, "../CIPLE A2/ciple-master/.env.local"),
];

function parseEnvFile(path) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function loadEnvFiles() {
  for (const path of ENV_PATHS) {
    parseEnvFile(path);
  }
}

export function getOpenRouterApiKey() {
  loadEnvFiles();
  return process.env.OPENROUTER_API_KEY?.trim() || "";
}

export function loadCredentials() {
  loadEnvFiles();
  const openRouterApiKey = getOpenRouterApiKey();

  if (!openRouterApiKey) {
    throw new Error("Set OPENROUTER_API_KEY in .env.local");
  }

  return { openRouterApiKey };
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1].trim() : text.trim();
  return JSON.parse(raw);
}

async function chatJsonOpenRouter({
  openRouterApiKey,
  model,
  system,
  user,
  maxTokens,
  temperature,
}) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://uniprep2go.study",
      "X-Title": "UniPrep2Go Mock Bank Generator",
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      max_tokens: maxTokens,
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`OpenRouter ${response.status} (${model}): ${body.slice(0, 500)}`);
  }

  const payload = JSON.parse(body);
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(`OpenRouter empty response (${model})`);
  }

  return { data: extractJson(content), provider: "openrouter", modelId: model };
}

/** JSON chat via OpenRouter only. */
export async function chatJson({
  credentials,
  model,
  system,
  user,
  maxTokens = 4096,
  temperature = 0.4,
  role = "llm",
}) {
  const { openRouterApiKey } = credentials ?? loadCredentials();

  const result = await chatJsonOpenRouter({
    openRouterApiKey,
    model,
    system,
    user,
    maxTokens,
    temperature,
  });

  if (process.env.MOCK_BANK_LOG_PROVIDER === "1") {
    console.log(`  [${role}] openrouter/${result.modelId}`);
  }

  return result.data;
}

/** @deprecated use loadCredentials */
export function loadApiKeys() {
  const { openRouterApiKey } = loadCredentials();
  return openRouterApiKey;
}
