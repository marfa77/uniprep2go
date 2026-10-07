/**
 * Marketing social-proof floors (bootstrap until real volume is enough).
 * Public display = max(real, floor). When real exceeds the floor, real wins —
 * replace or lower floors in SOCIAL_PROOF_OVERRIDES as sales data arrives.
 */

export type SocialProofKind = "mockStarts" | "deckPurchases";

type TierId = "S" | "A" | "B" | "C";

/** Inclusive ranges — deterministic pick per slug so pages don't look cloned. */
const TIER_RANGES: Record<TierId, { mockStarts: [number, number]; deckPurchases: [number, number] }> = {
  S: { mockStarts: [260, 480], deckPurchases: [52, 118] },
  A: { mockStarts: [110, 230], deckPurchases: [22, 54] },
  B: { mockStarts: [42, 98], deckPurchases: [9, 24] },
  C: { mockStarts: [14, 36], deckPurchases: [3, 11] },
};

/** Explicit slug → tier. Unlisted slugs fall through to category heuristics. */
const SLUG_TIER: Record<string, TierId> = {
  // Flagship money / Layer B
  "sie-full-mock": "S",
  "sie-exam-anki-deck": "S",
  "sie-quick-diagnostic": "A",
  "series-7-readiness-check": "S",
  "series-7-anki-deck": "S",
  "series-63-readiness-check": "S",
  "series-63-anki-deck": "S",
  "ptcb-pharmacy-technician-mock": "S",
  "ptcb-pharmacy-technician-anki-deck": "S",
  "ptcb-study-guide-2026": "S",
  "cfa-level-1-readiness-check": "S",
  "cfa-level-1-anki-deck": "S",
  "cfa-level-2-readiness-check": "S",
  "cfa-level-2-anki-deck": "S",
  "cfa-level-2-formula-reference-2026": "A",
  "frm-part-1-readiness-check": "S",
  "frm-part-1-anki-deck": "S",
  "life-and-health-insurance-readiness-check": "S",
  "life-and-health-insurance-anki-deck": "S",
  "servsafe-manager-mock": "S",
  "servsafe-manager-anki-deck": "S",
  "california-real-estate-readiness-check": "S",
  "california-real-estate-anki-deck": "S",
  "epa-608-readiness-check": "A",
  "epa-608-anki-deck": "A",

  // Strong converters / recent live ships
  "belgium-flanders-mo-readiness-check": "A",
  "belgium-flanders-mo-anki-deck": "A",
  "rd-exam-readiness-check": "A",
  "rd-exam-anki-deck": "A",
  "medical-scribe-readiness-check": "A",
  "medical-scribe-anki-deck": "A",
  "ardms-spi-readiness-check": "B",
  "ardms-spi-anki-deck": "B",
  "ace-cpt-readiness-check": "A",
  "ace-cpt-anki-deck": "A",
  "gre-readiness-check": "A",
  "gre-anki-deck": "A",
  "gmat-focus-readiness-check": "A",
  "gmat-focus-anki-deck": "A",
  "series-65-readiness-check": "A",
  "series-65-anki-deck": "A",
  "series-66-readiness-check": "A",
  "series-66-anki-deck": "A",
  "nasm-cpt-readiness-check": "A",
  "nasm-cpt-anki-deck": "A",
  "nha-ccma-readiness-check": "A",
  "nha-ccma-anki-deck": "A",
  "servsafe-food-handler-readiness-check": "B",
  "servsafe-food-handler-anki-deck": "B",
  "luxembourg-vivre-ensemble-readiness-check": "B",
  "luxembourg-vivre-ensemble-anki-deck": "B",
  "cem-readiness-check": "B",
  "cem-anki-deck": "B",
  "ascp-mls-readiness-check": "B",
  "ascp-mlt-readiness-check": "B",
};

/** Manual overrides when a SKU needs a specific public number (real or staged). */
export const SOCIAL_PROOF_OVERRIDES: Partial<
  Record<SocialProofKind, Record<string, number>>
> = {
  mockStarts: {},
  deckPurchases: {},
};

function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickInRange(slug: string, salt: string, min: number, max: number): number {
  const span = max - min + 1;
  const n = hashSlug(`${slug}:${salt}`) % span;
  return min + n;
}

function inferTier(slug: string): TierId {
  const explicit = SLUG_TIER[slug];
  if (explicit) return explicit;

  // Thin state RE / appraiser — keep modest
  if (/-real-estate-/.test(slug) || /real-estate-appraiser/.test(slug)) {
    if (slug.startsWith("california-") || slug.startsWith("florida-") || slug.startsWith("texas-") || slug.startsWith("new-york-")) {
      return "A";
    }
    return "C";
  }

  // Language / citizenship catalog — mid social proof
  if (
    /anki-deck$/.test(slug) &&
    /(english-for-|delf|dele|ciple|celi|dtz|telc|goethe|citizenship|inburgering|vivre|norsk|sfi|a2-|b1-)/i.test(
      slug,
    )
  ) {
    return "B";
  }

  // Building / LEED / WELL family
  if (/(leed|well-ap|fitwel|ashrae|nebosh|osha|bms|bas)/i.test(slug)) {
    return "B";
  }

  // Finance leftovers
  if (/(series-|cfa-|frm-|cfp-|enrolled-agent|mortgage)/i.test(slug)) {
    return "A";
  }

  // Health / CDL wave default
  if (/(cpt|cna|cst|vtne|cdl|bls|phlebotomy|pharmacy|dialysis)/i.test(slug)) {
    return "B";
  }

  return "C";
}

export function socialProofTier(slug: string): TierId {
  return inferTier(slug);
}

export function socialProofFloor(kind: SocialProofKind, slug: string): number {
  const override = SOCIAL_PROOF_OVERRIDES[kind]?.[slug];
  if (typeof override === "number" && override > 0) {
    return Math.floor(override);
  }
  const tier = inferTier(slug);
  const [min, max] = TIER_RANGES[tier][kind];
  return pickInRange(slug, kind, min, max);
}

/** Public number: real activity wins once it clears the marketing floor. */
export function withSocialProofFloor(
  kind: SocialProofKind,
  slug: string,
  realCount: number | null | undefined,
): number {
  const floor = socialProofFloor(kind, slug);
  const real =
    typeof realCount === "number" && Number.isFinite(realCount) && realCount > 0
      ? Math.floor(realCount)
      : 0;
  return Math.max(real, floor);
}
