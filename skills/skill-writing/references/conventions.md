# Authoring conventions

The single source of truth for the conventions skill-writing enforces and
skill-auditing's format layer checks against — the same standard wherever a skill
lives: a package, a project, or the user's personal setup. Rules marked
_(platform)_ are the Agent Skills platform's own published rules, adopted here
rather than invented; see Sources. The lint-enforcement notes apply within this
repo's CI.

## Contents

- [Frontmatter](#frontmatter)
- [Invocation mode](#invocation-mode)
- [Body](#body)
- [References](#references)
- [Language](#language)
- [Writing](#writing)
- [Naming](#naming)
- [High stakes](#high-stakes)
- [Scripts](#scripts)
- [Originality](#originality)
- [Toolchain awareness](#toolchain-awareness-this-packages-skills-only)
- [Sources](#sources)

## Frontmatter

```yaml
---
name: <kebab-case, equals the directory name>
description: <capability sentence>. Use when <trigger conditions>.
---
```

- Only these keys are valid _(platform)_: `name`, `description`, `license`,
  `allowed-tools`, `metadata`, `compatibility`. Any other key is a validation
  error. `disable-model-invocation` is a Claude Code key — write it only when the
  destination is a Claude Code skill directory.
- `name` MUST equal the skill's directory name (lint enforces), stay within 64
  characters of lowercase letters, digits and single interior hyphens, and avoid
  the reserved words `anthropic` and `claude` _(platform)_.
- `description` ≤ 1024 characters, no angle brackets, written in the third person
  _(platform)_ — it is injected into the system prompt, and a first-person
  description confuses the invocation decision. Two parts: a capability sentence
  (what it does), then a sentence starting "Use when ..." naming the triggers.
- Write the triggers WIDE _(platform)_. An agent under-triggers a skill, so cover
  the words a user actually says — in the language they say them — rather than a
  tidy phrasing nobody types. This string is the entire storefront and the only
  thing the agent sees when deciding to invoke.

## Invocation mode

A model-invoked skill's description sits in the agent's context every turn, drawn
from a budget shared by every installed skill. Choose the mode; do not inherit the
default.

- The agent, or a sibling skill, must reach it unaided → keep it model-invoked and
  let the description carry the triggers.
- It only ever fires by hand → `disable-model-invocation: true`. It pays no
  standing cost, and its description becomes a human-facing one-liner.

## Body

- ≤ 100 lines AND within the platform's 5,000-token instruction budget
  _(platform)_ — whichever binds first. A body of few enormous lines still costs
  context; the line cap alone does not bound it.
- Each step ends on a completion criterion that can be checked. A step nobody can
  tell is finished is a step nobody thought through.
- Consent moments ask with the platform's option-prompt tool when it has one
  (Claude Code: AskUserQuestion); a plain question otherwise.

## References

- Push detail into `references/*.md` and link to it. Keep every reference ONE
  level below SKILL.md _(platform)_ — a chain of references makes the agent
  preview a file and act on half of it.
- SKILL.md says WHEN to read each reference. A reference nobody is told to open
  never enters context.
- A reference past 100 lines carries a table of contents _(platform)_.

## Language

A skill is written in the language its destination already uses.

- A project: infer from what the project writes — documentation, existing skills
  and rules, code comments. Ask once, with a recommended answer, when the evidence
  is absent or contradictory.
- A public package: English, because that is what its destination speaks. In this
  repo that is a CI rule — lint rejects CJK anywhere under `skills/**`.
- A personal setup or a private package: the user's call.

English is a default only when nothing indicates otherwise. Imposing it on a team
that writes in another language is the tool overriding the project.

## Writing

- **Say what to do.** A prohibition names the thing it forbids and invites it;
  measured head-to-head, prohibition wording produced more of the unwanted
  behavior than no guidance at all. Keep a prohibition only as a guardrail that
  cannot be phrased positively, and pair it with the positive alternative.
- **One default, one escape hatch** _(platform)_ — not a menu of five libraries to
  choose between.
- **One term per concept** _(platform)_. Synonyms read as new concepts.
- **Nothing time-sensitive** _(platform)_ — "before August 2025, use the old API"
  rots in place.
- **Write only what changes behavior** _(platform)_. A line the model would follow
  anyway spends context and teaches nothing; it also blunts the lines that do teach.
- **A rule records the failure that bought it**, in a clause where the rule lives. A
  rule that can name none was never paid for — do not write it. This is what makes a
  later audit survivable: a rule can be cut safely only by someone who knows why it is
  there, and the memory does not persist while the record does. Without it the outcome
  is not over-cutting but paralysis, and the skill swells until the cap pushes it into
  a reference where it swells unseen.

## Naming

A name needs a shape, so it is settled after the draft, not before. Two names may
be in play and they are different decisions — keep them in different turns, and say
which one a question is deciding.

**The skill's name** is the user's decision — they are the one who will type it. A
lookup reports that a name is free; it does not report that it is right. Order:

1. **Propose** candidates with your reasons, or take the name the user offers.
   Short and apt: **gerund** (`skill-writing`, `rule-writing`) for managed-unit
   tools; **short names** (`retro`) for standalone acts. Pick the family the skill
   belongs to.
2. **Check the machine** — a name already installed at the destination is a clash
   wherever that destination is.
3. **Check the registry**, and only for a skill that will be **published
   publicly**: `npx skills find "<name>"`, looking for an exact `@<name>` match;
   report a collision with its install count. A private package, a project, or a
   personal setup skips a lookup that cannot apply to it.

A failed check returns to 1 with what it found, and any alternative offered has
itself been checked. The user settles the name at every pass.

**The artifact's name** — the file a skill writes — answers to the user's project.
Its name and location are settled with the output-shape question, under the
project's conventions, and never in the same turn as the skill's own name.

## High stakes

A skill whose wrong answer carries legal, financial, or destructive consequence
states its sources, is permitted to report that it does not know, and returns the
judgment to a human rather than asserting. A confident wrong answer is the failure
mode, and confidence is the default.

## Scripts

Add a script only for deterministic operations (parsing, counting, mechanical
transforms) — never to encode judgment the model should make.

- **Solve, don't punt** _(platform)_: the script handles the errors it can foresee
  (a missing file, a permission denial) instead of failing and leaving the model
  to improvise.
- No unexplained constants _(platform)_. If you cannot say why the timeout is 47,
  the model cannot either.
- Forward slashes in every path _(platform)_, on every platform.
- Say whether a file is to be RUN or READ _(platform)_ — "run `analyze.py` to
  extract the fields" and "see `analyze.py` for the algorithm" are different
  instructions.

## Originality

Absorb ideas and design patterns from other projects, but author all content here.
Never copy another skill's text verbatim and never vendor a third-party skill into
`skills/` as ours (see the repo's no-vendoring rule). Adopting a platform rule and
citing it is not vendoring; restate it in our own words.

## Toolchain awareness (this package's skills only)

Skills that belong to a toolchain (the setup/loop trio; the skill trio) may
reference their siblings with a graceful fallback when a sibling is absent.
Generic skills carry zero references to any toolchain.

## Sources

Rules marked _(platform)_ come from the Agent Skills documentation:

- Skill authoring best practices —
  <https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices>
- Agent Skills overview (progressive disclosure, token budgets) —
  <https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview>
- Claude Code skills (frontmatter keys, invocation) —
  <https://code.claude.com/docs/en/skills>

When the platform's guidance moves, these rules move with it — check the source
before assuming a rule here is our preference.
