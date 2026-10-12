#!/usr/bin/env node
/**
 * Builds the admin Telegram bot knowledge pack: tracked docs + Cursor rules, git changelog, mock bank summary.
 * Runs before `next build` and locally (`npm run admin-bot:knowledge`). Never fails the build.
 *
 * Vercel clones shallowly (and CLI deploys have no .git), so commits and bank dates are merged into the
 * committed snapshot instead of replacing it.
 *
 * Flags:
 *   --out <file>             JSON output (committed)
 *   --docs <pathspec,...>    git pathspecs of markdown/rules to include
 *   --banks <dir>            directory of mock bank JSON arrays (optional)
 *   --extra <id>=<abs path>  extra file outside the repo, kept from the snapshot when missing
 */

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const MAX_DOC_CHARS = 150_000;
const MAX_TOTAL_DOC_CHARS = 4_000_000;
const MAX_COMMITS = 800;
const GIT_LOG_COMMITS = 500;

function parseArgs(argv) {
  const out = { docs: [], extra: [] };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === "--out") out.out = value;
    if (flag === "--docs") out.docs.push(...value.split(","));
    if (flag === "--banks") out.banks = value;
    if (flag === "--extra") out.extra.push(value);
    if (flag.startsWith("--")) i++;
  }
  return out;
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

function hasGit() {
  try {
    return git(["rev-parse", "--is-inside-work-tree"]).trim() === "true";
  } catch {
    return false;
  }
}

function isShallow() {
  try {
    return git(["rev-parse", "--is-shallow-repository"]).trim() === "true";
  } catch {
    return true;
  }
}

const SECRET_PATTERNS = [
  /\bsk-[A-Za-z0-9_-]{16,}/g,
  /\bAIza[0-9A-Za-z_-]{30,}/g,
  /\bAQ\.[0-9A-Za-z_.-]{30,}/g,
  /\bgh[pousr]_[A-Za-z0-9]{30,}/g,
  /\b\d{8,10}:AA[0-9A-Za-z_-]{30,}/g,
  /\beyJ[0-9A-Za-z_-]{20,}\.[0-9A-Za-z_-]{20,}\.[0-9A-Za-z_-]{10,}/g,
  /\b(?:re|rk|pk|sk)_(?:live|test)_[0-9A-Za-z]{16,}/g,
];

function redact(text) {
  return SECRET_PATTERNS.reduce((t, re) => t.replace(re, "[redacted]"), text);
}

function titleOf(id, text) {
  const heading = text.match(/^#\s+(.+)$/m)?.[1] ?? text.match(/^description:\s*(.+)$/m)?.[1];
  return (heading ?? path.basename(id)).trim().slice(0, 140);
}

function collectDocs(pathspecs) {
  const files = git(["ls-files", "-z", "--", ...pathspecs]).split("\0").filter(Boolean);
  const docs = [];
  let total = 0;
  for (const file of files.sort()) {
    if (!existsSync(file)) continue;
    let text = redact(readFileSync(file, "utf8"));
    if (text.length > MAX_DOC_CHARS) text = `${text.slice(0, MAX_DOC_CHARS)}\n\n[обрезано: файл длиннее ${MAX_DOC_CHARS} символов]`;
    if (total + text.length > MAX_TOTAL_DOC_CHARS) break;
    total += text.length;
    docs.push({ id: file, title: titleOf(file, text), text });
  }
  return docs;
}

function collectCommits() {
  const raw = git([
    "log",
    `-n${GIT_LOG_COMMITS}`,
    "--date=iso-strict",
    "--name-only",
    "--format=%x1e%H%x1f%ad%x1f%an%x1f%s%x1f%b%x1f",
  ]);
  return raw
    .split("\x1e")
    .filter((chunk) => chunk.trim())
    .map((chunk) => {
      const [sha, date, author, subject, body, filesBlock = ""] = chunk.split("\x1f");
      const files = filesBlock.split("\n").map((f) => f.trim()).filter(Boolean);
      return {
        sha: sha.trim(),
        date: date.trim(),
        author: author.trim(),
        subject: redact(subject.trim()),
        body: redact(body.trim()).slice(0, 1200),
        files: files.slice(0, 25),
        filesTotal: files.length,
      };
    });
}

function collectBanks(dir, previous, withDates) {
  if (!dir || !existsSync(dir)) return previous ?? [];
  const prevBySlug = new Map((previous ?? []).map((b) => [b.slug, b]));
  const banks = [];
  for (const name of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    const slug = name.replace(/\.json$/, "");
    let questions = null;
    try {
      const data = JSON.parse(readFileSync(path.join(dir, name), "utf8"));
      questions = Array.isArray(data) ? data.length : Array.isArray(data?.questions) ? data.questions.length : null;
    } catch {
      questions = null;
    }
    let lastChanged = prevBySlug.get(slug)?.lastChanged ?? null;
    let lastSubject = prevBySlug.get(slug)?.lastSubject ?? null;
    if (withDates) {
      try {
        const [date, subject] = git(["log", "-1", "--date=short", "--format=%ad%x1f%s", "--", path.join(dir, name)])
          .trim()
          .split("\x1f");
        if (date) {
          lastChanged = date;
          lastSubject = subject?.slice(0, 200) ?? null;
        }
      } catch {
        // keep snapshot values
      }
    }
    banks.push({ slug, questions, lastChanged, lastSubject });
  }
  return banks;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.out) throw new Error("--out required");
  const previous = existsSync(args.out) ? JSON.parse(readFileSync(args.out, "utf8")) : null;
  const gitOk = hasGit();
  const fullHistory = gitOk && !isShallow();

  let docs = previous?.docs ?? [];
  let commits = previous?.commits ?? [];
  let head = previous?.head ?? null;

  if (gitOk) {
    const extraIds = new Set(args.extra.map((e) => e.split("=")[0]));
    docs = [...collectDocs(args.docs), ...docs.filter((d) => extraIds.has(d.id))];
    const bySha = new Map(commits.map((c) => [c.sha, c]));
    for (const c of collectCommits()) bySha.set(c.sha, c);
    commits = [...bySha.values()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_COMMITS);
    head = commits[0]?.sha ?? head;
  }

  for (const spec of args.extra) {
    const [id, file] = spec.split("=");
    if (!file || !existsSync(file)) continue;
    const text = redact(readFileSync(file, "utf8"));
    docs = [...docs.filter((d) => d.id !== id), { id, title: titleOf(id, text), text }];
  }

  const banks = collectBanks(args.banks, previous?.banks, fullHistory);

  const pack = { generatedAt: new Date().toISOString(), head, fullHistory, docs, commits, banks };
  mkdirSync(path.dirname(args.out), { recursive: true });
  writeFileSync(args.out, `${JSON.stringify(pack)}\n`);
  const size = (JSON.stringify(pack).length / 1024 / 1024).toFixed(2);
  console.log(
    `[admin-bot-knowledge] ${docs.length} docs, ${commits.length} commits, ${banks.length} banks, ${size} MB (git: ${gitOk ? (fullHistory ? "full" : "shallow") : "none"})`,
  );
}

try {
  main();
} catch (e) {
  console.warn(`[admin-bot-knowledge] skipped: ${e instanceof Error ? e.message : e}`);
}
