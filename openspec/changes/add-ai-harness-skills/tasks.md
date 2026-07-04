# Tasks: add-ai-harness-skills

## 1. Repo scaffolding and quality checks

- [ ] 1.1 Create `skills/` layout, README skeleton (product pitch, install command, `openspec/` vs `.ai/` roles), and `.gitignore`
- [ ] 1.2 Write the lint script (frontmatter parse, name == dir, description shape/length, body line cap, no-CJK, markdownlint) runnable via one local command
- [ ] 1.3 Add GitHub Actions workflow running the lint on push

## 2. task-retrospective (build first — D3)

- [ ] 2.1 Draft `skills/task-retrospective/SKILL.md`: signal-gated trigger, in-context evidence rules, ≤ 2-line clean report, carried-over scaffolding (routing digraph, anti-rationalization table, max-3 ranked proposals)
- [ ] 2.2 Define `.ai/learnings.md` and `.ai/backlog.md` entry formats (provenance lines) in a references file shared by the flow
- [ ] 2.3 Implement two-stage promotion logic (stage on first occurrence, propose on recurrence or explicit confirmation) and the four routing destinations incl. add-rule delegation and its missing-fallback
- [ ] 2.4 Write skill-test acceptance cases: clean task → 2 lines; correction → staged candidate with provenance; recurrence → promotion proposal; rejection → no writes
- [ ] 2.5 Pass acceptance, then execute the personal-environment hard cutover (archive old skill, update global CLAUDE.md, `npx skills add -g`)

## 3. add-rule and the rule format spec

- [ ] 3.1 Write `skills/add-rule/references/rule-format-spec.md`: rule shape, provenance format, budget numbers, dialect mapping (verify current Cursor `.mdc` frontmatter semantics against docs while writing)
- [ ] 3.2 Draft `skills/add-rule/SKILL.md`: itemized add/edit/remove, admission filter, budget computation with 80%/100% behavior, agent detection per harness-conventions
- [ ] 3.3 Write skill-test acceptance cases: lint-duplicate rejection; over-budget refusal with removal offer; correct dialect emission for Claude Code / Cursor / AGENTS.md; untouched-neighbor-content check
- [ ] 3.4 Update task-retrospective to hand promoted rules to add-rule end-to-end; verify the full loop on a sandbox project

## 4. ai-init (build last — D3)

- [ ] 4.1 Create `tests/fixtures/` with the five scenario projects (empty, CLAUDE.md, .cursor/rules, AGENTS.md, multi-agent)
- [ ] 4.2 Draft `skills/ai-init/SKILL.md`: scope per spec, native `/init` wrapping, near-empty baseline, marker-managed sections, diff-first, agent detection with ask-on-zero-or-multiple, framework coexistence (spec-kit / Agent OS / Kiro), onboarding block
- [ ] 4.3 Write skill-test acceptance cases over the fixtures: expected files exist; hand-written regions byte-identical; second run zero diff; no settings/hooks/MCP writes; coexistence reference emitted
- [ ] 4.4 Dogfood: run ai-init on this repo itself and record lessons in `.ai/learnings.md`; seed `.ai/backlog.md` with the Phase 2 items (skill-creator, staleness checker, skill-test rewrite, transcript mining, Copilot dialect)

## 5. Publication

- [ ] 5.1 Decide repo slug, push to GitHub, verify `npx skills add <owner>/<repo>` end-to-end on a clean machine/project
- [ ] 5.2 Write storefront descriptions and README differentiation (vs create-agentsmd, self-learning-skills, compound-engineering) and verify skills.sh listing
