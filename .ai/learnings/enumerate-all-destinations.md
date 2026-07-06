---
status: candidate
promoted_to:
promoted_on:
---

# Routing tables must enumerate every writable artifact type

- 2026-07-05 · task: refine-retro interview · evidence: the retro routing table missed the entry file as a destination and had no awareness of externally-written rules — both gaps found by the user asking "what about CLAUDE.md" and "what if add-rule isn't installed"
- 2026-07-06 · task: reposition-catalog · evidence: skill-writing's destination logic listed collection and project-local but missed the user-global skills directory until the user objected ("也不應該限制成 project-local")
