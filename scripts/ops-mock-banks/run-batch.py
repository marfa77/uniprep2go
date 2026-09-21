#!/usr/bin/env python3
"""Audit then fix a list of ops banks. Usage: run-batch.py slug [slug...]"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent.parent
BANK_DIR = REPO / "src/data/mock-exams"
META_PATH = ROOT / "bank-meta.json"


def run(cmd: list[str]) -> str:
    print("+", " ".join(cmd), flush=True)
    return subprocess.check_output(cmd, text=True)


def classify(report: dict, questions: list[dict]) -> str:
    n = max(1, report["n"])
    converted = sum(1 for q in questions if "Converted from Prep2Go" in str(q.get("sourceNote") or ""))
    leed = sum(
        1
        for q in questions
        if "appropriate response because" in json.dumps(q)
        or "does not satisfy the requirement in this scenario" in json.dumps(q)
    )
    if report["explanation_copies_correct"] >= n * 0.5 or converted >= n * 0.5:
        return "factory"
    if leed >= n * 0.5:
        return "leed"
    if report["verdict"] == "P0":
        return "factory"
    return "keep"


def main() -> None:
    slugs = sys.argv[1:]
    if not slugs:
        raise SystemExit("usage: run-batch.py slug [slug...]")
    meta = json.loads(META_PATH.read_text())
    print(run([sys.executable, str(ROOT / "audit-batch.py"), *slugs]))
    results = []
    for slug in slugs:
        report = json.loads(Path(f"/tmp/audit-{slug}.json").read_text())
        src = BANK_DIR / f"{slug}.json"
        if src.exists():
            questions = json.loads(src.read_text())
            source_path = src
        else:
            import importlib.util
            spec = importlib.util.spec_from_file_location("audit_one", ROOT / "audit-one-bank.py")
            audit = importlib.util.module_from_spec(spec)
            assert spec.loader
            spec.loader.exec_module(audit)
            audit.load_env()
            questions = audit.fetch_bank(slug)
            dump = Path(f"/tmp/{slug}-ops-current.json")
            dump.write_text(json.dumps(questions, ensure_ascii=False, indent=2))
            source_path = dump
        mode = classify(report, questions)
        if slug not in meta:
            print(f"WARN {slug}: no bank-meta row, applying with slug title", flush=True)
        if mode in {"factory", "leed"}:
            print(run([
                sys.executable,
                str(ROOT / "fix-ops-bank.py"),
                "--slug",
                slug,
                "--input",
                str(source_path),
                "--mode",
                mode,
            ]))
            input_path = f"/tmp/{slug}-fixed.json"
        else:
            input_path = str(source_path)
        print(run([
            sys.executable,
            str(ROOT / "apply-ops-bank.py"),
            "--slug",
            slug,
            "--input",
            input_path,
            "--status",
            "ready",
        ]))
        results.append({**report, "mode": mode})
    print(run([sys.executable, str(ROOT / "audit-batch.py"), *slugs]))
    Path("/tmp/batch-20-plan.json").write_text(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
