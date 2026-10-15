#!/usr/bin/env node
/**
 * Render selling assets for a CFA formula reference PDF from the shipped file itself:
 *   tmp/cfa{n}-formula-ref/assets/gumroad-cover.png   page 1 (Gumroad main image)
 *   public/samples/{slug}-sample-{1,2,3}.webp         three real pages (site + Gumroad gallery)
 *   public/covers/{slug}.webp                         1005×561 site cover built from the real counts
 *
 * Usage: node scripts/formula-reference/render-formula-reference-assets.mjs --level 1 --pages 21,34,38 [--write]
 * Without --write, everything lands in tmp/cfa{n}-formula-ref/assets/ for review.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]?.startsWith("--") ? true : all[i + 1] ?? true]] : acc), []),
);
const level = String(args.level ?? "");
if (!["1", "2"].includes(level)) throw new Error("--level 1|2 required");
const pages = String(args.pages ?? "").split(",").map(Number).filter(Boolean);
if (pages.length !== 3) throw new Error("--pages a,b,c (three PDF page numbers) required");

const slug = `cfa-level-${level}-formula-reference-2026`;
const work = join(root, `tmp/cfa${level}-formula-ref`);
const pdf = args.pdf ? resolve(args.pdf) : join(work, `out/CFA_L${level}_Formula_Reference_2026.pdf`);
const outDir = join(work, "assets");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const data = JSON.parse(readFileSync(join(root, `scripts/formula-reference/cfa-level-${level}-2026.json`), "utf8"));
const topics = Object.values(data.topics);
const sum = (k) => topics.reduce((s, t) => s + (t[k]?.length ?? 0), 0);
const counts = { formulas: sum("formulas"), definitions: sum("definitions"), drill: sum("drill") };
const totalPages = Number(/Pages:\s+(\d+)/.exec(execFileSync("pdfinfo", [pdf], { encoding: "utf8" }))[1]);

function renderPage(page, width, file) {
  const base = join(outDir, `raw-${page}`);
  execFileSync("pdftoppm", ["-f", String(page), "-l", String(page), "-singlefile", "-png", "-scale-to-x", String(width), "-scale-to-y", "-1", pdf, base]);
  copyFileSync(`${base}.png`, file);
  rmSync(`${base}.png`);
}

renderPage(1, 1275, join(outDir, "gumroad-cover.png"));
for (const [i, page] of pages.entries()) {
  const png = join(outDir, `sample-${i + 1}.png`);
  renderPage(page, 1400, png);
  await sharp(png).webp({ quality: 88 }).toFile(join(outDir, `${slug}-sample-${i + 1}.webp`));
}

const pagePng = join(outDir, "page1-thumb.png");
renderPage(1, 900, pagePng);
const roman = level === "1" ? "I" : "II";
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1005px;height:561px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;display:flex;background:#f7f3ea;overflow:hidden}
.l{width:560px;padding:44px 48px;display:flex;flex-direction:column}
.brand{font-size:13px;font-weight:600;color:#14213d;letter-spacing:.02em}
.pill{margin-top:22px;align-self:flex-start;background:#14213d;color:#fff;font-size:11px;letter-spacing:.12em;padding:6px 12px;border-radius:999px}
h1{margin-top:18px;font-size:44px;line-height:1.05;color:#14213d;letter-spacing:-.01em}
.sub{margin-top:14px;font-size:17px;color:#4b5563;line-height:1.4}
.stats{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.s{background:#fff;border:1px solid #e5dfd0;border-radius:10px;padding:12px 14px}
.s b{display:block;font-size:28px;color:#14213d}
.s span{font-size:12px;color:#6b7280}
.r{flex:1;background:linear-gradient(160deg,#1e3a64,#0f1f38);position:relative}
.r img{position:absolute;width:330px;left:56px;top:46px;transform:rotate(3deg);box-shadow:0 18px 40px rgba(0,0,0,.45);border-radius:3px}
</style></head><body>
<div class="l">
  <div class="brand">UniPrep2Go</div>
  <div class="pill">PRINTABLE PDF · ${totalPages} PAGES</div>
  <h1>CFA Level ${level}<br>Formula Reference 2026</h1>
  <div class="sub">Every Level ${roman} formula typeset with when to use it and the exam trap, plus a recall drill with an explained key.</div>
  <div class="stats">
    <div class="s"><b>${counts.formulas}</b><span>formulas</span></div>
    <div class="s"><b>${counts.definitions}</b><span>definitions</span></div>
    <div class="s"><b>${counts.drill}</b><span>drill questions</span></div>
  </div>
</div>
<div class="r"><img src="file://${pagePng}"></div>
</body></html>`;
const coverHtml = join(outDir, "site-cover.html");
writeFileSync(coverHtml, html);
const shot = join(outDir, "site-cover@2x.png");
const res = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--force-device-scale-factor=2",
  "--window-size=1005,561", `--screenshot=${shot}`, `file://${coverHtml}`], { stdio: "ignore", timeout: 60000 });
if (res.status !== 0) throw new Error("chrome screenshot failed");
await sharp(shot).resize(1005, 561).webp({ quality: 90 }).toFile(join(outDir, `${slug}.webp`));

if (args.write) {
  for (let i = 1; i <= 3; i++) copyFileSync(join(outDir, `${slug}-sample-${i}.webp`), join(root, `public/samples/${slug}-sample-${i}.webp`));
  copyFileSync(join(outDir, `${slug}.webp`), join(root, `public/covers/${slug}.webp`));
}
console.log(JSON.stringify({ slug, pdf, totalPages, counts, samplePages: pages, assets: readdirSync(outDir), written: Boolean(args.write) }, null, 1));
