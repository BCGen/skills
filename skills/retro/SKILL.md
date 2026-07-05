---
name: retro
description: Runs a post-task retrospective - detects user corrections, failures, and repeated mistakes, stages lessons as candidates, and proposes consent-gated improvements routed to their fittest destination (project rule, entry-file fact, memory, backlog, or skill update). Use when a task is complete or about to be marked done.
---

# Retro

Turn what went wrong this task into durable improvements — without letting
one-off noise become permanent settings. Never act without user consent.

## Step 1 — Detect signals

Scan the current conversation (the whole task, not just the last steps) for:

- **Correction**: the user overruled, redirected, or fixed your approach or output.
- **Failure**: a command failed, or an edit was reverted or redone.
- **Repetition**: the same mistake surfaced twice or more within this task.

**No signals → output at most 2 lines and stop. Write nothing.**

Evidence rules: only externally observable evidence counts — a hunch with
no correction or failure behind it is NOT a lesson. Use only the current
conversation; do not read platform transcript files.

## Step 2 — Stage candidates

For each evidenced lesson (formats in [references/loop-file-formats.md](references/loop-file-formats.md)):

1. Scan `.ai/learnings/` filenames and H1 titles for a match (create the
   directory with its README first if missing). Wording differences do not
   defeat a match.
2. **New lesson** → create `.ai/learnings/<slug>.md` (`status: candidate`,
   provenance bullet). Staged, not proposed.
3. **Matches an existing candidate file** → recurrence: append a provenance
   bullet to that file and carry it into Step 3 as a promotion proposal.
   Two files describing the same lesson → a merge proposal.
4. The user explicitly asking to promote something also qualifies for Step 3.

## Step 3 — Build proposals (max 3, ranked by impact)

Before proposing any promotion, scan the project's rule locations
(`.claude/rules/`, `.cursor/rules/`, the AGENTS.md managed block): if an
existing rule already covers the lesson — whoever wrote it — propose
marking the candidate promoted (pointing at that rule) instead of
creating a duplicate.

| Finding | Destination |
| --- | --- |
| Recurring project-shared convention | Rule, via the **rule-writing** skill (draft the exact rule text) |
| Corrected project fact (build command, layout) | Entry-file edit, shown as a diff first |
| Personal preference (how this user works, not project truth) | The agent's native memory |
| Missing capability or workflow repeated across tasks | New file under `.ai/backlog/` |
| An existing skill's gap caused the problem | Update that skill's mistakes/notes section |

Also check rules touched during this task for staleness, overlap, or
never-triggered content — deletion and merge proposals count toward the 3.

## Step 4 — Present and execute with consent

Present one proposal at a time: the finding, its evidence, the pre-drafted
content, the destination, one line on why this destination beats the other
routes, and one line on what declining means — phrased for the user's
technical background. Then:

- **Approved rule** → hand the draft to rule-writing when installed (the
  mandatory rule write path). Not installed → print the draft for the
  user's own tooling; mention `npx skills add <owner>/<repo>` at most once
  per retrospective, never repeatedly.
- **Approved fact** → apply the entry-file edit exactly as the shown diff.
- **Approved memory / backlog / skill update** → save or edit, showing diffs.
- **Declined** → the candidate file keeps `status: candidate`; nothing else
  happens. Set `status: dismissed` only if the user says so.
- **Promoted** → only after the destination write actually happened, update
  frontmatter: `status: promoted`, `promoted_to: <destination>` (rule path,
  entry file, `memory`, or `skill:<name>`), `promoted_on: <date>`. A
  printed draft is not a write — the file stays `candidate`.

## Honesty rules

Be brutally honest about your own violations. Rationalizations to reject:

| Thought | Reality |
| --- | --- |
| "The task was too simple" | Simple tasks still produce corrections worth staging |
| "The user seems rushed" | The clean-task check costs seconds and 2 lines |
| "Nothing went wrong" | Then say exactly that in 2 lines and stop |
| "I'll remember next time" | You won't. The next conversation starts from zero |

Reports stay proportional: clean task → 2 lines; findings → short evidence
bullets, never essays.
