import { Static, Type } from '@sinclair/typebox';

export const BSkyMessage = Type.Object({
  id: Type.String(),
  rev: Type.String(),
  sender: Type.Object({
    did: Type.String(),
  }),
  text: Type.String(),
  sentAt: Type.String(),
});

export type BSkyMessage = Static<typeof BSkyMessage>;

const BSkyMessageWithReactions = Type.Intersect([
  BSkyMessage,
  Type.Object({
    reactions: Type.Array(
      Type.Object({
        emoji: Type.String(),
        sender: Type.Object({
          did: Type.String(),
        }),
      }),
    ),
  }),
]);

export type BSkyMessageWithReactions = Static<typeof BSkyMessageWithReactions>;
