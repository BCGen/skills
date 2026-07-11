# Tasks: checkpoints-naming-consent-real-fixtures

## 1. Checkpoints

- [x] 1.1 SKILL.md: after interrogation, restate the job, steps, triggers, artifacts
      and decisions, ask what is missing, and wait — before naming, before drafting
- [x] 1.2 SKILL.md: after the draft, present it and wait for the go-ahead before
      running it

## 2. Naming is the user's

- [x] 2.1 SKILL.md: naming becomes propose-with-reasons (or take the user's own),
      the user settles it, then check installed skills, then the registry only when
      the skill will be published
- [x] 2.2 `references/conventions.md` §Naming: record the order, and that a lookup
      informs the decision rather than making it

## 3. Real fixtures

- [x] 3.1 `references/dry-run.md`: a scenario is a use of the skill, never the
      request that asked for it, and nothing is derived from that request
- [x] 3.2 `references/dry-run.md`: for an elicitation skill, the live run comes
      first and its transcript is what the subagent consumes — no fabricated
      transcripts
- [x] 3.3 `references/dry-run.md`: when the user has no real case, say the draft is
      unverified rather than invent one

## 4. Fit and verify

- [x] 4.1 Keep SKILL.md within both caps (100 lines, 5,000 tokens)
- [x] 4.2 `tests/skill-writing/README.md`: check that no draft is written before the
      understanding is confirmed
- [x] 4.3 A scenario where the user is offered names and settles the choice — check
      the registry lookup runs after, not before
- [x] 4.4 A scenario for an elicitation skill — check no transcript file exists
      before the live run, and that the subagent's input is the live transcript
- [x] 4.5 Run `pnpm lint`; validate the change
