import { z } from 'zod';
import { BSkyPostLabel } from './BSkyPostLabel';

export const Author = z.object({
  did: z.string(),
  handle: z.string(),
  displayName: z.string(),
  avatar: z.string(),
  associated: z
    .object({
      chat: z.object({
        allowIncoming: z.string(),
      }),
    })
    .optional(),
  viewer: z.object({
    muted: z.boolean(),
    blockedBy: z.boolean(),
    following: z.string().optional(),
    followedBy: z.string().optional(),
  }),
  labels: z.array(BSkyPostLabel),
  createdAt: z.string(),
});

export type Author = z.infer<typeof Author>;
