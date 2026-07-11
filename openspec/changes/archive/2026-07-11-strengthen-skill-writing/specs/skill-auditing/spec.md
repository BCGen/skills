# skill-auditing (delta)

## MODIFIED Requirements

### Requirement: Generic target

The skill SHALL default to auditing the current project's installed
skills and accept any directory path, including this repo's own
`skills/`.

#### Scenario: Explicit path

- **WHEN** the user names a directory
- **THEN** that directory's skills are audited instead of the default
