import { getRedisClient } from "@/lib/redis";
import { getMockExamConfig } from "./configs";
import { publicMockStartCount } from "./mock-start-count";

function countKey(slug: string) {
  return `mock:start-count:v1:${slug}`;
}

function visitorKey(slug: string, visitorId: string) {
  return `mock:start-count:v1:${slug}:visitor:${visitorId}`;
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
