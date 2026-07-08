# harness-conventions (delta)

## MODIFIED Requirements

### Requirement: Phase 1 agent matrix

`AGENTS.md` SHALL be treated as the canonical cross-agent entry file — the
vendor-neutral standard read natively by Cursor and most agents. Harness
skills SHALL support these native targets in Phase 1: Claude Code
(`.claude/rules/*.md`, entry file `CLAUDE.md`), Cursor (`.cursor/rules/*.mdc`
or `AGENTS.md`), and `AGENTS.md` for all other agents. Claude Code does not
read `AGENTS.md` natively; when a project has both, `CLAUDE.md` SHALL be a
thin shim importing `AGENTS.md` (`@AGENTS.md`) so a single source serves
every agent. When both files exist, the onboarding block and any shared
harness content SHALL live in `AGENTS.md` (imported into `CLAUDE.md` via the
shim), never duplicated across both, so no agent reading `AGENTS.md` misses
it. A Claude-Code project with no `AGENTS.md` SHALL stay on `CLAUDE.md`; the
skill SHALL NOT create `AGENTS.md` unless the user opts into cross-agent
portability.

#### Scenario: Unknown agent

- **WHEN** a project's agent cannot be identified as Claude Code or Cursor
- **THEN** rules and entry content target `AGENTS.md`

#### Scenario: Claude Code with AGENTS.md present

- **WHEN** a project uses Claude Code and an `AGENTS.md` already exists
- **THEN** `CLAUDE.md` is a thin shim importing `@AGENTS.md`, and shared content is written once in `AGENTS.md`

#### Scenario: Claude Code without AGENTS.md

- **WHEN** a project uses Claude Code and has no `AGENTS.md`
- **THEN** the entry file stays `CLAUDE.md` and no `AGENTS.md` is created unless the user opts into cross-agent portability

### Requirement: Team onboarding block

The entry file SHALL contain a marker-managed block of at most 3 lines
declaring the harness loop: the run-retro-at-task-end directive and the
`.ai/learnings/` / `.ai/backlog/` locations. The install command is not
part of the block — the collection README carries install discovery. When a
thin `@AGENTS.md` shim is used, the block lives in `AGENTS.md` and the
`CLAUDE.md` requirement to "contain" it is satisfied by the `@AGENTS.md`
import — the block is never duplicated into the shim.

#### Scenario: Teammate without the harness

- **WHEN** a teammate's agent reads the entry file in a
  harness-initialized project
- **THEN** the block tells it the loop conventions — where lessons and
  ideas live, and that retro runs when a task ends

#### Scenario: Block under a thin shim

- **WHEN** the project uses a thin `CLAUDE.md` importing `@AGENTS.md`
- **THEN** the onboarding block lives in `AGENTS.md` and reaches Claude Code through the import, not a duplicate copy in `CLAUDE.md`
