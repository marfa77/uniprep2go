#!/usr/bin/env tsx
/**
 * Write /tmp/ops-bank-meta.json: ops bank metadata for every slug (site configs + bank-meta.json),
 * so apply scripts never blank titles/verticals when they re-upsert a bank.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getAllMockExams } from "../../src/lib/mock-exams/configs";

const ROOT = path.resolve(import.meta.dirname, "../..");
const BANK_DIR = path.join(ROOT, "src/data/mock-exams");
const META = JSON.parse(readFileSync(path.join(import.meta.dirname, "bank-meta.json"), "utf8")) as Record<
  string,
  Record<string, string>
>;

const out: Record<string, Record<string, string>> = {};
for (const exam of getAllMockExams()) {
  out[exam.slug] = {
    title: exam.title,
    vertical: exam.verticalId ?? "",
    family_id: exam.familyId ?? "",
    linked_deck_slug: exam.linkedDeckSlug ?? "",
    session_question_count: String(exam.questionCount ?? ""),
    last_updated: exam.lastUpdated ?? "",
  };
}
for (const name of readdirSync(BANK_DIR).filter((file) => file.endsWith(".json"))) {
  const slug = name.replace(/\.json$/, "");
  out[slug] ??= { title: slug, vertical: "", family_id: "", linked_deck_slug: "", session_question_count: "" };
}
for (const [slug, meta] of Object.entries(META)) {
  out[slug] = { ...(out[slug] ?? {}), ...Object.fromEntries(Object.entries(meta).filter(([, v]) => v !== "")) };
}
writeFileSync("/tmp/ops-bank-meta.json", JSON.stringify(out, null, 2));
console.log(`meta for ${Object.keys(out).length} slugs`);
