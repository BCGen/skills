# harness-sync (delta)

## MODIFIED Requirements

### Requirement: Instruction-surface scope

harness-sync SHALL create or update: the entry file (CLAUDE.md /
AGENTS.md), cross-agent interop glue (e.g. CLAUDE.md `@AGENTS.md` import
when both are present), and the loop directories `.ai/learnings/` and
`.ai/backlog/`, each containing its `README.md` format doc. It SHALL NOT
pre-create the per-rule directory — git cannot track an empty directory,
and rule-writing creates it with the first rule. It MUST NOT create or
modify execution settings (settings.json, hooks, MCP configuration).

#### Scenario: Full greenfield init

- **WHEN** harness-sync runs on a project with no AI setup
- **THEN** after the run the entry file and both loop directories with
  READMEs exist, no rules directory was pre-created, and no
  settings/hooks/MCP files were created
