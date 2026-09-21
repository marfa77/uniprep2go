#!/usr/bin/env tsx
/**
 * Import every UniPrep mock bank into Prep2Go ops.* (warehouse only).
 * Loads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from the Prep2Go app .env.
 * Does not print secrets.
 */

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getAllMockExams } from "../../src/lib/mock-exams/configs";
import { getQuestionBank } from "../../src/lib/mock-exams/question-bank";
import type { MockQuestion } from "../../src/lib/mock-exams/types";

const ROOT = path.resolve(import.meta.dirname, "../..");
const BANK_DIR = path.join(ROOT, "src/data/mock-exams");
const PREP2GO_ENV = "/Users/pavelveselov/Projects/prep2go app/.env";
const THIN_MARKERS = ["Sounds plausible", "The correct choice", "matches this rule"];
const CONCURRENCY = 4;

type BankMeta = {
  slug: string;
  title: string;
  vertical?: string;
  family_id?: string;
  linked_deck_slug?: string;
  session_question_count?: number;
  last_updated?: string;
  source_path?: string;
  questions: MockQuestion[];
};

function loadEnvFile(file: string) {
  const text = readFileSync(file, "utf8");
  for (const line of text.split("\n")) {
    const match = line.match(/^export\s+([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[match[1]]) process.env[match[1]] = value;
  }
}

function smell(questions: MockQuestion[]) {
  const keyBias: Record<string, number> = {};
  let thin = 0;
  for (const question of questions) {
    const key = question.correctOptionId || "?";
    keyBias[key] = (keyBias[key] ?? 0) + 1;
    const blob = JSON.stringify(question.distractorExplanations ?? {});
    if (THIN_MARKERS.some((marker) => blob.includes(marker))) thin += 1;
  }
  const aShare = questions.length ? (keyBias.a ?? 0) / questions.length : 0;
  let smell_tier = "clean";
  if (thin >= Math.max(1, Math.floor(questions.length * 0.5)) || aShare >= 0.85) {
    smell_tier = "P0";
  } else if (thin > 0 || aShare >= 0.45) {
    smell_tier = "P1";
  }
  return { keyBias, thin, smell_tier };
}

function uniquifyQuestions(slug: string, questions: MockQuestion[]): MockQuestion[] {
  const seen = new Map<string, number>();
  return questions.map((question, index) => {
    const base = question.id?.trim() || `${slug}-${index}`;
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    if (count === 1) return { ...question, id: base, examSlug: question.examSlug || slug };
    return { ...question, id: `${base}-dup${count}`, examSlug: question.examSlug || slug };
  });
}

function collectBanks(): BankMeta[] {
  const configs = new Map(getAllMockExams().map((exam) => [exam.slug, exam]));
  const bySlug = new Map<string, BankMeta>();

  for (const exam of configs.values()) {
    const questions = uniquifyQuestions(exam.slug, getQuestionBank(exam.slug));
    if (questions.length === 0) continue;
    bySlug.set(exam.slug, {
      slug: exam.slug,
      title: exam.title,
      vertical: exam.verticalId,
      family_id: exam.familyId,
      linked_deck_slug: exam.linkedDeckSlug,
      session_question_count: exam.questionCount,
      last_updated: exam.lastUpdated,
      source_path: `src/data/mock-exams/${exam.slug}.json`,
      questions,
    });
  }

  for (const name of readdirSync(BANK_DIR).filter((file) => file.endsWith(".json"))) {
    const slug = name.replace(/\.json$/, "");
    if (bySlug.has(slug)) continue;
    const questions = uniquifyQuestions(
      slug,
      JSON.parse(readFileSync(path.join(BANK_DIR, name), "utf8")) as MockQuestion[],
    );
    if (!Array.isArray(questions) || questions.length === 0) continue;
    bySlug.set(slug, {
      slug,
      title: slug,
      source_path: `src/data/mock-exams/${name}`,
      questions,
    });
  }

  return [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

async function upsertBank(
  url: string,
  key: string,
  bank: BankMeta,
): Promise<{ slug: string; questions: number }> {
  const { keyBias, thin, smell_tier } = smell(bank.questions);
  const payload = {
    bank: {
      slug: bank.slug,
      title: bank.title,
      vertical: bank.vertical ?? "",
      family_id: bank.family_id ?? "",
      linked_deck_slug: bank.linked_deck_slug ?? "",
      session_question_count: bank.session_question_count ?? "",
      last_updated: bank.last_updated ?? "",
      review_status: "imported",
      smell_tier,
      key_bias: keyBias,
      thin_distractor_count: thin,
      source_path: bank.source_path ?? "",
      audit_note: "Full warehouse import",
    },
    questions: bank.questions,
  };

  const response = await fetch(`${url}/rest/v1/rpc/ops_upsert_mock_bank`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${bank.slug}: HTTP ${response.status} ${text.slice(0, 400)}`);
  }
  return JSON.parse(text) as { slug: string; questions: number };
}

async function mapPool<T, R>(items: T[], size: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  let index = 0;
  async function next() {
    while (index < items.length) {
      const current = index;
      index += 1;
      out[current] = await worker(items[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, () => next()));
  return out;
}

async function main() {
  loadEnvFile(PREP2GO_ENV);
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in Prep2Go .env");
  }

  const banks = collectBanks();
  const questionTotal = banks.reduce((sum, bank) => sum + bank.questions.length, 0);
  console.log(`importing ${banks.length} banks / ${questionTotal} questions`);

  const failures: string[] = [];
  const results = await mapPool(banks, CONCURRENCY, async (bank) => {
    try {
      const result = await upsertBank(url, key, bank);
      console.log(`ok ${result.slug} ${result.questions}`);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(message);
      console.error(`fail ${message}`);
      return { slug: bank.slug, questions: 0 };
    }
  });

  const importedQuestions = results.reduce((sum, row) => sum + row.questions, 0);
  console.log(`done banks=${results.filter((row) => row.questions > 0).length} questions=${importedQuestions} failed=${failures.length}`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
