import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { BSkyPostLabel } from './bsky-post-label';
import { Author } from './author';

export const BlockedAuthor = Type.Object({
  did: Type.String(),
  handle: Type.String(),
  displayName: Type.String(),
  avatar: Type.String(),
  viewer: Type.Object({
    muted: Type.Boolean(),
    blockedBy: Type.Literal(true),
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
});

export type BlockedAuthor = Static<typeof BlockedAuthor>;

const C = TypeCompiler.Compile(BlockedAuthor);

export const isBlockedAuthor = (value: Author): value is BlockedAuthor => C.Check(value);
