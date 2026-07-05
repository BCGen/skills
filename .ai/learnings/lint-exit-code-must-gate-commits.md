---
status: promoted
promoted_to: .claude/rules/lint-gates-commits.md
promoted_on: 2026-07-05
---

# Lint exit codes must gate commits — never pipe them away

- 2026-07-05 · task: lint-all-authored-markdown wrap-up · evidence: `pnpm lint | tail` masked a failure; an archive-introduced violation reached a pushed commit
- 2026-07-05 · task: add-skill-toolchain proposal · evidence: same pipe pattern masked 43 markdownlint errors; the violating commit was pushed before detection
