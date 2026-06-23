import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const scoreStepPath = 'src/components/calculator/HHHHHMMScoreStep.tsx';

assert.ok(existsSync(scoreStepPath), `Expected ${scoreStepPath} to exist.`);

const scoreStepSource = readFileSync(scoreStepPath, 'utf8');

assert.match(
  scoreStepSource,
  /function markRemainingAsFive\(\)/,
  'Expected a one-click way to intentionally accept neutral 5 scores.',
);

assert.match(
  scoreStepSource,
  /nextScores\[dim\] === null/,
  'Expected only unrated dimensions to be filled by the neutral-score shortcut.',
);

assert.match(
  scoreStepSource,
  /Mark remaining as 5/,
  'Expected visible copy for the neutral-score shortcut.',
);

assert.match(
  scoreStepSource,
  /Not rated yet/,
  'Expected unrated sliders to be labeled explicitly instead of looking submitted.',
);

assert.match(
  scoreStepSource,
  /\{ratedCount\} of \{DIMENSIONS\.length\} areas rated/,
  'Expected the page to show rating progress before continuing.',
);

assert.match(
  scoreStepSource,
  /Please rate each area, or use "Mark remaining as 5"/,
  'Expected the validation message to offer a low-friction recovery path.',
);

assert.match(
  scoreStepSource,
  /const allRated = DIMENSIONS\.every\(\(d\) => value\[d\] !== null\)/,
  'Expected the step to keep requiring explicit scores before continuing.',
);

assert.doesNotMatch(
  scoreStepSource,
  /const EMPTY_SCORES[\s\S]*5/,
  'Expected the score step test to guard against hidden default scoring.',
);
