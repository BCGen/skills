# Tasks: audit-for-no-ops-and-provenance

## 1. skill-auditing

- [x] 1.1 Add the no-op layer as Step 4, reported beside format and content
- [x] 1.2 Record the evidence order: provenance, then a deletion run, then report as a
      candidate — and that the agent's report of its own defaults is not evidence
- [x] 1.3 Add the mechanical case: a body passage restating a reference the body tells
      the agent to read at that point
- [x] 1.4 Update the principles table and the description; keep the body within its
      caps

## 2. skill-writing

- [x] 2.1 `references/conventions.md`: a rule records the failure it prevents, in a
      clause; a rule that names none is not written

## 3. Verify

- [x] 3.1 `tests/skill-auditing/README.md`: a no-op scenario — a rule with no
      provenance is reported as a candidate, not deleted; a rule with provenance is
      kept
- [x] 3.2 Run `pnpm lint`; validate the change
