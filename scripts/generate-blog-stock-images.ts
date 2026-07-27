/**
 * Generates 1200×630 WebP stock images for blog guides (Pexels Photos API).
 *
 * Prefers photos whose Pexels `alt` matches slot.mustInclude and rejects mustExclude.
 *
 *   npx tsx scripts/generate-blog-stock-images.ts
 *   npx tsx scripts/generate-blog-stock-images.ts --force
 *   npx tsx scripts/generate-blog-stock-images.ts epa-608-type-compare-appliance --force
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { resolve } from "node:path";
import sharp from "sharp";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import {
  BLOG_STOCK_IMAGES_DIR,
  listBlogStockImageSlots,
  blogStockImagePublicPath,
  type BlogStockImageSlot,
} from "../src/lib/blog/stock-images";

const PEXELS_API = "https://api.pexels.com/v1/search";
const PEXELS_PHOTO_API = "https://api.pexels.com/v1/photos";
const MIN_WEBP_BYTES = 15_000;

function blogStockImageFilePath(id: string) {
  return path.join(process.cwd(), BLOG_STOCK_IMAGES_DIR, `${id}.webp`);
}

type PexelsPhoto = {
  id?: number;
  alt?: string | null;
  src?: { landscape?: string; large2x?: string; large?: string };
};

type PexelsSearchResponse = {
  photos?: PexelsPhoto[];
};

function normalize(text: string): string {
  return text.toLowerCase();
}

function scorePhoto(photo: PexelsPhoto, slot: BlogStockImageSlot): number {
  const alt = normalize(photo.alt ?? "");
  if (!alt) return -5;

  for (const bad of slot.mustExclude ?? []) {
    if (alt.includes(normalize(bad))) return -1000;
  }

  let score = 0;
  const must = slot.mustInclude ?? [];
  if (must.length === 0) return 1;

  let hits = 0;
  for (const token of must) {
    if (alt.includes(normalize(token))) {
      hits += 1;
      score += 10;
    }
  }
  if (hits === 0) return -50;
  return score;
}

function photoUrl(photo: PexelsPhoto): string | null {
  return photo.src?.landscape || photo.src?.large2x || photo.src?.large || null;
}

async function searchPexelsPhotos(query: string): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY?.trim();
  if (!apiKey) return [];

  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    per_page: "30",
  });

  const res = await fetch(`${PEXELS_API}?${params}`, {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    console.warn(`[blog-stock] Pexels search failed (${res.status}) for "${query}"`);
    return [];
  }

  const json = (await res.json()) as PexelsSearchResponse;
  return json.photos ?? [];
}

async function fetchPexelsPhotoById(id: number): Promise<PexelsPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY?.trim();
  if (!apiKey) return null;
  const res = await fetch(`${PEXELS_PHOTO_API}/${id}`, {
    headers: { Authorization: apiKey },
  });
  if (!res.ok) {
    console.warn(`[blog-stock] Pexels photo ${id} failed (${res.status})`);
    return null;
  }
  return (await res.json()) as PexelsPhoto;
}

async function pickBestPhoto(
  slot: BlogStockImageSlot,
  query: string,
): Promise<{ url: string; alt: string; score: number } | null> {
  const photos = await searchPexelsPhotos(query);
  let best: { url: string; alt: string; score: number } | null = null;

  for (const photo of photos) {
    const url = photoUrl(photo);
    if (!url) continue;
    const score = scorePhoto(photo, slot);
    if (score < 0) continue;
    if (!best || score > best.score) {
      best = { url, alt: photo.alt ?? "", score };
    }
  }

  // Soft fallback: if filters wiped everything, take first non-excluded photo
  if (!best) {
    for (const photo of photos) {
      const url = photoUrl(photo);
      if (!url) continue;
      const alt = normalize(photo.alt ?? "");
      const excluded = (slot.mustExclude ?? []).some((bad) => alt.includes(normalize(bad)));
      if (excluded) continue;
      return { url, alt: photo.alt ?? "", score: 0 };
    }
  }

  return best;
}

async function photoUrlToWebpBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Photo download failed (${res.status}): ${url}`);
  const input = Buffer.from(await res.arrayBuffer());
  return sharp(input).resize(1200, 630, { fit: "cover", position: "center" }).webp({ quality: 82 }).toBuffer();
}

async function ensureStockImage(slot: BlogStockImageSlot, force = false): Promise<boolean> {
  const dest = blogStockImageFilePath(slot.id);
  if (!force && fs.existsSync(dest) && fs.statSync(dest).size >= MIN_WEBP_BYTES) {
    console.log(`[blog-stock] ${slot.id}: exists`);
    return false;
  }

  if (slot.pexelsPhotoId) {
    try {
      const photo = await fetchPexelsPhotoById(slot.pexelsPhotoId);
      const url = photo ? photoUrl(photo) : null;
      if (url) {
        const webp = await photoUrlToWebpBuffer(url);
        if (webp.length >= MIN_WEBP_BYTES) {
          fs.mkdirSync(path.join(process.cwd(), BLOG_STOCK_IMAGES_DIR), { recursive: true });
          fs.writeFileSync(dest, webp);
          console.log(
            `[blog-stock] ${slot.id}: pinned id=${slot.pexelsPhotoId} — ${(photo?.alt ?? "").slice(0, 80)} → ${blogStockImagePublicPath(slot.id)}`,
          );
          await new Promise((r) => setTimeout(r, 400));
          return true;
        }
      }
    } catch (error) {
      console.warn(
        `[blog-stock] ${slot.id}: pinned id ${slot.pexelsPhotoId} failed:`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  for (const query of slot.queries) {
    try {
      const pick = await pickBestPhoto(slot, query);
      if (!pick) {
        console.warn(`[blog-stock] ${slot.id}: no matching alt for "${query}"`);
        continue;
      }
      const webp = await photoUrlToWebpBuffer(pick.url);
      if (webp.length < MIN_WEBP_BYTES) continue;
      fs.mkdirSync(path.join(process.cwd(), BLOG_STOCK_IMAGES_DIR), { recursive: true });
      fs.writeFileSync(dest, webp);
      console.log(
        `[blog-stock] ${slot.id}: score=${pick.score} "${query}" — ${pick.alt.slice(0, 80)} → ${blogStockImagePublicPath(slot.id)}`,
      );
      await new Promise((r) => setTimeout(r, 400));
      return true;
    } catch (error) {
      console.warn(
        `[blog-stock] ${slot.id}: error for "${query}":`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.warn(`[blog-stock] ${slot.id}: no photo found`);
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const idArgs = args.filter((a) => !a.startsWith("--"));
  const allSlots = listBlogStockImageSlots();
  const slots =
    idArgs.length > 0 ? allSlots.filter((slot) => idArgs.includes(slot.id)) : allSlots;

  if (idArgs.length > 0 && slots.length !== idArgs.length) {
    const known = new Set(allSlots.map((s) => s.id));
    const missing = idArgs.filter((id) => !known.has(id));
    console.error(`[blog-stock] unknown ids: ${missing.join(", ")}`);
    process.exit(1);
  }

  if (!process.env.PEXELS_API_KEY?.trim()) {
    console.error("[blog-stock] PEXELS_API_KEY missing in .env.local");
    process.exit(1);
  }

  let saved = 0;
  for (const slot of slots) {
    if (await ensureStockImage(slot, force)) saved += 1;
  }
  console.log(`[blog-stock] done — ${saved} new, ${slots.length} targeted`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
