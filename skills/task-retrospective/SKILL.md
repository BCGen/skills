---
name: task-retrospective
description: Reviews a completed task for user corrections, failures, and repeated mistakes, stages the lessons as candidates, and proposes consent-gated improvements routed to project rules, personal memory, or a skill backlog. Use when a task is complete or about to be marked done.
---

# Task Retrospective

Turn what went wrong this task into durable improvements — without letting
one-off noise become permanent rules. Never act without user consent.

## Step 1 — Detect signals

Scan the current conversation (the whole task, not just the last steps) for:

- **Correction**: the user overruled, redirected, or fixed your approach or output.
- **Failure**: a command failed, or an edit was reverted or redone.
- **Repetition**: the same mistake surfaced twice or more within this task.

**No signals → output at most 2 lines** (e.g. "Retrospective: clean task — no
corrections, failures, or repeats.") **and stop. Write nothing.**

Evidence rules:

- Only externally observable evidence counts. A hunch that something "could be
  better" with no correction or failure behind it is NOT a lesson — drop it.
- Use only the current conversation. Do not read platform transcript files.

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

| Finding | Destination |
| --- | --- |
| Recurring project-shared convention | Rule, via the **add-rule** skill (draft the exact rule text) |
| Personal preference (how this user works, not project truth) | The agent's native memory |
| Missing capability or workflow repeated across tasks | New file under `.ai/backlog/` |
| An existing skill's gap caused the problem | Update that skill's mistakes/notes section |

Also check rules touched during this task for staleness, overlap, or
never-triggered content — deletion and merge proposals count toward the 3.

## Step 4 — Present and execute with consent

Present one proposal at a time: the finding, its evidence, the pre-drafted
content, and the destination. Then:

- **Approved rule** → hand the draft to add-rule (the only rule write path).
  If add-rule is not installed, print the draft for manual use and note:
  `npx skills add <owner>/<repo>`.
- **Approved memory** → save via the agent's native memory feature.
- **Approved backlog / skill update** → create or edit the file, showing the diff.
- **Declined** → the candidate file keeps `status: candidate`; nothing else
  happens. Set `status: dismissed` only if the user says so.
- **Promoted** → only after the destination write actually happened, update
  the candidate's frontmatter: `status: promoted`, `promoted_to:
  <destination>` (rule path, `memory`, or `skill:<name>`), `promoted_on:
  <date>`. An approval whose write could not happen (e.g. the add-rule
  fallback printed a draft instead) leaves the file at `status: candidate`.

## Honesty rules

Be brutally honest about your own violations — "I skipped the check because it
looked simple" is a violation, not judgment. Rationalizations to reject:

| Thought | Reality |
| --- | --- |
| "The task was too simple" | Simple tasks still produce corrections worth staging |
| "The user seems rushed" | The clean-task check costs seconds and 2 lines |
| "Nothing went wrong" | Then say exactly that in 2 lines and stop |
| "I'll remember next time" | You won't. The next conversation starts from zero |

## Report style

Proportional to findings: clean task → 2 lines; findings → short bullets with
evidence, never essays. Deep-dive only where a proposal needs justification.
