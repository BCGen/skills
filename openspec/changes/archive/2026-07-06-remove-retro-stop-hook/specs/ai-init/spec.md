# ai-init (delta)

## MODIFIED Requirements

### Requirement: Instruction-surface scope

ai-init SHALL create or update: the entry file (CLAUDE.md / AGENTS.md),
per-rule directory structure, cross-agent interop glue (e.g. CLAUDE.md
`@AGENTS.md` import when both are present), and the loop directories
`.ai/learnings/` and `.ai/backlog/`, each containing its `README.md`
format doc. It MUST NOT create or modify execution settings
(settings.json, hooks, MCP configuration).

#### Scenario: Full greenfield init

- **WHEN** ai-init runs on a project with no AI setup
- **THEN** after the run the entry file, rules directory, and both loop
  directories with READMEs exist, and no settings/hooks/MCP files were
  created

### Requirement: Idempotent, marker-managed, diff-first writes

Re-running ai-init on an initialized project SHALL produce zero diff.
Content ai-init owns lives in marker-delimited sections; user-authored
content outside markers MUST never be modified. Before writing to any
pre-existing file, ai-init SHALL present a diff for approval.

#### Scenario: Second run

- **WHEN** ai-init runs twice consecutively
- **THEN** the second run changes nothing

#### Scenario: User content preserved

- **WHEN** the entry file contains hand-written sections outside the
  managed markers
- **THEN** those sections are byte-identical after ai-init runs

## REMOVED Requirements

### Requirement: Opt-in retro Stop hook (Claude Code target only)

**Reason**: field testing showed the hook fires on every turn end
(Claude Code has no task-completed event), producing per-turn noise and
`Stop hook error:` renders even on greetings; the resident harness-block
directive plus retro's description triggers are the right-sized
replacement.
