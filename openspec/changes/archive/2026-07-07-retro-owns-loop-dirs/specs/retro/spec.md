# retro (delta)

## ADDED Requirements

### Requirement: Loop-directory ownership and README reconciliation

retro SHALL own the loop directories it writes to — `.ai/learnings/` and
`.ai/backlog/`. When it needs to write to one that does not exist, it SHALL
create the directory and its `README.md` from the canonical templates in
`references/loop-file-formats.md`. When retro is already writing to a loop
directory this run and that directory's README differs from the current
canonical template, it SHALL propose reconciling the README, written
verbatim from the template. retro MUST NOT read or reconcile a loop README
on a run where it writes nothing to `.ai/` — a clean, signal-free task stays
a no-op. Creation and reconciliation SHALL use the agent's native file
tools; no external script or runtime is required, so behavior is identical
across agents.

#### Scenario: Creates the directory on first write

- **WHEN** retro stages a lesson but `.ai/learnings/` does not exist
- **THEN** retro creates the directory and its README from the canonical template

#### Scenario: Reconciles a drifted README while writing

- **WHEN** retro writes to a loop directory and its existing README differs from the current canonical template
- **THEN** retro proposes updating the README verbatim to the template

#### Scenario: Clean task leaves READMEs untouched

- **WHEN** a task has no signals and retro writes nothing to `.ai/`
- **THEN** retro neither reads nor reconciles any loop README
