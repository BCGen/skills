# Acceptance tests: skill-writing

Have skill-writing author a new sample skill end-to-end in a sandbox;
verify the products mechanically.

## Scenario: author a collection skill

Give it a domain, use cases, "instructions only", and let it name +
collision-check. The prompt expressly frames the task as adding a skill
to this collection-style repo (preseed a `skills/` directory containing
one existing skill for realism — the express task, not the directory, is
the destination signal); skill-testing absent.

## Mechanical checks (on the authored `skills/<name>/SKILL.md`)

```sh
grep -c "^name: <name>" SKILL.md               # name == directory (== 1)
grep -c "Use when" SKILL.md                     # trigger sentence present
sed '1,/^---$/d;1,/^---$/d' SKILL.md | wc -l    # body ≤ 100 lines
grep -rlE '[぀-ヿ一-鿿]' skills/<name>/ | wc -l  # no CJK (== 0)
test -f tests/<name>/README.md                  # acceptance scaffold exists
grep -cE 'grep|regex|-c ' tests/<name>/README.md # test plan has mechanical checks
```

- the collision check actually ran (report names the skills.sh result)
- the "Use when" triggers include the given use case
- skill-testing-absent → test plan left as a manual checklist, install
  mentioned at most once

## Scenario: project-local skill (delegated handoff)

Sandbox is a host project (preseed `.claude/` so the destination is
unambiguous), NOT this collection. Prompt frames the request as a
codify/retro handoff of a drafted multi-step procedure.

```sh
test -f .claude/skills/<name>/SKILL.md   # placed in the host project's skill dir
test ! -d skills/<name>                  # NOT written to a collection-style skills/
grep -c "^name: <name>" .claude/skills/<name>/SKILL.md   # conventions still hold
test -f tests/<name>/README.md           # acceptance plan in the host project
```

- no skills.sh registry check required (project-local); no collision with
  installed skill names
- `.claude/` preseeded → destination unambiguous: the report contains no
  destination question

## Scenario: ambiguous destination

Sandbox is a bare host project — no `.claude/`, no `.agents/`, no
`skills/`. Same delegated-handoff prompt as above; the run prompt carries
skill-testing's standard assume-the-recommended-answer authorization, so
the question is stated and the write proceeds.

- the report contains exactly one destination question with a recommended
  answer (grep the report for the question and the recommended candidate)
- `SKILL.md` lands in the directory the assumed answer names

Not mechanically verifiable: whether the drafted instructions actually
accomplish the skill's task (human review).
