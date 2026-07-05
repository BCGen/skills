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
| Mechanically enforceable (format, imports, lint-fixable naming, strict-null) | declarative config artifact |
| Non-discoverable judgment / tribal | rule, via rule-writing (filter+budget unchanged) |
| Must-never / event-gated | pointer: paste-ready hook/permission/CI snippet |
| Multi-step procedure | pointer/point at a skill |
| Structural default | pointer: template/scaffold |
| Conflicting | surface → user picks winner+scope → back with a tool |

### D5. Produce declarative config; only point at executable artifacts

Extends ai-init's declarative-vs-executable line. codify MAY generate
declarative, diff-first, idempotent, cross-platform config (`.editorconfig`,
eslint/prettier/ruff stanza, tsconfig flag) — same safety properties as the
markdown the collection already produces, and without it the collection has
NO preventive enforcement for the largest convention class. It MUST NOT wire
executable, high-blast-radius, platform-specific artifacts (git hooks, CI,
settings.json, MCP); those get a paste-ready snippet, and real wiring lives
in a separate opt-in skill (backlog).

### D6. Conflicts resolved at source, never in prose

Prose arbitration ("this rule wins") is unreliable. On conflict codify
surfaces it, has the user choose the winner and scope, then resolves at
source (converge on one config / delete the loser) and backs it with a
tool. This makes codify the owner of the "conflicting conventions"
north-star situation.

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
