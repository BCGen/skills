# Collection conventions

The single source of truth for the authoring conventions skill-writing
enforces and skill-auditing's format layer checks against — the same
standard wherever a skill lives: a collection, a project, or the user's
personal setup (the lint-enforcement notes below apply only within this
repo's CI).

## Frontmatter

```yaml
---
name: <kebab-case, equals the directory name>
description: <capability sentence>. Use when <trigger conditions>.
---
```

- `name` MUST equal the skill's directory name (lint enforces this).
- `description` ≤ 1024 characters, two parts: first a capability sentence
  (what it does), then a sentence starting "Use when ..." naming the
  trigger conditions. This string is the entire storefront on skills.sh
  and the only thing the agent sees when deciding to invoke — write the
  triggers from real use cases, never invented afterward.
- No CJK anywhere in the file (English-only; lint enforces).

## Body

- ≤ 100 lines. Push detail into `references/*.md` and link to them.
- Numbered steps for a procedure; a short principles/mistakes table where
  it earns its place. Match the voice of existing skills.
- State constraints the steps can't show; don't narrate the obvious.
- Consent moments ask as one structured choice where the platform offers
  option prompts; plain question otherwise.

## Naming philosophy

- Short and apt. Two deliberate styles coexist: **gerund** (`skill-writing`,
  `rule-writing`) for managed-unit tools; **short names** (`retro`) for standalone acts. Pick the family the skill belongs to.
- Collision-check the proposed name on skills.sh before finalizing a
  collection addition: `npx skills find "<name>"` and look for an exact
  `@<name>` match. Report any exact collision with its install count and
  offer alternatives. A skill not being added to a collection skips the
  registry and only avoids names already installed at its destination.

## Scripts

Add a script only for deterministic operations (parsing, counting,
mechanical transforms) — never to encode judgment the model should make.

## Originality

Absorb ideas and design patterns from other projects, but author all
content here. Never copy another skill's text verbatim and never vendor a
third-party skill into `skills/` as ours (see the repo's no-vendoring
rule).

## Toolchain awareness (this collection's skills only)

Skills that belong to a toolchain (the setup/loop trio; the skill trio)
may reference their siblings with a graceful fallback when a sibling is
absent. Generic skills carry zero references to any toolchain.

## Acceptance

Every skill ships with a test plan of scenarios plus mechanical checks
(grep/regex/count/diff), designed alongside the skill — at
`tests/<name>/README.md` in this collection; elsewhere the plan lives
where the destination keeps tests (same default). Verify with
skill-testing.
