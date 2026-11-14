import { isUnlimitedMockPassHash } from "@/lib/gumroad-mock-pass-license";
import { UNLIMITED_MOCK_PASS_ATTEMPTS, isUnlimitedMockPassBalance } from "@/lib/mock-exams/mock-pass";
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

/** -2 = never redeemed, -1 = no attempts left, else remaining. Unlimited balances are not decremented. */
const CONSUME_SCRIPT = `
local v = redis.call('GET', KEYS[1])
if not v then return -2 end
local n = tonumber(v)
if n >= ${UNLIMITED_MOCK_PASS_ATTEMPTS} then return n end
if n <= 0 then return -1 end
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

/** Grants access once per license. An unlimited grant overwrites a previous finite balance. */
export async function redeemMockPass(params: {
  licenseHash: string;
  attempts: number;
  email: string | null;
  saleId: string | null;
}): Promise<{ remaining: number; granted: number; alreadyRedeemed: boolean }> {
  const { licenseHash, email, saleId } = params;
  const attempts = isUnlimitedMockPassHash(licenseHash)
    ? UNLIMITED_MOCK_PASS_ATTEMPTS
    : Math.max(1, Math.floor(params.attempts));
  const unlimited = isUnlimitedMockPassBalance(attempts);
  const meta: MockPassMeta = { granted: attempts, email, saleId, redeemedAt: new Date().toISOString() };

  if (unlimited) {
    return grantUnlimited(licenseHash, meta);
  }

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
  if (isUnlimitedMockPassBalance(row.remaining)) return { ok: true, remaining: UNLIMITED_MOCK_PASS_ATTEMPTS };
  if (row.remaining <= 0) return { ok: false, reason: "empty" };
  row.remaining -= 1;
  return { ok: true, remaining: row.remaining };
}

async function grantUnlimited(
  licenseHash: string,
  meta: MockPassMeta,
): Promise<{ remaining: number; granted: number; alreadyRedeemed: boolean }> {
  const unlimitedMeta: MockPassMeta = { ...meta, granted: UNLIMITED_MOCK_PASS_ATTEMPTS };
  const client = getRedisClient();
  if (client) {
    try {
      const existing = await client.get(remainingKey(licenseHash));
      await client.set(remainingKey(licenseHash), UNLIMITED_MOCK_PASS_ATTEMPTS);
      await client.set(metaKey(licenseHash), unlimitedMeta);
      return {
        remaining: UNLIMITED_MOCK_PASS_ATTEMPTS,
        granted: UNLIMITED_MOCK_PASS_ATTEMPTS,
        alreadyRedeemed: existing !== null && existing !== undefined,
      };
    } catch (error) {
      console.error("[mock-pass] redis unlimited grant failed", error);
      if (process.env.NODE_ENV === "production") storeUnavailable();
    }
  }

  const store = devStore();
  const existing = store.get(licenseHash);
  store.set(licenseHash, { ...unlimitedMeta, remaining: UNLIMITED_MOCK_PASS_ATTEMPTS });
  return {
    remaining: UNLIMITED_MOCK_PASS_ATTEMPTS,
    granted: UNLIMITED_MOCK_PASS_ATTEMPTS,
    alreadyRedeemed: Boolean(existing),
  };
}
