import { BSkyPostLabel } from './BSkyPostLabel';

import { Type, Static } from '@sinclair/typebox';

export const Author = Type.Object({
  did: Type.String(),
  handle: Type.String(),
  displayName: Type.String(),
  avatar: Type.String(),
  viewer: Type.Object({
    muted: Type.Boolean(),
    blockedBy: Type.Boolean(),
    blocking: Type.Optional(Type.String()),
    following: Type.Optional(Type.Union([Type.String(), Type.Undefined()])),
    followedBy: Type.Optional(Type.Union([Type.String(), Type.Undefined()])),
  }),
  labels: Type.Array(BSkyPostLabel),
  createdAt: Type.String(),
  indexedAt: Type.Optional(Type.String()),
  associated: Type.Optional(
    Type.Object({
      chat: Type.Object({
        allowIncoming: Type.String(),
      }),
    }),
  ),
  description: Type.Optional(Type.String()),
});

export type Author = Static<typeof Author>;
