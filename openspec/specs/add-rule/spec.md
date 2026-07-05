# add-rule Specification

## Purpose
TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.
## Requirements
### Requirement: Single write path with itemized edits
add-rule SHALL be the only harness component that writes rule files. It SHALL operate on individual rules (add, edit, remove) and MUST NOT rewrite a whole rule file's unrelated content.

#### Scenario: Adding a rule
- **WHEN** a new rule is approved
- **THEN** add-rule creates or appends exactly that rule in the correct native location, leaving all other content byte-identical

### Requirement: Admission filter
Before writing, add-rule SHALL verify the rule is either non-discoverable from the repo or corrects an observed repeated mistake. Rules restating lint/formatter/typechecker-enforced behavior or facts discoverable by reading the repo MUST be rejected with the reason.

#### Scenario: Restating lint config
- **WHEN** a proposed rule duplicates something ESLint/Prettier already enforces
- **THEN** add-rule refuses and explains the admission filter

### Requirement: Budget enforcement
add-rule SHALL compute the resident budget (per harness-conventions) before writing. At ≥ 80% usage it SHALL warn and prefer proposing a path-scoped placement; at 100% it SHALL refuse to write unless the user removes or merges an existing rule in the same operation.

#### Scenario: Budget exceeded
- **WHEN** writing the rule would push resident rules past 150 lines
- **THEN** add-rule refuses and offers removal/merge candidates

### Requirement: Cross-agent format spec
`references/rule-format-spec.md` SHALL define the rule shape and the dialect mapping (Claude Code `paths:` frontmatter ↔ Cursor `description`/`globs`/`alwaysApply` ↔ AGENTS.md one-rule-per-heading section), the budget numbers, and provenance format. add-rule SHALL emit the correct dialect for the detected agent.

#### Scenario: Cursor target
- **WHEN** the detected target is Cursor
- **THEN** the rule is written as `.cursor/rules/<name>.mdc` with valid frontmatter per the spec

#### Scenario: Fallback target
- **WHEN** the target is AGENTS.md
- **THEN** the rule is written as a section under the managed rules heading without violating the freeform standard

### Requirement: Provenance stamping
Every written rule SHALL carry a provenance line (origin: retrospective date/task/evidence, init, or manual) sufficient to later justify deletion decisions.

#### Scenario: Rule from retrospective
- **WHEN** add-rule writes a rule promoted by the retro skill
- **THEN** the rule includes the originating date, task, and evidence reference

