---
status: candidate
promoted_to:
promoted_on:
---

# Renaming a published skill strands existing installs

- 2026-07-06 · task: rename-harness-sync rollout · evidence: `npx skills update` in a project with the old name failed ("Failed to update ai-init") and never listed the new name — update refreshes installed names only and adds nothing; the CLI's deleted-skill check also failed. Migration is manual: `skills remove <old>` + `skills add <repo> -s <new>`. Next rename should ship migration guidance (or weigh the stranding cost before renaming)
