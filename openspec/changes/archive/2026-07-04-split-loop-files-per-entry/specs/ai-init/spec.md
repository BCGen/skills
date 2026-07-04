# ai-init (delta)

## MODIFIED Requirements

### Requirement: Instruction-surface scope
ai-init SHALL create or update: the entry file (CLAUDE.md / AGENTS.md),
per-rule directory structure, cross-agent interop glue (e.g. CLAUDE.md
`@AGENTS.md` import when both are present), and the loop directories
`.ai/learnings/` and `.ai/backlog/`, each containing its `README.md`
format doc. It MUST NOT create or modify execution settings
(settings.json, hooks, MCP configuration).

#### Scenario: Full greenfield init
- **WHEN** ai-init runs on a project with no AI setup
- **THEN** after the run the entry file, rules directory, and both loop directories with READMEs exist, and no settings/hooks/MCP files were created
