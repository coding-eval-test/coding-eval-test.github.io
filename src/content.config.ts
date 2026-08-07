import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const scenarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scenarios' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    difficulty: z.enum(['foundational', 'intermediate', 'advanced']),
    estimatedMinutes: z.int().positive(),
    stack: z.array(z.string()).nonempty(),
    objectives: z.array(z.string()).nonempty(),
    prerequisites: z.array(z.string()),
    templateRepoUrl: z.url(),
    workItems: z
      .array(
        z.object({
          id: z.string(),
          type: z.enum(['story', 'bug']),
          title: z.string(),
          points: z.int().positive(),
        }),
      )
      .nonempty(),
    regressionPoints: z.int().nonnegative().default(0),
    published: z.boolean().default(false),
    order: z.int().default(0),
  }),
});

export const collections = { scenarios };
