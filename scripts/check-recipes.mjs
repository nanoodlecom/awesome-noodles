#!/usr/bin/env node
// Verify every catalog graph has a run-headless recipe whose share link still
// decodes to the committed graphs/ file. Full-file byte equality is NOT used:
// Node 20 vs 22 gzip streams differ, so recipe markdown (and README #g= links)
// can differ byte-for-byte while still decoding to the same graph.
//
//   node scripts/check-recipes.mjs

import { readdirSync, readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gunzipSync } from "node:zlib";
import { isDeepStrictEqual } from "node:util";
import { generatedFiles } from "./make-recipes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LINK_RE = /https:\/\/nanoodle\.com\/#g=([A-Za-z0-9_-]+)/;

export function checkRecipes(root = ROOT) {
  const problems = [];
  const { files, entries } = generatedFiles(root);

  for (const e of entries) {
    const rel = `recipes/${e.slug}.md`;
    let actual;
    try {
      actual = readFileSync(join(root, rel), "utf8");
    } catch {
      problems.push(`${rel}: missing — run node scripts/make-recipes.mjs`);
      continue;
    }
    const link = actual.match(LINK_RE);
    if (!link) {
      problems.push(`${rel}: no nanoodle.com/#g= share link — run node scripts/make-recipes.mjs`);
      continue;
    }
    let decoded;
    try {
      decoded = JSON.parse(gunzipSync(Buffer.from(link[1], "base64url")).toString("utf8"));
    } catch (err) {
      problems.push(`${rel}: share link does not decode (${err.message})`);
      continue;
    }
    if (!isDeepStrictEqual(decoded, e.graph)) {
      problems.push(`${rel}: share link decodes to a graph that differs from ${e.graphRel} — run node scripts/make-recipes.mjs`);
    }
    // Keep a light template sanity check that is gzip-stable.
    if (!actual.includes(`# ${e.title}`) && !actual.includes(e.title)) {
      problems.push(`${rel}: missing title "${e.title}" — run node scripts/make-recipes.mjs`);
    }
    if (!actual.includes("npx nanoodle inspect") || !actual.includes("npx nanoodle run")) {
      problems.push(`${rel}: missing inspect/run one-liners — run node scripts/make-recipes.mjs`);
    }
  }

  // recipes/README.md index must list every catalog slug
  const indexRel = "recipes/README.md";
  let indexBody;
  try {
    indexBody = readFileSync(join(root, indexRel), "utf8");
  } catch {
    problems.push(`${indexRel}: missing — run node scripts/make-recipes.mjs`);
    indexBody = "";
  }
  for (const e of entries) {
    if (indexBody && !indexBody.includes(`recipes/${e.slug}.md`) && !indexBody.includes(`${e.slug}.md`)) {
      problems.push(`${indexRel}: missing row for ${e.slug} — run node scripts/make-recipes.mjs`);
    }
  }

  const expectedNames = new Set(["README.md", ...entries.map((e) => `${e.slug}.md`)]);
  for (const f of readdirSync(join(root, "recipes")).filter((n) => n.endsWith(".md")).sort()) {
    if (!expectedNames.has(f)) {
      problems.push(`recipes/${f}: leftover file with no catalog graph — delete it or regenerate`);
    }
  }

  return { entries: entries.length, files: Object.keys(files).length, problems };
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const { entries, files, problems } = checkRecipes();
  for (const p of problems) console.error(`✗ ${p}`);
  if (problems.length === 0) {
    console.log(`✓ ${entries} graph recipe(s) + index (${files} files) match committed graphs`);
  }
  process.exit(problems.length ? 1 : 0);
}
