# Acceptance tests: add-rule

Minimal-prompt subagent per scenario; mechanical verification only.
Subagent prompt template:

> Project root: `<sandbox>`. Follow the skill at
> `<repo>/skills/add-rule/SKILL.md` for this request: "Add a project rule:
> `<draft>`." Evidence: `<evidence>`. Current task: `<task>`.
> Report files created or modified.

## Scenarios

### 1. reject-lint (Claude Code sandbox with `.eslintrc.json` enforcing `semi`)

Draft: "Always end JavaScript statements with semicolons."

- no file created under `.claude/rules/`
- response states a rejection (restates lint)

### 2. over-budget (Claude Code sandbox preseeded with resident rules at exactly 150 content lines — the cap; any addition must exceed)

Draft: a valid non-discoverable rule.

- no new file under `.claude/rules/` (count unchanged)
- preseeded files byte-identical
- response offers removal/merge candidates

### 3. dialect-claude + neighbor-untouched (`.claude/` sandbox with one preseeded rule)

Draft: "Convert API date fields from UTC before display."

- new file `.claude/rules/*.md` exists, no frontmatter, ≤ 20 content lines
- contains `<!-- provenance:` with `via:`
- preseeded rule file byte-identical

### 4. dialect-cursor (`.cursor/rules/` sandbox)

Same draft.

- new file `.cursor/rules/*.mdc` with frontmatter `alwaysApply: true`
- contains provenance comment

### 5. dialect-agentsmd (sandbox with user-authored `AGENTS.md`, no managed block)

Same draft.

- `AGENTS.md` gains `<!-- harness:rules:begin -->` … `end` block with one `###` entry
- all pre-existing lines still present and unmodified (diff shows additions only)

## Verification snippets

```sh
ls .claude/rules/ | wc -l
grep -c 'provenance:' <rule file>
git diff --stat   # in seeded-git sandboxes: additions only
cmp preseeded-copy actual
```
