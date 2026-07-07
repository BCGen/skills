# Proposal: retro-owns-loop-dirs

## Why

harness-sync is optional (a project bootstraps fully without it), yet it
currently co-creates the loop directories `.ai/learnings/` and
`.ai/backlog/`. retro — the collection's core skill — already self-creates
them when missing, so the loop's existence does not depend on harness-sync.
The split ownership makes harness-sync look like a prerequisite it is not,
and leaves loop-README drift-repair straddling two skills. This change gives
retro sole ownership of the loop directories and their READMEs, so the loop
belongs to the skill that actually runs every task, and harness-sync narrows
to the entry file and interop glue.

## What Changes

- **harness-sync stops creating `.ai/`**: it no longer creates
  `.ai/learnings/` or `.ai/backlog/` or their READMEs, and drops them from
  the managed surface it reconciles on re-run. The harness block still names
  them as the loop's destinations (a forward reference).
- **retro owns both loop directories**: it creates each directory and its
  README from the canonical templates in `references/loop-file-formats.md`
  when missing (already true for learnings; now explicit and symmetric for
  backlog).
- **retro inherits loop-README drift-repair, piggybacked**: when retro is
  already writing to a loop directory this run and that README differs from
  the current canonical template, it proposes reconciling it (written
  verbatim from the template). A clean, signal-free task writes nothing to
  `.ai/` and stays a no-op — the drift check never runs on it.
- **No script**: drift-repair runs in the user's project across arbitrary
  agents where no runtime can be assumed, so it uses the agent's native file
  tools, not a shipped executable.
- **harness-sync description/positioning corrected (no rename)**: the skill
  keeps its name, but its `description` and README framing stop listing the
  learning-loop files (now false) and state plainly that it wires retro in,
  is the optional day-0 setup, and that retro owns the loop. The
  convergence/re-sync meaning in the name is preserved.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `harness-sync`: instruction-surface scope, idempotency managed surface,
  and framework-coexistence no longer include the `.ai/` loop directories.
- `retro`: gains explicit ownership of loop-directory creation and
  piggybacked loop-README drift-repair.

## Non-goals

- No change to what the loop directories contain, the canonical README
  templates, or the harness block's reference to `.ai/`.
- No shipped script or runtime dependency — writes stay agent-native.
- No systematic sweep of `.ai/backlog/` — that remains checkup's future
  territory; retro owns backlog only as its current sole writer.
- No day-0 skeleton: a freshly harness-synced project has no `.ai/` until
  retro's first write. This is accepted.

## Impact

- `openspec/specs/harness-sync/spec.md`: MODIFIED instruction-surface scope,
  idempotency, framework coexistence.
- `openspec/specs/retro/spec.md`: ADDED loop-directory ownership +
  README reconciliation.
- `skills/harness-sync/SKILL.md` (Steps 2, 4, 6) and
  `references/playbook.md` (Loop directories section).
- `skills/retro/SKILL.md` (Step 2 create + reconcile) and
  `references/loop-file-formats.md` (reconciliation note). Keep the retro
  SKILL body within the 100-line budget.
- `tests/harness-sync/` and `tests/retro/` acceptance scenarios updated.
