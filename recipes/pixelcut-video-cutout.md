# knock the alley off the clip

Committed graph: [`graphs/pixelcut-video-cutout.noodle-graph.json`](../graphs/pixelcut-video-cutout.noodle-graph.json) · [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA)

`inspect` is **offline and free** (no API key). `run` is bring-your-own-key: export `NANOGPT_API_KEY` (or pass `--key` / `--env-file`) and it **spends NanoGPT balance**. Quote share URLs — `#` starts a comment in most shells. `#g=` / `#j=` / `#a=` all load via `Workflow.load` and the CLI.

Full guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

## Inputs

| Input | Kind | Stable key | Notes |
| --- | --- | --- | --- |
| `Product clip` | video | `n1.video` | required — pass a local file with `--input n1.video=@path` |

## Inspect (offline, no key)

```bash
npx nanoodle inspect graphs/pixelcut-video-cutout.noodle-graph.json
npx nanoodle inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA"

nanoodle-py inspect graphs/pixelcut-video-cutout.noodle-graph.json
nanoodle-py inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA"
# or: python -m nanoodle inspect graphs/pixelcut-video-cutout.noodle-graph.json
```

## Run (spends balance)

```bash
export NANOGPT_API_KEY=...          # nano-gpt.com key; required for run, not inspect

npx nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA" --input n1.video=@clip.mp4 --out ./out
nanoodle-py run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA" --input n1.video=@clip.mp4 --out ./out
# or: python -m nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWrcMBRFf0VcukhAM3E8KQStSrJvh0BLSylEYz2nwrJkZNkz7uDSVT-g9AvzJUGyk7jMoku9d3UknacjeohLDusUtRBfj9AKAsVK20A2gCMMDcWKq-upcIC4yjgGiDzj2ENcXWccVtYxVllXVCx8JyaNoYG5skyrwugGHKUmo1qIIwIdAgQ-NsZJldrs8fcfttUHMkUX2CetyLEbWVQP3nVWsTuqXU-end03c-aij5nV7iWz8jEjzf05e8d2RhYV2z2ws59vsnWW5xebjJVe1tSer2d80QXXBfb46y-zLrAbfUflewqsDdqYuctT69YPbZCGdU1bSENTcbuaMJ72Xgdag6NwxnkIDGSM22Mc-WzUXr667Lv06n9cbmaZ-ULm1jvVFeFE3oKaL6ik9Mt8Zmg2QRN8ht5Obz4ZSO0UGQj81y44Gu_qJo4PfNr3oQkJ8pqGQJpAVIBW_6DUf96YjeM3DqNttfh0JioqvatjMn7IZ22N8_GwdCGMHMEtE_lJIrJtRG7iGQoi5-g17dMNpP08_dxG2i-T_jRSiGx9_XYcnwDGYjNUEgMAAA" --input n1.video=@clip.mp4 --out ./out
```


Install names: `npm i nanoodle` (not `nanoodle-js`) · `pip install nanoodle`. Same graph, same semantics: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
