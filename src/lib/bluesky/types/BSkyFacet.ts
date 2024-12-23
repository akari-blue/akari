import { z } from 'zod';

const LinkFacet = z.object({
  $type: z.literal('app.bsky.richtext.facet#link'),
  uri: z.string(),
});

type LinkFacet = z.infer<typeof LinkFacet>;

const MentionFacet = z.object({
  $type: z.literal('app.bsky.richtext.facet#mention'),
  did: z.string(),
});

type MentionFacet = z.infer<typeof MentionFacet>;

const TagFacet = z.object({
  $type: z.literal('app.bsky.richtext.facet#tag'),
  tag: z.string(),
});

type TagFacet = z.infer<typeof TagFacet>;

export const BSkyFacet = z.object({
  $type: z.literal('app.bsky.richtext.facet').optional(),
  features: z.array(LinkFacet.or(MentionFacet).or(TagFacet)),
  index: z.object({
    byteEnd: z.number(),
    byteStart: z.number(),
  }),
});

export type BSkyFacet = z.infer<typeof BSkyFacet>;
