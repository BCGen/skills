# Design: no-third-party-names-in-runtime

## Context

The control-selection guidance in `dry-run.md` illustrates the offer with a real
skill's name. The illustration is accurate — that skill is installed on the author's
machine, and it did make a fitting control once — which is exactly why it slipped
through.

## Goals / Non-Goals

**Goals:**

- Keep the runtime free of names we do not control.
- State the rule where it binds every authored skill, not only the file that broke it.

**Non-Goals:**

- Preventing an agent from naming a skill it discovered by reading what is installed.
- Restricting documentation, which people read and agents do not load.

## Decisions

### D1. Discovering a name is fine; shipping one is not

The distinction is where the name comes from. A name the agent found by reading the
descriptions of the skills actually installed is evidence — it is the whole point of
the duplicate check and the control selection. A name written into the skill is a
standing recommendation for software we do not maintain, made to every user, whether
or not they have it.

Concretely, a hard-coded name does three things: it biases the control choice toward
one candidate even when a fitter one is installed; it rots without warning when that
skill is renamed or abandoned, and no audit of ours will notice; and it puzzles the
majority of users, who do not have it.

### D2. The rule lives in the conventions

The failure appeared in one reference, but nothing stopped it appearing anywhere else.
The conventions are what skill-auditing checks against, so that is where the rule
binds — and it carries the failure that bought it, per the provenance rule.
