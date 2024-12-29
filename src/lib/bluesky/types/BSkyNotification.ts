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

export type BSkyNotificationFeedLike = Static<typeof BSkyNotificationFeedLike>;

export function isBSkyNotificationFeedLike(
  notification: BSkyNotification,
): notification is BSkyNotification & { record: BSkyNotificationFeedLike } {
  return notification.record.$type === 'app.bsky.feed.like';
}

export const BSkyNotificationGraphFollow = Type.Object({
  $type: Type.Literal('app.bsky.graph.follow'),
  createdAt: Type.String(),
  subject: Type.String(),
});

export type BSkyNotificationGraphFollow = Static<typeof BSkyNotificationGraphFollow>;

export function isBSkyNotificationGraphFollow(
  notification: BSkyNotification,
): notification is BSkyNotification & { record: BSkyNotificationGraphFollow } {
  return notification.record.$type === 'app.bsky.graph.follow';
}

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
  record: Type.Union([BSkyNotificationFeedLike, BSkyNotificationGraphFollow]),
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyNotification = Static<typeof BSkyNotification>;
