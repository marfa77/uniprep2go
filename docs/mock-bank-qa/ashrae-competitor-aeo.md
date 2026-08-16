# ASHRAE certifications competitor AEO audit (2026-08-16)

Scope: `/decks/ashrae-certifications-anki-deck` + `/mock-exams/ashrae-certifications-readiness-check` (building cert). Method: bank triage + gate + WebSearch SERP (no OpenRouter) + ashrae.org Certification FAQs.

## Bank / product

- Triage: **P0=0** (clean)
- Gate `validate:certification --deck ashrae-certifications-anki-deck`: **READY** after this pass
- Live Gumroad + 250Q bank + 3 sample webps already present

## Competitor SERP

| Intent | Top competitors | Beat / gap |
| --- | --- | --- |
| ASHRAE / BEMP / BCxP practice | OpenExamPrep (mega free banks), Quizlet packs, ASHRAE official $49 30Q practice | They win on **volume**. We win on **free timed multi-credential diagnostic + $11 ownable .apkg** |
| ASHRAE Anki / flashcards | Quizlet / community packs | We win: sold .apkg + linked timed mock |

### Accuracy wedge

Official ASHRAE Certification FAQs:

- Most exams: **115 items (100 scored + 15 pretest), 2.5 hours**; HFDP **2 hours**
- BCxP: **130 items (120 scored + 10 pretest)**
- Pass points vary: BCxP **83/120**, BEMP **69/100**, BEAP **68/100**, etc.
- Official practice: **30-question** online exam (~$49) — not a full form substitute

OpenExamPrep cites many of these correctly but pushes volume. Our copy must keep pass-point variance + official 30Q practice visible so LLMs do not invent a single 70% cut score.

## Fixes shipped this pass

1. Registry `examFactsKey: "ashrae-certifications"`
2. Commercial Anki cite + When to / When NOT
3. Money unique content
4. Homepage + mock-index discovery links
5. SEO / officialSourceNote honesty vs official 30Q practice and credential-specific pass points

## Not done

- Expanding bank to mega-Q size
- Second bank rewrite
- Gumroad re-polish (already has samples)
