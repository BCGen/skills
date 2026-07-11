# Skills — repo notes

Install deps with `pnpm install`; lint everything with `pnpm lint`
(skill lint + markdownlint over `skills/**`).

Layout: `skills/<name>/SKILL.md` are the installable units (English-only,
enforced by lint) — a flat directory, since the installer flattens names
anyway. Grouping is a README concern, not a filesystem one; group a skill
by adding it under the right `##` section in README.md. Acceptance tests
and fixtures live in `tests/`.

Governance is per group, not repo-wide. The **agent harness & skill
authoring** group is spec-driven: changes to it go through `openspec/`
(`/opsx:propose`, `/opsx:apply`, `/opsx:archive`). Every other group is
lint-only — write the skill, pass `pnpm lint`, done. Do not open an
OpenSpec proposal for a skill outside the harness group.

Skills that depend on personal context (a specific employer, client,
toolchain, or project layout) do not belong here — they live in a
separate private repo. The test: does the skill need to know who I am?

<!-- harness:begin -->
Run the retro skill when a task ends; lessons land in `.ai/learnings/`, ideas in `.ai/backlog/`.
<!-- harness:end -->
