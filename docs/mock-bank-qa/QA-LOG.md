# Mock bank QA log (local, no OpenRouter)

**Date:** 2026-08-06  
**Scope:** live runnable mocks, excluding citizenship/naturalization and Anki.

## What ran

1. Structural audit → `structure-summary.json` (179 banks)
2. Cheap pads for tiny distractor / short explanations (`audit-mock-banks-structure.mjs --fix-cheap`)
3. Money-cluster local rewrite (`repair-money-mock-banks-local.mjs`) — SIE / 7 / 63 / CA RE / L&H / P&C
4. Definition-style distractor repair (`repair-definition-style-distractors-local.mjs --all-live`)
5. Short-stem expansion (`expand-short-mock-stems-local.mjs`)
6. SourceNote restore from git + duplicate-option cleanup + IAR manual fixes on Series 63

## Results

| Check | Result |
|-------|--------|
| Structural audit (non-citizenship live) | **179 green / 0 yellow / 0 red** |
| `mock-exams.test.ts` | **42/42 pass** |
| Citizenship banks | Untouched |

## Money cluster notes

- SIE / Series 7 / Series 63 had heavy Anki→MCQ “foreign definition” distractors; repaired locally with parallel options and scenario stems where flagged.
- CA RE / L&H / P&C were healthier; stems expanded and remaining weak distractors cleaned.
- Series 63 IAR-001/002 rewritten by hand after duplicate placeholder distractors.

## Residual risk

- Local definition-style repairs use rule-based wrong statements (negation / category confusion). Better than unrelated deck dumps, but not a substitute for SME item writing on every niche trade/health bank.
- State-RE swarm outside CA/FL/TX/NY: structural green after stem expansion; deep content still template-adjacent.
- No OpenRouter cold-solve pass in this run (per request).

## Scripts added

- `scripts/audit-mock-banks-structure.mjs`
- `scripts/repair-money-mock-banks-local.mjs`
- `scripts/repair-definition-style-distractors-local.mjs`
- `scripts/expand-short-mock-stems-local.mjs`
- `scripts/rewrite-rejected-mock-questions.mjs` (OpenRouter path kept, unused here)
