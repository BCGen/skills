# Proposal: sharpen-elicitation-and-naming

## Why

Two failures surfaced the first time skill-writing authored a real skill.

**It does not know how to ask.** Step 4 says what to establish and that each
question carries a recommended answer — it says nothing about the shape of a
question. The questions came out as menus of parallel options, so the user picked
without anything being settled. The same session ran the same request through
`grilling`, which opened on the one fork that constrained everything downstream
and recommended a claim with its reasoning; head to head it was visibly sharper.
Worse, the authored skill's own interview step copied skill-writing's shape:
whatever skill-writing models, the skills it authors reproduce. A user who wants a
skill that elicits ideas from a human does not know how such a skill should ask,
and nothing in the field teaches it — `grilling` demonstrates it without teaching
it, and the platform's guidance does not cover it.

**Two naming threads collide by construction.** The registry collision check sits
in Step 3, but a name is only decidable once the skill has a shape — so in
practice it lands in the middle of Step 4, next to the question about the output
artifact's shape. When the authored skill produced a named file, both naming
decisions were open at once and three question rounds were spent answering the
wrong one. The conventions' naming section covers only the skill's own name and is
silent on the artifact's, even though Step 4 asks about artifacts.

A third, quieter failure: the dry-run control is the naked agent — "does this beat
nothing". The question that matters is whether it beats what the user already has.
An installed skill can already do one of the drafted steps better, and comparing
against nothing never reveals it.

## What Changes

- **A skill that elicits from a human gets rules for how to ask**, in a new
  `references/eliciting.md`, and skill-writing's own interrogation follows them:
  open on the fork whose answer collapses the most downstream questions; recommend
  a claim with its reasoning, not a neutral label, so there is something to push
  against; state what each question decides and what the answer changes; name a
  contradiction on the spot.
- **Naming moves after the draft.** Step 3 keeps only the "does one already exist"
  check, which needs the job and not the name. Naming and the registry collision
  check become their own step once the skill has a shape.
- **The artifact and the skill are named separately.** When a skill produces a
  named artifact, its name and location are the user's decision and are settled
  during the output-shape question; the skill's own name answers to the registry
  and is settled later. Never both in one turn, and each question says which one
  it is deciding. Alternatives offered after a collision are themselves checked
  before being offered.
- **The dry-run control becomes the strongest existing alternative.** Once the
  draft's steps are known, each step is compared against the skills installed at
  the destination; where one already does that step better, it is the control, and
  the draft must at least meet its bar. Only when nothing overlaps is the control
  the naked agent.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: adds elicitation rules that govern both its own interrogation
  and the skills it authors; splits naming out of the duplicate check and moves it
  after the draft; separates artifact naming from skill naming; raises the dry-run
  control from the naked agent to the strongest installed alternative.

## Non-goals

- **No registry-wide search for a better alternative.** The comparison covers the
  skills installed at the destination. Recommending a third-party install at
  runtime stays out — an external skill we do not control is not a dependency this
  package takes on.
- **No eval harness.** Unchanged.
- **The carrier gate, the dry run itself, and showing the real output rather than
  a verdict stay as they are.** They worked: the control went straight to writing
  a script instead of the asked-for document, which settled the skill's right to
  exist in a single run.

## Impact

- `skills/skill-writing/SKILL.md` — naming leaves Step 3; a naming step lands
  after the draft; Step 4 defers to the new elicitation reference.
- `skills/skill-writing/references/eliciting.md` — new.
- `skills/skill-writing/references/conventions.md` — naming covers the artifact as
  well as the skill.
- `skills/skill-writing/references/dry-run.md` — the control is the strongest
  installed alternative.
- `tests/skill-writing/README.md` — scenarios for both failures.
