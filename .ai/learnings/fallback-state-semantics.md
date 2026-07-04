---
status: candidate
promoted_to:
promoted_on:
---

# Skill fallback paths must state the resulting state explicitly

- 2026-07-05 · task: split-loop-files-per-entry · evidence: task-retrospective's add-rule-missing fallback did not say what happens to the candidate's status; one acceptance agent marked it promoted with promoted_to pointing at a file that was never written — fixed by spelling out "promotion is recorded only after the destination write happened" and retested
