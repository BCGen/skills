# ai-init Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

### Requirement: Instruction-surface scope

ai-init SHALL create or update: the entry file (CLAUDE.md / AGENTS.md),
per-rule directory structure, cross-agent interop glue (e.g. CLAUDE.md
`@AGENTS.md` import when both are present), and the loop directories
`.ai/learnings/` and `.ai/backlog/`, each containing its `README.md`
format doc. It MUST NOT create or modify execution settings
(settings.json, hooks, MCP configuration) — with exactly one exception,
the opt-in retro Stop hook governed by its own requirement below; absent
that explicit consent, no settings file is created or touched.

#### Scenario: Full greenfield init

- **WHEN** ai-init runs on a project with no AI setup and the retro Stop
  hook is declined or not offered
- **THEN** after the run the entry file, rules directory, and both loop
  directories with READMEs exist, and no settings/hooks/MCP files were
  created

### Requirement: Wrap native discovery, near-empty baseline

For codebase-convention discovery ai-init SHALL use the agent's native `/init` capability where available rather than re-implementing scanning. The installed baseline SHALL contain only structure, interop glue, and harness conventions — no generic opinionated coding rules.

#### Scenario: Baseline content

- **WHEN** ai-init completes on a fresh project without user-specific input
- **THEN** no rule restating generic best practices (e.g. "write clean code") exists in the output

### Requirement: Idempotent, marker-managed, diff-first writes

Re-running ai-init on an initialized project SHALL produce zero diff. In
markdown files, content ai-init owns lives in marker-delimited sections;
in `.claude/settings.json` (the opt-in hook only) the owned content is
exactly the retro Stop hook entry, merged surgically. User-authored
content outside those owned regions MUST never be modified —
pre-existing settings keys keep their values unchanged, with only the
syntax the merge requires (e.g. a trailing comma) allowed to move.
Before writing to any pre-existing file, ai-init SHALL present a diff
for approval.

#### Scenario: Second run

- **WHEN** ai-init runs twice consecutively
- **THEN** the second run changes nothing

#### Scenario: User content preserved

- **WHEN** the entry file contains hand-written sections outside the
  managed markers
- **THEN** those sections are byte-identical after ai-init runs

### Requirement: Framework coexistence

When spec-kit (`.specify/`), Agent OS (`agent-os/`), or Kiro (`.kiro/steering/`) artifacts are detected, ai-init SHALL NOT generate content duplicating theirs; it SHALL add a one-line reference to the existing framework in the entry file and install only the harness loop pieces they lack.

#### Scenario: spec-kit present

- **WHEN** `.specify/` exists in the project
- **THEN** ai-init references the constitution instead of generating principle rules, and still creates `.ai/` loop files

### Requirement: Onboarding block installation

ai-init SHALL write the team onboarding block defined in harness-conventions into the entry file.

#### Scenario: Block present after init

- **WHEN** ai-init completes
- **THEN** the entry file contains the ≤ 3-line managed harness block with the install command

### Requirement: Opt-in retro Stop hook (Claude Code target only)

When the detected target is Claude Code, ai-init SHALL ask one question
offering to add the named retro Stop hook, with yes as the recommended
answer; in a non-interactive run the default SHALL be skip. Only on
explicit consent SHALL it write the hook to `.claude/settings.json`,
diff-first and surgically — pre-existing keys keep their values unchanged
— and a re-run with the hook already present SHALL change nothing. The hook
snippet SHALL prevent continuation loops via the `stop_hook_active`
flag. No other hook, permission, MCP, or CI setting may ever be written.

#### Scenario: Consent writes surgically

- **WHEN** the user accepts the offer and `.claude/settings.json` already
  exists with other keys
- **THEN** the hook is added and every pre-existing key keeps its value
  unchanged

#### Scenario: Declined leaves no trace

- **WHEN** the user declines the offer
- **THEN** no settings file is created or modified

#### Scenario: Idempotent re-run

- **WHEN** ai-init runs again on a project that already has the hook
- **THEN** the second run changes nothing
