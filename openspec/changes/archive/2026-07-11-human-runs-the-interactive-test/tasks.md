# Tasks: human-runs-the-interactive-test

## 1. The elicitation branch collapses to a fresh-session live run

- [x] 1.1 `references/dry-run.md`: an elicitation skill is verified by the user in a
      **fresh session** — no subagent, no transcript fixture, no tail run
- [x] 1.2 Record why the session must be fresh: the authoring session knows the
      answers and completes the skill from memory, supplying the sentences SKILL.md
      failed to write
- [x] 1.3 State the handoff: write the draft to its destination so it can be
      invoked, tell the user what to bring back (a real case, and what went wrong),
      and amend from that
- [x] 1.4 Mechanical checks run against the artifact that session produced

## 2. The control follows the same rule

- [x] 2.1 `references/dry-run.md`: for a live-run skill, the control is the user's to
      run, offered once with the candidate and the reason, never simulated by a
      subagent

## 3. Cleanup

- [x] 3.1 Remove the transcript-fixture text and the ordering rule it needed
- [x] 3.2 SKILL.md: check the Step 8 pointer still describes what the reference now
      says
- [x] 3.3 `tests/skill-writing/README.md`: the elicitation scenario checks that no
      subagent was dispatched and no transcript file was written
- [x] 3.4 Run `pnpm lint`; validate the change
