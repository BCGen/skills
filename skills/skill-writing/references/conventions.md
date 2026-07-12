# Authoring conventions

The source of truth skill-writing enforces and skill-auditing's format layer checks
against — the same standard in a package, a project, or a personal setup. Rules marked
_(platform)_ are the Agent Skills platform's own; see Sources.

## The absolute rules

No reason is written for these: you never weigh whether to comply, so a reason would spend
context and teach nothing.

Where a validator exists, RUN it rather than check by eye (`pnpm lint` here; `skills-ref
validate <dir>` where Python is available). Neither is guaranteed, so these still stand alone.

```yaml
---
name: <kebab-case, equals the directory name>
description: <capability sentence>. Use when <trigger conditions>.
---
```

- Frontmatter keys, and no others _(platform)_: `name`, `description`, `license`,
  `allowed-tools`, `metadata`, `compatibility`. `disable-model-invocation` is Claude Code's
  — write it only at a Claude Code destination.
- `name` = directory name; ≤ 64 chars; lowercase, digits, single interior hyphens; never
  `anthropic` or `claude` _(platform)_.
- `description` ≤ 1024 chars, third person, no angle brackets, a capability sentence plus a
  "Use when ..." sentence _(platform)_.
- Body ≤ 100 lines, and within the total instruction budget.
- References one level below SKILL.md _(platform)_; past 100 lines a reference carries a
  table of contents _(platform)_.
- Every step ends on a criterion that can be checked.
- Forward slashes _(platform)_. Nothing time-sensitive _(platform)_. One term per concept
  _(platform)_. One default and one escape hatch, not a menu _(platform)_. Say what to do;
  a prohibition is a last resort, paired with the positive alternative.
- Say whether a file is RUN or READ _(platform)_.
- Consent uses the platform's option prompt where it has one (Claude Code:
  AskUserQuestion).

## The judgments

A reason is only worth its tokens where you are deciding something.

**Triggers go WIDE** _(platform)_ — the description is the whole storefront and the only
thing seen when deciding to invoke. Cover the words a user actually says, in the language
they say them.

**Choose the invocation mode.** A model-invoked description sits in context every turn, from
a budget shared by every installed skill. Reachable by the agent or a sibling → model-invoked.
Only ever by hand → `disable-model-invocation: true`, and it costs nothing.

**Write in the destination's language.** Infer it from the destination's docs, rules, and
comments; ask once when the evidence is absent or contradictory. English is a default only
when nothing indicates otherwise — imposing it on a team that writes otherwise is the tool
overriding the project. (This package is English-only; that is a rule of this destination,
not of authoring.)

**A skill whose wrong answer is legal, financial, or destructive** states its sources, may
report that it does not know, and returns the judgment to a human. A confident wrong answer
is the failure mode, and confidence is the default.

**Scripts encode determinism, never judgment** — parsing, counting, mechanical transforms. A
script solves the errors it can foresee rather than handing them back _(platform)_, and
carries no unexplained constants _(platform)_: if you cannot say why the timeout is 47,
neither can the model.

**Write only what changes behavior** _(platform)_. A line the model would follow anyway
spends context, teaches nothing, and blunts the lines that do. The only reliable test is to
remove it and re-run — see [dry-run.md](dry-run.md).

**Absorb ideas; author all text.** Never copy another skill's wording; never vendor one in as
ours. Citing a platform rule is not vendoring.

**Name no skill this package does not maintain** in a body or reference. A shipped name biases
a choice that should follow evidence and rots when that skill is renamed. Use a placeholder; a
concrete name comes only from reading what is installed. Siblings here (skill-writing,
skill-auditing) may be named with a graceful fallback; a generic skill names none.

## Sources

- <https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices>
- <https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview>
- <https://code.claude.com/docs/en/skills>

None of them says which natural language a skill is written in. When the platform's guidance
moves, these rules move with it.
