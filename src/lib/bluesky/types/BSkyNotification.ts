import { Static, Type } from '@sinclair/typebox';
import { BSkyAuthor } from './BskyAuthor';

export const BSkyNotificationFeedLike = Type.Object({
  $type: Type.Literal('app.bsky.feed.like'),
  createdAt: Type.String(),
  subject: Type.Object({
    cid: Type.String(),
    uri: Type.String(),
  }),
});

export const BSkyNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Union([
    Type.Literal('like'),
    Type.Literal('repost'),
    Type.Literal('follow'),
    Type.Literal('mention'),
    Type.Literal('reply'),
    Type.Literal('quote'),
    Type.Literal('starterpack-joined'),
  ]),
  reasonSubject: Type.Optional(Type.String()),
  record: Type.Union([BSkyNotificationFeedLike]),
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyNotification = Static<typeof BSkyNotification>;
