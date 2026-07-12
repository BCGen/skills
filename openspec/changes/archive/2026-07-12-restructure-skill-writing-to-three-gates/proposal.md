# Proposal: restructure-skill-writing-to-three-gates

> The change id keeps its working title. The shape it lands on is **two adjudication
> points with an ungated draft between them** — the third "gate" did not survive its own
> derivation. See Design.

## Why

A skill's value is `(behavior with it − behavior without it) × trigger frequency −
standing context cost`. Any factor at zero makes it net-negative. Each factor names the
only thing that can settle it, and each lies outside the model:

1. Behavior delta > 0 → **a control run**. Nothing else measures a delta.
2. Trigger frequency > 0 → **the words a user actually says**. Only the user has them.
3. Direction is right → **an observed failure, or the user's acceptance**.

**Drafting appears nowhere.** It is what the model is already competent at — not a gate,
but the gap between two adjudication points, and its exit is lint, not a conversation.
skill-writing today gives drafting the most text of all.

**And the bloat now has a mechanism, not a story.** The spec says an edit must "re-run the
dry run" — and the dry run's control is *"the strongest alternative the user actually
has"*: a naked agent, or an installed skill. But skill-writing **already beats a naked
agent**. So **every edit ran a test it could not fail.** Six changes in two days, each one
passing, none ever asked what the new lines taught.

**3,778 → 7,358 tokens. Every step legal. Lint never fired.**

Cutting to 2,000 without fixing that mechanism buys nothing: it would grow back the same
way, and every step would be legal again.

## What Changes

- **BREAKING — the ten-step waterfall becomes two adjudication points and an ungated
  draft.**

  **Adjudication 1 — Evidence (a human settles it).** Name the failure an agent made
  without the skill, and the words the user would actually say. Then decompose the
  problem instead of accepting the requested solution, and derive candidates from it.

  **Adjudication 2 — Proof (a run settles it).** The control run, always.

- **The control run's opponent depends on the path, and this is the fix for the bloat:**

  | | The control is | The question it answers |
  | --- | --- | --- |
  | **A new skill** | the strongest alternative the user actually has | *should this skill exist?* |
  | **An edit** | **the skill as it was before the edit**, on the scenario the edit was written to fix | ***does this edit teach anything?*** |

  **An edit that does not change behavior on its own scenario is a no-op and does not
  land.** The trap that makes ablation dangerous elsewhere — a passage load-bearing only
  in a scenario nobody runs — cannot bite here: the scenario is chosen by the edit's own
  purpose, so it necessarily exercises it.

- **Problem decomposition absorbs the carrier gate and premise-pressing**, which are its
  impoverished special cases: the carrier gate prompts from a hard-coded list of three and
  cannot reach a carrier not on it; pressing the premise offers one alternative per noun
  and never leaves the solution space that noun already assumes. **A question asked inside
  a premise cannot reach the premise — and pressing the premise is itself asked inside
  one.**

- **Floors against theatre, because a model told to "derive from first principles" will
  perform the derivation and land back on the requested answer** — or, told to produce a
  different one, will manufacture a fake pivot. So the floors constrain the *questions that
  must be answered*, never the shape of the conclusion:
  1. **Information conservation.** A skill can move, filter, structure, or **fetch**
     information; it cannot **create** it. Each candidate declares, per output field, where
     the information comes from — a closed set: `input | person | file | tool`.
     **"Inferred" and "model knowledge" are illegal values.**
  2. **The upstream question.** Conservation is a law on the input-output axis and is blind
     to the time axis: its only escape is "fetch it at run time", never "produce it
     earlier". So each candidate is also asked whether the information could be produced
     **further upstream**.
  3. **Each candidate names the layer of the decomposition it attacks.** A candidate that
     can name none is a straw man and does not count. This is strictly stronger than
     requiring one non-skill carrier: a straw man can fake the *shape* of a carrier, but it
     cannot fake a causal link to the root — and the root is the user's own material. A
     non-skill candidate then falls out as an **inference**, not a rule: the deepest layer
     almost always lies outside any skill's run time.

- **The decomposition stops on a second symptom the user supplies, or on
  unactionability.** A real root explains more than the symptom in hand, so the user is
  asked **"where else does this root hurt you?"** — a second symptom they name themselves
  proves bottom. **Finding none proves nothing**; the fallback is actionability (the layer
  lands on something the user cannot change → stop, back up one). Either criterion stops
  it. Used as a *continue*-trigger, multi-symptom would manufacture the very
  over-decomposition it exists to prevent — single-symptom true roots exist.

- **The cost of being wrong is derived from facts, not asked of anyone.** It is
  `destination × blast radius`: the destination (personal setup / project / public
  package) is already established, and the blast radius is readable from `allowed-tools`
  and the scripts (writes files, deletes files, calls an external service → one level up).
  The agent had been judging its own stakes while holding an incentive to call them low;
  the user would hold the opposite incentive. **Nobody judging means nobody cheating.**

- **Nothing mechanical is taught in prose that a rule can simply assert.** An absolute rule
  needs no reason — a reason is only worth its tokens where a judgment is being made.
  `conventions.md`'s mechanical half (~55 lines) collapses to ~6 lines of bare assertions.

- **A hard total budget, enforced by lint: body plus every always-read reference.** The
  body-only cap rewarded moving text into a reference rather than removing it. The number is
  **4,000**, and it is measured, not guessed: the rewritten surface is 4,015 → 3,993 tokens,
  from 7,358 (**a 46% cut**), and the budget is pinned a hair above it so that **the next
  addition must remove something first**. It already bit once during this change: a
  twenty-token fix pushed the surface over and something else had to go.

  An earlier draft said 2,000. That number was inherited from an estimate that assumed a
  shipped checker script would carry the mechanical conventions — and the checker is dead (see
  Design D7), so the conventions must carry them as prose. **2,000 was a number standing on a
  dead assumption**, and reaching it would have meant cutting behavior, not prose.

- **The token estimate is fixed for CJK.** `length / 4` holds for English and under-counts a
  Chinese skill four- to six-fold (measured: 30 Chinese characters, estimated at 8 tokens,
  actually ~29). This repo never noticed because it bans CJK under `skills/**` — but
  skill-writing authors into projects and personal setups that have no linter at all, and **a
  budget that under-counts is a budget that never fails.**

- **skill-testing is removed.** It was put to its own control run and lost. See Design D6.

- **Supersedes two pending changes**: `rewrite-skill-writing-to-minimum` (its non-goal "no
  behavior is dropped" is void) and the contentless stub
  `examples-teach-the-rule-not-the-incident` (absorbed). Both directories are removed.

## Capabilities

### New Capabilities

*None.*

### Modified Capabilities

- `skill-writing`: two adjudication points and an ungated draft; the edit path's control
  becomes the pre-edit skill; problem decomposition replaces the carrier gate and
  premise-pressing, floored by information conservation, the upstream question, and
  layer-naming; the stopping criterion becomes multi-symptom-or-unactionable; stakes are
  derived from facts; the mechanical conventions become bare assertions; `eliciting.md` is
  removed and its load-bearing lines fold into the body.
- `repo-quality-checks`: skill lint enforces a total instruction budget across a body and
  its always-read references, and counts CJK characters at their real token cost.

### Removed Capabilities

- `skill-testing`: removed entirely.

## Non-goals

- **Not a token diet.** The budget is a consequence of dropping what was never
  load-bearing, not the objective. A shorter waterfall is still the wrong shape.
- **skill-auditing is not touched.** Its deletion run (`spec.md:62`) already *is* ablation;
  this change does not reinvent it, move it, or make it mandatory.
- **English is not imposed on authored skills.** Neither Anthropic doc says a word about
  natural language; the existing rule (write in the destination's language) stands. Only
  *this repo's* CI bans CJK, because this repo is a public English package — that is a repo
  policy, not an authoring rule.

## Impact

- `skills/skill-writing/SKILL.md` — rewritten.
- `skills/skill-writing/references/conventions.md` — mechanical rules become bare
  assertions; only judgment keeps its reasons.
- `skills/skill-writing/references/dry-run.md` — the control-run method, self-contained,
  plus the edit path's control. The `Step 8`/`Step 9` off-by-one is fixed.
- `skills/skill-writing/references/eliciting.md` — **deleted**; load-bearing lines fold
  into the body. Cut on the no-evidence default, and the acceptance run adjudicates.
- `skills/skill-testing/` — **deleted**. `README.md` skills table and
  `openspec/specs/skill-testing/` follow.
- `scripts/lint-skills.mjs` — total instruction budget; CJK-aware token estimate.
- `openspec/specs/skill-writing/spec.md` — 30 requirements collapse.

## Acceptance — run, and passed

**This rewrite is itself an edit, so it was judged by the rule it introduces: the control was
the pre-edit skill.** Both versions were run in fresh contexts against the same real authoring
scenario (a skill the user had queued in `.ai/backlog/`), on an identical prompt. Raw outputs
compared.

**The 3,993-token version did not merely hold — it beat the 7,358-token one:**

| | pre-edit (7,358) | rewritten (3,993) |
| --- | --- | --- |
| questions put to the user | 19 | **8** |
| the governance gate | **complained it did not exist**, and said following the skill literally would drop an unproposed file into a spec-driven group | **obeyed it**: named the gate, wrote nothing |
| cost of being wrong | asked the user | **derived** (public package + deletes rules → high), which then mechanically produced the skill's cite-your-sources, may-say-I-don't-know, return-it-to-a-human clauses |
| the name | kept the user's | **renamed on merit**, with the user settling it |
| decomposition | a general interview | the user supplied a **second and third symptom**, which is what closed the digging |

And the run reported that **one floor did the load-bearing work**:

> *"Per output field, name the source: `input | person | file | tool`" struck the obvious
> version of this skill — the one that reads a rule and judges it dead. That judgment needs
> information no file contains, and "inferred" is not a source. That single check produced the
> two-citation requirement, the UNVERIFIED verdict, and the before/after-acceptance
> distinction. **Without it the draft would have been a plausible hallucination machine pointed
> at the user's rules.**"

**One defect the run found, introduced by this change and now fixed:** the governance gate and
the proof step pulled against each other — told to stop when the destination forbids the write,
the agent had nowhere to run the proof from. The skill now says to write the draft to a scratch
path and run the proof anyway: **the run needs a file, not a destination, and the gate wants the
proof as evidence.**
