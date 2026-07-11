# Proposal: elicitation-modes-and-no-op-audit

## Why

The elicitation rules assume one kind of interview: an existing claim, pressed
until it holds. That is the right shape for stress-testing a plan, and the wrong
shape for a skill whose job is to draw out an idea the user has not thought
through. A generative interview has nothing to contradict; its progress is the
space getting **bigger**, not smaller; and depth-first ordering — resolve this
branch, then the next — locks the user into whichever branch they happened to name
first, before the space has been mapped at all.

The consequence lands on every interview skill authored from here. Written as they
stand, the rules will make an idea-shaping skill interrogate its user.

Separately, after five rounds of amendment the skill needs an audit against its own
standard. A line the model would follow anyway is a line that spends context and
teaches nothing; several have accumulated.

## What Changes

- **The elicitation rules split by mode.** A step that elicits from a human first
  establishes whether it is **stress-testing a claim** or **drawing out something
  half-formed**, because the two invert several rules.
  - **Order.** Adversarial goes depth-first through the dependency tree.
    Generative goes **breadth-first first** — enumerate the space before committing
    to any branch — and only then depth-first.
  - **Pressure.** Adversarial pressure is contradiction: hold two incompatible
    statements side by side and make the user choose. Generative pressure is
    **premature concreteness**: with nothing to contradict, manufacture something —
    a specific, even wrong, proposal — so the user has something to push against.
  - **Progress.** Adversarial progress shrinks the space. **Generative progress can
    widen it**: a question that opens three new branches has advanced the work.
  - **Exit.** Adversarial ends at agreement. Generative ends at **saturation** —
    new questions stop yielding new material.
- **A question that cannot yet be phrased is parked, not asked.** The test is
  whether it can be **stated** precisely, not whether it can be **answered**. Half-formed
  questions go into a holding list and are revisited when a later answer sharpens
  them. Asking them early produces noise the user cannot act on.
- **The agent never answers its own question, and never declares the interview
  finished.** The user ratifies. An agent that supplies the user's side has stopped
  interviewing and started imagining.
- **A better completion test:** the interview is done when a downstream implementer
  could act on the result without asking a single question.
- **A no-op audit.** Every line in SKILL.md and the references is checked against
  the question "would the model do this anyway?" — the lines that fail are cut. Our
  own two authoring runs supply the evidence for which failures are real.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: elicitation gains modes, a holding list for unaskable questions,
  a ratified exit and a downstream-consumer completion test; the conventions shed
  lines the model already obeys.

## Non-goals

- No change to the flow's steps, the checkpoints, naming, or the dry run.
- No question cap. A long interview on an under-specified idea is the interview
  working; a long interview of low-value questions is a defect in the questions, and
  capping the count would hide the difference.

## Impact

- `skills/skill-writing/references/eliciting.md` — modes, holding list, exit rules.
- `skills/skill-writing/references/conventions.md` — no-op lines cut.
- `skills/skill-writing/SKILL.md` — no-op lines cut.
- `tests/skill-writing/README.md` — a scenario for a generative interview.
