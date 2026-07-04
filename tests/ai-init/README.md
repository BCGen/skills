# Acceptance tests: ai-init

Each fixture in `tests/fixtures/` is copied to a sandbox and committed to a
fresh git repo (commit `fixture`). A subagent then runs the skill twice;
git provides mechanical before/after and idempotency proof.

Subagent prompt template (harness mechanics, no skill rules):

> Project root: `<sandbox>` (a git repo). Follow the skill at
> `<repo>/skills/ai-init/SKILL.md` to initialize this project. The user
> pre-approves your proposed plan; if you would ask the user a question,
> state it and assume your recommended answer. After finishing, run
> `git add -A && git commit -m pass1`. Then run the skill again from
> scratch on the same project (second pass). Report: detected target,
> files created/modified per pass, and the question you assumed (if any).

## Mechanical checks (all fixtures)

```sh
git -C <sandbox> diff --stat          # pass-2 delta: MUST be empty (idempotent)
git -C <sandbox> diff fixture..pass1 --numstat   # deletions column MUST be 0 (additions only)
grep -c 'harness:begin' <entry file>  # == 1 (markers present)
test -f .ai/learnings.md && test -f .ai/backlog.md
test ! -e .claude/settings.json      # never touches execution settings
```

Entry file stays ≤ 60 lines.

## Per-fixture expectations

| Fixture | Target | Extra checks |
| --- | --- | --- |
| `empty` | asks (zero detected) → AGENTS.md recommended | AGENTS.md created; any commands quoted exist in package.json |
| `existing-claudemd` | Claude Code | CLAUDE.md original lines intact (additions only); `.claude/rules/` present |
| `existing-cursor` | Cursor | `style.mdc` byte-identical; entry file is AGENTS.md |
| `existing-agentsmd` | fallback | AGENTS.md gains only the harness block |
| `multi-agent` | asks (two detected) | interop glue present (`@AGENTS.md` import in CLAUDE.md); preseeded rules byte-identical |
