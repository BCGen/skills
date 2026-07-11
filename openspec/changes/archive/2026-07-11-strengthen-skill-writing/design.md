# Design: strengthen-skill-writing

## Context

skill-writing is the delegation target the shared routing hands multi-step
procedures to, and it is also invoked directly by a user who wants a skill. The
two entry paths do not carry the same guarantees: routing applies the carrier
filter ("mechanically enforceable → config; judgment → doc or rule; multi-step
procedure → skill") before it delegates, while a direct invocation starts at
requirements gathering and drafts unconditionally.

A survey of the published authoring guidance (Anthropic's Agent Skills
best-practices documentation and the `skill-creator` skill in `anthropics/skills`;
`obra/superpowers`' `writing-skills`; `mattpocock/skills`' `writing-great-skills`)
shows the field converging on rules this package's conventions file does not
yet carry, and diverging on two points where we must choose a side. It also
shows that none of them gate on whether the thing should be a skill at all —
that filter is ours, and it is currently unreachable from the direct path.

## Goals / Non-Goals

**Goals:**

- Make the carrier decision reachable from every entry path, without
  re-litigating it when routing already made it.
- Make invocation mode an explicit authoring decision, so a skill's standing
  context cost is paid on purpose.
- Give skill-auditing and retro a defined edit path instead of an implied one.
- Raise the conventions to the platform's published rules, with sources cited,
  so the standard is defensible and auditable rather than invented.

**Non-Goals:**

- Competing on authoring craft. Where the platform documents a rule, we adopt
  and enforce it; we do not write a rival tutorial.
- Building an eval harness (with-skill vs baseline benchmarking).
- Retrofitting `disable-model-invocation` onto this package's existing skills.

## Decisions

### D1. The gate is a check, not a second routing pass

A direct invocation runs one question — could a config, lint rule, or a single
project rule carry this instead? — and reports the mismatch rather than
drafting. It does not re-implement the routing table: routing stays the single
source of the carrier judgment, and a handoff that arrives from it skips the
gate entirely. Duplicating the table into skill-writing would create a second
copy to drift.

Alternative rejected: importing the full routing reference into skill-writing.
That makes every direct invocation pay for a routing read, and puts two
authorities on the same question.

Evidence: none of the surveyed tools gate on carrier fit. `skill-creator`
(`anthropics/skills`) opens at "Capture Intent" and assumes the decision is
made. `obra/superpowers` is the only one with a create/don't-create list, and
its sharpest entry — automate what a validator can enforce, and reserve
documentation for judgment — is already the routing table's first row.

### D2. Invocation mode is asked, not defaulted

The frontmatter default is model-invoked, and a model-invoked skill's
description sits in the agent's context every turn, drawn from a budget shared
across all installed skills. Authoring therefore asks whether the agent — or
another skill — must reach this skill unaided. A skill that only ever fires by
hand ships `disable-model-invocation: true`.

The question is cheap and its answer is knowable at authoring time, which is
what makes it belong here rather than in a later audit: an audit can only
observe that a skill was never auto-invoked, months of standing cost later.

### D3. Craft rules are adopted with citations, not invented

Each new convention traces to Anthropic's published authoring documentation and
is restated in our own words with the source URL recorded in the reference file.
This keeps the standard defensible (we are enforcing the platform's rules, not
our taste), keeps it aligned as the platform evolves, and respects the
package's no-vendoring rule — ideas and rules are absorbed, text is not.

The differentiator is enforcement, not authorship: the surveyed tools carry
their rules as prose that a human must remember, while ours land in a file that
lint and the format audit already read.

### D4. Positive phrasing is a convention, prohibition is the exception

Two independent sources converge: `mattpocock/skills` argues a prohibition names
the thing it forbids, and `obra/superpowers` reports a head-to-head wording test
in which the prohibition arm produced *more* of the unwanted content than the
no-guidance control. Convergence from two unrelated authors, one with a measured
result, is enough to adopt. A prohibition survives only as a guardrail that
cannot be phrased positively, and then carries its positive alternative.

Conflict noted and resolved: Anthropic's documentation suggests strengthening
weak instructions to "MUST", while `skill-creator` calls capitalized MUST/ALWAYS
a yellow flag and prefers explaining why. We follow the latter for prose and
reserve hard imperatives for guardrails, which is consistent with D4.

### D5. Descriptions are written wide

Anthropic's documentation states that Claude under-triggers skills and that the
description is the sole basis for the invocation decision. The convention
therefore instructs triggers to cover the words a user actually says, erring
wide. This is a deliberate split from `obra/superpowers`, which forbids a
description from summarizing the skill's process; our description format
(capability sentence plus "Use when ...") already follows the platform's
what-and-when shape and we keep it.

### D6. The draft is run before it is finalized, by skill-writing itself

The surveyed tools disagree on almost everything except this: none of them trust
an interview to produce a correct skill. `skill-creator` runs 2-3 real prompts
through subagents and compares against a no-skill baseline; `obra/superpowers`
refuses to write a skill until it has watched an agent fail without one;
`mattpocock/skills` settles disputes about a line's value "by running the skill,
not by debate". The holes a user cannot describe are the holes only a run finds.

So skill-writing runs the draft before finalizing — spawning a fresh-context
subagent on a real scenario and showing the user what came out. This needs a
subagent, not a sibling skill: treating the run as skill-testing's job made the
most decisive step in the flow optional, and a user without skill-testing
installed authored blind.

What the user is shown is not a pass/fail verdict but **where the agent had to
improvise** — every point where it invented an assumption, hesitated, or asked
is a sentence SKILL.md failed to say. That signal is nearly mechanical to read
and it names the fix.

The main path is also run once WITHOUT the draft. A skilled run alone proves
nothing — the agent may have done the task correctly anyway, in which case the
skill is unnecessary and its description merely occupies context. What the control
gets wrong is exactly what the skill has to teach; the rest of the draft is
padding. This is the one place the surveyed tools were ahead of us, and it is
cheap: one more subagent.

Bounded on purpose: at most three scenarios — the main path, one
missing-precondition case, one should-not-fire case — and a scenario qualifies only
if the user can say it actually happened or is about to. An imagined edge case is
not worth plugging, and plugging it makes SKILL.md longer and blunter. Beyond that
bound lies the eval harness, which stays a non-goal: no quantitative scoring, no
graded benchmark, no trigger-rate optimization.

### D7. Requirements are interrogated, not transcribed

Gathering today collects our policy inputs (destination, triggers, name) and
nothing about whether the procedure itself is sound. A user says "run our PR
checklist before opening a PR" and we write exactly that — leaving unanswered
what happens when the checklist file is missing, whether a failed item blocks or
warns, and how the agent knows a step is done. The skill looks right and breaks
on first contact.

Interrogation is bounded by a stopping rule — ask only where the answer would
change the output, one question at a time with a recommended answer — and covers
what a user usually knows but rarely volunteers:

- the completion criterion for each step, stated so it can be checked
- what to do when a precondition is absent
- whether a failure blocks or warns
- when the skill should **not** fire
- the shape of the output artifact
- **what it costs when the skill is confidently wrong** — a low-stakes skill may
  act freely; a skill whose wrong answer carries legal, financial, or
  destructive consequence must cite its sources, be allowed to say it does not
  know, and hand the judgment back to a human
- which tools or data sources it depends on, and what it does when they are absent

Tacit knowledge is drawn out by asking what the user skipped or added from
experience the last time they did this by hand — the step they never write down
is the one the agent will get wrong.

### D8. A duplicate check replaces the registry check for everyone not publishing

The registry lookup only matters to a collection addition. Everyone else gets
noise from it, while carrying a risk nobody checks: they already have an
installed skill doing the same job, and they are about to write a second one.
Scanning the descriptions of the skills already installed at the destination is
cheap and catches the overlap the registry never would.

### D9. English-only is this collection's rule, not an authoring rule

The conventions state English-only as if it governed every skill authored
anywhere. It does not: it exists because this collection is published to an
international audience, and it is enforced by this repo's linter over `skills/**`.
Applied as an authoring rule it would force a team whose documentation, rules and
comments are all in another language to receive an English skill — a convention
imposed by the tool rather than the project.

A skill is therefore written in its destination's language: inferred from what
the project already writes, asked once with a recommended answer when the
evidence is absent or contradictory, defaulting to English only when nothing
indicates otherwise. The linter is unchanged — it scopes to this repo — and
English remains the language of a public collection because that is what its
destination speaks.

Triggers follow the same logic and matter more: the description is what an agent
matches a request against, so it carries the words a user actually says, in the
language they say them.

## Risks / Trade-offs

- **The gate annoys a user who already knows they want a skill** → it is one
  question with a recommended answer, asked once; a user who insists proceeds.
  It is skipped entirely on a routing handoff, which is the high-frequency path.
- **Gathering plus interrogation becomes an interrogation marathon** → the
  stopping rule is normative, not advisory: ask only where the answer changes the
  output, recommend an answer with every question, and infer from context
  whatever can be inferred (whether a script is needed is the agent's call, not
  the user's).
- **The dry run costs subagent turns and wall-clock** → capped at three runs,
  and every scenario must be one the user says has actually happened.
- **`disable-model-invocation` is a Claude Code frontmatter key, not part of the
  portable spec** → it is written only when the destination is a Claude Code
  skill directory; other destinations record the decision without the key.
- **Adopted rules drift when the platform's documentation changes** → each rule
  carries its source URL, so the format audit can re-check them against the
  source instead of guessing what we meant.
- **The conventions file grows** → it is a reference, loaded on demand, and the
  rules that can be machine-checked move toward lint over time rather than
  accumulating as prose.

## Open Questions

- Which of the new conventions become lint errors in this repo's CI (frontmatter
  key whitelist and name rules are mechanical; phrasing is not) is left to the
  tasks, not settled here.
