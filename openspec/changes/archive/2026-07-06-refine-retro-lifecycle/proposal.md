# Proposal: refine-retro-lifecycle

## Why

retro today stages every lesson and keeps promoted files forever, so
`.ai/learnings/` grows without bound, and it conflates two different things:
promoting a lesson (fixing it via some mechanism, which may still change or
be re-promoted a better way) versus curing it (the problem is perfectly
solved and needs no more adjustment). Users also want to skip the observe
step for a lesson they already know should be fixed now, and to clear cured
problems. This change adds a resolution lifecycle: choose stage-vs-fix-now,
track a promoted lesson across re-promotions, and cure + delete when the
user confirms a problem is done.

## What Changes

- **New `resolved` status** and a lifecycle: `candidate` (observing) →
  `promoted` (fixed, still tracked across re-promotions / mechanism upgrades)
  → `resolved` (cured; deleted). `dismissed` stays as-is.
- **Cure detection rides on recurrence**: when retro detects a
  previously-recorded problem recurring, it shows the full trail (all
  provenance) and asks the user: (a) cured → mark resolved and delete the
  file; (b) harden for next time → promote (kept); (c) keep observing →
  leave it.
- **Cure = delete** the learning file (provenance already lives in the
  destination mechanism's stamp; git keeps history). Only `resolved` is
  deleted; `promoted` is retained to track evolution.
- **Stage vs fix-now** for a new lesson: retro recommends by evidence
  (one-off / no stated rule → stage; recurring / user says it's a rule →
  fix now) and the user decides. Fix-now promotes directly (no observe
  period), file still kept.
- **Root-cause titles**: a candidate's H1 must describe the root cause
  (e.g. "API dates need UTC conversion"), not the change made this task, so
  continued fixes to the same underlying problem match across tasks.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `retro`: staging gains a stage-vs-fix-now choice; proposals gain the
  recurrence cure/harden/observe branch; a new `resolved` status deletes the
  file; candidate titles must be root-cause level.

## Non-goals

- No automatic cure judgement — cure ("no more adjustment needed") is a
  prediction the user confirms; retro only detects the trail and asks.
- No systematic full sweep of all promoted files — that stays checkup's job
  (backlog); retro handles cure opportunistically on recurrence.
- No change to signal detection, the shared routing, or reconciliation.

## Impact

`skills/retro/SKILL.md` (Steps 2–4) and `references/loop-file-formats.md`
(status set, root-cause titles, delete-on-resolved). retro living spec.
