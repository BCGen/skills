# Design: add-skill-toolchain

## Context

Decisions from the Phase 2 planning interview (2026-07-05). Prior art in
hand: the author's local `skill-test` (execution/verification separation —
the core discipline to carry) and `write-a-skill` (gather→draft→review
flow), plus every acceptance pattern exercised while testing the harness
trio on a real project.

## Goals / Non-Goals

**Goals:** the collection can author, verify, and audit skills to its own
standard; unblock personal-skills migration. **Non-Goals:** see proposal.

## Decisions

### D1. Names: gerund family, collision-checked

`skill-writing` / `skill-testing` / `skill-auditing`, alongside the
renamed `rule-writing` — per Anthropic authoring guidance; `ai-init` and
`retro` keep their short names (two deliberate styles: gerund for
managed-unit tools, short names for standalone acts). All exact-match
clean on skills.sh (2026-07-05).

### D2. Build order: testing → writing → auditing

The measuring stick first (it has the strongest existing base and verifies
the other two), the highest-value generator second, the auditor last (its
format layer depends on the authoring spec skill-writing formalizes).

### D3. Toolchain interlink with fallback (harness pattern)

skill-writing hands its output to skill-testing when installed and offers
a manual verification checklist otherwise; skill-auditing routes fixes to
skill-writing when installed, otherwise prints them. Zero-awareness keeps
binding generic skills only.

### D4. skill-testing carries the proven discipline

Minimal-prompt subagent execution (no rule restating), mechanical-only
verification (grep/regex/count/diff), plus Phase 1 field patterns as
references: sandbox + preseed setup, git `fixture`/`pass1` tagging for
additions-only and zero-diff idempotency proofs, scenario-transcript
files for conversational skills.

### D5. skill-writing bakes the collection standard

Conventions enforced at authoring time: frontmatter (name == directory,
capability sentence + "Use when" ≤1024 chars), ≤100-line body with
references split, English-only, no-vendoring, naming philosophy including
a skills.sh collision check, scripts only for deterministic operations.
Also scaffolds `tests/<name>/README.md` with scenarios so acceptance is
designed with the skill, not after it.

### D6. skill-auditing: two layers, any target directory

Carried from the Phase 1 interview: format layer (offline, against the
current authoring spec) and content layer (commands/APIs/versions verified
against live docs via web), reported separately. Generic: defaults to the
current project's installed skills, accepts any path. The repo's own lint
script stays as CI enforcement; skill-auditing is the user-facing,
any-directory diagnostic.

## Risks / Trade-offs

- [skill-auditing content checks depend on web access and doc drift] →
  report "unverifiable" honestly rather than guessing; cite sources per
  finding.
- [skill-writing convention drift as the spec evolves] → conventions live
  in one references file; skill-auditing's format layer reads the same
  file (single source).

## Migration Plan

Implement in D2 order, each passing skill-testing acceptance before the
next starts; retire the three backlog entries; publication follows in a
later change (develop → main after Phase 2).

## Open Questions

- Whether skill-writing should also handle major skill REWRITES
  (migration mode) or stay creation-only — decide when migration phase
  starts.
