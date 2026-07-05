# Tasks: add-codify

## 1. Build codify

- [x] 1.1 Write `skills/codify/references/routing.md`: the enforcement-class routing table, authority order, and the declarative-vs-executable boundary (single reference for the classification logic)
- [x] 1.2 Draft `skills/codify/SKILL.md`: explicit invocation, scan by authority order, classify + route (rule via rule-writing / config artifact / pointer), conflict-at-source flow, rule-writing delegation with fallback
- [x] 1.3 Bake in the commit dimension: commitlint/CONTRIBUTING/history detection → route to a commit rule or point at commitlint config (replaces the standalone commit skill)

## 2. Tests and wrap-up

- [x] 2.1 Build a fixture project mixing a lint-fixable style, a non-discoverable tribal convention, a conflicting pair, and a commit convention; write `tests/codify/README.md` with mechanical checks (config artifact emitted for the style; rule drafted for the tribal one; nothing for a discoverable fact; conflict surfaced not arbitrated)
- [x] 2.2 Acceptance via skill-testing over the fixture; verify routing mechanically
- [x] 2.3 Dogfood codify on a real project; act on findings
- [x] 2.4 Retire the commit-migration backlog entry; update README skills table; lint; archive change; sync develop and push per the publishing rule
