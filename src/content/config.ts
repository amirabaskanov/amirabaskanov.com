import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    description: z.string(),
    heroImage: z.string(),
    heroImageAlign: z.enum(['center', 'top', 'bottom']).default('center'),
    url: z.string().optional(),
    imageStyle: z.enum(['cover', 'icon']).default('cover'),
    label: z.string().optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).optional(),
    status: z.string().optional()
  })
});

export const collections = {
  blog,
  projects
}; 