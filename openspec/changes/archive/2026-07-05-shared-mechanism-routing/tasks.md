# Tasks: shared-mechanism-routing

## 1. Extract the canonical routing

- [x] 1.1 Decide the source-of-truth location (a `shared/` dir, or a designated skill copy) and a sync step that copies source → each skill's `references/routing.md`
- [x] 1.2 Extract the shared routing core from codify's current `routing.md` (routing table, output boundary, judgment doc-first, reconciliation, conflict handling) and ADD the evidence-bounded upgrade-proposal logic
- [x] 1.3 Move codify-specific parts (full scan, authority sources, commit dimension, project-layer scope) out of the shared file into `skills/codify/SKILL.md`

## 2. Adopt in both skills

- [x] 2.1 Sync the shared `routing.md` into `skills/codify/references/` and `skills/retro/references/` (byte-identical)
- [x] 2.2 Rewrite `skills/retro/SKILL.md` to apply the shared routing at full parity, keeping its error-learning routes (memory/backlog/skill-update) and signal detection in the body
- [x] 2.3 Add codify's evidence-bounded upgrade-proposal step to `skills/codify/SKILL.md`

## 3. Enforce and verify

- [x] 3.1 Add the byte-identical routing-copy check to `scripts/lint-skills.mjs`
- [x] 3.2 Acceptance via skill-testing: same convention → same mechanism decision from codify and retro; codify proposes a tool upgrade for an evidence-backed doc convention; no proposal without evidence
- [x] 3.3 Lint, archive change, sync develop and push per the publishing rule
