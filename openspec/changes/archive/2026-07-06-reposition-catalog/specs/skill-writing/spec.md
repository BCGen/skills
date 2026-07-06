# skill-writing (delta)

## ADDED Requirements

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

## MODIFIED Requirements

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

### Requirement: Acceptance scaffold and handoff

Authoring SHALL produce an acceptance test plan (scenarios and mechanical
checks) alongside the skill — at `tests/<name>/README.md` for a collection
addition; elsewhere, where the destination keeps tests (same default
path). When skill-testing is installed, skill-writing SHALL offer to run
it; when absent, it SHALL leave the plan as a manual checklist.

#### Scenario: skill-testing absent

- **WHEN** the toolchain sibling is not installed
- **THEN** the test plan is still written and presented as a manual checklist, with at most one mention of the install option
