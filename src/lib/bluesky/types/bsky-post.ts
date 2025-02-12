import { BlockedAuthor } from './blocked-author';
import { BSkyPostLabel } from './bsky-post-label';
import { Author } from './author';
import { BSkyPostEmbed } from './bsky-post-embed';
import { ThreadGate } from './thread-gate';
import { BSkyFacet } from './bsky-facet';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPost = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: Type.Union([Author, BlockedAuthor]),
  record: Type.Object({
    $type: Type.Literal('app.bsky.feed.post'),
    createdAt: Type.String(),
    embed: Type.Optional(BSkyPostEmbed),
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
    encryptedText: Type.Optional(Type.String()),
    encryption: Type.Optional(
      Type.Object({
        key: Type.String(),
        type: Type.String(),
        encoding: Type.String(),
      }),
    ),
    acl: Type.Optional(
      Type.Object({
        user: Type.Array(
          Type.Object({
            did: Type.String(),
            permission: Type.Object({
              read: Type.Boolean(),
              interact: Type.Object({
                reply: Type.Boolean(),
                like: Type.Boolean(),
                repost: Type.Boolean(),
                quote: Type.Boolean(),
                comment: Type.Boolean(),
              }),
            }),
          }),
        ),
      }),
    ),
  }),
  embed: Type.Optional(BSkyPostEmbed),
  replyCount: Type.Number(),
  repostCount: Type.Number(),
  likeCount: Type.Number(),
  quoteCount: Type.Optional(Type.Number()),
  indexedAt: Type.String(),
  viewer: Type.Optional(
    Type.Object({
      threadMuted: Type.Optional(Type.Boolean()),
      embeddingDisabled: Type.Optional(Type.Boolean()),
      replyDisabled: Type.Optional(Type.Boolean()),
      like: Type.Optional(Type.String()),
      repost: Type.Optional(Type.String()),
      pinned: Type.Optional(Type.Boolean()),
    }),
  ),
  labels: Type.Array(BSkyPostLabel),
  threadgate: Type.Optional(ThreadGate),
});

export type BSkyPost = Static<typeof BSkyPost>;
