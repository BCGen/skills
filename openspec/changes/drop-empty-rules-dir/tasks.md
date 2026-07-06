# Tasks: drop-empty-rules-dir

## 1. Implement

- [x] 1.1 SKILL.md: Step 2 inventory and Step 4 plan drop the rules
      directory; one-line rationale added
- [x] 1.2 playbook.md: inventory line drops the rules dir (targets table
      keeps naming where rules live)
- [x] 1.3 tests: existing-claudemd expects no `.claude/rules/` created

## 2. Verify and wrap up

- [x] 2.1 Blind greenfield run: no rules dir, everything else intact,
      pass 2 zero diff
- [x] 2.2 `pnpm lint`; `openspec validate drop-empty-rules-dir`; archive
      keeping the delta; publish on the user's go-ahead
