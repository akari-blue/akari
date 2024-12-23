import { z } from 'zod';
import { BSkyPostLabel } from './BSkyPostLabel';
import { BSkyAuthor } from './BskyAuthor';

export const BSkyPostEmbedRecord = z.object({
  $type: z.literal('app.bsky.embed.record#view'),
  record: z.object({
    $type: z.literal('app.bsky.embed.record#viewRecord'),
    uri: z.string(),
    cid: z.string(),
    author: BSkyAuthor,
    creator: BSkyAuthor.optional(),
    value: z.object({
      $type: z.literal('app.bsky.feed.post'),
      createdAt: z.string(),
      embed: z
        .object({
          $type: z.literal('app.bsky.embed.images'),
          images: z.array(
            z.object({
              alt: z.string(),
              aspectRatio: z.object({
                height: z.number(),
                width: z.number(),
              }),
              image: z.object({
                $type: z.literal('blob'),
                ref: z.object({
                  $link: z.string(),
                }),
                mimeType: z.string(),
                size: z.number(),
              }),
            }),
          ),
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
    repostCount: z.number(),
    replyCount: z.number(),
    quoteCount: z.number().optional(),
    indexedAt: z.string(),
    embeds: z.array(z.unknown()).optional(),
  }),
});

export type BSkyPostEmbedRecord = z.infer<typeof BSkyPostEmbedRecord>;
