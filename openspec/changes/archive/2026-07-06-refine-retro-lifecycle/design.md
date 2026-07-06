# Design: refine-retro-lifecycle

## Context

From the retro follow-up interview (2026-07-06). The user drew a distinction
retro had blurred: **promote ≠ cure**. Promotion fixes a lesson via some
mechanism, but the fix may still be adjusted or re-promoted a better way
(doc → rule → tool). Cure is the terminal state — the problem is perfectly
solved and needs no more adjustment. Two user asks followed: let me skip the
observe step for a lesson I already know should be fixed now, and give me a
way to clear cured problems so `.ai/learnings/` doesn't grow forever.

## Goals / Non-Goals

**Goals:** a lifecycle that separates promote from cure; opportunistic cure
on recurrence with user confirmation; delete on cure. **Non-Goals:** see
proposal.

## Decisions

### D1. Lifecycle with a `resolved` state

`candidate` → `promoted` → `resolved`; `dismissed` separate. `promoted` is
NOT terminal: a lesson can be re-promoted (mechanism upgrade) and the file
is kept to track that evolution. `resolved` is terminal and triggers
deletion. This is the crux of the promote-vs-cure distinction.

### D2. Cure detection rides on recurrence

Cure ("no more adjustment needed") is a prediction retro cannot make
automatically. But recurrence is the natural moment to ask: retro already
detects a recorded problem recurring, so it shows the full trail (all
provenance across tasks) and asks (a) cured → resolved+delete; (b) harden →
promote; (c) keep observing. No separate cure sweep — the recurrence context
(what changed this time, the whole history) is exactly what the user needs
to judge cure. A systematic full sweep of all promoted files is checkup's
job (backlog).

### D3. Cure = delete the file

On `resolved`, delete the learning file. Provenance is not lost: the
destination mechanism (rule/config/doc) carries a provenance stamp, and git
keeps full history. `.ai/learnings/` stays a live worklist (candidate +
promoted-in-flight + dismissed), not an ever-growing archive. Deleting a
promoted file does not break recurrence detection later, because retro's
reconciliation scans rule locations too — a re-occurrence finds the existing
rule and does not rebuild a duplicate.

### D4. Stage vs fix-now, recommended by evidence

For a new lesson retro recommends: one-off / no stated rule → stage
(observe); recurring / user says it's a rule → fix now. The user decides.
Fix-now promotes directly without the observe period; the file is still
created and kept (promote ≠ cure — it's tracked until cured). This corrects
an earlier mis-scoping where "fix now" meant "no file" — that assumed
promote=cure, which the interview overturned.

### D5. Root-cause titles

A candidate's H1 must describe the ROOT CAUSE, not the change made this
task. "API dates need UTC conversion" matches across tasks; "changed the
order page timezone" does not. This is the precondition for recognizing that
several continued fixes are the same underlying problem — without it, the
recurrence/cure flow never triggers because the trail never links up.

## Risks / Trade-offs

- [Losing the "what we solved" history when deleting] → provenance lives in
  the destination mechanism and git; `.ai/learnings/` is a worklist, not an
  archive.
- [User marks cured, problem returns] → reconciliation finds the existing
  rule/config on re-occurrence, so it is handled, not silently rebuilt; the
  user can re-stage if the mechanism itself was wrong.
- [Root-cause titling is a judgement] → retro drafts the title at root-cause
  level and the user can correct it; a mis-titled candidate at worst fails
  to match and is treated as new (safe, not harmful).

## Migration Plan

Update SKILL.md Steps 2–4 and loop-file-formats.md; migrate this repo's own
`.ai/learnings/` (promoted files stay; none are cured yet); acceptance via
skill-testing (recurrence → cure deletes the file; fix-now promotes without
observe; root-cause title matches a continued fix). Publish deferred.
