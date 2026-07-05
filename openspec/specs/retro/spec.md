# retro (renamed from task-retrospective, 2026-07-05) Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

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

New lessons SHALL first be staged as individual files under
`.ai/learnings/` (one kebab-case-slug file per lesson, `status: candidate`
frontmatter, provenance bullets). Before creating a file the skill SHALL
scan existing filenames and H1 titles for a match; wording differences do
not defeat a match. The skill SHALL propose promoting a candidate only
when the candidate recurs (a matching file already exists) or the user
explicitly confirms promotion. Before proposing promotion the skill SHALL
scan the project's rule locations; when an existing rule already covers
the lesson — regardless of who or what wrote it — the skill SHALL propose
marking the candidate promoted (pointing at that rule) instead of
proposing a new rule. When two existing files turn out to describe the
same lesson, merging them is a valid proposal type.

#### Scenario: First occurrence

- **WHEN** a lesson matches no existing file in `.ai/learnings/`
- **THEN** a new candidate file is created and no promotion is proposed

#### Scenario: Recurrence

- **WHEN** a new lesson matches an existing candidate file
- **THEN** the skill appends a provenance bullet to that file and proposes promotion, citing all provenance bullets

#### Scenario: Lesson already covered by an existing rule

- **WHEN** a recurring candidate's behavior change is already enforced by a rule present in the project
- **THEN** the skill proposes updating the candidate to `status: promoted` pointing at that rule, and does not propose creating a duplicate

### Requirement: Consent-gated routing

Every proposal SHALL be presented for user approval one at a time with
pre-drafted content, at most 3 proposals per retrospective ranked by
impact. Each proposal SHALL include one line of reasoning (why this
destination over the others) and one line stating the consequence of
declining, phrased to match the user's technical background. Approved
proposals route by type: project-shared convention → rule-writing; personal
preference → the agent's native memory; corrected project fact (e.g.
build command, layout) → an entry-file edit shown as a diff before
writing; missing capability → a new file under `.ai/backlog/`; recurring
mistake in an existing skill → update that skill's mistakes section. On
promotion the candidate file's frontmatter SHALL be updated
(`status: promoted`, `promoted_to`, `promoted_on`) — the destination
recorded is whatever the proposal targeted, not necessarily a rule. A
declined proposal leaves the file at `status: candidate`;
`status: dismissed` is set only on explicit user request.

#### Scenario: User declines

- **WHEN** the user rejects a proposal
- **THEN** nothing is written for that proposal and the candidate file keeps `status: candidate`

#### Scenario: Personal preference approved

- **WHEN** an approved finding is a personal preference rather than a project convention
- **THEN** it is saved to the agent's native memory, and the candidate's `promoted_to` records that memory destination

#### Scenario: Corrected project fact

- **WHEN** the evidenced lesson is a wrong project fact the user corrected (e.g. the build command)
- **THEN** the proposal targets the entry file, shows the exact diff, and writes only after approval

#### Scenario: Proposal carries reasoning

- **WHEN** any proposal is presented
- **THEN** it states why its destination fits better than the other routes and what happens if declined

### Requirement: Deletion and merge proposals

Each full retrospective SHALL review existing rules for staleness, overlap, and never-triggered entries, and MAY propose deletions or merges alongside additions.

#### Scenario: Stale rule found

- **WHEN** an existing rule's provenance no longer matches the codebase or it duplicates another rule
- **THEN** the retrospective includes a deletion or merge proposal

### Requirement: No direct rule writes

The skill MUST NOT write rule files itself. Rule writes go through
rule-writing when it is installed; if rule-writing is not installed, the skill
SHALL output the drafted rule text for the user to apply with their own
tooling, MAY mention the rule-writing install option at most once per
retrospective, and MUST NOT repeat the suggestion.

#### Scenario: rule-writing missing

- **WHEN** a rule promotion is approved but rule-writing is not installed
- **THEN** the drafted rule is printed for manual use, with at most one mention of the install option
