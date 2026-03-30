import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
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
    imageStyle: z.enum(['cover', 'icon']).default('cover')
  })
});

export const collections = {
  blog,
  projects
}; 