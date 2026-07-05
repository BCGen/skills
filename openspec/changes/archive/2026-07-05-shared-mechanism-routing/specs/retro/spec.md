# retro (delta)

## ADDED Requirements

### Requirement: Full routing parity via shared canonical routing

retro SHALL apply the same shared canonical routing logic as codify, from
its byte-identical `references/routing.md` — not a simplified subset. When
retro proposes a mechanism for a lesson (rule / config / doc / tool upgrade
/ pointer), the decision SHALL match what codify would decide for an
equivalent convention. retro's error-learning-specific routes (native
memory, backlog, skill-update) and signal detection remain in its SKILL
body.

#### Scenario: Same decision as codify

- **WHEN** retro routes a lesson that is equivalent to a convention codify would route
- **THEN** both reach the same mechanism decision (their routing.md copies are byte-identical)

#### Scenario: Tool upgrade at parity

- **WHEN** a recurring error is best prevented by a tool
- **THEN** retro proposes the tool upgrade using the shared routing logic, not an ad-hoc simplified version
