# Tasks: sharpen-elicitation-and-naming

## 1. Elicitation rules

- [x] 1.1 Write `skills/skill-writing/references/eliciting.md`: open on the fork;
      recommend a claim with its reason; a question states what it decides; name a
      contradiction on the spot. Include the head-to-head evidence that motivated
      each rule, briefly
- [x] 1.2 State that the rules govern both skill-writing's own interrogation and
      any authored skill whose job includes eliciting from a human — what
      skill-writing models, the skills it authors reproduce
- [x] 1.3 Point Step 4 of SKILL.md at the reference, saying when to read it

## 2. Naming

- [x] 2.1 Remove naming and the registry lookup from Step 3 — it keeps only "does
      one already exist", which needs the job and not the name
- [x] 2.2 Add a naming step after the draft: the skill's own name, the registry
      check for a publicly published skill, and alternatives that are themselves
      checked before being offered
- [x] 2.3 Fold the artifact's name and location into the output-shape question in
      Step 4, and state that the two naming decisions never share a turn and that
      each question says which one it decides
- [x] 2.4 Update `references/conventions.md` §Naming to cover the artifact's name
      alongside the skill's

## 3. The strongest control

- [x] 3.1 Add the step-level comparison after the draft: each step against the
      skills installed at the destination
- [x] 3.2 Update `references/dry-run.md`: the control is an installed skill that
      already performs the step, where one exists; the naked agent otherwise
- [x] 3.3 State that the draft meets the bar rather than depending on the installed
      skill — it cannot be assumed present where the authored skill later runs

## 4. Run hygiene

- [x] 4.1 `references/dry-run.md`: branch the method by the skill's shape —
      transform skills run as written; elicitation skills are run live by the user
      for the opening turns, with the subagent testing only the artifact
- [x] 4.2 `references/dry-run.md`: the control is proposed with reasoning and the
      user settles it; on no overlap, state the scan's scope, note that the user
      may name a control, and proceed without blocking
- [x] 4.3 `references/dry-run.md`: read descriptions, never bodies; the control
      subagent loads the installed skill itself so the authoring session never sees
      its text; hold the draft to its behavior, not its wording
- [x] 4.4 `references/dry-run.md`: prompt hygiene — the user's words verbatim,
      identical prompts for both runs, no success criteria in the prompt, show the
      prompt before sending
- [x] 4.5 `references/dry-run.md`: record WHY the raw output is shown instead of a
      verdict — the grader wrote the draft, and this is the only safeguard
- [x] 4.6 SKILL.md: never recite internal rules to the user; ask in their terms
      with at most one clause of reason

## 5. Fit and verify

- [x] 5.1 Keep SKILL.md within both caps (100 lines, 5,000 tokens) — move detail
      into references rather than trimming meaning
- [x] 5.2 `tests/skill-writing/README.md`: a skill with a named artifact — check
      the artifact question and the skill-name question never share a turn
- [x] 5.3 A scenario where an installed skill performs one drafted step better —
      check it is named and used as the control
- [x] 5.4 A scenario where a fork exists — check the first question states what it
      settles rather than offering parallel options
- [x] 5.5 A scenario where the draft requires an output the control would not
      produce — check neither prompt mentions it
- [x] 5.6 Refactor pass over SKILL.md and every reference: cut what no longer earns
      its place after six rounds of amendment, and check no rule is stated twice
- [x] 5.7 Run `pnpm lint`; validate the change
