# Harness loop file formats

Cross-task state lives in two directories in the project root, both
version-controlled and shared by the whole team. One markdown file per
lesson or idea — new entries create new files, so concurrent work never
merge-conflicts; editing the *same* lesson collides on the same file,
which is the one conflict worth a human look.

## `.ai/learnings/` — staged lesson candidates

One file per lesson, named as a kebab-case slug of the lesson content
(e.g. `convert-api-dates-from-utc.md`). File format:

```markdown
---
status: candidate
promoted_to:
promoted_on:
---

# Convert API date fields from UTC before display

- 2026-06-28 · task: report export · evidence: user corrected timezone twice
- 2026-07-05 · task: order list page · evidence: same timezone correction
```

- `status`: `candidate` (staged), `promoted` (acted on; keep for history),
  or `dismissed` (user said never propose again — a plain decline does NOT
  dismiss).
- `promoted_to`: the destination that fit best — a rule path
  (`.claude/rules/api-dates.md`), `memory`, or `skill:<name>` for a skill
  update. Promotion is not limited to rules.
- One provenance bullet per observation: date · task · evidence.

Matching: before creating a file, scan existing filenames AND H1 titles —
a new lesson matches an existing file when both describe the same behavior
change, regardless of wording. When in doubt, treat as a match and append
a provenance bullet. If two files turn out to describe the same lesson,
propose merging them.

Directory README template (also keeps the directory git-tracked):

```markdown
# Learnings (staged candidates)

One lesson per file, kebab-case slug filename, frontmatter status.
A candidate is promoted to its fittest destination (rule, memory, skill
update) only after it recurs or the user confirms.
See the task-retrospective skill.
```

## `.ai/backlog/` — pre-proposal ideas

One idea per file, same slug naming. Format:

```markdown
---
status: open
---

# <short idea name>

- 2026-07-05 · task: <task> · why: <what repeated or what was missing>
```

Directory README template:

```markdown
# Backlog

One idea per file. Capabilities worth building later, recorded by the
task-retrospective skill.
```
