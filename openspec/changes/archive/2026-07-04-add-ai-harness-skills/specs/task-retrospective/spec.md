# task-retrospective

Post-task retrospective: mine external evidence, stage lessons, route approved proposals to executors. Obeys `harness-conventions`.

## ADDED Requirements

### Requirement: Signal-gated triggering

The skill SHALL run a full retrospective only when at least one signal fired during the task: a user correction, a failed or reverted command, or a repeated mistake. When no signal fired, it SHALL emit a report of at most 2 lines and stop.

#### Scenario: Clean task

- **WHEN** the task completes with no corrections, failures, or repeats
- **THEN** the retrospective outputs ≤ 2 lines and makes no proposals and no file writes

#### Scenario: Correction occurred

- **WHEN** the user corrected the agent during the task
- **THEN** the full retrospective runs

### Requirement: Evidence from current conversation only

Analysis SHALL be grounded in externally observable evidence present in the current conversation (user corrections, failed commands, reverted edits). The skill MUST NOT propose lessons from self-critique alone and MUST NOT depend on platform transcript files.

#### Scenario: No external evidence for a hunch

- **WHEN** the agent merely suspects something could be improved but no user correction or failure evidences it
- **THEN** no candidate is staged

### Requirement: Two-stage promotion

New lessons SHALL first be appended to `.ai/learnings.md` as candidates with provenance. The skill SHALL propose promoting a candidate to a rule only when the candidate recurs (a matching prior entry exists) or the user explicitly confirms promotion.

#### Scenario: First occurrence

- **WHEN** a lesson has no matching prior candidate in `.ai/learnings.md`
- **THEN** it is staged as a candidate and not proposed as a rule

#### Scenario: Recurrence

- **WHEN** a new lesson matches an existing candidate entry
- **THEN** the skill proposes promotion to a rule, citing both provenance entries

### Requirement: Consent-gated routing

Every proposal SHALL be presented for user approval one at a time with pre-drafted content, at most 3 proposals per retrospective ranked by impact. Approved proposals route by type: project-shared convention → add-rule; personal preference → the agent's native memory; missing capability → `.ai/backlog.md`; recurring mistake in an existing skill → update that skill's mistakes section.

#### Scenario: User declines

- **WHEN** the user rejects a proposal
- **THEN** nothing is written for that proposal and the candidate remains staged

#### Scenario: Personal preference approved

- **WHEN** an approved finding is a personal preference rather than a project convention
- **THEN** it is saved to the agent's native memory, not to a rule file

### Requirement: Deletion and merge proposals

Each full retrospective SHALL review existing rules for staleness, overlap, and never-triggered entries, and MAY propose deletions or merges alongside additions.

#### Scenario: Stale rule found

- **WHEN** an existing rule's provenance no longer matches the codebase or it duplicates another rule
- **THEN** the retrospective includes a deletion or merge proposal

### Requirement: No direct rule writes

The skill MUST NOT write rule files itself. Rule writes go through add-rule; if add-rule is not installed, the skill SHALL output the drafted rule text and tell the user how to install add-rule.

#### Scenario: add-rule missing

- **WHEN** a rule promotion is approved but add-rule is not installed
- **THEN** the drafted rule is printed for manual use and the install command is shown
