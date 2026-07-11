# Design: press-the-premise

## Context

The interrogation subjects — completion criteria, absent preconditions, block-or-warn,
when not to fire, the shape of the output, tool dependencies — are all questions about
a procedure that has already been accepted. The elicitation rules say a vague answer is
pressed, and that pressure in a generative interview means offering a concrete,
possibly wrong proposal to push against. Both were followed. Neither reached the
opening sentence.

That is not an accident of one run. Every subject in the list presupposes the request:
"what does the PRD feed" presupposes a PRD. There is no seat at the table for the
question "should there be a PRD".

## Goals / Non-Goals

**Goals:**

- Aim the pressure the rules already describe at the request, not only at the answers.
- Surface a divergent/convergent contradiction in the first round rather than the
  eighth.
- Make a falling premise take its dependents with it, visibly.

**Non-Goals:**

- Forbidding a skill that both diverges and converges.
- Re-opening a premise the user has kept.

## Decisions

### D1. The request is a proposal, and proposals get pressed

A user names the container they know, not necessarily the thing they want. "A PRD" and
"a mindmap" are the vocabulary they arrived with; treating them as requirements builds
the skill around furniture rather than around the job.

So the nouns of the opening request are listed and each is given one concrete
alternative to react against — a mindmap against a relationship map against a skeletal
tree; a PRD against a concept brief against writing nothing at all. This is exactly the
manufactured-concreteness move the elicitation rules already prescribe for a generative
interview; it was simply never pointed at the request.

Bounded: one alternative per noun, pressed once. A user who keeps their premise keeps
it, and the flow continues — the point is that they chose it, not that they inherited
it from their own first sentence.

### D2. Divergent or convergent is a premise, not a detail

Whether a skill opens a space or closes one determines its whole character, and an
opening request routinely wants both without noticing: "let me think freely" and "give
me something I can build from" are not the same skill.

Both is allowed, and is often right — but only as two named phases in order, generative
first, with a boundary between them. What is not allowed is an unexamined both, which
shows up later as a rewrite, and which the elicitation rules already warn about: an
unmapped space collapses under pressure.

### D3. A premise that falls takes its dependents with it

When the user overturns a premise mid-flow, the agent's instinct is to edit the draft to
fit. That is wrong: decisions made downstream of a premise were made *because* of it,
and some of them no longer stand.

So overturning a premise returns the flow to the understanding checkpoint — name what
is now void, name what survives, and renegotiate. The observed failure is precise: told
the skill was now purely divergent, the agent began rewriting files, and the user had to
stop it and point out that the rest needed re-discussion and the naming was not settled
either.

## Risks / Trade-offs

- **Pressing the premise looks like arguing with the user** → it is one alternative per
  noun, offered with a reason, and dropped the moment they keep theirs. The elicitation
  rules already require a recommendation carry a reason; this is that rule aimed one
  level up.
- **More questions before drafting** → they replace the questions asked in the eighth
  round after the premise collapses, plus the rewrite that follows.
- **The invalidation rule could loop** → it returns to the checkpoint once per fallen
  premise, and the checkpoint's own rule is to wait for the user, not to re-interrogate
  from scratch.
