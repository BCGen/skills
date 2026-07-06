# skill-writing Specification

## Purpose

Authoring a new skill to a tested standard — for a skills collection, a
project, or the user's personal setup.

## Requirements

### Requirement: Convention-complete authoring

A skill authored through skill-writing SHALL satisfy the collection
standard: frontmatter name equals the directory name; description is a
capability sentence plus a "Use when ..." sentence within 1024 characters;
body within 100 lines with detail split into references/; English only;
original content (no vendoring); scripts only for deterministic
operations. The conventions SHALL live in one references file that other
skills (e.g. skill-auditing) can read as the same source of truth.

#### Scenario: Convention enforcement

- **WHEN** a draft violates any convention (e.g. body over 100 lines)
- **THEN** skill-writing fixes or flags it before presenting the draft

### Requirement: Naming discipline

Proposed names SHALL follow the conventions' naming philosophy (short,
apt, gerund for managed-unit tools). A collection addition SHALL be
collision-checked against the skills.sh registry before finalizing, with
exact collisions surfaced with install counts and alternatives; a skill
not being added to a collection skips the registry and SHALL only avoid
names already installed at its destination.

#### Scenario: Collision found

- **WHEN** the proposed name of a collection addition has an exact match
  on skills.sh
- **THEN** the collision is reported with install counts and alternative names offered

#### Scenario: Non-collection naming

- **WHEN** authoring a skill not destined for a collection
- **THEN** no registry check is required; only clashes with skills already
  installed at the destination are avoided

### Requirement: Gather, draft, review flow

The skill SHALL gather requirements (task domain, use cases, triggers,
needed resources) before drafting, and present the draft for user review
before finalizing. The description's trigger sentence is written from the
gathered use cases, not invented afterward.

#### Scenario: Requirements before draft

- **WHEN** the user asks for a new skill with an unstated trigger context
- **THEN** skill-writing asks for the use cases before producing a draft

### Requirement: Acceptance scaffold and handoff

Authoring SHALL produce an acceptance test plan (scenarios and mechanical
checks) alongside the skill — at `tests/<name>/README.md` for a collection
addition; elsewhere, where the destination keeps tests (same default
path). When skill-testing is installed, skill-writing SHALL offer to run
it; when absent, it SHALL leave the plan as a manual checklist.

#### Scenario: skill-testing absent

- **WHEN** the toolchain sibling is not installed
- **THEN** the test plan is still written and presented as a manual checklist, with at most one mention of the install option

### Requirement: Destination-aware authoring (delegation target)

skill-writing SHALL establish where a skill lives as part of requirements
gathering — a collection's `skills/`, the host project's skill directory,
or the user's global skills directory — recommending from context and
asking one question with a recommended answer when the destination is
ambiguous. It is the delegation target that codify and retro hand
multi-step procedures to per the shared routing; a delegated project
procedure is recommended into that project. The acceptance-plan
discipline SHALL hold at every destination. The frontmatter description
SHALL surface the non-collection triggers so delegated handoffs reach
the skill.

#### Scenario: Delegated handoff lands in the project

- **WHEN** codify or retro hands over a drafted multi-step procedure while
  working in a host project
- **THEN** skill-writing authors it in that project's skill directory per
  the context recommendation, not as a collection addition

#### Scenario: Ambiguous destination

- **WHEN** the gathered context does not settle where the skill lives
  (e.g. zero or multiple plausible skill directories)
- **THEN** skill-writing asks one question with a recommended answer
  before writing
