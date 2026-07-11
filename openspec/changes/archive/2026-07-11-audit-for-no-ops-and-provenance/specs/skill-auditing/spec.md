# skill-auditing (delta)

## ADDED Requirements

### Requirement: No-op layer

skill-auditing SHALL report a third layer alongside format and content: rules that
never changed the model's behavior. A skill decays in two directions — a stale rule
was right and stopped being right; a no-op rule was never load-bearing at all, and it
spends context on every load while diluting the rules that do teach.

A no-op finding SHALL rest on evidence, never on the agent's report of its own
defaults, which is confident and unreliable. In order:

1. **Provenance** — the rule names the failure it was written for. A rule bought by an
   observed failure is kept. A rule that names none is a candidate.
2. **A deletion run** — for a contested candidate, remove the line, run the skill on a
   real scenario, and see whether behavior changes. Reserved for lines worth arguing
   about.
3. **Neither** — report it as a candidate with the reasoning. A candidate is not a
   defect.

A body passage that restates a reference the body itself tells the agent to read at
that point SHALL be reported as a no-op without further evidence: the reference is
already in context, and the conventions require one home per fact.

Findings SHALL be proposed, never applied — the audit diagnoses, skill-writing edits.

#### Scenario: A rule with no provenance

- **WHEN** a rule names no failure it was written to prevent
- **THEN** it is reported as a no-op candidate with the reasoning, not deleted

#### Scenario: A rule bought by a real failure

- **WHEN** a rule records the failure that produced it
- **THEN** it is kept, even where the model would usually behave correctly without it

#### Scenario: A body restating its own reference

- **WHEN** a passage repeats what a reference says, and the body tells the agent to
  read that reference at that point
- **THEN** it is reported as a no-op
