import type { FunnelEvent } from "./analytics";
import { getRedisClient } from "./redis";

const FIRST_VIEW_TTL_SECONDS = 7 * 24 * 60 * 60;
const memory = new Map<string, string>();

const FIRST_VIEW_NAMES = new Set(["page_view", "mock_landing_view"]);

function keyFor(visitorId: string) {
  return `funnel:first-view:${visitorId}`;
}

export async function rememberFirstPageView(event: Pick<FunnelEvent, "name" | "visitorId" | "occurredAt">) {
  if (!FIRST_VIEW_NAMES.has(event.name)) return;
  const visitorId = event.visitorId?.trim();
  if (!visitorId) return;

  const client = getRedisClient();
  if (!client) {
    if (!memory.has(visitorId)) memory.set(visitorId, event.occurredAt);
    return;
  }

  try {
    await client.set(keyFor(visitorId), event.occurredAt, { nx: true, ex: FIRST_VIEW_TTL_SECONDS });
  } catch (error) {
    console.error("[first_view] failed to store", error);
  }
}

export async function readFirstPageView(visitorId: string | undefined): Promise<{
  known: boolean;
  at: string | null;
}> {
  const id = visitorId?.trim();
  if (!id) return { known: true, at: null };

  const client = getRedisClient();
  if (!client) {
    return { known: true, at: memory.get(id) ?? null };
  }

  try {
    const value = await client.get<string>(keyFor(id));
    return { known: true, at: typeof value === "string" && value.length > 0 ? value : null };
  } catch (error) {
    console.error("[first_view] failed to read", error);
    return { known: false, at: null };
  }
}

export function resetFirstPageViewsForTests() {
  memory.clear();
}
