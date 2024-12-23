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
