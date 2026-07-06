---
status: promoted
promoted_to: .claude/rules/openspec-delta-handling.md
promoted_on: 2026-07-06
---

# Match the OpenSpec change's delta folder to its intent before archiving

- 2026-07-05 · task: rename-write-rule · evidence: a placeholder "(none)" delta failed archive validation twice — a name-only rename must ship NO specs/ delta at all
- 2026-07-05 · task: add-skill-toolchain · evidence: the opposite error — I deleted the specs/ delta before archiving an ADDED-capability change (over-generalizing the name-only rule), so three new capabilities never reached openspec/specs/ and had to be recovered from git. ADDED/MODIFIED changes MUST keep their delta through archive
- 2026-07-06 · task: reposition-catalog · evidence: a third facet — the delta was ADDED-only while the implementation contradicted two unmodified SHALLs (unconditional registry check; hardcoded test-plan path); adversarial review flagged that archiving would merge a self-contradicting spec; fixed by adding two MODIFIED requirements
