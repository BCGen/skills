# retro (delta; capability renamed from task-retrospective in this change)

## MODIFIED Requirements

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
proposals route by type: project-shared convention → add-rule; personal
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

### Requirement: No direct rule writes
The skill MUST NOT write rule files itself. Rule writes go through
add-rule when it is installed; if add-rule is not installed, the skill
SHALL output the drafted rule text for the user to apply with their own
tooling, MAY mention the add-rule install option at most once per
retrospective, and MUST NOT repeat the suggestion.

#### Scenario: add-rule missing
- **WHEN** a rule promotion is approved but add-rule is not installed
- **THEN** the drafted rule is printed for manual use, with at most one mention of the install option
