# Proposal: converge-managed-surface

## Why

ai-init's idempotency is currently a strict no-op: a re-run on an
initialized project must change nothing. That means a project set up
with an older template never receives template improvements — today's
field-test project still carries the old tail-clause harness block, and
the only update path is hand-editing. The marker design exists precisely
to make owned regions safely regenerable; the no-op rule forfeits that
payoff.

## What Changes

- **Idempotency becomes convergence**: a re-run compares the managed
  surface — the marker-delimited harness block and the two loop-directory
  READMEs ai-init created — against the current templates. Drift →
  propose the update as a diff (consent-gated, per the
  present-before-approve rule); up to date → zero diff, as before.
  User-authored content outside the managed surface stays untouchable.
- **SKILL.md / playbook**: Step 2 inventories drifted managed pieces, not
  just missing ones; the playbook's "never regenerate existing content"
  becomes "regenerate only within the managed surface, on drift".
- **Description gains the re-sync trigger** ("re-syncing after the
  skills were updated"); the README storefront row mentions re-running
  after a skills update.
- **Tests gain a convergence scenario**: preseed an outdated harness
  block; expect the block converged in place, outside-markers content
  byte-identical, second run zero diff. The additions-only check is
  exempted inside the marker region for this scenario.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `ai-init`: re-runs converge the managed surface to current templates
  (consent-gated) instead of unconditionally no-oping; same-version
  re-runs remain zero-diff.

## Non-goals

- No version stamps or migration bookkeeping — convergence compares
  against the current template, nothing else.
- No convergence of anything outside the managed surface (rules,
  settings, user prose) — the boundary is unchanged.
- User edits inside the managed surface are not specially detected; the
  diff shows them and consent decides.

## Impact

`skills/ai-init/SKILL.md` (description, Steps 2/4);
`skills/ai-init/references/init-playbook.md` (idempotency algorithm);
`README.md` (ai-init row); `tests/ai-init/README.md` (convergence
scenario); ai-init living spec (1 MODIFIED requirement + new scenario).
