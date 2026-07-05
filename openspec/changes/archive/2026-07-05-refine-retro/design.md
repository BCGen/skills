# Design: refine-retro

## Context

Decisions from the 2026-07-05 decision-quality interview. Users span
"wants to discuss the proposal" to "must rely on the result" — so the
analysis and decision must be visible, and the loop must stay correct even
when rules are written outside our tooling.

## Goals / Non-Goals

**Goals:** visible reasoning per proposal; correct routing for entry-file
facts; loop awareness of externally-written rules; polite fallback; a name
that matches daily use. **Non-Goals:** see proposal.

## Decisions

### D1. Name `retro`

Two independent user signals favored a short apt name (grill-me pattern).
Exact collisions exist (pm-skills@retro 1.5K, agentops@retro 843) —
accepted knowingly: namespaces isolate on skills.sh; local directory
collision only occurs if a user installs a second `retro`. Future variants
are invocation-scoped (same machinery) or separately-named skills
(different machinery, e.g. a rules audit); the base name is not a blocker.
*Rejected*: `retrospective` (lower collision but 8 chars longer; user
signal was explicit).

### D2. Reasoning attached to proposals (A)

"Finding + evidence + content + destination" left the decision a black
box — discussers had nothing to engage, dependents bore unexplained risk.
One line of why-this-destination plus one line of decline-consequence,
audience-matched. Explicit because unspecified behavior drifts
(fallback-state lesson).

### D3. Entry-file facts as a fifth route (B)

Corrected project facts (build commands, layout) were unroutable: rules
reject discoverable facts, memory is personal, backlog is for ideas.
Diff-first edit of the entry file (user-owned content → consent via diff).

### D4. Reconciliation before promotion (D)

Candidates promoted outside add-rule (manual application of a printed
draft, a teammate's branch, the user's own tooling) left the loop blind:
stale candidates would re-propose already-existing rules. Scanning rule
locations before proposing closes the blind spot without coupling to any
writer. add-rule stays mandatory when installed (quality gates are the
differentiator); the fallback stops re-advertising (C).

### D5. Light trim only

The only production defect so far came from under-specification, not
verbosity. Framing/duplication cut (~5 lines); anti-rationalization table
and per-destination state semantics kept in full. grill-me's 11-line
aesthetic doesn't transfer: different complexity class (stateless prompt
vs cross-file state machine).

## Risks / Trade-offs

- [Local name collision if a second `retro` is installed] → accepted;
  selective install (`--skill`) resolves.
- [Reconciliation matching is fuzzy (rule wording vs lesson wording)] →
  same matching standard as learnings (same behavior change, wording
  aside); when unsure, surface as a question in the proposal.

## Migration Plan

Rename directory + all references (incl. living spec folder, user's global
CLAUDE.md mandate, personal symlink) → implement A–D + trim → two new
acceptance scenarios + re-runs → push develop per publishing rule.
