# ai-init (delta)

## MODIFIED Requirements

### Requirement: Idempotent, marker-managed, diff-first writes

Re-running ai-init on an initialized project SHALL produce zero diff.
Content ai-init owns lives in marker-delimited sections; user-authored
content outside markers MUST never be modified. Before any write,
ai-init SHALL present the plan in the conversation — the complete
content of every file to be created and a diff for every pre-existing
file to be modified — and obtain approval; it MUST NOT ask for approval
of content the user has not been shown.

#### Scenario: Second run

- **WHEN** ai-init runs twice consecutively
- **THEN** the second run changes nothing

#### Scenario: User content preserved

- **WHEN** the entry file contains hand-written sections outside the
  managed markers
- **THEN** those sections are byte-identical after ai-init runs

#### Scenario: Approval shows the content

- **WHEN** ai-init is ready to create new files
- **THEN** the full content of each new file appears in the conversation
  before the approval question is asked
