/**
 * Resolve Gumroad access token reliably for local scripts.
 *
 * Order:
 * 1. process.env.GUMROAD_ACCESS_TOKEN
 * 2. uniprep2go .env.local / .env
 * 3. ~/.config/gumroad/config.json (gumroad CLI store)
 * 4. `gumroad auth token`
 *
 * Optionally sync the resolved token into .env.local so agents/scripts
 * that only read dotenv keep working.
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const ENV_LOCAL_PATH = join(ROOT, ".env.local");
const ENV_PATH = join(ROOT, ".env");
const CLI_CONFIG_PATH = join(homedir(), ".config/gumroad/config.json");

function parseEnvFile(path) {
  if (!existsSync(path)) {
    return {};
  }

  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
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
    out[key] = value;
  }
  return out;
}

function readCliConfigToken() {
  try {
    if (!existsSync(CLI_CONFIG_PATH)) {
      return "";
    }
    const config = JSON.parse(readFileSync(CLI_CONFIG_PATH, "utf8"));
    return typeof config.access_token === "string" ? config.access_token.trim() : "";
  } catch {
    return "";
  }
}

function readCliCommandToken() {
  try {
    return execSync("gumroad auth token", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return "";
  }
}

export function loadLocalEnvFiles(targetEnv = process.env) {
  for (const file of [ENV_LOCAL_PATH, ENV_PATH]) {
    const parsed = parseEnvFile(file);
    for (const [key, value] of Object.entries(parsed)) {
      if (!targetEnv[key]) {
        targetEnv[key] = value;
      }
    }
  }
  return targetEnv;
}

/**
 * @returns {{ token: string, source: "env" | "env.local" | "env.file" | "cli-config" | "cli-command" | "" }}
 */
export function resolveGumroadAccessToken() {
  const fromProcess = process.env.GUMROAD_ACCESS_TOKEN?.trim();
  if (fromProcess) {
    return { token: fromProcess, source: "env" };
  }

  const local = parseEnvFile(ENV_LOCAL_PATH).GUMROAD_ACCESS_TOKEN?.trim();
  if (local) {
    process.env.GUMROAD_ACCESS_TOKEN = local;
    return { token: local, source: "env.local" };
  }

  const dotenv = parseEnvFile(ENV_PATH).GUMROAD_ACCESS_TOKEN?.trim();
  if (dotenv) {
    process.env.GUMROAD_ACCESS_TOKEN = dotenv;
    return { token: dotenv, source: "env.file" };
  }

  const fromConfig = readCliConfigToken();
  if (fromConfig) {
    process.env.GUMROAD_ACCESS_TOKEN = fromConfig;
    return { token: fromConfig, source: "cli-config" };
  }

  const fromCommand = readCliCommandToken();
  if (fromCommand) {
    process.env.GUMROAD_ACCESS_TOKEN = fromCommand;
    return { token: fromCommand, source: "cli-command" };
  }

  return { token: "", source: "" };
}

export function persistGumroadTokenToEnvLocal(token) {
  const normalized = token?.trim();
  if (!normalized) {
    return false;
  }

  let content = existsSync(ENV_LOCAL_PATH) ? readFileSync(ENV_LOCAL_PATH, "utf8") : "";
  const line = `GUMROAD_ACCESS_TOKEN=${normalized}`;

  if (/^GUMROAD_ACCESS_TOKEN=/m.test(content)) {
    content = content.replace(/^GUMROAD_ACCESS_TOKEN=.*$/m, line);
  } else {
    const suffix = content.length > 0 && !content.endsWith("\n") ? "\n" : "";
    content = `${content}${suffix}${line}\n`;
  }

  writeFileSync(ENV_LOCAL_PATH, content, { encoding: "utf8", mode: 0o600 });
  process.env.GUMROAD_ACCESS_TOKEN = normalized;
  return true;
}

/**
 * Resolve token and sync into .env.local when it was only available via CLI.
 * Safe to call at the start of any Gumroad script.
 */
export function ensureGumroadAccessToken({ persist = true } = {}) {
  const resolved = resolveGumroadAccessToken();

  if (!resolved.token) {
    return resolved;
  }

  if (
    persist &&
    (resolved.source === "cli-config" || resolved.source === "cli-command")
  ) {
    persistGumroadTokenToEnvLocal(resolved.token);
  }

  return resolved;
}
