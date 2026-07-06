---
status: candidate
promoted_to:
promoted_on:
---

# Renaming a published skill strands existing installs

- 2026-07-06 · task: rename-harness-sync rollout · evidence: `npx skills update` in a project with the old name failed ("Failed to update ai-init") and never listed the new name — update refreshes installed names only and adds nothing; the CLI's deleted-skill check also failed. Migration is manual: `skills remove <old>` + `skills add <repo> -s <new>`. Next rename should ship migration guidance (or weigh the stranding cost before renaming)
- 2026-07-06 · task: upstream verification · evidence: the vercel-labs skills CLI README documents none of this; in code, update compares skills-lock.json against the cloned source and at best PROMPTS to remove vanished names (checkAndPromptForDeletions) — it never adds the renamed skill, and the lock file is still experimental
- 2026-07-06 · task: root cause of the silent check failure · evidence: "Failed to check for deleted skills" is an upstream bug — the deletion check passes the lock's shorthand source ("BCGen/skills") straight to cloneRepo, which git-clones the raw string (no shorthand→URL resolution, unlike the per-skill update path), so the check throws for every owner/repo-installed skill; had it worked, the rename would have prompted removal of the old name
