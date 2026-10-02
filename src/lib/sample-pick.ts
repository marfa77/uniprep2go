/**
 * Selling-sample picker shared by mock pages (TSX) and scripts/refresh-sold-samples.mjs.
 * Keep this file import-free and erasable-TS only so Node can load it directly.
 *
 * Pipeline: hard quality gate (score <= 0 is dropped) -> top-quality pool ->
 * seeded shuffle -> topic + wording diversity. The seed is slug + pool content,
 * so picks stay stable between renders and re-roll only when the bank changes.
 */

export type PickOptions<T> = {
  count: number;
  score: (item: T) => number;
  text: (item: T) => string;
  topic?: (item: T) => string;
  seed: string;
  /** Pool = items scoring >= best * minRatio, capped at max(count * poolFactor, 25%), floor count * 2. */
  poolFactor?: number;
  minRatio?: number;
  maxSimilarity?: number;
};

export function hashSeed(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wordSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\u00c0-\u024f]+/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 4),
  );
}

export function textSimilarity(a: string, b: string): number {
  const left = wordSet(a);
  const right = wordSet(b);
  if (!left.size || !right.size) return 0;
  let shared = 0;
  for (const word of left) if (right.has(word)) shared += 1;
  return shared / (left.size + right.size - shared);
}

export function pickSellingSamples<T>(items: T[], options: PickOptions<T>): T[] {
  const { count, score, text, topic, seed } = options;
  const poolFactor = options.poolFactor ?? 4;
  const maxSimilarity = options.maxSimilarity ?? 0.45;

  const ranked = items
    .map((item) => ({ item, value: score(item) }))
    .filter((row) => row.value > 0)
    .sort((a, b) => b.value - a.value || text(a.item).localeCompare(text(b.item)));
  if (ranked.length <= count) return ranked.map((row) => row.item);

  const floor = ranked[0].value * (options.minRatio ?? 0.8);
  const strong = ranked.filter((row) => row.value >= floor).length;
  const poolSize = Math.min(
    ranked.length,
    Math.max(count * 2, Math.min(strong, Math.max(count * poolFactor, Math.ceil(ranked.length * 0.25)))),
  );
  const pool = ranked.slice(0, poolSize).map((row) => row.item);
  const fingerprint = pool.map((item) => text(item)).join("\u0001");
  const random = seededRandom(hashSeed(`${seed}\u0000${fingerprint}`));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const picked: T[] = [];
  const usedTopics = new Set<string>();
  const tooSimilar = (item: T) =>
    picked.some((other) => textSimilarity(text(other), text(item)) > maxSimilarity);

  for (const item of pool) {
    if (picked.length >= count) break;
    const itemTopic = topic?.(item) ?? "";
    if (itemTopic && usedTopics.has(itemTopic)) continue;
    if (tooSimilar(item)) continue;
    picked.push(item);
    if (itemTopic) usedTopics.add(itemTopic);
  }
  for (const item of [...pool, ...ranked.slice(poolSize).map((row) => row.item)]) {
    if (picked.length >= count) break;
    if (picked.includes(item) || tooSimilar(item)) continue;
    picked.push(item);
  }
  return picked;
}
