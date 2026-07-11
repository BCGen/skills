# skill-writing (delta)

## ADDED Requirements

### Requirement: Runtime text names no third-party skill

A skill's runtime text — its body and its references — SHALL NOT name a skill this
package does not maintain. Examples SHALL use a placeholder, and a concrete name SHALL
come only from what the agent found by reading the skills actually installed.

A hard-coded name biases a choice that should follow the evidence, rots without
warning when that skill is renamed or abandoned, and reads as noise to every user who
does not have it. Naming a sibling within this package remains governed by the
toolchain-awareness rule, with its fallback when the sibling is absent; documentation
read by people is unaffected.

#### Scenario: An example of offering a control

- **WHEN** a reference illustrates how to offer the user a control
- **THEN** it uses a placeholder rather than the name of a skill outside this package

#### Scenario: A control is discovered

- **WHEN** the agent reads the descriptions of the installed skills and one fits
- **THEN** it names that skill to the user — a discovered name is evidence, not a
  shipped recommendation
