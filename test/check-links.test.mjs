import { test } from "node:test";
import assert from "node:assert/strict";
import { gunzipSync } from "node:zlib";
import { checkLinks } from "../scripts/check-links.mjs";
import { checkRecipes } from "../scripts/check-recipes.mjs";
import { makeLink } from "../scripts/make-link.mjs";
import { authorInputs } from "../scripts/graph-io.mjs";

test("every README share link decodes and matches its committed graph", () => {
  const { entries, problems } = checkLinks();
  assert.deepEqual(problems, []);
  assert.equal(entries, 8, "the curated catalog has eight workflows");
});

test("every catalog graph has a generated run-headless recipe that matches its committed graph", () => {
  const { entries, files, problems } = checkRecipes();
  assert.deepEqual(problems, []);
  assert.equal(entries, 8, "the curated catalog has eight workflow recipes");
  assert.ok(files === entries + 1, `expected ${entries} recipes + index, found ${files} files`);
});

test("author-facing inputs prefer node names the CLI accepts", () => {
  const graph = {
    v: 1,
    nodes: [
      { id: "n1", type: "text", name: "Brief", fields: { text: "A workshop poster" } },
      { id: "n2", type: "llm", fields: { model: "x" } },
    ],
    links: [{ from: { node: "n1", port: "text" }, to: { node: "n2", port: "prompt" } }],
  };
  assert.deepEqual(authorInputs(graph).map((i) => i.cli), ["n1.text"]);
  assert.equal(authorInputs(graph)[0].key, "Brief");
});

test("make-link encoding round-trips through the editor's decode steps", () => {
  const graph = { v: 1, nodes: [{ id: "n1", type: "text", x: 0, y: 0, fields: { text: "héllo 🍜" } }], links: [] };
  const link = makeLink(graph);
  assert.match(link, /^https:\/\/nanoodle\.com\/#g=[A-Za-z0-9_-]+$/, "payload must be padless base64url");
  const payload = link.split("#g=")[1];
  // Editor side: b64urlToBytes (- -> +, _ -> /, re-pad) then gunzip then JSON.parse.
  const b64 = payload.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (payload.length % 4)) % 4);
  const decoded = JSON.parse(gunzipSync(Buffer.from(b64, "base64")).toString("utf8"));
  assert.deepEqual(decoded, graph);
});
