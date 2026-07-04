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
- `.ai/learnings.md` does NOT exist
- `.ai/backlog.md` does NOT exist

### 2. correction, first occurrence (`scenarios/correction.md`)

- `.ai/learnings.md` exists and contains exactly 1 `[candidate]` heading
- the entry has exactly 1 provenance line (`- ` bullet with a date)
- no `[promoted` marker anywhere

### 3. recurrence + pre-approved (`scenarios/recurrence-approve.md`, preseed `preseed-learnings.md` → `.ai/learnings.md`)

- the camelCase entry has 2 provenance lines after the run
- `report.md` contains a drafted rule (fenced block or quoted rule text)
- `report.md` mentions `npx skills add` (add-rule not installed → fallback)
- no rule file was created (no `.claude/`, `.cursor/`, or `AGENTS.md` in sandbox)

### 4. recurrence + declined (`scenarios/recurrence-decline.md`, same preseed)

- the camelCase entry still has marker `[candidate]` (not `[promoted`, not `[dismissed`)
- no `.ai/backlog.md`, no rule files created

## Verification snippets

```sh
grep -c '^## \[candidate\]' .ai/learnings.md
grep -c '^- ' .ai/learnings.md          # provenance lines (per entry: check section)
grep -c 'npx skills add' report.md
test ! -e .ai/learnings.md && echo absent
```

Not mechanically verifiable (manual spot-check): ranking by impact,
one-proposal-at-a-time presentation, tone/honesty rules.
