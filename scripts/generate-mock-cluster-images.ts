/**
 * Generates 1200×630 WebP heroes for mock-exam hub clusters (Pexels Photos API).
 * Pattern mirrored from Emigro program-card images.
 *
 *   npm run generate:mock-cluster-images
 *   npm run generate:mock-cluster-images -- allied-health
 *   npm run generate:mock-cluster-images -- --force
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { resolve } from "node:path";
import sharp from "sharp";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import {
  MOCK_CLUSTER_IMAGE_CONFIG,
  MOCK_CLUSTER_IMAGE_TYPES,
  MOCK_CLUSTER_IMAGES_DIR,
  mockClusterImagePublicPath,
  type MockClusterImageType,
} from "../src/lib/mock-exams/cluster-images";

const PEXELS_API = "https://api.pexels.com/v1/search";
const MIN_WEBP_BYTES = 15_000;

function mockClusterImageFilePath(type: MockClusterImageType) {
  return path.join(process.cwd(), MOCK_CLUSTER_IMAGES_DIR, `${type}.webp`);
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
    console.warn(`[mock-cluster] Pexels search failed (${res.status}) for "${query}"`);
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

async function ensureClusterImage(type: MockClusterImageType, force = false): Promise<boolean> {
  const dest = mockClusterImageFilePath(type);
  if (!force && fs.existsSync(dest) && fs.statSync(dest).size >= MIN_WEBP_BYTES) {
    console.log(`[mock-cluster] ${type}: exists`);
    return false;
  }

  const queries = MOCK_CLUSTER_IMAGE_CONFIG[type]?.queries;
  if (!queries?.length) {
    console.warn(`[mock-cluster] ${type}: no queries defined`);
    return false;
  }

  for (const query of queries) {
    const url = await searchPexelsPhoto(query);
    if (!url) continue;
    try {
      const webp = await photoUrlToWebpBuffer(url);
      if (webp.length < MIN_WEBP_BYTES) continue;
      fs.mkdirSync(path.join(process.cwd(), MOCK_CLUSTER_IMAGES_DIR), { recursive: true });
      fs.writeFileSync(dest, webp);
      console.log(`[mock-cluster] ${type}: saved from "${query}" → ${mockClusterImagePublicPath(type)}`);
      await new Promise((r) => setTimeout(r, 350));
      return true;
    } catch (error) {
      console.warn(
        `[mock-cluster] ${type}: error for "${query}":`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.warn(`[mock-cluster] ${type}: no photo found`);
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const typeArgs = args.filter((a) => !a.startsWith("--")) as MockClusterImageType[];
  const invalid = typeArgs.filter((t) => !MOCK_CLUSTER_IMAGE_TYPES.includes(t));
  if (invalid.length) {
    console.error(`[mock-cluster] unknown types: ${invalid.join(", ")}`);
    console.error(`[mock-cluster] valid: ${MOCK_CLUSTER_IMAGE_TYPES.join(", ")}`);
    process.exit(1);
  }

  const targets = typeArgs.length > 0 ? typeArgs : MOCK_CLUSTER_IMAGE_TYPES;

  if (!process.env.PEXELS_API_KEY?.trim()) {
    console.error("[mock-cluster] PEXELS_API_KEY missing in .env.local");
    process.exit(1);
  }

  let generated = 0;
  for (const type of targets) {
    if (await ensureClusterImage(type, force)) generated++;
  }

  console.log(`[mock-cluster] done — generated ${generated}/${targets.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
