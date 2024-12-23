import { BSkyAuthor } from './BskyAuthor';
import { BSkyPostLabel } from './BSkyPostLabel';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedRecordWithMediaView = Type.Object({
  $type: Type.Literal('app.bsky.embed.recordWithMedia#view'),
  media: Type.Object({
    $type: Type.Literal('app.bsky.embed.external#view'),
    external: Type.Object({
      uri: Type.String(),
      title: Type.String(),
      description: Type.String(),
      thumb: Type.String(),
    }),
  }),
  record: Type.Object({
    record: Type.Object({
      $type: Type.Literal('app.bsky.embed.record#viewRecord'),
      uri: Type.String(),
      cid: Type.String(),
      author: BSkyAuthor,
      value: Type.Object({
        $type: Type.Literal('app.bsky.feed.post'),
        createdAt: Type.String(),
        embed: Type.Optional(
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
        ),
        langs: Type.Array(Type.String()),
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
      labels: Type.Array(BSkyPostLabel),
      likeCount: Type.Number(),
      replyCount: Type.Number(),
      repostCount: Type.Number(),
      quoteCount: Type.Number(),
      indexedAt: Type.String(),
      embeds: Type.Array(Type.Unknown()),
    }),
  }),
});

export type BSkyPostEmbedRecordWithMediaView = Static<typeof BSkyPostEmbedRecordWithMediaView>;
