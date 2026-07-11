---
name: idea-shaping
description: Interviews the person behind a raw idea and pressure-tests it into a non-technical PRD plus an interactive mindmap - for a brand-new product or a new capability on one that exists. Use when someone has a spark, a hunch, or a half-formed idea and wants it written up, or asks to brainstorm, flesh out an idea, run an ideation session, or turn a thought into a PRD.
---

# Idea shaping

A person with an idea can feel it before they can state it. The scarce thing in
the room is the question, not the typing — so the interview is the skill, and the
documents are what falls out of it. Two artifacts land at the end: a PRD anyone
can read, and a mindmap they can open.

This document names no technology. Stack, schema, API, and cost are absent by
design: an idea killed by an implementation detail dies before anyone has
decided whether it was worth having.

## Step 1 — Catch the spark, and its shape

Ask for the idea in their own words and let them finish. Establish which of two
shapes it has: a **new product**, or a **new capability inside a product they
already have**.

Stay out of the code, in both shapes. Even when the idea targets a project on
this machine, do not go read it — an implementation you have just read becomes
the ceiling of what you dare to ask for, and the product's context is better
told by the person than inferred from its source.

Done when you can restate the idea in one sentence and they accept the
restatement. That sentence becomes the PRD's title line and the slug.

## Step 2 — Interview until the idea can stand on its own

Read [references/interview.md](references/interview.md) — the six things to
establish, what a non-answer sounds like, and the rules for asking. Ask one
question at a time.

When they drift into technology, write the fragment down as an assumption and
steer back to the problem. Their instinct about the solution is worth keeping;
it is just not what this document is for.

Done when all six are answered — not when enthusiasm runs out. An idea that
cannot survive question five is better dead on paper than alive in a sprint.

## Step 3 — Write the PRD

Write `docs/ideas/<slug>/prd.md`, following
[references/prd-template.md](references/prd-template.md), in the language the
interview was held in. Create the directory if it is absent.

Every claim traces to something they said. Where you filled a gap yourself, say
so under Assumptions rather than passing it off as theirs. Where nobody knows,
write that down as an open question — an idea document is allowed to admit what
it does not know, and the ones that pretend otherwise are the ones that mislead.

Done when the document contains no sentence you cannot attribute.

## Step 4 — Render the mindmap

Write `docs/ideas/<slug>/mindmap.html` per
[references/mindmap.md](references/mindmap.md) — the PRD's spine as one
expand-and-collapse map, self-contained in a single file.

Done when the file opens in a browser and its branches match the PRD's sections.

## Step 5 — Hand it back

Give them both paths, and say that the `.html` opens in a browser. Then repeat
the riskiest assumption on its own: it is the one thing worth testing before
anyone builds anything, and it is the line they will otherwise skim past.
