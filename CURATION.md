# Gallery curation — 10 September 2026

Keep five workflows. Each earns its place through a useful dependency or comparison between model calls. A text input wired to an image model, an extra prompt-writing call, or a different model name does not by itself make a gallery example. Node count is not the bar: the connection must do work someone needs.

| Workflow | Why the connection matters | What to inspect |
| --- | --- | --- |
| `character-sprites` | A generated reference constrains the subsequent parts image. The companion skill extracts those parts and builds animation frames locally. | Reference and parts agree; joints and movement remain readable. The graph produces artwork, while the skill handles animation and a coding agent supplies the game. |
| `image-model-arena` | One brief fans out to four image models for a controlled comparison. | Exact heading and footer, one wheel, two recognizable tire levers, composition and palette. Keep weaker results visible; this is a task-specific comparison, not a universal ranking. |
| `photo-to-video` | The generated image becomes the first frame for a separately directed motion step. | The mug, notebook and desk remain stable while steam moves. Changing the still and motion briefs should change the scene and movement. A seamless loop is not promised. |
| `sing` | Generated lyrics feed the music model's lyrics input; musical style is a separate input. | Lyrics fit the supplied theme and can be understood in the song. A requested section structure or exact duration is not guaranteed. |
| `talking-avatar` | Portrait and speech branches feed a lipsync step that needs both. | Presenter identity, script accuracy, pronunciation and mouth timing. Keep the face unobstructed, match appearance to the selected voice, and use a short script. |

The other 37 catalog graphs and their recipes were removed. Their code remains in git history. Single-call wrappers, repeated radio scenes, decorative controls, cover-only claims and detector-score marketing do not earn a place on this shelf. Existing experimental projects are separate from the public catalog.

## Samples and runnable graphs

The [sample gallery](https://nanoodle.com/examples/gallery/) distinguishes original sampled graphs from current runnable graphs. Preserve the actual input, model and output together; never rewrite an old sample's graph to match a new cover or theme.

- **Image comparison:** restore the bicycle-workshop brief from the saved 5 September run. That run used Muse, Krea, Grok and Recraft and reported $0.118. Its requested lettering survived in all four images; tool shapes varied. The current graph uses GPT Image 2.5 Flare in contender 2's slot. The replacement has no saved comparison result, so the Krea image and historical price are not evidence for the current four-model run.
- **Still to short clip:** restore the tea-mug and steam briefs from the saved 5 September run, which reported $0.21. The current graph uses the unprefixed `minimax-h3/image-to-video-spicy` ID; the original sampled graph records the old provider alias. Review covered sampled frames, not proof of a seamless loop.
- **Spoken introduction:** restore the museum-guide portrait and workshop script from the saved 5 September run. It reported at least $0.28; some provider prices were omitted. The current graph uses `longcat-avatar-1.5`, while the original sampled graph records the old alias. Historical review covered sampled frames and a model-assisted audio transcription; precise lipsync timing remains for playback judgment. Generation took several minutes.
- **Closing-credits song:** retain the current rooftop-getaway brief and its saved 8 September lyrics and audio. The recorded music step was $0.225. The old acoustic-song audio review was superseded; the replacement track has no new paid audio-model review.
- **Game character kit:** retain the existing character graph and [Iron Verdict](https://nanoodle.com/examples/iron-verdict/) worked example. The published result combines generated art, local rigging and agent-written game code. It does not imply the graph alone makes a game.

All prices above describe historical observations. Check the current estimate before a new run. This cull makes no new paid model calls and does not claim fresh output validation.

## Repository checks

README share links and headless recipes are generated from the five committed graphs. `npm test` checks their round trips, source parity and input contracts. These structural checks do not establish model availability or output quality; changes to a model or input need their own execution evidence.
