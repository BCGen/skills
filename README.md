# AI Project Harness Skills

Agent skills that give any project a consistent AI setup and a learning loop:
initialize the AI instruction surface once, then promote lessons from each
completed task into shared, version-controlled rules — consent-gated,
provenance-stamped, and kept under a hard rule budget.

Works with Claude Code, Cursor, and any agent that reads `AGENTS.md`.

## Why

AI coding agents repeat the same mistakes across tasks because lessons
evaporate: native memory features are machine-local and never become
team-shared rules, and rule files that only ever grow measurably degrade
agent performance (adherence collapses past ~150–200 instructions;
LLM-generated boilerplate context is net-negative). This harness closes the
loop the vendors leave open — and treats anti-bloat as a first-class feature,
not an afterthought: admission filters, two-stage promotion, line budgets,
and deletion proposals.

## Skills (Phase 1)

| Skill | What it does |
|---|---|
| `task-retrospective` | Post-task review: mines user corrections and failures, stages lesson candidates in `.ai/learnings.md`, and routes approved proposals (rule / memory / backlog / skill update). |
| `add-rule` | The single write path for rule files. Owns the cross-agent rule format spec, enforces the admission filter and the rule budget. |
| `ai-init` | Initializes a project's AI instruction surface: entry file, per-rule directories, cross-agent interop glue, and the harness loop files. |

Status: in development — see `openspec/changes/add-ai-harness-skills/`.

## Install

```sh
npx skills add BCGen/skills
```

## How this differs from similar projects

- **AGENTS.md generators** (create-agentsmd, mcollina/init): they scan and
  emit one file, once. This harness writes each agent's *native* per-rule
  format and keeps rules alive through the retrospective loop.
- **Self-improving skills** (self-learning-skills, Claudeception): they
  harvest lessons opportunistically. Here, promotion is consent-gated,
  evidence-based, staged across tasks — and budget-enforced, because rule
  accumulation measurably degrades agents.
- **Methodology frameworks** (compound-engineering, Agent OS, BMAD): they
  ask you to adopt a workflow. These are three standalone skills that work
  with whatever workflow you already have, and write to standard locations
  you keep even if you uninstall.

## Repo layout

- `skills/<name>/SKILL.md` — the skills (installable units)
- `openspec/` — product specs and change proposals (what to build and why)
- `.ai/` — harness loop files for this repo itself (dogfooding: lessons
  learned while building the harness)
- `tests/fixtures/` — acceptance scenario projects for `ai-init`
- `scripts/` — repo lint and tooling

## Development

```sh
pnpm install
pnpm lint    # skill lint + markdownlint
```

Specs and changes are managed with [OpenSpec](https://github.com/Fission-AI/OpenSpec)
(`/opsx:propose`, `/opsx:apply`, `/opsx:archive`).
