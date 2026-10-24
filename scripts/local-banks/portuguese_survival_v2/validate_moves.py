#!/usr/bin/env python3
"""Validate a Portuguese Survival v2 moves JSON chunk."""
from __future__ import annotations

import json
import sys
from pathlib import Path

TYPES = {"say", "hear", "repair"}
SCENES = {
    "foundations",
    "numbers_money_time",
    "directions",
    "shop",
    "health",
    "housing",
    "transport",
    "docs",
    "social",
}


def validate(path: Path) -> list[str]:
    rows = json.loads(path.read_text(encoding="utf-8"))
    errs: list[str] = []
    if not isinstance(rows, list):
        return ["root must be a list"]
    seen: set[str] = set()
    for i, r in enumerate(rows):
        rid = r.get("id") or f"idx{i}"
        if rid in seen:
            errs.append(f"{rid}: duplicate id")
        seen.add(rid)
        if r.get("type") not in TYPES:
            errs.append(f"{rid}: bad type")
        if r.get("scene") not in SCENES:
            errs.append(f"{rid}: bad scene")
        for k in ("front", "back", "audio_text", "hint"):
            if not (r.get(k) or "").strip():
                errs.append(f"{rid}: empty {k}")
        front = (r.get("front") or "").strip()
        back = (r.get("back") or "").strip()
        audio = (r.get("audio_text") or "").strip()
        hint = (r.get("hint") or "").strip()
        if len(front) < 20:
            errs.append(f"{rid}: front too short")
        if len(back) < 8:
            errs.append(f"{rid}: back too short")
        if len(hint) < 40:
            errs.append(f"{rid}: hint <40 chars")
        if len(audio) < 2:
            errs.append(f"{rid}: audio_text too short")
        # PT audio should not be English-only (ASCII PT without diacritics is OK)
        al = audio.lower()
        pt_markers = (
            "ão", "õe", "nh", "lh", "ç", "á", "é", "í", "ó", "ú", "ã", "õ",
            "bom", "boa", "ola", "olá", "sim", "não", "nao", "por", "favor",
            "obrigad", "desculpe", "onde", "fica", "quero", "preciso", "posso",
            "tem", "há", "ha ", "euros", "euro", "multibanco", "autocarro",
            "senhor", "senhora", "muito", "bem", "aqui", "agora", "depois",
            "quando", "quanto", "como", "porque", "também", "tambem", "ainda",
            "já", "ja ", "não", "com ", "sem ", "para ", "uma ", "um ", "os ",
            "as ", "de ", "do ", "da ", "no ", "na ", "ao ", "à ", "mais",
            "menos", "cheg", "tentar", "outra", "vez", "quinze", "cinquenta",
            "foi ", "fica ", "daqui", "minutos", "horas", "hoje", "amanhã",
            "amanha", "farmacia", "farmácia", "loja", "casa", "bilhete",
        )
        looks_pt = any(m in al for m in pt_markers)
        if audio.isascii() and len(audio.split()) > 4 and not looks_pt:
            errs.append(f"{rid}: audio_text looks English: {audio[:40]}")
    return errs


def main() -> None:
    path = Path(sys.argv[1])
    errs = validate(path)
    if errs:
        print("FAIL", len(errs))
        print("\n".join(errs[:60]))
        sys.exit(1)
    rows = json.loads(path.read_text(encoding="utf-8"))
    print("OK", len(rows))


if __name__ == "__main__":
    main()
