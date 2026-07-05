# codify routing

How codify classifies each observed convention and routes it to the
fittest mechanism. Success is "the first agent execution is accurate," NOT
"N rules created" — routing most practice to config/docs/nothing is correct.

## Scope: project layer only

codify reads and writes only project-layer, version-controlled files. It
NEVER touches personal-layer files — auto memory
(`~/.claude/projects/.../memory`) or the global `~/.claude/CLAUDE.md`; those
are retro's "personal preference" domain. The project entry file
(`CLAUDE.md`/`AGENTS.md`) is a pointer surface within its ≤60-line budget,
not a container for detailed conventions. `README.md` is a human-facing
overview, not a default conventions home.

## Authority order (for detection and conflict)

When sources disagree: explicit config files (commitlint, eslint, tsconfig,
editorconfig) > project docs (CONTRIBUTING, README, entry file) >
code/history majority. Never carry assumptions across projects.

## Routing table

| Observed convention | Route |
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

## Output boundary (what codify writes vs points at)

codify produces two declarative artifact classes, both diff-first,
consent-gated, edited surgically (never clobber hand-written content):

1. **code-convention config** — constrains the code (`.editorconfig`,
   eslint/prettier/ruff stanza, tsconfig flag). Only extend/add config for a
   mechanism ALREADY in the project (add a missing key to an existing
   `.editorconfig`, a stanza to an existing eslint config). Standing up a
   NEW toolchain (installing a formatter/linter that isn't there) is an
   executable, dependency-adding change → POINTER, not a codify write.
2. **project convention docs** — the shared human+agent source of truth
   (edit an existing CONTRIBUTING/docs, or a consent-created doc).

It POINTS at (never wires) settings that govern AGENT BEHAVIOR — git hooks,
`settings.json` permissions, CI, file generators — with a paste-ready
snippet. `permissions.deny` is a pointer despite being declarative: it
governs the agent, not the code.

## Judgment conventions: doc first, rule last

A judgment convention is never inferred from a code pattern alone (a pattern
is discoverable; rule-writing would reject it). The pattern is a CLUE →
codify ASKS "is this a team rule?"; only documented guidance or user
confirmation makes it load-bearing. Then place it by preference:

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
- Source-resolution writes by carrier: config → codify edits; rule → via
  rule-writing; drifting CODE → flagged only, never edited by codify.

## Delegation

- Rules → rule-writing (single write path; unchanged filter and budget).
- Procedures / build-step structure → skill-writing (project-local skill).
- If a delegate skill is not installed, codify prints the drafted content
  and mentions the install option at most once.
