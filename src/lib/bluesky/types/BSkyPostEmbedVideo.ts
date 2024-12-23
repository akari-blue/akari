import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedVideo = Type.Object({
  $type: Type.Literal('app.bsky.embed.video#view'),
  cid: Type.String(),
  playlist: Type.String(),
  thumbnail: Type.String(),
  aspectRatio: Type.Object({
    height: Type.Number(),
    width: Type.Number(),
  }),
  alt: Type.Optional(Type.String()),
});

export type BSkyPostEmbedVideo = Static<typeof BSkyPostEmbedVideo>;
