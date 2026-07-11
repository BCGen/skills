# skill-writing (delta)

## ADDED Requirements

### Requirement: A rule records the failure that bought it

A rule written into a skill SHALL record the failure it exists to prevent, in a clause
where the rule lives. A rule that cannot name one is a rule that was never paid for,
and it is a candidate for removal at the next audit.

This is what makes a later audit survivable. A rule can be cut safely only by someone
who knows why it is there, and the memory of the failure does not persist; the record
of it does. Without it the realistic outcome is not over-cutting but paralysis — no
one dares remove anything, and the skill swells until the cap pushes it into a
reference, where it swells unseen.

A rule needing a paragraph of justification is a rule worth questioning.

#### Scenario: A rule is authored

- **WHEN** a rule goes into a skill
- **THEN** it carries the failure it prevents, in a clause

#### Scenario: A rule with nothing behind it

- **WHEN** a proposed rule names no failure, and none can be produced
- **THEN** it is not written — the model would likely have done it anyway
