# Design: add-ai-harness-skills

## Context

The repo is empty (LICENSE + README). Phase 1 delivers a three-skill "project AI harness". The design below records decisions reached in a structured planning interview (2026-07-04/05) backed by a multi-agent research pass over competitors, native agent features, and academic evidence. Key research inputs:

- **ETH Zurich, "Evaluating AGENTS.md" (arXiv 2602.11988)**: LLM-generated context files *reduced* task success ~3% and raised inference cost 20%+; adherence collapses past ~150–200 total instructions. Human-written files gained only ~4%.
- **ACE, "Agentic Context Engineering" (arXiv 2510.04618)**: iterative whole-file rewriting of instruction files causes "context collapse"; itemized incremental deltas are required.
- **SkillLearnBench (arXiv 2604.20087)**: self-feedback alone induces recursive drift; external feedback (user corrections) plus review gates supports genuine improvement.
- **Market signals**: Cursor removed its auto-Memories feature in favor of explicit reviewable rules; Codex docs state team guidance belongs in AGENTS.md but provide no promotion path; no popular framework (superpowers 246K★, BMAD 50K★) ships a retrospective-to-rules loop. Closest competitors: Kulaxyz/self-learning-skills (~822★, same npx-skills channel), TerenceBristol/claude-improve (15★), EveryInc/compound-engineering (22.6K★, methodology lock-in), ECC instinct system (~226K★, hook-based monolith).
- **Local prior art**: the author's `skill-retrospective` covers ~70% of the retrospective flow (routing digraph, consent gate, anti-rationalization table, max-3-actions); `commit` supplies a convention-detection architecture; `write-a-skill` supplies the format-spec pattern; `skill-test` supplies mechanical acceptance testing.

## Goals / Non-Goals

**Goals:**
- Close the loop: task lessons → staged candidates → consent-gated promotion → native rule files, across Claude Code, Cursor, and AGENTS.md agents.
- Keep every project's always-loaded instruction surface under the adherence budget (anti-bloat as the headline feature).
- Ship as independently installable, English, cross-platform skills via `npx skills`.

**Non-Goals:** see proposal.md Non-goals.

## Decisions

Each decision lists rationale and the alternative rejected.

### D1. Distribution: Vercel skills CLI, `skills/<name>/SKILL.md` layout
Zero-maintenance install/update (symlinked canonical copy, `npx skills update`), 20+ agents supported. *Rejected*: custom npm installer CLI (high maintenance); Claude Code plugin (locks to one agent — kept as a possible later wrapper solely to bundle an auto-trigger hook).

### D2. Cross-platform first; English bodies and frontmatter
Matches every major skill collection (skills.sh ecosystem is agent-agnostic; superpowers ships to 10 platforms). Platform-specific behavior is isolated in clearly-marked sections. *Rejected*: Claude Code-only (cheaper but caps reach and contradicts the ecosystem norm).

### D3. Build order: task-retrospective → add-rule (+ format spec) → ai-init
The retrospective loop is the only genuinely unserved differentiator and is ~70% covered by existing dogfooded material; ai-init is the most redundant vs native `/init` and the only skill that edits pre-existing user files, so it lands last, after the conventions it must install are proven. *Rejected*: init-first (natural chronological order, but validates the crowded part before the moat).

### D4. Two-stage promotion with staging file
Retrospective findings land in `.ai/learnings.md` as candidates (date, task, evidence). A candidate becomes a rule only on recurrence or explicit user confirmation. Admission filter (hard test, from mcollina/skills' init philosophy): a rule must be non-discoverable from the repo or correct an observed repeated mistake; never restate lint-enforced or discoverable facts. *Evidence*: SkillLearnBench drift; ECC's confidence scoring exists for the same reason; the filter is the only proven defense against the documented "/init slop" failure. *Rejected*: direct-to-rule promotion (one bad afternoon mints permanent rules).

### D5. Line-based rule budget, resident/conditional two-tier
Numbers (recorded in the rule format spec, per-project overridable): entry file ≤ 60 lines; resident (always-loaded) rules ≤ 150 lines total; ≤ 20 lines per rule; path-scoped rules exempt from the resident budget (same 20-line per-file cap). add-rule warns at 80% of resident budget and prefers converting to path-scoped; at 100% it refuses to write unless a rule is removed. *Evidence*: ETH Zurich ceiling (~150–200 instructions, minus ~50 consumed by the agent's own system prompt). *Rejected*: rule-count caps (a rule can be 3 or 30 lines — doesn't control context) and advisory-only reminders (no enforcement = must-fix 1 becomes decorative).

### D6. Single write path; itemized edits only
Only add-rule writes rule files. It performs add/edit/remove of individual rules; whole-file rewrites are forbidden. task-retrospective and ai-init delegate all rule writing to add-rule. *Evidence*: ACE context-collapse. Side benefit: the format spec lives in exactly one place — `skills/add-rule/references/rule-format-spec.md` — and needs no cross-skill file references (npx skills installs each skill directory independently, so runtime file sharing between skills is unreliable). The three skills document that they are designed to be installed together.

### D7. Signal-gated retrospective, evidence-based, v1 in-context only
Full retrospective runs only when signals fired during the task: user correction, failed/reverted command, repeated mistake. Clean tasks get a 2-line report. Evidence source in v1 is the current conversation only — portable, zero platform dependencies; cross-task recurrence detection is the staging file's job. Transcript mining (Claude Code JSONL) is a backlog item, added only if evidence-loss pain materializes. *Rejected*: per-task full ceremony (fatigue → rubber-stamping, the same dynamic that killed Cursor Memories); transcript-first (three per-agent readers to maintain).

### D8. Routing destinations
- Project-shared convention → rule, via add-rule.
- Personal preference → the agent's native memory (Claude auto memory / Codex Memories when enabled / local file otherwise). No parallel personal store.
- Missing capability → `.ai/backlog.md`.
- Recurring mistake in an existing skill → propose updating that skill's mistakes table.
Every proposal is consent-gated, one decision at a time, pre-drafted content included.

### D9. ai-init scope: instruction surface only
In scope: entry file, per-rule directories, cross-agent interop glue (e.g. CLAUDE.md `@AGENTS.md` import when both are present), `.ai/` loop files, wrapping the native `/init` for codebase discovery. Out of scope: settings.json, hooks, MCP config (platform-specific, security-sensitive). Near-empty baseline: structure and glue only — no opinionated generic rules (*evidence*: ETH Zurich net-negative result for generated boilerplate).

### D10. Agent detection: detect, ask on zero-or-multiple
Detection looks for `.claude/`, `.cursor/`, AGENTS.md. Fresh projects (nothing to detect) and multi-agent repos get one question with a recommended answer instead of a guess. AGENTS.md is the portable default target; native dirs are the enhancement. The agent→path mapping table is adapted from Ruler/rulesync rather than rediscovered. Known Claude Code caveats documented: path-scoped rules in `~/.claude/rules` are ignored, and `paths:` triggers on Read but not on new-file Write — must-follow rules stay unscoped.

### D11. Safety engineering for ai-init (adopted from AGENTS.md-generator prior art)
Idempotent re-runs (second run yields zero diff); marker-delimited managed sections so user edits survive; diff-before-write; never fabricate commands that were not verified in the repo.

### D12. Framework coexistence: detect and defer
When spec-kit (`.specify/`), Agent OS (`agent-os/`), or Kiro (`.kiro/steering/`) is detected, ai-init does not duplicate their content; it adds a one-line reference in the entry file and installs only the missing learning loop. We keep the "rules" vocabulary — our unit is a fine-grained rule, not a constitution-level principle.

### D13. Provenance and maintenance
Every generated rule carries provenance (origin: retrospective date/task/evidence, or init). Retrospective must also propose deletions/merges (staleness, never-triggered, overlap) — the loop is not additive-only.

### D14. Team onboarding: 3-line managed block
ai-init writes a short managed section in the entry file: harness declaration, `.ai/` location, install command. A teammate's agent reads the entry file every session and can prompt its human to install — self-propagating, at the cost of 3 resident lines.

### D15. Naming (collision-checked on skills.sh 2026-07-05)
`task-retrospective` (exact-match free), `add-rule` (exact-match free), `ai-init` (exact-match free; "harness-init" rejected: "harness" reads as agent-runtime scaffolding and is not what users search; "project-init" rejected: exact collision + no longer accurate after D9 slimming).

### D16. Repo CI: full lint
Frontmatter parses; name == directory; description exists, ≤1024 chars, capability + "Use when" shape; SKILL.md body line cap; markdownlint; body contains no CJK characters (mechanical English check). Runs on push and locally.

### D17. Acceptance testing
`tests/fixtures/` with five minimal projects: empty, existing-CLAUDE.md, existing-.cursor/rules, existing-AGENTS.md, multi-agent. Each verified mechanically (grep/diff) via the author's existing `skill-test`: expected files exist, hand-written regions untouched, second run zero-diff. `skill-test` itself is used as-is in Phase 1 and queued for Phase 2 rewrite/migration (first entry in `.ai/backlog.md`).

### D18. Personal-environment migration: hard cutover
After task-retrospective passes acceptance: archive `~/.claude/skills/skill-retrospective` outside the skills dir, update the global CLAUDE.md mandate to `task-retrospective`, install via `npx skills add -g`. No co-existence period (near-identical descriptions would make triggering nondeterministic); the archived copy allows rollback.

## Risks / Trade-offs

- [Prose-only trigger: on non-Claude agents nothing forces the retrospective to run] → Global/entry-file mandate line + honest README; optional Claude Code hook auto-trigger deferred to a plugin add-on.
- [Rule dialect churn (Cursor .mdc frontmatter, Claude `paths:` bugs)] → Dialect knowledge concentrated in one file (rule-format-spec.md); CI on this repo is unaffected; spec updates propagate via `npx skills update`.
- [Consent fatigue even with signal gating] → max 3 proposals per retrospective, ranked by impact (carried over from existing skill); learn-from-rejections noted as future enhancement.
- [Users install only one of the three skills] → each SKILL.md degrades gracefully (add-rule works standalone; task-retrospective without add-rule emits draft rules as text; ai-init recommends installing the set).
- [skills.sh discoverability decides adoption more than design (claude-improve: 15★ despite good design)] → descriptions written as storefronts with explicit differentiation; deferred to publication step.

## Migration Plan

1. Implement in build order (D3); each skill passes skill-test acceptance before the next starts.
2. Hard cutover of the author's environment (D18) after step 1's first skill lands.
3. Dogfood on this repo itself (harness runs here: `openspec/` = product specs, `.ai/` = collaboration lessons — roles documented in README).
4. Publish to GitHub; verify `npx skills add` end-to-end; then iterate toward Phase 2 (skill-creator, staleness checker, skill-test rewrite, remaining ~12 personal skills migration).

## Open Questions

- Cursor `.mdc` frontmatter exact field semantics to be re-verified against current Cursor docs at implementation time (format churn).
- GitHub repo slug (`skills` vs something more distinctive) — decide at publication; affects only the install command in docs.
