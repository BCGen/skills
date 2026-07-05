# Design: add-codify

## Context

Decisions from the Phase-3 planning interview (2026-07-05), backed by a
four-way research pass (non-rule mechanisms, rule limits, convention
taxonomy, our gaps). Core finding: rules are necessary but not sufficient
and are the BEST mechanism for only one convention class (non-discoverable
judgment/tribal conventions). Everything else has a better home. So the
skill is a convention router, not a rule author.

Evidence anchors: IFScale arXiv 2507.11538 (~150–200 instruction ceiling,
~100–150 usable after Claude Code built-ins); ETH Zurich arXiv 2602.11988
(redundant/generated resident context lowers success ~3%); ACE arXiv
2510.04618 (context collapse); Anthropic's own guidance ("when something
absolutely must not happen, an instruction is the wrong tool — a real
guardrail must be deterministic").

## Goals / Non-Goals

**Goals:** get the first agent execution on an existing project accurate by
routing each observed convention to its fittest mechanism; own the
north-star "conflicting conventions" situation. **Non-Goals:** see proposal.

## Decisions

### D1. Router, not generator

codify's job is triage + routing, measured by "first execution accurate,"
not rule count. It must route most observed practice to config/nothing and
reserve rules for the non-discoverable judgment band. This is the primary
guard against the research-flagged failure of bulk-restating discoverable
facts as rules.

### D2. Runs after ai-init, explicit, one-time, interactive

Separates three operations the research distinguishes: auto-GENERATING
unfiltered resident context (ai-init correctly refuses) vs ANALYSIS/reading
the repo (zero resident tokens, harmless) vs consent-gated filtered PROPOSAL
(codify). Discovery ≠ generation, so ai-init stays a declarative-only
installer and codify does the discovery on explicit invocation.

### D3. Authority order (generalized from the personal `commit` skill)

explicit config files (commitlint, eslint, tsconfig, editorconfig) > project
docs (CONTRIBUTING, README, CLAUDE.md) > code/history majority. Never carry
assumptions across projects. commit's detection-source table is the model;
codify applies it across convention domains, not just commits.

### D4. Enforcement-class routing table (the heart of the skill)

| Observed convention | Route |
| --- | --- |
| Discoverable fact (versions, layout, existing pattern) | nothing — let the agent read |
| Mechanically enforceable AND not already enforced | generate declarative config artifact |
| Mechanically enforceable AND already enforced by existing config | nothing (already prevented) |
| Non-discoverable judgment / tribal | rule, via rule-writing (only from doc text or user confirmation — see D9) |
| Multi-step procedure | hand to skill-writing → project-local procedure skill (D10) |
| Structural default expressible as build steps | hand to skill-writing → "build X" skill (D10) |
| Structural default needing a file generator (plop/hygen) | pointer: paste-ready generator snippet |
| Must-never / agent-behavior setting (hooks, permissions, CI) | pointer: paste-ready snippet (D5) |
| Conflicting | same authority tier → ask user to pick; cross-tier → auto-resolve by authority order + flag drift (D11) |

### D5. codify produces "code-convention config"; points at "agent-behavior settings"

The output boundary is drawn by what a convention governs, from codify's own
job (make the CODE follow conventions) — NOT borrowed from ai-init. codify
MAY generate declarative config that constrains the CODE itself
(`.editorconfig`, eslint/prettier/ruff stanza, tsconfig flag) — diff-first,
idempotent, useful to any agent or human on the project. It MUST NOT write
settings that govern AGENT BEHAVIOR (git hooks, `settings.json`
permissions, CI) — those are a different layer (agent/workflow governance),
platform-specific and security-sensitive; codify points at them with a
paste-ready snippet. `permissions.deny` is a pointer even though it is
declarative, because it governs the agent, not the code.

### D6. Conflicts: authority order first, ask only same-tier ties (D11)

Prose arbitration ("this rule wins") is unreliable, so codify never writes a
precedence sentence. A cross-tier disagreement the authority order settles
(config beats code drift) is auto-resolved and flagged as drift without
interrupting the user. Only a same-tier mutual conflict the order cannot
break (two lint configs; project doc vs the user's in-session answer) is
surfaced for the user to pick winner + scope. Source resolution then writes
per D11.

### D7. Delegates rule writes to rule-writing

codify drafts rule text but rule-writing remains the single write path
(admission filter, budget, provenance, dialect). If rule-writing is not
installed, codify prints the drafted rule and the config artifacts, and
mentions the install option at most once.

### D8. Interface with retro and future consistency-checking

codify is the preventive/setup-time pass (first run right); retro is the
reactive per-task pass (fix what slipped). A future consistency-checking
skill is the drift backstop and must also route hard/mechanical findings to
enforcement and flag rules a new config/test made redundant so budget can
be reclaimed. All three route through rule-writing for rule writes.

### D9. Judgment rules come only from doc text or user confirmation

A judgment rule may NOT be inferred from a code pattern — a pattern is
discoverable by definition and would be rejected by rule-writing's filter
(and is net-negative per the research). A detected code pattern is a CLUE,
not a source. codify observes the pattern, then ASKS the user "is this a
team rule?"; only a documented judgment rule (a doc text a tool can't
enforce) or the user's confirmation makes it a rule. The "it's a rule"
fact is the non-discoverable part rule-writing's filter needs. Example:
all HTTP calls use `internalClient` (a pattern) → ask → user confirms
"required, has retry+tracing" → draft rule via rule-writing. Counter:
camelCase → eslint-expressible → config; components under `src/components/`
→ discoverable → nothing.

### D10. codify is a full router: procedures/structure hand to skill-writing

Symmetric to handing rules to rule-writing: a multi-step procedure (release,
add-migration) and a structural default expressible as build steps are
handed to skill-writing to author a PROJECT-LOCAL skill (in the project's
`.claude/skills/`), on user consent. Structure that needs a real file
generator (plop/hygen, executable) is a pointer instead. skill-writing
absent → codify degrades to summarizing the procedure as a pointer.

### D11. Source-resolution writes match the output boundary

When a conflict/drift is resolved, the loser is handled by its carrier:
loser is config → codify edits it (its own output); loser is a rule → hand
to rule-writing to delete/edit; the drifting artifact is CODE → codify does
NOT touch code (a dev action, out of scope) — it flags it for the user or a
later agent to fix.

## Risks / Trade-offs

- [Scope creep into a rule generator] → hard rule: most observed practice
  routes to config/nothing; never lower rule-writing's bar.
- [Generated config collides with existing config] → consent-gate every
  artifact; detect existing config first (authority order); diff-first.
- [Rule + config double-enforcing the same thing] → prefer config, do not
  also write a rule for it; note for the future consistency-checking skill
  to retire redundant rules.
- [Config generation is the collection's first non-markdown output] →
  bounded to declarative, cross-platform, diff-first artifacts; executable
  wiring stays out.
- [Expectation gap: user expects "a set of rules"] → set expectations that
  codify produces FEW rules and mostly config/pointers; that is the correct,
  evidence-backed outcome.

## Migration Plan

Implement codify; acceptance via skill-testing on a fixture project with a
mix (a lint-fixable style, a non-discoverable tribal convention, a
conflicting pair, a commit convention); dogfood on a real project; retire
the commit-migration backlog entry; publication deferred (develop → main).

## Open Questions

- Config-artifact lint: repo lint currently covers markdown/skills only;
  whether to add a check that generated config fixtures are valid — decide
  at implementation.
