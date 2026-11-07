# Mock bank smell board

Generated: 2026-11-07T07:55:53.684Z
Scope: live runnable mocks excluding citizenship

| Tier | Count |
| --- | ---: |
| P0 | 0 |
| P1 | 0 |
| P2 | 1 |
| clean | 0 |

## P0 (fix first)

_None_

## P1 (batch mechanical / enrich)

_None_

## Commands

```bash
node --import tsx scripts/triage-mock-bank-smells.mjs
node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --tier P0
node --import tsx scripts/triage-mock-bank-smells.mjs --fix-mechanical --slug nbdhe-readiness-check
```

