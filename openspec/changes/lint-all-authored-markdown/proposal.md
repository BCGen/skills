# Proposal: lint-all-authored-markdown

## Why

~420 markdownlint warnings sit in committed files because CI lints only
`skills/**` while editors lint the whole repo — two standards, so authored
docs (openspec/, .ai/, tests/, README) accumulated violations silently.

## What Changes

- Expand markdownlint scope to all authored markdown; ignore generated
  files (`.claude/` OpenSpec tooling, `node_modules/`).
- Rule tuning: disable MD036 (bold pseudo-headings are our deliberate spec
  style) and set MD024 to siblings-only; keep everything else.
- Fix all existing violations (auto-fix + manual residue: fence languages,
  table pipes, first-line headings).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `repo-quality-checks`: markdownlint scope broadened from skills-only to
  all authored markdown.

## Non-goals

- No hand-editing of generated `.claude/` files (overwritten on
  `openspec update`).
- No skill-lint (frontmatter/name/CJK) scope change — still skills-only.

## Impact

`.markdownlint-cli2.jsonc`, one-time fixes across openspec/, .ai/, tests/,
README.md, CLAUDE.md.
