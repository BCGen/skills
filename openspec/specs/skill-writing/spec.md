# skill-writing Specification

## Purpose

Authoring and editing skills that survive contact with reality — for a
skills package, a project, or the user's personal setup.

## Requirements

### Requirement: Convention-complete authoring

A skill authored through skill-writing SHALL satisfy the authoring
standard: frontmatter name equals the directory name; frontmatter carries only
keys the Agent Skills specification allows; the name is within 64 characters of
lowercase letters, digits and single interior hyphens, and avoids the platform's
reserved words; description is a capability sentence plus a "Use when ..."
sentence within 1024 characters, written in the third person and covering the
words a user actually says, because an agent under-triggers a narrow
description; body within 100 lines AND within the platform's 5,000-token instruction budget,
whichever binds first, so that a body of few but enormous lines cannot evade the
cap; detail split into references/ that sit one level below SKILL.md, that the
body says when to read, and that carry a table of contents once a reference file
passes 100 lines; written in the destination's language;
original content (no vendoring); scripts only for deterministic operations, and
a script resolves its own foreseeable errors rather than handing them back;
instructions state what to do, reserving a prohibition for a guardrail that
cannot be phrased positively and pairing it with the positive alternative; no
time-sensitive content; one default approach with an escape hatch rather than a
menu of options; one term per concept throughout. The conventions SHALL live in
one references file that other skills (e.g. skill-auditing) can read as the same
source of truth, and each rule adopted from the platform's published guidance
SHALL record its source.

#### Scenario: Convention enforcement

- **WHEN** a draft violates any convention (e.g. body over 100 lines)
- **THEN** skill-writing fixes or flags it before presenting the draft

#### Scenario: Illegal frontmatter key

- **WHEN** a draft carries a frontmatter key outside the allowed set
- **THEN** skill-writing removes or relocates it before presenting the draft

### Requirement: Naming discipline

The name is the user's decision. skill-writing SHALL propose candidates with their
reasons, or take a name the user offers, and the lookups SHALL inform that decision
rather than make it: a registry that reports a name is free has not decided that it
is the right name, and the user is the one who will type it.

Naming SHALL follow the draft, not precede it: a name is decidable only once the
skill has a shape, and a name proposed earlier lands in the middle of the
interrogation — beside the question about the output artifact — with two naming
threads open at once.

A skill that produces a named artifact has two distinct naming decisions, and they
SHALL NOT share a turn. The artifact's name and location are the user's, governed
by the project's conventions, and are settled with the output-shape question. The
skill's own name is settled after the draft. Each question SHALL say which of the
two it is deciding.

The order for the skill's own name SHALL be:

1. Propose candidates with reasons, or take the user's own, following the
   conventions' naming philosophy (short, apt, gerund for managed-unit tools).
2. Check the name against the skills installed at the destination — a name already
   installed there is a clash wherever the destination is.
3. Check the registry, and only for a skill that will be published publicly. A
   private package, a project, or a personal setup SHALL skip a lookup that cannot
   apply to it.

A failed check returns to step 1 with what it found; exact registry collisions are
surfaced with install counts, and any alternative offered SHALL itself have been
checked. The user settles the name at every pass.

#### Scenario: The name is chosen

- **WHEN** the draft has a shape and needs a name
- **THEN** skill-writing proposes candidates with reasons, the user settles it, and
  only then do the installed-skill and registry checks run

#### Scenario: Collision found

- **WHEN** the name the user settled on, for a skill bound for public publication,
  has an exact match on skills.sh
- **THEN** the collision is reported with install counts, and the alternatives
  offered have themselves been checked — the user chooses again

#### Scenario: Unpublished skill

- **WHEN** authoring a skill that will not be published publicly
- **THEN** no registry lookup runs; only clashes with skills already installed at
  the destination are avoided

#### Scenario: The skill produces a named artifact

- **WHEN** the skill being authored writes a file whose name and location must be
  decided
- **THEN** the artifact's name is settled with the output-shape question and the
  skill's name after the draft, each question saying which one it decides, and
  never both in one turn

### Requirement: Gather, draft, review flow

The skill SHALL gather requirements (task domain, use cases, triggers,
needed resources) before drafting, and present the draft for user review
before finalizing. The description's trigger sentence is written from the
gathered use cases, not invented afterward. Gathering SHALL ask what failure the
user actually observed without the skill, and the trigger conditions SHALL come
from that observed failure; when no failure has been seen, skill-writing SHALL
say the triggers are unverified rather than inventing them.

#### Scenario: Requirements before draft

- **WHEN** the user asks for a new skill with an unstated trigger context
- **THEN** skill-writing asks for the use cases before producing a draft

#### Scenario: No observed failure

- **WHEN** the user cannot name a failure the agent made without the skill
- **THEN** skill-writing flags the triggers as unverified and offers to draft
  from stated use cases instead of inventing them

### Requirement: Destination-aware authoring (delegation target)

skill-writing SHALL establish where a skill lives as part of requirements
gathering — a package's `skills/`, the host project's skill directory,
or the user's global skills directory — recommending from context and
asking one question with a recommended answer when the destination is
ambiguous. It is the delegation target that codify and retro hand
multi-step procedures to per the shared routing; a delegated project
procedure is recommended into that project. The dry-run discipline SHALL hold
at every destination. The frontmatter description SHALL surface the
non-package triggers so delegated handoffs reach the skill.

#### Scenario: Delegated handoff lands in the project

- **WHEN** codify or retro hands over a drafted multi-step procedure while
  working in a host project
- **THEN** skill-writing authors it in that project's skill directory per
  the context recommendation, not as an addition to a package

#### Scenario: Ambiguous destination

- **WHEN** the gathered context does not settle where the skill lives
  (e.g. zero or multiple plausible skill directories)
- **THEN** skill-writing asks one question with a recommended answer
  before writing

### Requirement: Carrier gate before drafting

A skill-writing invocation that did not arrive from a routing handoff SHALL
first check whether a config, a lint rule, or a single project rule carries the
need better than a skill, and SHALL report that mismatch instead of drafting.
An invocation delegated by codify or retro SHALL skip the gate, because the
shared routing table already made the carrier decision.

#### Scenario: Direct request that a config carries better

- **WHEN** a user asks directly for a skill that enforces something a linter or
  config already expresses
- **THEN** skill-writing names the fitter carrier and asks whether to proceed
  before any draft is produced

#### Scenario: Routing handoff skips the gate

- **WHEN** codify or retro hands over a multi-step procedure per the shared
  routing
- **THEN** skill-writing proceeds to requirements gathering without re-asking
  the carrier question

### Requirement: Invocation mode is decided, not defaulted

Authoring SHALL establish whether the agent, or another skill, must reach the
skill unaided. A skill that only ever fires by hand SHALL be authored as
user-invoked, carrying `disable-model-invocation: true` where the destination
supports the key, so that its description does not occupy the agent's context
every turn. A skill that must be reachable by the agent or by a sibling skill
SHALL stay model-invoked, and its description carries the triggers.

#### Scenario: Skill only ever invoked by hand

- **WHEN** the gathered use cases show the skill is always started by the user
  and no sibling skill reaches it
- **THEN** the authored skill is user-invoked and the standing context cost is
  not paid

#### Scenario: Destination without the key

- **WHEN** the destination does not support `disable-model-invocation`
- **THEN** the decision is still recorded in the draft and the key is omitted

### Requirement: Editing an existing skill

skill-writing SHALL support editing an existing skill, not only authoring a new
one. An edit SHALL satisfy the same conventions, SHALL skip the registry
collision check, and SHALL re-run the dry run against the scenario the edit was
meant to fix.

#### Scenario: Audit fix routed for execution

- **WHEN** skill-auditing routes an approved fix, or retro proposes an update to
  a skill whose gap caused a mistake
- **THEN** skill-writing edits that skill in place under the same conventions and
  re-runs the dry run on the failing scenario, without a naming or registry step

### Requirement: Bounded requirements interrogation

Before drafting, skill-writing SHALL interrogate the procedure itself, not only
the authoring inputs. It SHALL establish: the completion criterion for each step,
stated so it can be checked; what to do when a precondition is absent; whether a
failed step blocks or warns; when the skill should not fire; the shape of the
output artifact, including the name and location of any artifact it writes; and
the tools or data sources it depends on, with the behavior when they are absent.
The cost of the skill being confidently wrong is established earlier, during
gathering, because it sets how deep this interrogation goes. It SHALL also ask
what the user skipped or added from experience the last time they did the task by
hand, to surface tacit steps.

Interrogation SHALL ask only where the answer would change the output, one
question at a time, each asked per the rules for how a question is asked, and
SHALL infer from context what can be inferred rather than asking.

#### Scenario: Failure handling is unstated

- **WHEN** the described procedure has a step that can fail and the user has not
  said whether a failure blocks or warns
- **THEN** skill-writing asks, with a recommended answer, before drafting

#### Scenario: A wrong answer carries real consequence

- **WHEN** the skill produces claims whose error carries legal, financial, or
  destructive consequence
- **THEN** the authored skill states its sources, is permitted to report that it
  does not know, and returns the judgment to a human rather than asserting

#### Scenario: Nothing further would change the output

- **WHEN** the remaining unknowns would not change what the skill does
- **THEN** skill-writing stops asking and drafts

### Requirement: The skill is written in its destination's language

A skill SHALL be written in the language its destination already uses, not in a
language this package prefers. For a project destination, skill-writing SHALL
infer the language from what the project writes — its documentation, its existing
skills and rules, its code comments — and SHALL ask once, with a recommended
answer, when the evidence is absent or contradictory. English is the default only
when nothing indicates otherwise. A skill published in a public package is
written in English, which is that destination's language, and is a rule of that
package rather than of authoring.

The description's triggers SHALL use the words a user actually says, in the
language they say them, since the description is what an agent matches a request
against.

#### Scenario: Project writes in another language

- **WHEN** a project's documentation, rules, and comments are written in a
  language other than English
- **THEN** the authored skill is written in that language, and no English is
  imposed on it

#### Scenario: Language cannot be inferred

- **WHEN** the project offers no evidence of a prevailing language, or the
  evidence contradicts itself
- **THEN** skill-writing asks once, with a recommended answer, before drafting

### Requirement: Duplicate check against installed skills

Once the job is stated and before any interrogation, skill-writing SHALL check the
skills already installed at the destination for one that covers the same job, and
SHALL surface an overlap so the user can extend the existing skill instead of
adding a second one. The check comes early on purpose: a user interrogated at
length only to learn they already own the skill was interrogated for nothing. This
check needs the job and not the name, so it carries no naming decision.

This check applies at every destination; the skills.sh registry check belongs to
the naming step, after the draft, and only for a skill that will be published
publicly.

#### Scenario: An installed skill already covers the job

- **WHEN** a skill installed at the destination already covers the described job
- **THEN** skill-writing names it and offers to edit it instead of authoring a
  duplicate

#### Scenario: No naming question here

- **WHEN** the duplicate check runs
- **THEN** no name is proposed and no registry lookup fires — both wait for the
  draft

### Requirement: The draft is run before it is finalized

After drafting and before final review, skill-writing SHALL run the draft in a
fresh-context subagent on a real scenario and present the result to the user.
The run SHALL NOT depend on skill-testing being installed.

The main path SHALL also be run once against a control, unless the skill is
low-stakes. The control is the strongest alternative the user actually has: a
skill installed at the destination that already performs the step, where one
exists; the agent with no skill at all otherwise. A control of nothing answers
only "is this better than nothing", while the question that decides whether the
skill should exist is "is this better than what I already have". What the control
gets wrong is what the skill has to teach; everything else in the draft is padding.
When the control does as well, skill-writing SHALL report that the skill may not
need to exist.

Scenarios SHALL be drawn from situations the user states have actually happened
or are about to, and SHALL be capped at three: the main path (always), one where
a precondition is absent, and one where the skill should not fire.

The user SHALL be shown what the agent produced — the raw output, not a verdict —
and, specifically, every point where the agent improvised, because each such point
marks something SKILL.md failed to state. Showing the output rather than a verdict
is not a presentation preference: the agent grading these runs is the agent that
wrote the draft, and that bias has no cheap fix short of an eval harness this skill
does not build. Putting the raw output in front of the user is the safeguard.
Findings SHALL be folded into the draft before it is finalized.

#### Scenario: The agent improvises mid-run

- **WHEN** the subagent invents an assumption the draft never stated
- **THEN** that point is reported to the user as a gap, and the draft is amended
  before finalizing

#### Scenario: An imagined edge case

- **WHEN** a proposed scenario is one the user cannot say has happened or is
  about to
- **THEN** it is not run, and the draft is not lengthened to cover it

#### Scenario: An installed skill is the fitter control

- **WHEN** a skill installed at the destination already performs the step the
  draft covers
- **THEN** it is the control for that run, in place of the agent with no skill

#### Scenario: The control does as well as the skill

- **WHEN** the control produces the same quality of result as the run with the
  draft
- **THEN** skill-writing reports that the skill may be unnecessary before it is
  finalized

### Requirement: Effort scales with the cost of being wrong

The depth of interrogation and the number of dry runs SHALL scale with what it
costs when the skill is wrong — established during gathering, not discovered
later. A low-stakes skill (a wrong result is merely rework) SHALL be interrogated
only where an answer changes the output, and SHALL run the main path once,
without a control. A high-stakes skill (a wrong result is legal, financial,
destructive, or reaches people outside the team) SHALL be interrogated on every
subject, and SHALL run all three scenarios plus the control.

A process heavier than the skill deserves is a process people route around, and a
skill-writing that is routed around governs nothing.

#### Scenario: A small personal skill

- **WHEN** the skill's worst outcome is that the user redoes the work by hand
- **THEN** interrogation stays minimal and one main-path run finishes it

#### Scenario: A skill whose error carries legal exposure

- **WHEN** a wrong result exposes the user to legal or financial consequence
- **THEN** every interrogation subject is covered and all three scenarios plus the
  control are run

### Requirement: Definition of done

A skill SHALL be treated as finished only when all three hold: it satisfies the
conventions; its main-path dry run produced no improvisation at any point that
would change the output — an improvisation on something immaterial does not
block; and the user has seen the actual run output and accepted it.

Amending the draft and re-running SHALL be capped at two further runs on the same
gap. The cap does not license shipping the gap: a gap that survives two amendments
is a gap that adding sentences will not close, and skill-writing SHALL switch
tactics rather than continue. It SHALL put three exits to the user, and SHALL NOT
finish by leaving the gap unaddressed:

1. **Narrow the skill** — drop the branch the agent keeps improvising on, or split
   it into its own skill. Narrowing restarts the cap, because the result is a
   smaller skill rather than a third attempt at the same one.
2. **Turn the gap into an explicit handoff** — state in the skill that on reaching
   this situation the agent stops and asks. An unhandled hole becomes a handled
   one: the agent no longer guesses, it asks.
3. **Abandon the skill** — the evidence now says what the carrier gate suspected.

A limitation the user accepts SHALL be written into the skill itself, not left in
the conversation, so that the agent meeting that situation later knows to stop
rather than improvise.

#### Scenario: Material gap survives the cap

- **WHEN** the draft has been amended and re-run twice and the agent still
  improvises on something that changes the output
- **THEN** skill-writing stops amending, names the surviving gap, and puts the
  three exits to the user

#### Scenario: An accepted limitation

- **WHEN** the user accepts a limitation rather than narrowing the skill
- **THEN** the skill states that limitation, and instructs the agent to stop and
  ask when it is reached

#### Scenario: Immaterial improvisation

- **WHEN** the agent improvises on something that does not change the output
- **THEN** it is reported but does not block completion

### Requirement: Close-out

On finalizing, skill-writing SHALL tell the user where the skill was written, how
it will be invoked (by the agent, or by hand and under what name), and whether it
should be committed for the rest of the team.

#### Scenario: A project skill lands

- **WHEN** a skill is authored into a host project's skill directory
- **THEN** the user is told its path, its invocation mode, and that committing it
  shares it with the team

### Requirement: How a question is asked

skill-writing SHALL follow, and SHALL teach any skill it authors whose job includes
drawing something out of a human, these rules for asking. They hold in both modes,
because they are facts about attention in a serial conversation:

- **One question at a time.** A batch of questions is bewildering, and it destroys
  the ordering: an early answer reshapes which questions still matter.
- **Every question carries a recommended answer, with its reason.** Producing an
  answer is expensive; reacting to one is cheap. The recommendation is a reaction
  surface, and it exposes the agent's model of the problem so the user can correct it.
  A neutral label offers nothing to push against; an argued position can be refuted,
  and the refusal is where the truth arrives. This matters more when the user has not
  thought the thing through, not less — they cannot author an answer, but they can
  always react to one.
- **A question states what it decides** — what changes depending on the answer, not
  only what the options are.
- **Facts are looked up, never asked.** A question the agent could answer for itself
  spends the user's attention on nothing. Only decisions — where the user is the sole
  possible source — earn a question.
- **Stop when nothing further would change the result**, and never by hitting a
  count. A long interview on an under-specified idea is the interview working; a long
  interview of low-value questions is a defect in the questions, and a cap would hide
  the difference.

Whatever skill-writing models, the skills it authors reproduce. The rules therefore
govern its own interrogation as well as the skills it writes.

#### Scenario: A fork exists

- **WHEN** one open question's answer would settle several others
- **THEN** it is asked first, and it states what it settles

#### Scenario: An authored skill interviews a user

- **WHEN** the skill being authored elicits ideas, requirements, or decisions from a
  human
- **THEN** its interview step carries these rules, so it does not ask in menus

#### Scenario: The answer is discoverable

- **WHEN** the agent could establish something by reading the project itself
- **THEN** it reads, and does not spend a question on it

### Requirement: Step-level comparison against installed skills

Once the draft's steps are known, skill-writing SHALL compare each step against
the skills installed at the destination, and SHALL surface a step that an
installed skill already performs better. Overlap at the level of a whole job is
what the duplicate check catches; overlap at the level of a single step is not,
and it is the common case — an installed skill may do one step of the drafted
skill far better while doing nothing else it does.

The drafted step SHALL then at least meet that skill's bar. skill-writing SHALL
NOT make the authored skill depend on it: an installed skill cannot be assumed
present wherever the authored skill later runs.

#### Scenario: An installed skill does one step better

- **WHEN** a skill installed at the destination already performs one of the
  drafted skill's steps better than the draft does
- **THEN** it is named to the user, it becomes the control for that step, and the
  draft is held to its standard rather than calling out to it

### Requirement: The dry run matches the skill's shape

skill-writing SHALL choose the dry-run method by the shape of the skill.

- **A skill that transforms an input into an output**, with no human in the loop,
  SHALL be run as written: the draft given to a fresh-context subagent, against a
  control, on up to three real scenarios.
- **A skill whose job is to elicit from a human** SHALL be verified by that human,
  in a fresh session, and SHALL NOT be handed to a subagent. A subagent has nobody
  to ask, so it plays both sides, and an interview with an invented user tests
  nothing.

The fresh session is the point. The authoring session knows the answers — it just
wrote the draft and heard every answer the user gave — so a run there is completed
from memory, and the sentences SKILL.md failed to write are supplied by a context
the real user will never have. A skill is only tested where nothing is remembered.

skill-writing SHALL therefore write the draft to its destination so it can be
invoked, hand the test to the user with what to bring back — a real case to run it
on, and what went wrong: a blunt question, an artifact that smuggled in a technical
solution, a diagram that did not render — and amend from that feedback. Mechanical
checks SHALL run against the artifact that session produced.

#### Scenario: An elicitation skill is verified

- **WHEN** the drafted skill's core is an interview with the user
- **THEN** skill-writing installs the draft at its destination, asks the user to run
  it in a fresh session on a real case, dispatches no subagent, and amends from what
  they bring back

#### Scenario: A transform skill is verified

- **WHEN** the drafted skill takes an input and produces an output with no human in
  the loop
- **THEN** a fresh-context subagent runs it against a control, on real scenarios

### Requirement: The user is never told the rules, only asked the question

skill-writing SHALL NOT recite its own instructions to the user. A request for
material — a real scenario to run, a decision to make — is phrased in the user's
terms, with at most one clause of reason. The internal mechanics (subagents,
controls, the amendment cap) are not the user's concern and stating them turns a
simple request into a puzzle.

#### Scenario: Asking for a dry-run scenario

- **WHEN** skill-writing needs a real scenario to run the draft against
- **THEN** it asks for one in plain terms, without quoting its own rules about
  what qualifies

### Requirement: The control is proposed, not chosen unilaterally

skill-writing SHALL propose the control with its reasoning and let the user settle
it, rather than concluding alone. The agent judging whether an installed skill
beats the draft is the agent that just wrote the draft.

For a skill verified live by a human, the control SHALL be run by that human, at
their discretion, in the same fresh-session manner: an interview cannot be conducted
by a subagent, and whether a second session is worth their time is theirs to judge.
skill-writing SHALL offer it once — naming the candidate and the reason — and SHALL
NOT block, repeat, or dispatch a subagent to simulate it.

When no installed skill overlaps, skill-writing SHALL say how far it looked (how
many installed skills it read), SHALL tell the user they may name a control
themselves, and SHALL proceed without waiting — a blocking question here would tax
every authoring run. A user-named control need not be a skill; it may be whatever
they do today instead. A named skill that is not installed is reported as such, and
skill-writing SHALL NOT recommend installing a third-party skill on its own
initiative.

#### Scenario: No overlap found

- **WHEN** no installed skill performs any of the drafted steps
- **THEN** skill-writing states the scan's scope, notes that the user may name a
  control, and proceeds

#### Scenario: A candidate exists for a live-run skill

- **WHEN** an installed skill would make a fitting control for a skill the user is
  verifying in a fresh session
- **THEN** skill-writing names it once and leaves the run to the user, dispatching
  no subagent

### Requirement: Descriptions are read, bodies are not

skill-writing SHALL read only the frontmatter description of another skill — never
its body — when checking for a duplicate, comparing steps, or choosing a control.
A body read into the authoring context poisons three things at once: the draft
starts echoing that skill's wording, which is the vendoring this package forbids;
the control is no longer a control, because the draft has already absorbed what it
was meant to be measured against; and the context grows for nothing.

The control runs as a subagent that loads the installed skill itself, so the
authoring session never sees its text. What comes back is its output. The draft is
held to the standard of that behavior, not of that wording — learning from what a
skill does is not vendoring; copying what it says is.

#### Scenario: A control skill is chosen

- **WHEN** an installed skill becomes the control
- **THEN** its SKILL.md is never read into the authoring session; the subagent
  loads it, and only its output returns

### Requirement: The run's prompt carries no answers

The prompt given to a dry run SHALL be the user's own words for the scenario,
verbatim, and the prompt given to the control SHALL be identical to the one given
to the skilled run — the presence of the draft is the only difference between
them. The prompt SHALL NOT state the draft's requirements or success criteria:
those exist to judge the output, and putting them in the prompt hands them to the
control, which then passes a test it should have failed. skill-writing SHALL show
the user the exact prompt before it is sent.

#### Scenario: Success criteria leak into the prompt

- **WHEN** the draft requires an output the control would not produce on its own
- **THEN** that requirement stays out of both prompts, so the control's failure to
  produce it is the finding

#### Scenario: The user sees the prompt

- **WHEN** a dry run is about to be dispatched
- **THEN** the exact prompt is shown to the user first

### Requirement: Two checkpoints

skill-writing SHALL stop and show its understanding twice, and SHALL wait for the
user each time.

**After interrogation, before naming or drafting**, it restates what it understood
— the job, the steps, the triggers, the artifacts it writes, and the decisions
taken from the answers — and asks what is missing. Interrogation asks one question
at a time, so the user never sees the whole; this is where they do, and it is the
cheapest moment to catch a misunderstanding, because nothing has been written yet.

**After the draft, before the run**, it presents what it wrote and asks for the
go-ahead. A run spends subagent turns, and for an elicitation skill it spends the
user's own time; spending them on a draft the user would have rejected on sight is
waste.

#### Scenario: Understanding is confirmed before drafting

- **WHEN** interrogation has answered everything that would change the output
- **THEN** skill-writing restates the job, steps, triggers, artifacts and decisions,
  asks what is missing, and waits — no name is proposed and no draft is written
  until the user answers

#### Scenario: The draft is confirmed before it is run

- **WHEN** the draft is written
- **THEN** it is presented to the user and the run waits for their go-ahead

### Requirement: A scenario is a use of the skill, not the request for it

A dry-run scenario SHALL be an actual instance of the job the skill does, drawn
from something the user has really encountered. The request that asked for the
skill SHALL NOT be used as the scenario, nor SHALL any material be derived from it:
that request is the specification, and a test built from the specification measures
the draft against the drafter's own understanding, which it cannot fail.

When the user has no real instance to offer, skill-writing SHALL say so plainly
rather than invent one — the triggers were never verified either, and a fabricated
scenario hides that instead of reporting it.

#### Scenario: A skill for shaping ideas

- **WHEN** the skill being authored turns a person's inspiration into a document
- **THEN** it is tested on an inspiration the user has actually had, never on the
  sentence that asked for the skill

#### Scenario: No real instance exists

- **WHEN** the user cannot name a real case to run
- **THEN** skill-writing reports that the draft is unverified rather than inventing
  a case

### Requirement: Elicitation has two modes

A step that elicits from a human SHALL establish which mode it is in, because the
rules invert between them.

- **Adversarial** — an existing claim is pressed until it holds. Questions follow
  the dependency tree depth-first; pressure is contradiction, held side by side and
  put to the user as a choice; progress shrinks the space; the interview ends when
  the plan is agreed.
- **Generative** — something half-formed is drawn out. Questions enumerate the space
  **breadth-first before any branch is resolved**, because depth-first presupposes a
  tree that does not exist yet and commits the user to whichever branch their opening
  sentence happened to name. Pressure is manufactured concreteness: with nothing to
  contradict, the agent offers a specific and possibly wrong proposal so the user has
  something to push against. **Progress may widen the space** — a question that opens
  three branches has advanced the work. The interview ends at saturation, when new
  questions stop yielding new material.

A skill that both expands and then presses SHALL run the generative pass first: an
unmapped space collapses under pressure.

#### Scenario: A skill that shapes a vague idea

- **WHEN** the authored skill's job is to draw out an inspiration the user has not
  thought through
- **THEN** its interview enumerates the space before resolving any branch, offers
  concrete proposals to react against rather than contradictions to defend, and
  treats a question that opens new branches as progress

#### Scenario: A skill that stress-tests a plan

- **WHEN** the authored skill's job is to press an existing claim
- **THEN** its interview follows the dependency tree depth-first and applies pressure
  by holding contradictions side by side

### Requirement: A question that cannot be phrased is parked

A question SHALL be asked only when it can be **stated** precisely — not when it can
be answered precisely. A question that cannot yet be phrased SHALL be held in a
list and revisited when a later answer sharpens it.

An unphrasable question asked early returns a vague answer, and a vague answer gets
treated as settled. The holding list is what lets the agent record that a question
exists before it can articulate it.

#### Scenario: A question is sensed but not yet sharp

- **WHEN** the agent perceives an unresolved area it cannot state as a precise
  question
- **THEN** it is recorded in the holding list rather than asked, and revisited after
  the answers that would sharpen it

### Requirement: The user ratifies the exit

The agent SHALL NOT supply the user's side of a question it asked, and SHALL NOT
declare the interview complete on its own authority — a shared understanding is a
two-party state, and only the user can confirm the second party. It SHALL NOT proceed
to act until they do.

The bar the interview aims at SHALL be checkable: the result is complete when someone
downstream could act on it without asking a single question.

#### Scenario: The agent is tempted to fill in an answer

- **WHEN** the user has not answered and the agent could plausibly guess
- **THEN** it waits; an agent that answers its own question has stopped interviewing

#### Scenario: The interview is judged complete

- **WHEN** the agent believes nothing further would change the result
- **THEN** it says so and waits for the user's confirmation before acting

### Requirement: A rule records the failure that bought it

A rule written into a skill SHALL record the failure it exists to prevent, in a clause
where the rule lives. A rule that cannot name one is a rule that was never paid for,
and it is a candidate for removal at the next audit.

This is what makes a later audit survivable. A rule can be cut safely only by someone
who knows why it is there, and the memory of the failure does not persist; the record
of it does. Without it the realistic outcome is not over-cutting but paralysis — no
one dares remove anything, and the skill swells until the cap pushes it into a
reference, where it swells unseen.

A rule needing a paragraph of justification is a rule worth questioning.

#### Scenario: A rule is authored

- **WHEN** a rule goes into a skill
- **THEN** it carries the failure it prevents, in a clause

#### Scenario: A rule with nothing behind it

- **WHEN** a proposed rule names no failure, and none can be produced
- **THEN** it is not written — the model would likely have done it anyway

### Requirement: Runtime text names no third-party skill

A skill's runtime text — its body and its references — SHALL NOT name a skill this
package does not maintain. Examples SHALL use a placeholder, and a concrete name SHALL
come only from what the agent found by reading the skills actually installed.

A hard-coded name biases a choice that should follow the evidence, rots without
warning when that skill is renamed or abandoned, and reads as noise to every user who
does not have it. Naming a sibling within this package remains governed by the
toolchain-awareness rule, with its fallback when the sibling is absent; documentation
read by people is unaffected.

#### Scenario: An example of offering a control

- **WHEN** a reference illustrates how to offer the user a control
- **THEN** it uses a placeholder rather than the name of a skill outside this package

#### Scenario: A control is discovered

- **WHEN** the agent reads the descriptions of the installed skills and one fits
- **THEN** it names that skill to the user — a discovered name is evidence, not a
  shipped recommendation

### Requirement: The premise is pressed before the procedure

skill-writing SHALL press the nouns of the user's opening request before it
interrogates the procedure they describe. The artifact, its format, its language, and
the name of the process are proposals — the vocabulary the user arrived with — and a
question asked inside a premise can never reach the premise.

Each such noun SHALL be given one concrete alternative to push against, with a reason,
and SHALL be pressed once. A user who keeps their premise keeps it and the flow
continues: what matters is that they chose it rather than inheriting it from their own
first sentence.

The agent SHALL NOT do to the request what it is forbidden to do to an answer — accept
it as given.

#### Scenario: The request names an artifact

- **WHEN** the opening request names an output ("a PRD", "a mindmap")
- **THEN** each is offered a concrete alternative to react against before the procedure
  is interrogated, and the choice is the user's

#### Scenario: The user keeps the premise

- **WHEN** the user hears the alternative and keeps what they said
- **THEN** it is not raised again, and the flow moves on

### Requirement: Divergent or convergent is settled early

skill-writing SHALL establish whether the skill being authored opens a space, closes
one, or does both, as part of pressing the premise. A skill may do both — several
legitimately must — but only as two named phases in order, generative first, with a
boundary between them.

An opening request that silently wants both carries a contradiction: roaming freely and
producing a buildable specification are not the same skill, and the contradiction
surfaces later as a rewrite. An unmapped space collapses under pressure.

#### Scenario: The request wants both without noticing

- **WHEN** the opening request asks for free exploration and for an output that could be
  built from
- **THEN** skill-writing names the tension and settles it before drafting — one, or both
  as ordered phases

### Requirement: A premise that falls voids what was built on it

When the user overturns a premise, skill-writing SHALL return to the understanding
checkpoint rather than edit the draft to fit. It SHALL name which decisions no longer
stand, which survive, and renegotiate them.

Decisions made downstream of a premise were made because of it. Quietly reshaping the
draft around the new premise keeps the dead decisions alive and hides them.

#### Scenario: A premise is overturned mid-flow

- **WHEN** the user rejects a premise the draft was built on
- **THEN** skill-writing stops, returns to the checkpoint, states what is void and what
  survives, and does not touch the draft until they are renegotiated
