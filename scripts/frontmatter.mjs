// Shared frontmatter reader for the dependency-free CI scripts.
// Astro parses content properly at build time; these scripts run before that and
// only need scalar keys, so a small reader beats pulling in a YAML dependency.

const BLOCK = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/;

/**
 * Reads the leading frontmatter block into a flat object of scalar values.
 * Nested and list lines are skipped rather than guessed at.
 *
 * Anchored to the start of the file and non-greedy to the first closing
 * delimiter, so a horizontal rule in the body cannot extend or truncate it.
 */
export function parseFrontmatter(source) {
  const match = source.match(BLOCK);
  if (!match) return {};

  const values = {};
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(/^([A-Za-z][A-Za-z0-9_]*):[ \t]+(.+?)[ \t]*$/);
    if (entry) values[entry[1]] = entry[2];
  }
  return values;
}
