---
status: promoted
promoted_to: CONTRIBUTING.md
promoted_on: 2026-07-06
---

# openspec archive output needs a markdownlint pass before commit

- 2026-07-06 · task: reposition-catalog · evidence: `openspec archive` rewrote the living spec dropping blank lines around headings and leaving a trailing double blank; the pre-commit lint hook blocked the commit (4 markdownlint errors); reformatted by hand
