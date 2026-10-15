#!/usr/bin/env node
/**
 * Build the CFA Level 1 / Level 2 Formula Reference 2026 PDFs
 * (Gumroad: cfa-level-1-formula-reference-2026, cfa-level-2-formula-reference-2026).
 *
 *   node scripts/formula-reference/build-cfa-formula-reference.mjs --level 1|2 [--chunks <dir>] [--out <pdf>]
 *
 * Data: scripts/formula-reference/cfa-level-{1,2}-2026.json (topic chunks merged with --chunks).
 * HTML + KaTeX → headless Chrome print-to-pdf. Two passes: the second fills contents-page numbers
 * read back from the first PDF with pdftotext.
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const katex = require("katex");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const KATEX_CSS = join(root, "node_modules/katex/dist/katex.min.css");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]?.startsWith("--") ? true : all[i + 1] ?? true]] : acc), []),
);

const LEVELS = {
  1: {
    n: "1",
    roman: "I",
    deckCards: 348,
    mockNote: "Ethics-weighted like the real exam, scored by topic so you see where to spend the next week. The 25-question version is free, no sign-up.",
    deckNote: "Scenario cards weighted to the 2026 topic ranges, each with a worked example and the common mistake. Spaced repetition on your phone for the formulas and Standards in this PDF.",
    scope: "Scope: the 2026 CFA® Level I topic outline. This is a recall companion — it does not replace the CFA Institute curriculum or full-length practice exams. Level II material (option Greeks, Black–Scholes–Merton, residual income, multiple-regression diagnostics) is deliberately left out.",
    sample: ["FI", /duration and convexity/i],
    drillSample: "PM",
    topics: [
      { key: "QM", title: "Quantitative Methods", weight: "6–9%" },
      { key: "ECON", title: "Economics", weight: "6–9%" },
      { key: "CF", title: "Corporate Issuers", weight: "6–9%" },
      { key: "FRA", title: "Financial Statement Analysis", weight: "11–14%" },
      { key: "EQUITY", title: "Equity Investments", weight: "11–14%" },
      { key: "FI", title: "Fixed Income", weight: "11–14%" },
      { key: "DERIV", title: "Derivatives", weight: "5–8%" },
      { key: "AI", title: "Alternative Investments", weight: "7–10%" },
      { key: "PM", title: "Portfolio Management", weight: "8–12%" },
      { key: "ETHICS", title: "Ethical and Professional Standards", weight: "15–20%", ethics: true },
    ],
  },
  2: {
    n: "2",
    roman: "II",
    deckCards: 495,
    mockNote: "Item-set style questions across all ten topics, scored by topic so you see which vignettes cost you points. The 25-question version is free, no sign-up.",
    deckNote: "Vignette-depth cards for the 45 Level II learning modules, each with a worked example and the common mistake. Spaced repetition on your phone for the formulas in this PDF.",
    scope: "Scope: the 2026 CFA® Level II topic outline (45 learning modules). Level I basics that Level II takes as given are not repeated. This is a recall companion — it does not replace the CFA Institute curriculum or item-set practice.",
    sample: ["EV", /residual income/i],
    drillSample: "DI",
    topics: [
      { key: "QM", title: "Quantitative Methods", weight: "5–10%" },
      { key: "ECO", title: "Economics", weight: "5–10%" },
      { key: "FSA", title: "Financial Statement Analysis", weight: "10–15%" },
      { key: "CI", title: "Corporate Issuers", weight: "5–10%" },
      { key: "EV", title: "Equity Valuation", weight: "10–15%" },
      { key: "FI", title: "Fixed Income", weight: "10–15%" },
      { key: "DI", title: "Derivatives", weight: "5–10%" },
      { key: "AI", title: "Alternative Investments", weight: "5–10%" },
      { key: "PM", title: "Portfolio Management", weight: "10–15%" },
      { key: "ETH", title: "Ethical and Professional Standards", weight: "10–15%", ethics: true },
    ],
  },
};
const L = LEVELS[args.level || "1"];
if (!L) throw new Error("--level must be 1 or 2");
const NAME = `CFA Level ${L.n} Formula Reference 2026`;
const DATA = join(root, `scripts/formula-reference/cfa-level-${L.n}-2026.json`);
const OUT = resolve(root, args.out || `tmp/cfa${L.n}-formula-ref/out/CFA_L${L.n}_Formula_Reference_2026.pdf`);
const WORK = join(dirname(OUT), "build");
const TOPICS = L.topics;
const ETH = TOPICS.find((t) => t.ethics);

if (args.chunks) {
  const dir = resolve(root, args.chunks);
  const merged = { title: NAME, topics: {} };
  for (const t of TOPICS) {
    const f = join(dir, `${t.key}.json`);
    if (!existsSync(f)) throw new Error(`missing chunk ${f}`);
    merged.topics[t.key] = JSON.parse(readFileSync(f, "utf8"));
  }
  writeFileSync(DATA, JSON.stringify(merged, null, 1) + "\n");
}
const data = JSON.parse(readFileSync(DATA, "utf8"));

const escRaw = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Prose fields use ASCII math (PV_0, R_t, e^r, (1+r)^{-N}): typeset those as sub/superscripts.
const hasGips = (c) => (c.definitions ?? []).some((d) => /GIPS/.test(d.group));
const GREEK = { pi: "π", sigma: "σ", rho: "ρ", lambda: "λ", omega: "ω", theta: "θ", epsilon: "ε", tau: "τ", mu: "μ" };
const esc = (s) =>
  escRaw(s)
    .replace(/(?<![\\\p{L}])(pi|sigma|rho|lambda|omega|theta|epsilon|tau|mu)(?!\p{L})/gu, (m) => GREEK[m])
    .replace(/(?<=[\p{L}\p{N})\]])\^\(([^()]{1,12})\)/gu, "<sup>$1</sup>")
    .replace(/(?<![\\\p{L}])Delta ?(?=\p{L}{1,2}(?!\p{L})|Yield|Curve|PV|%)/gu, "Δ")
    .replace(/(?<=\s)x(?=\s)/g, "×")
    .replace(/(?<=[\p{L}\p{N})\]])_([+-])(?![\p{L}\p{N}])/gu, "<sub>$1</sub>")
    .replace(/(?<=[\p{L}\p{N})\]])_\{([^}]{1,20})\}/gu, "<sub>$1</sub>")
    .replace(/(?<=[\p{L}\p{N})\]])_([\p{L}\p{N}]{1,12})/gu, "<sub>$1</sub>")
    .replace(/(?<=[\p{L}\p{N})\]])\^\{([^}]{1,20})\}/gu, "<sup>$1</sup>")
    .replace(/(?<=[\p{L}\p{N})\]])\^(-?[\p{L}\p{N}.]{1,8})/gu, "<sup>$1</sup>");
const tex = (s) => katex.renderToString(s, { displayMode: true, throwOnError: true, strict: "ignore", output: "html" });
const inlineVars = (s) => esc(s);

function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const formulaTopics = TOPICS.filter((t) => !t.ethics);
const counts = {
  formulas: formulaTopics.reduce((n, t) => n + data.topics[t.key].formulas.length, 0),
  definitions: TOPICS.reduce((n, t) => n + data.topics[t.key].definitions.length, 0),
  standards: data.topics[ETH.key].standards.length,
  drill: formulaTopics.reduce((n, t) => n + data.topics[t.key].drill.length, 0),
};

// Drill: balanced answer letters (n/4 each), seeded so the PDF is stable between builds.
const drillItems = formulaTopics.flatMap((t) => data.topics[t.key].drill.map((q) => ({ ...q, topic: t })));
const rand = rng(`cfa-l${L.n}-2026-drill`);
const letters = shuffle(Array.from({ length: drillItems.length }, (_, i) => "ABCD"[i % 4]), rand);
drillItems.forEach((q, i) => {
  const f = data.topics[q.topic.key].formulas.find((x) => x.id === q.formulaId);
  const wrong = shuffle(q.distractors, rand);
  const k = "ABCD".indexOf(letters[i]);
  q.options = [...wrong.slice(0, k), f.name, ...wrong.slice(k)];
  q.answer = letters[i];
  q.n = i + 1;
  q.formula = f;
});

function topicHeader(t, i, extra) {
  return `<header class="topic-head" id="sec-${t.key}">
  <div class="topic-num">${String(i + 1).padStart(2, "0")}</div>
  <div class="topic-title"><h2>${esc(t.title)}</h2><div class="topic-meta">2026 exam weight ${t.weight} · ${extra}</div></div>
</header>`;
}

function groupBy(list) {
  const groups = [];
  for (const item of list) {
    let g = groups.find((x) => x.name === item.group);
    if (!g) groups.push((g = { name: item.group, items: [] }));
    g.items.push(item);
  }
  return groups;
}

function definitionsBlock(defs, title = "Key definitions") {
  return `<section class="defs"><h3>${title}</h3><div class="def-grid">${defs
    .map((d) => `<div class="def"><div class="def-term">${esc(d.term)}</div><div class="def-text">${esc(d.def)}</div></div>`)
    .join("")}</div></section>`;
}

function formulaSection(t, i) {
  const c = data.topics[t.key];
  const rows = groupBy(c.formulas)
    .map(
      (g) => `<tr class="grp"><td colspan="3">${esc(g.name)}</td></tr>` +
        g.items
          .map(
            (f) => `<tr class="row" id="f-${f.id}">
  <td class="c-name"><div class="f-name">${esc(f.name)}</div><div class="f-use">${esc(f.use)}</div></td>
  <td class="c-math"><div class="math">${tex(f.latex)}</div>${f.vars ? `<div class="f-vars">${inlineVars(f.vars)}</div>` : ""}</td>
  <td class="c-trap"><span class="trap-tag">Trap</span> ${esc(f.trap)}</td>
</tr>`,
          )
          .join(""),
    )
    .join("");
  return `<section class="topic">${topicHeader(t, i, `${c.formulas.length} formulas · ${c.definitions.length} definitions`)}
<table class="ftable"><thead><tr><th>Concept &amp; when to use it</th><th>Formula</th><th>Exam trap</th></tr></thead><tbody>${rows}</tbody></table>
${definitionsBlock(c.definitions)}</section>`;
}

function ethicsSection(i) {
  const t = ETH;
  const c = data.topics[ETH.key];
  const roman = (code) => code.split("(")[0];
  const groupNames = {
    I: "I · Professionalism",
    II: "II · Integrity of Capital Markets",
    III: "III · Duties to Clients",
    IV: "IV · Duties to Employers",
    V: "V · Investment Analysis, Recommendations, and Actions",
    VI: "VI · Conflicts of Interest",
    VII: "VII · Responsibilities as a CFA Institute Member or CFA Candidate",
  };
  let last = "";
  const rows = c.standards
    .map((s) => {
      const g = roman(s.code);
      const head = g !== last ? `<tr class="grp"><td colspan="3">${esc(groupNames[g])}</td></tr>` : "";
      last = g;
      return `${head}<tr class="row"><td class="s-code"><b>${esc(s.code)}</b><div class="s-name">${esc(s.name)}</div></td><td class="s-req">${esc(s.requires)}</td><td class="c-trap"><span class="trap-tag">Trap</span> ${esc(s.trap)}</td></tr>`;
    })
    .join("");
  const gips = hasGips(c);
  return `<section class="topic">${topicHeader(t, i, `Code of Ethics · ${c.standards.length} Standards${gips ? " · GIPS" : ""}`)}
<div class="code-box"><h3>Code of Ethics — members and candidates must</h3><ol>${c.code.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
<table class="ftable stable"><thead><tr><th>Standard</th><th>What it requires</th><th>Exam trap</th></tr></thead><tbody>${rows}</tbody></table>
${definitionsBlock(c.definitions, gips ? "Framework &amp; GIPS essentials" : "Applying the Standards")}</section>`;
}

function drillSection() {
  const qs = formulaTopics
    .map((t) => {
      const items = drillItems
        .filter((q) => q.topic.key === t.key)
        .map(
          (q) => `<div class="q"><div class="q-n">${q.n}</div><div class="q-body"><div class="q-math">${tex(q.drillLatex)}</div><ol class="opts">${q.options
            .map((o, k) => `<li><b>${"ABCD"[k]}</b> ${esc(o)}</li>`)
            .join("")}</ol></div></div>`,
        )
        .join("");
      return `<h3 class="drill-topic">${esc(t.title)}</h3><div class="qgrid">${items}</div>`;
    })
    .join("");
  return `<section class="drill" id="sec-DRILL"><header class="topic-head alt"><div class="topic-num">✎</div><div class="topic-title"><h2>Formula Recall Drill</h2><div class="topic-meta">${counts.drill} questions · see the formula, name the concept · answers on the next pages</div></div></header>
<p class="lead">Cover the tables and time yourself: about 30 seconds per question. Each wrong option is a formula from the same topic that looks alike — the same confusion the exam exploits. Score by topic, then reread the tables where you missed.</p>
${qs}</section>`;
}

function keySection() {
  const rows = formulaTopics
    .map((t) => {
      const items = drillItems
        .filter((q) => q.topic.key === t.key)
        .map((q) => `<div class="k"><span class="k-n">${q.n}</span> <b class="k-a">${q.answer}</b> <b>${esc(q.formula.name)}.</b> ${esc(q.why)}</div>`)
        .join("");
      return `<h3 class="drill-topic">${esc(t.title)}</h3><div class="keys">${items}</div>`;
    })
    .join("");
  const tally = formulaTopics
    .map((t) => {
      const qs = drillItems.filter((q) => q.topic.key === t.key);
      return `<tr><td>${esc(t.title)}</td><td>${qs[0].n}–${qs[qs.length - 1].n}</td><td>${qs.length}</td><td class="blank"></td></tr>`;
    })
    .join("");
  return `<section class="key" id="sec-KEY"><header class="topic-head alt"><div class="topic-num">✓</div><div class="topic-title"><h2>Answer Key &amp; Explanations</h2><div class="topic-meta">Why the right concept fits — and why the closest look-alike does not</div></div></header>
<table class="tally"><thead><tr><th>Topic</th><th>Questions</th><th>Total</th><th>Your score</th></tr></thead><tbody>${tally}</tbody></table>
${rows}</section>`;
}

function contents(pages) {
  const entries = [
    ...TOPICS.map((t, i) => {
      const c = data.topics[t.key];
      const sub = t.ethics ? `Code of Ethics · Standards I(A)–VII(B)${hasGips(c) ? " · GIPS" : ""}` : groupBy(c.formulas).map((g) => g.name).join(" · ");
      return { id: `sec-${t.key}`, n: String(i + 1).padStart(2, "0"), title: t.title, weight: t.weight, sub };
    }),
    { id: "sec-DRILL", n: "✎", title: "Formula Recall Drill", weight: "", sub: `${counts.drill} questions with same-topic look-alike options` },
    { id: "sec-KEY", n: "✓", title: "Answer Key & Explanations", weight: "", sub: "Score sheet by topic + explanation for every question" },
  ];
  return `<section class="toc" id="sec-TOC"><h2>Contents</h2><ol class="toc-list">${entries
    .map(
      (e) => `<li><a href="#${e.id}"><span class="toc-n">${e.n}</span><span class="toc-main"><span class="toc-title">${esc(e.title)}</span>${e.weight ? `<span class="toc-w">${e.weight}</span>` : ""}<span class="toc-sub">${esc(e.sub)}</span></span><span class="toc-p">${pages?.[e.id] ?? "00"}</span></a></li>`,
    )
    .join("")}</ol>
<div class="howto">
  <h3>How to use this reference</h3>
  <div class="steps">
    <div><b>1 · Map</b>Skim one topic before you study it, so you know which formulas you must own and which traps the exam sets.</div>
    <div><b>2 · Review</b>After each study block, read the trap column out loud. Most lost points come from the right formula applied the wrong way.</div>
    <div><b>3 · Test</b>In the final weeks, cover the tables and run the ${counts.drill}-question drill under time. Reread only the rows you missed.</div>
  </div>
  <p class="scope">${L.scope}</p>
</div></section>`;
}

function cover() {
  const weightRows = TOPICS.map((t) => {
    const c = data.topics[t.key];
    const what = t.ethics ? `${c.standards.length} Standards${hasGips(c) ? " + GIPS" : ""}` : `${c.formulas.length} formulas`;
    return `<tr><td>${esc(t.title)}</td><td>${t.weight}</td><td>${what}</td></tr>`;
  }).join("");
  const pool = data.topics[L.sample[0]].formulas;
  const sample = pool.find((f) => L.sample[1].test(f.name)) || pool[0];
  const drillSample = drillItems.find((q) => q.topic.key === L.drillSample) || drillItems[0];
  return `<section class="cover">
  <div class="cover-top">
    <div class="badge">2026 exam cycle · CFA® Level ${L.roman}</div>
    <h1>CFA Level ${L.n}<br>Formula Reference</h1>
    <p class="cover-sub">Every Level ${L.n} formula in one place, with the exam trap next to it.</p>
    <div class="stats">
      <div><b>${counts.formulas}</b><span>typeset formulas</span></div>
      <div><b>${counts.definitions}</b><span>key definitions</span></div>
      <div><b>${counts.standards}</b><span>Ethics Standards</span></div>
      <div><b>${counts.drill}</b><span>recall drill questions</span></div>
    </div>
  </div>
  <div class="cover-body">
    <div class="cover-left">
      <h3>Inside, by 2026 topic weight</h3>
      <table class="wt"><thead><tr><th>Topic</th><th>Weight</th><th>In this PDF</th></tr></thead><tbody>${weightRows}</tbody></table>
    </div>
    <div class="cover-right">
      <h3>Every row looks like this</h3>
      <div class="demo">
        <div class="f-name">${esc(sample.name)}</div>
        <div class="math">${tex(sample.latex)}</div>
        <div class="f-use">${esc(sample.use)}</div>
        <div class="demo-trap"><span class="trap-tag">Trap</span> ${esc(sample.trap)}</div>
      </div>
      <h3 class="mt">Then test recall</h3>
      <div class="demo">
        <div class="q-math">${tex(drillSample.drillLatex)}</div>
        <ol class="opts">${drillSample.options.map((o, k) => `<li><b>${"ABCD"[k]}</b> ${esc(o)}</li>`).join("")}</ol>
        <div class="f-use">Drill question ${drillSample.n} of ${counts.drill} · every wrong option is a same-topic look-alike</div>
      </div>
      <ul class="cover-points">
        <li>Grouped by the official 2026 learning modules</li>
        <li>Clickable contents · prints cleanly on Letter or A4</li>
        <li>Pairs with the ${L.deckCards}-card CFA Level ${L.n} Anki deck</li>
      </ul>
    </div>
  </div>
  <footer class="cover-foot">UniPrep2Go · independent exam prep · uniprep2go.study<br>
  CFA® and Chartered Financial Analyst® are registered trademarks owned by CFA Institute. CFA Institute does not endorse, promote, or warrant the accuracy or quality of this product.</footer>
</section>`;
}

function backPage() {
  return `<section class="back" id="sec-END"><h2>Keep going</h2>
<div class="back-grid">
  <div><h3>Free 60-question timed mock</h3><p>${L.mockNote}</p><p class="url">uniprep2go.study/mock-exams/cfa-level-${L.n}-readiness-check</p></div>
  <div><h3>CFA Level ${L.n} Anki deck — ${L.deckCards} cards</h3><p>${L.deckNote}</p><p class="url">uniprep2go.study/decks/cfa-level-${L.n}-anki-deck</p></div>
</div>
<p class="fine">Built ${new Date().toISOString().slice(0, 10)} for the 2026 CFA® Level ${L.roman} topic outline. Found an error? Write to the address on your Gumroad receipt — corrected files are free for buyers.<br>
CFA Institute does not endorse, promote, or warrant the accuracy or quality of this product. CFA® and Chartered Financial Analyst® are registered trademarks owned by CFA Institute.</p></section>`;
}

const CSS = `
@page { size: Letter; margin: 0.55in 0.5in 0.6in 0.5in;
  @bottom-left { content: "CFA® Level ${L.n} Formula Reference 2026 · uniprep2go.study"; font: 7.5pt "Helvetica Neue", Helvetica, Arial, sans-serif; color: #6b7280; }
  @bottom-right { content: counter(page); font: 600 8pt "Helvetica Neue", Helvetica, Arial, sans-serif; color: #0f2340; } }
@page :first { margin: 0; @bottom-left { content: none; } @bottom-right { content: none; } }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111827; font-size: 8.4pt; line-height: 1.32; }
h1, h2, h3 { margin: 0; }
.katex { font-size: 1.12em; }
.katex-display { margin: 0; }
.katex-display > .katex { text-align: left; }
.cover-body h3.mt { margin-top: 14px; }
:root { --navy: #0f2340; --blue: #1d4ed8; --ink: #111827; --muted: #4b5563; --line: #d6dbe4; --tint: #f3f6fb; --trap: #b42318; --trapbg: #fef3f2; }

.cover { width: 8.5in; height: 11in; display: flex; flex-direction: column; break-after: page; }
.cover-top { background: var(--navy); color: #fff; padding: 0.7in 0.7in 0.45in; }
.badge { display: inline-block; border: 1px solid rgba(255,255,255,.45); border-radius: 999px; padding: 4px 12px; font-size: 8.5pt; letter-spacing: .06em; text-transform: uppercase; }
.cover h1 { font-size: 40pt; line-height: 1.05; font-weight: 700; margin: 18px 0 10px; letter-spacing: -.01em; }
.cover-sub { font-size: 14pt; margin: 0 0 26px; color: #c7d2fe; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.stats div { background: rgba(255,255,255,.08); border-radius: 8px; padding: 10px 12px; }
.stats b { display: block; font-size: 24pt; line-height: 1; }
.stats span { font-size: 8.5pt; color: #cbd5e1; }
.cover-body { flex: 1; display: grid; grid-template-columns: 1.05fr 1fr; gap: 0.3in; padding: 0.35in 0.7in 0.2in; }
.cover-body h3 { font-size: 10pt; color: var(--navy); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }
table.wt { width: 100%; border-collapse: collapse; font-size: 8.6pt; }
table.wt th { text-align: left; font-size: 7.5pt; color: var(--muted); font-weight: 600; border-bottom: 1.5px solid var(--navy); padding: 3px 4px; }
table.wt td { padding: 4.2px 4px; border-bottom: 1px solid var(--line); }
table.wt td:nth-child(2) { font-weight: 600; color: var(--blue); white-space: nowrap; }
table.wt td:nth-child(3) { color: var(--muted); white-space: nowrap; }
.demo { border: 1px solid var(--line); border-radius: 8px; padding: 12px 14px; background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,.03); }
.demo .math { margin: 8px 0; font-size: 1.05em; }
.demo-trap { margin-top: 8px; background: var(--trapbg); border-radius: 6px; padding: 6px 8px; color: #7a271a; }
.cover-points { margin: 14px 0 0; padding-left: 16px; color: var(--muted); }
.cover-points li { margin: 3px 0; }
.cover-foot { padding: 0.18in 0.7in 0.4in; font-size: 7.5pt; color: var(--muted); border-top: 1px solid var(--line); margin: 0 0.7in; padding-left: 0; padding-right: 0; }

.toc { break-after: page; }
.toc h2 { font-size: 20pt; color: var(--navy); margin-bottom: 10px; }
.toc-list { list-style: none; margin: 0; padding: 0; }
.toc-list a { display: flex; gap: 10px; align-items: baseline; padding: 6px 0; border-bottom: 1px solid var(--line); color: inherit; text-decoration: none; }
.toc-n { width: 24px; color: var(--blue); font-weight: 700; }
.toc-main { flex: 1; }
.toc-title { font-weight: 700; font-size: 10.5pt; color: var(--navy); }
.toc-w { margin-left: 8px; font-size: 8pt; color: var(--blue); font-weight: 600; }
.toc-sub { display: block; color: var(--muted); font-size: 7.8pt; margin-top: 1px; }
.toc-p { font-weight: 700; color: var(--navy); font-size: 10.5pt; }
.howto { margin-top: 16px; }
.howto h3 { font-size: 11pt; color: var(--navy); margin-bottom: 8px; }
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.steps div { background: var(--tint); border-radius: 8px; padding: 10px; }
.steps b { display: block; color: var(--navy); margin-bottom: 3px; font-size: 9.5pt; }
.scope { color: var(--muted); font-size: 7.8pt; margin-top: 10px; }

.topic { break-before: page; }
.topic-head { display: flex; align-items: center; gap: 12px; background: var(--navy); color: #fff; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; }
.topic-head.alt { background: #13315c; }
.topic-num { font-size: 20pt; font-weight: 700; color: #93c5fd; min-width: 34px; }
.topic-head h2 { font-size: 16pt; font-weight: 700; }
.topic-meta { font-size: 8.5pt; color: #c7d2fe; margin-top: 1px; }

table.ftable { width: 100%; border-collapse: collapse; table-layout: fixed; }
table.ftable thead { display: table-header-group; }
table.ftable th { text-align: left; font-size: 7pt; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); font-weight: 600; padding: 3px 6px; border-bottom: 1.5px solid var(--navy); }
table.ftable th:nth-child(1) { width: 31%; } table.ftable th:nth-child(2) { width: 41%; } table.ftable th:nth-child(3) { width: 28%; }
table.stable th:nth-child(1) { width: 22%; } table.stable th:nth-child(2) { width: 46%; } table.stable th:nth-child(3) { width: 32%; }
tr.grp td { padding: 9px 6px 3px; font-weight: 700; color: var(--blue); font-size: 8.4pt; text-transform: uppercase; letter-spacing: .04em; border-bottom: 1px solid #c7d2fe; break-after: avoid; }
tr.row { break-inside: avoid; }
tr.row td { padding: 5px 6px; border-bottom: 1px solid var(--line); vertical-align: middle; }
tr.row:nth-child(even) td { background: #fafbfd; }
.f-name { font-weight: 700; color: var(--navy); font-size: 8.8pt; }
.f-use { color: var(--muted); margin-top: 2px; font-size: 7.8pt; }
.c-math .math { overflow: visible; white-space: nowrap; }
.f-vars { color: var(--muted); font-size: 7pt; margin-top: 2px; }
.c-trap { font-size: 7.8pt; color: #3f3f46; }
.trap-tag { display: inline-block; background: var(--trapbg); color: var(--trap); font-weight: 700; font-size: 6.5pt; text-transform: uppercase; letter-spacing: .05em; border-radius: 3px; padding: 0 4px; margin-right: 2px; }
.s-code b { color: var(--navy); font-size: 9.5pt; }
.s-name { font-weight: 600; color: var(--ink); font-size: 8pt; }
.s-req { font-size: 8pt; }
.code-box { background: var(--tint); border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }
.code-box h3 { font-size: 9.5pt; color: var(--navy); margin-bottom: 3px; }
.code-box ol { margin: 0; padding-left: 18px; columns: 2; column-gap: 22px; }
.code-box li { margin: 2px 0; break-inside: avoid; }

.defs { margin-top: 12px; }
.defs h3 { font-size: 10.5pt; color: var(--navy); border-bottom: 1.5px solid var(--navy); padding-bottom: 3px; margin-bottom: 6px; break-after: avoid; }
.def-grid { columns: 2; column-gap: 18px; }
.def { break-inside: avoid; padding: 4px 0 5px; border-bottom: 1px solid var(--line); }
.def-term { font-weight: 700; color: var(--navy); }
.def-text { color: #374151; font-size: 8pt; }

.drill, .key { break-before: page; }
.lead { color: var(--muted); margin: 0 0 6px; }
.drill-topic { font-size: 9.5pt; color: var(--blue); text-transform: uppercase; letter-spacing: .05em; margin: 8px 0 4px; break-after: avoid; }
.qgrid { columns: 2; column-gap: 18px; }
.q { display: flex; gap: 8px; break-inside: avoid; border: 1px solid var(--line); border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; }
.q-n { font-weight: 700; color: var(--navy); min-width: 18px; }
.q-body { flex: 1; min-width: 0; }
.q-math { margin: 1px 0 4px; white-space: nowrap; }
.q-math .katex-display > .katex { text-align: left; }
.opts { list-style: none; margin: 0; padding: 0; font-size: 7.9pt; }
.opts li { margin: 1px 0; }
.opts b { display: inline-block; width: 13px; color: var(--blue); }
table.tally { width: 60%; border-collapse: collapse; margin: 2px 0 8px; font-size: 8pt; }
table.tally th { text-align: left; border-bottom: 1.5px solid var(--navy); padding: 2px 6px; font-size: 7pt; color: var(--muted); text-transform: uppercase; }
table.tally td { border-bottom: 1px solid var(--line); padding: 2.5px 6px; }
table.tally td.blank { border-bottom: 1px solid #9ca3af; }
.keys { columns: 2; column-gap: 18px; }
.k { break-inside: avoid; padding: 3px 0 4px; border-bottom: 1px solid var(--line); font-size: 7.8pt; }
.k-n { color: var(--muted); font-weight: 700; }
.k-a { display: inline-block; background: var(--navy); color: #fff; border-radius: 3px; padding: 0 4px; margin-right: 2px; }

.back { margin-top: 18px; break-inside: avoid; border-top: 2px solid var(--navy); padding-top: 12px; }
.back h2 { font-size: 16pt; color: var(--navy); margin-bottom: 10px; }
.back-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.back-grid div { background: var(--tint); border-radius: 8px; padding: 14px; }
.back-grid h3 { font-size: 11pt; color: var(--navy); margin-bottom: 6px; }
.url { font-weight: 700; color: var(--blue); }
.fine { margin-top: 18px; color: var(--muted); font-size: 7.5pt; }
`;

// Shrink formulas wider than their cell instead of letting them overflow the column.
const FIT = `<script>
function fit(){
  for (const box of document.querySelectorAll('.c-math .math, .q-math, .demo .math')) {
    const k = box.querySelector('.katex'); if (!k) continue;
    let size = 100;
    while (k.scrollWidth > box.clientWidth + 1 && size > 62) { size -= 3; k.style.fontSize = (1.12 * size / 100) + 'em'; }
    if (k.scrollWidth > box.clientWidth + 1) document.title += ' OVERFLOW';
    if (k.scrollWidth > box.clientWidth + 1) box.setAttribute('data-overflow', '1');
  }
  document.body.setAttribute('data-fit', 'done');
}
document.fonts.ready.then(fit);
</script>`;

function html(pages) {
  const sections = TOPICS.map((t, i) => (t.ethics ? ethicsSection(i) : formulaSection(t, i))).join("\n");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${NAME} — UniPrep2Go</title>
<link rel="stylesheet" href="file://${KATEX_CSS}"><style>${CSS}</style></head><body>
${cover()}${contents(pages)}${sections}${drillSection()}${keySection()}${backPage()}${FIT}</body></html>`;
}

async function printPdf(htmlPath, pdfPath) {
  rmSync(pdfPath, { force: true });
  const chrome = spawn(
    CHROME,
    ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--allow-file-access-from-files",
      "--no-pdf-header-footer", "--virtual-time-budget=15000", "--run-all-compositor-stages-before-draw",
      `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`],
    { stdio: "ignore", detached: true },
  );
  let exited = false;
  chrome.on("exit", () => (exited = true));
  for (let i = 0; i < 240 && !exited; i++) await new Promise((r) => setTimeout(r, 250));
  if (!exited) process.kill(-chrome.pid, "SIGKILL");
  if (!existsSync(pdfPath)) throw new Error("Chrome produced no PDF");
}

function sectionPages(pdfPath) {
  const n = Number(/Pages:\s+(\d+)/.exec(execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" }))[1]);
  const pages = {};
  const want = [
    ...TOPICS.map((t) => [`sec-${t.key}`, t.title]),
    ["sec-DRILL", "Formula Recall Drill"],
    ["sec-KEY", "Answer Key & Explanations"],
  ];
  for (let p = 3; p <= n; p++) {
    const txt = execFileSync("pdftotext", ["-f", String(p), "-l", String(p), "-layout", pdfPath, "-"], { encoding: "utf8" });
    const head = txt.split("\n").slice(0, 6).join(" ").replace(/\s+/g, " ");
    for (const [id, title] of want) if (!pages[id] && head.includes(title)) pages[id] = p;
  }
  const missing = want.filter(([id]) => !pages[id]).map(([id]) => id);
  if (missing.length) throw new Error(`could not locate sections in PDF: ${missing.join(", ")}`);
  return { pages, total: n };
}

mkdirSync(WORK, { recursive: true });
const htmlPath = join(WORK, "reference.html");
writeFileSync(htmlPath, html(null));
await printPdf(htmlPath, OUT);
const { pages } = sectionPages(OUT);
writeFileSync(htmlPath, html(pages));
await printPdf(htmlPath, OUT);
const second = sectionPages(OUT);
for (const [id, p] of Object.entries(pages)) if (second.pages[id] !== p) throw new Error(`page drift for ${id}: ${p} → ${second.pages[id]}`);
const title = execFileSync("pdfinfo", [OUT], { encoding: "utf8" });
if (/OVERFLOW/.test(title)) console.warn("WARN: at least one formula still overflows its column at 62% size");
console.log(JSON.stringify({ out: OUT, pages: second.total, sections: second.pages, counts }, null, 1));
