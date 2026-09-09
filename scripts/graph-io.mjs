#!/usr/bin/env node
// Author-facing inputs for a noodle-graph.json — the same fields `inspect`
// advertises for text / upload / choice nodes that are not fed by a wire.
// Used to generate the run-headless recipes. Does not invent first-clicks:
// defaults stay whatever the committed graph already stored.

const AUTHOR_INPUTS = {
  text: { field: "text", kind: "text" },
  upload: { field: "image", kind: "image" },
  aupload: { field: "audio", kind: "audio" },
  vupload: { field: "video", kind: "video" },
  choice: { field: "selected", kind: "choice" },
};

function isWired(graph, nodeId, field) {
  return (graph.links || []).some((l) => l.to?.node === nodeId && l.to?.port === field);
}

export function authorInputs(graph) {
  const inputs = [];
  for (const n of graph.nodes || []) {
    const spec = AUTHOR_INPUTS[n.type];
    if (!spec) continue;
    if (isWired(graph, n.id, spec.field)) continue;
    const name = String(n.name || "").trim() || n.id;
    const hasDefault =
      spec.kind === "text"
        ? Boolean(n.fields?.text)
        : spec.kind === "choice"
          ? Boolean(n.fields?.selected)
          : false;
    inputs.push({
      key: name,
      nodeId: n.id,
      field: spec.field,
      kind: spec.kind,
      cli: `${n.id}.${spec.field}`,
      hasDefault,
      required: spec.kind === "image" || spec.kind === "audio" || spec.kind === "video",
      options:
        n.type === "choice"
          ? String(n.fields?.options || "")
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
    });
  }
  return inputs;
}

export function slugFromGraphPath(relPath) {
  return relPath.replace(/^graphs\//, "").replace(/\.noodle-graph\.json$/, "");
}
