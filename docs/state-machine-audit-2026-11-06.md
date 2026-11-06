# State machine audit — 6 November 2026

Scope: all 14 current catalog graphs, all eight authoring/check/capture scripts,
the test workflow, generated recipes, and retained evidence. The reviewed source
baseline is `0ca1cdc` (main, PR #104). The optional executor reference is
`nanoodle-js@7734e7f6209f153a634b37bd1a691b67cc276817`.
No provider requests or paid generations were made. Mock execution checks routing,
not current model availability, pricing, media quality or Python runtime parity.

## Repository state machines

| Area | States and transitions | Failure, concurrency and recovery |
| --- | --- | --- |
| Catalog authoring | saved graph → encoded share link → README reference → generated recipe → checks → reviewed Git revision | Graph files, README payloads and recipe links must represent the same graph. Generator writes are sequential, not transactional; an interrupted generator must be rerun, with tests before commit. Removed graphs require explicit removal of obsolete recipes. |
| Share serialization (`make-link`, `check-links`) | JSON → gzip → base64url fragment → decoded JSON → version/shape/source comparison | Local, offline and stateless. Broken decoding or source mismatch fails checks. No upload or remote persistence occurs. |
| Input derivation (`graph-io`) | unwired text/upload/choice field → author input; incoming wire → internal input | Stable node/field keys survive display-name changes. Generated defaults are metadata, not an execution cache. Other executor settings are intentionally outside this small author-facing list. |
| Recipes (`make-recipes`, `check-recipes`) | graph + README title + optional note → expected recipe/index → present/missing/stale/leftover | Full generated contents now checked. Every link is decoded semantically, so supported Node gzip differences remain valid. Missing output directory yields diagnostics. |
| Capture preflight (`capture-example`) | parse/validate options → load executor/graph/case/catalog → inspect → exit; explicit `--run` + key → capture | Unknown/duplicate/missing options and invalid timeout fail before executor import. Default is offline. Estimates are not spending caps. There is no automatic paid retry. |
| Capture execution and artifacts | unique directory + graph/input/criteria snapshot → `running` receipt → execute once → `capturing` receipt → per-artifact checkpoints → `complete` or `failed` | Execution errors retain partial nodes and known costs. Capture errors retain other artifacts and fail the process. Receipts are atomically replaced in the same directory. Unique directories isolate identical timestamps. Promised sink status and primary port must be captured. |
| Interrupted capture | last complete receipt remains `running` or `capturing` | These are incomplete states, never success. `running` costs may be unknown; inspect provider and process evidence before any rerun. `capturing` records returned execution cost/status and saved artifacts. This does not resume provider jobs or guarantee durability across power loss; no fsync or automatic retry is claimed. |
| Mock composition checks (`check-composition`) | load source + cases → validate fixed composition → inject HTTP/media mock → execute → assert handoffs/outputs | Global fetch is blocked and restored in `finally`. Sequential fixtures exercise alternate inputs and flawed/nonflawed draft reviews. Mocked video submit IDs must be polled before downstream consumption. Missing optional executor is an explicit test skip; separate executor checks were run for this audit. |
| Historical evidence tests | selected/other attempt → recorded hashes/costs/errors → artifact and review integrity checks | Historical files and reviews remain immutable. Execution completion and creative approval are separate states; failed attempts remain in the cost ledger. |
| Git/CI distribution | branch → PR → supported-Node test matrix → reviewed exact head → main | Repository is a private, unpublished npm package. There is no service, package-release workflow, deployment workflow, GitHub deployment or release record here. The app imports graph snapshots through its own `scripts/sync-examples.mjs`; changing this repository does not deploy those snapshots automatically. |

## Graph execution inventory

All graphs are acyclic. Every node ID and link ID is unique within its graph;
all link endpoints exist. All 14 materialize with zero warnings in the executor
reference above. Each network stage has an implicit submitted/waiting/done/error
lifecycle managed by the external executor and provider. Independent ready nodes
may run concurrently; downstream nodes wait for their actual dependencies.
Provider timeouts, cancellation, durable jobs, payment settlement and polling
implementation belong to those external runtimes, not this catalog.

| Graph | Nodes / links / network stages | Dependency and completion behavior |
| --- | --- | --- |
| character-sprites | 6 / 4 / 3 | Brief → designer → canonical image; canonical image fans out to exported reference and rig-parts edit. Both sinks remain visible. |
| composer-watches-your-film | 11 / 19 / 4 | Film → extracted frames → visual composer → fitted score. Independent blind score joins the same film separately; fitted and blind outputs are separate sinks. |
| humanize-comment | 18 / 22 / 6 | Draft/context/guidance → five parallel writers → sequential joins → decider. Each writer has a 60 s timeout and `onError: skip`; joins tolerate missing writers per executor semantics. Decider completion is the sink, not five successful writers. `x402.usd` is a declared ceiling, not local billing enforcement. |
| idea-to-3d-model | 7 / 5 / 3 | Idea → concept writer + render rules → concept image → TRELLIS GLB. 3D completion depends on the actual image. |
| image-model-arena | 6 / 4 / 4 | Shared brief → four independent image branches. Four terminal outputs form a comparison; one branch is not evidence of the others completing. |
| mix-the-references | 11 / 9 / 5 | Four independent text-to-image branches → four ordered references + mix instruction → edit. Final edit waits for the reference handoffs. |
| neon-shrine-duel | 6 / 5 / 4 | Seed → still prompt → image; motion prompt consumes the still prompt; image and motion feed the final video. |
| photo-to-video | 5 / 3 / 2 | Still brief → image; independent motion brief and generated image → video sink. |
| sing | 10 / 11 / 4 | Idea + bands → lyrics → arrangement → avoid-list; arrangement + exclusions and separate lyrics → song. No conditional retry. |
| sketch-to-svg | 4 / 2 / 2 | Brief → raster → vector edit with blank conversion prompt. SVG completion depends on the raster, not the original brief. |
| song-to-music-video | 9 / 8 / 4 | Idea → lyrics → song → 15 s trim. Performer image runs independently; image + trimmed audio → music video → original-audio soundtrack. Trim bounds the video input length; model duration requests alone are not caps. |
| storyboard-relay | 15 / 21 / 5 | First frame → draft → visual review → one fixed repair → fresh visual review. Original/draft/repaired images and final notes remain separate sinks. This is not a conditional repair loop; even a favorable draft review still reaches one repair. |
| talking-avatar | 7 / 5 / 3 | Portrait branch and script/delivery → speech branch converge on lipsync. Video cannot complete from just one branch. |
| tiny-world-film | 8 / 5 / 3 | World → image → silent video → video-conditioned foley. First-frame export runs separately. Silent video is an intermediate retained by capture, not an advertised final sink. |

No graph source, prompts, models, declared budgets, historical outputs or saved
reviews were changed by this audit. New paid model validation is outside this
verification and was not required for these tooling fixes.

## Reproduced findings and fixes

1. **Stale runnable recipe accepted.** The old checker inspected only the first
   share link and searched for generic command substrings. A stale later run link,
   Python command, required note or empty index could pass. Compare the complete
   generated artifact while normalizing only links that decode to its graph.
2. **Capture receipt lost after completed generation.** Forced exit from the
   first media download left no `run.json` even though generation returned a
   cost and completed nodes. Persist a receipt before execution and immediately
   after it, then after captured artifacts, using atomic replacement.
3. **Evidence directory collision.** Recursive mkdir reused the same
   slug/case/millisecond directory. Two invocations with an identical mocked
   clock could overwrite a run. Use an exclusively created random suffix.
4. **Invalid execution options reached the executor.** Missing/unknown/duplicate
   flags and `--timeout NaN`, zero, negative, fractional or overflow values were
   accepted. Reject them before import or provider execution; timeout must be a
   positive safe integer within the timer range.
5. **Unrelated sink port could count as success.** Any captured output on the
   sink node satisfied the old promised-output check. Require `done` status and
   its declared primary port. A mock returning only an unexpected port now fails.

Regression fixtures are entirely local and use a dummy key. The added tests fail
against the original baseline (missing interrupted receipt, invalid options reach
executor, stale recipe accepted); they pass on the corrected implementation.
On the baseline, the expanded lifecycle test's normal cases additionally lack the
new explicit state field; that absence alone is not an old execution failure.

## Verification and release boundaries

- Local full suite: Node 22.23.4 and 24.22.1; 18 passed, two optional executor
  skips, zero failures on each. The PR CI additionally covers Node 26.12.1.
- Separate offline executor check: four cases passed (two storyboard cases × five
  mocked calls, two film cases × three mocked calls), with exact prompts, media
  roles, exports, polling and alternate inputs checked. No real HTTP forwarding.
- All 14 graphs: shape/topology/materialization checked as described above.
- Existing open PRs inspected: #90 (draft short film), #95 (day/night), #101
  (draft wording). Their files and heads were left untouched; they are not audit
  fixes and are not merged or published by this change.
- Merge updates repository tooling/documentation only. No additional application
  deployment or package publication is applicable to these changes. Rollback is
  a normal Git revert; no live data or workloads are touched.
