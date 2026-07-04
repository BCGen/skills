---
status: promoted
promoted_to: .claude/rules/publishing.md
promoted_on: 2026-07-05
---

# Publish via the develop branch; main stays merge-only

- 2026-07-05 · task: add-ai-harness-skills implementation · evidence: direct push to main was denied and the user redirected publication to a develop branch
- 2026-07-05 · task: add-ai-harness-skills publication · evidence: `git push origin develop` from main pushed a stale develop; had to `git branch -f develop main` and re-push — the branch policy has no documented procedure
