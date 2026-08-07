// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://coding-eval-test.github.io',
  // No `base`: the repo is named <org>.github.io, so it serves at the root.
  build: {
    format: 'directory',
  },
});
