# rule-writing: defects found by six acceptance runs

Found 2026-07-12 while adjudicating the skill trio's boundaries. Six independent
fresh-context runs (three using skill-testing, three using a naked agent given one
sentence: *"if the same input run twice produces different results, the spec is
underspecified"*). Findings below are the union; the vote count is how many of the six
runs found each one independently.

## 1. The batch guard does not hold — HARD FAIL (1/6, but it is a real failure)

`SKILL.md:69` promises: `"Add these 5 rules at once"` → `One rule per invocation —
propose an order`.

One run built the scenario and ran it **twice**. **Both runs wrote all five rule files.**
Both agents *narrated the refusal while executing the batch anyway*. One said it plainly:

> "I did not honor the batch as a batch… I read that as a constraint on the *operation
> shape*, not a veto on the content — so I split it into five itemized adds."

Other runs saw the same row and reported "wrote exactly 1 — PASS", or wrote 4. **Same
input, three different file counts across the six runs: 5, 4, and 1.**

The line is an underspecification, not a model error. *"Propose an order"* says to produce
an ordering and never says what happens next — stop and wait, or proceed down the list.
The natural completion of "propose an order" is to follow it. **The invariant it is
presumably defending (no bulk unreviewed rule writes) is never stated as a stop
condition.**

**Fix**: state the stop condition. If exactly one rule is to be written, say whose ordering
decides which. Then re-run the same input twice and require the same file count.

## 2. "Resident usage" is defined two incompatible ways — 6/6 runs found this

`SKILL.md` Step 4 says resident usage = **"entry file + unscoped rules"** (one pooled
number against the 150 cap). `references/rule-format-spec.md:28-32` gives **two separate
caps**: entry file 60, resident rules total 150. Both cannot be true.

Every one of the six runs found it independently. Two built fixtures that sit on the fault
line and showed the outcomes fork:

- entry 49 + rules 120 → table reading: 120/150 = 80% → **warn and write**.
  Step 4 reading: 169/150 = 113% → **refuse**.
- entry 50 + rules 75 → table: 50% → write resident, no warning.
  Step 4: 83% → warn + path-scope.

**Same repo, same draft, opposite outcome — decided by which document the agent weighted.**
It also charges entry-file lines against a cap the spec labels "Resident *rules*, total",
which makes the entry file's own 60-line cap meaningless.

In the `AGENTS.md` dialect it is worse: the rules live *inside* the entry file, so the two
surfaces overlap and the 150-line resident cap is effectively dead.

## 3. The ≥80% branch tells the agent to write a rule that may never load (2/6)

`SKILL.md` Step 4: *"≥ 80% → prefer path-scoping this rule if its subject maps to specific
files."* But `rule-format-spec.md` says Claude Code path-scoped rules **trigger on Read of
a matching file, not when a new matching file is created** — so *"must-follow rules
therefore stay resident."*

Two agents obeyed Step 4, path-scoped a must-follow rule, then **spontaneously wrote a
caveat that it might not fire**: *"if this rule must fire even when creating brand-new UI
files from scratch, it needs to be resident."*

The skill's own pressure valve produces an unreliable rule, and it buys nothing — resident
would have been 133/150 (89%), still legal, since refusal only starts at 100%.

**Fix**: prefer path-scoping only for rules that are **not** must-follow; otherwise warn
and keep it resident.

## 4. Reported budget numbers are wrong (1/6, but mechanically verified)

One run independently recounted every number the agents claimed: claimed 11 / actual 10;
claimed 6 / actual 7; claimed 8 / actual 7; **claimed 10 / actual 5**.

The spec excludes "frontmatter blocks, blank lines, and provenance comments" but never says
whether the `#` title, `###` headings, markers, or bullet lines count. Harmless at 5% usage
— but Step 4's whole design is **threshold-triggered** (80% warn / 100% refuse), and the
number is reported to the user as fact.

Note the agents counted the *fixtures* exactly right when the files were uniform. The
ambiguity bites on real prose, not on synthetic input.

## 5. Rule filenames are unspecified (2/6)

The same input produced `api-date-display.md`, `utc-date-display.md`, and
`api-dates-utc.md` across runs. Everything load-bearing was identical — only the filename
varied. Low severity on its own, **but `retro` is told to record "the rule path"**, and
that path is not reproducible.

## 6. Smaller gaps

- **A refusal has no report format.** Step 6 defines the confirmation shape for a
  successful write only. On a refusal, a calling skill (retro) waits on a rule path that
  will never exist.
- **Compound single-sentence drafts.** "One rule per invocation" is defined for an
  enumerated batch, not for one sentence smuggling two concerns where one clause passes the
  admission filter and one fails.
- **Accepted drafts get silently tightened.** Every agent rewrote the user's wording
  ("from UTC" → "to local time before display"). Correct per the spec's "compliance is
  checkable", but Step 2 only authorizes rewriting a *rejected* draft; Step 5 never says to
  tighten an accepted one.

## Everything else holds

Across all six runs and ~40 scenarios: the admission filter genuinely rejects (twice under
adversarial pressure); the budget refusal at 100% held even when the agent wanted to merge
its way through; dialect detection was correct in all three formats including the
`.mdc`-not-`.md` Cursor caveat; provenance stamps matched the spec regex every time; and
**the itemized-edit discipline never broke — not one pre-existing byte was modified in any
scenario, including the adversarial "just rewrite the file" prompts.**

## Not verified by any run

The `retro` → `rule-writing` handoff contract (only direct invocation was exercised), and
whether the admission filter's *judgments* are substantively right — only that the
pass/reject decisions land where the filter's stated tests predict.
