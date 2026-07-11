# Skills

Agent skills I actually use, grouped by purpose. Each group is
independent — install a whole group, or just the skills you want.

Skills that only make sense inside my own workflow live in a separate
private repo; everything here works for anyone.

## Install

Everything:

```sh
npx skills@latest add BCGen/skills
```

One group, or a few skills by name:

```sh
npx skills@latest add BCGen/skills -s retro codify
```

Update later:

```sh
npx skills@latest update
```

## Agent harness & skill authoring

Skills that make an agent learn from a project and from its own mistakes,
plus the toolchain for authoring skills themselves. A coherent set —
[read the full story](docs/ai-harness-skills.md).

**In scope:** capturing conventions, routing lessons into durable rules,
writing and testing skills.
**Out of scope:** anything tied to one language, framework, or product.

| Skill | What it does | When to use it |
| --- | --- | --- |
| [harness-sync](skills/harness-sync/SKILL.md) | Sets up and re-syncs the entry-file harness block that wires retro in, plus cross-agent interop glue. | Run at setup to make retro fire reliably and unify agents on one source; re-run after a skills update to re-sync the managed block. Optional — everything also bootstraps without it; retro owns the loop. |
| [codify](skills/codify/SKILL.md) | Captures a project's existing conventions so the agent follows them from the first run. | First on an existing project, before the agent's first real task. Re-run as things evolve — it reconciles, never duplicates, and proposes upgrades when placed artifacts fall short of current standards. |
| [retro](skills/retro/SKILL.md) | After a task, turns your corrections into durable improvements, with your consent. | At the end of every task — especially one where you corrected the agent. Saying done or wrap up triggers it too. |
| [rule-writing](skills/rule-writing/SKILL.md) | The one place rules get written — filtered, budgeted, provenance-stamped. | Mostly invoked by codify/retro handing it drafts; call it directly when you already know a landmine worth a rule. |
| [skill-writing](skills/skill-writing/SKILL.md) | Authors or edits a skill — checking a skill is the right carrier, that one does not already exist, interrogating the procedure for the gaps you did not mention, and running the draft in a subagent before you trust it. | When a procedure is worth capturing as a skill — your own idea, or a codify/retro handoff. |
| [skill-testing](skills/skill-testing/SKILL.md) | Acceptance-tests any skill with mechanical checks. | After writing or changing a skill, to prove it does what its SKILL.md says. |
| [skill-auditing](skills/skill-auditing/SKILL.md) | Audits a skills directory for stale format or facts. | Periodically, or when a skill seems outdated. |

## Contributing

Development setup and the spec workflow are in
[CONTRIBUTING.md](CONTRIBUTING.md).
