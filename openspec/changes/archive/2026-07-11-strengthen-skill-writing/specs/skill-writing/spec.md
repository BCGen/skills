# skill-writing (delta)

## ADDED Requirements

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
output artifact; and the tools or data sources it depends on, with the behavior
when they are absent. The cost of the skill being confidently wrong is established
earlier, during gathering, because it sets how deep this interrogation goes. It SHALL
also ask what the user skipped or added from experience the last time they did
the task by hand, to surface tacit steps.

Interrogation SHALL ask only where the answer would change the output, one
question at a time, each carrying a recommended answer, and SHALL infer from
context what can be inferred rather than asking.

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
length only to learn they already own the skill was interrogated for nothing.

This check applies at every destination; the skills.sh registry check remains
reserved for a skill that will be published publicly.

#### Scenario: An installed skill already covers the job

- **WHEN** a skill installed at the destination already covers the described job
- **THEN** skill-writing names it and offers to edit it instead of authoring a
  duplicate

### Requirement: The draft is run before it is finalized

After drafting and before final review, skill-writing SHALL run the draft in a
fresh-context subagent on a real scenario and present the result to the user.
The run SHALL NOT depend on skill-testing being installed.

The main path SHALL also be run once WITHOUT the draft, as a control, unless the
skill is low-stakes. A run with the skill proves nothing on its own: the agent may
have done the task correctly anyway, in which case the skill is unnecessary and
its description merely occupies context. What the control gets wrong is what the
skill has to teach; everything else in the draft is padding. When the control
matches the skilled run, skill-writing SHALL report that the skill may not need to
exist.

Scenarios SHALL be drawn from situations the user states have actually happened
or are about to, and SHALL be capped at three: the main path (always), one where
a precondition is absent, and one where the skill should not fire. The user SHALL
be shown what the agent produced and, specifically, every point where the agent
improvised — invented an assumption, hesitated, or asked — because each such
point marks something SKILL.md failed to state. Findings SHALL be folded into the
draft before it is finalized.

#### Scenario: The agent improvises mid-run

- **WHEN** the subagent invents an assumption the draft never stated
- **THEN** that point is reported to the user as a gap, and the draft is amended
  before finalizing

#### Scenario: An imagined edge case

- **WHEN** a proposed scenario is one the user cannot say has happened or is
  about to
- **THEN** it is not run, and the draft is not lengthened to cover it

#### Scenario: The control does as well as the skill

- **WHEN** the run without the draft produces the same quality of result as the
  run with it
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

## MODIFIED Requirements

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

### Requirement: Naming discipline

Proposed names SHALL follow the conventions' naming philosophy (short,
apt, gerund for managed-unit tools). A skill that will be published publicly —
in a package others install — SHALL be collision-checked against the skills.sh
registry before finalizing, with exact collisions surfaced with install counts
and alternatives. A skill that will not be published publicly — a private
package, a project, or a personal setup — SHALL skip the registry entirely
rather than run a lookup that cannot apply to it, and SHALL rely on the
duplicate check against skills installed at its destination.

#### Scenario: Collision found

- **WHEN** the proposed name of a skill bound for public publication has an
  exact match on skills.sh
- **THEN** the collision is reported with install counts and alternative names offered

#### Scenario: Unpublished skill

- **WHEN** authoring a skill that will not be published publicly
- **THEN** no registry lookup runs; only clashes with skills already installed at
  the destination are avoided

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

## REMOVED Requirements

### Requirement: Acceptance scaffold and handoff

**Reason**: The dry run replaces it as skill-writing's correctness check, and
replaces it with something stronger: a real run that exposes where the agent had
to improvise, instead of a set of grep checks imagined before anything ran.
Authoring a test plan that the author will not run — the common case at a project
or personal destination — produced a file that rotted, and it made the most
decisive step in the flow depend on a sibling skill being installed. skill-writing
is now self-contained: it runs its own draft and needs no sibling.

**Migration**: skill-testing remains a standalone skill and keeps sole ownership
of repeatable acceptance and regression checks for any skill, authored here or
not. Invoke it directly when a skill needs a durable test plan; this repo's
own `tests/<name>/README.md` plans are authored and run through it. skill-writing
mentions it once at close-out and does not call it.
