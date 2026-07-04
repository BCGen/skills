# harness-conventions (delta)

## MODIFIED Requirements

### Requirement: Loop files
The harness SHALL keep its cross-task state in two agent-neutral,
version-controlled directories in the user's project: `.ai/learnings/`
(staged lesson candidates) and `.ai/backlog/` (pre-proposal ideas), one
markdown file per lesson or idea, named as a kebab-case slug of its
content. Each directory SHALL contain a `README.md` documenting its format.
Each lesson file MUST carry YAML frontmatter (`status:
candidate|promoted|dismissed`, `promoted_to`, `promoted_on`), an H1 stating
the lesson, and one dated provenance bullet per observation (date,
originating task, evidence). `promoted_to` records the destination that
fit best — a rule path, native memory, or a skill update — promotion is
not limited to rules.

#### Scenario: Candidate file format
- **WHEN** a lesson candidate is staged
- **THEN** a new file `.ai/learnings/<slug>.md` exists with `status: candidate` frontmatter, an H1 lesson statement, and at least one provenance bullet with date, task, and evidence

#### Scenario: Concurrent staging does not conflict
- **WHEN** two branches each stage a different new lesson and are merged
- **THEN** the merge succeeds without conflict because each lesson is its own file

#### Scenario: Files are project-scoped
- **WHEN** any harness skill needs cross-task state
- **THEN** it reads/writes only files under `.ai/learnings/` or `.ai/backlog/` in the project root, never a machine-local location
