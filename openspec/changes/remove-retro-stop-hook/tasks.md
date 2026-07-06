# Tasks: remove-retro-stop-hook

## 1. Remove

- [x] 1.1 ai-init SKILL.md: scope line, Step 4 bullet, and refusal table
      row revert to the unconditional boundary
- [x] 1.2 init-playbook.md: delete the "Opt-in retro Stop hook" section;
      restore the original "Out of scope — never touch" wording
- [x] 1.3 README.md: remove the hook snippet paragraph and rendering
      notes from the learning loop section
- [x] 1.4 tests/ai-init/README.md: drop the opt-in scenario and the
      prompt-template hook exception; restore the all-fixtures settings
      check comments

## 2. Verify and wrap up

- [x] 2.1 `pnpm lint`; `openspec validate remove-retro-stop-hook`;
      grep for leftover hook references (stop_hook_active, retro
      checkpoint, Stop hook) outside the archive
- [ ] 2.2 Archive keeping the delta; sync develop and push
