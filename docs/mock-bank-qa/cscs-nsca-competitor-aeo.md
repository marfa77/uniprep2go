# NSCA CSCS competitor AEO audit (2026-08-23)

Scope: `/mock-exams/cscs-nsca-readiness-check` (LLM 1u this period + all-time). Linked deck `cscs-nsca-anki-deck` is **planned** — no Gumroad product id. Method: bank triage + WebSearch SERP (no OpenRouter) + NSCA exam description / handbook.

Pulse siblings this paste (SERP skipped — cadence):

- `/mock-exams/nebosh-readiness-check` — fresh until **2026-10-14**
- `/decks/frm-part-1-anki-deck` — fresh until **2026-10-16**
- `/decks/luxembourg-vivre-ensemble-anki-deck` — fresh until **2026-10-13**
- Pulse “…and 2 more” all-time paths not named — do not invent

## Bank / product

- Triage: **P0=0** (clean)
- Session: 60Q / 75 min / four topics (exercise science, nutrition, program design, organization)
- Wave3 config + bank already wired
- Anki: spec 60 cards, Gumroad permalink stub only — **do not force-launch**

## Official facts (nsca.com exam description + certification handbook)

Two separately scored papers; both must pass (scaled **70+** each):

| Section | Items | Time | Domains |
| --- | --- | --- | --- |
| Scientific Foundations | 80 scored + 15 pretest (95) | 1.5 hours | Exercise science ~60%, sport psychology ~25%, nutrition ~15% |
| Practical/Applied | 110 scored + 15 pretest (125) | 2.5 hours | Program design ~40%, exercise technique ~25%, program implementation ~20%, org/admin ~15%; **30–40 video/image items** |

Eligibility typically: bachelor’s (or PT/DC) + current CPR/AED. Verify at [NSCA CSCS exam description](https://www.nsca.com/certification/cscs/certified-strength-and-conditioning-specialist-exam-description/).

**CSCS ≠** NASM-CPT / ACE CPT / ACSM-CPT / NSCA-CPT.

Our 60Q mock is a shorter text-only diagnostic — copy must say so.

## Competitor SERP

| Intent | Top competitors | Beat / gap |
| --- | --- | --- |
| CSCS practice test free | OpenExamPrep (216+ Q, no signup; some pages mix scored counts) | They win **volume**. We win **timed topic report + honest two-paper facts + CSCS ≠ CPT** |
| CSCS Anki / flashcards | OpenExamPrep 50-term cards; PT Pioneer / Trainer Academy upsell; Amazon guides | Do **not** cite a live $11 .apkg — deck is planned. Wedge is the free mock, not flashcard volume |

## Fixes shipped this pass

1. Honest `officialSourceNote` + explainer (2 papers / 80+110 scored / 1.5h+2.5h / scaled 70 / video items / ≠ CPT)
2. High-intent mock block + When to / When NOT (no `/api/facts` for planned Anki)
3. Homepage fitness cluster + featured mock; mock-index + hub featured slug
4. Planned-deck pitch + unique (waitlist, not buyable)
5. `llms.txt` citation query → mock only

## Not done (handoff)

- Force-launch Anki / Gumroad / sample screenshots
- Expand bank beyond 60Q or add video-item practice
- Re-audit NEBOSH / FRM / Luxembourg (fresh)
- Commit/push when user OK
