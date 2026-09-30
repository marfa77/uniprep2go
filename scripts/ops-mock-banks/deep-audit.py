#!/usr/bin/env python3
"""Deep mechanical audit of every ops bank + drift vs git JSON.

Writes /tmp/ops-deep-audit.json and prints one TSV line per bank, weakest first.
Usage: python3 scripts/ops-mock-banks/deep-audit.py [slug ...]
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent.parent
BANK_DIR = REPO / "src/data/mock-exams"

EXPL_TEMPLATE = re.compile(r"The correct choice \(|matches this rule|is the one that matches", re.I)
DIST_TEMPLATE = re.compile(
    r"Learners who choose|This option does not correctly answer the stem|usually making that exact mistake",
    re.I,
)
STEM_TEMPLATE = re.compile(r"— which option is correct for|which option is correct for .+\?$", re.I)
JUNK_TAIL = re.compile(r"\b(always|never|only)\s*$|\bonly always\b|\balways always\b", re.I)
THIN = re.compile(r"Sounds plausible|Klingt plausibel|Semble plausible|parece plausible", re.I)
QUESTION_KEYS = (
    "id",
    "examSlug",
    "topicId",
    "prompt",
    "formula",
    "options",
    "correctOptionId",
    "explanation",
    "distractorExplanations",
    "difficulty",
    "sourceNote",
)


def load_env() -> None:
    path = REPO / ".env.local"
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'").strip('"'))


def rpc(name: str, body: dict):
    url = (os.environ.get("PREP2GO_SUPABASE_URL") or os.environ["SUPABASE_URL"]).rstrip("/")
    key = os.environ.get("PREP2GO_SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    req = urllib.request.Request(
        f"{url}/rest/v1/rpc/{name}",
        data=json.dumps(body).encode(),
        headers={"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


def normalize(question: dict) -> dict:
    return {k: question[k] for k in QUESTION_KEYS if k in question and question[k] not in (None, "")}


def audit_bank(slug: str) -> dict:
    questions = rpc("ops_get_mock_bank", {"p_slug": slug})
    n = max(1, len(questions))
    expl_t = dist_t = stem_t = junk = thin = short = longest = 0
    keys = Counter()
    prompts = Counter()
    for q in questions:
        expl = str(q.get("explanation") or "")
        dist = json.dumps(q.get("distractorExplanations") or {}, ensure_ascii=False)
        prompt = str(q.get("prompt") or "")
        options = q.get("options") or []
        keys[q.get("correctOptionId")] += 1
        prompts[prompt.strip().lower()] += 1
        if EXPL_TEMPLATE.search(expl):
            expl_t += 1
        if DIST_TEMPLATE.search(dist):
            dist_t += 1
        if STEM_TEMPLATE.search(prompt):
            stem_t += 1
        if any(JUNK_TAIL.search(str(o.get("text") or "")) for o in options):
            junk += 1
        if THIN.search(dist) or THIN.search(expl):
            thin += 1
        if len(expl.strip()) < 80:
            short += 1
        texts = {o.get("id"): str(o.get("text") or "") for o in options}
        correct = texts.get(q.get("correctOptionId"), "")
        if options and len(correct) > max(len(t) for k, t in texts.items() if k != q.get("correctOptionId")) * 1.3:
            longest += 1
    dup_prompts = sum(c - 1 for c in prompts.values() if c > 1)
    top_key_share = max(keys.values()) / n if keys else 0

    git_path = BANK_DIR / f"{slug}.json"
    drift = None
    if git_path.exists():
        git_q = json.loads(git_path.read_text())
        git_map = {q.get("id"): normalize(q) for q in git_q}
        ops_map = {q.get("id"): normalize(q) for q in questions}
        drift = {
            "n_git": len(git_q),
            "changed": sum(1 for i in set(git_map) | set(ops_map) if git_map.get(i) != ops_map.get(i)),
            "git_mtime_after_ops": None,
        }

    weak = (
        expl_t / n * 3
        + dist_t / n * 2
        + stem_t / n * 2
        + junk / n * 2
        + thin / n * 3
        + short / n
        + longest / n
        + dup_prompts / n * 2
        + max(0, top_key_share - 0.4) * 3
    )
    return {
        "slug": slug,
        "n": len(questions),
        "expl_template": expl_t,
        "dist_template": dist_t,
        "stem_template": stem_t,
        "junk_tail": junk,
        "thin": thin,
        "short_expl": short,
        "longest_correct": longest,
        "dup_prompts": dup_prompts,
        "top_key_share": round(top_key_share, 2),
        "weak_score": round(weak, 2),
        "drift": drift,
    }


def main() -> None:
    load_env()
    slugs = sys.argv[1:]
    if not slugs:
        slugs = json.loads(Path("/tmp/ops-slugs.json").read_text())
    with ThreadPoolExecutor(max_workers=8) as pool:
        rows = list(pool.map(audit_bank, slugs))
    rows.sort(key=lambda r: -r["weak_score"])
    Path("/tmp/ops-deep-audit.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2))
    print("slug\tn\texplT\tdistT\tstemT\tjunk\tthin\tshort\tlongest\tdup\tkey\tscore\tdrift")
    for r in rows:
        d = r["drift"]
        drift = "-" if d is None else f"{d['changed']}/{d['n_git']}"
        print(
            f"{r['slug']}\t{r['n']}\t{r['expl_template']}\t{r['dist_template']}\t{r['stem_template']}\t"
            f"{r['junk_tail']}\t{r['thin']}\t{r['short_expl']}\t{r['longest_correct']}\t{r['dup_prompts']}\t"
            f"{r['top_key_share']}\t{r['weak_score']}\t{drift}"
        )


if __name__ == "__main__":
    main()
