# Proposal: codify-standards-pass

## Why

Two gaps surfaced in the same field run. First, artifacts codify itself
had written earlier (a conventions doc in tool dialect, a plain pointer
where a labeled `@import` fits) had to be upgraded by hand — the
reconciliation rule rightly stops re-runs from migrating placed content,
but it was read as forbidding ANY revisit, leaving no upgrade path while
users naturally reach for codify, not a future audit skill. Second, the
project README was an unedited GitLab template and codify scanned right
past it — docs outrank code in the authority order, so a boilerplate doc
can silently "win" over reality with zero project truth in it.

Both fixes ride machinery codify already has: every write is a
consent-gated diff, and the evidence-bounded upgrade clause already
proposes better carriers.

## What Changes

- **Carrier-quality upgrades**: the already-placed check keeps its
  no-migration/no-duplicate rule, but the carrier is evaluated against
  current authoring standards (the shared doc-writing guidance, the
  labeled `@import` form for short load-bearing docs); falling short
  yields a consent-gated upgrade proposal. Includes artifacts codify
  itself wrote earlier.
- **Doc-truth check in the scan**: a doc read as an authority source
  that is unedited template boilerplate, or contradicts verifiable
  reality, loses its authority standing, is flagged as a finding, and
  gets a consent-gated correction proposal.
- Shared routing's reconciliation section clarifies: respect governs
  where a convention lives, not how badly its carrier is written.
- checkup's backlog scope narrows to enforcement health (rule budget
  reclamation, redundancy with hooks/configs, staleness).
- New acceptance fixture exercising both behaviors with zero approvals
  (proposals only, nothing written).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `codify`: evidence-bounded upgrades extend to carrier quality;
  scanned docs are truth-checked before being treated as authoritative.

## Non-goals

- No unsolicited rewriting — every upgrade/correction remains a
  consent-gated proposal; declining leaves everything untouched.
- No README authoring service — correcting a boilerplate/mismatched
  README is doc-truth repair; `README.md` still is not a conventions
  target.
- checkup keeps the enforcement-health audit (not absorbed).

## Impact

`skills/codify/SKILL.md` (Steps 1–2), `shared/routing.md`
(reconciliation clause, synced to both copies), `tests/codify/README.md`
plus the new fixture `tests/fixtures/codify-standards/`, codify living spec
(1 MODIFIED + 1 ADDED requirement), `.ai/backlog/checkup.md`.
