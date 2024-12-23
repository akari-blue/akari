import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedExternal = Type.Object({
  $type: Type.Literal('app.bsky.embed.external#view'),
  external: Type.Object({
    uri: Type.String(),
    title: Type.String(),
    description: Type.String(),
    thumb: Type.String(),
  }),
});

export type BSkyPostEmbedExternal = Static<typeof BSkyPostEmbedExternal>;
