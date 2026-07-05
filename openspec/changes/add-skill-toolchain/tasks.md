# Tasks: add-skill-toolchain

## 1. skill-testing (build first — D2)

- [ ] 1.1 Draft `skills/skill-testing/SKILL.md` + references (sandbox patterns, git idempotency proof, scenario transcripts) from the local skill-test base
- [ ] 1.2 Acceptance: run skill-testing against a known-good and a deliberately broken target skill; verify mechanical verdicts and not-verified listing
- [ ] 1.3 Retire the local `~/.claude/skills/skill-test` (archive + no coexistence)

## 2. skill-writing

- [ ] 2.1 Write the collection conventions references file (single source shared with skill-auditing)
- [ ] 2.2 Draft `skills/skill-writing/SKILL.md`: gather→draft→review, convention enforcement, naming discipline with collision check, acceptance scaffold + skill-testing handoff
- [ ] 2.3 Acceptance via skill-testing: author a sample skill end-to-end (conventions hold, test plan scaffolded, collision check ran)
- [ ] 2.4 Retire the personal `write-a-skill` (archive; symlinked collection copy noted)

## 3. skill-auditing

- [ ] 3.1 Draft `skills/skill-auditing/SKILL.md`: two layers, generic target, fix routing, unverifiable honesty
- [ ] 3.2 Acceptance: audit a fixture directory containing one clean skill, one format-stale skill, one content-stale skill; verify per-layer findings and source citations
- [ ] 3.3 Dogfood: audit this collection's own `skills/` and act on findings

## 4. Wrap-up

- [ ] 4.1 Retire the three backlog entries; update README skills table; lint; archive change; sync develop and push
