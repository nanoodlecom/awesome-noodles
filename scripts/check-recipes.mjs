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
const LINK_RE = /https:\/\/nanoodle\.com\/#g=([A-Za-z0-9_-]+)/g;

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
    // Compare the whole generated artifact, while allowing gzip implementations
    // to encode the same graph differently. Every embedded link must match.
    const normalize = body => body.replace(LINK_RE, (url, payload) => {
      try {
        const graph = JSON.parse(gunzipSync(Buffer.from(payload, "base64url")).toString("utf8"));
        return isDeepStrictEqual(graph, e.graph) ? e.shareUrl : url;
      } catch { return url; }
    });
    if (normalize(actual) !== normalize(files[rel])) {
      problems.push(`${rel}: stale content or share link — run node scripts/make-recipes.mjs`);
    }
  }

  const indexRel = "recipes/README.md";
  try {
    if (readFileSync(join(root, indexRel), "utf8") !== files[indexRel]) {
      problems.push(`${indexRel}: stale content — run node scripts/make-recipes.mjs`);
    }
  } catch {
    problems.push(`${indexRel}: missing — run node scripts/make-recipes.mjs`);
  }

  const expectedNames = new Set(["README.md", ...entries.map((e) => `${e.slug}.md`)]);
  // A missing recipes directory is already reported by the reads above.
  let names = [];
  try { names = readdirSync(join(root, "recipes")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  for (const f of names.filter((n) => n.endsWith(".md")).sort()) {
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
