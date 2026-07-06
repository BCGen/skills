# ai-init (delta)

## MODIFIED Requirements

### Requirement: Idempotent, marker-managed, diff-first writes

Re-running ai-init SHALL produce zero diff when the project's managed
surface matches the current templates. When the skill's templates
have changed since the project was initialized, a re-run SHALL propose
converging exactly the managed surface — the marker-delimited harness
block and the loop-directory READMEs ai-init created — to the current
templates, as diffs. In the entry file, content ai-init owns lives in
marker-delimited sections. User-authored content outside the managed
surface MUST never be modified. Before any write, ai-init SHALL present the plan
in the conversation — the complete content of every file to be created
and a diff for every pre-existing file to be modified — and obtain
approval; it MUST NOT ask for approval of content the user has not been
shown.

#### Scenario: Second run

- **WHEN** ai-init runs twice consecutively with the same skill version
- **THEN** the second run changes nothing

#### Scenario: User content preserved

- **WHEN** the entry file contains hand-written sections outside the
  managed markers
- **THEN** those sections are byte-identical after ai-init runs

#### Scenario: Outdated managed block converges

- **WHEN** the entry file's harness block differs from the current
  template
- **THEN** ai-init proposes a diff updating only the content between the
  markers, and after approval everything outside the markers is
  byte-identical

#### Scenario: Approval shows the content

- **WHEN** ai-init is ready to create new files
- **THEN** the full content of each new file appears in the conversation
  before the approval question is asked
