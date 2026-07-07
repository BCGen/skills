<!-- CANONICAL SOURCE. Do not edit the per-skill copies; edit this file and
     run `pnpm sync-routing`. The repo lint fails if the copies drift. -->
# Mechanism routing (shared)

Given a convention or lesson, decide which mechanism should carry it. Shared
byte-identical across the harness skills (codify, retro, and
checkup) so the decision is identical whoever reaches it.
Success is the RIGHT mechanism, not "N rules created" — routing most things
to config/docs/nothing is correct.

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
the evidence-bounded upgrade).

## Evidence-bounded mechanism upgrade

For a convention that already has evidence (documented, consistent in code,
or user-stated) but is carried by a sub-optimal mechanism — e.g. a doc- or
verbally-enforced convention a linter/tool could enforce deterministically —
propose upgrading to the better mechanism for the user to discuss; do not
discard the current carrier unilaterally. The same applies to carrier
QUALITY: a doc violating the doc-writing guidance above, or an
entry-file reference in a lesser form than a labeled `@import` for a
short load-bearing doc, warrants the same consent-gated upgrade
proposal. Bound: only conventions with
existing evidence. Never pitch a best practice the project shows no sign of
caring about (no doc, no code pattern, no user statement).

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
