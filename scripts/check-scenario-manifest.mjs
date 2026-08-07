// Verifies that each scenario's points on this site match the points its template
// repo actually grades. The site and the template are separate repositories, so
// nothing but this check stops them drifting apart.
//
// Dependency-free on purpose: this runs in CI with nothing installed but Node.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseFrontmatter } from './frontmatter.mjs';

const CONTENT_DIR = 'src/content/scenarios';

/** github.com/owner/repo -> the raw URL of that repo's scenario.json on main. */
export function manifestUrlFor(templateRepoUrl) {
  const { hostname, pathname } = new URL(templateRepoUrl);
  if (hostname !== 'github.com') {
    throw new Error(`${templateRepoUrl} is not a github.com owner/repo URL`);
  }

  const parts = pathname.replace(/\.git$/, '').split('/').filter(Boolean);
  if (parts.length !== 2) {
    throw new Error(`${templateRepoUrl} is not a github.com owner/repo URL`);
  }

  const [owner, repo] = parts;
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/scenario.json`;
}

/**
 * Compares a scenario's site-side points against its template manifest.
 * Returns one human-readable line per disagreement; empty means they agree.
 */
export function comparePoints(scenario, manifest) {
  const problems = [];

  const graded = new Map(manifest.categories.map((c) => [c.category, c.points]));
  const regressionPoints = graded.get('Regression') ?? 0;
  graded.delete('Regression');

  const listed = new Map((scenario.workItems ?? []).map((w) => [w.id, w.points]));

  for (const [id, points] of listed) {
    if (!graded.has(id)) {
      problems.push(`site lists work item ${id}, but the template does not grade it`);
    } else if (graded.get(id) !== points) {
      problems.push(`${id}: site says ${points} points, template grades ${graded.get(id)}`);
    }
  }

  for (const id of graded.keys()) {
    if (!listed.has(id)) {
      problems.push(`template grades ${id}, but the site does not list it`);
    }
  }

  const siteRegression = scenario.regressionPoints ?? 0;
  if (siteRegression !== regressionPoints) {
    problems.push(
      `Regression: site says ${siteRegression} points, template grades ${regressionPoints}`
    );
  }

  return problems;
}

/**
 * Reads a scenario markdown file. workItems is a list of objects, which the flat
 * frontmatter reader deliberately does not parse, so it is read here from the raw
 * block — this is the only structured key either script needs.
 */
function readScenario(source) {
  const flat = parseFrontmatter(source);
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  const workItems = [];

  if (block) {
    const lines = block[1].split(/\r?\n/);
    let inWorkItems = false;
    let current = null;

    for (const line of lines) {
      if (/^workItems:\s*$/.test(line)) {
        inWorkItems = true;
        continue;
      }
      if (inWorkItems && /^[A-Za-z]/.test(line)) break;

      if (inWorkItems) {
        const start = line.match(/^\s*-\s+([A-Za-z][A-Za-z0-9_]*):\s*(.+?)\s*$/);
        if (start) {
          current = {};
          workItems.push(current);
          current[start[1]] = start[2];
          continue;
        }
        const cont = line.match(/^\s+([A-Za-z][A-Za-z0-9_]*):\s*(.+?)\s*$/);
        if (cont && current) current[cont[1]] = cont[2];
      }
    }
  }

  return {
    templateRepoUrl: flat.templateRepoUrl,
    regressionPoints: Number(flat.regressionPoints ?? 0),
    workItems: workItems.map((w) => ({ id: w.id, points: Number(w.points) })),
  };
}

async function main() {
  const files = (await readdir(CONTENT_DIR)).filter((name) => name.endsWith('.md'));
  let failed = false;

  for (const file of files) {
    const scenario = readScenario(await readFile(join(CONTENT_DIR, file), 'utf8'));

    if (!scenario.templateRepoUrl) {
      console.error(`FAIL  ${file} has no templateRepoUrl`);
      failed = true;
      continue;
    }

    let manifest;
    const url = manifestUrlFor(scenario.templateRepoUrl);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`FAIL  ${file} -> ${url} returned ${response.status}`);
        failed = true;
        continue;
      }
      manifest = JSON.parse(await response.text());
    } catch (error) {
      console.error(`FAIL  ${file} -> ${url}: ${error.message}`);
      failed = true;
      continue;
    }

    const problems = comparePoints(scenario, manifest);
    if (problems.length === 0) {
      console.log(`ok    ${file} matches ${manifest.scenario}`);
    } else {
      for (const problem of problems) console.error(`FAIL  ${file}: ${problem}`);
      failed = true;
    }
  }

  // Set exitCode rather than calling process.exit(): tearing the process down while
  // fetch's sockets are still closing aborts Node on Windows (libuv async assert).
  process.exitCode = failed ? 1 : 0;
}

// Importing this file for its exports must not run the network check.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
