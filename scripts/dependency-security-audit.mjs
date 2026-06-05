import fs from 'node:fs';

const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const request = {};

for (const [path, meta] of Object.entries(lock.packages || {})) {
  if (!path || !path.startsWith('node_modules/') || !meta?.version) {
    continue;
  }

  let name = path.slice('node_modules/'.length);
  const parts = name.split('/');
  name = name.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];

  request[name] ??= [];
  if (!request[name].includes(meta.version)) {
    request[name].push(meta.version);
  }
}

const response = await fetch(
  'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  },
);

if (!response.ok) {
  throw new Error(`npm advisory API returned ${response.status}`);
}

const advisories = await response.json();
const names = Object.keys(advisories);

console.log(`packages_checked=${Object.keys(request).length}`);
console.log(`packages_with_advisories=${names.length}`);

for (const name of names) {
  for (const item of advisories[name] || []) {
    console.log(
      [
        name,
        item.severity || 'unknown',
        item.vulnerable_versions || '',
        item.title || '',
        item.url || '',
      ].join('\t'),
    );
  }
}
