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
- 2026-07-07 · task: codify field fixes · why: artifacts codify previously
  wrote (a tool-dialect conventions doc, a plain pointer that should be a
  labeled `@import`) had to be upgraded BY HAND — reconciliation rightly
  stops codify re-runs from touching placed content, so checkup is the
  designed path to PROPOSE style/mechanism upgrades of existing
  placements when the skills' own standards improve
- 2026-07-07 · task: codify-standards-pass · why: SCOPE NARROWED — carrier
  upgrades and doc-truth checks moved into codify itself (users reach for
  codify); checkup keeps the enforcement-health audit: rule budget
  reclamation, rules made redundant by hooks/configs, staleness
