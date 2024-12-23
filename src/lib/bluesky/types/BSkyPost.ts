import { BlockedAuthor } from './BlockedAuthor';
import { BSkyPostLabel } from './BSkyPostLabel';
import { Author } from './Author';
import { BSkyPostEmbed } from './BSkyPostEmbed';
import { ThreadGate } from './ThreadGate';
import { BSkyFacet } from './BSkyFacet';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPost = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: Type.Union([Author, BlockedAuthor]),
  record: Type.Object({
    $type: Type.Literal('app.bsky.feed.post'),
    createdAt: Type.String(),
    embed: Type.Optional(
      Type.Union([
        Type.Object({
          $type: Type.Literal('app.bsky.embed.record'),
          record: Type.Object({
            cid: Type.String(),
            uri: Type.String(),
          }),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.embed.recordWithMedia'),
          media: Type.Object({
            $type: Type.Literal('app.bsky.embed.external'),
            external: Type.Object({
              description: Type.String(),
              thumb: Type.Object({
                $type: Type.Literal('blob'),
                ref: Type.Object({
                  $link: Type.String(),
                }),
                mimeType: Type.String(),
                size: Type.Number(),
              }),
              title: Type.String(),
              uri: Type.String(),
            }),
          }),
          record: Type.Object({
            $type: Type.Literal('app.bsky.embed.record'),
            record: Type.Object({
              cid: Type.String(),
              uri: Type.String(),
            }),
          }),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.embed.images'),
          images: Type.Array(
            Type.Object({
              alt: Type.String(),
              aspectRatio: Type.Object({
                height: Type.Number(),
                width: Type.Number(),
              }),
              image: Type.Object({
                $type: Type.Literal('blob'),
                ref: Type.Object({
                  $link: Type.String(),
                }),
                mimeType: Type.String(),
                size: Type.Number(),
              }),
            }),
          ),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.embed.video'),
          alt: Type.Optional(Type.String()),
          aspectRatio: Type.Object({
            height: Type.Number(),
            width: Type.Number(),
          }),
          video: Type.Object({
            $type: Type.Literal('blob'),
            ref: Type.Object({
              $link: Type.String(),
            }),
            mimeType: Type.String(),
            size: Type.Number(),
          }),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.embed.external'),
          external: Type.Object({
            description: Type.String(),
            thumb: Type.Object({
              $type: Type.Literal('blob'),
              ref: Type.Object({
                $link: Type.String(),
              }),
              mimeType: Type.String(),
              size: Type.Number(),
            }),

            title: Type.String(),
            uri: Type.String(),
          }),
        }),
      ]),
    ),
    facets: Type.Optional(Type.Array(BSkyFacet)),
    langs: Type.Optional(Type.Array(Type.String())),
    reply: Type.Optional(
      Type.Object({
        parent: Type.Object({
          cid: Type.String(),
          uri: Type.String(),
        }),
        root: Type.Object({
          cid: Type.String(),
          uri: Type.String(),
        }),
      }),
    ),
    text: Type.String(),
  }),
  embed: Type.Optional(BSkyPostEmbed),
  replyCount: Type.Number(),
  repostCount: Type.Number(),
  likeCount: Type.Number(),
  quoteCount: Type.Optional(Type.Number()),
  indexedAt: Type.String(),
  viewer: Type.Object({
    threadMuted: Type.Boolean(),
    embeddingDisabled: Type.Boolean(),
    replyDisabled: Type.Optional(Type.Boolean()),
    like: Type.Optional(Type.String()),
    repost: Type.Optional(Type.String()),
    pinned: Type.Optional(Type.Boolean()),
  }),
  labels: Type.Array(BSkyPostLabel),
  threadgate: Type.Optional(ThreadGate),
});

export type BSkyPost = Static<typeof BSkyPost>;
