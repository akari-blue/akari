import { z } from 'zod';

export const BSkyPostEmbedImages = z.object({
  $type: z.literal('app.bsky.embed.images#view'),
  images: z.array(
    z.object({
      thumb: z.string(),
      fullsize: z.string(),
      alt: z.string(),
      aspectRatio: z.object({
        height: z.number(),
        width: z.number(),
      }),
    }),
  ),
});

export type BSkyPostEmbedImages = z.infer<typeof BSkyPostEmbedImages>;
