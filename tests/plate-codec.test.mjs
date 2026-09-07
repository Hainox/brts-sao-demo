import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const encryptMatch = html.match(/function encryptPlate\(p\)\{[\s\S]*?\n\}/);
const decryptMatch = html.match(/function decryptPlate\(p\)\{[\s\S]*?\n\}/);

assert.ok(encryptMatch, 'encryptPlate must be present in index.html');
assert.ok(decryptMatch, 'decryptPlate must be present in index.html');

const { encryptPlate, decryptPlate } = new Function(
  `${encryptMatch[0]}; ${decryptMatch[0]}; return { encryptPlate, decryptPlate };`,
)();
const plate = 'А001АА77';

assert.doesNotThrow(() => encryptPlate(plate), 'Cyrillic plates must not throw');
assert.match(encryptPlate(plate), /^ENC:/, 'Plate must retain the existing ENC prefix');
assert.equal(decryptPlate(encryptPlate(plate)), plate, 'Cyrillic plate must round-trip');
