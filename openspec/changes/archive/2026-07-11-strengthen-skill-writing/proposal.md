# Proposal: strengthen-skill-writing

## Why

skill-writing authors skills, but it never asks the two questions that decide
whether the skill helps or hurts: **is a skill even the right carrier**, and
**must the agent be able to reach it on its own**. The carrier filter lives in
the shared routing table, so it runs only when codify or retro hand off — a
user invoking skill-writing directly bypasses it and always gets a skill.
Invocation mode is never considered at all, so every authored skill defaults to
model-invoked and its description occupies the agent's context every turn, on a
budget shared with every other skill.

Its craft layer is also thinner than the platform's own published rules: the
conventions file covers name, description shape, body length and English, but
not the frontmatter key whitelist, the name character rules, reference depth,
script robustness, or the phrasing findings that decide whether instructions
actually bind.

## What Changes

- **Carrier gate on direct invocation.** Before drafting, skill-writing checks
  whether a config, lint rule, or single project rule carries the need better
  than a skill, and says so instead of drafting. A handoff arriving from the
  shared routing skips the gate — the routing table already filtered it.
- **Invocation mode becomes a deliberate decision.** Authoring establishes
  whether the agent (or another skill) must reach the skill on its own. When it
  only ever fires by hand, the skill ships `disable-model-invocation: true` and
  pays no standing context cost.
- **An edit path for existing skills.** Authoring today covers new skills only,
  while skill-auditing routes approved fixes here and retro proposes skill
  updates. Editing gets its own branch: same conventions, no registry check, the
  dry run re-run on the scenario the edit was meant to fix.
- **Requirements are interrogated, not transcribed.** A described procedure is
  probed where the answer changes the output: completion criteria, absent
  preconditions, block-or-warn on failure, when the skill should not fire, the
  shape of the output, what it costs when the skill is confidently wrong, and the
  tools it depends on — plus the tacit step the user does from experience and
  never writes down.
- **The draft is run before it is finalized.** skill-writing spawns a
  fresh-context subagent on up to three real scenarios and shows the user what
  came out — pointing at every place the agent had to improvise, because each one
  marks a sentence SKILL.md failed to say. This needs a subagent, not a sibling
  skill, so authoring no longer depends on skill-testing being installed.
- **The acceptance scaffold leaves.** **BREAKING** for anyone relying on
  skill-writing to author a test plan: skill-testing owns repeatable acceptance
  and regression checks outright, and skill-writing mentions it once at
  close-out.
- **A skill is written in its destination's language.** English-only is this
  package's own publication rule, not a rule of authoring; a project's skill is
  written in the language that project already writes, asked once when the
  evidence is unclear.
- **Close-out.** The user is told where the skill landed, how it fires, and
  whether to commit it.
- **The conventions file grows a craft layer**, sourced from the platform's
  published authoring rules and restated here with citations: the six legal
  frontmatter keys, the name character rules, third-person descriptions written
  wide against under-triggering, one-level reference depth with an explicit
  "read this when ..." pointer, scripts that resolve their own errors, no
  time-sensitive content, one default approach over a menu, consistent
  terminology.
- **"Collection" gives way to the ecosystem's word.** A distributable set of
  skills is a **package** — what the CLI installs (`npx skills add <package>`).
  And the registry collision check hangs on the fact rather than the category: it
  runs when a skill will be **published publicly**, so a private package, a
  project, and a personal setup all skip a lookup that cannot apply to them.
- **Positive phrasing over prohibition** becomes a stated convention: an
  instruction says what to do; a prohibition is reserved for a guardrail that
  cannot be phrased positively, and carries the positive alternative with it.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `skill-writing`: adds the carrier gate, the invocation-mode decision, the
  edit path, the interrogation step, the dry run, the duplicate check, the
  destination-language rule and close-out; expands the conventions the authored
  skill must satisfy; drops the acceptance scaffold; retires the word
  "collection" and hangs the registry check on public publication.
- `skill-auditing`, `harness-sync`, `harness-conventions`: wording only — each
  carries one incidental use of "collection" that means this repo or this
  package.

## Non-goals

- **No eval harness.** Measuring whether a skill improves agent behavior — the
  with-skill/without-skill benchmark — stays out. Only the cheap first step (ask
  what failure was observed) lands here.
- **No third-party skill content.** Craft rules trace to the platform's own
  published documentation and are restated in our words; no text is taken from
  another skills package.
- **No health, retirement, or routing work.** checkup, folding skill-auditing
  into it, moving the conventions file to `shared/`, and the routing table's
  skill demote/retire routes all belong to the companion change. skill-auditing
  is touched here for one word only.

## Impact

- `skills/skill-writing/SKILL.md` — new gate, invocation-mode and edit branches.
- `skills/skill-writing/references/conventions.md` — craft layer with sources.
- `tests/skill-writing/README.md` — acceptance checks for the new behavior.
- `scripts/lint-skills.mjs` — frontmatter key whitelist, name rules, a body token
  budget alongside the line cap, and reference depth/table-of-contents checks.
- `openspec/specs/` — skill-writing's requirements, plus a one-word fix in
  skill-auditing, harness-sync and harness-conventions.
- Skills authored from now on may ship `disable-model-invocation: true`; this
  package's existing skills are not retrofitted here.
