# skill-testing Specification

## Purpose

Acceptance and regression testing for any skill via strict execution/verification separation.

## Requirements

### Requirement: Execution and verification are strictly separated

The skill SHALL run the target skill via a fresh-context subagent whose
prompt contains only the target skill reference, the input, and the output
location — never the target's rules, formats, examples, or expected
results. Verification SHALL use only mechanical operations (grep, regex,
counts, diff, file existence); no subjective judgment of outputs.

#### Scenario: Minimal prompt

- **WHEN** the execution subagent is dispatched
- **THEN** its prompt restates none of the target skill's rules or expected outcomes

#### Scenario: Mechanical verdicts only

- **WHEN** verification runs
- **THEN** every pass/fail is derived from a grep/regex/count/diff check, and rules that cannot be checked mechanically are listed as not-verified

### Requirement: Checks derive from the target's own documentation

Verification rules SHALL be extracted from the target skill's SKILL.md and
its transitively referenced files — not from the tester's memory or the
user's prompt. Each check records the source rule, the command, and its
coverage (full, partial, or unverifiable).

#### Scenario: Rule extraction

- **WHEN** the target SKILL.md references files in references/
- **THEN** those files are read and their mechanical rules included

### Requirement: Sandbox patterns for stateful skills

For skills that write files, the run SHALL use an isolated sandbox with
declared preseeds; for idempotency claims, a git-based proof (commit after
first pass, zero diff after second); for conversational skills, scenario
transcript files as input.

#### Scenario: Idempotency proof

- **WHEN** the target skill claims re-runs are no-ops
- **THEN** the sandbox is committed after pass one and `git status` emptiness after pass two is the verdict

### Requirement: Three-part report

The report SHALL contain: the execution summary as returned by the
subagent, the mechanical results (pass/fail per check with expected vs
actual), and the list of rules that could not be verified mechanically.

#### Scenario: Failure reporting

- **WHEN** a check fails
- **THEN** the report shows the source rule, expected value, and actual value
