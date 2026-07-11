# Design: human-runs-the-interactive-test

## Context

Two changes ago, the dry run learned that a subagent cannot test a skill built on
interviewing a human — it has nobody to ask, so it plays both sides. The response
was to split the test: the user runs the opening turns, and a subagent works from
the resulting transcript to test the artifact.

That split kept the subagent because the surrounding design assumed one. It is not
needed, and keeping it created a mechanism that then had to be defended against
fabricated transcripts, smuggled criteria, and framing instructions to stop the
subagent from trying to interview.

## Goals / Non-Goals

**Goals:**

- Verify an elicitation skill the only way it can be verified — by a person using
  it — and remove the machinery built around a subagent that cannot.
- Leave the control in place as a question, with the user as the one who answers it.

**Non-Goals:**

- Changing the dry run for transform skills, where a subagent is the right tool.
- Removing the control as a concept. "Does this beat what I already have" still
  decides whether the skill should exist.

## Decisions

### D1. A live run already exercises the whole skill

The artifact is produced at the end of the same conversation the user is having.
They watch the questions and they read the output. There is nothing left for a
subagent to reproduce from a transcript of the run they just sat through.

The gaps a subagent was supposed to surface — where the agent improvises, where the
output goes wrong — are visible to the user in the run itself, and more reliably,
because they know what they meant.

### D2. The control for an interactive skill is interactive, so the user runs it

A control that is itself an interview cannot be delegated to a subagent for exactly
the reason the skill cannot. And whether the comparison is worth a second session is
the user's call, not the flow's: they know what they have installed and what their
time is worth.

skill-writing offers it once, names the candidate and the reason, and drops it. This
is how the weakness in the first authored skill was actually found — the user ran
the alternative in a second window and compared. The flow should support that, not
simulate it.

### D3. Removing a mechanism beats defending it

The transcript fixture needed three guards: it had to be real (not fabricated), the
subagent had to be framed so it would not try to interview, and the prompt had to
carry the task without carrying the criteria. Each guard was correct; all three
exist only because the mechanism does.

This is the skill's own rule applied to itself: when a gap will not close by adding
sentences, narrow the thing rather than defend it.

## Risks / Trade-offs

- **The user may skip the control and lose the evidence that the skill deserves to
  exist** → the offer is made once and names the candidate. For an interactive
  skill, the person who ran it is also the person best placed to know whether it beat
  what they had.
- **A live run covers one path** → true of the subagent version too, and the
  improvisation signal still surfaces what the draft failed to say.
- **The user's time is now on the critical path** → it already was. The alternative
  was measuring nothing.
