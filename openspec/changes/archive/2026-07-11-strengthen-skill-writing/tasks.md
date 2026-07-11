# Tasks: strengthen-skill-writing

## 1. Conventions craft layer

- [x] 1.1 Add the frontmatter rules to `references/conventions.md`: the allowed
      key set, and the name character/length/reserved-word rules, each with its
      source URL recorded
- [x] 1.2 Add the description rules: third person, what-and-when, triggers
      written wide against under-triggering, no angle brackets
- [x] 1.3 Add the reference-file rules: one level below SKILL.md, a table of
      contents for a long file, and an explicit statement in the body of when to
      read each reference
- [x] 1.4 Add the script rules: resolve foreseeable errors in the script, no
      unexplained constants, forward slashes in paths
- [x] 1.5 Add the phrasing rules: positive instruction over prohibition, with a
      prohibition reserved for a guardrail that cannot be phrased positively and
      always paired with its positive alternative
- [x] 1.6 Add the content rules: no time-sensitive statements, one default
      approach with an escape hatch, one term per concept
- [x] 1.7 Rewrite the English-only rule: a skill is written in its destination's
      language, inferred from the project and asked once when unclear; English-only
      remains a rule of THIS collection's CI, not of authoring
- [x] 1.8 Add the invocation-mode section: what the standing context cost is and
      how the decision is made
- [x] 1.9 Keep the file within its reference budget — rewrite rather than append
      where an existing rule already covers the ground

## 2. SKILL.md flow

- [x] 2.1 Add the carrier gate as the first step: one question, recommended
      answer, asked once, skipped on a routing handoff
- [x] 2.2 Trim gathering to what only the user can answer (use cases, destination,
      invocation mode, the cost of being wrong, and the destination's language when
      it cannot be inferred) and infer the rest; add the observed-failure
      question and the unverified-triggers fallback
- [x] 2.3 Add the duplicate check right after gathering — before interrogation, so
      an existing skill is found before the user is questioned at length; make the
      registry lookup conditional on public publication
- [x] 2.4 Add the interrogation step with its stopping rule and its six subjects
      (completion criteria, absent preconditions, block-or-warn, when not to fire,
      output shape, tool/data dependencies), plus the tacit-knowledge question;
      depth scales with the cost of being wrong
- [x] 2.5 Add the dry-run step: fresh-context subagent, main path plus a control
      run without the draft, up to three scenarios for a high-stakes skill; report
      where the agent improvised and where the control already succeeded
- [x] 2.6 Add the edit-an-existing-skill branch: same conventions, no registry
      check, dry run re-run on the failing scenario
- [x] 2.7 Remove the acceptance-scaffold step and every skill-testing handoff —
      skill-writing is self-contained; close-out mentions skill-testing once as
      the place to get a durable regression plan
- [x] 2.8 Add the definition of done: conventions pass, main-path dry run free of
      material improvisation, user accepts the run output; amend-and-rerun capped
      at two, then stop and put the surviving gaps to the user
- [x] 2.8b Add the close-out step: where it landed, how it fires, whether to
      commit it
- [x] 2.9 Replace the review checklist table with a pointer to
      `references/conventions.md` — the rules live in one place
- [x] 2.10 Verify the body fits both caps (100 lines and 5,000 tokens); move
      detail into references where it does not

## 3. Acceptance

- [x] 3.1 `tests/skill-writing/README.md`: scenario where a direct request is
      better served by a config — mechanical check that no SKILL.md was written
      and the fitter carrier was named
- [x] 3.2 Scenario where a routing handoff arrives — mechanical check that the
      gate question was not asked
- [x] 3.3 Scenario for a hand-invoked-only skill — mechanical check that the
      draft carries `disable-model-invocation: true`
- [x] 3.4 Scenario for editing an existing skill — mechanical check that no
      registry lookup ran and the dry run was re-run
- [x] 3.5 Scenario for a draft carrying an illegal frontmatter key — mechanical
      check that it is removed before review
- [x] 3.6 Scenario where an installed skill already covers the job — mechanical
      check that the overlap is named and no second skill is written
- [x] 3.7 Scenario for any destination — mechanical check that skill-writing
      wrote no test-plan file and made no skill-testing call
- [x] 3.8 Scenario where the dry run improvises — mechanical check that the
      improvisation point is reported and the draft changed before finalizing

## 4. Vocabulary

- [x] 4.0 Replace the bespoke word "collection" with the ecosystem's own: a
      distributable set of skills is a **package** (`npx skills add <package>`).
      Sweep `skills/skill-writing/SKILL.md`, `references/conventions.md`,
      `skills/skill-auditing/SKILL.md`, and the README row — plus the three
      incidental uses in the harness-sync, harness-conventions and skill-auditing
      specs
- [x] 4.0b Make the registry check hang on the fact, not the category: it runs
      when a skill will be **published publicly**, not when it is "a collection
      addition" — a private package skips it

## 5. Repo enforcement and close-out

- [x] 5.1 Extend `scripts/lint-skills.mjs` with the mechanical rules: allowed
      frontmatter keys, name character/length/reserved-word rules, no angle
      brackets in the description
- [x] 5.2 Add the body token budget to the linter (5,000 tokens, alongside the
      existing 100-line cap) — the line cap alone does not bound context while
      line width is unlimited
- [x] 5.3 Add the reference-file rules to the linter: one level below SKILL.md,
      and a table of contents once a file passes 100 lines (`routing.md` at 186
      lines and `loop-file-formats.md` at 103 already breach it)
- [x] 5.4 Run `pnpm lint` and fix fallout across the collection's own skills
- [x] 5.5 Update `README.md`'s skill-writing row if its capability sentence no
      longer matches
- [x] 5.6 Validate the change: `openspec validate strengthen-skill-writing`
