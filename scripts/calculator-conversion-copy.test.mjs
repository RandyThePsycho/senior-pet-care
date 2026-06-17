import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const pagePath = 'src/app/tools/senior-pet-quality-of-life-calculator/page.tsx';
const clientPath = 'src/components/calculator/CalculatorClient.tsx';
const emailFormPath = 'src/components/calculator/EmailCaptureForm.tsx';

assert.ok(existsSync(pagePath), `Expected ${pagePath} to exist.`);
assert.ok(existsSync(clientPath), `Expected ${clientPath} to exist.`);
assert.ok(existsSync(emailFormPath), `Expected ${emailFormPath} to exist.`);

const pageSource = readFileSync(pagePath, 'utf8');
const clientSource = readFileSync(clientPath, 'utf8');
const emailFormSource = readFileSync(emailFormPath, 'utf8');

assert.match(pageSource, /printable score summary/i);
assert.match(pageSource, /vet questions based on lower-scoring areas/i);
assert.match(pageSource, /7-day reassessment and care journal link/i);
assert.match(pageSource, /not a diagnosis/i);
assert.match(pageSource, /licensed veterinarian/i);
assert.match(pageSource, /email is\s+optional after results/i);

assert.match(clientSource, /entrySource\?: 'partner_kit'/);
assert.match(clientSource, /utmSource === 'partner_outreach'/);
assert.match(clientSource, /utmCampaign === 'senior_pet_checkin_kit'/);
assert.match(clientSource, /Shared by a senior-pet organization or community\?/);
assert.match(clientSource, /does not receive your answers/i);
assert.match(clientSource, /email is optional after you\s+see the result/i);

assert.match(emailFormSource, /printable report and 7-day journal/i);
assert.match(emailFormSource, /score summary/i);
assert.match(emailFormSource, /lower-scoring areas/i);
assert.match(emailFormSource, /vet questions/i);
assert.match(emailFormSource, /7-day reassessment link/i);
assert.match(emailFormSource, /Care journal link/i);
assert.match(emailFormSource, /Unsubscribe anytime/i);
assert.doesNotMatch(emailFormSource, /Product Matcher/i);
assert.doesNotMatch(emailFormSource, /affiliate/i);
