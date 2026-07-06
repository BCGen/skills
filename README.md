# Skills

Your AI coding agent makes the same mistake twice, ignores conventions your
project already follows, and forgets each task's lessons by the next.

The root problem predates AI: conventions that live only in your team's
heads trip every newcomer. An AI agent is simply the most demanding
newcomer you will ever onboard — it starts from zero every single session.

These skills close the loop: capture the conventions your project already
follows so the agent starts from them, and stage every correction as a
lesson that — only with your consent — lands where it fits best: a config,
a doc, or a budgeted, team-shared rule your human teammates read too.
Works with Claude Code, Cursor, and any agent that reads `AGENTS.md`.

## Install

```sh
npx skills@latest add BCGen/skills
```

Without the skill-authoring toolchain:

```sh
npx skills@latest add BCGen/skills -s harness-sync codify retro rule-writing
```

## Skills

| Skill | What it does | When to use it |
| --- | --- | --- |
| [harness-sync](skills/harness-sync/SKILL.md) | Sets up and re-syncs a project's AI instruction files. | Optional day 0 — everything also bootstraps without it; re-run after a skills update to re-sync the managed bits. |
| [codify](skills/codify/SKILL.md) | Captures a project's existing conventions so the agent follows them from the first run. | Once on an existing project, before the agent's first real task. |
| [retro](skills/retro/SKILL.md) | After a task, turns your corrections into durable improvements, with your consent. | At the end of every task — especially one where you corrected the agent. Saying done or wrap up triggers it too. |
| [rule-writing](skills/rule-writing/SKILL.md) | The one place rules get written — filtered, budgeted, provenance-stamped. | Any time a rule should be added, changed, or removed — directly, or handed a draft by codify/retro. |
| [skill-writing](skills/skill-writing/SKILL.md) | Authors a new skill — for a collection, a project, or your own setup — to a tested standard. | When a procedure is worth capturing as a skill — your own idea, or a codify/retro handoff. |
| [skill-testing](skills/skill-testing/SKILL.md) | Acceptance-tests any skill with mechanical checks. | After writing or changing a skill, to prove it does what its SKILL.md says. |
| [skill-auditing](skills/skill-auditing/SKILL.md) | Audits a skills directory for stale format or facts. | Periodically, or when a skill seems outdated. |

## Usage

Skills trigger automatically when your task matches, or run one on demand
(`/codify`, `/retro`, or just ask). Every skill runs standalone — none
requires another.

The typical pass:

1. `codify` once, so the agent's first task follows your conventions.
2. Work as usual — add or adjust rules through `rule-writing` any time.
3. `retro` when each task ends.

`harness-sync` optionally lays out the whole surface on day 0 and
re-syncs it after skills updates. The authoring trio — `skill-writing`,
`skill-testing`, `skill-auditing` — grows, proves, and sweeps skills of
your own. Timing per skill is in the table above.

## The learning loop

Lessons live in your repo, not in any agent's private memory:

- `.ai/learnings/` — one file per lesson `retro` stages, named by root
  cause, with a status lifecycle: `candidate` (observing) → `promoted`
  (fixed somewhere better) → `resolved` (cured — the file is deleted).
- `.ai/backlog/` — one file per idea worth building later.

Commit both: plain markdown, team-shared through git — a lesson one
person's agent learns reaches everyone's next session. Entries stay
blameless (no names; authorship lives in git history).

## Why

Native agent memory is machine-local and never becomes team-shared rules,
and rule files that only grow eventually make the agent follow them *less*.
These skills promote lessons into shared rules only with your consent, and
keep them under a budget — so more rules never mean worse adherence.

Unlike one-shot file generators or hook-based capture bolted onto a
methodology, these are standalone, consent-gated, and write each agent's
native format.

## Contributing

Development setup and the spec workflow are in
[CONTRIBUTING.md](CONTRIBUTING.md).
