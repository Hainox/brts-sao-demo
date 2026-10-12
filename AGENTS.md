# AGENTS.md

## Unwritten
- Publishing: `main` is production. Every push to `main` runs `node --test tests/*.test.mjs` and, if green, deploys the whole repo root to GitHub Pages, so a merge is a release. The site is a public demo: seed and example data must stay fake (no real people, addresses, plates, or documents).
- Checks: `node --test tests/*.test.mjs` (Node 24 in CI); there is no package.json and no other check.
- Gotchas: `styles.css` is a minified Tailwind v3.4.17 build of `tailwind-input.css` scanning only `index.html`; a utility class not already in it renders unstyled until you regenerate it, and the tests reject any `cdn.tailwindcss.com` reference. App state persists in the tester's browser under `localStorage` key `brts_state_v4`, and saved data overrides the seed, so testers keep old records after a deploy.
- Conventions: UI text and README are in Russian. `tests/plate-codec.test.mjs` extracts `function encodePlate(p){` and `function decodePlate(p){` from `index.html` by regex; keep those exact signatures, the `ENC:` prefix, and the `license_plate_encrypted` field (stored in testers' localStorage).
- Why: the whole app lives in one `index.html` on purpose (static demo of the full spec, no server). `encodePlate` is only UTF-8 + base64 encoding, not encryption; real encryption, permissions, mail, and uploads belong to the future server version.
- Off-limits: `styles.css` is generated; rebuild it with the command in README «Для разработчиков» instead of editing by hand.

## Pointers
- **Writing** or reviewing code: apply `CODING_STANDARDS.md`; project config and linters win where they disagree.
- **Security**-sensitive change (auth, permissions, untrusted input, secrets): read `docs/agents/security.md` first.
- **Committing** or opening a PR: follow `docs/agents/git.md`.
- **Risky** change (spans modules, migrates data, alters a public API): propose a phased plan and get approval before editing.
- **Done** means you ran the project's own check commands and they are green, or you named the ones you could not run.
