# Tasks: show-before-approve

## 1. Implement

- [x] 1.1 SKILL.md Step 4: print full new-file content + diffs for
      modified files before asking; never ask approval for unshown
      content; heading loses the diff-only framing; body stays ≤ 100
      lines
- [x] 1.2 tests/ai-init/README.md: prompt template gains the "Plan as
      presented" report section; presentation check scoped to that
      section (awk + grep) so an after-write echo cannot pass
- [x] 1.3 init-playbook.md idempotency step 4: same fix (full content
      for created files, diff for changed files)

## 2. Verify and wrap up

- [x] 2.1 Blind acceptance run on a greenfield sandbox: the presented
      plan carried each new file's full content before the approval
      question
- [x] 2.2 Adversarial review of the diff (4 findings, all fixed:
      playbook lag, template gap, unscoped grep, diff-only heading);
      `pnpm lint`; `openspec validate show-before-approve`
- [x] 2.3 Stage + promote the lesson (`show-content-before-approval`);
      archive keeping the delta; sync develop and main
