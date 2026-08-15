# Wave-31 competitor AEO audit (2026-08-15)

Scope: **31** wave decks with live Gumroad `productId` + `apkg` (auto-launched). Method: local GEO matrix + WebSearch SERP (no OpenRouter).

## Our GEO coverage (before this pass)

| Layer | Covered | Gap |
| --- | ---: | ---: |
| exam-facts | 3 | 28 |
| commercial cite | 3 | 28 |
| money unique | 4 | 27 |
| SEO override | 2 | 29 |
| homepage link | 9 | 22 |
| mock-index link | 0 | 31 |
| sample webps | 4 | 27 |

Green: ACE, Luxembourg, RD (+ WELL is building). Almost all **state-RE** and most **money** SKUs launched cold.

## Cohort findings

### State RE (19 launched) — SERP sample FL / TX

**Competitors:** floridarealestateexampractice.com (382Q free forever), OpenExamPrep (301+), Aceable/PrepAgent lead-gen, TakeZeroHQ, CARealestate freemium.

**They win on:** free bank size (100–300+ Q), often closer to official length (FL 100Q / 3.5h / 75%; TX ~125Q / dual national+state / 70%).

**We win on:** free timed mock + **ownable $11 .apkg** (competitors rarely sell clean Anki); topic report; no signup. Diagnostic honesty (60Q) if we state official FL/TX numbers clearly.

**P0 copy risk:** thin `officialSourceNote` (“aligned to themes”) loses AEO vs sites that quote DBPR/TREC numbers. Thin/noindex swarm states should stay noindex until facts+SEO are solid — keep `INDEXABLE_STATE_RE_SLUGS` = CA/FL/TX/NY only.

### Money (Series 6/65/66/79/99, EA, CFP, MLO)

**Series 65 SERP:** FreeFellow (922Q free), Achievable (130Q free full-length), Mometrix, Quizlet. Ownable focused Anki is scarce (DIY advice dominates).

**We win:** $11 ownable .apkg + free timed mock.  
**We lose:** bank depth vs FreeFellow/Achievable; missing exam-facts + commercial cites.

### DELE/CCSE bundle

**Main competitor:** Prep2Go (our sibling) — 1000 vocab + 330 CCSE cards. Jobbatical guides.

**Gap:** UniPrep listing is **60 cards** vs Prep2Go dual thick decks — do not overclaim “full citizenship prep.” Position as compact MCQ diagnostic companion + free CCSE mock, link Prep2Go for full language stack.

### RD

Already cited. Competitors: Brainscape packs, scattered Anki. We beat on free timed mock + CDR domain weights when facts stay accurate.

### Appraiser

Competitors: EstatePass / OpenExamPrep / AppraiserPrep free Q banks (AQB 125Q, scaled 75). Same wedge: free diagnostic + $11 Anki; need official AQB numbers in source note.

## Priority ship list (this pass)

1. FL/TX/NY SEO + officialSourceNote with correct official vs diagnostic framing — **done**
2. Commercial cites: FL/TX/NY RE Anki, Series 65, DELE/CCSE, MLO — **done**
3. Homepage discovery for FL/TX/NY RE — **done**
4. Money unique for FL/TX/NY + Series 65 + MLO + DELE — **done**
5. Series 65 + MLO + Appraiser source notes — **done**
6. Remaining ~20 state-RE / money SKUs (facts/samples/SEO) — **backlog**

## Explicitly not done in this pass

- Full SERP for every AK/AL/AR/… state (same pattern as FL/TX)
- exam-facts profiles for all remaining gaps
- Sample webps for 27 decks
- Expanding mock banks to official length
- Full commercial cites for Series 6/66/79/99, EA, CFP (Series 65 + MLO done as money spear)
