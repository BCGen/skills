# Proposal: add-codify

## Why

The collection can capture conventions reactively (retro promotes lessons
after a mistake) but has no way to get the FIRST agent execution right on
an existing project. Worse, research shows rules are the correct mechanism
for only a narrow band of conventions — most project practice should route
to a linter/formatter config, a hook, a template, or nothing at all, and a
rule for it is net-negative (ETH Zurich arXiv 2602.11988; the ~150–200
instruction ceiling). So the missing skill is not a "rule generator" but a
convention ROUTER: scan current practice, classify each convention by
enforcement class, and route it to the fittest mechanism.

## What Changes

- Add `skills/codify/` — an explicitly-invoked, one-time, interactive skill
  that scans a project's current practice, classifies each observed
  convention, and routes it:
  - **non-discoverable / judgment convention** → draft a rule via
    rule-writing (same admission filter, same budget — NOT weakened).
  - **mechanically enforceable** (formatting, import order, lint-fixable
    naming, strict-null) → generate a declarative, diff-first,
    cross-platform config artifact (`.editorconfig`, an eslint/prettier/ruff
    stanza, a tsconfig flag).
  - **must-never / event-gated, procedures, structural defaults,
    executable wiring** (hooks, CI, settings.json, MCP) → point with a
    paste-ready snippet; actual wiring is deferred to a later opt-in skill.
  - **conflicting conventions** → surface the conflict, have the user pick
    the winner and scope, then back the winner with a tool (never arbitrate
    in prose).
- Authority order for detection (generalized from the personal `commit`
  skill): explicit config files > project docs > code/history majority;
  never carry assumptions across projects.
- Success metric is "the first agent execution is accurate," NOT "N rules
  created." Correctly telling the user "this belongs in a linter/hook, not
  a rule" is a success.

## Capabilities

### New Capabilities

- `codify`: scan current practice, classify conventions by enforcement
  class, route to rule (via rule-writing) / declarative config / pointer,
  with conflict resolution and an authority order.

### Modified Capabilities

(none — ai-init, rule-writing, retro unchanged; codify runs after ai-init
and delegates rule writes to rule-writing)

## Non-goals

- No auto-run on the ai-init path — codify is separately, explicitly
  invoked (preserves ai-init's no-auto-discover, near-empty stance).
- No lowering of rule-writing's admission filter or budget.
- No wiring of executable, high-blast-radius, platform-specific artifacts
  (git hooks, CI, settings.json, MCP) — pointer-only; wiring is a future
  opt-in skill (backlog).
- No standalone `commit` skill — commit-convention detection is one
  dimension codify covers; the convention becomes a rule/config it routes.
- No consistency-checking (drift backstop) in this change — backlog.

## Impact

New `skills/codify/` (+ references) and `tests/codify/`. First non-markdown
declarative output for the collection (config artifacts) — a deliberate,
research-backed extension of ai-init's declarative-vs-executable line.
Retires the backlog's commit-migration framing (commit is absorbed, not
migrated).
