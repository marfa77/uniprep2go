/**
 * Studio Product Card thumbs: gpt-image-1-mini, 1024→600, no text.
 *
 *   node scripts/generate-gumroad-studio-thumbs.mjs
 *   node scripts/generate-gumroad-studio-thumbs.mjs --slug in-real-estate-anki-deck
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(root, "public/gumroad-thumbnails");
const CIPLE_ENV = join(root, "../CIPLE A2/ciple-master/.env.local");
const SIZE = 600;

const STYLE = `Professional studio product shot for a digital flashcard shop tile.
Square 1:1, dark navy studio background, soft warm key light from the left, slight vignette.
An iPad standing slightly angled. The screen shows a blank cream flashcard — empty, no UI, no buttons.
Matte, slightly clay-smooth materials, adult editorial. Not toy, not Roblox cubes, not a cluttered photoreal desk.
No people, no faces, no flags, no logos, no watermarks.
CRITICAL: absolutely no text, letters, numbers, words, labels, or symbols anywhere in the image.`;

const PILOTS = [
  {
    slug: "in-real-estate-anki-deck",
    prop: "Beside the tablet: a brass house key and a small simple house model. No writing on the house or key.",
  },
  {
    slug: "german-a2-for-russian-speakers-anki-deck",
    prop: "Beside the tablet: a closed hardcover book with a plain cloth cover. No title, no letters on the spine.",
  },
  {
    slug: "swiss-citizenship-anki-deck",
    prop: "Beside the tablet: a closed burgundy passport booklet. No coat of arms, no letters, no numbers.",
  },
  {
    slug: "_plate-finance",
    prop: "Beside the tablet: a small neat stack of blank cream flashcards, slightly fanned. No writing on the cards.",
  },
  {
    slug: "_plate-health",
    prop: "Beside the tablet: a simple matte stethoscope, coiled, no logos or writing.",
  },
  {
    slug: "_plate-building",
    prop: "Beside the tablet: a small matte construction hard hat and a plain rolled blueprint tube. No logos or writing.",
  },
];

function loadEnvKey(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(CIPLE_ENV)) return "";
  for (const line of readFileSync(CIPLE_ENV, "utf8").split("\n")) {
    const t = line.trim();
    if (!t.startsWith(`${name}=`)) continue;
    let value = t.slice(name.length + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value;
  }
  return "";
}

async function generatePng(prompt) {
  const apiKey = loadEnvKey("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY missing (CIPLE A2 .env.local)");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1-mini",
      prompt,
      size: "1024x1024",
      quality: "low",
      n: 1,
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 240)}`);
  }
  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI returned no image");
  return Buffer.from(b64, "base64");
}

const only = process.argv.find((a) => a.startsWith("--slug="))?.slice(7);
const rows = only ? PILOTS.filter((p) => p.slug === only) : PILOTS;
if (!rows.length) throw new Error(`unknown slug ${only}`);

mkdirSync(OUT_DIR, { recursive: true });
for (const row of rows) {
  const prompt = `${STYLE}\n${row.prop}`;
  console.log("generate", row.slug);
  const png = await generatePng(prompt);
  const jpg = await sharp(png)
    .resize(SIZE, SIZE, { fit: "cover" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  const out = join(OUT_DIR, `${row.slug}.jpg`);
  writeFileSync(out, jpg);
  console.log("wrote", out, jpg.length);
}
