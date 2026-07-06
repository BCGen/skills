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

The **H1 is the ROOT CAUSE**, not the change made this task — "Convert API
date fields from UTC" (matches wherever the problem recurs), never "fixed
the order page timezone" (won't match the next place).

Provenance bullets are **blameless**: never record person names — evidence
describes what happened, breadth can be counted ("a second engineer hit the
same"), and identity, when it matters, comes from git history.

### Status lifecycle

`candidate → promoted → resolved`, with `dismissed` separate:

- `candidate` — staged, observing; not yet fixed.
- `promoted` — fixed via some mechanism, but NOT terminal: the file is KEPT
  so a re-promotion (mechanism upgrade, e.g. doc → rule → tool) can be
  tracked. `promoted_to` records the current destination; `promoted_on` the
  date. Promotion is not limited to rules.
- `resolved` — the user confirmed the problem is CURED (perfectly solved, no
  more adjustment). Reaching resolved **deletes the file** — provenance
  already lives in the destination mechanism's stamp and in git history, so
  `.ai/learnings/` stays a live worklist, not an archive.
- `dismissed` — user said never propose again (a plain decline does NOT
  dismiss).

Promote ≠ cure: promoting fixes it (maybe re-promoted later); curing ends
it (deleted). Only `resolved` deletes.

### Matching

Before creating a file, scan existing filenames AND H1 titles — a new lesson
matches an existing file when both describe the same ROOT CAUSE, regardless
of wording or which place was fixed. When in doubt, treat as a match and
append a provenance bullet (this is how a problem's cross-task trail builds
up). If two files turn out to describe the same root cause, propose merging.

Directory README template (also keeps the directory git-tracked):

```markdown
# Learnings

One lesson per file, kebab-case slug filename, root-cause H1, frontmatter
status (candidate → promoted → resolved; resolved is deleted). A live
worklist, not an archive — see the retro skill.
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
retro skill.
```
