import { getQuestionBank } from "./question-bank";
import type { MockQuestion } from "./types";

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { expiresAt: number; questions: MockQuestion[] }>();
const liveCache = new Map<string, { expiresAt: number; questions: MockQuestion[] }>();

function opsConfig() {
  const url = process.env.PREP2GO_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.PREP2GO_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Mock banks load from Prep2Go ops. Set PREP2GO_SUPABASE_URL and PREP2GO_SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

function asQuestion(value: unknown): MockQuestion | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<MockQuestion>;
  if (!row.id || !row.examSlug || !row.prompt || !Array.isArray(row.options)) return null;
  return {
    id: row.id,
    examSlug: row.examSlug,
    topicId: row.topicId || "unknown",
    prompt: row.prompt,
    formula: row.formula,
    options: row.options,
    correctOptionId: row.correctOptionId || "",
    explanation: row.explanation || "",
    distractorExplanations: row.distractorExplanations || {},
    difficulty: row.difficulty === "easy" || row.difficulty === "hard" ? row.difficulty : "medium",
    sourceNote: row.sourceNote || "",
  };
}

async function fetchOpsQuestions(examSlug: string, rpc: string): Promise<MockQuestion[]> {
  const { url, key } = opsConfig();
  const response = await fetch(`${url}/rest/v1/rpc/${rpc}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_slug: examSlug }),
    cache: "no-store",
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${rpc} ${examSlug}: HTTP ${response.status} ${text.slice(0, 240)}`);
  }
  const parsed = JSON.parse(text) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error(`${rpc} ${examSlug}: expected a question array`);
  }
  return parsed.map(asQuestion).filter((question): question is MockQuestion => question !== null);
}

/** Warehouse read — every review_status. Used by audit/import, not the live site. */
export async function fetchQuestionBankFromOps(examSlug: string): Promise<MockQuestion[]> {
  return fetchOpsQuestions(examSlug, "ops_get_mock_bank");
}

/** Live site read — empty unless ops.mock_banks.review_status = ready. */
export async function fetchLiveQuestionBankFromOps(examSlug: string): Promise<MockQuestion[]> {
  return fetchOpsQuestions(examSlug, "ops_get_live_mock_bank");
}

export async function getQuestionBankFromOps(examSlug: string): Promise<MockQuestion[]> {
  const hit = cache.get(examSlug);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.questions;
  }
  const questions = await fetchQuestionBankFromOps(examSlug);
  cache.set(examSlug, { expiresAt: Date.now() + CACHE_TTL_MS, questions });
  return questions;
}

/** Serve a ready ops bank; otherwise keep the git JSON runner. */
export async function getLiveQuestionBank(examSlug: string): Promise<MockQuestion[]> {
  const hit = liveCache.get(examSlug);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.questions;
  }
  let questions: MockQuestion[] = [];
  try {
    questions = await fetchLiveQuestionBankFromOps(examSlug);
  } catch {
    questions = [];
  }
  if (questions.length === 0) {
    questions = getQuestionBank(examSlug);
  }
  liveCache.set(examSlug, { expiresAt: Date.now() + CACHE_TTL_MS, questions });
  return questions;
}

export function clearQuestionBankOpsCache() {
  cache.clear();
  liveCache.clear();
}
