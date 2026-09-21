#!/usr/bin/env python3
"""Pick 3 selling sample cards from a Prep2Go Anki export folder.

Ideal selling samples (language vocab decks)
============================================
NOT the first CSV rows (be / i / you). Those are frequency-ordered and kill
conversion on the money page.

Hard requirements (reject otherwise):
1. Media: image + audio files exist; image ≥ 8 KB (real illustration, not stub).
2. Clean bilingual example: both sides of " — "; no stamp leftovers (drop-crooked).
3. Headword appears as a whole word in the TARGET-language example sentence.
4. Native gloss + example look real: back not a pronoun/aux; native example ≥ 12 chars;
   no known stamp templates (se sente…, This is a useful…, etc.).
5. Not a function / ultra-basic lemma (pronouns, articles, be/have/do, prep, conj).

Soft score (rank remaining):
- Mid-frequency band (rank ~80–900) — exam-looking, not toddler, not obscure tail.
- Concrete / visualizable headword or example (travel, work, education, housing…).
- Noun gloss cues (PT/ES/IT articles, DE/NL gender articles, etc.).
- Headword length 4–12; single token preferred.
- Larger image file size (proxy for real card art).

Diversity (final 3):
- Distinct headwords; prefer different theme buckets (education / work / daily).
- Prefer mix that sells the SKU: e.g. university + interview + station for IELTS EN-*.

Image↔word match:
- Mechanical gate: headword in example + concrete theme + non-tiny image.
- After shortlist, agent SHOULD visually confirm the 3 JPGs (Read tool) before --apply.
  Reject if the art clearly depicts a different concept (false-friend sense, wrong POS).

Usage:
  python3 scripts/select-ideal-language-samples.py \\
    --deck-dir "../Anki Generator/out/prep2go_English_A2_Portuguese_Speakers" \\
    --shop-key Portuguese_to_English \\
    --slug ielts-toefl-english-for-portuguese-speakers-anki-deck \\
    --print-top 15

  # after visual OK:
  python3 scripts/select-ideal-language-samples.py ... --picks university,interview,station --apply
"""
from __future__ import annotations

import argparse
import csv
import importlib.util
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

BASIC = {
    "be",
    "am",
    "is",
    "are",
    "was",
    "were",
    "been",
    "being",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "its",
    "our",
    "their",
    "mine",
    "yours",
    "hers",
    "ours",
    "theirs",
    "this",
    "that",
    "these",
    "those",
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "if",
    "so",
    "not",
    "no",
    "yes",
    "do",
    "does",
    "did",
    "done",
    "doing",
    "have",
    "has",
    "had",
    "having",
    "will",
    "would",
    "can",
    "could",
    "may",
    "might",
    "must",
    "shall",
    "should",
    "to",
    "of",
    "in",
    "on",
    "at",
    "for",
    "with",
    "from",
    "by",
    "as",
    "into",
    "about",
    "up",
    "out",
    "over",
    "after",
    "before",
    "between",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "each",
    "every",
    "both",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "than",
    "too",
    "very",
    "just",
    "also",
    "only",
    "own",
    "same",
    "get",
    "got",
    "go",
    "went",
    "gone",
    "say",
    "said",
    "know",
    "knew",
    "make",
    "made",
    "see",
    "saw",
    "come",
    "came",
    "take",
    "took",
    "think",
    "thought",
    "look",
    "want",
    "give",
    "gave",
    "use",
    "find",
    "tell",
    "ask",
    "work",
    "seem",
    "feel",
    "try",
    "leave",
    "call",
    "keep",
    "let",
    "begin",
    "show",
    "hear",
    "play",
    "run",
    "move",
    "live",
    "believe",
    "hold",
    "bring",
    "happen",
    "write",
    "provide",
    "sit",
    "stand",
    "lose",
    "pay",
    "meet",
    "include",
    "continue",
    "set",
    "learn",
    "change",
    "lead",
    "understand",
    "watch",
    "follow",
    "stop",
    "create",
    "speak",
    "read",
    "allow",
    "add",
    "spend",
    "grow",
    "open",
    "walk",
    "win",
    "offer",
    "remember",
    "love",
    "consider",
    "appear",
    "buy",
    "wait",
    "serve",
    "die",
    "send",
    "expect",
    "build",
    "stay",
    "fall",
    "cut",
    "reach",
    "kill",
    "remain",
    "suggest",
    "raise",
    "pass",
    "sell",
    "require",
    "report",
    "decide",
    "pull",
}

# Pronoun / copula backs across common L1 glosses
BASIC_BACK = {
    "eu",
    "você",
    "voce",
    "tu",
    "ele",
    "ela",
    "nós",
    "nos",
    "eles",
    "elas",
    "ser",
    "estar",
    "isso",
    "isto",
    "я",
    "ты",
    "вы",
    "он",
    "она",
    "мы",
    "они",
    "быть",
    "это",
    "yo",
    "tú",
    "tu",
    "él",
    "ella",
    "nosotros",
    "ellos",
    "ser",
    "estar",
    "eso",
    "ik",
    "jij",
    "hij",
    "zij",
    "wij",
    "zijn",
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "être",
    "etre",
    "jag",
    "du",
    "han",
    "hon",
    "vi",
    "de",
    "vara",
    "я",
    "ти",
    "він",
    "вона",
    "ми",
    "вони",
    "бути",
}

VISUAL = {
    "airport",
    "passport",
    "ticket",
    "hotel",
    "train",
    "bus",
    "station",
    "hospital",
    "pharmacy",
    "doctor",
    "nurse",
    "interview",
    "meeting",
    "office",
    "laptop",
    "suitcase",
    "backpack",
    "restaurant",
    "menu",
    "coffee",
    "bread",
    "apple",
    "market",
    "supermarket",
    "kitchen",
    "bathroom",
    "bedroom",
    "library",
    "university",
    "college",
    "campus",
    "classroom",
    "student",
    "teacher",
    "bridge",
    "mountain",
    "river",
    "beach",
    "ocean",
    "forest",
    "park",
    "garden",
    "bicycle",
    "motorcycle",
    "ambulance",
    "airplane",
    "computer",
    "keyboard",
    "phone",
    "camera",
    "umbrella",
    "jacket",
    "exam",
    "certificate",
    "diploma",
    "apartment",
    "house",
    "building",
    "window",
    "elevator",
    "conference",
    "court",
    "event",
    "family",
    "daughter",
    "music",
    "summer",
    "career",
    "project",
    "city",
    "business",
    "community",
}

THEME = {
    "education": {
        "university",
        "college",
        "campus",
        "classroom",
        "student",
        "teacher",
        "library",
        "exam",
        "course",
        "class",
        "diploma",
        "certificate",
    },
    "work": {
        "interview",
        "meeting",
        "office",
        "conference",
        "career",
        "business",
        "project",
        "manager",
        "salary",
    },
    "daily": {
        "market",
        "station",
        "airport",
        "hotel",
        "hospital",
        "house",
        "apartment",
        "restaurant",
        "pharmacy",
        "park",
        "beach",
        "family",
    },
}

MORE_BAD = [
    re.compile(r"se sente .+ hoje", re.I),
    re.compile(r"This is a useful \S+ today", re.I),
    re.compile(r"They arrived \S+ after the rain", re.I),
    re.compile(r"She speaks \S+ with her friends", re.I),
    re.compile(r"Ele se sente ", re.I),
    re.compile(r"On czuje się ", re.I),
]


def load_crooked():
    path = ROOT / "scripts" / "drop-crooked-anki-examples.py"
    spec = importlib.util.spec_from_file_location("drop_crooked", path)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(mod)
    return mod.crooked


def split_example(ex: str) -> tuple[str, str]:
    parts = re.split(r"\s+[—–]\s+", (ex or "").strip(), maxsplit=1)
    if len(parts) < 2:
        return "", ""
    return parts[0].strip(), parts[1].strip()


def theme_of(front: str, tgt: str) -> str:
    blob = f"{front} {tgt}".lower()
    for name, words in THEME.items():
        if front in words or any(w in blob for w in words):
            return name
    return "other"


def score_row(i: int, r: dict, media: Path, crooked) -> dict | None:
    front = (r.get("front") or "").strip().lower()
    back = (r.get("back") or "").strip()
    ex = r.get("example") or ""
    if not front or front in BASIC or len(front) < 3:
        return None
    if len(front.split()) > 2:
        return None
    if back.lower().strip() in BASIC_BACK:
        return None
    if crooked(ex):
        return None
    if any(rx.search(ex) for rx in MORE_BAD):
        return None
    tgt, nat = split_example(ex)
    if not tgt or not nat:
        return None
    if not re.search(rf"\b{re.escape(front)}\b", tgt, re.I):
        return None
    if len(nat) < 12 or len(tgt) < 12:
        return None
    img_name = r.get("image_file") or ""
    aud_name = r.get("audio_file") or ""
    img = media / img_name
    aud = media / aud_name
    if not img.exists() or not aud.exists():
        return None
    isize = img.stat().st_size
    if isize < 8000:
        return None

    score = 0.0
    score += min(isize / 5000.0, 8.0)
    if front in VISUAL or any(w in tgt.lower() for w in VISUAL):
        score += 6
    if 80 <= i <= 900:
        score += 5
    elif 40 <= i < 80:
        score += 2
    elif i > 900:
        score += 1
    if 4 <= len(front) <= 12:
        score += 2
    if re.match(r"^(o|a|os|as|el|la|los|las|le|la|les|der|die|das|het|de)\s+", back, re.I):
        score += 3
    # Prefer nouny exam themes slightly
    th = theme_of(front, tgt)
    if th in {"education", "work", "daily"}:
        score += 2

    return {
        "rank": i,
        "front": front,
        "back": back,
        "exampleTarget": tgt,
        "exampleNative": nat,
        "example": ex,
        "image_file": img_name,
        "audio_file": aud_name,
        "image_bytes": isize,
        "theme": th,
        "score": round(score, 2),
    }


def diversify(cands: list[dict], n: int = 3) -> list[dict]:
    """Greedy: highest score, then fill missing themes, else next best unique front."""
    picked: list[dict] = []
    themes: set[str] = set()
    used: set[str] = set()

    def take(c: dict) -> None:
        picked.append(c)
        themes.add(c["theme"])
        used.add(c["front"])

    # Prefer one education + one work + one daily when available
    for want in ("education", "work", "daily"):
        for c in cands:
            if c["front"] in used:
                continue
            if c["theme"] == want:
                take(c)
                break
        if len(picked) >= n:
            return picked[:n]

    for c in cands:
        if c["front"] in used:
            continue
        take(c)
        if len(picked) >= n:
            break
    return picked[:n]


def apply_picks(
    deck_dir: Path,
    shop_key: str,
    slug: str,
    picks: list[dict],
) -> None:
    media = deck_dir / "media"
    shop_media = ROOT / "public" / "shop-preview-media" / shop_key
    shop_media.mkdir(parents=True, exist_ok=True)
    samples_dir = ROOT / "public" / "samples"

    # Prefer sharp via node if available; else copy jpg→webp via pillow
    try:
        from PIL import Image
    except ImportError:
        Image = None  # type: ignore

    sample_rows = []
    for i, c in enumerate(picks, 1):
        sample_rows.append(
            {
                "front": c["front"],
                "back": c["back"],
                "exampleTarget": c["exampleTarget"],
                "exampleNative": c["exampleNative"],
                "frequency": i,
            }
        )
        src_img = media / c["image_file"]
        src_aud = media / c["audio_file"]
        dest_webp = shop_media / f"{i}.webp"
        dest_mp3 = shop_media / f"{i}.mp3"
        site_webp = samples_dir / f"{slug}-sample-{i}.webp"
        shutil.copy2(src_aud, dest_mp3)
        if Image is not None:
            img = Image.open(src_img).convert("RGB")
            img = img.resize((600, 600))
            img.save(dest_webp, "WEBP", quality=85)
            shutil.copy2(dest_webp, site_webp)
        else:
            # fallback: keep jpg bytes named webp only if conversion missing
            shutil.copy2(src_img, dest_webp.with_suffix(".jpg"))
            print("WARN: Pillow missing — wrote .jpg; convert to webp manually", dest_webp)

    shop_path = ROOT / "src" / "data" / "shop-preview-samples.json"
    shop = json.loads(shop_path.read_text(encoding="utf-8"))
    shop[shop_key] = sample_rows
    shop_path.write_text(json.dumps(shop, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"updated {shop_path}[{shop_key}]")
    print(f"media → {shop_media}/{{1,2,3}}.{{webp,mp3}}")
    print(f"site samples → {samples_dir}/{slug}-sample-{{1,2,3}}.webp")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--deck-dir", type=Path, required=True)
    ap.add_argument("--shop-key", required=True)
    ap.add_argument("--slug", required=True)
    ap.add_argument("--print-top", type=int, default=20)
    ap.add_argument(
        "--picks",
        default="",
        help="Comma-separated fronts to force after visual review, e.g. university,interview,station",
    )
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    deck_dir = args.deck_dir.resolve()
    csv_path = deck_dir / "source.csv"
    media = deck_dir / "media"
    if not csv_path.exists():
        print(f"missing {csv_path}", file=sys.stderr)
        return 1

    crooked = load_crooked()
    rows = list(csv.DictReader(csv_path.open(encoding="utf-8")))
    cands: list[dict] = []
    for i, r in enumerate(rows):
        scored = score_row(i, r, media, crooked)
        if scored:
            cands.append(scored)
    cands.sort(key=lambda c: (-c["score"], c["rank"]))

    print(f"candidates: {len(cands)} / {len(rows)}")
    print("--- top ---")
    for c in cands[: args.print_top]:
        print(
            f"  {c['score']:5.1f} #{c['rank']:4d} [{c['theme']:9s}] "
            f"{c['front']:15s} → {c['back'][:22]:22s} | {c['exampleTarget'][:55]}"
        )

    if args.picks.strip():
        want = [w.strip().lower() for w in args.picks.split(",") if w.strip()]
        by_front = {c["front"]: c for c in cands}
        picks = []
        for w in want:
            if w not in by_front:
                print(f"ERROR: pick {w!r} not in candidates", file=sys.stderr)
                return 2
            picks.append(by_front[w])
    else:
        picks = diversify(cands, 3)

    print("--- selected ---")
    for i, c in enumerate(picks, 1):
        print(f"  {i}. {c['front']} → {c['back']}")
        print(f"     {c['exampleTarget']} — {c['exampleNative']}")
        print(f"     media/{c['image_file']} ({c['image_bytes']} B) theme={c['theme']}")

    if args.apply:
        if len(picks) != 3:
            print("ERROR: need exactly 3 picks to --apply", file=sys.stderr)
            return 3
        apply_picks(deck_dir, args.shop_key, args.slug, picks)
        print("DONE apply — visually confirmed picks recommended before Gumroad --force-cdn")
    else:
        print("(dry-run; pass --picks a,b,c --apply after visual check)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
