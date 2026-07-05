---
status: promoted
promoted_to: .githooks/pre-commit (deterministic enforcement; the advisory rule was retired as redundant once the hook existed)
promoted_on: 2026-07-06
---

# Lint exit codes must gate commits — never pipe them away

- 2026-07-05 · task: lint-all-authored-markdown wrap-up · evidence: `pnpm lint | tail` masked a failure; an archive-introduced violation reached a pushed commit
- 2026-07-05 · task: add-skill-toolchain proposal · evidence: same pipe pattern masked 43 markdownlint errors; the violating commit was pushed before detection
- 2026-07-06 · task: add-codify wrap-up · evidence: THIRD occurrence — `pnpm lint > log; echo $?` then a separate `&&` commit pushed an archive with 5 markdownlint errors, despite the rule at .claude/rules/lint-gates-commits.md existing. Proves the rule (advisory) cannot stop this; needs a deterministic pre-commit hook (exactly today's research conclusion: must-do → hook, not rule)
