import { z } from 'zod';
import { BlockedAuthor } from './BlockedAuthor';
import { BSkyPostLabel } from './BSkyPostLabel';
import { Author } from './Author';
import { BSkyPostEmbed } from './BSkyPostEmbed';
import { ThreadGate } from './ThreadGate';
import { BSkyFacet } from './BSkyFacet';

export const BSkyPost = z.object({
  uri: z.string(),
  cid: z.string(),
  author: Author.or(BlockedAuthor),
  record: z.object({
    $type: z.literal('app.bsky.feed.post'),
    createdAt: z.string(),
    embed: z
      .union([
        z.object({
          $type: z.literal('app.bsky.embed.record'),
          record: z.object({
            cid: z.string(),
            uri: z.string(),
          }),
        }),
        z.object({
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
        }),
        z.object({
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
        }),
        z.object({
          $type: z.literal('app.bsky.embed.video'),
          alt: z.string().optional(),
          aspectRatio: z.object({
            height: z.number(),
            width: z.number(),
          }),
          video: z.object({
            $type: z.literal('blob'),
            ref: z.object({
              $link: z.string(),
            }),
            mimeType: z.string(),
            size: z.number(),
          }),
        }),
        z.object({
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
      ])
      .optional(),
    facets: z.array(BSkyFacet).optional(),
    langs: z.array(z.string()).optional(),
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
  embed: BSkyPostEmbed.optional(),
  replyCount: z.number(),
  repostCount: z.number(),
  likeCount: z.number(),
  quoteCount: z.number().optional(),
  indexedAt: z.string(),
  viewer: z.object({
    threadMuted: z.boolean(),
    embeddingDisabled: z.boolean(),
    replyDisabled: z.boolean().optional(),
    like: z.string().optional(),
    repost: z.string().optional(),
    pinned: z.boolean().optional(),
  }),
  labels: z.array(BSkyPostLabel),
  threadgate: ThreadGate.optional(),
});

export type BSkyPost = z.infer<typeof BSkyPost>;
