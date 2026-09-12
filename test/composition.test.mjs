import test from 'node:test';
import {
  slugs, loadExecutor, missingOptionalExecutor, readComposition,
  checkCompositionSource, runCompositionCases,
} from '../scripts/check-composition.mjs';

for (const slug of slugs) {
  test('composition source: ' + slug, async () => {
    const { graph } = await readComposition(slug);
    checkCompositionSource(slug, graph);
  });
}

let executor;
let missing;
try { executor = await loadExecutor(); }
catch (error) {
  if (!missingOptionalExecutor(error)) throw error;
  missing = 'Optional nanoodle executor is absent; source checks still run. Run scripts/check-composition.mjs --executor /path/to/src/index.mjs for HTTP/media routing checks.';
}
for (const slug of slugs) {
  test('composition HTTP/media routing: ' + slug, { skip: missing || false, concurrency: false }, async () => {
    await runCompositionCases(executor, slug);
  });
}
