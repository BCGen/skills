# Running the draft before trusting it

How to run Step 8, and how to read what comes back.

## Contents

- [Why a run, and not an interview](#why-a-run-and-not-an-interview)
- [Match the method to the skill's shape](#match-the-method-to-the-skills-shape)
- [Choosing the control](#choosing-the-control)
- [Keeping the test honest](#keeping-the-test-honest)
- [Reading the result](#reading-the-result)
- [When a gap will not close](#when-a-gap-will-not-close)

## Why a run, and not an interview

An interview surfaces only the gaps the user knows about. The ones that matter — what
happens when the file is missing, whether the agent invents a threshold nobody gave
it — appear on a run and nowhere else.

A scenario qualifies only if the user says it has actually happened or is about to.
An imagined edge case is not worth plugging, and plugging it lengthens and blunts
the skill. Ask for one in plain words — never recite this rule at the user.

**A scenario is a use of the skill, never the request that asked for it.** "Write me
a skill that turns an inspiration into a PRD" is the specification; the scenario is
an inspiration the user has actually had. Nothing is derived from the request
either: material built from the specification tests the draft against the drafter's
own understanding, and that test cannot fail. When the user has no real case to
offer, say the draft is unverified — do not invent one.

## Match the method to the skill's shape

**A skill that transforms an input into an output**, with no human in the loop:
give the draft to a fresh-context subagent, and run a control. Up to three
scenarios — the main path (always), a missing precondition, and one where the skill
should not fire (the last two for a high-stakes skill). Three is the cap; beyond it
lies an eval harness, which this skill deliberately does not build.

**A skill whose job is to elicit from a human**: the user tests it, **in a fresh
session**, and no subagent is used. A subagent has nobody to ask, so it plays both
sides, and an interview with an invented user tests nothing.

The fresh session is the whole point. This session knows the answers — it wrote the
draft and heard every answer the user gave — so a run here is completed from memory,
and the sentences SKILL.md forgot to write get supplied by a context the real user
will never have. A skill is only tested where nothing is remembered.

So hand it over:

1. **Write the draft to its destination** so it can be invoked by name.
2. **Ask the user to run it in a new session, on a real case**, and to bring back
   what went wrong — a question that was blunt, an artifact that smuggled in a
   technical solution, a diagram that would not render. A live run exercises the
   whole skill: the artifact is written at the end of the same conversation, so they
   see the questions and the output.
3. **Amend from what they bring back, and hand it over again.**

Mechanical checks run against the artifact that session produced — a diagram that
does not parse, a document carrying vocabulary the skill forbids. No subagent is
needed to see that.

## Choosing the control

The control is the strongest alternative the user actually has — not nothing.
"Better than nothing" is a bar the skill clears by existing; "better than what I
already have" is the bar that decides whether it should exist.

Read the **descriptions** of the skills installed at the destination and look for
one that performs a step of the draft. Overlap at the level of the whole job is
what the duplicate check catches; overlap at the level of a single step is not, and
it is the common case — a skill can do one of the drafted steps far better while
doing nothing else the draft does.

**Propose, do not decide.** The agent weighing an installed skill against the draft
is the agent that just wrote the draft: name the candidate, say why it overlaps,
recommend it, and let the user settle it.

**For a skill the user tests live, the control is theirs to run too** — an interview
cannot be conducted by a subagent either. Offer it once, with the candidate and the
reason ("you have `grilling` installed; give it the same opening and compare"), then
drop it. Whether a second session is worth their time is their call, not yours.

When nothing overlaps, say how far you looked ("I read the descriptions of the 12
skills installed here; none touches these steps"), note that the user may name a
control themselves, and proceed with the naked agent — do not block on the answer.
A user-named control need not be a skill; it may be whatever they do today. If they
name a skill that is not installed, say so; do not recommend installing it.

The draft is held to the control's standard. It does not call out to it — an
installed skill cannot be assumed present wherever the authored skill later runs.

## Keeping the test honest

**Read descriptions, never bodies.** A control skill's SKILL.md is never read into
the authoring session. It poisons three things at once: the draft starts echoing
its wording, which is vendoring; the control stops being a control, because the
draft has already absorbed what it was meant to be measured against; and the
context grows for nothing. The control runs as a subagent that loads the skill
itself — only its output comes back. Learning from what a skill does is not
vendoring; copying what it says is.

**The prompt carries no answers.** Use the user's own words for the scenario,
verbatim. Give the control a prompt identical to the skilled run's — the draft's
presence is the only difference. Keep the draft's requirements and success criteria
out of both: they exist to judge the output, and putting them in the prompt hands
them to the control, which then passes a test it should have failed. Show the user
the exact prompt before sending it.

## Reading the result

Show the user what the agent actually produced — the raw output, not a pass/fail
verdict. This is not a presentation preference: the agent grading these runs wrote
the draft, and that bias has no cheap fix short of the eval harness we are not
building. Putting the raw output in front of the user is the safeguard.

- **Where the skilled run improvised** — invented an assumption, hesitated, asked a
  question the skill should have answered — each point marks a sentence SKILL.md
  failed to say. Improvisation on something immaterial (a variable name) is
  reported and does not block.
- **What the control got wrong** is exactly what the skill has to teach. Anything in
  the draft the control already did right is padding — cut it.
- **A control that does as well** means the skill may not need to exist. Say so
  before finalizing; a skill nobody needed still spends context every turn.

## When a gap will not close

Amend and re-run. After two amendments on the same gap, stop — that gap is not one
more sentence away, and adding sentences makes a skill longer and blunter without
fixing it. Put three exits to the user:

1. **Narrow the skill.** Drop the branch the agent keeps improvising on, or split
   it into its own skill. The result is a smaller skill, so the amendment count
   starts over.
2. **Turn the gap into an explicit handoff.** The skill states that on reaching
   this situation the agent stops and asks. The hole becomes handled: the agent no
   longer guesses.
3. **Abandon the skill.** The evidence now says what the carrier gate suspected.

A limitation the user accepts is written into the skill itself. Left in the
conversation, it is forgotten by the next session and the agent guesses anyway.
