# Tasks: agents-md-readme-single-source

## 1. Shared placement model (keystone)

- [x] 1.1 `shared/routing.md` (repo-root canonical): add "Placement by
  loading" (inferable → none; not-must-see → doc+pointer, eager `@import`
  only when bulk loads every session; must-see behavioral → rule, resident
  vs path/glob-scoped by reach; must-see descriptive → entry-file inline;
  cross-agent → AGENTS.md; two invariants). Soften the `@import`-vs-pointer
  upgrade wording. Run `pnpm sync-routing`; copies byte-identical
- [x] 1.2 `skills/codify/SKILL.md`: fold a one-line pointer to Placement by
  loading into the existing Step 3 (entry-file `@import`/pointer) guidance —
  stay within the 100-line body budget
- [x] 1.3 `skills/retro/SKILL.md`: the corrected-fact route references the
  shared placement (fix at the single source; README not shadowed) — stay
  within budget

## 2. harness-sync — AGENTS.md standard + detection rationale

- [x] 2.1 `references/playbook.md` Detection/Targets: `AGENTS.md` is the
  vendor-neutral cross-agent standard; make detection explicit — for Claude
  Code with no `AGENTS.md`, target `CLAUDE.md` (never manufacture
  `AGENTS.md`); when `AGENTS.md` is present, use a thin `@AGENTS.md` shim
  with the onboarding block living in
  `AGENTS.md`; greenfield/ambiguous → recommend `AGENTS.md`
- [x] 2.2 Interop note: thin `CLAUDE.md` → `@AGENTS.md` is Anthropic-
  documented; `@import` is eager (loads every session)
- [x] 2.3 Content-policy evidence recalibration: drop the sweeping
  input-length claim; keep the per-line removal test; cite <200-line
  "reduce adherence" as corroboration for our stricter ≤60 (no refuted forms)

## 3. Verify and wrap up

- [x] 3.1 harness-sync tests: add a `claude-with-agentsmd` fixture proving
  `CLAUDE.md` begins with `@AGENTS.md` and the harness block lands in
  `AGENTS.md`; add `test ! -e AGENTS.md` to the `existing-claudemd` checks
  (no-manufacture)
- [x] 3.2 codify tests: add a fixture with a real build command in README;
  check the entry file references it (pointer/`@import`) and does NOT
  duplicate it
- [x] 3.3 retro tests: a corrected fact that lives in README is fixed in
  README (entry file points, no duplicate)
- [x] 3.4 Acceptance via fresh-context subagents for the new scenarios
- [x] 3.5 `pnpm lint` + `openspec validate --strict` green; `pnpm lint:fix`
  after archive
- [x] 3.6 Archive change, sync develop and push per the publishing rule
