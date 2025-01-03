import { Static, Type } from '@sinclair/typebox';
import { BSkyAuthor } from './BskyAuthor';
import { BSkyPost } from './BSkyPost';

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

export const BSkyLikeNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('like'),
  reasonSubject: Type.Optional(Type.String()),
  record: BSkyNotificationFeedLike,
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyLikeNotification = Static<typeof BSkyLikeNotification>;

export const isBSkyLikeNotification = (notification: BSkyNotification): notification is BSkyLikeNotification =>
  notification.reason === 'like';

export const isBSkyLikeNotifications = (notifications: BSkyNotification[]): notifications is BSkyLikeNotification[] =>
  notifications.every(isBSkyLikeNotification);

export const BSkyRepostNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('repost'),
  reasonSubject: Type.Optional(Type.String()),
  record: Type.Any(), // TODO <--
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyRepostNotification = Static<typeof BSkyRepostNotification>;

export const isBSkyRepostNotification = (notification: BSkyNotification): notification is BSkyRepostNotification =>
  notification.reason === 'repost';

export const isBSkyRepostNotifications = (notifications: BSkyNotification[]): notifications is BSkyRepostNotification[] =>
  notifications.every(isBSkyRepostNotification);

export const BSkyFollowNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('follow'),
  reasonSubject: Type.Optional(Type.String()),
  record: BSkyNotificationGraphFollow,
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyFollowNotification = Static<typeof BSkyFollowNotification>;

export const isBSkyFollowNotification = (notification: BSkyNotification): notification is BSkyFollowNotification =>
  notification.reason === 'follow';

export const isBSkyFollowNotifications = (notifications: BSkyNotification[]): notifications is BSkyFollowNotification[] =>
  notifications.every(isBSkyFollowNotification);

export const BSkyMentionNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('mention'),
  reasonSubject: Type.Optional(Type.String()),
  record: Type.Any(), // TODO <--
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyMentionNotification = Static<typeof BSkyMentionNotification>;

export const isBSkyMentionNotification = (notification: BSkyNotification): notification is BSkyMentionNotification =>
  notification.reason === 'mention';

export const isBSkyMentionNotifications = (notifications: BSkyNotification[]): notifications is BSkyMentionNotification[] =>
  notifications.every(isBSkyMentionNotification);

export const BSkyReplyNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('reply'),
  reasonSubject: Type.Optional(Type.String()),
  record: BSkyPost['record'],
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyReplyNotification = Static<typeof BSkyReplyNotification>;

export const isBSkyReplyNotification = (notification: BSkyNotification): notification is BSkyReplyNotification =>
  notification.reason === 'reply';

export const isBSkyReplyNotifications = (notifications: BSkyNotification[]): notifications is BSkyReplyNotification[] =>
  notifications.every(isBSkyReplyNotification);

export const BSkyQuoteNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('quote'),
  reasonSubject: Type.Optional(Type.String()),
  record: Type.Any(), // TODO <--
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyQuoteNotification = Static<typeof BSkyQuoteNotification>;

export const isBSkyQuoteNotification = (notification: BSkyNotification): notification is BSkyQuoteNotification =>
  notification.reason === 'quote';

export const isBSkyQuoteNotifications = (notifications: BSkyNotification[]): notifications is BSkyQuoteNotification[] =>
  notifications.every(isBSkyQuoteNotification);

export const BSkyStarterpackJoinedNotification = Type.Object({
  uri: Type.String(),
  cid: Type.String(),
  author: BSkyAuthor,
  reason: Type.Literal('starterpack-joined'),
  reasonSubject: Type.Optional(Type.String()),
  record: Type.Any(), // TODO <--
  isRead: Type.Boolean(),
  indexedAt: Type.String(),
  labels: Type.Optional(Type.Array(Type.Any())),
});

export type BSkyStarterpackJoinedNotification = Static<typeof BSkyStarterpackJoinedNotification>;

export const isBSkyStarterpackJoinedNotification = (
  notification: BSkyNotification,
): notification is BSkyStarterpackJoinedNotification => notification.reason === 'starterpack-joined';

export const isBSkyStarterpackJoinedNotifications = (
  notifications: BSkyNotification[],
): notifications is BSkyStarterpackJoinedNotification[] => notifications.every(isBSkyStarterpackJoinedNotification);

export const BSkyNotification = Type.Union([
  BSkyLikeNotification,
  BSkyRepostNotification,
  BSkyFollowNotification,
  BSkyMentionNotification,
  BSkyReplyNotification,
  BSkyQuoteNotification,
  BSkyStarterpackJoinedNotification,
]);

export type BSkyNotification = Static<typeof BSkyNotification>;
