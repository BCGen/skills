# Rule format spec (cross-agent)

The single source of truth for how harness rules are written. Only the
add-rule skill writes rule files; other skills hand it drafts.

## Rule shape

One rule = one concern, stated so compliance is checkable:

- A `#` title naming the convention.
- Imperative, concrete body ("Name Python helpers in camelCase", not
  "use good naming"). Include one example when it disambiguates.
- A provenance comment (see below).
- Hard cap: **20 content lines** per rule (excluding frontmatter and
  provenance comments).

Admission filter — a rule may exist only if it is at least one of:

1. **Non-discoverable**: cannot be learned by reading the repo (landmines,
   tribal conventions, cross-repo contracts).
2. **Mistake-correcting**: an agent made this mistake and evidence exists.

Never restate what a linter, formatter, or type checker already enforces,
or facts discoverable from the code. Reject such drafts with the reason.

## Budgets

| Surface | Cap |
| --- | --- |
| Entry file (CLAUDE.md / AGENTS.md) | 60 lines |
| Resident rules, total (always-loaded, all files) | 150 lines |
| Any single rule | 20 lines |

Path-scoped rules are exempt from the resident total (same per-rule cap).
Line counting excludes frontmatter blocks, blank lines, and provenance
comments. Projects may override caps by stating them in the entry file's
harness block. At ≥ 80% of the resident cap: warn and prefer path-scoping.
At 100%: refuse to write unless a rule is removed or merged in the same
operation.

## Provenance

Every rule carries an HTML comment (token-free in entry files — Claude Code
strips block comments before injection):

```html
<!-- provenance: 2026-07-05 · task: order list page · evidence: user corrected timezone twice · via: retro -->
```

`via:` is one of `retro`, `ai-init`, `manual`.

## Dialect mapping

| | Claude Code | Cursor | Fallback |
| --- | --- | --- | --- |
| Location | `.claude/rules/<name>.md` | `.cursor/rules/<name>.mdc` | `AGENTS.md` managed section |
| Resident (always loaded) | no frontmatter | `alwaysApply: true` | plain `###` entry |
| Path-scoped | `paths:` list (globs, brace expansion OK) | `globs: <comma-separated>` | state the scope in the rule text ("When editing `src/api/`…") |
| Agent-decides | n/a (use skills instead) | `description:` only | n/a |

Verified against vendor docs 2026-07-05. Caveats to honor:

- Cursor ignores plain `.md` in `.cursor/rules/` — always emit `.mdc`.
- Claude Code path-scoped rules trigger on **Read** of matching files, not
  when a new matching file is created; and path-scoping in `~/.claude/rules`
  is unreliable. Must-follow rules therefore stay resident (unscoped).
- `AGENTS.md` is freeform: keep all harness rules inside one marker-managed
  block, one `###` heading per rule:

```markdown
<!-- harness:rules:begin -->
## Rules

### Name Python helpers in camelCase
Match the JS side of the codebase (e.g. `formatDueDate`).
<!-- provenance: ... -->
<!-- harness:rules:end -->
```

## Editing discipline

Itemized operations only: add one rule, edit one rule, remove one rule.
Never rewrite a whole file or the whole managed block — surgical edits
preserve everything else byte-for-byte (iterative full rewrites erode
content; see ACE, arXiv 2510.04618).
