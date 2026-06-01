# Shop preview sample media (first 3 words/phrases)

Images and audio for the "Sample (first 3 words/phrases)" table on deck preview pages (`/shop/preview/[slug]`). One folder per slug: `1.webp`, `1.mp3`, `2.webp`, `2.mp3`, `3.webp`, `3.mp3`.

**Two ways to fill:**

1. **From shared Anki Generator output**:

   ```bash
   npx tsx scripts/copy-shop-preview-media-from-anki.ts
   ```

   Copies first 3 cards' media from `Anki Generator/out/{deck}/media/` (1000000, 1000001, 1000002 → 1.webp, 1.mp3, …). Set `ANKI_OUT` if needed.

2. **From LITE .apkg** (phrase decks, Danish/Norwegian exam decks, or whenever Anki `out/` is missing):
   ```bash
   npx tsx scripts/extract-preview-media-from-apkg.ts Arabic_for_UAE Russian_Phrases Japanese_Phrases Korean_Phrases Prove_i_Dansk_PD2 Norskprove_Bokmal
   ```
   Extracts media from `public/shop-downloads/{slug}_LITE.apkg` into this folder. **Use only real deck media** — do not commit synthetic placeholder images/audio; the preview table must match what is inside the shipped `.apkg`.

**Verify:** Run `npx tsx scripts/verify-preview-samples.ts` to ensure `shop-preview-samples.json` matches the first 3 notes in each LITE .apkg.

See `docs/SHOP_PREVIEW_AND_MEDIA.md` for full documentation.
