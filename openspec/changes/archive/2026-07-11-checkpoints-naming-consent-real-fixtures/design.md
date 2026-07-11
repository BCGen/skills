# Design: checkpoints-naming-consent-real-fixtures

## Context

The second real authoring run (`ideas` / `idea-shaping`) went further than the
first: the carrier gate held, the interrogation was sharper, and the run correctly
recognised that a skill built on interviewing a human cannot be handed whole to a
subagent. It then failed in three places, and all three have one root: the flow
lets the agent settle what belongs to the user, and lets it verify against material
it produced itself.

## Goals / Non-Goals

**Goals:**

- Give the user a view of the whole before it is built, and again before it is run.
- Return the naming decision to the user; keep the lookups as inputs to it.
- Ensure a dry run tests the draft against reality, not against the drafter.

**Non-Goals:**

- Any change to the carrier gate, the interrogation subjects, or the amendment cap.
- An eval harness.

## Decisions

### D1. Two checkpoints, because a sequence of questions hides the whole

Interrogation asks one question at a time — which is right, and which means the
user never sees the assembled picture. The agent holds it; the user answers
fragments. So the flow shows it back twice.

**After interrogation, before naming or drafting:** restate the job, the steps,
the triggers, the artifacts, and the decisions taken from the answers, and ask what
is missing. This is the cheapest possible moment to catch a misunderstanding — the
draft does not exist yet.

**After the draft, before the run:** present what was written and get the go-ahead.
The run costs subagent turns and, for an elicitation skill, the user's own time;
spending them on a draft the user would have rejected on sight is waste.

Neither checkpoint is a formality. Each asks a question — "what is missing?", "run
it?" — and waits.

### D2. The name is the user's; the lookups inform it

The registry check answers "is this name taken". It does not answer "is this the
name". The user types this name for the rest of its life.

The order follows from that:

1. **Propose** candidates with reasons, or take a name the user offers.
2. **Check the machine** — a name already installed at the destination is a clash
   whatever the destination is.
3. **Check the registry** — only for a skill that will be published publicly; a
   private package, a project, or a personal skill skips a lookup that cannot apply
   to it.

A failed check sends it back to step 1 with what was learned, and any alternative
offered has itself been checked. The decision stays with the user throughout.

### D3. A scenario is a use of the skill, not the request for it

The run under review took the sentence that had asked for the skill — "write me a
skill that collects a person's inspiration and turns it into a PRD" — and built its
test material from it. That is the specification, not an instance. A skill that
shapes ideas is tested on an idea the user has actually had; a skill that reviews
PRs is tested on a PR that exists.

The distinction matters because a scenario derived from the specification tests the
draft against the drafter's own understanding, and that test cannot fail.

### D4. The live run produces the fixture

For an elicitation skill, the previous change already said the user runs the opening
turns and the subagent tests the artifact. What it did not say is where the
subagent's input comes from — so the run invented a transcript.

It comes from the live run. The user's real opening turns produce a real transcript,
and that transcript is what the subagent consumes. One move, two problems solved:
the half of the test only the user can perform actually happens, and the material
for the other half is real.

The order is therefore fixed: live first, subagent second. A subagent run on an
invented transcript, performed before the live run, is not a smaller version of the
test — it is a different test, of nothing.

## Risks / Trade-offs

- **Two checkpoints add turns** → they replace far more expensive rework; the first
  one is a summary the agent already holds, and the second is a single question.
- **Waiting on the user to run the opening turns stalls the flow** → that is the
  cost of testing an interview at all. The alternative measured nothing.
- **A user with no real scenario to offer** → then the triggers were never verified
  either; say so plainly rather than inventing one.
