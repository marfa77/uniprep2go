-- Reconstruct git-shaped mock JSON from ops.mock_questions.
-- Run for one slug, then compare to src/data/mock-exams/{slug}.json.

select coalesce(jsonb_agg(item order by position), '[]'::jsonb) as bank
from (
  select
    position,
    jsonb_strip_nulls(
      jsonb_build_object(
        'id', question_id,
        'examSlug', exam_slug,
        'topicId', topic_id,
        'prompt', prompt,
        'formula', formula,
        'options', options,
        'correctOptionId', correct_option_id,
        'explanation', explanation,
        'distractorExplanations', distractor_explanations,
        'difficulty', difficulty,
        'sourceNote', source_note
      )
    ) as item
  from ops.mock_questions
  where bank_slug = 'life-in-the-uk-readiness-check'
) q;
