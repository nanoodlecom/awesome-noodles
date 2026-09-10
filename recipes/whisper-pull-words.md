# pull the words off the take

Committed graph: [`graphs/whisper-pull-words.noodle-graph.json`](../graphs/whisper-pull-words.noodle-graph.json) · [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA)

`inspect` is **offline and free** (no API key). `run` is bring-your-own-key: export `NANOGPT_API_KEY` (or pass `--key` / `--env-file`) and it **spends NanoGPT balance**. Quote share URLs — `#` starts a comment in most shells. `#g=` / `#j=` / `#a=` all load via `Workflow.load` and the CLI.

Full guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

## Inputs

| Input | Kind | Stable key | Notes |
| --- | --- | --- | --- |
| `Night-ride VO` | audio | `n1.audio` | required — pass a local file with `--input n1.audio=@path` |

## Inspect (offline, no key)

```bash
npx nanoodle inspect graphs/whisper-pull-words.noodle-graph.json
npx nanoodle inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA"

nanoodle-py inspect graphs/whisper-pull-words.noodle-graph.json
nanoodle-py inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA"
# or: python -m nanoodle inspect graphs/whisper-pull-words.noodle-graph.json
```

## Run (spends balance)

```bash
export NANOGPT_API_KEY=...          # nano-gpt.com key; required for run, not inspect

npx nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA" --input n1.audio=@take.mp3 --out ./out
nanoodle-py run "https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA" --input n1.audio=@take.mp3 --out ./out
# or: python -m nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA2WSUU7jMBCGr2L92geQnBLaLUI-wEpIiD4AWdAKCW88oVYd23IMbVRltU8cAHHCngQ5CWrZfRrN75nPnt-zxQvEKYd1ihqIX1toBYEy0zaSjeCIraekuLoehA3E95yjhZjmHGuIeYpW1qnMPxvD4pLY2gXVMFdVfRblisBRaTKqgdgi0iZC4NYbJxUrFmz3-sZ-LnXjKbBLGZ6IFTN29DhKWS9lxezxmB39-ZZP8jyfn9TaHk_YtScql7vXt8Rku7_vzLrINlJnMTasWPA-v7CVtjrSjTQrZrRvWlsOJ9c_7k4qZ6idgKN0xgUItGSMW6Pr-OiIPd17IZ_7Z3_14nwwo4-jGVf6aRmzoBWxYnE4_gF2usfGIG1TBv2bPskj-mxAz_I9-mas9fGLrbVTZCDwr23ougcOo-3q4JNNGqkKrk6daQE-x_QuxH5MpR06jugOK6b_VSS2TchZukNBTDleNK1Tl5f2btgUL-39YFdTSkMQ-eR83nUfiKMe-4ICAAA" --input n1.audio=@take.mp3 --out ./out
```


Install names: `npm i nanoodle` (not `nanoodle-js`) · `pip install nanoodle`. Same graph, same semantics: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).
