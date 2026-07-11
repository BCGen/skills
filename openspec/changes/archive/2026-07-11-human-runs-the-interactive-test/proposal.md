# Proposal: human-runs-the-interactive-test

## Why

Verifying a skill built on interviewing a human was made complicated for no gain.
The flow says the user runs the opening turns, then a subagent works from the
transcript that run produced to test the artifact, against a control.

But a live run already exercises the whole skill. The user answers the questions
and the skill writes the artifact at the end of that same conversation — they have
seen the output. Handing the same transcript to a subagent reproduces work the user
has already watched. And the control cannot be a subagent either, for the same
reason the skill cannot: a control that is itself an interview has nobody to talk
to, so it interviews an invented user.

The two things a subagent was carrying here are better placed elsewhere. Gaps are
found by the user in the live run. Whether the skill beats the alternative is a
question the user answers by running that alternative themselves — which is what
they did, in a second window, and how the weakness was found in the first place.

## What Changes

- **A skill whose job is to elicit from a human is verified by the human, and no
  subagent is used.** They run it end to end, say what was wrong — a blunt
  question, an artifact that smuggled in a technical solution, a broken diagram —
  and the draft is amended and run again.
- **The control for such a skill is run by the user, at their discretion.**
  skill-writing offers it once — "you have `grilling` installed; want to give it the
  same opening and compare?" — and does not block, does not repeat, and does not
  dispatch a subagent to do it.
- **Mechanical checks run against the artifact the live run produced.** A diagram
  that does not parse, a document carrying vocabulary the skill forbids — these are
  checkable without a subagent, on the output the user already has.
- **The subagent dry run stays for skills that transform an input into an output**,
  where there is no human in the loop and it is the right instrument.
- **REMOVED: the live run produces a fixture for a subagent.** The mechanism it was
  written to feed is gone.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: an elicitation skill is verified live by the user with no
  subagent; its control is the user's to run and is offered once; the transcript
  fixture and the subagent tail are removed.

## Non-goals

- No change to how transform skills are dry-run: fresh-context subagent, a control,
  up to three real scenarios.
- No change to the scenario rule (a real use of the skill, never the request that
  asked for it), the amendment cap, or the exits.

## Impact

- `skills/skill-writing/references/dry-run.md` — the elicitation branch collapses to
  a live run.
- `skills/skill-writing/SKILL.md` — unchanged in shape; the pointer already defers.
- `tests/skill-writing/README.md` — the elicitation scenario checks that no subagent
  was dispatched.
