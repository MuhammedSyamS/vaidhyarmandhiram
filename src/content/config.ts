import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleMl: z.string(),
    description: z.string(),
    descriptionMl: z.string(),
    category: z.enum(['Panchakarma', 'Women\'s Health', 'Spine Care', 'Lifestyle', 'General']).default('General'),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
});

const treatments = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['panchakarma', 'rejuvenation', 'spine-joint', 'skin', 'specialised']),
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

export const collections = {
  blog,
  treatments,
  doctors,
};
