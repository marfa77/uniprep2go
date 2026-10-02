#!/usr/bin/env python3
"""Printable "English Picture Dictionary for X speakers" PDFs from the Prep2Go EN-for-X app decks.

Input: prep2go app `scripts/output/dump_en_*.json` (dump_language_decks.py) + image_probe_en.json.
Output: .local-product-files/english-picture-dictionary/{lang}/*.pdf (+ cover PNG).

Word selection: frequency order from the en_pt master, only words whose picture is unique in the
deck and >= 600 px (or gpt-image-1 regen), with a translation + translated example in the target
language. Picture = en_pt master image (newest review state) for every language.

  /usr/bin/python3 scripts/build-english-picture-dictionary-pdf.py --lang pt
  /usr/bin/python3 scripts/build-english-picture-dictionary-pdf.py --lang all
"""

from __future__ import annotations

import argparse
import collections
import concurrent.futures as cf
import hashlib
import html
import io
import json
import subprocess
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DUMPS = Path("/Users/pavelveselov/Projects/prep2go app/scripts/output")
OUT = ROOT / ".local-product-files" / "english-picture-dictionary"
IMG_CACHE = OUT / "_img"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SITE = "https://uniprep2go.study"
IMG_PX = 360
PER_PAGE = 12
MAX_WORDS = 1000

LANGS = {
    "pt": dict(deck="en_pt", name="Brazilian Portuguese", short="PT-BR", html_lang="pt-BR", dir="ltr",
               anki="ielts-toefl-english-for-portuguese-speakers-anki-deck", file="Brazilian_Portuguese"),
    "es": dict(deck="en_es", name="Spanish", short="ES", html_lang="es", dir="ltr",
               anki="ielts-toefl-english-for-spanish-speakers-anki-deck", file="Spanish"),
    "fr": dict(deck="en_fr", name="French", short="FR", html_lang="fr", dir="ltr",
               anki="ielts-toefl-english-for-french-speakers-anki-deck", file="French"),
    "ru": dict(deck="en_ru", name="Russian", short="RU", html_lang="ru", dir="ltr",
               anki="ielts-toefl-english-for-russian-speakers-anki-deck", file="Russian"),
    "uk": dict(deck="en_uk", name="Ukrainian", short="UK", html_lang="uk", dir="ltr",
               anki="ielts-toefl-english-for-ukrainian-speakers-anki-deck", file="Ukrainian"),
    "ar": dict(deck="en_ar", name="Arabic", short="AR", html_lang="ar", dir="rtl",
               anki="ielts-toefl-english-for-arabic-speakers-anki-deck", file="Arabic"),
    "tr": dict(deck="en_tr", name="Turkish", short="TR", html_lang="tr", dir="ltr",
               anki="ielts-toefl-english-for-turkish-speakers-anki-deck", file="Turkish"),
}


def load_deck(deck: str) -> dict[str, dict]:
    rows = json.loads((DUMPS / f"dump_{deck}.json").read_text("utf-8"))
    return {r["front_text"]: r for r in rows}


def select_words(lang: str) -> list[dict]:
    master = sorted(load_deck("en_pt").values(), key=lambda c: c["position"])
    target = load_deck(LANGS[lang]["deck"])
    probe = json.loads((DUMPS / "image_probe_en.json").read_text("utf-8"))
    uses = collections.Counter(c["image_url"] for c in master)

    def sharp(url: str) -> bool:
        if "_regen_" in url:
            return True
        wh = (probe.get(url) or {}).get("wh") or [0, 0]
        return wh[0] >= 600

    words = []
    for c in master:
        url = (c.get("image_url") or "").strip()
        t = target.get(c["front_text"])
        if not url or uses[url] != 1 or not sharp(url) or not t:
            continue
        if not (t["back_text"] or "").strip() or not (t["example_back"] or "").strip():
            continue
        words.append({
            "en": "I" if c["front_text"] == "i" else c["front_text"],
            "tr": t["back_text"].strip(),
            "ex_en": (t["example_front"] or c["example_front"] or "").strip(),
            "ex_tr": t["example_back"].strip(),
            "img": url,
        })
        if len(words) >= MAX_WORDS:
            break
    for i, w in enumerate(words, 1):
        w["n"] = i
    return words


def cache_image(url: str) -> Path:
    dest = IMG_CACHE / (hashlib.sha1(url.encode()).hexdigest()[:16] + ".jpg")
    if dest.exists():
        return dest
    with urllib.request.urlopen(url, timeout=60) as r:
        raw = r.read()
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    side = min(im.size)
    left, top = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((IMG_PX, IMG_PX), Image.LANCZOS)
    im.save(dest, "JPEG", quality=74, optimize=True, progressive=False)
    return dest


def fetch_images(words: list[dict]) -> None:
    IMG_CACHE.mkdir(parents=True, exist_ok=True)
    with cf.ThreadPoolExecutor(24) as pool:
        paths = list(pool.map(cache_image, [w["img"] for w in words]))
    for w, p in zip(words, paths):
        w["path"] = p.as_uri()


CSS = """
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact }
body { font-family: -apple-system, "Helvetica Neue", Arial, "Geeza Pro", sans-serif; color: #1f2933 }
.page { width: 210mm; height: 297mm; padding: 11mm 10mm 9mm; position: relative; page-break-after: always; overflow: hidden }
.page:last-child { page-break-after: auto }
.hd { display: flex; justify-content: space-between; align-items: baseline; font-size: 8pt; color: #7b8794;
      border-bottom: 0.4mm solid #e4e7eb; padding-bottom: 1.6mm; margin-bottom: 3mm }
.hd b { color: #c2410c; font-size: 9pt; letter-spacing: .02em }
.ft { position: absolute; left: 10mm; right: 10mm; bottom: 5mm; display: flex; justify-content: space-between; font-size: 7pt; color: #9aa5b1 }
.grid { display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 42.4mm; gap: 1.6mm 4mm }
.cell { display: grid; grid-template-columns: 37mm 1fr; gap: 3mm; border: 0.3mm solid #e4e7eb; border-radius: 2.5mm; padding: 2mm; background: #fff }
.cell img { width: 37mm; height: 37mm; object-fit: cover; border-radius: 1.8mm; display: block }
.txt { display: flex; flex-direction: column; min-width: 0 }
.top { display: flex; justify-content: space-between; align-items: center; font-size: 7pt; color: #9aa5b1 }
.box { width: 3.2mm; height: 3.2mm; border: 0.3mm solid #9aa5b1; border-radius: 0.6mm }
.w { font-size: 14.5pt; font-weight: 700; line-height: 1.1; margin-top: 0.6mm; color: #102a43; overflow-wrap: anywhere }
.t { font-size: 10.5pt; color: #c2410c; font-weight: 600; line-height: 1.2; margin-top: 0.8mm }
.ex { font-size: 7.4pt; line-height: 1.28; margin-top: auto; color: #334e68 }
.ex i { display: block; color: #52606d }
.ex span { display: block; margin-top: 0.5mm; color: #7b8794 }
[dir=rtl] { text-align: right; font-family: "Geeza Pro", "Noto Naskh Arabic", "Arial", sans-serif }
.t[dir=rtl] { font-size: 11.5pt }
.cover { background: #fff7ed; padding: 18mm 16mm }
.brand { font-size: 10pt; letter-spacing: .25em; text-transform: uppercase; color: #c2410c; font-weight: 700 }
.cover h1 { font-size: 34pt; line-height: 1.05; margin-top: 10mm; color: #102a43 }
.cover h2 { font-size: 18pt; font-weight: 600; color: #c2410c; margin-top: 4mm }
.cover .sub { font-size: 11.5pt; color: #334e68; margin-top: 6mm; line-height: 1.5 }
.mosaic { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 12mm }
.mosaic figure { background: #fff; border-radius: 3mm; padding: 2mm; box-shadow: 0 0.5mm 1.5mm rgba(0,0,0,.08) }
.mosaic img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 2mm; display: block }
.mosaic figcaption { font-size: 9pt; font-weight: 700; margin-top: 1.5mm; display: flex; justify-content: space-between; gap: 2mm }
.mosaic figcaption span { color: #c2410c; font-weight: 600 }
.cover .meta { position: absolute; left: 16mm; right: 16mm; bottom: 14mm; font-size: 9pt; color: #52606d; display: flex; justify-content: space-between }
.prose { font-size: 10.5pt; line-height: 1.55; color: #334e68 }
.prose h3 { font-size: 16pt; color: #102a43; margin: 4mm 0 3mm }
.prose h4 { font-size: 11.5pt; color: #c2410c; margin: 6mm 0 2mm }
.prose ol, .prose ul { margin-left: 6mm }
.prose li { margin: 1.2mm 0 }
.plan { display: grid; grid-template-columns: repeat(10, 1fr); gap: 1.5mm; margin-top: 3mm }
.plan div { border: 0.3mm solid #cbd2d9; border-radius: 1mm; font-size: 7pt; text-align: center; padding: 1.5mm 0; color: #52606d }
.idx { column-count: 3; column-gap: 6mm; font-size: 7.3pt; line-height: 1.42 }
.idx div { display: flex; gap: 1.5mm; break-inside: avoid; white-space: nowrap; overflow: hidden }
.idx b { color: #102a43 } .idx em { color: #9aa5b1; font-style: normal; margin-left: auto; padding-left: 1mm }
.idx span { color: #c2410c; overflow: hidden; text-overflow: ellipsis }
.idx h3 { column-span: all; font-size: 13pt; color: #102a43; margin-bottom: 2mm }
"""


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def l1(text: str, cfg: dict, cls: str = "", tag: str = "div") -> str:
    attrs = f' class="{cls}"' if cls else ""
    return f'<{tag}{attrs} lang="{cfg["html_lang"]}" dir="{cfg["dir"]}">{esc(text)}</{tag}>'


def build_html(lang: str, words: list[dict]) -> str:
    cfg = LANGS[lang]
    n = len(words)
    title = f"English Picture Dictionary for {cfg['name']} Speakers"
    footer_brand = f"prep2go · {title}"
    pages: list[str] = []

    mosaic_pick = [w for w in words[:120] if len(w["en"]) <= 10][:9]
    mosaic = "".join(
        f'<figure><img src="{w["path"]}"><figcaption><b>{esc(w["en"])}</b>'
        f'{l1(w["tr"].split(" / ")[0], cfg, tag="span")}</figcaption></figure>'
        for w in mosaic_pick
    )
    pages.append(
        f'<section class="page cover"><div class="brand">prep2go</div>'
        f"<h1>English Picture<br>Dictionary</h1><h2>for {esc(cfg['name'])} speakers</h2>"
        f'<p class="sub">The <b>{n:,} most frequent English words</b>, each with its own picture, '
        f"a {esc(cfg['name'])} translation, and an English example sentence with translation. "
        f"Printable A4 — study {max(1, n // 50)} words a day, tick what you know.</p>"
        f'<div class="mosaic">{mosaic}</div>'
        f'<div class="meta"><span>{n:,} words · {(n + PER_PAGE - 1) // PER_PAGE} picture pages · A–Z index</span>'
        f"<span>Independent study aid · Prep2Go / PixID Studio</span></div></section>"
    )

    days = (n + 19) // 20
    plan = "".join(f"<div>Day {d}</div>" for d in range(1, min(days, 50) + 1))
    pages.append(
        f'<section class="page"><div class="prose"><div class="brand">How to use this book</div>'
        f"<h3>{n:,} words, ranked by how often you will meet them</h3>"
        f"<p>Words are ordered by frequency in everyday and exam English: #1 is the most common. "
        f"These are the core words of simple texts, emails, and conversations — "
        f"a base for A2–B1 English, IELTS and TOEFL vocabulary, work, and travel.</p>"
        f"<h4>A 20-words-a-day routine</h4><ol>"
        f"<li><b>Look at the picture and the English word.</b> Say the word out loud.</li>"
        f"<li><b>Cover the {esc(cfg['name'])} line</b> with a strip of paper and try to recall the meaning.</li>"
        f"<li><b>Read the example sentence</b> aloud — it shows the word in a real context.</li>"
        f"<li><b>Tick the box</b> in the corner of the card when you know the word without looking.</li>"
        f"<li><b>Every 7 days</b>, re-test the ticked words from last week. Un-tick any you forgot.</li></ol>"
        f"<h4>Your {days}-day plan (20 words a day)</h4><div class=\"plan\">{plan}</div>"
        f"<h4>Printing tips</h4><ul><li>A4 paper, 100% scale. On US Letter choose “Fit to page”.</li>"
        f"<li>Colour printing looks best; greyscale works too.</li>"
        f"<li>Print only the pages you need — each page holds {PER_PAGE} words.</li></ul>"
        f"<h4>Want audio and spaced repetition?</h4>"
        f"<p>The same word bank (with native English audio) is available as an Anki flashcard deck: "
        f"<b>{SITE}/decks/{cfg['anki']}</b></p>"
        f'<p style="margin-top:6mm;font-size:8.5pt;color:#7b8794">Independent study aid. Not official IELTS, TOEFL, '
        f"Cambridge, or PTE material. Illustrations are for vocabulary memory, not literal definitions. "
        f"© Prep2Go / PixID Studio — personal use only; do not resell or redistribute.</p>"
        f"</div></section>"
    )

    for start in range(0, n, PER_PAGE):
        chunk = words[start:start + PER_PAGE]
        cells = "".join(
            f'<div class="cell"><img src="{w["path"]}"><div class="txt">'
            f'<div class="top"><span>#{w["n"]}</span><span class="box"></span></div>'
            f'<div class="w">{esc(w["en"])}</div>{l1(w["tr"], cfg, "t")}'
            f'<div class="ex"><i>{esc(w["ex_en"])}</i>{l1(w["ex_tr"], cfg, tag="span")}</div>'
            f"</div></div>"
            for w in chunk
        )
        pages.append(
            f'<section class="page"><div class="hd"><b>Words {chunk[0]["n"]}–{chunk[-1]["n"]}</b>'
            f"<span>English → {esc(cfg['name'])}</span></div><div class=\"grid\">{cells}</div></section>"
        )

    ordered = sorted(words, key=lambda w: w["en"].lower())
    per_idx = 186
    for i in range(0, n, per_idx):
        rows = "".join(
            f'<div><b>{esc(w["en"])}</b>{l1(w["tr"], cfg, tag="span")}<em>#{w["n"]}</em></div>'
            for w in ordered[i:i + per_idx]
        )
        head = "<h3>A–Z index</h3>" if i == 0 else ""
        pages.append(f'<section class="page"><div class="idx">{head}{rows}</div></section>')

    total = len(pages)
    numbered = [
        p.replace("</section>", f'<div class="ft"><span>{esc(footer_brand)}</span><span>{k}/{total}</span></div></section>')
        if k > 1 else p
        for k, p in enumerate(pages, 1)
    ]
    return (
        f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{esc(title)}</title>'
        f"<style>{CSS}</style></head><body>{''.join(numbered)}</body></html>"
    )


def render(lang: str) -> dict:
    cfg = LANGS[lang]
    words = select_words(lang)
    fetch_images(words)
    d = OUT / lang
    d.mkdir(parents=True, exist_ok=True)
    stem = f"English_Picture_Dictionary_for_{cfg['file']}_Speakers_{len(words)}_Words"
    html_path = d / f"{stem}.html"
    pdf_path = d / f"{stem}.pdf"
    html_path.write_text(build_html(lang, words), "utf-8")
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
         f"--print-to-pdf={pdf_path}", html_path.as_uri()],
        check=True, capture_output=True,
    )
    cover_png = d / f"{stem}_cover.png"
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
         "--window-size=794,1123", "--force-device-scale-factor=2", f"--screenshot={cover_png}", html_path.as_uri()],
        check=True, capture_output=True,
    )
    return {"lang": lang, "words": len(words), "pdf": str(pdf_path), "mb": round(pdf_path.stat().st_size / 1e6, 1)}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="pt", help="pt|es|fr|ru|uk|ar|tr|all")
    args = ap.parse_args()
    langs = list(LANGS) if args.lang == "all" else args.lang.split(",")
    for lang in langs:
        print(json.dumps(render(lang), ensure_ascii=False))


if __name__ == "__main__":
    main()
