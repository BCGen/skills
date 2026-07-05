# Execution and sandbox patterns

## Minimal-prompt template

Dispatch a fresh-context subagent with only this:

```text
Follow the skill at <target SKILL.md path> for this input: <input>.
Project root / output path: <path>. If the skill asks the user a question,
assume the least-disruptive default and state what you assumed. Report:
the output path(s), the key numbers from what you produced, and anything
that felt unclear.
```

Never add the target's rules, formats, examples, or expected results.

If the target needs a precondition (an authenticated MCP, a config key),
name the precondition — not the skill's execution rules.

## Sandbox for skills that write files

1. Create an isolated empty directory (never the real project).
2. Copy in declared preseeds (fixtures the scenario needs) first.
3. Run the target skill against that directory.
4. Verify with grep/diff against the preseeds and expected outputs.

## Idempotency proof (git-based)

For a skill that claims re-runs are no-ops:

```sh
git -C <sandbox> init -q && git -C <sandbox> add -A
git -C <sandbox> -c user.email=t@t -c user.name=t commit -qm fixture
# run the skill (pass 1); commit as pass1
git -C <sandbox> add -A && git -C <sandbox> commit -qm pass1
# run the skill again (pass 2); the verdict:
test -z "$(git -C <sandbox> status --porcelain)" && echo IDEMPOTENT || echo NOT-IDEMPOTENT
```

## Additions-only proof

For a skill that must not modify pre-existing content:

```sh
git -C <sandbox> diff fixture pass1 --numstat | awk '{s+=$2} END {exit s>0?1:0}' \
  && echo "additions only" || echo "MODIFIED existing lines"
```

## Conversational skills

For skills triggered by a completed task (no file input), write a scenario
transcript file and tell the subagent to act on it as the current
conversation. Keep one transcript per scenario so runs are repeatable.

## Preexisting-file integrity

Snapshot a file before the run (`cp x x.snap`) and `cmp -s x.snap x` after
to prove byte-for-byte preservation of content the skill should not touch.
