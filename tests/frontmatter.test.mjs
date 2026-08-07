import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter } from '../scripts/frontmatter.mjs';

test('reads a simple frontmatter block', () => {
  const source = ['---', 'id: demo', 'points: 20', '---', '', 'Body text.'].join('\n');
  assert.equal(parseFrontmatter(source).id, 'demo');
  assert.equal(parseFrontmatter(source).points, '20');
});

test('stops at the closing delimiter, not at a rule in the body', () => {
  const source = [
    '---',
    'id: demo',
    '---',
    '',
    'Intro paragraph.',
    '',
    '---',
    '',
    'id: not-really-frontmatter',
  ].join('\n');

  const parsed = parseFrontmatter(source);
  assert.equal(parsed.id, 'demo');
  // The body's horizontal rule must not extend the block. split('---')[1] would
  // have stopped early or swallowed the wrong section here.
  assert.equal(Object.keys(parsed).length, 1);
});

test('tolerates CRLF line endings', () => {
  const source = '---\r\nid: demo\r\ntitle: Something\r\n---\r\n\r\nBody.\r\n';
  assert.equal(parseFrontmatter(source).id, 'demo');
  assert.equal(parseFrontmatter(source).title, 'Something');
});

test('returns an empty object when there is no frontmatter', () => {
  assert.deepEqual(parseFrontmatter('Just a body.\n'), {});
});

test('ignores nested and list lines rather than mangling them', () => {
  const source = ['---', 'id: demo', 'stack:', '  - .NET', 'order: 1', '---', ''].join('\n');
  const parsed = parseFrontmatter(source);
  assert.equal(parsed.id, 'demo');
  assert.equal(parsed.order, '1');
});

test('keeps a value containing a colon intact', () => {
  const source = ['---', 'url: https://example.com/x', '---', ''].join('\n');
  assert.equal(parseFrontmatter(source).url, 'https://example.com/x');
});
