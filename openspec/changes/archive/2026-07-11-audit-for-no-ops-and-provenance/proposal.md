# Proposal: audit-for-no-ops-and-provenance

## Why

A skill rots in two directions and the audit only watches one. It catches what has
gone **stale** — a format that drifted, a command that changed — and it is blind to
what has gone **fat**: lines that never taught the model anything, because the model
would have done it anyway.

That failure is not hypothetical. skill-writing was amended five times in two days,
and an audit against its own standard found rules the model already obeys — write
numbered steps, match the surrounding voice, do not narrate the obvious — plus a
paragraph restating a reference the same line tells the agent to read. Every line of
it cost context, and a line that spends context without changing behavior blunts the
lines that do.

The deletion is only safe because two real authoring runs were fresh in the session's
memory, so it was possible to say which rules were paid for by a real failure and
which were good writing advice. Three months from now nobody has that memory, and the
audit will either cut something load-bearing or, far more likely, cut nothing at all
and let the skill keep swelling.

## What Changes

- **The audit gains a third layer: no-ops.** For each rule in a skill, it asks
  whether the model would follow it anyway. Candidates are the lines that carry no
  provenance and the lines that restate a reference the body already points at.
- **The judgment is not introspection.** An agent asked "would I do this anyway?"
  answers yes with confidence and is often wrong. A candidate is settled by evidence:
  the rule names the failure it was written for, or a deletion is tested by running
  the skill without the line and observing whether behavior changes. Where neither is
  available, the finding is reported as a candidate, not a defect.
- **A skill's rules carry provenance.** A rule states the failure that bought it, the
  way a rule written by rule-writing carries its origin. A rule that cannot name one
  is a rule nobody can safely keep or cut later.
- **The audit still does not mutate.** No-op findings are proposed with their
  evidence, like every other finding.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-auditing`: adds a no-op layer with an evidence rule, reported alongside
  format and content.
- `skill-writing`: an authored rule records the failure it exists to prevent.

## Non-goals

- **No automatic deletion.** The audit reports; skill-writing edits, on approval.
- **No count-based limits on a skill's length.** The line and token caps already exist
  and are enforced by lint; this is about whether a line earns its place, not how many
  there are.

## Impact

- `skills/skill-auditing/SKILL.md` — the third layer and its evidence rule.
- `skills/skill-writing/references/conventions.md` — an authored rule carries its
  provenance.
- `tests/skill-auditing/README.md` — a no-op scenario.
