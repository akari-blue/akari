import { z } from 'zod';

export const BSkyPostEmbedExternal = z.object({
  $type: z.literal('app.bsky.embed.external#view'),
  external: z.object({
    uri: z.string(),
    title: z.string(),
    description: z.string(),
    thumb: z.string(),
  }),
});

export type BSkyPostEmbedExternal = z.infer<typeof BSkyPostEmbedExternal>;
