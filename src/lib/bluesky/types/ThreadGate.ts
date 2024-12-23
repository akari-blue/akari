import { z } from 'zod';
import { BSkyPostLabel } from './BSkyPostLabel';

export const ThreadGate = z.object({
  uri: z.string(),
  cid: z.string(),
  record: z.object({
    $type: z.literal('app.bsky.feed.threadgate'),
    allow: z.array(
      z
        .object({
          $type: z.literal('app.bsky.feed.threadgate#followingRule'),
        })
        .or(
          z.object({
            $type: z.literal('app.bsky.feed.threadgate#mentionRule'),
          }),
        )
        .or(
          z.object({
            $type: z.literal('app.bsky.feed.threadgate#listRule'),
            list: z.string(),
          }),
        ),
    ),
    createdAt: z.string(),
    post: z.string(),
  }),
  lists: z.array(
    z.object({
      uri: z.string(),
      cid: z.string(),
      name: z.string(),
      purpose: z.literal('app.bsky.graph.defs#curatelist'),
      listItemCount: z.number(),
      indexedAt: z.string(),
      labels: z.array(BSkyPostLabel),
      viewer: z.object({
        muted: z.boolean(),
      }),
    }),
  ),
});

export type ThreadGate = z.infer<typeof ThreadGate>;
