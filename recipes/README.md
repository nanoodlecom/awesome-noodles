# Run headless

One recipe per catalog graph. Each file has offline `inspect` and paid `run` one-liners for the JavaScript and Python packages, using a share link regenerated from the committed graph.

Do not hand-edit these files — run `node scripts/make-recipes.mjs` after changing a graph. `npm test` checks each recipe's share link against `graphs/`.

`inspect` never calls the API. `run` needs `NANOGPT_API_KEY` and spends NanoGPT balance. Guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

**[Sing requires a source install](sing.md#install-from-source)** for the music prompt fix on GitHub main until package releases include it. Other workflows use the published packages.

| Recipe | Graph | Inputs |
| --- | --- | --- |
| [Game character kit](character-sprites.md) | [`graphs/character-sprites.noodle-graph.json`](../graphs/character-sprites.noodle-graph.json) | defaults in graph |
| [Compare image models](image-model-arena.md) | [`graphs/image-model-arena.noodle-graph.json`](../graphs/image-model-arena.noodle-graph.json) | defaults in graph |
| [Still to short clip](photo-to-video.md) | [`graphs/photo-to-video.noodle-graph.json`](../graphs/photo-to-video.noodle-graph.json) | defaults in graph |
| [Pocket mystery](pocket-mystery.md) | [`graphs/pocket-mystery.noodle-graph.json`](../graphs/pocket-mystery.noodle-graph.json) | defaults in graph |
| [Sing](sing.md) | [`graphs/sing.noodle-graph.json`](../graphs/sing.noodle-graph.json) | defaults in graph |
| [Storyboard relay](storyboard-relay.md) | [`graphs/storyboard-relay.noodle-graph.json`](../graphs/storyboard-relay.noodle-graph.json) | defaults in graph |
| [Spoken introduction](talking-avatar.md) | [`graphs/talking-avatar.noodle-graph.json`](../graphs/talking-avatar.noodle-graph.json) | defaults in graph |
| [Tiny world film](tiny-world-film.md) | [`graphs/tiny-world-film.noodle-graph.json`](../graphs/tiny-world-film.noodle-graph.json) | defaults in graph |

Install: `npm i nanoodle` · `pip install nanoodle`. Run anywhere: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
