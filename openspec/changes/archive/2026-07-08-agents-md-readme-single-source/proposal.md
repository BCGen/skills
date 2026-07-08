# Proposal: agents-md-readme-single-source

## Why

A deep-research pass (2026-07-08, 22 sources, adversarially verified)
confirmed the industry consolidated since these skills were written:
`AGENTS.md` is now the vendor-neutral cross-agent entry-file standard
(stewarded by the Agentic AI Foundation under the Linux Foundation since
Dec 2025, read natively by roughly two dozen tools — Cursor, Codex, Copilot,
Gemini CLI, Windsurf among them), with Claude Code the one major holdout
whose vendor-documented interop is a thin `CLAUDE.md` importing `@AGENTS.md`. The research also
grounded two things our skills assert only vaguely: vendors publish explicit
lean-entry-file budgets with a stated "longer files reduce adherence"
rationale, and the durable answer to README staleness is single-source via
pointer/import, not duplication. This change updates the skills' *guidance*
to match that verified reality, and recalibrates one over-broad evidence
claim that verification refuted.

## What Changes

- **AGENTS.md as the canonical cross-agent file (harness-conventions)**:
  the agent matrix names `AGENTS.md` the vendor-neutral standard, not merely
  a "fallback"; Claude Code stays on `CLAUDE.md`, and when a project has both
  `CLAUDE.md` is a thin `@AGENTS.md` shim so one source serves every agent.
- **Detection logic made explicit (per user decision)**: Claude Code + no
  `AGENTS.md` → `CLAUDE.md` only (the skill does NOT manufacture `AGENTS.md`);
  `AGENTS.md` present → thin `@AGENTS.md` shim; greenfield / ambiguous →
  recommend `AGENTS.md`.
- **Loading-aware single-source placement (shared routing → codify + retro)**:
  a new "Placement by loading" procedure gives each fact ONE home in a
  surface that actually loads. Auto-loaded surfaces are the entry file and
  resident rules; docs do NOT auto-load. Decide by: inferable → no home;
  not-must-see → doc + pointer (eager `@import` only when the doc's bulk
  loads every session); must-see behavioral constraint → a rule (resident,
  or path/glob-scoped by reach); must-see descriptive fact → inline in the
  entry file (authoritative). Two invariants: a must-see fact is never
  reachable only via a pointer to a non-loading doc; one home per fact,
  others reference not restate. This lives in the shared `routing.md`, so
  codify AND retro inherit it — directly targeting README staleness
  (duplication is what drifts).
- **Cross-agent reach escalates the home**: rule dirs are agent-specific
  (`.claude/rules` = Claude only), so a constraint that must reach every
  agent belongs in `AGENTS.md`; default to the agent-native rule, escalate
  only when cross-agent reach is required.
- **retro follows the same placement (retro)**: retro's corrected-fact route
  fixes a fact at its single source — when it lives in README, retro corrects
  README and the entry file points, rather than shadowing it with an
  entry-file duplicate that leaves README stale.
- **Evidence recalibration (harness-sync playbook + rationale)**: the
  sweeping input-length overgeneralization ("performance consistently
  degrades with input length even on simple tasks") was refuted 0-3 in
  verification, so the content-policy rationale is recalibrated onto the
  support that survived — Anthropic's per-line removal test and <200-line
  "reduce adherence" guidance, plus the narrow distractor / context-
  engineering finding — cited in `design.md`. Our stricter ≤60 budget is
  unchanged; vendor <200 is corroboration only.

## Non-goals

- No change to the entry-file line budget (stays ≤ 60, the project's stricter
  chosen convention; vendor <200 is cited only as corroboration).
- No auto-regeneration of README and no "agent updates README every task"
  workflow — the research found no credible backing for either.
- No change to the loop, routing mechanism set, or consent gating.
- Claude Code native `AGENTS.md` support is an open upstream request (exact
  issue number not confirmed here); if it ships, the thin shim is revisited
  then — not pre-empted now.
- rule-writing's own "fallback" wording for `AGENTS.md` (its dialect-emission
  target) is left as-is: there "fallback" names the non-Claude/Cursor emit
  target, a different sense than the entry-file canonicality reframed here.

## Impact

- `openspec/specs/harness-conventions/spec.md`: MODIFIED "Phase 1 agent
  matrix" (AGENTS.md canonical + thin-shim + onboarding-block-in-AGENTS.md +
  do-not-manufacture rule).
- `openspec/specs/codify/spec.md`: ADDED "Facts are single-sourced in a
  surface that loads"; MODIFIED "Project-layer scope only" (short must-see
  fact may be inline).
- `openspec/specs/retro/spec.md`: MODIFIED "Consent-gated routing"
  (corrected fact fixed at its single source; README not shadowed).
- `shared/routing.md` (repo-root canonical) + `pnpm sync-routing` → the
  codify and retro copies: new "Placement by loading" section; softened the
  `@import`-vs-pointer upgrade wording.
- `skills/harness-sync/references/playbook.md`: detection rationale, interop
  note, content-policy evidence recalibration.
- `skills/codify/SKILL.md` and `skills/retro/SKILL.md`: point at the shared
  placement procedure (fold into existing steps within the 100-line budget).
- `design.md`: the cited research backing.
- `tests/`: harness-sync interop (`claude-with-agentsmd`) + `existing-claudemd`
  no-AGENTS.md assertion + codify README-single-source scenario.
