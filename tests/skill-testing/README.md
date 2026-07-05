# Acceptance tests: skill-testing

Run skill-testing against target skills with known outcomes; verify its
report mechanically.

## Scenarios

### 1. satisfiable target (all pass)

Target: a skill with satisfiable mechanical rules (e.g. `greeting.txt` must
contain `HELLO-MARKER`, must not contain `TODO`).

- report shows an all-PASS verdict
- report has all three sections (execution summary, mechanical results,
  not-verified list)
- the execution subagent prompt restated none of the target's rules

### 2. contradictory target (must fail)

Target: a skill whose rules cannot all hold (e.g. "exactly 1 line" AND "must
contain a second line").

- report shows a FAIL verdict
- report surfaces the rule contradiction as the root cause
- semantic-only requirements are listed as not-verified, not guessed

## Mechanical checks

```sh
grep -icE 'pass|fail' report.md           # verdict rendered
grep -icE 'not.{0,3}verified|human' report.md  # not-verified section present
```

Not mechanically verifiable: whether the extracted rule set is complete
(human spot-check).
