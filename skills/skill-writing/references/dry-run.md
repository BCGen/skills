# Running the draft before you trust it

An interview surfaces only the gaps the user knows about. Whether the agent invents a
threshold nobody gave it appears on a run and nowhere else.

## Contents

- [The control depends on the path](#the-control-depends-on-the-path)
- [Choosing the control](#choosing-the-control)
- [Method by shape](#method-by-shape)
- [Keeping it honest](#keeping-it-honest)
- [Reading the result](#reading-the-result)
- [When a gap will not close](#when-a-gap-will-not-close)

## The control depends on the path

**A new skill** runs against the strongest alternative the user already has. *Better than
nothing* is a bar it clears by existing; *better than what I already have* is the bar that
decides whether it should exist.

**An edit runs against the skill as it stood before the edit**, on the scenario the edit was
written to fix.

This is the whole point. Comparing an edited skill to a naked agent re-asks a question settled
at birth — and the skill already won it — so **every edit passes a test it cannot fail**. That
is how an instruction surface doubles while every step stays legal.

> **Behavior unchanged on its own scenario ⇒ the edit taught nothing ⇒ it does not land.**

The scenario is chosen by the edit's purpose, so it necessarily exercises the edit.

## Choosing the control

Read the **descriptions** of what is installed — never a body — and look for one that performs
a step of the draft. A body read into this session poisons three things: the draft starts
echoing its wording, which is vendoring; the control stops being a control, having already been
absorbed; and the context grows for nothing. The control runs as a subagent that loads the
skill itself; only its output returns.

**The duplicate candidate and the control may be the same skill.** Say so — if it wins, the
draft is the duplicate the check suspected.

**Propose, do not decide.** The agent weighing an installed skill against the draft just wrote
the draft. Name the candidate, say why it overlaps, recommend it, let the user settle it. When
nothing overlaps, say how far you looked, note they may name a control themselves (it need not
be a skill), and proceed with the naked agent rather than blocking.

The draft is held to the control's standard; it does not call out to it. An installed skill
cannot be assumed present wherever the authored skill later runs.

## Method by shape

**Input → output, no human in the loop**: a fresh-context subagent, plus the control. Up to
three scenarios — main path always; a missing precondition and a should-not-fire only when the
stakes are high.

**A skill whose job is to elicit from a human**: **the user tests it, in a fresh session**. No
subagent — it has nobody to ask, so it plays both sides, and an interview with an invented user
tests nothing. Write the draft to its destination, ask them to run it on a real case and bring
back what broke, amend, hand it back. Their control is theirs to run too: offer it once, then
drop it.

The fresh context is the point. This session heard every answer, so a run here is completed
from memory, and the sentences SKILL.md forgot get supplied by a context the real user will
never have.

**The scenario is a use of the skill, never the request that asked for it.** "Write me a skill
that turns an inspiration into a PRD" is the specification; the scenario is an inspiration they
actually had. Material derived from the specification tests the draft against the drafter's own
understanding — a test that cannot fail. No real case → say the draft is unverified. Do not
invent one.

## Keeping it honest

**The prompt carries no answers.** The user's own words, verbatim. The control's prompt is
identical — the draft's presence is the only difference. Keep the draft's requirements and
success criteria out of both: they exist to judge the output, and in the prompt they hand the
control a test it should have failed. Show the user the exact prompt first.

**Run the same input twice.** A difference in the output is an underspecification in the draft,
not an error by the model.

## Reading the result

Show the **raw output**, not a verdict. The agent grading these runs wrote the draft, and that
bias has no cheap fix.

- **Where the skilled run improvised** — an invented assumption, a question the skill should
  have answered — each marks a sentence SKILL.md failed to write. Immaterial improvisation is
  reported and does not block.
- **What the control got wrong** is what the skill has to teach.
- **What the control got right, the draft need not say.** Every step it performed correctly
  without being told is padding — cut it. This signal is free; no extra run buys it.
- **A control that does as well means the skill may not need to exist.** Say so before
  finalizing.

## When a gap will not close

Amend and re-run, capped at two further runs on the same gap. Past that it is not one sentence
away, and more sentences make a skill longer and blunter without fixing it. Put three exits:

1. **Narrow it** — drop the branch it keeps improvising on, or split it out. Smaller skill, so
   the count starts over.
2. **Make the gap an explicit handoff** — the skill says that here, the agent stops and asks.
   The hole becomes handled.
3. **Abandon it** — the evidence now says what the decomposition suspected.

A limitation the user accepts is written into the skill. Left in the conversation it is
forgotten, and the next agent guesses anyway.
