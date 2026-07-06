# ai-init playbook

Templates and tables for initializing a project's AI instruction surface.

## Detection

| Artifact found | Meaning |
| --- | --- |
| `.claude/` or `CLAUDE.md` | Claude Code |
| `.cursor/` | Cursor |
| `AGENTS.md` | AGENTS.md-reading agent (portable) |
| `.specify/` | spec-kit — defer (see coexistence) |
| `.agent-os/` (or legacy `agent-os/`) | Agent OS — defer |
| `.kiro/steering/` | Kiro — defer |

Zero or multiple agents detected → ask ONE question with a recommendation
(AGENTS.md is the portable default; native dirs are the enhancement).

## Targets per agent

| Target | Entry file | Rules dir |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` | `.claude/rules/` |
| Cursor | `AGENTS.md` (Cursor reads it) | `.cursor/rules/` |
| Fallback | `AGENTS.md` | managed block inside `AGENTS.md` |

Interop glue: when Claude Code is the target and `AGENTS.md` also exists
(or another agent is also in use), `CLAUDE.md` must begin with `@AGENTS.md`
so both tools read one source; Claude-specific lines go below the import.

## Managed harness block (entry file)

At most 3 content lines, delimited by markers, placed at the end of the
entry file:

```markdown
<!-- harness:begin -->
AI learning loop: lessons are staged in `.ai/learnings/`, ideas in `.ai/backlog/` (one file per entry); run the retro skill when a task ends.
Rules live in <rules location>; write them only via the rule-writing skill (budget: entry ≤60, resident ≤150 lines).
Install the skills: `npx skills add <owner>/<repo>`
<!-- harness:end -->
```

Resolve `<owner>/<repo>` from the git remote of the repo this skill was
installed from when discoverable; otherwise keep the literal placeholder
and tell the user to fill it in — never invent a slug.

## Loop directories

Create `.ai/learnings/` and `.ai/backlog/`, each containing only its
`README.md` (format doc + git tracking placeholder). README templates live
in the retro skill's `references/loop-file-formats.md`
(canonical source — keep any local copy in sync). Lesson/idea files are
one-per-entry, added later by the retro skill, never by ai-init.

## Entry-file content policy (near-empty baseline)

A NEW entry file contains only:

1. Verified facts discovered from the repo: build/test/lint commands that
   exist in manifests (`package.json`, `Makefile`, CI config) — never
   fabricate a command you did not see; layout facts worth stating.
2. The managed harness block.

It contains NO generic rules ("write clean code", "follow best practices",
persona preambles) — evidence shows generated boilerplate context reduces
task success. Discovered *conventions* the user wants enforced become rules
via the rule-writing skill, not entry-file prose. Where the agent offers a
native bootstrap (e.g. Claude Code `/init`), prefer suggesting it for
discovery and then trim its output to the policy above.

## Idempotency algorithm

1. Inventory what already exists (entry file, rules dir, `.ai/` files,
   harness block, interop glue).
2. Plan only the missing pieces — never regenerate existing content.
3. Content you own lives inside `harness:begin/end` markers; NEVER edit
   anything outside your markers in a pre-existing file.
4. Show a diff of every file you will create or change; write only after
   approval.
5. A second run right after the first must produce zero diff.

## Framework coexistence

When spec-kit / Agent OS / Kiro artifacts exist: do not generate content
overlapping theirs. Add one reference line inside the harness block's first
line (e.g. "project principles: see `.specify/`"), and still create the
`.ai/` loop files if missing.

## Opt-in retro Stop hook (Claude Code target only)

The single exception to the execution-settings boundary. When the
detected target is Claude Code, the plan includes ONE extra question —
"Add the retro Stop hook so a finished task always gets its
retrospective?" — recommended answer: **yes**. Non-interactive runs SKIP
the hook; consent for it is never assumed. On consent, write to
`.claude/settings.json` (the version-controlled, team-shared file)
diff-first and surgically: merge in the `hooks.Stop` entry, keep every
pre-existing key's value unchanged (only syntax the merge requires, e.g.
a trailing comma, may move), and treat a re-run with the hook already
present as a no-op.

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "grep -q '\"stop_hook_active\"[[:space:]]*:[[:space:]]*true' && exit 0; echo '{\"decision\":\"block\",\"reason\":\"retro checkpoint: if a task was completed in this conversation and no retrospective has run for it, run the retro skill now; otherwise just stop.\"}'"
          }
        ]
      }
    ]
  }
}
```

Behavior: the hook fires at every turn end; the `stop_hook_active` guard
lets the follow-up stop through, so it costs at most one short extra
evaluation per turn, and retro's own idempotency guard makes any
double-fire harmless. A blocked stop renders with a `Stop hook error:`
prefix in the UI — that is the normal display of `decision: block`, not
a failure. The command needs a POSIX shell. Verified
2026-07-06 against code.claude.com/docs plus the running Claude Code
(2.1.201): the nested structure matches a live working config, and the
`stop_hook_active` flag exists in the binary even though the current
docs page omits it.

## Out of scope — never touch

`settings.json`, hooks, MCP configuration, CI files, or any execution
setting — except the single opt-in retro Stop hook above, written only
on explicit consent. Everything else: instruction surface only.
