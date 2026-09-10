# Gallery curation — 10 September 2026

Keep five workflows. Each earns its place through a useful dependency or comparison between model calls. A text input wired to an image model, an extra prompt-writing call, or a different model name does not by itself make a gallery example. Node count is not the bar: the connection must do work someone needs.

| Workflow | Why the connection matters | What to inspect |
| --- | --- | --- |
| `character-sprites` | A generated reference constrains the subsequent parts image. The companion skill extracts those parts and builds animation frames locally. | Reference and parts agree; joints and movement remain readable. The graph produces artwork, while the skill handles animation and a coding agent supplies the game. |
| `image-model-arena` | One brief fans out to four image models for a controlled comparison. | Exact heading and footer, one wheel, two recognizable tire levers, composition and palette. Keep weaker results visible; this is a task-specific comparison, not a universal ranking. |
| `photo-to-video` | The generated image becomes the first frame for a separately directed motion step. | The mug, notebook and desk remain stable while steam moves. Changing the still and motion briefs should change the scene and movement. A seamless loop is not promised. |
| `sing` | The idea and preferred bands drive lyrics, then an arrangement matched to those lyrics. A third text stage names choices that would clash; arrangement and exclusions meet in the music prompt, with lyrics wired separately. | Change the idea or references and inspect the resulting words and musical direction. Listen for the hook, groove and vocal delivery. Exact structure and duration are not guaranteed. |
| `talking-avatar` | Portrait and speech branches feed a lipsync step that needs both. | Presenter identity, script accuracy, pronunciation and mouth timing. Keep the face unobstructed, match appearance to the selected voice, and use a short script. |

The other 37 catalog graphs and their recipes were removed. Their code remains in git history. Single-call wrappers, repeated radio scenes, decorative controls, cover-only claims and detector-score marketing do not earn a place on this shelf. Existing experimental projects are separate from the public catalog.

## Samples and runnable graphs

The [sample gallery](https://nanoodle.com/examples/gallery/) distinguishes original sampled graphs from current runnable graphs. Preserve the actual input, model and output together; never rewrite an old sample's graph to match a new cover or theme.

- **Image comparison:** restore the bicycle-workshop brief from the saved 5 September run. That run used Muse, Krea, Grok and Recraft and reported $0.118. Its requested lettering survived in all four images; tool shapes varied. The current graph uses GPT Image 2.5 Flare in contender 2's slot. The replacement has no saved comparison result, so the Krea image and historical price are not evidence for the current four-model run.
- **Still to short clip:** restore the tea-mug and steam briefs from the saved 5 September run, which reported $0.21. The current graph uses the unprefixed `minimax-h3/image-to-video-spicy` ID; the original sampled graph records the old provider alias. Review covered sampled frames, not proof of a seamless loop.
- **Spoken introduction:** restore the museum-guide portrait and workshop script from the saved 5 September run. It reported at least $0.28; some provider prices were omitted. The current graph uses `longcat-avatar-1.5`, while the original sampled graph records the old alias. Historical review covered sampled frames and a model-assisted audio transcription; precise lipsync timing remains for playback judgment. Generation took several minutes.
- **Sing:** recover the singularity/trip-hop idea and preferred-band controls from `c3d975b`, before `5fc0a33` flattened the workflow. The arrangement uses the finished lyrics; the avoid-list uses that actual arrangement. Both style outputs are joined into the supported music prompt. Restore MiniMax Music 3, used by the richer workflow before the Mureka refresh, with a new 10 September run and matching lyrics, arrangement and avoid-list. The provider reported $0.15 for music and $0 for the three text calls on this account; other accounts may pay for those text calls. The music step was rerun with an explicit `prompt` after aligning the transports with the provider contract, reusing the generated text stages. The selected recording preserves the chorus and a breathy female vocal. Model-assisted listening called it lo-fi alternative pop; the sample discloses that drift from the requested trip-hop style. The saved result records its own inputs, models and cost.
- **Game character kit:** retain the existing character graph and [Iron Verdict](https://nanoodle.com/examples/iron-verdict/) worked example. The published result combines generated art, local rigging and agent-written game code. It does not imply the graph alone makes a game.

All prices above describe historical observations. Check the current estimate before a new run. The initial cull made no new paid model calls. The Sing restoration made fresh runs and records the selected sample separately from historical outputs.

## Repository checks

README share links and headless recipes are generated from the five committed graphs. `npm test` checks their round trips, source parity and input contracts. These structural checks do not establish model availability or output quality; changes to a model or input need their own execution evidence.

## Recover ideas lost during MCP cleanup

The browser gallery is a curated collection of workflows, not a mirror of whichever tools fit the hosted MCP transport. An MCP limitation is a reason to qualify availability, not to delete the idea. As checked on 10 September, the live MCP server still served thirteen snapshots from `5fc0a33`, including an already-flattened Sing; it was not serving this repository's current five graphs.

| Idea | Recovery source | What needs checking before featuring it |
| --- | --- | --- |
| Auto-dub / translated voiceover | [`9d0cc04^`](https://github.com/nanoodlecom/awesome-noodles/commit/9d0cc04), `graphs/auto-dub.noodle-graph.json` | Original video → extract speech → transcribe → translate → speech → replace soundtrack. Both headless runtimes currently cut the video short when the new speech is shorter. Preserve the video duration and pad silence first; this workflow does not align lips or sentence timing. |
| Photo → spoken poem | [`b4fbc0d^`](https://github.com/nanoodlecom/awesome-noodles/commit/b4fbc0d), `graphs/see-think-speak.noodle-graph.json` | Vision → four-line poem → speech. Removed after a keyless Kokoro payment failure. Refresh the model IDs and save a real BYO-key result before promotion. |
| Voice memo → notes | Same revision, `graphs/voice-memo-to-notes.noodle-graph.json` | Transcription → summary and actions. Removed for hosted transcription upload constraints; verify today's upload and payment paths separately. |

The Auto-dub removal explicitly intended to keep it on the website. Site commit [`e4f4adb`](https://github.com/nanoodlecom/nanoodle/commit/e4f4adb) then tied the gallery to the smaller MCP catalog and removed it there too. Those losses predate the September cull.

A concrete Auto-dub reproduction uses `nanoodle-js/tests/fixtures/media/clipA.mp4` (one second), a 0.35-second replacement WAV, and `muxSoundtrack(video, audio, false)`. The current headless output lasts 0.35 seconds; the browser retains approximately one second with trailing silence. Repair the non-looping `-shortest` branches in `nanoodle-js/src/local-media.mjs` and `nanoodle-py/src/nanoodle/local_media.py`, with duration and silence assertions. Embedded app preview also lacks multipart transcription support; editor and standalone execution need separate validation.
