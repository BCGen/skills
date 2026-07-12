# Design: restructure-skill-writing-to-three-gates

## Context

skill-writing is 7,358 tokens (SKILL.md 1,429; conventions 2,387; dry-run 1,933; eliciting
1,608), up from 3,778 two days and six changes ago. Its living spec carries 30 requirements
in 843 lines. All three references are read on nearly every run, so progressive disclosure
buys nothing here: a full run loads all 7,358 tokens. Splitting the body did not save
context; it evaded the linter.

This design survived three adversarial reviews, a grilling, and eleven live runs. **Where a
decision below reverses an earlier one, the reversal is recorded rather than smoothed over** —
the corrections are the evidence that the floors in D3 are not paranoia. Five claims that were
elegant, confidently made, and wrong:

1. *"The rule 'a rule records the failure that bought it' is the growth engine."* — A grep
   refutes it: three occurrences in the whole skill, one being the rule's own definition.
   Invented because it was elegant, unchecked for the same reason.
2. *"Delegate the control run to skill-testing."* — The living spec already forbids it
   (`skill-writing/spec.md:299`).
3. *"No runtime is guaranteed at any destination, so a checker script is impossible."* — False.
   Claude Code's requirements name a shell as mandatory. The claim generalised from one absent
   runtime (node) to all of them, because that was convenient. The checker is still rejected —
   on value, not portability (D7).
4. *"Ablation is a new third adjudication point."* — `skill-auditing/spec.md:62` already carries
   it, as the deletion run. Derived rather than looked up.
5. *"The instruction surface fits in 2,000 tokens."* — Inherited from an estimate that assumed
   the checker. Three attempts to reach it by taste failed, which is itself the tell: *which line
   teaches nothing* is not a question taste may answer (D8).

**Every advance in this design came from checking or running. Every error came from
deriving a pretty causal story and not verifying it.** That is also what the skill must
teach, and it is why every rule below is a runnable action rather than a readable moral.

## Goals / Non-Goals

**Goals:**

- Give the flow the shape the value formula implies, not a symmetric one.
- **Fix the mechanism that let the skill double in two days**, not just its consequences.
- State every surviving requirement in the smallest text that changes behavior.
- Make regrowth impossible to hide: budget the whole instruction surface, and count it
  correctly.

**Non-Goals:**

- Preserving behavior for its own sake.
- Touching skill-auditing.
- Building an eval harness. The control run is one comparison, not a suite.

## Decisions

### D1. Two adjudication points and an ungated draft — not three gates

Each factor of `(behavior delta) × (trigger frequency) − (standing cost)` names the only
thing that can settle it, and each lies outside the model: a control run, the user's own
vocabulary, an observed failure or the user's acceptance. **Drafting appears nowhere.**

**Rejected: three symmetric gates (Evidence / Draft / Proof).** A gate must have a checkable
exit, so calling the draft a gate forced an exit onto it — "conventions and lint pass" —
which in turn required `conventions.md` to be thick and important enough to justify a gate.
**The frame was protecting the file the change exists to cut.**

**Also rejected: a third gate for no-ops (ablation).** See D6.

### D2. The edit path's control is the pre-edit skill — this is the fix for the bloat

The living spec says an edit re-runs the dry run. The dry run's control is *"the strongest
alternative the user actually has"* — a naked agent, or an installed skill. **But
skill-writing already beats a naked agent.** So every edit for two days ran a test it could
not fail, and the test never once asked what the new lines taught.

The question an edit must answer is not *"is this skill better than nothing"* (settled at
birth) but ***"does this edit teach anything"***. Its control is therefore **the skill as it
was before the edit**, on **the scenario the edit was written to fix**.

> **Behavior unchanged on its own scenario ⇒ the edit is a no-op ⇒ it does not land.**

**The control run and ablation are the same act with different opponents.** "The pre-edit
version" *is* "this skill minus the lines this edit added". No third gate is needed, and
the trap that makes ablation dangerous elsewhere — a passage load-bearing only in a
scenario nobody runs — **cannot bite here**, because the scenario is chosen by the edit's
own purpose and therefore necessarily exercises it.

### D3. Floors against theatre, because the derivation will be performed

A model told to derive from first principles will comply *performatively* and land back on
the requested answer. Told to produce a *different* one, it will manufacture a fake pivot —
worse, because it overturns correct requests. Told to "decompose to the irreducible", it
will dig one layer past the truth to prove it dug. **Three theatres: pleasing, showing off,
over-digging.**

So the floors constrain **the questions that must be answered**, never the shape of the
conclusion:

1. **Information conservation.** A skill can move, filter, structure, or **fetch**
   information; it cannot **create** it. Each candidate declares, per output field, its
   source from a closed set: `input | person | file | tool`. **"Inferred", "common sense",
   and the model's own knowledge are illegal values.** A candidate whose output needs
   information its input lacks, and which it never fetches, is a hallucination machine.

   This is the only floor that fights the model's **nature** rather than its carelessness:
   its default when the input is insufficient is to supply the difference, convincingly. It
   converts a matter of taste ("is this a good design?") into a matter of fact ("are the
   acceptance criteria in the notes?"), which is checkable and therefore hard to perform.

2. **The upstream question.** Conservation is a law on the input-output axis and is **blind
   to the time axis**: told the information is absent from the input, its only exit is
   "fetch it at run time", never "produce it earlier". Run against the motivating example
   (a meeting-notes-to-PRD skill), conservation *honestly passes* the interview-skill
   candidate and never reaches the agenda-template candidate — which is the better answer
   precisely because it moves the moment of production upstream.

3. **Each candidate names the layer it attacks.** A candidate that can name none is a straw
   man and does not count.

   **Rejected: "the candidate list must contain at least one non-skill carrier."** It is
   countable, which is exactly why it is gameable: a straw-man non-skill candidate, floated
   and struck, satisfies it. Layer-naming is strictly stronger — a straw man can fake the
   *shape* of a carrier but cannot fake a causal link to the root, **because the root is
   the user's own material** (see D4). The non-skill candidate then falls out as an
   **inference**: the deepest layer almost always lies outside any skill's run time, so the
   candidate attacking it is almost always not a skill. **The list is grown, not ticked.**

### D4. The decomposition stops on a second symptom, or on unactionability

"Decompose until it cannot be decomposed" has no stopping rule, and "the user nods" is one a
user can nod through. **A real root explains more than the symptom in hand.** So the question
is not *"is this your pain?"* but **"where else does this root hurt you?"** — a second symptom
the user supplies **themselves** is proof of bottom. The model cannot supply it; only the
user can.

**But finding no second symptom proves nothing** — single-symptom true roots exist ("the
description is too narrow, so it never triggers"). Used as a *continue*-trigger, this rule
would keep digging past a true root and manufacture the very over-decomposition it exists to
prevent. It is a **confirmation, not a continue-trigger.**

The fallback is **actionability**: when a layer lands on something the user has no power to
change, stop and back up one. **Either criterion stops the decomposition.**

### D5. The cost of being wrong is derived, not asked

Effort scales with what a wrong answer costs. The agent had been judging that cost while
holding an incentive to call everything low-stakes and skip the work.

**Rejected: "ask the user."** They hold the opposite incentive — they want the thing now.
Choosing between two motivated judges is not a fix.

**Derive it from observable facts:** `destination × blast radius`.

| Fact (observable) | Cost |
| --- | --- |
| destination = personal setup | low — one person, one line to fix |
| destination = project | medium — a team, and git remembers |
| destination = public package | **high — strangers, and it cannot be recalled** |
| the skill writes files, deletes files, or calls an external service (`allowed-tools`, scripts) | **one level up** |

The destination is already established in Adjudication 1. The blast radius is readable from
the draft. **Nobody judges, so nobody cheats** — the skill's own "compress a matter of taste
into a matter of fact", applied to a threshold that had escaped it.

### D6. skill-testing is removed, and ablation is not reinvented

**The control run is unconditional and self-contained.** It is the only thing that measures
the behavior delta; hanging the single empirical check on a threshold the agent can lowball
is equivalent to deleting it. It costs one subagent — less than the prose of the floors
above. It is **not** delegated (the living spec forbids it, and skill-writing must carry the
method for all three destinations regardless, so a delegation plus its fallback costs more
than the method).

**skill-testing was put to its own control run and lost.** Its true control is not a naked
agent — it is a naked agent **plus one free sentence**: *"if the same input run twice
produces different results, the spec is underspecified."* That sentence is the strongest
alternative the user actually has, because it is one line and costs nothing.

Six runs against `rule-writing`, three per arm:

| | the core contradiction | also found | scenarios run |
| --- | --- | --- | --- |
| skill-testing ×3 | 3/3 | batch ambiguity; path-scoping precedence | 4–5 |
| naked + one sentence ×3 | 3/3 | **the ≥80% branch emits a rule that never loads**; **every reported budget number is wrong**; **the batch guard HARD FAILS — both runs wrote all five files** | **8–13** |

The control ran twice the scenarios, found everything the skill found, and found three
things it did not — including an outright failure the skill reported as a pass. **By the
skill's own rule, a control that does as well means the skill should not exist. This control
did better.**

The honest caveat, put to the user and overruled: the sentence was *handed* to the control.
In the wild, nobody hands it to the user.

**And ablation is not a new gate.** `skill-auditing/spec.md:62` already carries it as the
deletion run — *"remove the line, run the skill on a real scenario, and see whether behavior
changes."* It was rederived here as a "third adjudication point" without being looked up.
D2 subsumes it for the path that matters: **the edit path is where growth happens, and its
control already is the ablation.** skill-auditing is untouched.

### D7. Strip the reasons, do not change the medium

`scripts/lint-skills.mjs` already enforces, mechanically: allowed frontmatter keys; name
equals directory; name shape, length, reserved words; description length, "Use when", angle
brackets; body caps; reference depth and table of contents. `conventions.md` spends ~55 lines
teaching a model rules a script already enforces.

**Rejected: ship a portable checker script — but not for the reason first given.**

The first rejection was itself an unchecked claim: *"no runtime is guaranteed at any
destination."* Researched, that is **false**. `node` is indeed absent by default (`claude` is a
Mach-O native binary; node existed on the test machine only via mise) — but Claude Code's system
requirements name a shell as a hard requirement: *"Shell: Bash, Zsh, PowerShell, or CMD."* **A
shell always exists.** The claim generalised from one absent runtime to all runtimes because
that was convenient. That is the failure mode this whole design is about, committed inside the
design.

Corrected, and researched rather than derived:

- **POSIX `sh` is not guaranteed.** On native Windows without Git for Windows, *"Claude Code
  uses PowerShell as the shell tool instead."* A `sh` checker would need a `ps1` twin.
- **The spec's own reference validator, `skills-ref validate <dir>`, is Python** — no more
  guaranteed than node. Every third-party skill linter is pip- or npm-installed. **There is no
  runtime-free validator in existence.**

So the honest rejection is about **value, not portability**. A checker can only replace the
absolute-rules block: **~500 tokens, 13% of the instruction surface — and the least important
13%.** Format errors are the cheapest and most self-correcting failures there are; CI catches
them here, and a malformed skill fails to load anywhere else. **What a checker cannot check is
everything expensive** — whether the skill teaches anything, whether the triggers fire, whether
the procedure is complete. A runtime dependency, two script dialects, and a second source of
truth (`skill-auditing/SKILL.md:21-23` reads `conventions.md` as *"the single source of
truth"*), traded for 13% of the cheapest context, is a bad trade.

What survives is one line in `conventions.md`: **where a validator exists, run it rather than
check by eye** — `pnpm lint` here, `skills-ref validate` where Python is available. Neither is
guaranteed, so the rules stand on their own.

**Rejected: cut conventions because "the model would follow it anyway."** Wrong reason, and a
wrong reason cuts the wrong lines. The ablation arm that lost `conventions.md` recovered by
**reading the destination's linter** — and said so itself: *"that is luck, luck that this
destination happens to have a linter. Authoring into a project with no lint script would
leave Step 7 with no rules at all."* The lines feel like padding not because the model knows
them but because **the linter already enforces them — where one exists**. Two of the three
destinations have none.

**The right cut:**

> **An absolute rule needs no reason. A reason is only worth its tokens where a judgment is
> being made.**

`description ≤ 1024, third person, no angle brackets` — there is no situation in which the
agent weighs whether to comply. It does not need persuading; it needs telling. ~55 lines of
argued rules become **~6 lines of bare assertions (~120 tokens)**, with zero portability
risk, zero fallback, no new file, and the source of truth still in place. What keeps its
reason is what requires judgment: the invocation-mode trade-off, the language policy, the
high-stakes degradations, the script-versus-judgment boundary.

### D8. A hard total budget — and a token count that is not a lie

Body plus every always-read reference, enforced by lint. **4,000 tokens**, from 7,358 — a 46%
cut, with the surface measured at 3,993 and the budget pinned a hair above it, so **the next
addition must remove something first.** It bit once during this very change: a twenty-token fix
to the governance rule pushed the surface over, and something else had to go to pay for it.

**Rejected: "no net growth."** An earlier draft set exactly that target, reproducing in the fix
the defect it diagnosed: a bound that rewards moving text and can never fail.

**Rejected: 2,000.** That number was carried over from an outside estimate whose arithmetic
assumed `conventions.md` would shrink to ~200 tokens — which assumed a **shipped checker script**
carrying the mechanical rules. The checker is dead (D7), so the conventions must carry those
rules as prose, and ~500 tokens of them are irreducible: they are the only wall at the two
destinations that have no linter. **2,000 was a number standing on a dead assumption.** Reaching
it would have meant cutting behavior the spec commits to, not prose — and three attempts to hit
it by taste failed, which is itself the tell: *"which line teaches nothing"* is not a question
taste may answer. It was settled the way everything else here was settled — by the run.

**And the estimate must be fixed.** `lint-skills.mjs:109` computes `Math.ceil(body.length /
4)` — roughly right for English, and **wrong by four to six times for CJK**, where a
character is about one token. This repo never notices because it bans CJK under `skills/**`.
**But skill-writing authors into projects and personal setups that may be written in
Chinese** — and there is no linter there at all. Shipping a budget that under-counts a
Chinese skill fourfold is shipping the same disease under a new name: **a cap that can never
fail.**

### D9. eliciting.md is deleted, and the acceptance run adjudicates

The arm that lost `eliciting.md` **self-reported no gap** and still asked sixteen questions,
one at a time, each with a recommended answer. But the body itself still carried *"One
question at a time"*, and **N = 1**. The evidence is genuinely inconclusive.

**The default where there is no evidence is to cut.** Keeping-by-default is precisely what
produced 7,358 tokens: nobody dared remove anything. The safety net is not taste — it is the
run. **This rewrite is itself an edit, so by D2 its control is the pre-edit skill.** Cut it;
if the new version does worse on a real authoring scenario, the cut lines were load-bearing
and they come back.

**The cut is bounded by the trap in D2:** only cut what the acceptance run will exercise.
`eliciting.md` teaches how to interview, and **every authoring scenario exercises the
interview**, so it is inside the run's reach. Anything the run cannot reach is kept and
marked unverified.

Its load-bearing lines fold into the body as bare assertions, per D7.

## Risks / Trade-offs

- **A rewrite silently drops a requirement** → the living spec is the checklist. Each of the
  30 requirements is walked and placed: kept, merged, or removed with a reason.
- **The budget may not fit the surviving behavior** → it did not, at 2,000. Something left in
  the open: the number, not the behavior. Measured surface: SKILL.md ~1,510 + conventions ~1,090
  - dry-run ~1,390 = 3,993, against a 4,000 budget.
- **Removing a published skill** → users who installed skill-testing keep their copy; it
  simply stops being updated. The README table and its spec go with it.
- **The floors can still be performed** → conservation can be answered with a false claim.
  But it is a *falsifiable* claim about a specific artifact, which the user refutes at a
  glance. The floors raise the cost of theatre; only the run abolishes it.
- **This design may itself be overfit** — it comes from one rethink, and this skill's disease
  is fitting to the last incident. Which is why acceptance is not the argument.

## Acceptance — run, and passed

Both versions were run in fresh contexts against the same real authoring scenario (a skill the
user had queued in `.ai/backlog/`), on an identical prompt.

**The 3,993-token version beat the 7,358-token one.** It asked 8 questions instead of 19; it
**obeyed** the governance gate the old version could only complain about; it **derived** the
cost of being wrong instead of asking, which then mechanically produced the authored skill's
high-stakes clauses; and it renamed the skill on merit. The decomposition closed on a second and
third symptom the simulated user supplied.

The run also reported which floor was load-bearing:

> *"Per output field, name the source" struck the obvious version of this skill — the one that
> reads a rule and judges it dead. That judgment needs information no file contains, and
> "inferred" is not a source. **Without it the draft would have been a plausible hallucination
> machine pointed at the user's rules.**"

**One defect it found, introduced by this change and now fixed:** the governance gate and the
proof step pulled against each other — told to stop when the destination forbids the write, the
agent had nowhere to run the proof from. The skill now writes the draft to a scratch path and
runs the proof anyway: the run needs a file, not a destination, and the gate wants the proof as
evidence.

## Appendix — the removed skill-testing spec

OpenSpec cannot express the removal of an entire capability: a REMOVED delta that empties a
spec fails validation (`Spec must have at least one requirement`), so the delta folder cannot
survive archive. The living spec directory is deleted outright instead, and the record it
would have carried is preserved below.

### The four requirements, and why each goes

#### Requirement: Execution and verification are strictly separated

**Reason**: skill-testing was put to its own control run and lost. Its true control is not a
naked agent but a naked agent **plus one free sentence** — *"if the same input run twice
produces different results, the spec is underspecified"* — which is the strongest
alternative a user actually has, because it is one line and costs nothing.

Six fresh-context runs against `rule-writing`, three per arm. Both arms found the core
contradiction 3/3. The control ran **8–13 scenarios** to the skill's **4–5**, reproduced the
isolation discipline unaided, and found three defects the skill missed — including a **hard
failure the skill reported as a pass**: `SKILL.md:69` promises "one rule per invocation" for
a five-rule batch, and both control runs wrote all five files.

By skill-writing's own rule, *a control that does as well means the skill should not exist*.
This control did better.

**Migration**: The load-bearing sentence — run the same input twice; a difference in output
is an underspecification, not a model error — moves into `skill-writing`'s
`references/dry-run.md`, where the control-run method already lives. The isolation
discipline (a fresh context, a minimal prompt, verification that never shares knowledge with
execution) is reproduced by a competent agent unaided and needs no skill to carry it.
Durable regression coverage for a skill remains available through `skill-auditing`, whose
deletion run (`skill-auditing/spec.md:62`) already removes a line, re-runs a real scenario,
and checks whether behavior changed.

##### Scenario: The capability is gone

- **WHEN** a user asks to acceptance-test a skill
- **THEN** no skill-testing skill exists; the agent runs the target in a fresh context and
  verifies mechanically, which it does unaided

#### Requirement: Checks derive from the target's own documentation

**Reason**: Removed with the skill. Extracting checkable rules from a target's own SKILL.md
rather than from memory or the prompt is behavior the control arms produced without being
told — three of three read the target's docs and the repo's existing test plan before
building any check.

**Migration**: None needed. The behavior survives without instruction.

##### Scenario: The capability is gone

- **WHEN** a skill is acceptance-tested
- **THEN** the checks come from the target's own documentation, because that is what a
  competent agent does; no skill instructs it

#### Requirement: Sandbox patterns for stateful skills

**Reason**: Removed with the skill. All six runs — both arms — built isolated git-committed
sandboxes and verified with `git diff --numstat`, `shasum`, and file counts without being
told to.

**Migration**: None needed.

##### Scenario: The capability is gone

- **WHEN** a stateful skill is exercised in a test
- **THEN** it runs in an isolated sandbox with a committed baseline, because that is what a
  competent agent does

#### Requirement: Three-part report

**Reason**: Removed with the skill. The "not mechanically verified" section — the one part
of the report shape that guards against overconfidence — was produced by the control arms as
well.

**Migration**: None needed. What a report must not do (assert a pass it did not verify)
survives in skill-writing's rule that the user is shown the **raw output** of a run, never a
pass/fail verdict.

##### Scenario: The capability is gone

- **WHEN** a test reports its findings
- **THEN** it separates what was mechanically verified from what was not, because that is
  what a competent agent does
