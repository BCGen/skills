# codify (delta)

## MODIFIED Requirements

### Requirement: Enforcement-class routing

codify SHALL classify each observed convention and route it: discoverable
facts → nothing; mechanically enforceable and not yet enforced → a
declarative config artifact (already enforced by existing config →
nothing); non-discoverable judgment → a rule via rule-writing; multi-step
procedures and build-step-expressible structural defaults → a project-local
skill, authored directly; file-generator structure and must-never /
agent-behavior settings → a paste-ready pointer snippet. Its success is
measured by first-execution accuracy, not by the number of rules created.

#### Scenario: Discoverable fact

- **WHEN** a convention is readable from the codebase (a version, a layout, an existing
  pattern)
- **THEN** codify routes it to nothing — the agent reads it

#### Scenario: Multi-step procedure

- **WHEN** a multi-step procedure convention is confirmed and approved
- **THEN** codify routes it to a project-local skill, written directly

### Requirement: Procedures and build-step structure hand to skill-writing

codify SHALL route a multi-step procedure convention, and a structural
default expressible as build steps, to a project-local skill, **written
directly** (on user consent). Structure requiring an executable file
generator SHALL be a pointer.

There is no delegate skill for this. The SKILL.md format is native to the
model, and the judgment a delegate would have carried — decompose the problem
behind the request, refuse to write what the input does not contain, ask
whether a skill is the right carrier at all — the model performs unaided.

#### Scenario: Release procedure becomes a project skill

- **WHEN** a documented multi-step procedure (e.g. release checklist) is detected and approved
- **THEN** codify writes the project-local skill itself
