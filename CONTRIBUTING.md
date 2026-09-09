# Contributing a noodle

One PR = one noodle. Here's the whole recipe.

## 1. Get your graph file

Build and test your workflow at [nanoodle.com](https://nanoodle.com), then hit
the **💾 save** button — it downloads `noodle-graph.json`. Commit it as
`graphs/<slug>.noodle-graph.json` (kebab-case slug, e.g.
`graphs/podcast-to-poster.noodle-graph.json`), pretty-printed.

## 2. Make the share link

Either of these produces the same kind of link:

- `node scripts/make-link.mjs graphs/<slug>.noodle-graph.json` — prints the
  link for exactly the file you committed (preferred: the link checker
  compares against the committed file), or
- the editor's own **Share** button (note: the editor's link packs your live
  canvas — including layout/view extras — so if you use it, save the graph
  file from the same canvas state).

## 3. Generate the run-headless recipe

```bash
node scripts/make-recipes.mjs
```

This writes `recipes/<slug>.md` (and the [recipes/](recipes/) index) from
every committed Keep graph. Do not hand-edit those files. Each recipe has
offline `inspect` and paid `run` one-liners for `npx nanoodle` and
`nanoodle-py`, using a share link regenerated from the graph JSON.

## 4. Add your entry to README.md

Put it in the right category section, matching this template:

```markdown
- <emoji> **<Name>** — <required input → useful output; model choice and rough cost>. [Open in nanoodle](<share link>) · [run headless](recipes/<slug>.md) · [graph](graphs/<slug>.noodle-graph.json) · [See sample](<saved output or finished application>)
```

## 5. Run the checks

```bash
npm test
```

This decodes every share link in the README, round-trips it, compares it
against your committed graph file, and checks that `recipes/` matches
`node scripts/make-recipes.mjs`. It must pass.

## Rules

- **It must load and run.** Open your own link in the editor and run it
  end-to-end before submitting.
- **Note the rough cost** if it uses paid models (most do) — a ballpark in the
  description or PR is fine, e.g. "~$0.05/run" or "video: expect $0.20+".
- **Keep it safe-for-work.** Prompts, node names, outputs — all of it.
- **One PR per noodle.** Small PRs get merged fast.
- **No secrets.** Graph files must not contain API keys, tokens, or personal
  data — remember the whole graph is public in the URL.

## Curation bar

Every example must earn a distinct place in the gallery:

- Name the user, repeatable task, required inputs and usable output. A new setting or model name alone does not justify a duplicate workflow.
- Changing each advertised input must change the result meaningfully. Keep sample-specific subjects in editable inputs, never in reusable system instructions.
- Use the least complex graph that meets the output bar. Each paid model call needs a purpose; avoid extra prompt-writing calls that merely restate an already complete brief.
- Check pinned IDs, modalities, reference counts, supported sizes and meaningful options against the live provider catalog. Record the date and price basis; catalog presence does not establish output quality.
- Run the default and at least one materially different input. Inspect actual outputs against explicit acceptance criteria, including text/fact preservation, identity, geometry, motion or audio as appropriate. Record which checks passed and any failures; structural tests alone are insufficient.
- Share a real output or finished application where possible, with its graph/skill and reproducible invocation. Distinguish generated assets from local processing and agent-written code.
- Remove or archive examples that duplicate a stronger workflow, offer decorative controls, make unsupported quality claims, or cannot meet their stated output bar.

Record the decision, model rationale, output checks and verification evidence in [CURATION.md](CURATION.md).

## Examples that finish a goal

For a skill example, lead with a result someone can try, then show the capability they can give their own agent. [Iron Verdict](https://nanoodle.com/examples/iron-verdict/) is the first model: a character brief becomes reusable animation assets, which a coding agent turns into a playable fighter.

Include the user goal, the exact skill and workflow, the finished artifact, a reproducible invocation, observed cost and validation, and known limits. Distinguish model output, local processing and agent-written application code. Publish the linked skill and graph before or alongside the example. Prefer a useful completed task over an impressive intermediate image; explain what the skill enables without claiming the goal was previously impossible.
