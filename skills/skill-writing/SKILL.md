---
name: skill-writing
description: Authors a new skill - for a skills package, a project, or your personal setup - checking that a skill is the right carrier, that one does not already exist, interrogating the procedure for the gaps the user did not mention, drafting to the platform's authoring rules, and running the draft against a control before it is finalized. Also edits an existing skill. Use when the user wants to create, write, add, or fix a skill, or when another skill (codify, retro) hands over a multi-step procedure to capture as a skill.
---

# Skill Writing

Author a skill that survives contact with reality — in a package, a project, or a
personal setup. Read [references/conventions.md](references/conventions.md) before
drafting. Effort scales with what it costs when the skill is wrong: rework earns a
short path, legal or destructive consequence earns every step, and a process heavier
than the skill deserves is one people route around. These rules are yours, not the
user's — ask in their terms, never recite them back.

## Step 1 — Is a skill the right carrier?

Ask once, with a recommended answer: could a config, a lint rule, or a single
project rule carry this instead? If so, name that carrier before drafting anything;
a user who still wants a skill gets one. Skip this when codify or retro hands the
work over — the routing table already decided.

## Step 2 — Gather

Establish only what the user alone can answer; infer the rest (whether a script is
needed is your call, not theirs):

- The concrete use cases. Ask what the agent got wrong without the skill — triggers
  come from real failures.
- Where it lives: a package's `skills/`, the project's `.claude/skills/<name>/`
  (`.agents/` as the portable fallback), or the user's global directory. Recommend
  from context; ask only if ambiguous.
- Invocation mode (see conventions): must the agent or a sibling skill reach it
  unaided, or does it only fire by hand?
- **What it costs when this skill is confidently wrong** — this sets the depth of
  everything below.

## Step 3 — Does one already exist?

Read the **descriptions** — never the bodies — of the skills installed at the
destination. If one covers this job, name it and offer to edit it instead, before the
user is interrogated about a skill they already own. No name is proposed here: this
needs the job, not the name.

## Step 4 — Press the premise

The nouns in the opening request — the artifact, its format, its language, the name of
the process — are **proposals**, not requirements: the vocabulary the user arrived with.
Give each one alternative to push against, with a reason, once. A question asked inside
a premise never reaches the premise, and you may not do to the request what you may not
do to an answer — take it as given. Settle here, too, whether the skill **opens** a
space, **closes** one, or does both: both is allowed as two named phases in order,
generative first, but a request that silently wants both — roam freely *and* produce
something buildable — carries a contradiction that surfaces later as a rewrite.

## Step 5 — Interrogate the procedure

Read [references/eliciting.md](references/eliciting.md) now — how to ask, and what to
establish. It also goes into any skill you author that interviews a user, whose
interview mode (pressing a claim vs drawing out something half-formed) it must settle.

The user describes what they do; **what they omit is what breaks**. Ask only where an
answer changes the output. The artifact's name is settled here and is the user's; the
skill's own name is Step 8's, and the two never share a turn.

## Step 6 — Show what you understood

One question at a time means the user never sees the whole. Lay it out — the job, the
steps, the triggers, what it writes, the decisions their answers settled — and ask what
is missing. **Wait.** Nothing is named or drafted until they answer.

**A premise the user later overturns brings you back here.** Say which decisions are
now void and which survive, renegotiate them, and do not reshape the draft to fit the
new premise — the decisions built on the old one were built *because* of it.

## Step 7 — Draft

Write SKILL.md at the destination, per conventions; scripts only for deterministic
operations. Show it, and wait for the go-ahead before running it — a run spends
subagent turns and, for an interview skill, the user's own time.

## Step 8 — Name it

A name needs a shape, which is why it waits until now. **The user names it**, not
you: propose candidates with your reasons, or take theirs. Then check — installed
skills first, the registry second and only when the skill will be published. A
lookup says a name is free; it does not say it is right.

## Step 9 — Run it before you trust it

Read [references/dry-run.md](references/dry-run.md) now — the method for each skill
shape, how to choose the control, how to keep the test honest, and what to do when a
gap will not close. **The scenario is a real use of the skill, never the request that
asked for it.** The draft runs against a **control** — the strongest alternative the
user already has — and what that control gets wrong is what the skill has to teach.

## Step 10 — Done, and hand back

Finished means all three: conventions satisfied; the main-path run free of
improvisation that would change the output; the user has seen the real output and
accepted it. Then say where it landed, how it fires, and whether to commit it. A
durable regression plan is skill-testing's job — mention it once.
**Editing an existing skill** runs the same flow without Steps 3 and 8, re-running
Step 9 on the scenario the edit was meant to fix.
