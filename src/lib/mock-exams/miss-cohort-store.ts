import { getRedisClient } from "@/lib/redis";
import { getMockExamConfig } from "./configs";
import {
  buildMissCohortStore,
  type MissCohortStore,
  type PublicMissCohort,
  toPublicMissCohort,
} from "./miss-cohort";
import type { MockTopicResult } from "./types";

function storeKey(slug: string) {
  return `mock:miss-cohort:v1:${slug}`;
}

function visitorKey(slug: string, visitorId: string) {
  return `mock:miss-cohort:v1:${slug}:visitor:${visitorId}`;
}

export async function recordFirstExamMissCohort(input: {
  slug: string;
  visitorId: string;
  topicResults: Array<Pick<MockTopicResult, "topicId" | "correct" | "total">>;
}): Promise<{ recorded: boolean }> {
  const config = getMockExamConfig(input.slug);
  const client = getRedisClient();
  const visitorId = input.visitorId.trim();
  if (!config || !client || visitorId.length < 8) {
    return { recorded: false };
  }

  const claimed = await client.set(visitorKey(input.slug, visitorId), "1", {
    nx: true,
    ex: 60 * 60 * 24 * 400,
  });
  if (claimed !== "OK") {
    return { recorded: false };
  }

  const previous = (await client.get<MissCohortStore>(storeKey(input.slug))) ?? null;
  const next = buildMissCohortStore(config, input.topicResults, previous);
  await client.set(storeKey(input.slug), next);
  return { recorded: true };
}

export async function getPublicMissCohort(slug: string): Promise<PublicMissCohort | null> {
  const client = getRedisClient();
  if (!client) return null;
  const store = await client.get<MissCohortStore>(storeKey(slug));
  if (!store) return null;
  return toPublicMissCohort(store);
}
