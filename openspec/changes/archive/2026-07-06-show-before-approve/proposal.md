# Proposal: show-before-approve

## Why

A field test of ai-init on a fresh project ended with the approval
question "are the three new files approved for writing?" — while no file
content had been displayed at all. The user was asked to approve content
they had never seen. Two gaps line up behind it:

- The living spec's presentation SHALL covers only **pre-existing** files
  ("Before writing to any pre-existing file, ai-init SHALL present a
  diff for approval") — a greenfield init creating only NEW files sits
  entirely outside it.
- SKILL.md Step 4 says "show a diff for every file to be created or
  modified", but "diff" is ambiguous for a new file (nothing to diff
  against), so listing filenames can pass as "showing".

The acceptance tests never exercise this: their prompt pre-approves the
plan, so present-before-ask has no check.

## What Changes

- **SKILL.md Step 4 hardened**: print the complete content of every file
  to be created and a diff for every file to be modified in the
  conversation, then ask; never ask the user to approve content they
  have not seen.
- **Spec SHALL extended** (MODIFIED): the presentation duty covers new
  files' full content, not just pre-existing files' diffs, and forbids
  approval questions about unshown content.
- **Acceptance test gains a presentation check**: the run report must
  show the plan as presented (mechanical proxy: a fenced block containing
  the harness markers appears in the report, not only in the written
  file).
- The lesson is staged and promoted to this skill fix.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `ai-init`: approval presentation covers new-file content; approval
  questions about unshown content are forbidden.

## Non-goals

- No changes to codify/retro (their Step 4 texts already require showing
  the pre-drafted content/diff with each proposal).
- No change to the consent flow itself — only to what must be visible
  before it.

## Impact

`skills/ai-init/SKILL.md` (Step 4 body and heading);
`skills/ai-init/references/init-playbook.md` (idempotency-algorithm step
4, same ambiguity); ai-init living spec (1 MODIFIED requirement + new
scenario); `tests/ai-init/README.md` (prompt template reports the plan
as presented; section-scoped presentation check); `.ai/learnings/` (one
promoted lesson).
