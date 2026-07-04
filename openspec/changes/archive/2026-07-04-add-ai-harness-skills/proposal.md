# Proposal: add-ai-harness-skills

## Why

AI coding agents repeat the same mistakes across tasks because lessons learned in one session evaporate: native memory features (Claude auto memory, Codex Memories) are machine-local and never promote learnings into team-shared, version-controlled rules, and no existing tool closes that loop across agents. This change builds Phase 1 of this repo: a three-skill "project AI harness" that initializes a project's AI instruction setup and, after each task, promotes verified lessons into native rule files — with consent gates and anti-bloat mechanics as first-class features.

## What Changes

- Add `skills/task-retrospective/` — post-task retrospective that mines external evidence (user corrections, failed commands) from the current conversation, stages candidate lessons in `.ai/learnings.md`, and routes approved proposals to typed executors (rule → add-rule, personal preference → native agent memory, missing skill → `.ai/backlog.md`, recurring skill mistake → update that skill). Rewrites and replaces the author's personal `skill-retrospective`.
- Add `skills/add-rule/` — the single write path for rule files. Owns the cross-agent rule format spec (`references/rule-format-spec.md`), enforces the admission filter (non-discoverable or corrects an observed repeated mistake) and the rule budget (warn at 80%, refuse at 100% unless a rule is removed). Itemized add/edit/remove only; never whole-file rewrites.
- Add `skills/ai-init/` — initializes a project's AI instruction surface: entry file (CLAUDE.md / AGENTS.md), per-rule directory structure, cross-agent interop glue (e.g. `@AGENTS.md` import), and the harness loop files (`.ai/learnings.md`, `.ai/backlog.md`). Wraps the agent's native `/init` for codebase discovery instead of re-implementing scanning. Ships a near-empty baseline (structure + glue only, no opinionated generic rules). Idempotent re-runs, marker-managed sections, diff-before-write. Does NOT touch execution settings (settings.json, hooks, MCP).
- Add repo CI: full lint of every skill (frontmatter parses, name == directory, description format and length, markdownlint, no CJK characters in bodies).
- Add `tests/fixtures/` with five scenario projects for ai-init acceptance (empty project, existing CLAUDE.md, existing .cursor/rules, existing AGENTS.md, multi-agent), verified mechanically via the author's existing `skill-test` harness.

## Capabilities

### New Capabilities

- `task-retrospective`: post-task analysis, signal-gated triggering, two-stage lesson promotion, consent-gated routing to executors.
- `add-rule`: single-write-path rule authoring, cross-agent rule format spec, admission filter, budget enforcement, provenance stamping.
- `ai-init`: project AI instruction-surface initialization, agent detection with ask-on-ambiguity, interop glue, loop-file scaffolding, framework coexistence (defer to spec-kit / Agent OS / Kiro when detected).
- `harness-conventions`: shared conventions all three skills obey — `.ai/` file locations and formats, rule budget numbers, Phase 1 agent matrix and native path mapping, team onboarding block in the entry file.
- `repo-quality-checks`: CI lint rules this repo enforces on its own skills.

### Modified Capabilities

(none — first change in this repo)

## Non-goals

- No skill-creation skill and no staleness-check skill in this phase (Phase 2, tracked in `.ai/backlog.md` along with rewriting `skill-test`).
- No codebase scanner of our own — native `/init` commands are wrapped, not reimplemented.
- No opinionated generic baseline rules — evidence shows LLM-generated boilerplate context reduces task success (see design.md).
- No execution-settings management (permissions, hooks, MCP servers).
- No agent dialects beyond Claude Code, Cursor, and AGENTS.md fallback in Phase 1 (Copilot et al. are Phase 2 candidates).
- No automatic hook-based trigger for the retrospective (documented as a possible later Claude Code plugin add-on).

## Impact

- New directories: `skills/task-retrospective/`, `skills/add-rule/`, `skills/ai-init/`, `tests/fixtures/`, `.github/workflows/`.
- No existing code affected (repo is currently empty except LICENSE/README).
- Author's personal environment (outside this repo, executed at rollout): hard cutover — archive `~/.claude/skills/skill-retrospective`, update global CLAUDE.md mandate to `task-retrospective`, install via `npx skills add -g`.
- User projects touched by these skills at runtime: entry file, rule directories, `.ai/` files — always via diff-first, marker-managed writes.
