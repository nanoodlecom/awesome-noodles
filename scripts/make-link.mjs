#!/usr/bin/env node
// Print the "Open in nanoodle" share link for a noodle-graph.json file.
//
//   node scripts/make-link.mjs graphs/text-to-image.noodle-graph.json
//
// Encoding matches the nanoodle editor's decoder exactly:
//   link = https://nanoodle.com/#g= + base64url( gzip( JSON.stringify(graph) ) )
// where base64url is standard base64 with "+" -> "-", "/" -> "_", padding stripped.
// The whole graph rides the URL fragment — nothing is uploaded anywhere.

import { readFileSync, realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

export function makeLink(graph) {
  const payload = gzipSync(JSON.stringify(graph)).toString("base64url");
  return `https://nanoodle.com/#g=${payload}`;
}

// CLI detection that survives symlinks and URL-escapable path characters
// (spaces etc.), unlike the bare `file://${process.argv[1]}` idiom.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: node scripts/make-link.mjs <graph.json>");
    process.exit(1);
  }
  const graph = JSON.parse(readFileSync(path, "utf8"));
  console.log(makeLink(graph));
}
