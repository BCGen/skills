# Publishing needs the user's go-ahead

Never push to origin without the user's explicit approval in the current
session — repeated past approvals are not standing authorization. On
approval, sync develop from main (`git branch -f develop main &&
git push origin develop`); include main only when the user says so
(fast-forward from the same commit). Local commits and archives are fine
without asking; pushing is the publishing act.

<!-- provenance: 2026-07-05 · task: add-ai-harness-skills publication · evidence: main push denied by policy; stale develop pushed from main and re-synced · via: task-retrospective -->
<!-- provenance: 2026-07-06 · task: converge-managed-surface publication · evidence: agent inferred standing consent from repeated per-batch sync instructions and began auto-pushing; user set the boundary "之後要我同意才可發布" · via: manual -->
