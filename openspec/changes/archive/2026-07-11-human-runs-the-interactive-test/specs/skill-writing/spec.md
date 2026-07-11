# skill-writing (delta)

## MODIFIED Requirements

### Requirement: The dry run matches the skill's shape

skill-writing SHALL choose the dry-run method by the shape of the skill.

- **A skill that transforms an input into an output**, with no human in the loop,
  SHALL be run as written: the draft given to a fresh-context subagent, against a
  control, on up to three real scenarios.
- **A skill whose job is to elicit from a human** SHALL be verified by that human,
  in a fresh session, and SHALL NOT be handed to a subagent. A subagent has nobody
  to ask, so it plays both sides, and an interview with an invented user tests
  nothing.

The fresh session is the point. The authoring session knows the answers — it just
wrote the draft and heard every answer the user gave — so a run there is completed
from memory, and the sentences SKILL.md failed to write are supplied by a context
the real user will never have. A skill is only tested where nothing is remembered.

skill-writing SHALL therefore write the draft to its destination so it can be
invoked, hand the test to the user with what to bring back — a real case to run it
on, and what went wrong: a blunt question, an artifact that smuggled in a technical
solution, a diagram that did not render — and amend from that feedback. Mechanical
checks SHALL run against the artifact that session produced.

#### Scenario: An elicitation skill is verified

- **WHEN** the drafted skill's core is an interview with the user
- **THEN** skill-writing installs the draft at its destination, asks the user to run
  it in a fresh session on a real case, dispatches no subagent, and amends from what
  they bring back

#### Scenario: A transform skill is verified

- **WHEN** the drafted skill takes an input and produces an output with no human in
  the loop
- **THEN** a fresh-context subagent runs it against a control, on real scenarios

### Requirement: The control is proposed, not chosen unilaterally

skill-writing SHALL propose the control with its reasoning and let the user settle
it, rather than concluding alone. The agent judging whether an installed skill
beats the draft is the agent that just wrote the draft.

For a skill verified live by a human, the control SHALL be run by that human, at
their discretion, in the same fresh-session manner: an interview cannot be conducted
by a subagent, and whether a second session is worth their time is theirs to judge.
skill-writing SHALL offer it once — naming the candidate and the reason — and SHALL
NOT block, repeat, or dispatch a subagent to simulate it.

When no installed skill overlaps, skill-writing SHALL say how far it looked (how
many installed skills it read), SHALL tell the user they may name a control
themselves, and SHALL proceed without waiting — a blocking question here would tax
every authoring run. A user-named control need not be a skill; it may be whatever
they do today instead. A named skill that is not installed is reported as such, and
skill-writing SHALL NOT recommend installing a third-party skill on its own
initiative.

#### Scenario: No overlap found

- **WHEN** no installed skill performs any of the drafted steps
- **THEN** skill-writing states the scan's scope, notes that the user may name a
  control, and proceeds

#### Scenario: A candidate exists for a live-run skill

- **WHEN** an installed skill would make a fitting control for a skill the user is
  verifying in a fresh session
- **THEN** skill-writing names it once and leaves the run to the user, dispatching
  no subagent

## REMOVED Requirements

### Requirement: The live run produces the fixture

**Reason**: The mechanism it fed is gone. A live run already exercises the whole
skill — the artifact is written at the end of the same conversation the user is
having — so a subagent replaying the transcript reproduces work the user has just
watched. Keeping the subagent required three guards (the transcript had to be real,
the subagent had to be framed so it would not try to interview, the prompt had to
carry the task without the criteria); all three existed only because the mechanism
did.

**Migration**: An elicitation skill is verified by the human who runs it, in a fresh
session, and its control is run by that human at their discretion. The subagent dry
run remains for skills that transform an input into an output.
