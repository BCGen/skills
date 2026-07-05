---
name: rule-writing
description: Creates, edits, or removes a single project rule in the agent's native rule format, enforcing a non-discoverability admission filter and a hard rule budget with provenance stamping. Use when the user asks to add, change, or delete a project rule, or when another skill hands over a drafted rule.
---

# Rule Writing

The single write path for rule files. One invocation = one rule added,
edited, or removed. Full format details, budgets, and dialect mapping live
in [references/rule-format-spec.md](references/rule-format-spec.md) — read
it before writing.

## Step 1 — Understand the request

Collect: the rule text (draft from the user or a calling skill), its scope
(project-wide or specific paths), and its evidence. If the intent is unclear,
ask one question with a recommended answer.

## Step 2 — Admission filter

Reject the draft, stating which test failed, unless it is at least one of:

- **Non-discoverable** from the repo (landmine, tribal convention), or
- **Mistake-correcting** with observed evidence.

Hard rejections: restates linter/formatter/typechecker config; restates
something readable from the code; vague virtue ("write clean code").
Offer to rewrite a rejected draft into a passing, verifiable form when
possible.

## Step 3 — Detect the target

Look for `.claude/` (Claude Code), `.cursor/` (Cursor), `AGENTS.md`
(fallback). Zero or multiple candidates → ask one question, recommending
`AGENTS.md` as the portable default. Emit the dialect per the spec.

## Step 4 — Enforce the budget

Compute resident usage per the spec (entry file + unscoped rules; content
lines only). Then:

- **< 80%** → proceed.
- **≥ 80%** → warn with the numbers; prefer path-scoping this rule if its
  subject maps to specific files.
- **= 100% or would exceed** → refuse, list removal/merge candidates
  (stale provenance, overlapping subjects), and only write if the user
  removes or merges one in the same operation.

## Step 5 — Write (itemized only)

- Add: create the rule file (or one `###` entry inside the `AGENTS.md`
  managed block). Never touch neighboring content.
- Edit / remove: modify or delete exactly the named rule.
- Stamp the provenance comment (`date · task · evidence · via`).
- Rules ≤ 20 content lines; split or tighten anything longer.
- Never rewrite a whole file or block wholesale.

## Step 6 — Report

One short confirmation: rule path, scope (resident or path-scoped), and
budget usage after the write (e.g. "resident 92/150 lines"). If invoked by
another skill (e.g. retro), also return the rule path so the
caller can update its records.

## Mistakes to refuse

| Request | Response |
| --- | --- |
| "Add these 5 rules at once" | One rule per invocation — propose an order |
| "Just append it, skip the filter" | Filter is non-negotiable; explain why |
| "Rewrite the rules file to be cleaner" | Itemized edits only; offer per-rule merges |
| A rule duplicating an existing one | Point to the existing rule; offer an edit instead |
