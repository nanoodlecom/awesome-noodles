import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { checkRecipes } from '../scripts/check-recipes.mjs';
import { writeRecipes } from '../scripts/make-recipes.mjs';
import { makeLink } from '../scripts/make-link.mjs';

test('recipe checks reject stale commands, notes, later links, indexes and missing directories', () => {
  const root = mkdtempSync(join(tmpdir(), 'noodle-recipes-'));
  try {
    mkdirSync(join(root, 'graphs'));
    const graph = { v: 1, nodes: [{ id: 'brief', name: 'Brief', type: 'text', fields: { text: 'hello' } }], links: [] };
    writeFileSync(join(root, 'graphs/demo.noodle-graph.json'), JSON.stringify(graph));
    writeFileSync(join(root, 'graphs/demo.NOTE.txt'), '# recipe-note\nA required warning.\n');
    writeFileSync(join(root, 'README.md'), '**Demo** (graphs/demo.noodle-graph.json)');
    writeRecipes(root);
    assert.deepEqual(checkRecipes(root).problems, []);
    const path = join(root, 'recipes/demo.md');
    const body = readFileSync(path, 'utf8');
    const goodLink = makeLink(graph);
    const badLink = makeLink({ ...graph, nodes: [] });
    for (const changed of [
      body.replace('nanoodle-py run', 'nanoodle-py inspect'),
      body.replace('A required warning.', 'An obsolete warning.'),
      body.slice(0, body.lastIndexOf(goodLink)) + body.slice(body.lastIndexOf(goodLink)).replace(goodLink, badLink),
    ]) {
      writeFileSync(path, changed);
      assert(checkRecipes(root).problems.some(p => p.startsWith('recipes/demo.md:')), 'stale recipe must fail');
    }
    // Alternate gzip encodings of identical JSON are deliberately accepted.
    const alternate = 'https://nanoodle.com/#g=' + gzipSync(JSON.stringify(graph), { level: 1 }).toString('base64url');
    writeFileSync(path, body.replaceAll(goodLink, alternate));
    assert.deepEqual(checkRecipes(root).problems, []);
    writeFileSync(join(root, 'recipes/README.md'), '');
    assert(checkRecipes(root).problems.some(p => p.startsWith('recipes/README.md:')));
    rmSync(join(root, 'recipes'), { recursive: true });
    assert.equal(checkRecipes(root).problems.length, 2, 'missing directory is reported without crashing');
  } finally { rmSync(root, { recursive: true, force: true }); }
});
