import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const runner = fileURLToPath(new URL('../scripts/capture-example.mjs', import.meta.url));

test('capture retains intermediate variants and partial failures without account data', async t => {
  for (const mode of ['complete', 'empty', 'failed']) {
    await t.test(mode, async () => {
      const dir = await mkdtemp(join(tmpdir(), 'noodle-capture-'));
      try {
        // No server or network: this module is the executor boundary.
        const module = join(dir, 'executor.mjs');
        await writeFile(module, [
          'const mode = ' + JSON.stringify(mode) + ';',
          "export const NODE_TYPES = {image:{network:true},ivideo:{network:true},vedit:{network:true}};",
          "export class MediaRef { constructor(url) { if (typeof url !== 'string') throw Error('media is not a string'); this.url=url; this.mime='image/png'; } async bytes() { return Buffer.from(this.url.split(',')[1], 'base64'); } }",
          "export const extForMime = () => 'png'; export const sniffMime = () => 'image/png';",
          "export class Workflow { constructor(graph) { this.graph=graph; this.warnings=[]; this.outputs=[{key:'Final',nodeId:'n5'}]; }",
          "async run() { const media='data:image/png;base64,aW1hZ2U=';",
          "const result={costUsd:0.02,costExact:true,remainingBalance:123456.789,errors:mode==='failed'?[{nodeId:'n5',message:'fixture generation failed'}]:[],",
          "nodes:{n3:{status:'done',out:{image:media,images:[media,'data:image/png;base64,dmFyaWFudA==']},costUsd:0.01,ms:1},",
          "n5:{status:mode==='failed'?'error':'done',out:mode==='failed'?null:{text:mode==='empty'?'   ':'final output'},costUsd:0.01,ms:1}}};",
          "if(mode==='failed') throw Object.assign(Error('fixture generation failed'),{result}); return result; } }",
        ].join('\n'));
        const run = spawnSync(process.execPath, [runner, 'tiny-world-film', '--executor', module,
          '--out', dir, '--run'], { encoding: 'utf8', env: { ...process.env, NANOGPT_API_KEY: 'capture-test-dummy-key' } });
        assert.equal(run.status, mode === 'complete' ? 0 : 1, run.stdout + run.stderr);
        const last = JSON.parse(run.stdout.trim().split('\n').at(-1));
        const summaryText = await readFile(join(last.evidence, 'run.json'), 'utf8');
        assert.ok(!summaryText.includes('123456.789'), 'do not retain account balance');
        assert.ok(!summaryText.includes('capture-test-dummy-key'), 'do not retain credentials');
        const summary = JSON.parse(summaryText);
        const image = summary.nodes.find(n => n.id === 'n3');
        assert.equal(image.outputs.length, 3, 'primary and both array variants survive');
        assert.equal(await readFile(join(last.evidence, 'n3-images-2.png'), 'utf8'), 'variant');
        assert.equal(summary.costUsd, 0.02, 'partial failures retain incurred cost');
        if (mode !== 'complete') assert.ok(summary.captureErrors.length, 'missing/empty promised outputs fail');
        if (mode === 'failed') assert.match(summary.executionError, /fixture generation failed/);
      } finally { await rm(dir, { recursive: true, force: true }); }
    });
  }
});
