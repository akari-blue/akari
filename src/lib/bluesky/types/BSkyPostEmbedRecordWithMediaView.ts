import { z } from 'zod';
import { BSkyAuthor } from './BskyAuthor';
import { BSkyPostLabel } from './BSkyPostLabel';

export const BSkyPostEmbedRecordWithMediaView = z.object({
  $type: z.literal('app.bsky.embed.recordWithMedia#view'),
  media: z.object({
    $type: z.literal('app.bsky.embed.external#view'),
    external: z.object({
      uri: z.string(),
      title: z.string(),
      description: z.string(),
      thumb: z.string(),
    }),
  }),
  record: z.object({
    record: z.object({
      $type: z.literal('app.bsky.embed.record#viewRecord'),
      uri: z.string(),
      cid: z.string(),
      author: BSkyAuthor,
      value: z.object({
        $type: z.literal('app.bsky.feed.post'),
        createdAt: z.string(),
        embed: z
          .object({
            $type: z.literal('app.bsky.embed.recordWithMedia'),
            media: z.object({
              $type: z.literal('app.bsky.embed.external'),
              external: z.object({
                description: z.string(),
                thumb: z.object({
                  $type: z.literal('blob'),
                  ref: z.object({
                    $link: z.string(),
                  }),
                  mimeType: z.string(),
                  size: z.number(),
                }),
                title: z.string(),
                uri: z.string(),
              }),
            }),
            record: z.object({
              $type: z.literal('app.bsky.embed.record'),
              record: z.object({
                cid: z.string(),
                uri: z.string(),
              }),
            }),
          })
          .optional(),
        langs: z.array(z.string()),
        reply: z
          .object({
            parent: z.object({
              cid: z.string(),
              uri: z.string(),
            }),
            root: z.object({
              cid: z.string(),
              uri: z.string(),
            }),
          })
          .optional(),
        text: z.string(),
      }),
      labels: z.array(BSkyPostLabel),
      likeCount: z.number(),
      replyCount: z.number(),
      repostCount: z.number(),
      quoteCount: z.number(),
      indexedAt: z.string(),
      embeds: z.array(z.unknown()),
    }),
  }),
});

export type BSkyPostEmbedRecordWithMediaView = z.infer<typeof BSkyPostEmbedRecordWithMediaView>;
