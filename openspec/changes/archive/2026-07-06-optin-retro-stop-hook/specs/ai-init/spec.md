# ai-init (delta)

## MODIFIED Requirements

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

## ADDED Requirements

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
