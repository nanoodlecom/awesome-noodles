#!/usr/bin/env node
// Generate recipes/<slug>.md — one run-headless strip per Keep graph.
//
//   node scripts/make-recipes.mjs
//
// Share links are regenerated from the committed graphs/ JSON (same encoder
// as scripts/make-link.mjs). Do not hand-edit the generated files; change
// the graph or this template and regenerate.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { realpathSync } from "node:fs";
import { authorInputs, slugFromGraphPath } from "./graph-io.mjs";
import { makeLink } from "./make-link.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GRAPHS = join(ROOT, "graphs");
const RECIPES = join(ROOT, "recipes");

const TITLE_RE = /\*\*([^*]+)\*\*.*\(graphs\/([A-Za-z0-9._-]+\.json)\)/;

export function titlesFromReadme(readme) {
  const titles = new Map();
  for (const line of readme.split("\n")) {
    const m = line.match(TITLE_RE);
    if (!m) continue;
    titles.set(`graphs/${m[2]}`, m[1].replace(/\s*→.*$/, "").trim());
  }
  return titles;
}

function inputRow(inp) {
  const key = `\`${inp.key}\``;
  const cli = `\`${inp.cli}\``;
  if (inp.kind === "choice") {
    return `| ${key} | choice | ${cli} | committed first-click; options listed in the graph |`;
  }
  if (inp.required) {
    return `| ${key} | ${inp.kind} | ${cli} | required — pass a local file with \`--input ${inp.cli}=@path\` |`;
  }
  return `| ${key} | ${inp.kind} | ${cli} | omit \`--input\` to keep the committed first-click |`;
}

function runFlags(inputs) {
  const required = inputs.filter((i) => i.required);
  if (required.length === 0) return "";
  return required.map((i) => `--input ${i.cli}=@${i.kind === "audio" ? "take.mp3" : "photo.jpg"}`).join(" ");
}

export function loadRecipeNote(root, slug) {
  const p = join(root, "graphs", `${slug}.NOTE.txt`);
  try {
    const body = readFileSync(p, "utf8");
    const lines = body.split("\n");
    if (lines[0].trim() !== "# recipe-note") return "";
    return lines.slice(1).join("\n").trim();
  } catch {
    return "";
  }
}

export function renderRecipe({ slug, title, graphRel, shareUrl, inputs, note }) {
  const graphPath = graphRel;
  const flags = runFlags(inputs);
  const runSuffix = flags ? ` ${flags} --out ./out` : " --out ./out";
  const inputTable =
    inputs.length === 0
      ? "_No author-facing text / upload / choice inputs — `inspect` still lists settings._"
      : [
          "| Input | Kind | Stable key | Notes |",
          "| --- | --- | --- | --- |",
          ...inputs.map(inputRow),
        ].join("\n");

  const overrideHint = inputs.some((i) => !i.required)
    ? [
        "",
        "Override a committed brief with `--input <stable-key>=…` (or the input's display name). Example:",
        "",
        "```bash",
        `npx nanoodle run "${shareUrl}" --input ${inputs.find((i) => !i.required).cli}="your override" --out ./out`,
        "```",
        "",
      ].join("\n")
    : "\n\n";

  const notesBlock = note
    ? `
## Notes

${note}

`
    : "";

  return `# ${title}

Committed graph: [\`${graphPath}\`](../${graphPath}) · [Open in nanoodle](${shareUrl})

\`inspect\` is **offline and free** (no API key). \`run\` is bring-your-own-key: export \`NANOGPT_API_KEY\` (or pass \`--key\` / \`--env-file\`) and it **spends NanoGPT balance**. Quote share URLs — \`#\` starts a comment in most shells. \`#g=\` / \`#j=\` / \`#a=\` all load via \`Workflow.load\` and the CLI.

Full guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).
${notesBlock}
## Inputs

${inputTable}

## Inspect (offline, no key)

\`\`\`bash
npx nanoodle inspect ${graphPath}
npx nanoodle inspect "${shareUrl}"

nanoodle-py inspect ${graphPath}
nanoodle-py inspect "${shareUrl}"
# or: python -m nanoodle inspect ${graphPath}
\`\`\`

## Run (spends balance)

\`\`\`bash
export NANOGPT_API_KEY=...          # nano-gpt.com key; required for run, not inspect

npx nanoodle run "${shareUrl}"${runSuffix}
nanoodle-py run "${shareUrl}"${runSuffix}
# or: python -m nanoodle run "${shareUrl}"${runSuffix}
\`\`\`
${overrideHint}Install names: \`npm i nanoodle\` (not \`nanoodle-js\`) · \`pip install nanoodle\`. Same graph, same semantics: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
`;

}

export function renderIndex(entries) {
  const rows = entries
    .map((e) => {
      const req = e.inputs.filter((i) => i.required).map((i) => i.key);
      const need = req.length ? `needs ${req.join(", ")}` : "defaults in graph";
      return `| [${e.title}](${e.slug}.md) | [\`${e.graphRel}\`](../${e.graphRel}) | ${need} |`;
    })
    .join("\n");

  return `# Run headless

One recipe per Keep graph. Each file has offline \`inspect\` and paid \`run\` one-liners for the JavaScript and Python packages, using a share link regenerated from the committed graph.

Do not hand-edit these files — run \`node scripts/make-recipes.mjs\` after changing a graph. \`npm test\` checks each recipe's share link against \`graphs/\`.

\`inspect\` never calls the API. \`run\` needs \`NANOGPT_API_KEY\` and spends NanoGPT balance. Guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

| Recipe | Graph | First-click |
| --- | --- | --- |
${rows}

Install: \`npm i nanoodle\` · \`pip install nanoodle\`. Run anywhere: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
`;
}

export function collectRecipes(root = ROOT) {
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const titles = titlesFromReadme(readme);
  const files = readdirSync(join(root, "graphs"))
    .filter((f) => f.endsWith(".noodle-graph.json"))
    .sort();

  const entries = [];
  for (const f of files) {
    const graphRel = `graphs/${f}`;
    const slug = slugFromGraphPath(graphRel);
    const graph = JSON.parse(readFileSync(join(root, graphRel), "utf8"));
    const shareUrl = makeLink(graph);
    const inputs = authorInputs(graph);
    const title = titles.get(graphRel) || slug;
    const note = loadRecipeNote(root, slug);
    entries.push({ slug, title, graphRel, shareUrl, inputs, graph, note });
  }
  return entries;
}

export function generatedFiles(root = ROOT) {
  const entries = collectRecipes(root);
  const files = { "recipes/README.md": renderIndex(entries) };
  for (const e of entries) {
    files[`recipes/${e.slug}.md`] = renderRecipe(e);
  }
  return { entries, files };
}

export function writeRecipes(root = ROOT) {
  const { entries, files } = generatedFiles(root);
  mkdirSync(join(root, "recipes"), { recursive: true });
  for (const [rel, body] of Object.entries(files)) {
    writeFileSync(join(root, rel), body);
  }
  return { entries, files };
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const { entries } = writeRecipes();
  console.log(`✓ wrote ${entries.length} recipe(s) + recipes/README.md`);
}
