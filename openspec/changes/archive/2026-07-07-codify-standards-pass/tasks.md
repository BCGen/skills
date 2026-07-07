# Tasks: codify-standards-pass

## 1. Implement

- [x] 1.1 SKILL.md Step 1: boilerplate/contradicting docs lose authority
      standing and become findings
- [x] 1.2 SKILL.md Step 2 "Already placed": carrier checked against
      current standards; shortfall → consent-gated upgrade proposal
- [x] 1.3 shared/routing.md reconciliation: respect governs placement,
      not carrier quality; `pnpm sync-routing`
- [x] 1.4 New fixture `tests/fixtures/codify-standards/` (boilerplate
      README, tool-dialect conventions doc, plain entry-file pointer) +
      scenario in tests/codify/README.md (zero-approval run: proposals
      only, nothing written)
- [x] 1.5 checkup backlog: scope note (enforcement health stays; carrier
      upgrades moved into codify)

## 2. Verify and wrap up

- [x] 2.1 Blind zero-approval run on the fixture: README flagged, doc
      upgrade proposed, `@import` upgrade proposed, working tree clean
- [x] 2.2 Adversarial review (delta completeness vs living spec; no
      contradiction with "README.md is not a default conventions
      target"); `pnpm lint`; `openspec validate codify-standards-pass`
- [x] 2.3 Archive keeping the delta; publish on the user's go-ahead
