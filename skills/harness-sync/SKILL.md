---
name: harness-sync
description: Sets up and re-syncs a project's entry-file harness block — the wiring that brings retro in — plus cross-agent interop glue, with idempotent, diff-first, marker-managed writes; retro owns the learning loop. Use when setting up AI collaboration for a new or existing project, or when re-syncing the managed block after the skills were updated. Optional day-0 setup — projects bootstrap without it.
---

# Harness Sync

Set up — and keep synced — the files agents read ("instruction surface")
plus the harness loop.
Tables and templates live in
[references/playbook.md](references/playbook.md) — read it first.
Never touch execution settings (settings.json, hooks, MCP, CI).

## Step 1 — Detect

Check for agent artifacts (`.claude/`, `CLAUDE.md`, `.cursor/`, `AGENTS.md`)
and coexisting frameworks (`.specify/`, `.agent-os/`, `.kiro/steering/`) per
the playbook. Zero or multiple agents → ask one question with a recommended
answer (AGENTS.md is the portable default). Never guess.

## Step 2 — Inventory

List what already exists: entry file, harness block, interop glue. The plan
covers the missing pieces AND the harness block if it drifted from the
current template — re-running on an up-to-date project must be a no-op. The
`.ai/` loop directories are retro's to create; harness-sync neither creates
nor reconciles them.

## Step 3 — Discover (new entry file only)

If an entry file must be created, gather verified facts from the repo:
build/test/lint commands read from manifests (`package.json`, `Makefile`,
CI config), plus layout facts worth stating. Never write a command you did
not verify in a file. Where the agent has a native bootstrap (e.g. `/init`),
prefer it for discovery, then trim to the content policy: **no generic
rules, no personas, no best-practice boilerplate** — verified facts and the
harness block only.

## Step 4 — Present the plan, then get approval

Print the full plan in the conversation — the complete content of every
file to be created and a diff for every file to be modified — then ask
for approval with the platform's option-prompt tool when it has one
(Claude Code: AskUserQuestion) — choices like approve-as-planned /
adjust-first; plain question only when no such tool exists.
Never ask the user to approve content they have not seen. The plan
covers:

- Entry file (create, append the managed harness block to an existing
  one, or update a drifted block in place — never edit outside your
  `harness:begin/end` markers).
- Interop glue when applicable (e.g. `CLAUDE.md` starting with `@AGENTS.md`).
- No rules directory — git cannot track an empty directory; rule-writing
  creates it with the first rule.
- No `.ai/` loop directories — retro creates and maintains
  `.ai/learnings/` and `.ai/backlog/` on its first write; harness-sync only
  names them in the harness block.
- Coexisting framework detected → one reference line instead of duplicate
  content, per the playbook.

## Step 5 — Write and verify

Apply the approved plan, then self-check:

1. Re-run the inventory — everything present, nothing else changed.
2. User-authored content outside markers is byte-identical.
3. A hypothetical second run would change nothing (report this).

## Step 6 — Report and hand off

Short summary: what was created/modified, the detected target, and the
budget status (entry file lines / 60). Then point at the next move, in
order:

1. Commit the new files — the harness is team-shared through git.
2. Existing project → run the codify skill next, so the agent's first
   real task already follows the project's conventions.
3. Then just work; retro picks up each task's lessons when it ends,
   creating `.ai/learnings/` and `.ai/backlog/` on its first write.

## Mistakes to refuse

| Request | Response |
| --- | --- |
| "Also set up permissions/hooks/MCP" | Out of scope — instruction surface only |
| "Generate a full set of best-practice rules" | Near-empty baseline by design; rules come from evidence via rule-writing |
| "Rewrite my existing CLAUDE.md" | Only the managed block is yours to write |
