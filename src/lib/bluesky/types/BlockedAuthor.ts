import { z } from 'zod';
import { BSkyAuthor } from './BskyAuthor';

export const BlockedAuthor = z.object({
  did: z.string(),
  handle: z.never(),
  displayName: z.never(),
  avatar: z.never(),
  associated: z.never(),
  viewer: z.object({
    blockedBy: z.literal(true),
  }),
  labels: z.never(),
  createdAt: z.never(),
});

export type BlockedAuthor = z.infer<typeof BlockedAuthor>;

export const isAuthorBlocked = (author?: BSkyAuthor): author is BlockedAuthor => {
  return author?.viewer.blockedBy === true;
};
