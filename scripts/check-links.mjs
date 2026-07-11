#!/usr/bin/env node
// Validate every "Open in nanoodle" share link in README.md:
//   1. extract the #g= payload,
//   2. base64url-decode + gunzip + JSON.parse it,
//   3. check the basic graph shape ({ v: 1, nodes: [...], links: [...] }),
//   4. deep-compare the decoded graph against the committed graphs/ file
//      linked on the same entry line.
// Also flags committed graph files that no README entry references.
//
//   node scripts/check-links.mjs          # exits non-zero on any problem

import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gunzipSync } from "node:zlib";
import { isDeepStrictEqual } from "node:util";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const LINK_RE = /https:\/\/nanoodle\.com\/#g=([A-Za-z0-9_-]+)/;
const GRAPH_RE = /\((graphs\/[A-Za-z0-9._-]+\.json)\)/;

export function checkLinks(root = ROOT) {
  const problems = [];
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const referenced = new Set();
  let entries = 0;

  for (const [i, line] of readme.split("\n").entries()) {
    const link = line.match(LINK_RE);
    if (!link) continue;
    entries++;
    const where = `README.md:${i + 1}`;

    // 1+2: decode the payload
    let decoded;
    try {
      decoded = JSON.parse(gunzipSync(Buffer.from(link[1], "base64url")).toString("utf8"));
    } catch (err) {
      problems.push(`${where}: share link payload does not decode (${err.message})`);
      continue;
    }

    // 3: basic shape
    if (decoded.v !== 1) problems.push(`${where}: decoded graph has v=${decoded.v}, expected 1`);
    if (!Array.isArray(decoded.nodes)) problems.push(`${where}: decoded graph is missing nodes[]`);
    if (!Array.isArray(decoded.links)) problems.push(`${where}: decoded graph is missing links[]`);

    // 4: must match the committed graph file linked on the same line
    const graphRef = line.match(GRAPH_RE);
    if (!graphRef) {
      problems.push(`${where}: entry has a share link but no (graphs/<slug>.noodle-graph.json) link`);
      continue;
    }
    referenced.add(graphRef[1]);
    let committed;
    try {
      committed = JSON.parse(readFileSync(join(root, graphRef[1]), "utf8"));
    } catch (err) {
      problems.push(`${where}: cannot read ${graphRef[1]} (${err.message})`);
      continue;
    }
    if (!isDeepStrictEqual(decoded, committed)) {
      problems.push(`${where}: share link decodes to a graph that differs from ${graphRef[1]} — regenerate with scripts/make-link.mjs`);
    }
  }

  if (entries === 0) problems.push("README.md: no share links found — nothing was checked");

  for (const f of readdirSync(join(root, "graphs")).filter((f) => f.endsWith(".json")).sort()) {
    if (!referenced.has(`graphs/${f}`)) problems.push(`graphs/${f}: committed but not referenced by any README entry`);
  }

  return { entries, problems };
}

// CLI detection that survives symlinks and URL-escapable path characters
// (spaces etc.), unlike the bare `file://${process.argv[1]}` idiom.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const { entries, problems } = checkLinks();
  for (const p of problems) console.error(`✗ ${p}`);
  if (problems.length === 0) {
    console.log(`✓ ${entries} share link(s) decode, round-trip, and match their committed graphs`);
  }
  process.exit(problems.length ? 1 : 0);
}
