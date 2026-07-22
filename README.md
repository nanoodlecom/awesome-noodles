# awesome-noodles 🍜

**A curated gallery of [nanoodle](https://nanoodle.com) workflow graphs.** Click
"Open in nanoodle" on any entry and the whole workflow lands on your canvas,
ready to run — or grab the committed graph file and run it headless with
[nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) /
[nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) — most graphs ship
with a working model id baked into every model-bearing node (see
[Limitations](#limitations)).

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

The gallery so far is eleven deliberately small starter noodles —
copy one, remix it, and send us yours via [CONTRIBUTING.md](CONTRIBUTING.md).

## 🖼 Image

- 🖼 **Text → image** — Type a scene, wire it into an image node: the one-wire hello-world of noodling. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA23RXWrDMAwA4KsIPTujzToYPkffRh_cWElNbSk4WtNQAjvETriTDPeHZrAng9DPJ-uCJ7RrgyyeBrQfFwweLTZVYCVWNKhTTyUiKd0CZ7TvK4MT2qq8I9rNamWwDRT9gPaCSmdFi9sDgTBVY8gEB4pRqlFy9CAtsIiPgTv4-foGT0OTw57AwdAQk4GOFBxDSK6jFzTYSJSMFqfSZcR5Nncnr5_C69glb13_x3KQyUPv2Dtwg2Zh96ngc2i1gOREGZiEqxgUtnKcBJwCh-6gBprAlJyGxsDrW0pLSf2UXN03yqa-W_5-URJPsVQ5lmrv2LGr6jKRcJ53BmPg4-IcsazZZkmltpzqsXovWR-rzwZVlgn1M6HPknotvedfthPaGvIBAAA) · [graph](graphs/text-to-image.noodle-graph.json)
- ✂️ **Edit a photo** — Upload any photo and describe the change in plain words; an edit node repaints it. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA2WRwWoDMQxEf0Xo7JTNNpTiz-i15OCulY2ILRnb7SYE_3sxScmGHjVomHnSFX_Qbg2KeipoP6_IHi1OG5ZKUtFgvSTqisZ4E85o3weDF7Sbt8HggvZ1Nxg8MAVf0F6x0rmixQ9KjqUWcALfKajz5CEdtSq4adLsWWbogwB5ruCpTJm_yAMLpOBYYNHsywsanDRoRosXCkEXbM3ci8r2UfEW8tRwO66brWzjw9bDb6bdeHcNTzwpa0ydKLoTAVcQno91UzmSAec9zEGXDiOkAoVn6cweckfIdAg0VVYp2NreYGA5rS4dOsAha-xJ_Qt_UElzz-ToZsJmsOp6Y_y30fbtF9aUWqzNAQAA) · [graph](graphs/edit-a-photo.noodle-graph.json)
- 🥊 **Model arena** — Same prompt fanned into four image nodes: pick a different model on each contender, run once, judge side by side. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52TQW7bMBBFrzKYNR1ZFu0W3KYJ0E0QBN0VWbDiWCIscgSKcqIaAnqInDAnKWTXtQIoWnilhQb_vSE_D7hHlQr0bKhB9fOA1qBCn6LA2NWECnN2jnxEga-oNkuBHSq5FLi1VJkG1QEjvUZU-GjzHWj49v3-_u7p7uEHODZUAXsgnZdwyz6SNxQExJI8PLUe3v-8QaMdQR3Y1RG23AZ40V0joLGG4Fd3_N5gL_AFVTZwG_ubRtgvsu_FWXt10T7-HTtnyylpDdH6DkzQBXvI21CRgbYG3VRENVgPGiLpvK0FOJ0HhrrkyAIa3kZwHLz1BVS2KCOORLKLiHW6oJOJ_Key-WByPCZUWNRxcRxepDfrYWOv3RDw_-AgxQtBThK-zhKsIS6CdsleJtY3Ufs4yVmNOOvZTeQ0qLQmkHYLTk8bTVKyEWUzu80nlF0gnexXiSNjW5cMN7qIPEOU2D8LrKzfjbpeDV3fBnZD9PAOzkWqOcRzkXqBkccD2WXg1N3R7VeraxLlXGJ2TeJ6LlFek7iZSHzu_wLvOVqlRQQAAA) · [graph](graphs/model-arena.noodle-graph.json)
- 🎛️ **Style switchboard** — One subject, a Choice node full of art styles, a Join to splice them: flip the switch and re-run. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA5VSQY7bMAz8CsGzXMR2sLvVtUU_sdmDYtOxGpk0JG68bmCgj-gL-5LC3iziAEGLngRQ5HBmOGc8oc0NstSU0D6f0ddosco8K7GiQR17mivSde-FN7QPG4Mj2iwvNgYHtNv5bTyFOqE9o9KbosVvwfegLcGXVnxFkAavVQuOa4iUxVeG3z9_QXIdQaqIyUDjTwQuKiQdA6VPaLCSIBEtjhSCDDhN5kKR8yu5ZeGa2cM9Pg6CP7TaymsiEAYHSSV22d6pUqQaquCbZr2iWOlfNNwsKbc3W6RXL5zQYhBJBINTigv9RbLn4459ko40-gqCDFkvYYTyK0TimuKOT57VHQjyz4-bBBrdiQL0knT-rFoXK3EB0pG0ag205E4jHKLzvOOkzjPV2SG4lGDwXMuABhMFqpTqv5DCaTlhOZ8w-R90qyXPn1Z-lFc_vovndzeW449oi6cbOxL1aNGA5yUDy0VBGlj7u73i-c4dLvY-bi-AmxvATmoK85RjyfaOHbusyIJXwml6MRg8H1cRDnM-mijdPDvH-yMzvUT9yMxkUGXdUF4b3IppKO6AFf8Btl-DlXfAyn-Bba8NfZSu11n19AddHDlSwAMAAA) · [graph](graphs/style-switchboard.noodle-graph.json)
- 🖥 **Render a mockup** — Describe a screen, keep the style guide: an LLM writes the image prompt and an image model renders a screenshot-style UI mockup (~$0.04/run). [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA5VX247cuBH9lYLmwQlAdfo247FeAnvGDjZY7wZx8hBk96FEliSmKVIhqe7RGgPkI_KF-ZKgyFa37J3sIk-DUVPFqlOnzil9Lo5FtRGFdYpCUf39c6FVURWy1DaSjYUo4jQQP3F9nx88FdXdWhRTUZWb_VoUp6La84NGk1GhqD4XkZ5iURWPFKTXNQFCkJ7ICjgQDRA7ghAnQ9COWlEFaOHbbz9CHL0NULvYgbbRgbMEimwg0D22BIN3_RABreI38rPeKTLgySryIUXunTyMwwo-nXAYtG0hOkAwuu0i_97T7-HBEPp0OAfh4l8FsNRi1MfLRdG5VSEK6YzzRVVMZIw7Fc_P4gyS3VzhSSUvsXkRkbfQYa1jGT3KA3k4UQ04DKAwdLVDryqITuH0KoDsSB6MDlGAHL0nGyFET3gIAhBORIcSY4lla9BKgtZrJTI08M9Ry0OJSkE9xujsqnhOXdqt19fct7-Q-26b23r7YhGflq0bnNGhIwUK_aHkbjB6apTxWpRIUJON2tO5VaS4xeQblATOMkOc0QosoS9rg_IAN-t3m_V2DRLtEcMKvnNw6nQkqFEeWu9Gq8SyrQIGNAQDNxQ9oQDpCXsIY7pFgPNQ-3Se-iFO0KNvtQW006kjT_Cff_0b6Eh-Ak-tdpYDWjICZKqBsW3HGMlDiDiFVHF6KplOZoJAA3qMpFbwyDy3eJzgZrPZ3G9fw-B1j37KMYOAkFI3Uy6BPNxsXm_Xux0Eks6q5VHpnClz7Tcfdh_uPjxconFLBPRjJAW1GalsPU5w8-bt2_t3D4tQ-RwZktFrWcoJLdxst4-79-8B89zMIVFGzR2RkmwUcNTOUISb-3e3Dx_uoHF5cEKKRYqLBB2pFxAJTdnynMPNbv-4e_MmnQ6jlBQCgxYprOB-eIIwoOTRDFNIr27uhidwI8OQuxIEbLbDU4IeBlRK21bAZniCm-3dbr9_hNp5HnkBm_XwBIkOpEA6b9PTMNbREIQOlTuFFXx0iryFllxPDAEEtKEM5HUDRh8IvmE6poT_-g1PWMQQqRkN9M46zpfyuT9SfOdR2wAfnXXpBTv2NatP4oJTxO0Ph-gGkK4fXNAMaMUd78FQExkzzVLjLHjUzDDXDyhZcQboCBVLg44d1B4tl55CB0IvO5Fl0fXaoo3QkXczT8M4DM7HBGzEmMALsyhIZ6UO9DW90ly1HpUmG4MA60CRdD4LoTZmDNGnVPOP7kg-6J9InYeIJy3_0pIlBrZHf6CUhHTDtIJH9AcBnhpticcosUHXhgQQhonlOUi0rLRu4IvQFFX0Iz2Lgm9aSM_2br1Q391Vwf7htM0K9nqdJWxz_4V0BRqKqvjB_mCX-r2_RjCmzwHe7M8B1utZNJeBkt8UVfET6tL59net6cvbFYtp5nJRFX9zI5w8T-vStsKZW2d_Civ4gz6SvXgjqOSWQx6-1LKFRzKAg5kyK77_7j0oiqgNy-jSGvmKOWDoXCxziIvUVmCxp7PKGZzcGM9il67UMcDMV3FOqKY87-eJ1RZOzqsAHmNHrAVo5wEQMIZ8mp6YzazHMRI03vVfm36mpbZHNjZPyE7HU9k5HxklgzWZAL_ZlvvzhYSy-20GYDA4JgrNN6_gLx1bSxhNBB0AodE2-9LsRldQmK0RkOvTrYUwkKyYwIN-IgM9YRg99XkcPCmjLQUBSvdkQ0LKe3cKAjp6SuMekrWgtS7mmZZojBtjAOXxZNneLqtGLts6bifhWT9nLWAZDRxLOhu9M2EFn1g0GeT4NYCvwsIIgXeU0UOjjclq3vjUaNUSDxj_FaCtNGOWE2Og4Rcueplwte7iRqf8So3sspzSGEvXNGneV_B2YDL-PKO543xl4tiAPoJrFimxy2ZLFxeDy7YaxFX8F-KS3kiocUhoOHeuPO91ihrkpp9XA-4M-QUyK3hIGkzprA0k4ETGlIwUby1nob4uIwnrMVCGMWcK1DRaskKaqYJeW92jgRaHZM5pUQZp-JLoWuK54FK0nUfbSTkOEwPfu_AVHqdOs09FTL97QoW1oRV8MBgv6X1J3kuZsvOOFx_roEOrEncUHbWkLMknZDq4hgdGUucMGwtL6Qr-fJWTbP5JP5w1U9oWL8I7q9p2vZTe26twJlpn6dykvfFnu-8smRatK2u0aLHclkZHfo0vKqpicyhEMe_ff0rJFFXxv_Y9jijmZe5KpvP2Ny9-y_fSWrRc-3iiv6AOu_4JWTJKVsWZmgZ9S1AbtIfZ6_L5PDnzf-dx-QUJWQjEi2rCMnRRjoW48Hp21Fntkgted_kfRWG0PSw-2wx_kbDcMu78VTN_pfBeMG_6z6KIbnlgdz2AC3s02xeCbf-PYPUy2O6FYLtfC7a_HsgMXUbcvxBx_2sRb1-I-OPzfwG4QgTLBg8AAA) · [graph](graphs/render-a-mockup.noodle-graph.json)
- 📛 **Favicon** — Name your product: an LLM distills the brand to one bold glyph and an image model renders it as a crisp 512×512 icon (~$0.04/run). [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WUwY7jNgyGX4UgemgBJeN4ksWOjwVaYIHtFuitKHpQLMYWViJdiZ6MZ5CiD1GgD9Q32Scp5GQQb2ewezNp6qP585ef8B6bjUEWRxmb357QO2ywXXlWYkWDOg1UMhLjOfGAzZvK4ITN6q4yeMRmW1UGD56Cy9g8odKDYoMfbCSYZEwwJHFjqwY6UrBwsPe-FYZPf_0NluH9-5_A-aw-hAzaE-yTZQcqIEywl-CgC9PQm1Lso-0IojgKkIgdpQxeyysHXqGVSBn2tv0INoOFNvk8wG5T__vPblND_mO0ieDbP7-p1tX2Jo383RoNthIkYYMThSBHPJ3MRQbeXAWYpzLINpbo-_KNn4mxqc5i1NvXxFhC6ys0hHiG3F4oby-QEmb_SDMjT1kpYrPZVqcle5YBG3y0fiWpu-lCXO3WBf98An-VERxl3_Gs5kX6NfyYJC7ELlPdOMpt8oN6YQPH5JXg5w8_XCQfksRB4SAJ7LOOdhig4JqS8tyF5bpAEuQp7iWA9lahtYOOiRYrNnAIVuGeWi21OgUykDUJd5B96GUkVTLQ-66HVliTzWqgJVZK5EC49JXg3dxr3GuYVl2yzhPrbIIuyVj6dMSUZMwQbeo8ZwMsUDYzP4TSJp2TQy8qiWzwOc4Jl2SA3Fsnx7yGdwpxzApZ7QSJWunYP9p9IMitDeTAyZGLdTdvYPAPFPIafqEhTHD02s-jX4QUDtN66YrbqytmxS_mevu5L3bVawZgy7LaW7ZsV_UqeKUleXslJyqmutr4XSt8bnR39z8b1y86YYMHHwIaPHqnPTa42xSz9eS7Xi_h6fS7weD54-JvEso1OiSJhcRn0ny1Bkn6fLVOBlWWBfW14KzZYqZQv0Ksv0a8_RLx9hXi4sB5Jy-Q2xcVZX4uyF3RwWGzPf0Hlm3y7mUFAAA) · [graph](graphs/favicon.noodle-graph.json)

## 🎬 Video

- 📽️ **Photo → video** — Generates a still image from a prompt, then hands it to a video node that animates it into a clip. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA31SXW6jQAy-iuXnoSWkqlZcYA-x6oMDDrF2sNGMExpF3H0FJApVq321vj9_9g0vWO8CqrWcsf5zQ2mxxqYQdVbHgH4deJ5Y36-DT6x_lQGvWBfvZcAR6_1bGfAoHNuM9Q2dPx1r_M3KiZwzEGSXGEF66hiOyXogGJL1gwfwEyuQSr9AxUHUbaacLDlcpGWDJsrwggEbi5awxivHaCNOU7jn1d0z6WK_xHxfY-6qn-IRuOgVMkk8GDmYAkEXbRTt4CAWz70o54bVITMFUOlOHiA7pby1rp7Wy4Kr91t5Ny-_mPfWcpxZpFYcSEmpqIoozlvJ_UZyaeBee_VfzSGdlQqS16FYSK9LnMKteGisnWONOdoIwzmfCtEAHatHhpEunAM01HMiaJMcPcPR0kipxWn6CBhF_26-JM6tz-ecU8wf9LjEYMkfl5gCum0B1RNwz_PcPFY_KG4Ia8HfJPffENPH9A8LLGRE2wIAAA) · [graph](graphs/photo-to-video.noodle-graph.json)
- ⏩ **Extend a video** — Upload a clip, grab its last frame, and let an image→video node keep the shot going. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA22SQW7DIBBFr4JmjdvEiaqKC_QQVRckTBxaYJAZJ7EiS131AFVPmJNUYKdx1a4s0P_jx4MzHEAtJQQymEA9n8EaULCtbGAMDBK4j5h3yPtx4wTqcSGhB1Xl7xHUul5I2Fl0JoE6A-OJQcFTqzdJ8B6F04nFrtUeBe1ET10rts5GoYMRex1MEpYFk7BeN3j5-DxYgyQu71-lnfbE4g0xJtGQDc0dSNiSoxYU9OgcHWEY5AQeljfkQxcdaTMiP4zIy1-os1496xXUNPZW66m4-HXGKZLVGZtJMJg5xuo2zpbjTBT1v9M8GXSgILZd0JW297EqpftipGKqrjNiSz5yuY_ANnR4U5RQe4cpub6oS1l36javuGU5rjyxpTAtnG32bEMDw_AiwdnwNrt_lzXuWvKZLr-Nq9pIbf77iDNIYJon6j-JHyOu_mfiLF-ELv-OXN0iRUbGHb4BHUBtWLYCAAA) · [graph](graphs/extend-a-video.noodle-graph.json)
- 🗣️ **Talking avatar** — Upload a portrait, type what it should say: TTS speaks the line and a lipsync node animates the face. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA32SwW7bMAyGX4XlZReliJOgC_QEK3Zcb0UPaswmQiRRkJi5RmCgD9En3JNsslNYRYOdDNA_P3wkdcbfqBuFgVvKqB_PaFvUuFvYIBQEFUofqVTY-6nwivpuqbBHvWhWS4Ud6k35vlhybUZ9RqFXQY0PD78gRzLHDD2fEjgbSIEJLciBwNmY-7ADzy05MMF6I5THX5GTJGMFhMEb2R1uUeGOHSfU2JNz3OEwqItraGbLU3Rs2k-Sd7Va1bWau0bfume9vTbPD1vsEt3APZwytUXvmcBAFuscxAP_K_x5ey-pAJk9PXPbQ2dTyR4SEYxrBuE9FdK0jMAd3EPH4ZtAFo4gxh1t2N_WM64rW8mT7GZ5sf00Io4LRY0_-ciJF9uVr0GbGXS5wAT7vp1gzfIqzJnyHMb4MDwpdDYcq_fiyg1eEvvSU4b82HA55ceGB4XCdWA9B2JiH6USdasrxGZusN7s6Sty8yUxE9dXiJWCObWW_0u8JIan4S_b9PF_NwMAAA) · [graph](graphs/talking-avatar.noodle-graph.json)

## 🎵 Audio

- 🎵 **Lyrics → song** — One idea fans out to two LLMs — one writes the lyrics, one invents a matching style — and a music node sings the result. [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA52TUY6cMAyGr2L5GegMQ6s2Z9hRpX1ZVdU-RBDAmpCgxAxDR0g9RE_Yk1QBprDqbKvuGzL27--3nSueUewjNLZQHsXXK1KBAvOYDCvDGCEPrQoR2zRz4ILiwy7CAUW8z3YR9iiyEChJ6cKjuCKrC6PAz0YBFUpCKY0H2zGwBe4tPDwcPfz8_gP04Cj30OrOg4RGcl6TqcDzoNWUwLUy4U_nKYfGFkqDJ1N5IE4wwtxq61DgoLS2PY5jtPCb_Uo-0WyxJ-o_aJ8csQIJPXkuOw2fdh7YURvXtgV2Mj8l8KhaJTlQQW3tKdl2TNeOWjdzw2w3d0xfNJx8oMBvkmLrqneVbuL3Saj3g2fVoMAvtgPpAo63puoDmktgRrRGDxPCMr0wJ2OBibWKwteyKumGF4CHO4Af0xkwy95CSOasDN_2I_WyOK4lQ0nsJ8qKzsosrNME9QA9cb36mKoicJTXeoBC-dxRy3RWN2uvGMpWQxPAbGmfZsua70_9SIYaeYmPoSTeBVNkPLtuaqFRlFJ7NY7PEWoyp82j0OGoSmebIBcezO3QWuv4dmhjhGy3Cema0DrbtLyxoNM7ium_FLM1YR7rVvHwFsXD3xizO4qH_2D8rfg8_gKIYXRRbgQAAA) · [graph](graphs/lyrics-to-song.noodle-graph.json)

## 🧠 Multi-step

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
- **Model ids are pinned, not permanent.** Most graphs bake a working model id
  into each model-bearing node so they run headless as-is; those ids age as the
  catalog moves, so swap in whatever's current. A few graphs still leave
  `fields.model` blank — the editor backfills the newest live-catalog model of
  the right kind on load, but the headless runners do **no** such backfill:
  nanoodle-js / nanoodle-py refuse to run a model-less node (`pick a model
  first`), so set `fields.model` in the JSON — or open the graph in the editor
  and pick — before running those headless.
- **Costs are estimates.** Rough cost is covered by the heads-up at the top
  (images typically cents, video more) rather than per entry; actual price
  depends on the model the editor picks and your settings.
- **Links are only verified to decode.** `npm test` proves each link
  reproduces the committed graph; it does not run the workflow or verify
  output quality.

## License

MIT — see [LICENSE](LICENSE). Not affiliated with NanoGPT. Build workflows at
[nanoodle.com](https://nanoodle.com).
