# Publishing: develop branch only

Never push main directly. Publish by syncing develop from main
(`git branch -f develop main && git push origin develop`); main advances
only by merging develop.

<!-- provenance: 2026-07-05 · task: add-ai-harness-skills publication · evidence: main push denied by policy; stale develop pushed from main and re-synced · via: task-retrospective -->
