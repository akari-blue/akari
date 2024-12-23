import { z } from 'zod';

export const BSkyPostLabel = z.object({
  src: z.string(),
  uri: z.string(),
  cid: z.string(),
  val: z.string(),
  cts: z.string(),
});

export type BSkyPostLabel = z.infer<typeof BSkyPostLabel>;
