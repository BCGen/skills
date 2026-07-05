# Proposal: add-skill-toolchain

## Why

The collection can maintain rules and lessons but not its own medium:
creating a skill relies on a personal Chinese-body skill outside the repo,
acceptance testing relies on the same, and nothing checks shipped skills
for outdated format or dead instructions. Phase 2 adds the toolchain that
lets the collection build, verify, and audit skills to its own standard —
and unblocks migrating the remaining personal skills.

## What Changes

- Add `skills/skill-testing/` — regression/acceptance testing for any
  skill: minimal-prompt subagent execution strictly separated from
  mechanical verification (grep/regex/diff), with the sandbox patterns
  proven in Phase 1 (preseeds, git-based zero-diff idempotency proof).
  Rewrite of the author's local `skill-test`.
- Add `skills/skill-writing/` — authoring a new skill to this collection's
  standard: gather → draft → review flow with the conventions baked in
  (frontmatter shape, "Use when" description as storefront, ≤100-line
  body, references split, English-only, no-vendoring, naming philosophy
  with collision check), and scaffolding an acceptance test plan handed to
  skill-testing.
- Add `skills/skill-auditing/` — audit any skills directory on two layers:
  format (against the current authoring spec) and content facts (commands,
  APIs, versions still correct — verified against live docs), reporting
  per-layer findings.
- Toolchain cross-references follow the harness pattern: prefer the
  sibling skill when installed, degrade gracefully when absent. The
  zero-awareness principle continues to bind generic skills only.

## Capabilities

### New Capabilities

- `skill-writing`: convention-complete skill authoring with test scaffold.
- `skill-testing`: execution/verification-separated skill acceptance.
- `skill-auditing`: two-layer staleness audit of any skills directory.

### Modified Capabilities

(none)

## Non-goals

- No personal-skills migration yet (next phase, using this toolchain).
- No publication tasks (develop → main merges after Phase 2, per user).
- No changes to the harness trio.

## Impact

New directories `skills/skill-{writing,testing,auditing}/`,
`tests/skill-{writing,testing,auditing}/`; backlog entries
skill-creator / skill-test-rewrite / staleness-checker retired on
completion.
