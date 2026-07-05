# Proposal: rename-write-rule

## Why

`add-rule` names one of three operations the skill performs (create, edit,
remove) and undersells its defining concept — the spec calls it "the single
write path for rule files", and in systems terminology *write* covers every
mutation. User-raised; collision-checked clean on skills.sh.

## What Changes

- **BREAKING** (rename, pre-adoption): skill `add-rule` → `write-rule`
  (directory, frontmatter, all references, capability spec folder, tests).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `write-rule` (renamed from `add-rule`; living spec folder renamed in
  implementation — requirements unchanged, name-only).

## Non-goals

- No behavior change of any kind.
- No update to already-installed copies in other projects (they refresh on
  their next `skills update`).

## Impact

References in retro (SKILL + living spec), ai-init (SKILL + playbook +
entry-block template), this repo's CLAUDE.md, README, tests README,
rule-format-spec header.
