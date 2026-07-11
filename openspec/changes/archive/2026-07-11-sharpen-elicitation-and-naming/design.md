# Design: sharpen-elicitation-and-naming

## Context

skill-writing authored its first real skill (`ideas` — interviews a user about a
raw inspiration and writes a non-technical PRD plus a mindmap). The carrier gate,
the duplicate check, and the dry run held up; the control run went straight to
writing a script instead of the document that was asked for, which settled the
skill's right to exist in one run, and three dry-run rounds closed seven gaps no
interview had surfaced.

Two things broke. The interrogation produced menus of parallel options rather than
questions that decide anything, and the authored skill's own interview step
inherited that shape. And the registry collision check, which sits before the
interrogation in the written flow, in practice fires in the middle of it — because
a name is only decidable once the skill has a shape — landing next to the question
about the output artifact, with two naming threads open at once.

## Goals / Non-Goals

**Goals:**

- Teach the shape of a question, not only its subject — for skill-writing's own
  interrogation and for the skills it authors, which copy what it models.
- Separate the two naming decisions structurally, so they cannot share a turn.
- Make the dry-run control the strongest alternative the user actually has.

**Non-Goals:**

- Searching the registry for a better alternative, or recommending a third-party
  install at runtime.
- An eval harness.
- Changing the carrier gate, the dry run, or the way results are reported.

## Decisions

### D1. The elicitation rules live in a reference, and skill-writing obeys them itself

A skill whose job includes drawing something out of a human — an idea, a
requirement, a decision — has a craft, and nothing in the field teaches it.
`grilling` (mattpocock/skills) demonstrates it; the platform's authoring guidance
does not cover it; `skill-creator` and `obra/superpowers` do not either. This is
the rare case where there is no better wheel to lose to.

The rules, kept short enough to be obeyed:

1. **Open on the fork.** Ask first the question whose answer collapses the most
   downstream questions. Observed head-to-head: `grilling` opened with "what is
   this project's position?", whose answer settled accounts, external APIs and
   backend in one move; skill-writing's authored skill opened with "which pain
   point is it?", four parallel options that settled nothing.
2. **Recommend a claim, with its reason.** A neutral label offers nothing to push
   against; an argued position ("A, because the pain is choice overload, not
   missing information — Maps already saturates the information") can be refuted,
   and refusal is where the truth arrives.
3. **A question states what it decides.** Not only the options, but what changes
   depending on the answer. Had the naming questions said "this is about the
   skill's own name, not the file it writes", the mismatch would have surfaced on
   the first turn instead of the third.
4. **Name a contradiction on the spot.** A guardrail against agreeing with both
   sides of an inconsistency.

skill-writing's own Step 4 follows the same file. What it models, the skills it
authors reproduce — that is the mechanism by which the weak interview propagated,
and the same mechanism carries the fix.

### D2. Naming leaves the duplicate check and follows the draft

The duplicate check needs the job; the name needs the shape. Bundling them into one
step forced the name — and the registry lookup — into the middle of the
interrogation, which is exactly where the artifact's name is being discussed.

Step 3 therefore keeps only "does one already exist". Naming and the registry check
become their own step after the draft, where the shape they depend on exists. This
is not merely a reordering for tidiness: it removes the structural collision
between the two naming threads.

Alternatives offered after a collision are themselves checked before being offered
— a rename that lands on another taken name is a second round of the same problem.

### D3. The artifact's name is the user's; the skill's name is the registry's

They are different decisions under different constraints, and the flow already
knows artifacts exist (Step 4 asks for the output's shape). The artifact's name and
location are settled there, with the user's project conventions governing. The
skill's name is settled at D2's naming step, with the registry governing. Neither
question shares a turn with the other, and each says which of the two it is
deciding.

### D4. The control is the strongest alternative the user has, not nothing

A control that is the naked agent answers "is this better than nothing". The useful
question is "is this better than what I already have". The failure mode is concrete:
the user already had `grilling` installed, and the authored skill's interview step
was worse than it — a comparison against nothing could not reveal that.

The overlap is at the level of a **step**, not the whole skill: `grilling` does not
do `ideas`'s job (it produces consensus, not a document), it does one of its steps
better. So the comparison runs once the draft's steps are known, over the skills
installed at the destination, and where one already does a step better it becomes
the control for that step and sets the bar the draft must meet.

Bounded deliberately: installed skills only. Searching the registry would mean
recommending a third-party install at runtime — a dependency on something we do not
control, and the failure we criticized in `skill-creator`. A skill that cannot be
assumed present cannot be delegated to either: the authored skill carries its own
elicitation, meeting the bar rather than calling out to it.

## Risks / Trade-offs

- **The elicitation rules read as craft, which this package deliberately does not
  compete on** → the exception is explicit: no published guidance covers how a
  skill should interview a human, so there is no stronger wheel being duplicated.
  Everything the platform does cover stays adopted-and-cited in conventions.
- **Step-level comparison costs a pass over the installed skills** → it is a read
  of descriptions, and it runs once, after the steps are known.
- **Moving naming later delays the registry check** → that is the point; a name
  proposed before the skill has a shape was going to be revised anyway.
