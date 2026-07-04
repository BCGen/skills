# Harness loop file formats

Both files live in the project root, are version-controlled, and are shared
by the whole team. Create a missing file from the templates below before
appending to it.

## `.ai/learnings.md` — staged lesson candidates

Template for a new file:

```markdown
# Learnings (staged candidates)

Lesson candidates observed during tasks. A candidate becomes a rule only
after it recurs or the user explicitly confirms promotion.
See the task-retrospective skill.
```

One entry per lesson. The heading states the lesson as a single imperative
line; each provenance line records one observation:

```markdown
## [candidate] Convert API date fields from UTC before display
- 2026-06-28 · task: report export · evidence: user corrected timezone twice
- 2026-07-05 · task: order list page · evidence: same timezone correction
```

Status markers on the heading:

- `[candidate]` — staged; not yet a rule.
- `[promoted 2026-07-05 → .claude/rules/api-dates.md]` — became a rule; kept
  for history; never re-proposed. Update the marker instead of deleting.
- `[dismissed 2026-07-05]` — user said never propose this again. A plain
  decline does NOT dismiss; the entry stays `[candidate]`.

Matching: a new lesson matches an existing entry when both describe the same
behavior change, regardless of wording. When in doubt, treat as a match and
cite both provenance lines.

## `.ai/backlog.md` — skill ideas and deferred enhancements

Template for a new file:

```markdown
# Backlog

Capabilities worth building later, recorded by the task-retrospective skill.
```

Entry format:

```markdown
## <short idea name>
- 2026-07-05 · task: <task> · why: <what repeated or what was missing>
```
