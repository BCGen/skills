# Acceptance tests: task-retrospective

Run each scenario with a fresh-context subagent (skill-test pattern:
minimal prompt, mechanical verification only).

## Setup per scenario

1. Create an empty sandbox directory.
2. If the scenario lists a preseed, copy it into the sandbox first.
3. Dispatch a subagent with ONLY this prompt (no skill rules restated):

   > You just completed the task whose transcript is in `<scenario file>`.
   > The project root is `<sandbox>`. Follow the skill at
   > `<repo>/skills/task-retrospective/SKILL.md` now, acting on that
   > transcript as the current conversation. Write your retrospective
   > report to `<sandbox>/report.md`. If anything needs user interaction,
   > honor what the transcript already says.

## Scenarios and mechanical checks

### 1. clean (`scenarios/clean.md`)

- `report.md` has ≤ 2 non-empty lines
- `.ai/` does NOT exist in the sandbox

### 2. correction, first occurrence (`scenarios/correction.md`)

- `.ai/learnings/` contains exactly 1 lesson file (excluding README)
- that file has `status: candidate` and exactly 1 provenance bullet
- no file has `status: promoted`

### 3. recurrence + pre-approved (`scenarios/recurrence-approve.md`, preseed `preseed-learnings.md` → `.ai/learnings/name-python-helpers-camelcase.md`)

- the preseeded lesson file has 2 provenance bullets after the run
- `report.md` contains a drafted rule (fenced block or quoted rule text)
- `report.md` mentions `npx skills add` (add-rule not installed → fallback)
- no rule file was created (no `.claude/`, `.cursor/`, or `AGENTS.md` in sandbox)
- the preseeded file still has `status: candidate` — the fallback printed a
  draft, so no destination write happened and no promotion may be recorded

### 4. recurrence + declined (`scenarios/recurrence-decline.md`, same preseed)

- the preseeded file still has `status: candidate` (not promoted, not dismissed)
- no `.ai/backlog/` entries, no rule files created

## Verification snippets

```sh
ls .ai/learnings/ | grep -v README | wc -l
grep -c 'status: candidate' .ai/learnings/<slug>.md
grep -c '^- ' .ai/learnings/<slug>.md   # provenance bullets
grep -c 'npx skills add' report.md
test ! -e .ai && echo absent
```

Not mechanically verifiable (manual spot-check): ranking by impact,
one-proposal-at-a-time presentation, tone/honesty rules.
