# skill-writing (delta)

## ADDED Requirements

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

## MODIFIED Requirements

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
