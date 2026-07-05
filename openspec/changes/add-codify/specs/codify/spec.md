# codify

Scan a project's current practice, classify each convention by enforcement
class, and route it to the fittest mechanism. Runs after ai-init, explicitly
invoked. Obeys `harness-conventions`.

## ADDED Requirements

### Requirement: Explicit, one-time, non-init invocation

codify SHALL run only when explicitly invoked, never on the ai-init path.
It reads the repository for analysis (which produces no resident context)
and proposes changes for consent; it MUST NOT auto-generate unfiltered
resident instructions.

#### Scenario: Not triggered by ai-init

- **WHEN** ai-init initializes a project
- **THEN** codify does not run and no conventions are auto-generated

#### Scenario: Explicit invocation scans practice

- **WHEN** the user invokes codify on a project
- **THEN** it reads config files, project docs, and code/history to detect current conventions

### Requirement: Authority order for detection

When sources disagree, codify SHALL resolve by the order: explicit config
files (commitlint, eslint, tsconfig, editorconfig, etc.) > project docs
(CONTRIBUTING, README, entry file) > code/history majority. It MUST NOT
carry assumptions from one project to another.

#### Scenario: Config beats history

- **WHEN** an explicit lint config contradicts what most existing code does
- **THEN** codify treats the config as authoritative and flags the code drift

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

### Requirement: Judgment rules only from doc text or user confirmation

codify SHALL NOT infer a rule from a code pattern alone. When a code
pattern suggests a possible convention, codify SHALL ask the user whether
it is a rule; only a documented judgment convention (tool-unenforceable) or
the user's confirmation qualifies it to be drafted as a rule.

#### Scenario: Pattern confirmed as a rule

- **WHEN** codify observes a code pattern (e.g. all HTTP via an internal client) not covered by any config or doc
- **THEN** it asks the user, and drafts a rule only if the user confirms it is a required convention

#### Scenario: Pattern not confirmed

- **WHEN** the user says the observed pattern is incidental, not a rule
- **THEN** codify drafts no rule for it

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
