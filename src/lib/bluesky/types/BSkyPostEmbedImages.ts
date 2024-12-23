import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedImages = Type.Object({
  $type: Type.Literal('app.bsky.embed.images#view'),
  images: Type.Array(
    Type.Object({
      thumb: Type.String(),
      fullsize: Type.String(),
      alt: Type.String(),
      aspectRatio: Type.Object({
        height: Type.Number(),
        width: Type.Number(),
      }),
    }),
  ),
});

export type BSkyPostEmbedImages = Static<typeof BSkyPostEmbedImages>;
