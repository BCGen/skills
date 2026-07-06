# Contributing

Development notes for this repo. Users don't need any of this — see the
[README](README.md).

## Repo layout

- `skills/<name>/SKILL.md` — the skills (installable units)
- `shared/` — canonical files synced byte-identical into skills (e.g.
  `routing.md`, the mechanism-routing logic shared by codify and retro)
- `openspec/` — product specs and change proposals (what to build and why)
- `.ai/` — this repo's own learning-loop files (lessons staged while
  building the toolkit)
- `tests/` — acceptance scenarios and fixtures
- `scripts/` — repo lint and tooling
- `.githooks/` — the pre-commit lint gate (wired by `pnpm install`)

## Development

```sh
pnpm install        # also installs a pre-commit hook that runs lint
pnpm lint           # skill lint (incl. shared-copy + README-table drift) + markdownlint
pnpm sync-routing   # after editing shared/routing.md, re-sync the skill copies
```

Lint is enforced by a versioned pre-commit hook (`.githooks/`), so a lint
failure blocks the commit. The lint also checks that the README skills
table matches `skills/` exactly and that the shared `routing.md` copies are
byte-identical.

## Specs and changes

Managed with [OpenSpec](https://github.com/Fission-AI/OpenSpec)
(`/opsx:propose`, `/opsx:apply`, `/opsx:archive`). A change's `specs/` delta
must match its intent: a name-only rename ships no delta; an ADDED/MODIFIED
change keeps its delta through archive.
