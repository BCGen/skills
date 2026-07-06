# Acceptance tests: harness-sync

Each fixture in `tests/fixtures/` is copied to a sandbox and committed to a
fresh git repo (commit `fixture`). A subagent then runs the skill twice;
git provides mechanical before/after and idempotency proof.

Subagent prompt template (harness mechanics, no skill rules):

> Project root: `<sandbox>` (a git repo). Follow the skill at
> `<repo>/skills/harness-sync/SKILL.md` to initialize this project. The user
> pre-approves your proposed plan; if you would ask the user a question,
> state it and assume your recommended answer. After finishing, run
> `git add -A && git commit -m pass1`. Then run the skill again from
> scratch on the same project (second pass). Report: detected target,
> files created/modified per pass, the question you assumed (if any),
> and — under a heading "Plan as presented" — the plan exactly as you
> showed it for approval before writing.

## Mechanical checks (all fixtures)

```sh
git -C <sandbox> diff --stat          # pass-2 delta: MUST be empty (idempotent)
git -C <sandbox> diff fixture..pass1 --numstat   # deletions column MUST be 0 (additions only)
grep -c 'harness:begin' <entry file>  # == 1 (markers present)
test -f .ai/learnings/README.md && test -f .ai/backlog/README.md
test ! -e .claude/settings.json      # never touches execution settings
```

Entry file stays ≤ 60 lines.

Presentation check: the report's "Plan as presented" section must carry
the full content of each new file as shown before any write. Mechanical
proxy, scoped to that section so an after-the-fact echo cannot pass:

```sh
awk '/Plan as presented/,0' report.md | grep -c 'harness:begin'   # > 0
```

## Per-fixture expectations

| Fixture | Target | Extra checks |
| --- | --- | --- |
| `empty` | asks (zero detected) → AGENTS.md recommended | AGENTS.md created; any commands quoted exist in package.json |
| `existing-claudemd` | Claude Code | CLAUDE.md original lines intact (additions only); no `.claude/rules/` created (`test ! -d .claude/rules`) |
| `existing-cursor` | Cursor | `style.mdc` byte-identical; entry file is AGENTS.md |
| `existing-agentsmd` | fallback | AGENTS.md gains only the harness block |
| `multi-agent` | asks (two detected) | interop glue present (`@AGENTS.md` import in CLAUDE.md); preseeded rules byte-identical |

## Scenario: converge an outdated managed block

Fixture `existing-claudemd`, but before the `fixture` commit preseed the
entry file with the stale multi-line block (v1 wording between the
markers):

```markdown
AI learning loop: lessons are staged in `.ai/learnings/`, ideas in `.ai/backlog/` (one file per entry; see the retro skill).
Rules live in `.claude/rules/`; write them only via the rule-writing skill (budget: entry ≤60, resident ≤150 lines).
Install the skills: `npx skills add BCGen/skills`
```

Expect the block converged in place. The per-file additions-only check
does not apply to `CLAUDE.md` here; the pathspec-scoped numstat plus the
marker-stripped compare give equivalent coverage:

```sh
! grep -q 'see the retro skill' CLAUDE.md          # stale wording gone
! grep -q 'Install the skills:' CLAUDE.md          # dropped lines gone
grep -c 'Run the retro skill when a task ends' CLAUDE.md   # == 1 (current template)
git -C <sandbox> diff fixture..pass1 --numstat -- ':!CLAUDE.md' | awk '{s+=$2} END {exit s>0?1:0}'   # all other files additions-only
git -C <sandbox> show fixture:CLAUDE.md | sed '/harness:begin/,/harness:end/d' > before.stripped
sed '/harness:begin/,/harness:end/d' CLAUDE.md > after.stripped
cmp before.stripped after.stripped                  # outside markers byte-identical
git -C <sandbox> diff --stat                        # pass 2: zero diff
```
