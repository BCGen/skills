# Proposal: shared-mechanism-routing

## Why

codify and retro (and the future consistency-checking) all make the same
core decision — given a convention or lesson, which mechanism should carry
it (rule / config / project doc / tool / pointer / upgrade). Today that
logic lives only in codify's `routing.md`; retro has a thinner ad-hoc
version. Users lean heavily on retro day-to-day and rarely re-run codify,
so retro's routing quality must equal codify's, not be a simplified fork.
The fix is one canonical routing logic shared byte-identical across the
skills, mechanically checked so it cannot drift.

This change also folds in a capability decided in the same interview:
codify should not only route a convention to its current-best mechanism but,
for a convention that already has evidence (documented / consistent in code
/ user-stated), evaluate "current carrier vs best available mechanism" and
PROPOSE upgrading (e.g. a doc-enforced convention that a linter could
enforce better) for discussion. This serves both senior and non-senior
users and stays on the north star (help the project enforce its OWN
conventions better) — it is NOT unsolicited best-practice pitching, because
it is bounded to conventions with existing evidence. There is no separate
"hardening" skill; this ability lives in codify.

## What Changes

- Extract the shared "mechanism routing" core (routing table, output
  boundary, judgment doc-first/rule-last, reconciliation, conflict handling,
  and the evidence-bounded upgrade-proposal logic) into a single canonical
  `routing.md`.
- Ship a **byte-identical** copy in each consuming skill:
  `skills/codify/references/routing.md`,
  `skills/retro/references/routing.md`, and (when built)
  `skills/consistency-checking/references/routing.md`. Independent install
  keeps each self-contained; no cross-skill file reference.
- Add a repo lint check that the copies are byte-identical (drift → CI
  fail). A source + sync step keeps them in step.
- Move skill-specific logic OUT of the shared file into each SKILL.md body:
  codify's full-project scan / commit dimension / project-layer scope;
  retro's learn-from-errors / memory / backlog / skill-update routes;
  consistency-checking's drift detection.
- **BREAKING** (behavior): retro gains full routing parity — it applies the
  canonical routing (including evidence-bounded tool upgrade), not a
  simplified subset. The three skills stay parallel entry points (different
  triggers, different evidence sources); none invokes another.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `codify`: add the evidence-bounded upgrade-proposal ability; adopt the
  shared canonical routing (routing core deduplicated out of its bespoke
  reference).
- `retro`: adopt the shared canonical routing at full parity (not a
  simplified fork); keep its error-learning-specific routes.
- `repo-quality-checks`: add the byte-identical routing-copy check.

## Non-goals

- No separate hardening skill (ability folded into codify).
- No cross-skill runtime invocation (parallel entry points; byte-identical
  copies, not calls).
- consistency-checking itself is still backlog; this change only reserves
  its routing copy slot.
- codify stays descriptive; the upgrade proposal is bounded to conventions
  that already have evidence — no unsolicited best-practice pitching.

## Impact

`skills/codify/`, `skills/retro/` (both shipped — this is an architecture
change to installed skills), the repo lint, and a source/sync mechanism for
the shared file. Living specs for codify, retro, repo-quality-checks.
