---
status: promoted
promoted_to: skills/skill-writing/references/conventions.md
promoted_on: 2026-07-06
---

# Consent moments should offer a structured choice, not an open question

- 2026-07-06 · task: harness-sync field test · evidence: the approval step printed a clear full plan but ended with a bare "是否核准寫入?" the user had to type an answer to; user asked for selectable options ("是否能直接給予選項") — fixed across harness-sync/codify/retro Step 4 and added to the authoring conventions (structured choice where the platform offers option prompts, plain question otherwise)
- 2026-07-07 · task: second field test · evidence: recurred with the fixed wording installed — "where the platform offers option prompts" requires the agent to introspect its toolset and it didn't; hardened to name the concrete mechanism ("the platform's option-prompt tool (Claude Code: AskUserQuestion)") — abstract instructions don't bind; name the tool
