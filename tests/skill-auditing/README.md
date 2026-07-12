# Acceptance tests: skill-auditing

Audit a fixture directory of three skills — one clean, one format-stale,
one content-stale — and verify per-layer findings.

## Fixture

- `clean-one`: conventions-compliant, no external claims.
- `format-stale`: `name` != directory, description lacks "Use when ...".
- `content-stale`: asserts a factually wrong command (e.g. a bogus
  `npx create-next-app@1` "current" claim).

## Mechanical checks (on the audit report)

```sh
grep -icE 'format layer|content layer' report.md   # two layers labeled (== 2)
grep -c 'clean-one' report.md                       # clean skill named as clean
grep -c 'create-next-app@latest' report.md          # correct current command cited
grep -icE 'nextjs.org|installation|docs' report.md  # source cited for outdated finding
```

- format layer flags `format-stale`'s two violations
- content layer classifies the bogus command as outdated with a doc source
- `clean-one` has zero findings on both layers
- unconfirmable claims are listed as unverifiable, not guessed

Not mechanically verifiable: completeness of the factual-claim extraction
(human review).

## Scenario: no-op layer

Preseed a skill directory with three skills: one whose rules each name the failure
they prevent, one carrying generic writing advice with no provenance, and one whose
body restates a reference it tells the agent to read on the same line.

- the report has a third section for no-ops, separate from format and content
- the rule with provenance is kept, and the report says why
- the rule with no provenance is reported as a **candidate**, with reasoning — not as
  a defect, and not deleted
- the restated passage is reported as a no-op without further evidence
- nothing is edited without consent; an approved fix is applied in place
