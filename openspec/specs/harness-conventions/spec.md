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

Harness skills SHALL support exactly these native targets in Phase 1: Claude Code (`.claude/rules/*.md`, entry file `CLAUDE.md`), Cursor (`.cursor/rules/*.mdc`, entry file `AGENTS.md` or `.cursor/rules`), and the portable fallback `AGENTS.md` for all other agents.

#### Scenario: Unknown agent

- **WHEN** a project's agent cannot be identified as Claude Code or Cursor
- **THEN** rules and entry content target `AGENTS.md`

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
part of the block — the collection README carries install discovery.

#### Scenario: Teammate without the harness

- **WHEN** a teammate's agent reads the entry file in a
  harness-initialized project
- **THEN** the block tells it the loop conventions — where lessons and
  ideas live, and that retro runs when a task ends
