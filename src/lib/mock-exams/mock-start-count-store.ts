import { getRedisClient } from "@/lib/redis";
import { getMockExamConfig } from "./configs";
import { publicMockStartCount } from "./mock-start-count";

function countKey(slug: string) {
  return `mock:start-count:v1:${slug}`;
}

function visitorKey(slug: string, visitorId: string) {
  return `mock:start-count:v1:${slug}:visitor:${visitorId}`;
}

/** Total starts per mock for Telegram “Nth start since observation” (not unique visitors). */
function observationCountKey(slug: string) {
  return `mock:start-obs:v1:${slug}`;
}

const OBSERVATION_SINCE_KEY = "mock:start-obs:v1:since";

type GlobalWithObsStarts = typeof globalThis & {
  __uniprep2goMockStartObs?: { since: string; bySlug: Record<string, number> };
};

function memoryObs() {
  const g = globalThis as GlobalWithObsStarts;
  if (!g.__uniprep2goMockStartObs) {
    g.__uniprep2goMockStartObs = { since: new Date().toISOString(), bySlug: {} };
  }
  return g.__uniprep2goMockStartObs;
}

export async function recordUniqueMockStart(input: {
  slug: string;
  visitorId: string | undefined;
}): Promise<{ recorded: boolean }> {
  const slug = input.slug?.trim();
  const visitorId = input.visitorId?.trim() ?? "";
  const client = getRedisClient();
  if (!slug || !getMockExamConfig(slug) || !client || visitorId.length < 8) {
    return { recorded: false };
  }

  const claimed = await client.set(visitorKey(slug, visitorId), "1", {
    nx: true,
    ex: 60 * 60 * 24 * 400,
  });
  if (claimed !== "OK") {
    return { recorded: false };
  }

  await client.incr(countKey(slug));
  return { recorded: true };
}

export async function getPublicMockStartCount(slug: string): Promise<number | null> {
  const client = getRedisClient();
  let real = 0;
  if (client) {
    const raw = await client.get<number | string>(countKey(slug));
    const n = typeof raw === "number" ? raw : Number(raw);
    if (Number.isFinite(n) && n > 0) real = n;
  }
  // Floors still publish when Redis is empty / offline (marketing bootstrap).
  return publicMockStartCount(real, slug);
}

export type MockStartObservation = {
  /** 1-based ordinal for this mock since observation tracking began */
  n: number;
  since: string;
};

/**
 * Increment the observation counter for a mock start (every recorded start, not unique).
 * Used in Telegram: “Start #: 3rd for this mock (since 2026-10-01)”.
 */
export async function recordMockStartObservation(slug: string): Promise<MockStartObservation | null> {
  const trimmed = slug?.trim();
  if (!trimmed || !getMockExamConfig(trimmed)) {
    return null;
  }

  const client = getRedisClient();
  if (!client) {
    const mem = memoryObs();
    mem.bySlug[trimmed] = (mem.bySlug[trimmed] ?? 0) + 1;
    return { n: mem.bySlug[trimmed], since: mem.since };
  }

  try {
    const now = new Date().toISOString();
    await client.set(OBSERVATION_SINCE_KEY, now, { nx: true });
    const n = await client.incr(observationCountKey(trimmed));
    const since = (await client.get<string>(OBSERVATION_SINCE_KEY)) ?? now;
    return { n, since };
  } catch (error) {
    console.error("[mock_start_obs] record failed", error);
    return null;
  }
}

export async function getMockStartObservation(slug: string): Promise<MockStartObservation | null> {
  const trimmed = slug?.trim();
  if (!trimmed) return null;
  const client = getRedisClient();
  if (!client) {
    const mem = memoryObs();
    const n = mem.bySlug[trimmed];
    if (!n) return null;
    return { n, since: mem.since };
  }
  try {
    const raw = await client.get<number | string>(observationCountKey(trimmed));
    const n = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(n) || n < 1) return null;
    const since = (await client.get<string>(OBSERVATION_SINCE_KEY)) ?? null;
    return since ? { n, since } : { n, since: "n/a" };
  } catch {
    return null;
  }
}
