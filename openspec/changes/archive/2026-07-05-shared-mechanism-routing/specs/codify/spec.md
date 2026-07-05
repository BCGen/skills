# codify (delta)

## ADDED Requirements

### Requirement: Evidence-bounded mechanism upgrade proposal

codify SHALL, for a convention that already has evidence in the project
(documented, consistent in code, or user-stated), evaluate its current
carrier against the best available enforcement mechanism and propose an
upgrade when the current carrier is sub-optimal (e.g. a doc- or
verbally-enforced convention a linter/tool could enforce deterministically),
for user discussion. codify MUST NOT propose a mechanism for a convention
that has no existing evidence (no unsolicited best-practice pitching).

#### Scenario: Doc convention upgradable to a tool

- **WHEN** a convention is currently enforced only by a project doc but a tool could enforce it deterministically
- **THEN** codify proposes the tool upgrade for discussion, without discarding the doc unilaterally

#### Scenario: No evidence, no proposal

- **WHEN** a best practice has no sign the project cares about it (no doc, no code pattern, no user statement)
- **THEN** codify proposes nothing for it

### Requirement: Shared canonical routing

codify SHALL apply the shared canonical routing logic from its
byte-identical `references/routing.md`. Skill-specific behavior (full scan,
authority-order sources, commit dimension, project-layer scope) lives in
the SKILL body, not the shared file.

#### Scenario: Routing matches the canonical logic

- **WHEN** codify routes a convention
- **THEN** the decision follows the shared routing.md, identical to what retro's copy would decide for the same convention
