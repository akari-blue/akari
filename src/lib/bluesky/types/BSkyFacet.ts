import { Static, Type } from '@sinclair/typebox';

const LinkFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#link'),
  uri: Type.String(),
});

type LinkFacet = Static<typeof LinkFacet>;

const MentionFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#mention'),
  did: Type.String(),
});

type MentionFacet = Static<typeof MentionFacet>;

const TagFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#tag'),
  tag: Type.String(),
});

type TagFacet = Static<typeof TagFacet>;

const BoldFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#bold'),
});

type BoldFacet = Static<typeof BoldFacet>;

const ItalicFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#italic'),
});

type ItalicFacet = Static<typeof ItalicFacet>;

const UnderlineFacet = Type.Object({
  $type: Type.Literal('app.bsky.richtext.facet#underline'),
});

type UnderlineFacet = Static<typeof UnderlineFacet>;

export const BSkyFacet = Type.Object({
  $type: Type.Optional(Type.Literal('app.bsky.richtext.facet')),
  features: Type.Array(Type.Union([LinkFacet, MentionFacet, TagFacet, BoldFacet, ItalicFacet, UnderlineFacet])),
  index: Type.Object({
    byteEnd: Type.Number(),
    byteStart: Type.Number(),
  }),
});

export type BSkyFacet = Static<typeof BSkyFacet>;
