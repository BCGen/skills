# Acceptance tests: skill-writing

Have skill-writing author a new sample skill end-to-end in a sandbox;
verify the products mechanically.

## Scenario: author a sample skill

Give it a domain, use cases, "instructions only", and let it name +
collision-check. Sandbox is the project root; skill-testing absent.

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

Not mechanically verifiable: whether the drafted instructions actually
accomplish the skill's task (human review).
