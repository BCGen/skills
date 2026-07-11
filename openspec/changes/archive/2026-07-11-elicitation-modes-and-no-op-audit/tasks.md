# Tasks: elicitation-modes-and-no-op-audit

## 1. Modes

- [x] 1.1 `references/eliciting.md`: split the rules into shared mechanics,
      adversarial moves, and generative moves
- [x] 1.2 Generative: breadth-first before depth; manufactured concreteness as
      pressure; a widening space counts as progress; saturation as the exit
- [x] 1.3 Adversarial: depth-first through the dependency tree; contradiction held
      side by side; the space shrinks; agreement as the exit
- [x] 1.4 A skill that does both runs the generative pass first

## 2. Missing mechanics

- [x] 2.1 Facts are looked up, never asked — only decisions earn a question
- [x] 2.2 The agent never answers its own question, and never declares the interview
      finished; the user ratifies
- [x] 2.3 The completion bar: a downstream implementer could act without asking
- [x] 2.4 The holding list — a question that cannot be stated precisely is parked,
      not asked; the test is phrasability, not answerability
- [x] 2.5 No question cap, and why: a cap conflates an under-specified idea with
      low-value questions

## 3. No-op audit

- [x] 3.1 `references/conventions.md`: cut the lines the model already obeys —
      numbered steps, matching the surrounding voice, not narrating the obvious
- [x] 3.2 `SKILL.md`: cut any line that would not change behavior if deleted
- [x] 3.3 `references/dry-run.md`: keep the rationale only where the rule is
      contested; cut restatement
- [x] 3.4 Keep every rule for which a real authoring run produced a real failure

## 4. Verify

- [x] 4.1 `tests/skill-writing/README.md`: a generative-interview scenario — check
      the first questions enumerate rather than resolve
- [x] 4.2 Run `pnpm lint`; validate the change
