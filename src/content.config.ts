import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    lang: z.enum(['tr', 'en']),
    slug: z.string(),
    routeKey: z.string(),
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    icon: z.enum(['solar', 'battery', 'heatpump']),
    highlights: z.array(z.string()),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const packages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    lang: z.enum(['tr', 'en']),
    kit: z.string(),
    order: z.number(),
    name: z.string(),
    tagline: z.string(),
    capacity: z.string(),
    forWhom: z.string(),
    includes: z.array(z.string()),
    note: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: file('./src/content/faq/faq.json'),
  schema: z.object({
    id: z.string(),
    lang: z.enum(['tr', 'en']),
    order: z.number(),
    q: z.string(),
    a: z.string(),
  }),
});

export const collections = { solutions, packages, faq };
