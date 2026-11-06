#!/usr/bin/env node
// Run one explicitly selected case; preserve every node output, including failed attempts.
// Default: offline inspection. --run makes paid provider calls with NANOGPT_API_KEY.
import { readFile, mkdir, mkdtemp, writeFile, rename } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const safe = value => String(value).replace(/[^a-zA-Z0-9_-]/g, '-');
const args = process.argv.slice(2);
const slug = args.shift();
const usage = 'Usage: node scripts/capture-example.mjs <slug> [--case default] [--executor /path/to/src/index.mjs] [--catalogs /path] [--out /path] [--timeout 900000] [--run]';
if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw Error(usage);
const options = new Map();
const valueFlags = new Set(['--case', '--executor', '--catalogs', '--out', '--timeout']);
for (let i = 0; i < args.length; i++) {
  const key = args[i];
  if ((!valueFlags.has(key) && key !== '--run') || options.has(key)) throw Error('Unknown or duplicate argument: ' + key);
  if (key === '--run') { options.set(key, true); continue; }
  const value = args[++i];
  if (!value || value.startsWith('--')) throw Error(key + ' requires a value');
  options.set(key, value);
}
const flag = (key, fallback) => options.get(key) ?? fallback;
const timeoutMs = Number(flag('--timeout', '900000'));
if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0 || timeoutMs > 2147483647) throw Error('--timeout must be an integer from 1 to 2147483647 milliseconds');
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
if (!flag('--run')) process.exit(0);
if (!process.env.NANOGPT_API_KEY) throw Error('NANOGPT_API_KEY required');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const parent = join(resolve(flag('--out', join(root, 'evidence'))), slug);
await mkdir(parent, { recursive: true });
const dir = await mkdtemp(join(parent, safe(id) + '-' + stamp + '-'));
await writeFile(join(dir, 'graph.json'), bytes);
await writeFile(join(dir, 'inputs.json'), JSON.stringify(selected.inputs || {}, null, 2) + '\n');
await writeFile(join(dir, 'criteria.json'), JSON.stringify(selected, null, 2) + '\n');
const started = Date.now();
const events = [];
let result, executionError;
const records = [], captureErrors = [];
let state = 'running';
// Atomic checkpoints leave the last valid receipt readable after interruption.
// No raw executor object (which may carry account data) is serialized.
async function checkpoint() {
  const summary = { slug, case: id, state, recordedAt: new Date().toISOString(), elapsedMs: Date.now() - started,
    graphSha256: sha(bytes), costUsd: result?.costUsd ?? null, costExact: result?.costExact ?? false,
    executionError, errors: result?.errors || [], captureErrors, events,
    publicOutputs: wf.outputs.map(o => ({ key: o.key, nodeId: o.nodeId })), nodes: records,
    review: 'Unreviewed. Successful execution and nonempty files do not establish creative quality.' };
  await writeFile(join(dir, 'run.json.tmp'), JSON.stringify(summary, null, 2) + '\n');
  await rename(join(dir, 'run.json.tmp'), join(dir, 'run.json'));
  return summary;
}
await checkpoint();
console.log(JSON.stringify({ evidence: dir, state }));
try {
  result = await wf.run(selected.inputs || {}, { timeoutMs,
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

if (result) {
  for (const node of graph.nodes) {
    const rec = result.nodes[node.id];
    if (rec) records.push({ id: node.id, name: node.name, type: node.type, model: node.fields?.model,
      status: rec.status, costUsd: rec.costUsd, ms: rec.ms, error: rec.error, outputs: [] });
  }
}
state = 'capturing';
await checkpoint();
if (result) {
  for (const node of graph.nodes) {
    const rec = result.nodes[node.id];
    if (!rec) continue;
    const outputs = records.find(n => n.id === node.id).outputs;
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
      await checkpoint();
    }
    await checkpoint();
  }
}
for (const output of wf.outputs) {
  const record = records.find(n => n.id === output.nodeId);
  const primary = output.ports?.[0]?.name;
  if (record?.status !== 'done' || !record.outputs.some(o => !primary || o.port === primary)) {
    captureErrors.push('Missing promised output: ' + output.key);
  }
}
state = !result || executionError || captureErrors.length || result.errors?.length ? 'failed' : 'complete';
const summary = await checkpoint();
console.log(JSON.stringify({ evidence: dir, state, costUsd: summary.costUsd, costExact: summary.costExact,
  executionError, captureErrors, errorCount: summary.errors.length }));
if (!result || executionError || captureErrors.length || summary.errors.length) process.exitCode = 1;
