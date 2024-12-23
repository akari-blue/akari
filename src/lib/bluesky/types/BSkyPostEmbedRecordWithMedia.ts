import { z } from 'zod';

export const BSkyPostEmbedRecordWithMedia = z.object({
  $type: z.literal('app.bsky.embed.recordWithMedia'),
  media: z.object({
    $type: z.literal('app.bsky.embed.external'),
    external: z.object({
      uri: z.string(),
      title: z.string(),
      description: z.string(),
      thumb: z.object({
        $type: z.literal('blob'),
        ref: z.object({
          $link: z.string(),
        }),
        mimeType: z.string(),
        size: z.number(),
      }),
    }),
  }),
});

export type BSkyPostEmbedRecordWithMedia = z.infer<typeof BSkyPostEmbedRecordWithMedia>;
