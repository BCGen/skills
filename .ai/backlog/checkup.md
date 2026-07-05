---
status: open
---

# checkup skill (drift + redundancy backstop)

- 2026-07-05 · task: add-skill-toolchain planning · why: detect drift between
  rules/settings and the project's actual practice, route hard/mechanical
  findings to enforcement, and flag rules a new config/test/hook made
  redundant so budget can be reclaimed
- 2026-07-06 · task: codify interview · why: this is the skill that answers
  "does anything check for duplicate settings?" — a rule the user asked
  about (a rule superseded by a tool/hook should be retired). Until it
  exists, retro does this opportunistically when it escalates to enforcement
