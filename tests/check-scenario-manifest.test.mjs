import { test } from 'node:test';
import assert from 'node:assert/strict';
import { manifestUrlFor, comparePoints } from '../scripts/check-scenario-manifest.mjs';

const manifest = {
  scenario: 'inventory-api',
  categories: [
    { category: 'S1', points: 20, label: 'S1 reserve stock on placement' },
    { category: 'B1', points: 15, label: 'B1 order totals' },
    { category: 'Regression', points: 20, label: 'Existing behaviour (regression)' },
  ],
};

const scenario = {
  workItems: [
    { id: 'S1', points: 20 },
    { id: 'B1', points: 15 },
  ],
  regressionPoints: 20,
};

const clone = (value) => JSON.parse(JSON.stringify(value));

test('derives the raw manifest URL from a template repo URL', () => {
  assert.equal(
    manifestUrlFor('https://github.com/coding-eval-test/scenario-inventory-api'),
    'https://raw.githubusercontent.com/coding-eval-test/scenario-inventory-api/main/scenario.json'
  );
});

test('tolerates a trailing slash and a .git suffix', () => {
  const expected =
    'https://raw.githubusercontent.com/coding-eval-test/scenario-inventory-api/main/scenario.json';
  assert.equal(manifestUrlFor('https://github.com/coding-eval-test/scenario-inventory-api/'), expected);
  assert.equal(manifestUrlFor('https://github.com/coding-eval-test/scenario-inventory-api.git'), expected);
});

test('rejects a URL that is not a GitHub repo', () => {
  assert.throws(() => manifestUrlFor('https://example.com/'), /owner\/repo/);
});

test('matching points produce no problems', () => {
  assert.deepEqual(comparePoints(scenario, manifest), []);
});

test('flags a work item whose points disagree', () => {
  const drifted = clone(scenario);
  drifted.workItems[0].points = 25;

  const problems = comparePoints(drifted, manifest);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /S1/);
  assert.match(problems[0], /25/);
  assert.match(problems[0], /20/);
});

test('flags regressionPoints disagreeing with the Regression category', () => {
  const drifted = clone(scenario);
  drifted.regressionPoints = 10;

  const problems = comparePoints(drifted, manifest);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /Regression/);
});

test('flags a work item the manifest does not grade', () => {
  const drifted = clone(scenario);
  drifted.workItems.push({ id: 'S9', points: 5 });

  const problems = comparePoints(drifted, manifest);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /S9/);
});

test('flags a graded category the site never lists', () => {
  const trimmed = clone(scenario);
  trimmed.workItems.pop();

  const problems = comparePoints(trimmed, manifest);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /B1/);
});

test('reports every mismatch, not just the first', () => {
  const drifted = clone(scenario);
  drifted.workItems[0].points = 25;
  drifted.regressionPoints = 10;

  assert.equal(comparePoints(drifted, manifest).length, 2);
});

test('treats a missing Regression category as regressionPoints 0', () => {
  const noRegression = { scenario: 'x', categories: [{ category: 'S1', points: 20, label: 'S1' }] };
  const site = { workItems: [{ id: 'S1', points: 20 }], regressionPoints: 0 };

  assert.deepEqual(comparePoints(site, noRegression), []);
});
