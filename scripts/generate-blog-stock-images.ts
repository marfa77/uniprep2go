/**
 * Generates 1200×630 WebP stock images for blog guides (Pexels Photos API).
 *
 *   npx tsx scripts/generate-blog-stock-images.ts
 *   npx tsx scripts/generate-blog-stock-images.ts --force
 *   npx tsx scripts/generate-blog-stock-images.ts epa-608-practice-test-hero
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
const MIN_WEBP_BYTES = 15_000;

function blogStockImageFilePath(id: string) {
  return path.join(process.cwd(), BLOG_STOCK_IMAGES_DIR, `${id}.webp`);
}

type PexelsSearchResponse = {
  photos?: Array<{ src?: { landscape?: string; large?: string } }>;
};

async function searchPexelsPhoto(query: string): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY?.trim();
  if (!apiKey) return null;

  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    per_page: "8",
  });

  const res = await fetch(`${PEXELS_API}?${params}`, {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    console.warn(`[blog-stock] Pexels search failed (${res.status}) for "${query}"`);
    return null;
  }

  const json = (await res.json()) as PexelsSearchResponse;
  for (const photo of json.photos ?? []) {
    const url = photo.src?.landscape || photo.src?.large;
    if (url) return url;
  }
  return null;
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

  for (const query of slot.queries) {
    const url = await searchPexelsPhoto(query);
    if (!url) continue;
    try {
      const webp = await photoUrlToWebpBuffer(url);
      if (webp.length < MIN_WEBP_BYTES) continue;
      fs.mkdirSync(path.join(process.cwd(), BLOG_STOCK_IMAGES_DIR), { recursive: true });
      fs.writeFileSync(dest, webp);
      console.log(`[blog-stock] ${slot.id}: saved from "${query}" → ${blogStockImagePublicPath(slot.id)}`);
      await new Promise((r) => setTimeout(r, 350));
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
