<!-- CANONICAL SOURCE. Do not edit the per-skill copies; edit this file and
     run `pnpm sync-routing`. The repo lint fails if the copies drift. -->
# Mechanism routing (shared)

Given a convention or lesson, decide which mechanism should carry it. Shared
byte-identical across the harness skills (codify, retro, and
checkup) so the decision is identical whoever reaches it.
Success is the RIGHT mechanism, not "N rules created" — routing most things
to config/docs/nothing is correct.

## Contents

- [Authority order](#authority-order)
- [Probe preset-extended configs before deciding "already enforced"](#probe-preset-extended-configs-before-deciding-already-enforced)
- [Routing table](#routing-table)
- [Output boundary (produce vs point at)](#output-boundary-produce-vs-point-at)
- [Reconciliation: respect an existing placement first](#reconciliation-respect-an-existing-placement-first)
- [Evidence-bounded mechanism upgrade](#evidence-bounded-mechanism-upgrade)
- [Judgment conventions: doc first, rule last](#judgment-conventions-doc-first-rule-last)
- [Placement by loading: single source in a surface that actually loads](#placement-by-loading-single-source-in-a-surface-that-actually-loads)
- [Conflict handling](#conflict-handling)
- [Delegation](#delegation)

## Authority order

When sources disagree: explicit config files (commitlint, eslint, tsconfig,
editorconfig) > project docs (CONTRIBUTING, README, entry file) >
code/history majority. Never carry assumptions across projects.

## Probe preset-extended configs before deciding "already enforced"

A config that `extends` a shared preset (e.g. `@antfu/eslint-config`,
`@commitlint/config-conventional`) enforces rules that are NOT visible in
the repo's own files. Do NOT decide "already enforced → nothing" or "not
enforced → propose config" from the config file text alone for anything a
preset may cover. Probe the effective config first — run the tool's resolver
(e.g. `eslint --print-config <file>`) or the linter once. If probing is
impossible, ASK rather than generate a config that may duplicate a preset
rule.

## Routing table

| Convention / lesson | Route |
| --- | --- |
| Discoverable fact (versions, layout, existing pattern) | nothing — the agent reads it |
| Mechanically enforceable, not yet enforced | generate a declarative config artifact |
| Mechanically enforceable, already enforced by config | nothing (already prevented) |
| Judgment / tribal (confirmed) | project doc first, rule last — see below |
| Multi-step procedure | hand to skill-writing (project-local skill) |
| Structural default as build steps | hand to skill-writing |
| Structural default needing a file generator | pointer (plop/hygen snippet) |
| Must-never / agent-behavior setting | pointer (hook/permission/CI snippet) |
| Conflicting | authority order; ask only same-tier ties |

Skills may add their own routes on top of this table in their SKILL body
(e.g. retro's personal-memory / backlog / skill-update routes) — those are
skill-specific and stay out of this shared file.

## Output boundary (produce vs point at)

Produce two declarative artifact classes, both diff-first, consent-gated,
edited surgically (never clobber hand-written content):

1. **code-convention config** — constrains the code (`.editorconfig`,
   eslint/prettier/ruff stanza, tsconfig flag). Only extend/add config for a
   mechanism ALREADY in the project (a missing key in an existing
   `.editorconfig`, a stanza in an existing eslint config). Standing up a
   NEW toolchain (installing a formatter/linter that isn't there) is an
   executable, dependency-adding change → POINTER, not a write.
2. **project convention docs** — the shared human+agent source of truth
   (edit an existing CONTRIBUTING/docs, or a consent-created doc).
   Written for the human teammate: each convention is a plain sentence
   saying what to do, with one concrete example when it disambiguates.
   One action per sentence or bullet — never chain clauses with
   semicolons. No tool-policy preambles, no routing vocabulary, and
   never record the absence of a convention.

POINT at (never wire) settings that govern AGENT BEHAVIOR — git hooks,
`settings.json` permissions, CI, file generators — with a paste-ready
snippet. `permissions.deny` is a pointer despite being declarative: it
governs the agent, not the code.

## Reconciliation: respect an existing placement first

Before placing ANY convention, check whether it already has a home — an
existing rule (`.claude/rules`, e.g. one already promoted), a doc, or a
config. If it does, RESPECT that placement: do not migrate it (never
rule→doc or doc→rule) and do not write a duplicate. Doc-first/rule-last
below governs only conventions with NO existing home. Respect governs
WHERE it lives, not how well it is written — a carrier falling short of
current standards may still get a consent-gated upgrade proposal (see
the evidence-bounded upgrade). One exception overrides "never migrate": a
home that does NOT load for a MUST-SEE fact (e.g. a must-never constraint
living only in a doc the agent will not auto-load) is a mis-placement, not a
placement to respect — relocating or restating it in a loading surface (a
rule, or `AGENTS.md`/entry-file inline per Placement by loading) is the
sanctioned consent-gated upgrade.

## Evidence-bounded mechanism upgrade

For a convention that already has evidence (documented, consistent in code,
or user-stated) but is carried by a sub-optimal mechanism — e.g. a doc- or
verbally-enforced convention a linter/tool could enforce deterministically —
propose upgrading to the better mechanism for the user to discuss; do not
discard the current carrier unilaterally. The same applies to carrier
QUALITY: a doc violating the doc-writing guidance above warrants the same
consent-gated upgrade proposal. An entry-file reference is NOT automatically
improved by switching a plain pointer to an `@import`: an `@import` is eager
and spends context every session, so reserve it for a short doc whose BULK is
load-bearing every session and leave a plain pointer otherwise (see Placement
by loading). Bound: only conventions with existing evidence. Never pitch a
best practice the project shows no sign of caring about (no doc, no code
pattern, no user statement).

## Judgment conventions: doc first, rule last

A judgment convention is never inferred from a code pattern alone (a pattern
is discoverable; rule-writing would reject it). The pattern is a CLUE → ASK
"is this a team rule?"; only documented guidance or user confirmation makes
it load-bearing. For a convention with no existing home, place by preference:

1. **Existing fitting doc** → add to / correct it; write no rule (a copy in
   `.claude/rules` would double-maintain and drift). A doc-vs-code conflict
   where the doc is right resolves here (edit doc; flag code drift).
2. **No fitting doc, worth persisting** → propose creating a conventions doc
   and DISCUSS location; do not create unilaterally. Recommend by nature:
   code conventions → `docs/conventions.md`; contribution/workflow →
   `CONTRIBUTING.md`; reasoned architecture decision → an ADR (`docs/adr/`).
   On consent, create it and add an entry-file `@import`/pointer.
3. **Short pure agent-behavior constraint** → draft a rule via rule-writing.

Rule is the LAST resort. Never write a rule duplicating a convention already
living in a project doc.

## Placement by loading: single source in a surface that actually loads

Agents auto-load only some surfaces into context: the entry file
(`CLAUDE.md` / `AGENTS.md`) and resident rules (`.claude/rules`,
`.cursor/rules`). Docs (README, CONTRIBUTING, `docs/`) do NOT auto-load —
they enter context only via an `@import` in the entry file or when the agent
opens them. Rule directories are agent-specific: `.claude/rules` is read only
by Claude Code, `.cursor/rules` only by Cursor; other agents read `AGENTS.md`.

Give a fact ONE home, deciding in order — when a fact fits two questions, the
earlier one wins:

1. **Inferable from code/manifest?** (version, layout, an existing pattern)
   → no home; the agent reads it. Hard-coding it only creates a future stale
   copy. (A must-see fact that is NOT obvious to derive is not "inferable"
   here — carry it to Q2–4.)
2. **Must-see?** Removal test — "would removing this make the agent err in
   work that need not open the doc?" If NO, it is not must-see → the doc is
   its home and the entry file POINTS to it. Use an `@import` only when the
   doc's BULK is load-bearing every session (the import is eager, spending
   context each launch); a plain pointer otherwise. Doc-first still governs
   the non-must-see majority.
3. **Must-see behavioral constraint** (must-never / must-always) → a rule via
   rule-writing, scoped by reach: applies everywhere → a resident rule;
   applies only to certain paths/extensions → a path/glob-scoped rule (loads
   only for matching files, off the resident budget).
4. **Must-see descriptive fact** (short, stable orientation, not a behavioral
   rule) → give it a loading home WITHOUT a second restated copy. If it lives
   in a short doc, prefer `@import`-ing that doc so the doc stays its sole home
   (loads every session, still human-readable). Otherwise state it inline in
   the entry file (authoritative) AND downgrade any doc restatement to a
   reference. A LONG must-see doc → inline its short kernel and pointer the
   rest. Never leave the same value restated in two surfaces.

Cross-agent reach escalates the home: a rule dir reaches only its own agent,
so a constraint that must reach EVERY agent belongs in `AGENTS.md` — the one
surface all agents auto-load — not a per-agent rule dir. Default to the
agent-native rule; escalate to `AGENTS.md` only when cross-agent reach is
required. `AGENTS.md` cannot path-scope; when a constraint is both
path-scoped AND must reach an agent that reads only `AGENTS.md`, reach wins —
state it in `AGENTS.md` (accepting the always-on cost) or narrow its wording.

Two invariants:

- A must-see fact is NEVER reachable only through a pointer to a
  non-auto-loading doc — it lives in a surface that loads.
- One home per fact: other surfaces reference it, they do not restate its
  value (a restated value is the duplicate that drifts).

## Conflict handling

- Cross-tier disagreement the authority order settles (config vs code) →
  auto-resolve, flag as drift, do not interrupt.
- Same-tier mutual conflict the order cannot break (two lint configs; a doc
  vs the user's in-session answer) → surface, user picks winner + scope.
- Never arbitrate in prose ("this rule takes precedence").
- Source-resolution writes by carrier: config → edit it; rule → via
  rule-writing; drifting CODE → flagged only, never edited here.

## Delegation

- Rules → rule-writing (single write path; unchanged filter and budget).
- Procedures / build-step structure → skill-writing (project-local skill).
- If a delegate skill is not installed, print the drafted content and
  mention the install option at most once.
