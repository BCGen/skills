---
status: promoted
promoted_to: skill:harness-sync
promoted_on: 2026-07-06
---

# Never pre-create empty directories git cannot track

- 2026-07-06 · task: drop-empty-rules-dir · evidence: harness-sync pre-created an empty rules dir that vanished on fresh clones (two blind runs flagged the cross-clone idempotency leak; re-runs on clones re-proposed it); the consumer (rule-writing) creates the dir with the first file anyway — structure should be created by whoever writes the first content into it
