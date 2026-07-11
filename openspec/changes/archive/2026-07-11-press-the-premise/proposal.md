# Proposal: press-the-premise

## Why

Every question skill-writing asks is aimed at the procedure the user described.
Nothing is aimed at the nouns they brought with them.

Authoring a skill for shaping ideas, the opening request named a PRD, a mindmap, and
implicitly a language. The agent asked eight questions — completion criteria, session
scope, where the output lands, what the PRD feeds, what failure to prevent, how it
fires — each with a recommended answer and a reason. Not one of them touched the
request itself. The PRD, the mindmap and the output language were built on as settled.

The user then knocked down all three: why is the document in Chinese; is a mindmap
really the best shape for an idea; and — the one that mattered — if this is for
divergent thinking, should the output be a PRD at all. That last question exposed a
contradiction that had been sitting in the opening sentence the whole time: a skill
cannot both roam freely and produce a buildable spec. The agent had not seen it, and
had designed a mechanism to prop up the unexamined premise instead.

The final skill is a better one, but the user earned it, not the process.

The failure has a name: **the agent did to the user's request what it is expressly
forbidden to do to the user's answers — accept it as given.** A question asked inside
a premise can never reach the premise.

## What Changes

- **A step that presses the premise, before the procedure is interrogated.** The nouns
  in the opening request — the artifact, its format, its language, the name of the
  process — are proposals, not requirements. Each one gets a concrete alternative to
  push against, which is the same manufactured-concreteness move the elicitation rules
  already prescribe, finally aimed at the request rather than only at the answers.
- **The divergent/convergent question is one of those premises.** A skill may open a
  space, close one, or do both — but "both" is only coherent as two named phases with
  a boundary, and an opening request that silently wants both carries a contradiction
  that will surface as a rewrite later.
- **When a premise falls, the decisions built on it are void.** Overturning a premise
  returns the flow to the understanding checkpoint: say which decisions no longer
  stand, which survive, and renegotiate — rather than quietly editing the draft to fit
  the new premise.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: adds the premise pass before interrogation, the divergent/convergent
  question, and the invalidation rule when a premise is overturned.

## Non-goals

- **No ban on a skill that both diverges and converges.** Several legitimately do. The
  rule is that the phases are named and ordered, not that one of them is forbidden.
- **No open-ended re-litigation.** A premise is pressed once, with an alternative
  offered; a user who keeps theirs keeps it and the flow moves on.

## Impact

- `skills/skill-writing/SKILL.md` — a premise pass ahead of the interrogation, and the
  invalidation rule on the checkpoint.
- `skills/skill-writing/references/eliciting.md` — the request is the first thing
  pressed, not only the answers.
- `tests/skill-writing/README.md` — scenarios for both.
