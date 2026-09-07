import assert from 'node:assert/strict';
import fs from 'node:fs';

const repositoryRoot = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('index.html', repositoryRoot), 'utf8');

assert.doesNotMatch(
  html,
  /https:\/\/cdn\.tailwindcss\.com/,
  'The published page must not depend on the external Tailwind CDN',
);
assert.match(
  html,
  /<link rel="stylesheet" href="styles\.css">/,
  'The published page must load its bundled stylesheet',
);

const cssPath = new URL('styles.css', repositoryRoot);
assert.ok(fs.existsSync(cssPath), 'The bundled stylesheet must be committed');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(css.length > 10_000, 'The bundled stylesheet must contain the generated utility classes');
assert.match(css, /\.hidden\{display:none/, 'The bundled stylesheet must include used Tailwind utilities');
