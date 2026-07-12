# OpenSpec delta must match change intent before archiving

Before `openspec archive`, match the change's `specs/` delta to its intent.
A name-only rename ships NO delta folder (a placeholder delta fails
validation). An ADDED/MODIFIED/REMOVED change MUST keep its delta through
archive — deleting it drops those capabilities from `openspec/specs/`.
The delta must also be COMPLETE: when the implementation changes behavior
a still-live requirement specifies, that requirement needs a MODIFIED
entry — an ADDED-only delta archives into a self-contradicting spec.

Removing an ENTIRE capability is the one case with no delta: OpenSpec
rebuilds the spec from the delta and rejects an empty one (`Spec must have
at least one requirement`), so archive aborts. Delete
`openspec/specs/<cap>/` outright, ship NO delta folder for it, and preserve
the per-requirement reasons and migrations in the change's design.md — the
record is the point, and a REMOVED delta cannot carry it here.

After `openspec archive`, the regenerated `openspec/specs/*/spec.md` fails
markdownlint (the CLI collapses the blank lines around `## Requirements` and
`### Requirement`, and leaves a trailing blank). Run `pnpm lint:fix` to
normalize it, then commit — do not hand-edit the spacing each time.

<!-- provenance: 2026-07-08 · task: retro-entry-fact-only · evidence: openspec archive produced markdownlint-failing spec spacing three times in one session, hand-fixed with perl each time until routed to `pnpm lint:fix` · via: retro -->
<!-- provenance: 2026-07-05 · task: add-skill-toolchain · evidence: over-generalized the name-only "no delta" rule and deleted an ADDED delta, losing three capabilities from living specs until git recovery; the name-only case had earlier failed archive twice with a placeholder delta · via: rule-writing -->
<!-- provenance: 2026-07-06 · task: reposition-catalog · evidence: ADDED-only delta while the implementation contradicted two unmodified SHALLs; adversarial review caught the would-be self-contradicting spec pre-archive · via: retro -->
<!-- provenance: 2026-07-12 · task: restructure-skill-writing-to-three-gates · evidence: a full-capability REMOVED delta (skill-testing) aborted archive twice — OpenSpec rebuilds the spec from the delta and rejects a zero-requirement result · via: manual -->
