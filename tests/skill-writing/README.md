# Acceptance tests: skill-writing

Have skill-writing author or edit a skill end-to-end in a sandbox; verify the
products mechanically.

## Scenario: author a skill for a public package

Give it a domain, use cases, "instructions only", and a stated high cost of being
wrong. The prompt expressly frames the task as adding a skill to this
package-style repo (preseed a `skills/` directory containing one existing,
unrelated skill for realism — the express task, not the directory, is the
destination signal).

Mechanical checks on the authored `skills/<name>/SKILL.md`:

```sh
grep -c "^name: <name>" SKILL.md                # name == directory (== 1)
grep -c "Use when" SKILL.md                     # trigger sentence present
sed '1,/^---$/d;1,/^---$/d' SKILL.md | wc -l    # body ≤ 100 lines
grep -rlE '[぀-ヿ一-鿿]' skills/<name>/ | wc -l  # no CJK (== 0)
test ! -f tests/<name>/README.md                # NO test plan is authored here
```

- the registry collision check actually ran (the report names the skills.sh result)
- the "Use when" triggers include the given use case
- the report contains no skill-testing invocation

## Scenario: a config is the fitter carrier

Ask directly for a skill that enforces something a linter already expresses (e.g.
"a skill that makes sure every file ends with a newline"), in a sandbox whose
`.editorconfig` already sets it.

```sh
find . -name SKILL.md -newer .editorconfig | wc -l   # nothing drafted (== 0)
```

- the report names the fitter carrier (the existing config) before any draft
- asked once; a user who insists still gets a skill

## Scenario: routing handoff skips the gate

Frame the request as a codify/retro handoff of a drafted multi-step procedure.

- the report contains no carrier question — the routing table already decided
- the skill lands in the host project's skill directory

## Scenario: a skill already covers the job

Preseed the destination with an installed skill whose description covers the
requested job, then request that job.

```sh
ls .claude/skills | wc -l    # unchanged — no second skill written
```

- the report names the existing skill and offers to edit it
- the interrogation never ran (the overlap is found before the questions)

## Scenario: hand-invoked-only skill

State that the skill is always started by the user and no sibling reaches it.

```sh
grep -c "^disable-model-invocation: true" SKILL.md   # == 1
```

## Scenario: the dry run improvises

Author a skill whose draft omits what to do when a precondition is absent, and run
the absent-precondition scenario.

- the report names the point where the subagent invented an assumption
- the draft changed before finalizing, or one of the three exits was put to the
  user (narrow / explicit handoff / abandon)

## Scenario: the control does as well as the skill

Request a skill for a task the base agent already performs correctly.

- the report states the control matched the skilled run, and that the skill may
  not need to exist — before finalizing

## Scenario: illegal frontmatter key

Ask for a skill and require a frontmatter key outside the allowed set.

```sh
node scripts/lint-skills.mjs                  # passes: the key was removed
```

## Scenario: project writes in another language

Preseed a host project whose README, rules, and comments are written in a language
other than English.

- the authored SKILL.md is written in that language; no English is imposed
- no language question is asked (the evidence settled it)

## Scenario: the skill produces a named artifact

Request a skill that writes a file whose name and location must be decided (e.g. a
PRD under `docs/`).

- the artifact's name is settled with the output-shape question, the skill's own
  name after the draft, and no single turn holds both
- each naming question says which of the two it is deciding

## Scenario: an installed skill does one step better

Preseed the destination with a skill that performs one step of the requested job
better than a naive draft would (e.g. an interview skill, for a skill whose first
step is interviewing the user).

- it is named to the user, with a reason, and recommended as the control
- the user settles the choice; the report does not present it as already decided
- its SKILL.md is never read into the authoring session

## Scenario: no overlap found

Request a skill in a destination whose installed skills touch none of its steps.

- the report states how many installed skills were read
- it notes the user may name a control
- it proceeds with the naked agent without blocking on an answer

## Scenario: the prompt carries no answers

Request a skill whose output the base agent would not produce unprompted (a
document where it would write code).

- the dry-run prompt is the user's own words, verbatim
- neither prompt mentions the draft's required output
- the exact prompt is shown to the user before dispatch

## Scenario: a fork exists

Request a skill where one decision constrains several others.

- the first question is that fork, and it states what it settles
- the recommendation carries its reason, not just a label

## Scenario: ambiguous destination

A bare host project — no `.claude/`, no `.agents/`, no `skills/`. The run prompt
carries the standard assume-the-recommended-answer authorization.

- exactly one destination question with a recommended answer
- `SKILL.md` lands in the directory the assumed answer names

Not mechanically verifiable: whether the drafted instructions actually accomplish
the skill's task (human review).
