---
name: skill-auditing
description: Audits any skills directory on three layers - format against shared authoring conventions, content facts (commands, APIs, versions) against live documentation, and rules that never changed the model's behavior - reporting per-layer findings with sources. Use when asked to audit, review, or check whether skills are outdated, stale, bloated, or still correct.
---

# Skill Auditing

Find what has gone wrong in a set of skills — on three independent layers,
reported separately. A skill decays in two directions: a **stale** rule was
right and stopped being right; a **no-op** rule was never load-bearing at all,
and it spends context on every load while blunting the rules that do teach.

## Step 1 — Pick the target

Default to the current project's installed skills (`.claude/skills/`,
`.agents/skills/`, or the repo's `skills/`). Accept any directory path the
user names, including a skills package's own `skills/`.

## Step 2 — Format layer (offline)

For each skill, check the authoring conventions: frontmatter carries only keys the
Agent Skills spec allows and name == directory; description is a capability sentence
plus a "Use when ..." sentence, third person, ≤1024 chars, no angle brackets; body
≤100 lines with detail in references/; references sit one level below SKILL.md and
their links resolve; a reference past 100 lines carries a table of contents; English
only. Report each violation with file and line.

Where the destination ships a validator, RUN it rather than check by eye — this
package's own `pnpm lint`, or the spec's reference validator (`skills-ref validate
<dir>`) where Python is available. Neither is guaranteed, so the rules above stand on
their own.

## Step 3 — Content layer (live)

Extract the concrete factual claims a skill makes — commands, flags, API
calls, config keys, file paths, version numbers — and verify each against
current official documentation (web search / doc fetch; for library docs
prefer the docs tooling). Classify each:

- **confirmed** — matches current docs.
- **outdated** — current docs contradict it; cite the doc as the source.
- **unverifiable** — cannot confirm or deny from available sources; say so,
  never guess.

## Step 4 — No-op layer (offline)

For each rule in a skill, ask whether the model would have followed it anyway.
**The agent's report of its own defaults is not evidence** — asked "would you do
this anyway?", it agrees with confidence and is often wrong; the line gets cut
and the behavior goes with it. Settle it in this order:

1. **Provenance** — does the rule name the failure it was written for? A rule
   bought by an observed failure is kept, even where the model usually gets it
   right; "usually" is what the rule covers. A rule naming none is a candidate.
2. **A deletion run** — for a contested candidate, remove the line, run the skill
   on a real scenario, and see whether behavior changes. Expensive, so reserve it
   for lines worth arguing about.
3. **Neither** — report it as a candidate with the reasoning. A candidate is not a
   defect.

One case needs no judgment: a body passage that **restates a reference the body
itself tells the agent to read at that point**. The reference is already in
context, and the conventions require one home per fact.

## Step 5 — Report and route fixes

Three sections: format, content, no-ops. Each finding: the skill, the location,
the severity, and the evidence or source. **Apply an approved fix in place** — you
hold the evidence the edit rests on, and editing a SKILL.md needs no delegate. A
finding the user declines stays a proposal: leave the exact edit in the report and
write nothing.

## Principles

| Principle | Meaning |
| --- | --- |
| Layers never merged | Format (offline), content (live, factual), and no-ops (offline, evidence-based) are reported separately. |
| Introspection is not evidence | A no-op finding rests on provenance or a deletion run, never on the agent's account of its own defaults. |
| Cite sources | Every "outdated" finding names the doc that contradicts the skill. |
| Honesty over coverage | What can't be verified is listed as unverifiable, not guessed. |
| Nothing lands unapproved | Every finding is proposed first; an approved fix is applied in place, a declined one is not written. |

The repo's own CI lint stays the enforcement gate; skill-auditing is the
user-facing, any-directory diagnostic that also checks content facts CI
cannot.
