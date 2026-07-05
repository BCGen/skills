# repo-quality-checks (delta)

## ADDED Requirements

### Requirement: Shared routing copies must be byte-identical

The repo lint SHALL verify that every skill shipping a copy of the shared
routing logic (`skills/*/references/routing.md` among the consuming skills)
is byte-identical to the others. Any difference SHALL fail the lint, so the
canonical routing cannot drift across skills.

#### Scenario: Drift fails the lint

- **WHEN** one skill's `references/routing.md` differs from another's
- **THEN** the lint fails and names the diverging files
