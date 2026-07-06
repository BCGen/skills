# Tasks: rename-harness-sync

## 1. Rename

- [x] 1.1 `git mv` the skill, tests, and spec directories; update
      frontmatter name, H1s, and the playbook filename + its link
- [x] 1.2 Update references: README (3 spots), codify SKILL + spec,
      rule-format-spec `via:` enumeration, conventions.md naming
      example, learning `promoted_to` pointer

## 2. Verify and wrap up

- [x] 2.1 `pnpm lint` (name == dir); repo-wide grep shows `ai-init` only
      in `openspec/changes/archive/` and historical learning prose
- [x] 2.2 Archive with NO specs delta per the delta-handling rule;
      publish only on the user's go-ahead
