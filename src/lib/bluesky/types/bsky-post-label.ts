import { Type, Static } from '@sinclair/typebox';

export const BSkyPostLabel = Type.Object({
  src: Type.String(),
  uri: Type.String(),
  cid: Type.String(),
  val: Type.String(),
  cts: Type.String(),
});

export type BSkyPostLabel = Static<typeof BSkyPostLabel>;
