import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbedRecordWithMedia = Type.Object({
  $type: Type.Literal('app.bsky.embed.recordWithMedia'),
  media: Type.Object({
    $type: Type.Literal('app.bsky.embed.external'),
    external: Type.Object({
      uri: Type.String(),
      title: Type.String(),
      description: Type.String(),
      thumb: Type.Object({
        $type: Type.Literal('blob'),
        ref: Type.Object({
          $link: Type.String(),
        }),
        mimeType: Type.String(),
        size: Type.Number(),
      }),
    }),
  }),
});

export type BSkyPostEmbedRecordWithMedia = Static<typeof BSkyPostEmbedRecordWithMedia>;
