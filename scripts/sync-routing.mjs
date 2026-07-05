#!/usr/bin/env node
// Copy the canonical shared/routing.md into each consuming skill's
// references/. Run after editing shared/routing.md. The repo lint verifies
// the copies match, so drift is a hard failure, not a hope.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SOURCE = join(ROOT, "shared", "routing.md");
const CONSUMERS = ["codify", "retro", "checkup"];

const canonical = readFileSync(SOURCE, "utf8");
let synced = 0;
for (const skill of CONSUMERS) {
  const dest = join(ROOT, "skills", skill, "references", "routing.md");
  // Only sync skills that exist (checkup is future/backlog).
  if (!existsSync(join(ROOT, "skills", skill))) continue;
  writeFileSync(dest, canonical);
  synced++;
  console.log(`synced → skills/${skill}/references/routing.md`);
}
console.log(`sync-routing: ${synced} copy(ies) written from shared/routing.md`);
