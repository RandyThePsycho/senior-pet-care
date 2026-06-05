import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const keyFiles = readdirSync('public').filter((name) =>
  /^[a-f0-9]{32}\.txt$/.test(name),
);

assert.equal(keyFiles.length, 1, 'Expected one 32-character IndexNow key file in public/');

const keyFile = keyFiles[0];
const key = keyFile.replace(/\.txt$/, '');
const content = readFileSync(`public/${keyFile}`, 'utf8').trim();

assert.equal(content, key, 'IndexNow key file content must match the filename');

const submissionDocPath = 'growth/indexnow-submission-2026-06-05.md';
assert.equal(existsSync(submissionDocPath), true, 'Expected an IndexNow submission record');

const submissionDoc = readFileSync(submissionDocPath, 'utf8');
assert.match(submissionDoc, new RegExp(`https://pawcheckin\\.com/${key}\\.txt`));
assert.match(submissionDoc, /https:\/\/pawcheckin\.com\/guides\/senior-dog-quality-of-life-checklist/);
assert.match(submissionDoc, /https:\/\/pawcheckin\.com\/guides\/senior-cat-quality-of-life-checklist/);
assert.match(submissionDoc, /https:\/\/pawcheckin\.com\/partners\/senior-pet-check-in-kit/);
