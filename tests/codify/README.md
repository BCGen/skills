# Acceptance tests: codify

Run codify over the `codify-sample` fixture with pre-authorized consent;
verify the routing decisions mechanically. The fixture mixes one convention
per route.

## Fixture routes

| Signal in fixture | Expected route |
| --- | --- |
| `src/components/` layout (Button, Card) | discoverable → nothing |
| Consistent single-quote style, no config enforcing it | mechanically enforceable, not enforced → propose config artifact |
| CONTRIBUTING already states "errors bubble to the boundary" | judgment already in a doc → no rule |
| `internalClient`-only HTTP pattern (added below), undocumented | judgment clue → ASK before any rule |
| `commitlint.config.json` present | commit convention already enforced → point at it, no new rule |

## Subagent prompt

Minimal, with pre-authorization so the run completes:

> Follow the skill at `<repo>/skills/codify/SKILL.md` to codify the project
> at `<sandbox>`. I pre-approve your proposed config/doc writes; for any
> convention needing my confirmation, state the question and assume it IS a
> team convention. rule-writing is not installed. Write
> your routing report to `<sandbox>/codify-report.md`.

## Mechanical checks (on the report and the sandbox)

```sh
grep -ci 'components' codify-report.md      # layout mentioned as discoverable/nothing
grep -ciE 'quote|config' codify-report.md   # style routed to a config artifact
grep -ci 'boundary' codify-report.md        # error-to-boundary recognized as already documented
grep -ci 'commitlint' codify-report.md      # commit convention pointed at, not re-ruled
test ! -d "$SANDBOX/.claude/rules"          # no rule written (rule-writing absent; doc/config preferred)
```

Route verdicts to confirm from the report:

- layout → nothing (no artifact proposed for `src/components/`)
- single-quote style → a config artifact proposed (not a rule)
- error-to-boundary → recognized as already in CONTRIBUTING, no rule
- `internalClient` → asked before acting (a clue, not auto-ruled)
- commit → existing commitlint pointed at, no new commit rule

Not mechanically verifiable (human spot-check): the quality of the
recommended doc location, the phrasing of the confirmation question.

## Second fixture: `codify-config-gap` (the "generate config" route)

`codify-sample` has no formatter toolchain, so a style convention correctly
routes to a POINTER (standing up a new toolchain is out of scope). To
exercise the config-generation route, `codify-config-gap` has an existing
`.editorconfig` (charset only) and code that is unanimously 2-space
indented.

Expected: codify extends the EXISTING `.editorconfig` with
`indent_style`/`indent_size = 2`, surgically (keeps `root`/`charset`), and
writes no rule.

```sh
grep -c 'indent_size = 2' .editorconfig   # added
grep -c 'charset = utf-8' .editorconfig   # pre-existing line intact
test ! -d .claude/rules                    # no rule
```

Rule of thumb this proves: codify only extends config for a mechanism
ALREADY present; introducing a new linter/formatter is a pointer, not a
codify write.

## Third fixture: `codify-standards` (doc truth + carrier upgrades)

Sandbox is a git repo (commit the fixture first). Prompt gives ZERO
approvals: "collect findings and proposals into `codify-report.md` only —
approve nothing." Expected, all as consent-gated proposals:

- README flagged as unedited platform boilerplate, excluded from the
  authority order, with a corrected front page drafted
- `CLAUDE.md`'s false claim flagged (`npm run build` has no script) —
  a truth finding, not an authority source
- `docs/conventions.md` carrier upgrade drafted (drop the tool-policy
  preamble and the recorded non-convention); its components-layering
  claim is TRUE (`src/components/` exists) and must not be flagged
- entry-file reference upgrade drafted (labeled `@import` form)

```sh
grep -ciE 'boilerplate|template' codify-report.md    # README finding present (> 0)
grep -c 'npm run build' codify-report.md              # false command flagged (> 0)
grep -c '@docs/conventions.md' codify-report.md       # import upgrade drafted (> 0)
test -z "$(git -C <sandbox> status --porcelain | grep -v codify-report)"  # nothing else written
```

## Scenario: README fact is single-sourced, not duplicated

Preseed a project whose `README.md` states a load-bearing, non-inferable
convention (e.g. "All stored timestamps are UTC.") and an entry file with no
such line. Run codify. It SHALL reference README from the entry file (a
pointer or `@import`), never copy the convention into the entry file as a
second, drift-prone copy:

```sh
grep -ci 'timestamps are utc' <entry file>   # 0 — the value is not duplicated
grep -ciE 'README|@README' <entry file>       # > 0 — referenced instead
```
