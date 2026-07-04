# Skills

Agent skills that set up and maintain a project's AI configuration:
initialize the instruction files agents read, keep rules within a hard
budget, and turn lessons from completed tasks into durable, team-shared
improvements. Works with Claude Code, Cursor, and any agent that reads
`AGENTS.md`.

## Skills

| Skill | What it does |
|---|---|
| `ai-init` | Initializes a project's AI instruction surface — entry file, per-rule directories, cross-agent interop glue, and the `.ai/` learning-loop files — with idempotent, diff-first, marker-managed writes. |
| `add-rule` | The single write path for rule files. Owns the cross-agent rule format spec, enforces a non-discoverability admission filter and the rule budget, stamps provenance. |
| `task-retrospective` | Post-task review: mines user corrections and failures, stages lesson candidates in `.ai/learnings/`, and routes approved proposals to their fittest destination (rule, memory, backlog, skill update). |

Each skill installs and works independently. Together they form a loop:
initialize once, stage lessons after each task, and promote recurring ones
into rules — with consent at every step.

## Install

```sh
npx skills add BCGen/skills                       # all skills
npx skills add BCGen/skills --skill add-rule      # just one
```

## Why

AI coding agents repeat the same mistakes across tasks because lessons
evaporate: native memory features are machine-local and never become
team-shared rules, and rule files that only ever grow measurably degrade
agent performance (adherence collapses past ~150–200 instructions;
LLM-generated boilerplate context is net-negative). These skills close the
loop the vendors leave open and treat anti-bloat as a first-class feature:
admission filters, two-stage promotion, line budgets, and deletion
proposals.

## How this differs from similar projects

- **AI instruction-file generators** (GitHub's create-agentsmd, the
  built-in `/init` commands): they scan and emit one file, once. These
  skills write each agent's *native* per-rule format and keep rules alive
  through the retrospective loop.
- **Continuous-learning systems** (everything-claude-code's instinct
  system, compound-engineering's compound step): they capture lessons via
  hooks or as part of a full methodology you must adopt. Here, promotion is
  consent-gated, evidence-based, staged across tasks, and budget-enforced —
  in standalone skills that fit whatever workflow you already have.

## Repo layout

- `skills/<name>/SKILL.md` — the skills (installable units)
- `openspec/` — product specs and change proposals (what to build and why)
- `.ai/` — this repo's own learning-loop files (lessons staged while
  building the toolkit)
- `tests/` — acceptance scenarios and fixtures
- `scripts/` — repo lint and tooling

## Development

```sh
pnpm install
pnpm lint    # skill lint + markdownlint
```

Specs and changes are managed with [OpenSpec](https://github.com/Fission-AI/OpenSpec)
(`/opsx:propose`, `/opsx:apply`, `/opsx:archive`).
