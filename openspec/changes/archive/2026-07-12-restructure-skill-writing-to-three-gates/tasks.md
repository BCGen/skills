# Tasks: restructure-skill-writing-to-three-gates

## 1. Clear the superseded changes

- [x] 1.1 Delete `openspec/changes/rewrite-skill-writing-to-minimum/` — its non-goal ("no
      behavior is dropped") is void; the surviving idea (a total instruction budget) is carried
      here.
- [x] 1.2 Delete `openspec/changes/examples-teach-the-rule-not-the-incident/` — a stub with only
      `.openspec.yaml`; its intent is absorbed by the rationale rule in this change.

## 2. Remove skill-testing

Adjudicated by its own control run, not by argument: six runs against `rule-writing`, three per
arm, control = a naked agent plus one free sentence. The control ran 8–13 scenarios to the
skill's 4–5, found everything it found, and found three more — including a hard failure the skill
reported as a pass.

- [x] 2.1 Delete `skills/skill-testing/`.
- [x] 2.2 Remove its row from the README skills table (lint fails if the table and `skills/`
      disagree).
- [x] 2.3 Remove the mention at `skills/skill-writing/SKILL.md:101`.
- [x] 2.4 The `conventions.md` toolchain-awareness rule now names two siblings, not three.
- [x] 2.5 The sentence it was carrying — *run the same input twice; a difference is an
      underspecification, not a model error* — lands in `references/dry-run.md`.

## 3. Rewrite the skill

Not a trim. Written from the requirements, not edited down from the current text.

- [x] 3.1 `SKILL.md` — two adjudication points with an ungated draft between them. Fold in the
      load-bearing lines of `eliciting.md` as bare assertions.
- [x] 3.2 `references/conventions.md` — the absolute rules become bare assertions with **no
      reason attached** (~6 lines). Only judgment keeps its reason: invocation mode, language,
      high-stakes, script-vs-judgment, originality, no third-party names, toolchain.
- [x] 3.3 `references/dry-run.md` — the control-run method, self-contained. **Add the edit path's
      control (the pre-edit skill).** Keep *a control that does as well means the skill may not
      need to exist*. Fix the `Step 8` / `Step 9` off-by-one.
- [x] 3.4 Delete `references/eliciting.md`.
- [x] 3.5 Frontmatter `metadata` declares the always-read references and the 4,000-token budget (measured, not guessed — see 5.3).

### The four defects the ablation runs converged on — each must be closed

- [x] 3.6 **A gated destination.** "Write SKILL.md at the destination" has no notion that the
      destination's governance may forbid an unproposed file. Three of four arms hit it.
- [x] 3.7 **The duplicate candidate and the control can be the same skill.** Three of four arms
      hit it; both scans landed on `codify`. Say what it means when they coincide.
- [x] 3.8 **`dry-run.md` opens "How to run Step 8"** while the run step is Step 9. Two arms hit
      it.
- [x] 3.9 **The carrier gate has no completion criterion** — the one step that broke the skill's
      own rule. It is removed entirely, so this closes with it.

## 4. The requirement walk — every one of the 30 is placed

A rewrite that quietly drops a requirement is the risk this checklist exists to close.

- [x] 4.1 **Kept, unchanged**: Destination-aware authoring · Invocation mode is decided · The
      skill is written in its destination's language · Duplicate check against installed skills ·
      Close-out · The user is never told the rules · Descriptions are read, bodies are not · The
      run's prompt carries no answers · A scenario is a use of the skill, not the request for it ·
      The dry run matches the skill's shape · The control is proposed, not chosen unilaterally ·
      Runtime text names no third-party skill · A premise that falls voids what was built on it.
- [x] 4.2 **Modified**: Convention-complete authoring · Gather, draft, review flow · The draft is
      run before it is finalized · Effort scales with the cost of being wrong · A rule records the
      failure that bought it · The user ratifies the exit · Elicitation has two modes · Naming
      discipline · Editing an existing skill · Definition of done · How a question is asked.
- [x] 4.3 **Removed**, each with its migration in the delta: Carrier gate before drafting · The
      premise is pressed before the procedure · Step-level comparison against installed skills ·
      Divergent or convergent is settled early · A question that cannot be phrased is parked · Two
      checkpoints.
- [x] 4.4 **Added**: The problem is decomposed before candidates are drawn · Information
      conservation strikes a hallucination machine · Each candidate is asked whether the
      information can be produced upstream · Each candidate names the layer of the decomposition it
      attacks · The decomposition stops on a second symptom, or on unactionability · The
      destination's governance may forbid the write · A duplicate candidate may also be the
      control.
- [x] 4.5 `Bounded requirements interrogation` — folded into the decomposition and the
      interrogation; confirm nothing in it was dropped.

## 5. Lint: the budget, and a token count that is not a lie

- [x] 5.1 `scripts/lint-skills.mjs` — a total instruction budget: body plus every reference a
      skill declares as always-read must fit its declared budget. A branch-only reference is not
      charged. The failure names the total and the budget, so moving text into a reference cannot
      make it pass.
- [x] 5.2 **Fix the CJK token estimate.** `Math.ceil(body.length / 4)` holds for English and
      under-counts a Chinese skill four- to six-fold. Count CJK characters at ~1 token and the rest
      at ~4 characters per token. This repo bans CJK under `skills/**` so it never noticed — but
      skill-writing authors into projects and personal setups that have no linter at all, and a
      budget that under-counts is a budget that never fails.
- [x] 5.3 Verify: skill-writing's instruction surface is **3,993 tokens against a declared budget
      of 4,000** (from 7,358 — a 46% cut). `pnpm lint` is green. The budget is measured, not
      guessed: 2,000 was inherited from an estimate that assumed a shipped checker script, and the
      checker is dead. The budget already bit once — a twenty-token governance fix pushed the
      surface over and something else had to pay for it.

## 6. Prove it — and this rewrite is judged by the rule it introduces

**This rewrite is an edit. So by its own new rule, the control is the pre-edit skill.**

- [x] 6.1 Take a **real** authoring scenario. Never the request that produced this change.
- [x] 6.2 Run the rewritten skill-writing in a fresh context on that scenario.
- [x] 6.3 Run the **control** — the current 7,358-token skill-writing — on an identical prompt.
- [x] 6.4 Show the user both raw outputs, not a verdict. If the 2,000-token version does as well,
      the cut was right. **If it does measurably worse, the text it removed was load-bearing and
      this change was the theatre it set out to prevent** — restore what the run says is missing.
- [x] 6.5 `eliciting.md` was cut on the no-evidence default. If the run shows the interview
      degraded, its lines come back.

## 7. Close out

- [x] 7.1 `pnpm lint` green (skill lint + markdownlint; the README table matches `skills/`).
- [x] 7.2 `openspec validate restructure-skill-writing-to-three-gates --strict`.
- [x] 7.3 `.ai/backlog/rule-writing-defects.md` — real defects the six runs found in
      `rule-writing` (the batch guard HARD FAILS; the budget definition contradicts itself, 6/6
      runs; the ≥80% branch emits a rule that never loads) — is left for its own change, not folded
      in here.
