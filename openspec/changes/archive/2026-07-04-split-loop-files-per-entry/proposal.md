# Proposal: split-loop-files-per-entry

## Why

The loop files (`.ai/learnings.md`, `.ai/backlog.md`) are single append-heavy files. In team use, every retrospective appends at end-of-file, so two branches merging both produce classic adjacent-line conflicts (the CHANGELOG.md failure mode); promotion marker rewrites collide with concurrent provenance appends. Fixing this now costs zero migration — the format shipped to `develop` days ago with no external users.

## What Changes

- **BREAKING** (format, pre-adoption): `.ai/learnings.md` → `.ai/learnings/<slug>.md`, one lesson per file (changesets pattern: new lessons create new files and never conflict; same-lesson concurrent edits become semantically meaningful same-file conflicts).
- **BREAKING** (format): `.ai/backlog.md` → `.ai/backlog/<slug>.md`, same pattern.
- Per-file format: YAML frontmatter (`status: candidate|promoted|dismissed`, `promoted_to`, `promoted_on`) replaces heading markers; the H1 states the lesson; provenance stays as dated bullets. `promoted_to` records whatever destination fit best (rule path, memory, skill update) — promotion is not rule-only.
- Each directory carries a `README.md` (format doc + git tracking placeholder), created by ai-init.
- Filenames are kebab-case slugs of the lesson/idea content (recurrence matching reads filenames first).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `harness-conventions`: Loop files requirement rewritten for the directory layout and per-file frontmatter format.
- `task-retrospective`: Two-stage promotion and routing requirements updated to per-file staging and frontmatter status transitions.
- `ai-init`: Instruction-surface scope updated to create the loop directories with READMEs.

## Non-goals

- No `merge=union` gitattributes (corrupts marker/frontmatter rewrites).
- No index file over the directories (the directory listing is the index).
- No openspec/ detection in ai-init and no openspec-vs-.ai boundary documentation (user decided current separation needs no special handling).
- No changes to rules, budgets, or any other Phase 1 behavior.

## Impact

- `skills/task-retrospective/` (SKILL.md Step 2/4 + references/loop-file-formats.md), `skills/ai-init/` (SKILL.md Step 4 + playbook), entry-file harness block wording (`.ai/learnings/`), this repo's own `.ai/` content migration, acceptance test seeds/checks re-run.
