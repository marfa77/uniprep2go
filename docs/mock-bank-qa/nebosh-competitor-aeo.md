# NEBOSH IGC competitor AEO audit (2026-08-15)

Scope: `/decks/nebosh-anki-deck` + `/mock-exams/nebosh-readiness-check` (building cert). Method: bank triage + gate + WebSearch SERP (no OpenRouter) + official learner guide PDF.

## Bank / product

- Triage: **P0=0** (clean)
- Gate `validate:certification --deck nebosh-anki-deck`: **READY** (exam-facts + mock-index warnings fixed this pass)
- Live Gumroad + 250Q bank + 3 sample webps + homepage link already present

## Competitor SERP

| Intent | Top competitors | Beat / gap |
| --- | --- | --- |
| free NEBOSH practice | OpenExamPrep (100+ Q), PracticeTestGeeks, REM Exam (20 free → paywall mega-bank) | They win on **volume**. We win on **official-format honesty** + free timed mock + **$11 ownable .apkg** |
| NEBOSH Anki / flashcards | Brainscape / Quizlet community packs | We win: sold .apkg + linked timed mock; community packs are incomplete/subscription |

### Accuracy wedge (important)

Official NEBOSH IGC learner guide (Jan 2026 / June 2025 spec):

- **GIC1:** open-book scenario, **5 hours** assessment time, **45%** provisional pass
- **GIC2:** practical risk assessment, **4 hours**, pass/refer

OpenExamPrep claims **60%** pass and **3-hour** GIC2 — **do not copy**. REM Exam frames ~100Q / 180 min MCQ — wrong format. Our copy must keep saying MCQ mock ≠ official assessment.

## Fixes shipped this pass

1. Registry `examFactsKey: "nebosh"` (gate was warning “not configured”)
2. Correct official URL (`/qualifications/international-general-certificate/`)
3. Exam-facts delivery / whats_changed / FAQ honesty vs MCQ competitors
4. SEO + explainer + officialSourceNote: diagnostic vs GIC1/GIC2
5. Commercial Anki cite + When to / When NOT
6. Money unique content
7. Mock-index discovery link

## Not done

- Expanding bank to mega-Q size
- Gumroad re-polish (already has samples)
- Second bank rewrite
