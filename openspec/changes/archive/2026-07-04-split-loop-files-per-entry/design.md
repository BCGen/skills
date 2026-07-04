# Design: split-loop-files-per-entry

## Context

Single-file loop state conflicts on merge (append-at-EOF, marker rewrites vs
provenance appends). The changesets project proved one-item-one-file makes
concurrent additions conflict-free by construction. Decided in a planning
interview 2026-07-05.

## Goals / Non-Goals

**Goals:** conflict-free concurrent staging; mechanical status checks;
zero-migration cutover before adoption.
**Non-Goals:** see proposal.

## Decisions

### D1. One file per lesson/idea under `.ai/learnings/` and `.ai/backlog/`
New entries = new files → no merge conflicts. Same-lesson concurrent writes
collide on the same path, which is the one conflict worth surfacing.
*Rejected*: `merge=union` (silently corrupts frontmatter/marker rewrites);
single file + tolerated conflicts (daily team friction).

### D2. Frontmatter status over heading markers
`status: candidate|promoted|dismissed`, `promoted_to`, `promoted_on`.
Greppable, testable, consistent with skill-frontmatter conventions.
`promoted_to` is destination-agnostic (rule path, `memory`, `skill:<name>`)
— per user correction, promotion routes to the fittest destination, not
rules only.

### D3. Kebab-case content slugs as filenames
Filename doubles as the first index for recurrence matching and stays
human-readable. *Rejected*: random names (changesets-style) — unreadable,
forces opening every file; date prefixes — breaks same-lesson matching.

### D4. Per-directory README.md
Serves as format documentation at point of use and keeps the directory
git-tracked. Created by ai-init; templates live in loop-file-formats.md.

## Risks / Trade-offs

- [Slug divergence: two authors word the same lesson differently → two files]
  → retrospective's matching step must scan existing filenames AND titles
  before creating a new file; merging duplicates is a retrospective proposal
  type (counts toward the max 3).
- [Directory less skimmable than one file] → README per directory; `ls` is
  the index.

## Migration Plan

Update references/SKILL.md texts → migrate this repo's `.ai/` → re-run
affected acceptance scenarios → push develop per publishing rule.
