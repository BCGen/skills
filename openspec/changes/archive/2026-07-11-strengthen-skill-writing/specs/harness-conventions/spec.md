# harness-conventions (delta)

## MODIFIED Requirements

### Requirement: Team onboarding block

The entry file SHALL contain a marker-managed block of at most 3 lines
declaring the harness loop: the run-retro-at-task-end directive and the
`.ai/learnings/` / `.ai/backlog/` locations. The install command is not
part of the block — the package README carries install discovery. When a
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
