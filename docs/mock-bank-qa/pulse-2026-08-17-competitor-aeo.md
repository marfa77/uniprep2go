# Pulse competitor AEO (2026-08-17)

Scope: growth-pulse Top pages that had **no** live-pass competitor SERP (July meta SEO/AEO ≠ this pass). Method: WebSearch + fetch (no OpenRouter). Cadence locked: next full pass **2026-10-17**. Ledger: `competitor-aeo-ledger.md`.

Skipped as already fresh: ACSM, ASHRAE, NEBOSH, WELL, wave-31, Luxembourg **full SERP** (shipped 2026-08-14). Luxembourg got a cheap SEO fix only (stale “Waitlist Anki”).

## SERP vs us

| Intent | Top competitors | Beat / gap / ship |
| --- | --- | --- |
| DELF B2 Anki | Prep2Go shop (sibling, 2000+ audio), Language Atlas ~4174, AnkiWeb LITE | We win: UniPrep Gumroad listing + diploma/immigration framing. Don’t overclaim vs Prep2Go shop. **Shipped:** commercial cite + When-to |
| Dutch A2 / Inburgering Anki | UniPrep already ranks; Prep2Go shop; Open KNM free civics/vocab | Honesty: Inburgering = **5 modules**, not one MCQ. **Shipped:** cite + unique 5-module note |
| German A2 Anki | Prep2Go / AnkiWeb LITE / AnkiWordBank $9.99 / Language Atlas | Wedge: Goethe/telc/ÖSD/DTZ shared lexicon. **Not** Leben in Deutschland. Homepage had only RU variant — **added canonical** |
| CFA L1 Anki / formula | MintDeck apps, TPT dumps, DIY Anki | Already strong: $29/342 + 60Q + $19 formula PDF. Official **180 MCQ / 4h30 / MPS not fixed** |
| CFA L2 Anki | Same mega-dump / Q-bank set | **Cite gap closed:** $39/495 + 60Q + L2 formula PDF |
| FRM Part 1 | AnkiWeb stale, Brainscape, FreeFellow mega Q-bank | $29/444 + free 50Q. Official **100 MCQ / 4h / no fixed pass**. **Shipped:** homepage mock link |
| CA real estate Anki | CARealestate 1500+ Q, RE Exam Practice Pro 1700+ / $9.99 mo | We: 400 CA-only + free 60Q. Official **150Q (75+75) / 3h15 / 70% both**. **Shipped:** official numbers on money page |
| LME / metal trader | Thin SERP; CFA dumps | Already cited 202 cards. Samples 2–3 still duplicate `-sample-1.webp` — **do not invent webps** |
| ASPT phlebotomy | PracticeTestGeeks / ExamEdge invent 100Q or 150Q | **Shipped:** honesty note + ASPT ≠ NHA CPT ≠ ASCP PBT (~80 CAT / ~2h). Deck stays planned. No invented official form |

## Fixes shipped this pass

1. Cadence rule `.cursor/rules/competitor-aeo-cadence.mdc` + live-mock skip if &lt; 60 days
2. Commercial cites: CFA L2, DELF B2, Dutch A2, German A2
3. High-intent ASPT mock block (no live Anki claim)
4. When-to / When-NOT lines for the language trio, CFA L2, ASPT vs NHA/ASCP
5. Money: CFA L2 pitch + positioning; CA RE official 150Q; Dutch 5-module; ASPT planned unique
6. Luxembourg mock SEO: drop “Waitlist Anki”
7. ASPT officialSourceNote + explainer honesty
8. Homepage: FRM mock, German A2 canonical, Luxembourg deck, ASPT mock
9. Mock-index featured: Luxembourg, ASPT, FRM
10. `llms.txt` citation queries + `npm run llms:export`

## Not done (handoff)

- ASPT Gumroad / screenshots / force-launch
- Bench metals unique sample-2/3 webps (wait for user Anki captures)
- Bank rewrites (none — P0 not in scope)
- Commit/push until user OK
