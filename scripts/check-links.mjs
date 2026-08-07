// Verifies every outbound URL in scenario frontmatter resolves.
// Dependency-free on purpose: this runs in CI with nothing installed but Node.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content/scenarios';
const URL_KEYS = ['templateRepoUrl'];

const files = (await readdir(CONTENT_DIR)).filter((name) => name.endsWith('.md'));
const targets = [];

for (const file of files) {
  const source = await readFile(join(CONTENT_DIR, file), 'utf8');
  const frontmatter = source.split('---')[1] ?? '';

  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^\s*([A-Za-z]+):\s*(https?:\/\/\S+)\s*$/);
    if (match && URL_KEYS.includes(match[1])) {
      targets.push({ file, key: match[1], url: match[2] });
    }
  }
}

if (targets.length === 0) {
  console.log('No outbound scenario URLs to check.');
  process.exit(0);
}

let failed = false;

for (const target of targets) {
  try {
    let response = await fetch(target.url, { method: 'HEAD', redirect: 'follow' });
    // Some GitHub endpoints reject HEAD; retry once with GET before failing.
    if (response.status === 405 || response.status === 403) {
      response = await fetch(target.url, { method: 'GET', redirect: 'follow' });
    }

    if (response.ok) {
      console.log(`ok    ${target.key} ${target.url}`);
    } else {
      console.error(`FAIL  ${target.key} ${target.url} -> ${response.status}`);
      failed = true;
    }
  } catch (error) {
    console.error(`FAIL  ${target.key} ${target.url} -> ${error.message}`);
    failed = true;
  }
}

// Set exitCode rather than calling process.exit(): tearing the process down while
// fetch's sockets are still closing aborts Node on Windows (libuv async assert).
process.exitCode = failed ? 1 : 0;
