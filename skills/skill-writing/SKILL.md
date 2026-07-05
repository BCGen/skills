---
name: skill-writing
description: Authors a new skill to this collection's standard - gathering requirements, drafting SKILL.md with enforced conventions, collision-checking the name, and scaffolding an acceptance test plan. Use when the user wants to create, write, or add a new skill to the collection.
---

# Skill Writing

Author a new skill that meets the collection's standard the first time.
Conventions live in [references/conventions.md](references/conventions.md)
— read it; it is the same file skill-auditing checks against.

## Step 1 — Gather requirements

Before drafting, establish (ask when unstated — never invent):

- What task or domain does the skill cover?
- The concrete use cases, so the "Use when ..." triggers come from real
  situations, not guesses.
- Does it need executable scripts (deterministic ops only) or just
  instructions?
- Any reference material or existing skill it relates to.

## Step 2 — Name and collision-check

Propose a name in the right family (gerund for managed-unit tools, short
for standalone acts — see conventions). Then check skills.sh:

```sh
npx skills find "<name>"   # look for an exact @<name> match
```

An exact collision → report it with its install count and offer
alternatives before continuing.

## Step 3 — Draft

Create `skills/<name>/SKILL.md` per conventions: frontmatter (name ==
directory, capability + "Use when" ≤1024 chars), body ≤100 lines with
detail split into `references/`, English only, original content, numbered
steps. Add scripts only for deterministic operations.

## Step 4 — Scaffold acceptance

Write `tests/<name>/README.md`: scenarios plus mechanical checks
(grep/regex/count/diff) that skill-testing can run. Design these with the
skill, not after — if a rule can't be mechanically checked, either sharpen
the SKILL.md or record it as needing human review.

## Step 5 — Review and verify

Present the draft and test plan for the user's review. On approval, verify
with the **skill-testing** skill when installed. If skill-testing is not
installed, leave the test plan as a manual checklist and mention the
install option at most once.

## Review checklist

| Check | Requirement |
| --- | --- |
| name == directory | frontmatter matches folder |
| description shape | capability sentence + "Use when ..." ≤1024 chars |
| body length | ≤100 lines; detail in references/ |
| English only | no CJK anywhere |
| triggers | derived from gathered use cases |
| originality | authored here, nothing vendored |
| acceptance | `tests/<name>/README.md` with mechanical checks |
