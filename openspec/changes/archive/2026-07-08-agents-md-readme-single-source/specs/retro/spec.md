# retro (delta)

## MODIFIED Requirements

### Requirement: Consent-gated routing

Every proposal SHALL be presented for user approval one at a time with
pre-drafted content, at most 3 proposals per retrospective ranked by
impact. Each proposal SHALL include one line of reasoning (why this
destination over the others) and one line stating the consequence of
declining, phrased to match the user's technical background. Approved
proposals route by type: project-shared convention → rule-writing; personal
preference → the agent's native memory; corrected project fact (e.g.
build command, layout) → an edit at the fact's single source (the doc that
owns it, or the entry file when the entry file is its home), shown as a diff
before writing; missing capability → a new file under `.ai/backlog/`; recurring
mistake in an existing skill → update that skill's mistakes section. A
corrected fact SHALL be fixed at its single source per the shared routing's
Placement by loading: when the fact already lives in a human doc (e.g.
README), retro corrects it there and the entry file points to it rather than
gaining a duplicate copy; retro writes the fact into the entry file only when
the entry file is its authoritative home. An entry-file edit SHALL carry ONLY
the lesson's own content (the corrected fact); retro MUST NOT add, sync, or
reconcile the harness block or any other harness-sync-managed content, and an
entry file with no harness block SHALL be left without one. If no entry file
exists, retro MAY create one containing only the fact — never the harness
block. On promotion the candidate file's frontmatter SHALL be updated
(`status: promoted`, `promoted_to`, `promoted_on`) — the destination recorded
is whatever the proposal targeted, not necessarily a rule. A declined
proposal leaves the file at `status: candidate`; `status: dismissed` is set
only on explicit user request.

#### Scenario: User declines

- **WHEN** the user rejects a proposal
- **THEN** nothing is written for that proposal and the candidate file keeps `status: candidate`

#### Scenario: Personal preference approved

- **WHEN** an approved finding is a personal preference rather than a project convention
- **THEN** it is saved to the agent's native memory, and the candidate's `promoted_to` records that memory destination

#### Scenario: Corrected project fact

- **WHEN** the evidenced lesson is a wrong project fact the user corrected (e.g. the build command)
- **THEN** the proposal targets the fact's single source, shows the exact diff, and writes only after approval

#### Scenario: Corrected fact lives in README

- **WHEN** the wrong fact the user corrected is already stated in README (or another human doc)
- **THEN** retro corrects it in that doc and the entry file points to it, rather than writing a second, drifting copy into the entry file

#### Scenario: Entry file has no harness block

- **WHEN** retro writes an approved corrected fact to an entry file (existing or newly created) that has no harness block
- **THEN** it writes only the fact and adds no harness block or other harness-sync-managed content

#### Scenario: Proposal carries reasoning

- **WHEN** any proposal is presented
- **THEN** it states why its destination fits better than the other routes and what happens if declined
