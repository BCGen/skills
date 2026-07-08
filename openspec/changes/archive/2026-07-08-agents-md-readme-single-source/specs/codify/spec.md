# codify (delta)

## ADDED Requirements

### Requirement: Facts are single-sourced in a surface that loads

codify SHALL give each fact the agent needs exactly one home, chosen by the
shared routing's "Placement by loading" procedure: a fact inferable from
code/manifest gets no hard-coded home; a non-must-see fact's home is its
human doc, referenced from the entry file by a pointer (or an eager `@import`
only when the doc's bulk is load-bearing every session); a must-see
behavioral constraint routes to a rule (resident, or path/glob-scoped by
reach); a must-see descriptive fact gets a loading home without a second
restated copy — `@import` the short doc that holds it (keeping the doc its
sole home), or inline it in the entry file and downgrade any doc restatement
to a reference (a long must-see doc has its short kernel inlined, the rest
pointered). codify MUST NOT copy a fact that already lives in a
human doc into the entry file as a parallel duplicate, and MUST NOT leave a
must-see fact reachable only through a pointer to a doc that does not
auto-load. When a fact must reach every agent, its home escalates to
`AGENTS.md`, not a per-agent rule directory.

#### Scenario: Fact already in README

- **WHEN** a non-must-see build/test command the agent needs is already in README
- **THEN** codify references README from the entry file (pointer, or `@import` only if README's bulk loads every session) rather than copying the command into the entry file

#### Scenario: Must-see constraint not left behind a pointer

- **WHEN** a must-see behavioral constraint is documented only in a long doc the agent will not auto-load
- **THEN** codify routes it to a rule (or, for cross-agent reach, `AGENTS.md`) so it is in context, not left reachable only via a pointer

#### Scenario: Frequently-changing information

- **WHEN** a fact changes often (e.g. a version number)
- **THEN** codify keeps its value out of the entry file; a plain pointer to the doc is allowed since it stays current without drifting

## MODIFIED Requirements

### Requirement: Project-layer scope only

codify SHALL operate only on project-layer, version-controlled files. It
MUST NOT read or write personal-layer files — auto memory or the global
`~/.claude/CLAUDE.md`. The project entry file (`CLAUDE.md`/`AGENTS.md`) is in
scope as a pointer surface (`@import`/short pointers within its budget) and,
for a short must-see descriptive fact that has no better single-source home,
as the authoritative inline home for that one fact — but never as a container
for detailed conventions, which stay in docs. `README.md` is not a default
conventions target.

#### Scenario: Personal files untouched

- **WHEN** codify runs on a project
- **THEN** it neither reads nor writes auto memory or the global user CLAUDE.md

#### Scenario: Entry file gets a pointer, not detail

- **WHEN** a detailed judgment convention is placed in a doc
- **THEN** codify may add an `@import`/pointer in the entry file but does not write the detailed convention into the entry file

#### Scenario: Short must-see fact may be inline

- **WHEN** a short, stable, must-see descriptive fact has no better single-source home
- **THEN** codify may state it inline in the entry file as its authoritative home, and no other surface restates its value
