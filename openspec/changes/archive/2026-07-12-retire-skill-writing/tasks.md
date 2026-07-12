# Tasks: retire-skill-writing

## 1. Delete the skill

- [ ] 1.1 `skills/skill-writing/` — deleted.
- [ ] 1.2 `tests/skill-writing/` — deleted.
- [ ] 1.3 `openspec/specs/skill-writing/` — deleted outright, **with no delta folder**.
      OpenSpec rebuilds a spec from its delta and rejects a zero-requirement result, so a
      REMOVED delta that empties a capability aborts the archive
      (`.claude/rules/openspec-delta-handling.md`). The reason lives in design.md.

## 2. Reroute what pointed at it — the real work

`shared/routing.md` is canonical and byte-identical-synced into codify and retro by
`scripts/sync-routing.mjs`; lint fails if the copies drift. **Edit `shared/`, then run
`pnpm sync-routing`.**

- [ ] 2.1 `shared/routing.md` — the three lines sending a multi-step procedure and a
      build-step structural default to skill-writing now say: write the project skill
      directly.
- [ ] 2.2 `skills/codify/SKILL.md` — its two handoffs, likewise.
- [ ] 2.3 `skills/skill-auditing/SKILL.md` — an approved fix is applied in place; the
      "not installed" fallback goes with the skill it referred to.
- [ ] 2.4 `pnpm sync-routing`, then confirm `pnpm lint` is green on the copies.
- [ ] 2.5 `tests/codify/README.md`, `tests/skill-auditing/README.md`,
      `docs/ai-harness-skills.md` — updated.

## 3. README: recommend, do not rebuild

- [ ] 3.1 Remove the skill-writing row from the skills table (lint fails if the table and
      `skills/` disagree).
- [ ] 3.2 Add a short section: Claude writes SKILL.md natively; when you want the draft
      **measured** rather than trusted, use `skill-creator` (Anthropic, 310K installs) or
      `writing-great-skills` (143K) for style.
- [ ] 3.3 **No commentary on their gaps.** A criticism written into a recommendation is an
      invoice addressed to yourself.

## 4. Close out

- [ ] 4.1 `pnpm lint` green — skill lint, markdownlint, the README table, and the
      byte-identical routing copies.
- [ ] 4.2 `openspec validate retire-skill-writing --strict`.
- [ ] 4.3 `grep -r skill-writing` returns nothing under `skills/`, `shared/`, `docs/`,
      `tests/`, `README.md`. The archive keeps it — that is the record, not a reference.
- [ ] 4.4 codify, retro and skill-auditing's routing tables each point at a destination that
      still exists.

## 5. Not in this change

- [ ] 5.1 The other five skills. They pass the registry check — unlike skill-writing they have
      no real competitor — but **none has been run against a control, and two of two tested so
      far have lost.** That is the next change, and the prior is not comfortable.
