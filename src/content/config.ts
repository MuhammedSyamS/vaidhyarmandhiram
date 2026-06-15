import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleMl: z.string(),
    description: z.string(),
    descriptionMl: z.string(),
    category: z.string().default('General'),
    customCategory: z.string().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
});

const treatments = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    customCategory: z.string().optional(),
    shortDescription: z.string(),
    benefits: z.array(z.string()),
    duration: z.string(),
    preparation: z.string(),
    seoDescription: z.string(),
    image: z.string().optional(),
  }),
});

const doctors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    qualifications: z.string(),
    experience: z.number(),
    specialisations: z.array(z.string()),
    isFounder: z.boolean().default(false),
    bio: z.string(),
    image: z.string().optional(),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    reviewerName: z.string().optional(),
    type: z.enum(['text', 'youtube', 'video', 'image']).default('text'),
    city: z.string().optional(),
    rating: z.number().default(5),
    date: z.coerce.date().optional(),
    videoId: z.string().optional(),
    videoSrc: z.string().optional(),
    image: z.string().optional().nullable(),
    isSheCare: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog,
  treatments,
  doctors,
  reviews,
  gallery,
};
