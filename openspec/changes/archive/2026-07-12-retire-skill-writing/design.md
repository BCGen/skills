# Design: retire-skill-writing

## Context

skill-writing was rewritten this same day — 7,358 → 3,997 tokens, two adjudication points, a
fixed bloat mechanism — and then, for the first time in its life, run against a control. It
lost. This change removes it.

The experiment and its numbers are in the proposal. What belongs here is the reasoning behind
the *shape* of the removal, and one methodological record worth keeping.

## Decisions

### D1. The routing table needs a destination, not a hole

skill-writing is not an isolated skill. `shared/routing.md` — the canonical routing table,
byte-identical-synced into codify and retro — routes **every multi-step procedure and every
build-step structure** to it, and skill-auditing routes its approved fixes there. Deleting the
skill without rerouting leaves three skills pointing at nothing.

The replacement is the finding itself: **write the skill directly.** The model knows the
SKILL.md format natively (Anthropic says so; three arms of the experiment confirm it produced
zero convention violations at a destination with no linter). The judgment that used to justify
the delegation — decompose the problem, refuse to invent what the input does not contain, ask
whether a skill is even the right carrier — **a naked agent performs 6/6 without being told.**

### D2. Recommend without reviewing

The README gains a short section pointing at `skill-creator` (Anthropic, 310K installs) and
`writing-great-skills` (143K). It carries **no commentary on their gaps**.

Rejected: documenting the blind spots the experiment found — that both tools score **0/6 on
proposing a non-skill carrier where a naked agent scores 6/6**, i.e. that a skill-writing tool
*stops the model asking whether a skill is the right answer at all.*

The finding is real. But a criticism written into a recommendation is an invoice addressed to
yourself: *then why don't you fix it?* The honest venues are upstream (an issue, with evidence
stronger than one obvious-trap scenario) or nowhere. **We chose nowhere.** A README is a
recommendation, not a review.

### D3. The full-capability removal, and what it costs

Per `.claude/rules/openspec-delta-handling.md` (learned the hard way earlier today): OpenSpec
rebuilds a spec from its delta and rejects a zero-requirement result, so a REMOVED delta that
empties a capability **aborts the archive**. The living spec directory is deleted outright, no
delta folder is shipped for it, and the record lives here.

`openspec/specs/skill-writing/spec.md` carried 30 requirements. They are not enumerated here.
The single reason covers all of them: **a control did as well, and the official alternative did
better.** Every requirement in that spec described *how* to author well; the experiment says the
model authors well without being told.

## The methodological record

Kept because the corrections in it are the only reason the conclusion is trustworthy.

**Nine times in this change's investigation, a conclusion was asserted without being checked** —
and every one of the nine was convenient. The pattern, each time: derive something elegant, and
skip verification *because* it was elegant. Each was caught by looking, never by better
reasoning:

1. *"The rule 'a rule records the failure that bought it' is the growth engine."* — grep: three
   occurrences in the entire skill.
2. *"Delegate the control run to skill-testing."* — the living spec already forbade it.
3. *"No runtime is guaranteed at any destination, so a checker script is impossible."* — Claude
   Code's requirements name a shell as mandatory. Generalised from one absent runtime to all.
4. *"Ablation is a new third adjudication point."* — `skill-auditing/spec.md:62` already had it.
5. *"The instruction surface fits in 2,000 tokens."* — inherited from an estimate that assumed a
   checker that was already dead.
6. **The experiment was confounded**: both scenarios targeted a repo *with* a linter, so the
   ablated arm kept recovering the rules by reading it. A subagent said so: *"that is luck, luck
   that this destination happens to have a linter."*
7. **Parallel runs shared one destination and overwrote each other.** A subagent detected it by
   comparing mtimes and refused to overwrite; another caught the contaminating draft's
   hallucinated content *using this skill's own conservation check*.
8. *"You don't need a 'writing skills' skill"* — **in Anthropic's guide, in context, read and
   skipped.**
9. *"The edit-baseline rule is ours alone"* — asserted twice, in bold. **`skill-creator` had it,
   better.** One grep away.

**The skill this change deletes existed to prevent exactly this failure mode. It did not prevent
it in its own author, nine times. And a naked agent, given the same task, avoided it 6/6.**

## Risks / Trade-offs

- **One scenario, and its trap is conspicuous** (a three-file repo). A subtler one — a repo with
  real conventions that are stale or self-contradictory — might separate the arms. This is the
  strongest argument against the conclusion, and it is not answered.
- **Opus only.** The platform notes that what suits Opus may need more detail for Haiku. This
  repo's user runs Opus.
- **Simulated users.** The subagents answered their own questions, so the second-symptom
  criterion was void in every run. It cannot be assessed from this evidence.
- **The other five skills have never been tested.** They pass the registry check — no real
  competitor — but two of two skills tested have lost. That prior is not comfortable.
