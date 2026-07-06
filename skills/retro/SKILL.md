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

1. Scan `.ai/learnings/` filenames and H1 titles for a **root-cause** match
   (create the dir + README if missing). Title a candidate by its root cause
   ("API dates need UTC conversion"), not this task's change, so continued
   fixes to the same problem match across tasks. Wording differences do not
   defeat a match.
2. **Matches an existing file** → recurrence: append a provenance bullet,
   carry it to Step 3.
3. **New lesson** → recommend by evidence, user decides: one-off / no stated
   rule → **stage** (`status: candidate`, observe); recurring or the user
   says it's a rule → **fix now** (promote directly in Step 3, no observe
   period). Either way create the file; fix-now keeps it too (promote ≠ cure).

## Step 3 — Build proposals (max 3, ranked by impact)

**On recurrence, first ask about cure.** Show the full trail (all provenance
across tasks) and offer three choices: (a) **cured** — the user confirms the
problem is perfectly solved, no more adjustment → mark `status: resolved`
and DELETE the file; (b) **harden** for next time → promote (keep the file);
(c) **keep observing** → leave it. Never mark cured automatically.

For a lesson being fixed/hardened, decide its mechanism with the shared
routing in [references/routing.md](references/routing.md) — the SAME logic
codify uses, so it routes to config / project doc / rule / tool-upgrade /
pointer at full parity, not just "a rule." Reconciliation applies first: if
the lesson already lives in a rule/doc/config, respect it (propose marking
the candidate promoted to it, no duplicate).

retro-specific routes, on top of the shared table:

| Finding | Destination |
| --- | --- |
| Personal preference (how this user works, not project truth) | The agent's native memory |
| Missing capability or workflow repeated across tasks | New file under `.ai/backlog/` |
| An existing skill's gap caused the problem | Update that skill's mistakes/notes section |

Also check rules touched during this task for staleness, overlap,
never-triggered content, or redundancy with a tool/hook now enforcing the
same thing — when you escalate a lesson to deterministic enforcement,
propose retiring the advisory rule it replaces. Deletions and merges count
toward the 3.

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
  printed draft is not a write — the file stays `candidate`. Promoted files
  are KEPT (a later re-promotion to a better mechanism updates them).
- **Cured** → the user confirmed the problem is resolved: delete the
  learning file (its provenance is already in the destination and git).

## Honesty rules

Be brutally honest about your own violations. Reject the rationalizations:
"too simple" (simple tasks still produce corrections), "user seems rushed"
(the check costs seconds), "nothing went wrong" (then say so in 2 lines),
"I'll remember next time" (you won't — the next conversation starts blank).

Reports stay proportional: clean task → 2 lines; findings → short evidence
bullets, never essays.
