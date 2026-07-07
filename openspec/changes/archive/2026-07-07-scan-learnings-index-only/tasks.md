# Tasks: scan-learnings-index-only

## 1. Update the skill

- [x] 1.1 `skills/retro/SKILL.md` Step 2: scan `.ai/learnings/` as an index
  only (filenames, H1 titles, `status`, never bodies); read a full body only
  to settle a borderline match
- [x] 1.2 `skills/retro/SKILL.md` Step 3: read the matched file in full
  before showing the recurrence trail
- [x] 1.3 Keep the SKILL body within the 100-line budget (compressed to fit)

## 2. Verify and wrap up

- [x] 2.1 Acceptance via fresh-context subagents: clean (no signal, no
  `.ai/`), correction (1 candidate, 1 provenance), recurrence-approve
  (matched by index, full body read, 2 provenance bullets, file kept
  candidate) — all pass mechanical checks
- [x] 2.2 Lint (`pnpm lint`) green
- [x] 2.3 Archive change, sync develop and push per the publishing rule
