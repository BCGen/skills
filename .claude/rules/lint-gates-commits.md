# Lint must gate commits

Before committing, run `pnpm lint` so its exit code stops the commit on
failure. Never pipe it (`| tail`, `| grep`) — the pipeline's status is the
last command's, which hides lint failures. Redirect to a file if you need
short output, then check the exit code.

<!-- provenance: 2026-07-05 · task: add-skill-toolchain proposal · evidence: `pnpm lint | tail` masked failures twice, pushing violating commits · via: rule-writing -->
