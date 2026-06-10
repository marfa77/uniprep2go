export const VISITOR_ID_STORAGE_KEY = "uniprep2go:visitorId";

export function getOrCreateVisitorId() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const visitorId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `vis_${crypto.randomUUID()}`
      : `vis_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
  return visitorId;
}
