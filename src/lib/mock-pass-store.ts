import {
  UNLIMITED_MOCK_PASS_ATTEMPTS,
  isUnlimitedMockPassHash,
} from "@/lib/gumroad-mock-pass-license";
import { getRedisClient } from "@/lib/redis";

type MockPassMeta = {
  granted: number;
  email: string | null;
  saleId: string | null;
  redeemedAt: string;
};

type DevRow = MockPassMeta & { remaining: number };

type DevMem = typeof globalThis & {
  __uniprep2goMockPass?: Map<string, DevRow>;
};

function devStore(): Map<string, DevRow> {
  const g = globalThis as DevMem;
  if (!g.__uniprep2goMockPass) {
    g.__uniprep2goMockPass = new Map();
  }
  return g.__uniprep2goMockPass;
}

export function resetMockPassMemoryForTests() {
  (globalThis as DevMem).__uniprep2goMockPass = new Map();
}

const remainingKey = (hash: string) => `mockpass:remaining:${hash}`;
const metaKey = (hash: string) => `mockpass:meta:${hash}`;

/** Atomic decrement: -2 = never redeemed, -1 = no attempts left, else new remaining. */
const CONSUME_SCRIPT = `
local v = redis.call('GET', KEYS[1])
if not v then return -2 end
if tonumber(v) <= 0 then return -1 end
return redis.call('DECR', KEYS[1])
`;

function storeUnavailable(): never {
  throw new Error("MOCK_PASS_STORE_UNAVAILABLE");
}

export async function getMockPassState(
  licenseHash: string,
): Promise<{ remaining: number; granted: number; exists: boolean }> {
  if (isUnlimitedMockPassHash(licenseHash)) {
    return { remaining: UNLIMITED_MOCK_PASS_ATTEMPTS, granted: UNLIMITED_MOCK_PASS_ATTEMPTS, exists: true };
  }

  const client = getRedisClient();
  if (client) {
    try {
      const [remaining, meta] = await Promise.all([
        client.get<number | string>(remainingKey(licenseHash)),
        client.get<MockPassMeta>(metaKey(licenseHash)),
      ]);
      if (remaining === null || remaining === undefined) {
        return { remaining: 0, granted: 0, exists: false };
      }
      return {
        remaining: Math.max(0, Number(remaining) || 0),
        granted: Math.max(0, Number(meta?.granted) || 0),
        exists: true,
      };
    } catch (error) {
      console.error("[mock-pass] redis get failed", error);
      if (process.env.NODE_ENV === "production") storeUnavailable();
    }
  }

  const row = devStore().get(licenseHash);
  return row
    ? { remaining: row.remaining, granted: row.granted, exists: true }
    : { remaining: 0, granted: 0, exists: false };
}

/** Grants attempts once per license; re-redeeming on another device reuses the same balance. */
export async function redeemMockPass(params: {
  licenseHash: string;
  attempts: number;
  email: string | null;
  saleId: string | null;
}): Promise<{ remaining: number; granted: number; alreadyRedeemed: boolean }> {
  const { licenseHash, email, saleId } = params;
  if (isUnlimitedMockPassHash(licenseHash)) {
    return { remaining: UNLIMITED_MOCK_PASS_ATTEMPTS, granted: UNLIMITED_MOCK_PASS_ATTEMPTS, alreadyRedeemed: true };
  }

  const attempts = Math.max(1, Math.floor(params.attempts));
  const meta: MockPassMeta = { granted: attempts, email, saleId, redeemedAt: new Date().toISOString() };

  const client = getRedisClient();
  if (client) {
    try {
      const created = await client.set(remainingKey(licenseHash), attempts, { nx: true });
      if (created) {
        await client.set(metaKey(licenseHash), meta);
        return { remaining: attempts, granted: attempts, alreadyRedeemed: false };
      }
      const state = await getMockPassState(licenseHash);
      return { remaining: state.remaining, granted: state.granted || attempts, alreadyRedeemed: true };
    } catch (error) {
      console.error("[mock-pass] redis redeem failed", error);
      if (process.env.NODE_ENV === "production") storeUnavailable();
    }
  }

  const store = devStore();
  const existing = store.get(licenseHash);
  if (existing) {
    return { remaining: existing.remaining, granted: existing.granted, alreadyRedeemed: true };
  }
  store.set(licenseHash, { ...meta, remaining: attempts });
  return { remaining: attempts, granted: attempts, alreadyRedeemed: false };
}

export async function consumeMockPassAttempt(
  licenseHash: string,
): Promise<{ ok: true; remaining: number } | { ok: false; reason: "empty" | "missing" | "store" }> {
  if (isUnlimitedMockPassHash(licenseHash)) {
    return { ok: true, remaining: UNLIMITED_MOCK_PASS_ATTEMPTS };
  }

  const client = getRedisClient();
  if (client) {
    try {
      const result = Number(await client.eval(CONSUME_SCRIPT, [remainingKey(licenseHash)], []));
      if (result === -2) return { ok: false, reason: "missing" };
      if (result === -1) return { ok: false, reason: "empty" };
      return { ok: true, remaining: Math.max(0, result) };
    } catch (error) {
      console.error("[mock-pass] redis consume failed", error);
      if (process.env.NODE_ENV === "production") return { ok: false, reason: "store" };
    }
  }

  const row = devStore().get(licenseHash);
  if (!row) return { ok: false, reason: "missing" };
  if (row.remaining <= 0) return { ok: false, reason: "empty" };
  row.remaining -= 1;
  return { ok: true, remaining: row.remaining };
}
