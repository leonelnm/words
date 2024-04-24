import { defineCollection, z } from "astro:content";


const wordsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    footnote: z.string().optional(),
  }),
})

export const collections = { words: wordsCollection }