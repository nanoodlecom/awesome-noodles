# awesome-noodles 🍜

**A curated gallery of [nanoodle](https://nanoodle.com) workflow graphs.** Click
"Open in nanoodle" on any entry and the whole workflow lands on your canvas,
ready to run — or grab the committed graph file and run it headless with
[nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) /
[nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) *after* setting a
model on each model-bearing node (the committed graphs deliberately ship
without model ids — see [Limitations](#limitations)).

**What's nanoodle?** A no-server, bring-your-own-key visual editor for AI
workflows: wire text, image, video, audio, and LLM nodes into a graph and run
it against the [NanoGPT](https://nano-gpt.com) API. **A noodle** is one such
graph — the `noodle-graph.json` file the editor's 💾 button saves.

**This repo vs [noodle-skills](https://github.com/nanoodlecom/noodle-skills):**
this repo is graphs you open and edit on the nanoodle canvas; noodle-skills is
prebuilt Agent Skills an AI agent runs headlessly.

**How the links work:** an "Open in nanoodle" link is
`https://nanoodle.com/#g=` + base64url(gzip(graph JSON)). The entire graph
rides the URL fragment — nothing is uploaded, no server ever sees it, and this
repo's [link checker](scripts/check-links.mjs) proves every link decodes back
to exactly the committed graph file.

> **Heads-up before you click:** opening a link replaces whatever is on your
> nanoodle canvas (Ctrl+Z brings your old graph back). And **running** a noodle
> spends real money from your NanoGPT balance — images are typically cents,
> video more.

The gallery so far is twelve deliberately small starter noodles —
copy one, remix it, and send us yours via [CONTRIBUTING.md](CONTRIBUTING.md).

## 🖼 Image

- 🖼 **Text → image** — Type a scene, wire it into an image node: the one-wire hello-world of noodling. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23RTWrDQAwF4KsIrcclcVooc4FeoLuSxeCRHdGxZMZqHBMGeoiesCcpzg_xolvxFt97OuMR_dahaKQR_ccZOaLHpmIxEkOHNg-0XLTvr4cT-teNwxl9tds4nNDv6o3DlinFEf0ZjU6GHt9IKAejEYIA96EjaLP2EECFqsRCMDYkBJHGJvNgrAK_3z9gB7pEJs4EB0pJq0lziqAtiGpMLN0TOmw0aUaP8xKZsBR308v24b5g1ujtv9gAmSIMQWKAMFpWCV8GMXNrLB3okTIIqVSJDd71c1YIBsLdwRw0LNQH48bB7qXv15L6IblMcKU81zfLZm0pZe8wsXyuHpGWKstsi3V50r3eoNnu9YpD03WgfgSGrP1gWMq-_AHabPXf7AEAAA) · [graph](graphs/text-to-image.noodle-graph.json)
- ✂️ **Edit a photo** — Upload any photo and describe the change in plain words; an edit node repaints it. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2WRwW4CMQxEf8Wac6iWpYcqn9Fr1UO6MYtF1o6yaReE9t-rCCpAPXrk0cyzL_iB3zqoRZ7hPy6QCI9hI1pZKxzqOXNTbJquwgn-rXM4w292ncMCv-s7h71wijP8BZVPFR7vnINonSkofedkIXKkfLBqFIbBShQdqQ1KHKVS5Hko8sWRRCmnIEqLlTi_wGGwZAUeZ07JFqyruxXV7b3iNeSp4fap2YOtv9ta-NX02t9c3RNPLjblRjSFI5NUUhkPdVNlYkchRhqTLQ1G2ZRmGbUxRyoNofA-8VDFdMa6fjok0ePDpVMD2BebWlL7wh9UttIyZQojY3Wo9rjR_9tYP9dfzTPps80BAAA) · [graph](graphs/edit-a-photo.noodle-graph.json)
- 🥊 **Model arena** — Same prompt fanned into four image nodes: pick a different model on each contender, run once, judge side by side. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52SvU7DMBRGX-XqzhZqkzSDV6ASAwwVG-pg4pvENP6R46BGVSRmZnYmXown4BFQWkoyVKnUyYOvj47v9-3wFfmcobGSauRPO1QSOZo5MgytI-SYWa3JBGS4RZ7OGLbIkxnDXFEla-Q7DLQNyPHn8-sd7q2kCoQnIzg4lW1AwM3dcnm7un14BL2_tQZIZCVcWxPISPIMQkkGShVg1Rj4fvuAWmgC5612gUFuG394WzN4aWRBEmolCZ7b_XmFXceO6tGgvhcbe8ezU-ICgjItSC8KayBrfEUSGgeirogcKAMCAomscQy0yLwFV9pgGdQ2D6CtN8oUUKmiDGOReBBRWhR0MEn-VNKxScfQCN1P_u8E5jigkklUlJxjRSPWYpKVROdY8YiVnvniOVaC3ZphpcxmVL6qL1_ure4j6ot5TNVZH46pdgyDHQ_Ew8ChNqMoqugSYjJFjC8hLqaIySXE9ARx3f0CQT9_ktYDAAA) · [graph](graphs/model-arena.noodle-graph.json)
- 🎛️ **Style switchboard** — One subject, a Choice node full of art styles, a Join to splice them: flip the switch and re-run. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA5WSQW7bMBBFrzKYNRXIlpG03Lb7HqDOgqZGEmOKI5BjK4IhIIfoCXuSQlIMy4DRolty8P9_8-eCZ9QbhYFLSqh_XtCVqNFmLggFQYUydDS9cNsuD--ov-QKB9RZkSvsURfbXGHlyJcJ9QWF3gU1_ggE6XR4IysQTwGkiXyqGzDwrWFnCSZP4ApMFEgyeErw--MXVN51IA1B6p3YBkwoIVI2SzBEmkeXAdMSJEuBnlChZc8RNQ7kPfc4juoTJmxuGHO2meF5YXh-FN2Ad3UjDZ8SAQcwkIRjmx2MCEUqwXpXVWuL7WpTM92dSZHfuXAnjkNCjZ45EfRGKM7xZ1gXjvvgErck0Vnw3Gcd-wGK7xAplBT34eyCmJpg8_UlTyDRnMlDx0mmT9uYaNl4SEcS2yhoyJwHqKNxYR-SGBeozGpvUoLehZJ7VJjIkxUq_xJqzVvceN_YhYV2ly-4m_ulJupQowIXltbm_riCtd7upudaU3-u7-UquFsLjuOrQu_CcXWwfuq4itxOhtNhXXvvOMq191Gh8HqguA2YVRq_fSC2_Q-xw1qseCBW_EtsdxvoIred4Di-jn8AxpvLHq4DAAA) · [graph](graphs/style-switchboard.noodle-graph.json)

## 🎬 Video

- 🎬 **Text → video** — One sentence in, one short cinematic clip out — the fastest route to moving pictures. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23QTWrDMBAF4KsMb60Ux-mi6AI9RMlC2JNWVNIYaWLHBN29KD_Ei26HB-97c8UMuzdIMnKB_brCj7AYdj4pJ4WBrhO3i8R4P1xgPzqDFXZ36AwW2EPfGZw8h7HAXqF8UVh8cuLslAs5Kj-SlQafODr1A81-ZKEh-IlOWWJL-PQdmAq33oHfYDBIkAyLlUOQBbWahy7tX65b2Ra1_xfjqARZNoIxS-LmUpKZMzmKvuhKUc5JnU80uxB4JadUzin7wltAvwHcttwJ7_3D0G0NtR4Ngk-_mweHNqFNb8b2_OesSbI-Z1UDlW2gfwWmLHFS1HqsfxV59xLEAQAA) · [graph](graphs/text-to-video.noodle-graph.json)
- 📽️ **Photo → video** — Generates a still image from a prompt, then hands it to a video node that animates it into a clip. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA21RS27CQAy9iuX1UIWAWmku0ENULIbECVYndjRjCAjl7lUSEJHK1no_v3fHC_qtQ9GaMvqfO3KNHqsNi5EYOrRbT9NFu245XNF_Fg5v6De7wuGAflcWDhumWGf0dzS6Gnr8JqEUjDIEyMYxAnehJWiSdhCgT9r15sBOJBCEuxnKBiymE-WkyeDCNSlUkfsPdFhp1IQebxSjDjiO7pFXtq-ks_065vZtvADGcoMcOB41GKhAgDbqwNLCkTWeOxbKFYlBpuBAuD2Zg2wh5bV1-bKeH1y898XDvFibr2i7FW3-cuF97d_xcGkLPeaoA_TnfNqwOGhJLBIM4ULZQRU6SgHqxI1laDQNIdU4jgeHkeV3tW-c-pqGmLSn7Z8d9prs2eHo0HQNKF-AR57XP7F8o7giLNX8k9z9Q4yH8Q9bpSQUlQIAAA) · [graph](graphs/photo-to-video.noodle-graph.json)
- ⏩ **Extend a video** — Upload a clip, grab its last frame, and let an image→video node keep the shot going. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA22RTU7DMBCFr2LN2kX5QQh5zykQCzeeJqa2J4qnP1EViRUHQJywJ0FOAklVlrbfG3_vzQWOoHIJgQxGUK8XsAYUVBsbGAODBO5bTDfk_XRxBvWcSehBbcpMwglUWWQSdhadiaAuwHhmUPByZgwmCh3EoXWkDRpROdsqUXd6G4XlKJyOLHad9ih0MKLRyWBZMCWb9brG6-fX0RokkRDTwx6xFdygiA2xqMmG-gEkVOSoAwU9OkcnGAY5Zwn5kuI4kUwpnqYU-Q39ylesfCNjnHzl42zMbmLPktSmsYkEg1ljlMs4OyaaKYp_p7Ud-ZbH4gPbcMAlckTtHcboenH9-BYxtRcP23esWE4nT2wpzAdn64ZtqGEY3iQ4G_arRbtUzq4jn_5MDf8W1lKXfp9ABwlMa0Vxp_jL6Yp_Jq70Y035_chykYx7T7jDDwSWSHCfAgAA) · [graph](graphs/extend-a-video.noodle-graph.json)
- 🗣️ **Talking avatar** — Upload a portrait, type what it should say: TTS speaks the line and a lipsync node animates the face. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA32SwW7bMBBEf2W7l1yYQLaMtOCtt-ac3IocGGltEya5BLmOIhgC-hH9wn5JS8uBWMTtdTEzejPUCV9RrxQG7imj_n5C26PG7tYGoSCoUMZI5cLez4c31F8ahSPq27ZROKBu143CrSXXZ9QnFHoT1Pg1WG-EMpgAx-jY9NRD5CTJWNHw9PQIOZI5ZBj5mMDZQGBCDwacjXkMHRQo8PxKGWRPsDUdgTB4I93-DhV27DihxpGc4wGnSV3ww2oBnz89c9_P3Pc1buVaL65zh9pzveM3W8gSfYIHOGbqC94LgYEs1jmIe_5z-PXjZ1EFyOzphfsRBpuKdp-IziUzCO-oJKnzBIEHeICBw41AFo4gxh1s2N3VHduKVvIMu2kutM0_Km4W02Xl2fh5MxtX67-NzwqdDYfq13Bl221iX2Yo8O_Llad9X25SKFwL2kUQE_soVRO3vpK4WgzWmx19jNx8UCyJ7ZXECsEce8v_TbwopufpN6bhyBsiAwAA) · [graph](graphs/talking-avatar.noodle-graph.json)

## 🎵 Audio

- 🎵 **Lyrics → song** — One idea fans out to two LLMs — one writes the lyrics, one invents a matching style — and a music node sings the result. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52SwYrbMBCGX2WYsxISOwRWD9DT9tJLKWUPwp7EQ2TJSON4TTD0IfqEfZIi26m9kG3p3oQ0-v9v_pkbXlHvFTpfUkT9_YZcosZiw07ICSqUvqF04-t6unhFfdwp7FFv9vudwg51nu0UnphsGVHfUOhVUOMn4yJ4RxC9OwOXZMC3AuJBOg_Pz58j_PrxE2wfuIhgXAkGaiNFxe4MUXpL47tU5NJLG7mAxAmR3TmmewgUWytbVFh46wNq7Mla3-EwqLkVt1-aGMHWHRwfcX8NLAQGOo5yai087SJI4GZT-QYkmOKyhS_UkJGRofL-sl0bZouhtfXklx8mw7dBxT4K1ajxm2_BhGSasuoSQNjCBOKd7UejOaiUifMgLJZUOs2jMaF_g5E_wDhmM8bxfQ52V3JyT9zYeRRSGYETyxT8ma_kZqIxDdtDx1IttOMvBYGLyvZQUiwCN8JXujfwDvZhwR4BJvCn3aOBsYsS2lHFoj4ZG2kYXhRadpfVNtu0Aqfg6_QnbdB9LRof5L4Wg0Lx64JsKWiCrxtZUdrsgWL2L8XDUjAlt1bMP6KY_43x8EAx_w_GP4ovw2_8HVPOJwQAAA) · [graph](graphs/lyrics-to-song.noodle-graph.json)
- 🎙️ **Voice memo → notes** — Ramble into your phone, upload the clip: transcription plus an LLM turn it into a summary, bullets, and action items. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA3WSzY7bMAyEX4XgWQkSu1gUeobtpeit6EGxlYaoRAoSnawQ-N0L28k6-3cdzJCcD7ziGe3eIEvvC9rfV6QeLXYbYvWsaFBr8pMiMS7CC9rvO4MV7abdGbygbZudwSP50Be0V1T_omjx15C5gIPs4iEQ_4WzUOch-ihArAIOyhCjy9XAYQjBKyQh1mLAcQ-uUxIGUh8LnMmBZsely5RmPYWhgGN4fv6xRYOdBMlosfoQ5ILjaG5NeL92cEMK4vqlw9PSYf_m9odcs-bumw9-ibbfbtndF9l2zYYQb_uaz0JYalEfb7hAT1Qgu8vCajOzWnsv2JT6CizqiwVhvwnE_k4SjpSLGtCT5_dQZ81xfUN2Cz99ChUupCcQDnWyLdO3OI5_DAbifw-fESaexyxxOn76mjvjJFlnxj0JjgZVHh3NB8crrdB8MvHBP7_Th4HtakhZYtLp2vE_Py82N88CAAA) · [graph](graphs/voice-memo-to-notes.noodle-graph.json)

## 🧠 Multi-step

- 👁 **See, think, speak** — A photo is described by a vision model, distilled into a four-line poem by an LLM, then read aloud by TTS. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwY7bMAxEf4XgWQkcOyhQn_sFRS9FsQetxdREZVGV6GSNwP--sJ3WTtdArxJn9GbEO16xPhkM4ihj_eOO7LDG5sBBKSga1CHSdCJdtxy8Yf2pMDhgfagKgzesq7IweGHyLmN9R6U3xRq_UG4Sv1IGG6CPXqwjB7EVFbixtmDhypklQCeOvAHHWdn7DKzAQQUsXKRPB8-BIAp1BmxwkMi6ecZ66R3YDDkSNe0RDTbiJWGNA3kvNxxH8wgUTmuUheUpyekpwUZWrrIFdpFV54eueEr-exMbtOUM3NmfBBzgyld2BhoJTSIlcKSW_XGLWK1ved89-Mrdh_KQlTqs8bv0YBOBnQrSI3zrUwBtJ_8JI-rU76PMG2e99P6fUo_wlaIfli-R4IdZPt9s4c4rnGpe4D4Xe3Dj-GLQc_i12Sc_1X9J0k3w0679-ZIoadqVuSYcDapsJ8oPE3-BfLnjuJmfl_CDYbUOxCRd1K1jteNY_c_xvOP4Mr4DM37hlFcDAAA) · [graph](graphs/see-think-speak.noodle-graph.json)
- 🌍 **Auto-dub** — Upload a clip: its audio is extracted, transcribed, translated by an LLM, re-spoken by TTS, and laid back over the video. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA51TwY7aMBT8lad3NgiSEFHfet_20OVW7cEkJrFwbMt-ASLEv1eJQ5MKukh7tDUzfjNvfMUT8jVDY0sZkP--oiqRY7FQhqQhZEidk_2NbZp4cUG-XTHskC_SFcMz8jRZMTwoqcuA_IokL4Qcv7dkF2W7DyAMtE5bUcoSCq0cB3khLwoKQLUE0ZbKMiAvTCi82sswHrQgGeCkBLy9_WDg5SI4KY4Bzopq2O3eGQhTghZdAEWwF8UR7En6QfWkSmmXyLCw2nrk2Emt7RlvNzaaNOvJ3ikOGO3l0V4-dzWjJRNt9DE4iNw0i-Tkf-x0Yk-Ox3eTF9xs4mrdRNK31TMShi6QbJDj7p7kkMr9SUegDFl4d8KoUC_hp6DWCw3B2aM04GovgjIVg6AapYUHLU1FNZAddKxXlTI9Pp5JNcpU4G1b1bqDg6KwhF_S6S4uyxrdTQNoQcqa5XwXm1ksFKK19Xr7IpB8YgXbmrLfxnEkZ-Mat_9yPxhqZY6zsuu-Bwdvmz63_iPcu-Gs74s8NAlvDMnOEckD4u9cOnmiOMPHvjwopg-ISTF9ojjDD3_uQTCbAM7bxtFcMXuimL1S3HymuPlSjvknOeZPFDcvc8wfc_y4_QE-_FJO6gQAAA) · [graph](graphs/auto-dub.noodle-graph.json)

## Add your noodle

Made something worth slurping? PRs welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md). One noodle per PR, graph file + share link
+ one-line description, and `npm test` keeps everyone honest.

## Checking the links

```bash
npm test                                        # node --test: decodes every README link,
                                                # round-trips it, compares to graphs/
node scripts/make-link.mjs graphs/<slug>.noodle-graph.json   # print a fresh share link
```

Node ≥ 20, zero dependencies — `package.json` exists only so `npm test` works.

## Limitations

- **No screenshots yet.** v1 is text-only; previews are planned but we won't
  fake them.
- **Graphs deliberately omit model ids.** The editor backfills each
  model-bearing node with the newest live-catalog model of the right kind on
  load, so links never go stale — but it also means results (and prices) drift
  as the catalog evolves. The headless runners do **no** such backfill:
  nanoodle-js / nanoodle-py refuse to run a model-less node (`pick a model
  first`), so open the graph in the editor and pick models — or set
  `fields.model` in the JSON — before running a committed graph headless.
- **Costs are estimates.** Rough cost is covered by the heads-up at the top
  (images typically cents, video more) rather than per entry; actual price
  depends on the model the editor picks and your settings.
- **Links are only verified to decode.** `npm test` proves each link
  reproduces the committed graph; it does not run the workflow or verify
  output quality.

## License

MIT — see [LICENSE](LICENSE). Not affiliated with NanoGPT. Build workflows at
[nanoodle.com](https://nanoodle.com).
