# OpenSpec delta must match change intent before archiving

Before `openspec archive`, match the change's `specs/` delta to its intent.
A name-only rename ships NO delta folder (a placeholder delta fails
validation). An ADDED/MODIFIED/REMOVED change MUST keep its delta through
archive — deleting it drops those capabilities from `openspec/specs/`.

<!-- provenance: 2026-07-05 · task: add-skill-toolchain · evidence: over-generalized the name-only "no delta" rule and deleted an ADDED delta, losing three capabilities from living specs until git recovery; the name-only case had earlier failed archive twice with a placeholder delta · via: rule-writing -->
