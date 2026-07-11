# skill-writing (delta)

## ADDED Requirements

### Requirement: The premise is pressed before the procedure

skill-writing SHALL press the nouns of the user's opening request before it
interrogates the procedure they describe. The artifact, its format, its language, and
the name of the process are proposals — the vocabulary the user arrived with — and a
question asked inside a premise can never reach the premise.

Each such noun SHALL be given one concrete alternative to push against, with a reason,
and SHALL be pressed once. A user who keeps their premise keeps it and the flow
continues: what matters is that they chose it rather than inheriting it from their own
first sentence.

The agent SHALL NOT do to the request what it is forbidden to do to an answer — accept
it as given.

#### Scenario: The request names an artifact

- **WHEN** the opening request names an output ("a PRD", "a mindmap")
- **THEN** each is offered a concrete alternative to react against before the procedure
  is interrogated, and the choice is the user's

#### Scenario: The user keeps the premise

- **WHEN** the user hears the alternative and keeps what they said
- **THEN** it is not raised again, and the flow moves on

### Requirement: Divergent or convergent is settled early

skill-writing SHALL establish whether the skill being authored opens a space, closes
one, or does both, as part of pressing the premise. A skill may do both — several
legitimately must — but only as two named phases in order, generative first, with a
boundary between them.

An opening request that silently wants both carries a contradiction: roaming freely and
producing a buildable specification are not the same skill, and the contradiction
surfaces later as a rewrite. An unmapped space collapses under pressure.

#### Scenario: The request wants both without noticing

- **WHEN** the opening request asks for free exploration and for an output that could be
  built from
- **THEN** skill-writing names the tension and settles it before drafting — one, or both
  as ordered phases

### Requirement: A premise that falls voids what was built on it

When the user overturns a premise, skill-writing SHALL return to the understanding
checkpoint rather than edit the draft to fit. It SHALL name which decisions no longer
stand, which survive, and renegotiate them.

Decisions made downstream of a premise were made because of it. Quietly reshaping the
draft around the new premise keeps the dead decisions alive and hides them.

#### Scenario: A premise is overturned mid-flow

- **WHEN** the user rejects a premise the draft was built on
- **THEN** skill-writing stops, returns to the checkpoint, states what is void and what
  survives, and does not touch the draft until they are renegotiated
