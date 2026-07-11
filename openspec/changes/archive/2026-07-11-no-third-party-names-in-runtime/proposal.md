# Proposal: no-third-party-names-in-runtime

## Why

`references/dry-run.md` names a specific third-party skill in an example of how to
offer a control. It was written as a convenience and it is a dependency we did not
mean to take: it steers every dry run toward that one skill even where a better
control is installed, it rots silently when that skill is renamed or abandoned, and
for a user who does not have it the sentence is noise about software they have never
heard of.

This is the failure we criticised in another authoring skill — reaching into the
user's session to promote a product we do not control — arriving through the back
door as an example.

## What Changes

- **A skill's runtime text names no third-party skill.** Examples are written against
  a placeholder, and the concrete name comes from what the audit of installed skills
  actually found.
- The rule is recorded in the conventions, so it binds every skill this package
  authors, not only the one that broke it.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: its conventions forbid naming a third-party skill in runtime text;
  the dry-run reference's example is written against a placeholder.

## Non-goals

- **No ban on referring to a sibling in this package.** The toolchain-awareness rule
  already governs that, with a graceful fallback when the sibling is absent.
- **No ban on discovering an installed skill at runtime.** Reading the descriptions of
  what is installed and naming what it finds is exactly what the duplicate check and
  the control selection are for. The prohibition is on shipping the name.
- **No change to documentation.** README and design records may discuss any skill by
  name; they are read by people, not loaded into an agent's context.

## Impact

- `skills/skill-writing/references/dry-run.md` — the example loses the hard-coded name.
- `skills/skill-writing/references/conventions.md` — the rule, with the failure that
  bought it.
