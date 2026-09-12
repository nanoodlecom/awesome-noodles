# Synthetic media for offline routing checks

These are test signals, not gallery outputs or evidence of model quality.

- composition-red.png, composition-blue.png and composition-green.png are tiny 3x2 RGB PNGs. Different bytes identify the original, draft and repair as they pass between real executor stages.
- composition-silent.mp4 is a 32x32 red H.264 clip, 0.25 seconds long.
- composition-sounded.mp4 contains the same red picture and a 440 Hz test tone. It stands in for the returned foley video; the test does not pretend that this tone was inferred from a scene.

The clips were authored locally with ffmpeg:

    ffmpeg -f lavfi -i color=c=red:s=32x32:r=8 -t 0.25 -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart composition-silent.mp4
    ffmpeg -f lavfi -i color=c=red:s=32x32:r=8 -f lavfi -i sine=frequency=440:sample_rate=8000 -t 0.25 -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 16k -movflags +faststart composition-sounded.mp4

The PNGs use standard RGB scanlines compressed with zlib; no generated assets or third-party artwork is included.

Run the optional executor tests with:

    node scripts/check-composition.mjs --executor /path/to/nanoodle/src/index.mjs

The script intercepts every HTTP request and blocks fallback fetches. It runs both authored input cases through each exact graph, including local image exports and provider response parsing. It checks billable request counts (3, 5 and 3), exact media identities/order, prompt propagation, and nonempty declared sinks. The mystery observer cannot see the generation brief; the storyboard's final critic sees repaired pixels without the old verdict; the film sound step receives the completed video.

Normal npm test always checks source composition. If nanoodle is not installed as an optional dependency, HTTP/media tests are explicitly skipped with instructions for running them; a skip is not an execution pass. This test suite does not fetch catalogs, use a real key, or call paid APIs.
