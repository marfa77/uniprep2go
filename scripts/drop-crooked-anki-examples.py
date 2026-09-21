#!/usr/bin/env python3
"""Drop Prep2Go stamp leftover crooked bilingual examples from source.csv."""
import csv, re, sys
from pathlib import Path

TARGET_BAD = [
    re.compile(r"^I know the word\b", re.I),
    re.compile(r"^We use \w+ often\b", re.I),
    re.compile(r"^(Please )?remember the word\b", re.I),
    re.compile(r"^Znam (dobrze )?słowo\b", re.I),
    re.compile(r"^Używamy \S+ często\b", re.I),
    re.compile(r"^On czuje się \S+ dziś\b", re.I),
    re.compile(r"^Potrzebuję \S+ od razu\b", re.I),
]
NATIVE_BAD = [
    re.compile(r"Запомни хорошо слово"),
    re.compile(r"хорошо знаю слово", re.I),
    re.compile(r"чувствует себя оно"),
    re.compile(r"Conozco(?: bien)? la palabra", re.I),
    re.compile(r"Usamos \S+ a menudo", re.I),
    re.compile(r"أعرف كلمة"),
    re.compile(r"أنا أعرف كلمة"),
    re.compile(r"يشعر أنه هو/هي"),
    re.compile(r"Запам['’]?ятай добре слово"),
    re.compile(r"добре знаю слово", re.I),
    re.compile(r"Ми часто використовуємо"),
    re.compile(r"почувається воно"),
    re.compile(r"відчуває себе воно"),
    re.compile(r"Мені зараз одразу треба"),
    re.compile(r"Поглянь на .+ он там"),
    re.compile(r"На роботі він сьогодні почувається"),
    re.compile(r"Звідси воно виглядає"),
    re.compile(r"У школі ми часто"),
    re.compile(r"Кожного дня вдома я можу"),
    re.compile(r"Сьогодні спробуй .+, прошу"),
    re.compile(r"Нам треба зараз .+ без поспіху"),
    re.compile(r"У неї вдома є "),
    re.compile(r"За вікном сьогодні дуже"),
    re.compile(r"Сьогодні це практичне"),
    re.compile(r"Подивись на .+ там перед собою"),
    re.compile(r"Посмотри на .+ там перед собой"),
    re.compile(r"Ось корисний .+ на сьогодні"),
    re.compile(r"Мені потрібен цей .+ просто зараз"),
    re.compile(r"Мне нужен этот .+ прямо сейчас"),
    re.compile(r"Слово .+ мені вже добре знайоме"),
    # Brazilian Portuguese stamp leftovers
    re.compile(r"Eu (?:conhe[cç]o|sei) (?:bem )?a palavra", re.I),
    re.compile(r"Lembre bem a palavra", re.I),
    re.compile(r"Por favor, lembr[ae](?: da)? palavra", re.I),
    re.compile(r"A gente usa .+ com frequência", re.I),
]

def crooked(example: str) -> bool:
    ex = (example or "").strip()
    if not ex:
        return True
    parts = re.split(r"\s+[—–]\s+", ex, maxsplit=1)
    target = parts[0].strip()
    native = parts[1].strip() if len(parts) > 1 else ""
    return any(rx.search(target) for rx in TARGET_BAD) or any(
        rx.search(native) or rx.search(ex) for rx in NATIVE_BAD
    )

def main(path: Path) -> None:
    rows = list(csv.DictReader(path.open(encoding="utf-8")))
    keep = [r for r in rows if not crooked(r.get("example") or "")]
    bak = path.with_suffix(".csv.bak-pre-drop")
    if not bak.exists():
        bak.write_text(path.read_text(encoding="utf-8"), encoding="utf-8")
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["front", "back", "example", "image_file", "audio_file"])
        w.writeheader()
        for r in keep:
            w.writerow({k: r.get(k, "") for k in w.fieldnames})
    print(f"{path}: {len(rows)} → {len(keep)} (dropped {len(rows) - len(keep)})")

if __name__ == "__main__":
    main(Path(sys.argv[1]))
