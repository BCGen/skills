---
status: open
---

# Paste-ready Stop-hook pointer for deterministic retro triggering

- 2026-07-06 · task: retro trigger-rate review · why: retro's trigger moment (task end) is a state, not a user utterance, so organic auto-triggering is structurally weak; the harness-block directive and description trigger phrases raise the odds, but users wanting a deterministic trigger need a hook — offer a paste-ready snippet (e.g. Claude Code Stop hook) in docs, pointer-only per the output boundary (never wire hooks)
- 2026-07-06 · task: retro trigger-rate review · why: double-trigger risk — a hook firing after an organic run (or repeated done/wrap-up utterances) re-scans the same signals and appends duplicate provenance; retro now carries an in-skill idempotency guard (Step 1), and the snippet must still be conditional ("run only if no retrospective ran for this task"); spec coverage (ADDED requirement) rides this change
