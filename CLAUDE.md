# AI Harness Skills — repo notes

Install deps with `pnpm install`; lint everything with `pnpm lint`
(skill lint + markdownlint over `skills/**`).

Layout: `skills/<name>/SKILL.md` are the installable units (English-only,
enforced by lint). Product specs and change proposals live in `openspec/`
(OpenSpec workflow: `/opsx:propose`, `/opsx:apply`, `/opsx:archive`).
Acceptance tests and fixtures live in `tests/`.

<!-- harness:begin -->
AI harness: lessons are staged in `.ai/learnings.md`, skill ideas in `.ai/backlog.md` (see the task-retrospective skill).
Rules live in `.claude/rules/`; write them only via the add-rule skill (budget: entry ≤60, resident ≤150 lines).
Install the harness: `npx skills add BCGen/skills`
<!-- harness:end -->
