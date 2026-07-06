#!/usr/bin/env node
// Zero-dependency lint for skills/*/SKILL.md per openspec repo-quality-checks.
// Checks: frontmatter parses; name == directory; description shape and length;
// body line cap; no CJK characters in any skills/**/*.md.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_DIR = join(ROOT, "skills");
const BODY_LINE_CAP = 100;
const DESCRIPTION_MAX = 1024;
const CJK_RE = /[぀-ヿ㐀-䶿一-鿿가-힯豈-﫿]/u;

const violations = [];
const fail = (file, msg) => violations.push(`${relative(ROOT, file)}: ${msg}`);

// Minimal frontmatter parser: leading --- block of simple `key: value` pairs.
// Returns null when the block is missing or malformed.
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split("\n")) {
    if (line.trim() === "" || /^\s/.test(line)) continue; // nested keys ignored
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) return null;
    fields[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { fields, body: text.slice(m[0].length) };
}

function* walkMarkdown(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* walkMarkdown(p);
    else if (entry.endsWith(".md")) yield p;
  }
}

if (!existsSync(SKILLS_DIR)) {
  console.log("lint-skills: no skills/ directory yet — nothing to check.");
  process.exit(0);
}

const skillDirs = readdirSync(SKILLS_DIR).filter((d) =>
  statSync(join(SKILLS_DIR, d)).isDirectory()
);

for (const dir of skillDirs) {
  const skillFile = join(SKILLS_DIR, dir, "SKILL.md");
  if (!existsSync(skillFile)) {
    fail(join(SKILLS_DIR, dir), "missing SKILL.md");
    continue;
  }
  const parsed = parseFrontmatter(readFileSync(skillFile, "utf8"));
  if (!parsed) {
    fail(skillFile, "frontmatter missing or unparseable");
    continue;
  }
  const { fields, body } = parsed;

  if (fields.name !== dir)
    fail(skillFile, `frontmatter name "${fields.name}" != directory "${dir}"`);

  const desc = fields.description;
  if (!desc) fail(skillFile, "description missing");
  else {
    if (desc.length > DESCRIPTION_MAX)
      fail(skillFile, `description ${desc.length} chars (max ${DESCRIPTION_MAX})`);
    if (!/\bUse when\b/.test(desc))
      fail(skillFile, 'description lacks "Use when ..." trigger sentence');
  }

  const bodyLines = body.split("\n").length;
  if (bodyLines > BODY_LINE_CAP)
    fail(skillFile, `body ${bodyLines} lines (cap ${BODY_LINE_CAP})`);
}

for (const file of walkMarkdown(SKILLS_DIR)) {
  const text = readFileSync(file, "utf8");
  const hit = text.match(CJK_RE);
  if (hit) {
    const line = text.slice(0, hit.index).split("\n").length;
    fail(file, `CJK character at line ${line} (English-only convention)`);
  }
}

// Shared routing.md must be byte-identical across consuming skills.
const sharedRouting = join(ROOT, "shared", "routing.md");
if (existsSync(sharedRouting)) {
  const canonical = readFileSync(sharedRouting, "utf8");
  for (const dir of skillDirs) {
    const copy = join(SKILLS_DIR, dir, "references", "routing.md");
    if (!existsSync(copy)) continue;
    if (readFileSync(copy, "utf8") !== canonical)
      fail(copy, "differs from shared/routing.md — run `pnpm sync-routing`");
  }
}

// README's skills table must list exactly the skills in skills/.
const readmePath = join(ROOT, "README.md");
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, "utf8");
  const listed = new Set(
    [...readme.matchAll(/^\| \[([a-z][a-z0-9-]*)\]\(skills\//gm)].map((m) => m[1])
  );
  const actual = new Set(skillDirs);
  for (const name of listed)
    if (!actual.has(name))
      fail(readmePath, `skills table lists "${name}" but skills/${name} does not exist`);
  for (const name of actual)
    if (!listed.has(name))
      fail(readmePath, `skills/${name} exists but is not in the README skills table`);
}

if (violations.length) {
  console.error(`lint-skills: ${violations.length} violation(s)`);
  for (const v of violations) console.error(`  ✗ ${v}`);
  process.exit(1);
}
console.log(`lint-skills: ${skillDirs.length} skill(s) OK`);
