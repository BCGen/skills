# Tasks: retro-entry-fact-only

## 1. Bound the entry-file write

- [x] 1.1 `skills/retro/SKILL.md` Step 4 "Approved fact": state the edit
  carries only the lesson content; retro never adds/syncs the harness block
  or harness-sync-managed content; a block-less entry file is left as-is; a
  missing entry file may be created containing only the fact
- [x] 1.2 Keep the SKILL body within the 100-line budget

## 2. Verify and wrap up

- [x] 2.1 Acceptance via fresh-context subagent: a corrected-fact lesson in a
  project whose entry file has no harness block (and one with no entry file)
  → retro writes only the fact, adds no harness block
- [x] 2.2 `pnpm lint` green; `openspec validate --strict` green
- [x] 2.3 Archive change, sync develop and push per the publishing rule
