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
facts → nothing (leave for the agent to read); mechanically enforceable
conventions → a declarative config artifact; non-discoverable judgment
conventions → a rule via rule-writing; must-never / procedures / structural
defaults / executable wiring → a paste-ready pointer snippet. Its success
is measured by first-execution accuracy, not by the number of rules created.

#### Scenario: Lint-fixable style routes to config

- **WHEN** the detected convention is a formatter/linter-expressible style (e.g. quote style, import order)
- **THEN** codify proposes a config artifact, not a rule

#### Scenario: Tribal convention routes to a rule

- **WHEN** the detected convention is non-discoverable judgment (e.g. "use the internal http client, never fetch directly")
- **THEN** codify drafts a rule and routes it through rule-writing

#### Scenario: Discoverable fact routes to nothing

- **WHEN** the detected convention is discoverable by reading the repo (e.g. directory layout)
- **THEN** codify proposes no artifact for it

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

On conflicting conventions codify SHALL surface the conflict, have the user
pick the winner and its scope, resolve at source, and back the winner with a
tool. It MUST NOT arbitrate conflicts in prose (e.g. writing "this rule
takes precedence").

#### Scenario: Conflicting style settings

- **WHEN** two sources specify incompatible conventions
- **THEN** codify asks the user to choose and does not write a prose precedence rule

### Requirement: Delegates rule writes to rule-writing

codify MUST NOT write rule files itself. Rule writes go through rule-writing
(unchanged filter and budget). If rule-writing is not installed, codify
prints the drafted rules plus any config artifacts, mentioning the install
option at most once.

#### Scenario: rule-writing absent

- **WHEN** a rule is approved but rule-writing is not installed
- **THEN** codify prints the drafted rule for manual use, with at most one mention of the install option
