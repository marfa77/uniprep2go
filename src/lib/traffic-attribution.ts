export const FIRST_TOUCH_STORAGE_KEY = "uniprep2go:firstTouch";

export type FirstTouchAttribution = {
  utmSource?: string;
  utmMedium?: string;
  referrer?: string;
  landingPath?: string;
  capturedAt: string;
};

export function parseUtmParams(search: string): {
  utmSource?: string;
  utmMedium?: string;
} {
  const query = search.startsWith("?") ? search.slice(1) : search;

  if (!query) {
    return {};
  }

  const params = new URLSearchParams(query);
  const utmSource = params.get("utm_source")?.trim() || undefined;
  const utmMedium = params.get("utm_medium")?.trim() || undefined;

  return { utmSource, utmMedium };
}

export function isLlmUtm(utmSource?: string, utmMedium?: string) {
  const source = utmSource?.trim().toLowerCase();
  const medium = utmMedium?.trim().toLowerCase();

  return source === "llm" || medium === "llm" || medium === "llms.txt";
}

/** Tagged UniPrep Threads links only — not a generic threads.net referrer. */
export function isThreadsTaggedTouch(utmSource?: string) {
  return utmSource?.trim().toLowerCase() === "threads";
}

function readStoredFirstTouch(storage: Storage): FirstTouchAttribution | undefined {
  try {
    const raw = storage.getItem(FIRST_TOUCH_STORAGE_KEY);

    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as FirstTouchAttribution;

    if (!parsed || typeof parsed !== "object" || typeof parsed.capturedAt !== "string") {
      return undefined;
    }

    return {
      utmSource: typeof parsed.utmSource === "string" ? parsed.utmSource : undefined,
      utmMedium: typeof parsed.utmMedium === "string" ? parsed.utmMedium : undefined,
      referrer: typeof parsed.referrer === "string" ? parsed.referrer : undefined,
      landingPath: typeof parsed.landingPath === "string" ? parsed.landingPath : undefined,
      capturedAt: parsed.capturedAt,
    };
  } catch {
    return undefined;
  }
}

function writeStoredFirstTouch(storage: Storage, value: FirstTouchAttribution) {
  storage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(value));
}

/**
 * Capture first-touch UTM/referrer once per browser.
 * If an earlier touch had no UTM but the current URL has UTM, enrich the stored touch.
 */
export function captureFirstTouchAttribution(input: {
  search: string;
  referrer: string;
  path: string;
  storage: Storage;
  now?: Date;
}): FirstTouchAttribution {
  const utm = parseUtmParams(input.search);
  const existing = readStoredFirstTouch(input.storage);

  if (existing) {
    if (!existing.utmSource && !existing.utmMedium && (utm.utmSource || utm.utmMedium)) {
      const enriched: FirstTouchAttribution = {
        ...existing,
        utmSource: utm.utmSource,
        utmMedium: utm.utmMedium,
      };
      writeStoredFirstTouch(input.storage, enriched);
      return enriched;
    }

    return existing;
  }

  const touch: FirstTouchAttribution = {
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    referrer: input.referrer.trim() || undefined,
    landingPath: input.path || undefined,
    capturedAt: (input.now ?? new Date()).toISOString(),
  };

  writeStoredFirstTouch(input.storage, touch);
  return touch;
}

export function getFirstTouchAttribution(storage: Storage): FirstTouchAttribution | undefined {
  return readStoredFirstTouch(storage);
}

const DEFAULT_SITE_HOSTS = ["uniprep2go.study"];

function isSameSiteReferrer(referrer: string, siteHosts: readonly string[]) {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") {
      return true;
    }
    return siteHosts.some((site) => host === site || host.endsWith(`.${site}`));
  } catch {
    return false;
  }
}

/**
 * Prefer first-touch acquisition referrer when the current document referrer is
 * same-site (internal navigation). Keeps Google/LLM channel attribution sticky
 * across page views in a session.
 */
export function resolveAttributionReferrer(
  documentReferrer: string,
  firstTouchReferrer?: string,
  siteHosts: readonly string[] = DEFAULT_SITE_HOSTS,
): string | undefined {
  const current = documentReferrer.trim();
  const firstTouch = firstTouchReferrer?.trim();

  if (!current) {
    return firstTouch || undefined;
  }

  if (isSameSiteReferrer(current, siteHosts) && firstTouch) {
    return firstTouch;
  }

  return current;
}
