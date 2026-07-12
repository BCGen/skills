# repo-quality-checks (delta)

## MODIFIED Requirements

### Requirement: Skill lint

A validation script SHALL check every `skills/*/SKILL.md`: frontmatter
parses as YAML; frontmatter `name` equals the directory name;
`description` exists, is ≤ 1024 characters, and follows the
capability-sentence + "Use when ..." shape; the body is within the line
cap (default 100 lines, excluding references/); the body contains no CJK
characters. markdownlint SHALL pass over all authored markdown in the
repo — generated files (`.claude/` tooling, dependencies) are ignored —
with MD013 and MD033 and MD036 disabled and MD024 in siblings-only mode.

The lint SHALL additionally enforce a **total instruction budget**: for a skill that
declares one, the body plus every reference the skill's flow always reads MUST fit within
that budget. A body-only cap rewards moving text into a reference rather than removing it,
and a reference the flow always reads is part of the instruction surface whether or not it
sits in SKILL.md. A reference read only on a branch is not charged.

A skill declares its always-read references and its budget in frontmatter `metadata`; a
skill that declares neither is charged the body cap alone, as before.

The token estimate SHALL account for CJK. A CJK character costs approximately one token,
while roughly four characters of Latin text cost one; a single characters-divided-by-four
estimate under-counts a Chinese skill four- to six-fold. A budget that under-counts is a
budget that never fails, which is the defect this requirement exists to close.

#### Scenario: A Chinese skill against the budget

- **WHEN** a skill's body is written in Chinese
- **THEN** its CJK characters are counted at roughly one token each, not at one quarter of a
  token, and the budget check reflects what the skill will actually cost

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

#### Scenario: Text moved into a reference to evade the body cap

- **WHEN** a skill declaring a total instruction budget moves text out of its body into a
  reference its flow always reads, and the combined total exceeds the budget
- **THEN** the lint fails, naming the total and the budget — the body passing its own cap
  does not save it

#### Scenario: A branch-only reference

- **WHEN** a skill carries a reference that its flow reads only on a branch, and it is not
  declared as always-read
- **THEN** its tokens are not charged against the total instruction budget
