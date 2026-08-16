# ACSM CPT competitor AEO audit (2026-08-16)

Scope: `/decks/acsm-cpt-anki-deck` + `/mock-exams/acsm-cpt-readiness-check` (wave / health-cdl). Method: bank triage + wave gate + WebSearch SERP (no OpenRouter) + ACSM FAQs / Candidate Handbook / CPT outline.

## Bank / product

- Triage: **P0=0** (clean)
- Wave3 config + bank already wired at runtime; validator previously blind to wave3 (fixed this pass)
- Apkg ready: `Anki Generator/out/wave/Acsm_Cpt_FULL_60.apkg`
- Gumroad: live product + apkg + **polish-only OK** (3 sample webps + Sample cards landing body, cdn=3)

## Competitor SERP

| Intent | Top competitors | Beat / gap |
| --- | --- | --- |
| ACSM CPT practice test free | Mometrix free practice (accurate 135Q / 2.5h / scaled 550) | They win on **brand + volume**. We win on **free timed topic report + $11 ownable .apkg** |
| ACSM CPT Anki / flashcards | Quizlet / Brainscape community | We win: sold .apkg + linked timed mock |

### Accuracy wedge (cite these)

Official ACSM-CPT (Candidate Handbook / FAQs / outline effective July 10, 2025):

- **135 items** (120 scored + 15 pretest)
- **150 minutes** seat time
- Scaled pass **550** on **200–800** scale
- Domains: I Assessment ~25%, II Programming ~43%, III Leadership/education ~22%, IV Legal/professional ~10%

Our 60Q mock is a shorter diagnostic — copy must say so.

## Fixes shipped this pass

1. Wave validator scans wave3/wave4 configs + banks; launch-path passes when Gumroad apkg-ready
2. Gumroad create allows apkg + description without samples (samples/landing deferred)
3. Exam-facts profile `acsm-cpt` + deck map
4. Official source notes / explainer facts (135 / 150 min / 550)
5. High-intent + commercial cite + When to / When NOT
6. Money unique content
7. Homepage CPT + mock-index discovery links

## Not done (handoff)

- Best-model content review of bank
- Expanding beyond 60 cards
- Commit/push when user OK
