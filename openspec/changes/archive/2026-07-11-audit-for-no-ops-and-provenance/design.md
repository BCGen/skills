# Design: audit-for-no-ops-and-provenance

## Context

skill-auditing checks two layers: format against the shared conventions, and factual
content against live documentation. Both look for **staleness** — something that was
right and stopped being right.

Nothing looks for **sediment**: a line that was never load-bearing. The distinction
matters because the two decay in opposite ways. A stale line is wrong and visible. A
no-op line is correct, sensible, agreeable — and it costs context every time the skill
loads, while diluting the lines that actually change behavior.

The evidence that this is real came from auditing this package's own skill-writing
after five rounds of amendment: several rules turned out to be things the model does
by default, and one paragraph restated a reference that the same line instructs the
agent to read.

## Goals / Non-Goals

**Goals:**

- Let an audit find lines that never taught anything, not only lines that stopped
  being true.
- Make that judgment survivable by a future reader who has no memory of why a rule was
  written.

**Non-Goals:**

- Automatic deletion. The audit diagnoses; skill-writing edits.
- A length budget. Lint already caps lines and tokens.

## Decisions

### D1. Introspection is not evidence

The obvious implementation — ask the model "would you do this anyway?" — is the one
that fails. A model's report of its own defaults is unreliable in the confident
direction: it will agree that a line is redundant, the line is cut, and the behavior
disappears with it.

So a no-op finding rests on evidence, in this order:

1. **Provenance.** Does the rule name the failure it was written for? A rule bought by
   an observed failure is kept, whatever it looks like. A rule that names nothing is a
   candidate.
2. **A deletion run.** For a contested candidate, remove the line and run the skill on
   a real scenario. If behavior does not change, the line was sediment. This is
   expensive, so it is reserved for lines worth arguing about.
3. **Neither available** → report it as a candidate with the reasoning, and let the
   user decide. A candidate is not a defect.

### D2. Restatement is a mechanical no-op

One class needs no judgment at all: a body paragraph that repeats what a reference
says, when the body already tells the agent to read that reference at exactly that
point. The reference will be in context; the restatement is pure duplication, and the
conventions already require one home per fact.

This is cheap to detect and safe to propose.

### D3. Provenance makes the next audit possible

This audit was only safe because the failures were fresh. That is not a repeatable
condition. So a rule carries the failure that bought it — the same discipline
rule-writing already applies to a rule.

The payoff is symmetric: a future auditor can cut confidently, because a rule with no
provenance is a rule nobody paid for; and it will not cut what it should keep, because
a rule with provenance says why it exists. Without this, the realistic outcome is not
over-cutting but paralysis — nobody dares cut anything, and the skill swells until it
hits the line cap and gets shoved into a reference, where it keeps swelling unseen.

## Risks / Trade-offs

- **Provenance text costs lines in a body already capped** → it belongs where the rule
  lives, and for most rules it is a clause, not a sentence. A rule needing a paragraph
  of justification is a rule worth questioning.
- **A no-op layer invites cutting rules that prevent rare failures** → provenance
  protects exactly those: a rule bought by a real failure is kept even if the model
  usually gets it right, because "usually" is what the rule exists to cover.
- **The deletion run is expensive** → it is the tiebreaker, not the default. Most
  candidates are settled by provenance.
