# task-retrospective (delta)

## MODIFIED Requirements

### Requirement: Two-stage promotion
New lessons SHALL first be staged as individual files under
`.ai/learnings/` (one kebab-case-slug file per lesson, `status: candidate`
frontmatter, provenance bullets). Before creating a file the skill SHALL
scan existing filenames and H1 titles for a match; wording differences do
not defeat a match. The skill SHALL propose promoting a candidate only when
the candidate recurs (a matching file already exists) or the user
explicitly confirms promotion. When two existing files turn out to describe
the same lesson, merging them is a valid proposal type.

#### Scenario: First occurrence
- **WHEN** a lesson matches no existing file in `.ai/learnings/`
- **THEN** a new candidate file is created and no promotion is proposed

#### Scenario: Recurrence
- **WHEN** a new lesson matches an existing candidate file
- **THEN** the skill appends a provenance bullet to that file and proposes promotion, citing all provenance bullets

### Requirement: Consent-gated routing
Every proposal SHALL be presented for user approval one at a time with
pre-drafted content, at most 3 proposals per retrospective ranked by
impact. Approved proposals route by type: project-shared convention →
add-rule; personal preference → the agent's native memory; missing
capability → a new file under `.ai/backlog/`; recurring mistake in an
existing skill → update that skill's mistakes section. On promotion the
candidate file's frontmatter SHALL be updated (`status: promoted`,
`promoted_to`, `promoted_on`) — the destination recorded is whatever the
proposal targeted, not necessarily a rule. A declined proposal leaves the
file at `status: candidate`; `status: dismissed` is set only on explicit
user request.

#### Scenario: User declines
- **WHEN** the user rejects a proposal
- **THEN** nothing is written for that proposal and the candidate file keeps `status: candidate`

#### Scenario: Personal preference approved
- **WHEN** an approved finding is a personal preference rather than a project convention
- **THEN** it is saved to the agent's native memory, and the candidate's `promoted_to` records that memory destination
