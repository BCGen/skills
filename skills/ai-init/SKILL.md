---
name: ai-init
description: Initializes a project's AI instruction surface — entry file, per-rule directories, cross-agent interop glue, and the learning-loop files — with idempotent, diff-first, marker-managed writes. Use when setting up AI collaboration or AI configuration for a new or existing project.
---

# AI Init

Set up the files agents read ("instruction surface") plus the harness loop.
Tables and templates live in
[references/init-playbook.md](references/init-playbook.md) — read it first.
Never touch execution settings (settings.json, hooks, MCP, CI).

## Step 1 — Detect

Check for agent artifacts (`.claude/`, `CLAUDE.md`, `.cursor/`, `AGENTS.md`)
and coexisting frameworks (`.specify/`, `.agent-os/`, `.kiro/steering/`) per
the playbook. Zero or multiple agents → ask one question with a recommended
answer (AGENTS.md is the portable default). Never guess.

## Step 2 — Inventory

List what already exists: entry file, rules directory, `.ai/learnings/`,
`.ai/backlog/`, harness block, interop glue. The plan covers ONLY the
missing pieces — re-running on an initialized project must be a no-op.

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
for approval. Never ask the user to approve content they have not seen.
The plan covers:

- Entry file (create, or append the managed harness block to an existing
  one — never edit outside your `harness:begin/end` markers).
- Interop glue when applicable (e.g. `CLAUDE.md` starting with `@AGENTS.md`).
- Rules directory for the target agent (empty — rules are written later,
  only via the rule-writing skill).
- `.ai/learnings/` and `.ai/backlog/` directories, each with its README,
  per the playbook.
- Coexisting framework detected → one reference line instead of duplicate
  content, per the playbook.

## Step 5 — Write and verify

Apply the approved plan, then self-check:

1. Re-run the inventory — everything present, nothing else changed.
2. User-authored content outside markers is byte-identical.
3. A hypothetical second run would change nothing (report this).

## Step 6 — Report

Short summary: what was created/modified, the detected target, budget
status (entry file lines / 60), and next steps (install the skills; run
retro at task end).

## Mistakes to refuse

| Request | Response |
| --- | --- |
| "Also set up permissions/hooks/MCP" | Out of scope — instruction surface only |
| "Generate a full set of best-practice rules" | Near-empty baseline by design; rules come from evidence via rule-writing |
| "Rewrite my existing CLAUDE.md" | Only the managed block is yours to write |
