# retro (delta)

## MODIFIED Requirements

### Requirement: Two-stage promotion

New lessons SHALL first be staged as individual files under
`.ai/learnings/` (one kebab-case-slug file per lesson, `status: candidate`
frontmatter, provenance bullets). Before creating a file the skill SHALL
scan existing lessons as an INDEX ONLY — filenames, H1 titles, and
frontmatter `status`, never file bodies — and match by root cause; wording
differences do not defeat a match. It SHALL read a candidate file's full
body only to settle a borderline match. The skill SHALL propose promoting a
candidate only when the candidate recurs (a matching file already exists) or
the user explicitly confirms promotion. On recurrence the skill SHALL read
the matched file in full before citing its provenance trail; the index is
not sufficient for that step. Before proposing promotion the skill SHALL
scan the project's rule locations; when an existing rule already covers the
lesson — regardless of who or what wrote it — the skill SHALL propose
marking the candidate promoted (pointing at that rule) instead of proposing
a new rule. When two existing files turn out to describe the same lesson,
merging them is a valid proposal type.

#### Scenario: First occurrence

- **WHEN** a lesson matches no existing file in `.ai/learnings/`
- **THEN** a new candidate file is created and no promotion is proposed

#### Scenario: Recurrence

- **WHEN** a new lesson matches an existing candidate file
- **THEN** the skill reads the matched file in full, appends a provenance bullet, and proposes promotion citing all provenance bullets

#### Scenario: Index-only match scan

- **WHEN** matching a new lesson against existing learnings
- **THEN** the skill reads only filenames, H1 titles, and `status`, reading a full body only to settle a borderline match

#### Scenario: Lesson already covered by an existing rule

- **WHEN** a recurring candidate's behavior change is already enforced by a rule present in the project
- **THEN** the skill proposes updating the candidate to `status: promoted` pointing at that rule, and does not propose creating a duplicate
