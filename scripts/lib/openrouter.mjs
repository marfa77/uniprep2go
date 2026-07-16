import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const ENV_LOCAL_PATH = join(ROOT, ".env.local");
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
  join(ROOT, "../PixID3/.env.local"),
  join(ROOT, "../UAEPropertyAIBot/.env.local"),
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

function persistOpenRouterKeyToEnvLocal(token) {
  const normalized = token?.trim();
  if (!normalized) return false;

  let content = existsSync(ENV_LOCAL_PATH) ? readFileSync(ENV_LOCAL_PATH, "utf8") : "";
  const line = `OPENROUTER_API_KEY=${normalized}`;
  if (/^OPENROUTER_API_KEY=/m.test(content)) {
    content = content.replace(/^OPENROUTER_API_KEY=.*$/m, line);
  } else {
    const suffix = content.length > 0 && !content.endsWith("\n") ? "\n" : "";
    content = `${content}${suffix}${line}\n`;
  }
  writeFileSync(ENV_LOCAL_PATH, content, { encoding: "utf8", mode: 0o600 });
  process.env.OPENROUTER_API_KEY = normalized;
  return true;
}

export function getOpenRouterApiKey() {
  loadEnvFiles();
  const key = process.env.OPENROUTER_API_KEY?.trim() || "";
  if (key) {
    // Keep uniprep2go .env.local in sync when key was found in a sibling project.
    const local = existsSync(ENV_LOCAL_PATH) ? readFileSync(ENV_LOCAL_PATH, "utf8") : "";
    if (!/^OPENROUTER_API_KEY=.+/m.test(local)) {
      persistOpenRouterKeyToEnvLocal(key);
    }
  }
  return key;
}

export function loadCredentials() {
  const openRouterApiKey = getOpenRouterApiKey();

  if (!openRouterApiKey) {
    throw new Error(
      "OPENROUTER_API_KEY not found. Add to .env.local or a sibling project env (CIPLE/PixID). Scripts auto-sync into uniprep2go .env.local.",
    );
  }

  return { openRouterApiKey };
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1].trim() : text.trim();
  try {
    return JSON.parse(raw);
  } catch (error) {
    const objectMatch = raw.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }
    throw error;
  }
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
