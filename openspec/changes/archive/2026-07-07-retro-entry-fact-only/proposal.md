# Proposal: retro-entry-fact-only

## Why

retro's corrected-fact route writes to the entry file (CLAUDE.md /
AGENTS.md). Today the spec says the proposal "targets the entry file, shows
the exact diff, and writes only after approval" but does not bound WHAT it
may write there. The harness block and everything harness-sync manages are
harness-sync's domain, not retro's. A project that deliberately skipped
harness-sync has an entry file with no harness block (or no entry file at
all); retro must not silently manufacture or "sync in" harness setup while
recording a corrected fact. This makes that boundary explicit so no future
reading of "edit the entry file" over-reaches into installing the harness
block.

## What Changes

- **Entry-file writes carry only the lesson content**: retro's corrected-fact
  edit writes ONLY the fact itself. retro MUST NOT add, sync, or reconcile
  the harness block or any harness-sync-managed content.
- **A block-less entry file is respected**: if the entry file has no harness
  block, retro leaves it without one.
- **Creating an entry file is allowed, but fact-only**: if no entry file
  exists, retro MAY create one containing only the corrected fact — never the
  harness block.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `retro`: the consent-gated corrected-fact route gains an explicit boundary
  — entry-file writes carry only the lesson content, never harness-managed
  content.

## Non-goals

- No change to the corrected-fact route otherwise (still consent-gated,
  diff-first).
- No change to any other route or to harness-sync.

## Impact

- `openspec/specs/retro/spec.md`: MODIFIED "Consent-gated routing"
  (corrected-fact boundary + a new scenario).
- `skills/retro/SKILL.md` Step 4 "Approved fact" line.
