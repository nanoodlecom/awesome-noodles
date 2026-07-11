import { test } from "node:test";
import assert from "node:assert/strict";
import { gunzipSync } from "node:zlib";
import { checkLinks } from "../scripts/check-links.mjs";
import { makeLink } from "../scripts/make-link.mjs";

test("every README share link decodes and matches its committed graph", () => {
  const { entries, problems } = checkLinks();
  assert.deepEqual(problems, []);
  assert.ok(entries >= 6, `expected at least the 6 seed entries, found ${entries}`);
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
