# skill-writing

Authoring a new skill to this collection's standard.

## ADDED Requirements

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

Proposed names SHALL follow the collection's naming philosophy (short,
apt, gerund for managed-unit tools) and SHALL be collision-checked against
the skills.sh registry before finalizing; exact collisions are surfaced
with alternatives.

#### Scenario: Collision found

- **WHEN** the proposed name has an exact match on skills.sh
- **THEN** the collision is reported with install counts and alternative names offered

### Requirement: Gather, draft, review flow

The skill SHALL gather requirements (task domain, use cases, triggers,
needed resources) before drafting, and present the draft for user review
before finalizing. The description's trigger sentence is written from the
gathered use cases, not invented afterward.

#### Scenario: Requirements before draft

- **WHEN** the user asks for a new skill with an unstated trigger context
- **THEN** skill-writing asks for the use cases before producing a draft

### Requirement: Acceptance scaffold and handoff

Authoring SHALL produce an acceptance test plan (`tests/<name>/README.md`
with scenarios and mechanical checks) alongside the skill. When
skill-testing is installed, skill-writing SHALL offer to run it; when
absent, it SHALL leave the plan as a manual checklist.

#### Scenario: skill-testing absent

- **WHEN** the toolchain sibling is not installed
- **THEN** the test plan is still written and presented as a manual checklist, with at most one mention of the install option
