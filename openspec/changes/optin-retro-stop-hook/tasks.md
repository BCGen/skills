# Tasks: optin-retro-stop-hook

## 1. Verify the facts

- [x] 1.1 Confirm the Stop hook mechanics against current Claude Code
      docs: settings.json structure, stdin fields (`stop_hook_active`),
      block/continue output contract, team-shared settings file
      (verified at code.claude.com/docs 2026-07-06; snippet also
      simulated locally for both flag states)

## 2. Implement

- [x] 2.1 init-playbook.md: new "Opt-in retro Stop hook" section — the
      verified snippet, the ask (yes recommended; non-interactive →
      skip), diff-first surgical JSON merge, idempotency, Claude Code
      target only
- [x] 2.2 ai-init SKILL.md: scope line gains the single named exception;
      Step 4 plan gains the consent question; refusal table row nuanced;
      body stays ≤ 100 lines
- [x] 2.3 README: paste-ready snippet for the manual path (decliners /
      non-ai-init users)
- [x] 2.4 tests/ai-init/README.md: default/declined scenarios keep
      `test ! -e .claude/settings.json`; new opt-in scenario checks hook
      present, pre-existing settings keys byte-preserved, second run
      zero-diff
- [x] 2.5 Remove `.ai/backlog/retro-stop-hook-pointer.md` (absorbed)

## 3. Verify and wrap up

- [x] 3.1 Blind acceptance runs: opt-in accept (hook + preservation +
      idempotency) and decline (no settings) scenarios
- [x] 3.2 Adversarial review of the diff; `pnpm lint`;
      `openspec validate optin-retro-stop-hook`; user review
- [ ] 3.3 Archive keeping the delta; sync develop and push
