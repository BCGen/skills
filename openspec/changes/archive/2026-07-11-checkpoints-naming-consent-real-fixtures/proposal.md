# Proposal: checkpoints-naming-consent-real-fixtures

## Why

The second authoring run exposed three faults, all of the same kind: skill-writing
decides things that are the user's to decide, and it verifies against material it
made up.

**It never shows its understanding.** Interrogation is a sequence of single
questions, so the user never sees the whole. It went from the last question
straight into naming and drafting, and the user only saw the shape of what had been
understood after it was already written.

**It named the skill itself.** It ran the registry check, found nothing, and used
the name. But the name is what the user will type; a lookup informs a proposal, it
does not confer the decision.

**It verified against a transcript it invented.** For an elicitation skill it
correctly declined to let a subagent play both sides — then wrote a synthetic
interview transcript, derived from the request that had asked for the skill, and
tested the draft against that. The live half of the test, the half only the user
can run, never happened. A fabricated fixture tests the draft against the drafter's
own assumptions, which it will always pass.

## What Changes

- **Two checkpoints.** After interrogation, skill-writing restates what it
  understood — the job, the steps, the triggers, the artifacts, the decisions taken
  — and asks what is missing, before anything is named or drafted. After the draft,
  it presents what it wrote and gets the go-ahead before running it.
- **The user names the skill.** skill-writing proposes candidates with reasons, or
  takes the user's own name. Once the user has settled on one, it is checked against
  the skills installed on the machine, and then — only for a skill that will be
  published — against the registry. Checks inform the choice; they do not make it.
- **A dry-run scenario is a real use of the skill, never the request that asked for
  it.** "Write me a skill that collects ideas" is not an idea; it is the
  specification. The scenario is an actual instance of the skill's job, drawn from
  something the user has really had.
- **An elicitation skill is run live before it is run by a subagent, and the live
  run produces the fixture.** The user runs the opening turns themselves — that is
  the test of the questions, and only they can perform it. The transcript that run
  produces is what the subagent then consumes to test the artifact. No fixture is
  invented.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: adds the two confirmation checkpoints; makes the name the user's
  decision with the checks ordered behind it; forbids fabricated fixtures and makes
  the live run of an elicitation skill produce the fixture the subagent uses.

## Non-goals

- No change to the carrier gate, the interrogation subjects, the conventions, or
  the amendment cap.
- No eval harness.

## Impact

- `skills/skill-writing/SKILL.md` — two checkpoints; naming becomes a proposal.
- `skills/skill-writing/references/dry-run.md` — real scenarios, live-run-first, the
  fixture comes from the live run.
- `skills/skill-writing/references/conventions.md` — the naming order.
- `tests/skill-writing/README.md` — scenarios for all three.
