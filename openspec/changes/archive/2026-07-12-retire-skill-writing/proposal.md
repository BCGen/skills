# Proposal: retire-skill-writing

## Why

**skill-writing lost its own control run.** It is removed, and the README recommends the
skills that already do the job better.

The rule it lost to is its own first one: *a control that does as well means the skill should
not exist.* We applied that rule to skill-testing and deleted it. We never applied it to
skill-writing — until now.

**Twenty-three runs.** One scenario, held constant: author an `add-endpoint` skill for a Node
service whose repo is a three-file stub. **The user's premise — "I keep forgetting one of the
four steps" — is false**: there is no zod, no router, no test, no OpenAPI document. A skill
transcribed from that request is a hallucination machine that sends every future agent to
files that do not exist. Isolated destinations, identical prompts, grading fixed before any
result was seen.

| arm | checks the premise | refuses to invent paths | proposes a non-skill carrier | evals / baseline |
| --- | --- | --- | --- | --- |
| **skill-writing** ×5 | ✅ | ✅ | ✅ | ✅ |
| **a naked agent** ×6 | ✅ **6/6** | ✅ **6/6** | ✅ **6/6** | ❌ |
| **skill-creator** (310K installs) ×3 | ✅ | ✅ | ❌ 0/3 | ✅ **and far more rigorous** |
| **writing-great-skills** (143K) ×3 | ✅ | ✅ | ❌ 0/3 | ❌ |

**Not one rule in skill-writing is its own:**

- **Information conservation** — the rule five of its own runs called *"the only step that
  changed the design"*, without which the draft would have been *"a plausible hallucination
  machine pointed at the user's rules"* — **a naked agent does it 6/6, unprompted.**
- **"The answer might not be a skill"** — **a naked agent says it 6/6.** One put it plainly:
  *"The durable fix is a test, not a skill."*
- **The eval / control run** — Anthropic's own `skill-creator` does it with `evals.json`,
  baseline runs, a grader subagent, variance analysis, and a description-tuning loop. We had
  one comparison.
- **"An edit is measured against the version it replaces"** — claimed here twice, in bold, as
  the one thing no competitor had. **`skill-creator/SKILL.md:186` already has it, and states
  it more precisely**: snapshot the skill before editing, point the baseline subagent at the
  snapshot. It took the user asking *"is that really ours?"* to make us grep.

Anthropic's own authoring guide says it outright: *"You don't need special system prompts or a
**'writing skills' skill** to get Claude to help create Skills."*

**And the registry check — our own rule, `npx skills find` — was never once run on ourselves.
Four competitors. Over 800,000 installs.**

## What Changes

- **BREAKING — `skills/skill-writing/` is deleted**, with its spec, its tests, and its row in
  the README.
- **The routing table gets a real destination again.** `shared/routing.md` sent every
  multi-step procedure and build-step structure to skill-writing; codify and skill-auditing
  handed their approved fixes to it. Those now say: **write the skill directly.** The format
  is native to the model, and the evidence above says the model does the hard parts unaided.
- **README recommends rather than rebuilds.** A short section pointing at `skill-creator` and
  `writing-great-skills`. No commentary — a README is a recommendation, not a review.

## Capabilities

### New Capabilities

*None.*

### Modified Capabilities

- `codify`: its routing destination for a multi-step procedure changes from a delegate skill to
  writing the skill directly.
- `skill-auditing`: an approved fix is applied in place rather than routed to skill-writing.

### Removed Capabilities

- `skill-writing`: removed entirely.

## Non-goals

- **No replacement is written.** The point of the evidence is that none is needed.
- **The other five skills are not touched here.** They pass the registry check — unlike
  skill-writing, they have no real competitor — but none has been run against a control. Two of
  two skills tested so far have lost. That is a separate change.
- **No blind spots of the recommended skills are documented.** Writing a criticism into a
  recommendation invites the question *"then why don't you fix it?"* — and we are not going to.

## Impact

- `skills/skill-writing/`, `tests/skill-writing/`, `openspec/specs/skill-writing/` — deleted.
- `shared/routing.md` and its synced copies in `skills/codify/references/` and
  `skills/retro/references/` — rerouted (`pnpm sync-routing` keeps the copies byte-identical;
  lint fails otherwise).
- `skills/codify/SKILL.md`, `skills/skill-auditing/SKILL.md` — their handoff to skill-writing
  is replaced.
- `README.md`, `docs/ai-harness-skills.md`, `tests/codify/README.md`,
  `tests/skill-auditing/README.md`.
