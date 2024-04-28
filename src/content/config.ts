import { defineCollection, z } from "astro:content";

const song = z.object({
  image: z.string().optional(),
  url: z.string().url(),
  text: z.string().optional()
})

const wordsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().default(false),
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    songs: song.array().optional(),
    footnote: z.string().optional(),
  }),
})

export const collections = { words: wordsCollection }