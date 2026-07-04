# harness-conventions

Shared conventions every harness skill obeys. Other specs reference this one instead of restating numbers or paths.

## ADDED Requirements

### Requirement: Loop files
The harness SHALL keep its cross-task state in two agent-neutral, version-controlled files in the user's project: `.ai/learnings.md` (staged lesson candidates) and `.ai/backlog.md` (skill ideas). Each candidate entry in `.ai/learnings.md` MUST carry provenance: date, originating task, and evidence.

#### Scenario: Candidate entry format
- **WHEN** a lesson candidate is appended to `.ai/learnings.md`
- **THEN** the entry contains a one-line lesson statement plus at least one provenance line with date, task, and evidence

#### Scenario: Files are project-scoped
- **WHEN** any harness skill needs cross-task state
- **THEN** it reads/writes only `.ai/learnings.md` or `.ai/backlog.md` in the project root, never a machine-local location

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
The entry file SHALL contain a marker-managed block of at most 3 lines declaring the harness, the `.ai/` location, and the install command (`npx skills add ...`).

#### Scenario: Teammate without the harness
- **WHEN** a teammate's agent reads the entry file in a harness-initialized project
- **THEN** the block tells it the loop conventions and how its human can install the skills
