#!/usr/bin/env node
// Run one explicitly selected case; preserve every node output, including failed attempts.
// Default: offline inspection. --run makes paid provider calls with NANOGPT_API_KEY.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const safe = value => String(value).replace(/[^a-zA-Z0-9_-]/g, '-');
const args = process.argv.slice(2);
const flag = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const slug = args[0];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw Error('Usage: node scripts/capture-example.mjs <slug> [--case default] [--executor /path/to/src/index.mjs] [--catalogs /path] [--run]');
const api = await import(flag('--executor') ? pathToFileURL(resolve(flag('--executor'))).href : 'nanoodle');
const bytes = await readFile(join(root, 'graphs', slug + '.noodle-graph.json'));
const graph = JSON.parse(bytes);
const fixture = JSON.parse(await readFile(join(root, 'fixtures', slug + '.cases.json'), 'utf8'));
const cases = Array.isArray(fixture) ? fixture : fixture.cases;
const id = flag('--case', cases[0]?.id || cases[0]?.name);
const selected = cases.find(c => (c.id || c.name) === id);
if (!selected) throw Error('Unknown case: ' + id);
const catalogs = {};
if (flag('--catalogs')) {
  for (const kind of ['chat', 'image', 'video', 'audio']) {
    const json = JSON.parse(await readFile(join(flag('--catalogs'), kind + '.json'), 'utf8'));
    catalogs[kind] = Array.isArray(json) ? json : json.data;
  }
}
const wf = new api.Workflow(graph, { catalog: flag('--catalogs') ? catalogs : undefined });
if (wf.warnings.length) throw Error(wf.warnings.join('\n'));
const paidNodes = graph.nodes.filter(n => api.NODE_TYPES[n.type]?.network);
if (flag('--catalogs')) {
  for (const n of paidNodes) {
    const kind = ['llm', 'vision'].includes(n.type) ? 'chat' : ['image', 'edit', 'inpaint', 'draw'].includes(n.type) ? 'image' : ['tvideo', 'ivideo', 'vedit', 'lipsync'].includes(n.type) ? 'video' : 'audio';
    const model = catalogs[kind].find(m => m.id === n.fields.model);
    if (!model) throw Error('Model missing from live catalog: ' + n.fields.model);
    if ((n.type === 'vision' || graph.links.some(l => l.to.node === n.id && /^img\d+$/.test(l.to.port))) && !model.capabilities?.vision) throw Error('Model cannot read images: ' + n.fields.model);
  }
}
console.log(JSON.stringify({ slug, case: id, paidCalls: paidNodes.length,
  outputs: wf.outputs.map(o => o.key), estimate: flag('--catalogs') ? api.estimateGraphCost(wf.graph, catalogs) : null,
  note: 'Forecasts are not spending caps. Only --run executes. Inspection does not fetch catalogs.' }));
if (!args.includes('--run')) process.exit(0);
if (!process.env.NANOGPT_API_KEY) throw Error('NANOGPT_API_KEY required');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dir = join(resolve(flag('--out', join(root, 'evidence'))), slug, safe(id) + '-' + stamp);
await mkdir(dir, { recursive: true });
await writeFile(join(dir, 'graph.json'), bytes);
await writeFile(join(dir, 'inputs.json'), JSON.stringify(selected.inputs || {}, null, 2) + '\n');
await writeFile(join(dir, 'criteria.json'), JSON.stringify(selected, null, 2) + '\n');
const started = Date.now();
const events = [];
let result, executionError;
try {
  result = await wf.run(selected.inputs || {}, { timeoutMs: Number(flag('--timeout', '900000')),
    onProgress(event) {
      // Deliberate allow-list: never store headers, credentials, account balances or requests.
      if (['node-start', 'node-done', 'node-error', 'prompt-trimmed'].includes(event.type)) {
        const entry = { type: event.type, node: event.nodeId, ms: event.ms, costUsd: event.costUsd };
        events.push(entry);
        console.log(JSON.stringify(entry));
      }
    },
  });
} catch (error) { result = error.result; executionError = error.message; }

const records = [], captureErrors = [];
if (result) {
  for (const node of graph.nodes) {
    const rec = result.nodes[node.id];
    if (!rec) continue;
    const outputs = [];
    // Image runners return both the primary `image` and an `images` array.
    // Preserve each variant; passing the array itself to MediaRef loses evidence.
    const values = Object.entries(rec.out || {}).flatMap(([port, value]) =>
      Array.isArray(value) ? value.map((item, i) => [`${port}-${i + 1}`, item]) : [[port, value]]);
    for (const [port, value] of values) {
      if (value == null || value === '') { captureErrors.push(`${node.id}.${port}: empty output`); continue; }
      const media = /^(data:|https?:)/.test(String(value)) && port !== 'text';
      try {
        let data, ext, kind;
        if (media) {
          const ref = new api.MediaRef(value, { fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(60000) }) });
          data = await ref.bytes();
          ext = api.extForMime(ref.mime || api.sniffMime(data));
          kind = (ref.mime || api.sniffMime(data)).split('/')[0];
        } else { data = Buffer.from(String(value)); ext = 'txt'; kind = 'text'; }
        if (!data.length || (kind === 'text' && !Buffer.from(data).toString().trim())) throw Error('empty bytes');
        const file = `${safe(node.id)}-${safe(port)}.${ext}`;
        await writeFile(join(dir, file), data);
        outputs.push({ port, kind, file, bytes: data.length, sha256: sha(data) });
      } catch (error) { captureErrors.push(`${node.id}.${port}: ${error.message}`); }
    }
    records.push({ id: node.id, name: node.name, type: node.type, model: node.fields?.model,
      status: rec.status, costUsd: rec.costUsd, ms: rec.ms, error: rec.error, outputs });
  }
}
for (const output of wf.outputs) {
  const record = records.find(n => n.id === output.nodeId);
  if (!record?.outputs.length) captureErrors.push('Missing promised output: ' + output.key);
}
const summary = { slug, case: id, recordedAt: new Date().toISOString(), elapsedMs: Date.now() - started,
  graphSha256: sha(bytes), costUsd: result?.costUsd ?? null, costExact: result?.costExact ?? false,
  executionError, errors: result?.errors || [], captureErrors, events,
  publicOutputs: wf.outputs.map(o => ({ key: o.key, nodeId: o.nodeId })), nodes: records,
  review: 'Unreviewed. Successful execution and nonempty files do not establish creative quality.' };
await writeFile(join(dir, 'run.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({ evidence: dir, costUsd: summary.costUsd, costExact: summary.costExact,
  executionError, captureErrors, errorCount: summary.errors.length }));
if (!result || executionError || captureErrors.length || summary.errors.length) process.exitCode = 1;
