# Proposal: rename-rule-writing

## Why

Collection naming settled on the gerund family (per Anthropic authoring
guidance) for managed-unit skills: `rule-writing` now, `skill-writing` /
`skill-testing` / `skill-auditing` in Phase 2. `ai-init` and `retro` keep
their short names. Collision-checked clean.

## What Changes

- **BREAKING** (rename, pre-adoption): `write-rule` → `rule-writing`.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `rule-writing` (renamed from `write-rule`; name-only, no delta shipped)

## Non-goals

- No behavior change; installed copies refresh on next update.

## Impact

References in retro, ai-init, README, CLAUDE.md, specs, tests.
