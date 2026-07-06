# harness-conventions (delta)

## MODIFIED Requirements

### Requirement: Team onboarding block

The entry file SHALL contain a marker-managed block of at most 3 lines
declaring the harness loop: the run-retro-at-task-end directive and the
`.ai/learnings/` / `.ai/backlog/` locations. The install command is not
part of the block — the collection README carries install discovery.

#### Scenario: Teammate without the harness

- **WHEN** a teammate's agent reads the entry file in a
  harness-initialized project
- **THEN** the block tells it the loop conventions — where lessons and
  ideas live, and that retro runs when a task ends
