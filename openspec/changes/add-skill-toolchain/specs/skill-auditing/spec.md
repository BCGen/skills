# skill-auditing

Two-layer staleness audit of any skills directory.

## ADDED Requirements

### Requirement: Two audit layers, reported separately

The skill SHALL audit on two layers: format (frontmatter shape,
description trigger sentence, body length, references integrity — checked
offline against the authoring conventions file) and content facts
(commands, APIs, versions, paths referenced by the skill — verified
against live documentation). Findings SHALL be reported per layer with
severity and the evidence or source for each.

#### Scenario: Outdated content fact

- **WHEN** a skill instructs a command or API usage that current official docs contradict
- **THEN** the finding cites the current doc as the source

#### Scenario: Unverifiable claim

- **WHEN** a content fact cannot be confirmed or denied from available sources
- **THEN** it is listed as unverifiable, not guessed

### Requirement: Generic target

The skill SHALL default to auditing the current project's installed
skills and accept any directory path, including this collection's own
`skills/`.

#### Scenario: Explicit path

- **WHEN** the user names a directory
- **THEN** that directory's skills are audited instead of the default

### Requirement: Fix routing

Approved fixes SHALL route to skill-writing when installed; otherwise the
audit report includes the proposed edits for manual application, with at
most one mention of the install option.

#### Scenario: skill-writing absent

- **WHEN** the sibling is not installed and the user approves a fix
- **THEN** the exact proposed edit is printed for manual use
