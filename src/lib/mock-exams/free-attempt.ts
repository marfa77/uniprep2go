import type { MockSessionMode } from "./session-mode";

export const FREE_MOCK_STORAGE_KEY = "uniprep2go:mock:freeAttempt";

export type FreeAttemptRecord = {
  slug: string;
  mode: MockSessionMode;
  at: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function readFreeAttempt(storage: StorageLike | null | undefined): FreeAttemptRecord | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(FREE_MOCK_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FreeAttemptRecord>;
    return {
      slug: typeof parsed.slug === "string" ? parsed.slug : "unknown",
      mode: parsed.mode === "learn" ? "learn" : "exam",
      at: typeof parsed.at === "string" ? parsed.at : "",
    };
  } catch {
    // Unparseable value still means the free attempt was taken.
    return { slug: "unknown", mode: "exam", at: "" };
  }
}

export function markFreeAttemptUsed(
  storage: StorageLike | null | undefined,
  record: FreeAttemptRecord,
): void {
  if (!storage) return;
  try {
    storage.setItem(FREE_MOCK_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage disabled (private mode quotas) — the attempt simply is not remembered.
  }
}

export function browserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
