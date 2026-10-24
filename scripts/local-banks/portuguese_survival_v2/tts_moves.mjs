#!/usr/bin/env node
/**
 * Google Cloud pt-PT TTS for Survival v2 moves.
 * Creds: CIPLE .env.local GOOGLE_SERVICE_ACCOUNT_JSON_TTS (fallback GOOGLE_SERVICE_ACCOUNT_JSON).
 * Voices: say/repair → Wavenet-E (learner); hear → Wavenet-F (other speaker).
 *
 *   node scripts/local-banks/portuguese_survival_v2/tts_moves.mjs
 *   node …/tts_moves.mjs --limit 5
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");
const MOVES = path.join(ROOT, "tmp/portuguese-survival-v2/moves.json");
const MEDIA = path.join(
  "/Users/pavelveselov/Projects/Anki Generator/out/prep2go_Portuguese_Survival_v2/media"
);
const CIPLE_ENV = "/Users/pavelveselov/Projects/CIPLE A2/ciple-master/.env.local";
const CIPLE_NM = "/Users/pavelveselov/Projects/CIPLE A2/ciple-master/node_modules";

const PT_F = "pt-PT-Wavenet-E";
const PT_M = "pt-PT-Wavenet-F";

function loadEnvJson(file, key) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const prefix = `${key}=`;
  for (const line of lines) {
    if (!line.startsWith(prefix)) continue;
    let v = line.slice(prefix.length).trim();
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      v = v.slice(1, -1);
    }
    // env stores literal \n inside the JSON private_key string
    return v;
  }
  return null;
}

function parseArgs() {
  const a = process.argv.slice(2);
  let limit = 0;
  let force = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--limit") limit = Number(a[++i]) || 0;
    if (a[i] === "--force") force = true;
  }
  return { limit, force };
}

async function main() {
  const { limit, force } = parseArgs();
  const credsRaw =
    loadEnvJson(CIPLE_ENV, "GOOGLE_SERVICE_ACCOUNT_JSON_TTS") ||
    loadEnvJson(CIPLE_ENV, "GOOGLE_SERVICE_ACCOUNT_JSON");
  if (!credsRaw) {
    console.error("No Google TTS credentials in CIPLE .env.local");
    process.exit(1);
  }
  const credentials = JSON.parse(credsRaw);
  const privateKey = String(credentials.private_key || "").replace(/\\n/g, "\n");
  if (!credentials.client_email || !privateKey.includes("BEGIN")) {
    console.error("TTS credentials missing client_email/private_key");
    process.exit(1);
  }

  const require = createRequire(path.join(CIPLE_NM, "package.json"));
  const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
  const client = new TextToSpeechClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: privateKey,
    },
  });

  const moves = JSON.parse(fs.readFileSync(MOVES, "utf8"));
  fs.mkdirSync(MEDIA, { recursive: true });
  const list = limit > 0 ? moves.slice(0, limit) : moves;

  let ok = 0;
  let skip = 0;
  let fail = 0;
  for (const m of list) {
    const out = path.join(MEDIA, `${m.id}.mp3`);
    if (!force && fs.existsSync(out) && fs.statSync(out).size > 200) {
      skip++;
      continue;
    }
    const voiceName = m.type === "hear" ? PT_M : PT_F;
    try {
      const [response] = await client.synthesizeSpeech({
        input: { text: m.audio_text },
        voice: { languageCode: "pt-PT", name: voiceName },
        audioConfig: { audioEncoding: "MP3", sampleRateHertz: 24000 },
      });
      const buf = Buffer.from(response.audioContent);
      if (!buf.length) throw new Error("empty audio");
      fs.writeFileSync(out, buf);
      ok++;
      if (ok % 25 === 0) console.log(`… ${ok} synthesized`);
    } catch (e) {
      fail++;
      console.warn("FAIL", m.id, e instanceof Error ? e.message : e);
    }
  }
  console.log(JSON.stringify({ ok, skip, fail, total: list.length, media: MEDIA }));
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
