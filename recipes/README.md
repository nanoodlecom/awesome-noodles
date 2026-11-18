# Run headless

One recipe per catalog graph. Each file has offline `inspect` and paid `run` one-liners for the JavaScript and Python packages, using a share link regenerated from the committed graph.

Do not hand-edit these files — run `node scripts/make-recipes.mjs` after changing a graph. `npm test` checks each recipe's share link against `graphs/`.

`inspect` never calls the API. `run` needs `NANOGPT_API_KEY` and spends NanoGPT balance. Guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).


| Recipe | Graph | Inputs |
| --- | --- | --- |
| [Act it out, motion-checked](act-it-out.md) | [`graphs/act-it-out.noodle-graph.json`](../graphs/act-it-out.noodle-graph.json) | defaults in graph |
| [ADetailer finisher](adetailer-finisher.md) | [`graphs/adetailer-finisher.noodle-graph.json`](../graphs/adetailer-finisher.noodle-graph.json) | needs Portrait |
| [Bar chart, number-checked](bar-chart-audit.md) | [`graphs/bar-chart-audit.noodle-graph.json`](../graphs/bar-chart-audit.noodle-graph.json) | defaults in graph |
| [Bookshelf next-read, phantom-checked](bookshelf-next-read.md) | [`graphs/bookshelf-next-read.noodle-graph.json`](../graphs/bookshelf-next-read.noodle-graph.json) | needs Shelf photo |
| [Character to rigged, skin-verified](character-to-rigged.md) | [`graphs/character-to-rigged.noodle-graph.json`](../graphs/character-to-rigged.noodle-graph.json) | defaults in graph |
| [Clean-voice rescue, transcript-scored](clean-voice-rescue.md) | [`graphs/clean-voice-rescue.noodle-graph.json`](../graphs/clean-voice-rescue.noodle-graph.json) | defaults in graph |
| [Clip to comic, order-checked](clip-to-comic.md) | [`graphs/clip-to-comic.noodle-graph.json`](../graphs/clip-to-comic.noodle-graph.json) | needs Clip |
| [A composer that watches your film](composer-watches-your-film.md) | [`graphs/composer-watches-your-film.noodle-graph.json`](../graphs/composer-watches-your-film.noodle-graph.json) | defaults in graph |
| [Cover version, lyric-checked](cover-version.md) | [`graphs/cover-version.noodle-graph.json`](../graphs/cover-version.noodle-graph.json) | defaults in graph |
| [Edit with references](edit-with-references.md) | [`graphs/edit-with-references.noodle-graph.json`](../graphs/edit-with-references.noodle-graph.json) | needs Main photo, Reference 1 · outfit, Reference 2 · accessory, Reference 3 · companion |
| [Exploded check, disassembly-audited](exploded-check.md) | [`graphs/exploded-check.noodle-graph.json`](../graphs/exploded-check.noodle-graph.json) | defaults in graph |
| [Focus check, depth-of-field-audited](focus-check.md) | [`graphs/focus-check.noodle-graph.json`](../graphs/focus-check.noodle-graph.json) | defaults in graph |
| [Fridge to feast](fridge-to-feast.md) | [`graphs/fridge-to-feast.noodle-graph.json`](../graphs/fridge-to-feast.noodle-graph.json) | needs Fridge photo |
| [Haircut preview, identity-checked](haircut-preview.md) | [`graphs/haircut-preview.noodle-graph.json`](../graphs/haircut-preview.noodle-graph.json) | needs Portrait photo |
| [Hear it, paint it](hear-it-paint-it.md) | [`graphs/hear-it-paint-it.noodle-graph.json`](../graphs/hear-it-paint-it.noodle-graph.json) | defaults in graph |
| [Hidden word, object-coded](hidden-word.md) | [`graphs/hidden-word.noodle-graph.json`](../graphs/hidden-word.noodle-graph.json) | defaults in graph |
| [Humanize a comment](humanize-comment.md) | [`graphs/humanize-comment.noodle-graph.json`](../graphs/humanize-comment.noodle-graph.json) | defaults in graph |
| [Idea to 3D model](idea-to-3d-model.md) | [`graphs/idea-to-3d-model.noodle-graph.json`](../graphs/idea-to-3d-model.noodle-graph.json) | defaults in graph |
| [Maze run, solve-checked](maze-solve-audit.md) | [`graphs/maze-solve-audit.noodle-graph.json`](../graphs/maze-solve-audit.noodle-graph.json) | defaults in graph |
| [Menu to plate, checked](menu-to-plate.md) | [`graphs/menu-to-plate.noodle-graph.json`](../graphs/menu-to-plate.noodle-graph.json) | needs Menu photo |
| [Metro map, station-checked](metro-map-audit.md) | [`graphs/metro-map-audit.noodle-graph.json`](../graphs/metro-map-audit.noodle-graph.json) | defaults in graph |
| [Mirror check, reflection-audited](mirror-check.md) | [`graphs/mirror-check.noodle-graph.json`](../graphs/mirror-check.noodle-graph.json) | defaults in graph |
| [Negative space check, figure-ground-audited](negative-space-check.md) | [`graphs/negative-space-check.noodle-graph.json`](../graphs/negative-space-check.noodle-graph.json) | defaults in graph |
| [Palette transplant, re-measured](palette-transplant.md) | [`graphs/palette-transplant.noodle-graph.json`](../graphs/palette-transplant.noodle-graph.json) | defaults in graph |
| [Perspective check, convergence-audited](perspective-check.md) | [`graphs/perspective-check.noodle-graph.json`](../graphs/perspective-check.noodle-graph.json) | defaults in graph |
| [Pet portrait, likeness-checked](pet-portrait-studio.md) | [`graphs/pet-portrait-studio.noodle-graph.json`](../graphs/pet-portrait-studio.noodle-graph.json) | needs Pet photo |
| [Photo to 3D splat](photo-to-3d-splat.md) | [`graphs/photo-to-3d-splat.noodle-graph.json`](../graphs/photo-to-3d-splat.noodle-graph.json) | needs Object photo |
| [Photo to scene mesh](photo-to-scene-mesh.md) | [`graphs/photo-to-scene-mesh.noodle-graph.json`](../graphs/photo-to-scene-mesh.noodle-graph.json) | needs Scene photo |
| [Relay drift, hop-checked](relay-drift.md) | [`graphs/relay-drift.noodle-graph.json`](../graphs/relay-drift.noodle-graph.json) | defaults in graph |
| [Say it back, transcript-checked](say-it-back.md) | [`graphs/say-it-back.noodle-graph.json`](../graphs/say-it-back.noodle-graph.json) | defaults in graph |
| [Scale check, proportion-audited](scale-check.md) | [`graphs/scale-check.noodle-graph.json`](../graphs/scale-check.noodle-graph.json) | defaults in graph |
| [Score the still, ear-checked](score-the-still.md) | [`graphs/score-the-still.noodle-graph.json`](../graphs/score-the-still.noodle-graph.json) | defaults in graph |
| [Shadow check, sun-audited](shadow-check.md) | [`graphs/shadow-check.noodle-graph.json`](../graphs/shadow-check.noodle-graph.json) | defaults in graph |
| [Spot the difference, diff-checked](spot-the-difference.md) | [`graphs/spot-the-difference.noodle-graph.json`](../graphs/spot-the-difference.noodle-graph.json) | defaults in graph |
| [Squint test, two-distance-checked](squint-test.md) | [`graphs/squint-test.noodle-graph.json`](../graphs/squint-test.noodle-graph.json) | defaults in graph |
| [Stack check, support-audited](stack-check.md) | [`graphs/stack-check.noodle-graph.json`](../graphs/stack-check.noodle-graph.json) | defaults in graph |
| [Stereo check, disparity-audited](stereo-check.md) | [`graphs/stereo-check.noodle-graph.json`](../graphs/stereo-check.noodle-graph.json) | defaults in graph |
| [Storyboard relay](storyboard-relay.md) | [`graphs/storyboard-relay.noodle-graph.json`](../graphs/storyboard-relay.noodle-graph.json) | defaults in graph |
| [Subject anywhere, preservation-audited](subject-anywhere.md) | [`graphs/subject-anywhere.noodle-graph.json`](../graphs/subject-anywhere.noodle-graph.json) | needs Product photo |
| [Turnaround check, viewpoint-audited](turnaround-check.md) | [`graphs/turnaround-check.noodle-graph.json`](../graphs/turnaround-check.noodle-graph.json) | defaults in graph |
| [Words only, repainted](words-only-repaint.md) | [`graphs/words-only-repaint.noodle-graph.json`](../graphs/words-only-repaint.noodle-graph.json) | needs Scene photo |

Install: `npm i nanoodle` · `pip install nanoodle`. Run anywhere: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
