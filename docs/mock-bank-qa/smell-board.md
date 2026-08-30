# Mock bank smell board

Generated: 2026-08-30T07:50:20.698Z
Scope: live runnable mocks excluding citizenship

| Tier | Count |
| --- | ---: |
| P0 | 0 |
| P1 | 0 |
| P2 | 2 |
| clean | 2 |

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

