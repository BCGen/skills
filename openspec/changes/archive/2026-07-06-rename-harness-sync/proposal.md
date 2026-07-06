# Proposal: rename-harness-sync

## Why

ai-init's name stopped covering its job the day re-runs became
convergence: it now sets up the instruction surface AND keeps it synced
to the current templates. "init" describes half of that. The project's
own vocabulary already centers on the harness — the repo is "AI Harness
Skills", the managed markers are `harness:begin/end`, and
`harness-conventions` is a first-class spec — so the skill that creates
and converges that surface is named for it: **harness-sync**. The
original D15 objection to "harness" (users don't search it) has
weakened: users install the collection and read descriptions, and the
plain-language description sits next to the name everywhere it appears,
so no defensive definition line is needed. Collision-checked on
skills.sh: no match at all for `harness-sync`.

## What Changes

Name-only rename, no behavior change, NO specs delta (per the
delta-handling rule): `skills/ai-init/` → `skills/harness-sync/`
(frontmatter, H1; the playbook reference file becomes the neutral
`playbook.md`), `tests/ai-init/` → `tests/harness-sync/`,
`openspec/specs/ai-init/` → `openspec/specs/harness-sync/` (title and
in-text occurrences), plus reference updates: README (table row, Usage,
subset install command), codify's SKILL.md and spec mentions,
rule-format-spec's `via:` enumeration (new stamps say `harness-sync`;
historical stamps stay as written), the naming-family example in
conventions.md, and the `promoted_to` pointer in one learning file
(evidence prose stays historical).

## Non-goals

- No behavior, spec-requirement, or template changes ride along.
- Archived openspec changes are history and keep every `ai-init`
  occurrence.
- Projects that installed `ai-init` keep the old name until they update
  via the skills CLI.

## Impact

`skills/harness-sync/` (renamed dir, SKILL.md, references/playbook.md),
`tests/harness-sync/`, `openspec/specs/harness-sync/`, `README.md`,
`skills/codify/SKILL.md`, `openspec/specs/codify/spec.md`,
`skills/rule-writing/references/rule-format-spec.md`,
`skills/skill-writing/references/conventions.md`,
`.ai/learnings/show-content-before-approval.md` (pointer only).
