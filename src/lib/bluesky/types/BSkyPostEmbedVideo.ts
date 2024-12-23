import { z } from 'zod';

export const BSkyPostEmbedVideo = z.object({
  $type: z.literal('app.bsky.embed.video#view'),
  cid: z.string(),
  playlist: z.string(),
  thumbnail: z.string(),
  aspectRatio: z.object({
    height: z.number(),
    width: z.number(),
  }),
  alt: z.string().optional(),
});

export type BSkyPostEmbedVideo = z.infer<typeof BSkyPostEmbedVideo>;
