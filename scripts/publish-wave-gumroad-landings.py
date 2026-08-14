#!/usr/bin/env python3
"""Publish Gumroad custom landing pages for wave Anki decks with Sample cards in the body.

Gumroad strips <img> from the default product description. Custom landing HTML keeps them.
Sample JPGs are hosted on public-files.gumroad.com (upload as covers → capture URL → remove).
"""

from __future__ import annotations

import argparse
import html
import json
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SPECS_PATH = ROOT / "src/data/wave-deck-specs.json"
CATALOG_PATH = ROOT / "src/data/gumroad/wave-anki-decks.json"
CDN_CACHE_PATH = ROOT / "src/data/gumroad/wave-sample-cdn.json"
SAMPLES_DIR = ROOT / "public/samples"
COVERS_DIR = ROOT / "public/covers"
OUT_DIR = ROOT / "landing-pages/wave"


def e(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def gumroad_json(args: list[str]) -> dict[str, Any]:
    out = subprocess.run(
        ["gumroad", *args, "--json", "--non-interactive", "--yes"],
        capture_output=True,
        text=True,
        check=False,
    )
    if out.returncode != 0:
        raise RuntimeError(out.stderr.strip() or out.stdout.strip() or "gumroad failed")
    return json.loads(out.stdout)


def sample_paths(slug: str) -> list[Path]:
    paths = [SAMPLES_DIR / f"{slug}-sample-{n}.webp" for n in (1, 2, 3)]
    return [p for p in paths if p.exists()]


def load_cdn_cache() -> dict[str, list[str]]:
    if CDN_CACHE_PATH.exists():
        return json.loads(CDN_CACHE_PATH.read_text(encoding="utf-8"))
    return {}


def save_cdn_cache(cache: dict[str, list[str]]) -> None:
    CDN_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CDN_CACHE_PATH.write_text(json.dumps(cache, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def ensure_sample_cdn_urls(
    product_id: str, slug: str, cache: dict[str, list[str]], *, force: bool = False
) -> list[str]:
    """Host sample JPGs on public-files.gumroad.com without leaving them as covers."""
    paths = sample_paths(slug)
    if len(paths) < 3:
        raise RuntimeError(f"{slug}: need 3 sample webps at public/samples/{slug}-sample-{{1,2,3}}.webp")
    cached = cache.get(slug) or []
    if not force and len(cached) >= 3:
        return cached[:3]

    before = gumroad_json(["products", "view", product_id])
    covers_before = ((before.get("product") or before).get("covers") or [])
    # Gumroad hard-caps at 8 previews; free slots before temporary CDN uploads.
    if len(covers_before) > 5:
        for cover in reversed(covers_before[1:]):
            cid = cover.get("id")
            if not cid:
                continue
            subprocess.run(
                [
                    "gumroad",
                    "products",
                    "covers",
                    "remove",
                    product_id,
                    cid,
                    "--yes",
                    "--non-interactive",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
        before = gumroad_json(["products", "view", product_id])
        covers_before = ((before.get("product") or before).get("covers") or [])

    before_ids = {c.get("id") for c in covers_before if c.get("id")}

    uploaded_ids: list[str] = []
    with tempfile.TemporaryDirectory(prefix="gumroad-wave-sample-cdn-") as tmp:
        for path in paths:
            jpg = Path(tmp) / f"{path.stem}.jpg"
            # Prefer magick; fall back to sips on macOS.
            try:
                subprocess.run(
                    ["magick", str(path), "-quality", "88", str(jpg)],
                    check=True,
                    capture_output=True,
                )
            except (FileNotFoundError, subprocess.CalledProcessError):
                subprocess.run(
                    ["sips", "-s", "format", "jpeg", str(path), "--out", str(jpg)],
                    check=True,
                    capture_output=True,
                )
            add = subprocess.run(
                [
                    "gumroad",
                    "products",
                    "covers",
                    "add",
                    product_id,
                    "--image",
                    str(jpg),
                    "--yes",
                    "--non-interactive",
                    "--json",
                ],
                capture_output=True,
                text=True,
            )
            if add.returncode != 0:
                raise RuntimeError(f"cover add failed for {slug}: {add.stderr or add.stdout}")
            view = gumroad_json(["products", "view", product_id])
            covers = (view.get("product") or view).get("covers") or []
            for cover in covers:
                cid = cover.get("id")
                if cid and cid not in before_ids and cid not in uploaded_ids:
                    uploaded_ids.append(cid)

    after = gumroad_json(["products", "view", product_id])
    covers = (after.get("product") or after).get("covers") or []
    by_id = {c.get("id"): c for c in covers if c.get("id")}
    urls: list[str] = []
    for cid in uploaded_ids:
        cover = by_id.get(cid) or {}
        url = cover.get("original_url") or cover.get("url")
        if url:
            urls.append(url)
        subprocess.run(
            [
                "gumroad",
                "products",
                "covers",
                "remove",
                product_id,
                cid,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    if len(urls) < 3:
        raise RuntimeError(f"expected 3 CDN urls for {slug}, got {len(urls)}")
    cache[slug] = urls
    save_cdn_cache(cache)
    return urls


def cover_url_from_product(product: dict[str, Any]) -> str:
    covers = product.get("covers") or []
    if not covers:
        return ""
    first = covers[0] or {}
    return str(first.get("original_url") or first.get("url") or "")


def render_landing(
    spec: dict[str, Any],
    product: dict[str, Any],
    cover_url: str,
    sample_urls: list[str],
) -> str:
    slug = spec["deckSlug"]
    exam = spec.get("deckLabel") or spec.get("deckName") or slug
    count = spec.get("cardCount") or ""
    disclaimer = spec.get("disclaimerOrg") or exam
    mock_slug = spec.get("mockSlug") or ""
    checkout = product.get("short_url") or product.get("url") or f"https://pixidstudio.gumroad.com/l/{slug}"
    price = product.get("formatted_price") or product.get("price") or "$11"
    headline = product.get("name") or spec.get("gumroadName") or f"{exam} Anki Deck"
    mock_url = f"https://uniprep2go.study/mock-exams/{mock_slug}" if mock_slug else "https://uniprep2go.study/mock-exams"
    deck_url = f"https://uniprep2go.study/decks/{slug}"
    topics = list((spec.get("topics") or {}).values())
    captions = topics[:3] if topics else [f"Sample {i}" for i in range(1, 4)]

    sample_figures = []
    for i, url in enumerate(sample_urls[:3], 1):
        caption = captions[i - 1] if i - 1 < len(captions) else f"Sample {i}"
        sample_figures.append(
            f"""        <figure class="card overflow-hidden rounded-2xl">
          <img src="{e(url)}" alt="{e(exam)} sample card {i}" class="w-full h-auto object-contain" loading="lazy">
          <figcaption class="px-3 py-2 text-xs text-muted">{e(caption)}</figcaption>
        </figure>"""
        )

    cover_block = ""
    if cover_url:
        cover_block = (
            f'<figure class="card overflow-hidden rounded-2xl shadow-sm">'
            f'<img src="{e(cover_url)}" alt="{e(exam)} Anki deck cover" '
            f'class="w-full h-auto object-cover" loading="eager"></figure>'
        )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(headline)}</title>
  <meta name="description" content="{e(count)} {e(exam)} Anki flashcards with explanations — UniPrep2Go.">
  <link rel="canonical" href="{e(checkout)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {{ --bg:#f4f7fb; --fg:#0f172a; --muted:#475569; --card:#ffffff; --border:rgba(15,23,42,.12); --accent:#1d4ed8; }}
    body {{ background:var(--bg); color:var(--fg); }}
    .card {{ background:var(--card); border:1px solid var(--border); }}
    .text-muted {{ color:var(--muted); }}
    .btn {{ background:var(--fg); color:#fff; }}
    .btn:hover {{ background:var(--accent); }}
  </style>
</head>
<body class="antialiased font-sans">
  <header class="sticky top-0 z-40 border-b backdrop-blur" style="background:color-mix(in srgb,var(--bg) 90%,transparent);border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
      <p class="font-semibold text-sm truncate">{e(headline)}</p>
      <a href="{e(checkout)}" data-gumroad-action="buy" class="btn rounded-full px-4 py-2 text-sm font-semibold">{e(price)}</a>
    </div>
  </header>
  <main class="max-w-4xl mx-auto px-5 py-10">
    <p class="text-xs uppercase tracking-[0.18em] text-blue-700 font-semibold">UniPrep2Go · {e(exam)}</p>
    <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{e(headline)}</h1>
    <div class="mt-8 grid lg:grid-cols-2 gap-8 items-start">
      <div class="space-y-4">
        <p class="text-lg leading-8"><strong>{e(count)} MCQ Anki cards</strong> with explanations and distractor notes — built for daily spaced repetition before the {e(exam)} exam.</p>
        <p class="text-muted leading-7">Independent study aid. Instant <code>.apkg</code> download for Anki desktop / AnkiMobile / AnkiDroid. Not affiliated with {e(disclaimer)}.</p>
        <div class="flex flex-col sm:flex-row gap-3 pt-1">
          <a href="{e(checkout)}" data-gumroad-action="buy" class="btn inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold">Get the deck — {e(price)}</a>
          <a href="{e(mock_url)}" class="inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold card">Free readiness check</a>
        </div>
      </div>
      {cover_block}
    </div>

    <section id="samples" class="mt-12" aria-labelledby="samples-heading">
      <h2 id="samples-heading" class="text-2xl font-semibold tracking-tight">Sample cards</h2>
      <p class="mt-2 text-sm text-muted">Real Anki screenshots from this deck — question, options, correct answer, and explanation.</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
{chr(10).join(sample_figures)}
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold tracking-tight">What's inside</h2>
      <ul class="mt-4 space-y-2 text-muted leading-7">
        <li>{e(count)} high-yield MCQ cards with explanations</li>
        <li>Same validated bank as the free UniPrep2Go readiness check</li>
        <li>Import once, review on phone every day</li>
      </ul>
      <p class="mt-4 text-sm text-muted">Also on UniPrep2Go: <a class="underline" href="{e(deck_url)}">deck page</a> · <a class="underline" href="{e(mock_url)}">free check</a>.</p>
    </section>
  </main>
</body>
</html>
"""


def publish_landing(product_id: str, html_doc: str) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as fh:
        fh.write(html_doc)
        path = fh.name
    try:
        out = subprocess.run(
            [
                "gumroad",
                "products",
                "page",
                "publish",
                product_id,
                path,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
        )
        if out.returncode != 0:
            raise RuntimeError(out.stderr.strip() or out.stdout.strip())
    finally:
        Path(path).unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append", dest="slugs")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force-cdn", action="store_true")
    args = parser.parse_args()

    specs = json.loads(SPECS_PATH.read_text(encoding="utf-8"))
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    cdn_cache = load_cdn_cache()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    slugs = args.slugs or [
        slug
        for slug, rec in catalog.get("products", {}).items()
        if rec.get("gumroadProductId") and len(sample_paths(slug)) >= 3
    ]

    results: list[str] = []
    for slug in slugs:
        try:
            spec = specs.get(slug)
            record = catalog.get("products", {}).get(slug) or {}
            product_id = record.get("gumroadProductId")
            if not spec or not product_id:
                raise RuntimeError("missing wave-deck-specs or gumroadProductId")

            if args.dry_run and not args.force_cdn and slug in cdn_cache:
                sample_urls = cdn_cache[slug][:3]
            elif args.dry_run:
                sample_urls = [f"https://public-files.gumroad.com/dry-run-{slug}-{i}" for i in range(1, 4)]
            else:
                sample_urls = ensure_sample_cdn_urls(
                    product_id, slug, cdn_cache, force=args.force_cdn
                )

            view = {"product": {}} if args.dry_run else gumroad_json(["products", "view", product_id])
            product = view.get("product") or view
            if args.dry_run:
                product = {
                    "name": spec.get("gumroadName"),
                    "short_url": record.get("shortUrl"),
                    "formatted_price": "$11",
                }
            cover_url = cover_url_from_product(product)
            if not cover_url and (COVERS_DIR / f"{slug}.webp").exists():
                cover_url = f"https://uniprep2go.study/covers/{slug}.webp"

            html_doc = render_landing(spec, product, cover_url, sample_urls)
            out_path = OUT_DIR / f"{slug}.html"
            out_path.write_text(html_doc, encoding="utf-8")

            if args.dry_run:
                results.append(f"DRY   {slug} → {out_path} ({len(html_doc)} chars)")
                continue

            publish_landing(product_id, html_doc)
            catalog["products"][slug] = {
                **record,
                "landingPublishedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
            }
            results.append(f"OK    {slug} (cdn={len(sample_urls)})")
        except Exception as exc:  # noqa: BLE001
            results.append(f"FAIL  {slug}: {exc}")

    CATALOG_PATH.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("\n".join(results))


if __name__ == "__main__":
    main()
