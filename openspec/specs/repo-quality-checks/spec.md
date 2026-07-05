# repo-quality-checks Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.
## Requirements
### Requirement: Skill lint

A validation script SHALL check every `skills/*/SKILL.md`: frontmatter
parses as YAML; frontmatter `name` equals the directory name;
`description` exists, is ≤ 1024 characters, and follows the
capability-sentence + "Use when ..." shape; the body is within the line
cap (default 100 lines, excluding references/); the body contains no CJK
characters. markdownlint SHALL pass over all authored markdown in the
repo — generated files (`.claude/` tooling, dependencies) are ignored —
with MD013 and MD033 and MD036 disabled and MD024 in siblings-only mode.

#### Scenario: Name mismatch

- **WHEN** a skill directory `foo/` contains frontmatter `name: bar`
- **THEN** the lint fails naming the file and the mismatch

#### Scenario: CJK in body

- **WHEN** a SKILL.md body contains CJK characters
- **THEN** the lint fails (English-only convention)

#### Scenario: Authored doc violation

- **WHEN** any authored markdown outside `skills/` (e.g. an openspec
  proposal) violates an enabled markdownlint rule
- **THEN** the lint fails

#### Scenario: Generated files exempt

- **WHEN** a generated file under `.claude/` violates a markdownlint rule
- **THEN** the lint does not fail

### Requirement: CI and local execution

The lint SHALL run in GitHub Actions on every push and be runnable locally with a single command.

#### Scenario: Push with violation

- **WHEN** a commit with a lint violation is pushed
- **THEN** the workflow fails and reports each violation

