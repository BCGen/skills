# codify (delta)

## MODIFIED Requirements

### Requirement: Authority order for detection

When truth-checked sources disagree on a convention, codify SHALL
resolve by the order: explicit config files (commitlint, eslint,
tsconfig, editorconfig, etc.) > project docs (CONTRIBUTING, README,
entry file) > code/history majority. The order ranks convention choices
between truthful sources; a doc that fails the truth-check (unedited
boilerplate, false verifiable claims) is excluded from the order before
ranking. codify MUST NOT carry assumptions from one project to another.

#### Scenario: Config beats history

- **WHEN** an explicit lint config contradicts what most existing code does
- **THEN** codify treats the config as authoritative and flags the code drift

#### Scenario: Failed doc does not outrank code

- **WHEN** a doc that failed the truth-check disagrees with the code
  majority on a convention
- **THEN** the doc does not win by tier; codify treats it as a finding
  to correct, not an authority

### Requirement: Evidence-bounded mechanism upgrade proposal

codify SHALL, for a convention that already has evidence in the project
(documented, consistent in code, or user-stated), evaluate its current
carrier against the best available enforcement mechanism AND against the
current authoring standards (the shared doc-writing guidance; a labeled
`@import` for a short, load-bearing doc), and propose an upgrade when
the carrier falls short — as a consent-gated diff for user discussion.
This includes artifacts codify itself wrote in earlier runs. codify MUST
NOT propose a mechanism for a convention that has no existing evidence
(no unsolicited best-practice pitching).

#### Scenario: Doc convention upgradable to a tool

- **WHEN** a convention is currently enforced only by a project doc but a tool could enforce it deterministically
- **THEN** codify proposes the tool upgrade for discussion, without discarding the doc unilaterally

#### Scenario: Substandard carrier gets an upgrade proposal

- **WHEN** a placed conventions doc violates the doc-writing guidance
  (e.g. a tool-policy preamble, a recorded non-convention), or an
  entry-file reference uses a lesser form than a labeled `@import` for a
  short load-bearing doc
- **THEN** codify proposes the carrier upgrade as a consent-gated diff
  and writes nothing without approval

#### Scenario: No evidence, no proposal

- **WHEN** a best practice has no sign the project cares about it (no doc, no code pattern, no user statement)
- **THEN** codify proposes nothing for it

## ADDED Requirements

### Requirement: Scanned docs are truth-checked

A doc codify reads as an authority source SHALL be checked against
observed reality before it is trusted. The check covers verifiable
binary facts only — unedited template boilerplate, commands or paths
that do not exist — never convention choices (facts can be false;
conventions are chosen, and disagreements between truthful sources stay
with the authority order). A doc failing the check SHALL lose its
authority standing for detection, be flagged as a finding, and receive
a consent-gated correction proposal. codify MUST NOT silently treat
such a doc as authoritative.

#### Scenario: Boilerplate README flagged

- **WHEN** the project README is an unedited hosting-platform template
  carrying no project truth
- **THEN** codify flags it, excludes it from the authority order, and
  proposes a corrected project front page for consent

#### Scenario: Doc contradicting verifiable facts

- **WHEN** a scanned doc names commands or paths that do not exist in
  the project
- **THEN** codify surfaces the mismatch as a finding instead of treating
  the doc as authoritative
