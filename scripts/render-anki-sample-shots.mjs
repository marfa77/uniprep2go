#!/usr/bin/env node
/**
 * Render sample-card screenshots from the shipped .apkg: the note type's own template + CSS,
 * the real note fields, MathJax, headless Chrome. Picks default to src/data/sold-samples.json when those
 * are deck cards; otherwise the best cards are picked from the .apkg (src/lib/sample-pick.ts).
 *
 *   node scripts/render-anki-sample-shots.mjs --slug series-7-anki-deck            # preview in tmp/anki-shots/
 *   node scripts/render-anki-sample-shots.mjs --slug series-7-anki-deck --write    # public/samples + decks.ts
 *   node scripts/render-anki-sample-shots.mjs --slug X --front "Exact front text" --front ... --front ...
 *   --apkg <path>  override the built deck · --no-frame  card only (no Anki window chrome)
 *   --auto  ignore sold-samples and pick the best cards from the .apkg
 *   --publish  (with --write) push the new samples to Gumroad with the publisher for this deck type, then
 *              check:gumroad-sample-cdn — finance catalog · wave · building · authored landing (PTCB, ServSafe…)
 */
import { execFileSync, spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { pickSellingSamples } from "../src/lib/sample-pick.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ANKI = join(root, "..", "Anki Generator");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WIDTH = 500;
const HEIGHTS = [721, 900, 1080, 1260, 1440];
const MIN_SCALE = 0.85;

const AUTHORED_APKG = {
  "sie-exam-anki-deck": "out/finra/SIE_Exam_FULL_300.apkg",
  "series-7-anki-deck": "out/finra/Series_7_FULL_300.apkg",
  "series-63-anki-deck": "out/finra/Series_63_FULL_250.apkg",
  "servsafe-manager-anki-deck": "out/servsafe/ServSafe_Manager_FULL_300.apkg",
  "ptcb-pharmacy-technician-anki-deck": "out/ptcb/PTCB_Pharmacy_Tech_FULL_300.apkg",
  "cfa-level-1-anki-deck": "out/cfa/CFA_Level_1_FULL_348.apkg",
  "cfa-level-2-anki-deck": "out/cfa_level2/CFA_Level_2_FULL_495.apkg",
  "frm-part-1-anki-deck": "out/frm/FRM_Part_1_FULL_444.apkg",
  "life-and-health-insurance-exam-anki-deck": "out/insurance/Life_Health_Insurance_FULL_250.apkg",
  "property-casualty-insurance-exam-anki-deck": "out/insurance/Property_Casualty_Insurance_FULL_250.apkg",
  "california-real-estate-exam-anki-deck": "out/real_estate/California_Real_Estate_Salesperson_FULL_250.apkg",
};

function parseArgs(argv) {
  const args = { slug: null, apkg: null, fronts: [], write: false, frame: true, auto: false, publish: false };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--apkg") args.apkg = argv[++i];
    else if (argv[i] === "--front") args.fronts.push(argv[++i]);
    else if (argv[i] === "--auto") args.auto = true;
    else if (argv[i] === "--write") args.write = true;
    else if (argv[i] === "--no-frame") args.frame = false;
    else if (argv[i] === "--publish") args.publish = true;
  }
  if (!args.slug) throw new Error("--slug is required");
  if (args.publish && !args.write) throw new Error("--publish needs --write");
  return args;
}

function resolveApkg(slug) {
  if (AUTHORED_APKG[slug]) return join(ANKI, AUTHORED_APKG[slug]);
  for (const [specFile, dirs] of [
    ["wave_deck_specs.json", ["out/wave", "out/building"]],
    ["building_deck_specs.json", ["out/building"]],
  ]) {
    const path = join(ANKI, "internal_deck_generator", specFile);
    if (!existsSync(path)) continue;
    const spec = JSON.parse(readFileSync(path, "utf8"))[slug];
    if (!spec) continue;
    const hit = dirs
      .map((dir) => join(ANKI, dir, `${spec.filePrefix}_FULL_${spec.cardCount}.apkg`))
      .find((p) => existsSync(p));
    if (hit) return hit;
  }
  throw new Error(`no built .apkg for ${slug}; pass --apkg`);
}

const stripHtml = (html) =>
  html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/\s+/g, " ")
    .trim();
const norm = (text) => stripHtml(text).toLowerCase();

function loadDeck(apkg, workDir) {
  rmSync(workDir, { recursive: true, force: true });
  mkdirSync(workDir, { recursive: true });
  execFileSync("unzip", ["-q", "-o", apkg, "-d", workDir]);
  const dbFile = ["collection.anki21", "collection.anki2"].map((f) => join(workDir, f)).find(existsSync);
  if (!dbFile) throw new Error("apkg has no legacy collection (anki21b-only exports are not supported)");
  const db = new DatabaseSync(dbFile, { readOnly: true });
  const models = JSON.parse(db.prepare("select models from col").get().models);
  const notes = db.prepare("select id, mid, flds, tags from notes").all();
  db.close();

  const mediaDir = join(workDir, "m");
  mkdirSync(mediaDir, { recursive: true });
  const mediaMap = existsSync(join(workDir, "media")) ? JSON.parse(readFileSync(join(workDir, "media"), "utf8")) : {};
  for (const [num, name] of Object.entries(mediaMap)) {
    if (existsSync(join(workDir, num))) copyFileSync(join(workDir, num), join(mediaDir, name));
  }
  return { models, notes, mediaDir };
}

function renderTemplate(tpl, fields, frontSide = "") {
  let out = tpl;
  const section = /\{\{([#^])([^}]+)\}\}([\s\S]*?)\{\{\/\2\}\}/;
  for (let m = out.match(section); m; m = out.match(section)) {
    // Anki's field_is_empty: only whitespace, <br> and <div> tags count as empty (an <img> alone is content).
    const filled = !/^(?:\s|&nbsp;|<\/?(?:br|div)\s*\/?>)*$/i.test(fields[m[2].trim()] ?? "");
    out = out.replace(m[0], (m[1] === "#") === filled ? m[3] : "");
  }
  out = out.replace(/\{\{([^}]+)\}\}/g, (_, raw) => {
    // Anki drops extra opening braces, so legacy `{{{Image}}` renders the Image field.
    const key = raw.trim().replace(/^\{+/, "").trim();
    if (key === "FrontSide") return frontSide;
    const [filter, name] = key.includes(":") ? key.split(/:(.+)/) : [null, key];
    if (filter === "type" || filter?.startsWith("tts")) return "";
    const value = fields[name.trim()] ?? "";
    return filter === "text" ? stripHtml(value) : value;
  });
  return out.replace(/\[sound:[^\]]+\]/g, SOUND_BUTTON);
}

/** Anki desktop shows a round play button where a [sound:] tag sits. */
const SOUND_BUTTON =
  '<span class="replay-button" style="display:inline-block;vertical-align:middle;margin:4px"><svg width="40" height="40" viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="#fff" stroke="#6b7280" stroke-width="3"/><path d="M26 20 L46 32 L26 44 Z" fill="#374151"/></svg></span>';

const FRAME_CSS = `
html, body { margin: 0; width: ${WIDTH}px; height: 100vh; overflow: hidden; background: #1e1e1e; }
.win { display: flex; flex-direction: column; width: ${WIDTH}px; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif; }
.titlebar { position: relative; height: 28px; background: #2b2b2b; color: #b5b5b5; font-size: 13px; font-weight: 600; text-align: center; line-height: 28px; }
.titlebar i { position: absolute; top: 8px; width: 12px; height: 12px; border-radius: 50%; }
.titlebar i:nth-child(1) { left: 10px; background: #ff5f57; } .titlebar i:nth-child(2) { left: 30px; background: #febc2e; } .titlebar i:nth-child(3) { left: 50px; background: #28c840; }
.toolbar { display: flex; justify-content: center; padding: 0 0 6px; background: #eef3f8; }
.toolbar div { display: flex; gap: 26px; padding: 6px 22px; border-radius: 0 0 12px 12px; background: #9aa3ad; color: #fff; font-size: 15px; font-weight: 700; }
.toolbar span:last-child { color: #bfdbfe; }
.stage { flex: 1; overflow: hidden; position: relative; }
.stage > .card { min-height: 100%; box-sizing: border-box; }
.answerbar { display: flex; justify-content: space-around; padding: 6px 18px 10px; background: #2a2a2a; color: #e5e5e5; font-size: 12px; text-align: center; }
.answerbar b { display: block; margin-top: 3px; padding: 5px 0; width: 92px; border-radius: 9px; background: #5a5a5a; font-size: 13px; font-weight: 500; }
`;

/** Anki's light-mode reviewer defaults; deck CSS loads after and overrides them. */
const ANKI_DEFAULT_CARD_CSS = `.card { background-color: #fff; color: #000; padding: 20px; font-size: 20px; }`;

const BARE_CSS = `html, body { margin: 0; width: ${WIDTH}px; height: 100vh; overflow: hidden; }
.stage { width: ${WIDTH}px; height: 100vh; overflow: hidden; } .stage > .card { min-height: 100%; box-sizing: border-box; }`;
const MARK_CSS = `#qa-fit { transform-origin: top center; }
#fit-mark { display: none; position: fixed; left: 0; top: 0; width: 3px; height: 3px; background: #ff00ff; z-index: 9; }`;

function pageHtml({ css, answerHtml, mediaDir, frame }) {
  const stage = `<div class="stage"><div class="card card1" id="qa"><div id="qa-fit">${answerHtml}</div></div></div><div id="fit-mark"></div>`;
  const body = frame
    ? `<div class="win"><div class="titlebar"><i></i><i></i><i></i>Anki</div>
<div class="toolbar"><div><span>Decks</span><span>Add</span><span>Browse</span><span>Stats</span><span>Sync</span></div></div>
${stage}
<div class="answerbar">${[["<1m", "Again"], ["<6m", "Hard"], ["<10m", "Good"], ["4d", "Easy"]]
        .map(([t, l]) => `<div>${t.replace("<", "&lt;")}<b>${l}</b></div>`)
        .join("")}</div></div>`
    : stage;
  return `<!doctype html><html><head><meta charset="utf-8"><base href="file://${mediaDir}/">
<style>${ANKI_DEFAULT_CARD_CSS}</style><style>${css}</style><style>${frame ? FRAME_CSS : BARE_CSS}${MARK_CSS}</style>
<script>
window.MathJax = { tex: { inlineMath: [["\\\\(", "\\\\)"]], displayMath: [["\\\\[", "\\\\]"]] }, svg: { fontCache: "global" },
  startup: { pageReady: () => MathJax.startup.defaultPageReady().then(fit) } };
function fit() {
  const stage = document.querySelector(".stage"), card = document.getElementById("qa");
  const ratio = stage.clientHeight / card.scrollHeight;
  if (ratio < 1) document.getElementById("qa-fit").style.transform = "scale(" + Math.max(ratio, ${MIN_SCALE}) + ")";
  if (ratio < ${MIN_SCALE}) document.getElementById("fit-mark").style.display = "block";
}
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" async></script>
</head><body>${body}<script>if (!/\\\\[\\[(]/.test(document.body.innerHTML)) fit();</script></body></html>`;
}

async function shoot(htmlPath, pngPath, profileDir, height) {
  rmSync(pngPath, { force: true });
  // Headless Chrome on macOS can stay alive after writing the screenshot: wait for the file, then stop it.
  const chrome = spawn(
    CHROME,
    [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
      `--user-data-dir=${profileDir}`, `--window-size=${WIDTH},${height}`, "--virtual-time-budget=15000",
      "--allow-file-access-from-files", "--force-device-scale-factor=2", `--screenshot=${pngPath}`, `file://${htmlPath}`,
    ],
    { stdio: "ignore", detached: true },
  );
  let exited = false;
  chrome.on("exit", () => (exited = true));
  const deadline = Date.now() + 60_000;
  let lastSize = -1;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 400));
    const size = existsSync(pngPath) ? statSync(pngPath).size : 0;
    if ((size > 0 && size === lastSize) || exited) break;
    lastSize = size;
  }
  if (!exited) process.kill(-chrome.pid, "SIGKILL");
  if (!existsSync(pngPath)) throw new Error(`Chrome produced no screenshot for ${htmlPath}`);
  const { data } = await sharp(pngPath).extract({ left: 1, top: 1, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  return data[0] > 240 && data[1] < 20 && data[2] > 240 ? "overflow" : "ok";
}

function sampleCardsBlock(indent, slug, cards) {
  const pad = " ".repeat(indent);
  const rows = cards.map(
    (card, i) =>
      `${pad}  {\n${pad}    question: ${JSON.stringify(card.question)},\n${pad}    answer:\n${pad}      ${JSON.stringify(
        card.answer,
      )},\n${pad}    imageUrl: "/samples/${slug}-sample-${i + 1}.webp",\n${pad}  },`,
  );
  return `sampleCards: [\n${rows.join("\n")}\n${pad}],`;
}

/** Wave/planned decks are generated from specs (not literal decks.ts entries): their sample text lives in JSON. */
function writeShotsJson(slug, cards) {
  const file = join(root, "src/data/deck-sample-shots.json");
  const topics = readJson(join(root, "src/data/wave-deck-specs.json"))[slug]?.topics ?? {};
  const shots = readJson(file);
  shots[slug] = cards.map((card) => {
    const topic = card.tags.find((tag) => topics[tag]);
    return { question: card.question, answer: card.answer, ...(topic ? { topic: topics[topic] } : {}) };
  });
  const sorted = Object.fromEntries(Object.entries(shots).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`);
}

function writeDeckSampleCards(slug, cards) {
  const file = join(root, "src/lib/decks.ts");
  const src = readFileSync(file, "utf8");
  const at = src.indexOf(`slug: "${slug}"`);
  if (at < 0) return writeShotsJson(slug, cards);
  const nextSlug = src.indexOf('slug: "', at + 7);
  const start = src.indexOf("sampleCards: [", at);
  if (start < 0 || (nextSlug > 0 && start > nextSlug)) throw new Error(`decks.ts ${slug} has no sampleCards`);
  let depth = 0;
  let end = start + "sampleCards: ".length;
  for (; end < src.length; end += 1) {
    if (src[end] === "[") depth += 1;
    else if (src[end] === "]" && --depth === 0) break;
  }
  if (src[end + 1] === ",") end += 1;
  const indent = start - src.lastIndexOf("\n", start) - 1;
  writeFileSync(file, src.slice(0, start) + sampleCardsBlock(indent, slug, cards) + src.slice(end + 1));
}

const stemOf = (front) => front.match(/<div class="mcq-stem">([\s\S]*?)<\/div>/)?.[1] ?? front;

function noteScore(note) {
  const [front = "", back = ""] = note.flds.split("\x1f");
  const q = stripHtml(stemOf(front));
  const a = stripHtml(back);
  if (/\(Drill \d+\)|disclaimer|legal-intro/i.test(front + back)) return 0;
  if (q.length < 30 || q.length > 240 || a.length < 40 || a.length > 650) return 0;
  let score = 50;
  if (/^(how|why|when|which|what happens|what must|a |an )/i.test(q)) score += 10;
  if (/^what is\b/i.test(q) && q.length < 60) score -= 15;
  if (/\d/.test(a)) score += 5;
  if (/class="(example|mistake|formula)"/.test(back)) score += 5;
  return score;
}

function autoPick(slug, notes) {
  return pickSellingSamples(notes, {
    count: Math.min(9, notes.length),
    score: noteScore,
    text: (n) => stripHtml(stemOf(n.flds.split("\x1f")[0])),
    topic: (n) => n.tags.trim().split(/\s+/).find((t) => /\d|-/.test(t)) ?? "",
    seed: `${slug}:apkg`,
  });
}

async function renderNote({ note, models, mediaDir, work, index, frame }) {
  const model = models[String(note.mid)];
  const values = note.flds.split("\x1f");
  const fields = Object.fromEntries(model.flds.map((f, k) => [f.name, values[k] ?? ""]));
  const tmpl = model.tmpls[0];
  const answerHtml = renderTemplate(tmpl.afmt, fields, renderTemplate(tmpl.qfmt, fields));
  const htmlPath = join(work, `sample-${index}.html`);
  const pngPath = join(work, `sample-${index}.png`);
  writeFileSync(htmlPath, pageHtml({ css: model.css, answerHtml, mediaDir, frame }));
  let fit = "overflow";
  for (const height of HEIGHTS) {
    const profile = mkdtempSync(join(tmpdir(), "anki-shot-"));
    fit = await shoot(htmlPath, pngPath, profile, height).finally(() => rmSync(profile, { recursive: true, force: true }));
    if (fit === "ok") break;
  }
  const back = fields.Back ?? fields.Answer ?? values[1] ?? "";
  return {
    fit,
    question: stripHtml(stemOf(values[0])),
    answer: stripHtml(back.split(/<div\b/i)[0]) || stripHtml(back),
    tags: note.tags.trim().split(/\s+/),
    png: pngPath,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const apkg = args.apkg ?? resolveApkg(args.slug);
  const work = join(root, "tmp/anki-shots", args.slug);
  const { models, notes, mediaDir } = loadDeck(apkg, join(work, "apkg"));
  const findNote = (front) =>
    notes.find((n) => norm(stemOf(n.flds.split("\x1f")[0])) === norm(front)) ??
    notes.find((n) => n.flds.split("\x1f").some((f) => norm(stemOf(f)) === norm(front))) ??
    notes.find((n) => norm(stemOf(n.flds.split("\x1f")[0])).startsWith(norm(front)));

  const fronts = args.fronts.length
    ? args.fronts
    : args.auto
      ? []
      : (JSON.parse(readFileSync(join(root, "src/data/sold-samples.json"), "utf8"))[args.slug] ?? []).map((r) => r.q);
  let candidates = fronts.map(findNote);
  const explicit = args.fronts.length > 0;
  if (explicit && candidates.some((n) => !n)) throw new Error(`card not found in ${apkg}: ${fronts[candidates.indexOf(undefined)]}`);
  if (!explicit && (candidates.length !== 3 || candidates.some((n) => !n))) {
    // Deck samples must be real deck cards: when sold-samples are mock items, pick from the .apkg itself.
    candidates = autoPick(args.slug, notes);
    console.log(`picks: auto from ${apkg.split("/").pop()} (${notes.length} notes)`);
  }

  const cards = [];
  for (const note of candidates) {
    if (cards.length === 3) break;
    const card = await renderNote({ note, models, mediaDir, work, index: cards.length + 1, frame: args.frame });
    if (card.fit === "overflow") {
      if (explicit) throw new Error(`card too tall for one screenshot, pick another: ${card.question}`);
      continue;
    }
    cards.push(card);
    console.log(`${cards.length}. ${card.question}\n   ${card.png}`);
  }
  if (cards.length < 3) throw new Error(`only ${cards.length} cards fit one screenshot`);

  if (!args.write) return;
  for (const [i, card] of cards.entries()) {
    await sharp(card.png).webp({ quality: 90 }).toFile(join(root, "public/samples", `${args.slug}-sample-${i + 1}.webp`));
  }
  writeDeckSampleCards(args.slug, cards);
  console.log(`wrote public/samples/${args.slug}-sample-{1,2,3}.webp + decks.ts sampleCards`);
  if (!args.publish) return;
  const command = publishCommand(args.slug);
  if (!command) {
    console.log(`publish: ${args.slug} has no live Gumroad product — nothing to publish`);
    return;
  }
  console.log(`publish: ${command.join(" ")}`);
  execFileSync(command[0], command.slice(1), { cwd: root, stdio: "inherit" });
  execFileSync("node", ["scripts/check-gumroad-sample-cdn.mjs"], { cwd: root, stdio: "inherit" });
}

function readJson(path) {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
}

function publishCommand(slug) {
  const live = (catalog) => Boolean(readJson(join(root, "src/data/gumroad", catalog)).products?.[slug]?.gumroadProductId);
  const inSpec = (file) => Boolean(readJson(join(ANKI, "internal_deck_generator", file))[slug]);
  const decks = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const at = decks.indexOf(`slug: "${slug}"`);
  const chunk = at < 0 ? "" : decks.slice(at, at + 12000);
  const checkout = chunk.match(/checkoutUrl:\s*"([^"]+)"/)?.[1] ?? "";
  if (live("finance-anki-decks.json") || /category:\s*"finance"/.test(chunk.slice(0, 4000))) {
    return ["node", "scripts/publish-finance-gumroad-polish.mjs", "--slug", slug, "--refresh-samples"];
  }
  if (inSpec("wave_deck_specs.json")) {
    return live("wave-anki-decks.json") ? ["node", "scripts/setup-gumroad-wave-decks.mjs", "--slug", slug, "--polish-only"] : null;
  }
  if (inSpec("building_deck_specs.json")) {
    return live("building-anki-decks.json")
      ? ["python3", "scripts/publish-building-gumroad-landings.py", "--slug", slug, "--force-cdn"]
      : null;
  }
  return /gumroad\.com\/l\//.test(checkout) ? ["node", "scripts/publish-authored-gumroad-samples.mjs", "--slug", slug] : null;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
