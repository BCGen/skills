# Proposal: reposition-catalog

## Why

A full-fleet complexity review (2026-07-06: all 7 skills executed by
fresh-context subagents + static audit) found the catalog's real burden is
not per-skill complexity — every run completed cleanly — but the catalog
layer: a newcomer faces a 7-way install choice with no guidance on where
to start, and two skills state a positioning that contradicts the design:

- **skill-writing** frames itself as collection-maintainer-only ("add a
  new skill to the collection") while the shared routing in codify and
  retro hands multi-step procedures to it as a *project-local* skill —
  the trigger surface hides the end-user role its siblings depend on.
- **ai-init** reads as a mandatory first step ("Run after ai-init" in
  codify; "ai-init once →" leading the README flow), yet the loop
  self-bootstraps without it: retro creates `.ai/learnings/` on demand and
  rule-writing detects its own target. The original design record said as
  much (add-ai-harness-skills D3: "the most redundant vs native /init").
  Its real unique value is the optional day-0 bundle: the 3-line
  self-propagating harness block (D14), interop glue, and trimming native
  `/init` output.

Every skill is deliberately standalone (graceful fallbacks exist for
exactly this), so the storefront must say so instead of implying a
pipeline. With publishing (develop → main) imminent, positioning should be
honest before first users arrive.

## What Changes

- **README: one table with a "When to use it" column + a lifecycle
  Usage.** The 7-skill table stays single (no pipeline-implying grouping)
  and gains a third column distilling each skill's frontmatter "Use
  when" triggers. The Usage section walks the full pass over a project's
  life (adopt → capture → work → close the task → grow skills), states
  that every skill runs standalone, and demotes ai-init to an optional
  up-front step. The install section gains a loop-only subset command
  (`npx skills add BCGen/skills -s ai-init codify rule-writing retro` —
  space-separated, verified against the CLI parser).
- **ai-init decoupled in siblings' text**: codify's "Run after ai-init,
  explicitly" becomes "Run explicitly, on any existing project — with or
  without ai-init" (the spec's SHALL — explicit invocation only — is
  untouched); retro's backlog route gains the same "(create the dir +
  README if missing)" self-bootstrap parity its learnings step already
  has.
- **skill-writing becomes destination-neutral**: it is the tool for
  writing skills, wherever they live — a collection's `skills/`, the
  project's skill directory, or the user's global skills directory.
  Destination is gathered as a Step 1 requirement with a context
  recommendation (express collection task → collection; codify/retro
  handoff of a project procedure → that project; personal workflow →
  global) and one question when unclear. The description adds the
  delegated-handoff trigger; the registry collision check and the
  acceptance-plan location are scoped to the destination consistently
  across SKILL.md, references/conventions.md, the review checklist, and
  the living spec (one ADDED + two MODIFIED requirements so no unmodified
  SHALL contradicts the implementation).
- **Self-referential wording generalized**: rule-writing, skill-writing,
  skill-testing, and skill-auditing are standalone tools any project can
  install for its own rules and skills — remaining "this collection" /
  "like this one" phrasing in skill-writing, skill-auditing, and
  conventions.md becomes generic ("a skills collection", "shared
  authoring conventions") so the text reads correctly wherever the skill
  is installed. rule-writing and skill-testing already had zero
  self-references.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `skill-writing`: authoring covers project-local skills as a first-class
  use (the delegation target of codify/retro); destination detection
  added; registry check and acceptance-plan location scoped to the
  authoring mode.

## Non-goals

- No repo split and no moving the toolchain out of `skills/` — the trio
  has genuine end-user roles, and a split would duplicate lint/spec
  infrastructure and break sibling fallbacks.
- No removal or absorption of ai-init — it keeps the risk isolation of
  being the only skill that edits pre-existing user files (D3) and the
  team-propagation block (D14); this change only stops other text from
  implying it is required.
- No change to the shared routing or the delegation contracts themselves.
- No behavior change to codify/retro beyond the wording above (codify's
  explicit-invocation SHALL is untouched).
- Publishing develop → main stays the user's separate decision.
- Other findings from the complexity review (ambiguity fixes, doc drift)
  are handled separately, not in this change.

## Impact

`README.md` (skills table, start-here paragraph, usage flow, install
section); `skills/skill-writing/SKILL.md` + `references/conventions.md`;
`skills/codify/SKILL.md` (one sentence); `skills/retro/SKILL.md` (one
table cell); `tests/skill-writing/README.md`; skill-writing living spec
(delta: 1 ADDED, 2 MODIFIED requirements; Purpose line updated at
archive).
