---
name: skill-writing
description: Authors a new skill - for a skills package, a project, or your personal setup - checking that a skill is the right carrier, that one does not already exist, interrogating the procedure for the gaps the user did not mention, drafting to the platform's authoring rules, and running the draft against a control before it is finalized. Also edits an existing skill. Use when the user wants to create, write, add, or fix a skill, or when another skill (codify, retro) hands over a multi-step procedure to capture as a skill.
---

# Skill Writing

Author a skill that survives contact with reality — in a package, a project, or a
personal setup. Conventions live in
[references/conventions.md](references/conventions.md) — read it before drafting;
skill-auditing checks against the same file. Effort scales with what it costs when
the skill is wrong: rework earns a short path, legal or destructive consequence
earns every step. A process heavier than the skill deserves is one people route
around. These rules are yours, not the user's — ask in their terms, never recite
the rules back at them.

## Step 1 — Is a skill the right carrier?

Ask once, with a recommended answer: could a config, a lint rule, or a single
project rule carry this instead? If so, name that carrier before drafting anything;
a user who still wants a skill gets one. Skip this step when codify or retro hands
the work over — the shared routing table already decided.

## Step 2 — Gather

Establish only what the user alone can answer; infer the rest (whether a script is
needed is your call, not theirs):

- The concrete use cases. Ask what the agent got wrong without the skill, and what
  that looked like — triggers come from real failures.
- Where it lives: a package's `skills/`, the project's skill directory
  (`.claude/skills/<name>/`, or `.agents/skills/<name>/` as the portable fallback),
  or the user's global directory. Recommend from context; ask only if ambiguous.
- Invocation mode: must the agent or a sibling skill reach it unaided, or does it
  only fire by hand? Hand-only means `disable-model-invocation: true` and no
  standing context cost.
- **What it costs when this skill is confidently wrong** — this sets the depth of
  everything below.
- The destination's language, when the project's own writing does not settle it.

## Step 3 — Does one already exist?

Read the **descriptions** — never the bodies — of the skills installed at the
destination. If one covers this job, name it and offer to edit it instead, before
the user is interrogated about a skill they already own. No name is proposed here
and no registry lookup fires: this check needs the job, not the name.

## Step 4 — Interrogate the procedure

Read [references/eliciting.md](references/eliciting.md) — it governs how you ask,
and it goes into any skill you author that interviews a user.

The user describes what they do; what they omit is what breaks. Establish, only
where an answer would change the output:

- The completion criterion for each step, stated so it can be checked.
- What to do when a precondition is absent (file missing, command fails).
- Whether a failed step blocks or warns.
- When the skill should NOT fire.
- The shape of the output artifact — **including the name and location of any file
  it writes**. That name is the user's; the skill's own name is Step 6's, and the
  two never share a turn.
- Which tools or data it depends on, and what it does when they are absent.

Then draw out the tacit step: "last time you did this by hand, what did you skip
or add from experience?" That is the step the agent will get wrong.

## Step 5 — Draft

Write SKILL.md at the destination, per conventions. Scripts only for deterministic
operations.

## Step 6 — Name it

A name needs a shape, which is why it waits until now. Name it per the conventions,
which carry the registry check for a skill bound for public publication.

## Step 7 — Run it before you trust it

Read [references/dry-run.md](references/dry-run.md) now — it carries the method for
each skill shape, how to choose the control, how to keep the test honest, and what
to do when a gap will not close.

The draft is run against a **control**: the strongest alternative the user already
has. **What the control gets wrong is what the skill has to teach**; the rest is
padding. **Where the run improvised, a sentence is missing.** Show the user the real
output and these two things — never a verdict.

## Step 8 — Done, and hand back

Finished means all three: conventions satisfied; the main-path run free of
improvisation that would change the output; the user has seen the real output and
accepted it. Then say where it landed, how it fires (by the agent, or by hand under
what name), and whether to commit it for the team. A durable regression plan is
skill-testing's job — mention it once.

## Editing an existing skill

Same conventions, no naming or registry step. Re-run Step 7 on the scenario the
edit was meant to fix.
