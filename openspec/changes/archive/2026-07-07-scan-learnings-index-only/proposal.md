# Proposal: scan-learnings-index-only

## Why

retro's per-run token cost is dominated by unavoidable semantic work
(reading the conversation for signals, routing a lesson to its mechanism).
The one cost that grows with a project's history is the Step 2 match scan:
as `.ai/learnings/` accumulates lesson files, reading each file's body just
to check for a root-cause match wastes tokens and scales badly. The match
only needs the root cause, which the H1 already carries. Shipping an
executable helper was rejected — it would break the collection's
pure-markdown, zero-runtime, cross-agent invariant for a modest, mostly
fixed saving. This change gets the same saving by prompt-tightening alone.

## What Changes

- **Index-only match scan**: Step 2 scans `.ai/learnings/` as an index —
  filenames, H1 titles, and frontmatter `status`, never file bodies. A
  candidate file's full body is read ONLY to settle a borderline match.
- **Recurrence still reads the matched file in full**: Step 3 reads the
  matched file completely before showing the trail, so the token saving
  never truncates the provenance a cure/harden decision depends on.
- No runtime dependency, no shipped script — markdown-only, so behavior is
  identical across every agent that reads the skill.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `retro`: the two-stage-promotion match scan is now explicitly index-only,
  with a lazy full-body read reserved for borderline matches and the
  recurrence trail.

## Non-goals

- No change to signal detection, shared routing, reconciliation, or the
  lifecycle statuses — only how the match scan reads existing learnings.
- No shipped helper script or shell requirement — the `ls`/`grep` pass is an
  optional optimization where a shell exists, not a dependency.

## Impact

`skills/retro/SKILL.md` (Step 2 scan, Step 3 recurrence read). retro living
spec: MODIFIED "Two-stage promotion". SKILL body stays within the 100-line
budget.
