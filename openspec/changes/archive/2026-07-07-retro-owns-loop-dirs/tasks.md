# Tasks: retro-owns-loop-dirs

## 1. harness-sync — stop owning `.ai/`

- [x] 1.1 `skills/harness-sync/SKILL.md`: drop loop-directory creation from
  the Step 4 plan; Step 2 inventory may still report loop state but not plan
  its creation; Step 6 report points at retro as the loop's owner
- [x] 1.2 `references/playbook.md`: rewrite the "Loop directories" section —
  harness-sync does not create them; retro creates them on first write. Keep
  the harness block's `.ai/` reference
- [x] 1.3 Confirm the harness block text (retro wiring) is unchanged
- [x] 1.4 Correct harness-sync's `description` (drop "learning-loop files";
  state it wires retro in, is optional day-0, retro owns the loop) and the
  README harness-sync row/Usage framing — no rename, keep the handle

## 2. retro — own creation + drift-repair

- [x] 2.1 `skills/retro/SKILL.md` Step 2: create `.ai/learnings/` and
  `.ai/backlog/` + READMEs from the canonical templates when missing; when
  already writing to a loop dir, reconcile a drifted README verbatim to the
  template; never touch READMEs on a clean no-op task. Stay within the
  100-line body budget (offload detail to the reference)
- [x] 2.2 `references/loop-file-formats.md`: note retro owns creation and
  verbatim README reconciliation; reaffirm the templates are canonical here

## 3. Verify and wrap up

- [x] 3.1 Update `tests/harness-sync/` scenarios: greenfield no longer
  creates `.ai/`; re-run reconciles only the harness block
- [x] 3.2 Update `tests/retro/` scenarios: first lesson creates the dir +
  README; drifted README reconciled while writing; clean task leaves
  READMEs untouched
- [x] 3.3 Acceptance via fresh-context subagents for the changed scenarios
- [x] 3.4 `pnpm lint` green; `openspec validate --strict` green
- [x] 3.5 Archive change, sync develop and push per the publishing rule
