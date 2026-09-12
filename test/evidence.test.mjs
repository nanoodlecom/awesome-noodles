// Historical artifacts must not silently change while retaining their reviews.
// These checks establish integrity and completeness, never creative quality.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../evidence');
const read = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const selection = read('selection.json');
const ledger = read('cost-ledger.json');
const selected = Object.entries(selection).flatMap(([slug, cases]) =>
  Object.values(cases).map(folder => `${slug}/${folder}/run.json`));

test('saved graphs and every captured artifact match their recorded bytes', () => {
  for (const entry of ledger.runs) {
    const run = read(entry.run), dir = dirname(entry.run);
    assert.equal(sha(readFileSync(join(root, dir, 'graph.json'))), run.graphSha256, entry.run);
    for (const node of run.nodes) for (const output of node.outputs) {
      assert.match(output.file, /^[\w-]+\.[\w]+$/, 'capture files stay within the run');
      const bytes = readFileSync(join(root, dir, output.file));
      assert.equal(bytes.length, output.bytes, `${dir}/${output.file}: size`);
      assert.equal(sha(bytes), output.sha256, `${dir}/${output.file}: hash`);
    }
  }
});

test('selected runs have their promised outputs and a separate qualified review', () => {
  assert.deepEqual(ledger.runs.filter(r => r.selected).map(r => r.run).sort(), selected.sort());
  for (const path of selected) {
    const run = read(path), review = read(join(dirname(path), 'review.json'));
    assert.deepEqual(run.errors, [], path);
    assert.deepEqual(run.captureErrors, [], path);
    assert.ok(!run.executionError, path);
    for (const output of run.publicOutputs) {
      const node = run.nodes.find(n => n.id === output.nodeId);
      assert.equal(node?.status, 'done', `${path}: ${output.key}`);
      assert.ok(node.outputs.length, `${path}: missing ${output.key}`);
    }
    assert.equal(review.graphSha256, run.graphSha256, path);
    assert.equal(review.case, run.case, path);
    assert.ok(review.methods.length && review.observations.length && review.limitations.length, path);
  }
});

test('cost ledger includes rejected attempts and separate model-assisted reviews', () => {
  let calls = 0, generationCost = 0, audioCost = 0;
  for (const entry of ledger.runs) {
    const run = read(entry.run);
    assert.equal(entry.costUsd, run.costUsd);
    assert.deepEqual(entry.executionErrors, run.errors);
    assert.deepEqual(entry.captureErrors, run.captureErrors);
    calls += run.nodes.filter(n => n.model && n.status === 'done').length;
    generationCost += run.costUsd;
  }
  for (const entry of ledger.audioReviews) {
    const review = read(entry.review);
    assert.equal(entry.costUsd, review.costUsd);
    assert.equal(review.kind, 'model-assisted audio review');
    audioCost += review.costUsd;
  }
  assert.equal(ledger.generationAttempts, ledger.runs.length);
  assert.equal(ledger.completedGenerationModelCalls, calls);
  assert.ok(Math.abs(ledger.generationCostUsd - generationCost) < 1e-10);
  assert.ok(Math.abs(ledger.audioReviewCostUsd - audioCost) < 1e-10);
  assert.ok(Math.abs(ledger.totalCostUsd - generationCost - audioCost) < 1e-10);
});
