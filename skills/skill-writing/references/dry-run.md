# Running the draft before trusting it

How to run Step 6, and how to read what comes back.

## Why a run, and not an interview

An interview only surfaces the gaps the user knows about. The gaps that matter are
the ones they cannot describe — what happens when the file is missing, whether the
agent will invent a threshold nobody gave it. Those appear on a run and nowhere
else.

## The runs

Give the draft SKILL.md to a fresh-context subagent as its instructions, and give
it the scenario as its task. A scenario qualifies only if the user says it has
actually happened or is about to; an imagined edge case is not worth plugging, and
plugging it lengthens and blunts the skill.

| Run | When |
| --- | --- |
| Main path, with the draft | Always |
| Main path, WITHOUT the draft (control) | Unless the skill is low-stakes |
| A precondition is absent | High stakes |
| The skill should NOT fire | High stakes |

Three scenarios is the cap. Beyond it lies an eval harness, which this skill
deliberately does not build.

## Reading the result

Show the user what the agent actually produced — not a pass/fail verdict, which
only moves the judgment back to you.

- **Where the skilled run improvised** — invented an assumption, hesitated, asked
  a question the skill should have answered — each point marks a sentence SKILL.md
  failed to say. Improvisation on something immaterial (a variable name) is
  reported and does not block.
- **What the control got wrong** is exactly what the skill has to teach. Anything
  in the draft that the control already did right is padding — cut it.
- **A control that does as well as the skilled run** means the skill may not need
  to exist. Say so before finalizing; a skill nobody needed still spends context
  every turn.

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
