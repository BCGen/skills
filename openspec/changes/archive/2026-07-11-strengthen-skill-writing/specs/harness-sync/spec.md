# harness-sync (delta)

## MODIFIED Requirements

### Requirement: Instruction-surface scope

harness-sync SHALL create or update: the entry file (CLAUDE.md /
AGENTS.md) and cross-agent interop glue (e.g. CLAUDE.md `@AGENTS.md` import
when both are present). It SHALL NOT create the loop directories
`.ai/learnings/` and `.ai/backlog/` or their READMEs — retro owns and
creates them (it is this package's core skill and self-bootstraps them on
first write). The harness block MAY still name `.ai/learnings/` and
`.ai/backlog/` as the loop's destinations. It SHALL NOT pre-create the
per-rule directory — git cannot track an empty directory, and rule-writing
creates it with the first rule. It MUST NOT create or modify execution
settings (settings.json, hooks, MCP configuration).

#### Scenario: Full greenfield init

- **WHEN** harness-sync runs on a project with no AI setup
- **THEN** after the run the entry file exists, no loop directories were
  created (retro creates them on first write), no rules directory was
  pre-created, and no settings/hooks/MCP files were created
