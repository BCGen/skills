# Learnings (staged candidates)

Lesson candidates observed during tasks. A candidate becomes a rule only
after it recurs or the user explicitly confirms promotion.
See the task-retrospective skill.

## [candidate] Boundary tests must construct guaranteed-boundary seeds

- 2026-07-05 · task: add-ai-harness-skills implementation · evidence: over-budget acceptance seeded 144/150 lines; the agent legitimately wrote a 3-line rule (147/150) and the refusal path went unexercised until the seed was recalibrated to exactly 150

## [candidate] Templates with placeholders must state how to resolve them

- 2026-07-05 · task: add-ai-harness-skills implementation · evidence: three ai-init acceptance agents independently resolved `<owner>/<repo>` from the git remote — correct but unspecified behavior; playbook now codifies it
