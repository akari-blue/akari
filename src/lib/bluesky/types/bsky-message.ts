import { Static, Type } from '@sinclair/typebox';
import { BSkyFacet } from './bsky-facet';

export const BSkyMessage = Type.Object({
  id: Type.String(),
  rev: Type.String(),
  sender: Type.Object({
    did: Type.String(),
  }),
  text: Type.String(),
  sentAt: Type.String(),
  facets: Type.Optional(Type.Array(BSkyFacet)),
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
