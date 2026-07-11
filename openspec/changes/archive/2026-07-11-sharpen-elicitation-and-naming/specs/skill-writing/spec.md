# skill-writing (delta)

## ADDED Requirements

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
- **A skill whose job is to elicit from a human** is run in two parts. The user
  runs it themselves for the opening turns — they are present, which makes this
  the cheapest and the only valid test of the questions — while the control is the
  strongest existing alternative given the same opening. The subagent then tests
  only the part that needs no human: given a fixed transcript, it produces the
  artifact, which is objectively checkable.

#### Scenario: An elicitation skill is dry-run

- **WHEN** the drafted skill's core is an interview with the user
- **THEN** the user runs the opening turns live, and the subagent is used only for
  the artifact the interview feeds

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

## MODIFIED Requirements

### Requirement: Naming discipline

Naming SHALL follow the draft, not precede it: a name is decidable only once the
skill has a shape, and a name proposed earlier lands in the middle of the
interrogation — beside the question about the output artifact — with two naming
threads open at once.

A skill that produces a named artifact has two distinct naming decisions, and they
SHALL NOT share a turn. The artifact's name and location are the user's, governed
by the project's conventions, and are settled with the output-shape question. The
skill's own name answers to the registry and is settled after the draft. Each
question SHALL say which of the two it is deciding.

Proposed names SHALL follow the conventions' naming philosophy (short, apt, gerund
for managed-unit tools). A skill that will be published publicly — in a package
others install — SHALL be collision-checked against the skills.sh registry before
finalizing, with exact collisions surfaced with install counts and alternatives;
the alternatives offered SHALL themselves be checked before they are offered. A
skill that will not be published publicly — a private package, a project, or a
personal setup — SHALL skip the registry entirely rather than run a lookup that
cannot apply to it, and SHALL rely on the duplicate check against skills installed
at its destination.

#### Scenario: Collision found

- **WHEN** the proposed name of a skill bound for public publication has an exact
  match on skills.sh
- **THEN** the collision is reported with install counts, and the alternatives
  offered have themselves been checked for collisions

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
