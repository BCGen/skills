---
name: codify
description: Scans a project's current practice, classifies each convention by how it is best enforced, and routes it to the fittest mechanism - config, project doc, rule, a project skill, or a paste-ready pointer. Use when setting up an existing project so the first agent execution follows its conventions, or when asked to establish, capture, or align project conventions.
---

# Codify

Get the first agent execution on an existing project accurate by routing
each observed convention to its fittest mechanism. Run explicitly, on any
existing project — with or without harness-sync. The full classification logic is in
[references/routing.md](references/routing.md) — read it first. Success is
first-execution accuracy, NOT rule count; routing most practice to
config/docs/nothing is the correct outcome.

## Step 1 — Scan by authority order

Read, in this order (project layer only — never personal auto memory or the
global `~/.claude/CLAUDE.md`): explicit config files (commitlint, eslint,
tsconfig, editorconfig, and commit history for commit conventions) > project
docs (CONTRIBUTING, README, entry file, `docs/`) > code and git-history
majority. Never carry assumptions from another project.

## Step 2 — Classify and route each convention

Apply the routing table in the reference. Key decisions:

- **Already placed** → if a convention already lives in a rule/doc/config
  (e.g. a rule retro promoted), respect it: no migration, no duplicate.
- **Discoverable fact** (layout, versions, existing pattern) → nothing.
- **Mechanically enforceable** → decide "already enforced?" by probing the
  effective config when it extends a preset (`eslint --print-config`), not
  from the file text; if enforced → nothing; if genuinely not → propose
  extending the existing config (never stand up a new toolchain — pointer).
- **Judgment / tribal** → a code pattern is only a CLUE. ASK the user
  whether it is a required convention. Once confirmed, prefer a project doc
  over a rule (see Step 3).
- **Procedure / build-step structure** → hand to skill-writing.
- **Must-never / agent-behavior / file-generator** → paste-ready pointer.
- **Conflict** → authority order settles cross-tier drift silently; ask the
  user only on a same-tier tie. Never write a prose precedence rule.
- **Evidence-bounded upgrade** → for a convention that already has evidence
  (documented / code-consistent / user-stated) but is carried sub-optimally
  (e.g. doc- or verbally-enforced yet a tool could enforce it), propose the
  better mechanism for discussion. Only for conventions with existing
  evidence — never pitch a best practice the project shows no sign of caring
  about.

## Step 3 — Place judgment conventions (doc first, rule last)

1. Existing fitting doc → add to / correct it; write no rule.
2. No fitting doc but worth persisting → propose creating a conventions doc,
   discuss where (recommend by nature: code conventions → `docs/conventions.md`;
   workflow → `CONTRIBUTING.md`; architecture decision → ADR), create only on
   consent, add an entry-file `@import`/pointer.
3. Short pure agent-behavior constraint → draft a rule via rule-writing.

## Step 4 — Present and execute with consent

Present findings grouped by route, each with why-this-mechanism and the
pre-drafted content/diff; ask each consent as one structured choice
where the platform offers option prompts. On approval:

- **Config / doc** → write diff-first, surgically (never clobber
  hand-written content); a second run produces no further change.
- **Rule** → hand to rule-writing (single write path). Not installed → print
  the draft, mention the install option at most once.
- **Procedure / structure** → hand to skill-writing. Not installed →
  summarize as a pointer.
- **Pointer** → output the paste-ready snippet; do not wire it.

## Commit conventions (an absorbed dimension, not a separate skill)

Detect commit conventions like any other: commitlint config > CONTRIBUTING >
last-20-commit majority. Route them — an explicit commitlint config is
already enforced (nothing to add, point at it); an undocumented but
consistent convention becomes a doc/rule per Step 3. There is no standalone
commit skill; commit is one convention domain codify covers.

## Mistakes to refuse

| Request | Response |
| --- | --- |
| "Just write rules for everything you find" | Most practice routes to config/docs/nothing; rule is the last resort |
| "Infer our conventions from the code and rule them" | A pattern is a clue; I ask before making it a rule |
| "Also set up the git hook / CI / permissions" | Pointer only — those govern agent behavior, out of scope |
| "Put it in the global/personal config" | Project layer only |
