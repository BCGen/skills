---
status: candidate
promoted_to:
promoted_on:
---

# Verify tool calls actually executed — a printed call is not a call

- 2026-07-06 · task: prior session (carried via handoff) · evidence: twice emitted a tool call (Write / AskUserQuestion) as plain text instead of invoking it; caught only on review — verify the tool result exists before treating the action as done
