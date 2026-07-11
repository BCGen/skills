# skill-writing (delta)

## ADDED Requirements

### Requirement: Two checkpoints

skill-writing SHALL stop and show its understanding twice, and SHALL wait for the
user each time.

**After interrogation, before naming or drafting**, it restates what it understood
— the job, the steps, the triggers, the artifacts it writes, and the decisions
taken from the answers — and asks what is missing. Interrogation asks one question
at a time, so the user never sees the whole; this is where they do, and it is the
cheapest moment to catch a misunderstanding, because nothing has been written yet.

**After the draft, before the run**, it presents what it wrote and asks for the
go-ahead. A run spends subagent turns, and for an elicitation skill it spends the
user's own time; spending them on a draft the user would have rejected on sight is
waste.

#### Scenario: Understanding is confirmed before drafting

- **WHEN** interrogation has answered everything that would change the output
- **THEN** skill-writing restates the job, steps, triggers, artifacts and decisions,
  asks what is missing, and waits — no name is proposed and no draft is written
  until the user answers

#### Scenario: The draft is confirmed before it is run

- **WHEN** the draft is written
- **THEN** it is presented to the user and the run waits for their go-ahead

### Requirement: A scenario is a use of the skill, not the request for it

A dry-run scenario SHALL be an actual instance of the job the skill does, drawn
from something the user has really encountered. The request that asked for the
skill SHALL NOT be used as the scenario, nor SHALL any material be derived from it:
that request is the specification, and a test built from the specification measures
the draft against the drafter's own understanding, which it cannot fail.

When the user has no real instance to offer, skill-writing SHALL say so plainly
rather than invent one — the triggers were never verified either, and a fabricated
scenario hides that instead of reporting it.

#### Scenario: A skill for shaping ideas

- **WHEN** the skill being authored turns a person's inspiration into a document
- **THEN** it is tested on an inspiration the user has actually had, never on the
  sentence that asked for the skill

#### Scenario: No real instance exists

- **WHEN** the user cannot name a real case to run
- **THEN** skill-writing reports that the draft is unverified rather than inventing
  a case

### Requirement: The live run produces the fixture

For a skill whose job is to elicit from a human, skill-writing SHALL run the live
half first — the user answering its opening questions — and SHALL use the
transcript that run produces as the input the subagent then works from. No
transcript SHALL be fabricated.

A subagent run on an invented transcript is not a smaller version of the test; it
is a different test, of nothing. Running it before the live half also lets the flow
declare itself verified while the half only the user can perform never happened.

#### Scenario: An elicitation skill is verified

- **WHEN** the drafted skill's core is an interview
- **THEN** the user runs the opening turns first, and the subagent's input is the
  transcript that run produced

#### Scenario: A fabricated transcript

- **WHEN** no live run has happened
- **THEN** no transcript is written for the subagent to consume

## MODIFIED Requirements

### Requirement: Naming discipline

The name is the user's decision. skill-writing SHALL propose candidates with their
reasons, or take a name the user offers, and the lookups SHALL inform that decision
rather than make it: a registry that reports a name is free has not decided that it
is the right name, and the user is the one who will type it.

Naming SHALL follow the draft, not precede it: a name is decidable only once the
skill has a shape, and a name proposed earlier lands in the middle of the
interrogation — beside the question about the output artifact — with two naming
threads open at once.

A skill that produces a named artifact has two distinct naming decisions, and they
SHALL NOT share a turn. The artifact's name and location are the user's, governed
by the project's conventions, and are settled with the output-shape question. The
skill's own name is settled after the draft. Each question SHALL say which of the
two it is deciding.

The order for the skill's own name SHALL be:

1. Propose candidates with reasons, or take the user's own, following the
   conventions' naming philosophy (short, apt, gerund for managed-unit tools).
2. Check the name against the skills installed at the destination — a name already
   installed there is a clash wherever the destination is.
3. Check the registry, and only for a skill that will be published publicly. A
   private package, a project, or a personal setup SHALL skip a lookup that cannot
   apply to it.

A failed check returns to step 1 with what it found; exact registry collisions are
surfaced with install counts, and any alternative offered SHALL itself have been
checked. The user settles the name at every pass.

#### Scenario: The name is chosen

- **WHEN** the draft has a shape and needs a name
- **THEN** skill-writing proposes candidates with reasons, the user settles it, and
  only then do the installed-skill and registry checks run

#### Scenario: Collision found

- **WHEN** the name the user settled on, for a skill bound for public publication,
  has an exact match on skills.sh
- **THEN** the collision is reported with install counts, and the alternatives
  offered have themselves been checked — the user chooses again

#### Scenario: Unpublished skill

- **WHEN** authoring a skill that will not be published publicly
- **THEN** no registry lookup runs; only clashes with skills already installed at
  the destination are avoided

#### Scenario: The skill produces a named artifact

- **WHEN** the skill being authored writes a file whose name and location must be
  decided
- **THEN** the artifact's name is settled with the output-shape question and the
  skill's name after the draft, each question saying which one it decides, and
  never both in one turn

### Requirement: The dry run matches the skill's shape

skill-writing SHALL choose the dry-run method by the shape of the skill. A skill
whose value is the conversation itself cannot be dry-run by a subagent — the
subagent has no user to ask, so it plays both sides, and a conversation with an
invented user tests nothing about the questions.

- **A skill that transforms an input into an output**, with no human in the loop,
  is run as written: a fresh-context subagent, against a control.
- **A skill whose job is to elicit from a human** is run in two parts, in this
  order. First the user runs the opening turns themselves — they are present, which
  makes this the cheapest and the only valid test of the questions — while the
  control is the strongest existing alternative given the same opening. The
  transcript that live run produces is then handed to a subagent, which tests the
  part that needs no human: from that transcript, it produces the artifact, which is
  objectively checkable.

#### Scenario: An elicitation skill is dry-run

- **WHEN** the drafted skill's core is an interview with the user
- **THEN** the user runs the opening turns live first, and the subagent then works
  from the transcript that run produced
