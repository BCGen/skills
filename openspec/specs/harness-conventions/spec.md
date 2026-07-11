# harness-conventions Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

### Requirement: Loop files

The harness SHALL keep its cross-task state in two agent-neutral,
version-controlled directories in the user's project: `.ai/learnings/`
(staged lesson candidates) and `.ai/backlog/` (pre-proposal ideas), one
markdown file per lesson or idea, named as a kebab-case slug of its
content. Each directory SHALL contain a `README.md` documenting its format.
Each lesson file MUST carry YAML frontmatter (`status:
candidate|promoted|dismissed`, `promoted_to`, `promoted_on`), an H1 stating
the lesson, and one dated provenance bullet per observation (date,
originating task, evidence). `promoted_to` records the destination that
fit best — a rule path, native memory, or a skill update — promotion is
not limited to rules.

#### Scenario: Candidate file format

- **WHEN** a lesson candidate is staged
- **THEN** a new file `.ai/learnings/<slug>.md` exists with `status: candidate` frontmatter, an H1 lesson statement, and at least one provenance bullet with date, task, and evidence

#### Scenario: Concurrent staging does not conflict

- **WHEN** two branches each stage a different new lesson and are merged
- **THEN** the merge succeeds without conflict because each lesson is its own file

#### Scenario: Files are project-scoped

- **WHEN** any harness skill needs cross-task state
- **THEN** it reads/writes only files under `.ai/learnings/` or `.ai/backlog/` in the project root, never a machine-local location

### Requirement: Rule budget

The default budget SHALL be: entry file ≤ 60 lines; always-loaded (resident) rules ≤ 150 lines total; ≤ 20 lines per rule file. Path-scoped rules are exempt from the resident total but keep the per-file cap. Budgets are recorded in the rule format spec and MAY be overridden per project.

#### Scenario: Path-scoped exemption

- **WHEN** the resident budget is computed
- **THEN** rules with a path/glob activation condition are excluded from the 150-line resident total

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

### Requirement: Agent detection asks on ambiguity

When detection (presence of `.claude/`, `.cursor/`, `AGENTS.md`) finds zero or multiple candidate agents, the skill SHALL ask the user one question with a recommended answer instead of guessing.

#### Scenario: Fresh project

- **WHEN** no agent artifacts exist in the project
- **THEN** the skill asks which agent(s) to target, recommending AGENTS.md as the portable default

#### Scenario: Multi-agent repo

- **WHEN** both `.claude/` and `.cursor/` exist
- **THEN** the skill asks which target to treat as primary and wires interop glue for the other

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
