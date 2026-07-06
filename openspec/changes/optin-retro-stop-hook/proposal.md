# Proposal: optin-retro-stop-hook

## Why

retro's trigger moment — "a task ended" — is a state, not a user
utterance, so organic auto-triggering is structurally weak: the agent
finishes its turn and stops, and no message arrives to match retro's
description against. The harness-block directive and the description's
trigger phrases (shipped earlier) raise the odds; a deterministic trigger
needs a Stop hook. Today the boundary forbids that entirely: ai-init
"never touches execution settings" (design record D9 — hooks are
security-sensitive), the shared routing points at hooks but never wires
them, and the ai-init acceptance tests assert `.claude/settings.json` is
never created.

The blanket "never" defends against generic hook-writing (a real trust
escalation). A single, named, consent-gated hook is a much smaller
surface — and consistent with how everything else in this collection
ships: nothing is written without the user's explicit yes.

## What Changes

- **ai-init gains one narrow carve-out**: when the detected target is
  Claude Code, the plan includes one extra question — "add the retro Stop
  hook?" with **yes as the recommended answer** — and only on consent
  writes the hook to `.claude/settings.json`, diff-first and surgically
  (existing keys byte-preserved; re-runs are no-ops). Everything else
  stays refused: no other hooks, no permissions, no MCP, no CI. In
  non-interactive runs the default is skip.
- **The hook itself** (exact snippet verified against current Claude Code
  docs, carried in the init playbook): a Stop hook that asks the agent to
  run retro when a task just ended, guarded against infinite loops via
  the `stop_hook_active` flag, and harmless on double-fire thanks to
  retro's in-skill idempotency guard (shipped earlier).
- **README documents the manual path**: the same snippet as a paste-ready
  block, so non-ai-init users (or decliners) can wire it themselves.
- **Acceptance tests split**: default/declined scenarios keep asserting
  no `.claude/settings.json`; a new opt-in scenario asserts the hook is
  present, pre-existing settings keys survive byte-identically, and a
  second run changes nothing.
- The `retro-stop-hook-pointer` backlog entry is absorbed by this change
  and removed.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `ai-init`: the execution-settings boundary gains a single opt-in
  exception — the named retro Stop hook, consent-gated, diff-first,
  surgical, idempotent; all other execution settings remain out of
  scope.

## Non-goals

- No general hook-writing ability — the carve-out is exactly one named
  hook; "also set up permissions/hooks/MCP" stays refused.
- No change to the shared routing's output boundary (codify/retro still
  point at hooks, never wire them); routing delegates none of this.
- No hook equivalents for Cursor / AGENTS.md targets (no comparable
  event exists); the offer fires only for the Claude Code target.
- retro's own behavior is untouched (its idempotency guard already
  shipped).

## Impact

`skills/ai-init/SKILL.md` (scope line, plan step, refusal table);
`skills/ai-init/references/init-playbook.md` (hook section + snippet);
`README.md` (manual snippet); `tests/ai-init/README.md` (scenario split);
ai-init living spec (MODIFIED boundary requirement + ADDED opt-in hook
requirement); `.ai/backlog/retro-stop-hook-pointer.md` removed.
