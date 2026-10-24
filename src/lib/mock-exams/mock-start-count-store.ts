import { getRedisClient } from "@/lib/redis";
import { countMockStartsForSlug } from "./session-mode";
import { getMockExamConfig } from "./configs";
import { publicMockStartCount } from "./mock-start-count";

const LIFETIME_BY_SOURCE = "funnel:lifetime:bySource";
const LIFETIME_STARTED_AT = "funnel:lifetime:startedAt";
const PERIOD_STARTED_AT = "funnel:startedAt";

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

async function seedObservationFromLifetime(
  client: NonNullable<ReturnType<typeof getRedisClient>>,
  slug: string,
): Promise<number> {
  try {
    const bySource = await client.hgetall<Record<string, string>>(LIFETIME_BY_SOURCE);
    if (!bySource) return 0;
    const numeric: Record<string, number> = {};
    for (const [k, v] of Object.entries(bySource)) {
      const n = typeof v === "number" ? v : Number(v);
      if (Number.isFinite(n) && n > 0) numeric[k] = n;
    }
    return countMockStartsForSlug(numeric, slug);
  } catch {
    return 0;
  }
}

/**
 * Increment the observation counter for a mock start (every recorded start, not unique).
 * First touch for a slug seeds from lifetime funnel so history is not reset to 1.
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
    const funnelSince =
      (await client.get<string>(LIFETIME_STARTED_AT)) ??
      (await client.get<string>(PERIOD_STARTED_AT)) ??
      now;
    await client.set(OBSERVATION_SINCE_KEY, funnelSince, { nx: true });

    const key = observationCountKey(trimmed);
    const existing = await client.get<number | string>(key);
    const existingN = typeof existing === "number" ? existing : Number(existing);

    let n: number;
    if (!Number.isFinite(existingN) || existingN < 1) {
      // Funnel already includes this start (recordFunnelEvent runs first).
      const seeded = await seedObservationFromLifetime(client, trimmed);
      n = Math.max(1, seeded);
      await client.set(key, n);
    } else {
      n = await client.incr(key);
    }

    const since = (await client.get<string>(OBSERVATION_SINCE_KEY)) ?? funnelSince;
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
