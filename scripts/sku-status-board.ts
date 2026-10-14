/**
 * Per-SKU status board: one row per live mock (+ linked Anki deck) with the current gate result,
 * bank size vs floor, length-padding smell and the last dated row in the bank audit ledger.
 *
 *   npm run sku:status
 *
 * Writes docs/mock-bank-qa/sku-status.md + sku-status.json. Re-run after any SKU work
 * (after adding the ledger row), so dates and statuses stay current.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, openSync, closeSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { mockExamConfigs } from "@/lib/mock-exams/configs";
import { getQuestionBank } from "@/lib/mock-exams/question-bank";
import { availableDecks, decks } from "@/lib/decks";
import { RETIRED_LANGUAGE_DECK_REDIRECTS } from "@/lib/retired-language-decks";
import { citizenshipBanksBySlug } from "@/lib/mock-exams/citizenship-banks";

const ROOT = process.cwd();
const LEDGER = path.join(ROOT, "docs/mock-bank-qa/bank-audit-ledger.md");
const OUT_MD = path.join(ROOT, "docs/mock-bank-qa/sku-status.md");
const OUT_JSON = path.join(ROOT, "docs/mock-bank-qa/sku-status.json");

const PADDING = new RegExp(
  "\\b(" +
    [
      "under common office practice", "when the numbers are close", "on a standard Rx order",
      "in typical exam scenarios", "for this dispensing case", "for this borrower application",
      "when comparing disclosure timing", "on a conventional first mortgage", "in a residential purchase file",
      "under national SAFE themes", "for this encounter", "as documented today", "per usual clinic habit",
      "with no records to protect relationships", "on software defaults without professional review",
      "on technical detail and ignore client context", "after swapping the two percents",
    ].join("|") +
    ")\\b",
  "i",
);

type Gate = { level: string; name: string; ok: boolean; detail?: string[] };
type Audit = { slug: string; n: number; gates: Gate[] };

const liveDecks = new Set(availableDecks.map((d) => d.slug));
const mocks = mockExamConfigs.filter((c) => c.status === "live");

const dir = mkdtempSync(path.join(tmpdir(), "sku-status-"));
const auditFile = path.join(dir, "audit.json");
const fd = openSync(auditFile, "w");
spawnSync(
  "node",
  ["scripts/audit-bank-quality.mjs", ...mocks.flatMap((m) => ["--slug", m.slug]), "--json"],
  { cwd: ROOT, stdio: ["ignore", fd, "inherit"] },
);
closeSync(fd);
const audits = new Map<string, Audit>(
  (JSON.parse(readFileSync(auditFile, "utf8")) as Audit[]).map((a) => [a.slug, a]),
);

const ledgerRows = readFileSync(LEDGER, "utf8")
  .split("\n")
  .filter((l) => /^\| 20\d\d-\d\d-\d\d /.test(l));
function lastLedger(slug: string, deck?: string | null) {
  const hits = ledgerRows.filter((l) => l.includes(slug) || (deck && l.includes(deck)));
  if (!hits.length) return null;
  const dates = hits.map((l) => l.slice(2, 12)).sort();
  return dates[dates.length - 1];
}

type Row = {
  slug: string; deck: string | null; anki: "live" | "planned" | "-"; session: number; bank: number;
  status: "ok" | "civic" | "rewrite" | "point-fix" | "small-bank" | "unreviewed" | "thin-bank"; affected: number; issues: string[]; lastWork: string | null;
};

const rows: Row[] = mocks.map((m) => {
  const bank = getQuestionBank(m.slug) ?? [];
  const issues: string[] = [];
  const audit = audits.get(m.slug);
  const fails = audit?.gates.filter((g) => g.level === "FAIL" && !g.ok).map((g) => g.name.replace(/ (=|<=|>=).*$/, "")) ?? [];
  const failGates = audit?.gates.filter((g) => g.level === "FAIL" && !g.ok) ?? [];
  const affected = new Set(
    failGates.flatMap((g) => (g.detail ?? []).flatMap((d) => String(d).split(/[<:]/)[0].startsWith(m.slug) ? [String(d).split(/[<:]/)[0]] : [])),
  ).size;
  const structural = failGates.some((g) => !(g.detail ?? []).some((d) => String(d).startsWith(m.slug)));
  if (fails.length) issues.push(`FAIL (${affected} items${structural ? " + bank-level" : ""}): ${fails.join(", ")}`);
  const padded = bank.reduce((n, q) => n + q.options.filter((o) => PADDING.test(o.text)).length, 0);
  if (padded) issues.push(`padding ×${padded}`);
  const floor = m.questionCount <= 25 ? 75 : m.questionCount <= 60 ? 120 : 2 * m.questionCount;
  const hardFloor = m.questionCount <= 25 ? 75 : m.questionCount <= 60 ? 90 : m.questionCount + 1;
  if (bank.length < hardFloor) issues.push(`bank ${bank.length} for ${m.questionCount}Q session`);
  else if (bank.length < floor) issues.push(`bank ${bank.length} < ${floor}`);
  const lastWork = lastLedger(m.slug, m.linkedDeckSlug);
  const civic = m.slug in citizenshipBanksBySlug;
  const status: Row["status"] =
    civic ? "civic"
    : padded > 0 || structural || affected > Math.max(6, bank.length * 0.1) ? (fails.length || padded ? "rewrite" : "ok")
    : fails.length > 0 ? "point-fix"
    : bank.length < hardFloor ? "small-bank"
    : !lastWork ? "unreviewed"
    : bank.length < floor ? "thin-bank"
    : "ok";
  if (!lastWork) issues.push("no content review in ledger");
  return {
    slug: m.slug, deck: m.linkedDeckSlug ?? null,
    anki: m.linkedDeckSlug ? (liveDecks.has(m.linkedDeckSlug) ? "live" : "planned") : "-",
    session: m.questionCount, bank: bank.length, status, issues, lastWork, affected,
  };
});

const order = { civic: 6, rewrite: 0, "point-fix": 1, "small-bank": 2, unreviewed: 3, "thin-bank": 4, ok: 5 } as const;
rows.sort((a, b) => order[a.status] - order[b.status] || (a.anki === "live" ? -1 : 0) - (b.anki === "live" ? -1 : 0) || a.slug.localeCompare(b.slug));

const count = (s: Row["status"], anki?: boolean) => rows.filter((r) => r.status === s && (anki === undefined || (r.anki === "live") === anki)).length;
const today = new Date().toISOString().slice(0, 10);
const md = [
  "# SKU status board",
  "",
  `Generated ${today} by \`npm run sku:status\` from the live mock configs, the git bank exports, \`audit:bank-quality\` and the dated rows in \`bank-audit-ledger.md\`. Do not edit by hand: add a ledger row for the work, then re-run.`,
  "",
  "Status: **ok** = 0 FAIL gates, no padding, bank at floor, content review in the ledger · **thin-bank** = clean and reviewed but bank below the 2× floor · **unreviewed** = mechanically clean, never content-reviewed · **small-bank** = clean gates but the unique bank is too small for Mock Pass retakes (60-from-60, 75-from-75…) · **point-fix** = FAIL gates on ≤10% of items (or ≤6), fixable in place · **civic** = citizenship test built on the official question pool (separate standard; never rebuilt from mock fixes; gates shown for reference) · **rewrite** = FAIL on >10% of items, a bank-level FAIL (key bias, longest-correct rate) or length padding. Small banks also list “bank N for NQ session” under issues.",
  "",
  "| Status | SKUs | with live Anki |",
  "|---|---|---|",
  ...(["ok", "thin-bank", "unreviewed", "small-bank", "point-fix", "rewrite", "civic"] as const).map((s) => `| ${s} | ${count(s)} | ${count(s, true)} |`),
  `| **total live mocks** | **${rows.length}** | **${rows.filter((r) => r.anki === "live").length}** |`,
  "",
  "Products without a mock and catalog totals: bottom of this file.",
  "",
  "## Live mocks (+ linked Anki)",
  "",
  "| Status | Mock | Anki | Session / bank | Last work | Issues |",
  "|---|---|---|---|---|---|",
  ...rows.map((r) => `| ${r.status} | \`${r.slug}\` | ${r.anki} | ${r.session} / ${r.bank} | ${r.lastWork ?? "—"} | ${r.issues.join("; ") || "—"} |`),
  "",
].join("\n");

const linkedDecks = new Set(mocks.map((m) => m.linkedDeckSlug).filter(Boolean) as string[]);
const standalone = decks
  .filter((d) => !linkedDecks.has(d.slug))
  .map((d) => {
    const lastWork = lastLedger(d.slug);
    return {
      slug: d.slug, sale: d.status, category: d.category, format: d.format, lastWork,
      status: lastWork ? "reviewed" : "unreviewed",
    };
  })
  .sort((a, b) => a.status.localeCompare(b.status) || a.sale.localeCompare(b.sale) || a.slug.localeCompare(b.slug));
const prep2goDecks = Object.entries(RETIRED_LANGUAGE_DECK_REDIRECTS)
  .map(([slug, url]) => ({ slug, url, lastWork: lastLedger(slug) }))
  .sort((a, b) => (a.lastWork ? 1 : 0) - (b.lastWork ? 1 : 0) || a.slug.localeCompare(b.slug));
const pairedAvailable = rows.filter((r) => r.anki === "live").length;
const pairedPlanned = rows.filter((r) => r.anki === "planned").length;

const fullMd = [
  md.replace("# SKU status board\n", "# SKU status board\n"),
  "## Catalog totals",
  "",
  "| Line | Count |",
  "|---|---|",
  `| Live mocks | ${rows.length} |`,
  `| … with a live Anki / PDF pair | ${pairedAvailable} |`,
  `| … with a planned Anki pair | ${pairedPlanned} |`,
  `| Products without a mock (Anki, PDF, app, bundle) | ${standalone.length} (available ${standalone.filter((d) => d.sale === "available").length}, planned ${standalone.filter((d) => d.sale === "planned").length}) |`,
  `| Catalog decks total (\`decks.ts\`) | ${decks.length} (available ${availableDecks.length}) |`,
  `| Language decks moved to Prep2Go (Gumroad file, Lemon pending) | ${prep2goDecks.length} |`,
  "",
  "Gaivota comics, Prep2Go mock packs and Pro live in the CIPLE repo and are not on this board.",
  "",
  "## Products without a mock",
  "",
  "No bank gates apply; status comes from the ledger only (**reviewed** = has a dated ledger row).",
  "",
  "| Status | Product | Sale | Category | Format | Last work |",
  "|---|---|---|---|---|---|",
  ...standalone.map((d) => `| ${d.status} | \`${d.slug}\` | ${d.sale} | ${d.category} | ${d.format} | ${d.lastWork ?? "—"} |`),
  "",
  "## Language decks sold on Prep2Go",
  "",
  "Source of truth: Prep2Go app DB (audit there, then rebuild apkg + Gumroad). Old UniPrep2Go URLs 301 to the shop page.",
  "",
  "| Status | Deck | Shop page | Last work |",
  "|---|---|---|---|",
  ...prep2goDecks.map((d) => `| ${d.lastWork ? "reviewed" : "unreviewed"} | \`${d.slug}\` | ${d.url} | ${d.lastWork ?? "—"} |`),
  "",
].join("\n");

writeFileSync(OUT_MD, fullMd);
writeFileSync(OUT_JSON, JSON.stringify({ generated: today, rows, standalone, prep2goDecks }, null, 2) + "\n");
console.log(`sku-status: ${rows.length} live mocks · ok ${count("ok")} · thin-bank ${count("thin-bank")} · unreviewed ${count("unreviewed")} · small-bank ${count("small-bank")} · point-fix ${count("point-fix")} · rewrite ${count("rewrite")} · civic ${count("civic")}`);
