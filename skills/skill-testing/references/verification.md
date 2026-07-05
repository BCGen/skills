# Verification: what is mechanically checkable

## The verifiability test

- Settled by grep / regex / count / diff → **verifiable**.
- Needs semantic reading ("is this concise", "is the wording clear") →
  **not-verified** (report it, never guess).
- Needs external comparison the skill itself is responsible for ("the link
  actually points to the right doc") → **not-verified** here.
- Branches by context ("if Figma available then A else B") → determine
  which branch this run took, verify that branch only.
- Middle ground ("link text must contain filename + section number") →
  approximate with a regex and mark the check **partial**.

## Recording each check

For every extracted rule, record three things:

- the source rule (quoted from the target's SKILL.md or a referenced file),
- the exact command used,
- coverage: full / partial / unverifiable.

## Common check shapes

```sh
grep -c "PATTERN" output.md            # must-contain (> 0) / must-omit (== 0)
grep -cE "REGEX" output.md             # format
ls dir/ | grep -v README | wc -l       # count files
python3 -c "..."                       # sum comparisons
cmp -s a.snap a                         # byte-identical
```

## Nested subagents

If the target skill itself dispatches subagents, do not conflate them:
skill-testing dispatches exactly one outer subagent to run the whole
target; the target's own nested agents are its concern.

## Interactive stalls

If the target may block on a user confirmation, the execution prompt should
tell the subagent to take the least-disruptive default so the run
completes rather than hanging.
