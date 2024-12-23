import { BSkyFacet } from './BSkyFacet';
import { BSkyPostLabel } from './BSkyPostLabel';
import { BSkyAuthor } from './BskyAuthor';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedRecord = Type.Object({
  $type: Type.Literal('app.bsky.embed.record#view'),
  record: Type.Object({
    $type: Type.Literal('app.bsky.embed.record#viewRecord'),
    uri: Type.String(),
    cid: Type.String(),
    author: BSkyAuthor,
    creator: Type.Optional(BSkyAuthor),
    value: Type.Object({
      $type: Type.Literal('app.bsky.feed.post'),
      createdAt: Type.String(),
      embed: Type.Optional(
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
    repostCount: Type.Number(),
    replyCount: Type.Number(),
    quoteCount: Type.Optional(Type.Number()),
    indexedAt: Type.String(),
    embeds: Type.Optional(Type.Array(Type.Unknown())),
    text: Type.String(),
    facets: Type.Array(BSkyFacet),
  }),
});

export type BSkyPostEmbedRecord = Static<typeof BSkyPostEmbedRecord>;
