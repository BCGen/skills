# skill-writing Specification

## Purpose

Authoring and editing skills that survive contact with reality — for a
skills package, a project, or the user's personal setup.

## Requirements

### Requirement: Convention-complete authoring

A skill authored through skill-writing SHALL satisfy the authoring standard, which splits by
what settles it:

- **Absolute rules, stated as bare assertions with no reason attached** — frontmatter carries
  only keys the Agent Skills specification allows; `name` equals the directory name, within 64
  characters of lowercase letters, digits and single interior hyphens, avoiding the platform's
  reserved words; `description` is ≤ 1024 characters, third person, free of angle brackets,
  and shaped as a capability sentence plus a "Use when ..." sentence; the body is within its
  line and token caps; references sit one level below SKILL.md and carry a table of contents
  past 100 lines. **A reason SHALL NOT be written for any of these**: there is no situation in
  which the agent weighs whether to comply, so a reason spends context and teaches nothing.
- **Judgment, which keeps its reason** — the invocation-mode trade-off; the destination's
  language; the high-stakes degradations; the boundary between a script and a judgment;
  originality (no vendoring); no third-party skill named in runtime text. These SHALL live in
  one references file that other skills (e.g. skill-auditing) read as the same source of
  truth, and each rule adopted from the platform's published guidance SHALL record its source.

The description's triggers SHALL cover the words a user actually says, because an agent
under-triggers a narrow description.

#### Scenario: An absolute rule is written

- **WHEN** a convention admits no judgment (e.g. `description` must be third person)
- **THEN** it is stated as an assertion and carries no justification

#### Scenario: Illegal frontmatter key

- **WHEN** a draft carries a frontmatter key outside the allowed set
- **THEN** it is removed or relocated before the draft is presented

### Requirement: Naming discipline

The name is the user's decision — they are the one who will type it. skill-writing SHALL
propose candidates with their reasons, or take a name the user offers. A lookup reports that a
name is free; it does not report that it is right.

Naming follows the draft, because a name needs a shape. It is settled in a clause, not a step:
a wrong name is cheap to fix and does not earn its own stopping point. **Where the name already
exists as a fact** — the skill is already referenced by a backlog entry, a routing table, or a
sibling — that is reported, and the question becomes whether to rename, not what to name.

The checks are: the skills installed at the destination, and — **only for a skill that will be
published publicly** — the registry, where an exact collision is reported with its install
count.

The artifact a skill writes has its own name, which is the user's and follows their project's
conventions. It is settled with the output-shape question, never in the same turn as the
skill's own name.

#### Scenario: The name is chosen

- **WHEN** the draft has a shape and needs a name
- **THEN** skill-writing proposes candidates with reasons, the user settles it, and only then do
  the installed-skill and registry checks run

#### Scenario: The name already exists as a fact

- **WHEN** the skill's name is already referenced elsewhere in the project
- **THEN** that is reported, and the decision put to the user is whether to rename it

#### Scenario: Unpublished skill

- **WHEN** authoring a skill that will not be published publicly
- **THEN** no registry lookup runs; only clashes with skills already installed at the
  destination are avoided

### Requirement: Gather, draft, review flow

skill-writing SHALL establish, before drafting: **the failure an agent made without the
skill**, and **the words the user would actually say** when they want it. Trigger conditions
SHALL come from the observed failure; when no failure has been seen, skill-writing SHALL
record the skill as unverified by evidence and proceed rather than inventing triggers — the
control run then decides whether it should exist.

These two are the only inputs the model cannot obtain for itself: a behavior delta needs a
run, a trigger frequency needs the user's own vocabulary, and a direction needs an observed
failure or the user's acceptance. Everything the model can establish by reading, it reads.

The draft SHALL be presented for review before it is run.

#### Scenario: Requirements before draft

- **WHEN** the user asks for a new skill with an unstated trigger context
- **THEN** skill-writing establishes the failure and the triggering words before drafting

#### Scenario: No observed failure

- **WHEN** the user cannot name a failure the agent made without the skill
- **THEN** skill-writing records the skill as unverified by evidence, proceeds, and the control
  run becomes the decisive check

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

skill-writing SHALL support editing an existing skill, not only authoring a new one. An edit
SHALL satisfy the same conventions, SHALL skip the naming and registry checks, and SHALL be
run against **the pre-edit skill** on the scenario the edit was written to fix.

**An edit that produces no behavior change on that scenario is a no-op and SHALL NOT land.**
Comparing an edited skill against a naked agent is a test the skill already passed at birth
and no edit can fail; it is how an instruction surface doubles while every step remains legal.

#### Scenario: Audit fix routed for execution

- **WHEN** skill-auditing routes an approved fix, or retro proposes an update to a skill whose
  gap caused a mistake
- **THEN** skill-writing edits that skill in place and runs the failing scenario against the
  pre-edit version, without a naming or registry step

#### Scenario: An edit that teaches nothing

- **WHEN** the edited skill and the pre-edit skill behave identically on the scenario the edit
  was written for
- **THEN** the edit is reported as a no-op and is not landed

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

skill-writing SHALL run the draft in a fresh context on a real scenario, **against a control,
always**, and present the raw output of both to the user.

**The control depends on the path:**

- **A new skill** — the control is the strongest alternative the user actually has: an
  installed skill that already performs a step of the draft, where one exists; the agent with
  no skill at all otherwise. **A control that does as well means the skill may not need to
  exist, and skill-writing SHALL say so before finalizing.**
- **An edit** — the control is **the skill as it stood before the edit**, run on **the scenario
  the edit was written to fix**. The question an edit must answer is not whether the skill
  beats nothing — that was settled at birth, and it is a test no edit can fail — but whether
  **this edit teaches anything**. **An edit that does not change behavior on its own scenario
  is a no-op and SHALL NOT land.**

The control run is unconditional. It is the only thing that measures the behavior delta, and
scaling it away on a low-stakes judgment is equivalent to deleting it. It costs one subagent.

The run SHALL NOT depend on any sibling skill being installed: skill-writing authors into
three destinations and must carry the method regardless.

**What the control already does right is padding.** Every step of the draft that the control
performed correctly without being told SHALL be cut — the control's output is a free
per-step no-op signal, and no extra run is needed to read it.

Scenarios SHALL be drawn from situations the user states have actually happened or are about
to, and SHALL be capped at three: the main path (always), one where a precondition is absent,
and one where the skill should not fire.

The user SHALL be shown the raw output, not a verdict, and every point where the agent
improvised — each such point marks something SKILL.md failed to state. This is not a
presentation preference: the agent grading these runs is the agent that wrote the draft.
Findings SHALL be folded into the draft before it is finalized.

#### Scenario: An edit changes nothing

- **WHEN** the pre-edit skill, run on the scenario the edit was written to fix, produces the
  same behavior as the edited skill
- **THEN** the edit is a no-op and does not land

#### Scenario: The agent improvises mid-run

- **WHEN** the subagent invents an assumption the draft never stated
- **THEN** that point is reported to the user as a gap, and the draft is amended before
  finalizing

#### Scenario: The control already does a drafted step

- **WHEN** the control performs one of the draft's steps correctly without being told
- **THEN** that step is padding and is cut from the draft

#### Scenario: An imagined edge case

- **WHEN** a proposed scenario is one the user cannot say has happened or is about to
- **THEN** it is not run, and the draft is not lengthened to cover it

#### Scenario: The control does as well as the skill

- **WHEN** the control produces the same quality of result as the run with the draft
- **THEN** skill-writing reports that the skill may be unnecessary before it is finalized

### Requirement: Effort scales with the cost of being wrong

Effort SHALL scale with what it costs when the skill is wrong — the depth of the
decomposition, the depth of the interrogation, and the number of scenarios.

**The cost SHALL be derived from observable facts, not judged by anyone.** It is the
destination combined with the blast radius:

| Fact | Cost |
| --- | --- |
| destination is a personal setup | low — one person, one line to fix |
| destination is a project | medium — a team, and git remembers |
| destination is a public package | high — strangers, and it cannot be recalled |
| the skill writes files, deletes files, or calls an external service | one level up |

The destination is already established; the blast radius is read from the draft's
`allowed-tools` and its scripts. An agent asked to rate the stakes of its own workload has an
incentive to rate them low, and a user asked the same question has an incentive to rate them
low so the work goes faster. **Nobody judges, so nobody cheats.**

A low-stakes skill is decomposed in one question, interrogated only where an answer changes
the output, and run on the main path. A high-stakes skill is decomposed fully, interrogated on
every subject, and run on all three scenarios. **The control runs in both cases.**

A process heavier than the skill deserves is a process people route around.

#### Scenario: A personal skill with no destructive tools

- **WHEN** the destination is the user's own skills directory and the draft writes no files
- **THEN** the cost is low, the decomposition and interrogation stay minimal, and one main-path
  run plus its control finishes it

#### Scenario: A public skill that deletes files

- **WHEN** the destination is a public package and the draft deletes files
- **THEN** the cost is high, every subject is covered, and all three scenarios plus the control
  are run

#### Scenario: The agent would rather call it cheap

- **WHEN** the agent has not established the destination or the blast radius
- **THEN** it reads them rather than assuming the stakes are low

### Requirement: Definition of done

A skill SHALL be treated as finished only when all three hold: the conventions are satisfied;
the main-path run produced no improvisation that would change the output — an improvisation on
something immaterial does not block; and **the user has seen the raw output of both the run
and its control, and accepted it.**

A control that does as well is not a pass. It is the finding, and it SHALL be reported before
the skill is finalized.

Amending the draft and re-running SHALL be capped at two further runs on the same gap. A gap
that survives two amendments is a gap that adding sentences will not close. skill-writing SHALL
put three exits to the user and SHALL NOT finish by leaving the gap unaddressed:

1. **Narrow the skill** — drop the branch the agent keeps improvising on, or split it out.
   Narrowing restarts the cap.
2. **Turn the gap into an explicit handoff** — the skill states that on reaching this situation
   the agent stops and asks.
3. **Abandon the skill** — the evidence now says what the decomposition suspected.

A limitation the user accepts SHALL be written into the skill itself, not left in the
conversation.

#### Scenario: Material gap survives the cap

- **WHEN** the draft has been amended and re-run twice and the agent still improvises on
  something that changes the output
- **THEN** skill-writing stops amending, names the surviving gap, and puts the three exits to
  the user

#### Scenario: An accepted limitation

- **WHEN** the user accepts a limitation rather than narrowing the skill
- **THEN** the skill states that limitation, and instructs the agent to stop and ask when it is
  reached

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

skill-writing SHALL follow, and SHALL teach any skill it authors whose job includes drawing
something out of a human, these rules for asking. They hold in both interview modes, because
they are facts about attention in a serial conversation:

- **One question at a time.** A batch destroys the ordering: an early answer reshapes which
  questions still matter.
- **Every question carries a recommended answer, with its reason.** Producing an answer is
  expensive; reacting to one is cheap. The recommendation exposes the agent's model of the
  problem so the user can correct it — and this matters more, not less, when the user has not
  thought the thing through.
- **A question states what it decides.**
- **Facts are looked up, never asked.**
- **A question that cannot be phrased precisely is parked** in a holding list and revisited
  when a later answer sharpens it. An unphrasable question asked early returns a vague answer,
  and a vague answer gets treated as settled.
- **Stop when nothing further would change the result**, never by hitting a count.

Whatever skill-writing models, the skills it authors reproduce.

#### Scenario: A fork exists

- **WHEN** one open question's answer would settle several others
- **THEN** it is asked first, and it states what it settles

#### Scenario: An authored skill interviews a user

- **WHEN** the skill being authored elicits ideas, requirements, or decisions from a human
- **THEN** its interview step carries these rules, so it does not ask in menus

#### Scenario: The answer is discoverable

- **WHEN** the agent could establish something by reading the project itself
- **THEN** it reads, and does not spend a question on it

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

A step that elicits from a human SHALL establish which mode it is in, because the rules invert
between them.

- **Adversarial** — an existing claim is pressed until it holds. Questions follow the dependency
  tree depth-first; pressure is contradiction, held side by side and put to the user as a
  choice; progress shrinks the space.
- **Generative** — something half-formed is drawn out. Questions enumerate the space
  **breadth-first before any branch is resolved**, because depth-first presupposes a tree that
  does not exist yet. Pressure is manufactured concreteness: a specific and possibly wrong
  proposal, offered so the user has something to push against. **Progress may widen the space.**

skill-writing SHALL also settle, for the skill being authored, whether it opens a space, closes
one, or does both — and both is allowed only as two named phases in order, **generative first**.
An unmapped space collapses under pressure, and a request that silently wants both carries a
contradiction that surfaces later as a rewrite.

#### Scenario: A skill that shapes a vague idea

- **WHEN** the authored skill's job is to draw out an inspiration the user has not thought
  through
- **THEN** its interview enumerates the space before resolving any branch, and treats a question
  that opens new branches as progress

#### Scenario: The request wants both without noticing

- **WHEN** the opening request asks for free exploration and for an output that could be built
  from
- **THEN** skill-writing names the tension and settles it before drafting

### Requirement: The user ratifies the exit

The agent SHALL NOT supply the user's side of a question it asked, and SHALL NOT declare a
shared understanding complete on its own authority. It SHALL NOT act until they confirm.

Where the exit is the root of a decomposition, ratification is the **second symptom the user
supplies**, not their assent — assent can be nodded through, and a model that has invented a
root will be nodded past. Where no second symptom exists, the actionability criterion settles
it instead.

The bar the interview aims at SHALL be checkable: the result is complete when someone
downstream could act on it without asking a single question.

#### Scenario: The agent is tempted to fill in an answer

- **WHEN** the user has not answered and the agent could plausibly guess
- **THEN** it waits; an agent that answers its own question has stopped interviewing

#### Scenario: The interview is judged complete

- **WHEN** the agent believes nothing further would change the result
- **THEN** it says so and waits for the user's confirmation before acting

### Requirement: A rule records the failure that bought it

A rule written into a skill SHALL be payable: whoever writes it MUST be able to name the
failure it prevents. A rule that can name none SHALL NOT be written — the model would likely
have done it anyway.

**The record of that failure belongs in the change history, not in the skill's runtime text.**
The runtime text carries the rule; a reader who needs to know why it exists reads the change
that introduced it. Rationale in the skill is loaded on every run, teaches nothing, and blunts
the rules that do teach.

**An absolute rule carries no reason at all**: where no judgment is being made, a reason is
pure cost.

#### Scenario: A rule is authored

- **WHEN** a rule goes into a skill
- **THEN** the failure it prevents is stated in the change that introduces it, and the skill
  carries the rule alone

#### Scenario: A rule with nothing behind it

- **WHEN** a proposed rule names no failure, and none can be produced
- **THEN** it is not written

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

### Requirement: The problem is decomposed before candidates are drawn

skill-writing SHALL establish the problem the user is trying to solve — not the solution they
asked for — and derive candidate solutions from it. The opening request names a solution; the
skill it names is one candidate among the several the problem admits, and it may win.

The depth of the decomposition SHALL scale with the cost of being wrong.

#### Scenario: The requested solution is not the derived one

- **WHEN** the user asks for a skill that converts meeting notes into a PRD, and the
  decomposition finds that the acceptance criteria the engineers keep asking for were never
  produced at the meeting
- **THEN** the candidate list carries the derived solutions, the requested converter is among
  them, and the reason it fails is stated

#### Scenario: The problem is exactly the one stated

- **WHEN** the decomposition confirms the user's problem is the one their request already
  names
- **THEN** the requested solution stands, the flow proceeds, and no alternative is
  manufactured to demonstrate that a derivation occurred

### Requirement: Information conservation strikes a hallucination machine

Each candidate SHALL declare, for every field of its output, where that information comes
from, drawn from a closed set: **the input, a person, a file, or a tool**. "Inferred",
"common sense", and the model's own knowledge SHALL NOT be accepted as a source. A skill can
move, filter, structure, or fetch information; it cannot create it.

A candidate whose output requires information its input does not contain, and which it never
fetches, SHALL be struck: it can only produce that information by inventing it, and it will
invent it convincingly.

This check exists because supplying the missing difference is the model's default behavior,
not its lapse — the failure is silent, and the user signs off on it.

#### Scenario: The input cannot carry the output

- **WHEN** a candidate transforms meeting notes into a document whose fields include
  acceptance criteria, and the notes contain none
- **THEN** the candidate is struck unless it fetches them from a person, a file, or a tool

#### Scenario: An illegal source

- **WHEN** a candidate declares that a field will be "inferred from the codebase" rather than
  read from a named file or produced by a named tool
- **THEN** the source is rejected as illegal and the candidate is struck or amended

### Requirement: Each candidate is asked whether the information can be produced upstream

skill-writing SHALL ask, of each candidate, **whether the missing information could be
produced further upstream**, and SHALL carry any such candidate into the list.

Information conservation governs the input-output axis and cannot see the time axis: told
that the information is absent from the input, its only escape is to fetch it at run time,
never to arrange for it to exist earlier.

#### Scenario: The upstream candidate is the better one

- **WHEN** conservation shows a document's fields are absent from its input and could be
  fetched from the user at run time
- **THEN** skill-writing also asks whether they could be produced at their source, and
  surfaces that candidate alongside the run-time one

### Requirement: Each candidate names the layer of the decomposition it attacks

Every candidate SHALL name the layer of the decomposition it attacks. A candidate that can
name none SHALL NOT count — it is a straw man, floated to satisfy a quota rather than grown
from the problem.

A countable floor ("at least one non-skill carrier") is satisfied by exactly the thing it was
meant to prevent: a weak non-skill candidate, raised and struck. A straw man can fake the
*shape* of a carrier; it cannot fake a causal link to the root, because the root is material
the user supplied.

A non-skill carrier then follows as an inference rather than a rule: the deepest layer almost
always lies outside any skill's run time, so the candidate that attacks it is almost always
not a skill. The list is grown, not ticked.

#### Scenario: A candidate that attacks nothing

- **WHEN** a candidate cannot be tied to any layer of the decomposition
- **THEN** it is discarded rather than counted

#### Scenario: The root lies outside a skill's run time

- **WHEN** the deepest layer names something that happens before the skill would ever run
- **THEN** the candidate attacking it is a non-skill carrier, and it is surfaced with the rest

### Requirement: The decomposition stops on a second symptom, or on unactionability

skill-writing SHALL stop the decomposition when **either** criterion is met, and SHALL NOT
require both:

1. **A second symptom, supplied by the user.** A real root explains more than the symptom in
   hand. Ask **where else this root hurts them**; a second symptom they name themselves is
   proof the decomposition reached bottom. The model cannot supply it, which is why it cannot
   be nodded through.
2. **Unactionability.** When a layer lands on something the user has no power to change, stop
   and back up one.

**Finding no second symptom SHALL NOT be treated as grounds to keep digging.** Single-symptom
true roots exist. Used as a continue-trigger, the first criterion would manufacture the
over-decomposition it exists to prevent.

#### Scenario: The root explains more than what was brought

- **WHEN** the user names a second, unmentioned symptom the root also explains
- **THEN** the decomposition stops there and candidates are drawn

#### Scenario: No second symptom, but the layer is still actionable

- **WHEN** the user can name nothing else the root explains, and the layer is something they
  could act on
- **THEN** the decomposition may stop; the absence of a second symptom is not a reason to
  continue

#### Scenario: The layer lands outside the user's power

- **WHEN** a layer names something the user cannot change
- **THEN** the decomposition stops and backs up one layer

### Requirement: The destination's governance may forbid the write

skill-writing SHALL establish whether the destination gates writes — a spec-driven directory,
a review requirement, a protected path — and SHALL NOT write the draft into a destination
whose governance forbids an unproposed file. Where the write is gated, skill-writing SHALL
produce the draft, name the gate, and stop.

The failure this prevents: instructed to "write SKILL.md at the destination", an agent
authoring into a spec-governed group drops an unproposed file into it and reports success.

#### Scenario: A spec-gated destination

- **WHEN** the destination requires a proposal before a skill lands
- **THEN** skill-writing produces the draft, states that the destination is gated and what the
  gate requires, and does not write the file

### Requirement: A duplicate candidate may also be the control

skill-writing SHALL say so when the skill found by the duplicate check and the skill chosen as
the control are the same skill. That coincidence is evidence, not an error: an installed skill
that covers the job is by definition the strongest alternative the user has.

When they coincide, the control run answers the duplicate question directly — if the
installed skill does as well, the draft is the duplicate the check suspected.

#### Scenario: The duplicate candidate wins the control run

- **WHEN** the skill named by the duplicate check, run as the control, produces a result as
  good as the draft's
- **THEN** skill-writing reports that the draft duplicates it and offers to edit that skill
  instead
