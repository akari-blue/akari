import { BSkyPostLabel } from './BSkyPostLabel';
import { Static, Type } from '@sinclair/typebox';

export const ThreadGate = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  record: Type.Object({
    $type: Type.Literal('app.bsky.feed.threadgate'),
    allow: Type.Array(
      Type.Union([
        Type.Object({
          $type: Type.Literal('app.bsky.feed.threadgate#followingRule'),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.feed.threadgate#mentionRule'),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.feed.threadgate#listRule'),
          list: Type.String(),
        }),
      ]),
    ),
    createdAt: Type.String(),
    post: Type.String(),
  }),
  lists: Type.Array(
    Type.Object({
      uri: Type.String(),
      cid: Type.String(),
      name: Type.String(),
      purpose: Type.Literal('app.bsky.graph.defs#curatelist'),
      listItemCount: Type.Number(),
      indexedAt: Type.String(),
      labels: Type.Array(BSkyPostLabel),
      viewer: Type.Object({
        muted: Type.Boolean(),
      }),
    }),
  ),
});

export type ThreadGate = Static<typeof ThreadGate>;
