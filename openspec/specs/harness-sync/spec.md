# harness-sync Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

### Requirement: Instruction-surface scope

harness-sync SHALL create or update: the entry file (CLAUDE.md /
AGENTS.md), cross-agent interop glue (e.g. CLAUDE.md `@AGENTS.md` import
when both are present), and the loop directories `.ai/learnings/` and
`.ai/backlog/`, each containing its `README.md` format doc. It SHALL NOT
pre-create the per-rule directory — git cannot track an empty directory,
and rule-writing creates it with the first rule. It MUST NOT create or
modify execution settings (settings.json, hooks, MCP configuration).

#### Scenario: Full greenfield init

- **WHEN** harness-sync runs on a project with no AI setup
- **THEN** after the run the entry file and both loop directories with
  READMEs exist, no rules directory was pre-created, and no
  settings/hooks/MCP files were created

### Requirement: Wrap native discovery, near-empty baseline

For codebase-convention discovery harness-sync SHALL use the agent's native `/init` capability where available rather than re-implementing scanning. The installed baseline SHALL contain only structure, interop glue, and harness conventions — no generic opinionated coding rules.

#### Scenario: Baseline content

- **WHEN** harness-sync completes on a fresh project without user-specific input
- **THEN** no rule restating generic best practices (e.g. "write clean code") exists in the output

### Requirement: Idempotent, marker-managed, diff-first writes

Re-running harness-sync SHALL produce zero diff when the project's managed
surface matches the current templates. When the skill's templates
have changed since the project was initialized, a re-run SHALL propose
converging exactly the managed surface — the marker-delimited harness
block and the loop-directory READMEs harness-sync created — to the current
templates, as diffs. In the entry file, content harness-sync owns lives in
marker-delimited sections. User-authored content outside the managed
surface MUST never be modified. Before any write, harness-sync SHALL present the plan
in the conversation — the complete content of every file to be created
and a diff for every pre-existing file to be modified — and obtain
approval; it MUST NOT ask for approval of content the user has not been
shown.

#### Scenario: Second run

- **WHEN** harness-sync runs twice consecutively with the same skill version
- **THEN** the second run changes nothing

#### Scenario: User content preserved

- **WHEN** the entry file contains hand-written sections outside the
  managed markers
- **THEN** those sections are byte-identical after harness-sync runs

#### Scenario: Outdated managed block converges

- **WHEN** the entry file's harness block differs from the current
  template
- **THEN** harness-sync proposes a diff updating only the content between the
  markers, and after approval everything outside the markers is
  byte-identical

#### Scenario: Approval shows the content

- **WHEN** harness-sync is ready to create new files
- **THEN** the full content of each new file appears in the conversation
  before the approval question is asked

### Requirement: Framework coexistence

When spec-kit (`.specify/`), Agent OS (`agent-os/`), or Kiro (`.kiro/steering/`) artifacts are detected, harness-sync SHALL NOT generate content duplicating theirs; it SHALL add a one-line reference to the existing framework in the entry file and install only the harness loop pieces they lack.

#### Scenario: spec-kit present

- **WHEN** `.specify/` exists in the project
- **THEN** harness-sync references the constitution instead of generating principle rules, and still creates `.ai/` loop files

### Requirement: Onboarding block installation

harness-sync SHALL write the team onboarding block defined in harness-conventions into the entry file.

#### Scenario: Block present after init

- **WHEN** harness-sync completes
- **THEN** the entry file contains the ≤ 3-line managed harness block with the install command
