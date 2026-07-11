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

## 3. Add your entry to README.md

Put it in the right category section, matching this template:

```markdown
- <emoji> **<Name>** — <one line: what it does and why it's neat>. [Open in nanoodle](<share link>) · [graph](graphs/<slug>.noodle-graph.json)
```

## 4. Run the checks

```bash
npm test
```

This decodes every share link in the README, round-trips it, and
deep-compares it against your committed graph file. It must pass.

## Rules

- **It must load and run.** Open your own link in the editor and run it
  end-to-end before submitting.
- **Note the rough cost** if it uses paid models (most do) — a ballpark in the
  description or PR is fine, e.g. "~$0.05/run" or "video: expect $0.20+".
- **Keep it safe-for-work.** Prompts, node names, outputs — all of it.
- **One PR per noodle.** Small PRs get merged fast.
- **No secrets.** Graph files must not contain API keys, tokens, or personal
  data — remember the whole graph is public in the URL.

## Questions?

Open an issue. Short of that: if `npm test` passes and the noodle runs, you're
probably fine.
