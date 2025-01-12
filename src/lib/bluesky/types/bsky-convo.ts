import { Static, Type } from '@sinclair/typebox';

export const BSkyConvo = Type.Object({
  id: Type.String(),
  rev: Type.String(),
  members: Type.Array(
    Type.Object({
      did: Type.String(),
      handle: Type.String(),
      displayName: Type.String(),
      avatar: Type.String(),
      associated: Type.Object({
        lists: Type.Number(),
        feedgens: Type.Number(),
        starterPacks: Type.Number(),
        labeler: Type.Boolean(),
        chat: Type.Object({
          allowIncoming: Type.String(),
        }),
      }),
      viewer: Type.Object({
        muted: Type.Boolean(),
        blockedBy: Type.Boolean(),
        following: Type.Optional(Type.String()),
        followedBy: Type.Optional(Type.String()),
      }),
      labels: Type.Array(Type.Unknown()),
    }),
  ),
  lastMessage: Type.Object({
    $type: Type.Literal('chat.bsky.convo.defs#messageView'),
    id: Type.String(),
    rev: Type.String(),
    sender: Type.Object({
      did: Type.String(),
    }),
    text: Type.String(),
    sentAt: Type.String(),
  }),
  unreadCount: Type.Number(),
  opened: Type.Boolean(),
  muted: Type.Boolean(),
});

export type BSkyConvo = Static<typeof BSkyConvo>;
