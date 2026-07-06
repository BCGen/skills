# Proposal: drop-empty-rules-dir

## Why

harness-sync pre-creates an empty rules directory (`.claude/rules/` /
`.cursor/rules/`) that git cannot track: it vanishes on a fresh clone,
making cross-clone idempotency leaky (a re-run on a clone re-proposes
it), and it serves nothing — rule-writing creates the directory with the
first rule anyway. Two blind acceptance runs flagged the leak; the user
decided: don't create it.

## What Changes

- harness-sync stops pre-creating the per-rule directory on every
  target; rule-writing remains the sole creator (with the first rule).
- Spec's Instruction-surface scope SHALL drops "per-rule directory
  structure" and states the non-creation explicitly; the greenfield
  scenario asserts no rules directory was pre-created.
- SKILL.md Step 2 inventory and Step 4 plan drop the rules-directory
  item; a one-line rationale replaces it.
- Acceptance tests: `existing-claudemd` expects no `.claude/rules/`
  created; preseeded rules dirs (multi-agent, existing-cursor fixtures)
  stay byte-identical as before.

## Non-goals

- No deletion of existing rules directories in initialized projects —
  convergence never removes user artifacts.
- No change to where rules LIVE (the targets table and the harness block
  line still name the location); only pre-creation is dropped.

## Impact

`skills/harness-sync/SKILL.md`, `references/playbook.md`,
`tests/harness-sync/README.md`, harness-sync living spec (1 MODIFIED
requirement), one promoted learning.
