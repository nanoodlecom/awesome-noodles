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

- 🖼 **Text → image** — Type a scene, wire it into an image node: the one-wire hello-world of noodling. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23RXWrDMAwA4KsIPTujzToYPkffRh_cWElNbSk4WtNQAjvETriTDPeHZrAng9DPJ-uCJ7RrgyyeBrQfFwweLTZVYCVWNKhTTyUiKd0CZ7TvK4MT2qq8I9rNamWwDRT9gPaCSmdFi9sDgTBVY8gEB4pRqlFy9CAtsIiPgTv4-foGT0OTw57AwdAQk4GOFBxDSK6jFzTYSJSMFqfSZcR5Nncnr5_C69glb13_x3KQyUPv2Dtwg2Zh96ngc2i1gOREGZiEqxgUtnKcBJwCh-6gBprAlJyGxsDrW0pLSf2UXN03yqa-W_5-URJPsVQ5lmrv2LGr6jKRcJ53BmPg4-IcsazZZkmltpzqsXovWR-rzwZVlgn1M6HPknotvedfthPaGvIBAAA) · [graph](graphs/text-to-image.noodle-graph.json)
- ✂️ **Edit a photo** — Upload any photo and describe the change in plain words; an edit node repaints it. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2WRwWoDMQxEf0Xo7JTNNpTiz-i15OCulY2ILRnb7SYE_3sxScmGHjVomHnSFX_Qbg2KeipoP6_IHi1OG5ZKUtFgvSTqisZ4E85o3weDF7Sbt8HggvZ1Nxg8MAVf0F6x0rmixQ9KjqUWcALfKajz5CEdtSq4adLsWWbogwB5ruCpTJm_yAMLpOBYYNHsywsanDRoRosXCkEXbM3ci8r2UfEW8tRwO66brWzjw9bDb6bdeHcNTzwpa0ydKLoTAVcQno91UzmSAec9zEGXDiOkAoVn6cweckfIdAg0VVYp2NreYGA5rS4dOsAha-xJ_Qt_UElzz-ToZsJmsOp6Y_y30fbtF9aUWqzNAQAA) · [graph](graphs/edit-a-photo.noodle-graph.json)
- 🥊 **Model arena** — Same prompt fanned into four image nodes: pick a different model on each contender, run once, judge side by side. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52TQW7bMBBFrzKYNR1ZFu0W3KYJ0E0QBN0VWbDiWCIscgSKcqIaAnqInDAnKWTXtQIoWnilhQb_vSE_D7hHlQr0bKhB9fOA1qBCn6LA2NWECnN2jnxEga-oNkuBHSq5FLi1VJkG1QEjvUZU-GjzHWj49v3-_u7p7uEHODZUAXsgnZdwyz6SNxQExJI8PLUe3v-8QaMdQR3Y1RG23AZ40V0joLGG4Fd3_N5gL_AFVTZwG_ubRtgvsu_FWXt10T7-HTtnyylpDdH6DkzQBXvI21CRgbYG3VRENVgPGiLpvK0FOJ0HhrrkyAIa3kZwHLz1BVS2KCOORLKLiHW6oJOJ_Key-WByPCZUWNRxcRxepDfrYWOv3RDw_-AgxQtBThK-zhKsIS6CdsleJtY3Ufs4yVmNOOvZTeQ0qLQmkHYLTk8bTVKyEWUzu80nlF0gnexXiSNjW5cMN7qIPEOU2D8LrKzfjbpeDV3fBnZD9PAOzkWqOcRzkXqBkccD2WXg1N3R7VeraxLlXGJ2TeJ6LlFek7iZSHzu_wLvOVqlRQQAAA) · [graph](graphs/model-arena.noodle-graph.json)
- 🎛️ **Style switchboard** — One subject, a Choice node full of art styles, a Join to splice them: flip the switch and re-run. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA5VSQY7bMAz8CsGzXMR2sLvVtUU_sdmDYtOxGpk0JG68bmCgj-gL-5LC3iziAEGLngRQ5HBmOGc8oc0NstSU0D6f0ddosco8K7GiQR17mivSde-FN7QPG4Mj2iwvNgYHtNv5bTyFOqE9o9KbosVvwfegLcGXVnxFkAavVQuOa4iUxVeG3z9_QXIdQaqIyUDjTwQuKiQdA6VPaLCSIBEtjhSCDDhN5kKR8yu5ZeGa2cM9Pg6CP7TaymsiEAYHSSV22d6pUqQaquCbZr2iWOlfNNwsKbc3W6RXL5zQYhBJBINTigv9RbLn4459ko40-gqCDFkvYYTyK0TimuKOT57VHQjyz4-bBBrdiQL0knT-rFoXK3EB0pG0ag205E4jHKLzvOOkzjPV2SG4lGDwXMuABhMFqpTqv5DCaTlhOZ8w-R90qyXPn1Z-lFc_vovndzeW449oi6cbOxL1aNGA5yUDy0VBGlj7u73i-c4dLvY-bi-AmxvATmoK85RjyfaOHbusyIJXwml6MRg8H1cRDnM-mijdPDvH-yMzvUT9yMxkUGXdUF4b3IppKO6AFf8Btl-DlXfAyn-Bba8NfZSu11n19AddHDlSwAMAAA) · [graph](graphs/style-switchboard.noodle-graph.json)

## 🎬 Video

- 📽️ **Photo → video** — Generates a still image from a prompt, then hands it to a video node that animates it into a clip. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA31SXW6jQAy-iuXnoSWkqlZcYA-x6oMDDrF2sNGMExpF3H0FJApVq321vj9_9g0vWO8CqrWcsf5zQ2mxxqYQdVbHgH4deJ5Y36-DT6x_lQGvWBfvZcAR6_1bGfAoHNuM9Q2dPx1r_M3KiZwzEGSXGEF66hiOyXogGJL1gwfwEyuQSr9AxUHUbaacLDlcpGWDJsrwggEbi5awxivHaCNOU7jn1d0z6WK_xHxfY-6qn-IRuOgVMkk8GDmYAkEXbRTt4CAWz70o54bVITMFUOlOHiA7pby1rp7Wy4Kr91t5Ny-_mPfWcpxZpFYcSEmpqIoozlvJ_UZyaeBee_VfzSGdlQqS16FYSK9LnMKteGisnWONOdoIwzmfCtEAHatHhpEunAM01HMiaJMcPcPR0kipxWn6CBhF_26-JM6tz-ecU8wf9LjEYMkfl5gCum0B1RNwz_PcPFY_KG4Ia8HfJPffENPH9A8LLGRE2wIAAA) · [graph](graphs/photo-to-video.noodle-graph.json)
- ⏩ **Extend a video** — Upload a clip, grab its last frame, and let an image→video node keep the shot going. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA22SQW7DIBBFr4JmjdvEiaqKC_QQVRckTBxaYJAZJ7EiS131AFVPmJNUYKdx1a4s0P_jx4MzHEAtJQQymEA9n8EaULCtbGAMDBK4j5h3yPtx4wTqcSGhB1Xl7xHUul5I2Fl0JoE6A-OJQcFTqzdJ8B6F04nFrtUeBe1ET10rts5GoYMRex1MEpYFk7BeN3j5-DxYgyQu71-lnfbE4g0xJtGQDc0dSNiSoxYU9OgcHWEY5AQeljfkQxcdaTMiP4zIy1-os1496xXUNPZW66m4-HXGKZLVGZtJMJg5xuo2zpbjTBT1v9M8GXSgILZd0JW297EqpftipGKqrjNiSz5yuY_ANnR4U5RQe4cpub6oS1l36javuGU5rjyxpTAtnG32bEMDw_AiwdnwNrt_lzXuWvKZLr-Nq9pIbf77iDNIYJon6j-JHyOu_mfiLF-ELv-OXN0iRUbGHb4BHUBtWLYCAAA) · [graph](graphs/extend-a-video.noodle-graph.json)
- 🗣️ **Talking avatar** — Upload a portrait, type what it should say: TTS speaks the line and a lipsync node animates the face. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA32SwW7bMAyGX4XlZReliJOgC_QEK3Zcb0UPaswmQiRRkJi5RmCgD9En3JNsslNYRYOdDNA_P3wkdcbfqBuFgVvKqB_PaFvUuFvYIBQEFUofqVTY-6nwivpuqbBHvWhWS4Ud6k35vlhybUZ9RqFXQY0PD78gRzLHDD2fEjgbSIEJLciBwNmY-7ADzy05MMF6I5THX5GTJGMFhMEb2R1uUeGOHSfU2JNz3OEwqItraGbLU3Rs2k-Sd7Va1bWau0bfume9vTbPD1vsEt3APZwytUXvmcBAFuscxAP_K_x5ey-pAJk9PXPbQ2dTyR4SEYxrBuE9FdK0jMAd3EPH4ZtAFo4gxh1t2N_WM64rW8mT7GZ5sf00Io4LRY0_-ciJF9uVr0GbGXS5wAT7vp1gzfIqzJnyHMb4MDwpdDYcq_fiyg1eEvvSU4b82HA55ceGB4XCdWA9B2JiH6USdasrxGZusN7s6Sty8yUxE9dXiJWCObWW_0u8JIan4S_b9PF_NwMAAA) · [graph](graphs/talking-avatar.noodle-graph.json)

## 🎵 Audio

- 🎵 **Lyrics → song** — One idea fans out to two LLMs — one writes the lyrics, one invents a matching style — and a music node sings the result. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52TUY6cMAyGr2L5GegMQ6s2Z9hRpX1ZVdU-RBDAmpCgxAxDR0g9RE_Yk1QBprDqbKvuGzL27--3nSueUewjNLZQHsXXK1KBAvOYDCvDGCEPrQoR2zRz4ILiwy7CAUW8z3YR9iiyEChJ6cKjuCKrC6PAz0YBFUpCKY0H2zGwBe4tPDwcPfz8_gP04Cj30OrOg4RGcl6TqcDzoNWUwLUy4U_nKYfGFkqDJ1N5IE4wwtxq61DgoLS2PY5jtPCb_Uo-0WyxJ-o_aJ8csQIJPXkuOw2fdh7YURvXtgV2Mj8l8KhaJTlQQW3tKdl2TNeOWjdzw2w3d0xfNJx8oMBvkmLrqneVbuL3Saj3g2fVoMAvtgPpAo63puoDmktgRrRGDxPCMr0wJ2OBibWKwteyKumGF4CHO4Af0xkwy95CSOasDN_2I_WyOK4lQ0nsJ8qKzsosrNME9QA9cb36mKoicJTXeoBC-dxRy3RWN2uvGMpWQxPAbGmfZsua70_9SIYaeYmPoSTeBVNkPLtuaqFRlFJ7NY7PEWoyp82j0OGoSmebIBcezO3QWuv4dmhjhGy3Cema0DrbtLyxoNM7ium_FLM1YR7rVvHwFsXD3xizO4qH_2D8rfg8_gKIYXRRbgQAAA) · [graph](graphs/lyrics-to-song.noodle-graph.json)
- 🎙️ **Voice memo → notes** — Ramble into your phone, upload the clip: transcription plus an LLM turn it into a summary, bullets, and action items. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA31Sy47bMAz8FYJnOZs426LQN2wvbW9FD4rNJEQl0ZCYeNXA_15o42wcbNGjiBlqHrzgGe3GYJSeMtqfF-QeLXYNR6WoaFDLQHUiIVwHr2g_rw0WtM2XtcER7XN975l8n9FeUOlV0eKP5GLuEu8og4Pkws5zPMBZuCMIFMSAHimCi_Dy8hWUe6YMrMBRBRzkUwguFQO7k_ek2YCLPbhOWSKwUsgrNNiJl4QWC3kvI06TmS3EzV28Ow1eXP8gftMuRS947Z2n7xau1O3zzF0_GA7Sk0eL30uujKe9y0qpGY-cB0qNd-lAzXm7FLe9f-J9mIW1_93-x3Ej6fB08KH5tKoqc8lKoUZ9ShH0yBmSG68JNzVhuBkY5lSV-wJRlLIFidR4jnQLGvacss6lXDOHQTjW5OeiymP88I0GX2BkPYJEXyrsun2F0_TLoOf4e3FVvlayTxKqrXpxt5oGSfpWU8-Ck0GVJaL9gHjP0bf_2LjAv53ih4XbO2BIEgataqe_b7RYrAsDAAA) · [graph](graphs/voice-memo-to-notes.noodle-graph.json)

## 🧠 Multi-step

- 👁 **See, think, speak** — A photo is described by a vision model, distilled into a four-line poem by an LLM, then read aloud by TTS. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WSQW_bMAyF_wrBs-0lTjp0ug3Ybd1l2GUYevAsJiYqiZ5EJ_UC__fBjje7aNAdRfE9fI_kBU9othkGsZTQ_LggWzRY5xyUgmKG2rc0VsT7a-EZzftNhj2a_H6T4RnNfnwfmJxNaC6o9Kxo8COcOLEE8GLJgaVUR_5JCXrpIrSNqGRQBXh4-AKWk7JzCViBgwpU0Ar58d9CaonqBiJVdmqonHS2wAxrcRLRYE_OyRmHIZvxw3YB71onlX3BvS3XvCtZuciu7FfZbj_rNi9yTrnQ4JE8B87L4i4_uCo1uWMlzPAXGvw0pwZtOAH76kjAAU58YptBLaGOpASWtGJXrCPsFhbn_Mxfvgnyu-Jc4vHd0fn8rhjDpD4peTT4XTqoIl3nqgV862IAbWheS6vjoubJnznpoXNwkC7mjgNNuyjgK7WuhzNrAxJcP8mnnzX2fsFWTVfsD5s3sT_Lk0TJ70uPw_CYoePwtLpFNy7zEMWPmvFO_y64lTje2TRUHDJUWXeUrzr-QbryhuOqfzrgV4a7paGN4ltdO-5uOO7-57i_4fg4_AHTJgpYkwMAAA) · [graph](graphs/see-think-speak.noodle-graph.json)
- 🌍 **Auto-dub** — Upload a clip: its audio is extracted, transcribed, translated by an LLM, re-spoken by TTS, and laid back over the video. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52TwY7aMBCGX8Wac8JCCIjm3lOlHrq9VXvwJiaxMvZY9hBIEVIfok_YJ6lMoMkKlpV6s0fzf55_ZnyEDopFApYqFaD4cQRdQQFlqi0ry5AA907FCBkzBA5QrOcJ9FCki2yewB6KPAa2WmEVoDgCqwNDAZ8P7GXJQchdpSkR7KUNpdevKlwuKDmevUqDU7IN4s-v34IbZQXKPsSTsGovOtKlEq-ybAV1yp_jJWo3gwRKQvJQQK8QaQ-nU3KxYBdj8d3OIcnqTfFvSp7IslGmBgPn8gftMh_E2Xvq5age7V7eze5pwVClEAp47kNUPG1lYOXTfaODUz5F6WuVdsups3x8BNEM9E_zh_SfUqfk66caTbqaRY-hD6wMFPD9OolzX69VOxbaMolnJ60OzUx8lbzzEkVw1CorXONl0LZORNBGo_QCla25EUxnDnldaxvzhztro20tPO3qBnux1Rxm4pty2Iu95kaQxX4sACVrsrOp6dWksxwG04vF5qHrL9SSp3STmSlpPZIC7WwVh9xegPllOzZv5_uSAGrbTn4IxvXaejLxvfh7rivnyMfl73SlCE4JME0zspuMf3Vhdoc4yR_W8Ia4vMkYics7xEn--Z_eAPMxwXkyjqfE_A4x_4i4ekRc_Vcf1w_6uL5DXH3Yx_VtH19OfwFOK1PHHwUAAA) · [graph](graphs/auto-dub.noodle-graph.json)

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
