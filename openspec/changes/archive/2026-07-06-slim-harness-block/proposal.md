# Proposal: slim-harness-block

## Why

The harness block is resident in every session of every initialized
project, so every token must earn its place. Line by line: the format
hint "(one file per entry)" restates the `.ai/` READMEs; the rules line
restates what rule-writing's own trigger description and the
codify/retro delegations already carry (and its budget numbers restate
what rule-writing enforces); the install line was the self-propagation
pointer, but the user judged it dispensable — install discovery lives in
the collection README, and the resident cost is paid on every turn
forever. The user decided: the block carries exactly one thing — the
loop declaration.

## What Changes

- The managed harness block template shrinks to ONE line:
  "Run the retro skill when a task ends; lessons land in
  `.ai/learnings/`, ideas in `.ai/backlog/`."
- The spec's Team onboarding block requirement (MODIFIED) drops the
  install-command clause; the block declares the loop (retro directive +
  `.ai/` locations) within the same ≤3-line cap.
- The playbook drops the now-obsolete `<owner>/<repo>` slug-resolution
  paragraph; the repo's own CLAUDE.md block converges to the new
  template.
- The convergence test scenario preseeds the old 3-line block and
  expects it converged to the current 1-line template.
- Existing initialized projects converge on their next harness-sync run.

## Non-goals

- retro's rule-writing-absent fallback still mentions the install
  command once — that is a different, on-demand surface, not resident.
- The README's install section is untouched (it remains the discovery
  path).

## Impact

`skills/harness-sync/references/playbook.md`, `CLAUDE.md` (own block),
`tests/harness-sync/README.md` (converge scenario), harness-conventions
living spec (1 MODIFIED requirement).
