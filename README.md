# Skills

Your AI coding agent makes the same mistake twice, ignores conventions your
project already follows, and forgets each task's lessons by the next.

These skills close the loop: capture the conventions your project already
follows so the agent starts from them, and stage every correction as a
lesson that — only with your consent — lands where it fits best: a config,
a doc, or a budgeted, team-shared rule. Works with Claude Code, Cursor,
and any agent that reads `AGENTS.md`.

## Install

```sh
npx skills add BCGen/skills
```

Without the skill-authoring toolchain:

```sh
npx skills add BCGen/skills -s ai-init codify retro rule-writing
```

## Skills

| Skill | What it does | When to use it |
| --- | --- | --- |
| `ai-init` | Sets up a project's AI instruction files. | Optional day 0 — lays out the whole surface at once; everything also bootstraps without it. |
| `codify` | Captures a project's existing conventions so the agent follows them from the first run. | Once on an existing project, before the agent's first real task. |
| `retro` | After a task, turns your corrections into durable improvements, with your consent. | At the end of every task — especially one where you corrected the agent. |
| `rule-writing` | The one place rules get written — filtered, budgeted, provenance-stamped. | Any time a rule should be added, changed, or removed — directly, or handed a draft by codify/retro. |
| `skill-writing` | Authors a new skill — for a collection, a project, or your own setup — to a tested standard. | When a procedure is worth capturing as a skill — your own idea, or a codify/retro handoff. |
| `skill-testing` | Acceptance-tests any skill with mechanical checks. | After writing or changing a skill, to prove it does what its SKILL.md says. |
| `skill-auditing` | Audits a skills directory for stale format or facts. | Periodically, or when a skill seems outdated. |

## Usage

Skills trigger automatically when your task matches, or run one on demand
(`/codify`, `/retro`, or just ask). Every skill runs standalone — none
requires another. A full pass over a project's life:

1. **Adopt** — optionally run `ai-init` once: entry file, rules
   directory, and the `.ai/` learning-loop files in one pass, plus an
   install pointer your teammates' agents will see. Skipping it is fine —
   the loop files bootstrap themselves on first use.
2. **Capture** — run `codify` on an existing project so the agent's
   first task already follows your conventions. Each convention is routed
   to its fittest home — config, doc, rule (via `rule-writing`), or
   nothing at all.
3. **Work** — just work. Add or adjust a rule any time through
   `rule-writing`.
4. **Close the task** — run `retro`. It stages lessons from what went
   wrong in `.ai/learnings/` and, with your consent, promotes them to the
   fittest mechanism; recurring problems build a trail there until they
   are cured.
5. **Grow skills** — when a repeated procedure deserves to be a skill
   (your idea, or a codify/retro handoff), author it with
   `skill-writing`, prove it with `skill-testing`, and sweep the whole
   set with `skill-auditing` when things may have gone stale.

## The learning loop

Lessons live in your repo, not in any agent's private memory:

- `.ai/learnings/` — one file per lesson `retro` stages, named by root
  cause, with a status lifecycle: `candidate` (observing) → `promoted`
  (fixed somewhere better) → `resolved` (cured — the file is deleted).
- `.ai/backlog/` — one file per idea worth building later.

Commit both: they are plain markdown, team-shared through git, so a
lesson one person's agent learns reaches everyone's next session.

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
