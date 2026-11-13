# Run headless

One recipe per catalog graph. Each file has offline `inspect` and paid `run` one-liners for the JavaScript and Python packages, using a share link regenerated from the committed graph.

Do not hand-edit these files — run `node scripts/make-recipes.mjs` after changing a graph. `npm test` checks each recipe's share link against `graphs/`.

`inspect` never calls the API. `run` needs `NANOGPT_API_KEY` and spends NanoGPT balance. Guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).


| Recipe | Graph | Inputs |
| --- | --- | --- |
| [ADetailer finisher](adetailer-finisher.md) | [`graphs/adetailer-finisher.noodle-graph.json`](../graphs/adetailer-finisher.noodle-graph.json) | needs Portrait |
| [Bar chart, number-checked](bar-chart-audit.md) | [`graphs/bar-chart-audit.noodle-graph.json`](../graphs/bar-chart-audit.noodle-graph.json) | defaults in graph |
| [Bookshelf next-read, phantom-checked](bookshelf-next-read.md) | [`graphs/bookshelf-next-read.noodle-graph.json`](../graphs/bookshelf-next-read.noodle-graph.json) | needs Shelf photo |
| [Clean-voice rescue, transcript-scored](clean-voice-rescue.md) | [`graphs/clean-voice-rescue.noodle-graph.json`](../graphs/clean-voice-rescue.noodle-graph.json) | defaults in graph |
| [A composer that watches your film](composer-watches-your-film.md) | [`graphs/composer-watches-your-film.noodle-graph.json`](../graphs/composer-watches-your-film.noodle-graph.json) | defaults in graph |
| [Fridge to feast](fridge-to-feast.md) | [`graphs/fridge-to-feast.noodle-graph.json`](../graphs/fridge-to-feast.noodle-graph.json) | needs Fridge photo |
| [Haircut preview, identity-checked](haircut-preview.md) | [`graphs/haircut-preview.noodle-graph.json`](../graphs/haircut-preview.noodle-graph.json) | needs Portrait photo |
| [Humanize a comment](humanize-comment.md) | [`graphs/humanize-comment.noodle-graph.json`](../graphs/humanize-comment.noodle-graph.json) | defaults in graph |
| [Idea to 3D model](idea-to-3d-model.md) | [`graphs/idea-to-3d-model.noodle-graph.json`](../graphs/idea-to-3d-model.noodle-graph.json) | defaults in graph |
| [Menu to plate, checked](menu-to-plate.md) | [`graphs/menu-to-plate.noodle-graph.json`](../graphs/menu-to-plate.noodle-graph.json) | needs Menu photo |
| [Metro map, station-checked](metro-map-audit.md) | [`graphs/metro-map-audit.noodle-graph.json`](../graphs/metro-map-audit.noodle-graph.json) | defaults in graph |
| [Pet portrait, likeness-checked](pet-portrait-studio.md) | [`graphs/pet-portrait-studio.noodle-graph.json`](../graphs/pet-portrait-studio.noodle-graph.json) | needs Pet photo |
| [Photo to scene mesh](photo-to-scene-mesh.md) | [`graphs/photo-to-scene-mesh.noodle-graph.json`](../graphs/photo-to-scene-mesh.noodle-graph.json) | needs Scene photo |
| [Say it back, transcript-checked](say-it-back.md) | [`graphs/say-it-back.noodle-graph.json`](../graphs/say-it-back.noodle-graph.json) | defaults in graph |
| [Storyboard relay](storyboard-relay.md) | [`graphs/storyboard-relay.noodle-graph.json`](../graphs/storyboard-relay.noodle-graph.json) | defaults in graph |

Install: `npm i nanoodle` · `pip install nanoodle`. Run anywhere: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
