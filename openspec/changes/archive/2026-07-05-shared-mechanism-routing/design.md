# Design: shared-mechanism-routing

## Context

From the codify follow-up interview (2026-07-06). Two findings drove this:
(1) users depend on retro far more than on codify (codify is one-time
setup; retro runs every task), so retro's optimization advice must match
codify's routing quality, not be a simplified fork; (2) the "hardening"
idea (suggest tools a project lacks) was mis-scoped as a separate skill —
it belongs in codify as an evidence-bounded upgrade proposal, and the same
routing brain is shared by codify, retro, and the future
consistency-checking.

## Goals / Non-Goals

**Goals:** one canonical routing logic, shared without drift; retro at full
routing parity; codify proposes evidence-bounded mechanism upgrades.
**Non-Goals:** see proposal.

## Decisions

### D1. Canonical routing as a byte-identical shared file

The routing core is one file, copied byte-identical into each consuming
skill's `references/`. Independent install (npx skills) makes cross-skill
references unreliable, so each skill carries its own copy; a repo lint
`cmp`s the copies and fails on any difference. This is deterministic
(a hook/CI check, not an advisory note — consistent with retiring advisory
rules in favor of enforcement). A single source file plus a sync step
(script copying source → the per-skill copies) keeps them in step; the lint
is the gate.

### D2. What is shared vs skill-specific

Shared (in routing.md): the routing table (convention/lesson → mechanism),
output boundary (code-convention config + project docs; point at
agent-behavior settings), judgment doc-first/rule-last with the ask gate,
reconciliation (respect existing placement), conflict handling
(authority-order, same-tier ask), and the evidence-bounded upgrade
proposal. Skill-specific (in each SKILL.md): codify's full-project scan,
authority-order scan sources, commit dimension, project-layer scope;
retro's signal detection, error-learning routes (memory / backlog /
skill-update), escalate-and-retire-redundant-rule; consistency-checking's
drift detection.

### D3. codify's evidence-bounded upgrade proposal

For a convention with existing evidence (documented, code-consistent, or
user-stated), codify evaluates its current carrier against the best
available mechanism and proposes an upgrade when the current one is
sub-optimal (e.g. a doc/verbal convention a linter could enforce
deterministically). Bound: only conventions with existing evidence — never
pitch a best practice the project shows no sign of caring about. This keeps
codify descriptive (helping the project enforce its OWN conventions better)
rather than prescriptive.

### D4. Parallel entry points, not invocation

codify (pre-dev, scans current practice), retro (post-dev, learns from this
task's errors), consistency-checking (drift backstop) share the routing
brain but do NOT call each other. retro does not invoke codify (codify is
an end-to-end scanner, not an API; invoking it would trigger a full scan).
Each applies the same canonical routing to its own evidence.

## Risks / Trade-offs

- [Byte-identical copies are easy to let drift] → the repo lint gate makes
  drift a hard failure, not a hope.
- [Sync step adds a manual move] → a tiny script + the lint; cheap.
- [retro parity enlarges retro's body] → keep the shared logic in
  routing.md (referenced), so retro's SKILL.md body only holds its
  error-learning specifics and stays within the line budget.
- [codify upgrade proposal drifting into pitching] → the evidence bound is
  the guardrail; state it in routing.md and check it in acceptance.

## Migration Plan

Extract routing.md from codify's current reference; dedupe skill-specific
parts back into codify's SKILL.md; write retro's parity version; add the
byte-identical lint; sync; acceptance via skill-testing on both codify and
retro (routing parity: same convention → same mechanism decision); publish
deferred.

## Open Questions

- Source-of-truth location for the shared file (a `shared/` dir synced out,
  vs one skill's copy designated source) — decide at implementation; the
  lint only cares that the installed copies match.
