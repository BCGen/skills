---
status: candidate
promoted_to:
promoted_on:
---

# Reproduce the user's exact flow before proposing a fix

- 2026-07-05 · task: install-structure bug · evidence: diagnosed an interactive-install failure by testing a different flow (explicit flags), shipped a workaround plus a README caveat; user rejected both — PTY-reproducing the actual command revealed the real root cause (CLI symlinks only when .claude/ pre-exists, silently skips otherwise)
