# Proposal: remove-retro-stop-hook

## Why

The opt-in retro Stop hook shipped earlier today and was immediately
field-tested. It works exactly as specified — and that is the problem:
Claude Code has no "task completed" event, so the hook fires on EVERY
turn end, including a bare greeting. Each firing blocks the stop, renders
as a `Stop hook error:` line, and forces the agent to spend a reply
declining ("this was just a greeting"). The per-turn noise is inherent to
the mechanism, not fixable by wording; filtering would require parsing
the undocumented transcript format plus an extra managed script —
complexity out of proportion to the benefit.

The right-sized mechanism already exists and is shipped: the harness
block's resident directive ("run the retro skill when a task ends") and
retro's description trigger phrases. The user decided: remove the hook
machinery entirely; the entry-file instruction suffices.

## What Changes

- **ai-init loses the carve-out**: the execution-settings boundary
  returns to the unconditional "never touch" (scope line, plan step, and
  refusal table revert); the playbook's hook section is removed.
- **README drops the hook material**: the paste-ready snippet and the
  error-prefix rendering notes go; the learning loop section returns to
  the loop files + blameless note.
- **Acceptance tests revert**: the opt-in scenario and the prompt
  template's hook exception are removed; the "never touches execution
  settings" check applies to all fixtures again.
- **Kept on purpose**: retro's idempotency guard (still protects against
  repeated done/wrap-up utterances), the harness-block directive, and
  the description trigger phrases — these carry the trigger story now.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `ai-init`: the opt-in retro Stop hook capability is removed; the
  execution-settings boundary is unconditional again.

## Non-goals

- No re-introduction of a hook pointer in docs or backlog — the per-turn
  firing makes the pattern unrecommendable; git history keeps the
  snippet if ever needed.
- No changes to retro (its idempotency guard stays) or to the
  harness-block directive.

## Impact

`skills/ai-init/SKILL.md`, `skills/ai-init/references/init-playbook.md`,
`README.md`, `tests/ai-init/README.md`, ai-init living spec (2 MODIFIED
back to unconditional wording, 1 REMOVED requirement). Users who already
opted in (e.g. today's field test) remove the `hooks.Stop` entry from
their `.claude/settings.json` by hand.
