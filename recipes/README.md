# Run headless

One recipe per Keep graph. Each file has offline `inspect` and paid `run` one-liners for the JavaScript and Python packages, using a share link regenerated from the committed graph.

Do not hand-edit these files — run `node scripts/make-recipes.mjs` after changing a graph. `npm test` checks each recipe's share link against `graphs/`.

`inspect` never calls the API. `run` needs `NANOGPT_API_KEY` and spends NanoGPT balance. Guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

| Recipe | Graph | First-click |
| --- | --- | --- |
| [Character sprites](character-sprites.md) | [`graphs/character-sprites.noodle-graph.json`](../graphs/character-sprites.noodle-graph.json) | defaults in graph |
| [Cinematic character still](cinematic-character-still.md) | [`graphs/cinematic-character-still.noodle-graph.json`](../graphs/cinematic-character-still.noodle-graph.json) | defaults in graph |
| [Product in a setting](combine-images.md) | [`graphs/combine-images.noodle-graph.json`](../graphs/combine-images.noodle-graph.json) | needs Product photo, Setting photo |
| [Crystal video upscale](crystal-video-upscale.md) | [`graphs/crystal-video-upscale.noodle-graph.json`](../graphs/crystal-video-upscale.noodle-graph.json) | needs Product clip |
| [Midnight drop notice](deslop.md) | [`graphs/deslop.noodle-graph.json`](../graphs/deslop.noodle-graph.json) | defaults in graph |
| [Clean product photo](edit-a-photo.md) | [`graphs/edit-a-photo.noodle-graph.json`](../graphs/edit-a-photo.noodle-graph.json) | needs Product photo |
| [Plan a messy dump](fable-five-step.md) | [`graphs/fable-five-step.noodle-graph.json`](../graphs/fable-five-step.noodle-graph.json) | defaults in graph |
| [Favicon concept](favicon.md) | [`graphs/favicon.noodle-graph.json`](../graphs/favicon.noodle-graph.json) | defaults in graph |
| [Product studio concept](fibo-studio-still.md) | [`graphs/fibo-studio-still.noodle-graph.json`](../graphs/fibo-studio-still.noodle-graph.json) | defaults in graph |
| [frame wakes up](grok-imagine-still.md) | [`graphs/grok-imagine-still.noodle-graph.json`](../graphs/grok-imagine-still.noodle-graph.json) | defaults in graph |
| [Night-ride identity restyle](h3-identity-restyle.md) | [`graphs/h3-identity-restyle.noodle-graph.json`](../graphs/h3-identity-restyle.noodle-graph.json) | needs Still |
| [Night-ride radio orbit](h3-max-multi-angle.md) | [`graphs/h3-max-multi-angle.noodle-graph.json`](../graphs/h3-max-multi-angle.noodle-graph.json) | needs Product still |
| [Volt drop poster](ideogram-v4-instant-poster.md) | [`graphs/ideogram-v4-instant-poster.noodle-graph.json`](../graphs/ideogram-v4-instant-poster.noodle-graph.json) | defaults in graph |
| [Compare image models](image-model-arena.md) | [`graphs/image-model-arena.noodle-graph.json`](../graphs/image-model-arena.noodle-graph.json) | defaults in graph |
| [Night-ride radio take](infinitetalk-radio-take.md) | [`graphs/infinitetalk-radio-take.noodle-graph.json`](../graphs/infinitetalk-radio-take.noodle-graph.json) | defaults in graph |
| [pack type that sticks](mai-pack-type.md) | [`graphs/mai-pack-type.noodle-graph.json`](../graphs/mai-pack-type.noodle-graph.json) | defaults in graph |
| [Travel postcard](night-market-postcard.md) | [`graphs/night-market-postcard.noodle-graph.json`](../graphs/night-market-postcard.noodle-graph.json) | defaults in graph |
| [Night-ride radio VO](night-ride-radio-vo.md) | [`graphs/night-ride-radio-vo.noodle-graph.json`](../graphs/night-ride-radio-vo.noodle-graph.json) | defaults in graph |
| [Night-ride SFX](night-ride-sfx.md) | [`graphs/night-ride-sfx.noodle-graph.json`](../graphs/night-ride-sfx.noodle-graph.json) | defaults in graph |
| [Product motion concept](omni-flash-turntable.md) | [`graphs/omni-flash-turntable.noodle-graph.json`](../graphs/omni-flash-turntable.noodle-graph.json) | defaults in graph |
| [P-Image Upscale](p-image-upscale.md) | [`graphs/p-image-upscale.noodle-graph.json`](../graphs/p-image-upscale.noodle-graph.json) | needs Product still |
| [rewrite the clip](p-video-rewrite.md) | [`graphs/p-video-rewrite.noodle-graph.json`](../graphs/p-video-rewrite.noodle-graph.json) | needs Product clip |
| [Animate a product still](photo-to-video.md) | [`graphs/photo-to-video.noodle-graph.json`](../graphs/photo-to-video.noodle-graph.json) | defaults in graph |
| [Product cutout](product-cutout.md) | [`graphs/product-cutout.noodle-graph.json`](../graphs/product-cutout.noodle-graph.json) | needs Product still |
| [Remove packaging text](remove-packaging-text.md) | [`graphs/remove-packaging-text.noodle-graph.json`](../graphs/remove-packaging-text.noodle-graph.json) | needs Packaging still |
| [UI mockup](render-a-mockup.md) | [`graphs/render-a-mockup.noodle-graph.json`](../graphs/render-a-mockup.noodle-graph.json) | defaults in graph |
| [Text-selected isolate](sam3-isolate.md) | [`graphs/sam3-isolate.noodle-graph.json`](../graphs/sam3-isolate.noodle-graph.json) | needs Scene still |
| [Closing-credits song](sing.md) | [`graphs/sing.noodle-graph.json`](../graphs/sing.noodle-graph.json) | defaults in graph |
| [Spoken introduction](talking-avatar.md) | [`graphs/talking-avatar.noodle-graph.json`](../graphs/talking-avatar.noodle-graph.json) | defaults in graph |
| [Transparent brand sticker](transparent-brand-sticker.md) | [`graphs/transparent-brand-sticker.noodle-graph.json`](../graphs/transparent-brand-sticker.noodle-graph.json) | defaults in graph |
| [Volt dispatch card](volt-dispatch-infographic.md) | [`graphs/volt-dispatch-infographic.noodle-graph.json`](../graphs/volt-dispatch-infographic.noodle-graph.json) | defaults in graph |
| [editable volt mark](volt-vector-mark.md) | [`graphs/volt-vector-mark.noodle-graph.json`](../graphs/volt-vector-mark.noodle-graph.json) | defaults in graph |

Install: `npm i nanoodle` · `pip install nanoodle`. Run anywhere: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
