#!/usr/bin/env python3
"""Split one-bank ops import into SQL batches that fit MCP execute_sql."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path

THIN_MARKERS = ("Sounds plausible", "The correct choice", "matches this rule")


def sql_literal(value: str | None) -> str:
    if value is None:
        return "null"
    return "'" + value.replace("'", "''") + "'"


def compact(data: object) -> str:
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    if "$uniprep_bank$" in payload:
        raise SystemExit("bank JSON contains the dollar-quote sentinel")
    return payload


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--vertical", default="citizenship")
    parser.add_argument("--family-id", default="citizenship")
    parser.add_argument("--linked-deck-slug", default=None)
    parser.add_argument("--session-question-count", type=int, default=60)
    parser.add_argument("--last-updated", default=None)
    parser.add_argument("--source", type=Path, default=None)
    parser.add_argument("--outdir", type=Path, required=True)
    parser.add_argument("--batch-size", type=int, default=40)
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[2]
    source = args.source or (root / "src/data/mock-exams" / f"{args.slug}.json")
    questions = json.loads(source.read_text())
    key_bias = Counter(q.get("correctOptionId") or "?" for q in questions)
    thin = sum(
        1
        for question in questions
        if any(
            marker in json.dumps(question.get("distractorExplanations") or {}, ensure_ascii=False)
            for marker in THIN_MARKERS
        )
    )
    a_share = key_bias.get("a", 0) / len(questions)
    if thin >= max(1, int(len(questions) * 0.5)) or a_share >= 0.85:
        smell = "P0"
    elif thin > 0 or a_share >= 0.45:
        smell = "P1"
    else:
        smell = "clean"

    args.outdir.mkdir(parents=True, exist_ok=True)
    rel_source = source.relative_to(root).as_posix()
    header = f"""
insert into ops.mock_banks (
  slug, title, vertical, family_id, linked_deck_slug,
  question_count, session_question_count, last_updated,
  review_status, smell_tier, key_bias, thin_distractor_count, source_path
) values (
  {sql_literal(args.slug)},
  {sql_literal(args.title)},
  {sql_literal(args.vertical)},
  {sql_literal(args.family_id)},
  {sql_literal(args.linked_deck_slug)},
  {len(questions)},
  {args.session_question_count},
  {sql_literal(args.last_updated)}::date,
  'imported',
  {sql_literal(smell)},
  {sql_literal(json.dumps(dict(key_bias), separators=(",", ":")))}::jsonb,
  {thin},
  {sql_literal(rel_source)}
)
on conflict (slug) do update set
  title = excluded.title,
  question_count = excluded.question_count,
  session_question_count = excluded.session_question_count,
  last_updated = excluded.last_updated,
  smell_tier = excluded.smell_tier,
  key_bias = excluded.key_bias,
  thin_distractor_count = excluded.thin_distractor_count,
  source_path = excluded.source_path,
  updated_at = now();

delete from ops.mock_questions where bank_slug = {sql_literal(args.slug)};
delete from ops.mock_bank_audits where bank_slug = {sql_literal(args.slug)};

insert into ops.mock_bank_audits (
  bank_slug, smell_tier, key_bias, thin_distractor_count, notes
) values (
  {sql_literal(args.slug)},
  {sql_literal(smell)},
  {sql_literal(json.dumps(dict(key_bias), separators=(",", ":")))}::jsonb,
  {thin},
  'Initial import for warehouse/audit roundtrip test.'
);
"""
    (args.outdir / "00-bank.sql").write_text(header.strip() + "\n")

    insert_sql = """
insert into ops.mock_questions (
  bank_slug, question_id, exam_slug, topic_id, prompt, formula,
  options, correct_option_id, explanation, distractor_explanations,
  difficulty, source_note, position
)
select
  {slug},
  q->>'id',
  coalesce(q->>'examSlug', {slug}),
  coalesce(q->>'topicId', 'unknown'),
  coalesce(q->>'prompt', ''),
  q->>'formula',
  coalesce(q->'options', '[]'::jsonb),
  coalesce(q->>'correctOptionId', ''),
  coalesce(q->>'explanation', ''),
  coalesce(q->'distractorExplanations', '{{}}'::jsonb),
  q->>'difficulty',
  q->>'sourceNote',
  (ord - 1 + {offset})::int
from jsonb_array_elements($uniprep_bank${payload}$uniprep_bank$::jsonb)
with ordinality as t(q, ord);
"""
    files = ["00-bank.sql"]
    for index in range(0, len(questions), args.batch_size):
        batch = questions[index : index + args.batch_size]
        name = f"{index // args.batch_size + 1:02d}-questions.sql"
        sql = insert_sql.format(
            slug=sql_literal(args.slug),
            offset=index,
            payload=compact(batch),
        )
        (args.outdir / name).write_text(sql.strip() + "\n")
        files.append(name)

    print(json.dumps({"files": files, "questions": len(questions), "smell_tier": smell, "thin": thin}, indent=2))


if __name__ == "__main__":
    main()
