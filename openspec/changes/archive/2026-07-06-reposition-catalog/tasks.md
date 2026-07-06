# Tasks: reposition-catalog

## 1. README storefront

- [x] 1.1 Keep a single 7-skill table; add a "When to use it" column
      distilled from each skill's frontmatter "Use when" triggers
- [x] 1.2 Rewrite Usage as the full lifecycle (adopt → capture → work →
      close the task → grow skills); standalone-first; ai-init demoted to
      an optional up-front step
- [x] 1.3 Add the loop-only subset install line (`-s` takes
      space-separated names — verified in the skills CLI parser)
- [x] 1.4 Add "The learning loop" section naming `.ai/learnings/` and
      `.ai/backlog/` (lifecycle, commit-them guidance) with `.ai/`
      anchors in the Usage steps

## 2. Decouple ai-init in sibling text

- [x] 2.1 codify: "Run after ai-init, explicitly" → explicit invocation
      on any existing project, with or without ai-init
- [x] 2.2 retro: backlog route gains "(create the dir + README if
      missing)" parity with the learnings step

## 3. skill-writing repositioning

- [x] 3.1 Rewrite the frontmatter description: collection AND
      project-local authoring (delegated from codify/retro)
- [x] 3.2 Destination gathered in Step 1 (collection / project / user
      global) with a context recommendation; a handoff of a project
      procedure recommends that project; ambiguous → one question with a
      recommended answer; body stays ≤ 100 lines
- [x] 3.3 Scope the registry collision check and the acceptance-plan
      location to the authoring mode in SKILL.md, the review checklist,
      and references/conventions.md
- [x] 3.4 tests/skill-writing/README.md: collection scenario preseeds a
      `skills/` dir; project-local scenario expects no destination
      question; new ambiguous-destination scenario carries the question
      check
- [x] 3.5 Generalize self-referential wording ("this collection", "like
      this one") in skill-writing, skill-auditing, conventions.md, and
      the delta, so the standalone tools read correctly wherever
      installed

## 4. Verify and wrap up

- [x] 4.1 Blind acceptance runs (fresh subagents): collection mode →
      `skills/<name>/`; project-local handoff → `.claude/skills/<name>/`
      with conventions held
- [x] 4.2 Adversarial review of the diff; fix its findings (delta gained
      2 MODIFIED requirements; conventions.md/checklist/tests aligned)
- [ ] 4.3 `pnpm lint` + `openspec validate reposition-catalog` after the
      final edits; user review
- [ ] 4.4 Archive keeping the delta per the delta-handling rule (update
      the spec Purpose line to cover project-local authoring while
      archiving); sync develop and push per the publishing rule
