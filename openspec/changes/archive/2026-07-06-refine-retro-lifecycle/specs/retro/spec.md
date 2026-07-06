# retro (delta)

## ADDED Requirements

### Requirement: Resolution lifecycle separates promote from cure

retro SHALL treat a lesson's `promoted` status as non-terminal: a promoted
lesson MAY be re-promoted to a different mechanism (e.g. doc → rule → tool)
and its learning file SHALL be kept to track that evolution. A separate
`resolved` status SHALL mark a problem the user confirms is cured (perfectly
solved, no more adjustment needed); reaching `resolved` SHALL delete the
learning file. Provenance is preserved because the destination mechanism
carries a provenance stamp and git retains history.

#### Scenario: Promote keeps the file

- **WHEN** a lesson is promoted to a mechanism
- **THEN** its learning file is kept (not deleted) so re-promotion can be tracked

#### Scenario: Cure deletes the file

- **WHEN** the user confirms a problem is cured
- **THEN** retro marks it resolved and deletes the learning file

### Requirement: Cure detection on recurrence

When retro detects a previously-recorded problem recurring, it SHALL present
the full trail (all provenance across tasks) and ask the user to choose:
(a) cured → mark resolved and delete; (b) harden for next time → promote,
keeping the file; (c) keep observing → leave it unchanged. retro MUST NOT
mark a problem cured automatically.

#### Scenario: Recurrence offers cure

- **WHEN** a recorded problem recurs and the user confirms this fix cured it
- **THEN** retro marks it resolved and deletes the file, not merely promotes it

#### Scenario: Recurrence still open

- **WHEN** a recorded problem recurs but may return
- **THEN** retro promotes (keeps the file) or leaves it observing, per the user

### Requirement: Stage vs fix-now for new lessons

For a new lesson retro SHALL recommend stage (observe) for a one-off with no
stated rule, and fix-now for a recurring problem or one the user states is a
rule; the user decides. Fix-now SHALL promote directly without an observe
period, keeping the learning file (promotion is not cure).

#### Scenario: Fix-now skips observing

- **WHEN** the user chooses fix-now for a new lesson
- **THEN** retro promotes it directly and keeps the file, without waiting for recurrence

### Requirement: Root-cause candidate titles

A candidate's H1 SHALL describe the root cause, not the change made this
task, so that continued fixes to the same underlying problem match across
tasks.

#### Scenario: Continued fix matches by root cause

- **WHEN** a later task fixes the same underlying problem in a different place
- **THEN** retro matches it to the existing root-cause-titled candidate rather than creating a new one
