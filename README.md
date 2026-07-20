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

- 🖼 **Text → image** — Type a scene, wire it into an image node: the one-wire hello-world of noodling. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23RXWrDMAwH8KsIPTujzToYPkffRh-8WElNbSk4atNQDDvETriTjPSDZrAngRD27y9d8IR2bZDF04D244LBo8WmCqzEigZ16mnuSEq3xhnt-8rghLaa64h2s1oZbANFP6C9oNJZ0eJ2TyBM1RgywZ5ilGqUHD1ICyziY-AOfr6-wdPQ5PBJ4GBoiMlARwqOISTX0QsabCRKRovT_MqIpZi7k9dP4fXbJW9d_8dykMlD79g7cINmYXdU8Dm0OoPkRBmYhKsYFLZymAScAodurwaawJSchsbA61tKS0n9lFzdN8qmvlv-rKiUncEY-LBYeZyjtFnSbJ3P8YjXS9ZHvGJQZTlQPwf6LKlXLGVXfgElYBnq1gEAAA) · [graph](graphs/text-to-image.noodle-graph.json)
- ✂️ **Edit a photo** — Upload any photo and describe the change in plain words; an edit node repaints it. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2WRwWoDMQxEf0Xo7JTNNpTiz-i15OCulY2ILRnb7SYE_3sxScmGHjVomHnSFX_Qbg2KeipoP6_IHi1OG5ZKUtFgvSTqisZ4E85o3weDF7Sbt8HggvZ1Nxg8MAVf0F6x0rmixQ9KjqUWcALfKajz5CEdtSq4adLsWWbogwB5ruCpTJm_yAMLpOBYYNHsywsanDRoRosXCkEXbM3ci8r2UfEW8tRwO66brWzjw9bDb6bdeHcNTzwpa0ydKLoTAVcQno91UzmSAec9zEGXDiOkAoVn6cweckfIdAg0VVYp2NreYGA5rS4dOsAha-xJ_Qt_UElzz-ToZsJmsOp6Y_y30fbtF9aUWqzNAQAA) · [graph](graphs/edit-a-photo.noodle-graph.json)
- 🥊 **Model arena** — Same prompt fanned into four image nodes: pick a different model on each contender, run once, judge side by side. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52Sz0rDQBCHX2WY8yJtk0bZq7bgRaR4kx7WZJIs3T9hs7GNJeBD-IQ-iaS1Zg8llZ72MMM3H_v77fEd-ZShsRnVyF_3KDPkaKbI0LcVIcfUak3GI8Md8mTCsEUeTxjmklRWI9-jp51Hjs8y3YCAh8flcrFaPL2AthkpsAZIpCXcW-PJZOQY-JIMrBoD359fUAtNUDmrKw-5bRxsRVszqGVG8NYe3hvsGG6RR_3dWn5QcPY27jp20p4N2odp6BxNzkkL8NK0kDlRWANp4xRl0FQgakVUgTQgwJNIm4qBFqmzUJXWWwa1zT1o64w0BShZlB4DkWgQkVoUdDSJf1WS0KRjaITuN_9-CKY4oOKzqLv_omYBaj5qFV9kRQErGdW6zIqxWzNU0myC3qm-d7mzuk-o7-Qp1Mo6fwq1Y-htuBANC8ceBUmo2TXEeIwYXUOcjxHja4jJGeK6-wGBs6ft0QMAAA) · [graph](graphs/model-arena.noodle-graph.json)
- 🎛️ **Style switchboard** — One subject, a Choice node full of art styles, a Join to splice them: flip the switch and re-run. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA5VSXW7bMAy-CsFneYjjoO30umGXWPqgynTMRRYNiY3rBQZ2iJ1wJxnspogDFBv6JIAivj9-ZzyhLQ1GqSmj_X5GrtGiLzgqRUWDOvY0T6TrXgcvaO82Bke0RbndGBzQ7ua3YQp1RntGpRdFi98C96AtwZdW2BPkgdW34GINiYr0HOHPr9-QXUeQPUUy0PCJwCWFrGOg_AkNegmS0OJIIciA02QuEmN5FbcQrpXdvafHQeBDq608ZwKJ4CCrpK54cqqUqAYfuGnWFNuV_8XDDUm1u2GRXlliRotBJBMMTikt8hfLHI_7yFk60sQeggxFL2GE6iskijWlfTxxVHcgKD_fbzJocicK0EvW-dO3LnlxAfKR1LcGWnKnEQ7JcdzHrI4j1cUhuJxh4FjLgAYzBfJK9T9E4bScsJpPmPkn3Xopy4dVHtU1jx_C8TWN5fgj2u3DTRyZerRogOPSgeWiIA2s891d8bhzh0u897sL4GYNOE2PBgPH46qmYe5Ak6SbCecKv_Wil6RvvZgMqqwXquuCW6kJ23fAth8Ae1qDVe-AVf8D210X-iRdrzhNj9NfZhPeUKQDAAA) · [graph](graphs/style-switchboard.noodle-graph.json)

## 🎬 Video

- 🎬 **Text → video** — One sentence in, one short cinematic clip out — the fastest route to moving pictures. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23QTWrDMBAF4KsMb60Uxwml6AI9RMlC2JNWVNYYaeLEBN29KD9Ei26HB-97c8UCuzWIMnKG_brCj7AYNj4qR4WBrjPXi0zT_XCB_egMVtjNe2dwht3tO4Oj5zBm2CuULwqLT46cnHImR_lHktLgI09O_UCLH1loCH6mY5KpJnz8DkyZa-_AbzAYJEiCxcohyBmlmIcubl-uW1mL2vb_YRzlIOdGMCaJXF1KsnAiR5PPutIkp6jOR1pcCLySU8qnmHzmFtA3gNuWO2HfPwxdayjlYBB8_G0eHOqEOr0a6_Ofs2ZJ-pxVDFTaQP8KzEmmWVHKofwBhSSXZsQBAAA) · [graph](graphs/text-to-video.noodle-graph.json)
- 📽️ **Photo → video** — Generates a still image from a prompt, then hands it to a video node that animates it into a clip. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA21R24rCQAz9lZDncalVZJkf2I9YfBjbWMNOkzITrSL996WtYkFfw7nlnDte0K8ditaU0f_ekWv0WK1YjMTQod06Gi_atvPhiv67cHhDv9oVDnv0m23h8MgU64z-jkZXQ48_JJSCUYYA2ThG4DY0BMekLQTokradObATCQThdoKyAYvpSDlpMrhwTQpV5O4LHVYaNaHHG8WoPQ6De-SV9SvpZD_F3M0x1-WneAGM5QY5cDxoMFCBAE3UnqWBA2s8tyyUKxKDTMGBcHMyB9lCykvr8mU9PTh7b4uHebE0X9A2C9r05aPa8hMP57bQY47aQ3fOpxWLg4bEIkEfLpQdVKGlFKBOfLQMR019SDUOw95hZPlb7BvHvsYhRu1x-2eHnSZ7djg4NF0Cyhfgkef1Tyw_KC4IczVvkps3xLAf_gG90csdlQIAAA) · [graph](graphs/photo-to-video.noodle-graph.json)
- ⏩ **Extend a video** — Upload a clip, grab its last frame, and let an image→video node keep the shot going. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA22RUWrDMAyGr2L07I42LWP4AjvE2IMbK4lX2wqx0jaUwJ52gLET9iTDSbaktE9G5v-lT78ucAS1kRDIYAT1dgFrQEG-soExMEjgrsb0Q96PH2dQL2sJHahVek-gdtlaQmHRmQjqAoxnBgWvjd5HwRUKpyOLotEeBRWio7YRubO10MGISgcThWXBJKzXJV6_vo_WIInr58_gjhWxOCDWUZRkQ_kEEnJy1ICCDp2jE_S9nMDDZkY-trUjbUbk5xF5c4O68GUL34AaR992NxnXNztOkhSdsYkEg1libOd2dlhnosgedqsb8jUPKQe2ocV58YjaO4zRdUMgMYUY2_0H5izHyhNbClPhbFmxDSX0_bsEZ8NhcVWXwika8mlmuvhfYDU1afoI2ktgWiqyO8X_ni570HGhH2La3LfczpLh6Am3_wWZ_1HxjAIAAA) · [graph](graphs/extend-a-video.noodle-graph.json)
- 🗣️ **Talking avatar** — Upload a portrait, type what it should say: TTS speaks the line and a lipsync node animates the face. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA32SQW4bMQxFr8Jwk40SeGwjDXSCZp3siiwUi7EFS6Ig0Z0MjAFyiJ6wJ2nlcTAK4nYlgPr_4_FLR_yJulMY2VJB_eOIzqLGzY2LQlFQoQyJ6oRDmAZvqO8WCgfUN91yobBHva7nqyNvC-ojCr0Janx6eoSSyOwLDHzI4F0kBSZakB2Bd6kMcQOBLXkw0QUjVE5XibNk4wSEIRjZ7G5R4YY9Z9Q4kPfc4ziqM2vsZspD8mzsJ8i7Fq1xLWfXibf1rO4v7fPdVbpMV_AAh0K24r0QGCjivIe047-D3--_qipC4UAvbAfoXa7aXSaCU80gvKWaNJURuYcH6DleCxThBGL83sXtbbvjqqGVMsGuF2faf624nk3ntifjt_vJ2C0-G58Vehf3zT_wtdvXzKHWUOE_mqtP9NHcqFC4FaxmQcockjSb-OWFxG42uGC29DVy_UUxJ64uJDYI5mAd_zfxrBifxz9NVwSZDwMAAA) · [graph](graphs/talking-avatar.noodle-graph.json)

## 🎵 Audio

- 🎵 **Lyrics → song** — One idea fans out to two LLMs — one writes the lyrics, one invents a matching style — and a music node sings the result. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52SUYrbMBCGrzLMsxMSx5SuzrBLoS-llH0Q9jgeIktGGsdrgqGH6Al7kiLbWTs027L7Jkaj___0z1zwjGqfoHUFBVQ_LsgFKsw3bIWsYILSNxQrrq6nwguqT7sEe1SbfbZLsEOVxULJZIqA6oJCL4IKv1gCLkhDqW0A1wqIA-kcPD4-Bfj98xeY3nMeoDFtAA21lrxie4QgvaGxQSqy8aYNnEPtCjIQ2B4DsGwxwdwZ51FhT8a4DochmfntfiEfadbYI_VftN88C4GGjoOUrYGHXQDx3Gwq14B4nZ-28JUa0hKpoHLutF07poujMfVkmO0mx_TGMPRBqEaF310L2kfT4OyxiwB-CxOIs6YfjeaMYhrWgbAYSuJpHoj2_Q3G4Q7G53TCyLK3Odieyco1a23mIUilBUqWMLIc-Ux2JhrTMD10LNVCO75KwHNemR4KCrnnRvhM1w-8gZ0t2CPABL5Ps3lktwmyDeLbUcegKrUJNAzPCRq2p9UWm7gFpXd1fBM3_LoZjfNy3YwhQXHrhnRpaLyrG1lxmvSOYvo_xWxpmLJbKx4-onj4F2N2R_HwDsZXxefhDyHDvKcfBAAA) · [graph](graphs/lyrics-to-song.noodle-graph.json)
- 🎙️ **Voice memo → notes** — Ramble into your phone, upload the clip: transcription plus an LLM turn it into a summary, bullets, and action items. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA3WSwW7bMAyGX4XgWSkSpxgGPUN3KXYbdlBsZiEmkYbENBUCv_ug2mlctDuS-H_y5wde8QX9zqHoQAX9ryvygB77DYuRGDq0OlLraEpz4xX9t63Din7zfevwgv6x1UemOBT0VzR6NfT4MwcpfeYDFQiQQzpElj_wotwTJErqwE4kEASenn6A8cBUgA1YTCFAOacUcnVwOMdIVhwEGSD0xirARqk8oMNeo2b0WClGveA0ueUE2d3Dh_MYNQwfwu-6deiVr7v77P2E2bp_XLzb_3j3d2-MadnXfWXCUotRapzOWcBOXCCHy4xn0_DAbfu4IDEeKogaFQ8qtIksdKMER87FFqIzMBiVpWFbKNeP7OCZxljhwnYClVibbJ7-gNP022Fk-bt6idh4HrOmFr69y43xqNneGA-sODk0XSu6T4p3WrH7YuJK__ZHnwbu74IxaxqtpZ3-AQNwx8nIAgAA) · [graph](graphs/voice-memo-to-notes.noodle-graph.json)

## 🧠 Multi-step

- 👁 **See, think, speak** — A photo is described by a vision model, distilled into a four-line poem by an LLM, then read aloud by TTS. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WST4_TMBDFv8pozm7VJhUC35A4LhfEBaE9hHhKRjgeY0_ajap8d5Q_kKw2Ekfb7z3__DwPvKE9GwziKKP9_kB2aLE-cFAKiga1jzTuSNvOGy9o350M9mgP708G72gv4_rK5F1G-0ClF0WLH-HGmSVAK448OMp14h-UoZcuQWxExUAV4OnpMzjOyt5nYAUOKlBBFGrHcwc5EtUNJKrcJKi8dO6IBmvxktBiT97LHYfBLPjhvIJ30UvlXnGfiy3vxlastpl9tpWXxXd69c7faPHT8irQhjNwW_0k4AA3vrEzUEuoEymBI63YH7eI5XqX9-3CV-xelPus1KLFb9JBlWhuR4_wtUsBtKGl3Khj3Ut_d8567TxcpUsHz4GmRo_whaLv4c7agATfT_bpZAt3WeFU8wz34bQHNwzPBj2HX5vp8WP91yTtCD9O1t8viZLGyZhqwsGgylZRvFH8A_LFTuJGP43cm8ByFcQkbdRtYrmTWP4v8bKT-Dz8AaKWTkxFAwAA) · [graph](graphs/see-think-speak.noodle-graph.json)
- 🌍 **Auto-dub** — Upload a clip: its audio is extracted, transcribed, translated by an LLM, re-spoken by TTS, and laid back over the video. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52Tz46bMBDGX2U0ZxIFQqIt91576O6t2oMXHBhhPJY9-YOiSH2IPmGfpCKQQkS6kXrDo-_3eebzcMYDZnGElgsdMPtxRioww3xBVrQVjFBap7sKN01fOGG2XUXYYraIk1WER8zSrrAjbYqA2RlFnwQz_HoSr3IJoPYFcQTilQ25pw8dhoNR0n17vQhOqzrA75-_QCptwag2dF9g9REOTLmGD5XXwAftr_XckFtihDkb9phhq43hI14u0TCCjcfmD3tnWBV3zd-1PMGSEdP9ANf2e3ad9nDyL3o90uO4w73JEzYdWWOaHvqyegRhaIPoBjN8u8V4DeV2pRMgKwyvTlkK1RK-Kdl7ZSA4rrUFV3kVyJYRBGrIKA9G21IqEL76sKeSbKfvz0IN2RI878vKtLAjCUv4rp1p4UhSAVvTjg0YJcR2OX2LzSQWCf1ocfzyJJDtSAXe26J7jXqA0-EZX-7Z9wgN2Xqyyqbbg53npsutW_Pbbjj23ZYeqNCMlwiFp4pkpvjbl0keOE70_b7MHNczxei4fuA40V9_qJlhOgqc58bJ1DF94Jg-c9x85rj5rxy3n-S4feC4eZrjdp7j--UPavL6ksgEAAA) · [graph](graphs/auto-dub.noodle-graph.json)

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
