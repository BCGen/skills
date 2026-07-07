# harness-sync playbook

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
Run the retro skill when a task ends; lessons land in `.ai/learnings/`, ideas in `.ai/backlog/`.
<!-- harness:end -->
```

## Loop directories — not harness-sync's to create

harness-sync does NOT create `.ai/learnings/` or `.ai/backlog/`. retro owns
them: it creates each directory and its `README.md` from the canonical
templates in its `references/loop-file-formats.md` on its first write, and
reconciles a drifted README while writing. harness-sync only names the two
directories in the harness block (a forward reference).

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

1. Inventory what already exists (entry file, harness block, interop glue).
   Never pre-create a rules directory — rule-writing creates it with the
   first rule. The `.ai/` loop directories are retro's, not part of
   harness-sync's managed surface.
2. Plan the missing pieces plus the harness block if it drifted from the
   current template — regenerate ONLY the managed surface, and only on drift.
3. Content you own lives inside `harness:begin/end` markers; NEVER edit
   anything outside your markers in a pre-existing file.
4. Present the full content of every file you will create and a diff of
   every file you will change; write only after approval.
5. A second run right after the first must produce zero diff; a run
   after the skill's templates changed converges the managed surface and
   nothing else.

## Framework coexistence

When spec-kit / Agent OS / Kiro artifacts exist: do not generate content
overlapping theirs. Add one reference line inside the harness block's first
line (e.g. "project principles: see `.specify/`"). Do not create `.ai/` loop
files — retro creates them on its first write.

## Out of scope — never touch

`settings.json`, hooks, MCP configuration, CI files, or any execution
setting. Instruction surface only.
