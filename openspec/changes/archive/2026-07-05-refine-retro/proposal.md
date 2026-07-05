# Proposal: refine-retro

## Why

An interview about the retrospective's decision quality (users range from
senior engineers who want to discuss proposals to people who must rely on
them) surfaced four gaps: proposals carry no reasoning, entry-file facts
have no routing destination, the loop is blind to rules applied outside
add-rule, and the fallback repeatedly advertises installation. The skill
name also proved longer than daily use warrants.

## What Changes

- **BREAKING** (rename, pre-adoption): skill `task-retrospective` → `retro`
  (directory, frontmatter, all references, capability spec folder).
- A: every proposal SHALL include one-line reasoning (why this destination)
  and the consequence of declining, phrased for the user's background.
- B: fifth routing destination — project facts (build commands, layout) →
  entry-file edit, diff-first.
- C: fallback no longer re-advertises install; mention the add-rule option
  at most once per retrospective and respect the user's own tooling.
- D: reconciliation — before proposing promotion, scan the project's rule
  locations; if an existing rule already covers the lesson, propose marking
  the candidate promoted (pointing at that rule) instead of re-creating it.
- Light prose trim (framing/duplication only; state semantics untouched).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `retro` (renamed from `task-retrospective`; living spec folder renamed in
  implementation): Consent-gated routing (A, B, C) and Two-stage promotion
  (D) requirements updated; No direct rule writes fallback wording updated.

## Non-goals

- No loosening of the mandatory add-rule path when installed.
- No convention discovery at init (settled earlier today).
- No session/sprint retro variants (future scope variants use invocation
  args; genuinely different machinery gets its own skill).

## Impact

- `skills/task-retrospective/` → `skills/retro/`; references in add-rule,
  ai-init playbook, README, this repo's and the user's global CLAUDE.md,
  learnings README template, tests, personal-environment symlink.
- Two new acceptance scenarios (reconciliation, entry-file fact) plus
  re-runs of correction and E2E.
