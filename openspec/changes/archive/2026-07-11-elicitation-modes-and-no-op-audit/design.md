# Design: elicitation-modes-and-no-op-audit

## Context

`references/eliciting.md` was written from a head-to-head observation: an interview
skill this package authored asked in menus, while `grilling` (mattpocock/skills)
opened on the one question that constrained everything downstream. The rules
extracted from that comparison are sound, but they were extracted from an
**adversarial** interview — one that presses an existing plan until it holds — and
written as if they were the rules for interviewing in general.

A study of that skill's design (and of the skills it composes with — `wayfinder`,
`domain-modeling`, `writing-fragments`) shows the assumption baked into it, and
shows the same author overriding it whenever the space is unknown: when charting
unfamiliar ground, `wayfinder` explicitly abandons depth-first and fans out across
the whole space first. That override is the evidence that depth-first is a property
of stress-testing, not of interviewing.

## Goals / Non-Goals

**Goals:**

- Separate what is true of any interview from what is true only of adversarial ones.
- Give a generative interview rules that fit it, so an authored idea-shaping skill
  expands an idea rather than interrogating its author.
- Cut the lines that spend context without changing behavior.

**Non-Goals:**

- Changing the flow, the checkpoints, the naming step, or the dry run.
- A question cap.

## Decisions

### D1. Three layers, not one set of rules

**Carrier-neutral mechanics** hold in both modes, because they are facts about a
human's attention in a serial conversation: one question at a time; every question
carries a recommended answer; facts are looked up rather than asked; the agent may
not answer its own question; the user ratifies the exit.

The recommendation rule matters *more* generatively, not less. A user who has not
thought an idea through **cannot author an answer, but can always react to one** —
the proposal is the probe, and it also exposes the agent's model of the idea so the
user can correct it.

**Adversarial moves** require an existing claim: contradiction held side by side,
an edge case invented to break a stated boundary, a term whose two readings are
forced apart. Generatively there is nothing to contradict, so these are empty.

**Generative moves** are the inverse and are missing entirely today. They are set
out in D2–D4.

### D2. Breadth before depth, and expansion counts as progress

Depth-first dependency order presupposes the tree exists. When the idea is
half-formed there is no tree, and depth-first commits the user to whichever branch
their opening sentence happened to name — a dependency that is an artifact of
phrasing, not of the problem.

So a generative interview enumerates the space first and resolves it second. And it
needs a different notion of progress: in a stress-test a question is done when it is
answered, and the space only shrinks; generatively, a question that opens three
branches has advanced the work. An interview that only narrows is not generating.

### D3. Pressure without a claim is manufactured concreteness

The adversarial move is to hold a contradiction up. With nothing asserted, there is
nothing to hold up — so the agent supplies it: a specific, concrete, possibly wrong
proposal, offered precisely so the user has something to push against. A confidently
wrong proposal is the most productive move available when the user cannot yet say
what they want, and it is the same mechanism as the recommended answer, turned from
convergence to expansion.

### D4. A question that cannot be phrased is parked, not asked

The test is whether the question can be **stated** precisely now — not whether it can
be **answered** now. Sharp enough to phrase: ask it. Not sharp enough: put it in a
holding list and let a later answer graduate it.

Without this, a generative interview asks vague questions early, and a vague question
returns a vague answer that then gets treated as settled. The holding list is what
lets the agent notice a question exists before it can articulate it.

### D5. The exit is ratified, and the bar is a downstream consumer

The agent cannot declare a shared understanding, because it is one of the two parties
to it. So the exit is a prohibition rather than a judgment: do not proceed until the
user confirms. And the bar the interview aims at is checkable — the result is
complete when someone downstream could act on it without asking a single question.

Generatively the natural stopping point is saturation: new questions stop yielding
new material. Both still end with the user's ratification.

### D6. Cut what the model does anyway

A line the model already obeys is a line that spends context and teaches nothing. The
evidence for what it does *not* obey comes from two real authoring runs: it dumped
menus of parallel options, named the skill without asking, read another skill's body,
invented a test fixture, and skipped straight from the last question to the draft.
Those failures earn their rules.

Lines that survive an audit only as good writing advice — write numbered steps, match
the surrounding voice, do not narrate the obvious — go. The model does that already,
and this package's own rule says every paragraph must justify its token cost.

## Risks / Trade-offs

- **Mode is a judgment call, and a skill can be both** → most are clearly one; when
  a skill both expands and then presses, run the generative pass first and the
  adversarial one after, in that order, because pressing an unmapped space collapses
  it.
- **Cutting guidance risks cutting something load-bearing** → the audit keeps every
  rule for which a real run produced a real failure, and cuts only what none did.
- **eliciting.md grows** → it stays a reference, and the mode split lets a reader take
  only the half that applies.
