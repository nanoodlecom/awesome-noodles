#!/usr/bin/env node
// Verify every Keep graph has a generated run-headless recipe whose share
// link still matches the committed graphs/ file.
//
//   node scripts/check-recipes.mjs

import { readdirSync, readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { generatedFiles } from "./make-recipes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export function checkRecipes(root = ROOT) {
  const problems = [];
  const { files, entries } = generatedFiles(root);

  for (const [rel, expected] of Object.entries(files)) {
    let actual;
    try {
      actual = readFileSync(join(root, rel), "utf8");
    } catch {
      problems.push(`${rel}: missing — run node scripts/make-recipes.mjs`);
      continue;
    }
    if (actual !== expected) {
      problems.push(`${rel}: stale (does not match committed graph / template) — run node scripts/make-recipes.mjs`);
    }
  }

  const expectedNames = new Set(Object.keys(files).map((rel) => rel.replace(/^recipes\//, "")));
  for (const f of readdirSync(join(root, "recipes")).filter((n) => n.endsWith(".md")).sort()) {
    if (!expectedNames.has(f)) {
      problems.push(`recipes/${f}: leftover file with no Keep graph — delete it or regenerate`);
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
