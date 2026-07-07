# retro (renamed from task-retrospective, 2026-07-05) Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

### Requirement: Signal-gated triggering

The skill SHALL run a full retrospective only when at least one signal fired during the task: a user correction, a failed or reverted command, or a repeated mistake. When no signal fired, it SHALL emit a report of at most 2 lines and stop.

#### Scenario: Clean task

- **WHEN** the task completes with no corrections, failures, or repeats
- **THEN** the retrospective outputs ≤ 2 lines and makes no proposals and no file writes

#### Scenario: Correction occurred

- **WHEN** the user corrected the agent during the task
- **THEN** the full retrospective runs

### Requirement: Evidence from current conversation only

Analysis SHALL be grounded in externally observable evidence present in the current conversation (user corrections, failed commands, reverted edits). The skill MUST NOT propose lessons from self-critique alone and MUST NOT depend on platform transcript files.

#### Scenario: No external evidence for a hunch

- **WHEN** the agent merely suspects something could be improved but no user correction or failure evidences it
- **THEN** no candidate is staged

### Requirement: Two-stage promotion

New lessons SHALL first be staged as individual files under
`.ai/learnings/` (one kebab-case-slug file per lesson, `status: candidate`
frontmatter, provenance bullets). Before creating a file the skill SHALL
scan existing lessons as an INDEX ONLY — filenames, H1 titles, and
frontmatter `status`, never file bodies — and match by root cause; wording
differences do not defeat a match. It SHALL read a candidate file's full
body only to settle a borderline match. The skill SHALL propose promoting a
candidate only when the candidate recurs (a matching file already exists) or
the user explicitly confirms promotion. On recurrence the skill SHALL read
the matched file in full before citing its provenance trail; the index is
not sufficient for that step. Before proposing promotion the skill SHALL
scan the project's rule locations; when an existing rule already covers the
lesson — regardless of who or what wrote it — the skill SHALL propose
marking the candidate promoted (pointing at that rule) instead of proposing
a new rule. When two existing files turn out to describe the same lesson,
merging them is a valid proposal type.

#### Scenario: First occurrence

- **WHEN** a lesson matches no existing file in `.ai/learnings/`
- **THEN** a new candidate file is created and no promotion is proposed

#### Scenario: Recurrence

- **WHEN** a new lesson matches an existing candidate file
- **THEN** the skill reads the matched file in full, appends a provenance bullet, and proposes promotion citing all provenance bullets

#### Scenario: Index-only match scan

- **WHEN** matching a new lesson against existing learnings
- **THEN** the skill reads only filenames, H1 titles, and `status`, reading a full body only to settle a borderline match

#### Scenario: Lesson already covered by an existing rule

- **WHEN** a recurring candidate's behavior change is already enforced by a rule present in the project
- **THEN** the skill proposes updating the candidate to `status: promoted` pointing at that rule, and does not propose creating a duplicate

### Requirement: Consent-gated routing

Every proposal SHALL be presented for user approval one at a time with
pre-drafted content, at most 3 proposals per retrospective ranked by
impact. Each proposal SHALL include one line of reasoning (why this
destination over the others) and one line stating the consequence of
declining, phrased to match the user's technical background. Approved
proposals route by type: project-shared convention → rule-writing; personal
preference → the agent's native memory; corrected project fact (e.g.
build command, layout) → an entry-file edit shown as a diff before
writing; missing capability → a new file under `.ai/backlog/`; recurring
mistake in an existing skill → update that skill's mistakes section. On
promotion the candidate file's frontmatter SHALL be updated
(`status: promoted`, `promoted_to`, `promoted_on`) — the destination
recorded is whatever the proposal targeted, not necessarily a rule. A
declined proposal leaves the file at `status: candidate`;
`status: dismissed` is set only on explicit user request.

#### Scenario: User declines

- **WHEN** the user rejects a proposal
- **THEN** nothing is written for that proposal and the candidate file keeps `status: candidate`

#### Scenario: Personal preference approved

- **WHEN** an approved finding is a personal preference rather than a project convention
- **THEN** it is saved to the agent's native memory, and the candidate's `promoted_to` records that memory destination

#### Scenario: Corrected project fact

- **WHEN** the evidenced lesson is a wrong project fact the user corrected (e.g. the build command)
- **THEN** the proposal targets the entry file, shows the exact diff, and writes only after approval

#### Scenario: Proposal carries reasoning

- **WHEN** any proposal is presented
- **THEN** it states why its destination fits better than the other routes and what happens if declined

### Requirement: Deletion and merge proposals

Each full retrospective SHALL review existing rules for staleness, overlap, and never-triggered entries, and MAY propose deletions or merges alongside additions.

#### Scenario: Stale rule found

- **WHEN** an existing rule's provenance no longer matches the codebase or it duplicates another rule
- **THEN** the retrospective includes a deletion or merge proposal

### Requirement: No direct rule writes

The skill MUST NOT write rule files itself. Rule writes go through
rule-writing when it is installed; if rule-writing is not installed, the skill
SHALL output the drafted rule text for the user to apply with their own
tooling, MAY mention the rule-writing install option at most once per
retrospective, and MUST NOT repeat the suggestion.

#### Scenario: rule-writing missing

- **WHEN** a rule promotion is approved but rule-writing is not installed
- **THEN** the drafted rule is printed for manual use, with at most one mention of the install option

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

### Requirement: Resolution lifecycle separates promote from cure

retro SHALL treat a lesson's `promoted` status as non-terminal: a promoted
lesson MAY be re-promoted to a different mechanism (e.g. doc → rule → tool)
and its learning file SHALL be kept to track that evolution. A separate
`resolved` status SHALL mark a problem the user confirms is cured (perfectly
solved, no more adjustment needed); reaching `resolved` SHALL delete the
learning file. Provenance is preserved because the destination mechanism
carries a provenance stamp and git retains history.

#### Scenario: Promote keeps the file

- **WHEN** a lesson is promoted to a mechanism
- **THEN** its learning file is kept (not deleted) so re-promotion can be tracked

#### Scenario: Cure deletes the file

- **WHEN** the user confirms a problem is cured
- **THEN** retro marks it resolved and deletes the learning file

### Requirement: Cure detection on recurrence

When retro detects a previously-recorded problem recurring, it SHALL present
the full trail (all provenance across tasks) and ask the user to choose:
(a) cured → mark resolved and delete; (b) harden for next time → promote,
keeping the file; (c) keep observing → leave it unchanged. retro MUST NOT
mark a problem cured automatically.

#### Scenario: Recurrence offers cure

- **WHEN** a recorded problem recurs and the user confirms this fix cured it
- **THEN** retro marks it resolved and deletes the file, not merely promotes it

#### Scenario: Recurrence still open

- **WHEN** a recorded problem recurs but may return
- **THEN** retro promotes (keeps the file) or leaves it observing, per the user

### Requirement: Stage vs fix-now for new lessons

For a new lesson retro SHALL recommend stage (observe) for a one-off with no
stated rule, and fix-now for a recurring problem or one the user states is a
rule; the user decides. Fix-now SHALL promote directly without an observe
period, keeping the learning file (promotion is not cure).

#### Scenario: Fix-now skips observing

- **WHEN** the user chooses fix-now for a new lesson
- **THEN** retro promotes it directly and keeps the file, without waiting for recurrence

### Requirement: Root-cause candidate titles

A candidate's H1 SHALL describe the root cause, not the change made this
task, so that continued fixes to the same underlying problem match across
tasks.

#### Scenario: Continued fix matches by root cause

- **WHEN** a later task fixes the same underlying problem in a different place
- **THEN** retro matches it to the existing root-cause-titled candidate rather than creating a new one

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
