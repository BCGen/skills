# Asking a human

Rules for any step that draws something out of a person. They govern skill-writing's
own interrogation, and they go into any skill it authors that interviews a user —
whatever skill-writing models, the skills it writes reproduce.

## Contents

- [Mechanics: true in both modes](#mechanics-true-in-both-modes)
- [What to establish about a procedure](#what-to-establish-about-a-procedure)
- [Press the request itself, not only the answers](#press-the-request-itself-not-only-the-answers)
- [Which mode are you in](#which-mode-are-you-in)
- [Adversarial: pressing a claim](#adversarial-pressing-a-claim)
- [Generative: drawing out something half-formed](#generative-drawing-out-something-half-formed)
- [Ending](#ending)

## Mechanics: true in both modes

These are facts about how attention works in a serial conversation, not about
attacking or expanding.

**One question at a time.** A batch is bewildering, and it wrecks the ordering: an
early answer reshapes which questions still matter.

**Every question carries a recommended answer, and its reason.** Producing an answer
is expensive; reacting to one is cheap. The recommendation is a reaction surface —
and it exposes your model of the problem so the user can correct it. A neutral label
offers nothing to push against:

> "I recommend A. The pain is choice overload, not missing information — Maps already
> saturates the information, and that is what makes deciding hard."

They can now disagree with the *reason*, which is where the truth arrives. This
matters **more** when the user has not thought the thing through, not less: they
cannot author an answer, but they can always react to one.

**Say what the question decides.** What changes depending on the answer, not just
what the options are. A question that carries its own stakes catches a
misunderstanding on the first turn instead of the third.

**Look facts up; never ask them.** A question you could answer by reading spends the
user's attention on nothing. Only decisions — where they are the sole possible source
— earn a question.

**Ask only what you can phrase.** The test is whether the question can be *stated*
precisely, not whether it can be *answered*. Sensing an unresolved area you cannot
yet put into words is normal: park it in a holding list and revisit it when a later
answer sharpens it. Asking it early returns a vague answer, and a vague answer gets
treated as settled.

## What to establish about a procedure

The user describes what they do; what they omit is what breaks. Establish, only where
an answer would change the output:

- A checkable completion criterion for each step.
- What to do when a precondition is absent (file missing, command fails).
- Whether a failed step blocks or warns.
- When the skill should NOT fire.
- The output artifact's shape — and the name and location of any file it writes.
- Which tools or data it depends on, and what it does when they are absent.
- The tacit step: "last time you did this by hand, what did you skip or add from
  experience?" — the one the agent will get wrong.

## Press the request itself, not only the answers

The rules above will be obeyed against every answer the user gives and still never
reach the sentence they opened with. A user names the container they know — "a PRD", "a
mindmap" — and the whole skill gets built around furniture rather than around the job.
**A question asked inside a premise cannot reach the premise:** "what does the PRD feed"
presupposes a PRD.

So the nouns of the opening request are pressed first, each with one concrete
alternative to react against — the same manufactured concreteness, aimed one level up.
Once. A user who keeps their premise keeps it; the point is that they chose it rather
than inheriting it from their own first sentence.

The failure that bought this rule: a skill for shaping ideas was interrogated for eight
questions without one of them touching the PRD, the mindmap, or the output language the
request had named. The user knocked all three down himself, and the last one exposed a
contradiction that had been sitting in the opening sentence the whole time.

## Which mode are you in

**Adversarial** — a claim exists and you press it until it holds.
**Generative** — something half-formed exists and you draw it out.

The rules invert between them, so decide first. A skill that does both runs the
generative pass first: an unmapped space collapses under pressure.

## Adversarial: pressing a claim

- **Depth-first.** Walk the dependency tree; resolve a branch, then the next.
- **Pressure is contradiction.** Hold two incompatible statements side by side and
  make the user pick. Invent an edge case that breaks a boundary they stated.
- **Progress shrinks the space.** Each answer closes questions.

## Generative: drawing out something half-formed

- **Breadth first, depth second.** Enumerate the space before resolving any branch.
  Depth-first presupposes a tree that does not exist yet, and commits the user to
  whichever branch their opening sentence happened to name — a dependency that is an
  artifact of their phrasing, not of the problem.
- **Pressure is manufactured concreteness.** There is nothing to contradict, so make
  something: a specific, concrete, possibly wrong proposal, offered so they have
  something to push against. A confidently wrong proposal is the most productive move
  available when the user cannot yet say what they want.
- **Progress may widen the space.** A question that opens three branches has advanced
  the work. An interview that only narrows is not generating.

## Ending

**Stop when nothing further would change the result** — never by hitting a count. A
long interview on an under-specified idea is the interview working; a long interview
of low-value questions is a defect in the questions, and a cap hides the difference
between them. Generatively, that point is saturation: new questions stop yielding new
material.

**The user ratifies, not you.** A shared understanding is a two-party state; you are
one party. Say you believe it is complete, and wait. Do not act before they confirm,
and never supply the user's side of a question you asked — an agent that answers its
own question has stopped interviewing and started imagining.

The bar to aim at is checkable: **the result is done when someone downstream could
act on it without asking a single question.**
