# Tasks: converge-managed-surface

## 1. Implement

- [x] 1.1 SKILL.md: description gains the re-sync trigger; Step 2
      inventories drifted managed pieces; Step 4 entry-file bullet
      covers in-place block updates; body ≤ 100 lines
- [x] 1.2 init-playbook.md idempotency algorithm: "never regenerate
      existing content" → regenerate only the managed surface, on drift
- [x] 1.3 README.md ai-init row: mention re-running after a skills
      update
- [x] 1.4 tests/ai-init/README.md: convergence scenario (preseeded
      outdated block → converged in place; outside-markers
      byte-identical via marker-stripped cmp; second run zero diff;
      additions-only check exempted inside the marker region)

## 2. Verify and wrap up

- [x] 2.1 Blind acceptance run: sandbox with the old tail-clause block →
      block converged, user prose untouched, pass 2 zero diff
- [x] 2.2 Adversarial review; `pnpm lint`;
      `openspec validate converge-managed-surface`
- [ ] 2.3 Archive keeping the delta; sync develop and main
