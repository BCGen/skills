# AI Harness Skills — repo notes

Install deps with `pnpm install`; lint everything with `pnpm lint`
(skill lint + markdownlint over `skills/**`).

Layout: `skills/<name>/SKILL.md` are the installable units (English-only,
enforced by lint). Product specs and change proposals live in `openspec/`
(OpenSpec workflow: `/opsx:propose`, `/opsx:apply`, `/opsx:archive`).
Acceptance tests and fixtures live in `tests/`.

<!-- harness:begin -->
Run the retro skill when a task ends; lessons are staged in `.ai/learnings/`, ideas in `.ai/backlog/` (one file per entry).
Rules live in `.claude/rules/`; write them only via the rule-writing skill (budget: entry ≤60, resident ≤150 lines).
Install the skills: `npx skills add BCGen/skills`
<!-- harness:end -->
