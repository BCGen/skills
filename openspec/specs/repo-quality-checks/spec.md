# repo-quality-checks Specification

## Purpose

TBD - created by archiving change add-ai-harness-skills. Update Purpose after archive.

## Requirements

### Requirement: Skill lint

A validation script SHALL check every `skills/*/SKILL.md`: frontmatter parses as YAML; frontmatter `name` equals the directory name; `description` exists, is ≤ 1024 characters, and follows the capability-sentence + "Use when ..." shape; the body is within the line cap (default 100 lines, excluding references/); the body contains no CJK characters; markdownlint passes.

#### Scenario: Name mismatch

- **WHEN** a skill directory `foo/` contains frontmatter `name: bar`
- **THEN** the lint fails naming the file and the mismatch

#### Scenario: CJK in body

- **WHEN** a SKILL.md body contains CJK characters
- **THEN** the lint fails (English-only convention)

### Requirement: CI and local execution

The lint SHALL run in GitHub Actions on every push and be runnable locally with a single command.

#### Scenario: Push with violation

- **WHEN** a commit with a lint violation is pushed
- **THEN** the workflow fails and reports each violation
