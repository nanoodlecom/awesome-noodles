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

The gallery so far is six deliberately small starter noodles (2–4 nodes each) —
copy one, remix it, and send us yours via [CONTRIBUTING.md](CONTRIBUTING.md).

## 🖼 Image

- 🖼 **Text → image** — Type a scene, wire it into an image node: the one-wire hello-world of noodling. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA03PwWrDMBCE4VdZ5rwB202h6Dl6KzmISHaXWCsjb0KM0bsXk5r4PHP4_hUPuJahOcQZ7meFBDhoC4YtU4SDxaeB8YT7ahgLXNs1jF7iGGa49bU7eCox0OQ1ePKzlaz-bhSK9CY6UH7EQhqznkYx-s63JZM3Uhl-jekqGpM3uTJ9fKaEWnmXdG-JJD_EF-Xc_Vuao6XWC2MUvR1Sxi2lLzlt1i1zz5tysT2vMiwfD937MJWcJkOtl_oHaw3NGy4BAAA) · [graph](graphs/text-to-image.noodle-graph.json)
- ✂️ **Edit a photo** — Upload any photo and describe the change in plain words; an edit node repaints it. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2XPwWrDMBCE4VcRc96CbXIoepWQg4jW6hJpJSS1STB692LaUEPv8zH8G75gZ4Jmzw32vEE8LHQGoT8Lw-KzxOw8CA_Y94nwhJ2XibAKR99gtzHoxZY_xl76Dzotv2o6KpSaU-mwSO7GRrpRCR_9rUtiMs57E2K-iwajnNU0CdqMU2-qEzWV18jXLlkbxrgQoujtEBD3gLXmtD_tca-okuv-KckFxiD0fFws_xbjMr4B7HVuiiQBAAA) · [graph](graphs/edit-a-photo.noodle-graph.json)

## 🎬 Video

- 🎬 **Text → video** — One sentence in, one short cinematic clip out — the fastest route to moving pictures. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA03PsYrDMBCE4VdZplZhmysOvcqRQkQbbomkNdLGF2P07sEk5lzPFN-_YYEfHYpGbvA_GyTCo4xwsHVmeBg_DQ5P-O_BYYUfp8HhJpxig9_eu0eglvSPrlI4B5MrxaqFqf2qkS5cKVCWZitlfRQLUmgJKfFKwag9SpXG6N0dgOkEWCSyvglf08cwnA29XxySlPspIe0Jt6p5N-55R9as1Y6s7mB6Pkz_h7lqng29X_oLvAf6CSYBAAA) · [graph](graphs/text-to-video.noodle-graph.json)
- 📽️ **Photo → video** — Generates a still image from a prompt, then hands it to a video node that animates it into a clip. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA22Q0YqDMBBFf2WY5yyoLbuQX1n6kDajHTYmkky1Ivn3RawYaJ9z7z2Ts-CIulbog6WE-ndBtqjR16hQ5oFQo9BTUOET9XelcEZdN5XClsnZhHrZ3jUaEPYzJMPuGoxA8GCgc2Fi38GVg3v07CndyAskMgo8d3dRkMTEhDmrHd0caO5NRxv7XL3gVQkvaqeiNrKlsPV-zp96OMTQD-vZyYUJhke6f7FX0JEXRzCZkZKCm-kpGrCRW0nQhjiZaDHni0LH_q_w5VZfbQz9ur263B0OIcruMCuUUAaaI_C65_iPaz4sFoVNzdvk6S2RL_kfqSP6aeUBAAA) · [graph](graphs/photo-to-video.noodle-graph.json)

## 🎵 Audio

- 🎵 **Lyrics → song** — One idea fans out to two LLMs — one writes the lyrics, one invents a matching style — and a music node sings the result. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52STWrDMBCFrzLMWg2JHQLRMboppWQhnHE8RJaMNPkRwdBD9IQ9SbGd1AkkLe1KAs28983onXCPeqbQ-TVF1G8n5DVqdDNUKKkh1Ch0FFR4RL2YKkzDUTLZdUR9Gp41vgQWAgMHjlLuLCynESRw81T5BiSYYjuBZ2rICEhFUHm_nWDbqothNhpaWw9--XwwzG4MY4pCNWp89TswoTON3m0OHUCYwADinU29kU2Biwif7x_gPAiLJdXdCl_X5MSEdIOR38FYZGeMxWMOdntyAgbqXeTCWIiSLIFURqBkiT3LhvfkzkT9NmyCA0s10vZdCgIXlU2wplgEboT3dBngAfZ8xO4BBvDl9N6HsYsSdr2KRV0aG6ltVwotu-1VBGwXgTL4uuvp4nGJReODXGLRKhR_XZCNBU3wdSNXlDa7o5j9pjgfC4bNXSvm_1HMf2Kc31HM_8D4rbhqvwCufmT3XAMAAA) · [graph](graphs/lyrics-to-song.noodle-graph.json)

## 🧠 Multi-step

- 👁 **See, think, speak** — A photo is described by a vision model, distilled into a four-line poem by an LLM, then read aloud by TTS. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WRy2rDQAxFf0VoPQ2OHQqddb-gZFNKFm4sN6Lj0XRGdmKC_704j9oQQ9e65-ognbFDuzbopaKE9uOMXKFFv0aD2gdCi21wUlZo8IT2OTPYo13nmcGayVUJ7XkYzB3LJ6zjxOKvWLG5cdmcwx-0-EppH_mTQA-cgJvyi4A9dNxxZWAvfh9JCSrSkt0KZ7uKaZdzzc0vX1yU-qTUoMV3aaGMBCUEIV3Bto0e9DD2jxpBWTywV4ESjpy0bh3U0sYnx55GplnBGwXXw5H1AOJdf8Evk7ncZpJTTVe5l2xJbhh2Bh3779n53Xj-Okozyo-vub8kSFS0eDkTDgZV5on8IfEn5PKFxlle6aSPhcUUCFGaoPPGYqGx-K9xs9C4G34BFFcmvoYCAAA) · [graph](graphs/see-think-speak.noodle-graph.json)

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
