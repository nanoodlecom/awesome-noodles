import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const runner = fileURLToPath(new URL('../scripts/capture-example.mjs', import.meta.url));

test('capture retains intermediate variants and partial failures without account data', async t => {
  for (const mode of ['complete', 'empty', 'failed', 'interrupted', 'wrong-port']) {
    await t.test(mode, async () => {
      const dir = await mkdtemp(join(tmpdir(), 'noodle-capture-'));
      try {
        // No server or network: this module is the executor boundary.
        const module = join(dir, 'executor.mjs');
        await writeFile(module, [
          'const mode = ' + JSON.stringify(mode) + ';',
          "export const NODE_TYPES = {image:{network:true},ivideo:{network:true},vedit:{network:true}};",
          "export class MediaRef { constructor(url) { if (typeof url !== 'string') throw Error('media is not a string'); this.url=url; this.mime='image/png'; } async bytes() { if(mode==='interrupted') process.exit(27); return Buffer.from(this.url.split(',')[1], 'base64'); } }",
          "export const extForMime = () => 'png'; export const sniffMime = () => 'image/png';",
          "export class Workflow { constructor(graph) { this.graph=graph; this.warnings=[]; this.outputs=[{key:'Final',nodeId:'final-review',ports:[{name:'text',type:'text'}]}]; }",
          "async run() { const media='data:image/png;base64,aW1hZ2U=';",
          "const result={costUsd:0.02,costExact:true,remainingBalance:123456.789,errors:mode==='failed'?[{nodeId:'final-review',message:'fixture generation failed'}]:[],",
          "nodes:{'frame-one':{status:'done',out:{image:media,images:[media,'data:image/png;base64,dmFyaWFudA==']},costUsd:0.01,ms:1},",
          "'final-review':{status:mode==='failed'?'error':'done',out:mode==='failed'?null:mode==='wrong-port'?{unexpected:'wrong output'}:{text:mode==='empty'?'   ':'final output'},costUsd:0.01,ms:1}}};",
          "if(mode==='failed') throw Object.assign(Error('fixture generation failed'),{result}); return result; } }",
        ].join('\n'));
        const run = spawnSync(process.execPath, [runner, 'storyboard-relay', '--executor', module,
          '--out', dir, '--run'], { encoding: 'utf8', env: { ...process.env, NANOGPT_API_KEY: 'capture-test-dummy-key' } });
        assert.equal(run.status, mode === 'complete' ? 0 : mode === 'interrupted' ? 27 : 1, run.stdout + run.stderr);
        const last = JSON.parse(run.stdout.trim().split('\n').at(-1));
        const summaryText = await readFile(join(last.evidence, 'run.json'), 'utf8');
        assert.ok(!summaryText.includes('123456.789'), 'do not retain account balance');
        assert.ok(!summaryText.includes('capture-test-dummy-key'), 'do not retain credentials');
        const summary = JSON.parse(summaryText);
        assert.equal(summary.costUsd, 0.02, 'partial failures retain incurred cost');
        assert.equal(summary.state, mode === 'complete' ? 'complete' : mode === 'interrupted' ? 'capturing' : 'failed');
        if (mode === 'interrupted') {
          assert.equal(summary.nodes.find(n => n.id === 'final-review').status, 'done', 'receipt survives interruption before downloads finish');
          return;
        }
        const image = summary.nodes.find(n => n.id === 'frame-one');
        assert.equal(image.outputs.length, 3, 'primary and both array variants survive');
        assert.equal(await readFile(join(last.evidence, 'frame-one-images-2.png'), 'utf8'), 'variant');
        if (mode !== 'complete') assert.ok(summary.captureErrors.length, 'missing/empty promised outputs fail');
        if (mode === 'failed') assert.match(summary.executionError, /fixture generation failed/);
      } finally { await rm(dir, { recursive: true, force: true }); }
    });
  }
});

test('invalid capture arguments fail before importing or running the executor', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'noodle-capture-options-'));
  try {
    const module = join(dir, 'must-not-load.mjs');
    await writeFile(module, "throw Error('EXECUTOR_IMPORTED');");
    for (const args of [
      ['--timeout', 'NaN'], ['--timeout', '0'], ['--timeout', '-1'], ['--timeout', '1.5'],
      ['--timeout', '2147483648'], ['--timeout'], ['--out'], ['--out', '--run'],
      ['--typo'], ['--case', 'default', '--case', 'other'], ['--run', '--run'],
    ]) {
      const run = spawnSync(process.execPath, [runner, 'storyboard-relay', '--executor', module, ...args],
        { encoding: 'utf8', env: { ...process.env, NANOGPT_API_KEY: 'capture-test-dummy-key' } });
      assert.equal(run.status, 1, JSON.stringify(args));
      assert.doesNotMatch(run.stderr, /EXECUTOR_IMPORTED/, JSON.stringify(args));
      assert.match(run.stderr, /requires a value|--timeout must be|Unknown or duplicate argument/, JSON.stringify(args));
    }
  } finally { await rm(dir, { recursive: true, force: true }); }
});


test('runs with the same clock timestamp get isolated evidence directories', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'noodle-capture-collision-'));
  try {
    const module = join(dir, 'executor.mjs');
    await writeFile(module, [
      "const RealDate=Date; globalThis.Date=class extends RealDate { constructor(...args) { super(...(args.length?args:['2026-11-06T00:00:00.000Z'])); } };",
      "export const NODE_TYPES={}; export class Workflow {constructor(){this.warnings=[];this.outputs=[];} async run(){return {nodes:{},errors:[],costUsd:0};}}",
    ].join('\n'));
    const dirs = [];
    for (let i = 0; i < 2; i++) {
      const run = spawnSync(process.execPath, [runner, 'storyboard-relay', '--executor', module, '--out', dir, '--run'],
        {encoding:'utf8',env:{...process.env,NANOGPT_API_KEY:'capture-test-dummy-key'}});
      assert.equal(run.status, 0, run.stdout+run.stderr);
      dirs.push(JSON.parse(run.stdout.trim().split('\n').at(-1)).evidence);
    }
    assert.notEqual(dirs[0], dirs[1], 'an existing run directory must never be reused');
    for (const path of dirs) assert.equal(JSON.parse(await readFile(join(path,'run.json'),'utf8')).state,'complete');
  } finally {await rm(dir,{recursive:true,force:true});}
});
