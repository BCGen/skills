# skill-writing (delta)

## ADDED Requirements

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

## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Carrier gate before drafting

**Reason**: Absorbed by the problem decomposition, of which it is an impoverished special case.
The gate prompts from a hard-coded list of three carriers (config, lint rule, project rule) and
therefore cannot reach a carrier that is not on the list — in the motivating example, a meeting
agenda template. A derivation from the problem produces the carrier list rather than selecting
from one. It was also the only step in the skill with no completion criterion, in a skill whose
own conventions demand one.

**Migration**: The routing-handoff exemption is preserved — a procedure delegated by codify or
retro arrives with its carrier already decided, and the decomposition begins from the problem
those skills recorded. The floor the gate provided survives as *Each candidate names the layer
of the decomposition it attacks*, which a straw-man carrier cannot satisfy.

### Requirement: The premise is pressed before the procedure

**Reason**: Absorbed by the problem decomposition, and structurally unable to do the job it was
written for. It offers one alternative per noun of the opening request, but every alternative it
can offer sits inside the solution space that noun already assumes — "a PRD, or a one-pager?"
never reaches the fact that the input never contained the answer. The skill's own rule condemns
it: a question asked inside a premise cannot reach the premise, and pressing the premise is
itself asked inside one.

**Migration**: The decomposition reaches the premise by leaving the solution space and returning
to the problem. What premise-pressing achieved — that the user chose their vocabulary rather
than inheriting it from their first sentence — is achieved by the candidate list, in which their
original request appears as one candidate and may win on its merits.

### Requirement: Step-level comparison against installed skills

**Reason**: Merged into *The draft is run before it is finalized*. Comparing each drafted step
against the installed skills is how the control is chosen; stating it twice made it read as a
separate pass, and left undefined what it means when the duplicate candidate and the control are
the same skill.

**Migration**: The control requirement carries it, and *A duplicate candidate may also be the
control* settles the collision the two passes created.

### Requirement: Divergent or convergent is settled early

**Reason**: Merged into *Elicitation has two modes*, which already carries the generative and
adversarial distinction. Two requirements stating the same distinction invited them to drift
apart.

**Migration**: The merged requirement settles both: which mode a step is in, and whether the
authored skill opens a space, closes one, or does both as ordered phases with the generative
pass first.

### Requirement: A question that cannot be phrased is parked

**Reason**: Merged into *How a question is asked*, where it is one clause among the mechanics of
asking. It was never a separate discipline.

**Migration**: The clause survives verbatim inside *How a question is asked*.

### Requirement: Two checkpoints

**Reason**: Renamed and restated by the flow itself. The skill now has two adjudication points —
evidence and proof — and they are the checkpoints; stating them again as a separate requirement
duplicated the flow.

**Migration**: The first checkpoint is *The user ratifies the exit* (the decomposition's root and
the restated understanding); the second is *The draft is run before it is finalized* (the raw
output of the run and its control, accepted by the user). Drafting sits between them and is not
a checkpoint: its exit is lint, not a conversation.
