#!/usr/bin/env node
// Offline composition checks. Every provider request is intercepted; no account or network.
// Run: node scripts/check-composition.mjs [--executor /path/to/nanoodle/src/index.mjs]
// With no override, install the optional executor separately: npm install --no-save nanoodle.
// These checks prove routing and usable output containers, not generated-media quality.
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const slugs = ['pocket-mystery', 'storyboard-relay', 'tiny-world-film'];
const MOCK_ORIGIN = 'https://composition.invalid';
const NETWORK_TYPES = new Set(['llm', 'vision', 'image', 'edit', 'inpaint', 'tvideo', 'ivideo', 'vedit', 'lipsync', 'music', 'remix', 'tts', 'transcribe']);
const MUSE = 'meta/muse-image/text-to-image';
const MUSE_EDIT = 'meta/muse-image/edit';
const BANANA = 'nano-banana-edit';
const GEMINI = 'google/gemini-3.8-flash';
const GLM = 'z-ai/glm-5.3-flash';
const WAN = 'wan-video-image-to-video';
const FOLEY = 'mirelo-ai/sfx1.6/video-to-video';
const CHAT = '/api/v1/chat/completions';
const IMAGE = '/v1/images/generations';
const VIDEO = '/api/generate-video';

const contracts = {
  'pocket-mystery': {
    models: [['room', 'image', MUSE], ['observe', 'llm', GEMINI], ['mystery', 'llm', GLM]],
    inputs: [
      ['Room brief', 'brief', 'text', false],
      ['Read the actual room', 'observe', 'prompt', false],
      ['System prompt', 'observe', 'system', true],
      ['Player handout and GM solution', 'mystery', 'system', true],
    ],
    outputs: [
      ['Room illustration', 'illustration', 'resize', 'image:image'],
      ['Visible landmarks', 'observations', 'join', 'text:text'],
      ['Player handout and GM solution', 'mystery', 'llm', 'text:text'],
    ],
    wires: [
      ['brief', 'text', 'room', 'prompt'], ['room', 'image', 'observe', 'img1'],
      ['observe', 'text', 'mystery', 'prompt'], ['room', 'image', 'illustration', 'image'],
      ['observe', 'text', 'observations', 'a'],
    ],
  },
  'storyboard-relay': {
    models: [['frame-one', 'image', MUSE], ['frame-two', 'edit', BANANA],
      ['review', 'llm', GEMINI], ['repair', 'edit', MUSE_EDIT], ['final-review', 'llm', GEMINI]],
    inputs: [
      ['First scene', 'first-brief', 'text', false], ['Next beat', 'next-beat', 'text', false],
      ['Continuity rules', 'rules', 'text', false],
      ['Draft continuity check', 'review', 'system', true],
      ['Continuity notes', 'final-review', 'system', true],
    ],
    outputs: [
      ['Frame 1', 'export-one', 'resize', 'image:image'],
      ['Draft frame 2', 'export-draft', 'resize', 'image:image'],
      ['Frame 2', 'export-two', 'resize', 'image:image'],
      ['Continuity notes', 'final-review', 'llm', 'text:text'],
    ],
    wires: [
      ['first-brief', 'text', 'frame-one', 'prompt'],
      ['first-brief', 'text', 'next-prompt', 'a'], ['next-beat', 'text', 'next-prompt', 'b'],
      ['next-prompt', 'text', 'edit-brief', 'a'], ['rules', 'text', 'edit-brief', 'b'],
      ['edit-brief', 'text', 'frame-two', 'prompt'], ['frame-one', 'image', 'frame-two', 'image'],
      ['edit-brief', 'text', 'review', 'prompt'], ['frame-one', 'image', 'review', 'img1'],
      ['frame-two', 'image', 'review', 'img2'], ['edit-brief', 'text', 'repair-prompt', 'a'],
      ['review', 'text', 'repair-prompt', 'b'], ['repair-prompt', 'text', 'repair', 'prompt'],
      ['frame-two', 'image', 'repair', 'image'], ['frame-one', 'image', 'repair', 'image2'],
      ['edit-brief', 'text', 'final-review', 'prompt'],
      ['frame-one', 'image', 'final-review', 'img1'], ['repair', 'image', 'final-review', 'img2'],
      ['frame-one', 'image', 'export-one', 'image'],
      ['frame-two', 'image', 'export-draft', 'image'], ['repair', 'image', 'export-two', 'image'],
    ],
  },
  'tiny-world-film': {
    models: [['n3', 'image', MUSE], ['n4', 'ivideo', WAN], ['n5', 'vedit', FOLEY]],
    inputs: [['World', 'n1', 'text', false], ['Motion', 'n2', 'text', false]],
    outputs: [['First frame', 'n6', 'resize', 'image:image'], ['Film with foley', 'n5', 'vedit', 'video:video']],
    wires: [
      ['n1', 'text', 'n3', 'prompt'], ['n3', 'image', 'n4', 'image'],
      ['n2', 'text', 'n4', 'prompt'], ['n4', 'video', 'n5', 'video'],
      ['n3', 'image', 'n6', 'image'],
    ],
  },
};
const sorted = entries => [...entries].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
const wire = link => [link.from.node, link.from.port, link.to.node, link.to.port];
const inputContract = entry => [entry.key, entry.nodeId, entry.field, entry.optional];
const outputContract = entry => [entry.key, entry.nodeId, entry.type, entry.ports.map(p => p.name + ':' + p.type).join(',')];

export async function loadExecutor(spec) {
  if (!spec) return import('nanoodle');
  let target = resolve(spec);
  if ((await stat(target)).isDirectory()) {
    const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
    target = resolve(target, pkg.main || 'src/index.mjs');
  }
  return import(pathToFileURL(target).href);
}
export function missingOptionalExecutor(error) {
  return error?.code === 'ERR_MODULE_NOT_FOUND' && /Cannot find package 'nanoodle'/.test(error.message);
}
export async function readComposition(slug) {
  assert(slugs.includes(slug), 'Unknown composition: ' + slug);
  const graph = JSON.parse(await readFile(join(root, 'graphs', slug + '.noodle-graph.json'), 'utf8'));
  const fixtures = JSON.parse(await readFile(join(root, 'fixtures', slug + '.cases.json'), 'utf8'));
  return { graph, cases: Array.isArray(fixtures) ? fixtures : fixtures.cases };
}

// Pins intentional stage types, media roles and publicly promised sinks. Model refreshes
// should update these expectations together with their execution evidence.
export function checkCompositionSource(slug, graph) {
  const contract = contracts[slug];
  assert(contract, 'No composition contract: ' + slug);
  assert.equal(new Set(graph.nodes.map(n => n.id)).size, graph.nodes.length, 'Duplicate node IDs');
  assert.equal(new Set(graph.links.map(l => l.id)).size, graph.links.length, 'Duplicate link IDs');
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  for (const link of graph.links) {
    assert(byId.has(link.from.node) && byId.has(link.to.node), 'Link references a missing node');
    assert(link.from.port && link.to.port, 'Link needs source and target ports');
  }
  const paid = graph.nodes.filter(n => NETWORK_TYPES.has(n.type));
  assert.deepEqual(sorted(paid.map(n => [n.id, n.type, n.fields.model])), sorted(contract.models),
    slug + ': a model stage was removed, added, retargeted or assigned the wrong node type');
  for (const [key, nodeId, type] of contract.outputs) {
    assert.equal(byId.get(nodeId)?.type, type, key + ': missing or incorrectly typed output node');
  }
  for (const [key, nodeId, field] of contract.inputs) {
    assert(byId.has(nodeId), key + ': missing input node');
    if (field === 'text') assert.equal(byId.get(nodeId).type, 'text', key + ': expected an editable text input');
  }
  for (const node of graph.nodes) {
    assert(NETWORK_TYPES.has(node.type) || ['comment', 'text', 'join', 'resize'].includes(node.type),
      slug + ': unexpected node type ' + node.type);
  }
  assert.deepEqual(sorted(graph.links.map(wire)), sorted(contract.wires),
    slug + ': changed composition wiring, including media order and output preservation');
  if (slug === 'pocket-mystery') {
    assert.deepEqual(graph.links.filter(l => l.to.node === 'observe').map(wire),
      [['room', 'image', 'observe', 'img1']], 'Observer must receive pixels without a room-brief shortcut');
    assert.deepEqual(graph.links.filter(l => l.to.node === 'mystery').map(wire),
      [['observe', 'text', 'mystery', 'prompt']], 'Puzzle writer must receive actual observations only');
  }
  if (slug === 'storyboard-relay') {
    assert(!graph.links.some(l => l.from.node === 'review' && l.to.node === 'final-review'),
      'Final critic must inspect repaired pixels, not recycle the old verdict');
  }
  return contract.models.length;
}

function userMessage(body) {
  const messages = body.messages.filter(m => m.role === 'user');
  assert.equal(messages.length, 1, 'Expected one user message');
  return messages[0].content;
}
function userText(body) {
  const content = userMessage(body);
  return typeof content === 'string' ? content : content.filter(p => p.type === 'text').map(p => p.text).join('\n');
}
function imageParts(body) {
  const content = userMessage(body);
  return Array.isArray(content) ? content.filter(p => p.type === 'image_url').map(p => p.image_url.url) : [];
}
function allText(body) {
  return body.messages.map(m => typeof m.content === 'string' ? m.content :
    m.content.filter(p => p.type === 'text').map(p => p.text).join('\n')).join('\n');
}
function jsonResponse(body) {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
}
const textResponse = text => jsonResponse({ choices: [{ message: { content: text } }], cost: 0 });
const imageResponse = url => jsonResponse({ data: [{ b64_json: url.split(',')[1] }], cost: 0 });

async function makeMock(slug, caseId, variant, draftHasIssue) {
  const png = await Promise.all(['red', 'blue', 'green'].map(name =>
    readFile(join(root, 'test', 'fixtures', 'composition-' + name + '.png'))));
  const images = (variant ? [png[1], png[2], png[0]] : png).map(bytes => 'data:image/png;base64,' + bytes.toString('base64'));
  const silentBytes = await readFile(join(root, 'test', 'fixtures', 'composition-silent.mp4'));
  const soundedBytes = await readFile(join(root, 'test', 'fixtures', 'composition-sounded.mp4'));
  const suffix = encodeURIComponent(slug + '-' + caseId);
  const silentUrl = MOCK_ORIGIN + '/media/' + suffix + '-silent.mp4';
  const soundedUrl = MOCK_ORIGIN + '/media/' + suffix + '-sounded.mp4';
  // Synthetic observations deliberately differ from the authored image brief. Passing this
  // exact answer onward detects a hidden shortcut from generation prompt to puzzle writer.
  const observation = JSON.stringify({
    scene: 'Synthetic routing fixture ' + caseId,
    landmarks: [
      { id: 'A', label: 'red box', location: 'left', appearance: 'large red square' },
      { id: 'B', label: 'blue disc', location: 'middle', appearance: 'large blue circle' },
      { id: 'C', label: 'green tower', location: 'right', appearance: 'tall green rectangle' },
    ], warnings: [],
  });
  const puzzle = 'TITLE\nSynthetic routing fixture\nPLAYER HANDOUT\nUse the observed red box, blue disc and green tower.\nGM ONLY - SPOILERS\nThis is mocked text, not a generated or playtested puzzle.';
  const draftReview = draftHasIssue
    ? 'DRAFT_ONLY_REPAIR_CANARY: the next frame duplicates a story prop. Preserve the new action and remove only the duplicate.'
    : 'DRAFT_ONLY_PRESERVE_CANARY: no meaningful mismatch is visible; preserve the draft.';
  const finalReview = 'FINAL_PIXEL_REVIEW_CANARY: a small detail is still unclear in the repaired frame. Both images remain available; no further repair is requested.';
  const posts = [], polls = [], downloads = [], violations = [];
  let chatCount = 0;
  const mockFetch = async (address, options = {}) => {
    const url = new URL(typeof address === 'string' ? address : address.url);
    const method = (options.method || 'GET').toUpperCase();
    try {
      assert.equal(url.origin, MOCK_ORIGIN, 'Only the injected mock origin is allowed');
      if (method === 'GET' && [silentUrl, soundedUrl].includes(url.href)) {
        downloads.push(url.href);
        return new Response(url.href === silentUrl ? silentBytes : soundedBytes,
          { headers: { 'content-type': 'video/mp4' } });
      }
      if (method === 'GET' && url.pathname === '/api/video/status') {
        const id = url.searchParams.get('requestId');
        assert(['synthetic-silent', 'synthetic-foley'].includes(id), 'Unknown mock video job');
        polls.push(id);
        return jsonResponse({ status: 'COMPLETED', output: { video: { url: id === 'synthetic-silent' ? silentUrl : soundedUrl } } });
      }
      assert.equal(method, 'POST', 'Unknown mock HTTP method/path');
      assert([CHAT, IMAGE, VIDEO].includes(url.pathname), 'Unexpected provider route');
      const body = JSON.parse(options.body);
      posts.push({ path: url.pathname, body });
      if (url.pathname === IMAGE) {
        if (body.model === MUSE) return imageResponse(images[0]);
        if (slug === 'storyboard-relay' && body.model === BANANA) return imageResponse(images[1]);
        if (slug === 'storyboard-relay' && body.model === MUSE_EDIT) return imageResponse(images[2]);
      }
      if (url.pathname === CHAT) {
        chatCount++;
        if (slug === 'pocket-mystery' && body.model === GEMINI) return textResponse(observation);
        if (slug === 'pocket-mystery' && body.model === GLM) return textResponse(puzzle);
        if (slug === 'storyboard-relay' && body.model === GEMINI) return textResponse(chatCount === 1 ? draftReview : finalReview);
      }
      if (url.pathname === VIDEO && slug === 'tiny-world-film') {
        if (body.model === WAN) return jsonResponse({ runId: 'synthetic-silent', cost: 0 });
        if (body.model === FOLEY) return jsonResponse({ runId: 'synthetic-foley', cost: 0 });
      }
      assert.fail('Unexpected model or route: ' + body.model + ' at ' + url.pathname);
    } catch (error) {
      violations.push(error.message);
      throw error;
    }
  };
  return { fetch: mockFetch, images, silentUrl, soundedUrl, silentBytes, soundedBytes,
    observation, puzzle, draftReview, finalReview, posts, polls, downloads, violations };
}

function effectiveInput(workflow, inputs, key) {
  return Object.hasOwn(inputs, key) ? inputs[key] : workflow.inputs.find(i => i.key === key)?.def;
}
function request(mock, model, occurrence = 0) {
  const found = mock.posts.filter(p => p.body.model === model)[occurrence];
  assert(found, 'Missing model request: ' + model + ' #' + occurrence);
  return found.body;
}
function contains(actual, expected, message) {
  assert(typeof expected === 'string' && expected.length > 0, 'Missing expected prompt fixture');
  assert(actual.includes(expected), message);
}

async function verifyRun(api, slug, graph, fixture, variant) {
  const mock = await makeMock(slug, fixture.id || fixture.name, variant, variant === 0);
  // No catalog is injected: exported workflows must preserve their authored
  // media settings, including Wan's explicit modelOpts resolution, on their own.
  const wf = new api.Workflow(graph, { apiKey: 'composition-offline-test-key',
    baseUrl: MOCK_ORIGIN, fetch: mock.fetch, quiet: true,
    pollIntervals: { video: 1 }, timeouts: { video: 500 } });
  assert.deepEqual(wf.warnings, [], 'Graph must materialize without warnings');
  assert.deepEqual(wf.inputs.map(inputContract), contracts[slug].inputs, 'Exact derived input contract');
  assert.deepEqual(sorted(wf.outputs.map(outputContract)), sorted(contracts[slug].outputs), 'Exact derived output contract');
  const inputs = fixture.inputs || {};
  const result = await wf.run(inputs, { timeoutMs: 5000 });
  assert.deepEqual(result.errors, [], 'All branches, including local export sinks, must execute');
  assert.deepEqual(mock.violations, [], 'No unexpected requests may be hidden by polling');
  assert.equal(mock.posts.length, contracts[slug].models.length, 'Exact mocked billable-call count');
  assert.deepEqual(mock.posts.map(p => p.body.model), contracts[slug].models.map(row => row[2]),
    'The intended sequential model handoffs must run exactly once');
  for (const post of mock.posts.filter(p => p.path === IMAGE)) {
    assert.equal(post.body.n, 1, 'Each image stage must request one image, without multiplying cost');
  }
  const paidNodes = graph.nodes.filter(n => NETWORK_TYPES.has(n.type));
  for (const n of paidNodes) assert.equal(result.nodes[n.id].status, 'done', n.id + ' did not execute');

  for (const output of wf.outputs) {
    const value = result.get(output.key);
    if (output.ports[0].type === 'text') assert(value.trim().length > 0, output.key + ': empty text');
    else {
      assert(value instanceof api.MediaRef, output.key + ': expected a MediaRef');
      const bytes = await value.bytes();
      assert(bytes.length > 12, output.key + ': empty/invalid media bytes');
      assert.equal(api.sniffMime(bytes), output.ports[0].type === 'image' ? 'image/png' : 'video/mp4',
        output.key + ': wrong media container');
    }
  }

  if (slug === 'pocket-mystery') {
    const brief = effectiveInput(wf, inputs, 'Room brief');
    assert.equal(request(mock, MUSE).prompt, brief, 'Room input must reach image generation');
    assert.equal(request(mock, MUSE).size, '1:1', 'Room illustration must retain its square size');
    const observer = request(mock, GEMINI), writer = request(mock, GLM);
    assert.deepEqual(imageParts(observer), [mock.images[0]], 'Observer must receive the actual generated image');
    assert(!allText(observer).includes(brief), 'Generation brief leaked into the pixel observer');
    assert.equal(userText(writer), mock.observation, 'Puzzle writer must use the returned observations verbatim');
    assert(!allText(writer).includes(brief), 'Generation brief leaked into puzzle writer');
    assert.equal(imageParts(writer).length, 0, 'Text author receives observations rather than an unadvertised image shortcut');
    assert.equal(result.get('Visible landmarks'), mock.observation, 'Observed evidence must remain inspectable');
    assert.equal(result.get('Player handout and GM solution'), mock.puzzle);
  }

  if (slug === 'storyboard-relay') {
    const first = effectiveInput(wf, inputs, 'First scene');
    const next = effectiveInput(wf, inputs, 'Next beat');
    const rules = effectiveInput(wf, inputs, 'Continuity rules');
    const draft = request(mock, BANANA), critique = request(mock, GEMINI);
    const repair = request(mock, MUSE_EDIT), final = request(mock, GEMINI, 1);
    assert.equal(request(mock, MUSE).prompt, first);
    assert.equal(request(mock, MUSE).size, '3:2', 'Opening frame must retain its landscape size');
    assert.equal(draft.size, 'auto', 'Nano Banana must receive its supported auto size');
    assert.equal(repair.size, '3:2', 'Repaired frame must retain its landscape size');
    assert.equal(draft.imageDataUrl, mock.images[0], 'Next scene must use the actual opening frame');
    for (const content of [draft.prompt, userText(critique), repair.prompt, userText(final)]) {
      contains(content, first, 'Opening context was dropped');
      contains(content, next, 'Independent next beat did not reach the story stages');
      contains(content, rules, 'Continuity rules did not reach the story stages');
    }
    assert.deepEqual(imageParts(critique), [mock.images[0], mock.images[1]],
      'Draft reader must see opening then actual draft');
    assert.deepEqual(repair.imageDataUrl, [mock.images[1], mock.images[0]],
      'Repair roles must be actual draft first, original reference second');
    contains(repair.prompt, mock.draftReview, 'Repair did not use the returned draft criticism');
    assert.deepEqual(imageParts(final), [mock.images[0], mock.images[2]],
      'Final reader must see opening and repaired pixels, not the old draft');
    assert(!allText(final).includes(mock.draftReview), 'Final reader was anchored to the old verdict');
    assert.equal(result.get('Continuity notes'), mock.finalReview,
      'Exported notes must come from the independent final reading');
    // Variant 0 reports a draft flaw; variant 1 reports none. Both still perform exactly
    // one fixed repair. Remaining final criticism never removes any of the three images.
    for (const key of ['Frame 1', 'Draft frame 2', 'Frame 2']) assert(result.get(key) instanceof api.MediaRef);
    assert.equal(result.nodes['export-one'].status, 'done');
    assert.equal(result.nodes['export-draft'].status, 'done');
    assert.equal(result.nodes['export-two'].status, 'done');
  }

  if (slug === 'tiny-world-film') {
    const world = effectiveInput(wf, inputs, 'World'), motion = effectiveInput(wf, inputs, 'Motion');
    const animate = request(mock, WAN), foley = request(mock, FOLEY);
    assert.equal(request(mock, MUSE).prompt, world);
    assert.equal(request(mock, MUSE).size, '16:9', 'Miniature image must retain its film size');
    assert.equal(animate.resolution, '480p', 'Wan resolution must survive without a catalog');
    assert.equal(animate.num_frames, 81, 'Wan frame count must retain the bounded default');
    assert.equal(animate.frames_per_second, 16, 'Wan frame rate must retain the roughly five-second request');
    assert.equal(animate.prompt, motion, 'Motion input must reach the video model');
    assert.equal(animate.imageDataUrl, mock.images[0], 'Animation must receive the actual generated still');
    assert.equal(foley.videoUrl, mock.silentUrl, 'Foley must receive the actual completed silent take');
    assert.equal(foley.prompt, '', 'Foley should be driven by video, not the original text');
    assert(!('imageDataUrl' in foley), 'Foley must receive video rather than the still image');
    assert(!JSON.stringify(foley).includes(world) && !JSON.stringify(foley).includes(motion),
      'Text brief was silently substituted for video-conditioned sound');
    assert.equal(result.nodes.n4.out.video, mock.silentUrl, 'Silent intermediate must remain available for capture');
    const silent = new api.MediaRef(result.nodes.n4.out.video, { fetch: mock.fetch });
    assert.deepEqual(Buffer.from(await silent.bytes()), mock.silentBytes, 'Silent intermediate media identity');
    assert.equal(result.get('Film with foley').url, mock.soundedUrl);
    assert.deepEqual(Buffer.from(await result.get('Film with foley').bytes()), mock.soundedBytes,
      'Final film must be the foley result, not an accidental copy of the silent clip');
    assert.deepEqual(mock.polls, ['synthetic-silent', 'synthetic-foley'], 'Both actual video job results must be awaited');
  }
  assert.deepEqual(mock.violations, [], 'Unexpected media downloads are also failures');
  return { slug, case: fixture.id || fixture.name, mockedCalls: mock.posts.length,
    outputs: wf.outputs.map(o => o.key) };
}

export async function runCompositionCases(api, slug) {
  const { graph, cases } = await readComposition(slug);
  checkCompositionSource(slug, graph);
  assert(Array.isArray(cases) && cases.length >= 2, 'Default and different-input cases are required');
  // A regression that accidentally ignores the supplied fetch must fail locally, even
  // for media downloads. This never forwards to the machine's real fetch.
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Unexpected global fetch: composition tests must stay offline'); };
  try {
    const reports = [];
    for (let i = 0; i < cases.length; i++) reports.push(await verifyRun(api, slug, graph, cases[i], i));
    return reports;
  } finally { globalThis.fetch = realFetch; }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log('Usage: node scripts/check-composition.mjs [--executor /path/to/nanoodle/src/index.mjs]\nUses injected HTTP and tiny local media only. No API key or paid calls.');
    return;
  }
  if (args.some((arg, i) => arg !== '--executor' && args[i - 1] !== '--executor')) throw Error('Unknown argument; use --help');
  const at = args.indexOf('--executor');
  if (at >= 0 && !args[at + 1]) throw Error('--executor needs a file or package-directory path');
  let api;
  try { api = await loadExecutor(at >= 0 ? args[at + 1] : undefined); }
  catch (error) {
    if (missingOptionalExecutor(error)) throw Error('Optional nanoodle executor is not installed. Supply --executor /path/to/src/index.mjs or install nanoodle separately. No execution checks ran.');
    throw error;
  }
  let count = 0;
  for (const slug of slugs) {
    for (const report of await runCompositionCases(api, slug)) {
      console.log('PASS ' + report.slug + '/' + report.case + ': ' + report.mockedCalls +
        ' mocked provider calls; exact inputs, outputs and media handoffs checked');
      count++;
    }
  }
  console.log('Passed ' + count + ' offline composition cases. This is routing evidence, not model or output-quality validation.');
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
}
