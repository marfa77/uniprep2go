/**
 * Validate every ready ops bank with the same runnable check the mock page uses.
 * Usage: npx tsx scripts/ops-mock-banks/check-live-runnable.ts
 */
import { readFileSync } from "node:fs";
import { getAllMockExams } from "../../src/lib/mock-exams/configs";
import {
  getQuestionBankForExamFromQuestions,
  isMockExamRunnableFromQuestions,
} from "../../src/lib/mock-exams/question-bank";
import { fetchLiveQuestionBankFromOps } from "../../src/lib/mock-exams/question-bank-ops";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}

async function main() {
  const exams = getAllMockExams().filter((exam) => exam.status !== "coming_soon");
  const bad: string[] = [];
  let ready = 0;
  for (const exam of exams) {
    const questions = await fetchLiveQuestionBankFromOps(exam.slug);
    if (questions.length === 0) continue;
    ready += 1;
    if (!isMockExamRunnableFromQuestions(exam.slug, questions)) {
      const { errors } = getQuestionBankForExamFromQuestions(exam.slug, questions);
      bad.push(`${exam.slug}: ${errors.length} errors, e.g. ${errors.slice(0, 2).join(" | ")}`);
    }
  }
  console.log(`ready ops banks checked: ${ready}, not runnable: ${bad.length}`);
  for (const line of bad) console.log(line);
}

main();
