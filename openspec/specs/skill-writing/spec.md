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

skill-writing SHALL follow, and SHALL teach any skill it authors whose job
includes drawing something out of a human, these rules for asking:

- **Open on the fork.** The first question is the one whose answer collapses the
  most downstream questions, not the most obvious one. A menu of parallel options
  settles nothing.
- **Recommend a claim, with its reason.** A neutral label gives the user nothing
  to push against; an argued position can be refuted, and the refusal is where the
  truth arrives.
- **A question states what it decides.** What changes depending on the answer, not
  only what the options are.
- **A contradiction is named on the spot**, rather than agreed with on both sides.

Whatever skill-writing models, the skills it authors reproduce. The rules
therefore govern its own interrogation as well as the skills it writes.

#### Scenario: A fork exists

- **WHEN** one open question's answer would settle several others
- **THEN** it is asked first, and it states what it settles

#### Scenario: An authored skill interviews a user

- **WHEN** the skill being authored elicits ideas, requirements, or decisions from
  a human
- **THEN** its interview step carries these rules, so it does not ask in menus

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

skill-writing SHALL choose the dry-run method by the shape of the skill. A skill
whose value is the conversation itself cannot be dry-run by a subagent — the
subagent has no user to ask, so it plays both sides, and a conversation with an
invented user tests nothing about the questions.

- **A skill that transforms an input into an output**, with no human in the loop,
  is run as written: a fresh-context subagent, against a control.
- **A skill whose job is to elicit from a human** is run in two parts, in this
  order. First the user runs the opening turns themselves — they are present, which
  makes this the cheapest and the only valid test of the questions — while the
  control is the strongest existing alternative given the same opening. The
  transcript that live run produces is then handed to a subagent, which tests the
  part that needs no human: from that transcript, it produces the artifact, which is
  objectively checkable.

#### Scenario: An elicitation skill is dry-run

- **WHEN** the drafted skill's core is an interview with the user
- **THEN** the user runs the opening turns live first, and the subagent then works
  from the transcript that run produced

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

When no installed skill overlaps, skill-writing SHALL say how far it looked (how
many installed skills it read), SHALL tell the user they may name a control
themselves, and SHALL proceed with the naked agent without waiting — a blocking
question here would tax every authoring run. A user-named control need not be a
skill; it may be whatever they do today instead. A named skill that is not
installed is reported as such, and skill-writing SHALL NOT recommend installing a
third-party skill on its own initiative.

#### Scenario: No overlap found

- **WHEN** no installed skill performs any of the drafted steps
- **THEN** skill-writing states the scan's scope, notes that the user may name a
  control, and proceeds with the naked agent

#### Scenario: A candidate exists

- **WHEN** an installed skill appears to perform one of the drafted steps better
- **THEN** skill-writing names it, says why, recommends it as the control, and the
  user settles the choice

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

### Requirement: The live run produces the fixture

For a skill whose job is to elicit from a human, skill-writing SHALL run the live
half first — the user answering its opening questions — and SHALL use the
transcript that run produces as the input the subagent then works from. No
transcript SHALL be fabricated.

A subagent run on an invented transcript is not a smaller version of the test; it
is a different test, of nothing. Running it before the live half also lets the flow
declare itself verified while the half only the user can perform never happened.

#### Scenario: An elicitation skill is verified

- **WHEN** the drafted skill's core is an interview
- **THEN** the user runs the opening turns first, and the subagent's input is the
  transcript that run produced

#### Scenario: A fabricated transcript

- **WHEN** no live run has happened
- **THEN** no transcript is written for the subagent to consume
