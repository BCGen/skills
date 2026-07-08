# Design: agents-md-readme-single-source

## Research basis

Deep-research pass on 2026-07-08: 5 search angles, 22 sources fetched, 110
claims extracted, 25 adversarially verified (3-vote, kill on 2/3 refute),
22 confirmed / 3 refuted. Confidence levels below are that pass's verdicts.

### Confirmed (high confidence)

- **AGENTS.md is a governed, consolidating standard.** Contributed by OpenAI
  to the Agentic AI Foundation (Linux Foundation) in Dec 2025; 60k+ projects
  self-reported (independent GitHub search ~114k root files); a signal of
  consolidation, not fragmentation. Sources: agents.md, Linux Foundation
  press release, OpenAI announcement.
- **~23 tools read it natively; Claude Code is absent.** Codex, Cursor,
  Gemini CLI, Copilot coding agent, Windsurf, Jules, Devin, Aider, Zed,
  Warp, VS Code, Amp, Factory, goose, opencode, and others list it;
  agents.md never mentions Claude/Anthropic. Source: agents.md (raw HTML
  grep).
- **Claude Code interop = thin `CLAUDE.md` importing `@AGENTS.md`** — this is
  Anthropic-vendor-documented, not folklore. The `@path` import feature is
  official (exact shipping version not independently confirmed here — do not
  cite one). Sources: Anthropic Claude Code docs.
- **Loading mechanics.** Claude Code auto-loads only `CLAUDE.md`,
  `CLAUDE.local.md`, `.claude/rules/*.md` — never `README.md`; the only way
  README content enters context is an explicit `@README` import. Imports
  expand EAGERLY at launch, recurse to a max depth of 4 hops. So an import
  is duplication-free single-source but NOT a zero-cost pointer — it spends
  tokens every session. Cursor natively reads root `AGENTS.md`. Source:
  Anthropic + Cursor docs (live).
- **Vendor lean-file budgets exist.** Anthropic: target < 200 lines per
  `CLAUDE.md`, "longer files consume more context and reduce adherence,"
  with a per-line removal test ("would removing this cause mistakes?") that
  excludes inferable facts, frequently-changing info, and boilerplate.
  Cursor: rules < 500 lines. Source: Anthropic + Cursor docs.
- **README↔entry-file = pointer/import single-source.** Anthropic's own
  example is `See @README.md for project overview`. No credible source
  documents README auto-regeneration or agent-updates-README-per-task as an
  established practice. Source: Anthropic docs.

### Refuted (do NOT cite these forms)

- "Performance consistently degrades with input length, even on simple
  tasks" — refuted 0-3 (over-generalizes Chroma context-rot).
- "Frontier models keep near-perfect adherence up to ~100-250 simultaneous
  instructions" — refuted 0-3 (misreads IFScale).
- A field-guide blog's broad native-reader list — refuted 0-3 against
  primary sources.

### Thin / directional (flag, don't overclaim)

- Stale-README *team practice* is the weakest-evidenced area: only the
  vendor pointer/import pattern survived; treat single-source as the backed
  answer and everything else as unestablished.
- Context-quality evidence (Chroma distractor finding, IFScale) is
  directional from QA/keyword benchmarks, NOT coding-agent entry-file
  ablations. Cite the narrow distractor result, never the sweeping one.
- Adoption counts are self-reported (forks/templates possible).

## Decisions

1. **Keep per-agent detection; do not force AGENTS.md-first.** The user's
   rule — Claude-only + no AGENTS.md → `CLAUDE.md`; AGENTS.md present → thin
   shim; greenfield/ambiguous → recommend AGENTS.md — is more correct than a
   blanket AGENTS.md default: it avoids manufacturing a second file for a
   Claude-only shop while still bridging when portability is already in play.
2. **Budget stays ≤ 60.** A chosen convention, stricter than vendor <200;
   vendor guidance is corroboration, not a reason to loosen it.
3. **Single-source over duplication for README facts**, with the eager-import
   token cost stated so an `@import` is reserved for a doc whose BULK is
   load-bearing every session and a plain pointer is the default otherwise.
4. **Recalibrate, don't delete, the lean-context rationale** — swap the
   refuted broad claim for the vendor + narrow-empirical support.

## Re-verify before release

Claude Code's AGENTS.md status is time-sensitive (there is an open upstream
feature request — exact issue number not confirmed here; some blogs already
wrongly claim native support). Re-check upstream before each skill release;
if native support ships, revisit the thin-shim guidance.
