# Skills

Your AI coding agent makes the same mistake twice, ignores conventions your
project already follows, and forgets each task's lessons by the next.

These skills fix that: capture a project's conventions up front so the first
run follows them, and turn every correction into a durable, team-shared rule
— without bloating the agent's context. Works with Claude Code, Cursor, and
any agent that reads `AGENTS.md`.

## Install

```sh
npx skills add BCGen/skills
```

## Skills

| Skill | What it does |
| --- | --- |
| `ai-init` | Sets up a project's AI instruction files. |
| `codify` | Captures a project's existing conventions so the agent follows them from the first run. |
| `rule-writing` | The one place rules get written — filtered, budgeted, provenance-stamped. |
| `retro` | After a task, turns your corrections into durable improvements, with your consent. |
| `skill-writing` | Authors a new skill to this collection's standard. |
| `skill-testing` | Acceptance-tests any skill with mechanical checks. |
| `skill-auditing` | Audits a skills directory for stale format or facts. |

Each installs and works alone; together they form a loop.

## Usage

Skills trigger automatically when your task matches, or run one on demand
(`/codify`, `/retro`, or just ask). Typical flow: `ai-init` once → `codify`
to capture conventions → work as usual → `retro` at the end of a task.

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
