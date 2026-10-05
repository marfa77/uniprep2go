import fs from "node:fs";
import path from "node:path";
import { getDeckCoverUrl } from "@/lib/deck-media";
import { getCatalogDeckBySlug } from "@/lib/decks";

function publicFileExists(publicPath: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

/** Same cover the deck landing shows; null when no real file exists (avoids 404 og:image). */
export function getLinkedDeckCoverUrl(deckSlug: string): string | null {
  const deck = getCatalogDeckBySlug(deckSlug);
  const candidate = deck ? getDeckCoverUrl({ ...deck, slug: deckSlug }) : `/covers/${deckSlug}.webp`;
  if (!candidate) return null;
  if (/^https?:\/\//.test(candidate)) return candidate;
  return publicFileExists(candidate) ? candidate : null;
}
