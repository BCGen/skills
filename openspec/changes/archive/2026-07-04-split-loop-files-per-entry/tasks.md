# Tasks: split-loop-files-per-entry

## 1. Skill content updates

- [x] 1.1 Rewrite `skills/task-retrospective/references/loop-file-formats.md` for the directory layout, per-file frontmatter, README templates, and slug matching
- [x] 1.2 Update `skills/task-retrospective/SKILL.md` Steps 2 and 4 (per-file staging, frontmatter transitions, destination-agnostic promoted_to, duplicate-merge proposal type)
- [x] 1.3 Update `skills/ai-init/references/init-playbook.md` (loop directories + READMEs, harness block wording `.ai/learnings/`) and SKILL.md Step 4

## 2. Repo migration and tests

- [x] 2.1 Migrate this repo's `.ai/learnings.md` and `.ai/backlog.md` to the new directories (preserve statuses and provenance) and update `CLAUDE.md` harness block
- [x] 2.2 Update acceptance test READMEs and preseed assets; re-run affected task-retrospective scenarios (correction, recurrence-approve, recurrence-decline) and one ai-init fixture; verify mechanically — all passed; found and fixed a fallback defect (premature `status: promoted` without destination write), retested
- [ ] 2.3 Lint, commit, sync develop and push per the publishing rule
