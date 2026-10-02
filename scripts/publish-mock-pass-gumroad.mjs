#!/usr/bin/env node
/**
 * UniPrep2Go Mock Pass on Gumroad: cover, thumbnail, gallery, description, receipt, landing.
 *
 *   node scripts/publish-mock-pass-gumroad.mjs --assets-only   (render to tmp/mock-pass-gumroad/out, no API calls)
 *   node scripts/publish-mock-pass-gumroad.mjs --dry-run       (render + print what would change)
 *   node scripts/publish-mock-pass-gumroad.mjs                 (render + update the live product)
 *   node scripts/publish-mock-pass-gumroad.mjs --landing-only  (re-publish the custom landing with the current covers)
 *
 * Gallery frames are built from real screenshots of the mock runner in tmp/mock-pass-gumroad/raw-*.png
 * (landing, learn, report, paywall) captured from a local dev server.
 */

import { execFileSync, execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const WORK = join(root, "tmp/mock-pass-gumroad");
const OUT = join(WORK, "out");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PRODUCT_ID = "4oP7OGKWPk4Tlp2ayeOQ7w==";
const PERMALINK = "uniprep-mock-pass";
const PRODUCT_URL = `https://pixidstudio.gumroad.com/l/${PERMALINK}`;
const SITE = "https://uniprep2go.study";
const NAME = "UniPrep2Go Mock Pass — 5 Timed Practice Test Attempts (Any Exam)";
const SUMMARY =
  "5 attempts on any UniPrep2Go timed mock — Exam or Learn mode, full readiness report every time. Your first mock is always free.";
const TAGS = ["practice test", "mock exam", "exam prep", "finra", "cfa", "ptcb", "servsafe", "license exam"];
const EDUCATION_TAXONOMY_ID = "177";

const RECEIPT = `How to unlock your 5 mock attempts:

1. Copy the license key shown on this receipt.
2. Open any mock at ${SITE}/mock-exams (or go back to the tab you came from) and press Start.
3. Paste the key into "Have a key? Paste your Gumroad license key" and press Unlock attempts.

Each start of a mock, in Exam or Learn mode, uses one attempt. The topic readiness report and answer review are included every time. Attempts do not expire. On another phone or browser, paste the same key again: the attempts are shared, not doubled.

Questions or a key that will not unlock: support@uniprep2go.study`;

const CROPS = {
  landing: { src: "raw-landing.png", crop: "1630x990+1100+280" },
  learn: { src: "raw-learn.png", crop: "1790x1700+1020+40" },
  report: { src: "raw-report.png", crop: "1720x1860+1060+0" },
  paywall: { src: "raw-paywall.png", crop: "1630x1110+1100+95" },
};

const FAQ = [
  [
    "Is the first mock really free?",
    "Yes. Your first UniPrep2Go mock is free on any exam, in Exam or Learn mode, with no signup. The Mock Pass is only for attempts after that: retakes, a second exam, or switching modes.",
  ],
  [
    "What counts as one attempt?",
    "Starting a mock session, in Exam or Learn mode, uses one attempt. Reading your report or reviewing answers afterwards does not use another one. Leaving a session midway still counts as the attempt you started.",
  ],
  [
    "Which exams can I use it on?",
    "Any live UniPrep2Go mock (190+): FINRA SIE, Series 7 and Series 63, CFA Level 1, FRM Part 1, PTCB, ServSafe, Life & Health insurance, state real estate, EPA 608, LEED, citizenship tests and more. One key covers all of them.",
  ],
  [
    "Do attempts expire? Can I use another device?",
    "Attempts do not expire. Paste the same key on your phone or another browser and the remaining attempts follow you: they are shared, not doubled. No account is needed.",
  ],
  [
    "Can I buy more than 5 attempts?",
    "Yes. Set the quantity at checkout: 2 = 10 attempts, 3 = 15 attempts, and so on. One key holds all of them.",
  ],
  [
    "Is this official exam material?",
    "No. UniPrep2Go mocks are independent practice tests with original questions mapped to the published outlines. They are not affiliated with or endorsed by FINRA, NASAA, CFA Institute, GARP, PTCB, the NRA or any exam body.",
  ],
];

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function shoot(htmlPath, pngPath, width, height) {
  rmSync(pngPath, { force: true });
  const profile = join(WORK, ".chrome-profile");
  const chrome = spawn(
    CHROME,
    [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
      `--user-data-dir=${profile}`, `--window-size=${width},${height}`, "--virtual-time-budget=8000",
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
}

const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{width:100vw;height:100vh;overflow:hidden;background:#f7f3ea;color:#18140f;font-family:-apple-system,"SF Pro Display","Inter",system-ui,sans-serif}
.mono{font-family:ui-monospace,"SF Mono",Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:#1f3a5f}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(24,20,15,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(24,20,15,.05) 1px,transparent 1px);background-size:40px 40px}
`;

function coverHtml() {
  const exams = ["FINRA SIE", "Series 7", "Series 63", "CFA L1", "FRM", "PTCB", "ServSafe", "Life & Health", "Real estate", "EPA 608", "Citizenship"];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.wrap{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
h1{font-size:76px;line-height:1.02;font-weight:700;letter-spacing:-.02em;max-width:820px}
.sub{margin-top:22px;font-size:28px;line-height:1.35;color:#4f493e;max-width:760px}
.price{position:absolute;right:72px;top:64px;width:250px;height:250px;border-radius:28px;background:#18140f;color:#fffaf0;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 24px 60px rgba(24,20,15,.25)}
.price b{font-size:104px;line-height:1;font-weight:700}
.price span{margin-top:10px;font-size:22px;letter-spacing:.06em;text-transform:uppercase;color:#d9d0c0}
.chips{display:flex;flex-wrap:wrap;gap:10px;max-width:1140px}
.chip{border:1.5px solid rgba(24,20,15,.18);background:#fffaf0;border-radius:999px;padding:8px 16px;font-size:19px;font-weight:600}
.free{display:inline-block;margin-top:26px;background:#e3efe4;border:1.5px solid #9cc3a2;color:#22502c;border-radius:12px;padding:10px 18px;font-size:21px;font-weight:600}
</style></head><body><div class="grid"></div><div class="wrap">
<div><p class="mono" style="font-size:18px">UniPrep2Go · Mock Pass</p>
<h1 style="margin-top:20px">5 timed mock attempts.<br/>Any exam.</h1>
<p class="sub">Exam or Learn mode · full topic readiness report and answer review every time</p>
<p class="free">First mock always free on uniprep2go.study</p></div>
<div class="price"><b>$5</b><span>5 attempts</span></div>
<div class="chips">${exams.map((e) => `<span class="chip">${e}</span>`).join("")}<span class="chip" style="background:#18140f;color:#fffaf0;border-color:#18140f">190+ mocks</span></div>
</div></body></html>`;
}

function thumbHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.wrap{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
.badge{width:300px;height:300px;border-radius:40px;background:#18140f;color:#fffaf0;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(24,20,15,.25)}
.badge b{font-size:132px;line-height:1;font-weight:700}
.badge span{margin-top:8px;font-size:26px;letter-spacing:.08em;text-transform:uppercase;color:#d9d0c0}
h1{margin-top:34px;font-size:46px;font-weight:700;letter-spacing:-.01em}
p{margin-top:10px;font-size:24px;color:#4f493e}
</style></head><body><div class="grid"></div><div class="wrap">
<div class="badge"><b>$5</b><span>5 attempts</span></div>
<h1>Mock Pass</h1><p>Any UniPrep2Go mock · Exam or Learn</p>
</div></body></html>`;
}

function galleryHtml({ eyebrow, title, body, image, fit = "cover" }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.wrap{position:relative;height:100%;display:grid;grid-template-columns:400px 1fr;gap:44px;padding:56px 56px 56px 64px;align-items:center}
h2{margin-top:18px;font-size:44px;line-height:1.08;font-weight:700;letter-spacing:-.015em}
.body{margin-top:18px;font-size:21px;line-height:1.5;color:#4f493e}
.shot{height:608px;border-radius:22px;border:1.5px solid rgba(24,20,15,.14);background:#fffaf0;box-shadow:0 22px 60px rgba(24,20,15,.18);overflow:hidden;display:flex;align-items:flex-start;justify-content:center}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top center}
.shot.contain{align-items:center;padding:18px}
.shot.contain img{height:auto;object-fit:contain;border-radius:12px}
</style></head><body><div class="grid"></div><div class="wrap">
<div><p class="mono" style="font-size:16px">${escapeHtml(eyebrow)}</p><h2>${escapeHtml(title)}</h2><p class="body">${escapeHtml(body)}</p></div>
<div class="shot ${fit === "contain" ? "contain" : ""}"><img src="file://${image}"/></div>
</div></body></html>`;
}

const GALLERY = [
  {
    key: "learn",
    eyebrow: "Learn mode",
    title: "An explanation after every answer",
    body: "See why the right option is right and where the traps are, question by question. Untimed, built for fixing gaps.",
  },
  {
    key: "report",
    eyebrow: "Every attempt",
    title: "Topic readiness report",
    body: "Pass / no-pass verdict against the target, weakest topics first, and a full answer review. Never paywalled.",
  },
  {
    key: "landing",
    fit: "contain",
    eyebrow: "Exam or Learn",
    title: "Pick the mode on each attempt",
    body: "Timed Exam mode for a real sitting, or Learn mode with instant feedback. One Mock Pass covers both, on any exam.",
  },
  {
    key: "paywall",
    fit: "contain",
    eyebrow: "Unlock in seconds",
    title: "Paste your key, keep going",
    body: "Your Gumroad license key unlocks 5 attempts on any UniPrep2Go mock. No account, works on any device.",
  },
];

async function renderAssets() {
  mkdirSync(OUT, { recursive: true });
  for (const [key, { src, crop }] of Object.entries(CROPS)) {
    const from = join(WORK, src);
    if (!existsSync(from)) throw new Error(`missing screenshot ${from}`);
    execSync(`magick "${from}" -crop ${crop} +repage "${join(OUT, `crop-${key}.png`)}"`);
  }
  const jobs = [
    { name: "cover", html: coverHtml(), w: 1280, h: 720 },
    { name: "thumbnail", html: thumbHtml(), w: 600, h: 600 },
    ...GALLERY.map((g, i) => ({
      name: `gallery-${i + 1}-${g.key}`,
      html: galleryHtml({ ...g, image: join(OUT, `crop-${g.key}.png`) }),
      w: 1280,
      h: 720,
    })),
  ];
  const files = {};
  for (const job of jobs) {
    const htmlPath = join(OUT, `${job.name}.html`);
    const pngPath = join(OUT, `${job.name}.png`);
    writeFileSync(htmlPath, job.html);
    await shoot(htmlPath, pngPath, job.w, job.h);
    const jpg = join(OUT, `${job.name}.jpg`);
    execSync(`magick "${pngPath}" -resize ${job.w * 2}x${job.h * 2} -quality 90 "${jpg}"`);
    files[job.name] = jpg;
  }
  return files;
}

function descriptionHtml() {
  return `<p><strong>UniPrep2Go Mock Pass</strong>: 5 attempts on any UniPrep2Go timed practice test for $5. Your first mock on <a href="${SITE}/mock-exams">uniprep2go.study</a> is always free. The Mock Pass covers everything after that: a retake, a second exam, or switching between Exam and Learn mode.</p>
<h3>What you get</h3>
<ul>
<li><strong>5 mock attempts</strong> (quantity 2 = 10 attempts, and so on)</li>
<li><strong>Any live mock (190+)</strong>: FINRA SIE, Series 7 and Series 63, CFA Level 1, FRM Part 1, PTCB, ServSafe, Life &amp; Health insurance, state real estate, EPA 608, LEED, citizenship tests and more</li>
<li><strong>Exam mode</strong> (timed, scored against the readiness target) or <strong>Learn mode</strong> (an explanation after every answer)</li>
<li><strong>Full topic readiness report and answer review</strong> after every attempt</li>
<li><strong>One license key</strong> for phone, laptop and any browser. No account, no subscription, no expiry.</li>
</ul>
<h3>How it works</h3>
<ol>
<li>Buy. Your license key appears instantly on the receipt and in the email.</li>
<li>Open any mock at <a href="${SITE}/mock-exams">uniprep2go.study/mock-exams</a> and press Start.</li>
<li>Paste the key into <em>Have a key?</em> and press <em>Unlock attempts</em>. Each start uses one attempt.</li>
</ol>
<h3>FAQ</h3>
${FAQ.map(([q, a]) => `<p><strong>${escapeHtml(q)}</strong><br>${escapeHtml(a)}</p>`).join("\n")}
<p>Questions: <a href="mailto:support@uniprep2go.study">support@uniprep2go.study</a> · <a href="${SITE}/mock-exams">All mocks</a></p>`;
}

function landingHtml({ coverUrl, galleryUrls }) {
  const buy = (label, extra = "") =>
    `<a href="${PRODUCT_URL}" data-gumroad-action="buy" class="btn-buy ${extra}" rel="noopener noreferrer">${label}</a>`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${PRODUCT_URL}#product`,
        name: NAME,
        description: SUMMARY,
        url: PRODUCT_URL,
        brand: { "@type": "Brand", name: "UniPrep2Go" },
        image: coverUrl || undefined,
        offers: { "@type": "Offer", url: PRODUCT_URL, availability: "https://schema.org/InStock", priceCurrency: "USD", price: "5" },
      },
      {
        "@type": "FAQPage",
        "@id": `${PRODUCT_URL}#faq`,
        mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
  const gallery = GALLERY.map((g, i) =>
    galleryUrls[i]
      ? `<figure class="theme-card rounded-3xl p-3"><img src="${galleryUrls[i]}" alt="${escapeHtml(g.title)}" style="max-width:100%;border-radius:16px"/><figcaption class="mt-3 px-2 text-sm text-muted"><strong class="text-fg">${escapeHtml(g.title)}.</strong> ${escapeHtml(g.body)}</figcaption></figure>`
      : "",
  ).join("\n");
  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{--bg:#f7f3ea;--fg:#18140f;--muted:#5f5749;--card:#fffaf0;--border:rgba(24,20,15,.15);--accent:#1f3a5f;--btn:#18140f;--btn-hover:#1f3a5f;--btn-fg:#fffaf0}
    body{background:var(--bg);color:var(--fg)}
    .theme-card{background:var(--card);border:1px solid var(--border)}
    .text-muted{color:var(--muted)} .text-accent{color:var(--accent)} .text-fg{color:var(--fg)}
    .label-mono{font-family:ui-monospace,Menlo,monospace;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
    .btn-buy{display:inline-block;text-align:center;border-radius:999px;background:var(--btn);color:var(--btn-fg);font-weight:600;transition:background .2s,transform .2s}
    .btn-buy:hover{background:var(--btn-hover);transform:translateY(-1px)}
  </style>
  <header class="sticky top-0 z-50 border-b backdrop-blur-md" style="background:color-mix(in srgb,var(--bg) 88%,transparent);border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <p class="font-semibold text-sm truncate" data-gumroad-field="name">${escapeHtml(NAME)}</p>
      ${buy(`Buy — <span data-gumroad-field="price">$5</span>`, "px-5 py-2.5 text-sm shrink-0")}
    </div>
  </header>
  <main id="main" class="max-w-4xl mx-auto px-6 py-10">
    <p class="label-mono">UniPrep2Go · Mock Pass</p>
    <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">5 timed mock attempts on any exam, for $5</h1>
    <p class="mt-5 text-lg sm:text-xl leading-8 max-w-3xl">Your first UniPrep2Go mock is free. The Mock Pass is for everything after: retake the same exam, try a second one, or switch between Exam and Learn mode. Full topic readiness report and answer review every time.</p>
    <div class="mt-8 grid lg:grid-cols-2 gap-8 items-center">
      <div class="space-y-4">
        <ul class="space-y-3 text-sm sm:text-base">
          <li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>Any live mock (190+): FINRA SIE / 7 / 63, CFA L1, FRM, PTCB, ServSafe, insurance, real estate, citizenship</span></li>
          <li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>Exam mode (timed) or Learn mode (explanation after every answer)</span></li>
          <li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>Readiness report and answer review on every attempt</span></li>
          <li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>One key, any device · no account · no subscription · no expiry</span></li>
        </ul>
        ${buy(`Get 5 attempts — <span data-gumroad-field="price">$5</span>`, "px-6 py-3 text-sm")}
      </div>
      ${coverUrl ? `<figure class="overflow-hidden rounded-3xl theme-card shadow-lg"><img src="${coverUrl}" alt="UniPrep2Go Mock Pass — 5 attempts, any exam" class="w-full h-auto object-cover" loading="eager"></figure>` : ""}
    </div>
    <section class="mt-12" aria-labelledby="steps-heading">
      <h2 id="steps-heading" class="text-2xl font-semibold tracking-tight">How it works</h2>
      <div class="mt-4 grid sm:grid-cols-3 gap-3">
        <div class="theme-card rounded-2xl p-5"><p class="label-mono">Step 1</p><p class="mt-2 font-medium">Buy: the license key appears instantly on your receipt</p></div>
        <div class="theme-card rounded-2xl p-5"><p class="label-mono">Step 2</p><p class="mt-2 font-medium">Open any mock at uniprep2go.study/mock-exams and press Start</p></div>
        <div class="theme-card rounded-2xl p-5"><p class="label-mono">Step 3</p><p class="mt-2 font-medium">Paste the key under “Have a key?”: each start uses one attempt</p></div>
      </div>
    </section>
    <section class="mt-12" aria-labelledby="inside-heading">
      <h2 id="inside-heading" class="text-2xl font-semibold tracking-tight">What an attempt looks like</h2>
      <p class="mt-4 text-muted leading-7">Real screens from the UniPrep2Go mock runner.</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">${gallery}</div>
    </section>
    <section class="mt-12" aria-labelledby="facts-heading">
      <h2 id="facts-heading" class="text-2xl font-semibold tracking-tight">At a glance</h2>
      <dl class="mt-4 grid sm:grid-cols-2 gap-px rounded-3xl overflow-hidden" style="background:var(--border);border:1px solid var(--border)">
        <div class="theme-card px-5 py-4" style="border:0"><dt class="label-mono">Price</dt><dd class="mt-2 font-medium"><span data-gumroad-field="price">$5</span> for 5 attempts</dd></div>
        <div class="theme-card px-5 py-4" style="border:0"><dt class="label-mono">Free</dt><dd class="mt-2 font-medium">Your first mock, any exam, either mode</dd></div>
        <div class="theme-card px-5 py-4" style="border:0"><dt class="label-mono">Delivery</dt><dd class="mt-2 font-medium">Gumroad license key, instant</dd></div>
        <div class="theme-card px-5 py-4" style="border:0"><dt class="label-mono">Expiry</dt><dd class="mt-2 font-medium">None · shared across your devices</dd></div>
      </dl>
    </section>
    <section class="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl font-semibold tracking-tight">FAQ</h2>
      <div class="mt-4 space-y-3">
${FAQ.map(([q, a]) => `<details class="theme-card rounded-2xl p-5 group"><summary class="font-semibold cursor-pointer list-none flex justify-between gap-4 items-start">${escapeHtml(q)}<span class="text-accent shrink-0 group-open:rotate-45 transition-transform text-xl" aria-hidden="true">+</span></summary><p class="text-muted text-sm mt-3 leading-relaxed">${escapeHtml(a)}</p></details>`).join("\n")}
      </div>
    </section>
    <section class="mt-12 mb-6" aria-labelledby="pricing-heading">
      <div class="theme-card rounded-3xl p-8 sm:p-10 text-center">
        <h2 id="pricing-heading" class="text-2xl font-semibold">Keep practicing</h2>
        <p class="mt-2 text-4xl font-semibold"><span data-gumroad-field="price">$5</span></p>
        <p class="mt-2 text-muted">5 attempts · any UniPrep2Go mock · Exam or Learn mode</p>
        <p class="hidden" data-gumroad-field="description" aria-hidden="true">${escapeHtml(SUMMARY)}</p>
        ${buy("Get my 5 attempts", "mt-6 px-8 py-3.5 text-sm")}
        <p class="mt-4 text-xs text-muted">Independent practice tests · not official exam material · first mock free at <a class="underline" href="${SITE}/mock-exams">uniprep2go.study/mock-exams</a></p>
      </div>
    </section>
  </main>
  <footer class="border-t py-6" style="border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
      <p>UniPrep2Go · support@uniprep2go.study</p>
      ${buy("Buy now", "px-5 py-2 text-sm")}
    </div>
  </footer>
`;
}

function viewProduct() {
  const raw = execFileSync("gumroad", ["products", "view", PRODUCT_ID, "--json", "--non-interactive"], { encoding: "utf8" });
  return JSON.parse(raw).product ?? {};
}

function coverUrl(cover) {
  return cover?.original_url || cover?.url || "";
}

function publishLanding(urls) {
  const landing = landingHtml({ coverUrl: urls[0], galleryUrls: urls.slice(1) });
  const landingPath = join(root, "landing-pages/authored/uniprep-mock-pass.html");
  writeFileSync(landingPath, landing);
  execFileSync("gumroad", ["products", "page", "publish", "--yes", "--non-interactive", "--", PRODUCT_ID, landingPath], { stdio: "inherit" });
  execFileSync("gumroad", ["products", "publish", "--non-interactive", "--", PRODUCT_ID], { stdio: "inherit" });
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  if (args.has("--landing-only")) {
    loadLocalEnvFiles();
    ensureGumroadAccessToken({ persist: true });
    const urls = (viewProduct().covers ?? []).map(coverUrl);
    publishLanding(urls);
    return;
  }
  const files = await renderAssets();
  const description = descriptionHtml();
  writeFileSync(join(OUT, "description.html"), description);
  console.log(`Rendered assets → ${OUT}`);
  if (args.has("--assets-only")) return;

  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });
  const before = viewProduct();
  const staleCovers = (before.covers ?? []).map((c) => c.id);

  const update = [
    "products", "update", PRODUCT_ID,
    "--name", NAME,
    "--custom-permalink", PERMALINK,
    "--custom-summary", SUMMARY,
    "--custom-receipt", RECEIPT,
    "--description", description,
    "--taxonomy-id", EDUCATION_TAXONOMY_ID,
    ...TAGS.flatMap((t) => ["--tag", t]),
    "--thumbnail", files.thumbnail,
    "--cover-image", files.cover,
    ...GALLERY.flatMap((g, i) => ["--preview-image", files[`gallery-${i + 1}-${g.key}`]]),
    "--non-interactive",
  ];

  if (dryRun) {
    console.log(update.map((arg) => (arg === description ? "<description.html>" : arg)).join(" | "));
    console.log(`stale covers to remove after upload: ${staleCovers.length}`);
    return;
  }

  execFileSync("gumroad", update, { stdio: "inherit" });
  const after = viewProduct();
  const fresh = (after.covers ?? []).filter((c) => !staleCovers.includes(c.id));
  for (const id of staleCovers) {
    execFileSync("gumroad", ["products", "covers", "remove", "--non-interactive", "--yes", "--", PRODUCT_ID, id], { stdio: "inherit" });
  }
  publishLanding(fresh.map(coverUrl));

  const final = viewProduct();
  console.log(
    JSON.stringify(
      {
        name: final.name,
        short_url: final.short_url,
        custom_permalink: final.custom_permalink,
        published: final.published,
        price: final.formatted_price,
        taxonomy_id: final.taxonomy_id,
        tags: final.tags,
        covers: (final.covers ?? []).length,
        thumbnail: Boolean(final.thumbnail_url),
        has_license_block: JSON.stringify(final.rich_content ?? []).includes("licenseKey"),
        receipt_chars: (final.custom_receipt ?? "").length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
