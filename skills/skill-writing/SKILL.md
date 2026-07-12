---
name: skill-writing
description: Authors or edits a skill - for a package, a project, or a personal setup - by decomposing the problem behind the request rather than transcribing the solution the user asked for, then running the draft against a control before it is trusted. An edit is run against the version it replaces, so an edit that changes nothing does not land. Use when the user wants to create, write, add, or fix a skill, or when another skill (codify, retro) hands over a procedure to capture.
metadata:
  always-read: references/conventions.md,references/dry-run.md
  instruction-budget: 4000
---

# Skill Writing

A skill pays only if it changes behavior, fires often enough to matter, and is worth its
standing context cost — and **you can verify none of the three about yourself.** So put them
outside you: a human settles two, a run settles the third. Drafting is neither, so it has no
gate.

**These rules are yours, not the user's. Ask in their terms; never recite them back.**

## Adjudication 1 — Evidence

**Name the failure.** What did the agent get wrong without this skill? Triggers come from that
failure, in the words the user would actually say. Nothing to name → record the skill as
*unverified by evidence* and continue; the run decides.

**Decompose the problem, not the request.** They named a solution; you need the problem. Ask
what is hurting, and keep asking why until either stops you:

- **A second symptom.** A real root explains more than the one they brought. Ask **"where else
  does this root hurt you?"** A second symptom *they* name is proof of bottom — you cannot
  supply it, so it cannot be nodded through.
- **Unactionability.** The layer lands on something they cannot change → stop, back up one.

**No second symptom is not a reason to keep digging.** Single-symptom roots are real, and
digging past one manufactures the over-decomposition this rule prevents.

**Draw candidates from the root.** The requested skill is one of them, and **it may win**. Each
survives three checks — they constrain the *questions*, never the *answer*, because a derivation
performed to look thorough is worse than none:

1. **Name the layer it attacks.** Tied to no layer, it is a straw man and does not count. A
   non-skill carrier then appears on its own — the deepest layer usually sits outside any
   skill's run time. The list is grown, not ticked.
2. **Conservation of information.** A skill moves, filters, structures, or **fetches**
   information. **It cannot create it.** Per output field, name the source:
   `input | person | file | tool`. **"Inferred" and "I know this" are not sources.** A candidate
   whose output needs what its input lacks, and never fetches it, is a hallucination machine.
   Strike it. Supplying the missing difference convincingly is your default, not your lapse.
3. **Could it be produced upstream?** Conservation cannot see time — it escapes only by fetching
   at run time, never by arranging for the information to exist earlier. Ask.

**Establish the rest**, only where an answer changes the output:

- **Cost of being wrong** — derive it, never ask: destination (personal → project → public) plus
  blast radius (writes, deletes, calls out → one level up). It sets the depth of everything
  below, and anyone you could ask has an incentive to call it low.
- **Where it lives**, and **how it is invoked** — see conventions. Infer; ask only if ambiguous.
- **Does one already exist?** Read the **descriptions** of what is installed, never a body. One
  covers the job → name it, offer to edit that instead.
- **The procedure**: a checkable end for each step, what to do when a precondition is absent,
  when the skill should *not* fire, the shape and location of what it writes, what it depends on.
  And the tacit step — *last time you did this by hand, what did you skip or add from experience?*

**Exit: lay it out and wait.** One question at a time means they never saw the whole. Show the
root, the candidates and why one won, the steps, the triggers, what it writes, what their
answers settled. Ask what is missing, and **wait**. **A premise they later overturn brings you
back here**: name what is void and what survives, renegotiate, and do not reshape the draft
around the new premise — those decisions were made *because* of the old one.

## Draft

Read [references/conventions.md](references/conventions.md). Write SKILL.md at the destination
— **unless its governance forbids an unproposed file** (a spec-driven directory, a protected
path). Then name the gate, write the draft to a scratch path instead, and **still run the
proof**: the run needs a file, not a destination, and the gate wants the proof as evidence.

**Name it here, in a clause.** A wrong name is cheap. Propose candidates with reasons; **the user
settles it.** Check what is installed, and the registry only if it will be published. If the name
already exists as a fact elsewhere in the project, the question is whether to rename, not what to
name. Then show the draft and wait for the go-ahead: a run spends turns, and for an interview
skill it spends the user's own time.

## Adjudication 2 — Proof

Read [references/dry-run.md](references/dry-run.md) and follow it. **The control always runs.**
A new skill is measured against the best alternative the user already has; **an edit is measured
against the version it replaces, and an edit that changes nothing does not land.**

**Done** means all three: conventions satisfied; no improvisation on the main path that would
change the output; the user has seen the real output and accepted it. Say where it landed and how
it fires.

## Asking a human

These govern every question above, and go into any skill you author that interviews someone.

- **One question at a time**, each carrying **a recommended answer and its reason**. Reacting to
  an answer is cheap; producing one is expensive. The reason is what they push against, and it
  exposes your model so they can correct it — this matters **more** when they have not thought it
  through, not less.
- **Say what the question decides.** Look facts up; never ask them. **Park one you cannot yet
  phrase** — asked early it returns a vague answer, and a vague answer gets treated as settled.
- **Stop when nothing further would change the result**, never on a count. **They ratify, not
  you**: never answer your own question.
- **Adversarial** (a claim exists — press it): depth-first, pressure is contradiction, progress
  shrinks the space. **Generative** (half-formed — draw it out): **breadth-first before any
  branch**, pressure is a concrete and possibly wrong proposal, **progress may widen the space**.
  Both → generative first: an unmapped space collapses under pressure.
