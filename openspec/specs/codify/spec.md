# codify Specification

## Purpose

TBD - created by archiving change add-codify. Update Purpose after archive.

## Requirements

### Requirement: Explicit, one-time, non-init invocation

codify SHALL run only when explicitly invoked, never on the harness-sync path.
It reads the repository for analysis (which produces no resident context)
and proposes changes for consent; it MUST NOT auto-generate unfiltered
resident instructions.

#### Scenario: Not triggered by harness-sync

- **WHEN** harness-sync initializes a project
- **THEN** codify does not run and no conventions are auto-generated

#### Scenario: Explicit invocation scans practice

- **WHEN** the user invokes codify on a project
- **THEN** it reads config files, project docs, and code/history to detect current conventions

### Requirement: Authority order for detection

When truth-checked sources disagree on a convention, codify SHALL
resolve by the order: explicit config files (commitlint, eslint,
tsconfig, editorconfig, etc.) > project docs (CONTRIBUTING, README,
entry file) > code/history majority. The order ranks convention choices
between truthful sources; a doc that fails the truth-check (unedited
boilerplate, false verifiable claims) is excluded from the order before
ranking. codify MUST NOT carry assumptions from one project to another.

#### Scenario: Config beats history

- **WHEN** an explicit lint config contradicts what most existing code does
- **THEN** codify treats the config as authoritative and flags the code drift

#### Scenario: Failed doc does not outrank code

- **WHEN** a doc that failed the truth-check disagrees with the code
  majority on a convention
- **THEN** the doc does not win by tier; codify treats it as a finding
  to correct, not an authority

### Requirement: Enforcement-class routing

codify SHALL classify each observed convention and route it: discoverable
facts → nothing; mechanically enforceable and not yet enforced → a
declarative config artifact (already enforced by existing config →
nothing); non-discoverable judgment → a rule via rule-writing; multi-step
procedures and build-step-expressible structural defaults → skill-writing;
file-generator structure and must-never / agent-behavior settings → a
paste-ready pointer snippet. Its success is measured by first-execution
accuracy, not by the number of rules created.

#### Scenario: Lint-fixable style not yet enforced routes to config

- **WHEN** a formatter/linter-expressible style (e.g. quote style) is detected and no existing config enforces it
- **THEN** codify proposes a config artifact, not a rule

#### Scenario: Already-enforced style routes to nothing

- **WHEN** the detected style is already enforced by an existing lint/format config
- **THEN** codify proposes no artifact for it

#### Scenario: Discoverable fact routes to nothing

- **WHEN** the detected convention is discoverable by reading the repo (e.g. directory layout)
- **THEN** codify proposes no artifact for it

### Requirement: Project-layer scope only

codify SHALL operate only on project-layer, version-controlled files. It
MUST NOT read or write personal-layer files — auto memory or the global
`~/.claude/CLAUDE.md`. The project entry file (`CLAUDE.md`/`AGENTS.md`) is in
scope as a pointer surface (`@import`/short pointers within its budget) and,
for a short must-see descriptive fact that has no better single-source home,
as the authoritative inline home for that one fact — but never as a container
for detailed conventions, which stay in docs. `README.md` is not a default
conventions target.

#### Scenario: Personal files untouched

- **WHEN** codify runs on a project
- **THEN** it neither reads nor writes auto memory or the global user CLAUDE.md

#### Scenario: Entry file gets a pointer, not detail

- **WHEN** a detailed judgment convention is placed in a doc
- **THEN** codify may add an `@import`/pointer in the entry file but does not write the detailed convention into the entry file

#### Scenario: Short must-see fact may be inline

- **WHEN** a short, stable, must-see descriptive fact has no better single-source home
- **THEN** codify may state it inline in the entry file as its authoritative home, and no other surface restates its value

### Requirement: Judgment conventions prefer project docs, rule is last resort

codify SHALL NOT infer a judgment convention from a code pattern alone; a
pattern only prompts codify to ask the user whether it is a required
convention. Once confirmed (or found as documented tool-unenforceable
guidance), codify SHALL place it by this order: (1) if a fitting project doc
exists, add to or correct that doc and write no rule; (2) if no fitting doc
exists but the convention is worth persisting, propose creating a
conventions doc, discuss with the user where it belongs and how to organize
it, and create it only on consent; (3) only a short pure agent-behavior
constraint is drafted as a rule via rule-writing. codify MUST NOT
unilaterally create project docs, and MUST NOT write a rule that duplicates
a convention already living in a project doc.

#### Scenario: Pattern not confirmed

- **WHEN** the user says an observed pattern is incidental, not a rule
- **THEN** codify persists nothing for it

#### Scenario: Fitting doc exists

- **WHEN** a confirmed judgment convention belongs in an existing CONTRIBUTING/docs file
- **THEN** codify proposes editing that doc (diff-first) and does not also write a rule

#### Scenario: No doc, worth persisting

- **WHEN** a confirmed judgment convention has no fitting project doc
- **THEN** codify proposes creating a conventions doc, discusses its location with the user, and creates it only on consent

#### Scenario: Short agent-only constraint

- **WHEN** a confirmed convention is a short pure agent-behavior constraint not worth a project doc
- **THEN** codify drafts a rule via rule-writing

### Requirement: Procedures and build-step structure hand to skill-writing

codify SHALL route a multi-step procedure convention, and a structural
default expressible as build steps, to the skill-writing skill to author a
project-local skill (on user consent). Structure requiring an executable
file generator SHALL be a pointer. If skill-writing is not installed,
codify SHALL summarize the procedure as a pointer.

#### Scenario: Release procedure becomes a project skill

- **WHEN** a documented multi-step procedure (e.g. release checklist) is detected and approved
- **THEN** codify hands it to skill-writing to create a project-local skill

### Requirement: Declarative config generation, executable pointers only

codify SHALL generate only declarative artifacts. It MAY generate
declarative, diff-first, idempotent, cross-platform
config artifacts (`.editorconfig`, eslint/prettier/ruff stanza, tsconfig
flag) with consent. It MUST NOT wire executable, high-blast-radius,
platform-specific artifacts (git hooks, CI, settings.json, MCP); for those
it outputs a paste-ready snippet only.

#### Scenario: Generate a config with consent

- **WHEN** a mechanically-enforceable convention is approved
- **THEN** codify writes the declarative config artifact after showing a diff, and re-running produces no further change

#### Scenario: Must-never stays a pointer

- **WHEN** a must-never convention is detected (e.g. never commit to main)
- **THEN** codify outputs a paste-ready hook/CI snippet and does not wire it

### Requirement: Conflicts resolved at source with the user

codify SHALL distinguish drift from conflict by authority order. A
cross-tier disagreement the order settles (e.g. config vs code) SHALL be
auto-resolved and flagged as drift without interrupting the user. Only a
same-tier conflict the order cannot break SHALL be surfaced for the user to
pick winner and scope. codify MUST NOT arbitrate in prose (never write "this
rule takes precedence"). On resolution the loser is written by its carrier:
config → codify edits it; rule → via rule-writing; drifting CODE → flagged
only, never edited by codify.

#### Scenario: Cross-tier drift auto-resolves

- **WHEN** an explicit config disagrees with what most code does
- **THEN** codify treats the config as the winner and flags the code drift without asking

#### Scenario: Same-tier conflict asks the user

- **WHEN** two same-authority sources specify incompatible conventions
- **THEN** codify asks the user to choose and does not write a prose precedence rule

#### Scenario: Loser code is not edited

- **WHEN** the losing side of a resolved conflict is source code
- **THEN** codify flags it for later fixing and does not modify the code

### Requirement: Delegates rule writes to rule-writing

codify MUST NOT write rule files itself. Rule writes go through rule-writing
(unchanged filter and budget). If rule-writing is not installed, codify
prints the drafted rules plus any config artifacts, mentioning the install
option at most once.

#### Scenario: rule-writing absent

- **WHEN** a rule is approved but rule-writing is not installed
- **THEN** codify prints the drafted rule for manual use, with at most one mention of the install option

### Requirement: Evidence-bounded mechanism upgrade proposal

codify SHALL, for a convention that already has evidence in the project
(documented, consistent in code, or user-stated), evaluate its current
carrier against the best available enforcement mechanism AND against the
current authoring standards (the shared doc-writing guidance; a labeled
`@import` for a short, load-bearing doc), and propose an upgrade when
the carrier falls short — as a consent-gated diff for user discussion.
This includes artifacts codify itself wrote in earlier runs. codify MUST
NOT propose a mechanism for a convention that has no existing evidence
(no unsolicited best-practice pitching).

#### Scenario: Doc convention upgradable to a tool

- **WHEN** a convention is currently enforced only by a project doc but a tool could enforce it deterministically
- **THEN** codify proposes the tool upgrade for discussion, without discarding the doc unilaterally

#### Scenario: Substandard carrier gets an upgrade proposal

- **WHEN** a placed conventions doc violates the doc-writing guidance
  (e.g. a tool-policy preamble, a recorded non-convention), or an
  entry-file reference uses a lesser form than a labeled `@import` for a
  short load-bearing doc
- **THEN** codify proposes the carrier upgrade as a consent-gated diff
  and writes nothing without approval

#### Scenario: No evidence, no proposal

- **WHEN** a best practice has no sign the project cares about it (no doc, no code pattern, no user statement)
- **THEN** codify proposes nothing for it

### Requirement: Shared canonical routing

codify SHALL apply the shared canonical routing logic from its
byte-identical `references/routing.md`. Skill-specific behavior (full scan,
authority-order sources, commit dimension, project-layer scope) lives in
the SKILL body, not the shared file.

#### Scenario: Routing matches the canonical logic

- **WHEN** codify routes a convention
- **THEN** the decision follows the shared routing.md, identical to what retro's copy would decide for the same convention

### Requirement: Scanned docs are truth-checked

A doc codify reads as an authority source SHALL be checked against
observed reality before it is trusted. The check covers verifiable
binary facts only — unedited template boilerplate, commands or paths
that do not exist — never convention choices (facts can be false;
conventions are chosen, and disagreements between truthful sources stay
with the authority order). A doc failing the check SHALL lose its
authority standing for detection, be flagged as a finding, and receive
a consent-gated correction proposal. codify MUST NOT silently treat
such a doc as authoritative.

#### Scenario: Boilerplate README flagged

- **WHEN** the project README is an unedited hosting-platform template
  carrying no project truth
- **THEN** codify flags it, excludes it from the authority order, and
  proposes a corrected project front page for consent

#### Scenario: Doc contradicting verifiable facts

- **WHEN** a scanned doc names commands or paths that do not exist in
  the project
- **THEN** codify surfaces the mismatch as a finding instead of treating
  the doc as authoritative

### Requirement: Facts are single-sourced in a surface that loads

codify SHALL give each fact the agent needs exactly one home, chosen by the
shared routing's "Placement by loading" procedure: a fact inferable from
code/manifest gets no hard-coded home; a non-must-see fact's home is its
human doc, referenced from the entry file by a pointer (or an eager `@import`
only when the doc's bulk is load-bearing every session); a must-see
behavioral constraint routes to a rule (resident, or path/glob-scoped by
reach); a must-see descriptive fact gets a loading home without a second
restated copy — `@import` the short doc that holds it (keeping the doc its
sole home), or inline it in the entry file and downgrade any doc restatement
to a reference (a long must-see doc has its short kernel inlined, the rest
pointered). codify MUST NOT copy a fact that already lives in a
human doc into the entry file as a parallel duplicate, and MUST NOT leave a
must-see fact reachable only through a pointer to a doc that does not
auto-load. When a fact must reach every agent, its home escalates to
`AGENTS.md`, not a per-agent rule directory.

#### Scenario: Fact already in README

- **WHEN** a non-must-see build/test command the agent needs is already in README
- **THEN** codify references README from the entry file (pointer, or `@import` only if README's bulk loads every session) rather than copying the command into the entry file

#### Scenario: Must-see constraint not left behind a pointer

- **WHEN** a must-see behavioral constraint is documented only in a long doc the agent will not auto-load
- **THEN** codify routes it to a rule (or, for cross-agent reach, `AGENTS.md`) so it is in context, not left reachable only via a pointer

#### Scenario: Frequently-changing information

- **WHEN** a fact changes often (e.g. a version number)
- **THEN** codify keeps its value out of the entry file; a plain pointer to the doc is allowed since it stays current without drifting
