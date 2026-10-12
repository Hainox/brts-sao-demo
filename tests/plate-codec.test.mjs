import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const encodeMatch = html.match(/function encodePlate\(p\)\{[\s\S]*?\n\}/);
const decodeMatch = html.match(/function decodePlate\(p\)\{[\s\S]*?\n\}/);

assert.ok(encodeMatch, 'encodePlate must be present in index.html');
assert.ok(decodeMatch, 'decodePlate must be present in index.html');

const { encodePlate, decodePlate } = new Function(
  `${encodeMatch[0]}; ${decodeMatch[0]}; return { encodePlate, decodePlate };`,
)();
const plate = 'А001АА77';

assert.doesNotThrow(() => encodePlate(plate), 'Cyrillic plates must not throw');
assert.match(encodePlate(plate), /^ENC:/, 'Plate must retain the existing ENC prefix');
assert.equal(decodePlate(encodePlate(plate)), plate, 'Cyrillic plate must round-trip');
